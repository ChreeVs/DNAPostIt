import React, { useState } from 'react';
import {
  UploadIcon,
  ScissorsIcon,
  CheckIcon,
  ImageIcon,
  ServerIcon
} from './Icons';

export default function MediaLibraryView({ mediaItems, onSendToSplitter }) {
  const [copiedId, setCopiedId] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filtered = mediaItems.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleCopyUrl = (item) => {
    navigator.clipboard?.writeText(item.cdnUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-container">
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>Libreria Media AWS S3</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Bucket S3 dedicato collegato ad Amazon CloudFront CDN per la distribuzione ad alta velocità verso le API dei social.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="cal-view-modes">
            <button
              className={`btn-mode ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              Tutti
            </button>
            <button
              className={`btn-mode ${filterType === 'image' ? 'active' : ''}`}
              onClick={() => setFilterType('image')}
            >
              Immagini
            </button>
            <button
              className={`btn-mode ${filterType === 'video' ? 'active' : ''}`}
              onClick={() => setFilterType('video')}
            >
              Video
            </button>
          </div>
        </div>
      </div>

      {/* CloudFront Info Strip */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ServerIcon className="svg-icon" style={{ color: 'var(--primary-neon)' }} />
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff' }}>
              Distribuzione CloudFront CDN: <span style={{ color: 'var(--primary-neon)', fontFamily: 'var(--font-mono)' }}>d111111abcdef8.cloudfront.net</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Range Headers abilitati • TTL Caching 86400s • H.264 MP4 Byte-Range Ready
            </div>
          </div>
        </div>

        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--status-published)'
          }}
        >
          S3 REGION: eu-central-1
        </span>
      </div>

      {/* Media Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map(item => (
          <div
            key={item.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '180px', background: '#0c0d12' }}>
              <img
                src={item.cdnUrl}
                alt={item.filename}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  background: 'rgba(0,0,0,0.75)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}
              >
                {item.type}
              </span>
            </div>

            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.filename}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.dimensions} • {item.size} • {item.uploadedAt}
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                  onClick={() => handleCopyUrl(item)}
                >
                  {copiedId === item.id ? (
                    <>
                      <CheckIcon className="svg-icon-sm" /> Copiato!
                    </>
                  ) : (
                    'Copia URL CDN'
                  )}
                </button>

                {item.type === 'image' && (
                  <button
                    className="btn-secondary"
                    style={{ justifyContent: 'center', fontSize: '0.75rem' }}
                    onClick={() => onSendToSplitter(item.cdnUrl)}
                    title="Apri nel Carousel Splitter"
                  >
                    <ScissorsIcon className="svg-icon-sm" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
