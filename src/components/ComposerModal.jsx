import React, { useState } from 'react';
import {
  XIcon,
  PlusIcon,
  CheckIcon,
  ScissorsIcon,
  UploadIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
  ThreadsIcon,
  GoogleBusinessIcon
} from './Icons';
import LivePreviews from './LivePreviews';
import { applyUnicodeStyle } from '../utils/unicodeStyler';

export default function ComposerModal({
  isOpen,
  onClose,
  onSavePost,
  initialDate,
  initialData,
  onOpenSplitter
}) {
  if (!isOpen) return null;

  const [selectedPlatforms, setSelectedPlatforms] = useState(
    initialData?.platforms || ['instagram', 'linkedin']
  );
  const [content, setContent] = useState(initialData?.content || '');
  const [firstComment, setFirstComment] = useState(initialData?.firstComment || '');
  const [enableFirstComment, setEnableFirstComment] = useState(!!initialData?.firstComment);
  const [mediaUrls, setMediaUrls] = useState(initialData?.mediaUrls || [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
  ]);
  const [previewPlatform, setPreviewPlatform] = useState(selectedPlatforms[0] || 'instagram');
  const [scheduledDate, setScheduledDate] = useState(
    initialData?.scheduledDate
      ? initialData.scheduledDate.replace(' ', 'T').substring(0, 16)
      : (initialDate ? `${initialDate}T10:30` : '2026-10-28T10:30')
  );

  const platformsList = [
    { id: 'instagram', label: 'Instagram', icon: <InstagramIcon className="svg-icon-sm" />, limit: 2200 },
    { id: 'facebook', label: 'Facebook', icon: <FacebookIcon className="svg-icon-sm" />, limit: 5000 },
    { id: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon className="svg-icon-sm" />, limit: 3000 },
    { id: 'tiktok', label: 'TikTok', icon: <TikTokIcon className="svg-icon-sm" />, limit: 2200 },
    { id: 'youtube', label: 'YouTube', icon: <YouTubeIcon className="svg-icon-sm" />, limit: 5000 },
    { id: 'threads', label: 'Threads', icon: <ThreadsIcon className="svg-icon-sm" />, limit: 500 },
    { id: 'gmb', label: 'Google Business', icon: <GoogleBusinessIcon className="svg-icon-sm" />, limit: 1500 }
  ];

  const togglePlatform = (id) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        const next = selectedPlatforms.filter(p => p !== id);
        setSelectedPlatforms(next);
        if (previewPlatform === id) setPreviewPlatform(next[0]);
      }
    } else {
      const next = [...selectedPlatforms, id];
      setSelectedPlatforms(next);
      setPreviewPlatform(id);
    }
  };

  const handleApplyStyle = (styleType) => {
    const textarea = document.getElementById('composer-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (!selectedText) {
      // If nothing selected, style whole content or alert
      return;
    }

    const styled = applyUnicodeStyle(selectedText, styleType);
    const newContent = content.substring(0, start) + styled + content.substring(end);
    setContent(newContent);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaUrls(prev => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = (index) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (status = 'scheduled') => {
    if (!content.trim() && mediaUrls.length === 0) return;

    const newPost = {
      id: initialData?.id || `post-${Date.now()}`,
      projectId: 'proj-1',
      channel: selectedPlatforms[0],
      platforms: selectedPlatforms,
      content,
      mediaType: mediaUrls.length > 1 ? 'carousel' : (mediaUrls.length === 1 ? 'image' : 'text'),
      mediaUrls,
      scheduledDate,
      status,
      firstComment: enableFirstComment ? firstComment : null
    };

    onSavePost(newPost);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="composer-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="composer-header">
          <div className="composer-title">
            <span style={{ color: 'var(--primary-neon)', fontWeight: 800 }}>Composer</span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Crea, Formatta e Schedula Post
            </span>
          </div>

          <button className="btn-icon-nav" onClick={onClose}>
            <XIcon className="svg-icon" />
          </button>
        </div>

        {/* Body Split Grid */}
        <div className="composer-body">
          {/* Left Editor Pane */}
          <div className="composer-editor-pane">
            {/* Platform Selection */}
            <div className="composer-channels-selector">
              <label className="section-label">
                <span>Canali di Destinazione ({selectedPlatforms.length})</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'none' }}>
                  Clicca per abilitare/disabilitare
                </span>
              </label>

              <div className="channel-selector-row">
                {platformsList.map(item => {
                  const isSelected = selectedPlatforms.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      className={`channel-select-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => togglePlatform(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isSelected && <CheckIcon className="svg-icon-sm" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unicode Styler Toolbar + Textarea */}
            <div>
              <div className="styler-toolbar">
                <div className="styler-group">
                  <button
                    className="styler-btn"
                    onClick={() => handleApplyStyle('bold')}
                    title="Converti testo selezionato in Grassetto Unicode (compatibile LinkedIn/Instagram)"
                  >
                    B
                  </button>
                  <button
                    className="styler-btn"
                    onClick={() => handleApplyStyle('italic')}
                    title="Converti in Corsivo Unicode"
                  >
                    I
                  </button>
                  <button
                    className="styler-btn"
                    onClick={() => handleApplyStyle('mono')}
                    title="Converti in Monospace Unicode"
                  >
                    M
                  </button>
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  Caratteri: {content.length}
                </div>
              </div>

              <textarea
                id="composer-textarea"
                className="editor-textarea"
                placeholder="Scrivi qui il testo del tuo post... Puoi formattare il testo selezionandolo e premendo B (grassetto) o I (corsivo)."
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            {/* Media Upload & Carousel Splitter Section */}
            <div className="media-section-card">
              <div className="media-actions-bar">
                <span className="section-label">Media & Caroselli ({mediaUrls.length})</span>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    onClose();
                    onOpenSplitter();
                  }}
                  style={{ fontSize: '0.78rem', padding: '6px 10px' }}
                >
                  <ScissorsIcon className="svg-icon-sm" />
                  <span>Apri Carousel Splitter</span>
                </button>
              </div>

              {/* Upload Dropzone */}
              <label className="media-dropzone">
                <UploadIcon className="svg-icon" />
                <span className="media-dropzone-text">Trascina immagini o video, oppure clicca per sfogliare</span>
                <span className="media-dropzone-subtext">Supporta JPG, PNG, WebP e MP4 (Archiviazione su AWS S3)</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {/* Slides Strip */}
              {mediaUrls.length > 0 && (
                <div className="slides-strip">
                  {mediaUrls.map((url, i) => (
                    <div key={i} className="slide-thumb-card active">
                      <span className="slide-number-badge">{i + 1}</span>
                      <img src={url} alt={`Slide ${i + 1}`} className="slide-thumb-img" />
                      <button
                        onClick={() => handleRemoveMedia(i)}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: 'rgba(0,0,0,0.8)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                      >
                        <XIcon className="svg-icon-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* First Comment Toggle (Pubblie feature) */}
            <div className="first-comment-box">
              <div
                className="toggle-container"
                onClick={() => setEnableFirstComment(!enableFirstComment)}
              >
                <div className={`toggle-switch ${enableFirstComment ? 'on' : ''}`}>
                  <div className="toggle-switch-thumb" />
                </div>
                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Pubblica Primo Commento Automatico
                </span>
              </div>

              {enableFirstComment && (
                <textarea
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    minHeight: '65px',
                    outline: 'none'
                  }}
                  placeholder="Inserisci qui hashtag aggiuntivi o link esterno (eseguito contemporaneamente alla pubblicazione)..."
                  value={firstComment}
                  onChange={e => setFirstComment(e.target.value)}
                />
              )}
            </div>
          </div>

          {/* Right Live Preview Pane */}
          <div className="composer-preview-pane">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span className="section-label">Live Preview Multipiattaforma</span>
            </div>

            {/* Channel Tabs */}
            <div className="preview-tabs-bar">
              {selectedPlatforms.map(p => (
                <button
                  key={p}
                  className={`preview-tab-btn ${previewPlatform === p ? 'active' : ''}`}
                  onClick={() => setPreviewPlatform(p)}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Live Render Device */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LivePreviews
                platform={previewPlatform}
                content={content}
                mediaUrls={mediaUrls}
                firstComment={enableFirstComment ? firstComment : null}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="composer-footer">
          <div className="schedule-picker-inline">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ClockIcon className="svg-icon-sm" /> Data e Ora:
            </span>
            <input
              type="datetime-local"
              className="date-input-dark"
              value={scheduledDate}
              onChange={e => setScheduledDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="btn-secondary" onClick={() => handleSave('draft')}>
              Salva come Bozza
            </button>
            <button className="btn-secondary" onClick={() => handleSave('published')}>
              Pubblica Subito
            </button>
            <button className="btn-primary" onClick={() => handleSave('scheduled')}>
              <ClockIcon className="svg-icon-sm" />
              <span>Pianifica Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
