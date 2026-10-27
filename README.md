# DNAPostIt Studio

Piattaforma di Social Media Management avanzata ad uso interno, progettata come alternativa moderna a Pubblie.io con supporto nativo per **Model Context Protocol (MCP)**, transcodifica video locale su server dedicato e storage media su AWS S3 + CloudFront.

---

## Palette & Design
* **Nero Grafene:** `#090a0f`, `#10121a`, `#151824`
* **Viola Elettrico:** `#8b5cf6`, `#7c3aed`, `#a855f7`
* **Zero Emoji:** Interfaccia professionale basata esclusivamente su vettori SVG e tipografia curata (*Plus Jakarta Sans* e *JetBrains Mono*).

---

## Canali Social Supportati
1. **Instagram** (Feed, Caroselli, Reel, Storie)
2. **Facebook** (Pagine aziendali)
3. **LinkedIn** (Pagine aziendali e profili personali)
4. **TikTok** (Video 9:16)
5. **YouTube** (Shorts & Video standard)
6. **Threads** (Post e caroselli)
7. **Google Business Profile** (Post locali e offerte)

---

## Caratteristiche Principali
* **Piano Editoriale & Calendario:** Visuale a griglia mensile e settimanale con filtri per canale social.
* **Unified Post Composer:** Selezione multicanale simultanea, character counter per piattaforma.
* **Unicode Text Styler:** Toolbar per convertire testo in grassetto, corsivo e monospace matematico compatibile direttamente sui social.
* **Carousel Splitter Studio:** Slicing dinamico in-canvas di immagini panoramiche in slide carosello 4:5 o 1:1.
* **Automazione Primo Commento:** Invio automatico del primo commento (hashtag o link) contestuale alla pubblicazione.
* **Live Realistic Preview:** Anteprime fedeli con mockup nativi per ciascuno dei 7 social network.
* **Hub MCP (Model Context Protocol):** Server JSON-RPC (SSE/Stdio) su porta 3001 che espone tool per agenti AI autonomi (`schedule_post`, `publish_now`, `get_calendar`, `split_carousel`, `get_social_accounts`).
* **Infrastruttura Ibrida:** Transcodifica FFmpeg e code Redis/BullMQ su server dedicato Ubuntu; storage e distribuzione globale su AWS S3 e CloudFront.

---

## Avvio in Locale

```bash
# Installazione dipendenze
npm install

# Avvio server di sviluppo
npm run dev

# Build di produzione
npm run build
```
