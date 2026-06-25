<template>
  <Transition name="btt">
    <button
      v-show="showButton"
      class="back-to-top"
      @click="scrollToTop"
      aria-label="Back to top"
    >
      <!-- Progress ring -->
      <svg class="btt-ring" viewBox="0 0 36 36">
        <circle
          class="btt-track"
          cx="18" cy="18" r="15.5"
          fill="none" stroke-width="2.5"
        />
        <circle
          class="btt-fill"
          cx="18" cy="18" r="15.5"
          fill="none" stroke-width="2.5"
          :style="{ strokeDashoffset: dashOffset }"
        />
      </svg>
      <!-- Arrow -->
      <i class="btt-arrow"></i>
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const showButton = ref(false)
const scrollPercent = ref(0)

/* circumference of r=15.5 circle */
const circumference = 2 * Math.PI * 15.5

const dashOffset = computed(() => {
  /* 100% scrolled = offset 0 (full ring), 0% scrolled = offset = circumference (empty ring) */
  return circumference - (scrollPercent.value / 100) * circumference
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  showButton.value = scrollY > 300
  scrollPercent.value = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 6.5rem;          /* clears WhatsApp (2rem bottom + 56px height + ~16px gap) */
  right: 2rem;             /* aligned with WhatsApp button */
  z-index: 1499;           /* just below WhatsApp's 1500 */
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #161b22;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.back-to-top:hover {
  background: #1c2333;
  border-color: rgba(201, 162, 59, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.back-to-top:active {
  transform: translateY(0) scale(0.95);
}

/* ── SVG ring ──────────────────────────────────────── */
.btt-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.btt-track {
  stroke: rgba(255, 255, 255, 0.06);
}

.btt-fill {
  stroke: #c9a23b;
  stroke-linecap: round;
  stroke-dasharray: 98.96;  /* 2π × 15.5 */
  stroke-dashoffset: 98.96;
  transition: stroke-dashoffset 0.15s linear;
}

/* ── Arrow ────────────────────────────────────────── */
.btt-arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid #b0b8c1;
  border-top: 2px solid #b0b8c1;
  transform: rotate(45deg);
  margin-top: 3px;
  transition: border-color 0.2s;
}

.back-to-top:hover .btt-arrow {
  border-color: #c9a23b;
}

/* ── Entrance / exit ──────────────────────────────── */
.btt-enter-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.btt-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease;
}
.btt-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.85);
}
.btt-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.85);
}

/* ── Mobile ───────────────────────────────────────── */
@media (max-width: 640px) {
  .back-to-top {
    bottom: 5.5rem;      /* WhatsApp is 1.4rem bottom + 50px + gap */
    right: 1.2rem;       /* matches WhatsApp mobile position */
    width: 40px;
    height: 40px;
  }

  .btt-arrow {
    width: 9px;
    height: 9px;
    border-width: 1.5px;
    margin-top: 3px;
  }
}

/* ── Reduced motion ───────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .btt-enter-active,
  .btt-leave-active {
    transition-duration: 0.01ms !important;
  }
  .btt-fill {
    transition: none !important;
  }
}
</style>