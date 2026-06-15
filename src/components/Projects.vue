<template>
  <section id="projects" class="projects-premium">
    <div class="projects-container">

      <!-- TOP BAR -->
      <div class="projects-topbar">
        <div class="topbar-id">
          <span class="id-dot"></span>
          <span class="id-text">PORTFOLIO</span>
        </div>
        <div class="topbar-right">
          <div class="topbar-status" v-if="!loading">
            <span class="status-dot" :class="{ pulse: !loading }"></span>
            <span class="status-text">{{ liveProjects }} LIVE · {{ totalProjects }} TOTAL</span>
          </div>
          <div class="topbar-loading" v-if="loading">
            <span class="loader-dots"><span></span><span></span><span></span></span>
            <span class="id-text">FETCHING FROM GITHUB</span>
          </div>
          <a href="https://github.com/Njenga993" target="_blank" class="github-pill">
            <i class="fab fa-github"></i>
            <span>Njenga993</span>
          </a>
        </div>
      </div>

      <!-- MAIN SPLIT -->
      <div class="projects-main">

        <!-- LEFT: TYPOGRAPHY + FILTERS -->
        <div class="projects-type">
          <h2 class="projects-headline">
            <span class="t-line">Featured</span>
            <span class="t-line t-outline">Work &</span>
            <span class="t-line t-accent">Projects</span>
          </h2>

          <p class="projects-desc">
            A curated selection of open-source and client projects across web development,
            full-stack engineering, e-commerce, and data systems — built for the African market and beyond.
          </p>

          <!-- CATEGORY FILTERS -->
          <div class="category-filters">
            <button
              v-for="cat in categories"
              :key="cat.label"
              :class="['filter-badge', { active: activeFilter === cat.label }]"
              @click="setFilter(cat.label)"
            >
              <span class="fb-icon">{{ cat.icon }}</span>
              {{ cat.label }}
              <span class="filter-count">{{ cat.count }}</span>
            </button>
          </div>

          <!-- SORT CONTROL -->
          <div class="sort-control">
            <span class="sc-label">SORT BY</span>
            <button
              v-for="s in sortOptions"
              :key="s.val"
              :class="['sc-btn', { active: sortBy === s.val }]"
              @click="sortBy = s.val"
            >{{ s.label }}</button>
          </div>
        </div>

        <!-- RIGHT: FEATURED SHOWCASE -->
        <div class="projects-showcase">
          <transition name="panel-fade" mode="out-in">
            <div v-if="loading" key="loading" class="showcase-skeleton">
              <div class="sk-terminal"></div>
              <div class="sk-image"></div>
              <div class="sk-actions"></div>
            </div>
            <div :key="activeFilter + sortBy" class="showcase-panel" v-else-if="filteredSorted.length > 0">

              <!-- FEATURED TERMINAL -->
              <div class="project-terminal" @click="openDrawer(filteredSorted[0])">
                <div class="terminal-header">
                  <div class="terminal-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span class="terminal-title">~/portfolio $ cat featured.json</span>
                </div>
                <div class="terminal-content">
                  <div class="code-line">
                    <span class="prompt">❯</span>
                    <span class="accent-text">{{ filteredSorted[0].title }}</span>
                  </div>
                  <div class="code-line">
                    <span class="prompt">  lang</span>
                    <span class="dim-text">:</span>
                    <span class="lang-text">{{ filteredSorted[0].language || 'Multi-lang' }}</span>
                  </div>
                  <div class="code-line">
                    <span class="prompt">  type</span>
                    <span class="dim-text">:</span>
                    <span>{{ filteredSorted[0].category }}</span>
                  </div>
                  <div class="code-line">
                    <span class="prompt">  status</span>
                    <span class="dim-text">:</span>
                    <span :class="filteredSorted[0].status === 'live' ? 'live-text' : 'dev-text'">
                      {{ filteredSorted[0].status === 'live' ? '● DEPLOYED' : '◌ IN DEVELOPMENT' }}
                    </span>
                  </div>
                  <div class="code-line" v-if="filteredSorted[0].stars > 0">
                    <span class="prompt">  stars</span>
                    <span class="dim-text">:</span>
                    <span class="star-text">★ {{ filteredSorted[0].stars }}</span>
                  </div>
                </div>
              </div>

              <!-- FEATURED IMAGE -->
              <div class="featured-image" @click="openDrawer(filteredSorted[0])">
                <div class="fi-frame">
                  <div class="frame-inner">
                    <img
                      v-if="filteredSorted[0].image"
                      :src="filteredSorted[0].image"
                      :alt="filteredSorted[0].title"
                    />
                    <div v-else class="frame-placeholder">
                      <div class="fp-icon">{{ getCategoryIcon(filteredSorted[0].category) }}</div>
                      <div class="fp-name">{{ filteredSorted[0].title }}</div>
                    </div>
                    <div class="frame-gradient"></div>
                  </div>
                  <div class="frame-border"></div>
                  <div class="frame-corner frame-corner-tl"></div>
                  <div class="frame-corner frame-corner-br"></div>
                </div>
                <div class="fi-watermark">01</div>
              </div>

              <!-- FEATURED ACTIONS -->
              <div class="featured-actions">
                <a :href="filteredSorted[0].github" target="_blank" class="fa-btn secondary" @click.stop>
                  <span class="btn-idx">SRC</span>
                  <span class="btn-label">SOURCE CODE</span>
                </a>
                <a
                  v-if="filteredSorted[0].demo && filteredSorted[0].demo !== '#'"
                  :href="filteredSorted[0].demo"
                  target="_blank"
                  class="fa-btn primary"
                  @click.stop
                >
                  <span class="btn-idx">01</span>
                  <span class="btn-label">VIEW PROJECT</span>
                  <span class="btn-arrow"><i class="fas fa-arrow-right"></i></span>
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- PROJECT GRID -->
      <div class="project-grid" v-if="!loading && filteredSorted.length > 1">
        <div
          v-for="(project, idx) in filteredSorted.slice(1)"
          :key="project.title"
          class="project-card"
          :class="{ 'card-featured': project.stars > 0 }"
          @click="openDrawer(project)"
        >
          <!-- STARS BADGE -->
          <div v-if="project.stars > 0" class="card-star-badge">★ {{ project.stars }}</div>

          <div class="pc-visual">
            <div class="pc-frame">
              <img v-if="project.image" :src="project.image" :alt="project.title" />
              <div v-else class="pc-placeholder">
                <div class="pcp-icon">{{ getCategoryIcon(project.category) }}</div>
              </div>
              <div class="pc-overlay">
                <span class="pco-text">VIEW DETAILS</span>
                <span class="pco-arrow"><i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
            <div class="pc-number">{{ String(idx + 2).padStart(2, '0') }}</div>
            <div class="pc-status" :class="project.status">
              <span class="pcs-dot"></span>
            </div>
            <div class="pc-lang-badge" v-if="project.language">{{ project.language }}</div>
          </div>

          <div class="pc-info">
            <div class="pci-top">
              <span class="pcit-cat">{{ project.category }}</span>
            </div>
            <h4 class="pci-title">{{ project.title }}</h4>
            <p class="pci-desc">{{ project.description || 'Open-source project by Kelvin Njenga.' }}</p>
            <div class="pci-tags">
              <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="pcit-tag">{{ tech }}</span>
              <span v-if="project.tech.length > 3" class="pcit-more">+{{ project.tech.length - 3 }}</span>
            </div>
            <div class="pci-links">
              <a :href="project.github" target="_blank" class="pcil-link" @click.stop title="Source Code">
                <i class="fab fa-github"></i>
              </a>
              <a
                v-if="project.demo && project.demo !== '#'"
                :href="project.demo"
                target="_blank"
                class="pcil-link"
                @click.stop
                title="Live Demo"
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- SKELETON GRID while loading -->
      <div class="project-grid" v-if="loading">
        <div v-for="n in 8" :key="n" class="project-card sk-card">
          <div class="sk-visual"></div>
          <div class="sk-info">
            <div class="sk-line short"></div>
            <div class="sk-line"></div>
            <div class="sk-line medium"></div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-if="!loading && filteredSorted.length === 0" class="empty-state">
        <div class="empty-icon">◌</div>
        <span class="empty-text">NO PROJECTS IN THIS CATEGORY</span>
      </div>

      <!-- PROJECT INQUIRY SECTION -->
      <div class="projects-inquiry">
        <div class="inquiry-content">
          <div class="inquiry-text">
            <h3 class="inquiry-title">Interested in a Similar Project?</h3>
            <p class="inquiry-desc">Let's collaborate to bring your vision to life. I specialize in full-stack development, e-commerce, and custom solutions.</p>
          </div>
          <a href="#contact" class="inquiry-btn">
            <span class="btn-text">GET YOUR PROJECT STARTED</span>
            <span class="btn-arrow"><i class="fas fa-arrow-right"></i></span>
          </a>
        </div>
      </div>

      <!-- BOTTOM BAR -->
      <div class="projects-bottombar">
        <div class="bottom-stats">
          <div class="b-stat">
            <span class="b-stat-num">{{ totalProjects }}</span>
            <span class="b-stat-label">PROJECTS</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">{{ liveProjects }}</span>
            <span class="b-stat-label">LIVE</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">{{ totalTechStacks }}</span>
            <span class="b-stat-label">TECHNOLOGIES</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">{{ totalStars }}</span>
            <span class="b-stat-label">STARS</span>
          </div>
        </div>
        <div class="bottom-socials">
          <a href="https://github.com/Njenga993" target="_blank" rel="noopener" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://x.com/kamau_nje" target="_blank" rel="noopener" aria-label="Twitter/X">
            <i class="fab fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- DETAIL DRAWER -->
    <transition name="drawer">
      <div v-if="activeProject" class="drawer-backdrop" @click="closeDrawer">
        <div class="drawer-panel" @click.stop>
          <div class="dp-header">
            <div class="dph-left">
              <span class="dphl-num">{{ getCaseNum(activeProject) }}</span>
              <span class="dphl-label">CASE STUDY</span>
            </div>
            <div class="dph-tags">
              <span class="dph-lang" v-if="activeProject.language">{{ activeProject.language }}</span>
              <span class="dph-stars" v-if="activeProject.stars > 0">★ {{ activeProject.stars }}</span>
            </div>
            <button class="dph-close" @click="closeDrawer">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="dp-image">
            <img v-if="activeProject.image" :src="activeProject.image" :alt="activeProject.title" />
            <div v-else class="dp-placeholder">
              <div class="dpp-icon">{{ getCategoryIcon(activeProject.category) }}</div>
              <div class="dpp-name">{{ activeProject.title }}</div>
            </div>
            <div class="dpi-badge" :class="activeProject.status">
              {{ activeProject.status === 'live' ? '● LIVE SYSTEM' : '◌ IN DEVELOPMENT' }}
            </div>
          </div>

          <div class="dp-content">
            <h2 class="dpc-title">{{ activeProject.title }}</h2>
            <div class="dpc-meta">
              <span>{{ activeProject.category }}</span>
              <span class="dpcm-sep">·</span>
              <span>{{ activeProject.tech.length }} technologies</span>
              <span class="dpcm-sep" v-if="activeProject.updatedAt">·</span>
              <span v-if="activeProject.updatedAt">Updated {{ formatDate(activeProject.updatedAt) }}</span>
            </div>
            <p class="dpc-desc">{{ activeProject.description || 'An open-source project by Kelvin Njenga Kamau — Full-Stack Developer based in Nairobi, Kenya.' }}</p>

            <div class="dpc-section">
              <div class="dpcs-title">TECHNICAL STACK</div>
              <div class="dpcs-chips">
                <span v-for="tech in activeProject.tech" :key="tech" class="dpcs-chip">{{ tech }}</span>
              </div>
            </div>

            <div class="dpc-section" v-if="activeProject.features && activeProject.features.length">
              <div class="dpcs-title">KEY FEATURES</div>
              <div class="dpcs-features">
                <div v-for="(feat, i) in activeProject.features" :key="feat" class="dpcsf-item">
                  <span class="dpcsfi-num">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span>{{ feat }}</span>
                </div>
              </div>
            </div>

            <div class="dpc-actions">
              <a :href="activeProject.github" target="_blank" class="dpca-btn outline" title="View source code on GitHub">
                <i class="fab fa-github"></i> SOURCE CODE
              </a>
              <a
                v-if="activeProject.demo && activeProject.demo !== '#'"
                :href="activeProject.demo"
                target="_blank"
                class="dpca-btn primary"
                title="View live demo"
              >
                <i class="fas fa-external-link-alt"></i> LIVE DEMO
              </a>
            </div>

            <!-- PROJECT INQUIRY CTA -->
            <div class="dpc-inquiry-section">
              <div class="inquiry-divider"></div>
              <p class="inquiry-prompt">Want to build something similar for your business?</p>
              <a href="#contact" class="dpca-btn inquiry-cta">
                <i class="fas fa-envelope"></i> DISCUSS THIS PROJECT
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

