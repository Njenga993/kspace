<template>
  <footer id="footer" class="footer">
    <div class="footer-inner">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="tb-left">
          <span class="label-dot"></span>
          <span class="label-text">Kelvin Kamau</span>
        </div>
        <div class="tb-right">
          <span class="pulse-dot"></span>
          <span class="sys-text">System Operational</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="footer-grid">

        <!-- Brand -->
        <div class="brand-col">
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
        <div class="footer-col">
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
        <div class="footer-col">
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
        <div class="footer-col">
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
      <div class="bottom-bar">
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

    <!-- Back to top -->
    <Transition name="btt-fade">
      <button
        v-show="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to top"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </Transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackToTop = ref(false)

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

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const onScroll = () => { showBackToTop.value = window.scrollY > 400 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* ─── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #0d1117;
  --bg-card: #161b22;
  --accent: #c9a23b;
  --accent-dim: rgba(201, 162, 59, 0.12);
  --accent-border: rgba(201, 162, 59, 0.35);
  --white: #f0f2f5;
  --silver: #b0b8c1;
  --muted: #7b8694;
  --dim: #4a5568;
  --border: rgba(255, 255, 255, 0.07);
  --green: #2ecc71;
}

/* ─── Footer shell ───────────────────────────────────── */
.footer {
  position: relative;
  background: #0d1117;
  border-top: 1px solid var(--border);
  font-family: 'Inter', system-ui, sans-serif;
}

.footer-inner {
  max-width: 1380px;
  margin: 0 auto;
  padding: 2.4rem 2.8rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
}

/* ─── Top bar ────────────────────────────────────────── */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.tb-left {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.label-dot {
  width: 7px; height: 7px;
  background: var(--accent); border-radius: 50%;
}

.label-text {
  font-size: 0.8rem; font-weight: 700;
  color: var(--silver); letter-spacing: 0.06em;
}

.tb-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.9rem;
  border: 1px solid rgba(46, 204, 113, 0.22);
  border-radius: 3rem;
}

.pulse-dot {
  width: 6px; height: 6px;
  background: var(--green); border-radius: 50%;
  box-shadow: 0 0 7px rgba(46, 204, 113, 0.7);
  animation: pulse 2s infinite;
}

.sys-text {
  font-size: 0.7rem; font-weight: 600;
  color: var(--green); letter-spacing: 0.04em;
}

/* ─── Main grid ──────────────────────────────────────── */
.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.2fr 1.2fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

/* ─── Brand col ──────────────────────────────────────── */
.brand-col {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.brand-avatar {
  position: relative;
  flex-shrink: 0;
  width: 56px; height: 56px;
}

.brand-avatar img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  border: 1.5px solid var(--accent-border);
  filter: grayscale(15%);
  transition: filter 0.3s;
  display: block;
}

.brand-avatar:hover img { filter: grayscale(0%); }

.avatar-dot {
  position: absolute;
  bottom: 2px; right: 2px;
  width: 10px; height: 10px;
  background: var(--green); border-radius: 50%;
  border: 2px solid #0d1117;
  animation: pulse 2s infinite;
}

.brand-copy { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }

.brand-name {
  font-size: 0.96rem; font-weight: 700;
  color: var(--white); letter-spacing: 0.02em; margin: 0;
}

.brand-role {
  font-size: 0.7rem; font-weight: 600;
  color: var(--accent); letter-spacing: 0.04em; margin: 0;
}

.brand-tagline {
  font-size: 0.78rem; color: var(--muted);
  line-height: 1.65; margin: 0.25rem 0 0;
}

/* ─── Generic footer col ─────────────────────────────── */
.footer-col {
  display: flex; flex-direction: column; gap: 1rem;
}

.col-title {
  font-size: 0.66rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.14em;
  text-transform: uppercase; margin: 0;
}

/* Navigation */
.nav-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 0.45rem;
}

