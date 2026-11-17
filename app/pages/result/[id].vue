<script setup lang="ts">
import { CHARACTERS, isCharacterId } from '#shared/data/characters'

const route = useRoute()
const id = route.params.id
if (!isCharacterId(id)) {
  throw createError({ statusCode: 404, statusMessage: 'Character not found', fatal: true })
}
const character = CHARACTERS[id]

const { tr, t, num } = useLang()
const { outcome, reset } = useQuizState()

// Stats only exist when this visitor just finished the quiz; shared links show the character alone.
const statsLine = computed(() => {
  const s = outcome.value?.characterId === id ? outcome.value.stats : null
  if (!s) return null
  if (s.same <= 1) return t('statsFirst')
  return t('stats', { p: num(s.same / s.total, { style: 'percent', maximumFractionDigits: 0 }) })
})

const copied = ref(false)
async function share() {
  const url = window.location.href
  const text = t('shareText', { name: tr(character.name) })
  if (navigator.share) {
    try {
      await navigator.share({ title: tr(character.name), text, url })
    } catch {
      // The person closed the share sheet.
    }
    return
  }
  await navigator.clipboard.writeText(`${text} ${url}`)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function retake() {
  reset()
  navigateTo('/')
}

useSeoMeta({
  title: () => `${tr(character.name)} | ${t('sign')}`,
  ogTitle: () => t('shareText', { name: tr(character.name) }),
  description: () => tr(character.youAreIf),
})
</script>

<template>
  <article class="result">
    <p class="you-are">{{ t('youAre') }}</p>
    <h1 class="display name">{{ tr(character.name) }}</h1>
    <p class="role">{{ tr(character.role) }}</p>

    <p class="lede if">{{ tr(character.youAreIf) }}</p>

    <dl class="facts">
      <div>
        <dt>{{ t('traits') }}</dt>
        <dd>{{ tr(character.traits) }}</dd>
      </div>
      <div>
        <dt>{{ t('underPressure') }}</dt>
        <dd>{{ tr(character.underPressure) }}</dd>
      </div>
      <div>
        <dt>{{ t('weakness') }}</dt>
        <dd>{{ tr(character.weakness) }}</dd>
      </div>
    </dl>

    <p v-if="statsLine" class="stats">{{ statsLine }}</p>

    <div class="actions">
      <button type="button" class="btn btn-primary" @click="share">
        {{ copied ? t('copied') : t('share') }}
      </button>
      <button type="button" class="btn btn-quiet" @click="retake">{{ t('retake') }}</button>
    </div>
  </article>
</template>

<style scoped>
.result {
  display: grid;
  gap: 0.5rem;
  text-align: center;
  animation: reveal 0.6s ease-out both;
}
.you-are {
  margin: 0;
  color: var(--limestone);
  font-size: 1.15rem;
}
.name {
  color: var(--brass);
  font-size: clamp(2.6rem, 12vw, 3.8rem);
}
.role {
  margin: 0;
  color: var(--limestone);
  opacity: 0.85;
}
.if {
  margin: 1.25rem auto 0.5rem;
}
.facts {
  margin: 1rem 0 0;
  text-align: start;
  display: grid;
  gap: 0;
  background: var(--limestone);
  color: var(--basalt);
  border-radius: 0.2rem;
  border-top: 0.45rem solid var(--basalt);
}
.facts > div {
  padding: 0.9rem 1.1rem;
}
.facts > div + div {
  border-top: 1px solid rgb(44 43 47 / 0.18);
}
.facts dt {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--walnut);
}
.facts dd {
  margin: 0.15rem 0 0;
  font-size: 1.08rem;
  line-height: 1.6;
}
.stats {
  margin: 1rem 0 0;
  color: var(--brass);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

@keyframes reveal {
  from { opacity: 0; transform: scale(0.97); }
}
@media (prefers-reduced-motion: reduce) {
  .result { animation: none; }
}
</style>
