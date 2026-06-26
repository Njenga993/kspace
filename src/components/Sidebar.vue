<template>
  <div class="navbar-wrapper" :style="{ top: wrapperOffset + 'px' }">

    <!-- Notification Bar -->
    <transition name="notif-slide">
      <div v-if="showNotification" class="notification-bar">
        <div class="notif-inner">
          <div class="notif-left">
            <span class="notif-dot"></span>
            <span class="notif-text">
              <strong>OPEN TO OPPORTUNITIES</strong> — Available for freelance projects & full-time roles
            </span>
          </div>
          <div class="notif-right">
            <a href="#contact" @click.prevent="navigateToSection('contact')" class="notif-cta">
              START COLLABORATION
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" fill="none"/>
              </svg>
            </a>
            <button @click="dismissNotification" class="notif-close" aria-label="Dismiss">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" stroke-width="1.5"/>
                <line x1="12" y1="4" x2="4" y2="12" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Main Navbar -->
    <header class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-inner">

        <!-- Left: Logo -->
        <div class="logo-block" @click="scrollToTop">
          <div class="logo-mark">
            <img src="/profile.JPG" alt="Kelvin Kamau" class="logo-photo" />
            <span class="logo-status"></span>
          </div>
          <div class="logo-text">
            <span class="logo-name">Kelvin Kamau</span>
            <span class="logo-role">Full‑Stack Engineer</span>
          </div>
        </div>

        <!-- Center: Navigation -->
        <nav class="desk-nav" aria-label="Main navigation">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            @click.prevent="navigateToSection(link.id)"
            :class="['nav-pill', { active: activeSection === link.id }]"
          >
            <i :class="link.icon"></i>
            {{ link.text }}
          </a>
        </nav>

        <!-- Right: Actions -->
        <div class="nav-end">
          <a
            href="#contact"
            class="cta-pill"
            @click.prevent="navigateToSection('contact')"
          >
            Let's Talk
            <svg class="cta-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>

          <button
            class="hamburger"
            :class="{ open: isMobileMenuOpen }"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
            aria-expanded="isMobileMenuOpen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </header>

    <!-- Mobile Menu Overlay & Panel -->
    <transition name="mob-overlay">
      <div v-if="isMobileMenuOpen" class="mob-overlay" @click="toggleMobileMenu">
        <transition name="mob-panel">
          <div v-if="isMobileMenuOpen" class="mob-panel" @click.stop>

            <div class="mp-head">
              <div class="mp-logo">
                <img src="/profile.JPG" alt="Kelvin Kamau" class="mp-photo" />
                <div>
                  <div class="mp-name">Kelvin Kamau</div>
                  <div class="mp-role">Full‑Stack Engineer</div>
                </div>
              </div>
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
                <i :class="link.icon" class="mpl-icon"></i>
                <span class="mpl-text">{{ link.text }}</span>
                <i class="fas fa-arrow-right mpl-arrow"></i>
              </a>
            </nav>

            <div class="mp-foot">
              <div class="mp-socials">
                <a href="https://github.com/Njenga993" target="_blank" rel="noopener" class="mp-social" aria-label="GitHub">
                  <i class="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" class="mp-social" aria-label="LinkedIn">
                  <i class="fab fa-linkedin-in"></i>
                </a>
                <a href="mailto:kamaukelvin077@gmail.com" class="mp-social" aria-label="Email">
                  <i class="fas fa-envelope"></i>
                </a>
              </div>
              <a href="#contact" class="mp-cta" @click.prevent="navigateToSection('contact')">
                Let's Talk
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>

          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'

const navLinks = [
  { id: 'about',      text: 'About',      icon: 'fas fa-user'       },
  { id: 'skills',     text: 'Skills',     icon: 'fas fa-bolt'       },
  { id: 'experience', text: 'Experience', icon: 'fas fa-briefcase'  },
  { id: 'projects',   text: 'Projects',   icon: 'fas fa-code'       },
  { id: 'contact',    text: 'Contact',    icon: 'fas fa-link'       },
]

const isScrolled        = ref(false)
const activeSection     = ref('')
const isMobileMenuOpen  = ref(false)
const showNotification  = ref(false)
const wrapperOffset     = ref(0)

