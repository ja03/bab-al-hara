import type { CharacterId } from '#shared/data/characters'
import type { Answers } from '#shared/utils/quiz'

export interface QuizOutcome {
  characterId: CharacterId
  stats: { total: number; same: number } | null
}

/** Answers in progress and the last result, shared across pages. */
export function useQuizState() {
  const answers = useState<Answers>('answers', () => ({}))
  const outcome = useState<QuizOutcome | null>('outcome', () => null)

  const reset = () => {
    answers.value = {}
    outcome.value = null
  }

  return { answers, outcome, reset }
}
