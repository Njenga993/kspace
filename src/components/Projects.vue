
<template>
  <section id="projects" class="projects-section">
    <div class="projects-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">Portfolio</span>
        </div>
        <div class="top-right">
          <div class="live-badge">
            <span class="pulse-dot"></span>
            <span>{{ liveCount }} Live · {{ projects.length }} Total</span>
          </div>
          <a href="https://github.com/Njenga993" target="_blank" class="github-pill">
            <i class="fab fa-github"></i>
            <span>Njenga993</span>
          </a>
        </div>
      </div>

      <!-- Main split -->
      <div class="main-grid">

        <!-- LEFT -->
        <div class="left-col">
          <div class="headline-block">
            <p class="eyebrow">Selected Work</p>
            <h2 class="headline">
              <span class="hl-solid">Real</span>
              <span class="hl-outline">World</span>
              <span class="hl-accent">Solutions</span>
            </h2>
            <p class="sub-desc">
              Five production systems solving real problems across East Africa — from
              seed sovereignty to clean energy, indigenous food e-commerce to enterprise POS.
            </p>
          </div>

          <div class="filter-track">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="['filter-pill', { active: activeFilter === cat }]"
              @click="activeFilter = cat"
            >
              {{ cat }}
              <span class="f-count">{{ cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length }}</span>
            </button>
          </div>

          <div class="sort-row">
            <span class="sort-label">Sort</span>
            <div class="sort-track">
              <button
                v-for="s in sortOptions"
                :key="s.val"
                :class="['sort-pill', { active: sortBy === s.val }]"
                @click="sortBy = s.val"
              >{{ s.label }}</button>
            </div>
          </div>
        </div>

        <!-- RIGHT: featured -->
        <div class="right-col">
          <Transition name="panel-fade" mode="out-in">
            <div :key="featured.id" class="featured-wrap">
              <div class="terminal-card" @click="openModal(featured)">
                <div class="terminal-dots"><span></span><span></span><span></span></div>
                <div class="t-lines">
                  <div class="t-line-row">
                    <span class="t-prompt">~/projects/{{ featured.slug }} $</span>
                    <span class="t-cmd">cat readme.md</span>
                  </div>
                  <div class="t-line-row">
                    <span class="t-prompt">›</span>
                    <span class="t-accent-out">{{ featured.title }}</span>
                  </div>
                  <div class="t-line-row">
                    <span class="t-prompt">›</span>
                    <span class="t-out">{{ featured.stack.join(' · ') }}</span>
                  </div>
                  <div class="t-line-row">
                    <span class="t-prompt">›</span>
                    <span :class="featured.status === 'live' ? 't-live' : 't-dev'">
                      {{ featured.status === 'live' ? '● DEPLOYED' : '◌ IN DEVELOPMENT' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="featured-img-wrap" @click="openModal(featured)">
                <div class="featured-img">
                  <img
                    v-if="featured.image"
                    :src="featured.image"
                    :alt="featured.title"
                    @error="onImgError"
                  />
                  <div v-else class="img-placeholder">
                    <span class="ph-icon">{{ featured.icon }}</span>
                    <span class="ph-name">{{ featured.title }}</span>
                  </div>
                  <div class="img-gradient"></div>
                  <div class="img-hover-label">
                    <i class="fas fa-expand-alt"></i>
                    <span>View Case Study</span>
                  </div>
                </div>
                <div class="corner corner-tl"></div>
                <div class="corner corner-br"></div>
                <div class="watermark">01</div>
              </div>

              <div class="featured-actions">
                <button class="action-link action-primary" @click="openModal(featured)">
                  <span class="al-num">01</span>
                  <span class="al-label">View Case Study</span>
                  <i class="fas fa-arrow-right al-arrow"></i>
                </button>
                <a v-if="featured.demo && featured.demo !== '#'" :href="featured.demo" target="_blank" class="action-link action-secondary">
                  <span class="al-num">EXT</span>
                  <span class="al-label">Live Demo</span>
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Project grid -->
      <div class="project-grid">
        <div
          v-for="(project, idx) in filteredSorted"
          :key="project.id"
          class="project-card"
          @click="openModal(project)"
        >
          <div class="pc-visual">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="pc-img"
              @error="onImgError"
            />
            <div v-else class="pc-placeholder">
              <span class="pcp-icon">{{ project.icon }}</span>
            </div>
            <div class="pc-overlay">
              <span class="pco-label">View Case Study</span>
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="pc-num">{{ String(idx + 1).padStart(2, '0') }}</div>
            <div class="pc-status-dot" :class="project.status"></div>
          </div>
          <div class="pc-body">
            <div class="pc-top">
              <span class="pc-cat">{{ project.category }}</span>
              <span v-if="project.impact" class="pc-impact">{{ project.impact }}</span>
            </div>
            <h4 class="pc-title">{{ project.title }}</h4>
            <p class="pc-desc">{{ project.tagline }}</p>
            <div class="pc-stack">
              <span v-for="tech in project.stack.slice(0, 3)" :key="tech" class="pc-tech">{{ tech }}</span>
              <span v-if="project.stack.length > 3" class="pc-more">+{{ project.stack.length - 3 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Inquiry strip -->
      <div class="inquiry-strip">
        <div class="is-text">
          <h3>Have a project in mind?</h3>
          <p>I specialise in full-stack systems, e-commerce platforms, and data-driven tools for African markets.</p>
        </div>
        <a href="#contact" class="is-btn">
          <span>Let's Build Together</span>
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ projects.length }}</span>
          <span class="stat-desc">Projects</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ liveCount }}</span>
          <span class="stat-desc">Live</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ totalTech }}</span>
          <span class="stat-desc">Technologies</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">4</span>
          <span class="stat-desc">Industries</span>
        </div>
        <div class="socials">
          <a href="https://github.com/Njenga993" target="_blank" class="social-link" aria-label="GitHub"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="social-link" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="https://x.com/kamau_nje" target="_blank" class="social-link" aria-label="X"><i class="fab fa-x-twitter"></i></a>
        </div>
      </div>

    </div>

    <!-- ─── Modal ─── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="activeProject" class="modal-backdrop" @click.self="closeModal">

          <!-- CLOSE always visible, fixed inside backdrop -->
          <button class="modal-close-fixed" @click="closeModal" aria-label="Close">
            <i class="fas fa-times"></i>
          </button>

          <div class="modal-shell">

            <!-- ── LEFT: image (fixed height, no scroll) ── -->
            <div class="modal-visual">
              <img
                v-if="activeProject.image"
                :src="activeProject.image"
                :alt="activeProject.title"
                class="mv-img"
                @error="onImgError"
              />
              <div v-else class="mv-placeholder">
                <span class="mvp-icon">{{ activeProject.icon }}</span>
                <span class="mvp-name">{{ activeProject.title }}</span>
              </div>
              <div class="mv-gradient"></div>

              <div class="mv-info">
                <div class="mv-status" :class="activeProject.status">
                  <span class="ms-dot"></span>
                  <span>{{ activeProject.status === 'live' ? 'Live in Production' : 'In Development' }}</span>
                </div>
                <div class="mv-links">
                  <a v-if="activeProject.demo && activeProject.demo !== '#'" :href="activeProject.demo" target="_blank" class="mv-link mv-link--primary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                  </a>
                  <a v-if="activeProject.github" :href="activeProject.github" target="_blank" class="mv-link mv-link--ghost">
                    <i class="fab fa-github"></i> Source
                  </a>
                </div>
              </div>

              <div class="mv-watermark">{{ String(projects.findIndex(p => p.id === activeProject.id) + 1).padStart(2,'0') }}</div>
            </div>

            <!-- ── RIGHT: scrollable content ── -->
            <div class="modal-content" ref="modalContentRef">

              <div class="mc-header">
                <span class="mc-cat">{{ activeProject.category }}</span>
                <h2 class="mc-title">{{ activeProject.title }}</h2>
                <p class="mc-tagline">{{ activeProject.tagline }}</p>
              </div>

              <p class="mc-desc">{{ activeProject.description }}</p>

              <div class="mc-row">
                <div class="mc-block">
                  <div class="mcb-header">
                    <span class="mcb-dot mcb-dot--problem"></span>
                    <span class="mcb-label">The Problem</span>
                  </div>
                  <p class="mcb-text">{{ activeProject.problem }}</p>
                </div>
                <div class="mc-block">
                  <div class="mcb-header">
                    <span class="mcb-dot mcb-dot--solution"></span>
                    <span class="mcb-label">The Solution</span>
                  </div>
                  <p class="mcb-text">{{ activeProject.solution }}</p>
                </div>
              </div>

              <div class="mc-metrics" v-if="activeProject.metrics">
                <div class="mc-section-label">
                  <i class="fas fa-chart-line"></i> Impact Metrics
                </div>
                <div class="mcm-grid">
                  <div v-for="m in activeProject.metrics" :key="m.label" class="mcm-item">
                    <span class="mcm-value">{{ m.value }}</span>
                    <span class="mcm-desc">{{ m.label }}</span>
                  </div>
                </div>
              </div>

              <div class="mc-features">
                <div class="mc-section-label">
                  <span class="mcs-dot"></span> Key Features
                </div>
                <div class="mcf-list">
                  <div v-for="feat in activeProject.features" :key="feat" class="mcf-item">
                    <div class="mcfi-icon"><i class="fas fa-check"></i></div>
                    <span>{{ feat }}</span>
                  </div>
                </div>
              </div>

              <div class="mc-stack">
                <div class="mc-section-label">
                  <span class="mcs-dot"></span> Tech Stack
                </div>
                <div class="mcs-pills">
                  <span v-for="tech in activeProject.stack" :key="tech" class="mcs-pill">{{ tech }}</span>
                </div>
              </div>

              <!-- Bottom nav -->
              <div class="mc-nav">
                <button class="mcn-btn" :disabled="!prevProject" @click="navigateProject('prev')">
                  <i class="fas fa-arrow-left"></i> Prev
                </button>
                <span class="mcn-counter">
                  {{ String(projects.findIndex(p => p.id === activeProject.id) + 1).padStart(2,'0') }}
                  /
                  {{ String(projects.length).padStart(2,'0') }}
                </span>
                <button class="mcn-btn" :disabled="!nextProject" @click="navigateProject('next')">
                  Next <i class="fas fa-arrow-right"></i>
                </button>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const projects = ref([
  {
    id: 1,
    slug: 'sellsync-pos',
    title: 'SellSync POS System',
    tagline: 'Multi-tenant SaaS point of sale built for the Kenyan retail market.',
    description: 'SellSync is a production-grade, multi-tenant Point of Sale platform built with Laravel 11 and PostgreSQL, live on Railway. Designed specifically for Kenyan SMEs, it consolidates inventory, sales analytics, branch management, and role-based access control into one cohesive system — replacing the fragmented spreadsheet workflows most local retailers depend on.',
    problem: 'Kenyan SMEs lose thousands of shillings monthly to stock discrepancies, manual reconciliation errors, and the absence of real-time sales visibility across branches.',
    solution: 'A cloud-native POS with per-tenant data isolation, a cashier-optimised touch interface, live inventory deductions, and branch-level reporting — deployable via a single Railway URL with zero infrastructure overhead.',
    category: 'Full Stack · SaaS',
    icon: '⚡',
    image: './sellsync-dashboard.png',
    status: 'live',
    impact: 'SaaS',
    github: 'https://github.com/Njenga993/pos-project',
    demo: 'https://sellsync-pos-production.up.railway.app/',
    stack: ['Laravel 11', 'PostgreSQL', 'Vue.js', 'Tailwind CSS', 'Railway', 'PHP'],
    metrics: [
      { value: '40%', label: 'Faster checkout' },
      { value: 'Multi', label: 'Tenant isolation' },
      { value: 'Real-time', label: 'Stock updates' },
      { value: '99.9%', label: 'Uptime on Railway' },
    ],
    features: [
      'Multi-tenant architecture with complete data isolation per business',
      'Role-based access control — Super Admin, Branch Manager, Cashier',
      'Live inventory deductions on every sale with low-stock alerts',
      'Branch management with per-branch sales and stock reports',
      'Supplier and expense management modules',
      'Daily, weekly, and monthly analytics dashboard',
      'Receipt generation with customisable business branding',
    ],
  },
  {
    id: 2,
    slug: 'nyakazi-ecommerce',
    title: 'Nyakazi Organics',
    tagline: 'E-commerce platform reconnecting Kenyans with indigenous solar-dried vegetables.',
    description: 'A full-featured Next.js e-commerce storefront for Nyakazi Organics — a Kenyan brand selling solar-dried indigenous vegetables. The platform handles product discovery, cart management, and WhatsApp-native order processing, meeting customers exactly where they already transact in the Kenyan market.',
    problem: 'Indigenous Kenyan vegetables are disappearing from urban tables because there was no modern, accessible channel connecting rural producers to city consumers who actively want them.',
    solution: 'A performant Next.js storefront with a curated product catalog, WhatsApp checkout integration formatted for Kenyan ordering habits, and SEO optimised for "African vegetables Kenya" search intent.',
    category: 'E-commerce',
    icon: '🌿',
    image: './Ecommerc.png',
    status: 'live',
    impact: 'Live',
    github: 'https://github.com/Njenga993/nyakazi-ecommerce-',
    demo: 'https://nyakazi.org/',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'WhatsApp API'],
    metrics: [
      { value: '95+', label: 'Lighthouse score' },
      { value: 'WhatsApp', label: 'Native checkout' },
      { value: 'Mobile-first', label: 'Design approach' },
      { value: 'SEO', label: 'Optimised for Kenya' },
    ],
    features: [
      'Mobile-first product catalog with high-quality photography layout',
      'WhatsApp order message auto-formatter for frictionless checkout',
      'Product search and category filtering',
      'Persistent cart with localStorage state management',
      'SEO metadata, Open Graph, and structured data for search visibility',
      'Responsive design tested across low-end Android devices common in Kenya',
    ],
  },
  {
    id: 3,
    slug: 'seed-savers-network',
    title: 'Seed Savers Network Kenya',
    tagline: "Digital platform for East Africa's indigenous seed sovereignty movement.",
    description: 'A React + TypeScript website for Seed Savers Network Kenya — an NGO working to preserve indigenous seed varieties and promote food sovereignty across East Africa. The site serves as the primary digital face for the organisation, hosting their programs, events, resource library, and the EA-ISC 2026 Conference.',
    problem: 'The Seed Savers Network had no unified digital presence capable of serving their diverse stakeholders — farmers, researchers, partner NGOs, and international donors — with consistent, accessible information.',
    solution: 'A component-driven React site with clearly structured program pages, an events system for the EA-ISC 2026 Conference, a multilingual-ready resource library, and donation pathways optimised for both local M-Pesa and international payment flows.',
    category: 'Web Development',
    icon: '🌱',
    image: './ssn.PNG',
    status: 'live',
    impact: 'NGO',
    github: 'https://github.com/Njenga993/SeedSavers',
    demo: 'https://seedsaverskenya.org/',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML5'],
    metrics: [
      { value: 'EA-ISC', label: '2026 Conference hub' },
      { value: 'Multi', label: 'Stakeholder design' },
      { value: 'Fast', label: 'Vite build pipeline' },
      { value: 'AA', label: 'Accessibility compliant' },
    ],
    features: [
      'Program and project pages with structured impact reporting',
      'EA-ISC 2026 Conference section with registration and partner info',
      'News and events module with category filtering',
      'Resource library for seed saving guides and research papers',
      'Donation flow with M-Pesa and card payment pathways',
      'SEO-optimised for both English and Swahili search queries',
      'Performance-tuned for low-bandwidth rural internet connections',
    ],
  },
  {
    id: 4,
    slug: 'mne-platform',
    title: 'M&E Management System',
    tagline: 'Django-powered monitoring and evaluation platform for NGO project reporting.',
    description: 'A full-stack Monitoring & Evaluation system built in Python Django for NGOs and development organisations. The platform manages logframes, tracks activity completion, handles task assignment, enables comment-thread collaboration, and generates standardised donor-ready performance reports — eliminating manual Excel-based M&E workflows.',
    problem: 'NGOs waste enormous staff hours compiling M&E data from disconnected spreadsheets and email chains. Donor report deadlines trigger panic rather than confidence because there is no single source of truth for project data.',
    solution: 'A structured Django web application where programme staff log activities against logframes in real time, project managers track task completion, and finance teams pull auto-generated reports formatted to common donor templates.',
    category: 'Full Stack',
    icon: '📊',
    image: null,
    status: 'development',
    impact: 'NGO Tool',
    github: 'https://github.com/Njenga993/MnE',
    demo: '#',
    stack: ['Python', 'Django', 'SQLite', 'JavaScript', 'HTML5', 'CSS3'],
    metrics: [
      { value: '15h+', label: 'Saved per week' },
      { value: 'Real-time', label: 'Activity tracking' },
      { value: 'Auto', label: 'Report generation' },
      { value: 'Multi-role', label: 'Access control' },
    ],
    features: [
      'Logframe builder with indicators, targets, and baseline tracking',
      'Activity log with date, responsible person, and completion status',
      'Task management with assignment, due dates, and comment threads',
      'Auto-generated PDF reports formatted for common donor templates',
      'Mobile API for field officers to log activities from smartphones',
      'Budget tracking and variance analysis per project activity',
      'Role-based permissions for Programme Staff, Managers, and Finance',
    ],
  },
  {
    id: 5,
    slug: 'elixir-biotech',
    title: 'Elixir Biotech',
    tagline: 'React/TypeScript website for a Nairobi clean energy startup.',
    description: 'A premium React + TypeScript marketing and product site for Elixir Biotech, a Nairobi-based clean energy company developing biogas and waste-to-energy systems for the East African market. The build focuses on editorial authority, scroll-reveal storytelling, and SEO structured data to attract B2B clients and impact investors.',
    problem: 'Elixir Biotech had a compelling product but no digital presence that matched their ambition. Their old site undermined investor confidence and failed to articulate the economic case for biogas adoption to Kenyan agribusinesses.',
    solution: 'A full UI overhaul across all sections with IntersectionObserver scroll animations, JSON-LD structured data, and pre-rendering via vite-plugin-prerender to maximise SEO for clean energy search terms in East Africa.',
    category: 'Frontend',
    icon: '🔋',
    image: './elixbiotech.png',
    status: 'live',
    impact: 'Clean Energy',
    github: 'https://github.com/Njenga993',
    demo: 'https://elixirbiotech.co.ke/',
    stack: ['React', 'TypeScript', 'Vite', 'CSS3', 'React Helmet', 'JSON-LD'],
    metrics: [
      { value: 'SEO', label: 'Structured data markup' },
      { value: 'GSAP', label: 'Scroll animations' },
      { value: 'AA', label: 'Accessibility standard' },
      { value: 'SSG', label: 'Pre-rendered pages' },
    ],
    features: [
      'Full-bleed hero with dark overlay and scroll-triggered content reveal',
      'IntersectionObserver scroll animations across all sections',
      'JSON-LD structured data for Product, Organization, and FAQ schemas',
      'Pre-rendering via vite-plugin-prerender for SEO-ready static output',
      'React Helmet Async for per-page meta, OG tags, and canonical URLs',
      'Product section with technical specifications and impact metrics',
      'Contact form with form validation and WhatsApp fallback integration',
    ],
  },
])

