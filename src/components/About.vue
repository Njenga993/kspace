<template>
  <section class="about-section">
    <div class="about-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">About Me</span>
        </div>
        <div class="avail-badge">
          <span class="pulse-dot"></span>
          <span>Available for work</span>
        </div>
      </div>

      <!-- Main grid: photo left, content right -->
      <div class="main-grid">

        <!-- LEFT: Photo -->
        <div class="photo-col">
          <div class="photo-frame">
            <img src="/side.jpg" alt="Kelvin Kamau" class="photo-img" />
            <div class="photo-overlay"></div>

            <!-- Floating tags -->
            <div class="float-tag float-tag--top">
              <span class="ft-label">Role</span>
              <span class="ft-value">Full‑Stack Dev</span>
            </div>
            <div class="float-tag float-tag--bottom">
              <span class="ft-label">Location</span>
              <span class="ft-value">Nairobi, KE</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Content -->
        <div class="content-col">

          <!-- Headline -->
          <div class="headline-block">
            <p class="eyebrow">Full‑Stack Engineer</p>
            <h2 class="headline">
              <span class="hl-solid">Architecting</span>
              <span class="hl-outline">Digital</span>
              <span class="hl-accent">Excellence</span>
            </h2>
          </div>

          <!-- Typewriter role -->
          <div class="role-row">
            <span class="role-bracket">[</span>
            <span class="role-text">{{ currentRole }}</span>
            <span class="role-cursor"></span>
            <span class="role-bracket">]</span>
          </div>

          <!-- Description -->
          <p class="about-desc">
            Full‑stack developer with a passion for crafting scalable, performant applications.
            I transform complex business requirements into elegant solutions that drive measurable results.
          </p>

          <!-- Tab nav -->
          <div class="tab-nav">
            <div class="tab-track">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                :class="['tab-pill', { active: activeTab === tab.id }]"
                @click="activeTab = tab.id"
              >
                <i :class="tab.icon"></i>
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Tab content -->
          <div class="tab-content">
            <Transition name="tab-fade" mode="out-in">

              <!-- Experience -->
              <div v-if="activeTab === 'experience'" key="exp" class="exp-list">
                <div v-for="(exp, idx) in experiences" :key="idx" class="exp-item">
                  <div class="exp-timeline">
                    <div class="exp-dot" :class="{ current: idx === 0 }"></div>
                    <div class="exp-line" v-if="idx < experiences.length - 1"></div>
                  </div>
                  <div class="exp-body">
                    <div class="exp-meta">
                      <span class="exp-period">{{ exp.period }}</span>
                      <span v-if="idx === 0" class="current-badge">Current</span>
                    </div>
                    <h4 class="exp-title">{{ exp.title }}</h4>
                    <span class="exp-company">{{ exp.company }}</span>
                    <p class="exp-desc">{{ exp.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Skills -->
              <div v-else-if="activeTab === 'skills'" key="skills" class="skills-grid">
                <div v-for="cat in skillCategories" :key="cat.title" class="skill-card">
                  <div class="skill-head">
                    <i :class="cat.icon"></i>
                    <span>{{ cat.title }}</span>
                  </div>
                  <div class="skill-tags">
                    <span v-for="s in cat.skills" :key="s" class="skill-tag">{{ s }}</span>
                  </div>
                </div>
              </div>

              <!-- Education -->
              <div v-else-if="activeTab === 'education'" key="edu" class="edu-block">
                <div class="edu-main">
                  <div class="edu-icon">
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <div class="edu-info">
                    <h4>BSc. Information Science</h4>
                    <span>Meru University of Science and Technology</span>
                    <span class="edu-period">2020 — 2024</span>
                  </div>
                </div>
                <div class="edu-details">
                  <div class="edu-detail">
                    <span class="ed-label">Honours</span>
                    <span class="ed-value">Second Class (Upper Division)</span>
                  </div>
                  <div class="edu-detail">
                    <span class="ed-label">Focus</span>
                    <span class="ed-value">Software Development & Database Systems</span>
                  </div>
                </div>
              </div>

              <!-- Interests -->
              <div v-else key="interests" class="interests-wrap">
                <span v-for="interest in interests" :key="interest.name" class="interest-pill">
                  <i :class="interest.icon"></i>
                  {{ interest.name }}
                </span>
              </div>

            </Transition>
          </div>

          <!-- Actions -->
          <div class="action-row">
            <a href="/Kamau_Kelvin_Resume.pdf" class="btn-primary" download>
              <i class="fas fa-download"></i> Download Resume
            </a>
            <a href="#contact" class="btn-outline">
              <i class="fas fa-comment-dots"></i> Get in Touch
            </a>
          </div>

        </div>
      </div>

      <!-- Bottom stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ totalYears }}+</span>
          <span class="stat-desc">Years Exp.</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">20+</span>
          <span class="stat-desc">Projects</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-desc">Committed</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">4</span>
          <span class="stat-desc">Industries</span>
        </div>

        <div class="socials">
          <a href="https://github.com/Njenga993" target="_blank" rel="noopener" aria-label="GitHub" class="social-link">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="mailto:kamaukelvin077@gmail.com" aria-label="Email" class="social-link">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeTab = ref('experience')

