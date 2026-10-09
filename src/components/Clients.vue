<template>
  <section id="clients" class="work-index" ref="sectionRef">

    <!-- ── Section mark ───────────────────────────────── -->
    <div class="wi__mark anim" style="--d:0.06s">
      <span class="wi__mark-line"></span>
      <span class="wi__mark-text">Selected Work</span>
      <span class="wi__mark-count">{{ clients.length }} projects</span>
    </div>

    <!-- ── Editorial heading ──────────────────────────── -->
    <div class="wi__head anim" style="--d:0.12s">
      <h2 class="wi__heading">
        <span class="wih-solid">Work that</span>
        <span class="wih-outline">ships and</span>
        <span class="wih-accent">sticks.</span>
      </h2>
      <p class="wi__head-sub">
        From agri-tech NGOs to retail SaaS — real projects, real clients,
        running in production across East Africa.
      </p>
    </div>

    <!-- ── Filter row ──────────────────────────────────── -->
    <div class="wi__filters anim" style="--d:0.18s">
      <button
        v-for="ind in industries"
        :key="ind"
        :class="['wif-btn', { active: activeFilter === ind }]"
        @click="activeFilter = ind"
      >
        {{ ind }}
        <span class="wif-n">{{ getCount(ind) }}</span>
      </button>
    </div>

    <!-- ── Client accordion ────────────────────────────── -->
    <div class="wi__stage anim" style="--d:0.24s">
      <div
        class="wc"
        :class="{ 'wc--paused': paused }"
        :key="activeFilter"
        role="list"
        aria-label="Client work"
        @mouseenter="hovering = true"
        @mouseleave="onStageLeave"
        @focusin="focusInside = true"
        @focusout="focusInside = false"
        @keydown="onStageKey"
      >
        <article
          v-for="(client, idx) in filtered"
          :key="client.name"
          :ref="el => { if (el) cardEls[client.name] = el }"
          class="wc__card"
          :class="{ 'is-active': client.name === activeName }"
          :style="{ '--h': hueFor(client.industry) }"
          role="listitem"
          tabindex="0"
          :aria-label="client.name + ' — ' + client.project"
          @mouseenter="onCardEnter(client.name)"
          @mouseleave="clearHoverTimer"
          @focus="activate(client.name)"
          @pointerdown="onCardDown(client.name)"
          @click="onCardClick(client.name)"
        >
          <!-- Backdrop: tinted gradient + oversized, ghosted logo -->
          <div class="wc__bg"></div>
          <img
            v-if="client.logo && !failedLogos.has(client.name)"
            class="wc__ghost"
            :src="client.logo"
            alt=""
            aria-hidden="true"
            loading="lazy"
            draggable="false"
            @error="failedLogos.add(client.name)"
          />
          <div class="wc__shade"></div>
          <div class="wc__glow"></div>

          <!-- Strip furniture (visible when collapsed) -->
          <span class="wc__num" aria-hidden="true">{{ String(idx + 1).padStart(2, '0') }}</span>
          <span class="wc__vlabel" aria-hidden="true">{{ client.name }}</span>

          <!-- Logo chip: centred on a strip, glides to top-left when active -->
          <span class="wc__chip" aria-hidden="true">
            <img
              v-if="client.logo && !failedLogos.has(client.name)"
              :src="client.logo"
              alt=""
              draggable="false"
              @error="failedLogos.add(client.name)"
            />
            <b v-else>{{ initials(client.name) }}</b>
          </span>

          <!-- Active content -->
          <div class="wc__content">
            <div class="wc__tags">
              <span class="wc__industry">{{ client.industry }}</span>
              <span class="wc__year">{{ client.year }}</span>
            </div>

            <div class="wc__head">
              <h3 class="wc__name">{{ client.name }}</h3>
              <p class="wc__project">
                {{ client.project }}
                <span class="wc__metric">{{ client.metric }}</span>
              </p>
            </div>

            <div class="wc__body">
              <div class="wc__cols">
                <div class="wc__col">
                  <p class="wc__desc">{{ client.description }}</p>
                  <div class="wc__stack">
                    <span v-for="tech in client.technologies" :key="tech">{{ tech }}</span>
                  </div>
                </div>
                <div class="wc__col">
                  <p class="wc__label">Key deliverables</p>
                  <ul class="wc__list">
                    <li v-for="item in getFeatures(client.name)" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>

              <div class="wc__foot">
                <blockquote v-if="getTestimonial(client.name)" class="wc__quote">
                  <p>"{{ getTestimonial(client.name).text }}"</p>
                  <cite>
                    {{ getTestimonial(client.name).author }},
                    {{ getTestimonial(client.name).position }} · {{ getTestimonial(client.name).company }}
                  </cite>
                </blockquote>
                <a href="#contact" class="wc__cta" @click.prevent.stop="goToContact">
                  Start a similar project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Progress bar → drives auto-advance -->
          <span class="wc__bar" @animationend="onBarEnd"></span>
        </article>
      </div>
    </div>

    <!-- ── Bottom strip ────────────────────────────────── -->
    <div class="wi__strip anim" style="--d:0.4s">
      <div class="wis__stats">
        <div class="wis__stat">
          <span class="wiss-n">{{ clients.length }}</span>
          <span class="wiss-l">Projects</span>
        </div>
        <div class="wis__div"></div>
        <div class="wis__stat">
          <span class="wiss-n">100%</span>
          <span class="wiss-l">Delivery rate</span>
        </div>
        <div class="wis__div"></div>
        <div class="wis__stat">
          <span class="wiss-n">{{ uniqueIndustries }}</span>
          <span class="wiss-l">Industries</span>
        </div>
        <div class="wis__div"></div>
        <div class="wis__stat">
          <span class="wiss-n">KE → EAC</span>
          <span class="wiss-l">Reach</span>
        </div>
      </div>
      <p class="wis__note">
        Next on this list?
        <a href="#contact" @click.prevent="goToContact">Let's talk</a>
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const sectionRef   = ref(null)
const activeFilter = ref('All')

