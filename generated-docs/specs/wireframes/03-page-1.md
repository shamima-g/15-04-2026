# Screen: Page 1

**Route:** `/page-1`  
**Access:** role `user1` only  
**FRS refs:** R11, R14, R15, BR1

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 1]  [Page 2]    Hello, User One  [Log out] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Page 1                               │
│                                                         │
│              Access: User1                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Elements

| Element        | Type        | Content         | Notes                           |
|----------------|-------------|-----------------|----------------------------------|
| Navigation     | Component   | Nav bar         | Shows Page 1 + Page 2 for user1  |
| Page heading   | Heading     | "Page 1"        | `<h1>`                           |
| Access label   | Text        | "Access: User1" | Static, no dynamic data (R14)    |

---

## Access Control

- **User1:** Page renders normally
- **User2:** Redirected to `/page-2` (their first accessible page) (R15, BR1)
- **Unauthenticated:** Redirected to `/login` (R6, R17)
