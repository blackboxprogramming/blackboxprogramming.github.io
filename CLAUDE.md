# CLAUDE.md

This document provides guidance for AI assistants working with the BlackRoad codebase.

## Project Overview

**BlackRoad** is a static website for a platform that "builds sovereign, local-first systems." It features authentication, a dashboard for system monitoring, and node status displays. The site is designed for deployment on GitHub Pages or any static file server.

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (variables) for theming
- **Vanilla JavaScript (ES6)** - No frameworks or dependencies
- **JSON** - Data format for dashboard information
- **JetBrains Mono** - Monospace font (Google Fonts)

**No build system** - Direct static file serving; no webpack, npm, or bundlers.

## Directory Structure

```
/
├── index.html              # Landing page
├── assets/
│   ├── css/
│   │   ├── theme.css       # Color palette, typography, base styles
│   │   └── style.css       # Additional component styles
│   ├── js/
│   │   ├── auth.js         # Authentication functions
│   │   └── dashboard.js    # Dashboard data fetching
│   └── data/
│       └── dashboard.json  # System status data (JSON)
├── auth/
│   ├── login.html          # Login form page
│   └── dashboard.html      # Auth-gated dashboard entry
├── dashboard/
│   ├── index.html          # Main dashboard view
│   └── nodes.html          # System nodes display
├── pages/
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   └── status.html         # Status page
└── templates/
    ├── banner.html         # ASCII art banner (injected via fetch)
    └── base.html           # Base HTML template reference
```

## Key Conventions

### Color Palette (BlackRoad Canon)

All colors use CSS custom properties defined in `assets/css/theme.css`:

```css
/* Core */
--bg: #000000;
--fg: #ffffff;
--muted: #8a8a8a;

/* BlackRoad Canon Palette */
--br-orange-1: #FF9D00;
--br-orange-2: #FF6B00;
--br-pink-1:   #FF0066;
--br-pink-2:   #FF006B;
--br-purple-1: #D600AA;
--br-purple-2: #7700FF;
--br-blue-1:   #0066FF;
```

**Always use CSS variables** - Never hardcode colors. Use `var(--br-*)` syntax.

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.badge` | Bordered badge/tag styling |
| `.status-online` | Blue status indicator |
| `.status-warn` | Orange warning indicator |
| `.status-hot` | Pink/hot indicator |
| `.center` | Centering utility |

### JavaScript Patterns

- **No frameworks** - Use vanilla ES6 JavaScript
- **Fetch API** - For loading templates and data
- **localStorage** - For client-side auth state (key: `blackroad_auth`)

### File Naming

- Lowercase filenames with `.html`, `.css`, `.js` extensions
- Descriptive names (e.g., `auth.js`, `dashboard.js`, `theme.css`)
- Directory names match their purpose (`auth/`, `dashboard/`, `pages/`)

### HTML Page Structure

All pages follow this pattern:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Page Title — BlackRoad</title>
  <link rel="stylesheet" href="/assets/css/theme.css">
</head>
<body>

<div id="banner"></div>

<div style="padding: 32px;">
  <!-- PAGE CONTENT -->
</div>

<script>
fetch("/templates/banner.html")
  .then(r => r.text())
  .then(html => document.getElementById("banner").innerHTML = html);
</script>

</body>
</html>
```

### Navigation Links

Use absolute paths from root:
- `/dashboard/` - Dashboard
- `/auth/login.html` - Login page
- `/pages/about.html` - About page

## Authentication System

Client-side only using localStorage:

```javascript
// Key functions in assets/js/auth.js
login(e)      // Sets localStorage flag, redirects to dashboard
logout()      // Removes flag, redirects to home
requireAuth() // Checks flag, redirects to login if absent
```

**Note:** This is UI-only authentication - no server-side validation.

## Data Files

### dashboard.json

Located at `assets/data/dashboard.json`:

```json
{
  "status": "OPERATIONAL",
  "uptime": "99.99%",
  "nodes": [
    { "name": "lucidia", "state": "online" },
    { "name": "octavia", "state": "online" },
    { "name": "aria", "state": "offline" }
  ]
}
```

Edit this file to update dashboard data.

## Development Guidelines

### When Adding New Pages

1. Copy from `templates/base.html`
2. Include the banner injection script
3. Link `theme.css` from `/assets/css/`
4. Use the `<title>Page Name — BlackRoad</title>` format
5. Wrap content in `<div style="padding: 32px;">`

### When Adding Styles

1. Add to existing CSS files rather than creating new ones
2. Use BlackRoad palette variables (`--br-*`)
3. Keep the dark theme aesthetic (black background, white text)
4. Prefer utility classes for common patterns

### When Adding JavaScript

1. Keep scripts minimal and focused
2. Use Fetch API for data loading
3. No external dependencies or frameworks
4. Place shared functions in dedicated files under `assets/js/`

### Do Not

- Hardcode color values - always use CSS variables
- Add npm packages or build tools
- Create light theme variants
- Use frameworks (React, Vue, etc.)
- Add unnecessary comments - code should be self-explanatory

## Common Tasks

### Update System Status

Edit `assets/data/dashboard.json` to change status, uptime, or node states.

### Add a New Node

Add to the `nodes` array in `assets/data/dashboard.json`:

```json
{ "name": "nodename", "state": "online" }
```

### Create a New Static Page

1. Create file in `pages/` directory
2. Follow the base template structure
3. Add navigation link where appropriate

### Modify the Banner

Edit `templates/banner.html` - this is injected into all pages via JavaScript fetch.

## Testing

No automated tests. Verify changes by:
1. Opening pages directly in a browser
2. Testing navigation links
3. Checking authentication flow (login → dashboard → logout)
4. Verifying dashboard data loads correctly

For local development, use any static file server (e.g., `python -m http.server`).
