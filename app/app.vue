<script setup lang="ts">
const { lang, t, toggle } = useLang()

useHead({
  htmlAttrs: { lang, dir: computed(() => (lang.value === 'ar' ? 'rtl' : 'ltr')) },
})
</script>

<template>
  <NuxtPwaManifest />
  <div class="shell">
    <header class="topbar">
      <button type="button" class="lang" :lang="lang === 'ar' ? 'en' : 'ar'" @click="toggle">
        {{ t('langSwitch') }}
      </button>
    </header>
    <main class="page">
      <NuxtPage />
    </main>
  </div>
</template>
