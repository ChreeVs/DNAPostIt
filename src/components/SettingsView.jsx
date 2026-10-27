import React from 'react';
import { ServerIcon, CheckIcon, SettingsIcon } from './Icons';

export default function SettingsView() {
  const dockerServices = [
    { name: 'caddy-proxy', role: 'Reverse Proxy & Auto-SSL Let\'s Encrypt', port: '80/443', status: 'Running', uptime: '14 giorni' },
    { name: 'postgres-db', role: 'Database Relazionale (PostgreSQL 16)', port: '5432', status: 'Running', uptime: '14 giorni' },
    { name: 'redis-cache', role: 'Coda Code e Memoria Volatile', port: '6379', status: 'Running', uptime: '14 giorni' },
    { name: 'bullmq-worker', role: 'Motore di Schedulazione & Social Dispatcher', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'media-ffmpeg', role: 'Transcodifica H.264 & Sharp Slicer', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'mcp-server', role: 'Model Context Protocol Bridge (Stdio/SSE)', port: '3001', status: 'Running', uptime: '14 giorni' }
  ];

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
          Configurazione Server & Ambiente
        </h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Parametri dell'infrastruttura self-hosted su server dedicato e credenziali di integrazione AWS.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Docker Services Table */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ServerIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
              Servizi Docker Attivi sul Server Dedicato
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
                {dockerServices.map(srv => (
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

        {/* AWS & Webhook Params */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-dark)' }}>Parametri AWS S3 & CloudFront</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>S3 BUCKET NAME</label>
              <input
                type="text"
                readOnly
                value="dnapostit-media-prod"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>AWS REGION</label>
              <input
                type="text"
                readOnly
                value="eu-central-1 (Francoforte)"
                className="date-input-dark"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>CLOUDFRONT CDN DOMAIN</label>
              <input
                type="text"
                readOnly
                value="https://d111111abcdef8.cloudfront.net"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-granata)', fontWeight: 600 }}
              />
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-dark)' }}>Social OAuth & Webhook Callbacks</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>OAUTH REDIRECT URI</label>
              <input
                type="text"
                readOnly
                value="https://social.tuodominio.it/api/auth/callback"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>WEBHOOK LISTENER</label>
              <input
                type="text"
                readOnly
                value="https://social.tuodominio.it/api/webhooks/social"
                className="date-input-dark"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)' }}>MCP PROTOCOL PORT</label>
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