let scrollTicking = false
let autoDismissTimer = null

/* ── Notification ────────────────────────────────────────── */
const NOTIF_KEY = 'kk-notif-dismissed'

onMounted(() => {
  try {
    if (localStorage.getItem(NOTIF_KEY) !== 'true') {
      setTimeout(() => { showNotification.value = true }, 2600)
    }
  } catch {
    setTimeout(() => { showNotification.value = true }, 2600)
  }
})

watch(showNotification, (show) => {
  const notifEl = document.querySelector('.notification-bar')
  wrapperOffset.value = (show && notifEl) ? notifEl.offsetHeight : 0

  if (show) {
    autoDismissTimer = setTimeout(() => {
      showNotification.value = false
      try { localStorage.setItem(NOTIF_KEY, 'true') } catch {}
    }, 12000)
  } else {
    if (autoDismissTimer) clearTimeout(autoDismissTimer)
  }
})

const dismissNotification = () => {
  showNotification.value = false
  try { localStorage.setItem(NOTIF_KEY, 'true') } catch {}
  if (autoDismissTimer) clearTimeout(autoDismissTimer)
}

/* ── Scroll Handling ─────────────────────────────────────── */
const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true

  requestAnimationFrame(() => {
    scrollTicking = false
    isScrolled.value = window.scrollY > 60

    if (window.scrollY < 200) {
      activeSection.value = ''
      return
    }

    const trigger = 180
    const sections = navLinks.map(l => document.getElementById(l.id))
    let current = ''
    for (let i = sections.length - 1; i >= 0; i--) {
      const s = sections[i]
      if (!s) continue
      if (s.getBoundingClientRect().top <= trigger) {
        current = s.id
        break
      }
    }
    activeSection.value = current
  })
}

/* ── Navigation ──────────────────────────────────────────── */
const navigateToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 90
    window.scrollTo({ top, behavior: 'smooth' })
  }
  activeSection.value = id
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  activeSection.value = ''
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

/* ── Keyboard ────────────────────────────────────────────── */
const handleEscape = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    toggleMobileMenu()
  }
}

/* ── Lifecycle ───────────────────────────────────────────── */
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleEscape)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  if (autoDismissTimer) clearTimeout(autoDismissTimer)
})
</script>

<style scoped>
/* ─── Design Tokens ──────────────────────────────────────── */
:root {
  --bg: #081426;
  --bg-deep: #050e1a;
  --accent: #ff6b00;
  --accent-glow: rgba(255, 107, 0, 0.25);
  --accent-soft: rgba(255, 107, 0, 0.08);
  --white: #ffffff;
  --silver: #c8cdd5;
  --muted: #8a94a6;
  --dim: #4a5568;
  --border: rgba(255, 255, 255, 0.06);
  --border-light: rgba(255, 255, 255, 0.12);
  --green: #2ecc71;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Wrapper ────────────────────────────────────────────── */
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: top 0.45s var(--ease);
}

/* ─── Notification Bar ───────────────────────────────────── */
.notification-bar {
  background: var(--bg-deep);
  border-bottom: 1px solid rgba(255, 107, 0, 0.15);
}

