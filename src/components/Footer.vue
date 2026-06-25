<template>
  <footer id="footer" class="footer" ref="footerRef">

    <div class="footer-inner">

      <!-- Big CTA line — Folioblox-style footer opener -->
      <div class="footer__cta-row anim" style="--d:0.05s">
        <div class="cta-row__left">
          <span class="cta-row__line"></span>
          <span class="cta-row__label">Let's work together</span>
        </div>
        <a href="#contact" @click.prevent="scrollToSection('contact')" class="cta-row__btn">
          Start a conversation
          <span class="cta-row__icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </span>
        </a>
      </div>

      <!-- Top bar -->
      <div class="footer__top-bar anim" style="--d:0.12s">
        <div class="tb-left">
          <span class="tb-dot"></span>
          <span class="tb-name">Kelvin Kamau</span>
        </div>
        <div class="tb-right">
          <span class="tb-pulse"></span>
          <span class="tb-status">System Operational</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="footer__grid">

        <!-- Brand -->
        <div class="brand-col anim" style="--d:0.18s">
          <div class="brand-avatar">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
            <span class="avatar-dot"></span>
          </div>
          <div class="brand-copy">
            <h3 class="brand-name">Kelvin Kamau</h3>
            <p class="brand-role">Full‑Stack Engineer · Nairobi, Kenya</p>
            <p class="brand-tagline">
              Building robust, scalable systems that help organisations in East Africa
              operate efficiently and grow through modern technology.
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer-col anim" style="--d:0.24s">
          <h4 class="col-title">Navigation</h4>
          <ul class="nav-list">
            <li v-for="link in navLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                @click.prevent="scrollToSection(link.id)"
                class="nav-link"
              >
                <span class="nl-marker"></span>
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div class="footer-col anim" style="--d:0.30s">
          <h4 class="col-title">Connect</h4>
          <div class="social-row">
            <a
              v-for="s in socials"
              :key="s.id"
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.name"
              class="social-btn"
            >
              <i :class="s.icon"></i>
            </a>
          </div>
          <div class="contact-list">
            <a href="mailto:kamaukelvin077@gmail.com" class="contact-item">
              <i class="fas fa-envelope ci-icon"></i>
              <div>
                <span class="ci-label">Email</span>
                <span class="ci-value">kamaukelvin077@gmail.com</span>
              </div>
            </a>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt ci-icon"></i>
              <div>
                <span class="ci-label">Location</span>
                <span class="ci-value">Nairobi, Kenya · EAT (UTC+3)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Expertise -->
        <div class="footer-col anim" style="--d:0.36s">
          <h4 class="col-title">Expertise</h4>
          <div class="expertise-wrap">
            <span
              v-for="tag in expertise"
              :key="tag"
              class="expertise-tag"
            >{{ tag }}</span>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom-bar anim" style="--d:0.42s">
        <div class="bb-stats">
          <div class="bb-stat">
            <span class="bbs-num">03+</span>
            <span class="bbs-label">Years</span>
          </div>
          <div class="bb-divider"></div>
          <div class="bb-stat">
            <span class="bbs-num">20+</span>
            <span class="bbs-label">Projects</span>
          </div>
          <div class="bb-divider"></div>
          <div class="bb-stat">
            <span class="bbs-num">100%</span>
            <span class="bbs-label">Committed</span>
          </div>
        </div>

        <div class="bb-copy">
          <i class="far fa-copyright"></i>
          <span>{{ new Date().getFullYear() }} Kelvin Kamau. All rights reserved.</span>
        </div>
      </div>

    </div>

  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const footerRef = ref(null)
const footerVisible = ref(false)

const navLinks = [
  { id: 'about',      text: 'About'      },
  { id: 'skills',     text: 'Skills'     },
  { id: 'experience', text: 'Experience' },
  { id: 'projects',   text: 'Projects'   },
  { id: 'clients',    text: 'Clients'    },
  { id: 'contact',    text: 'Contact'    },
]

const socials = [
  { id: 'github',   name: 'GitHub',   icon: 'fab fa-github',      url: 'https://github.com/Njenga993' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in',  url: 'https://www.linkedin.com/in/kelvin-kamau-788160277/' },
  { id: 'x',        name: 'X',        icon: 'fab fa-x-twitter',    url: 'https://x.com/kamau_nje' },
]

const expertise = [
  'Full‑Stack Development',
  'SaaS Architecture',
  'REST API Design',
  'Cloud Deployment',
  'E‑commerce Systems',
  'POS & Inventory',
  'Performance Optimisation',
  'UI/UX Engineering',
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/* ── Intersection observer for scroll animations ─────── */
onMounted(() => {
  const section = footerRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        section.classList.add('in-view')
        io.unobserve(section)
      }
    })
  }, { threshold: 0.08 })

  io.observe(section)
})

onUnmounted(() => {})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   NO :root — scoped :root never matches <html>.
   All colors hardcoded. Palette unified to orange #ff5500
   matching the navbar, hero, and about sections.
   ═══════════════════════════════════════════════════════ */

/* ── Animation system ────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.in-view .anim {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .anim {
    transition-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ── Footer shell ────────────────────────────────────── */
