# Resume Variants

This folder stores role-specific resume outputs generated from the master data bank.

## Structure
- `templates/` — source templates for variant generation
- `resume-<role-slug>-<date>.md` — tailored ATS-ready markdown resume
- `resume-<role-slug>-<date>.json` — structured JSON version of the same resume

## Process
1. Start from `data-bank/master-resume-v1.json`
2. Follow `data-bank/jd-tailoring-playbook.md`
3. Use a template from `templates/`
4. Save outputs with the naming convention above

## Rule
Every tailored claim must map back to evidence in:
- `achievements-bank.json`
- `project-stories.json`
- `skills-taxonomy.json`
