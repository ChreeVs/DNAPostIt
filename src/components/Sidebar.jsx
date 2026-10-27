import React from 'react';
import {
  PubblieLogo,
  PencilIcon,
  ContentIcon,
  CalendarIcon,
  Grid3x3Icon,
  ChatBubbleIcon,
  LinkChainIcon,
  IntegrationsIcon,
  AnalyticsIcon,
  UsersGroupIcon,
  HashGridIcon,
  SlidersIcon,
  FolderIcon,
  HelpCircleIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronDownIcon
} from './Icons';

export default function Sidebar({
  activeView,
  setActiveView,
  onOpenComposer
}) {
  return (
    <aside className="pubblie-sidebar">
      {/* Brand Header */}
      <div className="pubblie-sidebar-header">
        <div className="pubblie-logo-row">
          <PubblieLogo className="pubblie-logo-svg" />
          <span className="pubblie-brand-name">Pubblie</span>
        </div>

        {/* Torna alla home */}
        <div className="pubblie-back-home" onClick={() => setActiveView('calendar')}>
          <ChevronLeftIcon className="svg-icon-sm" />
          <span>TORNA ALLA HOME</span>
        </div>

        {/* Current Project Tag */}
        <div className="pubblie-active-project-pill">
          <span className="project-orange-dot" />
          <span className="project-title-text">PAA</span>
        </div>
      </div>

      {/* Main Nav Items */}
      <nav className="pubblie-nav-list">
        <div
          className="pubblie-nav-item create-action"
          onClick={onOpenComposer}
        >
          <PencilIcon className="svg-icon" />
          <span>Crea un nuovo post</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'contents' ? 'active' : ''}`}
          onClick={() => setActiveView('contents')}
        >
          <ContentIcon className="svg-icon" />
          <span>Contenuti</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveView('calendar')}
        >
          <CalendarIcon className="svg-icon" />
          <span>Calendario</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'igfeed' ? 'active' : ''}`}
          onClick={() => setActiveView('igfeed')}
        >
          <Grid3x3Icon className="svg-icon" />
          <span>IG Feed</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveView('comments')}
        >
          <ChatBubbleIcon className="svg-icon" />
          <span>Commenti</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'channels' ? 'active' : ''}`}
          onClick={() => setActiveView('channels')}
        >
          <LinkChainIcon className="svg-icon" />
          <span>Canali</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'integrations' ? 'active' : ''}`}
          onClick={() => setActiveView('integrations')}
        >
          <IntegrationsIcon className="svg-icon" />
          <span>Integrazioni (MCP & S3)</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          <AnalyticsIcon className="svg-icon" />
          <span>Analytics</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'team' ? 'active' : ''}`}
          onClick={() => setActiveView('team')}
        >
          <UsersGroupIcon className="svg-icon" />
          <span>Team</span>
        </div>

        <div
          className="pubblie-nav-item dropdown-toggle"
          onClick={() => {}}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <HashGridIcon className="svg-icon" />
            <span>Varie</span>
          </div>
          <ChevronDownIcon className="svg-icon-sm" />
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <SlidersIcon className="svg-icon" />
          <span>Impostazioni</span>
        </div>

        {/* Vedi tutti i progetti */}
        <div className="pubblie-nav-item folder-item" style={{ marginTop: '16px' }}>
          <FolderIcon className="svg-icon" style={{ color: '#d97706' }} />
          <span>Vedi tutti i progetti</span>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="pubblie-sidebar-footer">
        <div className="pubblie-footer-link">
          <HelpCircleIcon className="svg-icon-sm" />
          <span>Aiuto</span>
        </div>
        <div className="pubblie-footer-link">
          <PhoneIcon className="svg-icon-sm" />
          <span>Assistenza</span>
        </div>
      </div>
    </aside>
  );
}
