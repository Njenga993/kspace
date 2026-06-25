<template>
  <section id="clients" class="clients" ref="clientsRef">

    <!-- Section header -->
    <div class="clients__header anim" style="--d:0.08s">
      <div class="clients__label">
        <span class="clients__label-line"></span>
        <span class="clients__label-text">Trusted Partners</span>
      </div>
      <div class="clients__count-badge">
        <span class="count-num">{{ clients.length }}</span>
        <span class="count-text">Brands</span>
      </div>
    </div>

    <!-- Headline -->
    <div class="clients__headline-wrap anim" style="--d:0.14s">
      <h2 class="clients__heading">
        <span class="clients__hl-solid">Brands That</span>
        <span class="clients__hl-outline">Trust My</span>
        <span class="clients__hl-accent">Work.</span>
      </h2>
      <p class="clients__sub-desc">
        From agri-tech NGOs to clean energy startups — delivering digital
        solutions that create measurable impact across East Africa.
      </p>
    </div>

    <!-- Filter pills -->
    <div class="clients__filters anim" style="--d:0.20s">
      <button
        v-for="industry in industries"
        :key="industry"
        :class="['filter-pill', { active: activeIndustry === industry }]"
        @click="activeIndustry = industry"
      >
        {{ industry }}
        <span class="filter-count">{{ getIndustryCount(industry) }}</span>
      </button>
    </div>

    <!-- Logo circles grid -->
    <div class="clients__circles">

      <TransitionGroup name="circle-stagger">
        <div
          v-for="(client, idx) in filteredClients"
          :key="client.name"
          class="client-circle anim"
          :style="{ '--d': 0.28 + idx * 0.06 + 's' }"
          @click="openModal(client)"
        >
          <!-- Outer ring -->
          <div class="circle-ring">
            <div class="circle-ring__track"></div>
          </div>

          <!-- Logo container -->
          <div class="circle-inner">
            <img
              :src="client.logo"
              :alt="client.name"
              class="circle-logo"
              draggable="false"
            />
          </div>

          <!-- Info below -->
          <div class="circle-info">
            <span class="circle-industry">{{ client.industry }}</span>
            <p class="circle-name">{{ client.name }}</p>
            <span class="circle-project">{{ client.project }}</span>
          </div>

          <!-- Hover overlay -->
          <div class="circle-overlay">
            <span>View Details</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </TransitionGroup>

    </div>

    <!-- Bottom stats strip -->
    <div class="clients__strip anim" style="--d:0.65s">
      <div class="strip-stats">
        <div class="strip-stat">
          <span class="ss-num">{{ clients.length }}</span>
          <span class="ss-label">Clients</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">100%</span>
          <span class="ss-label">Satisfaction</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">{{ uniqueIndustries }}</span>
          <span class="ss-label">Industries</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">3+</span>
          <span class="ss-label">Years</span>
        </div>
      </div>
      <p class="strip-note">Want to join this list? <a href="#contact" @click.prevent="scrollToContact">Let's talk</a></p>
    </div>

  </section>

  <!-- ─── Client Detail Modal ─── -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="selectedClient" class="modal-backdrop" @click.self="closeModal">

        <Transition name="modal-scale">
          <div v-if="selectedClient" class="modal-shell">

            <!-- Close button -->
            <button class="modal-close" @click="closeModal" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>

            <!-- Top: logo + header -->
            <div class="modal-top">
              <div class="modal-logo-ring">
                <div class="modal-logo-ring__track"></div>
                <img :src="selectedClient.logo" :alt="selectedClient.name" class="modal-logo" />
              </div>
              <div class="modal-header">
                <span class="modal-cat">{{ selectedClient.industry }}</span>
                <h3 class="modal-title">{{ selectedClient.name }}</h3>
                <p class="modal-tagline">{{ selectedClient.project }} · {{ selectedClient.year }}</p>
              </div>
            </div>

            <!-- Body: scrollable content -->
            <div class="modal-body">

              <p class="modal-desc">{{ selectedClient.description }}</p>

              <!-- Technologies -->
              <div class="modal-block">
                <div class="modal-block__label">
                  <span class="mb-dot"></span>
                  Technologies
                </div>
                <div class="modal-pills">
                  <span v-for="tech in selectedClient.technologies" :key="tech" class="modal-pill">{{ tech }}</span>
                </div>
              </div>

              <!-- Deliverables -->
              <div class="modal-block">
                <div class="modal-block__label">
                  <span class="mb-dot"></span>
                  Key Deliverables
                </div>
                <div class="modal-checklist">
                  <div
                    v-for="feat in getClientFeatures(selectedClient.name)"
                    :key="feat"
                    class="check-item"
                  >
                    <div class="check-icon"><i class="fas fa-check"></i></div>
                    <span>{{ feat }}</span>
                  </div>
                </div>
              </div>

              <!-- Testimonial if exists -->
              <div
                v-if="getClientTestimonial(selectedClient.name)"
                class="modal-testimonial"
              >
                <div class="mt-quote">"</div>
                <p class="mt-text">{{ getClientTestimonial(selectedClient.name).text }}</p>
                <div class="mt-author">
                  <strong>{{ getClientTestimonial(selectedClient.name).author }}</strong>
                  <span>{{ getClientTestimonial(selectedClient.name).position }}, {{ getClientTestimonial(selectedClient.name).company }}</span>
                </div>
              </div>

            </div>

            <!-- Footer CTA -->
            <div class="modal-footer">
              <a href="#contact" class="modal-cta" @click.prevent="scrollToContact">
                Start a similar project
                <span class="modal-cta-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </span>
              </a>
            </div>

          </div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const clientsRef = ref(null)
