# Feature: RBAC Demo

## Problem Statement

Developers and stakeholders need a working demonstration of role-based access control (RBAC) implemented in a Next.js frontend application. This demo shows how a login flow, role-filtered navigation, and per-page access enforcement work together using two distinct user roles. It serves as a concrete reference for how RBAC patterns can be applied in production applications built on this stack.

## User Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| User1 | First demo user; broad access | Can access Page 1 and Page 2; sees both pages in navigation |
| User2 | Second demo user; restricted access | Can access Page 2 only; sees only Page 2 in navigation |

## Functional Requirements

### Authentication

- **R1:** The application displays a single login page at `/login` containing a username field, a password field, and a submit button.
- **R2:** When the user submits valid credentials, the frontend sends a POST request to `/v1/auth/login` and receives a response containing `token`, `role`, and `name` fields.
- **R3:** On successful login, the token, role, and display name are stored in memory (JavaScript variables/context only — no localStorage, sessionStorage, or cookies). The user is redirected to the first page accessible to their role.
- **R4:** When the user submits invalid credentials, the API returns an error and the login form displays the message "Invalid credentials" without clearing the username field.
- **R5:** A logout action clears the in-memory token, role, and name, then redirects the user to `/login`.
- **R6:** When the user navigates to any protected route while not logged in (no in-memory token), the application redirects them to `/login`.
- **R7:** On page load or refresh, because no token is persisted, the user is treated as logged out and redirected to `/login` if they attempt to access a protected route.

### Navigation

- **R8:** The navigation component renders only the pages the currently logged-in user is permitted to access. User1 sees links to Page 1 and Page 2. User2 sees a link to Page 2 only.
- **R9:** Page 3 is never shown in the navigation for any user, because no role has been assigned access to it.
- **R10:** The navigation displays the logged-in user's display name (returned from login) and a logout button.

### Pages

- **R11:** Page 1 (`/page-1`) displays the label "Access: User1".
- **R12:** Page 2 (`/page-2`) displays the label "Access: User1, User2".
- **R13:** Page 3 (`/page-3`) displays the label "No users assigned".
- **R14:** Each page has no dynamic data beyond its static access label.

### Access Enforcement

- **R15:** When a logged-in user navigates directly to a URL they do not have access to (e.g., User2 navigating to `/page-1`), the application redirects them to the first page they are permitted to access.
- **R16:** When any logged-in user navigates directly to `/page-3`, the page renders and displays its "No users assigned" label (no redirect, no error — the page is intentionally accessible via direct URL to demonstrate the concept of an unassigned page).
- **R17:** When a logged-out user navigates directly to any protected route (including `/page-3`), the application redirects them to `/login`.

### API / Mock Layer

- **R18:** All API calls use the project's shared API client (`web/src/lib/api/client.ts`). No direct `fetch()` calls appear in components.
- **R19:** An MSW mock layer is configured for all endpoints so the frontend runs independently while the backend is in development. The mock for `POST /v1/auth/login` returns a valid `{ token, role, name }` payload for known credentials and a 401 error for unknown credentials. The mock for `GET /v1/auth/me` returns `{ role, name }` for a valid bearer token.

## Business Rules

- **BR1:** Only User1 (role: `user1`) is permitted to access Page 1. A request to access Page 1 from any other authenticated user results in a redirect to that user's first accessible page.
- **BR2:** User1 (role: `user1`) and User2 (role: `user2`) are permitted to access Page 2. No other roles exist in this demo.
- **BR3:** Page 3 has no role assignments. No authenticated user is navigated there by the application, but the page renders normally when accessed directly via URL — it is not treated as an error state.
- **BR4:** Navigation links are computed from the authenticated user's role at login time and remain fixed for the session. The navigation does not re-fetch role data while the session is active.
- **BR5:** The login error message is always "Invalid credentials" regardless of whether the username or password was wrong. No additional detail is provided.
- **BR6:** Token storage is in-memory only. A browser refresh destroys the session and the user must log in again.
- **BR7:** The login page is the only unauthenticated route. All other routes require a valid in-memory token; absence of a token triggers a redirect to `/login`.
- **BR8:** The `/v1/auth/login` endpoint is marked `x-source: agent-inferred` — the endpoint contract is defined by this FRS and the API spec will be generated by the DESIGN phase.
- **BR9:** The `/v1/auth/me` endpoint is marked `x-source: agent-inferred` — the endpoint contract is defined by this FRS and the API spec will be generated by the DESIGN phase.

## Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| AuthCredentials (request) | `username: string`, `password: string` | Sent to POST /v1/auth/login |
| AuthResponse (response) | `token: string`, `role: "user1" \| "user2"`, `name: string` | Returned by POST /v1/auth/login |
| SessionState (in-memory) | `token: string`, `role: "user1" \| "user2"`, `name: string` | Derived from AuthResponse; held in React context; cleared on logout or refresh |
| WhoAmIResponse (response) | `role: "user1" \| "user2"`, `name: string` | Returned by GET /v1/auth/me |
| PageConfig (static) | `path: string`, `label: string`, `allowedRoles: string[]` | Static configuration — not persisted; defines the 3 demo pages and their access rules |

## Key Workflows

### Login

1. User navigates to `/login` (or is redirected there from a protected route).
2. User enters username and password and submits the form.
3. Frontend sends `POST /v1/auth/login` with `{ username, password }`.
4. **Happy path:** API returns `{ token, role, name }`. Frontend stores values in memory, computes navigation links from role, and redirects user to their first accessible page.
5. **Error path:** API returns a 401 error. Frontend displays "Invalid credentials" on the login form. Username field retains its value; password field is cleared.

