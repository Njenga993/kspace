<template>
  <section id="clients" class="clients">
    <div class="clients-container">
      <!-- Section Header -->
      <div class="clients-header">
        <div class="header-badge">
          <span class="badge-num">05</span>
          <span class="badge-text">PARTNERS</span>
        </div>
        <h2 class="clients-title">
          Trusted By <span class="accent">Industry Leaders</span>
        </h2>
        <div class="clients-underline"></div>
        <p class="clients-subtitle">
          Collaborating with innovative companies to deliver exceptional digital
          solutions
        </p>
      </div>

      <!-- Stats Dashboard -->
      <div class="stats-showcase">
        <div class="stat-block">
          <div class="stat-icon">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ clients.length }}</div>
            <div class="stat-label">HAPPY CLIENTS</div>
          </div>
        </div>
        <div class="stat-block">
          <div class="stat-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">100%</div>
            <div class="stat-label">SATISFACTION</div>
          </div>
        </div>
        <div class="stat-block">
          <div class="stat-icon">
            <i class="fas fa-sync-alt"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ getRetentionRate }}%</div>
            <div class="stat-label">RETENTION RATE</div>
          </div>
        </div>
        <div class="stat-block">
          <div class="stat-icon">
            <i class="fas fa-building"></i>
          </div>
          <div class="stat-info">
            <div class="stat-number">{{ uniqueIndustries }}</div>
            <div class="stat-label">INDUSTRIES</div>
          </div>
        </div>
      </div>

      <!-- Client Categories Filter -->
      <div class="client-filters">
        <button
          v-for="industry in industries"
          :key="industry"
          @click="activeIndustry = industry"
          :class="['filter-chip', { active: activeIndustry === industry }]"
        >
          {{ industry }}
          <span class="filter-count">{{ getIndustryCount(industry) }}</span>
        </button>
      </div>

      <!-- Client Showcase Grid -->
      <div class="client-showcase">
        <div
          v-for="(client, idx) in filteredClients"
          :key="client.name"
          class="client-card"
          :style="{ animationDelay: idx * 0.05 + 's' }"
          @click="openClientModal(client)"
        >
          <div class="card-front">
            <div class="logo-container">
              <img :src="client.logo" :alt="client.name" class="client-logo" />
            </div>
            <div class="card-info">
              <h3>{{ client.name }}</h3>
              <span class="industry-badge">{{ client.industry }}</span>
            </div>
          </div>
          <div class="card-back">
            <div class="project-preview">
              <i class="fas fa-folder-open"></i>
              <span>{{ client.project }}</span>
              <small>{{ client.year }}</small>
            </div>
            <div class="tech-stack">
              <i class="fas fa-code"></i>
              <span
                >{{ client.technologies.slice(0, 3).join(", ")
                }}{{ client.technologies.length > 3 ? "..." : "" }}</span
              >
            </div>
            <button class="view-btn">VIEW DETAILS →</button>
          </div>
        </div>
      </div>

      <!-- Testimonial Section -->
      <div class="testimonial-section" v-if="testimonials.length">
        <div class="testimonial-header">
          <h3>Client Testimonials</h3>
          <div class="testimonial-nav">
            <button
              @click="prevTestimonial"
              :disabled="currentTestimonial === 0"
              class="nav-btn"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              @click="nextTestimonial"
              :disabled="currentTestimonial === testimonials.length - 1"
              class="nav-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div class="testimonial-carousel">
          <transition name="fade" mode="out-in">
            <div :key="currentTestimonial" class="testimonial-card">
              <div class="quote-mark">“</div>
              <p class="testimonial-text">
                {{ testimonials[currentTestimonial].text }}
              </p>
              <div class="testimonial-author">
                <div class="author-info">
                  <strong>{{ testimonials[currentTestimonial].author }}</strong>
                  <span
                    >{{ testimonials[currentTestimonial].position }},
                    {{ testimonials[currentTestimonial].company }}</span
                  >
                </div>
                <div class="rating">
                  <i
                    v-for="i in 5"
                    :key="i"
                    class="fas fa-star"
                    :class="{
                      filled: i <= testimonials[currentTestimonial].rating,
                    }"
                  ></i>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <div class="testimonial-dots">
          <button
            v-for="(_, idx) in testimonials"
            :key="idx"
            @click="currentTestimonial = idx"
            :class="['dot', { active: currentTestimonial === idx }]"
          ></button>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="clients-cta">
        <div class="cta-content">
          <p>Ready to join our list of satisfied clients?</p>
          <button class="cta-button" @click="$emit('scrollToContact')">
            START YOUR PROJECT
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Client Modal -->
    <transition name="modal">
      <div v-if="selectedClient" class="modal" @click="closeClientModal">
        <div class="modal-window" @click.stop>
          <div class="modal-header">
            <div class="modal-logo">
              <img :src="selectedClient.logo" :alt="selectedClient.name" />
            </div>
            <div class="modal-title">
              <h2>{{ selectedClient.name }}</h2>
              <span class="modal-industry">{{ selectedClient.industry }}</span>
            </div>
            <button class="modal-close" @click="closeClientModal">×</button>
          </div>

          <div class="modal-body">
            <div class="project-overview">
              <h4>PROJECT OVERVIEW</h4>
              <p>{{ selectedClient.description }}</p>
            </div>

            <div class="project-details-grid">
              <div class="detail-item">
                <i class="fas fa-briefcase"></i>
                <div>
                  <label>PROJECT</label>
                  <span>{{ selectedClient.project }}</span>
                </div>
              </div>
              <div class="detail-item">
                <i class="fas fa-calendar"></i>
                <div>
                  <label>YEAR</label>
                  <span>{{ selectedClient.year }}</span>
                </div>
              </div>
              <div class="detail-item full-width">
                <i class="fas fa-microchip"></i>
                <div>
                  <label>TECHNOLOGIES</label>
                  <div class="tech-tags">
                    <span
                      v-for="tech in selectedClient.technologies"
                      :key="tech"
                      class="tech-tag"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="key-features"
              v-if="getClientFeatures(selectedClient.name).length"
            >
              <h4>KEY DELIVERABLES</h4>
              <ul class="features-list">
                <li
                  v-for="feature in getClientFeatures(selectedClient.name)"
                  :key="feature"
                >
                  <i class="fas fa-check"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="modal-actions">
              <button class="action-btn" @click="closeClientModal">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["scrollToContact"]);

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
    description:
      "Developed a comprehensive web application to manage seed distribution, farmer networks, and agricultural resources across Kenya. The platform streamlined operations and improved accessibility for farmers nationwide.",
  },
  {
    name: "INOFO Africa",
    industry: "Agriculture",
    logo: "./inofo.JPG",
    project: "Portfolio Website",
    year: "2025",
    technologies: ["REACT", "TypeScript", "CSS", "HTML"],
    description:
      "Created a modern, responsive portfolio website to showcase agricultural projects and initiatives, enhancing their online presence and stakeholder engagement.",
  },
  {
    name: "GREANIA BUILD SOLUTIONS",
    industry: "Construction",
    logo: "./Greania.JPG",
    project: "Portfolio Website",
    year: "2025",
    technologies: ["REACT", "TypeScript", "CSS", "HTML"],
    description:
      "Built a professional portfolio website highlighting construction projects and services, resulting in increased client inquiries and project leads.",
  },
  {
    name: "NYAKAZI ORGANICS",
    industry: "Organic Products",
    logo: "./Nyakazi.png",
    project: "E-commerce Platform",
    year: "2024",
    technologies: ["REACT", "Django", "PostgreSQL"],
    description:
      "Developed a full-featured e-commerce platform with seamless shopping experience, secure payments, and inventory management. The platform boosted online sales by 150%.",
  },
  {
    name: "SALEHUB POS",
    industry: "Retail Technology",
    logo: "./salehubPOS.png",
    project: "Internal POS System",
    year: "2024",
    technologies: ["React", "Django", "PostgreSQL"],
    description:
      "Created a comprehensive point of sale system to manage inventory, sales tracking, customer relationships, and real-time analytics.",
  },
  {
    name: "K-SPACE TECH SOLUTIONS",
    industry: "IT Services",
    logo: "./terminal.JPG",
    project: "Personal Portfolio",
    year: "2023",
    technologies: ["VUE", "TypeScript", "CSS", "HTML"],
    description:
      "Designed and developed a modern portfolio website showcasing technical expertise and project work, increasing professional visibility.",
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

const industries = computed(() => {
  const ind = ["All", ...new Set(clients.value.map((c) => c.industry))];
  return ind;
});

const filteredClients = computed(() => {
  if (activeIndustry.value === "All") return clients.value;
  return clients.value.filter((c) => c.industry === activeIndustry.value);
});

const uniqueIndustries = computed(() => {
  return new Set(clients.value.map((c) => c.industry)).size;
});

const getRetentionRate = computed(() => {
  return 85;
});

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
  return (
    features[clientName] || [
      "Responsive design across all devices",
      "Performance optimized architecture",
      "SEO-friendly implementation",
      "Ongoing maintenance and support",
    ]
  );
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
  if (currentTestimonial.value > 0) {
    currentTestimonial.value--;
  }
};

