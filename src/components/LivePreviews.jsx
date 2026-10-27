import React, { useState } from 'react';
import {
  HeartIcon,
  MessageSquareIcon,
  BookmarkIcon,
  ShareIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
  ThreadsIcon,
  GoogleBusinessIcon
} from './Icons';

export default function LivePreviews({
  platform,
  content,
  mediaUrls,
  firstComment,
  accountInfo
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const displayContent = content || 'Inizia a scrivere il testo del post per visualizzare l\'anteprima in tempo reale...';
  const hasMedia = mediaUrls && mediaUrls.length > 0;
  const currentMediaUrl = hasMedia ? mediaUrls[currentSlideIndex] || mediaUrls[0] : null;

  return (
    <div className="social-preview-device">
      {/* INSTAGRAM PREVIEW */}
      {platform === 'instagram' && (
        <div className="ig-mock-card">
          <div className="ig-mock-header">
            <div className="ig-author">
              <div className="ig-avatar">
                <div className="ig-avatar-inner">DA</div>
              </div>
              <div className="ig-username">{accountInfo?.handle || 'dna.agency.official'}</div>
            </div>
            <span style={{ color: '#888', fontWeight: 700, fontSize: '0.8rem' }}>•••</span>
          </div>

          <div className="ig-media-frame">
            {hasMedia ? (
              <img src={currentMediaUrl} alt="Anteprima Media" className="ig-media-img" />
            ) : (
              <div style={{ color: '#666', fontSize: '0.8rem', textAlign: 'center', padding: '20px' }}>
                Nessun media allegato (Seleziona un'immagine o genera un carosello)
              </div>
            )}

            {mediaUrls && mediaUrls.length > 1 && (
              <div className="ig-carousel-dots">
                {mediaUrls.map((_, i) => (
                  <div
                    key={i}
                    className={`ig-dot ${i === currentSlideIndex ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(i)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="ig-actions-row">
            <div className="ig-icons-left">
              <HeartIcon className="svg-icon-sm" />
              <MessageSquareIcon className="svg-icon-sm" />
              <ShareIcon className="svg-icon-sm" />
            </div>
            <BookmarkIcon className="svg-icon-sm" />
          </div>

          <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>248 piace a questa persona</div>

          <div className="ig-caption">
            <span style={{ fontWeight: 700, marginRight: '6px' }}>{accountInfo?.handle || 'dna.agency.official'}</span>
            {displayContent}
          </div>

          {firstComment && (
            <div style={{ borderTop: '1px solid #1a1a24', paddingTop: '6px', marginTop: '6px', fontSize: '0.75rem', color: '#a0a0b0' }}>
              <span style={{ fontWeight: 700, color: '#fff', marginRight: '6px' }}>{accountInfo?.handle || 'dna.agency.official'}</span>
              {firstComment}
            </div>
          )}

          <div style={{ fontSize: '0.65rem', color: '#777', textTransform: 'uppercase' }}>
            2 MINUTI FA
          </div>
        </div>
      )}

      {/* LINKEDIN PREVIEW */}
      {platform === 'linkedin' && (
        <div className="li-mock-card">
          <div className="li-header">
            <div className="li-avatar">DA</div>
            <div className="li-meta">
              <div className="li-name">{accountInfo?.name || 'DNA PostIt Solutions'}</div>
              <div className="li-sub">8.940 follower • 1h • Pubblico</div>
            </div>
          </div>

          <div className="li-content">{displayContent}</div>

          {hasMedia && (
            <div style={{ borderRadius: '6px', overflow: 'hidden', maxHeight: '280px', background: '#0e1014' }}>
              <img src={currentMediaUrl} alt="LinkedIn Media" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2d333b', paddingTop: '10px', color: '#9aa4af', fontSize: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HeartIcon className="svg-icon-sm" /> Consiglia
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MessageSquareIcon className="svg-icon-sm" /> Commenta
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShareIcon className="svg-icon-sm" /> Diffondi
            </span>
          </div>

          {firstComment && (
            <div style={{ background: '#121519', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', color: '#c9d1d9' }}>
              <strong style={{ color: '#58a6ff' }}>Primo Commento Programmato:</strong> {firstComment}
            </div>
          )}
        </div>
      )}

      {/* FACEBOOK PREVIEW */}
      {platform === 'facebook' && (
        <div style={{ background: '#242526', borderRadius: '8px', padding: '14px', color: '#e4e6eb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              DA
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>DNA Digital Agency</div>
              <div style={{ fontSize: '0.72rem', color: '#b0b3b8' }}>Adesso • Pubblica</div>
            </div>
          </div>

          <div style={{ fontSize: '0.88rem', whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>{displayContent}</div>

          {hasMedia && (
            <div style={{ borderRadius: '6px', overflow: 'hidden', maxHeight: '260px' }}>
              <img src={currentMediaUrl} alt="Facebook Media" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #3a3b3c', paddingTop: '8px', color: '#b0b3b8', fontSize: '0.8rem' }}>
            <span>Mi piace</span>
            <span>Commenta</span>
            <span>Condividi</span>
          </div>
        </div>
      )}

      {/* TIKTOK PREVIEW */}
      {platform === 'tiktok' && (
        <div style={{ position: 'relative', height: '480px', borderRadius: '14px', overflow: 'hidden', background: '#090a0f', display: 'flex', alignItems: 'flex-end' }}>
          {hasMedia ? (
            <img src={currentMediaUrl} alt="TikTok Video Frame" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.8rem' }}>
              Anteprima Video 9:16
            </div>
          )}

          {/* Sidebar right buttons */}
          <div style={{ position: 'absolute', right: '12px', bottom: '60px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', color: '#fff' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HeartIcon className="svg-icon-sm" />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>12.4K</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquareIcon className="svg-icon-sm" />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>482</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookmarkIcon className="svg-icon-sm" />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>1.1K</span>
            </div>
          </div>

          {/* Bottom caption */}
          <div style={{ padding: '16px', width: '75%', zIndex: 2, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>@dnatech_official</div>
            <div style={{ fontSize: '0.78rem', color: '#f1f1f1', maxHeight: '70px', overflow: 'hidden' }}>{displayContent}</div>
            <div style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '6px' }}>Suono originale - DNA Agency Audio</div>
          </div>
        </div>
      )}

      {/* THREADS PREVIEW */}
      {platform === 'threads' && (
        <div style={{ background: '#101010', borderRadius: '12px', padding: '16px', color: '#fff', display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              DA
            </div>
            <div style={{ width: '2px', flex: 1, background: '#262626' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
              <span>dna.agency.official</span>
              <span style={{ color: '#777', fontWeight: 400 }}>1m</span>
            </div>

            <div style={{ fontSize: '0.85rem', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>{displayContent}</div>

            {hasMedia && (
              <div style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: '220px', marginTop: '4px' }}>
                <img src={currentMediaUrl} alt="Threads Media" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '14px', color: '#999', marginTop: '6px' }}>
              <HeartIcon className="svg-icon-sm" />
              <MessageSquareIcon className="svg-icon-sm" />
              <ShareIcon className="svg-icon-sm" />
            </div>
          </div>
        </div>
      )}

      {/* YOUTUBE SHORTS / POST */}
      {platform === 'youtube' && (
        <div style={{ background: '#0f0f0f', borderRadius: '10px', padding: '14px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              YT
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>DNA Tech Hub</div>
              <div style={{ fontSize: '0.7rem', color: '#aaa' }}>19.4K iscritti</div>
            </div>
          </div>

          <div style={{ fontSize: '0.84rem', whiteSpace: 'pre-wrap' }}>{displayContent}</div>

          {hasMedia && (
            <div style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: '240px' }}>
              <img src={currentMediaUrl} alt="YouTube Community/Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      )}

      {/* GOOGLE BUSINESS PROFILE */}
      {platform === 'gmb' && (
        <div style={{ background: '#ffffff', color: '#202124', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #dadce0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#4285f4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              G
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>DNA Agency Headquarters</div>
              <div style={{ fontSize: '0.72rem', color: '#5f6368' }}>Aggiornamento aziendale • Google Maps</div>
            </div>
          </div>

          {hasMedia && (
            <div style={{ borderRadius: '6px', overflow: 'hidden', height: '180px' }}>
              <img src={currentMediaUrl} alt="Google Business Profile Media" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ fontSize: '0.84rem', lineHeight: 1.5, color: '#3c4043' }}>{displayContent}</div>

          <button style={{ alignSelf: 'flex-start', background: '#1a73e8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
            Scopri di più
          </button>
        </div>
      )}
    </div>
  );
}
