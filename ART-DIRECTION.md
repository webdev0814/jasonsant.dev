# jasonsant.dev v3 — Art Direction

## Design brief

**Direction:** The Principal’s Margin — an executive decision brief annotated by an architect who understands delivery.

**Mood:** Authoritative, incisive, composed, technically fluent, and commercially credible.

**Palette:** Mineral paper and blue-black ink, marked with a single oxblood annotation color. No gradients.

**Type:** Newsreader for editorial display; IBM Plex Sans for body, controls, and technical detail.

**Layout:** An asymmetric 12-column dossier with generous margins, offset evidence, ruled records, and diagrams that make governance visible.

**Signature:** A continuous “decision spine” connects intent, architecture, controls, and delivery. It changes direction at section boundaries and terminates at evidence or action—not as decoration.

The result should feel like a senior consultant’s marked-up decision package, not a portfolio template, developer landing page, newspaper pastiche, or futuristic AI promotion.

---

## 1. Experience objective

Within five seconds, a senior recruiter or enterprise buyer must understand:

1. Jason is an Enterprise AI Solutions Architect and Principal Delivery Leader.
2. He connects requirements, architecture, governance, and execution.
3. He accepts C2C through Corporate Consulting LLC, a Wyoming LLC, and W-2 contracts.
4. His rate is **$110–$160/hr**.
5. His evidence includes public implementations, enterprise environments, credentials, and insured consulting operations.
6. The next actions are booking a call or inspecting case studies.

The design must communicate seniority through restraint, hierarchy, and specificity. Do not attempt to communicate expertise through visual complexity, glowing technology motifs, or unsupported outcome statistics.

---

## 2. Non-negotiable implementation invariants

Only the runtime files `index.html`, `styles.css`, and `effects.js` may be changed. Use static HTML, CSS, vanilla JavaScript, and inline SVG. Add no framework, build step, third-party JavaScript, canvas animation, icon library, or new asset dependency.

Maintain exactly:

- One `<!doctype html>`, one `<html>`, one `<head>`, and one `<body>`.
- The canonical URL `https://jasonsant.dev/`.
- Open Graph and Twitter metadata.
- An inline SVG favicon.
- JSON-LD `Person` containing `name`, `url`, `jobTitle`, and `sameAs`.
- JSON-LD `ProfessionalService` containing `name`, `url`, `priceRange`, and `areaServed`.
- Person `sameAs` entries for GitHub and LinkedIn.
- All current factual content about Corporate Consulting LLC, contract vehicles, insurance, sectors, platforms, environments, compliance, and credentials.
- Exactly four `role="tab"` elements.
- The ROI calculator and all six case studies.
- All six `https://github.com/webdev0814/...` URLs byte-for-byte.
- LinkedIn as `https://www.linkedin.com/in/jasonsantpmp`.
- Every “Book a call” link as:

```html
<a href="https://cal.com/jason-sant-tzco13/10min" target="_blank" rel="noopener">Book a call</a>
```

The hero must contain exactly two CTAs:

1. “Book a call”
2. “See case studies” linking to `#case-studies`

Do not add a third hero link disguised as a text link, badge, portrait link, or availability control.

### Protected project block

Everything from:

```html
<!-- POSITIONING_PROJECT_LINKS_START -->
```

through:

```html
<!-- POSITIONING_PROJECT_LINKS_END -->
```

must remain byte-identical. Do not re-indent, rewrap, reorder, prettify, or add SVG inside that protected range.

To add case-study architecture diagrams without modifying it:

1. Place six inert `<template>` elements immediately after the end marker.
2. Give each template a stable identifier associated with its case-study order.
3. Each template contains an accessible `<figure>` and inline `<svg>`.
4. In `effects.js`, clone each template into the corresponding `.case-study` before its `.case-flow`.
5. Run this from the deferred script before normal interaction initialization.
6. Never use `innerHTML` on the protected block.

This preserves the automated rewrite contract while producing actual inline SVG diagrams in the rendered document.

---

## 3. Concept: The Principal’s Margin

The visual language comes from three enterprise artifacts:

- A decision memo: strong hierarchy, wide margins, concise statements.
- An architecture review: systems, boundaries, control points, and directional flows.
- A consultant’s markup: one decisive annotation color used only to call attention to action, risk, or human judgment.

