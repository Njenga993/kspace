<template>
  <section id="projects" class="projects">
    <div class="projects-container">
      <!-- Section Header -->
      <div class="projects-header">
        <div class="header-left">
          <span class="section-tag">04 — PORTFOLIO</span>
          <h2 class="projects-title">
            FEATURED <span class="accent">WORK</span>
          </h2>
        </div>
        <div class="header-right">
          <span class="total-count"
            >{{ String(projects.length).padStart(2, "0") }} PROJECTS</span
          >
          <span class="live-count"
            >{{ String(liveProjects).padStart(2, "0") }} LIVE</span
          >
        </div>
      </div>

      <!-- Category Filter -->
      <div class="filter-row">
        <button
          v-for="cat in categories"
          :key="cat.label"
          :class="['pill', { active: activeFilter === cat.label }]"
          @click="setFilter(cat.label)"
        >
          {{ cat.label }}
          <span class="pill-count">{{
            String(cat.count).padStart(2, "0")
          }}</span>
        </button>
      </div>

      <!-- EDITORIAL GRID -->
      <div class="editorial-layout" v-if="filteredProjects.length > 0">
        <!-- FEATURED LEAD STORY -->
        <div class="lead-story" @click="openDrawer(filteredProjects[0])">
          <div class="lead-image">
            <div class="accent-strip"></div>
            <img
              :src="filteredProjects[0].image"
              :alt="filteredProjects[0].title"
              class="lead-img"
            />
            <div class="lead-img-overlay"></div>
            <span class="case-num"
              >CASE — {{ String(1).padStart(3, "0") }}</span
            >
          </div>
          <div class="lead-details">
            <div class="lead-top">
              <div class="lead-category">
                {{ filteredProjects[0].category }}
              </div>
              <div class="lead-title">{{ filteredProjects[0].title }}</div>
              <p class="lead-desc">{{ filteredProjects[0].description }}</p>
              <div class="tech-row">
                <span
                  v-for="tech in filteredProjects[0].tech.slice(0, 3)"
                  :key="tech"
                  class="chip"
                  >{{ tech }}</span
                >
                <span
                  v-if="filteredProjects[0].tech.length > 3"
                  class="chip accent-chip"
                >
                  +{{ filteredProjects[0].tech.length - 3 }}
                </span>
              </div>
            </div>
            <div class="lead-bottom">
              <div class="status-stamp" :class="filteredProjects[0].status">
                <span class="status-dot"></span>
                {{
                  filteredProjects[0].status === "live"
                    ? "LIVE DEPLOYMENT"
                    : "IN DEVELOPMENT"
                }}
              </div>
              <div class="lead-actions">
                <a
                  :href="filteredProjects[0].github"
                  target="_blank"
                  class="act-btn"
                  @click.stop
                  >SOURCE</a
                >
                <a
                  v-if="filteredProjects[0].demo !== '#'"
                  :href="filteredProjects[0].demo"
                  target="_blank"
                  class="act-btn primary"
                  @click.stop
                  >VIEW PROJECT</a
                >
                <button
                  class="act-btn"
                  @click.stop="openDrawer(filteredProjects[0])"
                >
                  DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SIDE COLUMN INDEX -->
        <div class="side-column" v-if="filteredProjects.length > 1">
          <div
            v-for="(project, idx) in filteredProjects.slice(1, 4)"
            :key="project.title"
            class="index-card"
            @click="openDrawer(project)"
          >
            <div class="index-top">
              <span class="case-num-sm"
                >CASE — {{ String(idx + 2).padStart(3, "0") }}</span
              >
              <span class="status-badge" :class="project.status">{{
                project.status === "live" ? "LIVE" : "DEV"
              }}</span>
            </div>
            <div class="index-title">{{ project.title }}</div>
            <div class="index-tech">
              <span
                v-for="tech in project.tech.slice(0, 2)"
                :key="tech"
                class="chip sm"
                >{{ tech }}</span
              >
            </div>
            <div class="index-footer">{{ project.category }}</div>
          </div>
        </div>
      </div>

      <!-- UNIFORM BOTTOM GRID -->
      <div class="bottom-grid" v-if="filteredProjects.length > 4">
        <div
          v-for="(project, idx) in filteredProjects.slice(4)"
          :key="project.title"
          class="grid-card"
          @click="openDrawer(project)"
        >
          <div class="grid-img-wrap">
            <img :src="project.image" :alt="project.title" class="grid-img" />
            <div class="grid-img-overlay">
              <span class="overlay-text">VIEW CASE</span>
            </div>
          </div>
          <div class="grid-body">
            <div class="grid-meta">
              <span class="case-num-sm"
                >CASE — {{ String(idx + 5).padStart(3, "0") }}</span
              >
              <span class="status-badge" :class="project.status">{{
                project.status === "live" ? "LIVE" : "DEV"
              }}</span>
            </div>
            <div class="grid-title">{{ project.title }}</div>
            <div class="grid-chips">
              <span
                v-for="tech in project.tech.slice(0, 3)"
                :key="tech"
                class="chip sm"
                >{{ tech }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <span class="empty-text">NO CASES IN THIS CATEGORY</span>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <div class="stat-num">{{ totalProjects }}</div>
          <div class="stat-label">TOTAL PROJECTS</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-num">{{ liveProjects }}</div>
          <div class="stat-label">LIVE SITES</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-num">{{ totalTechStacks }}</div>
          <div class="stat-label">TECHNOLOGIES</div>
        </div>
      </div>
    </div>

    <!-- SIDE DRAWER -->
    <transition name="drawer">
      <div v-if="activeProject" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-panel" @click.stop>
          <!-- Drawer Header -->
          <div class="drawer-head">
            <div>
              <span class="drawer-case"
                >CASE — {{ getCaseNum(activeProject) }}</span
              >
              <div class="drawer-category">{{ activeProject.category }}</div>
            </div>
            <button class="drawer-close" @click="closeDrawer">
              <span>✕</span> CLOSE
            </button>
          </div>

          <!-- Drawer Image -->
          <div class="drawer-image-wrap">
            <img
              :src="activeProject.image"
              :alt="activeProject.title"
              class="drawer-img"
            />
            <div class="drawer-status" :class="activeProject.status">
              {{ activeProject.status === "live" ? "LIVE" : "IN DEVELOPMENT" }}
            </div>
          </div>

          <!-- Drawer Content -->
          <div class="drawer-content">
            <h2 class="drawer-title">{{ activeProject.title }}</h2>
            <p class="drawer-desc">{{ activeProject.description }}</p>

            <div class="drawer-section">
              <div class="drawer-section-label">TECHNOLOGIES</div>
              <div class="drawer-tech">
                <span
                  v-for="tech in activeProject.tech"
                  :key="tech"
                  class="drawer-chip"
                  >{{ tech }}</span
                >
              </div>
            </div>

            <div class="drawer-section" v-if="activeProject.features">
              <div class="drawer-section-label">KEY FEATURES</div>
              <ul class="feature-list">
                <li
                  v-for="feat in activeProject.features"
                  :key="feat"
                  class="feature-item"
                >
                  <span class="feat-bullet">—</span>
                  <span>{{ feat }}</span>
                </li>
              </ul>
            </div>

            <div class="drawer-actions">
              <a
                :href="activeProject.github"
                target="_blank"
                class="drawer-btn primary"
                >SOURCE CODE</a
              >
              <a
                v-if="activeProject.demo !== '#'"
                :href="activeProject.demo"
                target="_blank"
                class="drawer-btn secondary"
                >LIVE DEMO</a
              >
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
const activeProject = ref(null);

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

const allCategories = [
  "All",
  "Web Development",
  "E-commerce",
  "Full Stack",
  "Frontend",
];

const categories = computed(() =>
  allCategories.map((label) => ({
    label,
    count:
      label === "All"
        ? projects.length
        : projects.filter((p) => p.category === label).length,
  })),
);

const filteredProjects = computed(() =>
  activeFilter.value === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter.value),
);

