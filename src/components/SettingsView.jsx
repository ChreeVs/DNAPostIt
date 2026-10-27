import React from 'react';
import { ServerIcon, CheckIcon, SettingsIcon } from './Icons';

export default function SettingsView() {
  const dockerServices = [
    { name: 'caddy-proxy', role: 'Reverse Proxy & Auto-SSL Let\'s Encrypt', port: '80/443', status: 'Running', uptime: '14 giorni' },
    { name: 'postgres-db', role: 'Database Relazionale (PostgreSQL 16)', port: '5432', status: 'Running', uptime: '14 giorni' },
    { name: 'redis-cache', role: 'Coda Code e Memoria Volatile', port: '6379', status: 'Running', uptime: '14 giorni' },
    { name: 'bullmq-worker', role: 'Motore di Schedulazione & Social Dispatcher', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'media-ffmpeg', role: 'Transcodifica H.264 & Carousel Sharp Slicer', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'mcp-server', role: 'Model Context Protocol Bridge (Stdio/SSE)', port: '3001', status: 'Running', uptime: '14 giorni' }
  ];

  return (
    <div className="page-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Configurazione Server & Ambiente</h2>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Parametri dell'infrastruttura self-hosted su server dedicato e credenziali di integrazione AWS.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Docker Services Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ServerIcon className="svg-icon" style={{ color: 'var(--primary-neon)' }} />
              Servizi Docker Attivi sul Server Dedicato
            </h3>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--status-published)' }}>
              DOCKER COMPOSE V2 ACTIVE
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>CONTAINER</th>
                  <th style={{ padding: '10px 12px' }}>RUOLO / FUNZIONE</th>
                  <th style={{ padding: '10px 12px' }}>PORTA</th>
                  <th style={{ padding: '10px 12px' }}>STATO</th>
                  <th style={{ padding: '10px 12px' }}>UPTIME</th>
                </tr>
              </thead>
              <tbody>
                {dockerServices.map(srv => (
                  <tr key={srv.name} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fff' }}>
                      {srv.name}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                      {srv.role}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: 'var(--primary-neon)' }}>
                      {srv.port}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ color: 'var(--status-published)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                        <CheckIcon className="svg-icon-sm" /> {srv.status}
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

        {/* AWS & Webhook Params */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '0.95rem' }}>Parametri AWS S3 & CloudFront</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>S3 BUCKET NAME</label>
              <input
                type="text"
                readOnly
                value="dnapostit-media-prod"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AWS REGION</label>
              <input
                type="text"
                readOnly
                value="eu-central-1 (Francoforte)"
                className="date-input-dark"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CLOUDFRONT CDN DOMAIN</label>
              <input
                type="text"
                readOnly
                value="https://d111111abcdef8.cloudfront.net"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-neon)' }}
              />
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '0.95rem' }}>Social OAuth & Webhook Callbacks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>OAUTH REDIRECT URI (Configurato nei portali dev)</label>
              <input
                type="text"
                readOnly
                value="https://social.tuodominio.it/api/auth/callback"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>WEBHOOK LISTENER (Meta & TikTok status updates)</label>
              <input
                type="text"
                readOnly
                value="https://social.tuodominio.it/api/webhooks/social"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MCP PROTOCOL PORT</label>
              <input
                type="text"
                readOnly
                value="3001 (Stdio & SSE enabled)"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