The site should not literally imitate paper or a newspaper. It should translate those behaviors into a digital system:

- Large, quiet display typography.
- Asymmetry instead of centered symmetry.
- Hairline rules that organize evidence.
- Margin notes aligned to the grid.
- Diagrams composed from labeled boxes and directional connectors.
- Section transitions created by density changes, not alternating generic cards.
- Short, deliberate animation only where it explains a state change.

The signature decision spine begins in the hero beside “business intent,” changes direction through the role and calculator sections, appears as the governing line in architecture diagrams, and resolves at the contact action. Its nodes are labeled with real concepts such as **Intent**, **Requirements**, **Architecture**, **Controls**, and **Delivery**. Do not number these nodes as though they are always a linear methodology.

---

## 4. Color system

Use one accent family only: oxblood in light mode and its lighter accessible counterpart in dark mode. Blue may appear only as part of neutral blue-black surfaces, never as a second accent.

### Light tokens

```css
:root {
  color-scheme: light;

  --canvas: #f7f6f2;
  --surface: #ffffff;
  --surface-raised: #efeee9;
  --ink: #121a1d;
  --ink-soft: #4e5a5e;
  --rule: #c8cdca;
  --rule-strong: #7c8789;

  --accent: #9f2d2b;
  --accent-ink: #ffffff;
  --accent-wash: #f1ddda;

  --focus: #9f2d2b;
  --selection-bg: #9f2d2b;
  --selection-ink: #ffffff;
}
```

### Dark tokens

```css
[data-theme="dark"] {
  color-scheme: dark;

  --canvas: #0f171a;
  --surface: #162125;
  --surface-raised: #202c30;
  --ink: #f3f1ea;
  --ink-soft: #b6c0c2;
  --rule: #39474a;
  --rule-strong: #718083;

  --accent: #ff8272;
  --accent-ink: #0f171a;
  --accent-wash: #321f20;

  --focus: #ff8272;
  --selection-bg: #ff8272;
  --selection-ink: #0f171a;
}
```

When no stored preference exists, dark mode must follow `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Repeat the dark tokens here. */
  }
}
```

### Contrast targets

| Pair | Approximate ratio | Use |
|---|---:|---|
| `#121a1d` on `#f7f6f2` | 16:1 | Primary light-mode text |
| `#4e5a5e` on `#f7f6f2` | 6.5:1 | Secondary light-mode text |
| `#9f2d2b` on `#f7f6f2` | 6.7:1 | Light-mode links and annotations |
| `#ffffff` on `#9f2d2b` | 7.2:1 | Light-mode primary action |
| `#f3f1ea` on `#0f171a` | 16:1 | Primary dark-mode text |
| `#b6c0c2` on `#0f171a` | 9.7:1 | Secondary dark-mode text |
| `#ff8272` on `#0f171a` | 7.5:1 | Dark-mode links and annotations |
| `#0f171a` on `#ff8272` | 7.5:1 | Dark-mode primary action |

Rules and inactive decorative marks may have lower contrast, but text, controls, focus indicators, diagram labels, and meaningful diagram paths must satisfy WCAG 2.1 AA. Never rely on color alone; selected tabs also receive position, weight, and a rule.

Do not use transparency to weaken body text. Do not introduce cyan, amber, green, purple, or vendor-brand colors as additional accents.

---

## 5. Theme behavior

Place a compact theme button in the header with a minimum `44px × 44px` target. Use a small inline SVG sun/moon mark and a visible or screen-reader label that states the resulting action, such as “Switch to dark theme.”

Behavior:

1. Before styles paint, a tiny inline `<head>` script reads `localStorage.getItem("jasonsant-theme")`.
2. If the saved value is `light` or `dark`, set `document.documentElement.dataset.theme`.
3. If there is no saved value, set no attribute and allow `prefers-color-scheme` to determine the default.
4. On activation, resolve the currently displayed theme, switch it, persist it, update the accessible label, and update `<meta name="theme-color">`.
5. Wrap all storage access in `try/catch`.
6. If no preference is saved, listen for system theme changes and update the control state.
7. Do not animate the entire page between themes.

The toggle must remain comprehensible at 200% zoom and with CSS background images disabled.

---

## 6. Typography

### Google Fonts

Use exactly:

- **Newsreader**: optical-size variable serif, weights 400, 500, and 600.
- **IBM Plex Sans**: grotesk body and interface face, weights 400, 500, 600, and 700.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&amp;family=Newsreader:opsz,wght@6..72,400..600&amp;display=swap" rel="stylesheet">
```

Use:

```css
--font-display: "Newsreader", Georgia, "Times New Roman", serif;
--font-body: "IBM Plex Sans", "Segoe UI", Arial, sans-serif;
```

Set `font-display: swap` through the Google Fonts request, provide the listed fallbacks, and use `font-size-adjust` where supported to reduce fallback-to-webfont reflow.

### Weight usage

- Hero and major headings: Newsreader 500.
- Supporting serif statements: Newsreader 400.
- Body: IBM Plex Sans 400.
- Navigation and controls: IBM Plex Sans 600.
- Small evidence labels: IBM Plex Sans 500.
- Strong commercial facts: IBM Plex Sans 700.
- Never fake bold or italic styles.

Do not use all caps for eyebrows. Section labels should be sentence case, short, and informational. Do not color a single hero word or switch one phrase to italics for emphasis.

### Fluid type scale

```css
:root {
  --step--2: clamp(0.72rem, 0.69rem + 0.15vw, 0.80rem);
  --step--1: clamp(0.85rem, 0.81rem + 0.20vw, 0.96rem);
  --step-0:  clamp(1.00rem, 0.95rem + 0.25vw, 1.14rem);
  --step-1:  clamp(1.22rem, 1.12rem + 0.48vw, 1.50rem);
  --step-2:  clamp(1.52rem, 1.35rem + 0.82vw, 2.00rem);
  --step-3:  clamp(1.90rem, 1.60rem + 1.45vw, 2.75rem);
  --step-4:  clamp(2.38rem, 1.90rem + 2.35vw, 3.75rem);
  --step-5:  clamp(2.95rem, 1.55rem + 5.75vw, 7.20rem);
}
```

### Core settings

```css
body {
  font-family: var(--font-body);
  font-size: var(--step-0);
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  font-weight: 500;
}

h1 {
  font-size: var(--step-5);
  line-height: 0.91;
  letter-spacing: -0.045em;
}

h2 {
  font-size: var(--step-4);
  line-height: 0.98;
  letter-spacing: -0.035em;
}

h3 {
  font-size: var(--step-2);
  line-height: 1.08;
  letter-spacing: -0.018em;
}

p,
li,
dd {
  max-width: 68ch;
}

.case-study p,
.calculator p {
  max-width: 58ch;
}