/* ─── State ─────────────────────────────────────── */
const activeFilter = ref("All");
const activeProject = ref(null);
const sortBy = ref("featured");
const loading = ref(false);

/* ─── Static project definitions ────────────────── */
// Rich metadata for known projects; GitHub API fills in the rest
const knownProjects = [
  {
    repoName: "SeedSavers",
    title: "Seed Savers Network Kenya",
    description: "Dynamic website promoting seed sovereignty and community engagement with modern UI/UX principles and responsive design.",
    tech: ["HTML5", "TypeScript", "React.js", "Vite", "TailwindCSS"],
    category: "Web Development",
    demo: "https://njenga993.github.io/SeedSavers/",
    image: "/ssn.PNG",
    status: "live",
    priority: 1,
    features: ["Program & Project Pages", "News & Events Section", "Resource Library", "Donation Functionality", "Responsive Design", "SEO Optimized"],
  },
  {
    repoName: "INOFO-Africa-",
    title: "INOFO Africa",
    description: "Modern information website for a pan-African NGO, featuring clean architecture, performance optimisation and multilingual structure.",
    tech: ["HTML5", "TypeScript", "React.js", "CSS3"],
    category: "Web Development",
    demo: "https://njenga993.github.io/INOFO-Africa-/",
    image: "/inofo-africa.PNG",
    status: "live",
    priority: 2,
    features: ["Organizational Info Pages", "Membership Form", "Responsive Layout", "Performance Optimized"],
  },
  {
    repoName: "greania-build",
    title: "Greania Build",
    description: "Professional construction and interior design company website with stunning visuals and smooth Framer Motion animations.",
    tech: ["HTML5", "TypeScript", "React.js", "Framer Motion"],
    category: "Web Development",
    demo: "https://njenga993.github.io/greania-build/",
    image: "/greania-build.PNG",
    status: "live",
    priority: 3,
    features: ["Services Showcase", "Project Gallery", "Contact Form", "Scroll Animations"],
  },
  {
    repoName: "nyakazi-ecommerce-",
    title: "Nyakazi Organics E-commerce",
    description: "Full-featured e-commerce platform with seamless shopping experience, Redux state management and secure checkout flow.",
    tech: ["React.js", "TypeScript", "CSS3", "Redux"],
    category: "E-commerce",
    demo: "https://njenga993.github.io/nyakazi-ecommerce-/",
    image: "/Nyakazi-ecommerce.PNG",
    status: "live",
    priority: 4,
    features: ["Product Catalog", "Shopping Cart", "Order Management", "User Auth"],
  },
  {
    repoName: "nyakazi",
    title: "Nyakazi Corporate",
    description: "Corporate website showcasing company values, products, and services with elegant design and analytics integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "SEO"],
    category: "Web Development",
    demo: "https://nyakazi.org",
    image: "/Nyakazi.png",
    status: "live",
    priority: 5,
    features: ["Company Portfolio", "Contact Forms", "SEO Optimized", "Analytics"],
  },
  {
    repoName: "Firm-Desiderata",
    title: "Desiderata Consultancy",
    description: "Professional consultancy firm website with service portfolios, client testimonials, and Google Maps integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
    category: "Web Development",
    demo: "https://desiderataconsultancyfirm.com/",
    image: "/Desiderata.png",
    status: "live",
    priority: 6,
    features: ["Service Showcase", "Contact Integration", "Maps Integration"],
  },
  {
    repoName: "pos-project",
    title: "SaleHub POS System",
    description: "Multi-tenant SaaS Point of Sale system with inventory management, sales analytics and real-time reporting built for the Kenyan market.",
    tech: ["React", "TypeScript", "Django", "PostgreSQL"],
    category: "Full Stack",
    demo: "#",
    image: "/salehubPOS.png",
    status: "development",
    priority: 7,
    features: ["Inventory Management", "Sales Analytics", "User Authentication", "Real-time Updates"],
  },
  {
    repoName: "POS-System",
    title: "Django POS System",
    description: "Original Point of Sale system built with Python Django, featuring product management, sales tracking, and receipt generation.",
    tech: ["Python", "Django", "SQLite", "CSS3", "JavaScript"],
    category: "Full Stack",
    demo: "#",
    image: null,
    status: "development",
    priority: 8,
    features: ["Product Management", "Sales Tracking", "Receipt Generation", "Admin Dashboard"],
  },
  {
    repoName: "MnE",
    title: "M&E System",
    description: "Monitoring and Evaluation platform built with Django — tracks project activities, logframes, tasks, comments and generates performance reports.",
    tech: ["Python", "Django", "SQLite", "HTML5", "CSS3", "JavaScript"],
    category: "Full Stack",
    demo: "#",
    image: null,
    status: "development",
    priority: 9,
    features: ["Logframe Management", "Activity Tracking", "Task Management", "Comment Threads", "Report Generation", "Mobile API"],
  },
  {
    repoName: "Portfolio-",
    title: "React Portfolio v1",
    description: "Modern portfolio website showcasing professional experience and projects with interactive Framer Motion animations.",
    tech: ["React", "TypeScript", "Framer Motion", "CSS3"],
    category: "Frontend",
    demo: "https://njenga993.github.io/Portfolio-/",
    image: "/React_Portfolio.PNG",
    status: "live",
    priority: 10,
    features: ["Interactive Animations", "Project Showcase", "Skills Display"],
  },
  {
    repoName: "kspace",
    title: "KSpace Portfolio",
    description: "Current Vue.js + Vite portfolio site — the very site you are looking at. Premium dark design with terminal aesthetics and smooth transitions.",
    tech: ["Vue.js", "Vite", "CSS3", "JavaScript"],
    category: "Frontend",
    demo: "https://njenga993.github.io/kspace/",
    image: null,
    status: "live",
    priority: 11,
    features: ["Vue 3 Composition API", "Dark Theme", "Smooth Transitions", "Responsive Design"],
  },
  {
    repoName: "Techlungs",
    title: "Techlungs Technology",
    description: "High-engagement landing page for a tech company with smooth GSAP animations and interactive UI components.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    category: "Frontend",
    demo: "https://techlungs.co.ke/",
    image: "/Techlungs.png",
    status: "live",
    priority: 12,
    features: ["GSAP Animations", "Interactive UI", "Performance Optimized"],
  },
];

