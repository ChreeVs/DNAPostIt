import React from 'react';
import {
  DnaPostItLogo,
  HomeIcon,
  PencilIcon,
  CalendarIcon,
  LinkChainIcon,
  SlidersIcon,
  FolderIcon,
  PlusIcon,
  HelpCircleIcon,
  ChevronLeftIcon,
  RefreshCwIcon
} from './Icons';

export default function Sidebar({
  activeView,
  setActiveView,
  workspaceMode,
  setWorkspaceMode,
  projects,
  currentProject,
  onSelectProject,
  onOpenComposer,
  onOpenCreateProject
}) {
  const isGlobalMode = workspaceMode === 'global';

  const handleReturnToHome = () => {
    setWorkspaceMode('global');
    setActiveView('dashboard');
  };

  const handleSelectProjectItem = (proj) => {
    onSelectProject(proj.id);
    setWorkspaceMode('project');
    setActiveView('calendar');
  };

  return (
    <aside className="pubblie-sidebar">
      {/* Brand Header */}
      <div className="pubblie-sidebar-header">
        <div
          className="pubblie-logo-row"
          style={{ cursor: 'pointer' }}
          onClick={handleReturnToHome}
          title="Torna alla Dashboard"
        >
          <img
            src="/logo.png"
            alt="DNA PostIt"
            style={{ width: '30px', height: '30px', borderRadius: '7px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <DnaPostItLogo className="pubblie-logo-svg" style={{ width: '30px', height: '30px' }} />
          <span className="pubblie-brand-name" style={{ letterSpacing: '-0.02em', fontWeight: 800 }}>
            DNA PostIt
          </span>
        </div>

        {/* If in Project Mode: Show TORNA ALLA HOME and Active Project Pill */}
        {!isGlobalMode && (
          <>
            <div
              className="pubblie-back-home"
              onClick={handleReturnToHome}
              style={{ cursor: 'pointer' }}
              title="Torna al calendario generale e alla lista progetti"
            >
              <ChevronLeftIcon className="svg-icon-sm" />
              <span>TORNA ALLA HOME</span>
            </div>

            <div
              className="pubblie-active-project-pill"
              onClick={() => setActiveView('projects')}
              title="Workspace attivo. Clicca per gestire progetti"
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
          </>
        )}
      </div>

      {/* Navigation based on mode */}
      <nav className="pubblie-nav-list">
        {isGlobalMode ? (
          /* ========================================================
             GLOBAL HOME / DASHBOARD SIDEBAR (MATCHING USER SCREENSHOT)
             ======================================================== */
          <>
            {/* Dashboard Link */}
            <div
              className={`pubblie-nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveView('dashboard')}
              style={{ fontWeight: 700 }}
            >
              <HomeIcon className="svg-icon" />
              <span>Dashboard</span>
            </div>

            {/* Progetti Section Header */}
            <div
              className="pubblie-nav-item"
              onClick={() => setActiveView('projects')}
              style={{ fontWeight: 700, color: '#f1f5f9', cursor: 'pointer', marginTop: '4px' }}
            >
              <FolderIcon className="svg-icon" style={{ color: '#d97706' }} />
              <span>Progetti</span>
            </div>

            {/* List of Projects with colored dots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '8px' }}>
              {projects.map((proj) => {
                const isSelected = currentProject && currentProject.id === proj.id;
                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProjectItem(proj)}
                    className="pubblie-nav-item"
                    style={{
                      padding: '7px 12px',
                      fontSize: '0.84rem',
                      fontWeight: isSelected ? 700 : 500,
                      gap: '10px'
                    }}
                    title={`Apri workspace ${proj.name}`}
                  >
                    <span
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        backgroundColor: proj.color || '#f97316',
                        flexShrink: 0
                      }}
                    />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {proj.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Vedi tutti i progetti */}
            <div
              className={`pubblie-nav-item folder-item ${activeView === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveView('projects')}
              style={{ marginTop: '8px', paddingLeft: '14px', fontSize: '0.82rem' }}
            >
              <FolderIcon className="svg-icon-sm" style={{ color: '#f59e0b' }} />
              <span>Vedi tutti i progetti</span>
            </div>

            {/* + Nuovo progetto */}
            <div
              className="pubblie-nav-item"
              onClick={onOpenCreateProject}
              style={{
                color: '#fb923c',
                fontWeight: 700,
                fontSize: '0.82rem',
                paddingLeft: '14px'
              }}
            >
              <PlusIcon className="svg-icon-sm" />
              <span>Nuovo progetto</span>
            </div>

            {/* Rinnovo canali (Important for token renewals) */}
            <div
              className={`pubblie-nav-item ${activeView === 'renewal' ? 'active' : ''}`}
              onClick={() => setActiveView('renewal')}
              style={{ marginTop: '14px' }}
            >
              <RefreshCwIcon className="svg-icon" />
              <span>Rinnovo canali</span>
            </div>
          </>
        ) : (
          /* ========================================================
             PROJECT WORKSPACE SIDEBAR (FOR SPECIFIC PROJECT)
             ======================================================== */
          <>
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
              className={`pubblie-nav-item ${activeView === 'channels' ? 'active' : ''}`}
              onClick={() => setActiveView('channels')}
            >
              <LinkChainIcon className="svg-icon" />
              <span>Canali Social</span>
            </div>

            <div
              className={`pubblie-nav-item ${activeView === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveView('settings')}
            >
              <SlidersIcon className="svg-icon" />
              <span>Impostazioni</span>
            </div>

            {/* Shortcut to switch project or view all */}
            <div
              className="pubblie-nav-item folder-item"
              style={{ marginTop: '16px' }}
              onClick={() => setActiveView('projects')}
            >
              <FolderIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
              <span>Tutti i progetti</span>
            </div>
          </>
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="pubblie-sidebar-footer">
        <div className="pubblie-footer-link" onClick={() => setActiveView('settings')}>
          <HelpCircleIcon className="svg-icon-sm" />
          <span>Guida & MCP</span>
        </div>
      </div>
    </aside>
  );
}
