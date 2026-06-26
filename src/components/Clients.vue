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

    <!-- ── Work rows ───────────────────────────────────── -->
    <div class="wi__rows">
      <TransitionGroup name="row-fade">
        <div
          v-for="(client, idx) in filtered"
          :key="client.name"
          class="wi__row anim"
          :style="{ '--d': 0.22 + idx * 0.05 + 's' }"
          :class="{ 'wi__row--open': openRow === client.name }"
          @click="toggleRow(client.name)"
        >
          <!-- ── Row summary (always visible) ─────────── -->
          <div class="wir__summary">

            <!-- Left: index + name -->
            <div class="wir__left">
              <span class="wir__idx">{{ String(idx + 1).padStart(2, '0') }}</span>
              <div class="wir__name-block">
                <span class="wir__name">{{ client.name }}</span>
                <span class="wir__project">{{ client.project }}</span>
              </div>
            </div>

            <!-- Centre: tags -->
            <div class="wir__tags">
              <span class="wir__industry">{{ client.industry }}</span>
              <span class="wir__year">{{ client.year }}</span>
            </div>

            <!-- Right: metric + toggle -->
            <div class="wir__right">
              <span class="wir__metric">{{ client.metric }}</span>
              <span class="wir__toggle" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>

          </div>

          <!-- ── Expanded detail (accordion) ──────────── -->
          <Transition name="expand">
            <div v-if="openRow === client.name" class="wir__detail" @click.stop>

              <div class="wid__grid">

                <!-- Description -->
                <div class="wid__desc-col">
                  <p class="wid__desc">{{ client.description }}</p>
                  <div class="wid__stack">
                    <span v-for="tech in client.technologies" :key="tech" class="wid__tag">{{ tech }}</span>
                  </div>
                </div>

                <!-- Deliverables -->
                <div class="wid__list-col">
                  <p class="wid__list-label">Key deliverables</p>
                  <ul class="wid__list">
                    <li v-for="item in getFeatures(client.name)" :key="item">{{ item }}</li>
                  </ul>
                </div>

              </div>

              <!-- Testimonial if present -->
              <div v-if="getTestimonial(client.name)" class="wid__testimonial">
                <p class="widt__text">"{{ getTestimonial(client.name).text }}"</p>
                <span class="widt__author">
                  {{ getTestimonial(client.name).author }},
                  {{ getTestimonial(client.name).position }} · {{ getTestimonial(client.name).company }}
                </span>
              </div>

              <!-- CTA -->
              <div class="wid__cta-row">
                <a href="#contact" class="wid__cta" @click.prevent="goToContact">
                  Start a similar project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h10M8 2l5 5-5 5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </a>
              </div>

            </div>
          </Transition>

        </div>
      </TransitionGroup>
    </div>

    <!-- ── Bottom strip ────────────────────────────────── -->
    <div class="wi__strip anim" style="--d:0.7s">
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
import { ref, computed, onMounted } from 'vue'

const sectionRef   = ref(null)
const activeFilter = ref('All')
const openRow      = ref(null)

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
    name: 'SaleHub POS',
    industry: 'Retail Technology',
    project: 'Multi-tenant SaaS POS',
    year: '2024',
    metric: 'Live · Railway production',
    logo: './salehubPOS.png',
    technologies: ['Laravel 11', 'PostgreSQL', 'Vue.js', 'Railway'],
    description: 'Designed and developed SaleHub — a multi-tenant, cloud-native Point of Sale SaaS platform targeting Kenyan SMEs. Live on Railway with role-based access, branch management, and real-time inventory deductions.',
  },
  {
    name: 'Desiderata Consultancy',
    industry: 'Consulting',
    project: 'Corporate Website',
    year: '2023',
    metric: '60% faster load time',
    logo: './Desiderata.png',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Maps API'],
    description: 'Professional corporate website for Desiderata Consultancy with service showcases, client case studies, contact form integration, and Google Maps. Delivered a 60% reduction in page load time versus the previous site.',
  },
])

const testimonials = [
  {
    text: 'Kelvin delivered an exceptional platform that exceeded our expectations. His understanding of our market and how Kenyan customers actually shop made all the difference.',
    author: 'Sarah Mwangi',
    position: 'CEO',
    company: 'Nyakazi Organics',
  },
  {
    text: 'Working with Kelvin was seamless. He understood our requirements and delivered a platform that has significantly improved how we serve our farmer network.',
    author: 'John Kariuki',
    position: 'Project Manager',
    company: 'Seed Savers Network',
  },
  {
    text: 'Professional, technically sharp, and always on time. The website has received outstanding feedback from clients and partners.',
    author: 'Mary Wanjiku',
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

const toggleRow = (name) => {
  openRow.value = openRow.value === name ? null : name
}

const goToContact = () => {
  openRow.value = null
  setTimeout(() => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }, 320)
}

onMounted(() => {
  const section = sectionRef.value
  if (!section) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { section.classList.add('in-view'); io.unobserve(section) }
    })
  }, { threshold: 0.05 })
  io.observe(section)
})
</script>

<style scoped>
/* ── Tokens ──────────────────────────────────────────── */
:root {
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

/* ── Rows container ──────────────────────────────────── */
.wi__rows {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.07);
  position: relative;
}

