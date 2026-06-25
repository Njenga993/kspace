<template>
  <section id="skills" class="skills" ref="skillsRef">

    <!-- Section header -->
    <div class="skills__header anim" style="--d:0.08s">
      <div class="skills__label">
        <span class="skills__label-line"></span>
        <span class="skills__label-text">Expertise</span>
      </div>
      <div class="skills__count-badge">
        <i class="fas fa-microchip"></i>
        <span>{{ totalSkills }} Technologies</span>
      </div>
    </div>

    <!-- Main grid -->
    <div class="skills__main">

      <!-- LEFT: headline + category selector -->
      <div class="skills__left">

        <div class="skills__headline-block anim" style="--d:0.14s">
          <p class="skills__eyebrow anim" style="--d:0.18s">Technical Mastery</p>
          <h2 class="skills__heading">
            <span class="skills__hl-solid anim" style="--d:0.24s">Skills</span>
            <span class="skills__hl-outline anim" style="--d:0.34s">Built</span>
            <span class="skills__hl-accent anim" style="--d:0.44s">in Production.</span>
          </h2>
          <p class="skills__sub-desc anim" style="--d:0.50s">
            A curated stack refined through years of building production‑ready
            applications, SaaS platforms, and scalable digital systems.
          </p>
        </div>

        <!-- Category pill nav -->
        <div class="skills__cat-nav anim" style="--d:0.58s">
          <button
            v-for="(cat, idx) in skillCategories"
            :key="cat.title"
            :class="['cat-pill', { active: activeCategory === idx }]"
            @click="activeCategory = idx"
          >
            <i :class="cat.icon"></i>
            {{ cat.title }}
          </button>
        </div>

        <!-- Active category summary card -->
        <div class="summary-card anim" :class="{ flash: summaryFlash }" style="--d:0.64s">
          <div class="sc-header">
            <div class="sc-icon">
              <i :class="currentCategory.icon"></i>
            </div>
            <div>
              <p class="sc-title">{{ currentCategory.title }}</p>
              <p class="sc-desc">{{ currentCategory.description }}</p>
            </div>
          </div>
          <div class="sc-meta">
            <div class="sc-stat">
              <span class="sc-num">{{ currentCategory.skills.length }}</span>
              <span class="sc-label">Technologies</span>
            </div>
            <div class="sc-divider"></div>
            <div class="sc-stat">
              <span class="sc-num">{{ currentCategory.level }}/5</span>
              <span class="sc-label">Proficiency</span>
            </div>
            <div class="sc-divider"></div>
            <div class="proficiency-dots">
              <span
                v-for="i in 5"
                :key="i"
                :class="['prof-dot', { filled: i <= currentCategory.level }]"
              ></span>
            </div>
          </div>
        </div>

        <!-- Terminal card -->
        <div class="terminal anim" :class="{ flash: terminalFlash }" style="--d:0.72s">
          <div class="terminal__dots"><span></span><span></span><span></span></div>
          <div class="terminal__row">
            <span class="terminal__prompt">~/skills/{{ currentCategory.title.toLowerCase() }} $</span>
            <span class="terminal__cmd">ls --all</span>
          </div>
          <div class="terminal__row">
            <span class="terminal__prompt">›</span>
            <span class="terminal__out">{{ currentCategory.skills.map(s => s.name).join('  ·  ') }}</span>
          </div>
          <div class="terminal__row">
            <span class="terminal__comment"># {{ currentCategory.skills.length }} packages loaded</span>
          </div>
        </div>

      </div>

      <!-- RIGHT: Skills grid -->
      <div class="skills__right anim" style="--d:0.66s">
        <Transition name="panel-fade" mode="out-in">
          <div :key="activeCategory" class="skills-grid">
            <div
              v-for="skill in currentCategory.skills"
              :key="skill.name"
              class="skill-card"
            >
              <div class="skill-top">
                <div class="skill-icon-wrap">
                  <img
                    :src="`https://api.iconify.design/${skill.icon}.svg`"
                    :alt="skill.name"
                    class="skill-icon"
                  />
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <div class="skill-bar-wrap">
                <div class="skill-bar">
                  <div
                    class="skill-fill"
                    :style="{ width: getSkillLevel(skill.name) * 20 + '%' }"
                  ></div>
                </div>
                <div class="skill-dots">
                  <span
                    v-for="i in 5"
                    :key="i"
                    :class="['sk-dot', { filled: i <= getSkillLevel(skill.name) }]"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

    </div>

    <!-- Bottom strip -->
    <div class="skills__strip anim" style="--d:0.82s">
      <div class="strip-stats">
        <div class="strip-stat">
          <span class="ss-num">{{ totalSkills }}</span>
          <span class="ss-label">Technologies</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">{{ skillCategories.length }}</span>
          <span class="ss-label">Domains</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">3+</span>
          <span class="ss-label">Years Practice</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">100%</span>
          <span class="ss-label">Production Ready</span>
        </div>
      </div>
      <p class="strip-note">
        Strongest in <strong>Vue.js</strong>, <strong>JavaScript</strong>, and <strong>Git</strong> — the backbone of every project I ship.
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const skillsRef = ref(null)
const activeCategory = ref(0)
const summaryFlash = ref(false)
const terminalFlash = ref(false)