output,
.case-count,
.commercial-terms {
  font-variant-numeric: tabular-nums;
}
```

---

## 7. Spacing and grid

```css
:root {
  --space-3xs: clamp(0.25rem, 0.23rem + 0.10vw, 0.31rem);
  --space-2xs: clamp(0.50rem, 0.46rem + 0.20vw, 0.63rem);
  --space-xs:  clamp(0.75rem, 0.68rem + 0.32vw, 0.94rem);
  --space-s:   clamp(1.00rem, 0.91rem + 0.42vw, 1.25rem);
  --space-m:   clamp(1.50rem, 1.36rem + 0.65vw, 1.88rem);
  --space-l:   clamp(2.00rem, 1.80rem + 0.95vw, 2.56rem);
  --space-xl:  clamp(3.00rem, 2.55rem + 2.20vw, 4.25rem);
  --space-2xl: clamp(4.50rem, 3.55rem + 4.60vw, 7.25rem);
  --space-3xl: clamp(6.50rem, 4.70rem + 8.20vw, 11.25rem);

  --page-gutter: clamp(1.125rem, 0.40rem + 3vw, 4rem);
  --grid-gap: clamp(0.75rem, 0.50rem + 1vw, 1.50rem);
  --grid-max: 94rem;
}
```

Desktop sections use a shared 12-column grid:

```css
.layout-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gap);
  width: min(
    calc(100% - (2 * var(--page-gutter))),
    var(--grid-max)
  );
  margin-inline: auto;
}
```

Rules:

- At `1200px` and above: full 12-column compositions.
- From `760px` to `1199px`: retain 12 columns but widen major spans.
- Below `760px`: use a four-column grid.
- Below `480px`: content may span all four columns; tabs become one column.
- Every grid child receives `min-width: 0`.
- SVG, images, forms, outputs, and controls receive `max-width: 100%`.
- Long technical text receives `overflow-wrap: anywhere`.
- Do not use a horizontal carousel at any breakpoint.
- Verify no horizontal scroll at `375px`.

Alignment should be predominantly left-aligned. Center alignment is reserved for small diagram nodes—not headlines, paragraphs, CTAs, or credentials.

---

## 8. Header and navigation

Use a 68px desktop header and a 56px mobile header. It may be sticky, but it must use an opaque `--canvas` background and a bottom rule; do not use glass, blur, or translucent floating navigation.

Desktop structure:

- Brand/name: columns 1–3.
- Navigation: columns 5–10.
- Theme control: column 12.
- Preserve comfortable negative space in column 4 and column 11.

Replace the JavaScript-dependent mobile menu with a progressively enhanced native `<details>`/`<summary>` structure:

- `<summary>` is labeled “Menu.”
- The navigation remains keyboard-operable without JavaScript.
- JavaScript may close it after a link is selected or Escape is pressed.
- At desktop widths, hide the summary and display the navigation normally.
- Use solid rules between mobile navigation items.
- Minimum control target is 44px.

Navigation links use a directional underline that grows from the point nearest the decision spine. The underline is the accent; do not change link opacity.

---

## 9. Hero

### Copy hierarchy

Use this content hierarchy:

1. Identity line: “Jason Agentic — Enterprise AI Solutions Architect and Principal Delivery Leader”
2. Commercial line: “Available for select contracts · **$110–$160/hr** · C2C or W-2”
3. Hero headline: “Governed AI for the work after the demo.”
4. Supporting statement describing the connection between architecture, requirements, controls, roadmaps, and adoption.
5. Exactly two CTAs.

The exact rate string **$110–$160/hr** must appear as text—not SVG text, generated content, or an image—and remain above the fold at both `1440×900` and `390×844`.

### Desktop layout

- Hero occupies at most `calc(100svh - 68px)` and at least 620px.
- Identity and commercial line: columns 1–7.
- Headline: columns 1–9.
- Supporting text: columns 2–7, creating a deliberate left-margin shift.
- CTAs: columns 2–7.
- Decision spine: columns 10–12.
- Do not use a hero card or floating portrait panel.

The right-side decision spine presents five quiet text nodes:

- Business intent
- Requirements
- Architecture
- Controls
- Delivery

Only the currently emphasized node uses the accent. The rest use `--ink-soft`.

### Mobile layout

At `390×844`:

- Header: 56px.
- Hero top padding: 24px.
- Identity line: maximum two compact lines.
- Commercial line immediately follows and includes `$110–$160/hr`.
- Headline should render around 47px and no more than four lines.
- Supporting copy is capped at roughly 85 words.
- CTAs stack with 10px between them, each at least 48px high.
- Hide the large decision-spine labels; retain one 1px trace with three small nodes.
- Place any nonessential hero evidence below the CTAs.

The rate and both hero CTAs must be visible without scrolling at this viewport.

### Hero actions

Primary:

- Accent fill.
- Square or 2px corners.
- A solid 4px offset ink block—not a soft shadow.
- Hover lifts 2px and increases the offset to 6px.
- Active state moves down 2px and reduces the offset.

Secondary:

- Transparent fill with a 1px `--rule-strong` border.
- On hover, fill with `--ink` and invert text.
- Must remain visually subordinate.

---

## 10. Fast facts

Treat fast facts as a ruled commercial ledger, not a strip of cards.

Desktop:

- Full-width section immediately after the hero.
- Three rows with asymmetric spans.
- Rate occupies columns 1–3 and is set at `--step-3`.
- Contract vehicles occupy columns 4–8.
- Insurance occupies columns 9–12.
- Sectors, compliance context, and credentials form the next two rows.
- Use strong horizontal rules and only necessary vertical dividers.

Required facts:

- `$110–$160/hr`
- C2C through Corporate Consulting LLC, a Wyoming LLC
- W-2 contract engagements
- Hanover business-owners/GL
- Hartford Tech E&O
- NYC HPD
- State and local government
- HIPAA
- Section 508
- NVIDIA AI Agents
- Azure Solutions Architect Expert
- Azure Data Engineer
- PMP
- SAFe 6
- CBAP
- Salesforce Data Architect

Labels use sentence case. Do not use icons for these facts.

On mobile, convert the ledger into one continuous definition list. Do not create six independent bordered cards.

---

## 11. Requisition-match tabs

The four roles are parallel choices, not a numbered process. Remove decorative `01`, `02`, `03`, and `04` role numbers.

Desktop:

- Section heading: columns 1–7.
- Brief explanatory note: columns 9–12.
- Vertical tab list: columns 1–4.
- Active role panel: columns 5–12.
- Evidence is presented as ruled definition rows, not nested cards.

The four tab labels remain exactly:

1. AI Solutions Architect
2. TPM / SAFe RTE
3. Lead AI BSA
4. Azure / Fabric Lead

There must be exactly four `role="tab"` elements. Maintain:

- `role="tablist"`
- `aria-controls`
- `aria-labelledby`
- `aria-selected`
- Roving `tabindex`
- Left Arrow, Right Arrow, Home, and End navigation
- Focus and selection updated together

On mobile, use a two-column tab list until `480px`, then one column. Allow labels to wrap; never create horizontal scrolling.

### Progressive enhancement

All panel content must exist in the source HTML. Without JavaScript, show all four panels in document order. JavaScript initializes the selected state and hides inactive panels only after it has successfully registered tab behavior.

### View Transitions

Use the View Transitions API only for switching role panels:

```js
const commitTabChange = () => {
  // Update aria-selected, tabindex, hidden states, and active panel.
};

