# Guida Ufficiale: Collegamento App pCloud e Sostituzione AWS S3

Questa guida tecnica descrive la procedura passo-passo per collegare la tua applicazione pCloud a **DNAPostIt**, basata sulla documentazione ufficiale di [pCloud Developers](https://docs.pcloud.com).

L'integrazione di pCloud consente di sostituire integralmente **AWS S3** e **CloudFront**, eliminando qualsiasi spesa di banda (egress bandwidth) e richiesta API, sfruttando lo storage del tuo account pCloud e i server CDN ad alta velocita.

---

## 1. Architettura di Archiviazione & Streaming CDN

Quando pubblichi post con immagini, caroselli o video su **Instagram, Facebook, TikTok, LinkedIn, YouTube e Google Business**, le piattaforme social richiedono un URL HTTPS pubblico e permanente per scaricare il file dai loro server di ingestion.

```
                    +---------------------------------------+
                    |  DNAPostIt Post Composer / MCP Agent  |
                    +-------------------+-------------------+
                                        |
                            1. Multipart Upload
                                        v
                    +---------------------------------------+
                    |      DNAPostIt Backend Server         |
                    |     (server/src/services/pCloud)      |
                    +-------------------+-------------------+
                                        |
                 2. POST /uploadfile    |  3. GET /getfilelink
                                        v
                    +---------------------------------------+
                    |        pCloud API Server              |
                    |  (eapi.pcloud.com o api.pcloud.com)   |
                    +-------------------+-------------------+
                                        |
                    4. Restituisce CDN URL Diretto:
                    https://p-def8.pcloud.com/hash/.../video.mp4
                                        |
           +----------------------------+----------------------------+
           |                            |                            |
           v                            v                            v
  +-----------------+          +-----------------+          +-----------------+
  |   Meta Graph    |          |   TikTok API    |          |  LinkedIn API   |
  |  (IG / FB Post) |          |  (Direct Post)  |          |  (Media Upload) |
  +-----------------+          +-----------------+          +-----------------+
```

### Vantaggi rispetto ad AWS S3:
1. **Zero costi di traffico in uscita:** AWS addebita fino a 0,09 USD/GB per il traffico scaricato dalle piattaforme social. pCloud offre banda illimitata o inclusa nel piano.
2. **CDN Europea conforme a GDPR:** Server localizzati in Lussemburgo e Francoforte (`eapi.pcloud.com`).
3. **Supporto HTTP Range Requests:** L'endpoint `/getfilelink` supporta streaming video con richieste a intervalli di byte (byte-range HTTP/1.1), requisito tassativo per la validazione video di Instagram Reels e TikTok.

---

## 2. Requisiti dell'Applicazione su docs.pcloud.com

Accedi alla console sviluppatori pCloud su:
**https://docs.pcloud.com/my_apps/**

### A. Se hai gia un'applicazione registrata:
1. Apri la tua applicazione nella lista.
2. Verifica che sotto la scheda **Settings**:
   - **Permissions / Write access** sia impostato su **All permissions (read, write, create, modify)**. L'applicazione deve poter scrivere (`uploadfile`, `createfolder`) e leggere.
   - **Access**: puo essere impostato su:
     - `Specific folder only` (`private`): Consigliato. L'app lavora solo nella cartella sandbox `pCloud Drive / Applications / NomeApp`.
     - `All folders` (`full`): L'app puo scrivere in qualsiasi cartella del Drive.

### B. Se devi creare una nuova applicazione:
1. Vai su https://docs.pcloud.com/my_apps/ e clicca su **"New app"**.
2. Compila i campi:
   - **App name**: `DNAPostIt Media Hub`
   - **Application Type**: Seleziona `Personal use` (o `Business integration`).
   - **Folder access**: Seleziona `Private` (oppure `All folders`).
   - **Write access**: Seleziona tassativamente **`Yes`**.
   - **Reason**: `Internal storage and media streaming for social media multi-publishing platform.`
3. Invia la richiesta con **"Create request"**.

---

## 3. Due Modalita di Collegamento e Autenticazione

pCloud supporta due flussi ufficiali di autenticazione:

### Metodo 1: Access Token Diretto Permanente (Consigliato per uso interno / server)
Se utilizzi l'applicazione per la tua istanza DNAPostIt, non e necessario creare un server di reindirizzamento OAuth.
1. Entra nel pannello dell'applicazione su `https://docs.pcloud.com/my_apps/`.
2. Nella scheda della tua applicazione, clicca sul pulsante **"Generate Access Token"**.
3. pCloud generera una stringa alfanumerica sicura (Bearer Access Token).
4. Questo token **non scade** a meno che non venga revocato manualmente.
5. Copia il token e incollalo in DNAPostIt.

### Metodo 2: Flusso OAuth 2.0 Standard (Code Authorization Flow)
Se desideri consentire a piu utenti di collegare il proprio pCloud con autorizzazione a schermo:
1. Nella scheda **Settings** della tua app su pCloud, aggiungi l'URI di reindirizzamento:
   ```
   http://localhost:3000/oauth/pcloud/callback
   https://social.tuodominio.it/oauth/pcloud/callback
   ```
2. Reindirizza l'utente a:
   ```
   https://my.pcloud.com/oauth2/authorize?client_id=IL_TUO_CLIENT_ID&response_type=code&redirect_uri=IL_TUO_REDIRECT_URI
   ```
   *(Nota: per account residenti in Europa, l'autorizzazione risponde indicando `hostname: eapi.pcloud.com` e `locationid: 2`).*
3. Ricevuto il parametro `code` nel callback, il server esegue la richiesta POST a:
   ```http
   POST https://eapi.pcloud.com/oauth2_token
   Content-Type: application/x-www-form-urlencoded

   client_id=IL_TUO_CLIENT_ID&client_secret=IL_TUO_CLIENT_SECRET&code=CODICE_RICEVUTO
   ```
4. Risposta JSON:
   ```json
   {
     "result": 0,
     "access_token": "ACCESS_TOKEN_STRING",
     "token_type": "bearer",
     "uid": 1234567,
     "locationid": 2
   }
   ```

---

## 4. Attenzione Fondamentale: Data Center Region (Europe vs USA)

Come specificato nella documentazione ufficiale di pCloud:
- **Europa (`locationid = 2`):** Endpoint API = **`https://eapi.pcloud.com`**
- **Stati Uniti (`locationid = 1`):** Endpoint API = **`https://api.pcloud.com`**

> **Importante:** Se il tuo account pCloud e stato registrato su server europei (impostazione predefinita per account creati in Italia), le chiamate a `api.pcloud.com` restituiranno errore di autenticazione o utente non trovato. E necessario utilizzare `https://eapi.pcloud.com`.

---

## 5. Configurazione in DNAPostIt

### Nel file `.env` del server:
```env
# ==============================================================================
# Media Storage: pCloud Drive API (Sostituzione AWS S3)
# ==============================================================================
MEDIA_STORAGE_PROVIDER=pcloud
PCLOUD_ACCESS_TOKEN=incolla_qui_il_tuo_access_token_pcloud
PCLOUD_API_HOST=https://eapi.pcloud.com
PCLOUD_FOLDER_NAME=DNAPostIt_Media
```

### Tramite l'Interfaccia Web (UI):
1. Accedi a DNAPostIt.
2. Dal menu laterale sinistro, clicca sull'icona **Impostazioni** (Sliders in basso a sinistra).
3. Seleziona la scheda **"Storage Media (pCloud / S3)"**.
4. Incolla il tuo **PCLOUD ACCESS TOKEN**.
5. Seleziona il Data Center: **Europa (eapi.pcloud.com)**.
6. Clicca su **"Verifica Connessione & Quota pCloud"**.
7. L'interfaccia si colleghera istantaneamente alle API di pCloud mostrando l'email dell'account, lo spazio totale, lo spazio utilizzato e la quota libera disponibile.

---

## 6. Endpoints API Utilizzati dal Backend DNAPostIt

Tutti i metodi sono implementati in `server/src/services/pCloudService.ts` conformemente alle specifiche di [docs.pcloud.com](https://docs.pcloud.com):

| Operazione | Endpoint pCloud | Parametri Chiave | Descrizione |
|---|---|---|---|
| **Verifica & Quota** | `GET /userinfo` | `access_token` | Verifica validita token, email e quota spazio rimanente. |
| **Creazione Cartella** | `GET /createfolderifnotexists` | `access_token`, `folderid=0`, `name` | Crea automaticamente la cartella `DNAPostIt_Media` nella radice. |
| **Caricamento File** | `POST /uploadfile` | `access_token`, `folderid`, `file` (multipart) | Esegue l'upload di immagini JPG/PNG e video MP4/MOV. |
| **Generazione CDN Link** | `GET /getfilelink` | `access_token`, `fileid`, `forcedownload=0` | Genera l'URL diretto `https://{host}{path}` per la distribuzione a Instagram/TikTok. |
| **Eliminazione File** | `GET /deletefile` | `access_token`, `fileid` | Rimuove il file dal cloud al termine del ciclo di vita o se eliminato dall'utente. |

---

## 7. Checklist di Collaudo

1. [x] Token inserito in **Impostazioni > Storage Media**.
2. [x] Verifica connessione con codice HTTP 200 e `result: 0`.
3. [x] Spazio quota visualizzato correttamente a video.
4. [x] Upload di prova da Composer: file registrato in `DNAPostIt_Media` e URL CDN funzionante.
5. [x] Zero dipendenze da AWS S3 o costi di banda esterni.
