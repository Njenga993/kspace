<template>
  <section id="clients" class="clients-section">
    <div class="clients-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">Partners</span>
        </div>
        <div class="collab-badge">
          <i class="fas fa-handshake"></i>
          <span>{{ clients.length }} Collaborations</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="main-grid">

        <!-- LEFT: headline + filters -->
        <div class="left-col">
          <div class="headline-block">
            <p class="eyebrow">Trusted By</p>
            <h2 class="headline">
              <span class="hl-solid">Industry</span>
              <span class="hl-outline">Leaders</span>
              <span class="hl-accent">& Changemakers</span>
            </h2>
            <p class="sub-desc">
              Collaborating with innovative organisations across East Africa —
              from agri-tech NGOs to clean energy startups — delivering digital
              solutions that create measurable impact.
            </p>
          </div>

          <!-- Industry filter pills -->
          <div class="filter-track">
            <button
              v-for="industry in industries"
              :key="industry"
              :class="['filter-pill', { active: activeIndustry === industry }]"
              @click="activeIndustry = industry"
            >
              {{ industry }}
              <span class="f-count">{{ getIndustryCount(industry) }}</span>
            </button>
          </div>

          <!-- Quick stats -->
          <div class="quick-stats">
            <div class="qs-item">
              <span class="qs-num">{{ clients.length }}</span>
              <span class="qs-label">Clients</span>
            </div>
            <div class="qs-divider"></div>
            <div class="qs-item">
              <span class="qs-num">100%</span>
              <span class="qs-label">Satisfaction</span>
            </div>
            <div class="qs-divider"></div>
            <div class="qs-item">
              <span class="qs-num">{{ uniqueIndustries }}</span>
              <span class="qs-label">Industries</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: testimonial showcase -->
        <div class="right-col">
          <!-- Terminal -->
          <div class="terminal-card">
            <div class="terminal-dots"><span></span><span></span><span></span></div>
            <div class="t-lines">
              <div class="t-line-row">
                <span class="t-prompt">~/testimonials $</span>
                <span class="t-cmd">cat client-feedback.txt</span>
              </div>
              <div class="t-line-row">
                <span class="t-prompt">›</span>
                <span class="t-accent-out">{{ testimonials[currentTestimonial].company }}</span>
              </div>
              <div class="t-line-row">
                <span class="t-prompt">›</span>
                <span class="t-out">Rating: {{ '★'.repeat(testimonials[currentTestimonial].rating) }}</span>
              </div>
            </div>
          </div>

          <!-- Testimonial card -->
          <Transition name="testi-fade" mode="out-in">
            <div :key="currentTestimonial" class="testimonial-card">
              <div class="quote-mark">"</div>
              <p class="testi-text">{{ testimonials[currentTestimonial].text }}</p>
              <div class="testi-footer">
                <div class="testi-author">
                  <div class="ta-avatar">
                    {{ testimonials[currentTestimonial].author.charAt(0) }}
                  </div>
                  <div class="ta-info">
                    <strong>{{ testimonials[currentTestimonial].author }}</strong>
                    <span>{{ testimonials[currentTestimonial].position }}, {{ testimonials[currentTestimonial].company }}</span>
                  </div>
                </div>
                <div class="testi-stars">
                  <i
                    v-for="i in 5"
                    :key="i"
                    class="fas fa-star"
                    :class="{ filled: i <= testimonials[currentTestimonial].rating }"
                  ></i>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Nav -->
          <div class="testi-nav">
            <button class="tn-btn" :disabled="currentTestimonial === 0" @click="prevTestimonial">
              <i class="fas fa-arrow-left"></i>
            </button>
            <div class="tn-dots">
              <span
                v-for="(_, idx) in testimonials"
                :key="idx"
                :class="['tn-dot', { active: currentTestimonial === idx }]"
                @click="currentTestimonial = idx"
              ></span>
            </div>
            <button class="tn-btn" :disabled="currentTestimonial === testimonials.length - 1" @click="nextTestimonial">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Client grid -->
      <div class="client-grid">
        <div
          v-for="(client, idx) in filteredClients"
          :key="client.name"
          class="client-card"
          @click="openModal(client)"
        >
          <div class="cc-visual">
            <img :src="client.logo" :alt="client.name" class="cc-logo" />
            <div class="cc-overlay">
              <span>View Details</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
          <div class="cc-body">
            <span class="cc-industry">{{ client.industry }}</span>
            <p class="cc-name">{{ client.name }}</p>
            <span class="cc-project">{{ client.project }}</span>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ clients.length }}</span>
          <span class="stat-desc">Clients</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-desc">Satisfaction</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ uniqueIndustries }}</span>
          <span class="stat-desc">Industries</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">3+</span>
          <span class="stat-desc">Years</span>
        </div>
      </div>

    </div>

    <!-- ─── Full-screen client modal ─── -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="selectedClient" class="modal-backdrop" @click.self="closeModal">
          <div class="modal-shell">

            <button class="modal-close" @click="closeModal" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>

            <!-- Left: visual panel -->
            <div class="modal-visual">
              <div class="mv-logo-wrap">
                <img :src="selectedClient.logo" :alt="selectedClient.name" class="mv-logo" />
              </div>
              <div class="mv-gradient"></div>
              <div class="mv-meta">
                <span class="mv-industry">{{ selectedClient.industry }}</span>
                <span class="mv-year">{{ selectedClient.year }}</span>
              </div>
              <div class="mv-watermark">{{ String(clients.findIndex(c => c.name === selectedClient.name) + 1).padStart(2,'0') }}</div>
            </div>

            <!-- Right: content -->
            <div class="modal-content">

              <div class="mc-header">
                <span class="mc-cat">{{ selectedClient.industry }}</span>
                <h2 class="mc-title">{{ selectedClient.name }}</h2>
                <p class="mc-tagline">{{ selectedClient.project }}</p>
              </div>

              <p class="mc-desc">{{ selectedClient.description }}</p>

              <!-- Technologies -->
              <div class="mc-block">
                <div class="mcb-label">
                  <span class="mcb-dot"></span> Technologies
                </div>
                <div class="mcb-pills">
                  <span v-for="tech in selectedClient.technologies" :key="tech" class="mcb-pill">{{ tech }}</span>
                </div>
              </div>

              <!-- Deliverables -->
              <div class="mc-block">
                <div class="mcb-label">
                  <span class="mcb-dot"></span> Deliverables
                </div>
                <div class="mcb-list">
                  <div
                    v-for="feat in getClientFeatures(selectedClient.name)"
                    :key="feat"
                    class="mcb-item"
                  >
                    <div class="mcbi-icon"><i class="fas fa-check"></i></div>
                    <span>{{ feat }}</span>
                  </div>
                </div>
              </div>

              <!-- Testimonial if exists -->
              <div
                v-if="getClientTestimonial(selectedClient.name)"
                class="mc-testimonial"
              >
                <div class="mct-quote">"</div>
                <p class="mct-text">{{ getClientTestimonial(selectedClient.name).text }}</p>
                <div class="mct-author">
                  <strong>{{ getClientTestimonial(selectedClient.name).author }}</strong>
                  <span>{{ getClientTestimonial(selectedClient.name).position }}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeIndustry   = ref('All')
