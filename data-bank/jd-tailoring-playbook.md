# JD Tailoring Playbook

## Goal
Generate a role-specific resume from the master profile without introducing fabricated claims.

## Inputs
1. Job description text (`JD_TEXT`)
2. `data-bank/master-resume-v1.json`
3. `data-bank/achievements-bank.json`
4. `data-bank/skills-taxonomy.json`
5. `data-bank/project-stories.json`
6. Template from `data-bank/resume-variants/templates/`

## Guardrails
- Do not invent metrics, tools, or ownership that cannot be traced to existing profile/resume files.
- Prefer exact wording from achievements/project stories when possible.
- Keep role relevance high: include only the most aligned skills and projects.

## Workflow
1. **Extract JD signals**
   - Role title, seniority, must-have skills, domain keywords, team expectations.
2. **Map JD → evidence**
   - Match each must-have signal to one or more entries in achievement/skills/project banks.
3. **Select narrative angle**
   - Frontend-heavy, platform/reliability-heavy, or product/full-stack-leaning.
4. **Rewrite summary (3 bullets max)**
   - One role-fit line, one business impact line, one execution/collaboration line.
5. **Re-order skills**
   - Top 8–12 skills by JD relevance.
6. **Tailor experience bullets**
   - Keep chronological history unchanged.
   - Rephrase highlights to mirror JD language while preserving facts.
7. **Pick project stories**
   - Include 1–3 stories most aligned to role outcomes.
8. **ATS sanity check**
   - Confirm keyword coverage from JD appears naturally in summary/skills/experience.
9. **Truth check**
   - Ensure every claim maps to an evidence entry in data-bank artifacts.

## Output Naming Convention
Write tailored files into `data-bank/resume-variants/`:
- `resume-<role-slug>-<yyyy-mm-dd>.md`
- `resume-<role-slug>-<yyyy-mm-dd>.json`

Example:
- `resume-senior-frontend-engineer-2026-02-11.md`

## Quick Prompt Template (for AI-assisted drafting)
"Using only claims present in the supplied data-bank files, generate a tailored resume for this JD. Keep employment timeline unchanged, do not fabricate metrics, and align wording to JD priorities. Output both Markdown and JSON using the provided role template."
