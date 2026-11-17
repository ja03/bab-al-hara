<script setup lang="ts">
import { quiz, scoreAnswers } from '#shared/utils/quiz'
import type { QuizOutcome } from '~/composables/useQuizState'

const { tr, t, num } = useLang()
const { answers, outcome } = useQuizState()

const total = quiz.questions.length
// Resume at the first unanswered question (e.g. after a reload or going back).
const index = ref(Math.max(0, quiz.questions.findIndex((q) => !answers.value[q.id])))
if (quiz.questions.every((q) => answers.value[q.id])) index.value = total - 1

const question = computed(() => quiz.questions[index.value]!)
const answered = computed(() => quiz.questions.filter((q) => answers.value[q.id]).length)
const submitting = ref(false)

async function choose(optionId: string) {
  if (submitting.value) return
  answers.value = { ...answers.value, [question.value.id]: optionId }

  if (index.value < total - 1) {
    index.value++
    return
  }

  submitting.value = true
  let result: QuizOutcome
  try {
    result = await $fetch<QuizOutcome>('/api/results', { method: 'POST', body: { answers: answers.value } })
  } catch {
    // Offline or server unavailable: score on the device, without stats.
    result = { characterId: scoreAnswers(answers.value).characterId, stats: null }
  }
  outcome.value = result
  await navigateTo(`/result/${result.characterId}`)
}

function back() {
  if (index.value > 0) index.value--
}
</script>

<template>
  <section class="quiz">
    <AblaqProgress :total="total" :done="answered" :label="t('questionOf', { n: num(index + 1), total: num(total) })" />
    <p class="counter">{{ t('questionOf', { n: num(index + 1), total: num(total) }) }}</p>

    <Transition name="swap" mode="out-in">
      <div :key="question.id" class="q">
        <h1 class="question">{{ tr(question) }}</h1>
        <ul class="options">
          <li v-for="o in question.options" :key="o.id">
            <button
              type="button"
              class="option"
              :class="{ chosen: answers[question.id] === o.id }"
              :aria-pressed="answers[question.id] === o.id"
              :disabled="submitting"
              @click="choose(o.id)"
            >
              {{ tr(o) }}
            </button>
          </li>
        </ul>
      </div>
    </Transition>

    <p v-if="submitting" class="status" role="status">{{ t('scoring') }}</p>
    <button v-else-if="index > 0" type="button" class="btn btn-quiet back" @click="back">
      {{ t('back') }}
    </button>
  </section>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: 1rem;
}
.counter {
  color: var(--brass);
  font-size: 0.95rem;
  margin: 0;
}
.question {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: clamp(1.5rem, 5.5vw, 1.9rem);
  line-height: 1.45;
  margin: 0.25rem 0 1.25rem;
  color: var(--jasmine);
}
.options {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}
.option {
  width: 100%;
  text-align: start;
  font: inherit;
  font-size: 1.12rem;
  line-height: 1.5;
  padding: 0.85rem 1.1rem;
  color: var(--basalt);
  background: var(--limestone);
  border: 0;
  border-inline-start: 0.45rem solid var(--walnut);
  border-radius: 0.2rem;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}
.option:hover { border-inline-start-color: var(--brass); }
.option.chosen {
  background: var(--jasmine);
  border-inline-start-color: var(--brass);
}
.option:disabled { cursor: progress; opacity: 0.7; }
.status {
  color: var(--brass);
  text-align: center;
}
.back { justify-self: start; }

.swap-enter-active, .swap-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.swap-enter-from { opacity: 0; transform: translateY(0.4rem); }
.swap-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .swap-enter-active, .swap-leave-active { transition: none; }
}
</style>
