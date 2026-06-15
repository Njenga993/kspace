<template>
  <section id="clients" class="clients-premium">
    <div class="clients-container">
      <!-- Top Bar - Matching hero status bar -->
      <div class="clients-topbar">
        <div class="topbar-id">
          <span class="id-dot"></span>
          <span class="id-text">PARTNERS</span>
        </div>
        <div class="topbar-status">
          <span class="status-dot"></span>
          <span class="status-text">{{ clients.length }} COLLABORATIONS</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="clients-main">
        <!-- Left: Typography Block - Matching hero left side -->
        <div class="clients-type">
          <h2 class="clients-headline">
            <span class="t-line">Trusted By</span>
            <span class="t-line t-outline">Industry</span>
            <span class="t-line t-accent">Leaders</span>
          </h2>

          <p class="clients-desc">
            Collaborating with innovative companies across diverse sectors 
            to deliver exceptional digital solutions that drive results.
          </p>

          <!-- Industry Filters - Matching hero badge style -->
          <div class="industry-filters">
            <button
              v-for="industry in industries"
              :key="industry"
              :class="['filter-badge', { active: activeIndustry === industry }]"
              @click="activeIndustry = industry"
            >
              {{ industry }}
              <span class="filter-count">{{ getIndustryCount(industry) }}</span>
            </button>
          </div>
        </div>

        <!-- Right: Testimonial Showcase - Matching hero right showcase -->
        <div class="clients-showcase">
          <!-- Terminal-style testimonial header -->
          <div class="testimonial-terminal">
            <div class="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="terminal-content">
              <div class="code-line">
                <span class="prompt">~/testimonials $</span>
                <span>cat client-feedback.txt</span>
              </div>
              <div class="code-line">
                <span class="prompt">></span>
                <span class="accent-text">{{ testimonials[currentTestimonial].company }}</span>
              </div>
            </div>
          </div>

          <!-- Testimonial Content -->
          <transition name="testimonial-fade" mode="out-in">
            <div :key="currentTestimonial" class="testimonial-card">
              <div class="quote-mark">"</div>
              <p class="testimonial-text">
                {{ testimonials[currentTestimonial].text }}
              </p>
              <div class="testimonial-author">
                <div class="author-info">
                  <strong>{{ testimonials[currentTestimonial].author }}</strong>
                  <span>{{ testimonials[currentTestimonial].position }}, {{ testimonials[currentTestimonial].company }}</span>
                </div>
                <div class="author-rating">
                  <i v-for="i in 5" :key="i" class="fas fa-star" :class="{ filled: i <= testimonials[currentTestimonial].rating }"></i>
                </div>
              </div>
            </div>
          </transition>

          <!-- Testimonial Navigation -->
          <div class="testimonial-nav">
            <button @click="prevTestimonial" :disabled="currentTestimonial === 0" class="tn-btn">
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
            <button @click="nextTestimonial" :disabled="currentTestimonial === testimonials.length - 1" class="tn-btn">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Client Grid -->
      <div class="client-grid">
        <div
          v-for="(client, idx) in filteredClients"
          :key="client.name"
          class="client-card"
          @click="openClientModal(client)"
        >
          <div class="client-logo-wrap">
            <img :src="client.logo" :alt="client.name" class="client-logo" />
          </div>
          <div class="client-info">
            <span class="client-name">{{ client.name }}</span>
            <span class="client-project">{{ client.project }}</span>
          </div>
          <div class="client-hover">
            <span>VIEW DETAILS</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      <!-- Bottom Bar - Matching hero trust stats -->
      <div class="clients-bottombar">
        <div class="bottom-stats">
          <div class="b-stat">
            <span class="b-stat-num">{{ clients.length }}</span>
            <span class="b-stat-label">CLIENTS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">100%</span>
            <span class="b-stat-label">SATISFACTION</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">{{ uniqueIndustries }}</span>
            <span class="b-stat-label">INDUSTRIES</span>
          </div>
        </div>
        <div class="bottom-scroll">
          <span class="scroll-label">PARTNERS</span>
          <div class="scroll-track">
            <div class="scroll-thumb"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Modal -->
    <transition name="modal">
      <div v-if="selectedClient" class="client-modal" @click="closeClientModal">
        <div class="modal-panel" @click.stop>
          <div class="modal-header">
            <div class="mh-logo">
              <img :src="selectedClient.logo" :alt="selectedClient.name" />
            </div>
            <button class="mh-close" @click="closeClientModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <h3 class="mb-title">{{ selectedClient.name }}</h3>
            <div class="mb-meta">
              <span class="mbm-industry">{{ selectedClient.industry }}</span>
              <span class="mbm-year">{{ selectedClient.year }}</span>
            </div>
            <p class="mb-desc">{{ selectedClient.description }}</p>
            
            <div class="mb-section">
              <h4 class="mbs-label">TECHNOLOGIES</h4>
              <div class="mbs-tags">
                <span v-for="tech in selectedClient.technologies" :key="tech" class="mbst-tag">{{ tech }}</span>
              </div>
            </div>

            <div class="mb-section">
              <h4 class="mbs-label">DELIVERABLES</h4>
              <div class="mbs-features">
                <div v-for="feature in getClientFeatures(selectedClient.name)" :key="feature" class="mbsf-item">
                  <span class="mbsfi-marker"></span>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const activeIndustry = ref("All");
