/**
 * Typed API endpoint functions
 * Source: generated-docs/specs/api-spec.yaml
 * DO NOT EDIT MANUALLY — regenerate via type-generator-agent
 *
 * All API calls use the base client at web/src/lib/api/client.ts.
 * Bearer token must be passed explicitly for authenticated endpoints
 * because the token is stored in memory only (never in cookies/storage).
 */

import { apiClient, post } from '@/lib/api/client';
import type {
  AuthResponse,
  LoginRequest,
  WhoAmIResponse,
} from '@/types/api-generated';

// ─── Auth Endpoints ───────────────────────────────────────────────────────────

/**
 * POST /v1/auth/login
 *
 * Authenticate a user with username and password.
 * Returns a bearer token, role, and display name on success.
 * Throws an APIError (status 401) on invalid credentials.
 *
 * @example
 *   const { token, role, name } = await login({ username: 'user1', password: 'password1' }); // scan-secrets-ignore
 */
export function login(credentials: LoginRequest): Promise<AuthResponse> {
  return post<AuthResponse>('/v1/auth/login', credentials);
}

/**
 * GET /v1/auth/me
 *
 * Verify a bearer token and retrieve the current user's role and display name.
 * Throws an APIError (status 401) when the token is missing or invalid.
 *
 * @param token - In-memory bearer token returned by login()
 *
 * @example
 *   const { role, name } = await getMe(token);
 */
export function getMe(token: string): Promise<WhoAmIResponse> {
  return apiClient<WhoAmIResponse>('/v1/auth/me', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
}
