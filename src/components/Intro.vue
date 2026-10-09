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
        <span class="navbar__progress" :style="{ transform: `scaleX(${scrollPct})` }"></span>
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
    <section
      class="hero"
      ref="heroRef"
      @pointermove="onHeroMove"
      @pointerleave="onHeroLeave"
    >

      <!-- Background: dim base → warm wash → true-colour layer revealed by a roaming flashlight -->
      <div class="hero__bg" aria-hidden="true">
        <img src="/kay.jpg" alt="" class="hero__bg-img" draggable="false" />
        <div class="hero__bg-grad"></div>
        <div class="hero__reveal">
          <img src="/kay.jpg" alt="" class="hero__bg-img hero__bg-img--color" draggable="false" />
        </div>
        <div class="hero__bg-vignette"></div>
        <div class="hero__grain"></div>
        <div class="hero__ring"></div>
      </div>

      <!-- Content -->
      <div class="hero__body">

        <!-- LEFT COLUMN: headline + proof + CTA -->
        <div class="hero__left">

          <p class="hero__eyebrow anim" style="--d:0.15s">
            <span class="eyebrow-dot"></span>
            Full-Stack Developer — Nairobi, KE
          </p>

          <h1 class="hero__heading" aria-label="I build software businesses actually use.">
            <span
              v-for="(line, li) in headLines"
              :key="li"
              class="hl"
              :class="{ 'hl--outline': line.outline }"
              aria-hidden="true"
            >
              <span v-for="(w, wi) in line.words" :key="wi" class="hw">
                <span v-for="ch in w.chars" :key="ch.i" class="hc" :style="{ '--i': ch.i }">{{ ch.c }}</span>
              </span>
            </span>
          </h1>

          <p class="hero__sub anim" style="--d:0.95s">
            From POS systems handling daily sales across Kenya to conference platforms
            managing 500+ registrations — I design and ship full-stack products that
            solve real operational problems.
          </p>

          <div class="hero__actions anim" style="--d:1.05s">
            <a
              href="#projects"
              class="btn-primary mag"
              @click.prevent="navigateToSection('projects')"
              @pointermove="onMag"
              @pointerleave="offMag"
            >
              <span class="btn-label">See my work</span>
              <span class="btn-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>
              </span>
            </a>
            <a
              href="#contact"
              class="btn-ghost mag"
              @click.prevent="navigateToSection('contact')"
              @pointermove="onMag"
              @pointerleave="offMag"
            >
              Start a project
            </a>
          </div>

          <!-- Social proof row -->
          <div class="hero__proof anim" style="--d:1.15s">
            <div class="proof-item">
              <span class="proof-num">{{ proof[0] }}+</span>
              <span class="proof-label">Years building</span>
            </div>
            <div class="proof-divider"></div>
            <div class="proof-item">
              <span class="proof-num">{{ proof[1] }}+</span>
              <span class="proof-label">Products shipped</span>
            </div>
            <div class="proof-divider"></div>
            <div class="proof-item">
              <span class="proof-num">KE → EAC</span>
              <span class="proof-label">Client reach</span>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: floating SellSync scene -->
        <div class="hero__right anim-rise" style="--d:0.5s">

          <div class="scene">

            <!-- ghost frames: stacked-deck depth -->
            <div class="ghost ghost--b" aria-hidden="true"></div>
            <div class="ghost ghost--a" aria-hidden="true"></div>

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
                <div class="pc-scan" aria-hidden="true"></div>
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

            <!-- floating chips at different depths -->
            <span class="fchip fchip--1" aria-hidden="true"><i></i>Multi-tenant POS</span>
            <span class="fchip fchip--2" aria-hidden="true"><i></i>Inventory</span>
            <span class="fchip fchip--3" aria-hidden="true"><i></i>P&amp;L reports</span>
          </div>

          <!-- Caption below card -->
          <p class="card-caption">
            In production · serving retail businesses across Kenya
          </p>

        </div>

        <!-- Scroll cue -->
        <a href="#about" class="cue" aria-label="Scroll down" @click.prevent="navigateToSection('about')">
          <span class="cue__line"><i></i></span>
          <span class="cue__text">Scroll</span>
        </a>

      </div>

      <!-- Bottom strip: marquee -->
      <div class="hero__strip">
        <span class="strip-label">What I build</span>
        <div class="marquee">
          <div class="marquee__track">
            <div v-for="(feat, i) in marqueeItems" :key="i" class="strip-feat">
              <span class="feat-num">{{ String((i % features.length) + 1).padStart(2, '0') }}</span>
              <span class="feat-label">{{ feat }}</span>
              <span class="feat-star" aria-hidden="true">✦</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

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
// duplicated so the marquee can loop seamlessly (-50% translate)
const marqueeItems = computed(() => [...features, ...features, ...features, ...features])

