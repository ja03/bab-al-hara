<script setup lang="ts">
import { quiz } from '#shared/utils/quiz'

const { tr, t } = useLang()
const { reset } = useQuizState()
const opening = ref(false)

function start() {
  if (opening.value) return
  reset()
  opening.value = true
  const reduced = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setTimeout(() => navigateTo('/quiz'), reduced ? 0 : 1050)
}
</script>

<template>
  <section class="home">
    <HaraGate :open="opening" :sign="t('sign')" />
    <h1 class="display">{{ tr(quiz.title) }}</h1>
    <p class="lede">{{ t('intro') }}</p>
    <button type="button" class="btn btn-primary" :disabled="opening" @click="start">
      {{ t('start') }}
    </button>
  </section>
</template>

<style scoped>
.home {
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  text-align: center;
  padding-top: 1rem;
}
.home .display {
  margin-top: 0.75rem;
}
</style>