const selectedClient   = ref(null)
const currentTestimonial = ref(0)

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

const openModal = (client) => {
  selectedClient.value = client
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedClient.value = null
  document.body.style.overflow = ''
}

const prevTestimonial = () => { if (currentTestimonial.value > 0) currentTestimonial.value-- }
const nextTestimonial = () => { if (currentTestimonial.value < testimonials.length - 1) currentTestimonial.value++ }
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

/* ─── Section ────────────────────────────────────────── */
.clients-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ─── Card ───────────────────────────────────────────── */
.clients-card {
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

.clients-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 45%; height: 100%;
  background: radial-gradient(ellipse at 20% 35%, rgba(180, 100, 30, 0.12) 0%, transparent 65%);
  pointer-events: none;
}

/* ─── Top bar ────────────────────────────────────────── */
.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 1rem; position: relative; z-index: 2;
}

.section-label { display: flex; align-items: center; gap: 0.55rem; }

.label-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; }

.label-text {
  font-size: 0.72rem; font-weight: 700;
  color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase;
}

.collab-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--accent-border); border-radius: 3rem;
  font-size: 0.74rem; font-weight: 600;
  color: var(--accent); background: var(--accent-dim);
}

.collab-badge i { font-size: 0.68rem; }

/* ─── Main grid ──────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3rem; align-items: start;
  position: relative; z-index: 2;
}

/* ─── Left col ───────────────────────────────────────── */
.left-col { display: flex; flex-direction: column; gap: 1.6rem; }

