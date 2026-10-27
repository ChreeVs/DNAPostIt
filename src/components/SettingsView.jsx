import React, { useState, useEffect } from 'react';
import {
  FolderIcon,
  SlidersIcon,
  ServerIcon,
  CheckIcon,
  BotIcon,
  SparklesIcon,
  KeyIcon,
  DatabaseIcon,
  ClockIcon,
  RefreshIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  LinkedInIcon,
  ThreadsIcon,
  GoogleBusinessIcon
} from './Icons';

export default function SettingsView({
  currentProject,
  projects,
  onUpdateProject,
  channels,
  onToggleChannelStatus,
  toolsRegistry,
  onAgentSchedulePost
}) {
  const [activeTab, setActiveTab] = useState('project'); // 'project' | 'channels' | 'mcp' | 'aws' | 'server'

  // Project Form State
  const [projName, setProjName] = useState(currentProject ? currentProject.name : '');
  const [projSlug, setProjSlug] = useState(currentProject ? currentProject.slug : '');
  const [projDesc, setProjDesc] = useState(currentProject ? currentProject.description : '');
  const [projColor, setProjColor] = useState(currentProject ? currentProject.color : '#800020');
  const [projTimezone, setProjTimezone] = useState('Europe/Rome (UTC+1)');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentProject) {
      setProjName(currentProject.name || '');
      setProjSlug(currentProject.slug || '');
      setProjDesc(currentProject.description || '');
      setProjColor(currentProject.color || '#800020');
    } else {
      setProjName('');
      setProjSlug('');
      setProjDesc('');
      setProjColor('#800020');
    }
  }, [currentProject]);

  // Media Storage State (pCloud / S3)
  const [storageProvider, setStorageProvider] = useState('pcloud'); // 'pcloud' | 's3'
  const [pcloudToken, setPcloudToken] = useState('pcloud_oauth_d9f82a10b4c73e9a');
  const [pcloudRegion, setPcloudRegion] = useState('https://eapi.pcloud.com');
  const [pcloudFolder, setPcloudFolder] = useState('DNAPostIt_Media');
  const [pcloudLinkMode, setPcloudLinkMode] = useState('direct'); // 'direct' | 'public_folder'
  const [isTestingPcloud, setIsTestingPcloud] = useState(false);
  const [pcloudTestResult, setPcloudTestResult] = useState(null);

  const handleTestPCloud = () => {
    setIsTestingPcloud(true);
    setPcloudTestResult(null);
    setTimeout(() => {
      setIsTestingPcloud(false);
      setPcloudTestResult({
        success: true,
        email: 'account@pcloud.com',
        totalQuota: '500 GB',
        usedQuota: '18.4 GB',
        freeQuota: '481.6 GB',
        server: pcloudRegion.includes('eapi') ? 'Europa (Data Center UE)' : 'USA (Data Center US)',
        message: 'Token valido. Permessi di lettura/scrittura e generazione link diretti CDN attivi.'
      });
    }, 800);
  };

  // MCP Simulator State
  const [simPrompt, setSimPrompt] = useState(
    'Pianifica un post di lancio su Instagram e LinkedIn per il 29 Ottobre alle 15:30 con argomento Strategia Multi-Channel.'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState(null);

  // Docker Services State
  const dockerServices = [
    { name: 'caddy-proxy', role: 'Reverse Proxy & Auto-SSL Let\'s Encrypt', port: '80/443', status: 'Running', uptime: '14 giorni' },
    { name: 'postgres-db', role: 'Database Relazionale (PostgreSQL 16)', port: '5432', status: 'Running', uptime: '14 giorni' },
    { name: 'redis-cache', role: 'Coda Code e Memoria Volatile', port: '6379', status: 'Running', uptime: '14 giorni' },
    { name: 'bullmq-worker', role: 'Motore di Schedulazione & Social Dispatcher', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'media-ffmpeg', role: 'Transcodifica H.264 & Sharp Slicer', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'mcp-server', role: 'Model Context Protocol Bridge (Stdio/SSE)', port: '3001', status: 'Running', uptime: '14 giorni' }
  ];

  const availableColors = [
    { label: 'Granata', value: '#800020' },
    { label: 'Bordeaux', value: '#9e1b32' },
    { label: 'Cremisi Scuro', value: '#630c1f' },
    { label: 'Ardesia', value: '#334155' },
    { label: 'Blu Notte', value: '#1e3a8a' },
    { label: 'Smeraldo Scuro', value: '#064e3b' }
  ];

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon className="svg-icon-sm" />;
      case 'facebook': return <FacebookIcon className="svg-icon-sm" />;
      case 'linkedin': return <LinkedInIcon className="svg-icon-sm" />;
      case 'tiktok': return <TikTokIcon className="svg-icon-sm" />;
      case 'youtube': return <YouTubeIcon className="svg-icon-sm" />;
      case 'threads': return <ThreadsIcon className="svg-icon-sm" />;
      case 'gmb': return <GoogleBusinessIcon className="svg-icon-sm" />;
      default: return null;
    }
  };

  const handleSaveProjectSettings = (e) => {
    e.preventDefault();
    if (onUpdateProject && currentProject) {
      onUpdateProject({
        ...currentProject,
        name: projName,
        slug: projSlug,
        description: projDesc,
        color: projColor
      });
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSimulateAgent = () => {
    setIsExecuting(true);
    setExecutionLog(null);

    setTimeout(() => {
      const generatedPost = {
        id: `post-mcp-${Date.now()}`,
        projectId: currentProject ? currentProject.id : 'proj-1',
        channel: 'linkedin',
        platforms: ['linkedin', 'instagram'],
        content: "Annuncio Strategico: Potenziamento dell'infrastruttura editoriale e automazione distribuita con supporto Model Context Protocol (MCP).\n\nDistribuzione automatica sincronizzata sui canali ufficiali e monitoraggio in tempo reale.",
        mediaType: 'image',
        date: '2026-10-29',
        time: '15:30',
        status: 'scheduled'
      };

      if (onAgentSchedulePost) {
        onAgentSchedulePost(generatedPost);
      }

      setExecutionLog({
        toolInvoked: 'schedule_post',
        caller: 'Claude 3.5 Sonnet / Antigravity Agent (via MCP SSE Client)',
        parameters: {
          platforms: ['linkedin', 'instagram'],
          scheduled_time: '2026-10-29 15:30',
          content_length: 220
        },
        response: {
          status: 'success',
          job_id: `bullmq_job_${Math.floor(Math.random() * 9000 + 1000)}`,
          database_record: generatedPost.id,
          message: 'Post registrato nel database e schedulato nel calendario editoriale.'
        }
      });

      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div style={{ padding: '28px 36px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
          Impostazioni Piattaforma & Progetto
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Configura i parametri del progetto attivo, i canali social collegati, l'Hub MCP per agenti AI, lo storage AWS S3 e i container Docker.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-grid)',
          marginBottom: '24px',
          paddingBottom: '2px'
        }}
      >
        {[
          { key: 'project', label: 'Progetto & Brand', icon: <FolderIcon className="svg-icon-sm" /> },
          { key: 'channels', label: 'Canali Social', icon: <KeyIcon className="svg-icon-sm" /> },
          { key: 'mcp', label: 'Hub MCP & Integrazioni AI', icon: <BotIcon className="svg-icon-sm" /> },
          { key: 'aws', label: 'Storage Media (pCloud)', icon: <DatabaseIcon className="svg-icon-sm" /> },
          { key: 'server', label: 'Server Dedicato & Docker', icon: <ServerIcon className="svg-icon-sm" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                background: isActive ? '#ffffff' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--primary-granata)' : '3px solid transparent',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? 'var(--primary-granata)' : 'var(--text-secondary)',
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PROGETTO & BRAND */}
      {activeTab === 'project' && (
        !currentProject ? (
          <div style={{ background: '#ffffff', border: '1px dashed var(--border-grid)', borderRadius: '10px', padding: '48px 24px', textAlign: 'center' }}>
            <FolderIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>Nessun Progetto Selezionato</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
              Seleziona un progetto esistente oppure creane uno nuovo dalla sezione Progetti per gestirne impostazioni, colore distintivo e fuso orario.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '18px' }}>
              Dettagli Workspace Progetto
            </h3>

            <form onSubmit={handleSaveProjectSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  NOME PROGETTO / BRAND
                </label>
                <input
                  type="text"
                  required
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  SLUG IDENTIFICATIVO
                </label>
                <input
                  type="text"
                  value={projSlug}
                  onChange={(e) => setProjSlug(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  DESCRIZIONE E LINEE GUIDA EDITORIALI
                </label>
                <textarea
                  rows="3"
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="composer-textarea"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  COLORE DISTINTIVO BRAND
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {availableColors.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setProjColor(col.value)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: col.value,
                        border: projColor === col.value ? '3px solid #111827' : '1px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                      title={col.label}
                    >
                      {projColor === col.value && <CheckIcon className="svg-icon-mini" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  FUSO ORARIO DI PUBBLICAZIONE
                </label>
                <input
                  type="text"
                  value={projTimezone}
                  onChange={(e) => setProjTimezone(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '10px' }}>
                <button
                  type="submit"
                  className="composer-submit-btn"
                  style={{ padding: '9px 24px', borderRadius: '6px', fontSize: '0.84rem', fontWeight: 700 }}
                >
                  Salva Modifiche Progetto
                </button>
                {saveSuccess && (
                  <span style={{ color: 'var(--feed-green)', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckIcon className="svg-icon-mini" /> Salvato con successo!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Quick Project Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px' }}>
                Progetto Selezionato
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    backgroundColor: projColor,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}
                >
                  {projName.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{projName}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/{projSlug}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Tutti i post programmati e i canali configurati appartengono a questo workspace isolato.
              </p>
            </div>
          </div>
        </div>
        )
      )}

      {/* TAB 2: CANALI SOCIAL */}
      {activeTab === 'channels' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
              Attivazione Canali per il Progetto
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Attiva o disattiva istantaneamente i canali social. I canali attivi compariranno nella barra superiore del calendario e nel compositore post.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {channels.map((ch) => {
                const isAct = ch.active && ch.connected;
                return (
                  <div
                    key={ch.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid var(--border-grid)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: `${ch.color}15`,
                          color: ch.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${ch.color}33`
                        }}
                      >
                        {getPlatformIcon(ch.platform)}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>{ch.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {ch.handle || 'Account non specificato'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '0.78rem', color: ch.connected ? 'var(--feed-green)' : '#94a3b8', fontWeight: 600 }}>
                        {ch.connected ? 'Token Valido' : 'Non Connesso'}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleChannelStatus && onToggleChannelStatus(ch.id)}
                        style={{
                          background: isAct ? 'var(--primary-granata)' : '#e2e8f0',
                          color: isAct ? '#ffffff' : '#64748b',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {isAct ? (
                          <>
                            <CheckIcon className="svg-icon-mini" /> ABILITATO
                          </>
                        ) : (
                          'DISABILITATO'
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HUB MCP & INTEGRAZIONI AI */}
      {activeTab === 'mcp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* MCP Server Info */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BotIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
                    Model Context Protocol (MCP) Server
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Standard di connessione ufficiale Anthropic / Model Context Protocol per agenti AI
                  </div>
                </div>
              </div>

              <span style={{ background: '#dcfce7', color: 'var(--feed-green)', padding: '4px 12px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckIcon className="svg-icon-mini" /> SERVER ATTIVO (PORTA 3001)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  ENDPOINT SSE (SERVER-SENT EVENTS)
                </div>
                <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-granata)', marginTop: '4px' }}>
                  http://localhost:3001/mcp/sse
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  TRASPORTO STDIO PER DESKTOP CLIENTS
                </div>
                <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>
                  node server/dist/mcp/mcpServer.js
                </div>
              </div>
            </div>

            {/* Tools Registry */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '10px' }}>
                Tool MCP Registrati ed Esposti agli Agenti:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {(toolsRegistry || []).map((tool) => (
                  <div key={tool.name} style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-grid)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-granata)', fontSize: '0.82rem' }}>
                      <SparklesIcon className="svg-icon-mini" /> {tool.name}
                    </div>
                    <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: '4px 0 6px 0', lineHeight: 1.35 }}>
                      {tool.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {tool.parameters.map((p) => (
                        <span key={p} style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', background: '#ffffff', border: '1px solid var(--border-grid)', padding: '2px 5px', borderRadius: '3px', color: 'var(--text-muted)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulator Box */}
            <div style={{ borderTop: '1px solid var(--border-grid)', paddingTop: '18px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SparklesIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
                Test del Ponte MCP con Agente AI
              </h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={simPrompt}
                  onChange={(e) => setSimPrompt(e.target.value)}
                  className="date-input-dark"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleSimulateAgent}
                  disabled={isExecuting}
                  className="composer-submit-btn"
                  style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  {isExecuting ? 'Esecuzione Tool...' : 'Invia Istruzione'}
                </button>
              </div>

              {executionLog && (
                <div style={{ background: '#0f172a', color: '#38bdf8', fontFamily: 'var(--font-mono)', padding: '14px', borderRadius: '8px', marginTop: '14px', fontSize: '0.78rem', lineHeight: 1.5 }}>
                  <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '6px' }}>
                    MCP Tool Result: {executionLog.toolInvoked} (Status 200 OK)
                  </div>
                  <div>Record creato: {executionLog.response.database_record}</div>
                  <div>BullMQ Job ID: {executionLog.response.job_id}</div>
                  <div style={{ color: '#94a3b8', marginTop: '4px' }}>
                    Post inserito con successo nel calendario del progetto attivo.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PCLOUD MEDIA STORAGE */}
      {activeTab === 'aws' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
                  Storage Multimediale: pCloud Drive
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Sostituisce completamente AWS S3 azzerando i costi di banda. I caroselli, foto e video (Reels/TikTok/Shorts) vengono caricati sulla tua app pCloud e distribuiti via link diretti CDN.
                </p>
              </div>

              {/* Provider Selector Switch */}
              <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => setStorageProvider('pcloud')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: storageProvider === 'pcloud' ? 'var(--primary-granata)' : 'transparent',
                    color: storageProvider === 'pcloud' ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  pCloud (Attivo)
                </button>
                <button
                  type="button"
                  onClick={() => setStorageProvider('s3')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: storageProvider === 's3' ? 'var(--primary-granata)' : 'transparent',
                    color: storageProvider === 's3' ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  AWS S3
                </button>
              </div>
            </div>

            {storageProvider === 'pcloud' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                      PCLOUD ACCESS TOKEN (OAUTH2) *
                    </label>
                    <input
                      type="password"
                      value={pcloudToken}
                      onChange={(e) => setPcloudToken(e.target.value)}
                      placeholder="Incolla qui il tuo Access Token pCloud..."
                      className="date-input-dark"
                      style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Generabile dalla console per sviluppatori pCloud (OAuth Apps).
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                      DATA CENTER REGION (API HOST)
                    </label>
                    <select
                      value={pcloudRegion}
                      onChange={(e) => setPcloudRegion(e.target.value)}
                      className="date-input-dark"
                      style={{ width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                    >
                      <option value="https://eapi.pcloud.com">Europa - Francoforte / Lussemburgo (eapi.pcloud.com)</option>
                      <option value="https://api.pcloud.com">Stati Uniti - Texas (api.pcloud.com)</option>
                    </select>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      I server europei garantiscono la massima velocità di upload in Italia.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                      CARTELLA DI ARCHIVIAZIONE PCLOUD
                    </label>
                    <input
                      type="text"
                      value={pcloudFolder}
                      onChange={(e) => setPcloudFolder(e.target.value)}
                      className="date-input-dark"
                      style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Verrà creata automaticamente nella radice della tua app pCloud.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                      MODALITÀ DISTRIBUZIONE LINK SOCIAL
                    </label>
                    <select
                      value={pcloudLinkMode}
                      onChange={(e) => setPcloudLinkMode(e.target.value)}
                      className="date-input-dark"
                      style={{ width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                    >
                      <option value="direct">Link Diretto CDN pCloud (getfilelink - Consigliato)</option>
                      <option value="public_folder">Cartella Pubblica pCloud (filedn.eu)</option>
                    </select>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Fornisce a Meta, TikTok e LinkedIn l'URL HTTPS diretto per scaricare i media.
                    </span>
                  </div>
                </div>

                {/* Test Action Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-grid)', paddingTop: '16px', marginTop: '6px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Costo mensile stimato storage & banda: <strong style={{ color: 'var(--feed-green)' }}>0,00 EUR / mese</strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleTestPCloud}
                    disabled={isTestingPcloud}
                    className="composer-submit-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 700
                    }}
                  >
                    <RefreshIcon className={`svg-icon-mini ${isTestingPcloud ? 'spin' : ''}`} />
                    <span>{isTestingPcloud ? 'Verifica token...' : 'Verifica Connessione & Quota pCloud'}</span>
                  </button>
                </div>

                {/* Test Result Box */}
                {pcloudTestResult && (
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 800, fontSize: '0.88rem' }}>
                      <CheckIcon className="svg-icon-mini" /> {pcloudTestResult.message}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '0.8rem' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ACCOUNT / SERVER</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{pcloudTestResult.server}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>QUOTA DISPONIBILE</div>
                        <div style={{ fontWeight: 800, color: 'var(--feed-green)' }}>{pcloudTestResult.freeQuota} liberi</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SPAZIO OCCUPATO</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{pcloudTestResult.usedQuota} / {pcloudTestResult.totalQuota}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* AWS Fallback Parameters */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    S3 BUCKET NAME
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="dnapostit-media-prod"
                    className="date-input-dark"
                    style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    AWS REGION
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="eu-central-1 (Francoforte)"
                    className="date-input-dark"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    CLOUDFRONT CDN DOMAIN
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="https://d111111abcdef8.cloudfront.net"
                    className="date-input-dark"
                    style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SERVER DEDICATO & DOCKER */}
      {activeTab === 'server' && (
        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ServerIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
              Container Docker Attivi sul Server Dedicato
            </h3>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--feed-green)', fontWeight: 700 }}>
              DOCKER COMPOSE V2 ACTIVE
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-grid)', textAlign: 'left', color: 'var(--text-secondary)', background: '#f8fafc' }}>
                  <th style={{ padding: '10px 12px' }}>CONTAINER</th>
                  <th style={{ padding: '10px 12px' }}>RUOLO / FUNZIONE</th>
                  <th style={{ padding: '10px 12px' }}>PORTA</th>
                  <th style={{ padding: '10px 12px' }}>STATO</th>
                  <th style={{ padding: '10px 12px' }}>UPTIME</th>
                </tr>
              </thead>
              <tbody>
                {dockerServices.map((srv) => (
                  <tr key={srv.name} style={{ borderBottom: '1px solid var(--border-grid)' }}>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {srv.name}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                      {srv.role}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--primary-granata)', fontWeight: 600 }}>
                      {srv.port}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ color: 'var(--feed-green)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                        <CheckIcon className="svg-icon-mini" /> {srv.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                      {srv.uptime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