const selectedClient = ref(null);
const currentTestimonial = ref(0);

const clients = ref([
  {
    name: "SEED SAVERS NETWORK KENYA",
    industry: "Agriculture",
    logo: "./SSN.JPG",
    project: "Web Application Development",
    year: "2025",
    technologies: ["REACT", "JavaScript", "CSS", "HTML"],
    description: "Developed a comprehensive web application to manage seed distribution, farmer networks, and agricultural resources across Kenya. The platform streamlined operations and improved accessibility for farmers nationwide.",
  },
  {
    name: "INOFO Africa",
    industry: "Agriculture",
    logo: "./inofo.JPG",
    project: "Portfolio Website",
    year: "2025",
    technologies: ["REACT", "TypeScript", "CSS", "HTML"],
    description: "Created a modern, responsive portfolio website to showcase agricultural projects and initiatives, enhancing their online presence and stakeholder engagement.",
  },
  {
    name: "GREANIA BUILD SOLUTIONS",
    industry: "Construction",
    logo: "./Greania.JPG",
    project: "Portfolio Website",
    year: "2025",
    technologies: ["REACT", "TypeScript", "CSS", "HTML"],
    description: "Built a professional portfolio website highlighting construction projects and services, resulting in increased client inquiries and project leads.",
  },
  {
    name: "NYAKAZI ORGANICS",
    industry: "Organic Products",
    logo: "./Nyakazi.png",
    project: "E-commerce Platform",
    year: "2024",
    technologies: ["REACT", "Django", "PostgreSQL"],
    description: "Developed a full-featured e-commerce platform with seamless shopping experience, secure payments, and inventory management. The platform boosted online sales by 150%.",
  },
  {
    name: "SALEHUB POS",
    industry: "Retail Technology",
    logo: "./salehubPOS.png",
    project: "Internal POS System",
    year: "2024",
    technologies: ["React", "Django", "PostgreSQL"],
    description: "Created a comprehensive point of sale system to manage inventory, sales tracking, customer relationships, and real-time analytics.",
  },
  {
    name: "K-SPACE TECH SOLUTIONS",
    industry: "IT Services",
    logo: "./terminal.JPG",
    project: "Personal Portfolio",
    year: "2023",
    technologies: ["VUE", "TypeScript", "CSS", "HTML"],
    description: "Designed and developed a modern portfolio website showcasing technical expertise and project work, increasing professional visibility.",
  },
]);

const testimonials = [
  {
    text: "Kelvin delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise transformed our online presence.",
    author: "Sarah Mwangi",
    position: "CEO",
    company: "Nyakazi Organics",
    rating: 5,
  },
  {
    text: "Working with Kelvin was a pleasure. He understood our requirements perfectly and delivered a solution that has significantly improved our operations.",
    author: "John Kariuki",
    position: "Project Manager",
    company: "Seed Savers Network",
    rating: 5,
  },
  {
    text: "Professional, timely, and highly skilled. The website Kelvin built for us has received outstanding feedback from our clients and partners.",
    author: "Mary Wanjiku",
    position: "Director",
    company: "Greania Build Solutions",
    rating: 5,
  },
];

const industries = computed(() => ["All", ...new Set(clients.value.map((c) => c.industry))]);

const filteredClients = computed(() => {
  if (activeIndustry.value === "All") return clients.value;
  return clients.value.filter((c) => c.industry === activeIndustry.value);
});

const uniqueIndustries = computed(() => new Set(clients.value.map((c) => c.industry)).size);

const getIndustryCount = (industry) => {
  if (industry === "All") return clients.value.length;
  return clients.value.filter((c) => c.industry === industry).length;
};

