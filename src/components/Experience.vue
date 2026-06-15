<template>
  <section id="experience" class="exp-section">
    <div class="exp-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">Career</span>
        </div>
        <div class="roles-badge">
          <i class="fas fa-briefcase"></i>
          <span>{{ experiences.length }} Roles · {{ totalYears }}+ Years</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="main-grid">

        <!-- LEFT: Headline + timeline nav -->
        <div class="left-col">

          <div class="headline-block">
            <p class="eyebrow">Professional Journey</p>
            <h2 class="headline">
              <span class="hl-solid">Career</span>
              <span class="hl-outline">Growth</span>
              <span class="hl-accent">& Impact</span>
            </h2>
            <p class="sub-desc">
              A timeline of evolution — from foundational training to leading
              digital transformation across multiple industries.
            </p>
          </div>

          <!-- Timeline selector -->
          <div class="timeline-nav">
            <div
              v-for="(exp, idx) in experiences"
              :key="exp.id"
              :class="['tl-item', { active: activeExperience === idx }]"
              @click="activeExperience = idx"
            >
              <div class="tl-marker">
                <div class="tl-dot" :class="{ current: idx === 0 }"></div>
                <div class="tl-line" v-if="idx < experiences.length - 1"></div>
              </div>
              <div class="tl-body">
                <div class="tl-top">
                  <span class="tl-period">{{ exp.period }}</span>
                  <span v-if="idx === 0" class="tl-current-badge">Current</span>
                </div>
                <p class="tl-role">{{ exp.title }}</p>
                <p class="tl-company">{{ exp.company }}</p>
              </div>
            </div>
          </div>

          <!-- Counter + arrows -->
          <div class="nav-row">
            <button
              class="nav-btn"
              :disabled="activeExperience === 0"
              @click="prevExperience"
              aria-label="Previous"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="nav-counter">
              <span class="nc-current">{{ String(activeExperience + 1).padStart(2, '0') }}</span>
              <span class="nc-sep">/</span>
              <span class="nc-total">{{ String(experiences.length).padStart(2, '0') }}</span>
            </div>
            <button
              class="nav-btn"
              :disabled="activeExperience === experiences.length - 1"
              @click="nextExperience"
              aria-label="Next"
            >
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>

        </div>

        <!-- RIGHT: Detail panel -->
        <div class="right-col">
          <Transition name="panel-fade" mode="out-in">
            <div :key="activeExperience" class="detail-panel">

              <!-- Terminal header -->
              <div class="terminal-card">
                <div class="terminal-dots">
                  <span></span><span></span><span></span>
                </div>
                <div class="code-line">
                  <span class="prompt">~/career/{{ currentExp.company.split(' ')[0].toLowerCase() }} $</span>
                  <span class="cmd">cat role.txt</span>
                </div>
                <div class="code-line">
                  <span class="prompt">></span>
                  <span class="out-accent">{{ currentExp.title }}</span>
                </div>
                <div class="code-line">
                  <span class="prompt">></span>
                  <span class="out">{{ currentExp.company }} · {{ currentExp.period }}</span>
                </div>
              </div>

              <!-- Description -->
              <p class="role-desc">{{ currentExp.description }}</p>

              <!-- Achievements -->
              <div class="role-block">
                <div class="block-header">
                  <span class="block-dot"></span>
                  <span class="block-title">Key Achievements</span>
                </div>
                <div class="achievements-list">
                  <div
                    v-for="achievement in currentExp.achievements.slice(0, 3)"
                    :key="achievement"
                    class="achievement-item"
                  >
                    <div class="ach-icon">
                      <i class="fas fa-check"></i>
                    </div>
                    <span>{{ achievement }}</span>
                  </div>
                </div>
              </div>

              <!-- Technologies -->
              <div class="role-block">
                <div class="block-header">
                  <span class="block-dot"></span>
                  <span class="block-title">Technologies Used</span>
                </div>
                <div class="tech-pills">
                  <span
                    v-for="skill in getAllSkills(currentExp).slice(0, 8)"
                    :key="skill"
                    class="tech-pill"
                  >{{ skill }}</span>
                </div>
              </div>

              <!-- Category tag -->
              <div class="category-tag">
                <i class="fas fa-tag"></i>
                {{ currentExp.category }}
              </div>

            </div>
          </Transition>
        </div>

      </div>

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ totalYears }}+</span>
          <span class="stat-desc">Years</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ experiences.length }}</span>
          <span class="stat-desc">Roles</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">4</span>
          <span class="stat-desc">Industries</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-desc">Impact</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeExperience = ref(0)

