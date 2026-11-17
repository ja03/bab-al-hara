# Bab Al-Hara quiz

"Which Bab Al-Hara character are you?": a Nuxt 4 PWA in Arabic and English. Results go to Neon Postgres, and the app is hosted on Render (`render.yaml`). The README covers setup and the file map.

## Content

- **Arabic first.** Arabic is the default language and the layout is RTL. Every user-facing string has an `ar` and an `en` version: quiz text lives in `shared/data/quiz.json`, character text in `shared/data/characters.ts`, and UI strings in `app/composables/useLang.ts`. Write Arabic copy in Levantine (شامي) the way the show speaks, not in Modern Standard Arabic.
- **Characters live in two places.** `bab-al-hara-characters.md` is the reference for a future LLM-written narrative, and `characters.ts` is what the app displays. Edit both together, and use only traits written there, never details recalled from the show.
- **Playful tone.** Troublemaker results such as Abu Ghaleb and Ferial should read as funny, never insulting.
- **Balanced leans.** Every character should appear in the same number of questions across `quiz.json`. Today five characters appear in 5 questions and five in only 4, and Mo'taz wins answer sets that point at Abu Shehab. When you edit leans, count each character's appearances.

## Code

- **One scorer.** `shared/utils/quiz.ts` is the only place scoring happens. The server's result is authoritative, and the client calls the same function only as an offline fallback. Change the scoring rule there and update the README's scoring line.
- **The env var is `NUXT_DATABASE_URL`**, not `DATABASE_URL`, because Nuxt only overrides `runtimeConfig.databaseUrl` at runtime from `NUXT_`-prefixed variables. The app keeps working without it: results aren't saved and the stats line is hidden.
- **Idempotent schema.** Render runs `npm run db:migrate` on every build, so everything in `db/schema.sql` must be safe to re-run (`IF NOT EXISTS`). The Neon HTTP driver runs one statement per call, and the migrate script splits the file on `;`.
- **TypeScript stays on 6.x.** TypeScript 7 removed `lib/tsc`, which `vue-tsc` (and so `nuxt typecheck`) still needs.
- **Design tokens** (night ink, brass, walnut, ablaq limestone and basalt) are defined in `app/assets/main.css`. The gate opening on the home page is the app's one decorative animation; other motion only responds to what the user does, and respects `prefers-reduced-motion`.

## Verify

Run `npm run typecheck && npm run build`, then play the quiz through in the browser pane. Shell commands in this environment can't reach localhost, so test the API with `fetch` from the page instead of `curl`.
