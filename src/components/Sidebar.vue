<template>
  <div class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <!-- Logo -->
      <div class="logo" @click="scrollToTop">
        <div class="logo-mark">
          <div class="mark-avatar">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
          </div>
          <div class="mark-bracket mark-bracket-tl"></div>
          <div class="mark-bracket mark-bracket-br"></div>
          <div class="mark-status"></div>
        </div>
      </div>

      <!-- Desktop Nav -->
      <nav class="desktop-nav">
        <a
          v-for="(link, idx) in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          @click="navigateToSection(link.id)"
          :class="{ active: activeSection === link.id }"
          class="nav-link"
        >
          <span class="nav-idx">{{ String(idx + 1).padStart(2, "0") }}</span>
          <span class="nav-text">{{ link.text }}</span>
        </a>
      </nav>

      <!-- CTA + Hamburger -->
      <div class="nav-right">
        <a
          href="#contact"
          class="nav-cta"
          @click.prevent="navigateToSection('contact')"
        >
          <span>HIRE ME</span>
        </a>
        <button
          class="menu-toggle"
          @click="toggleMobileMenu"
          :class="{ open: isMobileMenuOpen }"
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Accent Line -->
    <div class="nav-accent-line"></div>

    <!-- Mobile Menu -->
    <div
      class="mobile-overlay"
      :class="{ active: isMobileMenuOpen }"
      @click="toggleMobileMenu"
    >
      <div class="mobile-panel" @click.stop>
        <!-- Mobile Top -->
        <div class="mobile-top">
          <div class="mobile-logo">
            <div class="mark-avatar small">
              <img src="/profile.JPG" alt="Kelvin Kamau" />
            </div>
            <div>
              <div class="mobile-name">KELVIN KAMAU</div>
              <div class="mobile-role">Full Stack Developer</div>
            </div>
          </div>
          <button
            class="mobile-close"
            @click="toggleMobileMenu"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile Nav -->
        <nav class="mobile-nav">
          <a
            v-for="(link, idx) in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            @click="navigateToSection(link.id)"
            :class="{ active: activeSection === link.id }"
            class="mobile-link"
          >
            <span class="ml-idx">{{ String(idx + 1).padStart(2, "0") }}</span>
            <span class="ml-text">{{ link.text }}</span>
            <span class="ml-arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </nav>

        <!-- Mobile CTA -->
        <div class="mobile-cta-wrap">
          <a
            href="#contact"
            class="mobile-cta"
            @click.prevent="navigateToSection('contact')"
          >
            <span>HIRE ME</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Mobile Footer -->
        <div class="mobile-footer">
          <div class="mobile-socials">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              :href="social.url"
              target="_blank"
              :aria-label="social.name"
              class="mobile-social"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
          <div class="mobile-available">
            <span class="avail-dot"></span>
            <span>Available for opportunities</span>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "";
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
  const sections = navLinks.map((l) => document.getElementById(l.id));
  let current = "";
  sections.forEach((s) => {
    if (!s) return;
    const r = s.getBoundingClientRect();
    if (r.top <= 120 && r.bottom >= 120) current = s.id;
  });
  if (current) activeSection.value = current;
};

const navigateToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-inner {
  max-width: 1400px;
  margin: 0 auto;
  height: var(--nav-height);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* ========== Accent Line ========== */
.nav-accent-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled .nav-accent-line {
  transform: scaleX(1);
}

/* ========== Logo Mark ========== */
.logo {
  cursor: pointer;
  flex-shrink: 0;
}

.logo-mark {
  position: relative;
  width: 42px;
  height: 42px;
}

.mark-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  filter: grayscale(100%) contrast(1.15);
  transition: filter 0.4s;
}

.logo:hover .mark-avatar {
  filter: grayscale(0%) contrast(1);
}

.mark-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mark-bracket {
  position: absolute;
  width: 8px;
  height: 8px;
}

.mark-bracket-tl {
  top: -2px;
  left: -2px;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}

.mark-bracket-br {
  bottom: -2px;
  right: -2px;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}

.mark-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--bg-primary);
  transition: border-color 0.3s;
}

.navbar.scrolled .mark-status {
  border-color: rgba(0, 0, 0, 0.92);
}

