'use client';

/**
 * MSW MockProvider — conditionally enables browser mock API
 * Only rendered when NEXT_PUBLIC_USE_MOCK_API === 'true'
 * Must be a Client Component because it starts the service worker after mount.
 */

import { useEffect, useState } from 'react';

interface MockProviderProps {
  children: React.ReactNode;
}

async function initMocks(): Promise<void> {
  if (typeof window === 'undefined') return;

  const { worker } = await import('@/mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export function MockProvider({ children }: MockProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initMocks().then(() => setReady(true));
  }, []);

  // Render nothing until the service worker is registered to avoid
  // real API calls before mocks are active
  if (!ready) return null;

  return <>{children}</>;
}
