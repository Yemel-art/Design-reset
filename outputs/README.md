# DESIGN RESET — visual tutoring studio

A focused personal studio for experienced designers: understand → design → review → refine.

## Free tutor setup

1. Open https://aistudio.google.com/api-keys and sign in to Google.
2. Create a key in a project labelled **Free Tier**. Leave billing disabled; no paid subscription is needed for the free quota.
3. Put the key in `.env.local` as `GEMINI_API_KEY=...`. Never paste it into chat.
4. Restart the app and use Settings → Check connection. The indicator confirms server configuration, not successful model access; your first review verifies that.

Google controls eligibility and quotas, which can change. A quota error pauses reviewing while preserving your work. Wait for quota reset; do not upgrade to a paid tier.

Pricing: https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash
Billing tiers: https://ai.google.dev/gemini-api/docs/billing

## Start locally

Use Node.js 22 or newer:

```sh
npm ci
```

Copy `.env.example` to `.env.local` if it does not exist, then enter your own API key there:

```dotenv
GEMINI_API_KEY=your-key-here
TUTOR_ACCESS_CODE=your-long-private-studio-code
```

Never paste your API key into the app, commit it, or add a `NEXT_PUBLIC_` prefix. `.env.local` is ignored by Git and deployment uploads. The studio access code is a separate private value you choose; it is required in production. Enter that code in the app's Settings when prompted. Create the key in a Google AI Studio project labelled **Free Tier**, with **billing disabled**. Do not add payment details or enable billing. Gemini 3.8 Flash is currently free within that tier’s quotas. The app cannot inspect a key’s billing tier: using a paid-project key can incur charges. There is no OpenAI connection, paid-provider fallback, automatic retry, search tool or automatic upgrade.

```sh
npm run dev
```

Open http://localhost:3000. Restart after changing environment variables. With no API key, the learning, timer, uploads and saved work still function, but visual critique remains explicitly unavailable. There is no mock-review fallback.

## Deploy to Vercel

Import the repository with the Next.js preset. Configure `GEMINI_API_KEY` and `TUTOR_ACCESS_CODE` in Vercel Environment Variables, then deploy/redeploy. No database is needed. Build command: `npm run build`.

This version uses a server route (`/api/tutor`) and is **not a static export**. Old `out/` files from v1 must not be deployed. Local production command: `npm run build` then `npm start`.

## Tutor behavior

- Sends actual selected image inputs and the server-owned mission brief to the Google Gemini generateContent API (gemini-3.8-flash).
- Receives schema-constrained, runtime-validated feedback: visible strengths, up to three prioritized changes, reasons, verification steps, approximate skill scores, a teaching principle and limitations.
- Allows a follow-up question with the images, review and recent conversation context.
- Compares a revised upload with the original's first image. Use contact sheets for multi-layout comparisons; the interface explains this limit.
- Doesn't require self-scoring or a questionnaire. Context is optional.
- Refusals, unreadable images, malformed model output, timeouts and provider errors never become successful reviews.
- A revision cycle requires a new upload. The designer can finish after a reviewed revision even if further improvements remain; the app does not force endless polishing.

Model assessments are judgments, not objective scores. The evidence and edit-test loop matter more than the number. A live model-quality evaluation is still needed after connecting a valid key.

Official implementation references:
- https://ai.google.dev/gemini-api/docs/generate-content/image-understanding
- https://ai.google.dev/gemini-api/docs/generate-content/structured-output

## Focus stages

Understand: 15 minutes. Design: mission duration minus 25 minutes, minimum 30. Review: 10 minutes. Optional refinement cycle: 20 minutes.

Timers count down, stop at zero and show a persistent completion indicator. A two-tone sound plays if enabled and the audio context was unlocked by starting the timer. Browser suspension or closing the app can delay alerts; elapsed time is reconstructed when the page resumes. No background push notifications are promised.

Completing a stage locks it. An early finish requires a confirmation. Prior notes remain readable. The review stage cannot advance without an assessable AI review. Switching missions pauses the previous timer. Timers and stage locks persist across refresh.

## Data and privacy

The original localStorage key and IndexedDB image database are retained. Earlier submissions, ratings, journals, references and completed sessions remain available. Earlier self-ratings are not mixed into AI skill trends.

Each session's latest assessable revision is counted once in the skill profile. Originals and subsequent versions remain in the work archive. Tutor messages, stages and images are included in full JSON backups.

Selected images are downscaled locally to fit the request limit. Original files remain in IndexedDB. Google may use free-tier inputs and responses to improve its products. Do not send confidential client designs through the free tier. The app does not keep server-side image or response records.

A private access code protects the private API route in production. A bounded request size, one in-flight review and a six-per-minute in-memory guard reduce accidental repeated requests. This guard is per server instance, not a durable account-level spending limit. Leave Google project billing disabled to stay on the free tier. This remains a personal app; selling it to multiple users would require account isolation, durable quotas and billing.

Pip is a lightweight studio companion whose tips come from the curriculum or latest review, not an independent image model. It can be hidden, and animation respects reduced-motion settings.

## Verification

```sh
npm test
npm run build
```

See QA.md for the current tested behavior and live-API limitations.
