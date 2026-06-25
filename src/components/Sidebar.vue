<template>
  <div class="navbar-wrapper">
    <!-- Main Navbar -->
    <header class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-inner">
        <!-- Center: Navigation only -->
        <nav class="desk-nav" aria-label="Main navigation">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            @click.prevent="navigateToSection(link.id)"
            :class="['nav-link', { active: activeSection === link.id }]"
          >
            {{ link.text }}
            <span class="nav-link__dot"></span>
          </a>
        </nav>

        <!-- Hamburger for mobile -->
        <button
          class="hamburger"
          :class="{ open: isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>

    <!-- Mobile Menu -->
    <transition name="mob-overlay">
      <div v-if="isMobileMenuOpen" class="mob-overlay" @click="toggleMobileMenu">
        <transition name="mob-panel">
          <div v-if="isMobileMenuOpen" class="mob-panel" @click.stop>
            <div class="mp-head">
              <span class="mp-logo-text">Menu</span>
              <button class="mp-close" @click="toggleMobileMenu" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <nav class="mp-nav" aria-label="Mobile navigation">
              <a
                v-for="(link, idx) in navLinks"
                :key="link.id"
                :href="`#${link.id}`"
                @click.prevent="navigateToSection(link.id)"
                :class="['mp-link', { active: activeSection === link.id }]"
                :style="{ '--i': idx }"
              >
                <span class="mpl-num">{{ String(idx + 1).padStart(2, '0') }}</span>
                <span class="mpl-text">{{ link.text }}</span>
              </a>
            </nav>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const navLinks = [
  { id: 'about',      text: 'About'      },
  { id: 'projects',   text: 'Projects'   },
  { id: 'skills',     text: 'Skills'     },
  { id: 'contact',    text: 'Contact'    },
]

const isScrolled        = ref(false)
const activeSection     = ref('')
const isMobileMenuOpen  = ref(false)

let scrollTicking = false

const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrollTicking = false
    isScrolled.value = window.scrollY > 60

    if (window.scrollY < 200) { activeSection.value = ''; return }

    const trigger = 180
    const sections = navLinks.map(l => document.getElementById(l.id))
    let current = ''
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i]
      if (!s) continue
      if (s.getBoundingClientRect().top <= trigger) { current = s.id; break }
    }
    activeSection.value = current
  })
}

const navigateToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
  activeSection.value = id
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) toggleMobileMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleEscape)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   CENTERED GLASS NAVBAR - Simplified Version
   ═══════════════════════════════════════════════════════ */

/* ── Wrapper ─────────────────────────────────────────── */
.navbar-wrapper {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
  margin-bottom: 5rem;
}

/* ── Main Navbar ─────────────────────────────────────── */
.navbar {
  pointer-events: all;
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: fit-content;
  margin: 0 auto;
}

/* Scrolled state - more solid glass effect */
.navbar.scrolled {
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(28px) saturate(1.6);
  -webkit-backdrop-filter: blur(28px) saturate(1.6);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.navbar-inner {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* ── Desktop Nav ─────────────────────────────────────── */
.desk-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  position: relative;
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
  border-radius: 999px;
  cursor: pointer;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
}

.nav-link.active {
  color: #ffffff;
  background: rgba(255, 85, 0, 0.15);
}

/* Active indicator — small orange dot below the link */
.nav-link__dot {
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ff5500;
  transform: translateX(-50%) scale(0);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 0 8px rgba(255, 85, 0, 0.4);
}

.nav-link.active .nav-link__dot {
  transform: translateX(-50%) scale(1);
}

/* ── Hamburger ───────────────────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hamburger:hover {
  border-color: rgba(255, 85, 0, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.hamburger span {
  display: block;
  width: 16px;
  height: 1.5px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background: #ff5500;
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

/* ── Mobile Overlay ──────────────────────────────────── */
.mob-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999;
}

.mob-overlay-enter-active,
.mob-overlay-leave-active { transition: opacity 0.3s ease; }
.mob-overlay-enter-from,
.mob-overlay-leave-to { opacity: 0; }

.mob-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(380px, 90vw);
  height: 100dvh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
}

.mob-panel-enter-active,
.mob-panel-leave-active { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.mob-panel-enter-from,
.mob-panel-leave-to { transform: translateX(100%); }

.mp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.mp-logo-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.mp-close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #8a929e;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mp-close:hover {
  border-color: #ff5500;
  color: #ff5500;
  transform: rotate(90deg);
}

.mp-nav {
  flex: 1;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mp-link {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  opacity: 0;
  transform: translateX(20px);
  animation: linkSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(0.1s + var(--i) * 0.05s);
  transition: background 0.3s ease;
  cursor: pointer;
}

@keyframes linkSlideIn {
  to { opacity: 1; transform: translateX(0); }
}

.mp-link:hover {
  background: rgba(255, 255, 255, 0.04);
}

.mp-link.active .mpl-text {
  color: #ff5500;
}

.mpl-num {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0.06em;
  min-width: 20px;
}

.mp-link.active .mpl-num {
  color: #ff5500;
}

.mpl-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
}

.mp-link:hover .mpl-text {
  color: #ffffff;
}

/* ── Animations ──────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* ── Responsive ──────────────────────────────────────── */
@media (min-width: 769px) {
  .hamburger { display: none; }
}

@media (max-width: 768px) {
  .navbar-wrapper {
    top: 12px;
    padding: 0 12px;
  }
  
  .navbar {
    border-radius: 20px;
    width: 100%;
    max-width: 100%;
  }
  
  .navbar-inner {
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
  }
  
  .desk-nav { display: none; }
  .hamburger { display: flex; }
}

@media (max-width: 480px) {
  .navbar-wrapper {
    top: 10px;
    padding: 0 10px;
  }
  
  .navbar {
    border-radius: 16px;
  }
  
  .navbar-inner {
    padding: 0.4rem 0.6rem;
  }
  
  .mob-panel {
    width: 100%;
    max-width: none;
  }
}
</style>