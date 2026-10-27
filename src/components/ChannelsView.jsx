import React, { useState } from 'react';
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
  ThreadsIcon,
  GoogleBusinessIcon,
  CheckIcon,
  RefreshIcon,
  PlusIcon,
  KeyIcon,
  XIcon
} from './Icons';

export default function ChannelsView({ channels, onToggleChannelStatus, onConnectNewChannel }) {
  const [testingId, setTestingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [accountHandle, setAccountHandle] = useState('');
  const [pageId, setPageId] = useState('');

  const getPlatformIcon = (platform, sizeClass = "svg-icon-lg") => {
    switch (platform) {
      case 'instagram': return <InstagramIcon className={sizeClass} />;
      case 'facebook': return <FacebookIcon className={sizeClass} />;
      case 'linkedin': return <LinkedInIcon className={sizeClass} />;
      case 'tiktok': return <TikTokIcon className={sizeClass} />;
      case 'youtube': return <YouTubeIcon className={sizeClass} />;
      case 'threads': return <ThreadsIcon className={sizeClass} />;
      case 'gmb': return <GoogleBusinessIcon className={sizeClass} />;
      default: return null;
    }
  };

  const platformInfo = {
    facebook: { name: 'Facebook Pages', defaultColor: '#1877f2', authType: 'Graph API v19.0' },
    instagram: { name: 'Instagram Business', defaultColor: '#e1306c', authType: 'Instagram Graph API' },
    tiktok: { name: 'TikTok Creator & Business', defaultColor: '#111827', authType: 'TikTok Content Posting API' },
    youtube: { name: 'YouTube Studio & Shorts', defaultColor: '#ff0000', authType: 'Google OAuth2 (Data API v3)' },
    linkedin: { name: 'LinkedIn Company Pages', defaultColor: '#0a66c2', authType: 'LinkedIn Community Mgmt API' },
    threads: { name: 'Threads Official', defaultColor: '#111827', authType: 'Threads Graph API' },
    gmb: { name: 'Google Business Profile', defaultColor: '#4285f4', authType: 'Google My Business API' }
  };

  const handleTestToken = (id) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 2500);
    }, 800);
  };

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    if (!accountHandle.trim()) return;

    const platMeta = platformInfo[selectedPlatform];
    const newChan = {
      id: `ch-${selectedPlatform}-${Date.now()}`,
      platform: selectedPlatform,
      name: platMeta.name,
      handle: accountHandle.startsWith('@') ? accountHandle : `@${accountHandle}`,
      count: 0,
      color: platMeta.defaultColor,
      connected: true,
      active: true,
      lastSync: 'Pochi secondi fa'
    };

    if (onConnectNewChannel) {
      onConnectNewChannel(newChan);
    }
    setIsConnectModalOpen(false);
    setAccountHandle('');
    setPageId('');
  };

  return (
    <div style={{ padding: '28px 36px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Canali & Connessioni Social
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Attiva o disattiva i 7 canali supportati per il progetto attivo. Ogni canale supporta scheduling diretto e controllo token.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsConnectModalOpen(true)}
          className="composer-submit-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            fontSize: '0.86rem',
            fontWeight: 700,
            borderRadius: '6px'
          }}
        >
          <PlusIcon className="svg-icon-sm" />
          <span>Collega Nuovo Canale</span>
        </button>
      </div>

      {/* Channels Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {channels.map((ch) => {
          const isAct = ch.active && ch.connected;
          return (
            <div
              key={ch.id}
              style={{
                background: '#ffffff',
                border: isAct ? '1px solid var(--border-grid)' : '1px dashed #cbd5e1',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: ch.connected ? 1 : 0.75
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        backgroundColor: `${ch.color}15`,
                        color: ch.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${ch.color}33`
                      }}
                    >
                      {getPlatformIcon(ch.platform, 'svg-icon')}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '2px' }}>
                        {ch.name}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {ch.handle || 'Nessun account collegato'}
                      </div>
                    </div>
                  </div>

                  {/* Channel Active Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => onToggleChannelStatus && onToggleChannelStatus(ch.id)}
                      style={{
                        background: isAct ? 'var(--primary-granata)' : '#e2e8f0',
                        color: isAct ? '#ffffff' : '#64748b',
                        border: 'none',
                        padding: '4px 10px',
                        borderRadius: '14px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isAct ? (
                        <>
                          <CheckIcon className="svg-icon-mini" /> ATTIVO
                        </>
                      ) : (
                        'DISATTIVATO'
                      )}
                    </button>
                  </div>
                </div>

                {/* Metrics & Status Details */}
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '14px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Follower / Base
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                      {(ch.count || ch.followers || 0).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Stato Token OAuth
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: ch.connected ? 'var(--feed-green)' : '#94a3b8' }}>
                      {ch.connected ? 'Valido (Lunga durata)' : 'Da autorizzare'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                style={{
                  borderTop: '1px solid var(--border-grid)',
                  paddingTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Sync: {ch.lastSync || 'Oggi'}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleTestToken(ch.id)}
                    disabled={testingId === ch.id}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-grid)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RefreshIcon className={`svg-icon-mini ${testingId === ch.id ? 'spin' : ''}`} />
                    {testingId === ch.id ? 'Verifica...' : successId === ch.id ? 'Token OK!' : 'Verifica Connessione'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Connetti Canale Social */}
      {isConnectModalOpen && (
        <div className="composer-overlay">
          <div className="composer-container" style={{ maxWidth: '540px', width: '92%', background: '#ffffff', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-grid)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <KeyIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Collega & Autorizza Canale
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsConnectModalOpen(false)}
                className="btn-icon-square"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <XIcon className="svg-icon" />
              </button>
            </div>

            <form onSubmit={handleConnectSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '8px' }}>
                  SELEZIONA PIATTAFORMA DA COLLEGARE
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {Object.entries(platformInfo).map(([platKey, meta]) => {
                    const isSelected = selectedPlatform === platKey;
                    return (
                      <div
                        key={platKey}
                        onClick={() => setSelectedPlatform(platKey)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid var(--primary-granata)' : '1px solid var(--border-grid)',
                          background: isSelected ? '#fef2f2' : '#ffffff',
                          cursor: 'pointer'
                        }}
                      >
                        {getPlatformIcon(platKey, 'svg-icon')}
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                            {meta.name.split(' ')[0]}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {meta.authType}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  HANDLE ACCOUNT / USERNAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Es: @brand_official o Pagina Aziendale"
                  value={accountHandle}
                  onChange={(e) => setAccountHandle(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  PAGE ID / CREATOR ID (OPZIONALE)
                </label>
                <input
                  type="text"
                  placeholder="Es: 10482910582910"
                  value={pageId}
                  onChange={(e) => setPageId(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-grid)', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
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
                  Autorizza & Attiva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