/* ── Headline, split into words → letters for the staggered reveal ── */
const rawLines = [
  { t: 'I build software', outline: false },
  { t: 'businesses',       outline: true  },
  { t: 'actually use.',    outline: false },
]
let gi = 0
const headLines = rawLines.map(l => ({
  outline: l.outline,
  words: l.t.split(' ').map(w => ({ chars: [...w].map(c => ({ c, i: gi++ })) })),
}))

const isScrolled        = ref(false)
const scrollPct         = ref(0)
const activeSection     = ref('')
const isMobileMenuOpen  = ref(false)
const heroRef           = ref(null)
const proof             = reactive([0, 0])

let scrollTicking = false

/* ── Scroll: nav state, scroll-spy, parallax var, progress ── */
const handleScroll = () => {
  if (scrollTicking) return
  scrollTicking = true
  requestAnimationFrame(() => {
    scrollTicking = false
    const y = window.scrollY
    isScrolled.value = y > 60

    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollPct.value = max > 0 ? Math.min(y / max, 1) : 0

    if (heroRef.value && y < window.innerHeight * 1.3) {
      heroRef.value.style.setProperty('--scroll', String(y))
    }

    if (y < 200) { activeSection.value = ''; return }
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

/* ── Flashlight + depth parallax (one rAF loop, only while on screen) ── */
const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const pointer = { x: 0.65, y: 0.4, active: false }
let sx = 0.65, sy = 0.4
let rafId = null
let heroVisible = false
let io = null

function loop(t) {
  rafId = null
  if (!heroVisible || !heroRef.value) return
  // idle: the light wanders by itself (also what touch devices see)
  const tx = pointer.active ? pointer.x : 0.62 + Math.sin(t / 2200) * 0.16
  const ty = pointer.active ? pointer.y : 0.42 + Math.cos(t / 2900) * 0.14
  sx += (tx - sx) * 0.07
  sy += (ty - sy) * 0.07
  const el = heroRef.value
  el.style.setProperty('--mx', (sx * 100).toFixed(2) + '%')
  el.style.setProperty('--my', (sy * 100).toFixed(2) + '%')
  el.style.setProperty('--px', ((sx - 0.5) * 2).toFixed(3))
  el.style.setProperty('--py', ((sy - 0.5) * 2).toFixed(3))
  rafId = requestAnimationFrame(loop)
}
function startLoop() { if (!rafId && !reduceMotion) rafId = requestAnimationFrame(loop) }

function onHeroMove(e) {
  if (e.pointerType === 'touch' || !heroRef.value) return
  const r = heroRef.value.getBoundingClientRect()
  pointer.x = (e.clientX - r.left) / r.width
  pointer.y = (e.clientY - r.top) / r.height
  pointer.active = true
}
function onHeroLeave() { pointer.active = false }

/* ── Magnetic buttons ────────────────────────────────── */
function onMag(e) {
  if (reduceMotion || e.pointerType === 'touch') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`
}
function offMag(e) { e.currentTarget.style.transform = '' }

/* ── Count-up ────────────────────────────────────────── */
function countUp(i, target, delay) {
  setTimeout(() => {
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / 1300, 1)
      proof[i] = Math.round((1 - Math.pow(1 - p, 3)) * target)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, delay)
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
  countUp(0, 4, 1300)
  countUp(1, 20, 1400)

  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleEscape)
  handleScroll()

  if (heroRef.value && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting
      if (heroVisible) startLoop()
    }, { threshold: 0 })
    io.observe(heroRef.value)
  } else {
    heroVisible = true
    startLoop()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  if (rafId) cancelAnimationFrame(rafId)
  if (io) io.disconnect()
})
</script>

<style scoped>
/* ══════════════════════════════════════════════════════
   TOKENS
   ══════════════════════════════════════════════════════ */
.hero-wrapper {
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
  position: relative;
  overflow: hidden;
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

.navbar__progress {
  position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--accent); transform-origin: left center; transform: scaleX(0);
  box-shadow: 0 0 10px rgba(232,74,0,0.7); pointer-events: none;
}

/* ══════════════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════════════ */
.hero {
  --mx: 65%; --my: 40%; --px: 0; --py: 0; --scroll: 0;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.hero.is-loaded { opacity: 1; }

/* ── Background stack ────────────────────────────────── */
.hero__bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }

.hero__bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
  will-change: transform;
  filter: grayscale(55%) contrast(1.04) saturate(0.7) brightness(0.8);
  transform: translate3d(0, calc(var(--scroll) * 0.22px), 0) scale(1.08);
}
.hero__bg-img--color { filter: contrast(1.06) saturate(1.1) brightness(1.02); }

/* Warm wash on the left */
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

/* True-colour photo, visible only inside the roaming flashlight */
.hero__reveal {
  position: absolute;
  inset: 0;
  -webkit-mask-image: radial-gradient(circle clamp(170px, 20vw, 330px) at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%);
          mask-image: radial-gradient(circle clamp(170px, 20vw, 330px) at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.55) 55%, transparent 100%);
}

.hero__bg-vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.45) 30%, transparent 65%),
    linear-gradient(to right, rgba(8,8,8,0.35) 0%, transparent 55%);
}

/* Film grain */
.hero__grain {
  position: absolute;
  inset: -50%;
  opacity: 0.07;
  pointer-events: none;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: grain 1.2s steps(6) infinite;
}
@keyframes grain {
  0% { transform: translate(0,0); } 20% { transform: translate(-3%, 2%); }
  40% { transform: translate(2%, -3%); } 60% { transform: translate(-2%, -1%); }
  80% { transform: translate(3%, 3%); } 100% { transform: translate(0,0); }
}

/* Thin ring that tags along with the light */
.hero__ring {
  position: absolute;
  left: var(--mx);
  top: var(--my);
  width: clamp(170px, 20vw, 330px);
  height: clamp(170px, 20vw, 330px);
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.1);
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0.6;
}

/* ── Body layout ─────────────────────────────────────── */
.hero__body {
  position: relative;
  z-index: 1;
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 4vw, 72px);
  align-items: center;
  max-width: 1440px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  padding: clamp(100px, 16vh, 150px) clamp(24px, 5vw, 96px) clamp(40px, 6vh, 72px);
}

/* ── LEFT ────────────────────────────────────────────── */
.hero__left { display: flex; flex-direction: column; gap: clamp(20px, 3vh, 32px); min-width: 0; }

.hero__eyebrow {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  width: fit-content;
  padding: 0.38rem 0.9rem 0.38rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(8,8,8,0.35);
  border: 1px solid var(--border-light);
  border-radius: 999px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.eyebrow-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  animation: pulse 2s infinite;
}

/* Headline — letters rise from a mask, one after another */
.hero__heading { margin: 0; display: flex; flex-direction: column; gap: 0.04em; }

.hl {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.2em;
  font-size: clamp(3.2rem, 6.8vw, 7rem);
  font-weight: 900;
  color: var(--white);
  letter-spacing: -0.045em;
  line-height: 0.95;
}
.hw { display: inline-block; overflow: hidden; padding: 0.02em 0.04em 0.14em; margin: -0.02em -0.04em -0.14em; white-space: nowrap; }
.hc {
  display: inline-block;
  transform: translateY(115%) rotate(6deg);
  transform-origin: left bottom;
  transition: transform 1s var(--ease);
  transition-delay: calc(0.3s + var(--i) * 0.028s);
}
.is-loaded .hc { transform: translateY(0) rotate(0); }

/* Outline word + a colour wave that sweeps through it every few seconds */
.hl--outline .hc {
  color: transparent;
  -webkit-text-stroke: 2px rgba(255,255,255,0.6);
  animation: wave 7s ease-in-out infinite;
  animation-delay: calc(2.4s + var(--i) * 0.07s);
}
@keyframes wave {
  0%, 24%, 100% { color: transparent; -webkit-text-stroke-color: rgba(255,255,255,0.6); }
  8%, 14% { color: var(--accent); -webkit-text-stroke-color: var(--accent); }
}

.hero__sub {
  margin: 0;
  font-size: clamp(0.9rem, 1.1vw, 1.05rem);
  line-height: 1.75;
  color: rgba(255,255,255,0.68);
  max-width: 500px;
}

/* CTA pair */
.hero__actions { display: flex; align-items: center; gap: 0.85rem; flex-wrap: wrap; }

.mag { transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.3s ease, color 0.3s ease, background 0.3s ease; will-change: transform; }

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 0.8rem 0.8rem 1.9rem;
  background: var(--white);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  letter-spacing: 0.01em;
}
.btn-primary:hover { box-shadow: 0 12px 36px rgba(255,85,0,0.35); color: var(--bg); }
.btn-arrow {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent); color: #fff;
  transition: transform 0.4s var(--ease);
}
.btn-primary:hover .btn-arrow { transform: rotate(-45deg); }

.btn-ghost {
  padding: 0.8rem 1.9rem;
  background: rgba(8,8,8,0.25);
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.22);
  text-decoration: none;
  letter-spacing: 0.01em;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.btn-ghost:hover { border-color: rgba(255,255,255,0.5); color: var(--white); background: rgba(255,255,255,0.06); }

/* Proof row */
.hero__proof { display: flex; align-items: center; gap: 1.5rem; padding-top: 0.5rem; }
.proof-item { display: flex; flex-direction: column; gap: 0.12rem; }
.proof-num { font-size: 1.4rem; font-weight: 800; color: var(--white); letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
.proof-label { font-size: 0.65rem; font-weight: 500; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.08em; }
.proof-divider { width: 1px; height: 28px; background: rgba(255,255,255,0.14); flex-shrink: 0; }

/* ── RIGHT: floating scene ───────────────────────────── */
.hero__right { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; min-width: 0; }

.scene {
  position: relative;
  width: 100%;
  max-width: 540px;
  perspective: 1400px;
  margin-bottom: 52px;   /* room for the ghost frames */
}

/* Whole stack tilts toward the light */
.project-card, .ghost {
  transform: rotateY(calc(var(--px) * -9deg)) rotateX(calc(var(--py) * 7deg));
}

.project-card {
  position: relative;
  z-index: 2;
  width: 100%;
  background: #111;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 30px 80px rgba(0,0,0,0.65),
    0 0 90px rgba(255,85,0,0.12);
  transition: box-shadow 0.5s var(--ease);
}
.project-card:hover { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 40px 90px rgba(0,0,0,0.7), 0 0 120px rgba(255,85,0,0.22); }

/* Back frames */
.ghost {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(20,20,22,0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.ghost--a { z-index: 1; transform: translate(26px, 22px) rotateY(calc(var(--px) * -9deg)) rotateX(calc(var(--py) * 7deg)) rotate(3deg); opacity: 0.7; }
.ghost--b { z-index: 0; transform: translate(52px, 44px) rotateY(calc(var(--px) * -9deg)) rotateX(calc(var(--py) * 7deg)) rotate(6deg); opacity: 0.4; }

/* Browser chrome bar */
.pc-bar { display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 0.85rem; background: #1a1a1a; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pc-dots { display: flex; gap: 5px; flex-shrink: 0; }
.pc-dot { width: 10px; height: 10px; border-radius: 50%; }
.pc-dot--r { background: #ff5f56; } .pc-dot--y { background: #ffbd2e; } .pc-dot--g { background: #27c93f; }
.pc-url { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.7rem; font-weight: 500; color: rgba(255,255,255,0.32); letter-spacing: 0.02em; text-align: center; }
.pc-live { display: flex; align-items: center; gap: 0.35rem; font-size: 0.62rem; font-weight: 700; color: #27c93f; letter-spacing: 0.06em; text-transform: uppercase; flex-shrink: 0; }
.live-dot { width: 6px; height: 6px; background: #27c93f; border-radius: 50%; box-shadow: 0 0 6px rgba(39,201,63,0.7); animation: pulse 2s infinite; }

/* Screenshot */
.pc-screen { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #0d0d0d; }
.pc-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; transition: transform 0.8s var(--ease); }
.project-card:hover .pc-img { transform: scale(1.04); }
.pc-screen-grad { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(17,17,17,0.9) 100%); pointer-events: none; }
/* a scan line sweeping the "live" dashboard */
.pc-scan {
  position: absolute; left: 0; right: 0; top: 0; height: 38%;
  background: linear-gradient(to bottom, transparent, rgba(255,85,0,0.16) 80%, rgba(255,120,40,0.55) 100%);
  border-bottom: 1px solid rgba(255,140,60,0.7);
  transform: translateY(-110%);
  animation: scan 5.5s ease-in-out 2s infinite;
  pointer-events: none;
  mix-blend-mode: screen;
}
@keyframes scan { 0% { transform: translateY(-110%); } 45%, 100% { transform: translateY(290%); } }

/* Card footer */
.pc-footer { padding: 0.9rem 1rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.pc-name { font-size: 0.9rem; font-weight: 700; color: var(--white); margin: 0 0 0.18rem; letter-spacing: -0.01em; }
.pc-desc { font-size: 0.7rem; color: rgba(255,255,255,0.45); margin: 0; line-height: 1.4; }
.pc-stack { display: flex; flex-wrap: wrap; gap: 0.3rem; flex-shrink: 0; justify-content: flex-end; }
.stack-tag { padding: 0.22rem 0.55rem; background: rgba(232,74,0,0.12); border: 1px solid rgba(232,74,0,0.25); border-radius: 999px; font-size: 0.62rem; font-weight: 600; color: #ee7a4a; letter-spacing: 0.03em; }

/* Floating chips — each rides a different depth */
.fchip {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
  white-space: nowrap;
  background: rgba(10,10,12,0.78);
  border: 1px solid rgba(255,85,0,0.35);
  border-radius: 999px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  animation: bob 5s ease-in-out infinite;
}
.fchip i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
.fchip--1 { top: -4%;  left: -9%;  --k: 26; animation-delay: 0s;   }
.fchip--2 { top: 46%;  right: -9%; --k: 38; animation-delay: -1.6s; }
.fchip--3 { bottom: -6%; left: 8%; --k: 18; animation-delay: -3.2s; }
@keyframes bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }
.fchip { transform: translate3d(calc(var(--px) * var(--k) * 1px), calc(var(--py) * var(--k) * 0.6px), 0); }

.card-caption { margin: 0; font-size: 0.68rem; color: rgba(255,255,255,0.4); letter-spacing: 0.06em; text-transform: uppercase; text-align: center; }

/* Scroll cue */
.cue {
  position: absolute;
  left: clamp(24px, 5vw, 96px);
  bottom: clamp(10px, 2vh, 20px);
  display: none;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  color: rgba(255,255,255,0.4);
}
.cue__line { position: relative; width: 1px; height: 34px; background: rgba(255,255,255,0.15); overflow: hidden; }
.cue__line i { position: absolute; left: 0; top: 0; width: 1px; height: 12px; background: var(--accent); animation: cue 1.8s var(--ease) infinite; }
.cue__text { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; writing-mode: vertical-rl; display: none; }
@keyframes cue { 0% { transform: translateY(-14px); } 100% { transform: translateY(36px); } }
@media (min-width: 1024px) and (min-height: 760px) { .cue { display: flex; } }

/* ══════════════════════════════════════════════════════
   FEATURE STRIP — marquee
   ══════════════════════════════════════════════════════ */
.hero__strip {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border);
  padding: clamp(16px, 2.2vh, 24px) 0 clamp(16px, 2.2vh, 24px) clamp(24px, 5vw, 96px);
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background: rgba(8,8,8,0.96);
  overflow: hidden;
}
.strip-label { font-size: 0.62rem; color: rgba(255,255,255,0.3); letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; margin: 0; }

.marquee {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 40px, #000 calc(100% - 60px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 40px, #000 calc(100% - 60px), transparent 100%);
}
.marquee__track { display: flex; width: max-content; animation: marquee 34s linear infinite; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { transform: translateX(-50%); } }

.strip-feat { display: flex; align-items: baseline; gap: 0.5rem; white-space: nowrap; padding-right: clamp(1.5rem, 3vw, 2.5rem); }
.feat-num { font-size: 0.65rem; font-weight: 700; color: var(--accent); letter-spacing: 0.04em; }
.feat-label { font-size: clamp(0.95rem, 1.6vw, 1.25rem); font-weight: 700; color: rgba(255,255,255,0.8); letter-spacing: -0.01em; }
.feat-star { margin-left: clamp(1.5rem, 3vw, 2.5rem); font-size: 0.7rem; color: rgba(255,255,255,0.22); align-self: center; }

/* ══════════════════════════════════════════════════════
   ANIMATION SYSTEM
   ══════════════════════════════════════════════════════ */
.anim {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
  transition-delay: var(--d, 0s);
}
.anim-rise {
  opacity: 0;
  transform: translateY(40px) rotate(1.5deg);
  transition: opacity 1s var(--ease), transform 1s var(--ease);
  transition-delay: var(--d, 0s);
}
.is-loaded .anim, .is-loaded .anim-rise { opacity: 1; transform: translateY(0) rotate(0deg); }

@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }

@media (prefers-reduced-motion: reduce) {
  .hero { opacity: 1 !important; }
  .anim, .anim-rise { opacity: 1 !important; transform: none !important; transition-duration: 0.01ms !important; }
  .hc { transform: none !important; transition: none !important; }
  .hl--outline .hc, .hero__grain, .pc-scan, .fchip, .marquee__track, .cue__line i { animation: none !important; }
  .hero__bg-img { transform: scale(1.08) !important; }
}

/* ══════════════════════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════════════════════ */
@media (max-width: 1023px) {
  .desk-nav { display: none; }
  .menu-btn { display: flex; }
  .navbar-inner { padding: 0.4rem 0.6rem; justify-content: flex-end; }

  .hero__body {
    grid-template-columns: minmax(0, 1fr);
    gap: clamp(40px, 6vh, 56px);
    padding-top: clamp(88px, 14vh, 110px);
  }
  .hero__left  { order: 0; }
  .hero__right { order: 1; }
  .scene { max-width: 460px; margin-right: 52px; }
  .hl { font-size: clamp(2.8rem, 10vw, 5rem); }
  .hero__sub { max-width: 100%; }
  .hero__strip { flex-direction: column; align-items: flex-start; gap: 0.75rem; padding-left: clamp(24px, 5vw, 96px); }
  .marquee { width: 100%; flex: none; }
}

@media (max-width: 640px) {
  .navbar-wrapper { padding: 10px 12px 0; }
  .hero__body { padding: clamp(76px, 12vh, 96px) 20px clamp(24px, 4vh, 40px); gap: clamp(36px, 5vh, 48px); }
  .hl { font-size: clamp(2.4rem, 12.5vw, 3.6rem); }
  .hero__actions { flex-direction: column; align-items: stretch; }
  .btn-primary { justify-content: space-between; }
  .btn-ghost { text-align: center; }
  .hero__proof { gap: 1rem; }
  .proof-num { font-size: 1.15rem; }
  .scene { margin-right: 36px; }
  .ghost--a { transform: translate(16px, 14px) rotate(3deg); }
  .ghost--b { transform: translate(32px, 28px) rotate(6deg); }
  .fchip { font-size: 0.62rem; padding: 0.4rem 0.7rem; }
  .fchip--1 { left: -4%; } .fchip--2 { right: -6px; }
  .pc-footer { flex-direction: column; }
  .pc-stack { justify-content: flex-start; }
  .hero__strip { padding-left: 20px; }
}

@media (max-width: 380px) {
  .hero__body { padding: 76px 16px 24px; }
  .hl { font-size: clamp(2rem, 12vw, 2.8rem); }
  .hero__proof { flex-wrap: wrap; gap: 0.75rem; }
  .proof-divider { display: none; }
}
</style>