# QA record

Verified on 3 October 2026.

## Automated checks

`npm test`: 13 passing tests covering:

- 20 unique main sessions across the complete 30-day calendar.
- Streak deduplication, gaps, month boundaries and yesterday grace.
- Timer reconstruction from persisted timestamps and paused elapsed time.
- Skill averages, recent-five window, baseline and change calculations.
- Recurring low-score recommendations and honest evidence wording.
- Unavailable localStorage, malformed saved JSON and invalid saved state.
- Draft and journal storage roundtrip.
- Invalid upload formats, empty uploads, image count and size limits.
- Backup structure and rejection of invalid restore data.

`npm run build`: optimized Next.js production build and static export passed.

## Browser checks

Tests used a separate `127.0.0.1` origin so test work does not appear in the user's `localhost` workspace.

- Desktop dashboard visual inspection at 1440 × 1000.
- Mobile light-theme visual inspection at 390 × 844; no document overflow.
- Navigation through mission, progress, journal, practice, references, drawing, case study and settings.
- Timer start, pause, resume, phase transitions and completion prompt.
- PNG upload to IndexedDB and rendered draft preview.
- Reload retained the 13-second paused timer, draft critique and uploaded image.
- Incomplete self-critique blocked submission with an actionable error.
- Full submission saved, displayed its image and produced all five review sections.
- Next-mission navigation advanced session 1 to session 2.
- Progress displayed 1/20 main sessions, 1/30 days, one-day streak and the expected 8.0 composition, 5.0 hierarchy and 7.0 execution scores.
- Hierarchy was correctly recommended as the next practice focus.
- Journal entry saved; reference image and all seven study notes saved.
- Drawing completion and case-study editing/export exercised.
- Full image-inclusive backup exported; a valid test backup restored through the confirmation flow.
- Final session 20 submission populated the case-study project, objective, self-critique and mentor feedback.
- Before/after comparison appeared after two submissions.
- Read-only WebMCP progress tool returned matching data and rejected unexpected input.

## Practical limits

- Mentor reviews are deterministic coaching from self-assessment; they do not analyze image pixels or independently grade designs.
- Browser-local data is not synchronized across devices or domains. Backups include images.
- Physical disk exhaustion/browser eviction was not induced; denial and validation paths are covered by tests.
- No Vercel account deployment was performed. The source and static build are ready for deployment.
- PDF generation is not included. Case studies export as editable Markdown; full backups export as JSON.

Additional checks: supporting-day completion passed; a corrupt PNG was rejected without creating a submission; tablet viewport at 820 px had no document overflow.
