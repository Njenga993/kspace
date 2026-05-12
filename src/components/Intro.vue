<template>
  <section class="hero">
    <!-- Background Elements (desktop) -->
    <div class="hero-bg desktop-only">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-dots"></div>
      <div class="bg-mark bg-mark-tl"></div>
      <div class="bg-mark bg-mark-br"></div>
    </div>

    <!-- Mobile Background Image -->
    <div class="hero-bg-mobile mobile-only"></div>

    <div class="hero-container">
      <!-- Top Bar -->
      <header class="hero-topbar">
        <div class="topbar-id">
          <span class="id-dot"></span>
          <span class="id-text">KELVIN KAMAU</span>
        </div>
        <div class="topbar-status desktop-only">
          <span class="status-dot"></span>
          <span class="status-text">OPEN TO WORK</span>
        </div>
      </header>

      <!-- Main Content -->
      <div class="hero-main">
        <!-- Left: Typography Block -->
        <div class="hero-type">
          <h1 class="hero-title">
            <span class="t-line">Crafting</span>
            <span class="t-line t-outline">Digital</span>
            <span class="t-line">Solutions</span>
            <span class="t-line t-accent">That Matter</span>
          </h1>

          <div class="hero-role">
            <span class="role-bracket">[</span>
            <span class="role-text">{{ currentRole }}</span>
            <span class="role-cursor"></span>
            <span class="role-bracket">]</span>
          </div>

          <p class="hero-desc">
            Full-stack developer specializing in building exceptional digital
            experiences. I transform complex problems into elegant, performant
            solutions that drive results.
          </p>

          <div class="hero-actions">
            <a href="#projects" class="btn-primary">
              <span class="btn-idx">01</span>
              <span class="btn-label">VIEW WORK</span>
              <span class="btn-arrow"><i class="fas fa-arrow-right"></i></span>
            </a>
            <a href="#contact" class="btn-secondary">
              <span class="btn-idx">02</span>
              <span class="btn-label">GET IN TOUCH</span>
            </a>
          </div>
        </div>

        <!-- Right: Visual Column (desktop) -->
        <div class="hero-visual desktop-only">
          <div class="visual-watermark">03</div>
          <div class="visual-frame">
            <div class="frame-inner">
              <img src="/kay.jpg" alt="Kelvin Kamau" />
              <div class="frame-gradient"></div>
            </div>
            <div class="frame-border"></div>
            <div class="frame-corner frame-corner-tr"></div>
            <div class="frame-corner frame-corner-bl"></div>
          </div>

          <div class="vis-tag vis-tag-1">
            <span class="vis-tag-label">LOC</span>
            <span class="vis-tag-value">NAIROBI, KE</span>
          </div>
          <div class="vis-tag vis-tag-2">
            <span class="vis-tag-label">STACK</span>
            <span class="vis-tag-value">FULL STACK</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <footer class="hero-bottombar">
        <div class="bottom-stats">
          <div class="b-stat">
            <span class="b-stat-num">03+</span>
            <span class="b-stat-label">YEARS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">12+</span>
            <span class="b-stat-label">PROJECTS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">100%</span>
            <span class="b-stat-label">DELIVERED</span>
          </div>
        </div>

        <div class="bottom-socials">
          <a
            href="https://github.com/Njenga993"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kelvin-kamau-788160277/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="mailto:njengak993@gmail.com" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>

        <div class="bottom-scroll desktop-only">
          <span class="scroll-label">SCROLL</span>
          <div class="scroll-track">
            <div class="scroll-thumb"></div>
          </div>
        </div>
      </footer>
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
/* ==============================
   UTILITIES
   ============================== */
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}

/* ==============================
   SECTION
   ============================== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  overflow: hidden;
}

/* ==============================
   BACKGROUND — DESKTOP
   ============================== */
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* Gradient orbs replace the grid */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.bg-orb-1 {
  width: 650px;
  height: 650px;
  background: var(--accent);
  opacity: 0.06;
  top: -220px;
  right: -120px;
}
.bg-orb-2 {
  width: 450px;
  height: 450px;
  background: #1a3a5c;
  opacity: 0.08;
  bottom: -120px;
  left: -80px;
}

/* Dot pattern replaces line grid */
.bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--border-default) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.12;
}