/* ─── Projects reactive list ─────────────────────── */
const projects = ref([...knownProjects]);

/* ─── Fetch live GitHub data ─────────────────────── */
onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch("https://api.github.com/users/Njenga993/repos?per_page=100&sort=updated&type=public");
    if (!res.ok) throw new Error("GitHub API error");
    const repos = await res.json();

    // Merge: update known entries with live GitHub data, add unknown repos
    const merged = [...knownProjects];
    const knownNames = knownProjects.map(p => p.repoName?.toLowerCase());

    repos.forEach(repo => {
      if (repo.fork) return; // skip forks
      const repoKey = repo.name.toLowerCase();
      const existingIdx = merged.findIndex(p => p.repoName?.toLowerCase() === repoKey);

      if (existingIdx > -1) {
        // Enrich existing entry
        merged[existingIdx] = {
          ...merged[existingIdx],
          stars: repo.stargazers_count || 0,
          language: repo.language,
          updatedAt: repo.updated_at,
          github: repo.html_url,
          description: merged[existingIdx].description || repo.description || "",
        };
      } else {
        // Add new repo not in known list
        if (!repo.name.includes("Njenga993") && repo.name !== ".github") {
          merged.push({
            repoName: repo.name,
            title: formatRepoName(repo.name),
            description: repo.description || "Open-source project by Kelvin Njenga.",
            tech: guessStack(repo.language, repo.topics || []),
            category: guessCategory(repo.name, repo.language, repo.topics || []),
            github: repo.html_url,
            demo: repo.homepage || "#",
            image: null,
            status: "development",
            stars: repo.stargazers_count || 0,
            language: repo.language,
            updatedAt: repo.updated_at,
            priority: 99,
            features: [],
          });
        }
      }
    });

    projects.value = merged;
  } catch (e) {
    console.warn("GitHub API fetch failed, using static data.", e);
  } finally {
    loading.value = false;
  }
});

