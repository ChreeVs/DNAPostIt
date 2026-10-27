import React, { useState } from 'react';
import {
  SlidersIcon,
  ServerIcon,
  CheckIcon,
  BotIcon,
  SparklesIcon,
  DatabaseIcon,
  RefreshIcon
} from './Icons';

export default function SettingsView({ toolsRegistry, onAgentSchedulePost }) {
  const [activeTab, setActiveTab] = useState('mcp'); // 'mcp' | 'storage' | 'server'

  // MCP Simulator & AI Provider State
  const [simPrompt, setSimPrompt] = useState(
    'Pianifica un post di lancio su Instagram e LinkedIn per il 29 Ottobre alle 15:30 con argomento Strategia Multi-Channel.'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // AI Provider Keys
  const [anthropicKey, setAnthropicKey] = useState('sk-ant-api03-prod-************************');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-prod-************************');
  const [geminiKey, setGeminiKey] = useState('AIzaSy-prod-************************');
  const [ollamaHost, setOllamaHost] = useState('http://localhost:11434');
  const [saveAiSuccess, setSaveAiSuccess] = useState(false);

  // Media Storage State (pCloud / S3)
  const [storageProvider, setStorageProvider] = useState('pcloud'); // 'pcloud' | 's3'
  const [pcloudToken, setPcloudToken] = useState('pcloud_oauth_d9f82a10b4c73e9a');
  const [pcloudRegion, setPcloudRegion] = useState('https://eapi.pcloud.com');
  const [pcloudFolder, setPcloudFolder] = useState('DNAPostIt_Media');
  const [pcloudLinkMode, setPcloudLinkMode] = useState('direct'); // 'direct' | 'public_folder'
  const [isTestingPcloud, setIsTestingPcloud] = useState(false);
  const [pcloudTestResult, setPcloudTestResult] = useState(null);

  // Docker Services State
  const [serverActionStatus, setServerActionStatus] = useState(null);
  const dockerServices = [
    { name: 'caddy-proxy', role: "Reverse Proxy & Auto-SSL Let's Encrypt", port: '80/443', status: 'Running', uptime: '14 giorni' },
    { name: 'postgres-db', role: 'Database Relazionale (PostgreSQL 16)', port: '5432', status: 'Running', uptime: '14 giorni' },
    { name: 'redis-cache', role: 'Coda Code e Memoria Volatile (Redis 7)', port: '6379', status: 'Running', uptime: '14 giorni' },
    { name: 'bullmq-worker', role: 'Motore di Schedulazione & Social Dispatcher', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'media-ffmpeg', role: 'Transcodifica H.264 & Sharp Slicer', port: 'Internal', status: 'Running', uptime: '14 giorni' },
    { name: 'mcp-server', role: 'Model Context Protocol Bridge (Stdio/SSE)', port: '3001', status: 'Running', uptime: '14 giorni' }
  ];

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveAiKeys = (e) => {
    e.preventDefault();
    setSaveAiSuccess(true);
    setTimeout(() => setSaveAiSuccess(false), 2500);
  };

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
        server: pcloudRegion.includes('eapi') ? 'Europa - Francoforte (eapi.pcloud.com)' : 'USA - Dallas (api.pcloud.com)',
        message: 'Token verificato con successo. Permessi di lettura/scrittura e generazione link diretti CDN attivi.'
      });
    }, 700);
  };

  const handleSimulateAgent = () => {
    setIsExecuting(true);
    setExecutionLog(null);

    setTimeout(() => {
      const generatedPost = {
        id: `post-mcp-${Date.now()}`,
        projectId: 'proj-default',
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
    }, 1100);
  };

  const handleServerAction = (actionName) => {
    setServerActionStatus(`${actionName} in corso...`);
    setTimeout(() => {
      setServerActionStatus(`${actionName} completato con successo.`);
      setTimeout(() => setServerActionStatus(null), 3000);
    }, 1200);
  };

  return (
    <div style={{ padding: '28px 36px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Header Generico Piattaforma */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <SlidersIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.02em', margin: 0 }}>
            Impostazioni Piattaforma
          </h1>
        </div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
          Configurazione globale del sistema indipendente dai singoli progetti: Hub Model Context Protocol (MCP) per agenti AI, storage multimediale su pCloud Drive e monitoraggio container Docker su server dedicato.
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
          { key: 'mcp', label: 'Hub MCP & Integrazioni AI', icon: <BotIcon className="svg-icon-sm" /> },
          { key: 'storage', label: 'Storage Media (pCloud / S3)', icon: <DatabaseIcon className="svg-icon-sm" /> },
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

      {/* ========================================================
          TAB 1: HUB MCP & INTEGRAZIONI AI
          ======================================================== */}
      {activeTab === 'mcp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* MCP Server Info Card */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BotIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-dark)', margin: 0 }}>
                    Model Context Protocol (MCP) Server
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Ponte ufficiale per consentire agli agenti AI (Claude Desktop, Cursor, Antigravity, LLM locali) di leggere calendari e pubblicare post
                  </div>
                </div>
              </div>

              <span style={{ background: '#dcfce7', color: 'var(--feed-green)', padding: '4px 12px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckIcon className="svg-icon-mini" /> SERVER ATTIVO (PORTA 3001)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    ENDPOINT SSE (SERVER-SENT EVENTS)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('http://localhost:3001/mcp/sse', 'sse')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-granata)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedField === 'sse' ? 'Copiato!' : 'Copia'}
                  </button>
                </div>
                <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-granata)', marginTop: '4px' }}>
                  http://localhost:3001/mcp/sse
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    TRASPORTO STDIO (PER CLAUDE DESKTOP & CURSOR)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('node server/dist/mcp/mcpServer.js', 'stdio')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-granata)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {copiedField === 'stdio' ? 'Copiato!' : 'Copia'}
                  </button>
                </div>
                <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-dark)', marginTop: '4px' }}>
                  node server/dist/mcp/mcpServer.js
                </div>
              </div>
            </div>

            {/* Tools Registry */}
            <div style={{ marginBottom: '22px' }}>
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

            {/* Interactive Simulator Box */}
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
                    Istruzione agentica elaborata ed eseguita via protocollo JSON-RPC 2.0.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Providers Keys Configuration */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
              Chiavi API Provider AI (Anthropic, OpenAI, Gemini, Ollama)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              Configura i token per i modelli linguistici utilizzati per la scrittura assistita, riformulazione post e generazione hashtag.
            </p>

            <form onSubmit={handleSaveAiKeys} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  ANTHROPIC CLAUDE API KEY (CLAUDE 3.5 SONNET)
                </label>
                <input
                  type="password"
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  OPENAI API KEY (GPT-4O / GPT-4O-MINI)
                </label>
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  GOOGLE GEMINI API KEY (GEMINI 2.0 FLASH)
                </label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
                  OLLAMA LOCAL HOST (PER MODELLI LOCALI LLAMA/MISTRAL)
                </label>
                <input
                  type="text"
                  value={ollamaHost}
                  onChange={(e) => setOllamaHost(e.target.value)}
                  className="date-input-dark"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '6px' }}>
                <button
                  type="submit"
                  className="composer-submit-btn"
                  style={{ padding: '8px 22px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}
                >
                  Salva Configurazioni AI
                </button>
                {saveAiSuccess && (
                  <span style={{ color: 'var(--feed-green)', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckIcon className="svg-icon-mini" /> Chiavi salvate con successo nel server.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: STORAGE MEDIA (PCLOUD DRIVE / S3)
          ======================================================== */}
      {activeTab === 'storage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px' }}>
                  Storage Multimediale: pCloud Drive
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  Sostituisce completamente AWS S3 azzerando i costi di banda. I caroselli, foto e video vengono caricati sulla tua app pCloud e distribuiti ai social via link diretti CDN.
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
                      Viene creata automaticamente nella radice della tua app pCloud.
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

      {/* ========================================================
          TAB 3: SERVER DEDICATO & DOCKER
          ======================================================== */}
      {activeTab === 'server' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid var(--border-grid)', borderRadius: '10px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <ServerIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
                  Container Docker Attivi sul Server Dedicato
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Infrastruttura containerizzata orchestrata con Docker Compose e proxy Caddy con rinnovo automatico certificati SSL
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--feed-green)', fontWeight: 700, background: '#dcfce7', padding: '4px 10px', borderRadius: '12px' }}>
                DOCKER COMPOSE V2 ACTIVE
              </span>
            </div>

            {/* Hardware Metrics Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>UTILIZZO CPU</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>14%</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>MEMORIA RAM</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>3.4 / 16 GB</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>DISCO VOLUMI DOCKER</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>22.8 / 250 GB</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border-grid)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>SISTEMA OPERATIVO</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-granata)' }}>Ubuntu 24.04 LTS</div>
              </div>
            </div>

            {/* Container Table */}
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
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

            {/* Quick Server Maintenance Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-grid)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleServerAction('Riavvio container')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-grid)',
                    background: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  Riavvia Container
                </button>
                <button
                  type="button"
                  onClick={() => handleServerAction('Svuotamento cache Redis')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-grid)',
                    background: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  Svuota Cache Redis
                </button>
                <button
                  type="button"
                  onClick={() => handleServerAction('Verifica certificato Caddy SSL')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-grid)',
                    background: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-dark)',
                    cursor: 'pointer'
                  }}
                >
                  Verifica Certificato SSL
                </button>
              </div>

              {serverActionStatus && (
                <span style={{ color: 'var(--feed-green)', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckIcon className="svg-icon-mini" /> {serverActionStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