const activeFilter    = ref('All')
const sortBy          = ref('featured')
const activeProject   = ref(null)
const modalContentRef = ref(null)

const categories = computed(() => ['All', ...new Set(projects.value.map(p => p.category))])

const sortOptions = [
  { val: 'featured', label: 'Featured' },
  { val: 'live',     label: 'Live first' },
]

const filteredSorted = computed(() => {
  let list = activeFilter.value === 'All'
    ? [...projects.value]
    : projects.value.filter(p => p.category === activeFilter.value)
  if (sortBy.value === 'live') {
    list.sort((a, b) => (b.status === 'live' ? 1 : 0) - (a.status === 'live' ? 1 : 0))
  }
  return list
})

const featured  = computed(() => filteredSorted.value[0] || projects.value[0])
const liveCount = computed(() => projects.value.filter(p => p.status === 'live').length)
const totalTech = computed(() => {
  const s = new Set()
  projects.value.forEach(p => p.stack.forEach(t => s.add(t)))
  return s.size
})

const prevProject = computed(() => {
  if (!activeProject.value) return null
  const idx = projects.value.findIndex(p => p.id === activeProject.value.id)
  return idx > 0 ? projects.value[idx - 1] : null
})

const nextProject = computed(() => {
  if (!activeProject.value) return null
  const idx = projects.value.findIndex(p => p.id === activeProject.value.id)
  return idx < projects.value.length - 1 ? projects.value[idx + 1] : null
})

