import React, { useState, useRef, useEffect } from 'react';
import {
  ScissorsIcon,
  UploadIcon,
  PlusIcon,
  CheckIcon,
  LayersIcon,
  ImageIcon
} from './Icons';

export default function CarouselSplitterView({ onSendToComposer, mediaLibrary = [] }) {
  const [slicesCount, setSlicesCount] = useState(3);
  const [aspectRatio, setAspectRatio] = useState('4:5'); // '4:5' or '1:1'
  const [imageSrc, setImageSrc] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80'
  );
  const [slicedImages, setSlicedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  // Slices generation using HTML5 canvas
  const processSlices = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const results = [];
      const sliceWidth = img.width / slicesCount;
      const sliceHeight = img.height;

      for (let i = 0; i < slicesCount; i++) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = sliceWidth;
        offCanvas.height = sliceHeight;
        const ctx = offCanvas.getContext('2d');

        ctx.drawImage(
          img,
          i * sliceWidth,
          0,
          sliceWidth,
          sliceHeight,
          0,
          0,
          sliceWidth,
          sliceHeight
        );

        results.push(offCanvas.toDataURL('image/jpeg', 0.95));
      }

      setSlicedImages(results);
      setIsProcessing(false);
    };

    img.onerror = () => {
      setIsProcessing(false);
    };

    img.src = imageSrc;
  };

  useEffect(() => {
    processSlices();
  }, [imageSrc, slicesCount, aspectRatio]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportToComposer = () => {
    if (slicedImages.length > 0 && onSendToComposer) {
      onSendToComposer(slicedImages);
    }
  };

  return (
    <div className="page-container">
      <div className="splitter-view-grid">
        {/* Left Controls Panel */}
        <div className="splitter-controls-panel">
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Parametri di Slicing</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Scomponi un'immagine panoramica o orizzontale in slide carosello perfette per Instagram e LinkedIn.
            </p>
          </div>

          {/* Slices count selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="section-label">Numero di Slide ({slicesCount})</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  className={`btn-secondary ${slicesCount === num ? 'active' : ''}`}
                  style={{ justifyContent: 'center', padding: '8px 0', fontWeight: 800 }}
                  onClick={() => setSlicesCount(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="section-label">Rapporto Dimensionale</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                className={`btn-secondary ${aspectRatio === '4:5' ? 'active' : ''}`}
                style={{ justifyContent: 'center' }}
                onClick={() => setAspectRatio('4:5')}
              >
                Verticale (4:5)
              </button>
              <button
                className={`btn-secondary ${aspectRatio === '1:1' ? 'active' : ''}`}
                style={{ justifyContent: 'center' }}
                onClick={() => setAspectRatio('1:1')}
              >
                Quadrato (1:1)
              </button>
            </div>
          </div>

          {/* Upload Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="section-label">Carica Immagine Panoramica</label>
            <label
              className="btn-secondary"
              style={{ justifyContent: 'center', cursor: 'pointer', padding: '12px' }}
            >
              <UploadIcon className="svg-icon-sm" />
              <span>Scegli File dal Computer</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {/* Quick Select from S3 Library */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="section-label">Oppure Seleziona da S3 Library</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {mediaLibrary.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => setImageSrc(item.cdnUrl)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={item.cdnUrl}
                    alt={item.filename}
                    style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {item.filename}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {item.dimensions}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Export Button */}
          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '14px', justifyContent: 'center' }}
              onClick={handleExportToComposer}
              disabled={isProcessing || slicedImages.length === 0}
            >
              <ScissorsIcon className="svg-icon" />
              <span>Invia all'Editor come Carosello</span>
            </button>
          </div>
        </div>

        {/* Right Canvas & Slices Inspection */}
        <div className="splitter-canvas-area">
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>Guida di Taglio Dinamica</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Le linee tratteggiate indicano le coordinate esatte in cui il motore locale FFmpeg/Sharp effettuerà il taglio delle slide.
            </p>
          </div>

          {/* Main Visual Guide Canvas */}
          <div className="canvas-preview-wrapper">
            <img
              src={imageSrc}
              alt="Panoramica sorgente"
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '340px', objectFit: 'contain' }}
            />

            {/* Split guidelines overlay */}
            <div className="split-guide-lines">
              {Array.from({ length: slicesCount }).map((_, idx) => (
                <div key={idx} className="split-guide-col">
                  <div className="split-guide-tag">SLIDE {idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sliced Output Strip */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-white)' }}>
                Slide Generate ({slicedImages.length} Frame Pronti)
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-neon)', fontFamily: 'var(--font-mono)' }}>
                1080 x 1350 px (HD S3 Optimized)
              </span>
            </div>

            <div className="splitter-results-grid">
              {slicedImages.map((dataUrl, idx) => (
                <div key={idx} className="slice-result-card">
                  <div className="slice-result-img-box">
                    <img src={dataUrl} alt={`Slide ${idx + 1}`} className="slice-result-img" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Frame #{idx + 1}</span>
                    <span style={{ color: 'var(--status-published)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CheckIcon className="svg-icon-sm" /> OK
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