const getClientFeatures = (clientName) => {
  const features = {
    "SEED SAVERS NETWORK KENYA": [
      "Farmer registration and management system",
      "Seed distribution tracking dashboard",
      "Real-time inventory management",
      "Automated reporting and analytics",
    ],
    "NYAKAZI ORGANICS": [
      "Secure payment gateway integration",
      "Product catalog management",
      "Order tracking system",
      "Customer account dashboard",
    ],
    "GREANIA BUILD SOLUTIONS": [
      "Project portfolio gallery",
      "Service inquiry system",
      "Client testimonial section",
      "Contact form with map integration",
    ],
  };
  return features[clientName] || [
    "Responsive design across all devices",
    "Performance optimized architecture",
    "SEO-friendly implementation",
    "Ongoing maintenance and support",
  ];
};

const openClientModal = (client) => {
  selectedClient.value = client;
  document.body.style.overflow = "hidden";
};

const closeClientModal = () => {
  selectedClient.value = null;
  document.body.style.overflow = "";
};

const prevTestimonial = () => {
  if (currentTestimonial.value > 0) currentTestimonial.value--;
};

const nextTestimonial = () => {
  if (currentTestimonial.value < testimonials.length - 1) currentTestimonial.value++;
};
</script>

<style scoped>
/* ==============================
   SECTION - Matching hero card style
   ============================== */
.clients-premium {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
}

.clients-container {
  background: var(--bg-primary, #0b0f13);
  border: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
  border-radius: 2.5rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  box-shadow: var(--shadow-card, 0 18px 35px -12px rgba(0, 0, 0, 0.6));
}

/* ==============================
   TOP BAR - Matching hero status bar
   ============================== */
.clients-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.topbar-id {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.id-dot {
  width: 6px;
  height: 6px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
}

.id-text {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted, #7b8694);
  letter-spacing: 0.2em;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border-default, rgba(201, 162, 59, 0.25));
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
}

.status-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-silver, #b0b8c1);
  letter-spacing: 0.15em;
}

/* ==============================
   MAIN - Matching hero split layout
   ============================== */
.clients-main {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 5rem;
  align-items: start;
}

/* ==============================
   LEFT: TYPOGRAPHY - Matching hero left side
   ============================== */
.clients-type {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.clients-headline {
  margin: 0;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.t-line {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: var(--text-white, #f0f2f5);
}

.t-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-white);
  paint-order: stroke fill;
}

.t-accent {
  color: var(--accent, #c9a23b);
}

.clients-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  max-width: 480px;
  margin: 0;
}

/* Industry Filters - Matching hero badge style */
.industry-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.95rem;
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 2rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-silver);
  cursor: pointer;
  transition: 0.2s;
}

