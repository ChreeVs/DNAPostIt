# Guida al Deploy su Server Dedicato - DNAPostIt

Questa guida descrive la procedura completa per installare ed eseguire **DNAPostIt** in produzione sul tuo server dedicato Linux (Ubuntu 22.04 / 24.04 LTS).

---

## 1. Prerequisiti sul Server Dedicato

Assicurati che Docker e Docker Compose siano installati sul server:

```bash
# Aggiornamento pacchetti
sudo apt update && sudo apt upgrade -y

# Installazione Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

---

## 2. Clonare il Repository

Clona il repository sul tuo server:

```bash
git clone https://github.com/ChreeVs/DNAPostIt.git /opt/dnapostit
cd /opt/dnapostit
```

---

## 3. Configurazione del File `.env`

Copia il template delle variabili d'ambiente:

```bash
cp .env.example .env
nano .env
```

Configura i parametri fondamentali:
* `APP_DOMAIN`: Il tuo dominio o sottodominio (es: `social.tuodominio.it`).
* `ACME_EMAIL`: La tua email per il rinnovo automatico gratuito dei certificati SSL Let's Encrypt.
* `AWS_REGION`: es. `eu-central-1` (Francoforte).
* `AWS_ACCESS_KEY_ID`: La chiave IAM generata su AWS.
* `AWS_SECRET_ACCESS_KEY`: Il secret IAM generato su AWS.
* `AWS_S3_BUCKET`: Nome del tuo bucket S3 per i media.
* `AWS_CLOUDFRONT_DOMAIN`: L'indirizzo della tua distribuzione CloudFront (es: `https://d111111abcdef8.cloudfront.net`).
* Le credenziali API dei social (Meta, TikTok, LinkedIn, Google Cloud) quando pronte.

---

## 4. Configurazione DNS

Sul tuo fornitore di dominio (Cloudflare, Aruba, OVH, ecc.):
* Crea un record **A** che punta all'indirizzo IP pubblico del tuo server dedicato:
  * Tipo: `A`
  * Nome: `social` (o `@` se usi il dominio principale)
  * Valore: `IP_DEL_TUO_SERVER`

---

## 5. Avvio dei Servizi (Docker Compose)

Avvia l'intera infrastruttura in background:

```bash
docker compose up -d --build
```

Docker avvierà automaticamente:
1. **`dnapostit-caddy`**: Reverse proxy con SSL automatico (porte 80 e 443).
2. **`dnapostit-postgres`**: Database relazionale per post, account e log.
3. **`dnapostit-redis`**: Coda di memoria per la schedulazione BullMQ.
4. **`dnapostit-api`**: Backend Node.js e server MCP (porte interne 4000 e 3001).
5. **`dnapostit-worker`**: Worker di background con motore FFmpeg integrato per transcodifica video e dispatch social.
6. **`dnapostit-frontend`**: Web application Bianco & Granata servita tramite Nginx.

---

## 6. Verificare i Log e lo Stato dei Container

```bash
# Controlla lo stato dei container
docker compose ps

# Visualizza i log in tempo reale del worker social
docker compose logs -f worker

# Visualizza i log dell'API e del server MCP
docker compose logs -f api
```

---

## 7. Collegare gli Agenti AI via MCP (Model Context Protocol)

Puoi connettere **Claude Desktop**, **Cursor** o qualsiasi agent ad **DNAPostIt** configurando il client MCP:

Aggiungi al tuo file di configurazione (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "dnapostit": {
      "url": "https://social.tuodominio.it/mcp/sse"
    }
  }
}
```

Ora il tuo agente AI potrà eseguire:
* `schedule_post`
* `publish_now`
* `get_calendar`
* `get_social_accounts`
