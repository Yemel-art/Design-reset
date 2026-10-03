# DESIGN RESET

A private, browser-local deliberate-practice studio for experienced graphic designers.

## Run locally

Install Node.js 22 or newer, then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To check a production build, run `npm run build`. The static website is generated in `out/`.

## Deploy to Vercel

1. Put this folder in a Git repository and push it to your Git provider.
2. Import that repository into Vercel.
3. Select Next.js, retain the `npm run build` command, and deploy. No environment variables, database, authentication or API keys are needed.

The application uses a static Next.js export. Its data stays in the browser, so opening a new domain or another browser starts a separate workspace. Export a backup from Settings before changing devices or deployment domains, then restore it there.

## Architecture

- Next.js App Router, React, TypeScript and Tailwind CSS, with custom responsive editorial styling.
- `lib/curriculum.ts`: all 20 main sessions, the complete 30-day calendar, and eight optional drawing prompts.
- `lib/core.ts`: pure scoring, trend, streak, timer and review logic.
- `lib/storage.ts`: replaceable storage boundary; localStorage for structured records and IndexedDB for image blobs.
- No account, server database, tracking service or external model API.

## Mentor review

The mentor is a deterministic reflection assistant. It uses your self-ratings, written answers, relevant skill categories and recent submission history. It separates reported strengths, issues, reasoning, proposed changes and the next drill. It does **not** inspect or understand image pixels, independently grade your work or claim a design is visually strong. Your uploaded images support your own review and comparison. Scores and trends are explicitly self-assessed.

A future opt-in image-aware model could replace this review function, but would require a protected server endpoint and user consent to send images. No such infrastructure is added here.

## Persistence and privacy

Structured data is saved after changes; timer progress is reconstructed from timestamps after a refresh. Images are stored locally in IndexedDB. PNG, JPEG and WEBP are supported, up to 15 MB each and 12 images per upload. Backups include both images and structured data. They may contain private work and should be stored accordingly.

Browser clearing, private mode, storage eviction and moving between domains can remove or isolate data. Export backups regularly. If localStorage cannot be read or written, the application reports temporary mode rather than pretending your changes are saved. Image-storage failures leave the submission incomplete and display an error. There is no cloud synchronization.

## Training model

The 20 main sessions are distributed across four seven-day blocks; the remaining ten days support review, rest, catch-up and reflection. Session numbers and calendar days are shown separately. You can work in any order. Completed work is never removed because a streak ends. A streak counts distinct local dates with a completed session, drawing exercise or supporting activity; yesterday keeps an active streak until today ends.

Skill summaries average the latest five ratings per category. Trends compare the first and latest scores; a range of three or more points across recent ratings is flagged as variable. Low scores across at least three submissions trigger a recurring-weakness recommendation. These are practice signals, not objective assessments.

## Verification

```sh
npm test
npm run build
```

See QA.md for the actual verification record and known limitations.
