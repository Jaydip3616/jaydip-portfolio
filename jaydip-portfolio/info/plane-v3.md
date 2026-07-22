# Portfolio Plan v3 — Professional Light Theme, Skills Upgrade, and Interactive Canvas

## Goal

Upgrade the existing portfolio into a recruiter- and client-ready site with a clean white default theme, a persistent dark-mode option, a professional profile presentation, a richer Skills/Expertise section, detailed employment history, and carefully controlled interactive animation.

This version preserves the current portfolio structure while improving credibility, visual clarity, mobile behaviour, and engagement.

## Confirmed Content Updates

### Brand and profile

- Replace the `JP.` header mark with `< Jaydip Pithava >`.
- Treat `< Jaydip Pithava >` as a compact personal wordmark: use a distinctive display typeface for the name, a clean monospace face for the angle brackets, and preserve strong readability at small mobile sizes. The wordmark should feel like developer identity, not code pasted into the navigation.
- Use a carefully selected web font pairing such as **Space Grotesk** (display/name) with **DM Mono** (brackets and technical labels), or a similarly professional pair with reliable browser fallback fonts. Avoid decorative script or overly complex fonts.
- Use the supplied [Jaydip-photo.jpg](../src/assets/Jaydip-photo.jpg) in the About section’s circular portrait frame.
- Crop the portrait with `object-fit: cover` and a face-focused `object-position` so it stays well framed at every screen size.
- Remove the “Based in Ahmedabad, India” text from the hero social area. Location may remain only in the Contact section as a supporting detail.

### Theme

- Make light mode the default: white/off-white page background, ink-coloured text, soft blue/purple accent, and subtle neutral borders/shadows.
- Add a visible light/dark theme toggle in the navbar.
- Save the selection in `localStorage`; read the saved choice before rendering the page so visitors return to their chosen theme.
- Use CSS variables for all colour values. Both modes must have the same layout, contrast, and interaction states.
- Respect the operating-system preference only if the visitor has not already selected a theme.

### Experience

Remove the bachelor’s-degree item from the Experience timeline. Add Education later as a separate section only if desired.

#### Rubixe AI Solutions Company

- **Role:** Data Science Consultant
- **Duration:** June 2024 — December 2024
- Worked on proof-of-concept and client projects, applying data-science approaches to real-world problems.
- Delivered assigned work reliably and met project deadlines.
- Collaborated with cross-functional teams to understand requirements and produce data-driven solutions.
- **Focus / technologies:** data analysis, preprocessing, feature engineering, machine-learning workflows, Python, Pandas, NumPy, scikit-learn, and Jupyter (show only technologies actually used).

#### Petpooja

- **Role:** Data Science Trainee
- **Duration:** August 2025 — December 2025
- Assisted with data cleaning and preprocessing to improve dataset accuracy, consistency, and reliability.
- Worked with real business data under guidance from senior data scientists and team leads.
- Handled missing values, outlier identification, and data formatting for downstream analysis.
- Developed familiarity with industry data workflows, requirements gathering, and analytical thinking.
- **Focus / technologies:** Python, Pandas, NumPy, SQL, Excel, data cleaning, and exploratory analysis (verify exact tools before publishing).

Each experience item will display role/company/dates at a glance and reveal responsibilities and key skills in a readable expandable or always-visible detail area.

## Skills and Expertise Upgrade

### Section design

Keep `02 / Expertise`, but evolve it from three generic cards to a professional four-part competency grid. The grid will be two columns on desktop/tablet where space allows and one column on mobile. Each card should include a clear capability statement, grouped technologies, and an optional small “What I do” list.

1. **AI & Machine Learning**
   - Supervised learning, classification, regression, model evaluation, feature engineering, deep learning, NLP.
   - Python, scikit-learn, TensorFlow, Pandas, NumPy.
   - Outcome: create predictive and intelligent systems from business data.

2. **Data Science** *(new dedicated skill group)*
   - Data collection, cleaning, exploratory data analysis, statistical thinking, feature preparation, hypothesis testing, and model-ready datasets.
   - Python, Pandas, NumPy, Jupyter Notebook, SQL, Matplotlib/Seaborn only if genuinely used.
   - Outcome: transform messy raw data into trustworthy analysis and usable insight.

3. **Data Analytics & Visualisation**
   - SQL querying, KPI analysis, dashboard design, business reporting, trend analysis, and data storytelling.
   - SQL, Power BI, Excel, Tableau, Pandas.
   - Outcome: help stakeholders understand performance and make better decisions.

4. **Automation & Development Tools**
   - Process automation, web data collection, application prototyping, version control, and reproducible workflows.
   - Python, Flask, Selenium, Git/GitHub, MySQL, AWS, VS Code.
   - Outcome: reduce repetitive work and deliver practical technical solutions.

### Professional presentation rules

- Do not use self-rated percentage/progress bars unless each rating can be objectively justified.
- Do not claim technologies that have not been used in a real project or role.
- Use concise grouped tags, readable line-height, and a clear card hierarchy rather than overcrowding each card.
- Keep the card title descriptive and the outcome focused on what a recruiter/client gains.

## Interactive Canvas Engagement

### Purpose

Add a small, performance-conscious interactive data canvas to the Hero section. It should make the site memorable without competing with the headline, portrait, or calls to action.

### Proposed experience: “Data Constellation”

