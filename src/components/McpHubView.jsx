import React, { useState } from 'react';
import {
  BotIcon,
  ServerIcon,
  CheckIcon,
  SparklesIcon,
  ClockIcon,
  InstagramIcon,
  LinkedInIcon
} from './Icons';

export default function McpHubView({ toolsRegistry, onAgentSchedulePost }) {
  const [simPrompt, setSimPrompt] = useState(
    'Pianifica un post carosello su Instagram e un post approfondito su LinkedIn per il 29 Ottobre alle 15:30 con argomento Ottimizzazione Docker e BullMQ.'
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLog, setExecutionLog] = useState(null);

  const handleSimulateAgent = () => {
    setIsExecuting(true);
    setExecutionLog(null);

    setTimeout(() => {
      // Create new scheduled post via MCP tool execution
      const generatedPost = {
        id: `post-mcp-${Date.now()}`,
        projectId: 'proj-default',
        channel: 'linkedin',
        platforms: ['linkedin', 'instagram'],
        content: "Ottimizzazione avanzata di container Docker su server dedicati: come isolare Redis, PostgreSQL e worker BullMQ massimizzando il throughput I/O senza memory leaks.\n\nEcco i 3 accorgimenti applicati nel nostro ambiente di produzione:\n1. Utilizzo di overlay2 storage driver con limitazione volumetrica per log rotativi.\n2. CPU pinning e memory limits espliciti sui worker intensivi FFmpeg.\n3. Configurazione sysctl per vm.overcommit_memory=1 per evitare failover di Redis.",
        mediaType: 'image',
        mediaUrls: [
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80'
        ],
        scheduledDate: '2026-10-29T15:30:00',
        status: 'scheduled',
        firstComment: 'Trovi il template Docker Compose nel nostro repository interno.'
      };

      onAgentSchedulePost(generatedPost);

      setExecutionLog({
        toolInvoked: 'schedule_post',
        caller: 'Claude 3.5 Sonnet / Antigravity Agent (via MCP Client)',
        parameters: {
          platforms: ['linkedin', 'instagram'],
          scheduled_time: '2026-10-29T15:30:00',
          content_length: 532,
          has_media: true
        },
        response: {
          status: 'success',
          job_id: 'bullmq_job_9482',
          database_record: generatedPost.id,
          message: 'Post inserito nel calendario editoriale e coda BullMQ attivata.'
        }
      });

      setIsExecuting(false);
    }, 1200);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="mcp-container">
        {/* Hero banner */}
        <div className="mcp-hero-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
              <BotIcon className="svg-icon-lg" style={{ color: 'var(--primary-granata)' }} />
              <span>Model Context Protocol (MCP) Server</span>
              <span className="mcp-status-chip">
                <span className="status-indicator" /> ATTIVO • PORTA 3001
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '700px' }}>
              Interfaccia standardizzata che consente ai tuoi agenti AI (Claude Desktop, Cursor, Antigravity, LLM locali) di leggere il piano editoriale, preparare bozze e pubblicare direttamente sui social network.
            </p>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Endpoint SSE & Stdio:</span>
            <code style={{ background: '#f8fafc', border: '1px solid var(--border-grid)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--primary-granata)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              http://localhost:3001/mcp
            </code>
          </div>
        </div>

        {/* Interactive Agent Simulator */}
        <div className="mcp-agent-simulator-box">
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon className="svg-icon" style={{ color: 'var(--primary-granata)' }} />
              Simulatore Interattivo Agente AI
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Invia un'istruzione in linguaggio naturale: l'agente chiamerà i Tool MCP della piattaforma e inserirà realmente il post nel tuo calendario.
            </p>
          </div>

          <div className="mcp-sim-input-row">
            <input
              type="text"
              className="mcp-sim-input"
              value={simPrompt}
              onChange={(e) => setSimPrompt(e.target.value)}
              placeholder="Es: Pianifica un post su LinkedIn per giovedì alle 10:00..."
            />
            <button
              className="btn-primary"
              onClick={handleSimulateAgent}
              disabled={isExecuting || !simPrompt.trim()}
              style={{ padding: '0 24px', flexShrink: 0 }}
            >
              <BotIcon className="svg-icon-sm" />
              <span>{isExecuting ? 'Elaborazione Tool MCP...' : 'Esegui Azione Agente'}</span>
            </button>
          </div>

          {/* Execution Trace */}
          {executionLog && (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid var(--border-grid)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--feed-green)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckIcon className="svg-icon-mini" /> Tool Eseguito con Successo: {executionLog.toolInvoked}()
                </span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  Latenza: 42ms
                </span>
              </div>

              <pre
                style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--primary-granata)',
                  overflowX: 'auto',
                  border: '1px solid var(--border-grid)'
                }}
              >
                {JSON.stringify(executionLog, null, 2)}
              </pre>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Il post generato dall'agente è ora visibile nel <strong style={{ color: 'var(--text-dark)' }}>Calendario</strong> per il 29 Ottobre.
              </div>
            </div>
          )}
        </div>

        {/* Registered Tools Grid */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            Tool MCP Registrati sul Server ({toolsRegistry.length})
          </h3>

          <div className="mcp-grid-cards">
            {toolsRegistry.map((tool) => (
              <div key={tool.name} className="mcp-card">
                <div className="mcp-card-header">
                  <span className="mcp-tool-name">{tool.name}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--primary-granata-subtle)',
                      color: 'var(--primary-granata)',
                      border: '1px solid var(--primary-granata-border)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}
                  >
                    JSON-RPC 2.0
                  </span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {tool.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-grid)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Parametri accettati:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {tool.parameters.map((p) => (
                      <span
                        key={p}
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)',
                          background: '#f1f5f9',
                          color: 'var(--text-dark)',
                          padding: '2px 6px',
                          borderRadius: '3px'
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
