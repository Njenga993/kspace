<template>
  <section class="hero">
    <!-- Background Pattern (desktop only) -->
    <div class="hero-bg desktop-only">
      <div class="bg-grid"></div>
      <div class="bg-corner bg-corner-tl"></div>
      <div class="bg-corner bg-corner-br"></div>
    </div>

    <!-- Mobile Background Image (hero section only) -->
    <div class="hero-bg-mobile mobile-only"></div>

    <div class="hero-container">
      <!-- Left Column - Content -->
      <div class="hero-content">
        <div class="hero-label">
          <span class="label-text">KELVIN KAMAU</span>
          <span class="label-line"></span>
        </div>

        <h1 class="hero-title">
          <span class="title-line">Crafting Digital</span>
          <span class="title-line accent">Solutions That Matter</span>
        </h1>

        <div class="hero-role">
          <span class="role-prefix">&gt;</span>
          <span class="role-text">{{ currentRole }}</span>
          <span class="role-cursor"></span>
        </div>

        <p class="hero-description">
          Full-stack developer specializing in building exceptional digital
          experiences. I transform complex problems into elegant, performant
          solutions that drive results.
        </p>

        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">3+</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-value">12+</div>
            <div class="stat-label">Projects Completed</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <div class="stat-value">100%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
        </div>

        <div class="hero-actions">
          <a href="#projects" class="btn-primary">
            <span>VIEW PORTFOLIO</span>
            <i class="fas fa-arrow-right"></i>
          </a>
          <a href="#contact" class="btn-secondary">
            <i class="fas fa-comment"></i>
            <span>LET'S TALK</span>
          </a>
        </div>

        <div class="hero-socials">
          <a href="https://github.com/Njenga993" target="_blank" rel="noopener">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/kelvin-kamau-788160277/"
            target="_blank"
            rel="noopener"
          >
            <i class="fab fa-linkedin-in"></i>
            <span>LinkedIn</span>
          </a>
          <a href="mailto:njengak993@gmail.com">
            <i class="fas fa-envelope"></i>
            <span>Email</span>
          </a>
        </div>
      </div>

      <!-- Right Column - Visual (desktop only) -->
      <div class="hero-visual desktop-only">
        <div class="image-frame">
          <div class="image-container">
            <img src="/heroimage.png" alt="Kelvin Kamau" />
            <div class="image-border"></div>
          </div>
        </div>

        <div class="info-panel">
          <div class="info-item">
            <div class="info-label">AVAILABILITY</div>
            <div class="info-value">
              <span class="status-dot"></span>
              OPEN FOR WORK
            </div>
          </div>
          <div class="info-divider"></div>
          <div class="info-item">
            <div class="info-label">LOCATION</div>
            <div class="info-value">NAIROBI, KE</div>
          </div>
          <div class="info-divider"></div>
          <div class="info-item">
            <div class="info-label">EXPERTISE</div>
            <div class="info-value">FULL STACK</div>
          </div>
        </div>

        <div class="scroll-indicator">
          <span class="scroll-text">SCROLL</span>
          <div class="scroll-line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const roles = [
  "FULL STACK DEVELOPER",
  "REACT SPECIALIST",
  "UI ENGINEER",
  "OPEN SOURCE CONTRIBUTOR",
];

const currentRole = ref(roles[0]);

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer = null;

const typeRole = () => {
  const fullText = roles[roleIdx];

  if (isDeleting) {
    currentRole.value = fullText.substring(0, charIdx - 1);
    charIdx--;
  } else {
    currentRole.value = fullText.substring(0, charIdx + 1);
    charIdx++;
  }

  if (!isDeleting && charIdx === fullText.length) {
    isDeleting = true;
    typingTimer = setTimeout(typeRole, 2000);
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    typingTimer = setTimeout(typeRole, 500);
  } else {
    const delay = isDeleting ? 40 : 100;
    typingTimer = setTimeout(typeRole, delay);
  }
};

onMounted(() => {
  typeRole();
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  overflow: hidden;
}

/* Utility Classes */
.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

/* Background Elements - Desktop */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--border-default) 1px, transparent 1px),
    linear-gradient(90deg, var(--border-default) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.05;
}

.bg-corner {
  position: absolute;
  width: 40px;
  height: 40px;
}

.bg-corner-tl {
  top: 2rem;
  left: 2rem;
  border-top: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}

.bg-corner-br {
  bottom: 2rem;
  right: 2rem;
  border-bottom: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}

/* Mobile Background - Hero Section Only */
.hero-bg-mobile {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url("/heroimage.png");
  background-size: cover;
  background-position: center 30%;
  filter: grayscale(60%) contrast(1.1);
}