const clients = ref([
  {
    name: 'Seed Savers Network Kenya',
    industry: 'Agriculture',
    project: 'Web Application',
    year: '2025',
    metric: 'NGO digital platform',
    logo: './SSN.JPG',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    description: 'Developed the primary digital platform for Seed Savers Network Kenya — an NGO preserving indigenous seed varieties and promoting food sovereignty across East Africa. The site supports program delivery, the EA-ISC 2026 Conference, and donor engagement.',
  },
  {
    name: '1st East African Indigenous Seeds Conference',
    industry: 'Agriculture',
    project: 'Web Application',
    year: '2026',
    metric: 'NGO digital platform',
    logo: './conference.png',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    description: 'Developed the 1st East African Indigenous Seeds Conference website — a digital hub for the EA-ISC 2026 conference hosted by Seed Savers Network Kenya. The site supports registration, program information, and resource sharing for participants across East Africa.',
  },
  {
    name: 'INOFO Africa',
    industry: 'Agriculture',
    project: 'Organisational Website',
    year: '2025',
    metric: 'Pan-African reach',
    logo: './inofo.JPG',
    technologies: ['React', 'TypeScript', 'CSS3'],
    description: 'Built a modern, responsive organisational website for INOFO Africa — a pan-African NGO advancing indigenous food systems. The site communicates programs, membership, and impact to a diverse international audience.',
  },
  {
    name: 'Greania Build Solutions',
    industry: 'Construction',
    project: 'Portfolio Website',
    year: '2025',
    metric: 'Inquiry rate up first month',
    logo: './Greania.JPG',
    technologies: ['React', 'TypeScript', 'Framer Motion'],
    description: 'Professional portfolio website for a Nairobi construction and interior design firm. Smooth Framer Motion animations and a structured project gallery increased client inquiry rates within the first month of launch.',
  },
  {
    name: 'Nyakazi Organics',
    industry: 'E-commerce',
    project: 'E-commerce Platform & Branding',
    year: '2024',
    metric: 'WhatsApp-native checkout',
    logo: './Nyakazi.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WhatsApp API'],
    description: 'Full e-commerce platform and digital branding overhaul for a Kenyan business selling solar-dried indigenous vegetables. Implemented a WhatsApp-native checkout flow matched to how Kenyan consumers actually purchase online.',
  },
  {
    name: 'AgroDakk Foods',
    industry: 'E-commerce',
    project: 'E-commerce Platform & Branding',
    year: '2026',
    metric: 'WhatsApp-native checkout',
    logo: './Agrodakk.png',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WhatsApp API'],
    description: 'Full e-commerce platform and digital branding overhaul for a Kenyan business selling solar-dried indigenous vegetables. Implemented a WhatsApp-native checkout flow matched to how Kenyan consumers actually purchase online.',
  },
  {
    name: 'SellSync POS',
    industry: 'Retail Technology',
    project: 'Multi-tenant SaaS POS',
    year: '2026',
    metric: 'Live · Railway production',
    logo: './sellsync-dashboard.png',
    technologies: ['Laravel 11', 'PostgreSQL', 'Vue.js', 'Railway'],
    description: 'Designed and developed SaleHub — a multi-tenant, cloud-native Point of Sale SaaS platform targeting Kenyan SMEs. Live on Railway with role-based access, branch management, and real-time inventory deductions.',
  },
  {
    name: 'Mary Kamau Personal Portfolio',
    industry: 'Consulting',
    project: 'Personal Website',
    year: '2026',
    metric: '90% faster load time',
    logo: './mary-portfolio.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
    description: 'Developed a personal portfolio website for a Nairobi-based consultant. The site features a responsive design, interactive project showcase, and integrated Google Maps location for client inquiries.',
  },
])

