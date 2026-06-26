<template>
  <div class="hero-wrapper">

    <!-- ═══ NAVBAR ═══ -->
    <div class="navbar-wrapper">
      <header class="navbar" :class="{ scrolled: isScrolled }">
        <div class="navbar-inner">

          <nav class="desk-nav" aria-label="Main navigation">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              @click.prevent="navigateToSection(link.id)"
              :class="['nav-link', { active: activeSection === link.id }]"
            >
              {{ link.text }}
            </a>
          </nav>

          <button
            class="menu-btn"
            :class="{ active: isMobileMenuOpen }"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>

        </div>
      </header>

      <!-- Mobile Dropdown -->
      <transition name="dropdown">
        <div v-if="isMobileMenuOpen" class="mobile-dropdown">
          <nav class="dropdown-nav">
            <a
              v-for="(link, idx) in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              @click.prevent="navigateToSection(link.id)"
              :class="['dropdown-link', { active: activeSection === link.id }]"
              :style="{ '--i': idx }"
            >
              <span class="dl-num">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="dl-text">{{ link.text }}</span>
              <svg class="dl-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </a>
          </nav>
          <div class="dropdown-footer">
            <div class="df-socials">
              <a href="https://github.com/Njenga993" target="_blank" rel="noopener" class="df-social" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" class="df-social" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="mailto:kamaukelvin077@gmail.com" class="df-social" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
            <a href="#contact" class="df-cta" @click.prevent="navigateToSection('contact')">
              Let's work together
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </a>
          </div>
        </div>
      </transition>
    </div>

    <!-- ═══ HERO ═══ -->
    <section class="hero" ref="heroRef">

      <!-- Background photo -->
      <div class="hero__bg" aria-hidden="true">
        <img src="/kay.jpg" alt="" class="hero__bg-img" draggable="false" />
        <div class="hero__bg-grad"></div>
        <div class="hero__bg-vignette"></div>
      </div>

      <!-- Content -->
      <div class="hero__body">

        <!-- LEFT COLUMN: headline + proof + CTA -->
        <div class="hero__left">

          <p class="hero__eyebrow anim" style="--d:0.15s">
            Full-Stack Developer — Nairobi, KE
          </p>

          <h1 class="hero__heading">
            <span class="hl anim-slide" style="--d:0.25s">I build software</span>
            <span class="hl hl--outline anim-slide" style="--d:0.36s">businesses</span>
            <span class="hl anim-slide" style="--d:0.47s">actually use.</span>
          </h1>

          <p class="hero__sub anim" style="--d:0.58s">
            From POS systems handling daily sales across Kenya to conference platforms 
            managing 500+ registrations — I design and ship full-stack products that 
            solve real operational problems.
          </p>

          <div class="hero__actions anim" style="--d:0.68s">
            <a href="#projects" class="btn-primary" @click.prevent="navigateToSection('projects')">
              See my work
            </a>
            <a href="#contact" class="btn-ghost" @click.prevent="navigateToSection('contact')">
              Start a project
            </a>
          </div>

          <!-- Social proof row -->
          <div class="hero__proof anim" style="--d:0.78s">
            <div class="proof-item">
              <span class="proof-num">4+</span>
              <span class="proof-label">Years building</span>
            </div>
            <div class="proof-divider"></div>
            <div class="proof-item">
              <span class="proof-num">20+</span>
              <span class="proof-label">Products shipped</span>
            </div>
            <div class="proof-divider"></div>
            <div class="proof-item">
              <span class="proof-num">KE → EAC</span>
              <span class="proof-label">Client reach</span>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: SellSync featured card -->
        <div class="hero__right anim-rise" style="--d:0.4s">

          <div class="project-card">

            <!-- Card header bar -->
            <div class="pc-bar">
              <div class="pc-dots">
                <span class="pc-dot pc-dot--r"></span>
                <span class="pc-dot pc-dot--y"></span>
                <span class="pc-dot pc-dot--g"></span>
              </div>
              <span class="pc-url">https://sellsync-pos-production.up.railway.app/</span>
              <span class="pc-live">
                <span class="live-dot"></span>
                Live
              </span>
            </div>

            <!-- Screenshot -->
            <div class="pc-screen">
              <img
                src="/sellsync-dashboard.png"
                alt="SellSync POS Dashboard — multi-tenant point of sale system"
                class="pc-img"
                draggable="false"
              />
              <div class="pc-screen-grad"></div>
            </div>

            <!-- Card footer -->
            <div class="pc-footer">
              <div class="pc-info">
                <p class="pc-name">SellSync POS</p>
                <p class="pc-desc">Multi-tenant point-of-sale · inventory · P&amp;L reports</p>
              </div>
              <div class="pc-stack">
                <span class="stack-tag">Laravel</span>
                <span class="stack-tag">Vue</span>
                <span class="stack-tag">PostgreSQL</span>
              </div>
            </div>

          </div>

          <!-- Caption below card -->
          <p class="card-caption">
            In production · serving retail businesses across Kenya
          </p>

        </div>

      </div>

      <!-- Bottom strip -->
      <div class="hero__strip">
        <span class="strip-label">What I build</span>
        <div class="strip-items">
          <div v-for="(feat, i) in features" :key="i" class="strip-feat anim" :style="{ '--d': 0.8 + i * 0.07 + 's' }">
            <span class="feat-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="feat-label">{{ feat }}</span>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const navLinks = [
  { id: 'about',      text: 'About'      },
  { id: 'skills',     text: 'Skills'     },
  { id: 'experience', text: 'Experience' },
  { id: 'projects',   text: 'Projects'   },
  { id: 'contact',    text: 'Contact'    },
]