/* ── Category switch flash ───────────────────────────── */
watch(activeCategory, () => {
  summaryFlash.value = true
  terminalFlash.value = true
  setTimeout(() => {
    summaryFlash.value = false
    terminalFlash.value = false
  }, 80)
})

/* ── Scroll trigger ──────────────────────────────────── */
onMounted(() => {
  const section = skillsRef.value
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

/* ── Data ────────────────────────────────────────────── */
const skillCategories = [
  {
    title: 'Frontend',
    icon: 'fas fa-layer-group',
    level: 5,
    description: 'Crafting pixel-perfect, responsive interfaces with modern frameworks.',
    skills: [
      { name: 'Vue.js',       icon: 'logos:vue'               },
      { name: 'React',        icon: 'logos:react'             },
      { name: 'TypeScript',   icon: 'logos:typescript-icon'   },
      { name: 'JavaScript',   icon: 'logos:javascript'        },
      { name: 'HTML5',        icon: 'logos:html-5'            },
      { name: 'CSS3',         icon: 'logos:css-3'             },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon'  },
    ],
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    level: 4,
    description: 'Building scalable APIs and robust server-side architectures.',
    skills: [
      { name: 'Django',      icon: 'logos:django-icon'          },
      { name: 'Python',      icon: 'logos:python'               },
      { name: 'Node.js',     icon: 'logos:nodejs-icon'          },
      { name: 'Express.js',  icon: 'skill-icons:expressjs-dark' },
      { name: 'PHP Laravel', icon: 'logos:laravel'              },
      { name: 'REST APIs',   icon: 'lucide:api'                 },
    ],
  },
  {
    title: 'Database',
    icon: 'fas fa-database',
    level: 4,
    description: 'Designing efficient schemas and optimizing query performance.',
    skills: [
      { name: 'MySQL',      icon: 'logos:mysql-icon'              },
      { name: 'PostgreSQL', icon: 'logos:postgresql'              },
      { name: 'MongoDB',    icon: 'logos:mongodb-icon'            },
      { name: 'SQLite',     icon: 'vscode-icons:file-type-sqlite' },
    ],
  },
  {
    title: 'Design',
    icon: 'fas fa-pen-ruler',
    level: 4,
    description: 'Creating intuitive interfaces that balance form with function.',
    skills: [
      { name: 'Figma',       icon: 'logos:figma'             },
      { name: 'Photoshop',   icon: 'logos:adobe-photoshop'   },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
      { name: 'Canva',       icon: 'simple-icons:canva'      },
    ],
  },
  {
    title: 'DevOps',
    icon: 'fas fa-gears',
    level: 3,
    description: 'Streamlining deployments and maintaining robust CI/CD workflows.',
    skills: [
      { name: 'Git',    icon: 'logos:git-icon'    },
      { name: 'Docker', icon: 'logos:docker-icon' },
      { name: 'CI/CD',  icon: 'logos:jenkins'     },
      { name: 'AWS',    icon: 'logos:aws'         },
    ],
  },
]

const currentCategory = computed(() => skillCategories[activeCategory.value])

const totalSkills = computed(() =>
  skillCategories.reduce((t, c) => t + c.skills.length, 0)
)

const getSkillLevel = (name) => {
  const levels = {
    'Vue.js': 5, 'React': 4, 'TypeScript': 4, 'JavaScript': 5,
    'HTML5': 5, 'CSS3': 5, 'Tailwind CSS': 4, 'Django': 4,
    'Python': 4, 'Node.js': 4, 'Express.js': 4, 'PHP Laravel': 3,
    'REST APIs': 5, 'MySQL': 4, 'PostgreSQL': 4, 'MongoDB': 3,
    'SQLite': 4, 'Figma': 4, 'Photoshop': 3, 'Illustrator': 3,
    'Canva': 4, 'Git': 5, 'Docker': 3, 'CI/CD': 3, 'AWS': 2,
  }
  return levels[name] || 3
}
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
  .skill-card { animation: none !important; transform: none !important; }
  .skill-fill { animation: none !important; transform: none !important; }
}

/* ── Section shell (full-bleed) ─────────────────────── */
.skills {
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
.skills__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.skills__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.skills__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.skills__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.skills__count-badge {
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

.skills__count-badge i { font-size: 0.66rem; }

/* ── Main grid ───────────────────────────────────────── */
.skills__main {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* ── Left column ─────────────────────────────────────── */
.skills__left {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.skills__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.skills__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  gap: 0;
}

.skills__hl-solid,
.skills__hl-outline,
.skills__hl-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.skills__hl-solid { color: #ffffff; }

.skills__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}

.skills__hl-accent {
  color: #ff5500;
  font-style: italic;
}

.skills__sub-desc {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #8a929e;
  max-width: 420px;
}

/* ── Category pill nav ────────────────────────────────── */
.skills__cat-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.76rem;
  font-weight: 600;
  color: #8a929e;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
}

.cat-pill i { font-size: 0.68rem; }

.cat-pill:hover {
  border-color: rgba(255, 85, 0, 0.25);
  color: #c8cdd5;
  background: rgba(255, 85, 0, 0.04);
}

.cat-pill.active {
  background: #ff5500;
  border-color: #ff5500;
  color: #ffffff;
}

/* ── Summary card ────────────────────────────────────── */
.summary-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.2rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.25s ease, opacity 0.12s ease;
}

.summary-card:hover { border-color: rgba(255, 85, 0, 0.2); }
.summary-card.flash { opacity: 0.2; }

.sc-header {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.sc-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 85, 0, 0.08);
  border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 10px;
  color: #ff5500;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.sc-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.2rem;
  letter-spacing: 0.02em;
}

.sc-desc {
  font-size: 0.76rem;
  color: #8a929e;
  line-height: 1.55;
  margin: 0;
}

.sc-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.sc-stat { display: flex; flex-direction: column; gap: 0.1rem; }

.sc-num {
  font-size: 1.3rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.sc-label {
  font-size: 0.62rem;
  color: #5a6270;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sc-divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.proficiency-dots {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-left: auto;
}

.prof-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.25s ease;
}

.prof-dot.filled {
  background: #ff5500;
  box-shadow: 0 0 6px rgba(255, 85, 0, 0.5);
}

/* ── Terminal ─────────────────────────────────────────── */
.terminal {
  background: #060809;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.1rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  transition: border-color 0.25s ease, opacity 0.12s ease;
}

.terminal:hover { border-color: rgba(255, 85, 0, 0.25); }
.terminal.flash { opacity: 0.2; }

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
  word-break: break-all;
}

