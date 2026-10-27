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
  RefreshIcon
} from './Icons';

export default function ChannelsView({ channels }) {
  const [testingId, setTestingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <InstagramIcon className="svg-icon-lg" />;
      case 'facebook': return <FacebookIcon className="svg-icon-lg" />;
      case 'linkedin': return <LinkedInIcon className="svg-icon-lg" />;
      case 'tiktok': return <TikTokIcon className="svg-icon-lg" />;
      case 'youtube': return <YouTubeIcon className="svg-icon-lg" />;
      case 'threads': return <ThreadsIcon className="svg-icon-lg" />;
      case 'gmb': return <GoogleBusinessIcon className="svg-icon-lg" />;
      default: return null;
    }
  };

  const handleTestToken = (id) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      setSuccessId(id);
      setTimeout(() => setSuccessId(null), 2500);
    }, 800);
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Canali Social Collegati</h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Monitoraggio OAuth2, validità dei token di accesso e sincronizzazione delle autorizzazioni per tutti i 7 canali.
        </p>
      </div>

      <div className="channels-grid">
        {channels.map((ch) => (
          <div key={ch.id} className="channel-manage-card">
            <div className="channel-card-top">
              <div className="channel-brand-badge">
                <div
                  className="channel-brand-icon"
                  style={{
                    backgroundColor: `${ch.color}1a`,
                    color: ch.color,
                    border: `1px solid ${ch.color}44`
                  }}
                >
                  {getPlatformIcon(ch.platform)}
                </div>

                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{ch.name}</h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {ch.handle}
                  </div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--status-published)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(16, 185, 129, 0.25)'
                }}
              >
                <CheckIcon className="svg-icon-sm" /> ATTIVO
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Audience / Follower</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-white)' }}>
                  {ch.followers}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Validità Token OAuth2</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-neon)' }}>
                  {ch.tokenExpiresDays} giorni
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Auto-Refresh abilitato
              </span>

              <button
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                onClick={() => handleTestToken(ch.id)}
                disabled={testingId === ch.id}
              >
                <RefreshIcon className={`svg-icon-sm ${testingId === ch.id ? 'spin' : ''}`} />
                <span>
                  {testingId === ch.id
                    ? 'Verifica...'
                    : successId === ch.id
                    ? 'Token Valido'
                    : 'Testa Connessione'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