const tabs = [
  { id: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
  { id: 'skills',     label: 'Skills',     icon: 'fas fa-bolt'      },
  { id: 'education',  label: 'Education',  icon: 'fas fa-graduation-cap' },
  { id: 'interests',  label: 'Interests',  icon: 'fas fa-heart'     },
]

const roles = [
  'Full‑Stack Developer',
  'React Specialist',
  'UI Engineer',
  'Open Source Contributor',
]

const currentRole = ref(roles[0])
let roleIdx = 0, charIdx = 0, isDeleting = false, typingTimer = null

const typeRole = () => {
  const full = roles[roleIdx]
  currentRole.value = isDeleting
    ? full.substring(0, charIdx - 1)
    : full.substring(0, charIdx + 1)
  isDeleting ? charIdx-- : charIdx++

  if (!isDeleting && charIdx === full.length) {
    isDeleting = true
    typingTimer = setTimeout(typeRole, 2000)
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false
    roleIdx = (roleIdx + 1) % roles.length
    typingTimer = setTimeout(typeRole, 500)
  } else {
    typingTimer = setTimeout(typeRole, isDeleting ? 40 : 100)
  }
}

onMounted(() => typeRole())
onUnmounted(() => { if (typingTimer) clearTimeout(typingTimer) })

const experiences = [
  {
    period: '2024 — Present',
    title: 'Developer & Digital Manager',
    company: 'Nyakazi Organics',
    description: 'Leading digital transformation initiatives. Built a comprehensive POS system with React & Django, implemented cohesive branding across all platforms, and optimized operational workflows.',
  },
  {
    period: '2023 — 2024',
    title: 'Junior Developer',
    company: 'Desiderata Consultancy',
    description: 'Developed Laravel dashboards and REST APIs for enterprise clients. Achieved 60% improvement in page load performance across multiple projects.',
  },
  {
    period: '2022 — 2023',
    title: 'Frontend Developer',
    company: 'Techlungs Technology',
    description: 'Delivered 20+ high-converting landing pages and marketing sites. Reduced CSS bundle size by 45% through systematic refactoring.',
  },
  {
    period: '2021 — 2022',
    title: 'ICT Intern',
    company: 'KNLS & Immigration Department',
    description: 'Automated manual processes saving 15+ hours weekly. Documented network infrastructure and provided technical support.',
  },
]

const skillCategories = [
  { title: 'Frontend',  icon: 'fas fa-desktop', skills: ['Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { title: 'Backend',   icon: 'fas fa-server',  skills: ['Node.js', 'PHP', 'Python', 'Django', 'Express.js', 'MongoDB', 'MySQL'] },
  { title: 'Design',    icon: 'fas fa-palette', skills: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX Design'] },
  { title: 'DevOps',    icon: 'fas fa-tools',   skills: ['Git', 'Docker', 'CI/CD', 'Webpack', 'Linux'] },
]

const interests = [
  { name: 'Open Source', icon: 'fas fa-code'       },
  { name: 'Gaming',      icon: 'fas fa-gamepad'    },
  { name: 'Reading',     icon: 'fas fa-book'       },
  { name: 'Music',       icon: 'fas fa-music'      },
  { name: 'Football',    icon: 'fas fa-futbol'     },
  { name: 'Tech Trends', icon: 'fas fa-microchip'  },
]

const totalYears = computed(() => new Date().getFullYear() - 2021)
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

/* ─── Section wrapper ────────────────────────────────── */
.about-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ─── Card ───────────────────────────────────────────── */
.about-card {
  background: #0d1117;
  border: 1px solid var(--border);
  border-radius: 2rem;
  padding: 2.2rem 2.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: relative;
  overflow: hidden;
}

/* warm ambient glow — photo side */
.about-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 45%;
  height: 100%;
  background: radial-gradient(ellipse at 20% 40%, rgba(180, 100, 30, 0.13) 0%, transparent 65%);
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

.section-label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.label-dot {
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
}

.label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.avail-badge {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 1.1rem;
  border: 1px solid rgba(46, 204, 113, 0.25);
  border-radius: 3rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--green);
  letter-spacing: 0.03em;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(46, 204, 113, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

/* ─── Main grid ──────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 0.72fr 1fr;
  gap: 3.5rem;
  align-items: start;
  position: relative;
  z-index: 2;
}

/* ─── Photo column ───────────────────────────────────── */
.photo-col {
  position: relative;
}

.photo-frame {
  position: relative;
  border-radius: 1.6rem;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  max-height: 520px;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  filter: grayscale(100%) brightness(0.9);
  transition: filter 0.5s ease;
}

.photo-frame:hover .photo-img {
  filter: grayscale(0%) brightness(0.92);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 45%,
    rgba(8, 6, 2, 0.6) 100%
  );
  pointer-events: none;
}

/* floating tags on photo */
.float-tag {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.55rem 1rem;
  background: rgba(12, 10, 4, 0.82);
  border: 1px solid var(--accent-border);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.float-tag--top  { top: 1.1rem;    right: 1.1rem; }
.float-tag--bottom { bottom: 1.3rem; left: 1.1rem; }

.ft-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ft-value {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--white);
}

/* ─── Content column ─────────────────────────────────── */
.content-col {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* Headline */
.headline-block { display: flex; flex-direction: column; gap: 0.5rem; }

.eyebrow {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.headline {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0;
}

.hl-solid {
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--white);
}

.hl-outline {
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--white);
}

.hl-accent {
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--accent);
}

/* Typewriter */
.role-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.role-bracket { color: var(--accent); font-weight: 700; }
.role-text    { color: var(--silver); letter-spacing: 0.04em; }

.role-cursor {
  width: 2px;
  height: 1.1em;
  background: var(--accent);
  animation: blink 1s step-end infinite;
  flex-shrink: 0;
}

/* Description */
.about-desc {
  color: var(--muted);
  font-size: 0.94rem;
  line-height: 1.75;
  margin: 0;
  max-width: 520px;
}

/* ─── Tab nav ────────────────────────────────────────── */
.tab-nav { display: flex; }

.tab-track {
  display: inline-flex;
  align-items: center;
  background: #161b22;
  border: 1px solid var(--border);
  border-radius: 3rem;
  padding: 0.28rem 0.3rem;
  gap: 0.1rem;
  flex-wrap: wrap;
}

.tab-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.44rem 1rem;
  border: none;
  border-radius: 3rem;
  background: transparent;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
  font-family: 'Inter', sans-serif;
}

.tab-pill i { font-size: 0.7rem; }

.tab-pill:hover {
  color: var(--silver);
  background: rgba(255, 255, 255, 0.05);
}

.tab-pill.active {
  background: var(--accent);
  color: #0d1117;
}

/* ─── Tab content ────────────────────────────────────── */
.tab-content { min-height: 210px; }

.tab-fade-enter-active,
.tab-fade-leave-active { transition: all 0.2s ease; }
.tab-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.tab-fade-leave-to     { opacity: 0; transform: translateY(-6px); }

/* Experience */
.exp-list { display: flex; flex-direction: column; }

.exp-item {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 1rem;
}

.exp-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.exp-dot {
  width: 9px;
  height: 9px;
  border: 2px solid var(--border);
  border-radius: 50%;
  background: #0d1117;
  flex-shrink: 0;
}

.exp-dot.current {
  border-color: var(--accent);
  background: var(--accent);
}

.exp-line {
  width: 1px;
  flex: 1;
  background: var(--border);
  margin: 3px 0;
}

.exp-body { padding-bottom: 1.4rem; }
.exp-item:last-child .exp-body { padding-bottom: 0; }

.exp-meta {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.25rem;
}

.exp-period {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
}

.current-badge {
  font-size: 0.55rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border: 1px solid var(--accent-border);
  border-radius: 3rem;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.exp-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--white);
  margin: 0 0 0.12rem;
}

.exp-company {
  font-size: 0.76rem;
  color: var(--muted);
  display: block;
  margin-bottom: 0.35rem;
}

.exp-desc {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.65;
  margin: 0;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
}

.skill-card {
  padding: 1rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  background: var(--bg-card);
  transition: all 0.22s ease;
}

.skill-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
}

