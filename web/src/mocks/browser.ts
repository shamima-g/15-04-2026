/**
 * MSW browser worker setup (client-side)
 * Activated automatically when NEXT_PUBLIC_USE_MOCK_API=true
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