.footer {
  position: relative;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-family: 'Inter', system-ui, sans-serif;
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(2rem, 4vh, 3rem) clamp(24px, 5vw, 96px) clamp(1.5rem, 3vh, 2rem);
  display: flex;
  flex-direction: column;
  gap: clamp(1.8rem, 3vh, 2.4rem);
}

/* ── Big CTA row ─────────────────────────────────────── */
.footer__cta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cta-row__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cta-row__line {
  width: 28px;
  height: 1px;
  background: #ff5500;
}

.cta-row__label {
  font-size: clamp(0.9rem, 1.5vw, 1.15rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.cta-row__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.5rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  letter-spacing: 0.01em;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.3s ease,
              box-shadow 0.3s ease;
}

.cta-row__btn:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 85, 0, 0.3);
}

.cta-row__icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-row__btn:hover .cta-row__icon {
  transform: translateX(3px);
}

/* ── Top bar ─────────────────────────────────────────── */
.footer__top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: clamp(1.5rem, 2.5vh, 2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tb-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.tb-dot {
  width: 7px;
  height: 7px;
  background: #ff5500;
  border-radius: 50%;
}

.tb-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #c8cdd5;
  letter-spacing: 0.06em;
}

.tb-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid rgba(34, 197, 94, 0.22);
  border-radius: 999px;
}

.tb-pulse {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.7);
  animation: pulse 2s infinite;
}

.tb-status {
  font-size: 0.68rem;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.04em;
}

/* ── Main grid ───────────────────────────────────────── */
.footer__grid {
  display: grid;
  grid-template-columns: 1.6fr 0.8fr 1.1fr 1.1fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-bottom: clamp(1.5rem, 2.5vh, 2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Brand col ───────────────────────────────────────── */
.brand-col {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.brand-avatar {
  position: relative;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
}

.brand-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  border: 1.5px solid rgba(255, 85, 0, 0.35);
  filter: grayscale(15%);
  transition: filter 0.3s ease;
  display: block;
}

.brand-avatar:hover img {
  filter: grayscale(0%);
}

.avatar-dot {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
  animation: pulse 2s infinite;
}

.brand-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.brand-name {
  font-size: 0.96rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.02em;
  margin: 0;
}

.brand-role {
  font-size: 0.7rem;
  font-weight: 600;
  color: #ff5500;
  letter-spacing: 0.04em;
  margin: 0;
}

.brand-tagline {
  font-size: 0.78rem;
  color: #8a929e;
  line-height: 1.65;
  margin: 0.25rem 0 0;
}

/* ── Generic footer col ──────────────────────────────── */
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.col-title {
  font-size: 0.66rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0;
}

/* ── Navigation ──────────────────────────────────────── */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #8a929e;
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 0.15rem 0;
}

.nl-marker {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.nav-link:hover {
  color: #ff5500;
  transform: translateX(4px);
}

.nav-link:hover .nl-marker {
  background: #ff5500;
  width: 6px;
  height: 6px;
  box-shadow: 0 0 6px rgba(255, 85, 0, 0.4);
}

/* ── Socials ─────────────────────────────────────────── */
.social-row {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #8a929e;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.social-btn:hover {
  border-color: rgba(255, 85, 0, 0.35);
  color: #ff5500;
  transform: translateY(-2px);
  background: rgba(255, 85, 0, 0.06);
}

/* ── Contact list ────────────────────────────────────── */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  text-decoration: none;
  transition: color 0.2s;
}

a.contact-item:hover .ci-value {
  color: #ff5500;
}

.ci-icon {
  width: 14px;
  color: #ff5500;
  font-size: 0.74rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.contact-item > div {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
}

.ci-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: #5a6270;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.ci-value {
  font-size: 0.76rem;
  color: #b0b8c4;
  transition: color 0.2s ease;
}

/* ── Expertise ───────────────────────────────────────── */
.expertise-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.expertise-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  font-size: 0.68rem;
  color: #9aa3af;
  transition: all 0.25s ease;
}

.expertise-tag:hover {
  border-color: rgba(255, 85, 0, 0.35);
  color: #ff5500;
  background: rgba(255, 85, 0, 0.08);
}

/* ── Bottom bar ──────────────────────────────────────── */
.footer__bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.bb-stats {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.bb-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.bbs-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.bbs-label {
  font-size: 0.6rem;
  color: #5a6270;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.bb-divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.bb-copy {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.68rem;
  color: #4a5568;
}

.bb-copy i {
  font-size: 0.68rem;
}

/* ── Keyframes ───────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .brand-col {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-inner {
    padding: clamp(1.5rem, 3vh, 2rem) clamp(20px, 5vw, 32px) clamp(1.2rem, 2.5vh, 1.5rem);
  }

  .footer__grid {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  .brand-col {
    grid-column: span 1;
  }

  .footer__cta-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .footer__bottom-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 1.4rem 1rem 1.2rem;
  }

  .bb-divider {
    display: none;
  }

  .bb-stats {
    gap: 1rem;
  }

  .brand-col {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-row__label {
    font-size: 0.95rem;
  }
}
</style>