### Authenticated Navigation

1. Logged-in user clicks a navigation link.
2. Frontend checks that the target page is in the user's allowed pages list (derived from role).
3. **Happy path:** Page renders with its static label.
4. **Direct URL — permitted page:** Page renders normally.
5. **Direct URL — unpermitted page (not Page 3):** Frontend redirects to the user's first accessible page.
6. **Direct URL — Page 3 (any authenticated user):** Page 3 renders and displays "No users assigned".

### Logout

1. User clicks the logout button in the navigation.
2. Frontend clears in-memory token, role, and name.
3. Frontend redirects to `/login`.

### Session Expiry on Refresh

1. User refreshes the browser.
2. In-memory token is lost.
3. Next.js attempts to render the protected route; middleware/guard detects no token.
4. Frontend redirects to `/login`.

## Compliance & Regulatory Requirements

No compliance domains were identified during intake screening.

## Non-Functional Requirements

- **NFR1:** All pages and the login form are responsive and usable on desktop and mobile screen sizes using Tailwind CSS responsive utilities.
- **NFR2:** All interactive elements (login form fields, submit button, navigation links, logout button) are reachable and operable via keyboard navigation alone.
- **NFR3:** All text and interactive elements meet WCAG AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text and UI components).
- **NFR4:** All form inputs have associated `<label>` elements (or `aria-label` equivalents) so that screen readers announce the field purpose.
- **NFR5:** The application functions correctly on the latest stable versions of Chrome, Firefox, Safari, and Edge.
- **NFR6:** No specific page-load performance SLA is required for this demo application.

## Out of Scope

- User registration and sign-up flows
- Password reset and forgot-password flows
- Admin UI for managing users or roles
- Audit logging of access events
- Multi-tenancy
- Session persistence (localStorage, sessionStorage, cookies)
- Email notifications
- CRUD actions on any page — all pages are read-only
- A dedicated "Access Denied" route or page
- More than two user roles
- More than three pages

## Source Traceability

| ID | Source | Reference |
|----|--------|-----------|
| R1 | User input | Clarifying question: "Describe the login page structure" — single login form for both users |
| R2 | User input | Clarifying question: "Login endpoint and response shape" — POST /v1/auth/login → { token, role, name } |
| R3 | User input | Clarifying question: "Token storage strategy" — in-memory only, no persistence; redirect to first accessible page on success |
| R4 | User input | Clarifying question: "Error message on failed login" — generic "Invalid credentials" |
| R5 | User input | Clarifying question: "Logout behavior" — clear token, redirect to login |
| R6 | User input | Clarifying question: "Behavior for unauthenticated access to protected routes" — redirect to /login |
| R7 | User input | Clarifying question: "Session persistence on refresh" — no persistence; refresh = logged out |
| R8 | User input | Clarifying question: "Navigation filtering rules" — User1 sees Page 1 + Page 2; User2 sees Page 2 only |
| R9 | User input | Clarifying question: "Page 3 nav visibility" — Page 3 not shown in nav for any user |
| R10 | User input | Clarifying question: "Nav content" — display name and logout button in nav |
| R11 | User input | Clarifying question: "Page 1 access label" — "Access: User1" |
| R12 | User input | Clarifying question: "Page 2 access label" — "Access: User1, User2" |
| R13 | User input | Clarifying question: "Page 3 access label" — "No users assigned" |
| R14 | User input | Clarifying question: "Dynamic data on pages" — static labels only, no dynamic data |
| R15 | User input | Clarifying question: "Behavior when authenticated user accesses an unpermitted page" — redirect to first permitted page |
| R16 | User input | Clarifying question: "Page 3 direct URL behavior" — page renders normally; demonstrates unassigned page concept |
| R17 | User input | Clarifying question: "Unauthenticated direct URL access to any route" — redirect to /login |
| R18 | intake-manifest.json | context.dataSource = "api-in-development"; CLAUDE.md rule: all API calls via shared client |
| R19 | intake-manifest.json | artifacts.apiSpec.mockHandlers = true — MSW mock layer for all endpoints |
| BR1 | User input | Clarifying question: "Role-to-page assignments" — User1 → Page 1, Page 2; User2 → Page 2 only |
| BR2 | User input | Clarifying question: "Role-to-page assignments" — Page 2 accessible by both User1 and User2 |
| BR3 | User input | Clarifying question: "Page 3 access rule" — no roles assigned; page renders on direct URL access |
| BR4 | User input | Clarifying question: "When are nav links computed" — at login from role; static for session duration |
| BR5 | User input | Clarifying question: "Login error message" — always "Invalid credentials", no detail |
| BR6 | User input | Clarifying question: "Token persistence" — in-memory only; refresh destroys session |
| BR7 | User input | Clarifying question: "Protected route rule" — all routes except /login require valid in-memory token |
| BR8 | User input | Clarifying question: "API endpoint source" — agent-inferred; x-source tag required |
| BR9 | User input | Clarifying question: "API endpoint source" — agent-inferred; x-source tag required |
| NFR1 | User input | Clarifying question: "Responsive behavior" — desktop and mobile required |
| NFR2 | User input | Clarifying question: "Accessibility requirements" — keyboard navigation required |
| NFR3 | User input | Clarifying question: "Accessibility requirements" — WCAG AA contrast |
| NFR4 | User input | Clarifying question: "Accessibility requirements" — form labels for screen readers |
| NFR5 | User input | Clarifying question: "Browser targets" — latest Chrome, Firefox, Safari, Edge |
| NFR6 | User input | Clarifying question: "Performance SLA" — none specified for demo application |
