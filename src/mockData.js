export const INITIAL_PROJECTS = [
  { id: 'proj-1', name: 'DNA Agency Brand', avatar: 'DA' },
  { id: 'proj-2', name: 'TechLab Internal', avatar: 'TL' },
  { id: 'proj-3', name: 'E-Commerce Growth', avatar: 'EG' }
];

export const INITIAL_CHANNELS = [
  {
    id: 'ch-instagram',
    platform: 'instagram',
    name: 'Instagram Business',
    handle: '@dna.agency.official',
    status: 'connected',
    tokenExpiresDays: 48,
    followers: '24.8K',
    color: '#e1306c'
  },
  {
    id: 'ch-facebook',
    platform: 'facebook',
    name: 'Pagina Ufficiale Facebook',
    handle: 'DNA Digital Agency',
    status: 'connected',
    tokenExpiresDays: 52,
    followers: '14.2K',
    color: '#1877f2'
  },
  {
    id: 'ch-linkedin',
    platform: 'linkedin',
    name: 'LinkedIn Company Page',
    handle: 'DNA PostIt Solutions',
    status: 'connected',
    tokenExpiresDays: 41,
    followers: '8.9K',
    color: '#0a66c2'
  },
  {
    id: 'ch-tiktok',
    platform: 'tiktok',
    name: 'TikTok Business',
    handle: '@dnatech_official',
    status: 'connected',
    tokenExpiresDays: 86,
    followers: '45.1K',
    color: '#00f2fe'
  },
  {
    id: 'ch-youtube',
    platform: 'youtube',
    name: 'YouTube Shorts & Channel',
    handle: 'DNA Tech Hub',
    status: 'connected',
    tokenExpiresDays: 120,
    followers: '19.4K',
    color: '#ff0000'
  },
  {
    id: 'ch-threads',
    platform: 'threads',
    name: 'Threads Profile',
    handle: '@dna.agency.official',
    status: 'connected',
    tokenExpiresDays: 50,
    followers: '6.2K',
    color: '#ffffff'
  },
  {
    id: 'ch-gmb',
    platform: 'gmb',
    name: 'Google Business Profile',
    handle: 'DNA Agency Headquarters',
    status: 'connected',
    tokenExpiresDays: 90,
    followers: '4.9 Rating',
    color: '#4285f4'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-101',
    projectId: 'proj-1',
    channel: 'instagram',
    platforms: ['instagram', 'facebook', 'threads'],
    content: "L'architettura del software moderno richiede un approccio modulare e scalabile. Oggi analizziamo come i sistemi ad agenti autonomi riducono del 60% il carico operativo sui team di marketing e sviluppo.\n\nScorri le slide del carosello per approfondire l'analisi architetturale.\n\n#SoftwareArchitecture #TechStrategy #AgenticAI",
    mediaType: 'carousel',
    mediaUrls: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    ],
    scheduledDate: '2026-10-28T10:30:00',
    status: 'scheduled',
    firstComment: 'Trovi il whitepaper tecnico sul nostro portale di documentazione.'
  },
  {
    id: 'post-102',
    projectId: 'proj-1',
    channel: 'linkedin',
    platforms: ['linkedin'],
    content: "Ottimizzazione delle code distribuite con Redis e BullMQ: come gestire 10.000 job concorrenti senza intaccare la latenza del server.\n\nEcco i 3 parametri di tuning indispensabili per ambienti dedicati:\n1. Concurrency limit per worker pool\n2. Exponential backoff retry con jitter\n3. Memory eviction policy con noeviction su cluster persistenti.\n\nCondividi le tue best practice nei commenti.",
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80'
    ],
    scheduledDate: '2026-10-29T14:15:00',
    status: 'scheduled',
    firstComment: 'Approfondimento completo su GitHub.'
  },
  {
    id: 'post-103',
    projectId: 'proj-1',
    channel: 'tiktok',
    platforms: ['tiktok', 'youtube'],
    content: "Quick walkthrough del nostro Carousel Splitter engine. Da un'immagine panoramica 3240x1350 a un carosello Instagram perfetto in 1 click. Zero compressione artifacts. #CodingTutorial #DevOps #SMMTools",
    mediaType: 'video',
    mediaUrls: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80'
    ],
    scheduledDate: '2026-10-30T18:00:00',
    status: 'scheduled',
    firstComment: null
  },
  {
    id: 'post-104',
    projectId: 'proj-1',
    channel: 'gmb',
    platforms: ['gmb'],
    content: "Aperte le candidature per il nuovo workshop tecnico su integrazione Model Context Protocol (MCP) e orchestrazione microservizi. Partecipazione in sede oppure online.",
    mediaType: 'image',
    mediaUrls: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80'
    ],
    scheduledDate: '2026-10-27T16:00:00',
    status: 'published',
    firstComment: null
  }
];

export const INITIAL_MEDIA_LIBRARY = [
  {
    id: 'media-01',
    filename: 'banner-panoramico-architettura.jpg',
    s3Key: 'uploads/2026/10/banner-panoramico-architettura.jpg',
    cdnUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    size: '2.4 MB',
    dimensions: '3240x1350',
    type: 'image',
    uploadedAt: '27 Ott 2026, 08:30'
  },
  {
    id: 'media-02',
    filename: 'server-datacenter-setup.jpg',
    s3Key: 'uploads/2026/10/server-datacenter-setup.jpg',
    cdnUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    size: '1.8 MB',
    dimensions: '1920x1080',
    type: 'image',
    uploadedAt: '26 Ott 2026, 17:10'
  },
  {
    id: 'media-03',
    filename: 'demo-pipeline-terminal.mp4',
    s3Key: 'uploads/2026/10/demo-pipeline-terminal.mp4',
    cdnUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    size: '14.2 MB',
    dimensions: '1080x1920',
    type: 'video',
    uploadedAt: '25 Ott 2026, 11:45'
  },
  {
    id: 'media-04',
    filename: 'meeting-room-briefing.jpg',
    s3Key: 'uploads/2026/10/meeting-room-briefing.jpg',
    cdnUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    size: '3.1 MB',
    dimensions: '2048x1365',
    type: 'image',
    uploadedAt: '24 Ott 2026, 09:20'
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
    name: 'split_carousel',
    description: 'Scompone un asset panoramico orizzontale in un array di slide carosello conformi 4:5 o 1:1.',
    parameters: ['source_image_url', 'slices_count', 'aspect_ratio']
  },
  {
    name: 'get_social_accounts',
    description: 'Verifica lo stato di connessione e la validità dei token per tutti i 7 social abilitati.',
    parameters: ['project_id']
  }
];
