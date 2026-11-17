<script setup lang="ts">
// One stone course per question; laid courses alternate basalt and limestone.
defineProps<{ total: number; done: number; label: string }>()
</script>

<template>
  <div class="ablaq" role="progressbar" :aria-valuemin="0" :aria-valuemax="total" :aria-valuenow="done" :aria-label="label">
    <span v-for="i in total" :key="i" class="stone" :class="{ laid: i <= done }" />
  </div>
</template>

<style scoped>
.ablaq {
  display: flex;
  gap: 3px;
}
.stone {
  flex: 1;
  height: 0.6rem;
  border-radius: 1px;
  background: rgb(235 226 207 / 0.14);
  transition: background-color 0.35s ease;
}
.stone.laid:nth-child(odd) { background: var(--limestone); }
.stone.laid:nth-child(even) { background: var(--brass); }
</style>
