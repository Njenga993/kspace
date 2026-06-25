<template>
  <section id="experience" class="experience" ref="expRef">

    <!-- Section header -->
    <div class="experience__header anim" style="--d:0.08s">
      <div class="experience__label">
        <span class="experience__label-line"></span>
        <span class="experience__label-text">Career</span>
      </div>
      <div class="experience__count-badge">
        <i class="fas fa-briefcase"></i>
        <span>{{ experiences.length }} Roles · {{ totalYears }}+ Years</span>
      </div>
    </div>

    <!-- Main grid -->
    <div class="experience__main">

      <!-- LEFT: headline + timeline -->
      <div class="experience__left">

        <div class="experience__headline-block anim" style="--d:0.14s">
          <p class="experience__eyebrow anim" style="--d:0.18s">Professional Journey</p>
          <h2 class="experience__heading">
            <span class="experience__hl-solid anim" style="--d:0.24s">Career</span>
            <span class="experience__hl-outline anim" style="--d:0.34s">Growth</span>
            <span class="experience__hl-accent anim" style="--d:0.44s">& Impact.</span>
          </h2>
          <p class="experience__sub-desc anim" style="--d:0.50s">
            A timeline of evolution — from foundational training to leading
            digital transformation across multiple industries.
          </p>
        </div>

        <!-- Timeline selector -->
        <div class="experience__timeline">

          <div
            v-for="(exp, idx) in experiences"
            :key="exp.id"
            :class="['tl-item', { active: activeExperience === idx }, 'anim']"
            :style="{ '--d': 0.56 + idx * 0.07 + 's' }"
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
        <div class="experience__nav anim" style="--d:0.88s">
          <button
            class="nav-btn"
            :disabled="activeExperience === 0"
            @click="prevExperience"
            aria-label="Previous"
          >
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="nav-counter">
            <Transition name="counter-flip" mode="out-in">
              <span class="nc-current" :key="activeExperience">
                {{ String(activeExperience + 1).padStart(2, '0') }}
              </span>
            </Transition>
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

      <!-- RIGHT: detail panel -->
      <div class="experience__right anim" style="--d:0.62s">
        <Transition name="panel-fade" mode="out-in">
          <div :key="activeExperience" class="detail-panel">

            <!-- Terminal header -->
            <div class="terminal panel-item" style="--pd:0.05s">
              <div class="terminal__dots"><span></span><span></span><span></span></div>
              <div class="terminal__row">
                <span class="terminal__prompt">~/career/{{ currentExp.company.split(' ')[0].toLowerCase() }} $</span>
                <span class="terminal__cmd">cat role.txt</span>
              </div>
              <div class="terminal__row">
                <span class="terminal__prompt">›</span>
                <span class="terminal__out--accent">{{ currentExp.title }}</span>
              </div>
              <div class="terminal__row">
                <span class="terminal__prompt">›</span>
                <span class="terminal__out">{{ currentExp.company }} · {{ currentExp.period }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="role-desc panel-item" style="--pd:0.13s">{{ currentExp.description }}</p>

            <!-- Achievements -->
            <div class="role-block panel-item" style="--pd:0.22s">
              <div class="block-header">
                <span class="block-dot"></span>
                <span class="block-title">Key Achievements</span>
              </div>
              <div class="achievements-list">
                <div
                  v-for="(achievement, ai) in currentExp.achievements.slice(0, 3)"
                  :key="achievement"
                  class="achievement-item panel-item"
                  :style="{ '--pd': 0.28 + ai * 0.07 + 's' }"
                >
                  <div class="ach-icon">
                    <i class="fas fa-check"></i>
                  </div>
                  <span>{{ achievement }}</span>
                </div>
              </div>
            </div>

            <!-- Technologies -->
            <div class="role-block panel-item" style="--pd:0.50s">
              <div class="block-header">
                <span class="block-dot"></span>
                <span class="block-title">Technologies Used</span>
              </div>
              <div class="tech-pills">
                <span
                  v-for="(skill, si) in getAllSkills(currentExp).slice(0, 8)"
                  :key="skill"
                  class="tech-pill panel-item panel-item--pop"
                  :style="{ '--pd': 0.56 + si * 0.04 + 's' }"
                >{{ skill }}</span>
              </div>
            </div>

            <!-- Category tag -->
            <div class="category-tag panel-item" style="--pd:0.88s">
              <i class="fas fa-tag"></i>
              {{ currentExp.category }}
            </div>

          </div>
        </Transition>
      </div>

    </div>

    <!-- Bottom strip -->
    <div class="experience__strip anim" style="--d:0.96s">
      <div class="strip-stats">
        <div class="strip-stat">
          <span class="ss-num">{{ totalYears }}+</span>
          <span class="ss-label">Years</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">{{ experiences.length }}</span>
          <span class="ss-label">Roles</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">4</span>
          <span class="ss-label">Industries</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">100%</span>
          <span class="ss-label">Impact</span>
        </div>
      </div>
      <p class="strip-note">
        Currently at <strong>{{ experiences[0].company }}</strong> — building digital products that scale.
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const expRef = ref(null)
const activeExperience = ref(0)

/* ── Data ────────────────────────────────────────────── */
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
const totalYears = computed(() => new Date().getFullYear() - 2021)

const getAllSkills = (exp) => {
  const skills = []
  Object.values(exp.skillCategories).forEach((cat) => skills.push(...cat))
  return skills
}

const prevExperience = () => { if (activeExperience.value > 0) activeExperience.value-- }
const nextExperience = () => { if (activeExperience.value < experiences.length - 1) activeExperience.value++ }

/* ── Scroll trigger ──────────────────────────────────── */
onMounted(() => {
  const section = expRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        section.classList.add('in-view')
        io.unobserve(section)
      }
    })
  }, { threshold: 0.06 })

  io.observe(section)
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   NO :root — all colors hardcoded. Orange #ff5500 palette.
   ═══════════════════════════════════════════════════════ */

