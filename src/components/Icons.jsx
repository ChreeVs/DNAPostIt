import React from 'react';

// Pubblie speech bubble logo
export const PubblieLogo = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="url(#violet-grad)" />
    <path
      d="M18 9C13.03 9 9 13.03 9 18C9 20.12 9.74 22.07 10.97 23.61L9.5 27L13.1 25.68C14.54 26.52 16.21 27 18 27C22.97 27 27 22.97 27 18C27 13.03 22.97 9 18 9Z"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="18" r="3.5" fill="#ffffff" />
    <defs>
      <linearGradient id="violet-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8b5cf6" />
        <stop stopColor="#6d28d9" />
      </linearGradient>
    </defs>
  </svg>
);

// SOCIAL PLATFORMS ICONS
export const FacebookIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const InstagramIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TikTokIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.74 4.54 6.27 6.27 0 0 0 1.95-4.57V8.5a8.27 8.27 0 0 0 4.76 1.48V6.78a4.84 4.84 0 0 1-1-.09z"/>
  </svg>
);

export const YouTubeIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const LinkedInIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
  </svg>
);

export const ThreadsIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.643 0 11.956 5.176 12.186 11.734h-2.912c-.223-4.965-4.309-8.91-9.274-8.91-5.129 0-9.274 4.145-9.274 9.274 0 5.13 4.145 9.274 9.274 9.274 3.738 0 6.946-2.228 8.358-5.452l-2.617-1.077c-.987 2.274-3.237 3.829-5.741 3.829-3.513 0-6.362-2.849-6.362-6.362 0-3.513 2.849-6.362 6.362-6.362 2.78 0 5.155 1.785 6.027 4.316h-6.027v2.912h9.196c.036-.454.056-.913.056-1.378 0-6.719-5.467-12.186-12.186-12.186z"/>
  </svg>
);

export const GoogleBusinessIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" />
    <polyline points="9 22 9 12 15 12 15 22" strokeWidth="2" />
  </svg>
);

// SIDEBAR EXACT PUBBLIE ICONS
export const PencilIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ContentIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="4" y1="6" x2="20" y2="6" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="18" x2="14" y2="18" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CalendarIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
  </svg>
);

export const Grid3x3Icon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
  </svg>
);

export const ChatBubbleIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LinkChainIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IntegrationsIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AnalyticsIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UsersGroupIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" />
    <circle cx="9" cy="7" r="4" strokeWidth="2" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" />
  </svg>
);

export const HashGridIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="4" y1="9" x2="20" y2="9" strokeWidth="2" />
    <line x1="4" y1="15" x2="20" y2="15" strokeWidth="2" />
    <line x1="10" y1="3" x2="8" y2="21" strokeWidth="2" />
    <line x1="16" y1="3" x2="14" y2="21" strokeWidth="2" />
  </svg>
);

export const SlidersIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="4" y1="21" x2="4" y2="14" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="10" x2="4" y2="3" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="21" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="8" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="21" x2="20" y2="16" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="12" x2="20" y2="3" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="14" x2="7" y2="14" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="8" x2="15" y2="8" strokeWidth="2" strokeLinecap="round" />
    <line x1="17" y1="16" x2="23" y2="16" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FolderIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeWidth="2" />
  </svg>
);

export const HelpCircleIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const PhoneIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeftIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDownIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const XIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ClockIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const UploadIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HeartIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" />
  </svg>
);

export const MessageSquareIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BookmarkIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeWidth="2" />
  </svg>
);

export const ShareIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="18" cy="5" r="3" strokeWidth="2" />
    <circle cx="6" cy="12" r="3" strokeWidth="2" />
    <circle cx="18" cy="19" r="3" strokeWidth="2" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" strokeWidth="2" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" strokeWidth="2" />
  </svg>
);

export const RefreshIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="23 4 23 10 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="1 20 1 14 7 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SparklesIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BotIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="11" width="18" height="10" rx="2" strokeWidth="2" />
    <circle cx="12" cy="5" r="2" strokeWidth="2" />
    <path d="M12 7v4" strokeWidth="2" />
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ServerIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" strokeWidth="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" strokeWidth="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SettingsIcon = ({ className = "svg-icon" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="3" strokeWidth="2" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" strokeWidth="2" />
  </svg>
);

