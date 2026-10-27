export const INITIAL_PROJECTS = [
  {
    id: 'proj-broker',
    name: 'Broker',
    slug: 'broker',
    description: 'Workspace Broker.',
    avatar: 'BRK',
    color: '#eab308',
    activeChannels: [],
    createdAt: '2026-09-15'
  },
  {
    id: 'proj-dna',
    name: 'DNA Creative',
    slug: 'dna-creative',
    description: 'Workspace creativo DNA.',
    avatar: 'DNA',
    color: '#10b981',
    activeChannels: [],
    createdAt: '2026-09-20'
  },
  {
    id: 'proj-paa',
    name: 'PAA',
    slug: 'paa',
    description: 'Workspace PAA.',
    avatar: 'PAA',
    color: '#f97316',
    activeChannels: [],
    createdAt: '2026-10-01'
  },
  {
    id: 'proj-par',
    name: 'PAR',
    slug: 'par',
    description: 'Workspace PAR.',
    avatar: 'PAR',
    color: '#ea580c',
    activeChannels: [],
    createdAt: '2026-10-05'
  },
  {
    id: 'proj-riviera',
    name: 'RivieraRent',
    slug: 'rivierarent',
    description: 'Workspace RivieraRent.',
    avatar: 'RIV',
    color: '#eab308',
    activeChannels: [],
    createdAt: '2026-10-10'
  },
  {
    id: 'proj-sante',
    name: 'Sante Vassallo',
    slug: 'sante-vassallo',
    description: 'Workspace Sante Vassallo.',
    avatar: 'SV',
    color: '#64748b',
    activeChannels: [],
    createdAt: '2026-10-12'
  },
  {
    id: 'proj-scarabocchi',
    name: 'Scarabocchi Sagaci',
    slug: 'scarabocchi-sagaci',
    description: 'Workspace Scarabocchi Sagaci.',
    avatar: 'SS',
    color: '#8b5cf6',
    activeChannels: [],
    createdAt: '2026-09-01'
  }
];

// Completely clean - zero placeholder channels as requested
export const INITIAL_CHANNELS = [];

export const OBSERVANCE_DAYS = {};

// Completely clean - zero placeholder posts
export const INITIAL_POSTS = [];

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
