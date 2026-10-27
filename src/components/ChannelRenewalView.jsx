import React, { useState } from 'react';
import {
  RefreshCwIcon,
  KeyIcon,
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  LinkedInIcon,
  ThreadsIcon,
  GoogleBusinessIcon,
  FilterIcon
} from './Icons';

export default function ChannelRenewalView({ channels, onRenewChannel, onRenewAllExpiring }) {
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'expiring' | 'expired' | 'valid'
  const [renewingId, setRenewingId] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [isBulkRenewing, setIsBulkRenewing] = useState(false);
  const [bulkSuccess, setBulkSuccess] = useState(false);

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

  const expiringCount = channels.filter((c) => c.expiresInDays > 0 && c.expiresInDays <= 14).length;
  const expiredCount = channels.filter((c) => c.expiresInDays <= 0).length;
  const validCount = channels.filter((c) => c.expiresInDays > 14).length;

  const filteredChannels = channels.filter((c) => {
    if (filterProject !== 'all' && c.projectId !== filterProject) return false;
    if (filterStatus === 'expiring') return c.expiresInDays > 0 && c.expiresInDays <= 14;
    if (filterStatus === 'expired') return c.expiresInDays <= 0;
    if (filterStatus === 'valid') return c.expiresInDays > 14;
    return true;
  });

  const uniqueProjects = Array.from(
    new Set(channels.map((c) => JSON.stringify({ id: c.projectId, name: c.projectName })))
  ).map((s) => JSON.parse(s));

  const handleRenewSingle = (channelId) => {
    setRenewingId(channelId);
    setTimeout(() => {
      if (onRenewChannel) onRenewChannel(channelId);
      setRenewingId(null);
      setSuccessId(channelId);
      setTimeout(() => setSuccessId(null), 3000);
    }, 900);
  };

  const handleBulkRenew = () => {
    setIsBulkRenewing(true);
    setTimeout(() => {
      if (onRenewAllExpiring) onRenewAllExpiring();
      setIsBulkRenewing(false);
      setBulkSuccess(true);
      setTimeout(() => setBulkSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ padding: '28px 36px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <RefreshCwIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em' }}>
              Rinnovo Canali Social
            </h1>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Monitora lo stato dei token di accesso OAuth2 e rinnova le autorizzazioni prima della loro scadenza per evitare blocchi nella pubblicazione.
          </p>
        </div>

        {expiringCount + expiredCount > 0 && (
          <button
            type="button"
            onClick={handleBulkRenew}
            disabled={isBulkRenewing}
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
            <RefreshCwIcon className={`svg-icon-sm ${isBulkRenewing ? 'spin' : ''}`} />
            <span>{isBulkRenewing ? 'Rinnovo in corso...' : 'Rinnova Tutti i Token in Scadenza'}</span>
          </button>
        )}
      </div>

      {bulkSuccess && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', color: '#166534', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckIcon className="svg-icon-mini" /> Tutti i canali in scadenza sono stati rinnovati con successo (validità estesa a 60 giorni).
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Canali Totali
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
            {channels.length}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            distribuiti su {uniqueProjects.length} progetti
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
            In Scadenza (≤ 14 giorni)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: expiringCount > 0 ? '#d97706' : 'var(--text-dark)', marginTop: '4px' }}>
            {expiringCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            richiedono rinnovo a breve
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
            Token Scaduti
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: expiredCount > 0 ? '#ef4444' : 'var(--text-dark)', marginTop: '4px' }}>
            {expiredCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            pubblicazione sospesa
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>
            Attivi & Validi
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--feed-green)', marginTop: '4px' }}>
            {validCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            autorizzazioni integre
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid var(--border-grid)',
          borderRadius: '8px',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            <FilterIcon className="svg-icon-mini" /> Filtra Progetto:
          </div>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid var(--border-grid)',
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tutti i progetti ({channels.length})</option>
            {uniqueProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { key: 'all', label: 'Tutti' },
            { key: 'expiring', label: `In Scadenza (${expiringCount})` },
            { key: 'expired', label: `Scaduti (${expiredCount})` },
            { key: 'valid', label: `Validi (${validCount})` }
          ].map((st) => (
            <button
              key={st.key}
              type="button"
              onClick={() => setFilterStatus(st.key)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: filterStatus === st.key ? 700 : 500,
                border: filterStatus === st.key ? '1px solid var(--primary-granata)' : '1px solid var(--border-grid)',
                background: filterStatus === st.key ? '#fef2f2' : '#ffffff',
                color: filterStatus === st.key ? 'var(--primary-granata)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Channels Renewal List Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-grid)', textAlign: 'left', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px 16px' }}>CANALE / ACCOUNT</th>
              <th style={{ padding: '12px 16px' }}>PROGETTO</th>
              <th style={{ padding: '12px 16px' }}>PERMESSI OAUTH</th>
              <th style={{ padding: '12px 16px' }}>DATA SCADENZA</th>
              <th style={{ padding: '12px 16px' }}>STATO TOKEN</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>AZIONE</th>
            </tr>
          </thead>
          <tbody>
            {filteredChannels.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '42px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <KeyIcon className="svg-icon-lg" style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>Nessun canale collegato</span>
                    <span style={{ fontSize: '0.8rem' }}>I canali social autorizzati per i vari progetti compariranno qui per il monitoraggio della scadenza token.</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredChannels.map((ch) => {
              const isExpired = ch.expiresInDays <= 0;
              const isExpiring = ch.expiresInDays > 0 && ch.expiresInDays <= 14;
              const isCurrentlyRenewing = renewingId === ch.id;
              const isSuccess = successId === ch.id;

              return (
                <tr key={ch.id} style={{ borderBottom: '1px solid var(--border-grid)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
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
                        <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{ch.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {ch.handle}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        background: '#f1f5f9',
                        color: 'var(--text-dark)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '0.75rem'
                      }}
                    >
                      {ch.projectName || '-'}
                    </span>
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(ch.scopes || ['publish_content']).map((sc) => (
                        <span
                          key={sc}
                          style={{
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            background: '#f8fafc',
                            border: '1px solid var(--border-grid)',
                            padding: '2px 5px',
                            borderRadius: '3px',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {sc}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {ch.expiryDate || '2026-12-01'}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    {isExpired ? (
                      <span
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        TOKEN SCADUTO
                      </span>
                    ) : isExpiring ? (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#b45309',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Scade tra {ch.expiresInDays} giorni
                      </span>
                    ) : (
                      <span
                        style={{
                          background: '#dcfce7',
                          color: '#15803d',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckIcon className="svg-icon-mini" /> Valido ({ch.expiresInDays}gg)
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {isSuccess ? (
                      <span style={{ color: 'var(--feed-green)', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckIcon className="svg-icon-mini" /> Rinnovato (60gg)!
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRenewSingle(ch.id)}
                        disabled={isCurrentlyRenewing}
                        style={{
                          background: isExpired || isExpiring ? 'var(--primary-granata)' : 'transparent',
                          color: isExpired || isExpiring ? '#ffffff' : 'var(--text-dark)',
                          border: isExpired || isExpiring ? 'none' : '1px solid var(--border-grid)',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <RefreshCwIcon className={`svg-icon-mini ${isCurrentlyRenewing ? 'spin' : ''}`} />
                        <span>{isCurrentlyRenewing ? 'Rinnovo...' : isExpired ? 'Rinnova Ora' : 'Rinnova Token'}</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