const nextTestimonial = () => {
  if (currentTestimonial.value < testimonials.length - 1) {
    currentTestimonial.value++;
  }
};
</script>

<style scoped>
.clients {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  position: relative;
}

.clients-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.clients-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  margin-bottom: 1.5rem;
}

.badge-num {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
}

.badge-text {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.clients-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: 1rem;
}

.clients-title .accent {
  color: var(--accent);
}

.clients-underline {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1rem;
}

.clients-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Stats Showcase */
.stats-showcase {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.stat-block {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.stat-block:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 94, 0, 0.1);
  color: var(--accent);
  font-size: 1.5rem;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  letter-spacing: 0.08em;
}

/* Client Filters */
.client-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-chip {
  padding: 0.5rem 1.25rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-chip.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.filter-count {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.1rem 0.4rem;
  font-size: 0.65rem;
  font-weight: 600;
}

/* Client Showcase */
.client-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.client-card {
  position: relative;
  height: 280px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s ease;
}

.card-front {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 2;
}

.client-card:hover .card-front {
  transform: rotateY(180deg);
}

.card-back {
  background: var(--bg-card);
  border: 1px solid var(--accent);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  gap: 1rem;
}

.client-card:hover .card-back {
  transform: rotateY(0);
}

.logo-container {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.client-logo {
  max-width: 80%;
  max-height: 100px;
  object-fit: contain;
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.3s;
}

.client-card:hover .client-logo {
  filter: grayscale(0%);
}

.card-info {
  text-align: center;
}

.card-info h3 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.industry-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 94, 0, 0.15);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.project-preview {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  text-align: center;
}

.project-preview i {
  font-size: 1.5rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.project-preview span {
  font-size: 0.8rem;
  color: var(--text-silver);
  font-weight: 600;
}

.project-preview small {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: var(--text-muted);
  justify-content: center;
  padding: 0.5rem;
  background: var(--bg-elevated);
}

.tech-stack i {
  color: var(--accent);
}

.view-btn {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.6rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  background: var(--accent);
  color: #000;
}

/* Testimonial Section */
.testimonial-section {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 2rem;
  margin-bottom: 3rem;
}

.testimonial-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-dark);
}

