import React from 'react';
import {
  LogoIcon,
  CalendarIcon,
  PlusIcon,
  ScissorsIcon,
  LayersIcon,
  ImageIcon,
  BotIcon,
  ServerIcon,
  SettingsIcon,
  ChevronDownIcon
} from './Icons';

export default function Sidebar({
  activeView,
  setActiveView,
  onOpenComposer,
  projects,
  currentProject,
  setCurrentProject,
  postsCount
}) {
  return (
    <aside className="sidebar">
      {/* Header & Brand */}
      <div className="sidebar-header">
        <div className="brand-container">
          <div className="brand-logo">
            <LogoIcon className="svg-icon" />
          </div>
          <div>
            <div className="brand-title">
              DNA<span>PostIt</span>
              <span className="brand-badge">STUDIO</span>
            </div>
          </div>
        </div>

        {/* Project Selector */}
        <div className="project-selector" title="Cambia Spazio di Lavoro">
          <div className="project-info">
            <div className="project-avatar">{currentProject.avatar}</div>
            <div className="project-name">{currentProject.name}</div>
          </div>
          <ChevronDownIcon className="svg-icon-sm" />
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="action-btn-container">
        <button className="btn-create-post" onClick={onOpenComposer}>
          <PlusIcon className="svg-icon" />
          <span>Crea Nuovo Post</span>
        </button>
      </div>

      {/* Nav Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">Pianificazione</div>

        <div
          className={`nav-item ${activeView === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveView('calendar')}
        >
          <div className="nav-item-content">
            <CalendarIcon className="svg-icon nav-icon" />
            <span>Calendario</span>
          </div>
          <span className="nav-badge active-glow">{postsCount}</span>
        </div>

        <div
          className={`nav-item ${activeView === 'splitter' ? 'active' : ''}`}
          onClick={() => setActiveView('splitter')}
        >
          <div className="nav-item-content">
            <ScissorsIcon className="svg-icon nav-icon" />
            <span>Carousel Splitter</span>
          </div>
          <span className="nav-badge">4:5 / 1:1</span>
        </div>

        <div
          className={`nav-item ${activeView === 'media' ? 'active' : ''}`}
          onClick={() => setActiveView('media')}
        >
          <div className="nav-item-content">
            <ImageIcon className="svg-icon nav-icon" />
            <span>Libreria Media (S3)</span>
          </div>
        </div>

        <div className="nav-section-title">Canali & Agenti</div>

        <div
          className={`nav-item ${activeView === 'channels' ? 'active' : ''}`}
          onClick={() => setActiveView('channels')}
        >
          <div className="nav-item-content">
            <LayersIcon className="svg-icon nav-icon" />
            <span>Canali Social</span>
          </div>
          <span className="nav-badge">7 Attivi</span>
        </div>

        <div
          className={`nav-item ${activeView === 'mcp' ? 'active' : ''}`}
          onClick={() => setActiveView('mcp')}
        >
          <div className="nav-item-content">
            <BotIcon className="svg-icon nav-icon" />
            <span>Hub MCP (AI Agent)</span>
          </div>
          <span className="nav-badge active-glow">Port 3001</span>
        </div>

        <div
          className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <div className="nav-item-content">
            <SettingsIcon className="svg-icon nav-icon" />
            <span>Impostazioni Server</span>
          </div>
        </div>
      </nav>

      {/* Footer / Infrastructure Health Monitor */}
      <div className="sidebar-footer">
        <div className="infra-status-card">
          <div className="infra-status-row">
            <span className="infra-label">
              <span className="status-indicator online"></span>
              Server Dedicato
            </span>
            <span className="infra-val">Ubuntu 24</span>
          </div>
          <div className="infra-status-row">
            <span className="infra-label">
              <span className="status-indicator violet"></span>
              AWS Media Cloud
            </span>
            <span className="infra-val">S3 + CDN</span>
          </div>
          <div className="infra-status-row">
            <span className="infra-label">
              <span className="status-indicator online"></span>
              Worker BullMQ
            </span>
            <span className="infra-val">0 lag</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
