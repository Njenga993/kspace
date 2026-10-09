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
            <span
              class="skills__hl-outline anim"
              style="--d:0.34s"
              @pointermove="onHeadMove"
              @pointerleave="onHeadLeave"
            >Built</span>
            <span class="skills__hl-accent anim" style="--d:0.44s">in Production.</span>
          </h2>
          <p class="skills__sub-desc anim" style="--d:0.50s">
            A curated stack refined through years of building production‑ready
            applications, SaaS platforms, and scalable digital systems.
          </p>
        </div>

        <!-- Category pill nav -->
        <div class="skills__cat-nav anim" style="--d:0.58s" role="tablist" aria-label="Skill categories">
          <button
            v-for="(cat, idx) in skillCategories"
            :key="cat.title"
            :class="['cat-pill', { active: activeCategory === idx }]"
            role="tab"
            :aria-selected="String(activeCategory === idx)"
            @click="activeCategory = idx"
          >
            <i :class="cat.icon"></i>
            {{ cat.title }}
            <span class="cat-pill__n">{{ cat.skills.length }}</span>
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
            <span class="terminal__out">{{ typed }}<span class="terminal__caret"></span></span>
          </div>
          <div class="terminal__row">
            <span class="terminal__comment"># {{ currentCategory.skills.length }} packages loaded</span>
          </div>
        </div>

      </div>

      <!-- RIGHT: proficiency orbit + skill list -->
      <div class="skills__right anim" style="--d:0.66s">

        <div class="stage" @mouseleave="hot = null">
          <div class="stage__grid" aria-hidden="true"></div>
          <div class="stage__glow" aria-hidden="true"></div>

          <!-- static ring guides (radius = proficiency) -->
          <div class="guides" aria-hidden="true">
            <div v-for="g in rings" :key="g.level" class="guide" :style="{ '--r': g.r }">
              <span class="guide__lbl">{{ g.level }}/5</span>
            </div>
          </div>

          <!-- orbiting skill nodes -->
          <Transition name="orbits" mode="out-in">
            <div :key="activeCategory" class="orbits">
              <div
                v-for="o in orbitData"
                :key="o.level"
                class="orbit"
                :style="{ '--r': o.r, '--dur': o.dur + 's', '--dir': o.dir, '--cdir': o.cdir }"
              >
                <button
                  v-for="n in o.nodes"
                  :key="n.name"
                  type="button"
                  class="node"
                  :class="{ 'is-hot': hot === n.name, 'is-dim': hot && hot !== n.name }"
                  :style="{ '--x': n.x + '%', '--y': n.y + '%', '--i': n.i }"
                  :aria-label="n.name + ', proficiency ' + n.level + ' of 5'"
                  @mouseenter="hot = n.name"
                  @focus="hot = n.name"
                  @blur="hot = null"
                >
                  <span class="node__in">
                    <span class="node__badge">
                      <img
                        v-if="!failedIcons.has(n.name)"
                        :src="`https://api.iconify.design/${n.icon}.svg`"
                        :alt="n.name"
                        class="node__img"
                        draggable="false"
                        @error="failedIcons.add(n.name)"
                      />
                      <b v-else>{{ n.name.slice(0, 2) }}</b>
                    </span>
                    <span class="node__tip">
                      {{ n.name }}
                      <em>{{ n.level }}/5</em>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </Transition>

          <!-- hub -->
          <Transition name="hub" mode="out-in">
            <div :key="'hub' + activeCategory" class="hub">
              <span class="hub__icon"><i :class="currentCategory.icon"></i></span>
              <span class="hub__title">{{ currentCategory.title }}</span>
              <span class="hub__sub">{{ currentCategory.skills.length }} technologies</span>
            </div>
          </Transition>

          <span class="stage__legend" aria-hidden="true">Closer to centre = stronger</span>
        </div>

        <!-- Skill list (same data, linked to the orbit) -->
        <Transition name="panel-fade" mode="out-in">
          <div :key="activeCategory" class="skills-grid">
            <div
              v-for="skill in currentCategory.skills"
              :key="skill.name"
              class="skill-card"
              :class="{ 'is-hot': hot === skill.name }"
              @mouseenter="hot = skill.name"
              @mouseleave="hot = null"
            >
              <div class="skill-top">
                <div class="skill-icon-wrap">
                  <img
                    v-if="!failedIcons.has(skill.name)"
                    :src="`https://api.iconify.design/${skill.icon}.svg`"
                    :alt="skill.name"
                    class="skill-icon"
                    @error="failedIcons.add(skill.name)"
                  />
                  <b v-else class="skill-fb">{{ skill.name.slice(0, 2) }}</b>
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
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const skillsRef = ref(null)
const activeCategory = ref(0)
const summaryFlash = ref(false)
const terminalFlash = ref(false)
const hot = ref(null)
const started = ref(false)
const typed = ref('')
const failedIcons = reactive(new Set())

