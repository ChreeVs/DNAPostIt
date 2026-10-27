import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { postsRouter } from './routes/posts.js';
import { mediaRouter } from './routes/media.js';
import { channelsRouter } from './routes/channels.js';
import { setupMcpRoutes } from './mcp/mcpServer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/posts', postsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/channels', channelsRouter);

// Model Context Protocol (MCP) Server SSE endpoints
setupMcpRoutes(app);

// Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'DNAPostIt Backend & MCP Server'
  });
});

app.listen(PORT, () => {
  console.log(`[DNAPostIt API] Server listening on port ${PORT}`);
  console.log(`[DNAPostIt MCP] Server SSE endpoint active at /mcp/sse`);
});