/* Row transition */
.row-fade-enter-active { transition: opacity 0.4s ease, transform 0.4s var(--ease); }
.row-fade-leave-active { transition: opacity 0.2s ease; position: absolute; width: 100%; }
.row-fade-enter-from   { opacity: 0; transform: translateY(10px); }
.row-fade-leave-to     { opacity: 0; }
.row-fade-move         { transition: transform 0.4s var(--ease); }

/* ── Single row ──────────────────────────────────────── */
.wi__row {
  border-bottom: 1px solid rgba(255,255,255,0.07);
  cursor: pointer;
  transition: background 0.25s ease;
}
.wi__row:hover { background: rgba(255,255,255,0.02); }
.wi__row--open { background: rgba(232,74,0,0.04); border-bottom-color: rgba(232,74,0,0.15); }

/* Summary bar */
.wir__summary {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding: clamp(18px, 2.5vh, 26px) 0;
}

.wir__left {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  min-width: 0;
}

.wir__idx {
  font-size: 0.62rem;
  font-weight: 700;
  color: rgba(255,255,255,0.2);
  letter-spacing: 0.06em;
  flex-shrink: 0;
  width: 20px;
}
.wi__row--open .wir__idx { color: #e84a00; }

.wir__name-block {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.wir__name {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.22s;
}
.wi__row:hover .wir__name { color: #e84a00; }

.wir__project {
  font-size: 0.72rem;
  color: #6b7585;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Tags */
.wir__tags {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.wir__industry {
  font-size: 0.62rem;
  font-weight: 700;
  color: #e84a00;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.22rem 0.65rem;
  border: 1px solid rgba(232,74,0,0.2);
  border-radius: 999px;
  background: rgba(232,74,0,0.07);
  white-space: nowrap;
}

.wir__year {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

/* Right */
.wir__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

.wir__metric {
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  text-align: right;
  white-space: nowrap;
}

.wir__toggle {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  color: rgba(255,255,255,0.3);
  flex-shrink: 0;
  transition: all 0.35s var(--ease);
}
.wi__row:hover .wir__toggle { border-color: rgba(232,74,0,0.3); color: #e84a00; }
.wi__row--open .wir__toggle {
  background: #e84a00;
  border-color: #e84a00;
  color: #ffffff;
  transform: rotate(180deg);
}

/* ── Expanded detail ─────────────────────────────────── */
.expand-enter-active { transition: all 0.45s var(--ease); }
.expand-leave-active { transition: all 0.25s ease; }
.expand-enter-from   { opacity: 0; transform: translateY(-8px); }
.expand-leave-to     { opacity: 0; }

.wir__detail {
  padding: 0 0 clamp(24px, 3.5vh, 36px);
  padding-left: calc(20px + clamp(0.75rem, 2vw, 1.5rem));
  border-top: 1px solid rgba(255,255,255,0.05);
  margin-top: 0;
}

.wid__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  padding-top: clamp(20px, 3vh, 28px);
}

.wid__desc {
  font-size: 0.88rem;
  line-height: 1.75;
  color: #9aa3af;
  margin: 0 0 1rem;
}

.wid__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.wid__tag {
  padding: 0.22rem 0.6rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-size: 0.65rem;
  color: #c8cdd5;
  letter-spacing: 0.02em;
}

.wid__list-label {
  font-size: 0.62rem;
  font-weight: 700;
  color: #e84a00;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
}

.wid__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.wid__list li {
  font-size: 0.82rem;
  color: #9aa3af;
  line-height: 1.5;
  padding-left: 1rem;
  position: relative;
}
.wid__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  background: #e84a00;
  border-radius: 50%;
}

/* Testimonial */
.wid__testimonial {
  margin-top: clamp(16px, 2.5vh, 24px);
  padding: 1rem 1.25rem;
  border-left: 2px solid #e84a00;
  background: rgba(232,74,0,0.04);
  border-radius: 0 10px 10px 0;
}

.widt__text {
  font-size: 0.82rem;
  color: #b0b8c4;
  line-height: 1.7;
  font-style: italic;
  margin: 0 0 0.5rem;
}

.widt__author {
  font-size: 0.65rem;
  color: #6b7585;
  letter-spacing: 0.04em;
}

/* CTA row */
.wid__cta-row {
  margin-top: clamp(16px, 2.5vh, 24px);
}

.wid__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.4rem;
  background: #e84a00;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  transition: background 0.25s ease, transform 0.3s var(--ease);
}
.wid__cta:hover { background: #ff5c10; transform: translateY(-2px); color: #ffffff; }

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
@media (max-width: 900px) {
  .wi__head { grid-template-columns: 1fr; gap: 1rem; }

  .wir__summary { grid-template-columns: 1fr auto; }
  .wir__tags { display: none; }

  .wid__grid { grid-template-columns: 1fr; gap: 1.25rem; }
}

@media (max-width: 640px) {
  .work-index { padding: clamp(48px, 8vh, 72px) 20px clamp(40px, 6vh, 64px); }

  .wih-solid, .wih-outline, .wih-accent { font-size: clamp(2.2rem, 9vw, 3.5rem); }

  .wir__summary { gap: 0.75rem; }
  .wir__metric { display: none; }
  .wir__name { font-size: 0.95rem; }

  .wir__detail { padding-left: 0; }

  .wi__strip { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .wis__div { display: none; }
}

@media (max-width: 380px) {
  .work-index { padding: 40px 16px 48px; }
  .wir__industry { display: none; }
}
</style>