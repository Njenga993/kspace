<template>
  <div class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <!-- Logo -->
      <div class="logo" @click="scrollToTop">
        <div class="logo-mark">
          <div class="mark-photo">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
          </div>
          <div class="mark-corner mark-tl"></div>
          <div class="mark-corner mark-br"></div>
          <div class="mark-dot"></div>
        </div>
      </div>

      <!-- Desktop Nav -->
      <nav class="desk-nav">
        <a
          v-for="(link, idx) in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          @click="navigateToSection(link.id)"
          :class="{ active: activeSection === link.id }"
          class="desk-link"
        >
          <span class="dl-num">{{ String(idx + 1).padStart(2, "0") }}</span>
          <span class="dl-text">{{ link.text }}</span>
        </a>
      </nav>

      <!-- CTA + Hamburger -->
      <div class="nav-end">
        <a
          href="#contact"
          class="nav-cta"
          @click.prevent="navigateToSection('contact')"
        >
          HIRE ME
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

  <!-- Mobile Overlay -->
  <transition name="mob-overlay">
    <div v-if="isMobileMenuOpen" class="mob-overlay" @click="toggleMobileMenu">
      <transition name="mob-panel">
        <div v-if="isMobileMenuOpen" class="mob-panel" @click.stop>
          <!-- Panel Header -->
          <div class="mp-head">
            <div class="mp-logo">
              <div class="mark-photo sm">
                <img src="/profile.JPG" alt="Kelvin Kamau" />
              </div>
              <div>
                <div class="mp-name">KELVIN KAMAU</div>
                <div class="mp-role">Full Stack Developer</div>
              </div>
            </div>
            <button
              class="mp-close"
              @click="toggleMobileMenu"
              aria-label="Close"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Panel Nav -->
          <nav class="mp-nav">
            <a
              v-for="(link, idx) in navLinks"
              :key="link.id"
              :href="`#${link.id}`"
              @click="navigateToSection(link.id)"
              :class="{ active: activeSection === link.id }"
              class="mp-link"
            >
              <span class="mpl-num">{{
                String(idx + 1).padStart(2, "0")
              }}</span>
              <span class="mpl-text">{{ link.text }}</span>
              <i class="fas fa-arrow-right mpl-arrow"></i>
            </a>
          </nav>

          <!-- Panel CTA -->
          <div class="mp-cta-wrap">
            <a
              href="#contact"
              class="mp-cta"
              @click.prevent="navigateToSection('contact')"
            >
              HIRE ME
            </a>
          </div>

          <!-- Panel Footer -->
          <div class="mp-foot">
            <div class="mp-socials">
              <a
                v-for="social in socialLinks"
                :key="social.id"
                :href="social.url"
                target="_blank"
                rel="noopener"
                :aria-label="social.name"
                class="mp-social"
              >
                <i :class="social.icon"></i>
              </a>
            </div>
            <div class="mp-status">
              <span class="mp-status-dot"></span>
              <span>Available for opportunities</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const navLinks = [
  { id: "about", text: "ABOUT" },
  { id: "skills", text: "SKILLS" },
  { id: "experience", text: "EXPERIENCE" },
  { id: "projects", text: "PROJECTS" },
  { id: "contact", text: "CONTACT" },
];

const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/Njenga993",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/kelvin-kamau-788160277/",
  },
  {
    id: "email",
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:njengak993@gmail.com",
  },
];

const isScrolled = ref(false);
const activeSection = ref("");
const isMobileMenuOpen = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "";
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;

  const sections = navLinks.map((l) => document.getElementById(l.id));
  let current = "";
  for (let i = sections.length - 1; i >= 0; i--) {
    const s = sections[i];
    if (!s) continue;
    const r = s.getBoundingClientRect();
    if (r.top <= 140) {
      current = s.id;
      break;
    }
  }
  if (current) activeSection.value = current;
};

const navigateToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  activeSection.value = id;
  isMobileMenuOpen.value = false;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  activeSection.value = "";
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? "hidden" : "";
};

const handleEscape = (e) => {
  if (e.key === "Escape" && isMobileMenuOpen.value) toggleMobileMenu();
};
</script>

<style scoped>
/* ==============================
   NAVBAR
   ============================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition:
    background 0.3s ease,
    border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.92);
  border-bottom-color: var(--border-dark);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.navbar-inner {
  max-width: 1400px;
  margin: 0 auto;
  height: var(--nav-height, 64px);
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ==============================
   LOGO — geometric clipped
   (matches about section avatar)
   ============================== */
.logo {
  cursor: pointer;
  flex-shrink: 0;
}

.logo-mark {
  position: relative;
  width: 40px;
  height: 40px;
}

.mark-photo {
  width: 100%;
  height: 100%;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%);
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.4s ease;
}

.mark-photo.sm {
  width: 36px;
  height: 36px;
}

.logo:hover .mark-photo {
  filter: grayscale(0%);
}

.mark-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}

/* Crosshair corner marks (matches hero bg marks) */
.mark-corner {
  position: absolute;
  width: 10px;
  height: 10px;
}

.mark-tl {
  top: -3px;
  left: -3px;
  border-top: 1.5px solid var(--accent);
  border-left: 1.5px solid var(--accent);
}

