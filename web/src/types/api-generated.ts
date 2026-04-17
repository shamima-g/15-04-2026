/**
 * Auto-generated TypeScript types from OpenAPI spec
 * Source: generated-docs/specs/api-spec.yaml
 * DO NOT EDIT MANUALLY — regenerate via type-generator-agent
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = 'user1' | 'user2';

// ─── Request Types ────────────────────────────────────────────────────────────

/**
 * POST /v1/auth/login — request body
 */
export interface LoginRequest {
  /** The user's login username */
  username: string;
  /** The user's password (plain text for demo purposes) */
  password: string;
}

// ─── Response Types ───────────────────────────────────────────────────────────

/**
 * POST /v1/auth/login — 200 response
 */
export interface AuthResponse {
  /**
   * Bearer token to include in subsequent authenticated requests.
   * Stored in memory only — never persisted to localStorage/sessionStorage/cookies.
   */
  token: string;
  /** The user's role, used to determine page access and navigation links */
  role: UserRole;
  /** The user's display name, shown in the navigation bar */
  name: string;
}

/**
 * GET /v1/auth/me — 200 response
 */
export interface WhoAmIResponse {
  /** The authenticated user's role */
  role: UserRole;
  /** The authenticated user's display name */
  name: string;
}

/**
 * Error response shape returned on 4xx/5xx
 */
export interface ErrorResponse {
  /** Human-readable error message */
  message: string;
}
