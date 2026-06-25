<template>
  <div class="hero-wrapper">
    <!-- Navbar -->
    <div class="navbar-wrapper">
      <header class="navbar" :class="{ scrolled: isScrolled }">
        <div class="navbar-inner">
          <!-- Desktop Navigation -->
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

          <!-- Mobile: Menu Button -->
          <button
            class="menu-btn"
            :class="{ active: isMobileMenuOpen }"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <span class="menu-btn-line"></span>
            <span class="menu-btn-line"></span>
            <span class="menu-btn-line"></span>
          </button>
        </div>
      </header>

      <!-- Mobile Dropdown Menu -->
      <transition name="dropdown">
        <div v-if="isMobileMenuOpen" class="mobile-dropdown" @click.stop>
          <nav class="dropdown-nav">
            <a
              v-for="(link, idx) in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              @click.prevent="navigateToSection(link.id)"
              :class="['dropdown-link', { active: activeSection === link.id }]"
              :style="{ '--i': idx }"
            >
              <span class="dropdown-link-num">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="dropdown-link-text">{{ link.text }}</span>
              <span class="dropdown-link-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </nav>

          <div class="dropdown-footer">
            <div class="dropdown-socials">
              <a href="https://github.com/Njenga993" target="_blank" rel="noopener" class="dropdown-social" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" class="dropdown-social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:kamaukelvin077@gmail.com" class="dropdown-social" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
            <a href="#contact" class="dropdown-cta" @click.prevent="navigateToSection('contact')">
              Get in touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </transition>
    </div>

    <!-- Hero Section - Full Bleed -->
    <section class="hero" ref="heroRef">
      <!-- Full-bleed background -->
      <div class="hero__bg" aria-hidden="true">
        <img
          src="/kay.jpg"
          alt=""
          class="hero__bg-img"
          draggable="false"
        />
        <div class="hero__bg-grad"></div>
        <div class="hero__bg-bottom"></div>
      </div>

      <!-- Main Content -->
      <div class="hero__content anim" style="--d: 0.1s">
        <span class="hero__eyebrow anim" style="--d: 0.2s">👋 Hey, I'm Kelvin</span>

        <h1 class="hero__heading">
          <span class="hero__line anim-slide" style="--d: 0.3s">
            I <span class="highlight-text">Design</span>
          </span>
          <span class="hero__line anim-slide" style="--d: 0.42s">
            & <span class="highlight-text-alt">Code</span>
          </span>
          <span class="hero__line anim-slide" style="--d: 0.54s">
            Scalable <span class="highlight-text-glow">Software</span>
          </span>
          <span class="hero__line hero__line--impact anim-slide" style="--d: 0.66s">
            That <span class="highlight-impact">Impacts</span> Millions
          </span>
        </h1>

        <div class="hero__caption anim" style="--d: 0.8s">
          <p class="hero__caption-text">
            Full Stack Developer &amp; problem solver crafting digital solutions 
            that <span class="caption-highlight">scale globally</span> and create 
            <span class="caption-highlight-alt">real-world impact</span>.
          </p>
          <a href="#contact" class="hero__cta" @click.prevent="navigateToSection('contact')">
            Let's build something
            <span class="hero__cta-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      <!-- Bottom Feature Strip -->
      <div class="hero__strip">
        <p class="hero__strip-label">Core focus areas</p>
        <div class="hero__strip-items">
          <div
            v-for="(feat, i) in features"
            :key="i"
            class="hero__feat anim"
            :style="{ '--d': 0.75 + i * 0.08 + 's' }"
          >
            <span class="hero__feat-num">#{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="hero__feat-label">{{ feat }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const navLinks = [
  { id: 'about',      text: 'About',      icon: 'fas fa-user'       },
  { id: 'skills',     text: 'Skills',     icon: 'fas fa-bolt'       },
  { id: 'experience', text: 'Experience', icon: 'fas fa-briefcase'  },
  { id: 'projects',   text: 'Projects',   icon: 'fas fa-code'       },
  { id: 'contact',    text: 'Contact',    icon: 'fas fa-link'       },
]

const features = [
  'Full Stack Development',
  'SaaS Products',
  'System Architecture',
  'Startup Solutions',
]

const isScrolled = ref(false)
const activeSection = ref('')
const isMobileMenuOpen = ref(false)
const heroRef = ref(null)

let scrollTicking = false
let rafId = null

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