.mark-br {
  bottom: -3px;
  right: -3px;
  border-bottom: 1.5px solid var(--accent);
  border-right: 1.5px solid var(--accent);
}

/* Green status dot */
.mark-dot {
  position: absolute;
  bottom: 0;
  right: 2px;
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  border: 1.5px solid var(--bg-primary);
  transition: border-color 0.3s ease;
  animation: pulse 2s infinite;
}

.navbar.scrolled .mark-dot {
  border-color: rgba(0, 0, 0, 0.92);
}

/* ==============================
   DESKTOP NAV — underline tabs
   (matches experience/project filters)
   ============================== */
.desk-nav {
  display: flex;
  align-items: center;
}

.desk-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.9rem;
  height: var(--nav-height, 64px);
  text-decoration: none;
  position: relative;
  transition: color 0.2s ease;
}

.desk-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0.9rem;
  right: 0.9rem;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s ease;
}

.desk-link.active::after {
  transform: scaleX(1);
}

.dl-num {
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  min-width: 14px;
  transition: color 0.2s ease;
}

.dl-text {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.desk-link:hover .dl-text {
  color: var(--text-silver);
}

.desk-link:hover .dl-num {
  color: var(--text-dim);
}

.desk-link.active .dl-text {
  color: var(--accent);
}

.desk-link.active .dl-num {
  color: var(--accent);
}

/* ==============================
   NAV END — CTA + Hamburger
   ============================== */
.nav-end {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1.15rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.25s ease;
}

.nav-cta:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 20px rgba(255, 94, 0, 0.2);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 8px;
  background: none;
  border: 1px solid var(--border-dark);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.hamburger:hover {
  border-color: var(--accent);
}

.hamburger span {
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--text-silver);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open {
  border-color: var(--accent);
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(3.5px, 3.5px);
  background: var(--accent);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(3.5px, -3.5px);
  background: var(--accent);
}

/* ==============================
   MOBILE OVERLAY
   ============================== */
.mob-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

.mob-overlay-enter-active,
.mob-overlay-leave-active {
  transition: opacity 0.25s ease;
}

.mob-overlay-enter-from,
.mob-overlay-leave-to {
  opacity: 0;
}

/* ==============================
   MOBILE PANEL
   ============================== */
.mob-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 88%;
  max-width: 400px;
  height: 100%;
  background: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  display: flex;
  flex-direction: column;
}

.mob-panel-enter-active,
.mob-panel-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mob-panel-enter-from,
.mob-panel-leave-to {
  transform: translateX(100%);
}

/* Panel Header */
.mp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-dark);
  flex-shrink: 0;
}

.mp-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mp-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-white);
  letter-spacing: 0.06em;
}

.mp-role {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-top: 0.1rem;
}

.mp-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mp-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Panel Nav — left-border tabs
   (matches about sidebar style) */
.mp-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.mp-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.95rem 1rem;
  text-decoration: none;
  border-left: 2px solid var(--border-dark);
  transition: all 0.2s ease;
}

.mp-link:hover {
  background: rgba(255, 255, 255, 0.015);
  border-left-color: var(--border-default);
}

.mp-link.active {
  background: rgba(255, 94, 0, 0.04);
  border-left-color: var(--accent);
}

.mpl-num {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  min-width: 18px;
  transition: color 0.2s ease;
}

.mp-link.active .mpl-num {
  color: var(--accent);
}

.mpl-text {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-silver);
  letter-spacing: 0.06em;
  flex: 1;
  transition: color 0.2s ease;
}

.mp-link:hover .mpl-text {
  color: var(--text-white);
}

.mp-link.active .mpl-text {
  color: var(--accent);
}

.mpl-arrow {
  font-size: 0.65rem;
  color: var(--text-dim);
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.25s ease;
}

.mp-link:hover .mpl-arrow,
.mp-link.active .mpl-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

/* Panel CTA */
.mp-cta-wrap {
  padding: 0 1rem;
  flex-shrink: 0;
}

.mp-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.8rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.25s ease;
}

.mp-cta:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 20px rgba(255, 94, 0, 0.2);
}

/* Panel Footer */
.mp-foot {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-dark);
  flex-shrink: 0;
}

.mp-socials {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mp-social {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mp-social:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.mp-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border-dark);
  font-size: 0.68rem;
  color: var(--text-muted);
}

.mp-status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

/* ==============================
   ANIMATIONS
   ============================== */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ==============================
   RESPONSIVE
   ============================== */
@media (max-width: 960px) {
  .desk-nav {
    display: none;
  }

  .nav-cta {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .navbar-inner {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .navbar-inner {
    padding: 0 1rem;
  }

  .mob-panel {
    width: 100%;
    max-width: none;
  }

  .mp-head {
    padding: 1rem 1.25rem;
  }

  .mp-nav {
    padding: 0.75rem;
  }

  .mp-link {
    padding: 0.85rem 0.85rem;
  }

  .mpl-text {
    font-size: 0.95rem;
  }

  .mp-foot {
    padding: 1rem 1.25rem;
  }

  .mp-cta-wrap {
    padding: 0 0.75rem;
  }
}
</style>
