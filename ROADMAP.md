# Percorso di Sviluppo & Stato Implementazione DNAPostIt

Questo documento traccia l'avanzamento continuo dello sviluppo del backend, dell'infrastruttura Docker, delle code di schedulazione BullMQ, dei connettori Social API e del server MCP.

---

## Fasi di Sviluppo

- [x] **Fase 1: Infrastruttura Docker & Hosting Dedicato**
  - [x] `docker-compose.yml` (PostgreSQL 16, Redis 7, Backend API, Worker BullMQ, Caddy)
  - [x] `Caddyfile` con HTTPS automatico Let's Encrypt
  - [x] Template ambiente `.env.example` completo
  - [x] `Dockerfile.frontend` e `nginx.conf`

- [x] **Fase 2: Database & Modelli Dati (Prisma ORM)**
  - [x] Schema `Workspace` & `Project`
  - [x] Schema `SocialAccount` (OAuth2 Vault con token refresh)
  - [x] Schema `Post` & `PublicationLog`
  - [x] Schema `MediaAsset`
  - [x] Client Prisma wrapper (`prisma.ts`)

- [x] **Fase 3: Media Engine (AWS S3 + CloudFront & FFmpeg Locale)**
  - [x] Servizio upload S3 con presigned URLs (`s3Service.ts`)
  - [x] Risolutore CDN CloudFront con Range Headers
  - [x] Helper FFmpeg locale per transcodifica video H.264/AAC (`ffmpegService.ts`)

- [x] **Fase 4: Motore di Schedulazione & Code (BullMQ + Redis)**
  - [x] Queue manager con calcolo delay al millisecondo (`postQueue.ts`)
  - [x] Worker processor con exponential backoff retry e gestione lock (`postWorker.ts`)

- [x] **Fase 5: I 7 Social Dispatcher Ufficiali**
  - [x] Meta Dispatcher (`metaDispatcher.ts`: Facebook Page & Instagram Graph Container API)
  - [x] LinkedIn Dispatcher (`linkedinDispatcher.ts`: Post API con protocollo register/upload)
  - [x] TikTok Dispatcher (`tiktokDispatcher.ts`: Content Posting API)
  - [x] YouTube Dispatcher (`youtubeDispatcher.ts`: Data API v3 video upload)
  - [x] Threads Dispatcher (`threadsDispatcher.ts`: Threads Graph API)
  - [x] Google Business Profile Dispatcher (`gmbDispatcher.ts`: Local posts API)

- [x] **Fase 6: Server MCP Nativo (Model Context Protocol)**
  - [x] SDK `@modelcontextprotocol/sdk` con supporto SSE (`mcpServer.ts`)
  - [x] Registrazione Tools (`schedule_post`, `publish_now`, `get_calendar`, `get_social_accounts`)
  - [x] Registrazione Resources (`social://calendar/current`)

- [x] **Fase 7: REST API Core & Connessione Frontend**
  - [x] Router Post, Calendario, Account, Upload (`posts.ts`, `media.ts`, `channels.ts`)
  - [x] Entrypoint Express unificato (`index.ts`)

- [x] **Fase 8: Guida al Deploy & Push GitHub**
  - [x] `DEPLOY.md` per installazione 1-click su server dedicato
  - [x] Commit e Push su repository GitHub