/* ── Animation system ────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.in-view .anim {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .anim { transition-duration: 0.01ms !important; opacity: 1 !important; transform: none !important; }
  .panel-item { animation: none !important; opacity: 1 !important; transform: none !important; }
  .counter-flip-enter-active, .counter-flip-leave-active { transition-duration: 0.01ms !important; }
}

/* ── Section shell (full-bleed) ─────────────────────── */
.experience {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px) clamp(40px, 6vh, 80px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vh, 48px);
}

/* ── Section header ──────────────────────────────────── */
.experience__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.experience__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.experience__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.experience__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.experience__count-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 1rem;
  border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #ff5500;
  background: rgba(255, 85, 0, 0.06);
}

.experience__count-badge i { font-size: 0.66rem; }

/* ── Main grid ───────────────────────────────────────── */
.experience__main {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* ── Left column ─────────────────────────────────────── */
.experience__left {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.experience__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.experience__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  gap: 0;
}

.experience__hl-solid,
.experience__hl-outline,
.experience__hl-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.experience__hl-solid { color: #ffffff; }

.experience__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}

.experience__hl-accent {
  color: #ff5500;
  font-style: italic;
}

.experience__sub-desc {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #8a929e;
  max-width: 400px;
}

/* ── Timeline ────────────────────────────────────────── */
.experience__timeline {
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
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: #0a0a0a;
  flex-shrink: 0;
  transition: all 0.25s ease;
}

.tl-dot.current {
  border-color: #ff5500;
  background: #ff5500;
  box-shadow: 0 0 8px rgba(255, 85, 0, 0.5);
}

.tl-item.active .tl-dot:not(.current) {
  border-color: rgba(255, 85, 0, 0.3);
  background: rgba(255, 85, 0, 0.1);
}

.tl-line {
  width: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  margin: 4px 0;
  min-height: 28px;
  transition: background 0.25s ease;
}

.tl-item.active .tl-line {
  background: rgba(255, 85, 0, 0.2);
}

.tl-body {
  padding-bottom: 1.3rem;
  border-left: 2px solid transparent;
  padding-left: 0.9rem;
  margin-left: -0.9rem;
  transition: border-color 0.25s ease;
}

.tl-item.active .tl-body {
  border-left-color: rgba(255, 85, 0, 0.3);
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
  color: #ff5500;
  letter-spacing: 0.04em;
}

.tl-current-badge {
  font-size: 0.54rem;
  font-weight: 700;
  padding: 0.12rem 0.5rem;
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 999px;
  color: #ff5500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tl-role {
  font-size: 0.88rem;
  font-weight: 700;
  color: #c8cdd5;
  margin: 0 0 0.12rem;
  transition: color 0.25s ease;
}

.tl-item.active .tl-role { color: #ffffff; }
.tl-item:hover .tl-role { color: #ff5500; }

.tl-company {
  font-size: 0.74rem;
  color: #6b7585;
  margin: 0;
}

/* ── Nav row ─────────────────────────────────────────── */
.experience__nav {
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
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #6b7585;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-btn:hover:not(:disabled) {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

.nav-btn:disabled { opacity: 0.2; cursor: not-allowed; }

.nav-counter {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  min-width: 3rem;
}

.nc-current {
  font-size: 1.1rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  display: inline-block;
}

.nc-sep { font-size: 0.8rem; color: #3a4250; }

.nc-total { font-size: 0.88rem; font-weight: 500; color: #3a4250; }

.counter-flip-enter-active,
.counter-flip-leave-active { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
.counter-flip-enter-from { opacity: 0; transform: translateY(10px) scale(0.85); }
.counter-flip-leave-to { opacity: 0; transform: translateY(-10px) scale(0.85); }

/* ── Right column ────────────────────────────────────── */
.experience__right {
  position: relative;
}

.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to { opacity: 0; transform: translateY(-8px); }

.detail-panel {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

/* Panel cascade animations */
@keyframes panelItemIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes panelItemPop {
  from { opacity: 0; transform: translateY(8px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.panel-item {
  opacity: 0;
  animation: panelItemIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--pd, 0s);
}

.panel-item--pop {
  animation-name: panelItemPop;
  animation-duration: 0.38s;
}

/* ── Terminal ─────────────────────────────────────────── */
.terminal {
  background: #060809;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.1rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  transition: border-color 0.25s ease;
}

.terminal:hover { border-color: rgba(255, 85, 0, 0.25); }

.terminal__dots {
  display: flex;
  gap: 6px;
  margin-bottom: 0.85rem;
}

.terminal__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal__dots span:nth-child(1) { background: #ff5f56; }
.terminal__dots span:nth-child(2) { background: #ffbd2e; }
.terminal__dots span:nth-child(3) { background: #27c93f; }

.terminal__row {
  display: flex;
  gap: 0.55rem;
  font-size: 0.72rem;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.terminal__prompt { color: #ff5500; font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #5a6270; }
.terminal__out { color: #8a929e; opacity: 0.7; }
.terminal__out--accent { color: #ff5500; font-weight: 600; }

/* ── Role description ─────────────────────────────────── */
.role-desc {
  font-size: 0.88rem;
  color: #9aa3af;
  line-height: 1.75;
  margin: 0;
}

/* ── Role blocks ──────────────────────────────────────── */
.role-block {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.block-dot {
  width: 5px;
  height: 5px;
  background: #ff5500;
  border-radius: 50%;
  flex-shrink: 0;
}

.block-title {
  font-size: 0.66rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

/* ── Achievements ────────────────────────────────────── */
.achievements-list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.ach-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 85, 0, 0.1);
  border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 50%;
  color: #ff5500;
  font-size: 0.5rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.achievement-item span {
  font-size: 0.82rem;
  color: #9aa3af;
  line-height: 1.58;
}

/* ── Tech pills ───────────────────────────────────────── */
.tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.32rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  color: #9aa3af;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.tech-pill:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
  background: rgba(255, 85, 0, 0.06);
  transform: translateY(-2px);
}

/* ── Category tag ─────────────────────────────────────── */
.category-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.64rem;
  font-weight: 700;
  color: #5a6270;
  letter-spacing: 0.1em;
  align-self: flex-start;
}

.category-tag i { font-size: 0.58rem; }

/* ── Bottom strip ─────────────────────────────────────── */
.experience__strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: clamp(24px, 4vh, 40px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.strip-stats {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.strip-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ss-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.ss-label {
  font-size: 0.62rem;
  color: #5a6270;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.strip-divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.strip-note {
  margin: 0;
  font-size: 0.72rem;
  color: #4a5568;
}

.strip-note strong {
  color: #8a929e;
  font-weight: 600;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .experience__main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .experience__sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .experience {
    padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px);
  }

  .experience__hl-solid,
  .experience__hl-outline,
  .experience__hl-accent {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }

  .experience__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .strip-divider { display: none; }

  .experience__hl-solid,
  .experience__hl-outline,
  .experience__hl-accent {
    font-size: clamp(1.9rem, 8vw, 2.8rem);
  }
}
</style>