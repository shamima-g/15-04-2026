# Screen: Page 3

**Route:** `/page-3`  
**Access:** No role assignments — only reachable via direct URL  
**FRS refs:** R13, R14, R16, BR3

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 1]  [Page 2]    Hello, User One  [Log out] │
│                  (or User2's nav)                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Page 3                               │
│                                                         │
│             No users assigned                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Elements

| Element        | Type        | Content               | Notes                                                     |
|----------------|-------------|------------------------|-----------------------------------------------------------|
| Navigation     | Component   | Nav bar                | Still shows user's normal links — Page 3 never in nav (R9)|
| Page heading   | Heading     | "Page 3"              | `<h1>`                                                    |
| Access label   | Text        | "No users assigned"   | Static label demonstrating unassigned page concept (BR3)  |

---

## Access Control

- **User1 (direct URL):** Page renders with their standard nav bar
- **User2 (direct URL):** Page renders with their standard nav bar
- **Unauthenticated (direct URL):** Redirected to `/login` (R17)
- **Via nav:** Never accessible via navigation links — no role is assigned, so no nav link is generated (R9, BR3)

---

## Design Note

Page 3 intentionally has no "access denied" state. Its purpose is to demonstrate what an unassigned page looks like — it renders its label for any authenticated user who finds it via direct URL. The nav simply never links to it.
