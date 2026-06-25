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

    <!-- Main grid: photo left, content right -->
    <div class="about__grid">

      <!-- LEFT: Photo column -->
      <div class="about__photo-col">

        <!-- B&W photo that reveals on scroll (left wipe) -->
        <div class="about__img-box photo-reveal" style="--d:0.12s">
          <img src="/side.jpg" alt="Kelvin Kamau" class="about__img" draggable="false" />
          <div class="about__img-overlay"></div>

          <!-- Floating tag: top right -->
          <div class="about__tag about__tag--tr anim-scale" style="--d:0.62s">
            <span class="tag-label">Role</span>
            <span class="tag-value">Full-Stack Dev</span>
          </div>

          <!-- Floating tag: bottom left -->
          <div class="about__tag about__tag--bl anim-scale" style="--d:0.75s">
            <span class="tag-label">Location</span>
            <span class="tag-value">Nairobi, KE 🌍</span>
          </div>
        </div>

        <!-- Small stat column sits below the photo -->
        <div class="about__mini-stats">
          <div v-for="(s, i) in miniStats" :key="i" class="about__mini-stat anim" :style="{ '--d': 0.9 + i * 0.08 + 's' }">
            <span class="mstat-num" :data-count="s.count" :data-suffix="s.suffix">0{{ s.suffix }}</span>
            <span class="mstat-label">{{ s.label }}</span>
          </div>
        </div>

      </div>

      <!-- RIGHT: Content column -->
      <div class="about__content-col">

        <!-- Eyebrow -->
        <p class="about__eyebrow anim" style="--d:0.2s">Full-Stack Engineer</p>

        <!-- Folioblox-style stacked headline -->
        <h2 class="about__heading">
          <span class="about__hl-solid anim-slide" style="--d:0.28s">Shaping</span>
          <span class="about__hl-outline anim-slide" style="--d:0.38s">Experiences</span>
          <span class="about__hl-accent anim-slide" style="--d:0.48s">That Impact.</span>
        </h2>

        <!-- Typewriter role -->
        <div class="about__role anim" style="--d:0.56s">
          <span class="role-bracket">[</span>
          <span class="role-text">{{ currentRole }}</span>
          <span class="role-cursor"></span>
          <span class="role-bracket">]</span>
        </div>

        <!-- Description -->
        <p class="about__desc anim" style="--d:0.62s">
          Full-stack developer with a passion for crafting scalable, performant applications.
          I transform complex business requirements into elegant solutions that drive measurable results.
        </p>

        <!-- Tab nav -->
        <div class="about__tabs anim" style="--d:0.68s">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="about__tab-body anim" style="--d:0.74s">
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

        <!-- Action buttons -->
        <div class="about__actions anim" style="--d:0.82s">
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

    <!-- Bottom stats strip -->
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
import { ref, onMounted, onUnmounted } from 'vue'

const aboutRef = ref(null)
const activeTab = ref('experience')
const typewriterStarted = ref(false)
const statsCounted = ref(false)

/* ── Tabs ────────────────────────────────────────────── */
const tabs = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills'     },
  { id: 'education',  label: 'Education'  },
  { id: 'interests',  label: 'Interests'  },
]

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

/* ── Count-up ────────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  const duration = 1200
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = Math.round(eased * target) + suffix
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ── Intersection observer ───────────────────────────── */
onMounted(() => {
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
        setTimeout(() => {
          section.querySelectorAll('.mstat-num[data-count]').forEach((el) => {
            animateCounter(el, parseInt(el.dataset.count, 10), el.dataset.suffix || '')
          })
        }, 1000)
      }

      io.unobserve(section)
    })
  }, { threshold: 0.1 })

  io.observe(section)
})

onUnmounted(() => { if (typingTimer) clearTimeout(typingTimer) })

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
/* ═══════════════════════════════════════════════════════
   NO :root block here — scoped :root never matches <html>,
   so all CSS variables are hardcoded below for reliability.
   ═══════════════════════════════════════════════════════ */

/* ── Section ─────────────────────────────────────────── */
.about {
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
.anim {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.anim-slide {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.anim-scale {
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.photo-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.in-view .anim       { opacity: 1; transform: translateY(0); }
.in-view .anim-slide { opacity: 1; transform: translateY(0); }
.in-view .anim-scale { opacity: 1; transform: scale(1); }
.in-view .photo-reveal { clip-path: inset(0 0 0 0); }

@keyframes float-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-5px); }
}

.in-view .about__tag--tr { animation: float-bob 3.5s ease-in-out 1.4s infinite; }
.in-view .about__tag--bl { animation: float-bob 3.5s ease-in-out 1.8s infinite; }

/* Tab item stagger */
@keyframes itemIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}

