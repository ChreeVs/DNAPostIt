import React from 'react';
import {
  DnaPostItLogo,
  PencilIcon,
  ContentIcon,
  CalendarIcon,
  Grid3x3Icon,
  ChatBubbleIcon,
  LinkChainIcon,
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
  onOpenComposer,
  currentProject
}) {
  return (
    <aside className="pubblie-sidebar">
      {/* Brand Header */}
      <div className="pubblie-sidebar-header">
        <div className="pubblie-logo-row" style={{ cursor: 'pointer' }} onClick={() => setActiveView('calendar')}>
          <img
            src="/logo.png"
            alt="DNA PostIt"
            style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
            onError={(e) => {
              // fallback to SVG if image not yet loaded
              e.target.style.display = 'none';
            }}
          />
          <DnaPostItLogo className="pubblie-logo-svg" style={{ width: '32px', height: '32px' }} />
          <span className="pubblie-brand-name" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>
            DNA PostIt
          </span>
        </div>

        {/* Torna alla home */}
        <div className="pubblie-back-home" onClick={() => setActiveView('calendar')}>
          <ChevronLeftIcon className="svg-icon-sm" />
          <span>TORNA ALLA HOME</span>
        </div>

        {/* Current Active Project Pill */}
        <div
          className="pubblie-active-project-pill"
          onClick={() => setActiveView('projects')}
          title="Clicca per cambiare o gestire i progetti"
          style={{ cursor: 'pointer' }}
        >
          <span
            className="project-orange-dot"
            style={{ backgroundColor: currentProject ? currentProject.color : 'var(--primary-granata)' }}
          />
          <span className="project-title-text">
            {currentProject ? currentProject.name : 'PAA'}
          </span>
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
          className={`pubblie-nav-item ${activeView === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveView('calendar')}
        >
          <CalendarIcon className="svg-icon" />
          <span>Calendario</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'contents' ? 'active' : ''}`}
          onClick={() => setActiveView('contents')}
        >
          <ContentIcon className="svg-icon" />
          <span>Contenuti</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'igfeed' ? 'active' : ''}`}
          onClick={() => setActiveView('igfeed')}
        >
          <Grid3x3Icon className="svg-icon" />
          <span>IG Feed</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'channels' ? 'active' : ''}`}
          onClick={() => setActiveView('channels')}
        >
          <LinkChainIcon className="svg-icon" />
          <span>Canali Social</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveView('projects')}
        >
          <FolderIcon className="svg-icon" />
          <span>Progetti</span>
        </div>

        <div
          className={`pubblie-nav-item ${activeView === 'comments' ? 'active' : ''}`}
          onClick={() => setActiveView('comments')}
        >
          <ChatBubbleIcon className="svg-icon" />
          <span>Commenti</span>
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
          className={`pubblie-nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <SlidersIcon className="svg-icon" />
          <span>Impostazioni</span>
        </div>

        {/* Shortcut to switch project */}
        <div
          className={`pubblie-nav-item folder-item ${activeView === 'projects' ? 'active' : ''}`}
          style={{ marginTop: '16px' }}
          onClick={() => setActiveView('projects')}
        >
          <FolderIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
          <span>Tutti i progetti</span>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="pubblie-sidebar-footer">
        <div className="pubblie-footer-link" onClick={() => setActiveView('settings')}>
          <HelpCircleIcon className="svg-icon-sm" />
          <span>Guida & MCP</span>
        </div>
        <div className="pubblie-footer-link">
          <PhoneIcon className="svg-icon-sm" />
          <span>Assistenza</span>
        </div>
      </div>
    </aside>
  );
}