if (
  document.startViewTransition &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.startViewTransition(commitTabChange);
} else {
  commitTabChange();
}
```

Assign `view-transition-name: role-panel` only to the active panel. Transition with a restrained 160–220ms crossfade and slight clipping from the selected tab edge. Do not slide the whole page or animate panel height.

---

## 12. ROI calculator

Rename the visible result concept to **Annual base manual cost**. Do not present an ROI ratio because implementation cost is not supplied.

Desktop composition:

- Intro and assumptions: columns 1–4.
- Inputs: columns 5–8.
- Formula and output: columns 9–12.
- Separate these regions with rules, not floating cards.
- Make the annual base manual cost the dominant figure using Newsreader at `--step-4`.

Required explicit labels must contain:

- “Team size”
- “Weekly manual hours per person”
- “Blended hourly rate”
- “Estimated share of manual hours saved”

Use a fixed 48-week working year. Defaults must render:

```text
10 × 5 × $120 × 48 = $288,000
```

The annual base cost must be an `<output>` associated with the form and included in an `aria-live="polite"` region. Render exactly `$288,000` for the defaults using `Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })`.

Also calculate:

- Annual manual hours
- Estimated annual hours saved
- Estimated annual value of hours saved

Keep the planning-estimate disclaimer visible adjacent to the output. State that results are estimates, not guaranteed savings or financial return.

Input treatment:

- 48px minimum height.
- 1px strong rule with 3px accent focus treatment.
- White or solid surface fill; no inset glass effect.
- Numeric values use tabular figures.
- Range value is visible as an `<output>`.
- Inputs remain usable at 200% zoom.
- Invalid or empty values resolve safely without `NaN`, overflow, or misleading output.

---

## 13. Case studies and architecture diagrams

Present each case study as an inspectable dossier, separated by a 2px primary rule.

Desktop article grid:

- Header and repository action: columns 1–3.
- Injected architecture diagram: columns 4–12.
- Problem / Architecture / Governance / Impact: columns 4–12 below the diagram in four ruled columns.
- Sticky case headers are permitted only above `1100px`; otherwise use normal document flow.

Retain the existing protected case-study HTML byte-for-byte. All visual restructuring must come from CSS and the injected diagram templates.

### Diagram system

Each diagram must be an inline SVG using:

```html
<svg
  viewBox="0 0 960 240"
  role="img"
  aria-labelledby="diagram-title-N diagram-desc-N"
  preserveAspectRatio="xMidYMid meet">