.headline-block { display: flex; flex-direction: column; gap: 0.5rem; }

.eyebrow {
  font-size: 0.82rem; font-weight: 600;
  color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
}

.headline { display: flex; flex-direction: column; line-height: 0.95; letter-spacing: -0.03em; margin: 0; }

.hl-solid  { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--white); }
.hl-outline{ font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: transparent; -webkit-text-stroke: 1.5px var(--white); }
.hl-accent { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--accent); }

.sub-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.72; margin: 0.3rem 0 0; max-width: 420px; }

/* Filter pills */
.filter-track { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.filter-pill {
  display: inline-flex; align-items: center; gap: 0.45rem;
  padding: 0.44rem 1rem;
  border: 1px solid var(--border); border-radius: 3rem;
  background: var(--bg-card);
  font-size: 0.76rem; font-weight: 600; color: var(--muted);
  cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;
}

.filter-pill:hover { border-color: var(--accent-border); color: var(--silver); }
.filter-pill.active { background: var(--accent); border-color: var(--accent); color: #0d1117; }

.f-count { font-size: 0.62rem; opacity: 0.7; }

/* Quick stats */
.quick-stats {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1.1rem 1.3rem;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.2rem;
}

.qs-item { display: flex; flex-direction: column; gap: 0.1rem; }

.qs-num  { font-size: 1.5rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; line-height: 1; }
.qs-label{ font-size: 0.64rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }

.qs-divider { width: 1px; height: 2rem; background: var(--border); flex-shrink: 0; }

/* ─── Right col: testimonial ─────────────────────────── */
.right-col { display: flex; flex-direction: column; gap: 1.4rem; position: relative; z-index: 2; }

/* Terminal */
.terminal-card {
  background: #080b0e; border: 1px solid var(--border);
  border-radius: 1.3rem; padding: 1.2rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  transition: border-color 0.2s;
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

/* Testimonial card */
.testi-fade-enter-active, .testi-fade-leave-active { transition: all 0.22s ease; }
.testi-fade-enter-from { opacity: 0; transform: translateY(8px); }
.testi-fade-leave-to   { opacity: 0; transform: translateY(-8px); }

.testimonial-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.4rem; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1rem;
  transition: border-color 0.2s;
}

.testimonial-card:hover { border-color: var(--accent-border); }

.quote-mark {
  font-size: 3.5rem; line-height: 0.7;
  color: var(--accent); opacity: 0.5;
  font-family: Georgia, serif;
}

.testi-text {
  font-size: 0.88rem; color: var(--silver);
  line-height: 1.75; margin: 0;
}

.testi-footer {
  display: flex; align-items: center;
  justify-content: space-between; gap: 1rem;
  padding-top: 1rem; border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.testi-author { display: flex; align-items: center; gap: 0.7rem; }

.ta-avatar {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  border-radius: 50%;
  font-size: 0.82rem; font-weight: 700; color: var(--accent);
  flex-shrink: 0;
}

.ta-info strong { display: block; font-size: 0.82rem; font-weight: 700; color: var(--white); }
.ta-info span   { font-size: 0.66rem; color: var(--dim); }

.testi-stars i { font-size: 0.7rem; color: var(--border); margin: 0 1px; }
.testi-stars i.filled { color: var(--accent); }

/* Testimonial nav */
.testi-nav {
  display: flex; align-items: center; justify-content: center; gap: 1.2rem;
}

.tn-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 0.7rem; color: var(--muted); font-size: 0.72rem;
  cursor: pointer; transition: all 0.2s;
}

.tn-btn:hover:not(:disabled) { border-color: var(--accent-border); color: var(--accent); }
.tn-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.tn-dots { display: flex; gap: 0.45rem; }

.tn-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,255,255,0.1); cursor: pointer; transition: all 0.25s;
}