.nav-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: var(--muted); text-decoration: none;
  font-size: 0.82rem; transition: all 0.2s; padding: 0.15rem 0;
}

.nl-marker {
  width: 4px; height: 4px;
  background: var(--dim); border-radius: 50%;
  transition: all 0.2s; flex-shrink: 0;
}

.nav-link:hover {
  color: var(--accent);
  transform: translateX(4px);
}

.nav-link:hover .nl-marker {
  background: var(--accent);
  width: 6px; height: 6px;
}

/* Socials */
.social-row { display: flex; gap: 0.45rem; }

.social-btn {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); border-radius: 0.6rem;
  color: var(--muted); font-size: 0.82rem;
  text-decoration: none; transition: all 0.2s;
}

.social-btn:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  transform: translateY(-2px);
}

/* Contact list */
.contact-list {
  display: flex; flex-direction: column; gap: 0.65rem;
}

.contact-item {
  display: flex; align-items: flex-start; gap: 0.6rem;
  text-decoration: none; transition: color 0.2s;
}

a.contact-item:hover .ci-value { color: var(--accent); }

.ci-icon {
  width: 14px; color: var(--accent); font-size: 0.74rem;
  margin-top: 0.15rem; flex-shrink: 0;
}

.contact-item > div {
  display: flex; flex-direction: column; gap: 0.08rem;
}

.ci-label {
  font-size: 0.56rem; font-weight: 700; color: var(--dim);
  letter-spacing: 0.1em; text-transform: uppercase;
}

.ci-value { font-size: 0.76rem; color: var(--silver); }

/* Expertise */
.expertise-wrap { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.expertise-tag {
  display: inline-flex; align-items: center;
  padding: 0.3rem 0.75rem;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 3rem; font-size: 0.68rem; color: var(--silver);
  transition: all 0.2s;
}

.expertise-tag:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-dim);
}

/* ─── Bottom bar ─────────────────────────────────────── */
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.bb-stats {
  display: flex; align-items: center; gap: 1.2rem;
}

.bb-stat { display: flex; flex-direction: column; gap: 0.08rem; }

.bbs-num {
  font-size: 1.4rem; font-weight: 800;
  color: var(--accent); letter-spacing: -0.02em; line-height: 1;
}

.bbs-label {
  font-size: 0.6rem; color: var(--dim);
  text-transform: uppercase; letter-spacing: 0.1em;
}

.bb-divider {
  width: 1px; height: 2rem;
  background: var(--border); flex-shrink: 0;
}

.bb-copy {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.66rem; color: var(--dim);
}

.bb-copy i { font-size: 0.66rem; }

/* ─── Back to top ────────────────────────────────────── */
.back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent); color: #0d1117;
  border: none; border-radius: 50%;
  font-size: 0.9rem; cursor: pointer;
  transition: all 0.22s ease;
  box-shadow: 0 4px 14px rgba(201, 162, 59, 0.3);
  z-index: 900;
}

.back-to-top:hover {
  background: #dbb24a;
  transform: translateY(-4px);
  box-shadow: 0 8px 22px rgba(201, 162, 59, 0.4);
}

.btt-fade-enter-active, .btt-fade-leave-active { transition: all 0.28s ease; }
.btt-fade-enter-from, .btt-fade-leave-to { opacity: 0; transform: translateY(16px); }

/* ─── Animations ─────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .brand-col { grid-column: span 2; }
}

@media (max-width: 768px) {
  .footer-inner { padding: 2rem 1.4rem 1.4rem; }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  .brand-col { grid-column: span 1; }

  .bottom-bar { flex-direction: column; align-items: flex-start; }

  .back-to-top { bottom: 1.2rem; right: 1.2rem; width: 38px; height: 38px; }
}

@media (max-width: 480px) {
  .footer-inner { padding: 1.6rem 1rem 1.2rem; }
  .bb-divider { display: none; }
  .bb-stats { gap: 1rem; }

  .brand-col { flex-direction: column; align-items: flex-start; }
}
</style>