# MonsterCalc

A five-in-one calculator app — concrete, GPA, age, binomial expansion and
scientific — built with Next.js 15 (App Router), TypeScript and Tailwind CSS 4.
All math runs client-side: no API calls and no accounts. Google Analytics 4 is
loaded for page-traffic measurement.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export -> out/
npm run typecheck
```

`npm start` is not used: the site is configured with `output: "export"`, so
`npm run build` writes a plain static site to `out/` and there is no Node
server to start. To preview the built output exactly as a host would serve it:

```bash
cd out && python3 -m http.server 3200
```

## Deploying to shared hosting (cPanel / FTP)

1. `npm run build`
2. Upload **the contents of `out/`** (not the folder itself) into `public_html/`.
   `monstercalc-upload.zip` in the project root is that folder already zipped —
   cPanel File Manager can upload and extract it in one step.
3. Make sure the hidden `.htaccess` file goes up too. In cPanel File Manager,
   enable *Settings -> Show Hidden Files*; in an FTP client, enable showing
   hidden files. It sets gzip/brotli compression, cache headers and the 404
   page, none of which shared hosting does by default.
4. Once your SSL certificate is active, uncomment the force-HTTPS block at the
   bottom of `.htaccess`. Enabling it before the certificate exists causes a
   redirect loop.
5. Submit `https://monstercalc.com/sitemap.xml` in Google Search Console.

Redeploying is the same three steps: rebuild, re-upload, done. Filenames under
`_next/static/` are content-hashed, so replacing them never serves a stale mix.

If the site is ever served from a subfolder rather than a domain root, set
`basePath` in `next.config.ts` and rebuild — the absolute `/_next/...` paths
will 404 otherwise.

## Layout

```
app/
  layout.tsx                     fonts, theme bootstrap, providers, header/footer
  page.tsx                       homepage (hero h1 + concrete workspace)
  <tool>-calculator/page.tsx     one indexable route per tool, own metadata
  blog/, blog/[slug]/            statically generated index and articles
  privacy-policy/, terms-and-conditions/, cookie-policy/
  sitemap.ts, robots.ts, icon.svg
components/
  ToolPage.tsx                   server shell: hero + client workspace + SEO block
  tools/                         the five calculators (client components)
  seo/                           education block, formulas, FAQ accordion
  ui/                            Card/Field/Tabs/CopyButton primitives, providers
lib/
  math/                          age, binomial, concrete, gpa, expression evaluator
  tools.ts                       tool registry: keywords, SEO copy, formulas, FAQ
  content/blog.ts                typed content collection
  content/legal.ts               the three legal documents + LEGAL_CONFIG
  seo.tsx                        JSON-LD builders
```

## Notes on the tricky parts

**Theming is a token swap.** Every colour resolves through a CSS custom property
on `:root` / `[data-theme="light"]` in `app/globals.css`; no component hardcodes
a colour. The light palette uses darker accents (`#047857` / `#0e7490`) so small
accent text clears 4.5:1 on a near-white ground. A blocking inline script in
`<head>` applies the stored theme before first paint.

**Age uses calendar arithmetic, not `days / 365.25`.** `lib/math/age.ts` resolves
whole months first, then counts real days from the month anniversary. The naive
"borrow the previous month's length" form underflows — 31 Jan to 1 Mar leaves
−2 days after borrowing February — which is why the anniversary anchors the day
count. Feb 29 clamps to Feb 28 in non-leap years, and the same rule governs
days-to-next-birthday so the two can never disagree.

**Binomial coefficients stay exact.** Built with `C(n,k) = C(n,k-1)·(n-k+1)/k`,
where every step divides evenly, rather than through factorials that a double
cannot hold. Past n = 20 the tool warns instead of returning wrong integers.

**The scientific calculator parses, it does not `eval`.** A tokenizer plus a
shunting-yard evaluator (`lib/math/evaluate.ts`) enforces precedence, supports
unary minus and postfix `%`, and returns `null` for anything that does not yet
parse — so a half-typed expression renders blank instead of throwing.

**SEO content is server-rendered.** The education block, formulas, FAQ text and
all blog content exist in the HTML without JavaScript; only the calculators
hydrate. Each tool route emits `SoftwareApplication` + `FAQPage` +
`BreadcrumbList` JSON-LD, each article emits `Article` + `BreadcrumbList`, and
every route carries a canonical URL and OG/Twitter tags.

## Legal pages

`lib/content/legal.ts` holds the Privacy Policy, Terms and Conditions and
Cookie Policy. Every factual claim in them was checked against the code: there
site makes no network calls of its own, stores one `localStorage` key
(`monstercalc-theme`), and loads Google Analytics 4 — which sets two cookies
and contacts Google. **If any of that changes, these documents have to change
with it.**

Two values at the top of that file depend on the operator rather than the code
and must be set before publishing:

```ts
export const LEGAL_CONFIG = {
  contactEmail: "privacy@monstercalc.com",  // create this alias, or change it
  jurisdiction: "England and Wales",        // set to your own country/state
  updated: "26 August 2026",
  analyticsId: "G-GKQMTM1ZYY",              // keep in step with Analytics.tsx
};
```

## Analytics

`components/Analytics.tsx` loads Google Analytics 4 via `next/script` with
`strategy="afterInteractive"`, so the tag never blocks first paint. The
measurement ID lives in `GA_MEASUREMENT_ID` there and is mirrored in
`LEGAL_CONFIG.analyticsId` so the policies cannot drift from the tag.

**Do not add manual `page_view` tracking on route change.** It is the obvious
thing to reach for in an App Router app, but GA4's enhanced measurement
("page changes based on browser history events", on by default) already picks
up client-side navigations here — verified on the wire as exactly one
`page_view` per navigation with the correct path. Adding a manual event on top
double-counts every view. Only revisit this if enhanced measurement is turned
off in the GA property.

Cost of the tag, measured: Lighthouse performance 100 -> 98/99 and LCP
0.5-0.7s -> 0.9-1.2s on an uncompressed test server. Still above the 95
threshold on all four categories.

**There is currently no consent banner.** The analytics cookies are set on page
load. That is fine in much of the world, but under UK/EU ePrivacy rules
analytics cookies generally require prior consent. If the site has UK or EU
traffic, add a consent banner with Google Consent Mode v2 before relying on it.

These documents are written to describe this site accurately, but they are not
legal advice. Have them reviewed if the site starts carrying commercial risk.

## Verified

- 44 unit assertions across the age, binomial, evaluator, concrete and GPA
  engines, including leap-year and Feb 29 edge cases.
- Lighthouse (desktop, production build) 100 / 100 / 100 / 100 on performance,
  accessibility, best practices and SEO for the homepage, all five calculator
  routes, the blog index and an article. LCP 0.5–0.7s.
- No horizontal overflow and no sub-44px tap targets at 390px width.

## License

MIT — see [LICENSE](LICENSE). Contributions welcome: open an issue or pull request.