const features = [
  'SaaS Products',
  'Full-Stack Systems',
  'System Architecture',
  'Startup Infrastructure',
]

const isScrolled        = ref(false)
const activeSection     = ref('')
const isMobileMenuOpen  = ref(false)
const heroRef           = ref(null)

let scrollTicking = false
let rafId = null

/* ── Scroll ──────────────────────────────────────────── */
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

/* ── Parallax ────────────────────────────────────────── */
const handleParallax = () => {
  if (!heroRef.value) return
  const img = heroRef.value.querySelector('.hero__bg-img')
  if (!img) return
  if (window.scrollY < window.innerHeight * 1.2) {
    img.style.transform = `translate3d(0, ${window.scrollY * 0.22}px, 0) scale(1.08)`
  }
  rafId = requestAnimationFrame(handleParallax)
}

/* ── Nav ─────────────────────────────────────────────── */
const navigateToSection = (id) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
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
  requestAnimationFrame(() => heroRef.value?.classList.add('is-loaded'))
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('scroll', handleParallax, { passive: true })
  document.addEventListener('keydown', handleEscape)
  const img = heroRef.value?.querySelector('.hero__bg-img')
  if (img) img.style.transform = 'translate3d(0,0,0) scale(1.08)'
  handleParallax()
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', handleParallax)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* ══════════════════════════════════════════════════════
   TOKENS
   ══════════════════════════════════════════════════════ */
:root {
  --accent:        #e84a00;
  --accent-warm:   #c93d00;
  --white:         #ffffff;
  --off-white:     #f0ede8;
  --silver:        #c8cdd5;
  --muted:         #8a919e;
  --border:        rgba(255,255,255,0.07);
  --border-light:  rgba(255,255,255,0.13);
  --bg:            #080808;
  --ease:          cubic-bezier(0.16, 1, 0.3, 1);
}

/* ══════════════════════════════════════════════════════
   WRAPPER
   ══════════════════════════════════════════════════════ */
.hero-wrapper {
  position: relative;
  min-height: 100vh;
  background: var(--bg);
  margin-top: -5rem;
}

/* ══════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════ */
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 14px 24px 0;
  pointer-events: none;
}

.navbar {
  pointer-events: all;
  width: 100%;
  max-width: 900px;
  background: rgba(8, 8, 8, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  border-radius: 999px;
  transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
}

.navbar.scrolled {
  background: rgba(8, 8, 8, 0.82);
  border-color: var(--border-light);
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}

.navbar-inner {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Desktop nav */
.desk-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 0.15rem;
}

.nav-link {
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  border-radius: 999px;
  transition: color 0.25s, background 0.25s;
}
.nav-link:hover { color: var(--white); background: rgba(255,255,255,0.05); }
.nav-link.active { color: var(--white); }

/* Hamburger — 2 lines only, cleaner */
.menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 38px;
  height: 38px;
  padding: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.3s;
}
.menu-btn:hover { border-color: rgba(232,74,0,0.4); }

.menu-btn span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--white);
  border-radius: 2px;
  transition: all 0.35s var(--ease);
  transform-origin: center;
}

.menu-btn.active span:first-child { transform: rotate(45deg) translate(5px, 5px); background: var(--accent); }
.menu-btn.active span:last-child  { transform: rotate(-45deg) translate(5px, -5px); background: var(--accent); }

