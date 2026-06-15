<template>
  <section class="hero-wrap">
    <!-- TOP BAR -->
    <div class="top-bar fade-up">
      <div class="availability">
        <span class="pulse-dot"></span>
        <span>Available for freelance work</span>
      </div>
      
    </div>

    <!-- MAIN CONTENT: Left text + Right photo -->
    <div class="hero-body">
      <!-- LEFT: Text Content -->
      <div class="hero-left fade-up">
        <p class="eyebrow">Full‑Stack Engineer</p>

        <h1 class="hero-name">
          Kelvin<br />Kamau
        </h1>

        <div class="value-prop">
          Software that <span class="accent-text">solves business problems</span> with precision.
        </div>

        <p class="short-intro">
          Full‑stack engineer transforming complex requirements into elegant, performant solutions.
          I help organisations operate efficiently and grow through modern technology.
        </p>

        <!-- Contact Info Row -->
        <div class="contact-row">
          <a href="mailto:kamaukelvin077@gmail.com" class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>kamaukelvin077@gmail.com</span>
          </a>
          <a href="https://github.com/Njenga993" target="_blank" class="contact-item">
            <i class="fab fa-github"></i>
            <span>github.com/Njenga993</span>
          </a>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        <!-- Tech Badges -->
        <div class="tech-badges">
          <div class="badge"><i class="fab fa-react"></i> React</div>
          <div class="badge"><i class="fab fa-vuejs"></i> Vue.js</div>
          <div class="badge"><i class="fab fa-node-js"></i> Node.js</div>
          <div class="badge"><i class="fas fa-database"></i> PostgreSQL</div>
          <div class="badge"><i class="fab fa-laravel"></i> Laravel</div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number">03+</span>
            <span class="stat-desc">Years Exp.</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">12+</span>
            <span class="stat-desc">Projects</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-desc">Client Satisfaction</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">4</span>
            <span class="stat-desc">Industries Served</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Hero Photo -->
      <div class="hero-right fade-up">
        <div class="photo-frame">
          <img src="/hero.jpg" alt="Kelvin Kamau" class="hero-photo" />
          <!-- Floating card -->
          <div class="float-card float-card--tl">
            <span class="pulse-dot pulse-dot--sm"></span>
            <span>Open to work</span>
          </div>
          <div class="float-card float-card--br">
            <i class="fas fa-code"></i>
            <div>
              <p class="float-title">Scalable Systems</p>
              <p class="float-sub">SaaS · POS · E‑commerce</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BOTTOM NAV BAR 
    <nav class="pill-nav fade-up">
      <a href="#" class="pill-item pill-item--active">
        <i class="fas fa-home"></i> Home
      </a>
      <a href="#about" class="pill-item">
        <i class="fas fa-user"></i> About
      </a>
      <a href="#projects" class="pill-item">
        <i class="fas fa-briefcase"></i> Projects
      </a>
      <a href="#skills" class="pill-item">
        <i class="fas fa-bolt"></i> Skills
      </a>
      <a href="#contact" class="pill-item">
        <i class="fas fa-link"></i> Contact
      </a>
    </nav>-->
  </section>
</template>

<script setup>
// Scroll-triggered fade-up via IntersectionObserver
import { onMounted } from 'vue'

onMounted(() => {
  const els = document.querySelectorAll('.fade-up')
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    },
    { threshold: 0.15 }
  )
  els.forEach((el) => io.observe(el))
})
</script>

<style scoped>
/* ─── Reset ─────────────────────────────────────────── */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ─── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #0d1117;
  --bg-card: #161b22;
  --accent: #c9a23b;
  --accent-dim: rgba(201, 162, 59, 0.15);
  --accent-border: rgba(201, 162, 59, 0.35);
  --white: #f0f2f5;
  --silver: #b0b8c1;
  --muted: #7b8694;
  --dim: #4a5568;
  --border: rgba(255, 255, 255, 0.07);
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

/* ─── Outer wrapper ──────────────────────────────────── */
.hero-wrap {
  width: 100%;
  max-width: 1380px;
  height: 100vh;
  margin: 2.5rem auto;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 2rem;
  padding: 2.2rem 2.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  font-family: var(--font-sans);
  position: relative;
  overflow: hidden;
}

/* subtle warm ambient glow on right */
.hero-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  background: radial-gradient(ellipse at 80% 30%, rgba(180, 100, 30, 0.18) 0%, transparent 70%);
  pointer-events: none;
}

