export const INITIAL_PROJECTS = [
  {
    id: 'proj-broker',
    name: 'Broker',
    slug: 'broker',
    description: 'Gestione canali assicurativi e finanziari Broker.',
    avatar: 'BRK',
    color: '#eab308',
    activeChannels: ['facebook', 'linkedin', 'instagram'],
    createdAt: '2026-09-15'
  },
  {
    id: 'proj-dna',
    name: 'DNA Creative',
    slug: 'dna-creative',
    description: 'Workspace creativo, produzioni video e brand identity.',
    avatar: 'DNA',
    color: '#10b981',
    activeChannels: ['instagram', 'tiktok', 'youtube', 'threads'],
    createdAt: '2026-09-20'
  },
  {
    id: 'proj-paa',
    name: 'PAA',
    slug: 'paa',
    description: 'Campagne social e comunicazione integrata PAA.',
    avatar: 'PAA',
    color: '#f97316',
    activeChannels: ['facebook', 'instagram', 'linkedin', 'threads'],
    createdAt: '2026-10-01'
  },
  {
    id: 'proj-par',
    name: 'PAR',
    slug: 'par',
    description: 'Pianificazione editoriale e annunci istituzionali PAR.',
    avatar: 'PAR',
    color: '#ea580c',
    activeChannels: ['facebook', 'linkedin', 'gmb'],
    createdAt: '2026-10-05'
  },
  {
    id: 'proj-riviera',
    name: 'RivieraRent',
    slug: 'rivierarent',
    description: 'Flotta veicoli, noleggio e promozioni territoriali.',
    avatar: 'RIV',
    color: '#eab308',
    activeChannels: ['facebook', 'instagram', 'tiktok'],
    createdAt: '2026-10-10'
  },
  {
    id: 'proj-sante',
    name: 'Sante Vassallo',
    slug: 'sante-vassallo',
    description: 'Canale personale e divulgazione professionale.',
    avatar: 'SV',
    color: '#64748b',
    activeChannels: ['linkedin', 'youtube', 'facebook'],
    createdAt: '2026-10-12'
  },
  {
    id: 'proj-scarabocchi',
    name: 'Scarabocchi Sagaci',
    slug: 'scarabocchi-sagaci',
    description: 'Pubblicazione quotidiana vignette, reel e strisce satiriche.',
    avatar: 'SS',
    color: '#8b5cf6',
    activeChannels: ['facebook', 'instagram', 'tiktok', 'threads', 'youtube'],
    createdAt: '2026-09-01'
  }
];