const experiences = [
  {
    id: 1,
    title: 'Developer & Digital Manager',
    company: 'Nyakazi Organics',
    period: '2024 — Present',
    category: 'FULL-TIME',
    description:
      'Leading digital transformation for an organic food company. Built a comprehensive POS system with React & Django, designed cohesive branding across all platforms, and optimized operational workflows.',
    achievements: [
      'Developed POS system reducing checkout times by 40%',
      'Achieved 95+ Lighthouse performance scores across all pages',
      'Increased social media engagement by 200% through cohesive digital branding',
    ],
    skillCategories: {
      Frontend: ['React', 'TypeScript', 'Tailwind CSS'],
      Backend: ['Django', 'Python', 'PostgreSQL'],
      Design: ['Figma', 'UI/UX', 'Branding'],
    },
  },
  {
    id: 2,
    title: 'Junior Developer',
    company: 'Desiderata Consultancy',
    period: '2023 — 2024',
    category: 'FULL-TIME',
    description:
      'Built enterprise solutions for diverse clients. Created Laravel dashboards with complex data visualisation, implemented RESTful APIs improving integration by 35%, and reduced page load times by 60%.',
    achievements: [
      'Built 15+ client projects across multiple industries',
      'Reduced page load times by 60% through systematic optimisation',
      'Improved API integration efficiency by 35%',
    ],
    skillCategories: {
      Backend: ['Laravel', 'PHP', 'MySQL'],
      Frontend: ['JavaScript', 'Bootstrap', 'jQuery'],
      Data: ['Chart.js', 'DataTables'],
    },
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Techlungs Technology',
    period: '2022 — 2023',
    category: 'CONTRACT',
    description:
      'Specialised in creating engaging frontend experiences. Built 20+ high-converting landing pages achieving 8% conversion rates, reduced CSS bundle size by 45%, and created a reusable component library.',
    achievements: [
      'Built 20+ landing pages with 8% average conversion rate',
      'Reduced CSS bundle size by 45% through systematic refactoring',
      'Created reusable component library adopted across all projects',
    ],
    skillCategories: {
      Frontend: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      Tools: ['Webpack', 'Git', 'Figma'],
    },
  },
  {
    id: 4,
    title: 'ICT Intern',
    company: 'KNLS & Immigration Dept',
    period: '2021 — 2022',
    category: 'INTERNSHIP',
    description:
      'Gained foundational IT experience across government departments. Automated manual processes saving 15+ hours weekly, documented network infrastructure, and provided support to 50+ staff members.',
    achievements: [
      'Automated manual processes saving 15+ hours weekly',
      'Provided technical support to 50+ staff across departments',
      'Documented complete network infrastructure for two government bodies',
    ],
    skillCategories: {
      Support: ['Technical Support', 'Troubleshooting'],
      Systems: ['Network Documentation', 'Data Migration'],
      Software: ['MS Office', 'Database Management'],
    },
  },
]

const currentExp = computed(() => experiences[activeExperience.value])
const totalYears  = computed(() => new Date().getFullYear() - 2021)

const getAllSkills = (exp) => {
  const skills = []
  Object.values(exp.skillCategories).forEach((cat) => skills.push(...cat))
  return skills
}

const prevExperience = () => { if (activeExperience.value > 0) activeExperience.value-- }
const nextExperience = () => { if (activeExperience.value < experiences.length - 1) activeExperience.value++ }
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
}

/* ─── Section ────────────────────────────────────────── */
.exp-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ─── Card ───────────────────────────────────────────── */
.exp-card {
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

/* ambient glow — left side for experience */
.exp-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: radial-gradient(ellipse at 15% 35%, rgba(180, 100, 30, 0.13) 0%, transparent 65%);
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

.roles-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--accent-border);
  border-radius: 3rem;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-dim);
}

.roles-badge i { font-size: 0.68rem; }

/* ─── Main grid ──────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
  position: relative;
  z-index: 2;
}

/* ─── Left column ────────────────────────────────────── */
.left-col {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
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
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 800;
  color: var(--white);
}

.hl-outline {
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--white);
}