const totalProjects = computed(() => projects.length);
const liveProjects = computed(
  () => projects.filter((p) => p.status === "live").length,
);
const totalTechStacks = computed(() => {
  const s = new Set();
  projects.forEach((p) => p.tech.forEach((t) => s.add(t)));
  return s.size;
});

const getCaseNum = (project) => {
  const idx = filteredProjects.value.findIndex(
    (p) => p.title === project.title,
  );
  return String(idx + 1).padStart(3, "0");
};

const setFilter = (cat) => {
  activeFilter.value = cat;
  activeProject.value = null;
};

const openDrawer = (project) => {
  activeProject.value = project;
  document.body.style.overflow = "hidden";
};

const closeDrawer = () => {
  activeProject.value = null;
  document.body.style.overflow = "";
};
</script>

<style scoped>
/* ── BASE ── */
.projects {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  position: relative;
}
.projects-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── HEADER ── */
.projects-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-default);
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
}
.section-tag {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.projects-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--text-white);
  letter-spacing: -0.02em;
  line-height: 1;
}
.projects-title .accent {
  color: var(--accent);
}
.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}
.total-count,
.live-count {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}
.live-count {
  color: var(--accent);
}

/* ── FILTER ── */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.9rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: all 0.2s;
}
.pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.pill.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
  font-weight: 700;
}
.pill-count {
  opacity: 0.6;
  font-size: 0.55rem;
}

