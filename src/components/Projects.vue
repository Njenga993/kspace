<template>
  <section id="projects" class="projects">
    <div class="projects-container">
      <!-- Section Header -->
      <div class="projects-header">
        <div class="header-badge">
          <span class="badge-num">04</span>
          <span class="badge-text">PORTFOLIO</span>
        </div>
        <h2 class="projects-title">
          Featured <span class="accent">Work</span>
        </h2>
        <div class="projects-underline"></div>
        <p class="projects-subtitle">
          A collection of projects showcasing my expertise in building modern
          web applications
        </p>
      </div>

      <!-- Category Pills -->
      <div class="category-pills">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['pill', { active: activeFilter === cat }]"
          @click="activeFilter = cat"
        >
          {{ cat }}
          <span class="pill-count">{{ getProjectCount(cat) }}</span>
        </button>
      </div>

      <!-- Project Cards Grid -->
      <div class="projects-grid">
        <div
          v-for="(project, idx) in paginatedProjects"
          :key="project.title"
          class="project-card"
          :style="{ transitionDelay: idx * 0.05 + 's' }"
          @click="openProjectDetails(project)"
        >
          <!-- Card Media -->
          <div class="card-media">
            <img :src="project.image" :alt="project.title" />
            <div class="media-overlay">
              <div class="overlay-content">
                <span class="view-project">View Project</span>
                <span class="project-category">{{ project.category }}</span>
              </div>
            </div>
            <div class="card-badge" :class="project.status">
              {{ project.status === "live" ? "Live" : "In Development" }}
            </div>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>

            <!-- Tech Stack -->
            <div class="tech-stack">
              <span
                v-for="tech in project.tech.slice(0, 4)"
                :key="tech"
                class="tech-chip"
              >
                {{ tech }}
              </span>
              <span v-if="project.tech.length > 4" class="tech-chip more">
                +{{ project.tech.length - 4 }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions">
              <a
                :href="project.github"
                target="_blank"
                class="action-link github"
                @click.stop
              >
                <i class="fab fa-github"></i>
                <span>Code</span>
              </a>
              <a
                v-if="project.demo !== '#'"
                :href="project.demo"
                target="_blank"
                class="action-link demo"
                @click.stop
              >
                <i class="fas fa-external-link-alt"></i>
                <span>Demo</span>
              </a>
              <button
                class="action-link details"
                @click.stop="openProjectDetails(project)"
              >
                <i class="fas fa-info-circle"></i>
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="page-prev"
        >
          <i class="fas fa-chevron-left"></i>
          <span>Previous</span>
        </button>

        <div class="page-numbers">
          <button
            v-for="page in displayedPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'page-number',
              { active: currentPage === page, dots: page === '...' },
            ]"
            :disabled="page === '...'"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="page-next"
        >
          <span>Next</span>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- View All Link -->
      <div class="view-all" v-if="filteredProjects.length > itemsPerPage">
        <button
          @click="showAllProjects = !showAllProjects"
          class="view-all-btn"
        >
          <span>{{ showAllProjects ? "Show Less" : "View All Projects" }}</span>
          <i
            :class="
              showAllProjects ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
            "
          ></i>
        </button>
      </div>

      <!-- Stats Section -->
      <div class="project-stats">
        <div class="stat-item">
          <div class="stat-number">{{ totalProjects }}</div>
          <div class="stat-label">Total Projects</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">{{ liveProjects }}</div>
          <div class="stat-label">Live Sites</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">{{ totalTechStacks }}</div>
          <div class="stat-label">Technologies</div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <transition name="modal">
      <div v-if="selectedProject" class="modal" @click="closeProjectDetails">
        <div class="modal-container" @click.stop>
          <div class="modal-image-section">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
            <div class="modal-status" :class="selectedProject.status">
              {{ selectedProject.status === "live" ? "LIVE" : "DEVELOPMENT" }}
            </div>
          </div>

          <div class="modal-content-section">
            <div class="modal-header">
              <div>
                <h2>{{ selectedProject.title }}</h2>
                <div class="modal-category">{{ selectedProject.category }}</div>
              </div>
              <button class="modal-close" @click="closeProjectDetails">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="modal-description">
              <p>{{ selectedProject.description }}</p>
            </div>

            <div class="modal-tech">
              <h4>Technologies Used</h4>
              <div class="tech-list">
                <span
                  v-for="tech in selectedProject.tech"
                  :key="tech"
                  class="tech-item"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div v-if="selectedProject.features" class="modal-features">
              <h4>Key Features</h4>
              <ul>
                <li v-for="feature in selectedProject.features" :key="feature">
                  <i class="fas fa-check"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>

            <div class="modal-links">
              <a
                :href="selectedProject.github"
                target="_blank"
                class="modal-link primary"
              >
                <i class="fab fa-github"></i>
                View Source
              </a>
              <a
                v-if="selectedProject.demo !== '#'"
                :href="selectedProject.demo"
                target="_blank"
                class="modal-link secondary"
              >
                <i class="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const activeFilter = ref("All");
