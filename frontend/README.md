# URL Shortener — frontend

A clean, SaaS-style React frontend for your Flask URL shortener, built with
Tailwind CSS, React Icons, and react-hot-toast. No backend logic or endpoint
names were touched — this only replaces the UI layer.

## Structure

```
src/
  api/urlApi.js            The only place that calls fetch(). POST /short and
                            GET /<short_url> — unchanged endpoint contract.
  hooks/useShorten.js       Request lifecycle: idle → loading → success/error.
  components/
    Hero.jsx                 Title + subtitle.
    ShortenerCard.jsx         Card shell; switches between form/result/error.
    ShortenerForm.jsx         Long URL + alias inputs, expiry selector, submit.
    ExpirySelector.jsx        Segmented control (see note below).
    ResultCard.jsx             Success state: shortened link + copy button.
    ErrorAlert.jsx              Inline error alert (replaces browser alert()).
    Button.jsx / Spinner.jsx    Reusable primitives used throughout.
    Footer.jsx
  App.jsx                    Page shell + react-hot-toast setup.
```

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_BASE_URL at your Dockerized backend
npm run dev
```

### CORS

Your Flask backend needs CORS enabled for the frontend's origin, e.g.:

```python
from flask_cors import CORS
CORS(app, resources={r"/short": {"origins": "http://localhost:5173"}})
```

## Build

```bash
npm run build   # outputs to dist/
```

## One honest note on the expiry selector

The requirements asked for an expiry-time selector, but your `/short` route
hardcodes every link to `expires_at = now + timedelta(days=1)` — it doesn't
read an expiry value from the request. Rather than build a dropdown that
silently does nothing, `ExpirySelector.jsx` ships with **"24 hours" as the
only enabled option**; the others render disabled with a "soon" badge. If you
want real per-link expiry, the backend would need to accept something like
`expires_in` in the `/short` payload — happy to wire that up on both ends if
you want it, just flagging that it's outside "frontend only."

## What stayed the same

- `POST /short` payload: `{ long_url, alias? }`
- Response field names (`short_url` / `Short_url`, normalized client-side as before)
- `GET /<short_url>` redirect behavior — the result card's link points straight at it
- Rate-limit (429), duplicate-alias (409), and validation (400) responses are
  surfaced as the same errors, just rendered as a styled alert instead of a
  browser `alert()`