export const INITIAL_CHANNELS = [
  {
    id: 'ch-fb-paa',
    projectId: 'proj-paa',
    projectName: 'PAA',
    platform: 'facebook',
    name: 'Facebook Pages',
    handle: '@paa.official',
    count: 3605,
    color: '#1877f2',
    connected: true,
    active: true,
    expiresInDays: 48,
    expiryDate: '2026-12-14',
    scopes: ['pages_manage_posts', 'pages_read_engagement'],
    lastSync: 'Oggi 10:15'
  },
  {
    id: 'ch-ig-paa',
    projectId: 'proj-paa',
    projectName: 'PAA',
    platform: 'instagram',
    name: 'Instagram Business',
    handle: '@paa_italia',
    count: 1227,
    color: '#e1306c',
    connected: true,
    active: true,
    expiresInDays: 7, // in scadenza!
    expiryDate: '2026-11-03',
    scopes: ['instagram_basic', 'instagram_content_publish'],
    lastSync: 'Oggi 10:15'
  },
  {
    id: 'ch-tt-dna',
    projectId: 'proj-dna',
    projectName: 'DNA Creative',
    platform: 'tiktok',
    name: 'TikTok Creator Hub',
    handle: '@dnacreative',
    count: 197,
    color: '#111827',
    connected: true,
    active: true,
    expiresInDays: 52,
    expiryDate: '2026-12-18',
    scopes: ['video.upload', 'video.publish'],
    lastSync: 'Ieri 18:40'
  },
  {
    id: 'ch-yt-scarabocchi',
    projectId: 'proj-scarabocchi',
    projectName: 'Scarabocchi Sagaci',
    platform: 'youtube',
    name: 'YouTube Shorts',
    handle: 'Scarabocchi Sagaci Official',
    count: 36,
    color: '#ff0000',
    connected: true,
    active: true,
    expiresInDays: -2, // scaduto!
    expiryDate: '2026-10-25',
    scopes: ['youtube.upload', 'youtube.readonly'],
    lastSync: '3 giorni fa'
  },
  {
    id: 'ch-li-broker',
    projectId: 'proj-broker',
    projectName: 'Broker',
    platform: 'linkedin',
    name: 'LinkedIn Company',
    handle: 'Broker Consulting srl',
    count: 420,
    color: '#0a66c2',
    connected: true,
    active: true,
    expiresInDays: 3, // in scadenza!
    expiryDate: '2026-10-30',
    scopes: ['w_member_social', 'r_organization_social'],
    lastSync: 'Oggi 09:30'
  },
  {
    id: 'ch-th-scarabocchi',
    projectId: 'proj-scarabocchi',
    projectName: 'Scarabocchi Sagaci',
    platform: 'threads',
    name: 'Threads Profile',
    handle: '@scarabocchisagaci',
    count: 84,
    color: '#111827',
    connected: true,
    active: true,
    expiresInDays: 35,
    expiryDate: '2026-12-01',
    scopes: ['threads_basic', 'threads_content_publish'],
    lastSync: 'Oggi 08:00'
  },
  {
    id: 'ch-gmb-par',
    projectId: 'proj-par',
    projectName: 'PAR',
    platform: 'gmb',
    name: 'Google Business Profile',
    handle: 'PAR Sede Operativa',
    count: 512,
    color: '#4285f4',
    connected: true,
    active: true,
    expiresInDays: 60,
    expiryDate: '2026-12-26',
    scopes: ['business.manage'],
    lastSync: 'Ieri 12:00'
  }
];

export const OBSERVANCE_DAYS = {
  '2026-10-03': ["Giornata mondiale dell'habitat"],
  '2026-10-04': ['Giornata mondiale degli animali', 'Settimana mondiale dello spazio'],
  '2026-10-10': ['Giornata mondiale del senzatetto', 'Giornata mondiale del porridge', 'Giornata mondiale della salute mentale'],
  '2026-10-11': ['Giornata internazionale delle giovani ragazze', 'Giornata internazionale del coming out']
};