const currentPage = ref(1);
const itemsPerPage = ref(6);
const showAllProjects = ref(false);
const selectedProject = ref(null);

const emit = defineEmits(["scrollToContact"]);

const categories = [
  "All",
  "Web Development",
  "E-commerce",
  "Full Stack",
  "Frontend",
];

const projects = [
  {
    title: "Seed Savers Network Kenya",
    description:
      "Dynamic website promoting seed sovereignty and community engagement with modern UI/UX principles and responsive design.",
    tech: ["HTML5", "TypeScript", "React.js", "Vite", "TailwindCSS"],
    category: "Web Development",
    github: "https://github.com/Njenga993/SeedSavers",
    demo: "https://njenga993.github.io/SeedSavers/",
    image: import.meta.env.BASE_URL + "ssn.PNG",
    status: "live",
    features: [
      "Program & Project Pages",
      "News & Events Section",
      "Resource Library",
      "Donation Functionality",
      "Responsive Design",
      "SEO Optimized",
    ],
  },
  {
    title: "INOFO Africa",
    description:
      "Modern information website aligned with global identity featuring clean architecture and performance optimization.",
    tech: ["HTML5", "TypeScript", "React.js", "CSS3"],
    category: "Web Development",
    github: "https://github.com/Njenga993/INOFO-Africa-",
    demo: "https://njenga993.github.io/INOFO-Africa-/",
    image: import.meta.env.BASE_URL + "inofo-africa.PNG",
    status: "live",
    features: [
      "Organizational Info Pages",
      "Membership Form",
      "Responsive Layout",
      "Performance Optimized",
    ],
  },
  {
    title: "Greania Build",
    description:
      "Professional construction and interior design company website with stunning visuals and smooth animations.",
    tech: ["HTML5", "TypeScript", "React.js", "Framer Motion"],
    category: "Web Development",
    github: "https://github.com/Njenga993/greania-build",
    demo: "https://njenga993.github.io/greania-build/",
    image: import.meta.env.BASE_URL + "greania-build.PNG",
    status: "live",
    features: [
      "Services Showcase",
      "Project Gallery",
      "Contact Form",
      "Animations",
    ],
  },
  {
    title: "Nyakazi Organics Ecommerce",
    description:
      "Comprehensive e-commerce platform with seamless shopping experience, secure payments, and inventory management.",
    tech: ["React.js", "JavaScript", "CSS3", "Redux"],
    category: "E-commerce",
    github: "https://github.com/Njenga993/nyakazi-ecommerce-",
    demo: "https://njenga993.github.io/nyakazi-ecommerce-/",
    image: import.meta.env.BASE_URL + "Nyakazi-ecommerce.PNG",
    status: "live",
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Order Management",
      "User Auth",
    ],
  },
  {
    title: "Nyakazi Corporate",
    description:
      "Corporate website showcasing company values, products, and services with elegant design and analytics integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO"],
    category: "Web Development",
    github: "https://github.com/Njenga993/nyakazi",
    demo: "https://nyakazi.org",
    image: import.meta.env.BASE_URL + "Nyakazi.png",
    status: "live",
    features: [
      "Company Portfolio",
      "Contact Forms",
      "SEO Optimized",
      "Analytics",
    ],
  },
  {
    title: "Desiderata Consultancy",
    description:
      "Professional consultancy firm website with service portfolios, client testimonials, and location integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
    category: "Web Development",
    github: "https://github.com/Njenga993/Firm-Desiderata",
    demo: "https://desiderataconsultancyfirm.com/",
    image: import.meta.env.BASE_URL + "Desiderata.png",
    status: "live",
    features: ["Service Showcase", "Contact Integration", "Maps Integration"],
  },
  {
    title: "SaleHub POS System",
    description:
      "Full-featured Point of Sale system with inventory management, sales analytics, and real-time reporting.",
    tech: ["React", "TypeScript", "Django", "PostgreSQL"],
    category: "Full Stack",
    github: "https://github.com/Njenga993/pos-project",
    demo: "#",
    image: import.meta.env.BASE_URL + "salehubPOS.png",
    status: "development",
    features: [
      "Inventory Management",
      "Sales Analytics",
      "User Authentication",
      "Real-time Updates",
    ],
  },
  {
    title: "React Portfolio",
    description:
      "Modern portfolio website showcasing professional experience and projects with interactive animations.",
    tech: ["React", "TypeScript", "Framer Motion", "CSS3"],
    category: "Frontend",
    github: "https://github.com/Njenga993/Portfolio-",
    demo: "https://njenga993.github.io/Portfolio-/",
    image: import.meta.env.BASE_URL + "React_Portfolio.PNG",
    status: "live",
    features: ["Interactive Animations", "Project Showcase", "Skills Display"],
  },
  {
    title: "Techlungs Technology",
    description:
      "Dynamic landing page with smooth GSAP animations and interactive UI components for high engagement.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    category: "Frontend",
    github: "https://github.com/Njenga993/Techlungs",
    demo: "https://techlungs.co.ke/",
    image: import.meta.env.BASE_URL + "Techlungs.png",
    status: "live",
    features: ["GSAP Animations", "Interactive UI", "Performance Optimized"],
  },
];