.skill-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

.skill-tag {
  padding: 0.28rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 3rem;
  font-size: 0.68rem;
  color: var(--silver);
}

/* Education */
.edu-block { display: flex; flex-direction: column; gap: 1.2rem; }

.edu-main { display: flex; gap: 1.1rem; align-items: flex-start; }

.edu-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 0.75rem;
  color: var(--accent);
  font-size: 1rem;
  flex-shrink: 0;
}

.edu-info h4 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  margin: 0 0 0.18rem;
}

.edu-info span {
  font-size: 0.76rem;
  color: var(--muted);
  display: block;
}

.edu-period {
  color: var(--accent) !important;
  font-weight: 600;
  margin-top: 0.2rem;
}

.edu-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--border);
  border-radius: 1.1rem;
  overflow: hidden;
}

.edu-detail { padding: 0.9rem 1.1rem; }
.edu-detail:first-child { border-right: 1px solid var(--border); }

.ed-label {
  display: block;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--dim);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}

.ed-value { font-size: 0.78rem; color: var(--silver); }

/* Interests */
.interests-wrap { display: flex; flex-wrap: wrap; gap: 0.6rem; }

.interest-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.46rem 1.1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 3rem;
  font-size: 0.76rem;
  color: var(--silver);
  transition: all 0.2s;
}

