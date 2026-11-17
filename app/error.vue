<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { lang, t } = useLang()

useHead({ htmlAttrs: { lang, dir: computed(() => (lang.value === 'ar' ? 'rtl' : 'ltr')) } })
</script>

<template>
  <main class="page error">
    <h1 class="display">{{ props.error.statusCode === 404 ? t('notFound') : props.error.statusMessage }}</h1>
    <button type="button" class="btn btn-primary" @click="clearError({ redirect: '/' })">{{ t('home') }}</button>
  </main>
</template>

<style scoped>
.error {
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  text-align: center;
  padding-top: 4rem;
}
</style>
