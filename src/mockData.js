export const INITIAL_PROJECTS = [
  { id: 'proj-paa', name: 'PAA', avatar: 'PAA', color: '#8b5cf6' },
  { id: 'proj-dna', name: 'DNA Agency', avatar: 'DNA', color: '#10b981' }
];

export const INITIAL_CHANNELS = [
  {
    id: 'ch-facebook',
    platform: 'facebook',
    name: 'Facebook',
    count: 3605,
    color: '#1877f2',
    status: 'connected'
  },
  {
    id: 'ch-instagram',
    platform: 'instagram',
    name: 'Instagram',
    count: 1227,
    color: '#e1306c',
    status: 'connected'
  },
  {
    id: 'ch-tiktok',
    platform: 'tiktok',
    name: 'TikTok',
    count: 197,
    color: '#00f2fe',
    status: 'connected'
  },
  {
    id: 'ch-youtube',
    platform: 'youtube',
    name: 'YouTube',
    count: 36,
    color: '#ff0000',
    status: 'connected'
  },
  {
    id: 'ch-linkedin',
    platform: 'linkedin',
    name: 'LinkedIn',
    count: 15,
    color: '#0a66c2',
    status: 'connected'
  },
  {
    id: 'ch-threads',
    platform: 'threads',
    name: 'Threads',
    count: 0,
    color: '#ffffff',
    status: 'connected'
  },
  {
    id: 'ch-gmb',
    platform: 'gmb',
    name: 'Google Business',
    count: 0,
    color: '#4285f4',
    status: 'connected'
  }
];

// Awareness days / Giornate mondiali shown in Pubblie calendar
export const OBSERVANCE_DAYS = {
  '2026-09-28': ['Giornata mondiale contro la rabbia'],
  '2026-09-29': ['Giornata internazionale della consapevolezza sugli sprechi e le perdite alimentari'],
  '2026-09-30': [
    'Giornata internazionale del podcast',
    'Giornata internazionale della traduzione',
    'Giornata mondiale del copywriter'
  ],
  '2026-10-01': [
    'Giornata internazionale del caffe',
    'Giornata internazionale della dieta vegetariana',
    'Giornata internazionale delle persone anziane'
  ],
  '2026-10-02': [
    'Festa dei nonni',
    'Giornata internazionale della non violenza',
    'Giornata mondiale per gli animali negli allevamenti'
  ],
  '2026-10-03': ["Giornata mondiale dell'habitat"],
  '2026-10-05': ["Giornata mondiale dell'insegnante"],
  '2026-10-07': ['Giornata mondiale del sorriso'],
  '2026-10-08': ['Giornata internazionale della podologia', 'Giornata mondiale del polpo'],
  '2026-10-09': ['Beer and pizza day', 'Giornata mondiale della posta'],
  '2026-10-10': ['Giornata mondiale del senza fissa dimora', 'Giornata mondiale del porridge', 'Giornata mondiale della salute mentale'],
  '2026-10-12': ["Giornata mondiale dell'artrite"],
  '2026-10-13': [
    'Giornata internazionale per la riduzione del rischio dei disastri naturali',
    'Giornata mondiale della vista',
    'Giornata mondiale senza reggiseno'
  ],
  '2026-10-14': ['Giornata mondiale della normazione', "Giornata mondiale dell'uovo"],
  '2026-10-15': ['Giornata internazionale della riparazione'],
  '2026-10-16': [
    'Giornata mondiale del pane',
    "Giornata mondiale dell'alimentazione",
    "Giornata mondiale dell'anestesia",
    'Nasce la walt disney'
  ],
  '2026-10-17': ['Giornata del foglio di calcolo', 'Giornata internazionale per l\'eliminazione della poverta'],
  '2026-10-20': ['Giornata internazionale degli chef'],
  '2026-10-22': ['Capslock day'],
  '2026-10-24': ['Giornata delle nazioni unite', 'Giornata mondiale dello sviluppo']
};

