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
        projectId: 'proj-1',
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
    <div className="page-container">
      <div className="mcp-container">
        {/* Hero banner */}
        <div className="mcp-hero-banner">
          <div>
            <div className="mcp-hero-title">
              <BotIcon className="svg-icon-lg" style={{ color: 'var(--primary-neon)' }} />
              <span>Model Context Protocol (MCP) Server</span>
              <span className="mcp-status-chip">
                <span className="status-indicator online" /> ATTIVO • PORTA 3001
              </span>
            </div>
            <p className="mcp-hero-desc">
              Interfaccia standardizzata che consente ai tuoi agenti AI (Claude Desktop, Cursor, Antigravity, LLM locali) di leggere il piano editoriale, preparare bozze, tagliare caroselli e pubblicare direttamente sui social network.
            </p>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Endpoint SSE & Stdio:</span>
            <code style={{ background: '#07080c', border: '1px solid var(--border-subtle)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--primary-neon)' }}>
              http://localhost:3001/mcp
            </code>
          </div>
        </div>

        {/* Interactive Agent Simulator */}
        <div className="mcp-agent-simulator-box">
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon className="svg-icon" style={{ color: 'var(--primary-neon)' }} />
              Simulatore Interattivo Agente AI
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
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
                background: 'var(--bg-canvas)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--status-published)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckIcon className="svg-icon-sm" /> Tool Eseguito con Successo: {executionLog.toolInvoked}()
                </span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Latenza: 42ms
                </span>
              </div>

              <pre
                style={{
                  background: '#07080c',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#c4b5fd',
                  overflowX: 'auto',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {JSON.stringify(executionLog, null, 2)}
              </pre>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Il post generato dall'agente è ora visibile nel <strong style={{ color: '#fff' }}>Calendario</strong> per il 29 Ottobre.
              </div>
            </div>
          )}
        </div>

        {/* Registered Tools Grid */}
        <div>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>
            Tool MCP Registrati sul Server ({toolsRegistry.length})
          </h3>

          <div className="mcp-grid-cards">
            {toolsRegistry.map((tool) => (
              <div key={tool.name} className="mcp-card">
                <div className="mcp-card-header">
                  <span className="mcp-tool-name">{tool.name}</span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(139, 92, 246, 0.1)',
                      color: 'var(--primary-neon)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    JSON-RPC 2.0
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {tool.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Parametri accettati:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {tool.parameters.map((p) => (
                      <span
                        key={p}
                        style={{
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          background: 'var(--bg-elevated)',
                          color: 'var(--text-primary)',
                          padding: '1px 6px',
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