const activeIndustry = ref('All')
const selectedClient = ref(null)

const clients = ref([
  {
    name: 'Seed Savers Network Kenya',
    industry: 'Agriculture',
    logo: './SSN.JPG',
    project: 'Web Application Development',
    year: '2025',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML5'],
    description: 'Developed the primary digital platform for Seed Savers Network Kenya — an NGO preserving indigenous seed varieties and promoting food sovereignty across East Africa. The site supports their program delivery, EA-ISC 2026 Conference, and donor engagement.',
  },
  {
    name: 'INOFO Africa',
    industry: 'Agriculture',
    logo: './inofo.JPG',
    project: 'Organisational Website',
    year: '2025',
    technologies: ['React', 'TypeScript', 'CSS3', 'HTML5'],
    description: 'Built a modern, responsive organisational website for INOFO Africa — a pan-African NGO advancing indigenous food systems. The site communicates their programs, membership, and impact to a diverse international audience.',
  },
  {
    name: 'Greania Build Solutions',
    industry: 'Construction',
    logo: './Greania.JPG',
    project: 'Portfolio Website',
    year: '2025',
    technologies: ['React', 'TypeScript', 'Framer Motion', 'CSS3'],
    description: 'Delivered a professional portfolio website for a Nairobi construction and interior design firm. Smooth Framer Motion animations and a project gallery increased client inquiry rates within the first month of launch.',
  },
  {
    name: 'Nyakazi Organics',
    industry: 'E-commerce',
    logo: './Nyakazi.png',
    project: 'E-commerce Platform & Branding',
    year: '2024',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'WhatsApp API'],
    description: 'Full e-commerce platform and digital branding overhaul for a Kenyan business selling solar-dried indigenous vegetables. Implemented a WhatsApp-native checkout flow matched to how Kenyan consumers actually purchase online.',
  },
  {
    name: 'SaleHub POS',
    industry: 'Retail Technology',
    logo: './salehubPOS.png',
    project: 'Multi-tenant SaaS POS System',
    year: '2024',
    technologies: ['Laravel 11', 'PostgreSQL', 'Vue.js', 'Railway'],
    description: 'Designed and developed SaleHub — a multi-tenant, cloud-native Point of Sale SaaS platform targeting Kenyan SMEs. Live on Railway with role-based access, branch management, and real-time inventory deductions.',
  },
  {
    name: 'Desiderata Consultancy',
    industry: 'Consulting',
    logo: './Desiderata.png',
    project: 'Corporate Website',
    year: '2023',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
    description: 'Built a professional corporate website for Desiderata Consultancy with service showcases, client case studies, contact form integration, and Google Maps. Delivered a 60% reduction in page load time versus the previous site.',
  },
])

const testimonials = [
  {
    text: 'Kelvin delivered an exceptional e-commerce platform that exceeded our expectations. His understanding of our market — and how Kenyan customers actually shop — made all the difference.',
    author: 'Sarah Mwangi',
    position: 'CEO',
    company: 'Nyakazi Organics',
    rating: 5,
  },
  {
    text: 'Working with Kelvin was a pleasure from start to finish. He understood our requirements perfectly and delivered a platform that has significantly improved how we serve our farmer network.',
    author: 'John Kariuki',
    position: 'Project Manager',
    company: 'Seed Savers Network',
    rating: 5,
  },
  {
    text: 'Professional, technically sharp, and always on time. The website Kelvin built for us has received outstanding feedback from clients and partners — it truly reflects who we are.',
    author: 'Mary Wanjiku',
    position: 'Director',
    company: 'Greania Build Solutions',
    rating: 5,
  },
]