.filter-badge:hover {
  border-color: var(--accent, #c9a23b);
  background: #1e262e;
}

.filter-badge.active {
  background: var(--accent, #c9a23b);
  border-color: var(--accent, #c9a23b);
  color: #0b0f13;
  font-weight: 600;
}

.filter-count {
  font-size: 0.55rem;
  opacity: 0.7;
}

/* ==============================
   RIGHT: TESTIMONIAL - Matching hero right showcase
   ============================== */
.clients-showcase {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* Terminal - Matching hero terminal */
.testimonial-terminal {
  background: #0a0e12;
  border: 1px solid var(--border-dark);
  border-radius: 1.5rem;
  padding: 1.4rem 1.4rem 1rem;
  box-shadow: var(--shadow-sm, 0 8px 18px rgba(0, 0, 0, 0.4));
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: #b0bec5;
  transition: box-shadow 0.3s, border-color 0.2s;
}

.testimonial-terminal:hover {
  border-color: var(--border-light, rgba(201, 162, 59, 0.45));
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.7);
}

.terminal-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.terminal-dots span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #3a3f47;
}

.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.terminal-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-line {
  display: flex;
  gap: 0.6rem;
  font-size: 0.78rem;
}

.prompt {
  color: var(--accent, #c9a23b);
  font-weight: 600;
  flex-shrink: 0;
}

.accent-text {
  color: var(--accent, #c9a23b);
  font-weight: 600;
}

/* Testimonial Card */
.testimonial-fade-enter-active,
.testimonial-fade-leave-active {
  transition: all 0.22s ease;
}

.testimonial-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.testimonial-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.testimonial-card {
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 1.2rem;
  padding: 1.5rem;
  transition: all 0.25s;
}

.testimonial-card:hover {
  border-color: var(--accent, #c9a23b);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.5);
}

.quote-mark {
  font-size: 3rem;
  color: var(--accent, #c9a23b);
  font-family: Georgia, serif;
  line-height: 0.5;
  margin-bottom: 0.75rem;
  opacity: 0.6;
}

.testimonial-text {
  font-size: 0.88rem;
  color: var(--text-silver);
  line-height: 1.7;
  margin: 0 0 1.25rem;
}

.testimonial-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--border-dark);
  gap: 1rem;
}

.author-info strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.15rem;
}

.author-info span {
  font-size: 0.65rem;
  color: var(--text-dim);
}

.author-rating i {
  font-size: 0.7rem;
  color: var(--border-dark);
  margin: 0 1px;
}

.author-rating i.filled {
  color: var(--accent, #c9a23b);
}

/* Testimonial Navigation */
.testimonial-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.tn-btn {
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: all 0.25s ease;
}

.tn-btn:hover:not(:disabled) {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
}

.tn-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.tn-dots {
  display: flex;
  gap: 0.5rem;
}

.tn-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tn-dot.active {
  background: var(--accent, #c9a23b);
  box-shadow: 0 0 6px rgba(201, 162, 59, 0.4);
  transform: scale(1.4);
}

/* ==============================
   CLIENT GRID - Matching hero stat cards
   ============================== */
.client-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.client-card {
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 1.2rem;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.client-card:hover {
  border-color: var(--accent, #c9a23b);
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.5);
}

.client-logo-wrap {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.client-logo {
  max-width: 70%;
  max-height: 50px;
  object-fit: contain;
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.3s;
}

.client-card:hover .client-logo {
  filter: grayscale(0%);
}

.client-info {
  text-align: center;
}

.client-name {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.2rem;
  letter-spacing: 0.04em;
}

.client-project {
  font-size: 0.58rem;
  color: var(--text-dim);
}

.client-hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: var(--accent, #c9a23b);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  color: #0b0f13;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.client-card:hover .client-hover {
  transform: translateY(0);
}

/* ==============================
   BOTTOM BAR - Matching hero trust stats
   ============================== */
.clients-bottombar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--border-dark);
}

.bottom-stats {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.b-stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.b-stat-num {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: -0.01em;
}

.b-stat-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.1em;
}

.b-stat-sep {
  color: var(--border-default);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0.15rem;
}

.bottom-scroll {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.scroll-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.2em;
}

.scroll-track {
  width: 1px;
  height: 32px;
  background: var(--border-dark);
  position: relative;
  overflow: hidden;
}

.scroll-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--accent, #c9a23b);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}

/* ==============================
   MODAL
   ============================== */
.client-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-panel {
  background: var(--bg-primary, #0b0f13);
  border: 1px solid rgba(201, 162, 59, 0.2);
  max-width: 550px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-dark);
}

.mh-logo {
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
}

.mh-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
}

.mh-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mh-close:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
}

.modal-body {
  padding: 1.5rem;
}

.mb-title {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0 0 0.5rem;
}

.mb-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mbm-industry {
  font-size: 0.6rem;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.06em;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(201, 162, 59, 0.2);
}

.mbm-year {
  font-size: 0.65rem;
  color: var(--text-dim);
}

.mb-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0 0 1.25rem;
}

.mb-section {
  margin-bottom: 1.25rem;
}

.mbs-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.1em;
  margin: 0 0 0.6rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.mbs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.mbst-tag {
  padding: 0.3rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.65rem;
  color: var(--text-silver);
}

.mbs-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mbsf-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.mbsfi-marker {
  width: 4px;
  height: 4px;
  background: var(--accent, #c9a23b);
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.mbsf-item span:last-child {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-panel {
  transform: scale(0.95) translateY(15px);
}

.modal-leave-to .modal-panel {
  transform: scale(0.95) translateY(15px);
}

/* ==============================
   RESPONSIVE
   ============================== */
@media (max-width: 1024px) {
  .clients-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .clients-premium {
    padding: 2rem 2rem;
  }

  .clients-container {
    padding: 2rem 2rem;
  }

  .client-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

@media (max-width: 768px) {
  .clients-premium {
    padding: 1.5rem;
  }

  .clients-container {
    padding: 2rem 1.5rem;
    border-radius: 2rem;
  }

  .t-line {
    font-size: clamp(2rem, 7vw, 3rem);
  }

  .t-outline {
    -webkit-text-stroke-width: 1px;
  }

  .clients-bottombar {
    flex-direction: column;
    align-items: flex-start;
  }

  .bottom-scroll {
    display: none;
  }
}

@media (max-width: 480px) {
  .clients-premium {
    padding: 1rem;
  }

  .clients-container {
    padding: 1.5rem 1.25rem;
    border-radius: 1.5rem;
  }

  .t-line {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }

  .client-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>