/* ── Category switch flash ───────────────────────────── */
watch(activeCategory, () => {
  hot.value = null
  summaryFlash.value = true
  terminalFlash.value = true
  setTimeout(() => {
    summaryFlash.value = false
    terminalFlash.value = false
  }, 80)
})

/* ── Terminal typing ─────────────────────────────────── */
let typeTimer = null
watch([activeCategory, started], () => {
  if (typeTimer) clearInterval(typeTimer)
  const full = skillCategories[activeCategory.value].skills.map(s => s.name).join('  ·  ')
  if (!started.value) { typed.value = ''; return }
  typed.value = ''
  let i = 0
  typeTimer = setInterval(() => {
    i += 2
    typed.value = full.slice(0, i)
    if (i >= full.length) { clearInterval(typeTimer); typeTimer = null }
  }, 16)
})

/* ── Headline spotlight on the outlined word ─────────── */
function onHeadMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
function onHeadLeave(e) {
  e.currentTarget.style.removeProperty('--mx')
  e.currentTarget.style.removeProperty('--my')
}

/* ── Scroll trigger ──────────────────────────────────── */
onMounted(() => {
  const section = skillsRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        section.classList.add('in-view')
        started.value = true
        io.unobserve(section)
      }
    })
  }, { threshold: 0.06 })

  io.observe(section)
})

onUnmounted(() => { if (typeTimer) clearInterval(typeTimer) })

/* ── Orbit geometry ──────────────────────────────────── */
// ring radius (as a fraction of the stage) per proficiency level — stronger = closer to the hub
const RING = { 5: 0.34, 4: 0.52, 3: 0.70, 2: 0.88 }
const SPEED = { 5: 70, 4: 90, 3: 110, 2: 130 }
const rings = [5, 4, 3, 2].map(level => ({ level, r: RING[level] }))

const orbitData = computed(() => {
  const byLevel = {}
  currentCategory.value.skills.forEach((s, idx) => {
    const level = Math.min(5, Math.max(2, getSkillLevel(s.name)))
    ;(byLevel[level] ||= []).push({ ...s, level, idx })
  })
  return Object.keys(byLevel).map(Number).sort((a, b) => b - a).map((level, oi) => {
    const list = byLevel[level]
    const base = level * 41 + activeCategory.value * 17
    const nodes = list.map((s, j) => {
      const a = ((j / list.length) * 360 + base) * Math.PI / 180
      return {
        name: s.name, icon: s.icon, level: s.level,
        x: +(50 + 50 * Math.cos(a)).toFixed(2),
        y: +(50 + 50 * Math.sin(a)).toFixed(2),
        i: s.idx,
      }
    })
    const reverse = oi % 2 === 1
    return {
      level, r: RING[level], dur: SPEED[level], nodes,
      dir: reverse ? 'reverse' : 'normal',
      cdir: reverse ? 'normal' : 'reverse',
    }
  })
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
/* Tokens on .skills itself (scoped :root never matches <html>) */
.skills {
  --acc: #ff5500;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --bd: rgba(255,255,255,0.07);

  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px) clamp(40px, 6vh, 80px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vh, 48px);
}

/* ── Animation system ────────────────────────────────── */
.anim { opacity: 0; transform: translateY(24px); transition: opacity 0.75s var(--ease), transform 0.75s var(--ease); transition-delay: var(--d, 0s); }
.in-view .anim { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .anim { transition-duration: 0.01ms !important; opacity: 1 !important; transform: none !important; }
  .skill-card, .skill-fill, .orbit, .node__in, .node, .hub, .stage__glow, .terminal__caret { animation: none !important; transform: none; }
  .skill-fill { transform: scaleX(1) !important; }
}

/* ── Section header ──────────────────────────────────── */
.skills__header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.skills__label { display: flex; align-items: center; gap: 0.75rem; }
.skills__label-line { display: block; width: 32px; height: 1px; background: var(--acc); }
.skills__label-text { font-size: 0.72rem; font-weight: 700; color: var(--acc); letter-spacing: 0.18em; text-transform: uppercase; }
.skills__count-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.38rem 1rem; border: 1px solid rgba(255,85,0,0.25); border-radius: 999px; font-size: 0.7rem; font-weight: 600; color: var(--acc); background: rgba(255,85,0,0.06); }
.skills__count-badge i { font-size: 0.66rem; }