/* ══════════════════════════════════════════════════════
   MOBILE DROPDOWN
   ══════════════════════════════════════════════════════ */
.mobile-dropdown {
  position: fixed;
  top: 68px;
  left: 50%;
  transform: translateX(-50%);
  width: min(480px, 92vw);
  background: rgba(10,10,10,0.97);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.6);
  pointer-events: all;
}

.dropdown-enter-active,
.dropdown-leave-active { transition: all 0.35s var(--ease); }
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px) scale(0.97);
}

.dropdown-nav {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.25s;
}
.dropdown-link:hover { background: rgba(255,255,255,0.04); }
.dropdown-link.active { background: rgba(232,74,0,0.1); }
.dropdown-link.active .dl-text { color: var(--accent); }

.dl-num {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  min-width: 20px;
}
.dropdown-link.active .dl-num { color: var(--accent); }

.dl-text {
  flex: 1;
  font-size: 1.05rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  letter-spacing: -0.01em;
}
.dropdown-link:hover .dl-text { color: var(--white); }

.dl-arrow {
  color: rgba(255,255,255,0.15);
  transition: all 0.25s var(--ease);
}
.dropdown-link:hover .dl-arrow {
  color: var(--accent);
  transform: translateX(3px);
}

.dropdown-footer {
  padding: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.df-socials { display: flex; gap: 0.5rem; }

.df-social {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
  border-radius: 10px;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.25s;
}
.df-social:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(232,74,0,0.08);
}

.df-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem;
  background: var(--accent);
  color: var(--white);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  transition: background 0.25s;
}
.df-cta:hover { background: #ff5c10; color: var(--white); }

/* ══════════════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════════════ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
  /* No margin-top — navbar floats over the hero */
}
.hero.is-loaded { opacity: 1; }

/* Background */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
  will-change: transform;
  filter: grayscale(20%) contrast(1.04) saturate(0.8);
  transform: scale(1.08);
}

/* Single warm overlay — no competing colors */
.hero__bg-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(180, 40, 0, 0.78) 0%,
    rgba(220, 60, 0, 0.40) 42%,
    rgba(0,0,0,0.15) 75%,
    transparent 100%
  );
}

/* Dark bottom fade so strip and content read cleanly */
.hero__bg-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.45) 30%, transparent 65%),
    linear-gradient(to right, rgba(8,8,8,0.3) 0%, transparent 55%);
}

/* ── Body layout ─────────────────────────────────────── */
.hero__body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 4vw, 72px);
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(100px, 16vh, 150px) clamp(24px, 5vw, 96px) clamp(32px, 5vh, 64px);
}

/* ── LEFT ────────────────────────────────────────────── */
.hero__left {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vh, 32px);
}

.hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.04em;
}

.hl {
  display: block;
  font-size: clamp(3.2rem, 6.5vw, 6.5rem);
  font-weight: 900;
  color: var(--white);
  letter-spacing: -0.04em;
  line-height: 0.92;
}

/* Outline word — creates the typographic tension */
.hl--outline {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.55);
}

.hero__sub {
  margin: 0;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255,255,255,0.6);
  max-width: 480px;
}

/* CTA pair */
.hero__actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.btn-primary {
  padding: 0.8rem 1.9rem;
  background: var(--white);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(0,0,0,0.45);
  color: var(--bg);
}

.btn-ghost {
  padding: 0.8rem 1.9rem;
  background: transparent;
  color: rgba(255,255,255,0.75);
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.2);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.45);
  color: var(--white);
  transform: translateY(-2px);
}

/* Proof row */
.hero__proof {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-top: 0.5rem;
}

.proof-item {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.proof-num {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.03em;
  line-height: 1;
}

.proof-label {
  font-size: 0.65rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.proof-divider {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

/* ── RIGHT: Project card ─────────────────────────────── */
.hero__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.project-card {
  width: 100%;
  max-width: 520px;
  background: #111;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 24px 64px rgba(0,0,0,0.6),
    0 4px 16px rgba(0,0,0,0.4);
  transition: transform 0.5s var(--ease), box-shadow 0.5s var(--ease);
}
.project-card:hover {
  transform: translateY(-6px) rotate(-0.4deg);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.06),
    0 36px 80px rgba(0,0,0,0.65),
    0 8px 24px rgba(0,0,0,0.4);
}

/* Browser chrome bar */
.pc-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.85rem;
  background: #1a1a1a;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.pc-dots {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

.pc-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.pc-dot--r { background: #ff5f56; }
.pc-dot--y { background: #ffbd2e; }
.pc-dot--g { background: #27c93f; }

.pc-url {
  flex: 1;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.02em;
  text-align: center;
}

.pc-live {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.62rem;
  font-weight: 700;
  color: #27c93f;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  flex-shrink: 0;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #27c93f;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(39, 201, 63, 0.7);
  animation: pulse 2s infinite;
}

/* Screenshot */
.pc-screen {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #0d0d0d;
}

.pc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.6s var(--ease);
}
.project-card:hover .pc-img { transform: scale(1.03); }

.pc-screen-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(17,17,17,0.9) 100%);
  pointer-events: none;
}

/* Card footer */
.pc-footer {
  padding: 0.9rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.pc-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--white);
  margin: 0 0 0.18rem;
  letter-spacing: -0.01em;
}

.pc-desc {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
  line-height: 1.4;
}

.pc-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  flex-shrink: 0;
  justify-content: flex-end;
}