const testimonials = [
  {
    text: 'Kelvin delivered an exceptional platform that exceeded our expectations. His understanding of our market and how Kenyan customers actually shop made all the difference.',
    author: 'Julia',
    position: 'CEO',
    company: 'Nyakazi Organics',
  },
  {
    text: 'Working with Kelvin was seamless. He understood our requirements and delivered a platform that has significantly improved how we serve our farmer network.',
    author: 'Tabby ',
    position: 'Project Manager',
    company: 'Seed Savers Network',
  },
  {
    text: 'Professional, technically sharp, and always on time. The website has received outstanding feedback from clients and partners.',
    author: 'Eng. Johanna',
    position: 'Director',
    company: 'Greania Build Solutions',
  },
]

const features = {
  'Seed Savers Network Kenya': [
    'Program pages with impact reporting',
    'EA-ISC 2026 Conference hub and registration flow',
    'News and events module with category filtering',
    'Resource library for guides and research papers',
  ],
  'Nyakazi Organics': [
    'Mobile-first product catalog with WhatsApp checkout',
    'Order message auto-formatter for frictionless purchasing',
    'SEO-optimised for indigenous food search terms in Kenya',
    'Responsive design tested on low-end Android devices',
  ],
  'Greania Build Solutions': [
    'Project portfolio gallery with Framer Motion transitions',
    'Service inquiry system with lead capture form',
    'Client testimonial section with animated reveal',
    'Contact form with Google Maps location integration',
  ],
  'SaleHub POS': [
    'Multi-tenant architecture with complete data isolation',
    'Role-based access: Super Admin, Branch Manager, Cashier',
    'Real-time inventory deductions and low-stock alerts',
    'Daily, weekly, and monthly sales analytics dashboard',
  ],
}

const industries = computed(() => ['All', ...new Set(clients.value.map(c => c.industry))])
const filtered    = computed(() =>
  activeFilter.value === 'All'
    ? clients.value
    : clients.value.filter(c => c.industry === activeFilter.value)
)
const uniqueIndustries = computed(() => new Set(clients.value.map(c => c.industry)).size)
const getCount    = (ind) => ind === 'All' ? clients.value.length : clients.value.filter(c => c.industry === ind).length
const getFeatures = (name) => features[name] || ['Responsive design across all devices', 'Performance-optimised architecture', 'SEO-friendly implementation', 'Post-launch support included']
const getTestimonial = (name) => testimonials.find(t => name.toLowerCase().includes(t.company.toLowerCase().split(' ')[0])) || null

