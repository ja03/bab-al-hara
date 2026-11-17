<script setup lang="ts">
// The neighborhood gate: an ablaq-striped arch over two studded wooden leaves.
// `open` swings the leaves inward to reveal the lantern-lit alley behind.
defineProps<{ open?: boolean; sign: string }>()
</script>

<template>
  <div class="gate" :class="{ open }" aria-hidden="true">
    <div class="arch">
      <span class="sign">{{ sign }}</span>
    </div>
    <div class="doorway">
      <div class="alley" />
      <div class="leaf leaf-l"><span class="knocker" /></div>
      <div class="leaf leaf-r"><span class="knocker" /></div>
    </div>
  </div>
</template>

<style scoped>
.gate {
  direction: ltr;
  width: min(100%, 17rem);
  margin-inline: auto;
}

/* Alternating basalt and limestone courses, the Damascene ablaq. */
.arch {
  position: relative;
  height: 4.75rem;
  border-radius: 9rem 9rem 0 0;
  background: repeating-linear-gradient(
    180deg,
    var(--limestone) 0 0.6rem,
    var(--basalt) 0.6rem 1.2rem
  );
  display: grid;
  place-items: end center;
  padding-bottom: 0.55rem;
}

.sign {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1;
  padding: 0.3rem 0.9rem 0.45rem;
  color: var(--brass);
  background: var(--walnut-dark);
  border: 2px solid var(--brass);
  border-radius: 0.2rem;
}

.doorway {
  position: relative;
  height: 15rem;
  display: flex;
  perspective: 900px;
  background: var(--basalt);
  border: 0.55rem solid var(--limestone);
  border-top: 0;
  overflow: hidden;
}

.alley {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, rgb(255 214 138 / 0.95) 0 6%, rgb(217 164 65 / 0.55) 16%, transparent 52%),
    linear-gradient(180deg, var(--ink) 0%, #2c2a36 100%);
}

.leaf {
  position: relative;
  flex: 1;
  /* Vertical planks with studs on every crossbeam. */
  background:
    radial-gradient(circle, var(--brass) 0 2.5px, transparent 3px) 0.55rem 0.9rem / 1.35rem 2.6rem,
    repeating-linear-gradient(90deg, var(--walnut) 0 1.3rem, var(--walnut-dark) 1.3rem 1.42rem);
  transition: transform 1.1s cubic-bezier(0.6, 0.05, 0.25, 1);
  box-shadow: inset 0 0 0 3px var(--walnut-dark);
}

.leaf-l { transform-origin: left center; }
.leaf-r { transform-origin: right center; }

.knocker {
  position: absolute;
  top: 52%;
  width: 0.95rem;
  height: 0.95rem;
  border: 2.5px solid var(--brass);
  border-radius: 50%;
}
.leaf-l .knocker { right: 0.6rem; }
.leaf-r .knocker { left: 0.6rem; }

.open .leaf-l { transform: rotateY(-105deg); }
.open .leaf-r { transform: rotateY(105deg); }

@media (prefers-reduced-motion: reduce) {
  .leaf { transition: none; }
}
</style>