.exp-item { opacity: 0; animation: itemIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.exp-item:nth-child(1) { animation-delay: 0.04s; }
.exp-item:nth-child(2) { animation-delay: 0.11s; }
.exp-item:nth-child(3) { animation-delay: 0.18s; }
.exp-item:nth-child(4) { animation-delay: 0.25s; }

.skill-card { opacity: 0; animation: itemIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.skill-card:nth-child(1) { animation-delay: 0.04s; }
.skill-card:nth-child(2) { animation-delay: 0.10s; }
.skill-card:nth-child(3) { animation-delay: 0.16s; }
.skill-card:nth-child(4) { animation-delay: 0.22s; }

.edu-block { opacity: 0; animation: itemIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.04s forwards; }

.interest-pill { opacity: 0; animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.interest-pill:nth-child(1) { animation-delay: 0.02s; }
.interest-pill:nth-child(2) { animation-delay: 0.06s; }
.interest-pill:nth-child(3) { animation-delay: 0.10s; }
.interest-pill:nth-child(4) { animation-delay: 0.14s; }
.interest-pill:nth-child(5) { animation-delay: 0.18s; }
.interest-pill:nth-child(6) { animation-delay: 0.22s; }

@media (prefers-reduced-motion: reduce) {
  .anim, .anim-slide, .anim-scale, .photo-reveal,
  .exp-item, .skill-card, .edu-block, .interest-pill {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
}

/* ── Section header ──────────────────────────────────── */
.about__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.about__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.about__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.about__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.avail-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 1rem;
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.03em;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

/* ── Main grid ───────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
}

/* ── Photo column ────────────────────────────────────── */
.about__photo-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about__img-box {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  max-height: 540px;
  background: #111;
}

.about__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  filter: grayscale(100%) contrast(1.05);
  transition: filter 0.6s ease;
}

.about__img-box:hover .about__img {
  filter: grayscale(0%) contrast(1.02);
}

.about__img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(10, 10, 10, 0.7) 100%
  );
  pointer-events: none;
}

/* Floating tags */
.about__tag {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.55rem 1rem;
  background: rgba(10, 10, 10, 0.85);
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(12px);
}

.about__tag--tr { top: 1rem;    right: 1rem;  }
.about__tag--bl { bottom: 1.2rem; left: 1rem; }

.tag-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: #9aa3af;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.tag-value {
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
}

/* Mini stats below photo */
.about__mini-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.07);
}