/* ── EDITORIAL GRID ── */
.editorial-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1px;
  background: var(--border-dark);
  border: 1px solid var(--border-dark);
  margin-bottom: 1px;
}

/* LEAD STORY */
.lead-story {
  display: grid;
  grid-template-columns: 55% 45%;
  background: var(--bg-card);
  cursor: pointer;
  transition: background 0.2s;
}
.lead-story:hover {
  background: #161616;
}

.lead-image {
  position: relative;
  min-height: 300px;
  overflow: hidden;
  background: var(--bg-elevated);
}
.accent-strip {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  z-index: 2;
}
.lead-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%);
  transition:
    filter 0.5s,
    transform 0.5s;
}
.lead-story:hover .lead-img {
  filter: grayscale(0%);
  transform: scale(1.04);
}
.lead-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  transition: opacity 0.3s;
}
.lead-story:hover .lead-img-overlay {
  opacity: 0;
}
.case-num {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  z-index: 3;
}

.lead-details {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid var(--border-dark);
}
.lead-category {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-dark);
  padding-bottom: 0.6rem;
  margin-bottom: 0.75rem;
}
.lead-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--text-white);
  line-height: 1.25;
  margin-bottom: 0.6rem;
}
.lead-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 0.85rem;
}
.tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.85rem;
}
.chip {
  padding: 0.15rem 0.5rem;
  background: var(--bg-elevated);
  font-family: var(--font-heading);
  font-size: 0.55rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}
.chip.sm {
  font-size: 0.5rem;
  padding: 0.1rem 0.4rem;
}
.accent-chip {
  background: var(--accent);
  color: #000;
  font-weight: 700;
}

.status-stamp {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}
.status-stamp.live {
  color: #22c55e;
}
.status-stamp.development {
  color: #f59e0b;
}
.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
.status-stamp.live .status-dot {
  background: #22c55e;
}
.status-stamp.development .status-dot {
  background: #f59e0b;
}

.lead-actions {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.act-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border-default);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}
.act-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.act-btn.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
  font-weight: 700;
}
.act-btn.primary:hover {
  opacity: 0.88;
}

/* SIDE COLUMN */
.side-column {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--border-dark);
  border-left: 1px solid var(--border-dark);
}
.index-card {
  flex: 1;
  background: var(--bg-card);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  cursor: pointer;
  border-left: 2px solid transparent;
  transition: all 0.2s;
}
.index-card:hover {
  background: #161616;
  border-left-color: var(--accent);
}
.index-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.case-num-sm {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  color: var(--accent);
  letter-spacing: 0.12em;
}
.status-badge {
  font-family: var(--font-heading);
  font-size: 0.45rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.1rem 0.4rem;
}
.status-badge.live {
  color: #22c55e;
  border: 1px solid #22c55e33;
}
.status-badge.development {
  color: #f59e0b;
  border: 1px solid #f59e0b33;
}

.index-title {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-white);
  line-height: 1.3;
}
.index-tech {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}
.index-footer {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-top: auto;
  border-top: 1px solid var(--border-dark);
  padding-top: 0.4rem;
}

