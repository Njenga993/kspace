<template>
  <Transition name="loader-out">
    <div v-if="show" class="loader-overlay" role="status" aria-live="polite" aria-label="Loading portfolio">
      <!-- Two curtain halves that split open on exit -->
      <div class="panel panel--top" aria-hidden="true"></div>
      <div class="panel panel--bot" aria-hidden="true"></div>

      <!-- Corner HUD -->
      <div class="hud hud--tl" aria-hidden="true"><span class="hud-dot"></span>KSPACE / PORTFOLIO</div>
      <div class="hud hud--tr" aria-hidden="true">{{ clock }}</div>
      <div class="hud hud--bl" aria-hidden="true">NAIROBI, KE</div>
      <div class="hud hud--br" aria-hidden="true">v2026</div>

      <div class="loader-content">
        <!-- Bouncing dots in your brand colors, each landing on a floor line -->
        <div class="dots-container" aria-hidden="true">
          <span
            v-for="(color, index) in dotColors"
            :key="index"
            class="dot-wrap"
            :style="{ '--dot-color': color, '--dot-delay': index * 0.15 + 's' }"
          >
            <span class="dot"></span>
            <span class="dot-shadow"></span>
          </span>
        </div>

        <!-- The big brand period + live percentage -->
        <div class="loader-name">
          <span class="name-dot" style="color: #ff5500">.</span>
          <span class="pct" aria-hidden="true">
            <span class="pct-num">{{ pctText }}</span><span class="pct-sign">%</span>
          </span>
        </div>

        <!-- Status text: rolls like a slot reel -->
        <div class="loader-tagline">
          <Transition name="roll" mode="out-in">
            <p :key="statusText" class="tag-text">{{ statusText }}<span class="ellipsis" aria-hidden="true"></span></p>
          </Transition>
        </div>
      </div>

      <!-- Hairline progress along the bottom -->
      <div class="bar" aria-hidden="true"><span class="bar-fill" :style="{ transform: `scaleX(${progress})` }"></span></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const DURATION = 2500

const show = ref(true)
const statusText = ref('Loading')
const progress = ref(0)
const clock = ref('')
const statusMessages = [
  'Loading',
  'Designing',
  'Coding',
  'Building',
  'Creating'
]

const pctText = computed(() => String(Math.round(progress.value * 100)).padStart(3, '0'))

let messageIndex = 0
let messageInterval = null
let hideTimer = null
let clockTimer = null
let raf = 0

const updateClock = () => {
  try {
    clock.value = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Nairobi'
    }).format(new Date()) + ' EAT'
  } catch { clock.value = '' }
}

onMounted(() => {
  updateClock()
  clockTimer = setInterval(updateClock, 20000)

  // Rotate through status messages
  messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % statusMessages.length
    statusText.value = statusMessages[messageIndex]
  }, 600)

  // Eased 0 -> 100 counter that lands exactly as the loader hides
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / DURATION, 1)
    progress.value = 1 - Math.pow(1 - t, 2.2)
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)

  // Hide loader after 2.5 seconds
  hideTimer = setTimeout(() => {
    progress.value = 1
    show.value = false
    clearInterval(messageInterval)
  }, DURATION)
})

onUnmounted(() => {
  clearInterval(messageInterval)
  clearInterval(clockTimer)
  clearTimeout(hideTimer)
  cancelAnimationFrame(raf)
})

// Colors matching your hero section
const dotColors = [
  '#ff5500',  // Orange (Design)
  '#00d4ff',  // Blue (Code)
  '#ff6b6b',  // Pink/Red (Software)
  '#ff8c00',  // Amber (Impact)
  '#ff5500',  // Orange
  '#00d4ff',  // Blue
]
</script>

<style scoped>
.loader-overlay {
  --acc: #ff5500;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  box-sizing: border-box;
}
.loader-overlay *, .loader-overlay *::before, .loader-overlay *::after { box-sizing: border-box; }

/* ── Curtain panels ──────────────────────────────────── */
.panel {
  position: absolute;
  left: 0; right: 0;
  height: 50.5%;
  background: #0a0a0a;
  will-change: transform;
}
.panel--top { top: 0; background: radial-gradient(120% 140% at 50% 100%, #14100d 0%, #0a0a0a 60%); }
.panel--bot { bottom: 0; background: radial-gradient(120% 140% at 50% 0%, #14100d 0%, #0a0a0a 60%); }
.panel--top::after, .panel--bot::after {
  content: '';
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 85, 0, 0.5), transparent);
}
.panel--top::after { bottom: 0; }
.panel--bot::after { top: 0; }

/* ── HUD corners ─────────────────────────────────────── */
.hud {
  position: absolute;
  z-index: 2;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.32);
  display: flex; align-items: center; gap: 8px;
  opacity: 0;
  animation: hudIn 0.6s var(--ease) 0.2s forwards;
}
.hud--tl { top: 28px; left: 32px; }
.hud--tr { top: 28px; right: 32px; }
.hud--bl { bottom: 36px; left: 32px; }
.hud--br { bottom: 36px; right: 32px; }
.hud-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 10px var(--acc); animation: pulse 1.5s ease-in-out infinite; }
@keyframes hudIn { to { opacity: 1; } }