.notif-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.6rem 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.notif-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.notif-dot {
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.notif-text {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.03em;
}

.notif-text strong {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.notif-right {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.notif-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border: 1px solid rgba(255, 107, 0, 0.3);
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.08em;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.notif-cta:hover {
  background: var(--accent-soft);
  border-color: rgba(255, 107, 0, 0.5);
}

.notif-cta svg {
  transition: transform 0.3s var(--ease);
}

.notif-cta:hover svg {
  transform: translateX(4px);
}

.notif-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--dim);
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

.notif-close:hover {
  color: var(--accent);
  transform: rotate(90deg);
}

.notif-slide-enter-active,
.notif-slide-leave-active {
  transition: all 0.4s var(--ease);
}

.notif-slide-enter-from,
.notif-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* ─── Main Navbar ────────────────────────────────────────── */
.navbar {
  /* TRANSPARENT INITIALLY as requested */
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background 0.5s var(--ease),
    border-bottom-color 0.5s var(--ease),
    backdrop-filter 0.5s var(--ease),
    box-shadow 0.5s var(--ease);
  will-change: background, backdrop-filter;
}

/* SCROLLED: Glassmorphism blur effect as requested */
.navbar.scrolled {
  background: rgba(8, 20, 38, 0.85);
  border-bottom-color: var(--border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
}

.navbar-inner {
  max-width: 1440px;
  margin: 0 auto;
  /* 90px HEIGHT as requested */
  height: 90px;
  padding: 0 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.5rem;
}

/* ─── Logo ───────────────────────────────────────────────── */
.logo-block {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.logo-block:hover {
  opacity: 0.85;
}

.logo-mark {
  position: relative;
  flex-shrink: 0;
}

.logo-photo {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
  border: 2px solid rgba(255, 107, 0, 0.3);
  filter: grayscale(15%);
  transition: filter 0.4s ease, border-color 0.4s ease, transform 0.4s var(--ease);
}

.logo-block:hover .logo-photo {
  filter: grayscale(0%);
  border-color: var(--accent);
  transform: scale(1.05);
}

.logo-status {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 11px;
  height: 11px;
  background: var(--green);
  border-radius: 50%;
  border: 2.5px solid var(--bg);
  animation: pulse 2s infinite;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.logo-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.01em;
  line-height: 1;
}

.logo-role {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.05em;
}

/* ─── Desktop Nav (Awwwards minimal spacing) ─────────────── */
.desk-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.nav-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition:
    color 0.35s ease,
    background 0.35s ease,
    transform 0.35s var(--ease);
}

.nav-pill i {
  font-size: 0.78rem;
  transition: color 0.35s ease;
}

.nav-pill:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.nav-pill.active {
  color: var(--accent);
  background: var(--accent-soft);
}

.nav-pill.active i {
  color: var(--accent);
}

/* ─── Nav End ────────────────────────────────────────────── */
.nav-end {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;
}

/* WHITE PILL CTA as requested */
.cta-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.8rem;
  background: var(--white);
  color: var(--bg);
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.4s var(--ease),
    box-shadow 0.4s var(--ease);
}

/* HOVER: translateY(-3px) as requested */
.cta-pill:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
}

.cta-arrow {
  transition: transform 0.4s var(--ease);
}

.cta-pill:hover .cta-arrow {
  transform: translateX(4px);
}

/* ─── Hamburger (hidden on desktop) ──────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 48px;
  height: 48px;
  padding: 14px;
  background: none;
  border: 1px solid var(--border-light);
  border-radius: 14px;
  cursor: pointer;
  transition: border-color 0.35s ease;
  flex-shrink: 0;
}

.hamburger:hover {
  border-color: rgba(255, 107, 0, 0.3);
}

.hamburger span {
  display: block;
  width: 20px;
  height: 1.5px;
  background: var(--white);
  border-radius: 2px;
  transition: all 0.4s var(--ease);
  transform-origin: center;
}

.hamburger.open {
  border-color: rgba(255, 107, 0, 0.4);
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background: var(--accent);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  background: var(--accent);
}

/* ─── Mobile Overlay ─────────────────────────────────────── */
.mob-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 999;
}

.mob-overlay-enter-active,
.mob-overlay-leave-active {
  transition: opacity 0.4s ease;
}

.mob-overlay-enter-from,
.mob-overlay-leave-to {
  opacity: 0;
}

/* ─── Mobile Panel (Full slide from right) ───────────────── */
.mob-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(440px, 90vw);
  height: 100%;
  height: 100dvh;
  background: rgba(8, 20, 38, 0.98);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mob-panel-enter-active,
.mob-panel-leave-active {
  transition: transform 0.55s var(--ease);
}

.mob-panel-enter-from,
.mob-panel-leave-to {
  transform: translateX(100%);
}

/* ─── Mobile Panel: Head ─────────────────────────────────── */
.mp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.mp-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mp-photo {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  border: 2px solid rgba(255, 107, 0, 0.3);
}

.mp-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.02em;
}

.mp-role {
  font-size: 0.68rem;
  color: var(--muted);
  margin-top: 0.2rem;
  letter-spacing: 0.04em;
}

.mp-close {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.35s ease;
}

.mp-close:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: rotate(90deg);
}