/* ── BOTTOM UNIFORM GRID ── */
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1px;
  background: var(--border-dark);
  border: 1px solid var(--border-dark);
  border-top: none;
  margin-bottom: 1px;
}
.grid-card {
  background: var(--bg-card);
  cursor: pointer;
  overflow: hidden;
  transition: background 0.2s;
}
.grid-card:hover {
  background: #161616;
}
.grid-img-wrap {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: var(--bg-elevated);
}
.grid-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%);
  transition:
    filter 0.4s,
    transform 0.4s;
}
.grid-card:hover .grid-img {
  filter: grayscale(0%);
  transform: scale(1.05);
}
.grid-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 94, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.grid-card:hover .grid-img-overlay {
  opacity: 1;
}
.overlay-text {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #000;
}
.grid-body {
  padding: 0.85rem;
}
.grid-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.35rem;
}
.grid-title {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.4rem;
}
.grid-chips {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

/* ── EMPTY STATE ── */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  border: 1px solid var(--border-dark);
  background: var(--bg-card);
  margin-bottom: 1px;
}
.empty-text {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

/* ── STATS BAR ── */
.stats-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  margin-top: 2rem;
}
.stat-item {
  padding: 1.2rem 2rem;
  text-align: center;
}
.stat-num {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent);
  line-height: 1;
}
.stat-label {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  margin-top: 0.25rem;
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-default);
}

/* ── DRAWER ── */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}
.drawer-panel {
  width: 420px;
  max-width: 95vw;
  height: 100%;
  background: var(--bg-card);
  border-left: 2px solid var(--accent);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  background: var(--bg-card);
  z-index: 2;
}
.drawer-case {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  margin-bottom: 0.25rem;
}
.drawer-category {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.drawer-close {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.drawer-close:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.drawer-image-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--bg-elevated);
}
.drawer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.drawer-status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 0, 0, 0.85);
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  border-left: 2px solid;
}
.drawer-status.live {
  color: #22c55e;
  border-left-color: #22c55e;
}
.drawer-status.development {
  color: #f59e0b;
  border-left-color: #f59e0b;
}

.drawer-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.drawer-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--text-white);
  line-height: 1.2;
}
.drawer-desc {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.drawer-section-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  color: var(--accent);
  border-bottom: 1px solid var(--border-dark);
  padding-bottom: 0.4rem;
}
.drawer-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.drawer-chip {
  padding: 0.2rem 0.6rem;
  background: var(--bg-elevated);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  color: var(--text-silver);
}
.feature-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.feat-bullet {
  color: var(--accent);
  font-weight: 700;
}
.drawer-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.drawer-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}
.drawer-btn.primary {
  background: var(--accent);
  color: #000;
  border: 1px solid var(--accent);
}
.drawer-btn.primary:hover {
  opacity: 0.88;
}
.drawer-btn.secondary {
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-silver);
}
.drawer-btn.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ── TRANSITIONS ── */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from {
  opacity: 0;
}
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel {
  transform: translateX(100%);
}
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .editorial-layout {
    grid-template-columns: 1fr;
  }
  .side-column {
    flex-direction: row;
    border-left: none;
    border-top: 1px solid var(--border-dark);
  }
  .index-card {
    flex: 1;
    min-width: 0;
  }
  .lead-story {
    grid-template-columns: 1fr;
  }
  .lead-image {
    min-height: 200px;
  }
}

@media (max-width: 640px) {
  .projects {
    padding: 3rem 1rem;
  }
  .projects-title {
    font-size: 1.6rem;
  }
  .side-column {
    flex-direction: column;
  }
  .stats-bar {
    grid-template-columns: 1fr;
  }
  .stat-divider {
    width: 40px;
    height: 1px;
    margin: 0 auto;
  }
  .bottom-grid {
    grid-template-columns: 1fr;
  }
  .drawer-panel {
    width: 100%;
    border-left: none;
    border-top: 2px solid var(--accent);
  }
  .drawer-backdrop {
    align-items: flex-end;
  }
  .header-right {
    display: none;
  }
}
</style>