.testimonial-header h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.1em;
}

.testimonial-nav {
  display: flex;
  gap: 0.5rem;
}

.nav-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.testimonial-card {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.quote-mark {
  font-size: 4rem;
  color: var(--accent);
  font-family: Georgia, serif;
  line-height: 1;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.testimonial-text {
  color: var(--text-silver);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-dark);
}

.author-info {
  text-align: left;
}

.author-info strong {
  display: block;
  color: var(--text-white);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.author-info span {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

.rating i {
  color: #ffc107;
  font-size: 0.8rem;
  margin: 0 1px;
}

.rating i.filled {
  color: #ffc107;
}

.rating i:not(.filled) {
  color: var(--border-dark);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.dot {
  width: 6px;
  height: 6px;
  background: var(--border-default);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--accent);
  width: 20px;
  border-radius: 2px;
}

/* CTA Section */
.clients-cta {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  padding: 2rem;
  text-align: center;
}

.cta-content p {
  color: var(--text-muted);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.cta-button {
  padding: 0.75rem 2rem;
  background: var(--accent);
  border: none;
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.cta-button i {
  margin-left: 0.5rem;
  transition: transform 0.3s;
}

.cta-button:hover i {
  transform: translateX(4px);
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-window {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-dark);
  position: relative;
}

.modal-logo {
  width: 70px;
  height: 70px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.modal-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
}

.modal-title h2 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.25rem;
}

.modal-industry {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 94, 0, 0.15);
  color: var(--accent);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--accent);
}

.modal-body {
  padding: 1.5rem;
}

.project-overview {
  margin-bottom: 1.5rem;
}

.project-overview h4 {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.project-overview p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.85rem;
}

.project-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-elevated);
  border-left: 2px solid var(--accent);
}

.detail-item.full-width {
  grid-column: span 2;
}

.detail-item i {
  color: var(--accent);
  font-size: 1rem;
  margin-top: 0.1rem;
}

.detail-item label {
  display: block;
  font-size: 0.6rem;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}

.detail-item span {
  font-size: 0.8rem;
  color: var(--text-silver);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.tech-tag {
  padding: 0.15rem 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  font-size: 0.65rem;
  color: var(--text-muted);
}

.key-features {
  margin-bottom: 1.5rem;
}

.key-features h4 {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.features-list li {
  padding: 0.4rem;
  color: var(--text-muted);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-elevated);
}

.features-list li i {
  color: var(--accent);
  font-size: 0.7rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid var(--border-dark);
}

.action-btn {
  padding: 0.6rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.client-card {
  animation: fadeIn 0.5s ease-out both;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-showcase {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .clients {
    padding: 3rem 1rem;
  }

  .clients-title {
    font-size: 1.8rem;
  }

  .stats-showcase {
    grid-template-columns: repeat(2, 1fr);
  }

  .client-showcase {
    grid-template-columns: 1fr;
  }

  .testimonial-author {
    flex-direction: column;
    text-align: center;
  }

  .author-info {
    text-align: center;
  }

  .modal-header {
    flex-direction: column;
    text-align: center;
  }

  .project-details-grid {
    grid-template-columns: 1fr;
  }

  .detail-item.full-width {
    grid-column: span 1;
  }
}

@media (max-width: 480px) {
  .stats-showcase {
    grid-template-columns: 1fr;
  }

  .client-filters {
    gap: 0.5rem;
  }

  .filter-chip {
    font-size: 0.65rem;
    padding: 0.4rem 1rem;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
