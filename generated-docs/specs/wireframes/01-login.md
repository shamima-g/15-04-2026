# Screen: Login Page

**Route:** `/login`  
**Access:** Public (unauthenticated)  
**FRS refs:** R1, R2, R3, R4, BR5, BR7

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  [Application Title]                    │
│                                                         │
│          ┌─────────────────────────────────┐           │
│          │                                 │           │
│          │  ┌───────────────────────────┐  │           │
│          │  │ Username                  │  │           │
│          │  │ ┌─────────────────────┐   │  │           │
│          │  │ │                     │   │  │           │
│          │  │ └─────────────────────┘   │  │           │
│          │  └───────────────────────────┘  │           │
│          │                                 │           │
│          │  ┌───────────────────────────┐  │           │
│          │  │ Password                  │  │           │
│          │  │ ┌─────────────────────┐   │  │           │
│          │  │ │ ••••••••            │   │  │           │
│          │  │ └─────────────────────┘   │  │           │
│          │  └───────────────────────────┘  │           │
│          │                                 │           │
│          │  ┌─────────────────────────┐    │           │
│          │  │  [Error message area]   │    │           │
│          │  └─────────────────────────┘    │           │
│          │  (hidden when no error)         │           │
│          │                                 │           │
│          │  ┌───────────────────────────┐  │           │
│          │  │       [ Log in ]          │  │           │
│          │  └───────────────────────────┘  │           │
│          │                                 │           │
│          └─────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Elements

| Element        | Type          | Label / Content          | Notes                                                         |
|----------------|---------------|--------------------------|---------------------------------------------------------------|
| Page title     | Heading (h1)  | "Log in"                 | Centred above the card                                        |
| Username field | `<input>`     | Label: "Username"        | `type="text"`, `autocomplete="username"`, retains value on error |
| Password field | `<input>`     | Label: "Password"        | `type="password"`, `autocomplete="current-password"`, cleared on error |
| Error message  | Alert / text  | "Invalid credentials"    | Hidden by default; shown below password on 401 response (BR5) |
| Submit button  | `<button>`    | "Log in"                 | Full-width; disabled while request is in-flight               |

---

## States

### Default (empty form)
- All fields blank
- Error area hidden
- Submit button enabled

### Submitting
- Submit button disabled / shows loading indicator
- Fields are read-only while request is pending

### Error (invalid credentials)
- Error area visible: "Invalid credentials"
- Username field retains value
- Password field cleared
- Submit button re-enabled

### Success
- No visible change — page redirects to first accessible page for the user's role

---

## Behaviours

- Submitting the form with empty fields should be prevented by HTML `required` attribute (no server round-trip)
- On 401: display error message, clear password field, keep username
- On success: store `{ token, role, name }` in memory → redirect to `/page-1` for user1, `/page-2` for user2
- Already-authenticated users navigating to `/login` should be redirected to their first accessible page
