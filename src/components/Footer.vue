<template>
  <footer id="footer" class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="footer-brand">
          <div class="brand-avatar">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
            <div class="avatar-status"></div>
          </div>
          <div class="brand-info">
            <h3 class="brand-name">KELVIN KAMAU</h3>
            <p class="brand-role">FULL STACK DEVELOPER</p>
            <div class="brand-stats">
              <div class="stat-item">
                <span class="stat-label">UPTIME</span>
                <span class="stat-value">{{ uptime }}</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-label">VERSION</span>
                <span class="stat-value">2.0.24</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Section -->
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

        <!-- Connect Section -->
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
              :class="social.id"
            >
              <i :class="social.icon"></i>
              <span>{{ social.name }}</span>
              <i class="fas fa-external-link-alt external-icon"></i>
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
            <div class="contact-row">
              <i class="fas fa-clock"></i>
              <div class="contact-detail">
                <span class="contact-label">TIMEZONE</span>
                <span>EAT (UTC+3)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="copyright">
          <i class="far fa-copyright"></i>
          <span
            >{{ new Date().getFullYear() }} Kelvin Kamau. All rights
            reserved.</span
          >
        </div>
        <div class="system-status">
          <div class="status-indicator"></div>
          <span>System Online</span>
          <div class="status-separator"></div>
          <span>Last deployed: {{ lastDeployed }}</span>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
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

const uptime = ref("0d 0h 0m");
const showBackToTop = ref(false);
const lastDeployed = ref("");

const navLinks = [
  { id: "about", text: "About" },
  { id: "skills", text: "Skills" },
  { id: "experience", text: "Experience" },
  { id: "projects", text: "Projects" },
  { id: "clients", text: "Clients" },
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

let uptimeInterval;

const updateUptime = () => {
  const startDate = new Date("2024-01-01");
  const now = new Date();
  const elapsed = now - startDate;

  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));

  uptime.value = `${days}d ${hours}h ${minutes}m`;
};

const setLastDeployed = () => {
  const date = new Date();
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  lastDeployed.value = formatted;
};

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
  updateUptime();
  uptimeInterval = setInterval(updateUptime, 60000);
  setLastDeployed();
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  if (uptimeInterval) clearInterval(uptimeInterval);
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.footer {
  position: relative;
  padding: 3rem 2rem 1.5rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-dark);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.8fr;
  gap: 3rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-dark);
}

/* Brand Section */
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
  border: 2px solid var(--accent);
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
  border: 2px solid var(--bg-primary);
  animation: pulse 2s ease-in-out infinite;
}

.brand-info {
  flex: 1;
}

.brand-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.brand-role {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  padding: 0.5rem 0.75rem;
  width: fit-content;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-label {
  font-size: 0.6rem;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-silver);
}

.stat-divider {
  width: 1px;
  height: 20px;
  background: var(--border-default);
}

/* Footer Section */
.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.15em;
  margin-bottom: 0.25rem;
}

/* Navigation Links */
.nav-links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s;
  padding: 0.2rem 0;
}

.link-marker {
  width: 4px;
  height: 4px;
  background: var(--border-default);
  transition: all 0.2s;
}

.nav-link:hover {
  color: var(--accent);
  transform: translateX(4px);
}

.nav-link:hover .link-marker {
  background: var(--accent);
  width: 8px;
}

/* Social Links */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.2s;
}

.social-link i:first-child {
  width: 20px;
  font-size: 1rem;
}

.external-icon {
  margin-left: auto;
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.social-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateX(4px);
}

.social-link:hover .external-icon {
  opacity: 1;
}

.social-link.github:hover {
  border-left: 3px solid #333;
}
.social-link.linkedin:hover {
  border-left: 3px solid #0077b5;
}
.social-link.twitter:hover {
  border-left: 3px solid #1da1f2;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.contact-row > i {
  width: 16px;
  color: var(--accent);
  font-size: 0.85rem;
  margin-top: 0.1rem;
}

.contact-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.contact-label {
  font-size: 0.6rem;
  color: var(--text-dim);
  letter-spacing: 0.08em;
}

.contact-detail span,
.contact-detail a {
  font-size: 0.8rem;
  color: var(--text-silver);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-detail a:hover {
  color: var(--accent);
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: var(--text-dim);
}

.copyright i {
  font-size: 0.7rem;
}

.system-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: var(--text-dim);
}

.status-indicator {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-separator {
  width: 1px;
  height: 12px;
  background: var(--border-default);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: var(--accent);
  border: none;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s;
  z-index: 900;
}

.back-to-top:hover {
  background: var(--accent-hover);
  transform: translateY(-4px);
}

.back-to-top:active {
  transform: translateY(0);
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
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

/* Responsive */
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

  .brand-stats {
    width: 100%;
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .system-status {
    justify-content: center;
  }

  .copyright {
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

  .brand-stats {
    justify-content: center;
  }

  .brand-name {
    font-size: 1rem;
  }

  .social-link {
    padding: 0.5rem;
  }

  .social-link span {
    display: none;
  }

  .social-link i:first-child {
    margin: 0;
  }

  .external-icon {
    margin-left: 0;
  }

  .contact-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .contact-row > i {
    width: auto;
  }
}
</style>
