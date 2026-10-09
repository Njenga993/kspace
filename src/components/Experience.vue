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

      <!-- LEFT: headline + commit history -->
      <div class="experience__left">

        <div class="experience__headline-block anim" style="--d:0.14s">
          <p class="experience__eyebrow anim" style="--d:0.18s">Professional Journey</p>
          <h2 class="experience__heading">
            <span class="experience__hl-solid anim" style="--d:0.24s">Career</span>
            <span
              class="experience__hl-outline anim"
              style="--d:0.34s"
              @pointermove="onHeadMove"
              @pointerleave="onHeadLeave"
            >Growth</span>
            <span class="experience__hl-accent anim" style="--d:0.44s">& Impact.</span>
          </h2>
          <p class="experience__sub-desc anim" style="--d:0.50s">
            A timeline of evolution — from foundational training to leading
            digital transformation across multiple industries.
          </p>
        </div>

        <!-- Commit history (the timeline selector) -->
        <div class="log-wrap anim" style="--d:0.56s">
          <div class="log-title">
            <span class="log-title__cmd"><b>$</b> git log --oneline --graph</span>
            <span class="log-title__hint">↑ ↓ to navigate</span>
          </div>

          <ol class="log" role="tablist" aria-orientation="vertical" aria-label="Career history" @keydown="onLogKey">
            <li
              v-for="(exp, idx) in experiences"
              :key="exp.id"
              class="commit"
              :class="{ active: activeExperience === idx, passed: idx < activeExperience }"
            >
              <button
                type="button"
                class="commit__btn"
                role="tab"
                :ref="el => { if (el) tabEls[idx] = el }"
                :aria-selected="String(activeExperience === idx)"
                :tabindex="activeExperience === idx ? 0 : -1"
                @click="select(idx)"
              >
                <span class="commit__rail" aria-hidden="true">
                  <span class="commit__node" :class="{ head: idx === 0 }"></span>
                </span>
                <span class="commit__body">
                  <span class="commit__top">
                    <code class="commit__hash">{{ hashOf(exp) }}</code>
                    <span v-if="idx === 0" class="ref ref--head">HEAD → main</span>
                    <span v-if="idx === experiences.length - 1" class="ref ref--init">initial commit</span>
                    <span class="commit__period">{{ exp.period }}</span>
                    <span v-if="idx === 0" class="tl-current-badge">Current</span>
                  </span>
                  <span class="commit__role">{{ exp.title }}</span>
                  <span class="commit__co">{{ exp.company }}</span>
                </span>
              </button>
            </li>
          </ol>
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

      <!-- RIGHT: diff-view detail panel -->
      <div class="experience__right anim" style="--d:0.62s">
        <div class="panel-shell" ref="shellRef" @pointermove="onShellMove" @pointerleave="onShellLeave">
          <div class="panel-glow" aria-hidden="true"></div>

          <Transition name="panel-fade" mode="out-in">
            <div :key="activeExperience" class="detail-panel">

              <!-- Terminal header -->
              <div class="terminal panel-item" style="--pd:0.05s">
                <div class="terminal__bar">
                  <div class="terminal__dots"><span></span><span></span><span></span></div>
                  <span class="terminal__hash">git show {{ hashOf(currentExp) }}</span>
                  <span class="category-tag">
                    <i class="fas fa-tag"></i>
                    {{ currentExp.category }}
                  </span>
                </div>
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

              <!-- Achievements — rendered as added lines of a diff -->
              <div class="role-block panel-item" style="--pd:0.22s">
                <div class="block-header">
                  <span class="block-dot"></span>
                  <span class="block-title">Key Achievements</span>
                </div>
                <div class="diff">
                  <div class="diff__hunk">@@ -0,0 +1,{{ currentExp.achievements.length }} @@ {{ currentExp.company }}</div>
                  <div
                    v-for="(achievement, ai) in currentExp.achievements"
                    :key="achievement"
                    class="diff__line panel-item"
                    :style="{ '--pd': 0.3 + ai * 0.12 + 's' }"
                  >
                    <span class="diff__no">{{ ai + 1 }}</span>
                    <span class="diff__sign">+</span>
                    <span class="diff__txt">{{ achievement }}</span>
                  </div>
                </div>
              </div>

              <!-- Technologies, grouped like a dependency manifest -->
              <div class="role-block panel-item" style="--pd:0.55s">
                <div class="block-header">
                  <span class="block-dot"></span>
                  <span class="block-title">Technologies Used</span>
                </div>
                <div class="deps">
                  <div
                    v-for="(list, cat, gi) in currentExp.skillCategories"
                    :key="cat"
                    class="dep"
                  >
                    <span class="dep__cat">{{ cat }}</span>
                    <div class="tech-pills">
                      <span
                        v-for="(skill, si) in list"
                        :key="skill"
                        class="tech-pill panel-item panel-item--pop"
                        :style="{ '--pd': 0.62 + gi * 0.1 + si * 0.04 + 's' }"
                      >{{ skill }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer stat -->
              <div class="diff-stat panel-item" style="--pd:0.95s">
                <span class="diff-stat__add">+{{ currentExp.achievements.length }}</span>
                achievements
                <span class="diff-stat__sep">·</span>
                {{ getAllSkills(currentExp).length }} technologies
              </div>

            </div>
          </Transition>
        </div>
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
import { ref, computed, nextTick, onMounted } from 'vue'

const expRef = ref(null)
const shellRef = ref(null)
const activeExperience = ref(0)
const tabEls = {}

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


const select = (idx) => { activeExperience.value = idx }

/* Decorative short "commit hash" — derived from company + period, so it's stable */
const hashOf = (exp) => {
  let h = 2166136261
  for (const c of exp.company + exp.period) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

/* Keyboard: arrows / Home / End move between roles */
function onLogKey(e) {
  const k = e.key
  let next = activeExperience.value
  if (k === 'ArrowDown' || k === 'ArrowRight') next = Math.min(next + 1, experiences.length - 1)
  else if (k === 'ArrowUp' || k === 'ArrowLeft') next = Math.max(next - 1, 0)
  else if (k === 'Home') next = 0
  else if (k === 'End') next = experiences.length - 1
  else return
  e.preventDefault()
  activeExperience.value = next
  nextTick(() => tabEls[next]?.focus())
}

/* Headline spotlight on the outlined word */
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

/* Cursor glow inside the detail panel */
function onShellMove(e) {
  const el = shellRef.value
  if (!el || e.pointerType === 'touch') return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - r.left}px`)
  el.style.setProperty('--gy', `${e.clientY - r.top}px`)
  el.classList.add('is-glow')
}
function onShellLeave() { shellRef.value?.classList.remove('is-glow') }

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
/* Tokens on .experience itself (a scoped :root never matches <html>) */
.experience {
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
  .panel-item { animation: none !important; opacity: 1 !important; transform: none !important; }
  .commit__node.head::after { animation: none !important; }
  .counter-flip-enter-active, .counter-flip-leave-active { transition-duration: 0.01ms !important; }
}

/* ── Section header ──────────────────────────────────── */
.experience__header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.experience__label { display: flex; align-items: center; gap: 0.75rem; }
.experience__label-line { display: block; width: 32px; height: 1px; background: var(--acc); }
.experience__label-text { font-size: 0.72rem; font-weight: 700; color: var(--acc); letter-spacing: 0.18em; text-transform: uppercase; }
.experience__count-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.38rem 1rem; border: 1px solid rgba(255,85,0,0.25); border-radius: 999px; font-size: 0.7rem; font-weight: 600; color: var(--acc); background: rgba(255,85,0,0.06); }
.experience__count-badge i { font-size: 0.66rem; }

/* ── Main grid ───────────────────────────────────────── */
.experience__main { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: clamp(32px, 5vw, 72px); align-items: start; }

/* ── Left column ─────────────────────────────────────── */
.experience__left { display: flex; flex-direction: column; gap: 1.8rem; min-width: 0; }
.experience__eyebrow { margin: 0 0 1.1rem; font-size: 0.8rem; font-weight: 700; color: var(--acc); letter-spacing: 0.14em; text-transform: uppercase; }
.experience__heading { margin: 0; display: flex; flex-direction: column; line-height: 0.92; }
.experience__hl-solid, .experience__hl-outline, .experience__hl-accent { display: block; width: fit-content; max-width: 100%; font-size: clamp(2.8rem, 5.5vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; }
.experience__hl-solid { color: #fff; }
.experience__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.38);
  background: radial-gradient(200px circle at var(--mx, -400px) var(--my, -400px), var(--acc) 0%, rgba(255,85,0,0) 100%);
  -webkit-background-clip: text; background-clip: text;
}
.experience__hl-accent { color: var(--acc); font-style: italic; }
.experience__sub-desc { margin: 1.1rem 0 0; font-size: 0.92rem; line-height: 1.75; color: #8a929e; max-width: 400px; }

/* ── Commit history ──────────────────────────────────── */
.log-wrap { display: flex; flex-direction: column; gap: 0.9rem; }
.log-title { display: flex; align-items: center; justify-content: space-between; gap: 1rem; font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.7rem; color: #6b7585; }
.log-title__cmd b { color: var(--acc); margin-right: 0.35rem; }
.log-title__hint { font-size: 0.6rem; letter-spacing: 0.08em; text-transform: uppercase; color: #3f4756; }

.log { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.commit { display: block; }
.commit__btn {
  display: grid; grid-template-columns: 22px minmax(0, 1fr); gap: 0.8rem; align-items: stretch;
  width: 100%; padding: 0; background: none; border: 0; text-align: left; cursor: pointer;
  font-family: inherit; color: inherit; outline: none;
}
.commit__rail { position: relative; display: flex; justify-content: center; padding-top: 1.15rem; }
.commit:not(:last-child) .commit__rail::after {
  content: ''; position: absolute; left: 50%; top: 2rem; bottom: -0.1rem; width: 1px; translate: -50% 0;
  background: rgba(255,255,255,0.1);
  transition: background 0.4s ease;
}
.commit.passed:not(:last-child) .commit__rail::after { background: var(--acc); box-shadow: 0 0 8px rgba(255,85,0,0.5); }

.commit__node {
  position: relative; z-index: 1; width: 12px; height: 12px; border-radius: 50%;
  background: #0a0a0a; border: 2px solid rgba(255,255,255,0.22);
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, scale 0.35s var(--ease);
}
.commit.passed .commit__node { border-color: var(--acc); }
.commit.active .commit__node { background: var(--acc); border-color: var(--acc); scale: 1.25; box-shadow: 0 0 0 5px rgba(255,85,0,0.15), 0 0 16px rgba(255,85,0,0.6); }
.commit__node.head::after {
  content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid var(--acc);
  animation: ping 2.4s var(--ease) infinite;
}
@keyframes ping { 0% { opacity: 0.8; scale: 0.6; } 80%, 100% { opacity: 0; scale: 1.6; } }

.commit__body {
  display: flex; flex-direction: column; gap: 0.18rem;
  margin: 0.2rem 0 0.35rem; padding: 0.8rem 1rem 0.85rem;
  border: 1px solid transparent; border-radius: 14px;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.35s var(--ease);
}
.commit__btn:hover .commit__body { background: rgba(255,255,255,0.025); }
.commit.active .commit__body { background: rgba(255,85,0,0.05); border-color: rgba(255,85,0,0.3); transform: translateX(4px); }
.commit__btn:focus-visible .commit__body { border-color: var(--acc); }

.commit__top { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem 0.6rem; margin-bottom: 0.2rem; }
.commit__hash { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 0.66rem; font-weight: 700; color: #e0a23c; letter-spacing: 0.03em; }
.ref { padding: 0.1rem 0.5rem; border-radius: 999px; font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 0.56rem; font-weight: 700; letter-spacing: 0.04em; white-space: nowrap; }
.ref--head { color: #fff; background: rgba(255,85,0,0.85); }
.ref--init { color: #8a929e; border: 1px solid var(--bd); }
.commit__period { font-size: 0.7rem; font-weight: 700; color: var(--acc); letter-spacing: 0.04em; }
.tl-current-badge { font-size: 0.54rem; font-weight: 700; padding: 0.12rem 0.5rem; border: 1px solid rgba(255,85,0,0.3); border-radius: 999px; color: var(--acc); letter-spacing: 0.08em; text-transform: uppercase; }
.commit__role { font-size: 0.92rem; font-weight: 700; color: #c8cdd5; transition: color 0.25s ease; }
.commit.active .commit__role, .commit__btn:hover .commit__role { color: #fff; }
.commit__co { font-size: 0.76rem; color: #6b7585; }

/* ── Nav row ─────────────────────────────────────────── */
.experience__nav { display: flex; align-items: center; gap: 1.2rem; }
.nav-btn { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #6b7585; font-size: 0.78rem; cursor: pointer; transition: all 0.25s ease; }
.nav-btn:hover:not(:disabled) { border-color: rgba(255,85,0,0.3); color: var(--acc); }
.nav-btn:disabled { opacity: 0.2; cursor: not-allowed; }
.nav-counter { display: flex; align-items: baseline; gap: 0.3rem; min-width: 3rem; }
.nc-current { font-size: 1.1rem; font-weight: 800; color: var(--acc); letter-spacing: -0.02em; display: inline-block; }
.nc-sep { font-size: 0.8rem; color: #3a4250; }
.nc-total { font-size: 0.88rem; font-weight: 500; color: #3a4250; }
.counter-flip-enter-active, .counter-flip-leave-active { transition: all 0.2s var(--ease); }
.counter-flip-enter-from { opacity: 0; transform: translateY(10px) scale(0.85); }
.counter-flip-leave-to { opacity: 0; transform: translateY(-10px) scale(0.85); }

/* ── Right column ────────────────────────────────────── */
.experience__right { position: relative; min-width: 0; }
@media (min-width: 1025px) { .experience__right { position: sticky; top: 96px; } }

.panel-shell {
  --gx: 50%; --gy: 0%;
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(1.1rem, 2.4vw, 1.9rem);
  border: 1px solid var(--bd); border-radius: 22px;
  background: linear-gradient(180deg, #101012, #0b0b0d);
  box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6);
}
.panel-glow {
  position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0;
  background: radial-gradient(420px circle at var(--gx) var(--gy), rgba(255,85,0,0.12), transparent 60%);
  transition: opacity 0.35s ease;
}
.panel-shell.is-glow .panel-glow { opacity: 1; }

.panel-fade-enter-active, .panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to { opacity: 0; transform: translateY(-8px); }

.detail-panel { display: flex; flex-direction: column; gap: 1.4rem; }

@keyframes panelItemIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes panelItemPop { from { opacity: 0; transform: translateY(8px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
.panel-item { opacity: 0; animation: panelItemIn 0.45s var(--ease) both; animation-delay: var(--pd, 0s); }
.panel-item--pop { animation-name: panelItemPop; animation-duration: 0.38s; }

/* ── Terminal ────────────────────────────────────────── */
.terminal { background: #060809; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 0.95rem 1.2rem 0.9rem; font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace; transition: border-color 0.25s ease; }
.terminal:hover { border-color: rgba(255,85,0,0.25); }
.terminal__bar { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.85rem; }
.terminal__dots { display: flex; gap: 6px; }
.terminal__dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal__dots span:nth-child(1) { background: #ff5f56; }
.terminal__dots span:nth-child(2) { background: #ffbd2e; }
.terminal__dots span:nth-child(3) { background: #27c93f; }
.terminal__hash { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.64rem; color: #4a5568; }
.terminal__row { display: flex; gap: 0.55rem; font-size: 0.72rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
.terminal__prompt { color: var(--acc); font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #5a6270; }
.terminal__out { color: #a1a9b5; }
.terminal__out--accent { color: var(--acc); font-weight: 600; }

.category-tag { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.22rem 0.65rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 999px; font-size: 0.58rem; font-weight: 700; color: #7b8594; letter-spacing: 0.1em; flex-shrink: 0; }
.category-tag i { font-size: 0.54rem; color: var(--acc); }

/* ── Role description ────────────────────────────────── */
.role-desc { font-size: 0.9rem; color: #a1a9b5; line-height: 1.75; margin: 0; }

/* ── Role blocks ─────────────────────────────────────── */
.role-block { display: flex; flex-direction: column; gap: 0.75rem; }
.block-header { display: flex; align-items: center; gap: 0.45rem; }
.block-dot { width: 5px; height: 5px; background: var(--acc); border-radius: 50%; flex-shrink: 0; }
.block-title { font-size: 0.66rem; font-weight: 700; color: var(--acc); letter-spacing: 0.12em; text-transform: uppercase; }

/* ── Achievements as a diff ──────────────────────────── */
.diff { border: 1px solid var(--bd); border-radius: 12px; overflow: hidden; background: #08090b; font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace; }
.diff__hunk { padding: 0.45rem 0.9rem; font-size: 0.62rem; color: #6b7585; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--bd); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.diff__line {
  position: relative; display: grid; grid-template-columns: 26px 14px minmax(0, 1fr); gap: 0.55rem;
  padding: 0.6rem 0.9rem 0.6rem 0.5rem; align-items: start;
  background: linear-gradient(90deg, rgba(255,85,0,0.1), rgba(255,85,0,0.03));
  border-left: 2px solid var(--acc);
  font-family: 'Inter', system-ui, sans-serif;
}
.diff__line + .diff__line { border-top: 1px solid rgba(255,255,255,0.04); }
.diff__line::after {   /* highlight sweep when a line lands */
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(90deg, transparent, rgba(255,140,60,0.28), transparent);
  transform: translateX(-100%);
  animation: sweep 0.9s var(--ease) both; animation-delay: calc(var(--pd, 0s) + 0.25s);
}
@keyframes sweep { to { transform: translateX(100%); } }
.diff__no { text-align: right; font-family: ui-monospace, monospace; font-size: 0.62rem; color: #5a6270; padding-top: 0.2rem; }
.diff__sign { font-family: ui-monospace, monospace; font-weight: 800; color: var(--acc); }
.diff__txt { font-size: 0.82rem; color: #d3d8df; line-height: 1.55; }

/* ── Tech, grouped ───────────────────────────────────── */
.deps { display: flex; flex-direction: column; gap: 0.7rem; }
.dep { display: grid; grid-template-columns: 78px minmax(0, 1fr); gap: 0.8rem; align-items: baseline; }
.dep__cat { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #5a6270; }
.tech-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tech-pill { display: inline-flex; align-items: center; padding: 0.3rem 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09); border-radius: 999px; font-size: 0.7rem; font-weight: 500; color: #a1a9b5; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
.tech-pill:hover { border-color: rgba(255,85,0,0.35); color: var(--acc); background: rgba(255,85,0,0.06); transform: translateY(-2px); }

/* ── Diff stat footer ────────────────────────────────── */
.diff-stat { align-self: flex-start; padding-top: 0.9rem; border-top: 1px dashed var(--bd); width: 100%; font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 0.66rem; color: #6b7585; letter-spacing: 0.02em; }
.diff-stat__add { color: var(--acc); font-weight: 800; margin-right: 0.15rem; }
.diff-stat__sep { margin: 0 0.35rem; color: #3a4250; }

/* ── Bottom strip ────────────────────────────────────── */
.experience__strip { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem; padding-top: clamp(24px, 4vh, 40px); border-top: 1px solid rgba(255,255,255,0.06); }
.strip-stats { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
.strip-stat { display: flex; flex-direction: column; gap: 0.1rem; }
.ss-num { font-size: 1.5rem; font-weight: 800; color: var(--acc); letter-spacing: -0.02em; line-height: 1; }
.ss-label { font-size: 0.62rem; color: #5a6270; text-transform: uppercase; letter-spacing: 0.1em; }
.strip-divider { width: 1px; height: 2rem; background: rgba(255,255,255,0.06); flex-shrink: 0; }
.strip-note { margin: 0; font-size: 0.72rem; color: #5b6678; }
.strip-note strong { color: #8a929e; font-weight: 600; }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .experience__main { grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
  .experience__sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .experience { padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px); }
  .experience__hl-solid, .experience__hl-outline, .experience__hl-accent { font-size: clamp(2.2rem, 9vw, 3.5rem); }
  .experience__strip { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .log-title__hint { display: none; }
}

@media (max-width: 480px) {
  .strip-divider { display: none; }
  .experience__hl-solid, .experience__hl-outline, .experience__hl-accent { font-size: clamp(1.9rem, 8vw, 2.8rem); }
  .panel-shell { border-radius: 18px; }
  .dep { grid-template-columns: 1fr; gap: 0.35rem; }
  .diff__line { grid-template-columns: 18px 12px minmax(0, 1fr); gap: 0.4rem; padding-right: 0.7rem; }
  .terminal__bar { flex-wrap: wrap; gap: 0.6rem; }
  .terminal__hash { order: 3; flex-basis: 100%; }
}
</style>