/* ── Main grid ───────────────────────────────────────── */
.skills__main { display: grid; grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr); gap: clamp(32px, 5vw, 72px); align-items: start; }

/* ── Left column ─────────────────────────────────────── */
.skills__left { display: flex; flex-direction: column; gap: 1.6rem; min-width: 0; }
.skills__eyebrow { margin: 0 0 1.1rem; font-size: 0.8rem; font-weight: 700; color: var(--acc); letter-spacing: 0.14em; text-transform: uppercase; }
.skills__heading { margin: 0; display: flex; flex-direction: column; line-height: 0.92; }
.skills__hl-solid, .skills__hl-outline, .skills__hl-accent { display: block; width: fit-content; max-width: 100%; font-size: clamp(2.8rem, 5.5vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; }
.skills__hl-solid { color: #fff; }
.skills__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.38);
  background: radial-gradient(200px circle at var(--mx, -400px) var(--my, -400px), var(--acc) 0%, rgba(255,85,0,0) 100%);
  -webkit-background-clip: text; background-clip: text;
}
.skills__hl-accent { color: var(--acc); font-style: italic; }
.skills__sub-desc { margin: 1.1rem 0 0; font-size: 0.92rem; line-height: 1.75; color: #8a929e; max-width: 420px; }

/* ── Category pill nav ───────────────────────────────── */
.skills__cat-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cat-pill {
  display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.7rem 0.45rem 0.95rem;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; background: rgba(255,255,255,0.02);
  font-size: 0.76rem; font-weight: 600; color: #8a929e; cursor: pointer;
  transition: all 0.25s var(--ease); font-family: 'Inter', sans-serif; letter-spacing: 0.02em;
}
.cat-pill i { font-size: 0.68rem; }
.cat-pill__n { min-width: 18px; height: 18px; padding: 0 5px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; font-size: 0.6rem; background: rgba(255,255,255,0.07); color: #9aa3af; transition: all 0.25s ease; }
.cat-pill:hover { border-color: rgba(255,85,0,0.25); color: #c8cdd5; background: rgba(255,85,0,0.04); }
.cat-pill.active { background: var(--acc); border-color: var(--acc); color: #fff; box-shadow: 0 8px 22px rgba(255,85,0,0.25); }
.cat-pill.active .cat-pill__n { background: rgba(255,255,255,0.22); color: #fff; }

/* ── Summary card ────────────────────────────────────── */
.summary-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 1.2rem 1.3rem; display: flex; flex-direction: column; gap: 1rem; transition: border-color 0.25s ease, opacity 0.12s ease; }
.summary-card:hover { border-color: rgba(255,85,0,0.2); }
.summary-card.flash { opacity: 0.2; }
.sc-header { display: flex; align-items: flex-start; gap: 0.9rem; }
.sc-icon { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: rgba(255,85,0,0.08); border: 1px solid rgba(255,85,0,0.25); border-radius: 10px; color: var(--acc); font-size: 0.9rem; flex-shrink: 0; }
.sc-title { font-size: 0.88rem; font-weight: 700; color: #fff; margin: 0 0 0.2rem; letter-spacing: 0.02em; }
.sc-desc { font-size: 0.76rem; color: #8a929e; line-height: 1.55; margin: 0; }
.sc-meta { display: flex; align-items: center; gap: 1rem; padding-top: 0.8rem; border-top: 1px solid rgba(255,255,255,0.06); }
.sc-stat { display: flex; flex-direction: column; gap: 0.1rem; }
.sc-num { font-size: 1.3rem; font-weight: 800; color: var(--acc); letter-spacing: -0.02em; line-height: 1; }
.sc-label { font-size: 0.62rem; color: #5a6270; text-transform: uppercase; letter-spacing: 0.08em; }
.sc-divider { width: 1px; height: 2rem; background: rgba(255,255,255,0.06); flex-shrink: 0; }
.proficiency-dots { display: flex; gap: 5px; align-items: center; margin-left: auto; }
.prof-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.08); transition: all 0.25s ease; }
.prof-dot.filled { background: var(--acc); box-shadow: 0 0 6px rgba(255,85,0,0.5); }

/* ── Terminal ────────────────────────────────────────── */
.terminal { background: #060809; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 1.1rem 1.3rem 1rem; font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace; transition: border-color 0.25s ease, opacity 0.12s ease; }
.terminal:hover { border-color: rgba(255,85,0,0.25); }
.terminal.flash { opacity: 0.2; }
.terminal__dots { display: flex; gap: 6px; margin-bottom: 0.85rem; }
.terminal__dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal__dots span:nth-child(1) { background: #ff5f56; }
.terminal__dots span:nth-child(2) { background: #ffbd2e; }
.terminal__dots span:nth-child(3) { background: #27c93f; }
.terminal__row { display: flex; gap: 0.55rem; font-size: 0.72rem; margin-bottom: 0.4rem; flex-wrap: wrap; word-break: break-word; min-height: 1.2em; }
.terminal__prompt { color: var(--acc); font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #5a6270; }
.terminal__out { color: #a1a9b5; }
.terminal__caret { display: inline-block; width: 6px; height: 0.95em; margin-left: 2px; vertical-align: -0.12em; background: var(--acc); animation: blink 1s step-end infinite; }
.terminal__comment { color: #3a4250; font-style: italic; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* ═══════════════ RIGHT: ORBIT STAGE ═══════════════ */
.skills__right { position: relative; display: flex; flex-direction: column; gap: 1.1rem; min-width: 0; }

.stage {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  aspect-ratio: 1;
  border-radius: 28px;
  border: 1px solid var(--bd);
  background: radial-gradient(circle at 50% 50%, rgba(255,85,0,0.07), transparent 62%), #0b0b0d;
  overflow: hidden;
  isolation: isolate;
}
.stage__grid {
  position: absolute; inset: 0; z-index: -2; opacity: 0.5;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 36px 36px;
  -webkit-mask-image: radial-gradient(circle at center, #000 30%, transparent 75%);
          mask-image: radial-gradient(circle at center, #000 30%, transparent 75%);
}
.stage__glow {
  position: absolute; left: 50%; top: 50%; width: 46%; aspect-ratio: 1; z-index: -1;
  translate: -50% -50%; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,85,0,0.28), transparent 68%);
  filter: blur(12px);
  animation: breathe 5s ease-in-out infinite;
}
@keyframes breathe { 0%, 100% { opacity: 0.55; scale: 0.92; } 50% { opacity: 1; scale: 1.08; } }

/* ring guides */
.guides { position: absolute; inset: 0; }
.guide {
  position: absolute; left: 50%; top: 50%; width: calc(var(--r) * 100%); aspect-ratio: 1;
  translate: -50% -50%; border-radius: 50%;
  border: 1px dashed rgba(255,255,255,0.1);
}
.guide:first-child { border-color: rgba(255,85,0,0.3); }
.guide__lbl {
  position: absolute; left: 50%; top: 0; translate: -50% -50%;
  padding: 0.12rem 0.4rem; border-radius: 999px; background: #0b0b0d;
  font-size: 0.56rem; font-weight: 700; letter-spacing: 0.06em; color: #6b7585; font-variant-numeric: tabular-nums;
}
.guide:first-child .guide__lbl { color: var(--acc); }

/* orbits */
.orbits { position: absolute; inset: 0; }
.orbit {
  position: absolute; left: 50%; top: 50%; width: calc(var(--r) * 100%); aspect-ratio: 1;
  translate: -50% -50%;
  animation: spin var(--dur) linear infinite;
  animation-direction: var(--dir);
  pointer-events: none;
}
@keyframes spin { to { rotate: 360deg; } }
.stage:hover .orbit, .stage:hover .node__in, .stage:focus-within .orbit, .stage:focus-within .node__in { animation-play-state: paused; }

.node {
  position: absolute; left: var(--x); top: var(--y);
  width: 0; height: 0; padding: 0; border: 0; background: none; cursor: pointer;
  pointer-events: auto; outline: none;
  animation: nodeIn 0.6s var(--ease) both;
  animation-delay: calc(0.12s + var(--i) * 0.06s);
}
@keyframes nodeIn { from { opacity: 0; scale: 0.3; } to { opacity: 1; scale: 1; } }

.node__in {
  position: absolute; left: 0; top: 0; translate: -50% -50%;
  animation: spin var(--dur) linear infinite;
  animation-direction: var(--cdir);   /* counter-spin keeps logos upright */
}
.node__badge {
  display: flex; align-items: center; justify-content: center;
  width: clamp(34px, 8vw, 48px); height: clamp(34px, 8vw, 48px);
  border-radius: 14px; background: rgba(22,22,26,0.92);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 22px rgba(0,0,0,0.5);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  transition: transform 0.35s var(--ease), border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
}
.node__img { width: 56%; height: 56%; object-fit: contain; pointer-events: none; }
.node__badge b { font-size: 0.7rem; color: #c8cdd5; font-weight: 800; letter-spacing: 0.02em; }
.node.is-hot .node__badge, .node:focus-visible .node__badge {
  transform: scale(1.28); border-color: var(--acc);
  box-shadow: 0 0 0 4px rgba(255,85,0,0.15), 0 0 28px rgba(255,85,0,0.5);
}
.node.is-dim .node__badge { opacity: 0.32; }

.node__tip {
  position: absolute; left: 50%; bottom: calc(100% + 10px); translate: -50% 4px;
  display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap;
  padding: 0.35rem 0.7rem; border-radius: 10px;
  background: #fff; color: #0a0a0b; font-size: 0.7rem; font-weight: 700;
  opacity: 0; pointer-events: none; z-index: 5;
  transition: opacity 0.2s ease, translate 0.3s var(--ease);
}
.node__tip em { font-style: normal; font-size: 0.62rem; color: var(--acc); font-weight: 800; }
.node.is-hot .node__tip, .node:focus-visible .node__tip { opacity: 1; translate: -50% 0; }
.node.is-hot { z-index: 6; }

.orbits-enter-active { transition: opacity 0.35s ease; }
.orbits-leave-active { transition: opacity 0.18s ease; }
.orbits-enter-from, .orbits-leave-to { opacity: 0; }

/* hub */
.hub {
  position: absolute; left: 50%; top: 50%; translate: -50% -50%;
  width: 26%; aspect-ratio: 1; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15rem;
  background: radial-gradient(circle at 35% 30%, #20140e, #0c0c0e 70%);
  border: 1px solid rgba(255,85,0,0.4);
  box-shadow: 0 0 0 6px rgba(255,85,0,0.06), 0 0 40px rgba(255,85,0,0.25), inset 0 0 24px rgba(255,85,0,0.1);
  text-align: center; z-index: 3;
}
.hub__icon { color: var(--acc); font-size: clamp(0.9rem, 2.4vw, 1.4rem); }
.hub__title { font-size: clamp(0.62rem, 1.5vw, 0.86rem); font-weight: 800; color: #fff; letter-spacing: -0.01em; }
.hub__sub { font-size: clamp(0.42rem, 1vw, 0.56rem); letter-spacing: 0.1em; text-transform: uppercase; color: #8a929e; }
.hub-enter-active { transition: opacity 0.35s ease 0.1s, scale 0.45s var(--ease) 0.1s; }
.hub-leave-active { transition: opacity 0.15s ease, scale 0.15s ease; }
.hub-enter-from, .hub-leave-to { opacity: 0; scale: 0.85; }

.stage__legend { position: absolute; left: 50%; bottom: 14px; translate: -50% 0; font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase; color: #5a6270; white-space: nowrap; }

/* ── Skill list (linked to orbit) ────────────────────── */
.panel-fade-enter-active, .panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to { opacity: 0; transform: translateY(-8px); }

@keyframes skillCardIn { from { transform: translateY(18px); } to { transform: translateY(0); } }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(168px, 1fr)); gap: 0.65rem; }
.skill-card {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 0.85rem 1rem;
  display: flex; flex-direction: column; gap: 0.65rem;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  animation: skillCardIn 0.45s var(--ease) both; animation-delay: var(--card-delay, 0s);
}
.skill-card:nth-child(1) { --card-delay: 0.03s; } .skill-card:nth-child(2) { --card-delay: 0.08s; }
.skill-card:nth-child(3) { --card-delay: 0.13s; } .skill-card:nth-child(4) { --card-delay: 0.18s; }
.skill-card:nth-child(5) { --card-delay: 0.23s; } .skill-card:nth-child(6) { --card-delay: 0.28s; }
.skill-card:nth-child(7) { --card-delay: 0.33s; }
.skill-card:hover, .skill-card.is-hot { border-color: rgba(255,85,0,0.4); background: rgba(255,85,0,0.05); transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.35); }

.skill-top { display: flex; align-items: center; gap: 0.65rem; }
.skill-icon-wrap { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.04); border-radius: 8px; flex-shrink: 0; }
.skill-icon { width: 18px; height: 18px; object-fit: contain; }
.skill-fb { font-size: 0.6rem; color: #c8cdd5; }
.skill-name { font-size: 0.8rem; font-weight: 600; color: #fff; letter-spacing: 0.01em; }
.skill-bar-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
.skill-bar { height: 2px; background: rgba(255,255,255,0.06); border-radius: 1px; overflow: hidden; }

@keyframes fillBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.skill-fill { height: 100%; background: var(--acc); border-radius: 1px; transform: scaleX(0); transform-origin: left; animation: fillBar 0.6s var(--ease) both; animation-delay: var(--fill-delay, 0s); animation-play-state: paused; }
.in-view .skill-fill { animation-play-state: running; }
.skill-card:nth-child(1) .skill-fill { --fill-delay: 0.18s; } .skill-card:nth-child(2) .skill-fill { --fill-delay: 0.23s; }
.skill-card:nth-child(3) .skill-fill { --fill-delay: 0.28s; } .skill-card:nth-child(4) .skill-fill { --fill-delay: 0.33s; }
.skill-card:nth-child(5) .skill-fill { --fill-delay: 0.38s; } .skill-card:nth-child(6) .skill-fill { --fill-delay: 0.43s; }
.skill-card:nth-child(7) .skill-fill { --fill-delay: 0.48s; }

.skill-dots { display: flex; gap: 4px; }
.sk-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.08); transition: background 0.25s ease; }
.sk-dot.filled { background: var(--acc); box-shadow: 0 0 5px rgba(255,85,0,0.4); }

/* ── Bottom strip ────────────────────────────────────── */
.skills__strip { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem; padding-top: clamp(24px, 4vh, 40px); border-top: 1px solid rgba(255,255,255,0.06); }
.strip-stats { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
.strip-stat { display: flex; flex-direction: column; gap: 0.1rem; }
.ss-num { font-size: 1.5rem; font-weight: 800; color: var(--acc); letter-spacing: -0.02em; line-height: 1; }
.ss-label { font-size: 0.62rem; color: #5a6270; text-transform: uppercase; letter-spacing: 0.1em; }
.strip-divider { width: 1px; height: 2rem; background: rgba(255,255,255,0.06); flex-shrink: 0; }
.strip-note { margin: 0; font-size: 0.72rem; color: #5b6678; }
.strip-note strong { color: #8a929e; font-weight: 600; }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .skills__main { grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
  .skills__sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .skills { padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px); }
  .skills__hl-solid, .skills__hl-outline, .skills__hl-accent { font-size: clamp(2.2rem, 9vw, 3.5rem); }
  .skills__strip { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .stage { border-radius: 22px; }
}

@media (max-width: 480px) {
  .skills-grid { grid-template-columns: 1fr 1fr; }
  .strip-divider { display: none; }
  .skills__hl-solid, .skills__hl-outline, .skills__hl-accent { font-size: clamp(1.9rem, 8vw, 2.8rem); }
  .guide__lbl { font-size: 0.5rem; padding: 0.08rem 0.3rem; }
  .stage__legend { font-size: 0.5rem; }
  .skill-card { padding: 0.75rem 0.8rem; }
}
</style>