.tn-dot.active {
  background: var(--accent);
  box-shadow: 0 0 6px rgba(201,162,59,0.4);
  transform: scale(1.5);
}

/* ─── Client grid ────────────────────────────────────── */
.client-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  position: relative; z-index: 2;
}

.client-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.3rem; overflow: hidden;
  cursor: pointer; transition: all 0.22s ease;
}

.client-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.45);
}

.cc-visual {
  position: relative;
  height: 100px;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0d1117, #141c26);
  overflow: hidden;
}

.cc-logo {
  max-width: 65%; max-height: 60px;
  object-fit: contain;
  filter: grayscale(100%) brightness(0.9);
  transition: filter 0.35s;
}

.client-card:hover .cc-logo { filter: grayscale(0%) brightness(1); }

.cc-overlay {
  position: absolute; inset: 0;
  background: rgba(13,17,23,0.75);
  display: flex; align-items: center; justify-content: center;
  gap: 0.5rem;
  font-size: 0.72rem; font-weight: 700; color: var(--white);
  opacity: 0; transition: opacity 0.25s;
  backdrop-filter: blur(2px);
}

.client-card:hover .cc-overlay { opacity: 1; }

.cc-body {
  padding: 0.9rem 1rem;
  display: flex; flex-direction: column; gap: 0.2rem;
}

.cc-industry {
  font-size: 0.58rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
}

.cc-name {
  font-size: 0.82rem; font-weight: 700; color: var(--white);
  margin: 0; line-height: 1.25;
}

.cc-project { font-size: 0.68rem; color: var(--muted); }

/* ─── Stats bar ──────────────────────────────────────── */
.stats-bar {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 1.5rem; padding-top: 1.6rem;
  border-top: 1px solid var(--border);
  position: relative; z-index: 2;
}

.stat-item  { display: flex; flex-direction: column; gap: 0.12rem; }
.stat-number{ font-size: 1.7rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; line-height: 1; }
.stat-desc  { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
.stat-divider{ width: 1px; height: 2.2rem; background: var(--border); flex-shrink: 0; }

/* ─── Modal ──────────────────────────────────────────── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-active .modal-shell,
.modal-fade-leave-active .modal-shell { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .modal-shell { transform: scale(0.95) translateY(20px); opacity: 0; }
.modal-fade-leave-to .modal-shell   { transform: scale(0.95) translateY(20px); opacity: 0; }

.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(5, 7, 10, 0.92);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
}

.modal-shell {
  width: 100%; max-width: 900px; max-height: 88vh;
  background: #0d1117;
  border: 1px solid rgba(201,162,59,0.22);
  border-radius: 1.8rem;
  display: grid; grid-template-columns: 0.75fr 1fr;
  overflow: hidden; position: relative;
  box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04);
}

.modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem; z-index: 10;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(13,17,23,0.85); backdrop-filter: blur(6px);
  border: 1px solid var(--border); border-radius: 50%;
  color: var(--muted); font-size: 0.82rem;
  cursor: pointer; transition: all 0.2s;
}

.modal-close:hover { border-color: var(--accent-border); color: var(--accent); }

/* Visual panel */
.modal-visual {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #080b0e, #0d1520);
  display: flex; align-items: center; justify-content: center;
}

.mv-logo-wrap {
  width: 80%; display: flex; align-items: center; justify-content: center;
  padding: 2rem;
}

.mv-logo {
  max-width: 100%; max-height: 180px;
  object-fit: contain;
  filter: grayscale(20%) brightness(0.9);
}

.mv-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to right, transparent 50%, rgba(8,6,2,0.6) 100%);
  pointer-events: none;
}

.mv-meta {
  position: absolute; bottom: 1.5rem; left: 1.5rem;
  display: flex; flex-direction: column; gap: 0.4rem;
}

.mv-industry {
  font-size: 0.62rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  background: rgba(8,6,2,0.8); backdrop-filter: blur(6px);
  border: 1px solid var(--accent-border); border-radius: 3rem;
  width: fit-content;
}

.mv-year {
  font-size: 0.68rem; color: var(--dim);
  padding-left: 0.7rem;
}

