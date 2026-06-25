<template>
  <section id="projects" class="projects" ref="projectsRef">

    <!-- Section header -->
    <div class="projects__header anim" style="--d:0.08s">
      <div class="projects__label">
        <span class="projects__label-line"></span>
        <span class="projects__label-text">Portfolio</span>
      </div>
      <div class="projects__header-right">
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
    <div class="projects__main">

      <!-- LEFT: headline + filters -->
      <div class="projects__left">

        <div class="projects__headline-block anim" style="--d:0.14s">
          <p class="projects__eyebrow">Selected Work</p>
          <h2 class="projects__heading">
            <span class="projects__hl-solid">Real</span>
            <span class="projects__hl-outline">World</span>
            <span class="projects__hl-accent">Solutions.</span>
          </h2>
          <p class="projects__sub-desc">
            Five production systems solving real problems across East Africa — from
            seed sovereignty to clean energy, indigenous food e-commerce to enterprise POS.
          </p>
        </div>

        <div class="projects__filters anim" style="--d:0.22s">
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['filter-pill', { active: activeFilter === cat }]"
            @click="activeFilter = cat"
          >
            {{ cat }}
            <span class="filter-count">{{ cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length }}</span>
          </button>
        </div>

        <div class="projects__sort anim" style="--d:0.26s">
          <span class="sort-label">Sort</span>
          <button
            v-for="s in sortOptions"
            :key="s.val"
            :class="['sort-pill', { active: sortBy === s.val }]"
            @click="sortBy = s.val"
          >{{ s.label }}</button>
        </div>

      </div>

      <!-- RIGHT: featured project -->
      <div class="projects__right">

        <Transition name="panel-fade" mode="out-in">
          <div :key="featured.id" class="featured-wrap">

            <!-- Terminal -->
            <div class="terminal anim-featured" style="--pd:0s" @click="openModal(featured)">
              <div class="terminal__dots"><span></span><span></span><span></span></div>
              <div class="terminal__lines">
                <div class="terminal__row">
                  <span class="terminal__prompt">~/projects/{{ featured.slug }} $</span>
                  <span class="terminal__cmd">cat readme.md</span>
                </div>
                <div class="terminal__row">
                  <span class="terminal__prompt">›</span>
                  <span class="terminal__out--accent">{{ featured.title }}</span>
                </div>
                <div class="terminal__row">
                  <span class="terminal__prompt">›</span>
                  <span class="terminal__out">{{ featured.stack.join(' · ') }}</span>
                </div>
                <div class="terminal__row">
                  <span class="terminal__prompt">›</span>
                  <span :class="featured.status === 'live' ? 'terminal__live' : 'terminal__dev'">
                    {{ featured.status === 'live' ? '● DEPLOYED' : '◌ IN DEVELOPMENT' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Featured image -->
            <div class="featured-img-wrap anim-featured" style="--pd:0.08s" @click="openModal(featured)">
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
                <div class="img-hover">
                  <i class="fas fa-expand-alt"></i>
                  <span>View Case Study</span>
                </div>
              </div>
              <div class="corner corner-tl"></div>
              <div class="corner corner-br"></div>
              <div class="watermark">01</div>
            </div>

            <!-- Actions -->
            <div class="featured-actions anim-featured" style="--pd:0.16s">
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
    <div class="projects__grid" :key="activeFilter + sortBy">
      <div
        v-for="(project, idx) in filteredSorted"
        :key="project.id"
        class="project-card"
        :style="{ '--card-delay': 0.03 + idx * 0.06 + 's' }"
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
            <span>View Case Study</span>
            <i class="fas fa-arrow-right"></i>
          </div>
          <div class="pc-num">{{ String(idx + 1).padStart(2, '0') }}</div>
          <div class="pc-status" :class="project.status"></div>
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

    <!-- Inquiry CTA -->
    <div class="projects__cta anim" style="--d:0.5s">
      <div class="cta-text">
        <h3>Have a project in mind?</h3>
        <p>I specialise in full-stack systems, e-commerce platforms, and data-driven tools for African markets.</p>
      </div>
      <a href="#contact" class="cta-btn" @click.prevent="scrollToContact">
        <span>Let's Build Together</span>
        <span class="cta-btn-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </span>
      </a>
    </div>

    <!-- Bottom strip -->
    <div class="projects__strip anim" style="--d:0.58s">
      <div class="strip-stats">
        <div class="strip-stat">
          <span class="ss-num">{{ projects.length }}</span>
          <span class="ss-label">Projects</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">{{ liveCount }}</span>
          <span class="ss-label">Live</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">{{ totalTech }}</span>
          <span class="ss-label">Technologies</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">4</span>
          <span class="ss-label">Industries</span>
        </div>
      </div>
      <div class="strip-socials">
        <a href="https://github.com/Njenga993" target="_blank" class="strip-social" aria-label="GitHub"><i class="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="strip-social" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://x.com/kamau_nje" target="_blank" class="strip-social" aria-label="X"><i class="fab fa-x-twitter"></i></a>
      </div>
    </div>

  </section>

  <!-- ═══════ MODAL ═══════ -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="activeProject" class="modal-backdrop" @click.self="closeModal">

        <button class="modal-close" @click="closeModal" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="modal-shell">

          <!-- LEFT: image panel -->
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

          <!-- RIGHT: scrollable content -->
          <div class="modal-content" ref="modalContentRef">

            <div class="mc-header modal-item" style="--mi:0.05s">
              <span class="mc-cat">{{ activeProject.category }}</span>
              <h2 class="mc-title">{{ activeProject.title }}</h2>
              <p class="mc-tagline">{{ activeProject.tagline }}</p>
            </div>

            <p class="mc-desc modal-item" style="--mi:0.1s">{{ activeProject.description }}</p>

            <div class="mc-problem-solution modal-item" style="--mi:0.16s">
              <div class="mc-block">
                <div class="mcb-head">
                  <span class="mcb-dot mcb-dot--problem"></span>
                  <span>The Problem</span>
                </div>
                <p class="mcb-text">{{ activeProject.problem }}</p>
              </div>
              <div class="mc-block">
                <div class="mcb-head">
                  <span class="mcb-dot mcb-dot--solution"></span>
                  <span>The Solution</span>
                </div>
                <p class="mcb-text">{{ activeProject.solution }}</p>
              </div>
            </div>

            <div class="mc-metrics modal-item" style="--mi:0.22s" v-if="activeProject.metrics">
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

            <div class="mc-features modal-item" style="--mi:0.28s">
              <div class="mc-section-label">
                <span class="mcs-dot"></span> Key Features
              </div>
              <div class="mcf-list">
                <div v-for="feat in activeProject.features" :key="feat" class="mcf-item">
                  <div class="mcf-icon"><i class="fas fa-check"></i></div>
                  <span>{{ feat }}</span>
                </div>
              </div>
            </div>

            <div class="mc-stack modal-item" style="--mi:0.34s">
              <div class="mc-section-label">
                <span class="mcs-dot"></span> Tech Stack
              </div>
              <div class="mcs-pills">
                <span v-for="tech in activeProject.stack" :key="tech" class="mcs-pill">{{ tech }}</span>
              </div>
            </div>

            <!-- Nav -->
            <div class="mc-nav modal-item" style="--mi:0.4s">
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


</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const projectsRef = ref(null)
const activeFilter = ref('All')
const sortBy = ref('featured')
const activeProject = ref(null)
const modalContentRef = ref(null)

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

/* ── Computed ────────────────────────────────────────── */
const categories = computed(() => ['All', ...new Set(projects.value.map(p => p.category))])

const sortOptions = [
  { val: 'featured', label: 'Featured' },
  { val: 'live', label: 'Live first' },
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

const featured = computed(() => filteredSorted.value[0] || projects.value[0])
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

/* ── Modal controls ──────────────────────────────────── */
const openModal = (project) => {
  activeProject.value = project
  document.body.style.overflow = 'hidden'
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

const onImgError = (e) => {
  e.target.style.display = 'none'
  const placeholder = e.target.nextElementSibling
  if (placeholder && placeholder.classList.contains('img-placeholder')) {
    placeholder.style.display = 'flex'
  }
}

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const handleKey = (e) => {
  if (!activeProject.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') navigateProject('prev')
  if (e.key === 'ArrowRight') navigateProject('next')
}

/* ── Scroll trigger ──────────────────────────────────── */
onMounted(() => {
  document.addEventListener('keydown', handleKey)

  const section = projectsRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        section.classList.add('in-view')
        io.unobserve(section)
      }
    })
  }, { threshold: 0.04 })

  io.observe(section)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   NO :root — all colors hardcoded. Orange #ff5500 palette.
   ═══════════════════════════════════════════════════════ */

/* ── Scroll animation system ─────────────────────────── */
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
  .project-card { animation: none !important; opacity: 1 !important; transform: none !important; }
  .anim-featured { animation: none !important; opacity: 1 !important; transform: none !important; }
  .modal-item { animation: none !important; opacity: 1 !important; transform: none !important; }
}

/* ── Section shell (full-bleed) ─────────────────────── */
.projects {
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
.projects__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.projects__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.projects__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.projects__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.projects__header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.live-badge {
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

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.github-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.38rem 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 500;
  color: #8a929e;
  text-decoration: none;
  transition: all 0.25s ease;
}

.github-pill:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

/* ── Main split ──────────────────────────────────────── */
.projects__main {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* ── Left column ────────────────────────────────────── */
.projects__left {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.projects__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projects__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  gap: 0;
}

.projects__hl-solid,
.projects__hl-outline,
.projects__hl-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.projects__hl-solid { color: #ffffff; }

.projects__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}

.projects__hl-accent {
  color: #ff5500;
  font-style: italic;
}

.projects__sub-desc {
  margin: 0.5rem 0 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #8a929e;
  max-width: 420px;
}

/* Filters */
.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
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
}

.filter-pill:hover {
  border-color: rgba(255, 85, 0, 0.25);
  color: #c8cdd5;
}

.filter-pill.active {
  background: #ff5500;
  border-color: #ff5500;
  color: #ffffff;
}

.filter-pill.active .filter-count { color: rgba(255, 255, 255, 0.7); }

.filter-count {
  font-size: 0.62rem;
  opacity: 0.6;
}

/* Sort */
.projects__sort {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.sort-label {
  font-size: 0.64rem;
  font-weight: 700;
  color: #4a5568;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.sort-pill {
  padding: 0.32rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  background: transparent;
  font-size: 0.7rem;
  font-weight: 500;
  color: #6b7585;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.sort-pill:hover,
.sort-pill.active {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

/* ── Right column: featured ─────────────────────────── */
.projects__right {
  position: relative;
}

/* Featured panel transition */
.panel-fade-enter-active,
.panel-fade-leave-active { transition: all 0.22s ease; }
.panel-fade-enter-from { opacity: 0; transform: translateY(8px); }
.panel-fade-leave-to { opacity: 0; transform: translateY(-8px); }

@keyframes featuredIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}

.anim-featured {
  opacity: 0;
  animation: featuredIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--pd, 0s);
}

.featured-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* Terminal */
.terminal {
  background: #060809;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.1rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  cursor: pointer;
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

.terminal__lines {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.terminal__row {
  display: flex;
  gap: 0.55rem;
  font-size: 0.72rem;
  flex-wrap: wrap;
}

.terminal__prompt { color: #ff5500; font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #6b7585; }
.terminal__out--accent { color: #ff5500; font-weight: 700; }
.terminal__out { color: #8a929e; opacity: 0.7; }
.terminal__live { color: #22c55e; font-weight: 700; }
.terminal__dev { color: #f59e0b; }

/* Featured image */
.featured-img-wrap {
  position: relative;
  cursor: pointer;
}

.featured-img {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.02);
}

.featured-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%) brightness(0.85);
  transition: filter 0.5s ease, transform 0.5s ease;
  display: block;
}

.featured-img-wrap:hover .featured-img img {
  filter: grayscale(0%) brightness(0.92);
  transform: scale(1.03);
}

.img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #0a0a0a, #111);
}

.ph-icon { font-size: 3rem; opacity: 0.3; }
.ph-name { font-size: 0.85rem; font-weight: 700; color: rgba(255, 255, 255, 0.15); }

.img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(10, 10, 10, 0.55) 100%);
  pointer-events: none;
}

.img-hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  background: rgba(10, 10, 10, 0.65);
  border-radius: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  letter-spacing: 0.04em;
}

.featured-img-wrap:hover .img-hover { opacity: 1; }

.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  pointer-events: none;
}

.corner-tl { top: -10px; left: -10px; border-top: 2px solid #ff5500; border-left: 2px solid #ff5500; }
.corner-br { bottom: -10px; right: -10px; border-bottom: 2px solid #ff5500; border-right: 2px solid #ff5500; }

.watermark {
  position: absolute;
  top: -18px;
  right: -8px;
  font-size: 5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  line-height: 1;
}

/* Featured actions */
.featured-actions {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.75rem 0;
  text-decoration: none;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  width: fit-content;
  transition: all 0.25s ease;
}

.action-primary { border-bottom-color: #ff5500; }

.al-num { font-size: 0.62rem; font-weight: 700; color: #ff5500; }
.al-label { font-size: 0.82rem; font-weight: 700; color: #ffffff; letter-spacing: 0.06em; }
.al-arrow { color: #ff5500; font-size: 0.72rem; transition: transform 0.25s ease; }
.action-primary:hover .al-arrow { transform: translateX(5px); }

.action-secondary { border-bottom-color: rgba(255, 255, 255, 0.06); }
.action-secondary .al-num { color: #4a5568; }
.action-secondary .al-label { color: #6b7585; }
.action-secondary:hover { border-bottom-color: rgba(255, 85, 0, 0.3); }
.action-secondary:hover .al-num,
.action-secondary:hover .al-label { color: #ff5500; }

/* ── Project grid ───────────────────────────────────── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 0.85rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--card-delay, 0s);
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover {
  border-color: rgba(255, 85, 0, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.4);
}

.pc-visual {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a, #111);
}

.pc-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%) brightness(0.8);
  transition: all 0.45s ease;
  display: block;
}

.project-card:hover .pc-img {
  filter: grayscale(20%) brightness(1.02);
  transform: scale(1.06);
}

.pc-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pcp-icon { font-size: 2.5rem; opacity: 0.25; }

.pc-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.05em;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.project-card:hover .pc-overlay { opacity: 1; }

.pc-num {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  font-size: 0.68rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
}

.pc-status {
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.pc-status.live { background: #22c55e; box-shadow: 0 0 7px rgba(34, 197, 94, 0.7); }
.pc-status.development { background: #f59e0b; box-shadow: 0 0 7px rgba(245, 158, 11, 0.7); }

.pc-body {
  padding: 1rem 1.15rem 1.2rem;
}

.pc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.pc-cat {
  font-size: 0.6rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.pc-impact {
  font-size: 0.58rem;
  font-weight: 600;
  color: #5a6270;
  padding: 0.15rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 999px;
}

.pc-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.3rem;
  line-height: 1.25;
}

.pc-desc {
  font-size: 0.76rem;
  color: #8a929e;
  line-height: 1.5;
  margin: 0 0 0.7rem;
  display: -webkit-box;
  --webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pc-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.pc-tech {
  padding: 0.22rem 0.55rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  font-size: 0.64rem;
  color: #9aa3af;
}

.pc-more {
  font-size: 0.64rem;
  color: #ff5500;
  font-weight: 600;
  padding: 0.22rem 0;
}

/* ── Inquiry CTA ─────────────────────────────────────── */
.projects__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  background: rgba(255, 85, 0, 0.04);
  border: 1px solid rgba(255, 85, 0, 0.15);
  border-radius: 18px;
  padding: 1.8rem 2rem;
  position: relative;
  overflow: hidden;
}

.projects__cta::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: radial-gradient(ellipse at 80% 50%, rgba(255, 85, 0, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.cta-text h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.3rem;
}

.cta-text p {
  font-size: 0.84rem;
  color: #8a929e;
  margin: 0;
  line-height: 1.6;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1.7rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(255, 85, 0, 0.2);
  position: relative;
  z-index: 1;
}

.cta-btn:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 85, 0, 0.35);
}

.cta-btn-icon {
  width: 22px;
  height: 22px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.cta-btn:hover .cta-btn-icon { transform: translateX(3px); }

/* ── Bottom strip ────────────────────────────────────── */
.projects__strip {
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

.strip-socials {
  display: flex;
  gap: 0.55rem;
}

.strip-social {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #8a929e;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.strip-social:hover {
  border-color: rgba(255, 85, 0, 0.35);
  color: #ff5500;
  transform: translateY(-2px);
}

/* ═══════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════ */

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.modal-close {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 2100;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 50%;
  color: #c8cdd5;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.modal-close:hover {
  background: #ff5500;
  color: #ffffff;
  border-color: #ff5500;
}

/* Shell */
.modal-shell {
  width: 100%;
  max-width: 1080px;
  height: calc(100vh - 3rem);
  max-height: 820px;
  background: #111111;
  border: 1px solid rgba(255, 85, 0, 0.15);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.7);
  animation: shellIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes shellIn {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Left: visual panel */
.modal-visual {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #060809, #0d1520);
}

.mv-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  filter: brightness(0.65);
}

.mv-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, #060809, #0d1520);
}

.mvp-icon { font-size: 5rem; opacity: 0.15; }
.mvp-name { font-size: 1rem; font-weight: 700; color: rgba(255, 255, 255, 0.12); text-align: center; padding: 0 1.5rem; }

.mv-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent 40%, rgba(10, 10, 10, 0.7) 100%);
  pointer-events: none;
}

.mv-info {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mv-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border: 1px solid;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  width: fit-content;
}

.mv-status.live { color: #22c55e; border-color: rgba(34, 197, 94, 0.4); }
.mv-status.development { color: #f59e0b; border-color: rgba(245, 158, 11, 0.4); }

.ms-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

.mv-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.mv-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  font-size: 0.74rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: all 0.25s ease;
}

.mv-link--primary {
  background: #ff5500;
  color: #ffffff;
}

.mv-link--primary:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
}

.mv-link--ghost {
  background: rgba(10, 10, 10, 0.8);
  color: #c8cdd5;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.mv-link--ghost:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

.mv-watermark {
  position: absolute;
  top: 1rem;
  left: 1.2rem;
  font-size: 5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  line-height: 1;
  pointer-events: none;
}

/* Right: scrollable content */
.modal-content {
  overflow-y: auto;
  padding: 2rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 85, 0, 0.2) transparent;
}

.modal-content::-webkit-scrollbar { width: 4px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(255, 85, 0, 0.2); border-radius: 2px; }

/* Modal content cascade animation */
@keyframes modalItemIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-item {
  opacity: 0;
  animation: modalItemIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--mi, 0s);
}

.mc-header { display: flex; flex-direction: column; gap: 0.4rem; }

.mc-cat {
  font-size: 0.68rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mc-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.mc-tagline {
  font-size: 0.86rem;
  color: #8a929e;
  margin: 0;
  border-left: 3px solid #ff5500;
  padding-left: 0.9rem;
  line-height: 1.5;
}

.mc-desc {
  font-size: 0.86rem;
  color: #9aa3af;
  line-height: 1.75;
  margin: 0;
}

/* Problem / Solution */
.mc-problem-solution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.mc-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mcb-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.66rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mcb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.mcb-dot--problem { background: #ef4444; }
.mcb-dot--solution { background: #22c55e; }

.mcb-text {
  font-size: 0.8rem;
  color: #8a929e;
  line-height: 1.65;
  margin: 0;
}

/* Metrics */
.mc-metrics { display: flex; flex-direction: column; gap: 0.65rem; }

.mc-section-label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.66rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mc-section-label i { font-size: 0.72rem; }

.mcs-dot {
  width: 5px;
  height: 5px;
  background: #ff5500;
  border-radius: 50%;
}

.mcm-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.mcm-item {
  padding: 0.75rem 0.9rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.mcm-value {
  font-size: 1rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.mcm-desc {
  font-size: 0.66rem;
  color: #6b7585;
  line-height: 1.3;
}

/* Features */
.mc-features { display: flex; flex-direction: column; gap: 0.65rem; }

.mcf-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mcf-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.mcf-icon {
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

.mcf-item span {
  font-size: 0.82rem;
  color: #9aa3af;
  line-height: 1.55;
}

/* Stack */
.mc-stack { display: flex; flex-direction: column; gap: 0.65rem; }

.mcs-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.mcs-pill {
  padding: 0.32rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.72rem;
  color: #c8cdd5;
  transition: all 0.2s ease;
}

.mcs-pill:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

/* Nav */
.mc-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
}

.mcn-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  color: #8a929e;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;
}

.mcn-btn:hover:not(:disabled) {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

.mcn-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.mcn-counter {
  font-size: 0.72rem;
  font-weight: 700;
  color: #5a6270;
  letter-spacing: 0.08em;
}

/* ── Keyframes ───────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.85); }
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .projects__main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .projects__sub-desc { max-width: 100%; }

  .modal-shell { grid-template-columns: 1fr; max-height: 95vh; }
  .modal-visual { height: 240px; }
  .mv-gradient { background: linear-gradient(to bottom, transparent 40%, rgba(10, 10, 10, 0.75) 100%); }
  .mc-problem-solution { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .projects {
    padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px);
  }

  .projects__hl-solid,
  .projects__hl-outline,
  .projects__hl-accent {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }

  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .projects__cta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .cta-btn { width: 100%; justify-content: center; }

  .projects__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .modal-content { padding: 1.5rem; }
  .mcm-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .projects__grid { grid-template-columns: 1fr; }

  .strip-divider { display: none; }

  .modal-backdrop { padding: 0; }
  .modal-shell {
    border-radius: 20px 20px 0 0;
    align-self: flex-end;
    max-height: 95vh;
  }

  .modal-content { padding: 1.25rem 1.2rem; }
  .mc-title { font-size: 1.2rem; }
}

@media (min-width: 2000px) {
  .projects__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>