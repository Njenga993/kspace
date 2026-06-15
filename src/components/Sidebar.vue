<template>
  <div class="navbar-wrapper">
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
    <div class="navbar" :class="{ scrolled: isScrolled }">
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

        <!-- Center: Navigation pills -->
        <nav class="desk-nav">
          <div class="nav-pill-track">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              @click.prevent="navigateToSection(link.id)"
              :class="{ active: activeSection === link.id }"
              class="nav-pill"
            >
              <i :class="link.icon"></i>
              {{ link.text }}
            </a>
          </div>
        </nav>

        <!-- Right: Actions -->
        <div class="nav-end">
          <div class="open-badge">
            <span class="badge-dot"></span>
            <span>Open to work</span>
          </div>
          <a href="#" class="hire-btn">
            <i class="fas fa-download"></i> Download CV
          </a>
          <button
            class="hamburger"
            :class="{ open: isMobileMenuOpen }"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Panel -->
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
                <i class="fas fa-times"></i>
              </button>
            </div>

            <nav class="mp-nav">
              <a
                v-for="(link, idx) in navLinks"
                :key="link.id"
                :href="`#${link.id}`"
                @click.prevent="navigateToSection(link.id)"
                :class="{ active: activeSection === link.id }"
                class="mp-link"
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
                <i class="fas fa-comment-dots"></i> Hire Me
              </a>
            </div>

          </div>
        </transition>
      </div>
    </transition>
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

const isScrolled        = ref(false)
const activeSection     = ref('')
const isMobileMenuOpen  = ref(false)
const showNotification  = ref(true)

const dismissNotification = () => { showNotification.value = false }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
  const sections = navLinks.map(l => document.getElementById(l.id))
  let current = ''
  for (let i = sections.length - 1; i >= 0; i--) {
    const s = sections[i]
    if (!s) continue
    if (s.getBoundingClientRect().top <= 160) { current = s.id; break }
  }
  if (current) activeSection.value = current
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  activeSection.value = ''
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) toggleMobileMenu()
}
</script>

<style scoped>
/* ─── Tokens ────────────────────────────────────────────── */
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

/* ─── Wrapper ────────────────────────────────────────────── */
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* ─── Notification bar ───────────────────────────────────── */
.notification-bar {
  background: #0d1117;
  border-bottom: 1px solid rgba(201, 162, 59, 0.2);
}

.notif-inner {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0.5rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.notif-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.notif-dot {
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(46, 204, 113, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.notif-text {
  font-size: 0.71rem;
  color: var(--muted);
  letter-spacing: 0.02em;
}

.notif-text strong {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.notif-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}

.notif-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.9rem;
  border: 1px solid var(--accent-border);
  border-radius: 3rem;
  font-size: 0.64rem;
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 0.07em;
  transition: background 0.2s;
}

.notif-cta:hover {
  background: var(--accent-dim);
}

.notif-cta svg { transition: transform 0.2s; }
.notif-cta:hover svg { transform: translateX(3px); }

.notif-close {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--dim);
  cursor: pointer;
  transition: color 0.2s;
}
.notif-close:hover { color: var(--accent); }

.notif-slide-enter-active,
.notif-slide-leave-active { transition: all 0.3s ease; }
.notif-slide-enter-from,
.notif-slide-leave-to { opacity: 0; transform: translateY(-100%); }

/* ─── Main navbar ────────────────────────────────────────── */
.navbar {
  background: rgba(13, 17, 23, 0.88);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(13, 17, 23, 0.97);
  border-bottom-color: var(--border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.navbar-inner {
  max-width: 1380px;
  margin: 0 auto;
  height: 66px;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* ─── Logo ───────────────────────────────────────────────── */
.logo-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-mark {
  position: relative;
  flex-shrink: 0;
}

.logo-photo {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
  border: 1.5px solid var(--accent-border);
  filter: grayscale(20%);
  transition: filter 0.3s;
}

.logo-block:hover .logo-photo {
  filter: grayscale(0%);
}

.logo-status {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 9px;
  height: 9px;
  background: var(--green);
  border-radius: 50%;
  border: 2px solid #0d1117;
  animation: pulse 2s infinite;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
}

.logo-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.01em;
  line-height: 1;
}

.logo-role {
  font-size: 0.64rem;
  color: var(--muted);
  letter-spacing: 0.04em;
}

/* ─── Desktop nav pills ──────────────────────────────────── */
.desk-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-pill-track {
  display: inline-flex;
  align-items: center;
  background: #161b22;
  border: 1px solid var(--border);
  border-radius: 3rem;
  padding: 0.3rem 0.35rem;
  gap: 0.15rem;
}

.nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.46rem 1.1rem;
  border-radius: 3rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.nav-pill i {
  font-size: 0.72rem;
}

.nav-pill:hover {
  color: var(--silver);
  background: rgba(255, 255, 255, 0.05);
}

.nav-pill.active {
  background: var(--accent);
  color: #0d1117;
}

/* ─── Nav end ────────────────────────────────────────────── */
.nav-end {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-shrink: 0;
}

.open-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.9rem;
  border: 1px solid rgba(46, 204, 113, 0.25);
  border-radius: 3rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--green);
  border-radius: 50%;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.hire-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent);
  color: #0d1117;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.55rem 1.3rem;
  border-radius: 3rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(201, 162, 59, 0.2);
  white-space: nowrap;
}