const filteredProjects = computed(() => {
  let filtered =
    activeFilter.value === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter.value);

  if (!showAllProjects.value) {
    filtered = filtered.slice(0, itemsPerPage.value);
  }

  return filtered;
});

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProjects.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / itemsPerPage.value),
);

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
});

const totalProjects = computed(() => projects.length);
const liveProjects = computed(
  () => projects.filter((p) => p.status === "live").length,
);
const totalTechStacks = computed(() => {
  const techSet = new Set();
  projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
  return techSet.size;
});

const getProjectCount = (category) => {
  if (category === "All") return projects.length;
  return projects.filter((p) => p.category === category).length;
};

const openProjectDetails = (project) => {
  selectedProject.value = project;
  document.body.style.overflow = "hidden";
};

const closeProjectDetails = () => {
  selectedProject.value = null;
  document.body.style.overflow = "";
};
</script>

<style scoped>
.projects {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.projects-header {
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

.projects-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: 1rem;
}

.projects-title .accent {
  color: var(--accent);
}

.projects-underline {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1rem;
}

.projects-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Category Pills */
.category-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.pill {
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

.pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.pill.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.pill-count {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.1rem 0.4rem;
  border-radius: 10px;
  font-size: 0.65rem;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
}

.project-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

/* Card Media */
.card-media {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--bg-elevated);
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: all 0.5s;
}

.project-card:hover .card-media img {
  filter: grayscale(0%);
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 94, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.project-card:hover .media-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
}

.view-project {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  color: #000;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.project-category {
  font-size: 0.65rem;
  color: #000;
  opacity: 0.8;
}

.card-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 0, 0, 0.85);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-white);
  border-left: 2px solid;
}

.card-badge.live {
  border-left-color: #22c55e;
}

.card-badge.development {
  border-left-color: #f59e0b;
}

/* Card Body */
.card-body {
  padding: 1.25rem;
}

.project-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  --webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-chip {
  padding: 0.2rem 0.6rem;
  background: var(--bg-elevated);
  font-size: 0.65rem;
  color: var(--text-muted);
}

.tech-chip.more {
  background: var(--accent);
  color: #000;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 0.75rem;
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid var(--border-default);
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.action-link:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.action-link.details {
  background: transparent;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.page-prev,
.page-next {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.page-prev:hover:not(:disabled),
.page-next:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.page-prev:disabled,
.page-next:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-number {
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.page-number:hover:not(.dots):not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.page-number.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.page-number.dots {
  border: none;
  cursor: default;
}

/* View All */
.view-all {
  text-align: center;
  margin-bottom: 3rem;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s;
}

.view-all-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Project Stats */
.project-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent);
}

.stat-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-default);
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

.modal-container {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.modal-image-section {
  position: relative;
  background: var(--bg-elevated);
}

.modal-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 0, 0, 0.85);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-white);
}

.modal-status.live {
  border-left: 2px solid #22c55e;
}

.modal-status.development {
  border-left: 2px solid #f59e0b;
}

.modal-content-section {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-header h2 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.25rem;
}

.modal-category {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background: rgba(255, 94, 0, 0.15);
  color: var(--accent);
  font-size: 0.65rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
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

.modal-description p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.85rem;
}

.modal-tech h4,
.modal-features h4 {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-item {
  padding: 0.2rem 0.6rem;
  background: var(--bg-elevated);
  font-size: 0.7rem;
  color: var(--text-silver);
}

.modal-features ul {
  list-style: none;
  padding: 0;
}

.modal-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.modal-features li i {
  color: var(--accent);
  font-size: 0.7rem;
}

.modal-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.modal-link {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.2s;
}

.modal-link.primary {
  background: var(--accent);
  color: #000;
}

.modal-link.primary:hover {
  background: var(--accent-hover);
}

.modal-link.secondary {
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-silver);
}

.modal-link.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Transitions */
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
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal-container {
    grid-template-columns: 1fr;
  }

  .modal-image-section {
    height: 250px;
  }
}

@media (max-width: 768px) {
  .projects {
    padding: 3rem 1rem;
  }

  .projects-title {
    font-size: 1.8rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
  }

  .project-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    width: 60px;
    height: 1px;
  }

  .page-prev span,
  .page-next span {
    display: none;
  }

  .page-prev,
  .page-next {
    padding: 0.5rem;
  }

  .category-pills {
    gap: 0.5rem;
  }

  .pill {
    padding: 0.4rem 1rem;
    font-size: 0.7rem;
  }
}
</style>
