<template>
  <section id="skills" class="skills-section">
    <div class="skills-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">Expertise</span>
        </div>
        <div class="tech-count-badge">
          <i class="fas fa-microchip"></i>
          <span>{{ totalSkills }} Technologies</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="main-grid">

        <!-- LEFT: Headline + category selector -->
        <div class="left-col">
          <div class="headline-block">
            <p class="eyebrow">Technical Mastery</p>
            <h2 class="headline">
              <span class="hl-solid">Skills</span>
              <span class="hl-outline">Built</span>
              <span class="hl-accent">in Production</span>
            </h2>
            <p class="sub-desc">
              A curated stack refined through years of building production‑ready
              applications, SaaS platforms, and scalable digital systems.
            </p>
          </div>

          <!-- Category pill track -->
          <div class="cat-nav">
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
          <div class="summary-card">
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
          <div class="terminal-card">
            <div class="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="code-line">
              <span class="prompt">~/skills/{{ currentCategory.title.toLowerCase() }} $</span>
              <span class="cmd">ls --all</span>
            </div>
            <div class="code-line">
              <span class="prompt">></span>
              <span class="out">{{ currentCategory.skills.map(s => s.name).join('  ·  ') }}</span>
            </div>
            <div class="code-line">
              <span class="comment"># {{ currentCategory.skills.length }} packages loaded</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Skills grid -->
        <div class="right-col">
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

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ totalSkills }}</span>
          <span class="stat-desc">Technologies</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ skillCategories.length }}</span>
          <span class="stat-desc">Domains</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">3+</span>
          <span class="stat-desc">Years Practice</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-desc">Production Ready</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref(0)

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
      { name: 'Django',      icon: 'logos:django-icon'            },
      { name: 'Python',      icon: 'logos:python'                 },
      { name: 'Node.js',     icon: 'logos:nodejs-icon'            },
      { name: 'Express.js',  icon: 'skill-icons:expressjs-dark'   },
      { name: 'PHP Laravel', icon: 'logos:laravel'                },
      { name: 'REST APIs',   icon: 'lucide:api'                   },
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
      { name: 'Figma',       icon: 'logos:figma'              },
      { name: 'Photoshop',   icon: 'logos:adobe-photoshop'    },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator'  },
      { name: 'Canva',       icon: 'simple-icons:canva'       },
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

/* ─── Section wrapper ────────────────────────────────── */
.skills-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ─── Card ───────────────────────────────────────────── */
.skills-card {
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

/* ambient glow — right side for skills */
.skills-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  background: radial-gradient(ellipse at 80% 25%, rgba(180, 100, 30, 0.14) 0%, transparent 65%);
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

.tech-count-badge {
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

.tech-count-badge i { font-size: 0.7rem; }

/* ─── Main grid ──────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3rem;
  align-items: start;
  position: relative;
  z-index: 2;
}

/* ─── Left column ────────────────────────────────────── */
.left-col {
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
  max-width: 420px;
}

/* Category pill nav */
.cat-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.44rem 1rem;
  border: 1px solid var(--border);
  border-radius: 3rem;
  background: var(--bg-card);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.02em;
}

.cat-pill i { font-size: 0.7rem; }

.cat-pill:hover {
  border-color: var(--accent-border);
  color: var(--silver);
  background: rgba(201, 162, 59, 0.06);
}

.cat-pill.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #0d1117;
}

/* Summary card */
.summary-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.4rem;
  padding: 1.2rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.2s;
}

.summary-card:hover { border-color: var(--accent-border); }

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
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 0.75rem;
  color: var(--accent);
  font-size: 0.95rem;
  flex-shrink: 0;
}

.sc-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--white);
  margin: 0 0 0.2rem;
  letter-spacing: 0.02em;
}

.sc-desc {
  font-size: 0.76rem;
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
}

.sc-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border);
}

.sc-stat { display: flex; flex-direction: column; gap: 0.1rem; }

.sc-num {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
}

.sc-label {
  font-size: 0.62rem;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sc-divider {
  width: 1px;
  height: 2rem;
  background: var(--border);
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
  background: var(--border);
  transition: all 0.25s;
}

.prof-dot.filled {
  background: var(--accent);
  box-shadow: 0 0 6px rgba(201, 162, 59, 0.4);
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

.terminal-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.code-line {
  display: flex;
  gap: 0.6rem;
  font-size: 0.74rem;
  margin-bottom: 0.45rem;
  flex-wrap: wrap;
  word-break: break-all;
}

.prompt { color: var(--accent); font-weight: 600; flex-shrink: 0; }
.cmd    { color: #b0bec5; }
.out    { color: var(--silver); opacity: 0.75; }
.comment{ color: #4a5568; font-style: italic; }

/* ─── Right column: Skills grid ──────────────────────── */
.right-col { position: relative; z-index: 2; }

.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to     { opacity: 0; transform: translateY(-8px); }

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
}

.skill-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  padding: 1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.22s ease;
}

.skill-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
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
  border-radius: 0.5rem;
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
  color: var(--white);
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

.skill-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 1px;
  transition: width 0.55s ease;
}

.skill-dots {
  display: flex;
  gap: 4px;
}

.sk-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  transition: background 0.25s;
}

.sk-dot.filled {
  background: var(--accent);
  box-shadow: 0 0 5px rgba(201, 162, 59, 0.35);
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

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .skills-card {
    padding: 1.6rem 1.4rem;
    border-radius: 1.5rem;
    gap: 1.8rem;
  }

  .hl-solid, .hl-outline, .hl-accent {
    font-size: clamp(2rem, 7vw, 3rem);
  }
}

@media (max-width: 480px) {
  .skills-grid { grid-template-columns: 1fr; }
  .stat-divider { display: none; }

  .hl-solid, .hl-outline, .hl-accent {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
}
</style>