.hero-bg-mobile::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
}

/* Main Container */
.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

/* Left Column - Content */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label-text {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.2em;
}

.label-line {
  flex: 1;
  height: 1px;
  background: var(--border-default);
  max-width: 80px;
}

.hero-title {
  margin: 0;
  line-height: 1.1;
}

.title-line {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--text-white);
  letter-spacing: -0.02em;
}

.title-line.accent {
  color: var(--accent);
}

.hero-role {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
}

.role-prefix {
  color: var(--accent);
  font-weight: 700;
}

.role-text {
  color: var(--text-silver);
  letter-spacing: 0.05em;
}

.role-cursor {
  width: 2px;
  height: 1.2em;
  background: var(--accent);
  animation: blink 1s step-end infinite;
}

.hero-description {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 500px;
}

/* Stats */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: var(--border-dark);
}

/* Action Buttons */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.75rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.btn-primary i {
  transition: transform 0.3s;
}

.btn-primary:hover i {
  transform: translateX(4px);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.75rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-default);
  color: var(--text-silver);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(255, 94, 0, 0.1);
  transform: translateY(-2px);
}

/* Social Links */
.hero-socials {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.hero-socials a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.hero-socials a i {
  font-size: 0.9rem;
}

.hero-socials a:hover {
  color: var(--accent);
}

/* Right Column - Visual (Desktop) */
.hero-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.image-frame {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.image-container {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  background: var(--bg-card);
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.image-container:hover img {
  filter: grayscale(0%);
}

.image-border {
  position: absolute;
  inset: -10px;
  border: 1px solid var(--border-default);
  pointer-events: none;
  transition: all 0.3s;
}

.image-container:hover + .image-border,
.image-frame:hover .image-border {
  inset: -15px;
  border-color: var(--accent);
}

/* Info Panel */
.info-panel {
  width: 100%;
  max-width: 350px;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  padding: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.info-label {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.info-value {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-silver);
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.info-divider {
  height: 1px;
  background: var(--border-dark);
}

/* Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.2em;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: var(--border-default);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent);
  animation: scrollLine 2s ease-in-out infinite;
}

/* Animations */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes scrollLine {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* ========== RESPONSIVE BREAKPOINTS ========== */

@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 2rem;
  }

  .hero-visual {
    order: -1;
  }

  .hero-content {
    text-align: center;
    align-items: center;
  }

  .hero-description {
    max-width: 600px;
  }

  .hero-stats {
    justify-content: center;
    width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-socials {
    justify-content: center;
  }

  .hero-label {
    justify-content: center;
  }

  .info-panel {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  /* Show/hide elements */
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }

  .hero {
    background: transparent;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  .hero-container {
    padding: 3rem 1.5rem;
    gap: 0;
  }

  .hero-content {
    text-align: left;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .hero-label {
    justify-content: flex-start;
  }

  .hero-title .title-line {
    font-size: clamp(2rem, 8vw, 3rem);
  }

  .hero-description {
    font-size: 0.9rem;
    max-width: 100%;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
  }

  .stat-divider {
    display: none;
  }

  .stat {
    flex: 1;
    min-width: auto;
    text-align: left;
  }

  .stat-value {
    font-size: 1.3rem;
  }

  .hero-actions {
    justify-content: flex-start;
  }

  .hero-socials {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .hero-socials a span {
    display: inline;
  }

  /* Mobile background - stays within hero section */
  .hero-bg-mobile {
    position: absolute;
    filter: grayscale(80%) contrast(1.1) brightness(0.6);
  }

  .hero-bg-mobile::after {
    background: rgba(0, 0, 0, 0.88);
  }

  .btn-secondary {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 2rem 1.25rem;
  }

  .hero-title .title-line {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }

  .hero-role {
    font-size: 0.8rem;
  }

  .hero-description {
    font-size: 0.85rem;
  }

  .hero-stats {
    gap: 1.5rem;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .stat-label {
    font-size: 0.6rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.7rem 1.5rem;
    font-size: 0.7rem;
  }

  .hero-socials {
    gap: 1rem;
  }

  .hero-socials a span {
    display: none;
  }

  .hero-socials a {
    width: 40px;
    height: 40px;
    justify-content: center;
    border: 1px solid var(--border-default);
    border-radius: 2px;
  }

  .hero-socials a i {
    margin: 0;
    font-size: 1rem;
  }

  .hero-socials a:hover {
    border-color: var(--accent);
  }
}

@media (max-width: 380px) {
  .hero-container {
    padding: 1.5rem 1rem;
  }

  .hero-stats {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .stat {
    width: 100%;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
