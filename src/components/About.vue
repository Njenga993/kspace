<template>
  <section class="about" ref="aboutRef" id="about">

    <!-- Section header row -->
    <div class="about__header anim" style="--d:0.08s">
      <div class="about__label">
        <span class="about__label-line"></span>
        <span class="about__label-text">Behind the work</span>
      </div>
      <div class="avail-badge">
        <span class="pulse-dot"></span>
        Available for work
      </div>
    </div>

    <!-- ═════════ HERO: ID card + statement ═════════ -->
    <div class="about__grid">

      <!-- LEFT: tilting ID card -->
      <div class="about__photo-col">

        <div
          class="idcard photo-reveal"
          ref="cardRef"
          style="--d:0.12s"
          @pointermove="onCardMove"
          @pointerleave="onCardLeave"
        >
          <div class="idcard__inner">
            <!-- top rail: lanyard slot + live clock -->
            <div class="idcard__rail">
              <span class="idcard__slot"></span>
              <span class="idcard__clock">
                <span class="idcard__clock-dot"></span>
                Nairobi · {{ nairobiTime }} EAT
              </span>
            </div>

            <!-- Photo -->
            <div class="idcard__photo">
              <img src="/side.jpg" alt="Kelvin Kamau" class="about__img" draggable="false" />
              <div class="idcard__scan"></div>
              <div class="idcard__fade"></div>

              <div class="about__tag about__tag--tr anim-scale" style="--d:0.62s">
                <span class="tag-label">Role</span>
                <span class="tag-value">Full-Stack Dev</span>
              </div>
              <div class="about__tag about__tag--bl anim-scale" style="--d:0.75s">
                <span class="tag-label">Location</span>
                <span class="tag-value">Nairobi, KE </span>
              </div>
            </div>

            <!-- Name plate -->
            <div class="idcard__plate">
              <div>
                <span class="idcard__name">Kelvin Kamau</span>
                <span class="idcard__sub">Developer &amp; Digital Manager</span>
              </div>
              <span class="idcard__bars" aria-hidden="true">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </span>
            </div>
          </div>
          <div class="idcard__sheen"></div>
        </div>

        <!-- Stats row -->
        <div class="about__mini-stats">
          <div v-for="(s, i) in miniStats" :key="i" class="about__mini-stat anim" :style="{ '--d': 0.9 + i * 0.08 + 's' }">
            <span class="mstat-num">{{ shown[i] }}{{ s.suffix }}</span>
            <span class="mstat-label">{{ s.label }}</span>
          </div>
        </div>

      </div>

      <!-- RIGHT: statement -->
      <div class="about__content-col">

        <p class="about__eyebrow anim" style="--d:0.2s">Full-Stack Engineer</p>

        <h2 class="about__heading">
          <span class="about__hl-solid anim-slide" style="--d:0.28s">Shaping</span>
          <span
            class="about__hl-outline anim-slide"
            style="--d:0.38s"
            @pointermove="onHeadMove"
            @pointerleave="onHeadLeave"
          >Experiences</span>
          <span class="about__hl-accent anim-slide" style="--d:0.48s">That Impact.</span>
        </h2>

        <div class="about__role anim" style="--d:0.56s">
          <span class="role-bracket">[</span>
          <span class="role-text">{{ currentRole }}</span>
          <span class="role-cursor"></span>
          <span class="role-bracket">]</span>
        </div>

        <p class="about__desc anim" style="--d:0.62s">
          Full-stack developer with a passion for crafting scalable, performant applications.
          I transform complex business requirements into elegant solutions that drive measurable results.
        </p>

        <div class="about__actions anim" style="--d:0.72s">
          <a href="/Kamau_Kelvin_Resume.pdf" class="btn-primary" download>
            <i class="fas fa-download"></i>
            Download Resume
          </a>
          <a href="#contact" class="btn-ghost">
            Let's Build Something
            <span class="btn-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </span>
          </a>
        </div>

      </div>
    </div>

    <!-- ═════════ WORKSPACE PANEL: tabs as editor windows ═════════ -->
    <div class="dock anim" style="--d:0.82s">

      <div class="dock__bar">
        <span class="dock__lights" aria-hidden="true"><i></i><i></i><i></i></span>
        <div class="dock__tabs" role="tablist" aria-label="About details">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :ref="el => { if (el) tabEls[tab.id] = el }"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            role="tab"
            :aria-selected="String(activeTab === tab.id)"
            @click="activeTab = tab.id"
          >
            <span class="tab-btn__no">{{ tab.no }}</span>
            {{ tab.label }}
          </button>
          <span class="dock__ind" :style="indicatorStyle"></span>
        </div>
      </div>

      <div class="dock__body">
        <Transition name="tab-fade" mode="out-in">

          <!-- Experience: horizontal timeline -->
          <div v-if="activeTab === 'experience'" key="exp" class="tl" @mouseleave="tlHover = 0">
            <div
              v-for="(exp, idx) in experiences"
              :key="idx"
              class="tl__item"
              :class="{ 'is-passed': idx < tlHover, 'is-on': idx === tlHover }"
              @mouseenter="tlHover = idx"
              @focusin="tlHover = idx"
              tabindex="0"
            >
              <div class="tl__track">
                <span class="tl__dot" :class="{ current: idx === 0 }"></span>
                <span class="tl__seg" v-if="idx < experiences.length - 1"></span>
              </div>
              <div class="tl__card">
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
              <i :class="[cat.icon, 'skill-ghost']" aria-hidden="true"></i>
              <div class="skill-head">
                <i :class="cat.icon"></i>
                <span>{{ cat.title }}</span>
              </div>
              <div class="skill-tags">
                <span v-for="s in cat.skills" :key="s" class="skill-tag">{{ s }}</span>
              </div>
            </div>
          </div>

          <!-- Education: certificate -->
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
    </div>

    <!-- Bottom strip -->
    <div class="about__strip anim" style="--d:1s">
      <p class="strip-label">Trusted by brands I've helped shape</p>
      <div class="strip-socials">
        <a href="https://github.com/Njenga993" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="mailto:kamaukelvin077@gmail.com" class="social-link" aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const aboutRef = ref(null)
