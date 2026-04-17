# Screen: Page 2

**Route:** `/page-2`  
**Access:** roles `user1` and `user2`  
**FRS refs:** R12, R14, BR2

---

## Layout — User1

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 1]  [Page 2]    Hello, User One  [Log out] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Page 2                               │
│                                                         │
│           Access: User1, User2                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Layout — User2

```
┌─────────────────────────────────────────────────────────┐
│  RBAC Demo    [Page 2]             Hello, User Two  [Log out] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Page 2                               │
│                                                         │
│           Access: User1, User2                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Elements

| Element        | Type        | Content                  | Notes                                      |
|----------------|-------------|--------------------------|---------------------------------------------|
| Navigation     | Component   | Nav bar                  | Links vary by role (R8)                     |
| Page heading   | Heading     | "Page 2"                 | `<h1>`                                      |
| Access label   | Text        | "Access: User1, User2"   | Static, no dynamic data (R14)               |

---

## Access Control

- **User1:** Page renders normally
- **User2:** Page renders normally
- **Unauthenticated:** Redirected to `/login` (R6, R17)
