import { scoreAnswers, validateAnswers, type Answers } from '#shared/utils/quiz'

/**
 * Scores the quiz on the server (the client's own guess is never trusted),
 * saves the result in Neon, and returns how many players got the same character.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<{ answers?: unknown }>(event)
  const error = validateAnswers(body?.answers)
  if (error) throw createError({ statusCode: 400, statusMessage: error })

  const answers = body!.answers as Answers
  const { characterId, scores } = scoreAnswers(answers)

  let stats: { total: number; same: number } | null = null
  const sql = useDb()
  if (sql) {
    try {
      // The CTE's insert isn't visible to the outer SELECT, hence the + 1.
      const rows = await sql`
        WITH inserted AS (
          INSERT INTO quiz_results (character_id, answers)
          VALUES (${characterId}, ${JSON.stringify(answers)}::jsonb)
          RETURNING 1
        )
        SELECT
          (SELECT count(*) FROM quiz_results)::int + 1 AS total,
          (SELECT count(*) FROM quiz_results WHERE character_id = ${characterId})::int + 1 AS same
        FROM inserted`
      const row = rows[0] as { total: number; same: number } | undefined
      if (row) stats = row
    } catch (err) {
      // The quiz still works without the database; we just skip saving and stats.
      console.error('[results] could not save result:', err)
    }
  }

  return { characterId, scores, stats }
})