```

Requirements:

- Include unique `<title>` and `<desc>` elements.
- Use `vector-effect="non-scaling-stroke"`.
- Use `currentColor` for system lines and text.
- Use `--accent` only for human review, control boundaries, or decision gates.
- Use 1.25px main paths and 2px control boundaries.
- Use labeled rectangular nodes with square corners.
- Arrowheads are small, solid, and defined once per SVG.
- Do not use faux 3D, glowing nodes, server-rack imagery, brains, sparkles, robots, or neural-network webs.
- SVG text must remain readable but duplicate no essential content found only in the image.

Diagram subjects:

1. **Browser LLM debate orchestrator**  
   Prompt → orchestration → multiple model responses → synthesis → human acceptance.

2. **Stakeholder outreach draft generator**  
   Directory/sheet data → cleanup → MX validation → draft generation → Gmail drafts → human approval. Make the no-auto-send boundary explicit.

3. **Agent prompt context compression**  
   Long operational instructions → constraint extraction → compressed context → validation comparison → agent runtime.

4. **Agent VPS security hardening**  
   Agent host → access boundary → service controls → secrets/logging boundary → reviewable hardened baseline.

5. **Single-VM agent consolidation**  
   Separate agent services → migration sequence → service separation on one VM → verification → rollback path.

6. **OpenClaw to Hermes orchestrator migration**  
   Existing configuration → mapping → Hermes orchestration → verification gate → cutover, with a visible recovery path.

These are capability diagrams, not claims of client production scale. Do not add percentages, savings, uptime, user totals, throughput claims, or client logos.

On mobile, each SVG remains full width with a simplified `viewBox` composition. If labels become too small, change node arrangement in CSS/JS or provide a mobile SVG group; never require horizontal panning.

---

## 14. Credentials

Use an “evidence registry,” not a logo wall.

Create original inline SVG certification seals consisting of:

- A thin circular or squared verification outline.
- A two- or three-letter text monogram.
- The complete credential name in adjacent HTML.
- A small “Credential” descriptor in sentence case.

Do not reproduce vendor logos or imply endorsement. The seal is a site-native organizational device, not a counterfeit certification mark.

Group the credentials into ruled rows:

### AI, cloud, and data

- NVIDIA Certified Professional: AI Agents
- Azure Solutions Architect Expert
- Azure Data Engineer Associate
- Salesforce Data Architect
- Microsoft Fabric, analytics, and automation

### Delivery and analysis

- Project Management Professional (PMP)
- SAFe 6 Agilist
- Certified Business Analysis Professional (CBAP)
- Certified ScrumMaster
- Certified Analytics Professional
- Requirements and stakeholder governance

### Operating contexts

- NYC HPD
- State and local government
- HIPAA-aware delivery
- Section 508 accessibility
- Salesforce and S/4HANA programs

Use a two-column registry on desktop and one column on mobile. Avoid identical rounded badge pills. Credential names are the emphasis; the marks remain secondary.

---

## 15. Contact and footer

Make the contact section the visual resolution of the decision spine.

Desktop:

- Decision spine enters at column 1.
- Headline occupies columns 2–8.
- Commercial terms and actions occupy columns 9–12.
- The primary Book a call action uses the accent.
- GitHub and LinkedIn are subordinate text links with directional underlines.
- State `$110–$160/hr`, Corporate Consulting LLC, C2C/W-2, Hanover GL, and Hartford Tech E&O in visible text.

Recommended headline:

> Put an architect in the room who can also move the work.

Use the existing headshot only here, if retained:

- Small 4:5 crop.
- Grayscale with normal contrast.
- Explicit `width` and `height`.
- `loading="lazy"` and `decoding="async"`.
- No circular crop, color overlay, floating frame, or decorative portrait animation.

The footer remains a destination rather than a thin legal strip. Include Jason’s role, GitHub, LinkedIn, and a back-to-top action. Do not repeat a large CTA cluster.

---

## 16. Tactile interaction language

Every interactive element needs designed `:hover`, `:focus-visible`, and `:active` states.

### Links

- Default: visible text underline with a controlled offset or a 1px rule.
- Hover-capable devices: underline draws directionally over 160ms.
- Focus: 3px accent outline with 3px offset.
- Active: underline thickness increases; do not reduce opacity.

### Buttons

- Sharp 0–2px corners.
- Primary action uses a solid offset block.
- Active press moves 2px toward the block.
- No soft shadows.
- No pills.

### Tabs

- Inactive: surface background and strong text.
- Hover: subtle accent-wash fill.
- Selected: accent rule at the leading edge and increased text weight.
- Focus: outline remains distinct from the selected treatment.

### Inputs

- Strong rule at rest.
- Accent rule plus outer focus ring on focus.
- Never remove the browser focus indication without replacing it.
- Minimum target size is 44px; primary actions should be at least 48px.

Wrap hover-only effects in:

```css
@media (hover: hover) and (pointer: fine) {
  /* Hover treatments */
}
```

Style selection:

```css
::selection {
  color: var(--selection-ink);
  background: var(--selection-bg);
}
```

---

## 17. Scroll reveal and motion

Motion has three jobs only:

1. Establish the decision spine on initial load.
2. Reveal the internal structure of architecture diagrams.
3. Preserve continuity when role tabs switch.

Do not fade and translate every card or section upward.

### Initial hero moment

With motion allowed:

- Headline resolves from a 12px vertical clip over 420ms.
- Decision spine draws once over 620ms.
- Commercial terms appear without delay so the rate is never temporarily hidden.
- CTAs must be usable immediately.

### IntersectionObserver

Apply `data-reveal` only to:

- Major section rules.
- Architecture diagram connector groups.
- Credential registry rule groups.

Use:

```js
new IntersectionObserver(callback, {
  threshold: 0.18,
  rootMargin: "0px 0px -12% 0px"
});
```

Reveal once, then `unobserve`. Prefer clipping and rule growth over generic fade-and-rise. Limit the page to roughly 12 observed reveal groups.

Content must be visible by default. Add an enhancement class only after the observer is successfully created; without JavaScript or IntersectionObserver, everything remains visible.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }

  [data-reveal] {
    opacity: 1 !important;
    clip-path: none !important;
    transform: none !important;
  }
}
```

