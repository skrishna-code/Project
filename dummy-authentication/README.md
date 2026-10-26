# React Authentication App

A React + Vite authentication demo using the DummyJSON auth API.

## Features
- Login with `https://dummyjson.com/auth/login`
- Store access token and user ID in localStorage
- Fetch profile using `https://dummyjson.com/users/:id`
- Render all returned user fields, including nested objects
- Signup form validation (demo only; does not create a real DummyJSON account)
- Loading/error states and responsive dark UI
- React Router routes for login, signup, and profile

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Demo credentials
- Username: `atuny0`
- Password: `9uQFF1Lh`

Other credentials supplied by the project brief may also work if they remain supported by DummyJSON.

## Deployment
Import the repository into Vercel or Netlify. The included `vercel.json` and `netlify.toml` configure SPA route fallback.

## Notes
This is a learning project. `localStorage` token storage is not recommended for production apps exposed to XSS. Use a secure server-managed session for production.
