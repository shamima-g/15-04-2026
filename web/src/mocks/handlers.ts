/**
 * MSW mock handlers
 * Source: generated-docs/specs/api-spec.yaml
 * DO NOT EDIT MANUALLY — regenerate via mock-setup-agent / api-mock-refresh
 *
 * Provides realistic mock responses for all RBAC Demo API endpoints.
 * Activated when NEXT_PUBLIC_USE_MOCK_API=true.
 */

import { http, HttpResponse } from 'msw';
import type {
  AuthResponse,
  ErrorResponse,
  WhoAmIResponse,
} from '@/types/api-generated';

const BASE_URL = 'http://localhost:5000';

// ─── In-memory token store (mirrors production in-memory-only requirement) ────

/** Map of token → { role, name } for mock session state */
const sessions: Record<string, { role: 'user1' | 'user2'; name: string }> = {};

// Seed two demo accounts matching the API spec examples
const DEMO_ACCOUNTS: Record<
  string,
  { role: 'user1' | 'user2'; name: string; password: string }
> = {
  user1: { role: 'user1', name: 'User One', password: 'password1' }, // scan-secrets-ignore
  user2: { role: 'user2', name: 'User Two', password: 'password2' }, // scan-secrets-ignore
};

function generateToken(username: string): string {
  return `mock-token-${username}-${Date.now()}`;
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

export const handlers = [
  /**
   * POST /v1/auth/login
   * Accepts demo credentials, returns token + role + name.
   * Returns 401 for unknown username or wrong password.
   */
  http.post(`${BASE_URL}/v1/auth/login`, async ({ request }) => {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };
    const { username, password } = body;

    if (!username || !password) {
      return HttpResponse.json(
        {
          message: 'Username and password are required',
        } satisfies ErrorResponse,
        { status: 400 },
      );
    }

    const account = DEMO_ACCOUNTS[username];
    if (!account || account.password !== password) {
      return HttpResponse.json(
        { message: 'Invalid credentials' } satisfies ErrorResponse,
        { status: 401 },
      );
    }

    const token = generateToken(username);
    sessions[token] = { role: account.role, name: account.name };

    return HttpResponse.json({
      token,
      role: account.role,
      name: account.name,
    } satisfies AuthResponse);
  }),

  /**
   * GET /v1/auth/me
   * Validates the Authorization: Bearer <token> header.
   * Returns role + name for a valid token, 401 otherwise.
   */
  http.get(`${BASE_URL}/v1/auth/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace(/^Bearer\s+/i, '') ?? '';

    const session = sessions[token];
    if (!session) {
      return HttpResponse.json(
        { message: 'Unauthorized' } satisfies ErrorResponse,
        { status: 401 },
      );
    }

    return HttpResponse.json({
      role: session.role,
      name: session.name,
    } satisfies WhoAmIResponse);
  }),
];