When reduced motion is active:

- Do not use View Transitions.
- Do not draw SVG paths progressively.
- Do not smooth-scroll.
- All state changes occur immediately.

---

## 18. Crafted detail

Use small details sparingly and consistently:

- A 1px baseline rule aligned to the 12-column grid.
- A 6px square accent node where the decision spine changes direction.
- Tabular numerals for rates, formulas, and case counts.
- Case-study numbering remains `01 / 06` through `06 / 06` because it indexes a finite evidence set.
- Fine “registration ticks” may appear at the start and end of major rules.
- Diagram control boundaries use a double rule or an accent corner, never a glow.
- Use a subtle 8px/80px alignment grid only inside diagrams, at no more than 4% contrast.
- Alternate section density rather than mechanically alternating background colors.
- Use at most three surface levels: canvas, surface, and surface-raised.
- Use no border radius above 2px except the circular credential seal geometry.

Do not add fixed grain overlays, `backdrop-filter`, expensive SVG turbulence, custom cursors, parallax, or scroll hijacking. Craft should come from alignment, typography, rules, and interaction—not render cost.

---

## 19. Accessibility and resilience

Required implementation behavior:

- Semantic header, navigation, main, sections, articles, forms, and footer.
- One correctly ordered `h1`; section headings proceed logically.
- Skip link visible on focus.
- Visible focus states in both themes.
- Mobile navigation usable without JavaScript.
- Tabs fully keyboard-operable with exactly four tab elements.
- Tab panels associated through `aria-controls` and `aria-labelledby`.
- Calculator fields use explicit `<label>` elements.
- Calculator result uses `<output>` and `aria-live="polite"`.
- Inline SVG diagrams use unique titles and descriptions.
- No meaningful content exists only in generated CSS, animation, or SVG.
- Do not use color alone to indicate selected, invalid, active, or governed states.
- Support 200% zoom and browser text resizing.
- Respect reduced motion.
- Preserve useful content if fonts, JavaScript, images, or external styles fail.
- Target WCAG 2.1 AA and zero serious or critical axe findings.

---

## 20. Performance standards

Target Lighthouse scores of at least 95 in Performance, Accessibility, Best Practices, and SEO.

Implementation budget:

- No third-party JavaScript.
- Keep `effects.js` small and dependency-free.
- Use one deferred script.
- Use only the specified Google Font families and weights.
- Preconnect only to the two Google Fonts origins.
- Inline diagrams and certification marks.
- Set explicit image dimensions.
- Lazy-load below-fold imagery.
- Avoid layout-changing DOM insertion after first paint; template cloning should occur during deferred-script initialization.
- Avoid CSS filters on large surfaces.
- Do not animate layout properties.
- Use transforms, opacity, and clip-path only for short, bounded motion.
- Do not preload unnecessary assets.
- Do not hide primary HTML pending JavaScript.

Ensure the hero’s text—not an image—is the likely largest contentful element. Avoid a large hero photograph.