- A transparent `<canvas>` sits behind or alongside the hero visual.
- It renders a restrained field of small data points connected by fine lines in the active theme’s accent colours.
- Points drift slowly; nearby points form lines to suggest data relationships and networks.
- Pointer movement adds a gentle attraction/repulsion effect within a limited radius.
- On touch devices, use passive ambient motion only; do not require interaction.
- The canvas never covers or blocks buttons, text, navigation, or keyboard focus.
- It should be decorative (`aria-hidden="true"`) because it conveys no necessary information.

### Performance safeguards

- Use `requestAnimationFrame`, pause animation when the hero is out of view, and clean up listeners/animation frames on unmount.
- Cap point count by viewport size (for example, 24 mobile / 42 desktop) and scale for device pixel ratio without over-rendering.
- Respect `prefers-reduced-motion`: render a static low-detail background or disable the canvas animation entirely.
- Do not add a heavy 3D, WebGL, or particle dependency. A small native React/canvas component is sufficient.
- Test interaction and scroll performance on a mid-range Android device as well as desktop.

### Additional animation system

- **Animated skills line in Hero:** place a single-line typewriter role below or alongside the main hero heading, inspired by the provided reference. It should cycle through accurate roles such as `AI & Data Science Developer`, `Machine Learning Enthusiast`, `Data Analyst`, and `Automation Builder`.
- The typewriter effect writes one role, pauses briefly, deletes it, then writes the next. Use a visible cursor that blinks gently; keep the full loop calm rather than fast or flashy.
- Prevent layout jumping by reserving enough width/height for the longest phrase. On smaller screens, allow the line to wrap safely or reduce the text size.
- Implement the effect as an accessible component: expose a stable complete description to screen readers (for example, `AI & Data Science Developer`) and mark the changing visual text as decorative/hidden from assistive technology.
- Under `prefers-reduced-motion: reduce`, stop cycling and show the stable primary role without a cursor animation.
- Theme toggle: 180–250ms colour and surface transition, with no flash of the incorrect theme.
- Hero: short fade-and-rise entrance for headline/CTAs; canvas begins only after initial content is visible.
- Section reveals: one-time `IntersectionObserver` fades/slides, max 500ms, staggered only for card groups.
- Cards/buttons: transform and shadow/border micro-interactions on hover and focus.
- Timeline: subtle reveal sequence, not an auto-scrolling effect.
- Disable non-essential animation under reduced-motion preferences.

## Implementation Plan

### Phase 1 — Content and theme foundation

1. Update the styled full-name wordmark, portrait asset, hero location removal, and experience data.
2. Expand skills data to the four professional categories above.
3. Separate reusable colour tokens into light and dark theme sets.
4. Add a theme provider/state hook that reads/writes `localStorage` and applies a document-level theme attribute.

### Phase 2 — Responsive UI refinement

1. Redesign the navbar for the full name and accessible theme toggle.
2. Update light-mode colours for all surfaces, cards, text, icons, form fields, focus rings, and footer.
3. Redesign the Expertise grid for four cards with professional information density.
4. Expand Experience content with role details, key responsibilities, technology tags, and mobile-first layout.
5. Test visual hierarchy at 320px, 375px, 768px, 1024px, and 1440px widths.

### Phase 3 — Canvas and motion

1. Build a reusable `DataCanvas` component with no external animation library.
2. Build the accessible hero typewriter component and configure its verified skills/role phrases.
3. Add pointer interaction, resize handling, viewport pause/resume, and reduced-motion fallback.
4. Keep existing scroll/card motion coherent with the light and dark themes.
5. Confirm all interactive elements remain keyboard-accessible and all content remains readable with animations disabled.

### Phase 4 — Validation

1. Run lint and production build.
2. Manually test theme persistence, mobile menu, theme-toggle keyboard operation, and contact behaviour.
3. Verify no content becomes unreadable in either mode and contrast remains accessible.
4. Check canvas CPU use and scroll smoothness on desktop and mobile.

## Acceptance Criteria

- Navbar displays `< Jaydip Pithava >` correctly on desktop and mobile.
- The real profile photograph is displayed inside an attractive, responsive circular frame.
- Light mode is the default and dark mode is available through an accessible persistent toggle.
- The hero no longer displays “Based in Ahmedabad, India”.
- Experience contains only Rubixe and Petpooja, with detailed recruiter-friendly responsibilities.
- Expertise has four professional cards, including a separate **Data Science** card.
- Hero contains a smooth, accessible animated skills/role typewriter line, with a stable reduced-motion fallback.
- `< Jaydip Pithava >` is visually distinctive, responsive, and remains readable in the navbar on small screens.
- The canvas is engaging but optional, does not harm usability, and obeys reduced-motion preference.
- All layouts work across mobile, tablet, and desktop; linting and the production build pass.

## Suggested Improvements Before Implementation

1. Add a separate **Education & Certification** mini-section beneath Experience instead of removing the degree entirely; it preserves useful recruiter information while keeping the Employment timeline accurate.
2. The supplied photo is strong and clear, but a tighter professional head-and-shoulders crop will look best in the circular frame. I can crop it using CSS without altering the original file.
3. Use the canvas only in the Hero section. Keeping it out of the Skills cards avoids visual distraction and protects performance.
4. Before publishing technology tags for the two roles, confirm the exact tools used at each company. This keeps the portfolio credible and easy to discuss in interviews.
