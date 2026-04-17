# Component: Navigation Bar

**Rendered on:** All protected pages (`/page-1`, `/page-2`, `/page-3`)  
**Access:** Authenticated users only  
**FRS refs:** R8, R9, R10, BR4

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  [App name / logo]    [Page links…]    Hello, {name}  [Logout] │
└─────────────────────────────────────────────────────────┘
```

### User1 view (role: user1)

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 1]  [Page 2]    Hello, User One  [Log out] │
└─────────────────────────────────────────────────────────┘
```

### User2 view (role: user2)

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 2]             Hello, User Two  [Log out] │
└─────────────────────────────────────────────────────────┘
```

---

## Elements

| Element          | Type              | Content                            | Notes                                                         |
|------------------|-------------------|------------------------------------|---------------------------------------------------------------|
| App name         | Text / link to `/`| "RBAC Demo"                        | Optional home link                                             |
| Nav links        | `<a>` / `<Link>`  | Page names for allowed pages only  | Page 3 never appears; links computed once at login (BR4)      |
| User greeting    | Text              | "Hello, {name}"                    | `name` from in-memory session; right-aligned                  |
| Log out button   | `<button>`        | "Log out"                          | Clears memory → redirect to `/login`                          |

---

## Behaviours

- Navigation links are computed from the user's role when the session is created (BR4)
- Page 3 link is never shown regardless of role (R9)
- Active page link is visually highlighted (current route)
- Logout clears all in-memory session data and redirects to `/login`
- Nav is only rendered when a valid in-memory session exists; unauthenticated users never see it
