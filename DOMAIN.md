# Connect your Namecheap domain to this site

Once the site is on GitHub Pages (`https://kennyhin.github.io/furdle-durt/`), point your Namecheap domain at it.

## 1. Turn on a custom domain in GitHub

1. Open the repo → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g. `furdledurt.com` or `www.furdledurt.com`)
3. Save. GitHub will show the DNS records it expects.
4. Check **Enforce HTTPS** after DNS finishes (can take a few minutes to hours).

## 2. DNS in Namecheap

1. Log in at [namecheap.com](https://www.namecheap.com)
2. **Domain List** → **Manage** next to your domain
3. Open **Advanced DNS**

### Option A — use `www` (recommended)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | `www` | `kennyhin.github.io.` | Automatic |
| URL Redirect Record | `@` | `https://www.yourdomain.com/` (Unmasked) | Automatic |

Replace `yourdomain.com` with your real domain. In GitHub Pages custom domain, use `www.yourdomain.com`.

### Option B — apex domain only (`yourdomain.com`)

GitHub may ask for A records. Common GitHub Pages A records:

| Type | Host | Value |
|------|------|-------|
| A Record | `@` | `185.199.108.153` |
| A Record | `@` | `185.199.109.153` |
| A Record | `@` | `185.199.110.153` |
| A Record | `@` | `185.199.111.153` |

Remove old parking / Namecheap parking CNAMEs that conflict (e.g. `parkingpage.namecheap.com`).

## 3. Wait and test

- DNS can take **15 minutes to 48 hours**
- Visit `https://www.yourdomain.com`
- If it fails, recheck the GitHub Pages custom-domain status for errors

## Notes

- This site is static HTML — GitHub Pages is enough; no Google Sites needed
- Keep the repo public for free GitHub Pages on a user account