/* ─── Helpers ────────────────────────────────────── */
function formatRepoName(name) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

function guessStack(lang, topics) {
  const stacks = {
    Python: ["Python", "Django", "SQLite"],
    JavaScript: ["JavaScript", "HTML5", "CSS3"],
    TypeScript: ["TypeScript", "React.js", "Vite"],
    Vue: ["Vue.js", "Vite", "CSS3"],
    PHP: ["PHP", "Laravel", "MySQL"],
    HTML: ["HTML5", "CSS3", "JavaScript"],
  };
  return stacks[lang] || [lang || "JavaScript"];
}

function guessCategory(name, lang, topics) {
  const n = name.toLowerCase();
  if (n.includes("ecommerce") || n.includes("shop") || n.includes("store")) return "E-commerce";
  if (n.includes("pos") || n.includes("system") || n.includes("mne") || n.includes("dashboard")) return "Full Stack";
  if (lang === "Python" || lang === "PHP") return "Full Stack";
  if (n.includes("portfolio")) return "Frontend";
  return "Web Development";
}

function getCategoryIcon(cat) {
  const icons = {
    "Web Development": "🌐",
    "E-commerce": "🛒",
    "Full Stack": "⚡",
    Frontend: "🎨",
    All: "✦",
  };
  return icons[cat] || "✦";
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-KE", { month: "short", year: "numeric" });
}

/* ─── Categories ─────────────────────────────────── */
const allCategories = [
  { label: "All", icon: "✦" },
  { label: "Web Development", icon: "🌐" },
  { label: "E-commerce", icon: "🛒" },
  { label: "Full Stack", icon: "⚡" },
  { label: "Frontend", icon: "🎨" },
];

const categories = computed(() =>
  allCategories.map(cat => ({
    ...cat,
    count:
      cat.label === "All"
        ? projects.value.length
        : projects.value.filter(p => p.category === cat.label).length,
  }))
);

/* ─── Sort options ──────────────────────────────── */
const sortOptions = [
  { val: "featured", label: "Featured" },
  { val: "stars", label: "Stars" },
  { val: "recent", label: "Recent" },
];

/* ─── Filtered & Sorted ─────────────────────────── */
const filteredSorted = computed(() => {
  let list =
    activeFilter.value === "All"
      ? [...projects.value]
      : projects.value.filter(p => p.category === activeFilter.value);

  if (sortBy.value === "stars") {
    list.sort((a, b) => (b.stars || 0) - (a.stars || 0));
  } else if (sortBy.value === "recent") {
    list.sort((a, b) => {
      if (!a.updatedAt && !b.updatedAt) return (a.priority || 99) - (b.priority || 99);
      if (!a.updatedAt) return 1;
      if (!b.updatedAt) return -1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  } else {
    // featured: by priority
    list.sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }

  return list;
});

/* ─── Computed stats ─────────────────────────────── */
const totalProjects = computed(() => projects.value.length);
const liveProjects = computed(() => projects.value.filter(p => p.status === "live").length);
const totalTechStacks = computed(() => {
  const s = new Set();
  projects.value.forEach(p => p.tech.forEach(t => s.add(t)));
  return s.size;
});
const totalStars = computed(() => projects.value.reduce((sum, p) => sum + (p.stars || 0), 0));

/* ─── Actions ────────────────────────────────────── */
const getCaseNum = project => {
  const idx = filteredSorted.value.findIndex(p => p.title === project.title);
  return String(idx + 1).padStart(2, "0");
};

const setFilter = cat => {
  activeFilter.value = cat;
  activeProject.value = null;
};

const openDrawer = project => {
  activeProject.value = project;
  document.body.style.overflow = "hidden";
};

const closeDrawer = () => {
  activeProject.value = null;
  document.body.style.overflow = "";
};
</script>

<style scoped>
/* ======================================================
   SECTION BASE
   ====================================================== */
.projects-premium {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
}

.projects-container {
  background: var(--bg-primary, #0b0f13);
  border: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
  border-radius: 2.5rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  box-shadow: var(--shadow-card, 0 18px 35px -12px rgba(0, 0, 0, 0.6));
}

/* ======================================================
   TOP BAR
   ====================================================== */
.projects-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
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

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border-default, rgba(201, 162, 59, 0.25));
}

.topbar-loading {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(201, 162, 59, 0.5);
}

.status-dot.pulse {
  animation: pulse-status 2s infinite;
}

@keyframes pulse-status {
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
    box-shadow: 0 0 8px rgba(201, 162, 59, 0.5);
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.2);
    box-shadow: 0 0 12px rgba(201, 162, 59, 0.8);
  }
}