.interest-pill i { color: var(--accent); font-size: 0.75rem; }
.interest-pill:hover { border-color: var(--accent-border); background: rgba(201, 162, 59, 0.07); }

/* ─── Action buttons ─────────────────────────────────── */
.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.4rem;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.7rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  border-radius: 3rem;
  text-decoration: none;
  transition: all 0.22s ease;
  font-family: 'Inter', sans-serif;
}

.btn-primary {
  background: var(--accent);
  color: #0d1117;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 14px rgba(201, 162, 59, 0.2);
}

.btn-primary:hover {
  background: #dbb24a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(201, 162, 59, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--white);
  border: 1px solid var(--accent-border);
}

.btn-outline:hover {
  background: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}

/* ─── Stats bar ──────────────────────────────────────── */
.stats-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--border);
  position: relative;
  z-index: 2;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.stat-number {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-desc {
  font-size: 0.68rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-divider {
  width: 1px;
  height: 2.2rem;
  background: var(--border);
  flex-shrink: 0;
}

.socials {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

.social-link {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 0.6rem;
  color: var(--muted);
  font-size: 0.82rem;
  text-decoration: none;
  transition: all 0.2s;
}

.social-link:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  transform: translateY(-2px);
}

/* ─── Animations ─────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

@keyframes blink {
  0%, 50%   { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1100px) {
  .main-grid { gap: 2.5rem; }
}

@media (max-width: 900px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .photo-frame {
    aspect-ratio: 4 / 3;
    max-height: 320px;
    max-width: 100%;
  }

  .hl-solid, .hl-outline, .hl-accent {
    font-size: clamp(2.4rem, 7vw, 3.5rem);
  }
}

@media (max-width: 640px) {
  .about-section
  {
    margin-top: 1.2rem;
    padding: 0 0 1.8rem;
  }
  .about-card {
    padding: 1.6rem 1.4rem;
    border-radius: 1.5rem;
    gap: 1.8rem;
  }

  .skills-grid { grid-template-columns: 1fr; }

  .edu-details { grid-template-columns: 1fr; }
  .edu-detail:first-child { border-right: none; border-bottom: 1px solid var(--border); }

  .stat-divider { display: none; }

  .action-row { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-outline { justify-content: center; }

  .socials { margin-left: 0; margin-top: 0.5rem; width: 100%; }

  .tab-track { flex-wrap: wrap; border-radius: 1rem; }
}
</style>