---

## 21. Metadata and factual preservation

Retain or improve the existing search description, Open Graph metadata, Twitter card metadata, canonical URL, favicon, and structured data.

JSON-LD must remain supportable:

### Person

- `name`
- `url`
- `jobTitle`
- `sameAs`
  - `https://github.com/webdev0814`
  - `https://www.linkedin.com/in/jasonsantpmp`

### ProfessionalService

- `name`: Corporate Consulting LLC
- `url`: `https://jasonsant.dev/`
- `priceRange`: `$110–$160/hr`
- `areaServed`: United States

Do not add aggregate ratings, client names, employee counts, awards, invented locations, unsupported service volumes, or performance claims.

---

## 22. What to avoid

Do not ship:

- Purple or blue-purple gradients.
- Gradient-clipped headline text.
- Generic glass cards or frosted navigation.
- Repeated rounded rectangles.
- Uniform three-column card grids.
- Centered hero copy.
- A floating hero portrait card.
- Glowing AI nodes, robot heads, brains, sparkles, or neural webs.
- Stock AI imagery.
- Vendor or client logos.
- Fake certification logos.
- Decorative metrics.
- Invented percentages, savings, uptime, user totals, or client outcomes.
- “Trusted by” claims without evidence.
- All-caps eyebrows above every heading.
- Monospace labels used merely to appear technical.
- A decorative arrow appended to every link.
- Section numbers where content is not sequential.
- An accent-colored word inside every headline.
- Soft drop shadows.
- Excessive sticky elements.
- Horizontal mobile scrolling.
- Auto-rotating content.
- Parallax or scroll hijacking.
- Sound.
- More than one accent color.
- Motion on every section.
- Auto-sending behavior implied by the outreach case study.
- Any change inside the protected project-link marker range.

---

## 23. Final QA checklist

Before release, verify:

- [ ] One doctype, head, and body.
- [ ] `$110–$160/hr` is visible above the fold at `1440×900`.
- [ ] `$110–$160/hr` is visible above the fold at `390×844`.
- [ ] Both hero CTAs are visible at those viewports.
- [ ] Hero contains exactly two CTAs.
- [ ] “Book a call” uses the required Cal.com URL everywhere.
- [ ] Every “Book a call” uses `target="_blank" rel="noopener"`.
- [ ] “See case studies” links to `#case-studies`.
- [ ] LinkedIn uses `https://www.linkedin.com/in/jasonsantpmp`.
- [ ] Protected marker block is byte-identical.
- [ ] All six repository URLs are byte-identical.
- [ ] All six diagrams render as inline SVG after enhancement.
- [ ] Exactly four `role="tab"` elements exist.
- [ ] Arrow Left, Arrow Right, Home, and End work.
- [ ] Tab focus and selected state update together.
- [ ] Tabs remain understandable without JavaScript.
- [ ] Calculator labels contain “Team size,” “hours,” and “rate.”
- [ ] Default annual base manual cost renders as `$288,000`.
- [ ] The result is an `<output>` in an `aria-live` region.
- [ ] Corporate Consulting LLC and Wyoming LLC are stated.
- [ ] C2C and W-2 are stated.
- [ ] Hanover business-owners/GL and Hartford Tech E&O are stated.
- [ ] Sectors, compliance contexts, platforms, and all credentials remain.
- [ ] Person and ProfessionalService JSON-LD remain valid.
- [ ] Theme defaults to the system preference when no override exists.
- [ ] Theme choice persists in `localStorage`.
- [ ] Focus is visible in both themes.
- [ ] Reduced motion disables nonessential animation and View Transitions.
- [ ] No horizontal scroll occurs at 375px.
- [ ] Axe reports zero serious or critical issues.
- [ ] Lighthouse scores at least 95 in all four categories.
- [ ] No unsupported metric, client logo, or outcome claim was introduced.

## Final creative test

The most memorable element must be the decision spine and its relationship to actual evidence. If it can be removed without changing the experience, it has become decoration and must be redesigned.

The most likely generic element is the credentials area. Keep it as a ruled evidence registry with original verification seals—not a badge-card grid.

If the name is removed, the page should still unmistakably describe a senior practitioner who joins enterprise intent to architecture, controls, and delivery. It should not plausibly belong to a generic AI startup, design agency, or junior developer portfolio.