const cardRef = ref(null)
const activeTab = ref('experience')
const typewriterStarted = ref(false)
const statsCounted = ref(false)
const tlHover = ref(0)
const mounted = ref(false)
const tabEls = {}

/* ── Tabs ────────────────────────────────────────────── */
const tabs = [
  { id: 'experience', label: 'Experience', no: '01' },
  { id: 'skills',     label: 'Skills',     no: '02' },
  { id: 'education',  label: 'Education',  no: '03' },
  { id: 'interests',  label: 'Interests',  no: '04' },
]

// sliding underline measured from the real DOM
const indicatorStyle = computed(() => {
  void mounted.value
  const el = tabEls[activeTab.value]
  if (!el) return { opacity: 0 }
  return { width: el.offsetWidth + 'px', transform: `translateX(${el.offsetLeft}px)`, opacity: 1 }
})

/* ── Typewriter ──────────────────────────────────────── */
const roles = [
  'Full-Stack Developer',
  'React Specialist',
  'UI Engineer',
  'Open Source Contributor',
]

const currentRole = ref('')
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

/* ── Count-up (reactive) ─────────────────────────────── */
const shown = reactive([0, 0, 0, 0])
function countUp(i, target) {
  const duration = 1200
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    shown[i] = Math.round((1 - Math.pow(1 - t, 3)) * target)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ── Live Nairobi clock ──────────────────────────────── */
const nairobiTime = ref('--:--')
let clockTimer = null
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: false })
const tickClock = () => { nairobiTime.value = fmt.format(new Date()) }

/* ── ID card tilt + sheen ────────────────────────────── */
const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
function onCardMove(e) {
  const el = cardRef.value
  if (!el || reduceMotion || e.pointerType === 'touch') return
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
  el.style.setProperty('--ry', `${(x - 0.5) * 12}deg`)
  el.style.setProperty('--sx', `${x * 100}%`)
  el.style.setProperty('--sy', `${y * 100}%`)
  el.classList.add('is-hot')
}
function onCardLeave() {
  const el = cardRef.value
  if (!el) return
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
  el.classList.remove('is-hot')
}

