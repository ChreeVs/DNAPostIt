import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { prisma } from '../db/prisma.js';
import { schedulePostJob, cancelPostJob } from '../queues/postQueue.js';
import express from 'express';

export function createMcpServer() {
  const server = new Server(
    {
      name: 'dnapostit-mcp-server',
      version: '1.0.0'
    },
    {
      capabilities: {
        tools: {},
        resources: {}
      }
    }
  );

  // 1. LIST TOOLS
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'schedule_post',
          description: 'Programma la pubblicazione di un post su uno o più social network (Facebook, Instagram, TikTok, LinkedIn, YouTube, Threads, GMB).',
          inputSchema: {
            type: 'object',
            properties: {
              workspace_slug: { type: 'string', description: 'Lo slug del workspace (es: "paa")' },
              platforms: {
                type: 'array',
                items: { type: 'string', enum: ['FACEBOOK', 'INSTAGRAM', 'TIKTOK', 'LINKEDIN', 'YOUTUBE', 'THREADS', 'GMB'] },
                description: 'Array dei social su cui pubblicare'
              },
              content: { type: 'string', description: 'Il testo del post' },
              media_urls: { type: 'array', items: { type: 'string' }, description: 'Array degli URL pubblici dei media (CloudFront)' },
              scheduled_at: { type: 'string', description: 'Data e ora ISO-8601 di pubblicazione (es: 2026-10-29T10:30:00Z)' },
              first_comment: { type: 'string', description: 'Testo del primo commento automatico (facoltativo)' }
            },
            required: ['platforms', 'content', 'scheduled_at']
          }
        },
        {
          name: 'publish_now',
          description: 'Forza la pubblicazione immediata di un post bypassando la programmazione temporale.',
          inputSchema: {
            type: 'object',
            properties: {
              post_id: { type: 'string', description: 'ID univoco del post' }
            },
            required: ['post_id']
          }
        },
        {
          name: 'get_calendar',
          description: 'Recupera tutti i post pianificati e pubblicati per un intervallo temporale.',
          inputSchema: {
            type: 'object',
            properties: {
              workspace_slug: { type: 'string', description: 'Lo slug del workspace (es: "paa")' },
              start_date: { type: 'string', description: 'Data inizio ISO-8601' },
              end_date: { type: 'string', description: 'Data fine ISO-8601' }
            },
            required: ['start_date', 'end_date']
          }
        },
        {
          name: 'get_social_accounts',
          description: 'Estrae la lista e lo stato dei token di tutti i canali social collegati al workspace.',
          inputSchema: {
            type: 'object',
            properties: {
              workspace_slug: { type: 'string', description: 'Lo slug del workspace (es: "paa")' }
            }
          }
        }
      ]
    };
  });

  // 2. CALL TOOLS
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === 'schedule_post') {
      const { workspace_slug, platforms, content, media_urls = [], scheduled_at, first_comment } = args as any;

      const workspace = await prisma.workspace.findFirst({
        where: workspace_slug ? { slug: workspace_slug } : undefined
      });

      if (!workspace) {
        return {
          content: [{ type: 'text', text: 'Errore: Nessun workspace trovato.' }],
          isError: true
        };
      }

      const post = await prisma.post.create({
        data: {
          workspaceId: workspace.id,
          platforms: platforms,
          content: content,
          mediaUrls: media_urls,
          scheduledAt: new Date(scheduled_at),
          firstComment: first_comment || null,
          status: 'SCHEDULED'
        }
      });

      const jobId = await schedulePostJob(post.id, post.scheduledAt);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              status: 'success',
              post_id: post.id,
              job_id: jobId,
              scheduled_at: post.scheduledAt.toISOString(),
              platforms: post.platforms,
              message: 'Post programmato con successo nel calendario editoriale di DNAPostIt.'
            }, null, 2)
          }
        ]
      };
    }

    if (name === 'publish_now') {
      const { post_id } = args as any;
      const post = await prisma.post.findUnique({ where: { id: post_id } });

      if (!post) {
        return {
          content: [{ type: 'text', text: `Errore: Post ${post_id} non trovato.` }],
          isError: true
        };
      }

      await schedulePostJob(post.id, new Date());

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ status: 'success', post_id, message: 'Job di pubblicazione immediata inviato al worker.' })
          }
        ]
      };
    }

    if (name === 'get_calendar') {
      const { start_date, end_date } = args as any;
      const posts = await prisma.post.findMany({
        where: {
          scheduledAt: {
            gte: new Date(start_date),
            lte: new Date(end_date)
          }
        },
        orderBy: { scheduledAt: 'asc' }
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(posts, null, 2) }]
      };
    }

    if (name === 'get_social_accounts') {
      const accounts = await prisma.socialAccount.findMany({
        where: { isActive: true },
        select: {
          id: true,
          platform: true,
          accountName: true,
          accountHandle: true,
          tokenExpiresAt: true,
          createdAt: true
        }
      });

      return {
        content: [{ type: 'text', text: JSON.stringify(accounts, null, 2) }]
      };
    }

    return {
      content: [{ type: 'text', text: `Tool sconosciuto: ${name}` }],
      isError: true
    };
  });

  // 3. LIST RESOURCES
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'social://calendar/current',
          name: 'Piano Editoriale Corrente',
          mimeType: 'application/json'
        }
      ]
    };
  });

  // 4. READ RESOURCE
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (request.params.uri === 'social://calendar/current') {
      const upcomingPosts = await prisma.post.findMany({
        where: {
          scheduledAt: { gte: new Date() }
        },
        orderBy: { scheduledAt: 'asc' },
        take: 20
      });

      return {
        contents: [
          {
            uri: 'social://calendar/current',
            mimeType: 'application/json',
            text: JSON.stringify(upcomingPosts, null, 2)
          }
        ]
      };
    }

    throw new Error('Risorsa non trovata.');
  });

  return server;
}

/**
 * Attaches MCP SSE routes to an Express app
 */
export function setupMcpRoutes(app: express.Express) {
  let transport: SSEServerTransport | null = null;
  const mcpServer = createMcpServer();

  app.get('/mcp/sse', async (req, res) => {
    console.log('[MCP] Client connected via SSE transport');
    transport = new SSEServerTransport('/mcp/messages', res);
    await mcpServer.connect(transport);
  });

  app.post('/mcp/messages', async (req, res) => {
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send('No active SSE connection');
    }
  });
}