const openModal = (project) => {
  activeProject.value = project
  document.body.style.overflow = 'hidden'
  // reset scroll on next tick
  setTimeout(() => {
    if (modalContentRef.value) modalContentRef.value.scrollTop = 0
  }, 50)
}

const closeModal = () => {
  activeProject.value = null
  document.body.style.overflow = ''
}

const navigateProject = (dir) => {
  const target = dir === 'prev' ? prevProject.value : nextProject.value
  if (target) {
    activeProject.value = target
    setTimeout(() => {
      if (modalContentRef.value) modalContentRef.value.scrollTop = 0
    }, 50)
  }
}

// gracefully hide broken images
const onImgError = (e) => {
  e.target.style.display = 'none'
  const placeholder = e.target.nextElementSibling
  if (placeholder && placeholder.classList.contains('img-placeholder')) {
    placeholder.style.display = 'flex'
  }
}

const handleKey = (e) => {
  if (!activeProject.value) return
  if (e.key === 'Escape')      closeModal()
  if (e.key === 'ArrowLeft')   navigateProject('prev')
  if (e.key === 'ArrowRight')  navigateProject('next')
}

onMounted(() => document.addEventListener('keydown', handleKey))
onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
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

.projects-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.projects-card {
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

.projects-card::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 55%; height: 100%;
  background: radial-gradient(ellipse at 80% 20%, rgba(180, 100, 30, 0.13) 0%, transparent 65%);
  pointer-events: none;
}