/* ── Headline spotlight (fills the outlined word) ────── */
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

/* ── Intersection observer ───────────────────────────── */
onMounted(() => {
  mounted.value = true
  tickClock()
  clockTimer = setInterval(tickClock, 20000)

  const section = aboutRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      section.classList.add('in-view')

      if (!typewriterStarted.value) {
        typewriterStarted.value = true
        typeRole()
      }

      if (!statsCounted.value) {
        statsCounted.value = true
        setTimeout(() => miniStats.forEach((s, i) => countUp(i, s.count)), 1000)
      }

      io.unobserve(section)
    })
  }, { threshold: 0.1 })

  io.observe(section)
})

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer)
  if (clockTimer) clearInterval(clockTimer)
})

/* ── Data ────────────────────────────────────────────── */
const miniStats = [
  { count: new Date().getFullYear() - 2021, suffix: '+', label: 'Years Exp.' },
  { count: 20,  suffix: '+', label: 'Projects'   },
  { count: 100, suffix: '%', label: 'Committed'  },
  { count: 4,   suffix: '',  label: 'Industries' },
]

const experiences = [
  {
    period: '2024 — Present',
    title: 'Developer & Digital Manager',
    company: 'Nyakazi Organics',
    description: 'Leading digital transformation. Built a comprehensive POS system with React & Django, implemented cohesive branding, and optimized operational workflows.',
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
  { title: 'Frontend', icon: 'fas fa-desktop', skills: ['Vue.js', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
  { title: 'Backend',  icon: 'fas fa-server',  skills: ['Node.js', 'Laravel', 'Django', 'PostgreSQL', 'MySQL']      },
  { title: 'Design',   icon: 'fas fa-palette', skills: ['Figma', 'Photoshop', 'UI/UX Design']                       },
  { title: 'DevOps',   icon: 'fas fa-tools',   skills: ['Git', 'Docker', 'CI/CD', 'Railway', 'Linux']               },
]

const interests = [
  { name: 'Open Source', icon: 'fas fa-code'      },
  { name: 'Gaming',      icon: 'fas fa-gamepad'   },
  { name: 'Reading',     icon: 'fas fa-book'      },
  { name: 'Music',       icon: 'fas fa-music'     },
  { name: 'Football',    icon: 'fas fa-futbol'    },
  { name: 'Tech Trends', icon: 'fas fa-microchip' },
]
</script>

<style scoped>
/* Tokens live on .about itself (a scoped :root never matches <html>) */
.about {
  --acc: #ff5500;
  --acc-h: #ff6b1a;
  --ink: #0a0a0b;
  --panel: #101012;
  --bd: rgba(255,255,255,0.08);
  --ease: cubic-bezier(0.16, 1, 0.3, 1);

  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 6vh, 64px);
}

/* ── Animation System ────────────────────────────────── */
.anim { opacity: 0; transform: translateY(28px); transition: opacity 0.75s var(--ease), transform 0.75s var(--ease); transition-delay: var(--d, 0s); }
.anim-slide { opacity: 0; transform: translateY(60px); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); transition-delay: var(--d, 0s); }
.anim-scale { opacity: 0; transform: scale(0.82); transition: opacity 0.55s var(--ease), transform 0.55s var(--ease); transition-delay: var(--d, 0s); }
.photo-reveal { clip-path: inset(0 100% 0 0); transition: clip-path 1s var(--ease); transition-delay: var(--d, 0s); }

.in-view .anim { opacity: 1; transform: translateY(0); }
.in-view .anim-slide { opacity: 1; transform: translateY(0); }
.in-view .anim-scale { opacity: 1; transform: scale(1); }
.in-view .photo-reveal { clip-path: inset(-40px -40px -40px -40px); }

@keyframes float-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
.in-view .about__tag--tr { animation: float-bob 3.5s ease-in-out 1.4s infinite; }
.in-view .about__tag--bl { animation: float-bob 3.5s ease-in-out 1.8s infinite; }

@keyframes itemIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes popIn  { from { opacity: 0; transform: scale(0.88); }     to { opacity: 1; transform: scale(1); } }

.tl__item { opacity: 0; animation: itemIn 0.55s var(--ease) forwards; }
.tl__item:nth-child(1) { animation-delay: 0.04s; }
.tl__item:nth-child(2) { animation-delay: 0.12s; }
.tl__item:nth-child(3) { animation-delay: 0.20s; }
.tl__item:nth-child(4) { animation-delay: 0.28s; }
.skill-card { opacity: 0; animation: itemIn 0.5s var(--ease) forwards; }
.skill-card:nth-child(1) { animation-delay: 0.04s; }
.skill-card:nth-child(2) { animation-delay: 0.10s; }
.skill-card:nth-child(3) { animation-delay: 0.16s; }
.skill-card:nth-child(4) { animation-delay: 0.22s; }
.edu-block { opacity: 0; animation: itemIn 0.5s var(--ease) 0.04s forwards; }
.interest-pill { opacity: 0; animation: popIn 0.4s var(--ease) forwards; }
.interest-pill:nth-child(1) { animation-delay: 0.02s; }
.interest-pill:nth-child(2) { animation-delay: 0.06s; }
.interest-pill:nth-child(3) { animation-delay: 0.10s; }
.interest-pill:nth-child(4) { animation-delay: 0.14s; }
.interest-pill:nth-child(5) { animation-delay: 0.18s; }
.interest-pill:nth-child(6) { animation-delay: 0.22s; }

@media (prefers-reduced-motion: reduce) {
  .anim, .anim-slide, .anim-scale, .photo-reveal,
  .tl__item, .skill-card, .edu-block, .interest-pill {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
}

/* ── Section header ──────────────────────────────────── */
.about__header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.about__label { display: flex; align-items: center; gap: 0.75rem; }
.about__label-line { display: block; width: 32px; height: 1px; background: var(--acc); }
.about__label-text { font-size: 0.72rem; font-weight: 700; color: var(--acc); letter-spacing: 0.18em; text-transform: uppercase; }
.avail-badge {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.38rem 1rem;
  border: 1px solid rgba(34,197,94,0.25); border-radius: 999px;
  font-size: 0.7rem; font-weight: 600; color: #22c55e; letter-spacing: 0.03em;
}
.pulse-dot { width: 7px; height: 7px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px rgba(34,197,94,0.7); animation: pulse 2s infinite; flex-shrink: 0; }

/* ── Hero grid ───────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 0.72fr 1fr;
  gap: clamp(32px, 5vw, 88px);
  align-items: center;
}
.about__photo-col { display: flex; flex-direction: column; gap: 1.5rem; max-width: 460px; width: 100%; }

/* ── ID card ─────────────────────────────────────────── */
.idcard {
  --rx: 0deg; --ry: 0deg; --sx: 50%; --sy: 30%;
  position: relative;
  perspective: 1100px;
}
.idcard__inner {
  position: relative;
  padding: 14px 14px 16px;
  border-radius: 26px;
  background:
    linear-gradient(#111114, #0b0b0d) padding-box,
    conic-gradient(from 210deg at 50% 50%, rgba(255,85,0,0.75), rgba(255,255,255,0.12) 30%, rgba(255,85,0,0.18) 60%, rgba(255,85,0,0.75)) border-box;
  border: 1px solid transparent;
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02) inset;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform 0.35s var(--ease);
  will-change: transform;
}
.idcard.is-hot .idcard__inner { transition: transform 0.08s linear; }

.idcard__rail { display: flex; align-items: center; justify-content: space-between; padding: 2px 6px 12px; }
.idcard__slot { width: 46px; height: 7px; border-radius: 99px; background: #050506; box-shadow: inset 0 1px 2px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.08); }
.idcard__clock { display: inline-flex; align-items: center; gap: 0.45rem; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em; color: #8a929e; font-variant-numeric: tabular-nums; text-transform: uppercase; }
.idcard__clock-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--acc); animation: pulse 2s infinite; }

.idcard__photo { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4 / 4.6; max-height: 500px; background: #151517; }
.about__img {
  width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block;
  filter: grayscale(100%) contrast(1.08);
  transform: scale(1.04);
  transition: filter 0.6s ease, transform 0.9s var(--ease);
}
.idcard:hover .about__img { filter: grayscale(0%) contrast(1.03); transform: scale(1.08); }

.idcard__scan {
  position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay; opacity: 0.35;
  background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px);
}
.idcard__fade { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(8,8,10,0.75) 100%); pointer-events: none; }

.about__tag {
  position: absolute; z-index: 3; display: flex; flex-direction: column; gap: 2px;
  padding: 0.5rem 0.9rem; background: rgba(10,10,10,0.82);
  border: 1px solid rgba(255,85,0,0.3); border-radius: 12px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  transform: translateZ(40px);
}
.about__tag--tr { top: 0.85rem; right: 0.85rem; }
.about__tag--bl { bottom: 0.85rem; left: 0.85rem; }
.tag-label { font-size: 0.56rem; font-weight: 700; color: #9aa3af; letter-spacing: 0.12em; text-transform: uppercase; }
.tag-value { font-size: 0.76rem; font-weight: 700; color: #fff; }

.idcard__plate { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; padding: 14px 6px 0; }
.idcard__name { display: block; font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; line-height: 1.1; }
.idcard__sub { display: block; margin-top: 0.2rem; font-size: 0.68rem; color: #8a929e; letter-spacing: 0.03em; }
.idcard__bars { display: inline-flex; align-items: flex-end; gap: 3px; height: 28px; opacity: 0.6; }
.idcard__bars i { display: block; width: 2px; background: #fff; border-radius: 1px; }
.idcard__bars i:nth-child(1) { height: 100%; } .idcard__bars i:nth-child(2) { height: 55%; }
.idcard__bars i:nth-child(3) { height: 80%; }  .idcard__bars i:nth-child(4) { height: 40%; }
.idcard__bars i:nth-child(5) { height: 100%; } .idcard__bars i:nth-child(6) { height: 65%; }
.idcard__bars i:nth-child(7) { height: 90%; }  .idcard__bars i:nth-child(8) { height: 50%; }
.idcard__bars i:nth-child(9) { height: 75%; }

.idcard__sheen {
  position: absolute; inset: 0; border-radius: 26px; pointer-events: none; opacity: 0;
  background: radial-gradient(380px circle at var(--sx) var(--sy), rgba(255,255,255,0.12), rgba(255,85,0,0.08) 35%, transparent 60%);
  mix-blend-mode: screen; transition: opacity 0.35s ease;
}
.idcard.is-hot .idcard__sheen { opacity: 1; }

/* Stats */
.about__mini-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; overflow: hidden;
  border: 1px solid var(--bd); border-radius: 14px; background: var(--bd);
}
.about__mini-stat { background: var(--ink); padding: 0.9rem 0.8rem; display: flex; flex-direction: column; gap: 0.2rem; }
.mstat-num { font-size: 1.3rem; font-weight: 800; color: var(--acc); letter-spacing: -0.03em; line-height: 1; font-variant-numeric: tabular-nums; }
.mstat-label { font-size: 0.56rem; font-weight: 600; color: #9aa3af; text-transform: uppercase; letter-spacing: 0.08em; }

/* ── Statement column ────────────────────────────────── */
.about__content-col { display: flex; flex-direction: column; gap: 1.6rem; min-width: 0; }
.about__eyebrow { margin: 0; font-size: 0.8rem; font-weight: 700; color: var(--acc); letter-spacing: 0.14em; text-transform: uppercase; }

.about__heading { margin: 0; display: flex; flex-direction: column; line-height: 0.9; }
.about__hl-solid, .about__hl-outline, .about__hl-accent {
  display: block; width: fit-content; max-width: 100%;
  font-size: clamp(2.8rem, 6vw, 5.6rem); font-weight: 900; letter-spacing: -0.045em; line-height: 0.92;
}
.about__hl-solid { color: #fff; }
.about__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
  background: radial-gradient(210px circle at var(--mx, -400px) var(--my, -400px), var(--acc) 0%, rgba(255,85,0,0.0) 100%);
  -webkit-background-clip: text; background-clip: text;
  cursor: default;
}
.about__hl-accent { color: var(--acc); font-style: italic; }

.about__role { display: flex; align-items: center; gap: 0.35rem; font-size: 0.95rem; font-weight: 500; min-height: 1.5em; font-family: ui-monospace, 'JetBrains Mono', monospace; }
.role-bracket { color: var(--acc); font-weight: 700; }
.role-text { color: #c8cdd5; letter-spacing: 0.03em; }
.role-cursor { width: 2px; height: 1em; background: var(--acc); flex-shrink: 0; animation: blink 1s step-end infinite; }

.about__desc { margin: 0; font-size: 1rem; line-height: 1.8; color: #b0b8c4; max-width: 540px; }

.about__actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.btn-primary, .btn-ghost {
  display: inline-flex; align-items: center; gap: 0.55rem; font-size: 0.875rem; font-weight: 700; letter-spacing: 0.01em;
  border-radius: 999px; text-decoration: none; font-family: 'Inter', sans-serif;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), background 0.3s ease;
}
.btn-primary { padding: 0.8rem 1.8rem; background: #fff; color: #0a0a0a; border: none; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.4); }
.btn-ghost { padding: 0.75rem 1.6rem; background: var(--acc); color: #fff; box-shadow: 0 8px 24px rgba(255,85,0,0.25); }
.btn-ghost:hover { background: var(--acc-h); transform: translateY(-2px); }
.btn-icon { width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: transform 0.35s var(--ease); }
.btn-ghost:hover .btn-icon { transform: translateX(3px); }

/* ═══════════════ DOCK (tabbed workspace panel) ═══════════════ */
.dock {
  border: 1px solid var(--bd);
  border-radius: 20px;
  background: linear-gradient(180deg, #111114, #0c0c0e);
  overflow: hidden;
  box-shadow: 0 30px 60px -30px rgba(0,0,0,0.6);
}
.dock__bar {
  display: flex; align-items: center; gap: 1.25rem;
  padding: 0 1.25rem; border-bottom: 1px solid var(--bd);
  background: rgba(255,255,255,0.02);
  overflow-x: auto; scrollbar-width: none;
}
.dock__bar::-webkit-scrollbar { display: none; }
.dock__lights { display: inline-flex; gap: 6px; flex-shrink: 0; }
.dock__lights i { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.12); }
.dock__lights i:first-child { background: #ff5f57; opacity: 0.8; }
.dock__lights i:nth-child(2) { background: #febc2e; opacity: 0.8; }
.dock__lights i:nth-child(3) { background: #28c840; opacity: 0.8; }

.dock__tabs { position: relative; display: flex; }
.tab-btn {
  display: inline-flex; align-items: baseline; gap: 0.5rem;
  padding: 1rem 1.2rem; background: none; border: none;
  font-size: 0.84rem; font-weight: 600; color: #8a929e; cursor: pointer; letter-spacing: 0.02em;
  font-family: 'Inter', sans-serif; white-space: nowrap;
  transition: color 0.25s ease;
}
.tab-btn__no { font-size: 0.58rem; font-weight: 800; color: rgba(255,255,255,0.22); font-family: ui-monospace, monospace; transition: color 0.25s ease; }
.tab-btn:hover { color: #d0d5dd; }
.tab-btn.active { color: #fff; }
.tab-btn.active .tab-btn__no { color: var(--acc); }
.dock__ind {
  position: absolute; left: 0; bottom: 0; height: 2px; background: var(--acc);
  transition: transform 0.45s var(--ease), width 0.45s var(--ease), opacity 0.2s ease;
  box-shadow: 0 0 12px rgba(255,85,0,0.6);
}

.dock__body { padding: clamp(1.25rem, 3vw, 2.25rem); min-height: 280px; }
.tab-fade-enter-active, .tab-fade-leave-active { transition: all 0.2s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(8px); }
.tab-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Experience: horizontal timeline ─────────────────── */
.tl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.tl__item { position: relative; outline: none; padding-right: 1.25rem; cursor: default; }
.tl__track { position: relative; height: 18px; display: flex; align-items: center; margin-bottom: 1.1rem; }
.tl__dot {
  position: relative; z-index: 1; flex-shrink: 0;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--ink); border: 2px solid rgba(255,255,255,0.22);
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease);
}
.tl__seg { flex: 1; height: 1px; margin-left: 6px; margin-right: 2px; background: rgba(255,255,255,0.1); position: relative; overflow: hidden; }
.tl__seg::after { content: ''; position: absolute; inset: 0; background: var(--acc); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.tl__item.is-passed .tl__seg::after { transform: scaleX(1); }
.tl__item.is-passed .tl__dot, .tl__item.is-on .tl__dot { border-color: var(--acc); }
.tl__item.is-on .tl__dot { background: var(--acc); box-shadow: 0 0 0 5px rgba(255,85,0,0.15), 0 0 14px rgba(255,85,0,0.6); transform: scale(1.15); }
.tl__dot.current:not(:hover) { border-color: var(--acc); }

.tl__card {
  padding: 1.1rem 1.15rem 1.2rem; border: 1px solid var(--bd); border-radius: 14px; background: rgba(255,255,255,0.02);
  height: calc(100% - 2.1rem);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.4s var(--ease);
}
.tl__item.is-on .tl__card { border-color: rgba(255,85,0,0.35); background: rgba(255,85,0,0.05); transform: translateY(-4px); }

.exp-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.45rem; }
.exp-period { font-size: 0.68rem; font-weight: 700; color: var(--acc); letter-spacing: 0.05em; }
.current-badge { font-size: 0.52rem; font-weight: 700; padding: 0.14rem 0.5rem; border: 1px solid rgba(255,85,0,0.3); border-radius: 999px; color: var(--acc); letter-spacing: 0.08em; text-transform: uppercase; }
.exp-title { font-size: 0.95rem; font-weight: 700; color: #fff; margin: 0 0 0.15rem; line-height: 1.3; }
.exp-company { display: block; font-size: 0.76rem; color: #a8b4c0; margin-bottom: 0.55rem; }
.exp-desc { font-size: 0.78rem; color: #bcc4ce; line-height: 1.7; margin: 0; }

/* ── Skills ──────────────────────────────────────────── */
.skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
.skill-card {
  position: relative; overflow: hidden; padding: 1.2rem 1.2rem 1.3rem;
  border: 1px solid var(--bd); border-radius: 16px; background: rgba(255,255,255,0.02);
  transition: border-color 0.25s ease, transform 0.35s var(--ease), background 0.25s ease;
}
.skill-card:hover { border-color: rgba(255,85,0,0.35); transform: translateY(-4px); background: rgba(255,85,0,0.04); }
.skill-ghost { position: absolute; right: -10px; bottom: -14px; font-size: 5.5rem; color: #fff; opacity: 0.035; transform: rotate(-12deg); transition: opacity 0.4s ease, transform 0.6s var(--ease); pointer-events: none; }
.skill-card:hover .skill-ghost { opacity: 0.08; transform: rotate(0) scale(1.08); }
.skill-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.9rem; color: var(--acc); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
.skill-tags { position: relative; display: flex; flex-wrap: wrap; gap: 0.3rem; }
.skill-tag { padding: 0.28rem 0.62rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; font-size: 0.7rem; color: #d0d5dd; transition: border-color 0.2s, color 0.2s; }
.skill-tag:hover { border-color: rgba(255,85,0,0.5); color: #fff; }

/* ── Education ───────────────────────────────────────── */
.edu-block {
  display: grid; grid-template-columns: 1.1fr 1fr; gap: 1px; overflow: hidden;
  border: 1px solid var(--bd); border-radius: 16px; background: var(--bd);
}
.edu-main { display: flex; gap: 1.1rem; align-items: flex-start; padding: 1.6rem; background: #0e0e10; }
.edu-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(255,85,0,0.1); border: 1px solid rgba(255,85,0,0.3); border-radius: 12px; color: var(--acc); font-size: 1.1rem; flex-shrink: 0; }
.edu-info h4 { font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0 0 0.25rem; letter-spacing: -0.01em; }
.edu-info span { display: block; font-size: 0.8rem; color: #a8b4c0; }
.edu-period { color: var(--acc) !important; font-weight: 600; margin-top: 0.4rem; }
.edu-details { display: grid; grid-template-rows: 1fr 1fr; gap: 1px; background: var(--bd); }
.edu-detail { padding: 1.1rem 1.4rem; background: #0e0e10; display: flex; flex-direction: column; justify-content: center; }
.ed-label { display: block; font-size: 0.6rem; font-weight: 700; color: #8a929e; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.3rem; }
.ed-value { font-size: 0.86rem; color: #e1e5ea; line-height: 1.4; }

/* ── Interests ───────────────────────────────────────── */
.interests-wrap { display: flex; flex-wrap: wrap; gap: 0.7rem; padding: 0.5rem 0; }
.interest-pill {
  display: inline-flex; align-items: center; gap: 0.55rem; padding: 0.7rem 1.4rem;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px;
  font-size: 0.9rem; font-weight: 600; color: #d0d5dd;
  transition: border-color 0.22s, background 0.22s, transform 0.3s var(--ease), color 0.22s;
}
.interest-pill i { color: var(--acc); font-size: 0.8rem; }
.interest-pill:hover { border-color: rgba(255,85,0,0.4); background: rgba(255,85,0,0.1); color: #fff; transform: translateY(-3px) rotate(-1.5deg); }

/* ── Bottom strip ────────────────────────────────────── */
.about__strip { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: clamp(28px, 4vh, 48px); border-top: 1px solid var(--bd); }
.strip-label { margin: 0; font-size: 0.72rem; font-weight: 600; color: #5a6270; letter-spacing: 0.08em; text-transform: uppercase; }
.strip-socials { display: flex; gap: 0.6rem; }
.social-link { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--bd); border-radius: 10px; color: #9aa3af; text-decoration: none; transition: all 0.25s ease; }
.social-link:hover { border-color: rgba(255,85,0,0.3); color: var(--acc); transform: translateY(-2px); }

@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .tl { grid-template-columns: repeat(2, 1fr); row-gap: 1.75rem; }
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
  .tl__item:nth-child(2) .tl__seg { display: none; }
}

@media (max-width: 900px) {
  .about__grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .about__photo-col { max-width: 420px; margin: 0 auto; }
  .about__hl-solid, .about__hl-outline, .about__hl-accent { font-size: clamp(2.4rem, 9vw, 4.2rem); }
  .edu-block { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .about { padding: clamp(48px, 8vh, 72px) clamp(20px, 5vw, 32px); gap: clamp(32px, 5vh, 48px); }
  .about__hl-solid, .about__hl-outline, .about__hl-accent { font-size: clamp(2.1rem, 12vw, 3.5rem); }
  .about__actions { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-ghost { justify-content: center; }
  .dock__lights { display: none; }
  .dock__body { padding: 1.1rem; }

  /* timeline goes vertical */
  .tl { grid-template-columns: 1fr; row-gap: 0; }
  .tl__item { display: grid; grid-template-columns: 18px 1fr; gap: 0.9rem; padding: 0; }
  .tl__track { flex-direction: column; height: auto; margin: 0; align-items: center; padding-top: 6px; }
  .tl__seg { width: 1px; height: auto; flex: 1; margin: 4px 0 0; }
  .tl__seg::after { transform: scaleY(0); transform-origin: top; }
  .tl__item.is-passed .tl__seg::after { transform: scaleY(1); }
  .tl__item:nth-child(2) .tl__seg { display: block; }
  .tl__card { height: auto; margin-bottom: 0.9rem; }
  .tl__item.is-on .tl__card { transform: none; }

  .skills-grid { grid-template-columns: 1fr; }
  .interest-pill { padding: 0.55rem 1.1rem; font-size: 0.82rem; }
}

@media (max-width: 380px) {
  .about { padding: 40px 16px; }
  .tab-btn { padding: 0.9rem 0.85rem; font-size: 0.78rem; }
  .tab-btn__no { display: none; }
}
</style>