# prateek-career-studio

Portfolio + resume workspace for **Prateek Kumar**.

## Stack
- React (Vite)
- React Router (multi-page navigation via `navigate()`)
- MUI
- SCSS

## Dev
```bash
npm install
npm run dev
```

## Build & Test
```bash
npm run test
npm run build
npm run preview
```

## Content Sources
Website and resume content lives in:
- `src/content/profile.json`
- `src/content/resume.json`
- `src/content/site.json`
- `src/content/resume.txt` (legacy/source transcript)

Canonical source-of-truth for personality, positioning, adjectives/qualities, and resume/project narrative is the `data-bank/` set, especially:
- `data-bank/master-profile.json`
- `data-bank/master-resume-v1.json`
- `data-bank/project-stories.json`

When polishing copy/tone, prefer databank language and evidence over ad-hoc rewrites.

---

## Resume Overhaul Roadmap

### Phase 1 (implemented)
- Structured `data-bank/` with reusable profile, achievements, skills, and project stories.
- Generated master resume artifacts (`master-resume-v1.md` + `master-resume-v1.json`).
- Added JD tailoring workflow docs and variant templates.
- Updated website copy to be more hiring-focused while staying fact-accurate.

### Phase 2 (next)
- Add role-targeted resume variants for top target roles.
- Improve project case studies with clearer challenge → action → impact flow.
- Add lightweight scripts to automate resume variant generation.

### Phase 3 (later)
- Add recruiter-facing landing copy + downloadable resume packets.
- Introduce optional portfolio metrics visualizations if verified data becomes available.

---

## How to Generate a Tailored Resume

1. Copy the JD into a working note (`JD_TEXT`).
2. Read and follow `data-bank/jd-tailoring-playbook.md`.
3. Start from `data-bank/master-resume-v1.json`.
4. Use a template from `data-bank/resume-variants/templates/`.
5. Save outputs to `data-bank/resume-variants/` using:
   - `resume-<role-slug>-<yyyy-mm-dd>.md`
   - `resume-<role-slug>-<yyyy-mm-dd>.json`
6. Truth-check: ensure each tailored claim maps to evidence in:
   - `data-bank/achievements-bank.json`
   - `data-bank/project-stories.json`
   - `data-bank/skills-taxonomy.json`