.mv-watermark {
  position: absolute; top: 1rem; left: 1.2rem;
  font-size: 5rem; font-weight: 900;
  color: rgba(255,255,255,0.04);
  line-height: 1; pointer-events: none;
}

/* Content panel */
.modal-content {
  overflow-y: auto; padding: 2rem 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 1.4rem;
  scrollbar-width: thin; scrollbar-color: rgba(201,162,59,0.3) transparent;
}

.modal-content::-webkit-scrollbar { width: 4px; }
.modal-content::-webkit-scrollbar-thumb { background: rgba(201,162,59,0.3); border-radius: 2px; }

.mc-header { display: flex; flex-direction: column; gap: 0.45rem; }

.mc-cat {
  font-size: 0.68rem; font-weight: 700;
  color: var(--accent); letter-spacing: 0.12em; text-transform: uppercase;
}

.mc-title {
  font-size: 1.5rem; font-weight: 800; color: var(--white);
  margin: 0; line-height: 1.1; letter-spacing: -0.02em;
}

.mc-tagline {
  font-size: 0.86rem; color: var(--muted); margin: 0;
  border-left: 3px solid var(--accent); padding-left: 0.9rem;
  line-height: 1.5;
}

.mc-desc {
  font-size: 0.84rem; color: var(--muted); line-height: 1.75; margin: 0;
}

/* Blocks */
.mc-block { display: flex; flex-direction: column; gap: 0.65rem; }

.mcb-label {
  display: flex; align-items: center; gap: 0.45rem;
  font-size: 0.66rem; font-weight: 700; color: var(--accent);
  letter-spacing: 0.12em; text-transform: uppercase;
}

.mcb-dot { width: 5px; height: 5px; background: var(--accent); border-radius: 50%; }

.mcb-pills { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.mcb-pill {
  padding: 0.32rem 0.75rem;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 3rem; font-size: 0.72rem; color: var(--silver);
  transition: all 0.2s;
}

.mcb-pill:hover { border-color: var(--accent-border); color: var(--accent); }

.mcb-list { display: flex; flex-direction: column; gap: 0.5rem; }

.mcb-item {
  display: flex; align-items: flex-start; gap: 0.65rem;
}

.mcbi-icon {
  width: 20px; height: 20px;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  border-radius: 50%; color: var(--accent); font-size: 0.55rem;
  flex-shrink: 0; margin-top: 1px;
}

.mcb-item span { font-size: 0.82rem; color: var(--muted); line-height: 1.55; }

/* Inline testimonial in modal */
.mc-testimonial {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: 0 1rem 1rem 0;
  padding: 1.1rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.7rem;
}

.mct-quote {
  font-size: 2.5rem; line-height: 0.6;
  color: var(--accent); opacity: 0.5;
  font-family: Georgia, serif;
}

.mct-text  { font-size: 0.82rem; color: var(--silver); line-height: 1.7; margin: 0; font-style: italic; }
.mct-author strong { display: block; font-size: 0.78rem; font-weight: 700; color: var(--white); }
.mct-author span   { font-size: 0.64rem; color: var(--dim); }

/* ─── Animations ─────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; gap: 2rem; }
  .sub-desc  { max-width: 100%; }
  .modal-shell { grid-template-columns: 1fr; max-height: 95vh; }
  .modal-visual { height: 220px; }
  .mv-logo { max-height: 120px; }
  .mv-gradient { background: linear-gradient(to bottom, transparent 40%, rgba(8,6,2,0.7) 100%); }
}

@media (max-width: 768px) {
  .clients-card { padding: 1.6rem 1.4rem; border-radius: 1.5rem; gap: 1.8rem; }
  .hl-solid, .hl-outline, .hl-accent { font-size: clamp(2rem, 7vw, 3rem); }
  .client-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .client-grid { grid-template-columns: 1fr; }
  .stat-divider { display: none; }
  .qs-divider   { display: none; }
  .modal-backdrop { padding: 0; }
  .modal-shell {
    border-radius: 1.5rem 1.5rem 0 0;
    align-self: flex-end; max-height: 95vh;
  }
  .modal-content { padding: 1.4rem 1.2rem; }
  .mc-title { font-size: 1.2rem; }
}
</style>