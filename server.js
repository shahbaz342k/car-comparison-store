import express from 'express';
import { createPageRenderer } from 'vite-plugin-ssr';
import vite from 'vite';

async function start() {
  const app = express();

  // 1) Create Vite dev server in middleware mode
  const viteDevServer = await vite.createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(viteDevServer.middlewares);

  // 2) Create the SSR page renderer
  const { renderPage } = createPageRenderer({ viteDevServer });

  // 3) All routes → SSR
  app.get('*', async (req, res, next) => {
    try {
      const pageContextInit = { urlOriginal: req.originalUrl };
      const pageContext = await renderPage(pageContextInit);
      const { httpResponse } = pageContext;
      if (!httpResponse) return next();
      const { body, statusCode, contentType } = httpResponse;
      res.status(statusCode).type(contentType).send(body);
    } catch (err) {
      viteDevServer.ssrFixStacktrace(err);
      next(err);
    }
  });

  app.listen(3000);
  console.log('Server running: http://localhost:3000');
}

start();