/* Per-industry tint for the card backdrops */
const HUES = { Agriculture: 150, Construction: 38, 'E-commerce': 18, 'Retail Technology': 215, Consulting: 265 }
const hueFor   = (industry) => HUES[industry] ?? 215
const initials = (name) => name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()

const failedLogos = reactive(new Set())

const goToContact = () => {
  setTimeout(() => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }, 80)
}


/* ═══════════════════════════════════════════════════════
   Accordion — hover/click to expand, auto-cycles
   ═══════════════════════════════════════════════════════ */

const activeName   = ref(clients.value[0]?.name ?? null)
const cardEls      = {}
const hovering     = ref(false)
const focusInside  = ref(false)
const inView       = ref(false)
const pageVisible  = ref(true)
let hoverTimer = null
let downWasActive = false
let io = null

// Keep a valid active card whenever the filter changes
watch(filtered, (list) => {
  if (!list.some(c => c.name === activeName.value)) activeName.value = list[0]?.name ?? null
}, { immediate: true })

const paused = computed(() => hovering.value || focusInside.value || !inView.value || !pageVisible.value)

function activate(name) { activeName.value = name }

function clearHoverTimer() {
  if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null }
}

// Small delay so sweeping across strips doesn't thrash the layout
function onCardEnter(name) {
  clearHoverTimer()
  if (name === activeName.value) return
  hoverTimer = setTimeout(() => activate(name), 70)
}

function onStageLeave() {
  hovering.value = false
  clearHoverTimer()
}

// Touch-safe: record state before emulated mouseenter fires
function onCardDown(name) { downWasActive = name === activeName.value }
function onCardClick(name) {
  clearHoverTimer()
  if (!downWasActive) activate(name)
  downWasActive = false
}

function step(dir) {
  const list = filtered.value
  if (!list.length) return null
  const i = list.findIndex(c => c.name === activeName.value)
  const next = list[(i + dir + list.length) % list.length]
  activeName.value = next.name
  return next
}

function onBarEnd(e) {
  if (!e.target.classList.contains('wc__bar')) return
  step(1)
}

function onStageKey(e) {
  const k = e.key
  if (k !== 'ArrowRight' && k !== 'ArrowLeft' && k !== 'ArrowDown' && k !== 'ArrowUp') return
  // let links/buttons inside the card keep their own behaviour
  e.preventDefault()
  const next = step(k === 'ArrowRight' || k === 'ArrowDown' ? 1 : -1)
  if (next) nextTick(() => cardEls[next.name]?.focus({ preventScroll: true }))
}

function onVisibility() { pageVisible.value = !document.hidden }

onMounted(() => {
  document.addEventListener('visibilitychange', onVisibility)

  const section = sectionRef.value
  if (!section) return
  // one-shot reveal
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { section.classList.add('in-view'); reveal.unobserve(section) }
    })
  }, { threshold: 0.05 })
  reveal.observe(section)

  // autoplay only while on screen
  io = new IntersectionObserver(([entry]) => { inView.value = entry.isIntersecting }, { threshold: 0.1 })
  io.observe(section)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  clearHoverTimer()
  if (io) io.disconnect()
})
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────── */
.work-index {
  --acc:     #e84a00;
  --acc-dim: rgba(232, 74, 0, 0.10);
  --acc-bd:  rgba(232, 74, 0, 0.28);
  --bd:      rgba(255,255,255,0.07);
  --bd2:     rgba(255,255,255,0.12);
  --white:   #ffffff;
  --silver:  #c8cdd5;
  --muted:   #8a929e;
  --dim:     rgba(255,255,255,0.18);
  --ease:    cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Animations ──────────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
  transition-delay: var(--d, 0s);
}
.in-view .anim { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .anim { transition-duration: 0.01ms !important; opacity: 1 !important; transform: none !important; }
}