.hl-accent {
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 800;
  color: var(--accent);
}

.sub-desc {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.72;
  margin: 0.3rem 0 0;
  max-width: 400px;
}

/* ─── Timeline nav ───────────────────────────────────── */
.timeline-nav {
  display: flex;
  flex-direction: column;
}

.tl-item {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 1rem;
  cursor: pointer;
}

.tl-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3px;
}

.tl-dot {
  width: 10px;
  height: 10px;
  border: 2px solid var(--border);
  border-radius: 50%;
  background: #0d1117;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.tl-dot.current {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 8px rgba(201, 162, 59, 0.4);
}

.tl-item.active .tl-dot:not(.current) {
  border-color: var(--accent-border);
  background: var(--accent-dim);
}

.tl-line {
  width: 1px;
  flex: 1;
  background: var(--border);
  margin: 4px 0;
  min-height: 28px;
}

.tl-body {
  padding-bottom: 1.3rem;
  border-left: 2px solid transparent;
  padding-left: 0.9rem;
  margin-left: -0.9rem;
  transition: border-color 0.2s;
}

.tl-item.active .tl-body {
  border-left-color: var(--accent);
}

.tl-item:last-child .tl-body { padding-bottom: 0; }

.tl-top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.tl-period {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.04em;
}

.tl-current-badge {
  font-size: 0.54rem;
  font-weight: 700;
  padding: 0.12rem 0.5rem;
  border: 1px solid var(--accent-border);
  border-radius: 3rem;
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tl-role {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--white);
  margin: 0 0 0.12rem;
  transition: color 0.2s;
}

.tl-item:hover .tl-role { color: var(--accent); }

.tl-company {
  font-size: 0.74rem;
  color: var(--muted);
  margin: 0;
}

/* ─── Nav row ────────────────────────────────────────── */
.nav-row {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  color: var(--muted);
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
  border-color: var(--accent-border);
  color: var(--accent);
}

.nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.nav-counter {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.nc-current {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.nc-sep {
  font-size: 0.8rem;
  color: var(--dim);
}

.nc-total {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--dim);
}

/* ─── Right column: detail panel ────────────────────── */
.right-col { position: relative; z-index: 2; }

.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to     { opacity: 0; transform: translateY(-8px); }

.detail-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Terminal card */
.terminal-card {
  background: #080b0e;
  border: 1px solid var(--border);
  border-radius: 1.3rem;
  padding: 1.2rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  transition: border-color 0.2s;
}

.terminal-card:hover { border-color: var(--accent-border); }

.terminal-dots {
  display: flex;
  gap: 6px;
  margin-bottom: 0.9rem;
}

.terminal-dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.code-line {
  display: flex;
  gap: 0.6rem;
  font-size: 0.76rem;
  margin-bottom: 0.42rem;
  flex-wrap: wrap;
}

.prompt      { color: var(--accent); font-weight: 600; flex-shrink: 0; }
.cmd         { color: #b0bec5; }
.out         { color: var(--silver); opacity: 0.75; }
.out-accent  { color: var(--accent); font-weight: 600; }

/* Description */
.role-desc {
  font-size: 0.88rem;
  color: var(--muted);
  line-height: 1.75;
  margin: 0;
}

/* Role blocks */
.role-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.block-dot {
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}

.block-title {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* Achievements */
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}

.ach-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 50%;
  color: var(--accent);
  font-size: 0.55rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.achievement-item span {
  font-size: 0.83rem;
  color: var(--muted);
  line-height: 1.58;
}

/* Tech pills */
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tech-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 3rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--silver);
  transition: all 0.2s;
}

.tech-pill:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-dim);
}

/* Category tag */
.category-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.38rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 3rem;
  font-size: 0.66rem;
  font-weight: 700;
  color: var(--dim);
  letter-spacing: 0.1em;
  align-self: flex-start;
}

.category-tag i { font-size: 0.6rem; }

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

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .exp-card {
    padding: 1.6rem 1.4rem;
    border-radius: 1.5rem;
    gap: 1.8rem;
  }

  .hl-solid, .hl-outline, .hl-accent {
    font-size: clamp(2rem, 7vw, 3rem);
  }
}

@media (max-width: 480px) {
  .stat-divider { display: none; }

  .hl-solid, .hl-outline, .hl-accent {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
}
</style>