.terminal__prompt { color: #ff5500; font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #5a6270; }
.terminal__out { color: #8a929e; opacity: 0.7; }
.terminal__comment { color: #3a4250; font-style: italic; }

/* ── Right column: Skills grid ──────────────────────── */
.skills__right {
  position: relative;
}

.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Skill card stagger ──────────────────────────────── */
@keyframes skillCardIn {
  from { transform: translateY(18px); }
  to { transform: translateY(0); }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  animation: skillCardIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--card-delay, 0s);
}

.skill-card:nth-child(1) { --card-delay: 0.03s; }
.skill-card:nth-child(2) { --card-delay: 0.08s; }
.skill-card:nth-child(3) { --card-delay: 0.13s; }
.skill-card:nth-child(4) { --card-delay: 0.18s; }
.skill-card:nth-child(5) { --card-delay: 0.23s; }
.skill-card:nth-child(6) { --card-delay: 0.28s; }
.skill-card:nth-child(7) { --card-delay: 0.33s; }

.skill-card:hover {
  border-color: rgba(255, 85, 0, 0.25);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

.skill-top {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.skill-icon-wrap {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  flex-shrink: 0;
}

.skill-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.skill-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.01em;
}

.skill-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1px;
  overflow: hidden;
}

/* ── Skill bar fill animation ─────────────────────────── */
@keyframes fillBar {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.skill-fill {
  height: 100%;
  background: #ff5500;
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  animation: fillBar 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--fill-delay, 0s);
  /* Paused until scroll triggers .in-view */
  animation-play-state: paused;
}

.in-view .skill-fill {
  animation-play-state: running;
}

/* Stagger fills to follow card entrance */
.skill-card:nth-child(1) .skill-fill { --fill-delay: 0.18s; }
.skill-card:nth-child(2) .skill-fill { --fill-delay: 0.23s; }
.skill-card:nth-child(3) .skill-fill { --fill-delay: 0.28s; }
.skill-card:nth-child(4) .skill-fill { --fill-delay: 0.33s; }
.skill-card:nth-child(5) .skill-fill { --fill-delay: 0.38s; }
.skill-card:nth-child(6) .skill-fill { --fill-delay: 0.43s; }
.skill-card:nth-child(7) .skill-fill { --fill-delay: 0.48s; }

.skill-dots {
  display: flex;
  gap: 4px;
}

.sk-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.25s ease;
}

.sk-dot.filled {
  background: #ff5500;
  box-shadow: 0 0 5px rgba(255, 85, 0, 0.4);
}

/* ── Bottom strip ─────────────────────────────────────── */
.skills__strip {
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

/* ── Responsive ───────────────────────────────────────── */
@media (max-width: 1024px) {
  .skills__main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .skills__sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .skills {
    padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px);
  }

  .skills__hl-solid,
  .skills__hl-outline,
  .skills__hl-accent {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }

  .skills__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .skills-grid { grid-template-columns: 1fr; }
  .strip-divider { display: none; }

  .skills__hl-solid,
  .skills__hl-outline,
  .skills__hl-accent {
    font-size: clamp(1.9rem, 8vw, 2.8rem);
  }
}
</style>