/* top bar */
.top-bar {
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap;
  gap: 1rem; position: relative; z-index: 2;
}
.section-label { display: flex; align-items: center; gap: 0.55rem; }
.label-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; }
.label-text { font-size: 0.72rem; font-weight: 700; color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase; }
.top-right { display: flex; align-items: center; gap: 0.75rem; }
.live-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1rem; border: 1px solid var(--accent-border);
  border-radius: 3rem; font-size: 0.74rem; font-weight: 600;
  color: var(--accent); background: var(--accent-dim);
}
.pulse-dot {
  width: 6px; height: 6px; background: var(--green);
  border-radius: 50%; box-shadow: 0 0 7px rgba(46,204,113,0.7);
  animation: pulse 2s infinite;
}
.github-pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.4rem 0.9rem; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 3rem;
  font-size: 0.74rem; font-weight: 500; color: var(--silver);
  text-decoration: none; transition: all 0.2s;
}
.github-pill:hover { border-color: var(--accent-border); color: var(--accent); }

/* main grid */
.main-grid {
  display: grid; grid-template-columns: 1fr 1.15fr;
  gap: 3rem; align-items: start; position: relative; z-index: 2;
}
.left-col { display: flex; flex-direction: column; gap: 1.6rem; }
.headline-block { display: flex; flex-direction: column; gap: 0.5rem; }
.eyebrow { font-size: 0.82rem; font-weight: 600; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; }
.headline { display: flex; flex-direction: column; line-height: 0.95; letter-spacing: -0.03em; margin: 0; }
.hl-solid  { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--white); }
.hl-outline{ font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: transparent; -webkit-text-stroke: 1.5px var(--white); }
.hl-accent { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--accent); }
.sub-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.72; margin: 0.3rem 0 0; max-width: 420px; }