/* ─── Mobile Panel: Navigation ───────────────────────────── */
.mp-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 107, 0, 0.15) transparent;
}

.mp-nav::-webkit-scrollbar {
  width: 3px;
}

.mp-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 0, 0.15);
  border-radius: 4px;
}

/* Staggered smooth animation */
.mp-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  border-radius: 16px;
  text-decoration: none;
  transition: background 0.35s ease, transform 0.35s ease;
  /* Start invisible, animate in with stagger */
  opacity: 0;
  transform: translateX(30px);
  animation: linkSlideIn 0.5s var(--ease) forwards;
  animation-delay: calc(0.15s + var(--i) * 0.06s);
}

@keyframes linkSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.mp-link:hover {
  background: rgba(255, 255, 255, 0.04);
  transform: translateX(4px);
}

.mp-link.active {
  background: var(--accent-soft);
}

.mpl-num {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--dim);
  letter-spacing: 0.06em;
  font-variant-numeric: tabular-nums;
  min-width: 22px;
  transition: color 0.35s ease;
}

.mp-link.active .mpl-num {
  color: var(--accent);
}

.mpl-icon {
  font-size: 0.85rem;
  color: var(--accent);
  width: 16px;
  text-align: center;
  transition: transform 0.35s var(--ease);
}

.mp-link:hover .mpl-icon {
  transform: scale(1.15);
}

.mpl-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--silver);
  flex: 1;
  letter-spacing: 0.02em;
  transition: color 0.35s ease;
}

.mp-link:hover .mpl-text,
.mp-link.active .mpl-text {
  color: var(--white);
}

.mpl-arrow {
  font-size: 0.65rem;
  color: var(--dim);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.35s var(--ease);
}

.mp-link:hover .mpl-arrow,
.mp-link.active .mpl-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

/* ─── Mobile Panel: Footer ───────────────────────────────── */
.mp-foot {
  padding: 1.75rem 2rem 2.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* Delayed fade in */
  opacity: 0;
  animation: footerFade 0.5s ease forwards;
  animation-delay: 0.5s;
}

@keyframes footerFade {
  to { opacity: 1; }
}

.mp-socials {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.mp-social {
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
  border-radius: 14px;
  color: var(--muted);
  font-size: 1rem;
  text-decoration: none;
  transition:
    border-color 0.35s ease,
    color 0.35s ease,
    background 0.35s ease,
    transform 0.35s var(--ease);
}

.mp-social:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-3px);
}

/* Mobile CTA: matching white pill style */
.mp-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  width: 100%;
  padding: 1.1rem 2rem;
  background: var(--white);
  color: var(--bg);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 999px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.4s var(--ease),
    box-shadow 0.4s var(--ease);
}

.mp-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 45px rgba(0, 0, 0, 0.5);
}

.mp-cta svg {
  transition: transform 0.4s var(--ease);
}

.mp-cta:hover svg {
  transform: translateX(4px);
}

/* ─── Pulse Animation ────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE — Mobile First
   ═══════════════════════════════════════════════════════════ */

/* Tablet and up: Show desktop nav + CTA */
@media (min-width: 900px) {
  .desk-nav {
    display: flex;
  }

  .cta-pill {
    display: inline-flex;
  }

  .hamburger {
    display: none;
  }
}

/* Below 900px: Show hamburger, hide desktop nav + CTA */
@media (max-width: 899px) {
  .desk-nav {
    display: none;
  }

  .cta-pill {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .navbar-inner {
    padding: 0 2rem;
    gap: 1.5rem;
  }
}

/* Small mobile refinements */
@media (max-width: 640px) {
  .navbar-inner {
    padding: 0 1.25rem;
  }

  .logo-text {
    display: none;
  }

  .notif-inner {
    padding: 0.6rem 1.25rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .notif-right {
    width: 100%;
    justify-content: space-between;
  }

  .mob-panel {
    width: 100%;
    max-width: none;
  }
}

/* Ultra small */
@media (max-width: 380px) {
  .navbar-inner {
    padding: 0 1rem;
  }

  .logo-photo {
    width: 38px;
    height: 38px;
  }

  .hamburger {
    width: 42px;
    height: 42px;
    padding: 12px;
  }
}
</style>