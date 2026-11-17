# مين إنت من شخصيات باب الحارة؟

A bilingual (Arabic/English) quiz PWA: answer 8 questions and find out which Bab Al-Hara character you are.
Built with Nuxt 4, results stored in Neon Postgres, hosted on Render.

## Run locally

```bash
npm install
cp .env.example .env        # then paste your Neon connection string
npm run db:migrate          # creates the quiz_results table
npm run dev                 # http://localhost:3000
```

The quiz still works without a database. Results just aren't saved, and the "X% got the same result" line is hidden.

## Where things live

| Path | What it is |
| --- | --- |
| `shared/data/quiz.json` | Questions, options, and which characters each option leans toward |
| `shared/data/characters.ts` | Character text shown on the result page (Arabic + English) |
| `bab-al-hara-characters.md` | Original character reference, kept for writing an AI narrative later |
| `shared/utils/quiz.ts` | Answer validation and scoring (used by both server and client) |
| `server/api/results.post.ts` | Scores the answers, saves them to Neon, returns stats |
| `db/schema.sql` | Database schema, applied by `npm run db:migrate` |
| `render.yaml` | Render Blueprint |

**Scoring:** each option gives 1 point to every character it leans toward. On a tie, the character from the most recent answer wins.

## Deploy to Render

1. In Render: **New → Blueprint**, then pick this GitHub repo.
2. When asked, set `NUXT_DATABASE_URL` to your Neon pooled connection string.
3. Deploy. The build runs the database migration, so the table is created automatically.

## Regenerate icons

Edit `public/icon.svg`, then run `npm run icons`.
