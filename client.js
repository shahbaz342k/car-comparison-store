// import React from 'react';
// import ReactDOM from 'react-dom/client';
// eslint-disable-next-line react/no-deprecated
import { hydrate } from 'react-dom';
import { ClientRouter } from 'vite-plugin-ssr/client/router';
import { PageShell } from './src/PageShell';
import './src/index.css';

hydrate(
  <ClientRouter 
    render={(Page, pageProps) => (
      <PageShell>
        <Page {...pageProps} />
      </PageShell>
    )}
  />,
  document.getElementById('root')
);
