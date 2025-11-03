# Google OAuth Setup

Follow these steps to enable Google Sign-In with NextAuth:

## 1) Create OAuth Client in Google Cloud Console
- Go to: https://console.cloud.google.com/apis/credentials
- Create OAuth 2.0 Client (type: Web application)
- Authorized JavaScript origins:
  - Development: `http://localhost:3061`
  - Production: `https://your-production-domain.com`
- Authorized redirect URIs:
  - Development: `http://localhost:3061/api/auth/callback/google`
  - Production: `https://your-production-domain.com/api/auth/callback/google`

## 2) Set Environment Variables
Create a `.env.local` for development and a production env in your hosting provider.

Required keys:
- `NEXTPUBLIC_BASE_URL` (optional, used for SEO canonical)
- `NEXTAUTH_URL` (must match the public site URL)
- `NEXTAUTH_SECRET` (strong random string)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET` (used by custom JWT integration)

Examples are provided in `.env.example`.

## 3) Development vs Production
- Dev runs on port `3061` (see `package.json`), so use `http://localhost:3061`.
- Production must use your real domain (no localhost). Ensure `NEXTAUTH_URL` matches.

## 4) Common Errors
- `Error 400: redirect_uri_mismatch` — Update Google Console to include your exact redirect URI and ensure `NEXTAUTH_URL` is set to the same site base URL.
- Blank page on sign-in — Use default redirect behavior in the client (`signIn('google')`) so NextAuth navigates properly.

## 5) Verify
- Trigger sign-in and confirm you’re redirected to Google and back to `/api/auth/callback/google`.
- Check `/api/auth/session` returns a session after sign-in.