<template>
  <Transition name="loader-out">
    <div v-if="show" class="loader-overlay">
      <div class="loader-content">
        <!-- Simple bouncing dots in your brand colors -->
        <div class="dots-container">
          <span 
            v-for="(color, index) in dotColors" 
            :key="index"
            class="dot"
            :style="{ 
              '--dot-color': color,
              '--dot-delay': index * 0.15 + 's'
            }"
          ></span>
        </div>

        <!-- Name -->
        <div class="loader-name">
          <span class="name-dot" style="color: #ff5500">.</span>
        </div>

        <!-- Loading text -->
        <p class="loader-tagline">{{ statusText }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(true)
const statusText = ref('Loading')
const statusMessages = [
  'Loading',
  'Designing',
  'Coding',
  'Building',
  'Creating'
]

let messageIndex = 0

onMounted(() => {
  // Rotate through status messages
  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % statusMessages.length
    statusText.value = statusMessages[messageIndex]
  }, 600)

  // Hide loader after 2.5 seconds
  setTimeout(() => {
    show.value = false
    clearInterval(messageInterval)
  }, 2500)
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
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* ── Bouncing Dots ───────────────────────────────────── */
.dots-container {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  height: 40px;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--dot-color);
  animation: bounce 0.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  animation-delay: var(--dot-delay);
  box-shadow: 0 0 20px var(--dot-color);
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-24px) scale(1.1);
  }
  60% {
    transform: translateY(-20px) scale(0.95);
  }
}

/* ── Name ─────────────────────────────────────────────── */
.loader-name {
  display: flex;
  align-items: center;
  gap: 0.05rem;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.name-dot {
  font-size: clamp(2.2rem, 4.5vw, 3.3rem);
  font-weight: 900;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

/* ── Tagline ─────────────────────────────────────────── */
.loader-tagline {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
  min-height: 1.2em;
}

/* ── Exit transition ─────────────────────────────────── */
.loader-out-leave-active {
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.loader-out-leave-to {
  opacity: 0;
}

/* ── Reduced motion ──────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .dot {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .loader-name,
  .loader-tagline {
    animation-duration: 0.01ms !important;
    opacity: 1 !important;
  }
  
  .loader-out-leave-active {
    transition-duration: 0.01ms !important;
  }
}
</style>