.hire-btn:hover {
  background: #dbb24a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(201, 162, 59, 0.3);
}

/* ─── Hamburger ──────────────────────────────────────────── */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 8px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: border-color 0.2s;
}

.hamburger:hover { border-color: var(--accent-border); }

.hamburger span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--silver);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open { border-color: var(--accent-border); }
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(3.5px, 3.5px); background: var(--accent); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(3.5px, -3.5px); background: var(--accent); }

/* ─── Mobile overlay ─────────────────────────────────────── */
.mob-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 999;
}

.mob-overlay-enter-active,
.mob-overlay-leave-active { transition: opacity 0.25s ease; }
.mob-overlay-enter-from,
.mob-overlay-leave-to { opacity: 0; }

/* ─── Mobile panel ───────────────────────────────────────── */
.mob-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 380px;
  height: 100%;
  background: #0d1117;
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.mob-panel-enter-active,
.mob-panel-leave-active { transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1); }
.mob-panel-enter-from,
.mob-panel-leave-to { transform: translateX(100%); }

.mp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.mp-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mp-photo {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 15%;
  border: 1.5px solid var(--accent-border);
}

.mp-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--white);
  letter-spacing: 0.02em;
}

.mp-role {
  font-size: 0.64rem;
  color: var(--muted);
  margin-top: 0.1rem;
}

.mp-close {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--muted);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;
}
.mp-close:hover { border-color: var(--accent-border); color: var(--accent); }

.mp-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.mp-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s;
}

.mp-link:hover { background: rgba(255, 255, 255, 0.04); }
.mp-link.active { background: var(--accent-dim); }

.mpl-num {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--dim);
  letter-spacing: 0.04em;
  min-width: 18px;
}

.mpl-icon {
  font-size: 0.8rem;
  color: var(--accent);
  width: 14px;
  text-align: center;
}

.mpl-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--silver);
  flex: 1;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}

.mp-link:hover .mpl-text,
.mp-link.active .mpl-text { color: var(--white); }
.mp-link.active .mpl-num { color: var(--accent); }

.mpl-arrow {
  font-size: 0.62rem;
  color: var(--dim);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.2s;
}

.mp-link:hover .mpl-arrow,
.mp-link.active .mpl-arrow { opacity: 1; transform: translateX(0); color: var(--accent); }

.mp-foot {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mp-socials {
  display: flex;
  gap: 0.5rem;
}

.mp-social {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--muted);
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s;
}
.mp-social:hover { border-color: var(--accent-border); color: var(--accent); }

.mp-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  background: var(--accent);
  color: #0d1117;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(201, 162, 59, 0.2);
}
.mp-cta:hover { background: #dbb24a; box-shadow: 0 8px 20px rgba(201, 162, 59, 0.3); }

/* ─── Pulse animation ────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 1080px) {
  .open-badge { display: none; }
}

@media (max-width: 900px) {
  .desk-nav  { display: none; }
  .hire-btn  { display: none; }
  .hamburger { display: flex; }
  .navbar-inner { padding: 0 1.5rem; }
}

@media (max-width: 640px) {
  .navbar-inner { padding: 0 1rem; }
  .logo-text { display: none; }

  .notif-inner {
    padding: 0.5rem 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
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
</style>