/* Crosshair corner marks */
.bg-mark {
  position: absolute;
  width: 24px;
  height: 24px;
}
.bg-mark::before,
.bg-mark::after {
  content: "";
  position: absolute;
  background: var(--accent);
  opacity: 0.5;
}
.bg-mark-tl {
  top: 2rem;
  left: 2rem;
}
.bg-mark-tl::before {
  width: 24px;
  height: 1px;
  top: 50%;
  left: 0;
}
.bg-mark-tl::after {
  width: 1px;
  height: 24px;
  top: 0;
  left: 50%;
}
.bg-mark-br {
  bottom: 2rem;
  right: 2rem;
}
.bg-mark-br::before {
  width: 24px;
  height: 1px;
  top: 50%;
  right: 0;
  left: auto;
}
.bg-mark-br::after {
  width: 1px;
  height: 24px;
  bottom: 0;
  top: auto;
  left: 50%;
}

/* ==============================
   BACKGROUND — MOBILE
   ============================== */
.hero-bg-mobile {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url("/heroimage.png");
  background-size: cover;
  background-position: center 30%;
  filter: grayscale(80%) contrast(1.1) brightness(0.6);
}
.hero-bg-mobile::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
}

/* ==============================
   CONTAINER — 3-ROW GRID
   ============================== */
.hero-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* ==============================
   TOP BAR
   ============================== */
.hero-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  animation: fadeIn 0.6s ease forwards;
}

.topbar-id {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.id-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
}
.id-text {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.2em;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border-default);
}
.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
.status-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-silver);
  letter-spacing: 0.15em;
}

/* ==============================
   MAIN — 2-COLUMN
   ============================== */
.hero-main {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 5rem;
  align-items: center;
}

/* ==============================
   LEFT: TYPOGRAPHY
   ============================== */
.hero-type {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Staggered entrance */
.hero-type > * {
  opacity: 0;
  animation: slideUp 0.7s ease forwards;
}
.hero-type > :nth-child(1) {
  animation-delay: 0.15s;
}
.hero-type > :nth-child(2) {
  animation-delay: 0.28s;
}
.hero-type > :nth-child(3) {
  animation-delay: 0.38s;
}
.hero-type > :nth-child(4) {
  animation-delay: 0.48s;
}

/* Title */
.hero-title {
  margin: 0;
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.t-line {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  color: var(--text-white);
}
.t-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-white);
  paint-order: stroke fill;
}
.t-accent {
  color: var(--accent);
}

/* Role typewriter */
.hero-role {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 500;
}
.role-bracket {
  color: var(--accent);
  font-weight: 700;
}
.role-text {
  color: var(--text-silver);
  letter-spacing: 0.06em;
}
.role-cursor {
  width: 2px;
  height: 1.2em;
  background: var(--accent);
  animation: blink 1s step-end infinite;
}

/* Description */
.hero-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  max-width: 480px;
}

/* ==============================
   BUTTONS — UNDERLINE STYLE
   ============================== */
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 0;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.35s ease;
  width: fit-content;
}

.btn-primary {
  border-bottom-color: var(--accent);
}
.btn-idx {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.05em;
  transition: color 0.3s;
}
.btn-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.08em;
  transition: color 0.3s;
}
.btn-arrow {
  display: flex;
  align-items: center;
  color: var(--accent);
  font-size: 0.75rem;
  transition: transform 0.35s ease;
}
.btn-primary:hover .btn-arrow {
  transform: translateX(6px);
}

.btn-secondary {
  border-bottom-color: var(--border-default);
}
.btn-secondary .btn-idx {
  color: var(--text-dim);
}
.btn-secondary .btn-label {
  color: var(--text-muted);
}
.btn-secondary:hover {
  border-bottom-color: var(--accent);
}
.btn-secondary:hover .btn-idx,
.btn-secondary:hover .btn-label {
  color: var(--accent);
}

/* ==============================
   RIGHT: VISUAL COLUMN
   ============================== */
.hero-visual {
  position: relative;
  opacity: 0;
  animation: fadeIn 0.9s ease 0.35s forwards;
}

/* Large watermark number */
.visual-watermark {
  position: absolute;
  top: -30px;
  left: -25px;
  font-family: var(--font-heading);
  font-size: 11rem;
  font-weight: 900;
  color: var(--border-default);
  opacity: 0.07;
  line-height: 1;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

/* Image frame */
.visual-frame {
  position: relative;
  width: 340px;
  z-index: 1;
}
.frame-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--bg-card);
}
.frame-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: grayscale(100%);
  transition:
    filter 0.6s ease,
    transform 0.6s ease;
}
.visual-frame:hover .frame-inner img {
  filter: grayscale(0%);
  transform: scale(1.04);
}
.frame-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  pointer-events: none;
}

/* Outer border */
.frame-border {
  position: absolute;
  inset: -14px;
  border: 1px solid var(--border-default);
  pointer-events: none;
  transition: border-color 0.4s ease;
}
.visual-frame:hover .frame-border {
  border-color: var(--accent);
}