/* ── Computed ────────────────────────────────────────── */
const industries = computed(() => ['All', ...new Set(clients.value.map(c => c.industry))])

const filteredClients = computed(() =>
  activeIndustry.value === 'All'
    ? clients.value
    : clients.value.filter(c => c.industry === activeIndustry.value)
)

const uniqueIndustries = computed(() => new Set(clients.value.map(c => c.industry)).size)

const getIndustryCount = (industry) =>
  industry === 'All' ? clients.value.length : clients.value.filter(c => c.industry === industry).length

const getClientFeatures = (name) => {
  const map = {
    'Seed Savers Network Kenya': [
      'Program and project pages with impact reporting',
      'EA-ISC 2026 Conference hub with registration flow',
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
  return map[name] || [
    'Responsive design across all devices and screen sizes',
    'Performance-optimised architecture for fast load times',
    'SEO-friendly implementation with structured metadata',
    'Post-launch support and maintenance included',
  ]
}

const getClientTestimonial = (name) =>
  testimonials.find(t => name.toLowerCase().includes(t.company.toLowerCase().split(' ')[0])) || null

/* ── Actions ─────────────────────────────────────────── */
const openModal = (client) => {
  selectedClient.value = client
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedClient.value = null
  document.body.style.overflow = ''
}

const scrollToContact = () => {
  closeModal()
  setTimeout(() => {
    const el = document.getElementById('contact')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 350)
}

/* ── Scroll animation ────────────────────────────────── */
onMounted(() => {
  const section = clientsRef.value
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
  .anim {
    transition-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ── Section shell (full-bleed, no card) ─────────────── */
.clients {
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
.clients__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.clients__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.clients__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.clients__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.clients__count-badge {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 999px;
  background: rgba(255, 85, 0, 0.06);
}

.count-num {
  font-size: 1.1rem;
  font-weight: 800;
  color: #ff5500;
  line-height: 1;
}

.count-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: #8a929e;
  letter-spacing: 0.04em;
}

/* ── Headline ────────────────────────────────────────── */
.clients__heading {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  gap: 0;
}

.clients__hl-solid,
.clients__hl-outline,
.clients__hl-accent {
  display: block;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.92;
}

.clients__hl-solid {
  color: #ffffff;
}

.clients__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}

.clients__hl-accent {
  color: #ff5500;
  font-style: italic;
}

.clients__sub-desc {
  margin: 0.6rem 0 0;
  font-size: 0.95rem;
  line-height: 1.75;
  color: #8a929e;
  max-width: 560px;
}

/* ── Filter pills ────────────────────────────────────── */
.clients__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
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

.filter-pill.active .filter-count {
  color: rgba(255, 255, 255, 0.7);
}

.filter-count {
  font-size: 0.62rem;
  opacity: 0.6;
}

/* ── Circle grid ─────────────────────────────────────── */
.clients__circles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

/* TransitionGroup animations */
.circle-stagger-enter-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.circle-stagger-leave-active {
  transition: opacity 0.25s ease,
              transform 0.25s ease;
  position: absolute;
}

.circle-stagger-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(16px);
}

.circle-stagger-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.circle-stagger-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Individual circle ───────────────────────────────── */
.client-circle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 1.5rem 1rem 1.25rem;
  border-radius: 20px;
  transition: background 0.3s ease;
}

.client-circle:hover {
  background: rgba(255, 255, 255, 0.02);
}

/* Outer ring */
.circle-ring {
  position: relative;
  width: clamp(100px, 14vw, 140px);
  height: clamp(100px, 14vw, 140px);
  flex-shrink: 0;
}

.circle-ring__track {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.client-circle:hover .circle-ring__track {
  border-color: rgba(255, 85, 0, 0.35);
  transform: scale(1.04);
}

/* Inner circle (logo container) */
.circle-inner {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.client-circle:hover .circle-inner {
  border-color: rgba(255, 85, 255, 0.1);
}

.circle-logo {
  width: 60%;
  height: 60%;
  object-fit: contain;
  filter: grayscale(100%) brightness(0.85);
  transition: filter 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.client-circle:hover .circle-logo {
  filter: grayscale(0%) brightness(1);
  transform: scale(1.08);
}

/* Info below circle */
.circle-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
}

.circle-industry {
  font-size: 0.58rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.circle-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.25;
  transition: color 0.25s ease;
}

.circle-project {
  font-size: 0.68rem;
  color: #6b7585;
  line-height: 1.4;
}

/* Hover overlay on the circle itself */
.circle-overlay {
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(100px, 14vw, 140px);
  height: clamp(100px, 14vw, 140px);
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.circle-overlay span {
  font-size: 0.65rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.circle-overlay svg {
  color: #ff5500;
}

.client-circle:hover .circle-overlay {
  opacity: 1;
}

/* ── Bottom strip ────────────────────────────────────── */
.clients__strip {
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

.strip-note a {
  color: #8a929e;
  text-decoration: none;
  transition: color 0.2s ease;
}

.strip-note a:hover {
  color: #ff5500;
}

/* ═══════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════ */

/* Backdrop */
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

/* Shell */
.modal-scale-enter-active {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.35s ease;
}

.modal-scale-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1),
              opacity 0.2s ease;
}

.modal-scale-enter-from {
  transform: scale(0.92) translateY(20px);
  opacity: 0;
}

.modal-scale-leave-to {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.modal-shell {
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
}

/* Close */
.modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  color: #8a929e;
  cursor: pointer;
  transition: all 0.25s ease;
}

.modal-close:hover {
  border-color: rgba(255, 85, 0, 0.35);
  color: #ff5500;
  transform: rotate(90deg);
}

/* Top: logo + header */
.modal-top {
  padding: 2rem 2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-logo-ring {
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.modal-logo-ring__track {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 85, 0, 0.3);
}

.modal-logo {
  position: absolute;
  inset: 6px;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  border-radius: 50%;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.03);
  padding: 12px;
}

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.modal-cat {
  font-size: 0.62rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.modal-tagline {
  font-size: 0.78rem;
  color: #8a929e;
  margin: 0;
}

/* Body */
.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 85, 0, 0.2) transparent;
}

.modal-body::-webkit-scrollbar { width: 4px; }
.modal-body::-webkit-scrollbar-thumb {
  background: rgba(255, 85, 0, 0.2);
  border-radius: 2px;
}

.modal-desc {
  font-size: 0.88rem;
  color: #9aa3af;
  line-height: 1.75;
  margin: 0;
}

/* Blocks */
.modal-block {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.modal-block__label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.66rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mb-dot {
  width: 5px;
  height: 5px;
  background: #ff5500;
  border-radius: 50%;
}

.modal-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.modal-pill {
  padding: 0.32rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.72rem;
  color: #c8cdd5;
  transition: all 0.2s ease;
}

.modal-pill:hover {
  border-color: rgba(255, 85, 0, 0.3);
  color: #ff5500;
}

/* Checklist */
.modal-checklist {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.check-icon {
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

.check-item span {
  font-size: 0.82rem;
  color: #9aa3af;
  line-height: 1.55;
}

/* Testimonial */
.modal-testimonial {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-left: 3px solid #ff5500;
  border-radius: 0 14px 14px 0;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.mt-quote {
  font-size: 2.5rem;
  line-height: 0.6;
  color: #ff5500;
  opacity: 0.4;
  font-family: Georgia, serif;
}

.mt-text {
  font-size: 0.82rem;
  color: #b0b8c4;
  line-height: 1.7;
  margin: 0;
  font-style: italic;
}

.mt-author strong {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  color: #ffffff;
}

.mt-author span {
  font-size: 0.66rem;
  color: #6b7585;
}

/* Footer */
.modal-footer {
  padding: 1.25rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.modal-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.7rem 1.5rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-cta:hover {
  background: #ff6b1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 85, 0, 0.3);
}

.modal-cta-icon {
  width: 22px;
  height: 22px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-cta:hover .modal-cta-icon {
  transform: translateX(3px);
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1100px) {
  .clients__circles {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 900px) {
  .clients__circles {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .clients {
    padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px);
  }

  .clients__hl-solid,
  .clients__hl-outline,
  .clients__hl-accent {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }

  .clients__circles {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .client-circle {
    padding: 1.25rem 0.75rem 1rem;
  }

  .circle-info {
    gap: 0.15rem;
  }

  .circle-name {
    font-size: 0.78rem;
  }

  .circle-project {
    font-size: 0.62rem;
  }

  .clients__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .modal-top {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem 1.5rem 1.25rem;
  }

  .modal-body {
    padding: 1.25rem 1.5rem;
  }

  .modal-footer {
    padding: 1rem 1.5rem;
  }

  .modal-cta {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 400px) {
  .clients__circles {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .circle-ring,
  .circle-overlay {
    width: 80px;
    height: 80px;
  }

  .strip-divider {
    display: none;
  }
}
</style>