.about__mini-stat {
  background: #0a0a0a;
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.mstat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.mstat-label {
  font-size: 0.65rem;
  font-weight: 600;
  color: #9aa3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── Content column ──────────────────────────────────── */
.about__content-col {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding-top: 0.5rem;
}

/* Eyebrow */
.about__eyebrow {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Headline — Folioblox editorial stacked style */
.about__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.9;
  gap: 0;
}

.about__hl-solid,
.about__hl-outline,
.about__hl-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.about__hl-solid   { color: #ffffff; }
.about__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}
.about__hl-accent  { color: #ff5500; font-style: italic; }

/* Typewriter */
.about__role {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 1.5em;
}

.role-bracket { color: #ff5500; font-weight: 700; }
.role-text    { color: #c8cdd5; letter-spacing: 0.03em; }
.role-cursor  {
  width: 2px;
  height: 1em;
  background: #ff5500;
  flex-shrink: 0;
  animation: blink 1s step-end infinite;
}

/* Description */
.about__desc {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.8;
  color: #b0b8c4;
  max-width: 520px;
}

/* ── Tab nav — text underline style ──────────────────── */
.about__tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.tab-btn {
  padding: 0.6rem 1.1rem 0.7rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #8a929e;
  cursor: pointer;
  letter-spacing: 0.02em;
  font-family: 'Inter', sans-serif;
  transition: color 0.25s ease, border-color 0.25s ease;
  white-space: nowrap;
}

.tab-btn:hover { color: #d0d5dd; }
.tab-btn.active {
  color: #ffffff;
  border-bottom-color: #ff5500;
}

/* Tab content container */
.about__tab-body {
  min-height: 220px;
}

.tab-fade-enter-active,
.tab-fade-leave-active { transition: all 0.2s ease; }
.tab-fade-enter-from   { opacity: 0; transform: translateY(8px); }
.tab-fade-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ═══════════════════════════════════════════════════════
   TAB CONTENT — every text color hardcoded, no variables
   ═══════════════════════════════════════════════════════ */

/* ── Experience ──────────────────────────────────────── */
.exp-list { display: flex; flex-direction: column; }

.exp-item {
  display: grid;
  grid-template-columns: 16px 1fr;
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
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  background: #0a0a0a;
  flex-shrink: 0;
}

.exp-dot.current {
  border-color: #ff5500;
  background: #ff5500;
  box-shadow: 0 0 8px rgba(255, 85, 0, 0.5);
}

.exp-line {
  width: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.07);
  margin: 3px 0;
}

.exp-body { padding-bottom: 1.4rem; }
.exp-item:last-child .exp-body { padding-bottom: 0; }

.exp-meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.22rem;
}

.exp-period {
  font-size: 0.7rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.05em;
}

.current-badge {
  font-size: 0.54rem;
  font-weight: 700;
  padding: 0.14rem 0.5rem;
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 999px;
  color: #ff5500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.exp-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.12rem;
}

.exp-company {
  display: block;
  font-size: 0.76rem;
  color: #a8b4c0;
  margin-bottom: 0.35rem;
}

.exp-desc {
  font-size: 0.8rem;
  color: #bcc4ce;
  line-height: 1.7;
  margin: 0;
}

/* ── Skills ──────────────────────────────────────────── */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.skill-card {
  padding: 1rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: #111111;
  transition: border-color 0.25s ease, transform 0.25s ease;
}

.skill-card:hover {
  border-color: rgba(255, 85, 0, 0.3);
  transform: translateY(-2px);
}

.skill-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.6rem;
  color: #ff5500;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 0.28rem; }

.skill-tag {
  padding: 0.26rem 0.58rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  font-size: 0.7rem;
  color: #d0d5dd;
}

/* ── Education ───────────────────────────────────────── */
.edu-block { display: flex; flex-direction: column; gap: 1.1rem; }

.edu-main { display: flex; gap: 1rem; align-items: flex-start; }

.edu-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 85, 0, 0.1);
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 10px;
  color: #ff5500;
  font-size: 1rem;
  flex-shrink: 0;
}

.edu-info h4 {
  font-size: 0.98rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.15rem;
}

.edu-info span {
  display: block;
  font-size: 0.78rem;
  color: #a8b4c0;
}

.edu-period { color: #ff5500 !important; font-weight: 600; margin-top: 0.2rem; }

.edu-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  overflow: hidden;
}

.edu-detail { padding: 0.85rem 1.1rem; }
.edu-detail:first-child { border-right: 1px solid rgba(255, 255, 255, 0.07); }

.ed-label {
  display: block;
  font-size: 0.62rem;
  font-weight: 700;
  color: #8a929e;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.28rem;
}

.ed-value {
  font-size: 0.8rem;
  color: #d0d5dd;
  line-height: 1.4;
}

/* ── Interests ───────────────────────────────────────── */
.interests-wrap { display: flex; flex-wrap: wrap; gap: 0.55rem; }

.interest-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.44rem 1rem;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  font-size: 0.78rem;
  color: #d0d5dd;
  transition: border-color 0.22s, background 0.22s, transform 0.22s;
}

.interest-pill i { color: #ff5500; font-size: 0.72rem; }

.interest-pill:hover {
  border-color: rgba(255, 85, 0, 0.3);
  background: rgba(255, 85, 0, 0.1);
  transform: translateY(-2px);
}

/* ── Action buttons ──────────────────────────────────── */
.about__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 0.25rem;
}

.btn-primary,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.btn-primary {
  padding: 0.8rem 1.8rem;
  background: #ffffff;
  color: #0a0a0a;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4);
}

.btn-ghost {
  padding: 0.75rem 1.6rem;
  background: #ff5500;
  color: #ffffff;
}

.btn-ghost:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
}

.btn-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-ghost:hover .btn-icon { transform: translateX(3px); }

/* ── Bottom strip ────────────────────────────────────── */
.about__strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: clamp(28px, 4vh, 48px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.strip-label {
  margin: 0;
  font-size: 0.72rem;
  font-weight: 600;
  color: #5a6270;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.strip-socials {
  display: flex;
  gap: 0.6rem;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  color: #9aa3af;
  text-decoration: none;
  transition: all 0.25s ease;
}

.social-link:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
  transform: translateY(-2px);
}

/* ── Keyframes ───────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}

@keyframes blink {
  0%, 50%   { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .about__grid { gap: clamp(24px, 4vw, 48px); }
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about__img-box {
    aspect-ratio: 4 / 3;
    max-height: 340px;
  }

  .about__mini-stats { grid-template-columns: repeat(4, 1fr); }

  .about__hl-solid,
  .about__hl-outline,
  .about__hl-accent {
    font-size: clamp(2.4rem, 8vw, 4rem);
  }
}

@media (max-width: 640px) {
  .about {
    padding: clamp(48px, 8vh, 72px) clamp(20px, 5vw, 32px);
    gap: clamp(32px, 5vh, 48px);
  }

  .about__mini-stats { grid-template-columns: 1fr 1fr; }
  .skills-grid { grid-template-columns: 1fr; }
  .edu-details { grid-template-columns: 1fr; }
  .edu-detail:first-child { border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }

  .about__actions { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-ghost { justify-content: center; }

  .about__hl-solid,
  .about__hl-outline,
  .about__hl-accent {
    font-size: clamp(2rem, 11vw, 3.5rem);
  }
}

@media (max-width: 380px) {
  .about { padding: 40px 16px; }
  .tab-btn { padding: 0.55rem 0.75rem; font-size: 0.76rem; }
}
</style>