export const INITIAL_POSTS = [
  // Week 40 - Lun 28 Sep
  {
    id: 'post-1',
    date: '2026-09-28',
    time: '12:35',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Guida rapida al setup del nostro stack di marketing automation.',
    status: 'scheduled'
  },
  {
    id: 'post-2',
    date: '2026-09-28',
    time: '12:35',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok'],
    content: 'Nuove strategie di visual storytelling per campagne B2B.',
    status: 'scheduled'
  },
  {
    id: 'post-3',
    date: '2026-09-28',
    time: '12:35',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Tutorial operativo su gestione multi-account.',
    status: 'scheduled'
  },
  {
    id: 'post-4',
    date: '2026-09-28',
    time: '14:00',
    type: 'STORY',
    platforms: ['facebook', 'instagram'],
    content: 'Dietro le quinte del nuovo piano di rilascio autunnale.',
    status: 'scheduled'
  },

  // Week 40 - Mar 29 Sep
  {
    id: 'post-5',
    date: '2026-09-29',
    time: '09:40',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Consigli per ottimizzare il workflow di pianificazione settimanale.',
    status: 'scheduled'
  },
  {
    id: 'post-6',
    date: '2026-09-29',
    time: '09:40',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok'],
    content: 'Come strutturare un piano editoriale coerente su 7 canali.',
    status: 'scheduled'
  },
  {
    id: 'post-7',
    date: '2026-09-29',
    time: '09:40',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Analisi dei formati con maggior retention organica.',
    status: 'scheduled'
  },
  {
    id: 'post-8',
    date: '2026-09-29',
    time: '14:00',
    type: 'STORY',
    platforms: ['facebook', 'instagram'],
    content: 'Sessione Q&A aperta sul nostro profilo ufficiale.',
    status: 'scheduled'
  },

  // Week 40 - Mer 30 Sep
  {
    id: 'post-9',
    date: '2026-09-30',
    time: '14:00',
    type: 'STORY',
    platforms: ['facebook', 'instagram'],
    content: 'Speciale Giornata del Podcast: i nostri consigli di ascolto.',
    status: 'scheduled'
  },

  // Week 40 - Ven 02 Oct
  {
    id: 'post-10',
    date: '2026-10-02',
    time: '09:32',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'threads'],
    content: 'Aggiornamento mensile: traguardi raggiunti e roadmap Q4.',
    status: 'scheduled'
  },

  // Week 41 - Lun 05 Oct
  {
    id: 'post-11',
    date: '2026-10-05',
    time: '10:00',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Strumenti pratici per il monitoraggio dei KPI social.',
    status: 'scheduled'
  },
  {
    id: 'post-12',
    date: '2026-10-05',
    time: '10:00',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads', 'linkedin'],
    content: 'L\'importanza della coerenza visiva nei post di brand.',
    status: 'scheduled'
  },

  // Week 41 - Mer 07 Oct
  {
    id: 'post-13',
    date: '2026-10-07',
    time: '10:00',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Metriche di engagement: cosa guardare davvero nei report.',
    status: 'scheduled'
  },
  {
    id: 'post-14',
    date: '2026-10-07',
    time: '10:00',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads', 'linkedin'],
    content: 'Giornata mondiale del sorriso: il potere dell\'empatia nella comunicazione.',
    status: 'scheduled'
  },

  // Week 42 - Lun 12 Oct
  {
    id: 'post-15',
    date: '2026-10-12',
    time: '12:45',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok', 'linkedin', 'youtube', 'threads'],
    content: 'Nuove funzionalità disponibili per il team di marketing.',
    status: 'scheduled'
  },

  // Week 42 - Mar 13 Oct
  {
    id: 'post-16',
    date: '2026-10-13',
    time: '11:53',
    type: 'FEED',
    platforms: ['linkedin', 'tiktok', 'facebook', 'instagram', 'threads', 'youtube'],
    content: 'Gestione del rischio digitale e sicurezza delle credenziali aziendali.',
    status: 'scheduled'
  },

  // Week 42 - Mer 14 Oct
  {
    id: 'post-17',
    date: '2026-10-14',
    time: '10:49',
    type: 'FEED',
    platforms: ['tiktok', 'instagram', 'facebook', 'threads', 'linkedin', 'youtube'],
    content: 'Normative e standard di qualità per la pubblicazione su larga scala.',
    status: 'scheduled'
  },

  // Week 42 - Gio 15 Oct
  {
    id: 'post-18',
    date: '2026-10-15',
    time: '10:14',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok'],
    content: 'Tips & Tricks per velocizzare la revisione con i clienti.',
    status: 'scheduled'
  },
  {
    id: 'post-19',
    date: '2026-10-15',
    time: '10:14',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Approfondimento tecnico sui formati video.',
    status: 'scheduled'
  },
  {
    id: 'post-20',
    date: '2026-10-15',
    time: '10:15',
    type: 'FEED',
    platforms: ['instagram'],
    content: 'Integrazione con canali terzi per sincronizzazione rapida.',
    status: 'scheduled'
  },
  {
    id: 'post-21',
    date: '2026-10-15',
    time: '10:15',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Checklist pre-lancio per le dirette streaming.',
    status: 'scheduled'
  },

  // Week 42 - Ven 16 Oct
  {
    id: 'post-22',
    date: '2026-10-16',
    time: '10:00',
    type: 'FEED',
    platforms: ['tiktok', 'linkedin', 'facebook', 'instagram', 'threads', 'youtube'],
    content: 'Strategie di content curation per professionisti della comunicazione.',
    status: 'scheduled'
  },

  // Week 42 - Sab 17 Oct
  {
    id: 'post-23',
    date: '2026-10-17',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Riflessioni del weekend: automazione ed equilibrio creativo.',
    status: 'scheduled'
  },
  {
    id: 'post-24',
    date: '2026-10-17',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Metriche e statistiche di riepilogo settimanale.',
    status: 'scheduled'
  },
  {
    id: 'post-25',
    date: '2026-10-17',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Aggiornamento librerie media e asset pronti.',
    status: 'scheduled'
  },
  {
    id: 'post-26',
    date: '2026-10-17',
    time: '10:30',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads', 'linkedin', 'youtube', 'tiktok'],
    content: 'Pianificazione in anticipo: come salvare 10 ore a settimana.',
    status: 'scheduled'
  },

  // Week 43 - Lun 19 Oct
  {
    id: 'post-27',
    date: '2026-10-19',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Nuovo ciclo di pubblicazione settimanale avviato con successo.',
    status: 'scheduled'
  },
  {
    id: 'post-28',
    date: '2026-10-19',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Ottimizzazione delle tempistiche di pubblicazione su TikTok.',
    status: 'scheduled'
  },
  {
    id: 'post-29',
    date: '2026-10-19',
    time: '10:30',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads'],
    content: 'Raffronto tra post statici e formati interattivi.',
    status: 'scheduled'
  },
  {
    id: 'post-30',
    date: '2026-10-19',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Migliori pratiche per i tag di localizzazione aziendale.',
    status: 'scheduled'
  },

  // Week 43 - Mer 21 Oct
  {
    id: 'post-31',
    date: '2026-10-21',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Analisi delle performance a metà mese.',
    status: 'scheduled'
  },
  {
    id: 'post-32',
    date: '2026-10-21',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Setup avanzato di prompt e integrazioni per i copywriter.',
    status: 'scheduled'
  },
  {
    id: 'post-33',
    date: '2026-10-21',
    time: '10:30',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads'],
    content: 'Distribuzione su larga scala senza perdite di risoluzione.',
    status: 'scheduled'
  },
  {
    id: 'post-34',
    date: '2026-10-21',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Nuovi trend e formati raccomandati per la settimana.',
    status: 'scheduled'
  },

  // Week 43 - Ven 23 Oct
  {
    id: 'post-35',
    date: '2026-10-23',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Chiusura delle attività editoriali del venerdì.',
    status: 'scheduled'
  },
  {
    id: 'post-36',
    date: '2026-10-23',
    time: '10:30',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads'],
    content: 'Sondaggio con la community: quali argomenti preferite?',
    status: 'scheduled'
  },
  {
    id: 'post-37',
    date: '2026-10-23',
    time: '10:30',
    type: 'FEED',
    platforms: ['tiktok'],
    content: 'Reportistica immediata condivisa con i clienti.',
    status: 'scheduled'
  },
  {
    id: 'post-38',
    date: '2026-10-23',
    time: '10:55',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads', 'linkedin', 'youtube', 'tiktok'],
    content: 'Weekend prep: tutto programmato e verificato.',
    status: 'scheduled'
  }
];

export const MCP_TOOLS_REGISTRY = [
  {
    name: 'schedule_post',
    description: 'Programma uno o più post su Facebook, Instagram, TikTok, LinkedIn, GMB, YouTube o Threads con data e ora.',
    parameters: ['platforms', 'content', 'media_urls', 'scheduled_time', 'first_comment']
  },
  {
    name: 'publish_now',
    description: 'Invia immediatamente un post ai canali social selezionati bypassando la coda temporale.',
    parameters: ['post_id', 'force_overwrite']
  },
  {
    name: 'get_calendar',
    description: 'Estrae tutti i post schedulati per un intervallo di date filtrando per progetto e stato.',
    parameters: ['project_id', 'start_date', 'end_date']
  },
  {
    name: 'get_social_accounts',
    description: 'Verifica lo stato di connessione e la validità dei token per tutti i 7 social abilitati.',
    parameters: ['project_id']
  }
];
