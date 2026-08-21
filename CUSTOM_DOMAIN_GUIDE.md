# 🌐 Moving to a Custom Domain (dhwd4u.com)

This site currently deploys to GitHub Pages via the Actions workflow in
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), and is
reachable today at `https://husig.ai/ds/`. That URL works because the
`husig-ai` GitHub account has `husig.ai` set as its own custom domain, and
GitHub automatically nests project sites under it (`husig.ai/<repo-name>/`)
until the project repo has its own custom domain.

Once `dhwd4u.com` (registered at GoDaddy) is pointed at this repo, the site
will be served at `dhwd4u.com` **instead of** `husig.ai/ds/` — GitHub only
serves one or the other for a given project repo, not both. Anyone with the
old `husig.ai/ds/...` link bookmarked will get a 404 after the cutover, so
plan to share the new link once it's live.

Do the DNS step and the GitHub step around the same time — GitHub won't
issue an HTTPS certificate for the domain until it can see the DNS records,
and the domain won't do anything useful until GitHub knows about it either.

## Step 1: Add DNS records at GoDaddy
- [ ] Log into GoDaddy → **My Products** → find `dhwd4u.com` → **DNS** →
      **Manage DNS**
- [ ] Add four **A** records for the apex domain, all with host `@`,
      pointing at GitHub Pages' IPs (delete GoDaddy's default parked-domain
      `A` record on `@` first, if present):
  ```
  Type    Host    Value               TTL
  A       @       185.199.108.153     600
  A       @       185.199.109.153     600
  A       @       185.199.110.153     600
  A       @       185.199.111.153     600
  ```
- [ ] Add a **CNAME** record so `www.dhwd4u.com` also works and redirects
      to the apex domain:
  ```
  Type    Host    Value                   TTL
  CNAME   www     husig-ai.github.io.     600
  ```
- [ ] Remove any conflicting default records GoDaddy pre-populates (e.g. a
      parking-page `A` record or forwarding rule on `@`)
- [ ] Save. DNS can take anywhere from a few minutes to ~24 hours to
      propagate.

## Step 2: Point the repo at the new domain
Because this repo publishes via a custom GitHub Actions workflow (not the
classic "deploy from a branch" mode), GitHub picks up the custom domain
from a `CNAME` file in the published output rather than a settings-only
field — the workflow's `path: .` upload means anything at the repo root
gets published, so the file lives right in the repo:

- [ ] Create a file named exactly `CNAME` (no extension) at the **repo
      root** containing just:
  ```
  dhwd4u.com
  ```
- [ ] Commit and push to `main` — this triggers the deploy workflow
- [ ] Once the workflow finishes, check repo **Settings → Pages** — the
      "Custom domain" field should auto-populate with `dhwd4u.com` and
      show a DNS check running

## Step 3: Verify domain ownership (recommended)
GitHub lets you optionally verify ownership of the domain, which reserves
it against being claimed by someone else's GitHub Pages site later:
- [ ] Go to the `husig-ai` org's **Settings → Pages → Verified domains**
- [ ] Add `dhwd4u.com`, and add the **TXT** record GitHub gives you as a
      new DNS record at GoDaddy (host will look like
      `_github-pages-challenge-husig-ai`)
- [ ] Back in GitHub, click **Verify**

## Step 4: Enable HTTPS
- [ ] Back in repo **Settings → Pages**, wait for the "DNS check
      successful" message (this needs Step 1's DNS to have propagated)
- [ ] Once available, check **Enforce HTTPS** — GitHub provisions a free
      TLS certificate for `dhwd4u.com` via Let's Encrypt; this can take up
      to a few hours the first time

## Step 5: Update in-repo references to the old domain
A few files hardcode `husig.ai/ds` — swap these to `https://dhwd4u.com`
once the new domain is live (grep for `husig.ai` to catch all of them):
- [ ] `robots.txt` — the `Sitemap:` line
- [ ] `sitemap.xml` — all three `<loc>` entries
- [ ] `og:url` meta tag near the top of `index.html`, `listings.html`,
      `listing.html`, `testimonials.html`, and `404.html`

## Step 6: Smoke-test the live site
- [ ] Visit `https://dhwd4u.com` and confirm it loads over HTTPS with no
      certificate warning
- [ ] Click through Listings, a listing detail page, and Testimonials
- [ ] Submit the intake form on the homepage and confirm the lead lands in
      Supabase
- [ ] Log into `/admin/login.html` on the new domain
- [ ] Confirm `https://www.dhwd4u.com` redirects to the apex domain
- [ ] Confirm the old `https://husig.ai/ds/` link no longer resolves (or
      resolves to a 404), and update any saved bookmarks / shared links

## Reference: GitHub Pages IP addresses
```
A records (IPv4):        AAAA records (IPv6, optional):
185.199.108.153          2606:50c0:8000::153
185.199.109.153          2606:50c0:8001::153
185.199.110.153          2606:50c0:8002::153
185.199.111.153          2606:50c0:8003::153
```

## Support Resources
- **GitHub Pages custom domain docs:**
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **GoDaddy DNS management help:**
  https://www.godaddy.com/help/manage-dns-records-680
