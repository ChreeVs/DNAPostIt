// Completely clean initial data - zero placeholder projects
export const INITIAL_PROJECTS = [];

// Completely clean - zero placeholder channels
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