/* ── Section shell ───────────────────────────────────── */
.work-index {
  width: 100%;
  max-width: 1440px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px) clamp(48px, 7vh, 96px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vh, 56px);
}

/* ── Section mark ────────────────────────────────────── */
.wi__mark {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.wi__mark-line {
  display: block;
  width: 28px;
  height: 1px;
  background: #e84a00;
  flex-shrink: 0;
}
.wi__mark-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: #e84a00;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.wi__mark-count {
  margin-left: auto;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.06em;
}

/* ── Heading ─────────────────────────────────────────── */
.wi__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 64px);
  align-items: end;
}

.wi__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.9;
}

.wih-solid, .wih-outline, .wih-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
}
.wih-solid   { color: #ffffff; }
.wih-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.28); }
.wih-accent  { color: #e84a00; font-style: italic; }

.wi__head-sub {
  margin: 0;
  font-size: clamp(0.88rem, 1.1vw, 1rem);
  line-height: 1.75;
  color: #8a929e;
  align-self: end;
  padding-bottom: 0.25rem;
}

/* ── Filter ──────────────────────────────────────────── */
.wi__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.wif-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.9rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #8a929e;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 0.22s ease;
}
.wif-btn:hover { border-color: rgba(255,255,255,0.2); color: #c8cdd5; }
.wif-btn.active { background: #e84a00; border-color: #e84a00; color: #ffffff; }
.wif-btn.active .wif-n { color: rgba(255,255,255,0.65); }

.wif-n { font-size: 0.6rem; opacity: 0.55; }

/* ── Client accordion ────────────────────────────────── */
.wi__stage { width: 100%; }

.wc {
  display: flex;
  gap: 10px;
  height: clamp(560px, 80vh, 660px);
  width: 100%;
}

.wc__card {
  --tint: hsl(var(--h) 45% 14%);
  --tint-hi: hsl(var(--h) 60% 22%);
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  isolation: isolate;
  background: #0b0c10;
  border: 1px solid rgba(255,255,255,0.07);
  transition: flex-grow 0.85s var(--ease), border-color 0.4s ease, box-shadow 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.wc__card:hover { border-color: rgba(255,255,255,0.14); }
.wc__card.is-active { flex-grow: 10; cursor: default; border-color: rgba(232,74,0,0.28); }
.wc__card:focus-visible { box-shadow: 0 0 0 2px var(--acc); }

/* Backdrop */
.wc__bg {
  position: absolute;
  inset: 0;
  z-index: -4;
  background:
    radial-gradient(120% 90% at 0% 0%, var(--tint-hi) 0%, transparent 60%),
    linear-gradient(160deg, var(--tint) 0%, #08090d 100%);
}
.wc__ghost {
  position: absolute;
  right: -6%;
  bottom: -8%;
  width: 62%;
  max-width: 560px;
  aspect-ratio: 1;
  object-fit: contain;
  z-index: -3;
  opacity: 0.05;
  filter: grayscale(1) brightness(2);
  transform: scale(0.85) rotate(-6deg);
  transition: opacity 0.9s ease, transform 1.2s var(--ease);
  pointer-events: none;
  user-select: none;
}
.wc__card.is-active .wc__ghost { opacity: 0.09; transform: scale(1) rotate(0); }
.wc__shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: linear-gradient(to bottom, rgba(6,7,12,0.1), rgba(6,7,12,0.55));
  transition: background 0.8s ease;
}
.wc__card.is-active .wc__shade {
  background:
    linear-gradient(110deg, rgba(6,7,12,0.55) 0%, rgba(6,7,12,0.1) 60%, transparent 100%),
    linear-gradient(to top, rgba(6,7,12,0.7) 0%, transparent 55%);
}
.wc__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(540px circle at 15% 105%, rgba(232,74,0,0.18), transparent 60%);
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
}
.wc__card.is-active .wc__glow { opacity: 1; }

/* Strip furniture */
.wc__num {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.35);
  transition: opacity 0.3s ease;
}
.wc__vlabel {
  position: absolute;
  left: 50%;
  bottom: 20px;
  max-height: 46%;
  overflow: hidden;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(180deg);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: rgba(255,255,255,0.6);
  transition: opacity 0.3s ease, color 0.3s ease;
}
.wc__card:hover:not(.is-active) .wc__vlabel { color: #fff; }
.wc__card.is-active .wc__num,
.wc__card.is-active .wc__vlabel { opacity: 0; pointer-events: none; }

/* Logo chip — centred on strip, glides to top-left when active */
.wc__chip {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
  transform: translate(-50%, -50%);
  transition:
    top 0.85s var(--ease),
    left 0.85s var(--ease),
    transform 0.85s var(--ease),
    width 0.85s var(--ease),
    height 0.85s var(--ease);
  z-index: 2;
  overflow: hidden;
}
.wc__chip img { width: 100%; height: 100%; object-fit: contain; display: block; user-select: none; }
.wc__chip b { font-size: 0.8rem; font-weight: 800; color: #0b0c10; letter-spacing: 0.02em; }
.wc__card.is-active .wc__chip {
  top: 24px;
  left: 28px;
  width: 52px;
  height: 52px;
  transform: translate(0, 0);
}

/* Content */
.wc__content {
  position: absolute;
  inset: 0;
  min-width: 560px;
  max-width: 980px;
  padding: 24px 32px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease, visibility 0s linear 0.2s;
}
.wc__card.is-active .wc__content {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transition: opacity 0.5s ease 0.3s, visibility 0s;
}

/* staggered rise-in */
.wc__tags, .wc__head, .wc__cols, .wc__foot {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.wc__card.is-active .wc__tags,
.wc__card.is-active .wc__head,
.wc__card.is-active .wc__cols,
.wc__card.is-active .wc__foot {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s var(--ease), transform 0.7s var(--ease);
}
.wc__card.is-active .wc__tags { transition-delay: 0.32s; }
.wc__card.is-active .wc__head { transition-delay: 0.4s; }
.wc__card.is-active .wc__cols { transition-delay: 0.5s; }
.wc__card.is-active .wc__foot { transition-delay: 0.6s; }

.wc__tags {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.7rem;
  min-height: 52px;
  margin-left: 68px;
}
.wc__industry {
  margin-right: auto;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--acc);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.22rem 0.65rem;
  border: 1px solid rgba(232,74,0,0.28);
  border-radius: 999px;
  background: rgba(232,74,0,0.1);
  white-space: nowrap;
}
.wc__year {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.04em;
}

.wc__name {
  margin: 0;
  font-size: clamp(1.6rem, 3.1vw, 2.7rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: #fff;
}
.wc__project {
  margin: 0.55rem 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.82rem;
  color: #9aa3af;
}
.wc__metric {
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  font-size: 0.66rem;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  white-space: nowrap;
}

.wc__body {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.wc__cols {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(20px, 3vw, 44px);
}
.wc__desc {
  margin: 0 0 0.9rem;
  font-size: 0.86rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.8);
}
.wc__stack { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.wc__stack span {
  padding: 0.22rem 0.6rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  font-size: 0.65rem;
  color: #d3d8df;
  letter-spacing: 0.02em;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.wc__label {
  margin: 0 0 0.7rem;
  font-size: 0.62rem;
  font-weight: 700;
  color: var(--acc);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.wc__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.wc__list li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255,255,255,0.7);
}
.wc__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--acc);
}

.wc__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.wc__quote {
  flex: 1 1 320px;
  margin: 0;
  padding: 0.8rem 1.1rem;
  border-left: 2px solid var(--acc);
  background: rgba(232,74,0,0.06);
  border-radius: 0 10px 10px 0;
}
.wc__quote p {
  margin: 0 0 0.35rem;
  font-size: 0.78rem;
  line-height: 1.6;
  font-style: italic;
  color: #c3cad4;
}
.wc__quote cite {
  font-size: 0.64rem;
  font-style: normal;
  color: #7b8594;
  letter-spacing: 0.04em;
}
.wc__cta {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.3rem;
  background: var(--acc);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  box-shadow: 0 6px 20px rgba(232,74,0,0.3);
  white-space: nowrap;
  transition: background 0.25s ease, transform 0.3s var(--ease);
}
.wc__cta:hover { background: #ff5c10; transform: translateY(-2px); }

/* Progress bar → auto-advance */
.wc__bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 100%;
  background: var(--acc);
  transform-origin: left center;
  transform: scaleX(0);
  opacity: 0;
  z-index: 3;
  pointer-events: none;
}
.wc__card.is-active .wc__bar { opacity: 0.9; animation: wcBar 8s linear forwards; }
.wc--paused .wc__card.is-active .wc__bar { animation-play-state: paused; }
@keyframes wcBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@media (prefers-reduced-motion: reduce) {
  .wc__card, .wc__chip, .wc__ghost, .wc__content,
  .wc__tags, .wc__head, .wc__cols, .wc__foot { transition-duration: 0.01ms !important; transition-delay: 0s !important; }
  .wc__bar { display: none; }
}

/* ── Bottom strip ────────────────────────────────────── */
.wi__strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: clamp(24px, 4vh, 40px);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.wis__stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.wis__stat { display: flex; flex-direction: column; gap: 0.1rem; }

.wiss-n {
  font-size: 1.4rem;
  font-weight: 800;
  color: #e84a00;
  letter-spacing: -0.03em;
  line-height: 1;
}

.wiss-l {
  font-size: 0.6rem;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.wis__div {
  width: 1px;
  height: 1.8rem;
  background: rgba(255,255,255,0.07);
  flex-shrink: 0;
}

.wis__note {
  margin: 0;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.25);
}
.wis__note a {
  color: #8a929e;
  text-decoration: none;
  transition: color 0.2s;
}
.wis__note a:hover { color: #e84a00; }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .wc__content { min-width: 480px; }
  .wc__cols { grid-template-columns: 1fr; gap: 1rem; }
  .wc__list li:nth-child(n+3) { display: none; }
}

@media (max-width: 900px) {
  .wi__head { grid-template-columns: 1fr; gap: 1rem; }
}

@media (max-width: 640px) {
  .work-index { padding: clamp(48px, 8vh, 72px) 20px clamp(40px, 6vh, 64px); }
  .wih-solid, .wih-outline, .wih-accent { font-size: clamp(2.2rem, 9vw, 3.5rem); }

  /* accordion turns vertical */
  .wc { flex-direction: column; height: 820px; gap: 8px; }
  .wc__card { border-radius: 14px; min-height: 62px; }
  .wc__card.is-active { flex-grow: 9; }
  .wc__num { top: 50%; left: auto; right: 16px; transform: translateY(-50%); }
  .wc__vlabel {
    writing-mode: horizontal-tb;
    left: 76px; bottom: auto; top: 50%; max-height: none; max-width: calc(100% - 130px);
    overflow: hidden; text-overflow: ellipsis;
    transform: translateY(-50%);
  }
  .wc__chip { left: 38px; }
  .wc__card.is-active .wc__chip { top: 16px; left: 18px; width: 46px; height: 46px; }
  .wc__content {
    min-width: 0; max-width: none; padding: 16px 18px 20px;
    overflow-y: auto; gap: 0.8rem;
    scrollbar-width: thin;
  }
  .wc__tags { min-height: 46px; margin-left: 58px; }
  .wc__name { font-size: 1.5rem; }
  .wc__cols { grid-template-columns: 1fr; }
  .wc__list li:nth-child(n+3) { display: block; }
  .wc__foot { flex-direction: column; align-items: stretch; }
  .wc__cta { margin-left: 0; justify-content: center; }

  .wi__strip { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .wis__div { display: none; }
}

@media (max-width: 380px) {
  .work-index { padding: 40px 16px 48px; }
}
</style>