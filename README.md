# RMD Calculator — All Rule Eras

**Live site:** [rmd-calculator.net](https://rmd-calculator.net)

A free, comprehensive Required Minimum Distribution calculator covering every IRS rule era — original account owners, inherited IRAs across all SECURE Act eras, successor beneficiaries, and transfer-in custodian onboarding scenarios.

---

## What It Does

Most RMD calculators cover only the original owner case. This tool covers the full spectrum:

| Scenario | Coverage |
|---|---|
| Original owner (IRA, SEP, SIMPLE, 401k) | ✓ Table III, Table II for younger spouse |
| Roth IRA / Roth 401k | ✓ No RMD notice + inherited Roth guidance |
| Still-working 401k exception | ✓ Deferral notice with 5% ownership caveat |
| Pre-2020 inherited IRA (stretch) | ✓ Grandfathered Table I with decrement |
| SECURE 1.0 (inherited 2020–2022) | ✓ 10-year rule, post-RBD annual RMD |
| SECURE 2.0 final regs (inherited 2023+) | ✓ 10-year rule + 2025 effective date rules |
| All 5 EDB categories | ✓ Spouse (3 elections), minor child, disabled, close-in-age |
| Successor beneficiary | ✓ Always 10-year, clock from first bene death |
| Estate / charity (ghost rule) | ✓ 5-year rule or owner life expectancy |
| Transfer-in / new custodian | ✓ History reconstruction from prior data |

**Additional tools built in:**
- IRS Factor Lookup Tool (Table I, II, III) — live update as you type, with adjacent-year strip
- Spouse age difference checker — instant Table II eligibility
- Multi-year projection table (0% growth, mandatory withdrawals only)
- Penalty calculator — 25% / 10% correction window
- Dynamic result callouts: year-of-death RMD, aggregation rules, QCD, first-year double-up warning, IRMAA / Social Security impact note

---

## Stack

Pure HTML, CSS, and vanilla JavaScript — zero dependencies, zero build tools, zero frameworks.

```
index.html        — entire application (single file)
README.md         — this file
LICENSE           — MIT License
.gitignore        — standard web gitignore
```

Hosted on **Cloudflare Pages** (free tier). No server, no backend, no database.

---

## Deployment

### Cloudflare Pages (recommended)

1. Log in to [cloudflare.com](https://cloudflare.com)
2. Go to **Workers & Pages** → **Create** → **Pages** → **Upload assets**
3. Name the project `rmd-calculator`
4. Upload `index.html`
5. Click **Deploy**
6. Your site is live at `rmd-calculator.pages.dev`

### Custom Domain

In Cloudflare Pages → your project → **Custom domains** → Add `rmd-calculator.net`. If your domain is registered through Cloudflare, DNS propagates in seconds.

---

## AdSense Integration

Three ad slots are pre-built in the HTML. To activate:

1. Apply for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Once approved, replace each `<!-- Google AdSense -->` comment block with your `<ins class="adsbygoogle">` tag
3. Add the AdSense `<script>` tag to the `<head>` section

Ad slot locations:
- **Top** — above the disclaimer, below the header
- **Mid** — top of the results card (shown after calculation)
- **Bottom** — below the results card, above the lookup tool

---

## Maintenance

IRS rules change. Check these triggers annually:

| Trigger | When | Action |
|---|---|---|
| IRS Publication 590-B update | Each fall | Verify life expectancy tables unchanged |
| 1959 birth year final regs | Pending | Change `rmdStartAge()` for 1959 if finalized at 75 |
| QCD annual limit | January | Update $105,000 figure in callout text |
| SECURE Act 3.0 legislation | As enacted | Full rule review |
| IRMAA threshold update | January | Update $106,000 / $212,000 thresholds in callout |

Estimated update time per change: **1–2 hours**.

---

## Legal

This tool is provided for **informational and educational purposes only**. It does not constitute tax, legal, or financial advice. Results are estimates only. See the full disclaimer section at the bottom of the site.

Sources: IRS Publication 590-B, IRC §401(a)(9), Treasury Reg. §1.401(a)(9), SECURE Act of 2019 (Pub. L. 116-94), SECURE 2.0 Act of 2022 (Pub. L. 117-328), T.D. 10001 (2024 final regulations), IRC §4974, Rev. Proc. 2022-32.

---

## Part of the Utility Site Portfolio

This calculator is **Project 02** in a portfolio of utility sites targeting high-intent search traffic with zero ongoing infrastructure cost. See the portfolio roadmap for the full build plan.

| # | Site | Status | Target RPM |
|---|---|---|---|
| 01 | Laser Cutter Settings Calculator | ✅ Live | $2–5 |
| 02 | RMD Calculator | ✅ Live | $8–25 |
| 03 | Case Converter | Planned | $1.50–3 |
| 04 | Lorem Ipsum Generator | Planned | $1–2 |
| 05 | Word Counter | Planned | $1.50–3 |
| 06 | JSON Formatter | Planned | $2–4 |

---

*Last updated: April 2026 · Updated for SECURE 2.0 Final Regulations*
