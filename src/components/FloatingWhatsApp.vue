<!-- src/components/FloatingWhatsApp.vue -->
<template>
  <Transition name="wa-float">
    <a
      v-if="visible"
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="wa-btn"
      aria-label="Chat on WhatsApp"
    >
      <span class="wa-pulse"></span>
      <i class="fab fa-whatsapp"></i>
      <span class="wa-tooltip">Chat with me</span>
    </a>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

/* ── Replace with your actual WhatsApp number (no +, no spaces) ── */
const phoneNumber = '254792533935'

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  "Hi Kelvin, I came across your portfolio and I'd like to discuss a project."
)}`

/* Show after a short delay so it doesn't compete with page load */
onMounted(() => {
  setTimeout(() => { visible.value = true }, 2500)
})
</script>

<style scoped>
.wa-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1500;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25D366;
  border-radius: 50%;
  color: #fff;
  font-size: 1.65rem;
  text-decoration: none;
  box-shadow:
    0 4px 14px rgba(37, 211, 102, 0.4),
    0 0 0 0 rgba(37, 211, 102, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  animation: wa-ring 2.5s ease-out infinite;
}

.wa-btn:hover {
  transform: scale(1.1);
  box-shadow:
    0 6px 20px rgba(37, 211, 102, 0.5),
    0 0 0 0 rgba(37, 211, 102, 0);
  animation: none;
}

/* Pulse ring behind the button */
.wa-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.25);
  animation: wa-pulse-ring 2s ease-out infinite;
  pointer-events: none;
}

/* Tooltip on hover */
.wa-tooltip {
  position: absolute;
  right: calc(100% + 0.75rem);
  top: 50%;
  transform: translateY(-50%) translateX(8px);
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f2f5;
  font-family: 'Inter', sans-serif;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 0.6rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
}

.wa-btn:hover .wa-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* Entrance */
.wa-float-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.wa-float-enter-from {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}

/* Ring animation — the expanding border effect */
@keyframes wa-ring {
  0%   { box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0.35); }
  70%  { box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4), 0 0 0 14px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4), 0 0 0 0 rgba(37, 211, 102, 0); }
}

/* Inner pulse glow */
@keyframes wa-pulse-ring {
  0%   { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Responsive — nudge up on mobile so it doesn't clash with browser UI */
@media (max-width: 640px) {
  .wa-btn {
    bottom: 1.4rem;
    right: 1.2rem;
    width: 50px;
    height: 50px;
    font-size: 1.45rem;
  }
  .wa-tooltip { display: none; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .wa-btn { animation: none !important; }
  .wa-pulse { animation: none !important; display: none; }
  .wa-float-enter-active { transition-duration: 0.01ms !important; }
}
</style>