/* ========== Desktop Nav ========== */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
}

.nav-idx {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.05em;
  transition: color 0.2s;
  min-width: 14px;
}

.nav-text {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  transition: color 0.2s;
}

.nav-link:hover .nav-text {
  color: var(--text-silver);
}

.nav-link:hover .nav-idx {
  color: var(--text-dim);
}

.nav-link.active .nav-text {
  color: var(--accent);
}

.nav-link.active .nav-idx {
  color: var(--accent);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0.85rem;
  right: 0.85rem;
  height: 2px;
  background: var(--accent);
}

/* ========== Right Section ========== */
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-cta {
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1.1rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.nav-cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.nav-cta:hover::before {
  transform: translateX(100%);
}

.nav-cta:hover {
  box-shadow: 0 0 20px rgba(255, 94, 0, 0.3);
}

/* ========== Hamburger ========== */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 1px solid var(--border-dark);
  cursor: pointer;
  padding: 8px;
  transition: border-color 0.2s;
}

.menu-toggle:hover {
  border-color: var(--accent);
}

.menu-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text-silver);
  transition: all 0.3s;
  border-radius: 1px;
}

.menu-toggle.open {
  border-color: var(--accent);
}

.menu-toggle.open span:nth-child(1) {
  transform: rotate(45deg) translate(4.5px, 4.5px);
  background: var(--accent);
}
.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}
.menu-toggle.open span:nth-child(3) {
  transform: rotate(-45deg) translate(4.5px, -4.5px);
  background: var(--accent);
}

/* ========== Mobile Overlay ========== */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 90%;
  max-width: 420px;
  height: 100%;
  background: var(--bg-primary);
  border-left: 1px solid var(--border-dark);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.mobile-overlay.active .mobile-panel {
  transform: translateX(0);
}

/* Mobile Top */
.mobile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-dark);
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mark-avatar.small {
  width: 40px;
  height: 40px;
}

.mobile-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-white);
  letter-spacing: 0.06em;
}

.mobile-role {
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.mobile-close {
  background: none;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px;
  display: flex;
  transition: all 0.2s;
}

.mobile-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Mobile Nav */
.mobile-nav {
  flex: 1;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 2px solid var(--border-dark);
}

.mobile-link:hover {
  background: var(--bg-card);
  border-left-color: var(--border-default);
}

.mobile-link.active {
  background: var(--accent-dim);
  border-left-color: var(--accent);
}

.ml-idx {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.05em;
  min-width: 20px;
  transition: color 0.2s;
}

.mobile-link.active .ml-idx {
  color: var(--accent);
}

.ml-text {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-silver);
  letter-spacing: 0.06em;
  flex: 1;
  transition: color 0.2s;
}

.mobile-link:hover .ml-text {
  color: var(--text-white);
}

.mobile-link.active .ml-text {
  color: var(--accent);
}

.ml-arrow {
  color: var(--text-dim);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.25s;
  display: flex;
}

.mobile-link:hover .ml-arrow,
.mobile-link.active .ml-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

/* Mobile CTA */
.mobile-cta-wrap {
  padding: 0 1rem;
}

.mobile-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.25s;
}

.mobile-cta:hover {
  box-shadow: 0 0 24px rgba(255, 94, 0, 0.3);
}

/* Mobile Footer */
.mobile-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-dark);
  margin-top: auto;
}

.mobile-socials {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.mobile-social {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: all 0.2s;
}

.mobile-social:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 12px rgba(255, 94, 0, 0.1);
}

.mobile-available {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.avail-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

/* ========== Animations ========== */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* ========== Responsive ========== */
@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }
  .nav-cta {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
  .navbar-inner {
    padding: 0 1.25rem;
  }
}

@media (max-width: 480px) {
  .navbar-inner {
    padding: 0 1rem;
  }
  .mobile-panel {
    width: 100%;
    max-width: none;
  }
  .mobile-top {
    padding: 1rem;
  }
  .mobile-nav {
    padding: 1rem 0.75rem;
  }
  .mobile-link {
    padding: 0.85rem 0.75rem;
  }
  .ml-text {
    font-size: 1rem;
  }
}
</style>