const handleParallax = () => {
  if (!heroRef.value) return
  const img = heroRef.value.querySelector('.hero__bg-img')
  if (!img) return
  const scrollY = window.scrollY
  const vh = window.innerHeight
  if (scrollY < vh * 1.2) {
    const offset = scrollY * 0.25
    img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`
  }
  rafId = requestAnimationFrame(handleParallax)
}

onMounted(() => {
  requestAnimationFrame(() => {
    heroRef.value?.classList.add('is-loaded')
  })
  
  window.addEventListener('scroll', handleParallax, { passive: true })
  const img = heroRef.value?.querySelector('.hero__bg-img')
  if (img) img.style.transform = 'translate3d(0, 0, 0) scale(1.08)'
  handleParallax()
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleEscape)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleParallax)
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   FULL BLEED HERO + DROPDOWN MOBILE MENU
   ═══════════════════════════════════════════════════════ */

/* ── Reset & Base ────────────────────────────────────── */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ── Wrapper ─────────────────────────────────────────── */
.hero-wrapper {
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
}

/* ── Navbar ──────────────────────────────────────────── */
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 16px 20px 0;
}

.navbar {
  pointer-events: all;
  background: rgba(10, 10, 10, 0.35);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  box-shadow: 
    0 4px 30px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: auto;
  max-width: 90vw;
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(28px) saturate(1.6);
  -webkit-backdrop-filter: blur(28px) saturate(1.6);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.navbar-inner {
  padding: 0.5rem;
  display: flex;
  align-items: center;
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
  padding: 0.5rem 1.1rem;
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

.nav-link__dot {
  position: absolute;
  bottom: 2px;
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

/* ── Mobile Menu Button ──────────────────────────────── */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.menu-btn:hover {
  border-color: rgba(255, 85, 0, 0.4);
  background: rgba(255, 255, 255, 0.08);
}

.menu-btn-line {
  display: block;
  width: 18px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.menu-btn.active .menu-btn-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
  background: #ff5500;
}

.menu-btn.active .menu-btn-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.menu-btn.active .menu-btn-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
  background: #ff5500;
}

/* ── Mobile Dropdown Menu ────────────────────────────── */
.mobile-dropdown {
  position: fixed;
  top: 76px;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 480px;
  max-height: 80vh;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(30px) saturate(1.6);
  -webkit-backdrop-filter: blur(30px) saturate(1.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.5rem;
  overflow-y: auto;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  pointer-events: all;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px) scale(0.95);
}

.dropdown-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dropdown-link:hover {
  background: rgba(255, 255, 255, 0.05);
}

.dropdown-link.active {
  background: rgba(255, 85, 0, 0.12);
}

.dropdown-link.active .dropdown-link-text {
  color: #ff5500;
}

.dropdown-link.active .dropdown-link-num {
  color: #ff5500;
}

.dropdown-link-num {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.06em;
  min-width: 24px;
  transition: color 0.3s ease;
}

.dropdown-link-text {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
}

.dropdown-link-arrow {
  color: rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.dropdown-link:hover .dropdown-link-arrow {
  color: #ff5500;
  transform: translateX(4px);
}

.dropdown-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1rem 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dropdown-socials {
  display: flex;
  gap: 0.5rem;
}

.dropdown-social {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: all 0.3s ease;
}

.dropdown-social:hover {
  border-color: #ff5500;
  color: #ff5500;
  transform: translateY(-2px);
  background: rgba(255, 85, 0, 0.08);
}

.dropdown-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.dropdown-cta:hover {
  background: #ff6b1a;
  transform: scale(1.02);
}

/* ── Hero Section (Full Bleed) ───────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #0a0a0a;
  opacity: 0;
  margin-top: -4.6rem;
  transition: opacity 0.5s ease;
}

.hero.is-loaded {
  opacity: 1;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  will-change: transform;
  filter: saturate(0.75) contrast(1.05);
  transform: scale(1.08);
}

.hero__bg-grad {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      135deg,
      rgba(200, 50, 0, 0.72) 0%,
      rgba(255, 85, 0, 0.45) 35%,
      rgba(255, 120, 0, 0.2) 60%,
      transparent 100%
    );
}

.hero__bg-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.97) 0%,
    rgba(10, 10, 10, 0.55) 50%,
    transparent 100%
  );
}

/* ── Hero Content ────────────────────────────────────── */
.hero__content {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: clamp(90px, 14vh, 140px) clamp(24px, 5vw, 96px) 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

.hero__eyebrow {
  display: block;
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.04em;
  margin-bottom: clamp(12px, 2vh, 24px);
}

.hero__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.88;
  gap: 0.1rem;
}

.hero__line {
  display: block;
  font-size: clamp(4rem, 12vw, 11rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 0.88;
  text-shadow: 0 2px 40px rgba(0, 0, 0, 0.35);
}

/* Creative Text Highlights */
.highlight-text {
  background: linear-gradient(135deg, #ff5500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.highlight-text-alt {
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight-text-glow {
  background: linear-gradient(135deg, #ff6b6b, #ff3366);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.highlight-impact {
  background: linear-gradient(135deg, #ff5500, #ff6b1a, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  font-weight: 900;
}

.hero__line--impact {
  font-size: clamp(3.5rem, 10vw, 9rem);
  margin-top: 0.1rem;
}

/* Caption Highlights */
.caption-highlight {
  color: #ff5500;
  font-weight: 600;
}

.caption-highlight-alt {
  background: linear-gradient(135deg, #ff5500, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

.hero__caption {
  align-self: end;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  padding: clamp(32px, 4vh, 60px) 0 clamp(24px, 3vh, 48px);
  max-width: 420px;
  margin-left: auto;
  padding-right: 0;
}

.hero__caption-text {
  margin: 0;
  font-size: clamp(0.88rem, 1.1vw, 1.05rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.6rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  letter-spacing: 0.01em;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.hero__cta:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 85, 0, 0.3);
}

.hero__cta-icon {
  width: 26px;
  height: 26px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero__cta:hover .hero__cta-icon {
  transform: translateX(3px);
}

/* ── Feature Strip ───────────────────────────────────── */
.hero__strip {
  position: relative;
  z-index: 1;
  background: rgba(10, 10, 10, 0.97);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: clamp(20px, 3vh, 32px) clamp(24px, 5vw, 96px);
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero__strip-label {
  margin: 0;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.hero__strip-items {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  flex-wrap: wrap;
}

.hero__feat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  white-space: nowrap;
}

.hero__feat-num {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.05em;
  line-height: 1;
}

.hero__feat-label {
  font-size: clamp(0.78rem, 0.95vw, 0.92rem);
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.02em;
  line-height: 1;
}

/* ── Animation System ────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.anim-slide {
  opacity: 0;
  transform: translateY(60px);
  transition:
    opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.is-loaded .anim,
.is-loaded .anim-slide {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hero { opacity: 1 !important; }
  .anim, .anim-slide {
    transition-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .hero__bg-img { transform: none !important; }
}

/* ── Desktop Layout ──────────────────────────────────── */
@media (min-width: 1024px) {
  .hero__content {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
  }

  .hero__eyebrow {
    grid-column: 1 / -1;
  }

  .hero__heading {
    grid-column: 1 / 2;
    align-self: start;
  }

  .hero__caption {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    align-self: end;
    margin-left: auto;
    padding-bottom: clamp(40px, 5vh, 72px);
  }
}

/* ── Tablet ──────────────────────────────────────────── */
@media (max-width: 1023px) {
  .hero__caption {
    margin-left: 0;
    max-width: 100%;
  }

  .hero__line {
    font-size: clamp(3.5rem, 10vw, 7rem);
  }
  
  .hero__line--impact {
    font-size: clamp(3rem, 8vw, 5.5rem);
  }
}

/* ── Mobile ──────────────────────────────────────────── */
@media (max-width: 768px) {
  /* Navbar */
  .navbar-wrapper {
    padding: 12px 12px 0;
  }
  
  .navbar {
    border-radius: 20px;
    width: 100%;
    max-width: 100%;
  }
  
  .navbar-inner {
    padding: 0.4rem 0.6rem;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  
  .desk-nav {
    display: none;
  }
  
  .menu-btn {
    display: flex;
  }

  /* Mobile Dropdown */
  .mobile-dropdown {
    top: 68px;
    width: 95vw;
    padding: 0.25rem;
    max-height: 75vh;
  }

  .dropdown-link-text {
    font-size: 1rem;
  }

  .dropdown-link {
    padding: 0.7rem 0.8rem;
  }

  /* Hero */
  .hero {
    margin-top: -4.9rem;
  }

  .hero__content {
    padding: clamp(70px, 12vh, 90px) clamp(20px, 4vw, 32px) 0;
  }

  .hero__line {
    font-size: clamp(2.8rem, 10vw, 4.5rem);
  }
  
  .hero__line--impact {
    font-size: clamp(2.2rem, 8vw, 3.8rem);
  }

  .hero__caption {
    max-width: 100%;
    margin-left: 0;
    gap: 1.25rem;
    padding-bottom: clamp(28px, 4vh, 48px);
  }

  .hero__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem clamp(20px, 4vw, 32px);
  }

  .hero__strip-items {
    gap: 1.25rem 2rem;
  }

  .hero__feat {
    flex-direction: column;
    gap: 0.2rem;
  }
}

/* ── Small Mobile ────────────────────────────────────── */
@media (max-width: 380px) {
  .navbar-wrapper {
    padding: 10px 10px 0;
  }
  
  .navbar {
    border-radius: 16px;
  }
  
  .navbar-inner {
    padding: 0.3rem 0.5rem;
  }

  .menu-btn {
    width: 36px;
    height: 36px;
    padding: 8px;
  }

  .menu-btn-line {
    width: 16px;
    height: 2px;
  }

  .mobile-dropdown {
    top: 60px;
    width: 98vw;
    padding: 0.15rem;
  }

  .dropdown-link-text {
    font-size: 0.9rem;
  }

  .dropdown-link {
    padding: 0.6rem 0.7rem;
    gap: 0.75rem;
  }

  .dropdown-link-num {
    font-size: 0.6rem;
    min-width: 20px;
  }

  .dropdown-social {
    width: 36px;
    height: 36px;
  }

  .hero__content {
    padding: 60px 16px 0;
  }

  .hero__line {
    font-size: clamp(2.2rem, 8vw, 3.5rem);
  }
  
  .hero__line--impact {
    font-size: clamp(1.8rem, 6vw, 2.8rem);
  }

  .hero__strip {
    padding: 1.25rem 16px;
  }
}

/* ── 4K ───────────────────────────────────────────────── */
@media (min-width: 2000px) {
  .hero__content {
    max-width: 1600px;
    margin: 0 auto;
  }

  .hero__line {
    font-size: 13rem;
  }
  
  .hero__line--impact {
    font-size: 10rem;
  }
}
</style>