.filter-track { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.filter-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.44rem 1rem; border: 1px solid var(--border);
  border-radius: 3rem; background: var(--bg-card);
  font-size: 0.76rem; font-weight: 600; color: var(--muted);
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.filter-pill:hover { border-color: var(--accent-border); color: var(--silver); }
.filter-pill.active { background: var(--accent); border-color: var(--accent); color: #0d1117; }
.f-count { font-size: 0.62rem; opacity: 0.7; }

.sort-row { display: flex; align-items: center; gap: 0.75rem; }
.sort-label { font-size: 0.66rem; font-weight: 700; color: var(--dim); letter-spacing: 0.1em; text-transform: uppercase; }
.sort-track { display: flex; gap: 0.35rem; }
.sort-pill {
  padding: 0.35rem 0.8rem; border: 1px solid var(--border);
  border-radius: 3rem; background: transparent;
  font-size: 0.72rem; font-weight: 500; color: var(--muted);
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.sort-pill:hover, .sort-pill.active { border-color: var(--accent-border); color: var(--accent); }

/* featured */
.right-col { position: relative; z-index: 2; }
.panel-fade-enter-active, .panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to   { opacity: 0; transform: translateY(-8px); }
.featured-wrap { display: flex; flex-direction: column; gap: 1.4rem; }

.terminal-card {
  background: #080b0e; border: 1px solid var(--border);
  border-radius: 1.3rem; padding: 1.2rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  cursor: pointer; transition: border-color 0.2s;
}
.terminal-card:hover { border-color: var(--accent-border); }
.terminal-dots { display: flex; gap: 6px; margin-bottom: 0.9rem; }
.terminal-dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }
.t-lines { display: flex; flex-direction: column; gap: 0.42rem; }
.t-line-row { display: flex; gap: 0.55rem; font-size: 0.74rem; flex-wrap: wrap; }
.t-prompt     { color: var(--accent); font-weight: 600; flex-shrink: 0; }
.t-cmd        { color: #b0bec5; }
.t-accent-out { color: var(--accent); font-weight: 700; }
.t-out        { color: var(--silver); opacity: 0.7; }
.t-live       { color: var(--green); font-weight: 700; }
.t-dev        { color: #f59e0b; }

.featured-img-wrap { position: relative; cursor: pointer; }
.featured-img {
  position: relative; width: 100%; aspect-ratio: 16/10;
  overflow: hidden; border-radius: 1.2rem; background: var(--bg-card);
}
.featured-img img {
  width: 100%; height: 100%; object-fit: contain;
  filter: grayscale(100%) brightness(0.88);
  transition: filter 0.5s, transform 0.5s; display: block;
}
.featured-img-wrap:hover .featured-img img {
  filter: grayscale(0%) brightness(0.92); transform: scale(1.04);
}
.img-placeholder {
  width: 100%; height: 100%; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0.75rem;
  background: linear-gradient(135deg, #0d1117, #141c26);
}
.ph-icon { font-size: 3rem; opacity: 0.4; }
.ph-name { font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.2); }
.img-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(8,6,2,0.55) 100%);
  pointer-events: none;
}
.img-hover-label {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  gap: 0.6rem; font-size: 0.8rem; font-weight: 700; color: var(--white);
  background: rgba(13,17,23,0.6); opacity: 0; transition: opacity 0.3s;
  backdrop-filter: blur(2px); letter-spacing: 0.04em;
}
.featured-img-wrap:hover .img-hover-label { opacity: 1; }
.corner { position: absolute; width: 28px; height: 28px; pointer-events: none; }
.corner-tl { top: -10px; left: -10px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
.corner-br { bottom: -10px; right: -10px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }
.watermark {
  position: absolute; top: -18px; right: -8px;
  font-size: 5rem; font-weight: 900; color: rgba(255,255,255,0.03);
  pointer-events: none; line-height: 1;
}

.featured-actions { display: flex; flex-direction: column; gap: 0.2rem; }
.action-link {
  display: inline-flex; align-items: center; gap: 0.9rem;
  padding: 0.8rem 0; text-decoration: none;
  border-bottom: 2px solid transparent; transition: all 0.25s;
  background: none; border-top: none; border-left: none; border-right: none;
  cursor: pointer; font-family: 'Inter', sans-serif; width: fit-content;
}
.action-primary  { border-bottom-color: var(--accent); }
.action-secondary{ border-bottom-color: var(--border); }
.al-num   { font-size: 0.62rem; font-weight: 700; color: var(--accent); }
.al-label { font-size: 0.8rem; font-weight: 700; color: var(--white); letter-spacing: 0.06em; }
.al-arrow { color: var(--accent); font-size: 0.72rem; transition: transform 0.25s; }
.action-primary:hover .al-arrow { transform: translateX(5px); }
.action-secondary .al-num   { color: var(--dim); }
.action-secondary .al-label { color: var(--muted); }
.action-secondary:hover { border-bottom-color: var(--accent); }
.action-secondary:hover .al-num,
.action-secondary:hover .al-label { color: var(--accent); }

/* project grid */
.project-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 0.85rem; position: relative; z-index: 2;
}
.project-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.3rem; overflow: hidden; cursor: pointer; transition: all 0.22s ease;
}
.project-card:hover {
  border-color: var(--accent-border); transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,59,0.1);
}
.pc-visual {
  position: relative; aspect-ratio: 16/10; overflow: hidden;
  background: linear-gradient(135deg, #0d1117, #141c26);
}
.pc-img {
  width: 100%; height: 100%; object-fit: contain;
  filter: grayscale(100%) brightness(0.82);
  transition: all 0.45s ease; display: block;
}
.project-card:hover .pc-img { filter: grayscale(20%) brightness(1.05); transform: scale(1.07); }
.pc-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.pcp-icon { font-size: 2.5rem; opacity: 0.3; }
.pc-overlay {
  position: absolute; inset: 0; background: rgba(13,17,23,0.72);
  display: flex; align-items: center; justify-content: center; gap: 0.55rem;
  font-size: 0.72rem; font-weight: 700; color: var(--white); letter-spacing: 0.05em;
  opacity: 0; transition: opacity 0.3s; backdrop-filter: blur(2px);
}
.project-card:hover .pc-overlay { opacity: 1; }
.pc-num {
  position: absolute; top: 0.7rem; right: 0.7rem;
  font-size: 0.68rem; font-weight: 700; color: rgba(255,255,255,0.35);
}
.pc-status-dot {
  position: absolute; bottom: 0.7rem; right: 0.7rem;
  width: 7px; height: 7px; border-radius: 50%; animation: pulse 2s infinite;
}
.pc-status-dot.live        { background: var(--green); box-shadow: 0 0 7px rgba(46,204,113,0.7); }
.pc-status-dot.development { background: #f59e0b;      box-shadow: 0 0 7px rgba(245,158,11,0.7); }
.pc-body { padding: 1rem 1.15rem 1.2rem; }
.pc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.45rem; }
.pc-cat { font-size: 0.6rem; font-weight: 700; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; }
.pc-impact {
  font-size: 0.58rem; font-weight: 600; color: var(--dim);
  padding: 0.15rem 0.5rem; border: 1px solid var(--border); border-radius: 3rem;
}
.pc-title { font-size: 0.9rem; font-weight: 700; color: var(--white); margin: 0 0 0.35rem; line-height: 1.25; }
.pc-desc {
  font-size: 0.76rem; color: var(--muted); line-height: 1.5; margin: 0 0 0.7rem;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.pc-stack { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.pc-tech {
  padding: 0.25rem 0.55rem; background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06); border-radius: 3rem;
  font-size: 0.65rem; color: var(--silver);
}
.pc-more { font-size: 0.65rem; color: var(--accent); font-weight: 600; padding: 0.25rem 0; }

/* inquiry */
.inquiry-strip {
  display: flex; align-items: center; justify-content: space-between;
  gap: 2rem; flex-wrap: wrap;
  background: linear-gradient(135deg, rgba(201,162,59,0.08), rgba(201,162,59,0.03));
  border: 1px solid var(--accent-border); border-radius: 1.4rem;
  padding: 1.8rem 2rem; position: relative; z-index: 2; overflow: hidden;
}
.inquiry-strip::before {
  content: ''; position: absolute; top: 0; right: 0;
  width: 40%; height: 100%;
  background: radial-gradient(ellipse at 80% 50%, rgba(201,162,59,0.12) 0%, transparent 70%);
  pointer-events: none;
}
.is-text h3 { font-size: 1.2rem; font-weight: 700; color: var(--white); margin: 0 0 0.35rem; }
.is-text p  { font-size: 0.84rem; color: var(--muted); margin: 0; line-height: 1.6; }
.is-btn {
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 0.8rem 1.7rem; background: var(--accent); color: #0d1117;
  font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
  border-radius: 3rem; text-decoration: none; transition: all 0.22s;
  white-space: nowrap; box-shadow: 0 4px 14px rgba(201,162,59,0.2); position: relative; z-index: 1;
}
.is-btn:hover { background: #dbb24a; transform: translateY(-2px); }

/* stats bar */
.stats-bar {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 1.5rem; padding-top: 1.6rem;
  border-top: 1px solid var(--border); position: relative; z-index: 2;
}
.stat-item   { display: flex; flex-direction: column; gap: 0.12rem; }
.stat-number { font-size: 1.7rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; line-height: 1; }
.stat-desc   { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
.stat-divider{ width: 1px; height: 2.2rem; background: var(--border); flex-shrink: 0; }
.socials { display: flex; gap: 0.5rem; margin-left: auto; }
.social-link {
  width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); border-radius: 0.6rem;
  color: var(--muted); font-size: 0.82rem; text-decoration: none; transition: all 0.2s;
}
.social-link:hover { border-color: var(--accent-border); color: var(--accent); transform: translateY(-2px); }

/* ─────────────────────────────────────────────────────────
   MODAL — fixed layout, right side fully scrollable
   ───────────────────────────────────────────────────────── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(5, 7, 10, 0.92);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  /* allow click-outside to close */
}

/* Close button — always on top, outside the shell */
.modal-close-fixed {
  position: fixed; top: 1.2rem; right: 1.2rem; z-index: 2100;
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(13,17,23,0.95); backdrop-filter: blur(8px);
  border: 1px solid var(--accent-border); border-radius: 50%;
  color: var(--silver); font-size: 0.9rem;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
.modal-close-fixed:hover { background: var(--accent); color: #0d1117; border-color: var(--accent); }

/* Shell: two-column, fixed height = viewport - padding */
.modal-shell {
  width: 100%;
  max-width: 1080px;
  height: calc(100vh - 3rem);   /* fill the padded viewport */
  max-height: 820px;
  background: #0d1117;
  border: 1px solid rgba(201,162,59,0.25);
  border-radius: 1.8rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;              /* clip the rounded corners */
  box-shadow: 0 40px 80px rgba(0,0,0,0.8);
  animation: shellIn 0.32s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes shellIn {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    }
}

/* LEFT panel — fixed, no scroll */
.modal-visual {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #080b0e, #0d1520);
  /* stays full height */
}

.mv-img {
  width: 100%; height: 100%;
  object-fit: contain; display: block;
  filter: brightness(0.65);
}

.mv-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 1rem;
  background: linear-gradient(135deg, #080b0e, #0d1520);
}
.mvp-icon { font-size: 5rem; opacity: 0.2; }
.mvp-name { font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.15); text-align: center; padding: 0 1.5rem; }

.mv-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to right, transparent 40%, rgba(8,6,2,0.65) 100%);
  pointer-events: none;
}

.mv-info {
  position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
  display: flex; flex-direction: column; gap: 0.75rem;
}
.mv-status {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 0.9rem; border: 1px solid;
  background: rgba(8,6,2,0.85); backdrop-filter: blur(8px);
  border-radius: 3rem; font-size: 0.72rem; font-weight: 700;
  width: fit-content;
}
.mv-status.live        { color: var(--green); border-color: rgba(46,204,113,0.4); }
.mv-status.development { color: #f59e0b;      border-color: rgba(245,158,11,0.4); }
.ms-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 2s infinite; }
.mv-links { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.mv-link {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.48rem 1rem; font-size: 0.75rem; font-weight: 700;
  border-radius: 3rem; text-decoration: none; letter-spacing: 0.04em; transition: all 0.2s;
}
.mv-link--primary { background: var(--accent); color: #0d1117; }
.mv-link--primary:hover { background: #dbb24a; transform: translateY(-2px); }
.mv-link--ghost {
  background: rgba(13,17,23,0.8); color: var(--silver);
  border: 1px solid var(--border); backdrop-filter: blur(6px);
}
.mv-link--ghost:hover { border-color: var(--accent-border); color: var(--accent); }

.mv-watermark {
  position: absolute; top: 1rem; left: 1.2rem;
  font-size: 5rem; font-weight: 900;
  color: rgba(255,255,255,0.04); line-height: 1; pointer-events: none;
}

/* RIGHT panel — FULLY SCROLLABLE */
.modal-content {
  overflow-y: auto;          /* the key fix */
  overflow-x: hidden;
  height: 100%;              /* fill the shell height */
  padding: 2rem 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 1.4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(201,162,59,0.3) transparent;
}
.modal-content::-webkit-scrollbar { width: 4px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(201,162,59,0.3); border-radius: 2px; }

.mc-header { display: flex; flex-direction: column; gap: 0.5rem; }
.mc-cat { font-size: 0.68rem; font-weight: 700; color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase; }
.mc-title { font-size: 1.55rem; font-weight: 800; color: var(--white); margin: 0; line-height: 1.1; letter-spacing: -0.02em; }
.mc-tagline { font-size: 0.88rem; color: var(--muted); line-height: 1.55; margin: 0; border-left: 3px solid var(--accent); padding-left: 0.9rem; }
.mc-desc { font-size: 0.84rem; color: var(--muted); line-height: 1.75; margin: 0; }

.mc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.mc-block {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1rem; padding: 1rem;
  display: flex; flex-direction: column; gap: 0.6rem;
}
.mcb-header { display: flex; align-items: center; gap: 0.5rem; }
.mcb-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.mcb-dot--problem  { background: #ef4444; }
.mcb-dot--solution { background: var(--green); }
.mcb-label { font-size: 0.65rem; font-weight: 700; color: var(--silver); letter-spacing: 0.1em; text-transform: uppercase; }
.mcb-text  { font-size: 0.78rem; color: var(--muted); line-height: 1.6; margin: 0; }

/* shared section label */
.mc-section-label {
  font-size: 0.66rem; font-weight: 700; color: var(--accent);
  letter-spacing: 0.12em; text-transform: uppercase;
  display: flex; align-items: center; gap: 0.4rem;
  margin-bottom: 0.6rem;
}
.mcs-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }

/* metrics */
.mc-metrics { display: flex; flex-direction: column; gap: 0.5rem; }
.mcm-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
.mcm-item {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 0.9rem; padding: 0.7rem 0.5rem;
  display: flex; flex-direction: column; gap: 0.15rem;
  align-items: center; text-align: center; transition: border-color 0.2s;
}
.mcm-item:hover { border-color: var(--accent-border); }
.mcm-value { font-size: 1rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; line-height: 1; }
.mcm-desc  { font-size: 0.58rem; color: var(--dim); text-transform: uppercase; letter-spacing: 0.06em; }

/* features */
.mc-features { display: flex; flex-direction: column; gap: 0.4rem; }
.mcf-list { display: flex; flex-direction: column; gap: 0.45rem; }
.mcf-item { display: flex; align-items: flex-start; gap: 0.65rem; }
.mcfi-icon {
  width: 20px; height: 20px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  border-radius: 50%; color: var(--accent); font-size: 0.55rem; margin-top: 1px;
}
.mcf-item span { font-size: 0.82rem; color: var(--muted); line-height: 1.55; }

/* stack */
.mc-stack { display: flex; flex-direction: column; gap: 0.4rem; }
.mcs-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.mcs-pill {
  padding: 0.32rem 0.75rem; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 3rem;
  font-size: 0.72rem; color: var(--silver); transition: all 0.2s;
}
.mcs-pill:hover { border-color: var(--accent-border); color: var(--accent); }

/* modal nav — sticks to bottom of scroll */
.mc-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 1rem; border-top: 1px solid var(--border);
  margin-top: auto;
  position: sticky; bottom: 0;
  background: #0d1117;
  padding-bottom: 0.5rem;
}
.mcn-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.55rem 1.1rem; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 3rem;
  font-size: 0.76rem; font-weight: 600; color: var(--muted);
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}
.mcn-btn:hover:not(:disabled) { border-color: var(--accent-border); color: var(--accent); }
.mcn-btn:disabled { opacity: 0.25; cursor: not-allowed; }
.mcn-counter { font-size: 0.82rem; font-weight: 600; color: var(--dim); letter-spacing: 0.04em; }

/* ─── Animations ─────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; gap: 2rem; }
  .sub-desc { max-width: 100%; }

  /* Stack modal vertically on tablet */
  .modal-shell {
    grid-template-columns: 1fr;
    grid-template-rows: 240px 1fr;
    height: calc(100vh - 3rem);
    max-height: none;
  }

  .modal-visual { height: 240px; }
  .mv-gradient { background: linear-gradient(to bottom, transparent 30%, rgba(8,6,2,0.75) 100%); }
}

@media (max-width: 768px) {
  .projects-card { padding: 1.6rem 1.4rem; border-radius: 1.5rem; gap: 1.8rem; }
  .hl-solid, .hl-outline, .hl-accent { font-size: clamp(2rem, 7vw, 3rem); }
  .mc-row { grid-template-columns: 1fr; }
  .mcm-grid { grid-template-columns: repeat(2, 1fr); }
  .inquiry-strip { flex-direction: column; }
  .is-btn { width: 100%; justify-content: center; }

  /* Mobile: full-screen bottom sheet */
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal-shell {
    border-radius: 1.5rem 1.5rem 0 0;
    width: 100%; max-width: 100%;
    height: 95vh; max-height: none;
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
  }
  .modal-visual { height: 200px; }
  .modal-close-fixed { top: 0.75rem; right: 0.75rem; }
  .modal-content { padding: 1.4rem 1.25rem 1rem; }
  .mc-title { font-size: 1.3rem; }
}

@media (max-width: 480px) {
  .project-grid { grid-template-columns: 1fr; }
  .stat-divider { display: none; }
  .socials { margin-left: 0; width: 100%; }
  .mcm-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>