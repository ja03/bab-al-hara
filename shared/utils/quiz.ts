import quizData from '../data/quiz.json'
import { CHARACTER_IDS, isCharacterId, type CharacterId, type Localized } from '../data/characters'

export interface QuizOption extends Localized {
  id: string
  leans: CharacterId[]
}

export interface QuizQuestion extends Localized {
  id: string
  options: QuizOption[]
}

export interface Quiz {
  title: Localized
  questions: QuizQuestion[]
}

/** Question id -> chosen option id, e.g. { q1: 'b', q2: 'a' } */
export type Answers = Record<string, string>

export const quiz = quizData as Quiz

// Fail loudly at startup if the quiz JSON points to a character that doesn't exist.
for (const q of quiz.questions) {
  for (const o of q.options) {
    for (const lean of o.leans) {
      if (!isCharacterId(lean)) throw new Error(`quiz.json ${q.id}/${o.id}: unknown character "${lean}"`)
    }
  }
}

/** Returns an error message, or null when every question has a valid answer. */
export function validateAnswers(answers: unknown): string | null {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return 'answers must be an object'
  const a = answers as Record<string, unknown>
  for (const q of quiz.questions) {
    const choice = a[q.id]
    if (typeof choice !== 'string') return `missing answer for ${q.id}`
    if (!q.options.some((o) => o.id === choice)) return `invalid option "${choice}" for ${q.id}`
  }
  const extra = Object.keys(a).filter((k) => !quiz.questions.some((q) => q.id === k))
  if (extra.length) return `unknown questions: ${extra.join(', ')}`
  return null
}

export interface ScoreResult {
  characterId: CharacterId
  scores: Record<CharacterId, number>
}

/**
 * Every character an option leans toward gets 1 point.
 * Ties go to the tied character picked most recently: we walk the answers
 * from the last question back to the first and take the first tied match.
 * Expects answers that already passed validateAnswers().
 */
export function scoreAnswers(answers: Answers): ScoreResult {
  const scores = Object.fromEntries(CHARACTER_IDS.map((id) => [id, 0])) as Record<CharacterId, number>
  const picked = quiz.questions.map((q) => q.options.find((o) => o.id === answers[q.id])!)

  for (const option of picked) {
    for (const lean of option.leans) scores[lean]++
  }

  const best = Math.max(...Object.values(scores))
  const tied = CHARACTER_IDS.filter((id) => scores[id] === best)

  let characterId = tied[0]!
  if (tied.length > 1) {
    outer: for (let i = picked.length - 1; i >= 0; i--) {
      for (const lean of picked[i]!.leans) {
        if (tied.includes(lean)) {
          characterId = lean
          break outer
        }
      }
    }
  }

  return { characterId, scores }
}