// Initial posts showing how content from all projects is consolidated in the Home Calendar
export const INITIAL_POSTS = [
  // Scarabocchi Sagaci recurring morning cartoon
  {
    id: 'post-ss-1',
    projectId: 'proj-scarabocchi',
    projectName: 'Scarabocchi Sagaci',
    projectColor: '#8b5cf6',
    date: '2026-09-28',
    time: '07:00',
    type: 'FEED',
    platforms: ['facebook'],
    content: 'Striscia del lunedi: quando il caffe incontra la riunione delle 8.',
    status: 'scheduled'
  },
  {
    id: 'post-ss-2',
    projectId: 'proj-scarabocchi',
    projectName: 'Scarabocchi Sagaci',
    projectColor: '#8b5cf6',
    date: '2026-09-28',
    time: '07:00',
    type: 'REEL',
    platforms: ['instagram', 'tiktok'],
    content: 'Reel animato: il dietro le quinte del processo di inchiostrazione.',
    status: 'scheduled'
  },
  {
    id: 'post-riv-1',
    projectId: 'proj-riviera',
    projectName: 'RivieraRent',
    projectColor: '#eab308',
    date: '2026-09-28',
    time: '08:47',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok'],
    content: 'Offerte weekend sulla costa ligure: flotta ibrida ed elettrica pronta alla consegna.',
    status: 'scheduled'
  },
  {
    id: 'post-brk-1',
    projectId: 'proj-broker',
    projectName: 'Broker',
    projectColor: '#eab308',
    date: '2026-09-28',
    time: '09:08',
    type: 'FEED',
    platforms: ['linkedin', 'facebook'],
    content: 'Report trimestrale sull andamento dei tassi e coperture per il settore trasporti.',
    status: 'scheduled'
  },
  // Martedì 29 Sep
  {
    id: 'post-ss-3',
    projectId: 'proj-scarabocchi',
    projectName: 'Scarabocchi Sagaci',
    projectColor: '#8b5cf6',
    date: '2026-09-29',
    time: '07:00',
    type: 'FEED',
    platforms: ['facebook'],
    content: 'Scena 2: Le peripezie dell ufficio vendite.',
    status: 'scheduled'
  },
  {
    id: 'post-paa-1',
    projectId: 'proj-paa',
    projectName: 'PAA',
    projectColor: '#f97316',
    date: '2026-09-29',
    time: '08:31',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'linkedin', 'threads'],
    content: 'Nuovo comunicato PAA: integrazione delle linee guida sulla transizione ecologica.',
    status: 'scheduled'
  },
  {
    id: 'post-paa-2',
    projectId: 'proj-paa',
    projectName: 'PAA',
    projectColor: '#f97316',
    date: '2026-09-29',
    time: '09:40',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'threads'],
    content: 'Presentazione del gruppo di lavoro PAA 2026/2027.',
    status: 'scheduled'
  },
  // Mercoledì 30 Sep
  {
    id: 'post-par-1',
    projectId: 'proj-par',
    projectName: 'PAR',
    projectColor: '#ea580c',
    date: '2026-09-30',
    time: '10:50',
    type: 'FEED',
    platforms: ['facebook', 'linkedin', 'gmb'],
    content: 'Apertura sportello telematico PAR: novita e modalita di accesso diretto.',
    status: 'scheduled'
  },
  {
    id: 'post-paa-3',
    projectId: 'proj-paa',
    projectName: 'PAA',
    projectColor: '#f97316',
    date: '2026-09-30',
    time: '14:00',
    type: 'STORY',
    platforms: ['instagram', 'facebook'],
    content: 'Q&A in diretta con i coordinatori dei comitati territoriali.',
    status: 'scheduled'
  },
  // Giovedì 1 Ottobre
  {
    id: 'post-sv-1',
    projectId: 'proj-sante',
    projectName: 'Sante Vassallo',
    projectColor: '#64748b',
    date: '2026-10-01',
    time: '09:30',
    type: 'FEED',
    platforms: ['linkedin', 'youtube'],
    content: 'La gestione strategica della supply chain in contesti di volatilita economica.',
    status: 'scheduled'
  },
  {
    id: 'post-sv-2',
    projectId: 'proj-sante',
    projectName: 'Sante Vassallo',
    projectColor: '#64748b',
    date: '2026-10-01',
    time: '11:09',
    type: 'FEED',
    platforms: ['linkedin'],
    content: 'Analisi comparata sulle metodologie lean e automazione predittiva.',
    status: 'scheduled'
  },
  // Venerdì 2 Ottobre
  {
    id: 'post-riv-2',
    projectId: 'proj-riviera',
    projectName: 'RivieraRent',
    projectColor: '#eab308',
    date: '2026-10-02',
    time: '08:33',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'tiktok'],
    content: 'Promozioni d autunno: tariffe agevolate per noleggi a medio termine per PMI.',
    status: 'scheduled'
  },
  {
    id: 'post-paa-4',
    projectId: 'proj-paa',
    projectName: 'PAA',
    projectColor: '#f97316',
    date: '2026-10-02',
    time: '08:31',
    type: 'FEED',
    platforms: ['facebook', 'instagram', 'linkedin', 'threads'],
    content: 'Riepilogo delle attivita della settimana e calendario dei webinar di ottobre.',
    status: 'scheduled'
  }
];

export const MCP_TOOLS_REGISTRY = [
  {
    name: 'schedule_post',
    description: 'Programma uno o piu post su Facebook, Instagram, TikTok, LinkedIn, GMB, YouTube o Threads con data e ora.',
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
    description: 'Verifica lo stato di connessione e la validita dei token per tutti i 7 social abilitati.',
    parameters: ['project_id']
  }
];