.stack-tag {
  padding: 0.22rem 0.55rem;
  background: rgba(232,74,0,0.12);
  border: 1px solid rgba(232,74,0,0.25);
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 600;
  color: #e87040;
  letter-spacing: 0.03em;
}

/* Caption */
.card-caption {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}

/* ══════════════════════════════════════════════════════
   FEATURE STRIP
   ══════════════════════════════════════════════════════ */
.hero__strip {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: clamp(18px, 2.5vh, 28px) clamp(24px, 5vw, 96px);
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: rgba(8,8,8,0.96);
}

.strip-label {
  font-size: 0.62rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
  margin: 0;
}

.strip-items {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  flex-wrap: wrap;
}

.strip-feat {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  white-space: nowrap;
}

.feat-num {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.04em;
}

.feat-label {
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.01em;
}

/* ══════════════════════════════════════════════════════
   ANIMATION SYSTEM
   ══════════════════════════════════════════════════════ */
.anim {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  transition-delay: var(--d, 0s);
}

.anim-slide {
  opacity: 0;
  transform: translateY(55px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  transition-delay: var(--d, 0s);
}

/* Project card rises + subtle tilt */
.anim-rise {
  opacity: 0;
  transform: translateY(40px) rotate(1.5deg);
  transition: opacity 1s var(--ease), transform 1s var(--ease);
  transition-delay: var(--d, 0s);
}

.is-loaded .anim,
.is-loaded .anim-slide,
.is-loaded .anim-rise {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}

@media (prefers-reduced-motion: reduce) {
  .hero { opacity: 1 !important; }
  .anim, .anim-slide, .anim-rise {
    opacity: 1 !important;
    transform: none !important;
    transition-duration: 0.01ms !important;
  }
  .hero__bg-img { transform: none !important; }
}

/* ══════════════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════════════ */

/* Tablet: stack layout */
@media (max-width: 1023px) {
  .desk-nav { display: none; }
  .menu-btn { display: flex; }

  .navbar-inner {
    padding: 0.4rem 0.6rem;
    justify-content: flex-end;
  }

  .hero__body {
    grid-template-columns: 1fr;
    gap: clamp(32px, 5vh, 48px);
    padding-top: clamp(88px, 14vh, 110px);
  }

  /* LEFT (headline/copy) always first, RIGHT (card) always below */
  .hero__left  { order: 0; }
  .hero__right { order: 1; }

  .project-card {
    max-width: 420px;
  }

  .hl {
    font-size: clamp(2.8rem, 9vw, 4.5rem);
  }

  .hero__sub { max-width: 100%; }

  .hero__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .strip-items { gap: 1.25rem 2rem; }
}

/* Mobile */
@media (max-width: 640px) {
  .navbar-wrapper { padding: 10px 12px 0; }

  .hero__body {
    padding: clamp(76px, 12vh, 96px) 20px clamp(24px, 4vh, 40px);
    gap: clamp(24px, 4vh, 36px);
  }

  .hl { font-size: clamp(2.4rem, 11vw, 3.5rem); }

  .hero__actions { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-ghost { text-align: center; justify-content: center; }

  .hero__proof { gap: 1rem; }
  .proof-num { font-size: 1.1rem; }

  .project-card { max-width: 100%; }

  .hero__strip { padding: 1.25rem 20px; }

  .strip-items { gap: 1rem 1.5rem; }
}

/* Small phones */
@media (max-width: 380px) {
  .hero__body { padding: 76px 16px 24px; }
  .hl { font-size: clamp(2rem, 12vw, 2.8rem); }
  .hero__proof { flex-wrap: wrap; gap: 0.75rem; }
  .proof-divider { display: none; }
}
</style>