/* Accent corners */
.frame-corner {
  position: absolute;
  width: 36px;
  height: 36px;
  pointer-events: none;
}
.frame-corner-tr {
  top: -22px;
  right: -22px;
  border-top: 2px solid var(--accent);
  border-right: 2px solid var(--accent);
}
.frame-corner-bl {
  bottom: -22px;
  left: -22px;
  border-bottom: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
}

/* Floating annotation tags */
.vis-tag {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0.6rem 0.85rem;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-default);
  z-index: 2;
  transition:
    border-color 0.3s ease,
    transform 0.3s ease;
}
.vis-tag:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.vis-tag-1 {
  top: 40px;
  right: -75px;
}
.vis-tag-2 {
  bottom: 40px;
  left: -75px;
}
.vis-tag-label {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.18em;
}
.vis-tag-value {
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-silver);
  letter-spacing: 0.05em;
}

/* ==============================
   BOTTOM BAR
   ============================== */
.hero-bottombar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--border-dark);
  opacity: 0;
  animation: fadeIn 0.6s ease 0.6s forwards;
}

/* Stats */
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
  color: var(--accent);
}
.b-stat-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}
.b-stat-sep {
  color: var(--border-default);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0.15rem;
}

/* Socials */
.bottom-socials {
  display: flex;
  gap: 0.6rem;
}
.bottom-socials a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  border: 1px solid var(--border-dark);
  font-size: 0.85rem;
  transition: all 0.3s ease;
}
.bottom-socials a:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
}

/* Scroll indicator */
.bottom-scroll {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.scroll-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.2em;
}
.scroll-track {
  width: 1px;
  height: 32px;
  background: var(--border-default);
  position: relative;
  overflow: hidden;
}
.scroll-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--accent);
  animation: scrollPulse 2s ease-in-out infinite;
}

/* ==============================
   ANIMATIONS
   ============================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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
    opacity: 0.35;
  }
}

@keyframes scrollPulse {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(300%);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ==============================
   RESPONSIVE — TABLET
   ============================== */
@media (max-width: 1100px) {
  .hero-main {
    gap: 3rem;
  }

  .visual-frame {
    width: 280px;
  }

  .vis-tag-1 {
    right: -65px;
  }
  .vis-tag-2 {
    left: -65px;
  }

  .visual-watermark {
    font-size: 8rem;
    top: -20px;
    left: -15px;
  }
}

@media (max-width: 1024px) {
  .hero-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-type {
    text-align: center;
    align-items: center;
  }

  .hero-desc {
    max-width: 560px;
  }

  .hero-actions {
    align-items: center;
  }
}

/* ==============================
   RESPONSIVE — MOBILE
   ============================== */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: block;
  }

  .hero {
    background: transparent;
  }

  .hero-container {
    padding: 6rem 1.5rem 2rem;
    gap: 0;
  }

  .hero-main {
    gap: 0;
  }

  .hero-type {
    text-align: left;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .hero-desc {
    max-width: 100%;
    font-size: 0.9rem;
  }

  .hero-actions {
    align-items: flex-start;
  }

  .hero-bottombar {
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1.5rem;
  }

  .bottom-stats {
    order: 1;
    flex: 1;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .b-stat-sep {
    display: none;
  }

  .b-stat {
    flex: 0 0 auto;
    min-width: 80px;
  }

  .bottom-socials {
    order: 2;
  }

  .bottom-scroll {
    display: none;
  }

  .t-line {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }
}

/* ==============================
   RESPONSIVE — SMALL MOBILE
   ============================== */
@media (max-width: 480px) {
  .hero-container {
    padding: 5rem 1.25rem 1.5rem;
  }

  .t-line {
    font-size: clamp(1.9rem, 8vw, 2.8rem);
  }

  .t-outline {
    -webkit-text-stroke-width: 1px;
  }

  .hero-role {
    font-size: 0.8rem;
  }

  .hero-desc {
    font-size: 0.85rem;
  }

  .btn-label {
    font-size: 0.72rem;
  }

  .b-stat-num {
    font-size: 1rem;
  }

  .topbar-status {
    display: none;
  }
}

@media (max-width: 380px) {
  .hero-container {
    padding: 4.5rem 1rem 1.25rem;
  }

  .t-line {
    font-size: clamp(1.7rem, 9vw, 2.4rem);
  }

  .hero-actions {
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .bottom-stats {
    flex-direction: column;
    gap: 0.6rem;
  }
}
</style>
