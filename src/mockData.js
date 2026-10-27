export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'PAA Communication',
    slug: 'paa-communication',
    description: 'Gestione canali editoriali e campagne social PAA.',
    avatar: 'PAA',
    color: '#800020',
    activeChannels: ['facebook', 'instagram', 'linkedin', 'tiktok'],
    createdAt: '2026-10-01'
  },
  {
    id: 'proj-2',
    name: 'DNA PostIt Hub',
    slug: 'dna-postit-hub',
    description: 'Workspace principale per distribuzione multicanale e automazione MCP.',
    avatar: 'DNA',
    color: '#9e1b32',
    activeChannels: ['facebook', 'instagram', 'youtube', 'threads', 'gmb'],
    createdAt: '2026-10-10'
  }
];

export const INITIAL_CHANNELS = [
  {
    id: 'ch-facebook',
    platform: 'facebook',
    name: 'Facebook Pages',
    handle: '@dnapostit.it',
    count: 3605,
    color: '#1877f2',
    connected: true,
    active: true,
    lastSync: 'Oggi 10:15'
  },
  {
    id: 'ch-instagram',
    platform: 'instagram',
    name: 'Instagram Business',
    handle: '@dna_postit_official',
    count: 1227,
    color: '#e1306c',
    connected: true,
    active: true,
    lastSync: 'Oggi 10:15'
  },
  {
    id: 'ch-tiktok',
    platform: 'tiktok',
    name: 'TikTok Creator Hub',
    handle: '@dnapostit',
    count: 197,
    color: '#111827',
    connected: true,
    active: true,
    lastSync: 'Ieri 18:40'
  },
  {
    id: 'ch-youtube',
    platform: 'youtube',
    name: 'YouTube Shorts & Video',
    handle: 'DNA PostIt Official',
    count: 36,
    color: '#ff0000',
    connected: true,
    active: true,
    lastSync: 'Ieri 16:20'
  },
  {
    id: 'ch-linkedin',
    platform: 'linkedin',
    name: 'LinkedIn Company Page',
    handle: 'DNA PostIt srl',
    count: 15,
    color: '#0a66c2',
    connected: true,
    active: true,
    lastSync: 'Oggi 09:30'
  },
  {
    id: 'ch-threads',
    platform: 'threads',
    name: 'Threads Profile',
    handle: '@dna_postit_official',
    count: 84,
    color: '#111827',
    connected: true,
    active: true,
    lastSync: 'Oggi 08:00'
  },
  {
    id: 'ch-gmb',
    platform: 'gmb',
    name: 'Google Business Profile',
    handle: 'Sede Principale',
    count: 0,
    color: '#4285f4',
    connected: false,
    active: false,
    lastSync: 'Non collegato'
  }
];

export const OBSERVANCE_DAYS = {};

// Clean initial posts - zero placeholder screenshot posts as requested by the user
export const INITIAL_POSTS = [];

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
