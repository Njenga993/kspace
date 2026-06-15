<template>
  <footer id="footer" class="footer">
    <div class="footer-container">
      <!-- Top Bar - Matching hero status bar -->
      <div class="footer-topbar">
        <div class="topbar-id">
          <span class="id-dot"></span>
          <span class="id-text">KELVIN KAMAU</span>
        </div>
        <div class="topbar-status">
          <span class="status-dot"></span>
          <span class="status-text">SYSTEM OPERATIONAL</span>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="footer-grid">
        <!-- Column 1: Brand -->
        <div class="footer-brand">
          <div class="brand-avatar">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
            <div class="avatar-status"></div>
          </div>
          <div class="brand-info">
            <h3 class="brand-name">KELVIN KAMAU</h3>
            <p class="brand-role">FULL STACK DEVELOPER</p>
            <p class="brand-tagline">
              Building robust, scalable systems that drive business growth.
            </p>
          </div>
        </div>

        <!-- Column 2: Navigation -->
        <div class="footer-section">
          <h4 class="section-title">NAVIGATION</h4>
          <ul class="nav-links">
            <li v-for="link in navLinks" :key="link.id">
              <a
                :href="`#${link.id}`"
                @click="scrollToSection(link.id)"
                class="nav-link"
              >
                <span class="link-marker"></span>
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Connect -->
        <div class="footer-section">
          <h4 class="section-title">CONNECT</h4>
          <div class="social-links">
            <a
              v-for="social in socialLinks"
              :key="social.id"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >
              <i :class="social.icon"></i>
              <span>{{ social.name }}</span>
            </a>
          </div>
          <div class="contact-info">
            <div class="contact-row">
              <i class="fas fa-envelope"></i>
              <div class="contact-detail">
                <span class="contact-label">EMAIL</span>
                <a href="mailto:njengak993@gmail.com">njengak993@gmail.com</a>
              </div>
            </div>
            <div class="contact-row">
              <i class="fas fa-map-marker-alt"></i>
              <div class="contact-detail">
                <span class="contact-label">LOCATION</span>
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 4: Expertise - Matching hero badge style -->
        <div class="footer-section">
          <h4 class="section-title">EXPERTISE</h4>
          <div class="expertise-badges">
            <span class="expertise-badge">Full Stack Development</span>
            <span class="expertise-badge">SaaS Architecture</span>
            <span class="expertise-badge">API Design</span>
            <span class="expertise-badge">Cloud Infrastructure</span>
            <span class="expertise-badge">Performance Optimization</span>
            <span class="expertise-badge">System Design</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar - Matching hero trust stats -->
      <div class="footer-bottombar">
        <div class="bottom-stats">
          <div class="b-stat">
            <span class="b-stat-num">03+</span>
            <span class="b-stat-label">YEARS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">20+</span>
            <span class="b-stat-label">PROJECTS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">100%</span>
            <span class="b-stat-label">COMMITTED</span>
          </div>
        </div>
        <div class="bottom-copyright">
          <i class="far fa-copyright"></i>
          <span>{{ new Date().getFullYear() }} Kelvin Kamau. All rights reserved.</span>
        </div>
      </div>
    </div>

    <!-- Back to Top - Matching hero button style -->
    <transition name="fade-up">
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="back-to-top"
        aria-label="Back to top"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </transition>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showBackToTop = ref(false);

const navLinks = [
  { id: "about", text: "About" },
  { id: "skills", text: "Skills" },
  { id: "experience", text: "Experience" },
  { id: "projects", text: "Projects" },
  { id: "contact", text: "Contact" },
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
    id: "twitter",
    name: "Twitter",
    icon: "fab fa-twitter",
    url: "https://x.com/kamau_nje",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 400;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
/* ==============================
   FOOTER
   ============================== */
.footer {
  position: relative;
  padding: 2.5rem 2rem 1.5rem;
  background: var(--bg-primary, #0b0f13);
  border-top: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ==============================
   TOP BAR - Matching hero status bar
   ============================== */
.footer-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
}

.topbar-id {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.id-dot {
  width: 6px;
  height: 6px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
}

.id-text {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted, #7b8694);
  letter-spacing: 0.2em;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: softPulse 2s infinite;
}

.status-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.15em;
}

/* ==============================
   FOOTER GRID
   ============================== */
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 3rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
}

/* ==============================
   BRAND SECTION
   ============================== */
.footer-brand {
  display: flex;
  gap: 1rem;
}

.brand-avatar {
  position: relative;
  flex-shrink: 0;
  width: 64px;
  height: 64px;
}

.brand-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent, #c9a23b);
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.brand-avatar:hover img {
  filter: grayscale(0%);
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--bg-primary, #0b0f13);
  animation: softPulse 2s infinite;
}

.brand-info {
  flex: 1;
}

.brand-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white, #f0f2f5);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.brand-role {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.brand-tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ==============================
   FOOTER SECTION
   ============================== */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.12em;
  margin: 0;
}

/* Navigation Links */
.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s;
  padding: 0.2rem 0;
}

.link-marker {
  width: 4px;
  height: 4px;
  background: var(--border-default, rgba(201, 162, 59, 0.25));
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--accent, #c9a23b);
  transform: translateX(4px);
}

.nav-link:hover .link-marker {
  background: var(--accent, #c9a23b);
  width: 8px;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
  transform: translateY(-2px);
}

.social-link span {
  display: none;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.contact-row > i {
  width: 14px;
  color: var(--accent, #c9a23b);
  font-size: 0.75rem;
  margin-top: 0.1rem;
}

.contact-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.contact-label {
  font-size: 0.55rem;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.08em;
}

.contact-detail span,
.contact-detail a {
  font-size: 0.75rem;
  color: var(--text-silver, #b0b8c1);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-detail a:hover {
  color: var(--accent, #c9a23b);
}

/* ==============================
   EXPERTISE BADGES - Matching hero badge style
   ============================== */
.expertise-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.expertise-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
  border-radius: 2rem;
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-silver);
  transition: 0.2s;
}

.expertise-badge:hover {
  border-color: var(--accent, #c9a23b);
  background: #1e262e;
}

/* ==============================
   BOTTOM BAR - Matching hero trust stats
   ============================== */
.footer-bottombar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.bottom-stats {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.b-stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.b-stat-num {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: -0.01em;
}

.b-stat-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.1em;
}

.b-stat-sep {
  color: var(--border-default, rgba(201, 162, 59, 0.25));
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0.15rem;
}

.bottom-copyright {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.65rem;
  color: var(--text-dim);
}

.bottom-copyright i {
  font-size: 0.65rem;
}

/* ==============================
   BACK TO TOP - Matching hero button
   ============================== */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: var(--accent, #c9a23b);
  border: none;
  color: #0b0f13;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s;
  z-index: 900;
  box-shadow: 0 6px 18px rgba(201, 162, 59, 0.2);
}

.back-to-top:hover {
  background: #dbb24a;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(201, 162, 59, 0.3);
}

/* ==============================
   ANIMATIONS
   ============================== */
@keyframes softPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ==============================
   RESPONSIVE
   ============================== */
@media (max-width: 968px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-brand {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1.5rem 1rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-brand {
    grid-column: span 1;
  }

  .footer-bottombar {
    flex-direction: column;
    text-align: center;
  }

  .bottom-stats {
    justify-content: center;
  }

  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 1rem 1rem;
  }

  .footer-brand {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .brand-avatar {
    width: 80px;
    height: 80px;
  }
}
</style>