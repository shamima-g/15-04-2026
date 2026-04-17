# Feature: RBAC Demo

## Summary

A working demonstration of role-based access control (RBAC) in a Next.js frontend application, showing login flow, role-filtered navigation, and per-page access enforcement using two distinct user roles (User1 and User2).

## Epics

1. **Epic 1: Authentication — Login, Logout, and Session Management** - Login page, credential validation via API, in-memory session storage, logout, and session destruction on refresh | Status: Pending | Dir: `epic-1-authentication/`
2. **Epic 2: Role-Filtered Navigation** - Role-based nav links computed at login, display name and logout button in nav, Page 3 never shown | Status: Pending | Dir: `epic-2-role-filtered-navigation/`
3. **Epic 3: Page Components and Access Enforcement** - Page 1/2/3 components, route protection, redirect logic for unauthenticated and unpermitted users | Status: Pending | Dir: `epic-3-page-components-and-access-enforcement/`

## Requirements Coverage

| Epic | Requirements |
|------|-------------|
| Epic 1: Authentication | [R1](../specs/feature-requirements.md#authentication), [R2](../specs/feature-requirements.md#authentication), [R3](../specs/feature-requirements.md#authentication), [R4](../specs/feature-requirements.md#authentication), [R5](../specs/feature-requirements.md#authentication), [R7](../specs/feature-requirements.md#authentication), [R18](../specs/feature-requirements.md#functional-requirements), [R19](../specs/feature-requirements.md#functional-requirements), [BR5](../specs/feature-requirements.md#business-rules), [BR6](../specs/feature-requirements.md#business-rules), [BR7](../specs/feature-requirements.md#business-rules), [BR8](../specs/feature-requirements.md#business-rules), [BR9](../specs/feature-requirements.md#business-rules), [NFR1](../specs/feature-requirements.md#non-functional-requirements), [NFR2](../specs/feature-requirements.md#non-functional-requirements), [NFR3](../specs/feature-requirements.md#non-functional-requirements), [NFR4](../specs/feature-requirements.md#non-functional-requirements), [NFR5](../specs/feature-requirements.md#non-functional-requirements) |
| Epic 2: Role-Filtered Navigation | [R8](../specs/feature-requirements.md#navigation), [R9](../specs/feature-requirements.md#navigation), [R10](../specs/feature-requirements.md#navigation), [BR1](../specs/feature-requirements.md#business-rules), [BR2](../specs/feature-requirements.md#business-rules), [BR3](../specs/feature-requirements.md#business-rules), [BR4](../specs/feature-requirements.md#business-rules), [NFR1](../specs/feature-requirements.md#non-functional-requirements), [NFR2](../specs/feature-requirements.md#non-functional-requirements), [NFR3](../specs/feature-requirements.md#non-functional-requirements), [NFR4](../specs/feature-requirements.md#non-functional-requirements), [NFR5](../specs/feature-requirements.md#non-functional-requirements) |
| Epic 3: Page Components and Access Enforcement | [R6](../specs/feature-requirements.md#authentication), [R11](../specs/feature-requirements.md#pages-and-access), [R12](../specs/feature-requirements.md#pages-and-access), [R13](../specs/feature-requirements.md#pages-and-access), [R14](../specs/feature-requirements.md#pages-and-access), [R15](../specs/feature-requirements.md#pages-and-access), [R17](../specs/feature-requirements.md#pages-and-access), [BR1](../specs/feature-requirements.md#business-rules), [BR2](../specs/feature-requirements.md#business-rules), [BR3](../specs/feature-requirements.md#business-rules), [BR7](../specs/feature-requirements.md#business-rules), [NFR1](../specs/feature-requirements.md#non-functional-requirements), [NFR2](../specs/feature-requirements.md#non-functional-requirements), [NFR3](../specs/feature-requirements.md#non-functional-requirements), [NFR5](../specs/feature-requirements.md#non-functional-requirements) |

## Epic Dependencies

- Epic 1: Authentication — Login, Logout, and Session Management (no dependencies — must be first)
- Epic 2: Role-Filtered Navigation (depends on Epic 1 — requires session context and auth API integration)
- Epic 3: Page Components and Access Enforcement (depends on Epics 1 and 2 — requires auth session and role-filtered nav; fully sequential)