.loader-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
}

/* ── Bouncing Dots ───────────────────────────────────── */
.dots-container {
  display: flex;
  gap: 14px;
  align-items: flex-end;
  justify-content: center;
  height: 52px;
  position: relative;
}
.dot-wrap {
  position: relative;
  width: 16px;
  height: 100%;
  display: block;
}
.dot {
  position: absolute;
  left: 0; bottom: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--dot-color);
  animation: bounce 0.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  animation-delay: var(--dot-delay);
  box-shadow: 0 0 20px var(--dot-color);
}
.dot-shadow {
  position: absolute;
  left: 1px; bottom: 0;
  width: 14px; height: 4px;
  border-radius: 50%;
  background: var(--dot-color);
  filter: blur(3px);
  opacity: 0.35;
  animation: shadow 0.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  animation-delay: var(--dot-delay);
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) scale(1, 1); }
  8%       { transform: translateY(0) scale(1.25, 0.75); }
  50%      { transform: translateY(-24px) scale(1.1); }
  60%      { transform: translateY(-20px) scale(0.95); }
}
@keyframes shadow {
  0%, 100% { transform: scaleX(1); opacity: 0.4; }
  50%      { transform: scaleX(0.5); opacity: 0.12; }
}

/* ── Name + percentage ───────────────────────────────── */
.loader-name {
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 0.7;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  opacity: 0;
  transform: translateY(16px);
  animation: fadeInUp 0.6s var(--ease) 0.3s forwards;
}
.name-dot {
  display: block;
  font-size: clamp(9rem, 28vw, 17rem);
  font-weight: 900;
  line-height: 0.6;
  text-shadow: 0 0 60px rgba(255, 85, 0, 0.45);
  transform-origin: 50% 85%;
  animation: pulse 1.5s ease-in-out infinite;
}
.pct {
  display: flex; align-items: baseline;
  font-family: var(--mono);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  line-height: 1;
  position: absolute;
  left: calc(100% + 0.9rem);
  bottom: 0;
  padding-bottom: 6px;
  font-variant-numeric: tabular-nums;
}
.pct-sign { color: var(--acc); margin-left: 2px; font-size: 0.7em; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.6; transform: scale(0.9); }
}

/* ── Tagline (slot-roll) ─────────────────────────────── */
.loader-tagline {
  height: 1.5em;
  overflow: hidden;
  font-size: 0.85rem;
  min-width: 12ch;
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.6s var(--ease) 0.5s forwards;
}
.tag-text {
  margin: 0;
  line-height: 1.5em;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.ellipsis::after {
  content: '';
  display: inline-block;
  width: 1.4em;
  text-align: left;
  animation: dots 1.2s steps(4, end) infinite;
}
@keyframes dots {
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
}
.roll-enter-active, .roll-leave-active { transition: transform 0.32s var(--ease), opacity 0.32s var(--ease); }
.roll-enter-from { transform: translateY(100%); opacity: 0; }
.roll-leave-to   { transform: translateY(-100%); opacity: 0; }

/* ── Progress hairline ───────────────────────────────── */
.bar {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 3px;
  z-index: 4;
  background: rgba(255, 255, 255, 0.05);
}
.bar-fill {
  display: block;
  width: 100%; height: 100%;
  transform-origin: 0 50%;
  background: linear-gradient(90deg, #ff5500, #ff8c00 60%, #00d4ff);
  box-shadow: 0 0 14px rgba(255, 85, 0, 0.7);
}

/* ── Exit transition: curtains split open ────────────── */
/* step-end keeps the root alive until the curtain animation completes */
.loader-out-leave-active { transition: opacity 0.9s step-end; }
.loader-out-leave-to { opacity: 0; }
.loader-out-leave-active .panel { transition: transform 0.85s var(--ease) 0.1s; }
.loader-out-leave-to .panel--top { transform: translateY(-101%); }
.loader-out-leave-to .panel--bot { transform: translateY(101%); }
.loader-out-leave-active .loader-content,
.loader-out-leave-active .hud,
.loader-out-leave-active .bar { transition: opacity 0.3s ease, transform 0.5s var(--ease); }
.loader-out-leave-to .loader-content { opacity: 0; transform: scale(1.08); }
.loader-out-leave-to .hud,
.loader-out-leave-to .bar { opacity: 0; }

/* ── Small screens ───────────────────────────────────── */
@media (max-width: 480px) {
  .hud { font-size: 0.6rem; letter-spacing: 0.12em; }
  .hud--tl { top: 20px; left: 18px; }
  .hud--tr { top: 20px; right: 18px; }
  .hud--bl { bottom: 26px; left: 18px; }
  .hud--br { bottom: 26px; right: 18px; }
  .dots-container { gap: 11px; }
}

/* ── Reduced motion ──────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .dot, .dot-shadow, .name-dot, .hud-dot, .ellipsis::after {
    animation: none !important;
  }
  .dot { opacity: 1 !important; transform: none !important; }

  .loader-name, .loader-tagline, .hud {
    animation-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .roll-enter-active, .roll-leave-active { transition-duration: 0.01ms !important; }
  .loader-out-leave-active, .loader-out-leave-active * { transition-duration: 0.01ms !important; transition-delay: 0s !important; }
}
</style>