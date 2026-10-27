import React, { useState } from 'react';
import {
  FolderIcon,
  PlusIcon,
  CheckIcon,
  SlidersIcon,
  TrashIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  LinkedInIcon,
  ThreadsIcon,
  GoogleBusinessIcon,
  XIcon
} from './Icons';

export default function ProjectsView({
  projects,
  currentProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
  onNavigateToSettings
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#800020',
    channels: ['facebook', 'instagram']
  });

  const availableColors = [
    { label: 'Granata', value: '#800020' },
    { label: 'Bordeaux', value: '#9e1b32' },
    { label: 'Cremisi Scuro', value: '#630c1f' },
    { label: 'Ardesia', value: '#334155' },
    { label: 'Blu Notte', value: '#1e3a8a' },
    { label: 'Smeraldo Scuro', value: '#064e3b' }
  ];

  const socialPlatforms = [
    { key: 'facebook', label: 'Facebook', icon: <FacebookIcon className="svg-icon-sm" /> },
    { key: 'instagram', label: 'Instagram', icon: <InstagramIcon className="svg-icon-sm" /> },
    { key: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="svg-icon-sm" /> },
    { key: 'youtube', label: 'YouTube', icon: <YouTubeIcon className="svg-icon-sm" /> },
    { key: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon className="svg-icon-sm" /> },
    { key: 'threads', label: 'Threads', icon: <ThreadsIcon className="svg-icon-sm" /> },
    { key: 'gmb', label: 'Google Business', icon: <GoogleBusinessIcon className="svg-icon-sm" /> }
  ];

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setNewProject((prev) => ({ ...prev, name, slug }));
  };

  const toggleChannelSelection = (channelKey) => {
    setNewProject((prev) => {
      const exists = prev.channels.includes(channelKey);
      if (exists) {
        return { ...prev, channels: prev.channels.filter((c) => c !== channelKey) };
      } else {
        return { ...prev, channels: [...prev.channels, channelKey] };
      }
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const initials = newProject.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3) || 'PRJ';

    const created = {
      id: `proj-${Date.now()}`,
      name: newProject.name.trim(),
      slug: newProject.slug || `project-${Date.now()}`,
      description: newProject.description.trim() || 'Nessuna descrizione specificata.',
      avatar: initials,
      color: newProject.color,
      activeChannels: newProject.channels,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onCreateProject(created);
    setIsModalOpen(false);
    setNewProject({
      name: '',
      slug: '',
      description: '',
      color: '#800020',
      channels: ['facebook', 'instagram']
    });
  };

  return (
    <div style={{ padding: '28px 36px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <FolderIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
              Gestione Progetti (Workspaces)
            </h1>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Organizza i tuoi calendari e profili social in workspace distinti. Ogni progetto mantiene canali, post e permessi indipendenti.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="composer-submit-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '0.86rem',
            fontWeight: 700,
            borderRadius: '6px'
          }}
        >
          <PlusIcon className="svg-icon-sm" />
          <span>Crea Nuovo Progetto</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px dashed var(--border-grid)', borderRadius: '10px', padding: '48px 24px', textAlign: 'center', gridColumn: '1 / -1' }}>
            <FolderIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>Nessun progetto creato</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px auto' }}>
              Non ci sono ancora workspace attivi. Clicca su "Crea Nuovo Progetto" per configurare il tuo primo brand o cliente.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="composer-submit-btn"
              style={{ padding: '9px 22px', borderRadius: '6px', fontSize: '0.84rem', fontWeight: 700 }}
            >
              Crea Nuovo Progetto
            </button>
          </div>
        ) : (
          projects.map((proj) => {
            const isActive = proj.id === currentProjectId;
          return (
            <div
              key={proj.id}
              style={{
                background: '#ffffff',
                borderRadius: '10px',
                border: isActive ? '2px solid var(--primary-granata)' : '1px solid var(--border-grid)',
                padding: '22px',
                boxShadow: isActive ? '0 4px 16px rgba(128, 0, 32, 0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '10px',
                        backgroundColor: proj.color || '#800020',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1rem',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {proj.avatar || proj.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '2px' }}>
                        {proj.name}
                      </h3>
                      <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        /{proj.slug}
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <span
                      style={{
                        background: '#fef2f2',
                        color: 'var(--primary-granata)',
                        border: '1px solid rgba(128,0,32,0.25)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckIcon className="svg-icon-mini" /> PROGETTO ATTIVO
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectProject(proj.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border-grid)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--text-dark)',
                        cursor: 'pointer'
                      }}
                    >
                      Attiva
                    </button>
                  )}
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.45 }}>
                  {proj.description}
                </p>

                {/* Active Channels Pills */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Canali Abilitati ({proj.activeChannels ? proj.activeChannels.length : 0})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(proj.activeChannels || []).map((ch) => (
                      <span
                        key={ch}
                        style={{
                          background: '#f1f5f9',
                          color: 'var(--text-dark)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  borderTop: '1px solid var(--border-grid)',
                  paddingTop: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Creato il {proj.createdAt || '01/10/2026'}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProject(proj.id);
                      onNavigateToSettings();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <SlidersIcon className="svg-icon-mini" /> Impostazioni
                  </button>

                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDeleteProject(proj.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Elimina progetto"
                    >
                      <TrashIcon className="svg-icon-mini" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }))}
      </div>

      {/* Modal Crea Nuovo Progetto */}
      {isModalOpen && (
        <div className="composer-overlay">
          <div
            className="composer-container"
            style={{ maxWidth: '580px', width: '92%', padding: '0', background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border-grid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Nuovo Progetto (Workspace)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-icon-square"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <XIcon className="svg-icon" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  NOME DEL PROGETTO / BRAND *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es: Mio Brand, Azienda Spa, Studio Creativo..."
                  value={newProject.name}
                  onChange={handleNameChange}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  IDENTIFICATORE SLUG (URL)
                </label>
                <input
                  type="text"
                  value={newProject.slug}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, slug: e.target.value }))}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  DESCRIZIONE OBIETTIVI / CLIENTE
                </label>
                <textarea
                  rows="3"
                  placeholder="Descrivi brevemente lo scopo o le linee guida del brand..."
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  className="composer-textarea"
                  style={{ width: '100%', boxSizing: 'border-box', minHeight: '70px' }}
                />
              </div>

              {/* Color Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  COLORE DISTINTIVO BRAND
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {availableColors.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setNewProject((prev) => ({ ...prev, color: col.value }))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: col.value,
                        border: newProject.color === col.value ? '3px solid #111827' : '1px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                      title={col.label}
                    >
                      {newProject.color === col.value && <CheckIcon className="svg-icon-mini" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Initial Channels */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  CANALI SOCIAL DA ABILITARE SUBITO
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {socialPlatforms.map((plat) => {
                    const isSelected = newProject.channels.includes(plat.key);
                    return (
                      <div
                        key={plat.key}
                        onClick={() => toggleChannelSelection(plat.key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: isSelected ? '1px solid var(--primary-granata)' : '1px solid var(--border-grid)',
                          background: isSelected ? '#fef2f2' : '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? 'var(--primary-granata)' : 'var(--text-dark)'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          style={{ accentColor: 'var(--primary-granata)' }}
                        />
                        {plat.icon}
                        <span>{plat.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  borderTop: '1px solid var(--border-grid)',
                  paddingTop: '18px',
                  marginTop: '8px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-grid)',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="composer-submit-btn"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    fontWeight: 700
                  }}
                >
                  Salva & Attiva Progetto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