/* ─── Top bar ────────────────────────────────────────── */
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.availability {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--silver);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pulse-dot {
  width: 9px;
  height: 9px;
  background: #2ecc71;
  border-radius: 50%;
  box-shadow: 0 0 8px #2ecc71cc;
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.pulse-dot--sm {
  width: 7px;
  height: 7px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

.download-cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent);
  color: #0d1117;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 0.6rem 1.4rem;
  border-radius: 3rem;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.download-cv-btn:hover {
  background: #dbb24a;
  transform: translateY(-2px);
}

/* ─── Hero body ──────────────────────────────────────── */
.hero-body {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* ─── Left side ──────────────────────────────────────── */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.eyebrow {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-name {
  font-size: clamp(3.8rem, 7vw, 6.2rem);
  font-weight: 800;
  line-height: 0.95;
  color: var(--white);
  letter-spacing: -0.03em;
}

.value-prop {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--silver);
  line-height: 1.5;
  max-width: 88%;
}

.accent-text {
  color: var(--accent);
}

.short-intro {
  font-size: 0.95rem;
  color: var(--muted);
  line-height: 1.75;
  max-width: 82%;
}

/* ─── Contact row ────────────────────────────────────── */
.contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  color: var(--silver);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-item i {
  color: var(--accent);
  font-size: 0.85rem;
}

.contact-item:hover {
  color: var(--accent);
}

/* ─── Tech badges ────────────────────────────────────── */
.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 0.42rem 1rem;
  border-radius: 2rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--silver);
  transition: border-color 0.2s, background 0.2s;
}

.badge i {
  color: var(--accent);
  font-size: 0.85rem;
}

.badge:hover {
  border-color: var(--accent-border);
  background: var(--accent-dim);
  color: var(--white);
}

/* ─── Stats row ──────────────────────────────────────── */
.stats-row {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.stat-number {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-desc {
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-divider {
  width: 1px;
  height: 2.5rem;
  background: var(--border);
  flex-shrink: 0;
}

/* ─── Right photo ────────────────────────────────────── */
.hero-right {
  position: relative;
}

.photo-frame {
  position: relative;
  border-radius: 1.6rem;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 3 / 4;
  max-height: 560px;
}

.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  /* warm dark overlay matching reference */
  filter: brightness(0.88) contrast(1.05);
}

/* dark gradient bottom fade */
.photo-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(10, 8, 4, 0.55) 100%
  );
  pointer-events: none;
}

/* ─── Floating cards on photo ────────────────────────── */
.float-card {
  position: absolute;
  z-index: 3;
  background: rgba(15, 12, 6, 0.82);
  border: 1px solid rgba(201, 162, 59, 0.3);
  backdrop-filter: blur(12px);
  border-radius: 2rem;
  padding: 0.55rem 1.1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--silver);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.float-card--tl {
  top: 1.1rem;
  left: 1.1rem;
}

.float-card--br {
  bottom: 1.3rem;
  right: 1.1rem;
  border-radius: 1.2rem;
  padding: 0.75rem 1.1rem;
  gap: 0.7rem;
}

.float-card--br i {
  color: var(--accent);
  font-size: 1.1rem;
}

.float-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;
}

.float-sub {
  font-size: 0.68rem;
  color: var(--muted);
  margin-top: 0.1rem;
}

/* ─── Bottom pill nav ────────────────────────────────── */
.pill-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 3rem;
  padding: 0.5rem 0.7rem;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.pill-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1.3rem;
  border-radius: 3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted);
  text-decoration: none;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}

.pill-item i {
  font-size: 0.8rem;
}

.pill-item:hover {
  color: var(--white);
  background: rgba(255, 255, 255, 0.06);
}

.pill-item--active {
  background: var(--accent);
  color: #0d1117 !important;
}

.pill-item--active:hover {
  background: #dbb24a;
}

/* ─── Fade-up animation ──────────────────────────────── */
.fade-up {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* stagger children in hero-left */
.hero-left .fade-up:nth-child(1) { transition-delay: 0.08s; }
.hero-left .fade-up:nth-child(2) { transition-delay: 0.18s; }
.hero-left .fade-up:nth-child(3) { transition-delay: 0.28s; }

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-right {
    order: -1;
  }

  .photo-frame {
    aspect-ratio: 16 / 9;
    max-height: 340px;
  }

  .hero-name {
    font-size: clamp(3rem, 8vw, 5rem);
  }

  .short-intro,
  .value-prop {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  
  .hero-wrap {
    padding: 1.6rem 1.4rem;
    border-radius: 1.5rem;
    gap: 1.8rem;
    margin-bottom: 2rem;
  }

  .contact-row {
    gap: 0.9rem;
  }

  .stats-row {
    gap: 1rem;
  }

  .stat-divider {
    display: none;
  }

  .pill-nav {
    gap: 0.25rem;
    padding: 0.4rem;
  }

  .pill-item {
    padding: 0.5rem 0.9rem;
    font-size: 0.75rem;
  }
}
</style>