# Expert Electronic & Communication — Project Notes

> Reference document for setup, credentials, DNS, and deployment.
> Keep this updated whenever changes are made.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| CMS | Sanity.io |
| Email | Resend |
| Hosting | Vercel |
| Domain | expertelectronic.co.th (registered at YourConnect) |
| Version Control | GitHub |

---

## Repositories

| Repo | Purpose | URL |
|------|---------|-----|
| `Expert-Electronic` | Main website (frontend) | https://github.com/IthChanakijkamjorn/Expert-Electronic |
| `studio` (local) | Sanity CMS studio | Deployed at https://expert-electronic.sanity.studio |

---

## Deployment

### Vercel (Frontend)
- **Project URL:** https://expert-electronic.vercel.app
- **Live domain:** https://www.expertelectronic.co.th
- **Production branch:** `main`
- Auto-deploys on every push to `main`

### Environment Variables (set in Vercel dashboard)
| Key | Description |
|-----|-------------|
| `RESEND_API_KEY` | API key from resend.com for contact form emails |

### Sanity Studio (CMS)
- **Live Studio URL:** https://expert-electronic.sanity.studio
- **Project ID:** `q1vklck6`
- **Dataset:** `production`
- To deploy studio changes: `cd studio && npm run deploy`
- To import products: `cd studio && node importProducts.js [BRAND]`

---

## DNS Records (cPanel Zone Editor — expertelectronic.co.th)

### Website
| Type | Name | Value |
|------|------|-------|
| A | `expertelectronic.co.th` | Vercel IP (from Vercel custom domain setup) |
| CNAME | `www` | `cname.vercel-dns.com` |

### Email Sending via Resend
These records allow sending emails from `@expertelectronic.co.th` via Resend.
> Full record values can always be found at: **resend.com → Domains → expertelectronic.co.th**

| Type | Name | Content | Priority |
|------|------|---------|----------|
| TXT | `resend._domainkey` | `p=MIGfMA[...]QIDAQAB` (DKIM — copy full value from Resend) | — |
| MX | `send` | `feedback[...]ses.com` (copy full value from Resend) | 10 |
| TXT | `send` | `v=spf1 i[...]om ~all` (copy full value from Resend) | — |
| TXT | `_dmarc` | `v=DMARC1; p=none;` | — |

---

## Contact Form Email Flow

- **Sender:** `onboarding@resend.dev` (Resend default — change to `noreply@expertelectronic.co.th` once domain is verified in Resend)
- **Recipients:** `admin@expertelectronic.co.th` + `auth@expertelectronic.co.th`
- **Reply-To:** Customer's email (so replying goes directly to them)

### To switch to company sender after Resend domain verification:
Update `from` in `src/app/api/contact/route.js`:
```js
from: 'Expert Electronic <noreply@expertelectronic.co.th>',
```

---

## Products

Products are managed in the back office (Expert-Electronic-Stock), which publishes them to Sanity.
Edit the Excel files and photos/datasheets in the `studio` repo's `import/` folder, push, then run
Back office → Products → Import. The Excel format is documented in the `studio` README and in
`import/_TEMPLATE_products.xlsx`. Do not edit products in Sanity Studio or run the old `importProducts.js`.

### Category slugs (use these exact values in Excel)
| Main Category | Slug |
|--------------|------|
| PA Amplifier | `pa-amplifier` |
| PA Speaker | `pa-speaker` |
| Analog PA System | `analog-pa-system` |
| IP/PA Intercom | `ip-pa-intercom` |
| Audio Conference | `audio-conference` |
| Interactive Flat Panel | `interactive-flat-panel` |
| LED Stage Lighting | `led-stage-lighting` |
| Architecture Lighting | `architecture-lighting` |

Sub-category slugs follow the same pattern: lowercase with dashes, e.g. `mixer-amplifier`, `ceiling-speaker`, `itchub`

---

## Sanity CORS Origins
Make sure these are added at **sanity.io/manage → API → CORS Origins**:
- `https://expertelectronic.co.th`
- `https://www.expertelectronic.co.th`
- `http://localhost:3000` (for local development)

---

## Sanity Webhook (auto-redeploy on publish)
Set up at **sanity.io/manage → API → Webhooks**:
- URL: Vercel deploy hook (found at Vercel → Settings → Git → Deploy Hooks)
- Trigger on: Create, Update, Delete

---

## Local Development

```bash
# Frontend
cd Expert-Electronic
npm install
npm run dev
# → http://localhost:3000

# Sanity Studio
cd studio
npm install
npm run dev
# → http://localhost:3333
```

---

*Last updated: August 2026*