.status-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-silver, #b0b8c1);
  letter-spacing: 0.15em;
}

/* Loading dots */
.loader-dots {
  display: flex;
  gap: 3px;
}
.loader-dots span {
  width: 4px;
  height: 4px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
  animation: dot-bounce 1.2s infinite ease-in-out;
}
.loader-dots span:nth-child(2) { animation-delay: 0.15s; }
.loader-dots span:nth-child(3) { animation-delay: 0.3s; }
@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* GitHub pill */
.github-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2rem;
  color: var(--text-silver, #b0b8c1);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 500;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.github-pill::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 2rem;
  background: linear-gradient(135deg, rgba(201, 162, 59, 0.2), rgba(201, 162, 59, 0.05));
  opacity: 0;
  transition: opacity 0.35s ease;
}

.github-pill:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
  background: rgba(201, 162, 59, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(201, 162, 59, 0.15);
}

.github-pill:hover::before {
  opacity: 1;
}

/* ======================================================
   MAIN SPLIT
   ====================================================== */
.projects-main {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 5rem;
  align-items: start;
}

/* ======================================================
   LEFT – TYPOGRAPHY + FILTERS
   ====================================================== */
.projects-type {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.projects-headline {
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

.projects-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  max-width: 480px;
  margin: 0;
}

/* Category Filters */
.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.9rem;
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 2rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 500;
  color: var(--text-silver);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.filter-badge::before {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  border-radius: 2rem;
  transition: background 0.3s ease;
}

.filter-badge:hover {
  border-color: var(--accent, #c9a23b);
  background: #1e262e;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(201, 162, 59, 0.1);
}

.filter-badge.active {
  background: var(--accent, #c9a23b);
  border-color: var(--accent, #c9a23b);
  color: #0b0f13;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(201, 162, 59, 0.25);
  transform: scale(1.02);
}

.fb-icon {
  font-size: 0.7rem;
}

.filter-count {
  font-size: 0.55rem;
  opacity: 0.7;
}

/* Sort control */
.sort-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sc-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.1em;
}

.sc-btn {
  padding: 0.3rem 0.65rem;
  background: none;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 0.05em;
  position: relative;
}

.sc-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--accent, #c9a23b);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.sc-btn:hover, .sc-btn.active {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
  background: rgba(201, 162, 59, 0.05);
  transform: translateY(-1px);
}

.sc-btn.active::after {
  width: 30px;
}

/* ======================================================
   RIGHT – FEATURED SHOWCASE
   ====================================================== */
.projects-showcase {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 420px;
}

/* Skeleton for showcase */
.showcase-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.sk-terminal, .sk-image, .sk-actions {
  background: linear-gradient(90deg, #141a20 25%, #1c2530 50%, #141a20 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 1.5rem;
  border: 1px solid var(--border-dark);
}
.sk-terminal { height: 100px; }
.sk-image { height: 220px; }
.sk-actions { height: 50px; border-radius: 0.5rem; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: all 0.22s ease;
}

.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.showcase-panel {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* Terminal */
.project-terminal {
  background: #0a0e12;
  border: 1px solid var(--border-dark);
  border-radius: 1.5rem;
  padding: 1.25rem 1.4rem 1rem;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: #b0bec5;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.project-terminal::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(201, 162, 59, 0.05), transparent);
  transition: left 0.6s ease;
}

.project-terminal:hover::before {
  left: 100%;
}

.project-terminal:hover {
  border-color: rgba(201, 162, 59, 0.45);
  box-shadow: 0 14px 28px rgba(201, 162, 59, 0.15), 0 8px 16px rgba(0, 0, 0, 0.8);
  transform: translateY(-2px);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.terminal-title {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.2);
}

.terminal-content {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.code-line {
  display: flex;
  gap: 0.5rem;
  font-size: 0.76rem;
  align-items: baseline;
}

.prompt {
  color: var(--accent, #c9a23b);
  font-weight: 600;
  flex-shrink: 0;
  min-width: 48px;
}

.accent-text  { color: var(--accent, #c9a23b); font-weight: 700; }
.dim-text     { color: rgba(255,255,255,0.2); }
.lang-text    { color: #64b5f6; }
.live-text    { 
  color: #22c55e; 
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.dev-text     { 
  color: #f59e0b;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.star-text    { color: #fbbf24; }

/* Featured image */
.featured-image {
  position: relative;
  cursor: pointer;
}

.fi-frame {
  position: relative;
  width: 100%;
}

.frame-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
  background: var(--bg-card, #141a20);
}

.frame-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) brightness(0.95);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-image:hover .frame-inner img {
  filter: grayscale(0%) brightness(1.05);
  transform: scale(1.06);
}

/* Placeholder when no image */
.frame-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #0d1117, #141c26);
}

.fp-icon { font-size: 3rem; opacity: 0.5; }
.fp-name {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.25);
  text-align: center;
  padding: 0 1rem;
}

.frame-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  pointer-events: none;
}

.frame-border {
  position: absolute;
  inset: -14px;
  border: 1px solid var(--border-dark);
  pointer-events: none;
  transition: border-color 0.4s ease;
}

.featured-image:hover .frame-border {
  border-color: var(--accent, #c9a23b);
  box-shadow: 0 0 20px rgba(201, 162, 59, 0.2);
}

.frame-corner {
  position: absolute;
  width: 36px;
  height: 36px;
  pointer-events: none;
}

.frame-corner-tl {
  top: -22px; left: -22px;
  border-top: 2px solid var(--accent, #c9a23b);
  border-left: 2px solid var(--accent, #c9a23b);
}

.frame-corner-br {
  bottom: -22px; right: -22px;
  border-bottom: 2px solid var(--accent, #c9a23b);
  border-right: 2px solid var(--accent, #c9a23b);
}

.fi-watermark {
  position: absolute;
  top: -20px;
  right: -10px;
  font-family: var(--font-heading);
  font-size: 5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  pointer-events: none;
  line-height: 1;
}

/* Featured Actions */
.featured-actions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fa-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 0;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.35s ease;
  width: fit-content;
}

.fa-btn.primary { border-bottom-color: var(--accent, #c9a23b); }

.btn-idx {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.05em;
}

.btn-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.08em;
}

.btn-arrow {
  display: flex;
  align-items: center;
  color: var(--accent, #c9a23b);
  font-size: 0.75rem;
  transition: transform 0.35s ease;
}

.fa-btn.primary:hover .btn-arrow { transform: translateX(6px); }

.fa-btn:hover {
  color: var(--accent, #c9a23b);
}

.fa-btn.secondary { border-bottom-color: var(--border-dark); }
.fa-btn.secondary .btn-idx { color: var(--text-dim); }
.fa-btn.secondary .btn-label { color: var(--text-muted); }

.fa-btn.secondary:hover {
  border-bottom-color: var(--accent, #c9a23b);
}
.fa-btn.secondary:hover .btn-idx,
.fa-btn.secondary:hover .btn-label {
  color: var(--accent, #c9a23b);
}

/* ======================================================
   PROJECT GRID
   ====================================================== */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.project-card {
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 1.2rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
}

.project-card:hover {
  border-color: var(--accent, #c9a23b);
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(201, 162, 59, 0.15), 0 8px 16px rgba(0, 0, 0, 0.6);
}

.project-card.card-featured {
  border-color: rgba(201, 162, 59, 0.15);
}

/* Stars badge */
.card-star-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  padding: 0.25rem 0.6rem;
  background: rgba(251, 191, 36, 0.95);
  border: 1.5px solid #fbbf24;
  border-radius: 0.4rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  color: #5a4a0a;
  font-weight: 800;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
  backdrop-filter: blur(4px);
}

/* Skeleton cards */
.sk-card {
  pointer-events: none;
}
.sk-visual {
  height: 160px;
  background: linear-gradient(90deg, #141a20 25%, #1c2530 50%, #141a20 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.sk-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.sk-line {
  height: 10px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
}
.sk-line.short { width: 40%; }
.sk-line.medium { width: 70%; }

/* PC visual */
.pc-visual {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.pc-frame {
  width: 100%;
  height: 100%;
}

.pc-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) brightness(0.85);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .pc-frame img {
  filter: grayscale(25%) brightness(1.1);
  transform: scale(1.08);
}

/* Placeholder */
.pc-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d1117, #141c26);
}
.pcp-icon { font-size: 2.5rem; opacity: 0.35; }

.pc-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(11, 15, 19, 0.85), rgba(11, 15, 19, 0.7));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(2px);
}

.project-card:hover .pc-overlay { 
  opacity: 1;
  transform: scale(1.02);
}

.pco-arrow {
  color: var(--accent, #c9a23b);
  font-size: 0.7rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover .pco-arrow {
  transform: translateX(4px) scale(1.2);
}

.pc-number {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);
}

.pc-status {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  background: rgba(11, 15, 19, 0.8);
  backdrop-filter: blur(4px);
}

.pcs-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: block;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.pc-status.live .pcs-dot { 
  background: #22c55e; 
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.7), inset 0 0 4px rgba(34, 197, 94, 0.5);
}
.pc-status.development .pcs-dot { 
  background: #f59e0b; 
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.7), inset 0 0 4px rgba(245, 158, 11, 0.5);
}

.pc-lang-badge {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  font-family: var(--font-heading);
  font-size: 0.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.15rem 0.4rem;
  background: rgba(11, 15, 19, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  letter-spacing: 0.05em;
}

.pc-info {
  padding: 1.1rem 1.25rem 1.25rem;
}

.pci-top { margin-bottom: 0.5rem; }

.pcit-cat {
  font-size: 0.55rem;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(201, 162, 59, 0.2);
}

.pci-title {
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0 0 0.45rem;
  line-height: 1.3;
}

.pci-desc {
  font-size: 0.76rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pci-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
}

.pcit-tag {
  padding: 0.22rem 0.45rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.58rem;
  color: var(--text-silver);
}

.pcit-more {
  font-size: 0.58rem;
  color: var(--accent, #c9a23b);
  font-weight: 600;
  padding: 0.22rem 0;
}

.pci-links {
  display: flex;
  gap: 0.5rem;
}

.pcil-link {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.68rem;
  transition: all 0.3s ease;
}

.pcil-link:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
  background: rgba(201, 162, 59, 0.1);
  transform: translateY(-2px);
}

/* ======================================================
   EMPTY STATE
   ====================================================== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem;
  border: 1px dashed rgba(255, 255, 255, 0.08);
}

.empty-icon { font-size: 2rem; color: var(--text-dim); }
.empty-text {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--text-dim);
  letter-spacing: 0.15em;
}

/* ======================================================
   BOTTOM BAR
   ====================================================== */
.projects-bottombar {
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
  flex-wrap: wrap;
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

.bottom-socials {
  display: flex;
  gap: 0.6rem;
}

.bottom-socials a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  border: 1px solid var(--border-dark);
  font-size: 0.85rem;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: rgba(255, 255, 255, 0.02);
}

.bottom-socials a::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201, 162, 59, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.bottom-socials a:hover {
  color: var(--accent, #c9a23b);
  border-color: var(--accent, #c9a23b);
  transform: translateY(-3px);
  background: rgba(201, 162, 59, 0.12);
  box-shadow: 0 8px 16px rgba(201, 162, 59, 0.2);
}

.bottom-socials a:hover::before {
  opacity: 1;
}

/* ======================================================
   DRAWER
   ====================================================== */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.drawer-panel {
  width: 480px;
  max-width: 95vw;
  height: 100%;
  background: var(--bg-primary, #0b0f13);
  border-left: 2px solid rgba(201, 162, 59, 0.3);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.6);
}

.dp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  background: var(--bg-primary);
  z-index: 2;
  gap: 0.75rem;
}

.dph-left {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.dphl-num {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
}

.dphl-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.dph-tags {
  display: flex;
  gap: 0.4rem;
  flex: 1;
}

.dph-lang {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border: 1px solid rgba(100, 181, 246, 0.4);
  color: #64b5f6;
  background: rgba(100, 181, 246, 0.08);
  border-radius: 0.3rem;
}

.dph-stars { 
  color: #fbbf24; 
  border-color: rgba(251, 191, 36, 0.5);
  background: rgba(251, 191, 36, 0.08);
  font-weight: 700;
  font-size: 0.58rem;
}

.dph-close {
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
  flex-shrink: 0;
}

.dph-close:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
}

.dp-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.dp-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dp-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #0d1117, #141c26);
}
.dpp-icon { font-size: 4rem; opacity: 0.3; }
.dpp-name {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.15);
  text-align: center;
  padding: 0 2rem;
}

.dpi-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.4rem 0.85rem;
  background: rgba(11, 15, 19, 0.92);
  backdrop-filter: blur(8px);
  border: 1.5px solid;
  border-radius: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.dpi-badge.live { 
  color: #22c55e; 
  border-color: rgba(34, 197, 94, 0.6);
  background: rgba(34, 197, 94, 0.1);
  box-shadow: 0 8px 16px rgba(34, 197, 94, 0.2), inset 0 0 12px rgba(34, 197, 94, 0.1);
}
.dpi-badge.development { 
  color: #f59e0b; 
  border-color: rgba(245, 158, 11, 0.6);
  background: rgba(245, 158, 11, 0.1);
  box-shadow: 0 8px 16px rgba(245, 158, 11, 0.2), inset 0 0 12px rgba(245, 158, 11, 0.1);
}

.dp-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dpc-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
  line-height: 1.2;
}

.dpc-meta {
  font-size: 0.72rem;
  color: var(--text-dim);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.dpcm-sep { 
  color: var(--text-muted);
  font-weight: 300;
}

.dpc-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

.dpc-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(201, 162, 59, 0.1);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.dpc-section:hover {
  background: rgba(201, 162, 59, 0.05);
  border-color: rgba(201, 162, 59, 0.2);
}

.dpcs-title {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.12em;
  padding-bottom: 0.75rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent, #c9a23b);
  position: relative;
}

.dpcs-title::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--accent, #c9a23b), transparent);
}

.dpcs-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.dpcs-chip {
  padding: 0.35rem 0.65rem;
  border: 1px solid rgba(201, 162, 59, 0.25);
  border-radius: 0.35rem;
  background: rgba(201, 162, 59, 0.05);
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-silver);
  transition: all 0.3s ease;
}

.dpcs-chip:hover {
  background: rgba(201, 162, 59, 0.15);
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
  transform: translateY(-2px);
}

.dpcs-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dpcsf-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.4rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(201, 162, 59, 0.1);
  transition: all 0.3s ease;
}

.dpcsf-item:hover {
  background: rgba(201, 162, 59, 0.08);
  border-color: rgba(201, 162, 59, 0.3);
  transform: translateX(4px);
}

.dpcsfi-num {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 800;
  color: var(--accent, #c9a23b);
  min-width: 20px;
  padding-top: 0.05rem;
}

.dpcsf-item span:last-child {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
  font-weight: 500;
}

.dpc-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.dpc-inquiry-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.25rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.inquiry-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(201, 162, 59, 0.3), transparent);
  margin-top: 0.5rem;
}

.inquiry-prompt {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin: 0;
  font-style: italic;
  letter-spacing: 0.02em;
}

.dpca-btn.inquiry-cta {
  background: linear-gradient(135deg, rgba(201, 162, 59, 0.15), rgba(201, 162, 59, 0.08));
  border: 1px solid rgba(201, 162, 59, 0.4);
  color: var(--accent, #c9a23b);
  font-weight: 700;
}

.dpca-btn.inquiry-cta:hover {
  background: linear-gradient(135deg, rgba(201, 162, 59, 0.25), rgba(201, 162, 59, 0.15));
  border-color: var(--accent, #c9a23b);
  color: var(--text-white);
  box-shadow: 0 8px 16px rgba(201, 162, 59, 0.15);
}

.dpca-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.65rem;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.dpca-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.dpca-btn:hover::before {
  width: 300px;
  height: 300px;
}

.dpca-btn.primary { 
  background: var(--accent, #c9a23b); 
  color: #0b0f13;
  box-shadow: 0 6px 12px rgba(201, 162, 59, 0.2);
}
.dpca-btn.primary:hover { 
  background: #dbb24a;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(201, 162, 59, 0.35);
}

.dpca-btn.outline { 
  border: 1px solid rgba(255, 255, 255, 0.12); 
  color: var(--text-muted);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.dpca-btn.outline:hover { 
  border-color: var(--accent, #c9a23b); 
  color: var(--accent, #c9a23b);
  background: rgba(201, 162, 59, 0.08);
  transform: translateY(-2px);
}

/* Drawer transitions */
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.3s ease; }
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel { transform: translateX(100%); }

/* ======================================================
   PROJECT INQUIRY SECTION
   ====================================================== */
.projects-inquiry {
  background: linear-gradient(135deg, rgba(201, 162, 59, 0.08), rgba(201, 162, 59, 0.04));
  border: 1px solid rgba(201, 162, 59, 0.2);
  border-radius: 1.25rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.projects-inquiry::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 100% 0%, rgba(201, 162, 59, 0.1), transparent 60%);
  pointer-events: none;
}

.inquiry-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.inquiry-text {
  flex: 1;
  min-width: 250px;
}

.inquiry-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;
}

.inquiry-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.inquiry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.95rem 1.8rem;
  background: var(--accent, #c9a23b);
  color: #0b0f13;
  border: 2px solid var(--accent, #c9a23b);
  border-radius: 0.8rem;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.08em;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;
}

.inquiry-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 0.6rem;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.inquiry-btn:hover {
  background: #dbb24a;
  border-color: #dbb24a;
  transform: translateX(4px);
  box-shadow: 0 8px 16px rgba(201, 162, 59, 0.3);
}

.inquiry-btn:hover::before {
  opacity: 1;
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-arrow {
  position: relative;
  z-index: 2;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.inquiry-btn:hover .btn-arrow {
  transform: translateX(3px);
}

/* ======================================================
   ACCESSIBILITY & FOCUS STATES
   ====================================================== */
button, a {
  outline: none;
}

button:focus-visible, a:focus-visible {
  outline: 2px solid var(--accent, #c9a23b);
  outline-offset: 2px;
}

.filter-badge:focus-visible,
.sc-btn:focus-visible,
.pcil-link:focus-visible,
.inquiry-btn:focus-visible,
.dpca-btn:focus-visible {
  outline: 2px solid var(--accent, #c9a23b);
  outline-offset: 2px;
}

/* ======================================================
   SMOOTH SCROLL BEHAVIOR
   ====================================================== */
html {
  scroll-behavior: smooth;
}

/* ======================================================
   BACKDROP FILTER SUPPORT
   ====================================================== */
@supports not (backdrop-filter: blur(8px)) {
  .drawer-backdrop {
    background: rgba(0, 0, 0, 0.9);
  }
  .inquiry-divider {
    background: rgba(201, 162, 59, 0.3);
  }
}

/* ======================================================
   RESPONSIVE
   ====================================================== */
@media (max-width: 1024px) {
  .projects-main { grid-template-columns: 1fr; gap: 3rem; }
  .projects-premium { padding: 2rem; }
  .projects-container { padding: 2rem; }
  .fa-btn { font-size: 0.7rem; }
}

@media (max-width: 768px) {
  .projects-premium { padding: 1.5rem; }
  .projects-container { padding: 1.5rem; border-radius: 1.5rem; gap: 2rem; }
  .t-line { font-size: clamp(2rem, 7vw, 3rem); }
  .t-outline { -webkit-text-stroke-width: 0.8px; }
  .project-grid { grid-template-columns: 1fr; }
  .projects-bottombar { flex-direction: column; align-items: stretch; gap: 1.25rem; }
  .bottom-socials { justify-content: center; }
  .drawer-panel { width: 100%; border-left: none; border-top: 2px solid rgba(201, 162, 59, 0.3); }
  .inquiry-content { flex-direction: column; align-items: stretch; gap: 1.25rem; }
  .inquiry-btn { width: 100%; justify-content: center; }
  .projects-main { gap: 2rem; }
  .projects-showcase { min-height: 300px; }
  .projects-type { gap: 1.25rem; }
}

@media (max-width: 640px) {
  .projects-premium { padding: 1rem; }
  .projects-container { padding: 1.25rem; border-radius: 1rem; gap: 1.5rem; }
  .t-line { font-size: clamp(1.5rem, 6vw, 2.2rem); }
  .projects-desc { font-size: 0.85rem; max-width: 100%; }
  .category-filters { gap: 0.35rem; }
  .filter-badge { padding: 0.35rem 0.7rem; font-size: 0.6rem; }
  .dpc-actions { flex-direction: column; }
  .dpc-inquiry-section { gap: 0.5rem; }
  .project-grid { grid-template-columns: 1fr; }
  .dp-content { padding: 1.25rem; }
  .dpc-title { font-size: 1.1rem; }
  .projects-inquiry { padding: 1.25rem; border-radius: 0.75rem; }
  .inquiry-title { font-size: 1rem; }
  .inquiry-desc { font-size: 0.75rem; }
  .inquiry-btn { padding: 0.75rem 1rem; font-size: 0.6rem; }
  .projects-topbar { flex-direction: column; align-items: stretch; gap: 0.75rem; }
  .topbar-right { justify-content: flex-start; flex-wrap: wrap; }
}

@media (max-width: 480px) {
  .projects-premium { padding: 0.75rem; }
  .projects-container { padding: 1rem; border-radius: 0.75rem; }
  .t-line { font-size: clamp(1.3rem, 5vw, 2rem); }
  .t-outline { -webkit-text-stroke-width: 0.5px; }
  .projects-desc { font-size: 0.8rem; }
  .category-filters { flex-direction: column; }
  .filter-badge { width: 100%; justify-content: center; }
  .sort-control { flex-direction: column; width: 100%; gap: 0.35rem; }
  .sc-btn { width: 100%; padding: 0.4rem 0.5rem; font-size: 0.55rem; }
  .featured-image { aspect-ratio: 4/5; }
  .fi-watermark { font-size: 3rem; top: -10px; right: -5px; }
  .fa-btn { padding: 0.6rem 0.5rem; font-size: 0.6rem; }
  .btn-label { font-size: 0.65rem; }
  .project-grid { grid-template-columns: 1fr; gap: 0.75rem; }
  .project-card { border-radius: 0.75rem; }
  .pc-frame { aspect-ratio: 1/1; }
  .pci-title { font-size: 0.8rem; }
  .dp-header { padding: 1.25rem 1rem; gap: 0.5rem; }
  .dphl-num { font-size: 0.85rem; }
  .dph-close { width: 32px; height: 32px; }
  .dp-image { aspect-ratio: 4/5; }
  .dp-content { padding: 1rem; gap: 1rem; }
  .dpc-title { font-size: 1rem; margin-bottom: 0.25rem; }
  .dpc-meta { font-size: 0.65rem; }
  .dpc-desc { font-size: 0.8rem; }
  .dpc-section { gap: 0.5rem; padding: 0.6rem; }
  .dpcs-features { gap: 0.4rem; }
  .dpcsf-item { gap: 0.5rem; padding: 0.5rem; }
  .dpcsfi-num { font-size: 0.55rem; }
  .dpcsf-item span:last-child { font-size: 0.75rem; }
  .dpcs-chip { padding: 0.25rem 0.5rem; font-size: 0.6rem; }
  .dpc-actions { gap: 0.5rem; }
  .dpca-btn { padding: 0.55rem 0.5rem; font-size: 0.55rem; }
  .dpc-inquiry-section { padding-top: 0.75rem; gap: 0.5rem; margin-top: 0.25rem; }
  .inquiry-prompt { font-size: 0.7rem; }
  .dpca-btn.inquiry-cta { padding: 0.5rem; }
  .projects-inquiry { padding: 1rem; gap: 0.75rem; }
  .inquiry-title { font-size: 0.95rem; margin-bottom: 0.3rem; }
  .inquiry-desc { font-size: 0.7rem; line-height: 1.5; }
  .inquiry-btn { padding: 0.65rem 1rem; font-size: 0.55rem; }
  .bottom-stats { flex-direction: column; width: 100%; }
  .b-stat { flex-direction: column; gap: 0.25rem; }
  .b-stat-num { font-size: 1.3rem; }
  .b-stat-label { font-size: 0.5rem; }
  .b-stat-sep { display: none; }
}
</style>