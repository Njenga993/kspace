<template>
  <section id="experience" class="experience">
    <!-- Dot pattern background (consistent with hero) -->
    <div class="exp-bg">
      <div class="exp-dots"></div>
    </div>

    <div class="exp-container">
      <!-- Section Header -->
      <div class="exp-header">
        <div class="header-row">
          <span class="header-num">03</span>
          <span class="header-line"></span>
          <span class="header-label">EXPERIENCE</span>
        </div>
        <h2 class="exp-title">
          Professional<br /><span class="accent">Evolution</span>
        </h2>
        <p class="exp-subtitle">
          From foundational training to leadership roles — my path in tech
        </p>
      </div>

      <!-- Stats Strip -->
      <div class="stats-strip">
        <div class="ss-item">
          <span class="ss-val">{{ totalYears }}</span>
          <span class="ss-label">YEARS</span>
        </div>
        <span class="ss-sep">/</span>
        <div class="ss-item">
          <span class="ss-val">{{ totalProjects }}+</span>
          <span class="ss-label">PROJECTS</span>
        </div>
        <span class="ss-sep">/</span>
        <div class="ss-item">
          <span class="ss-val">{{ uniqueSkills }}</span>
          <span class="ss-label">TECHNOLOGIES</span>
        </div>
        <span class="ss-sep">/</span>
        <div class="ss-item">
          <span class="ss-val">100%</span>
          <span class="ss-label">RETENTION</span>
        </div>
      </div>

      <!-- Filters -->
      <div class="exp-filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="setFilter(filter.value)"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Experience Display: Rail + Content -->
      <div class="exp-display">
        <!-- Left: Vertical Rail -->
        <div class="exp-rail">
          <div
            v-for="(exp, idx) in filteredExperiences"
            :key="exp.id"
            :class="['rail-node', { active: activeTimelineNode === idx }]"
            @click="activeTimelineNode = idx"
          >
            <div class="rail-year">{{ exp.period.split(" - ")[0] }}</div>
            <div class="rail-track"></div>
            <div class="rail-dot"></div>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="exp-body">
          <Transition name="slide" mode="out-in">
            <div :key="currentExp.id" class="exp-file">
              <!-- File Header -->
              <div class="file-header">
                <div class="file-id">
                  <span class="file-id-num"
                    >NO.
                    {{ String(activeTimelineNode + 1).padStart(2, "0") }}</span
                  >
                  <span
                    class="file-id-cat"
                    :class="currentExp.category.toLowerCase()"
                  >
                    {{ currentExp.category }}
                  </span>
                </div>
                <div class="file-period">{{ currentExp.period }}</div>
              </div>

              <!-- Title Block -->
              <div class="file-title-block">
                <div class="ftb-icon" :style="{ background: currentExp.color }">
                  <i :class="getIconClass(currentExp.category)"></i>
                </div>
                <div>
                  <h3 class="ftb-role">{{ currentExp.title }}</h3>
                  <span class="ftb-company">{{ currentExp.company }}</span>
                </div>
              </div>

              <p class="file-desc">{{ currentExp.description }}</p>

              <!-- Metrics -->
              <div class="file-metrics">
                <div
                  v-for="metric in currentExp.metrics"
                  :key="metric.label"
                  class="fm-item"
                >
                  <span class="fm-val">{{ metric.value }}</span>
                  <span class="fm-label">{{ metric.label }}</span>
                </div>
              </div>

              <!-- Achievements -->
              <div class="file-section">
                <div class="fs-title">ACHIEVEMENTS</div>
                <div class="fs-list">
                  <div
                    v-for="a in currentExp.achievements"
                    :key="a"
                    class="fs-item"
                  >
                    <div class="fs-marker"></div>
                    <span>{{ a }}</span>
                  </div>
                </div>
              </div>

              <!-- Skills -->
              <div class="file-section">
                <div class="fs-title">SKILLS & TECHNOLOGIES</div>
                <div class="fs-tags">
                  <span
                    v-for="skill in getAllSkills(currentExp)"
                    :key="skill"
                    class="fs-tag"
                    >{{ skill }}</span
                  >
                </div>
              </div>

              <!-- Challenges -->
              <div v-if="currentExp.challenges" class="file-section">
                <div class="fs-title">CHALLENGES OVERCOME</div>
                <div class="fs-list">
                  <div
                    v-for="c in currentExp.challenges"
                    :key="c"
                    class="fs-item"
                  >
                    <i class="fas fa-trophy fs-trophy"></i>
                    <span>{{ c }}</span>
                  </div>
                </div>
              </div>

              <!-- Expand Toggle -->
              <button class="file-expand" @click="toggleDetails(currentExp.id)">
                <span class="fe-text">{{
                  isExpanded(currentExp.id) ? "COLLAPSE" : "FULL REPORT"
                }}</span>
                <i
                  :class="
                    isExpanded(currentExp.id) ? 'fas fa-minus' : 'fas fa-plus'
                  "
                ></i>
              </button>

              <!-- Expanded Content -->
              <Transition name="expand">
                <div v-if="isExpanded(currentExp.id)" class="file-expanded">
                  <div class="fe-columns">
                    <div class="fe-col">
                      <div class="fe-col-title">TECHNOLOGIES USED</div>
                      <div
                        v-for="(skills, cat) in currentExp.skillCategories"
                        :key="cat"
                        class="fe-cat"
                      >
                        <div class="fe-cat-name">{{ cat }}</div>
                        <div class="fe-cat-tags">
                          <span
                            v-for="s in skills"
                            :key="s"
                            class="fe-cat-tag"
                            >{{ s }}</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="fe-col">
                      <div class="fe-col-title">IMPACT METRICS</div>
                      <div class="fe-impact">
                        <div
                          v-for="metric in currentExp.metrics"
                          :key="metric.label"
                          class="fe-impact-row"
                        >
                          <div class="fe-impact-label">
                            {{ metric.label }}
                          </div>
                          <div class="fe-impact-bar">
                            <div
                              class="fe-impact-fill"
                              :style="{
                                width: getImpactPercentage(metric.value),
                              }"
                            ></div>
                          </div>
                          <div class="fe-impact-val">{{ metric.value }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Navigation -->
      <div class="exp-nav">
        <button
          @click="prevExperience"
          :disabled="activeTimelineNode === 0"
          class="en-btn"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="en-counter">
          <span class="en-current">{{
            String(activeTimelineNode + 1).padStart(2, "0")
          }}</span>
          <span class="en-sep">/</span>
          <span class="en-total">{{
            String(filteredExperiences.length).padStart(2, "0")
          }}</span>
        </div>
        <button
          @click="nextExperience"
          :disabled="activeTimelineNode === filteredExperiences.length - 1"
          class="en-btn"
        >
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const activeFilter = ref("All");
const activeTimelineNode = ref(0);
const expandedItems = ref([]);

const filters = [
  { label: "ALL", value: "All" },
  { label: "DEVELOPMENT", value: "Development" },
  { label: "INTERNSHIP", value: "Internship" },
];

const experiences = [
  {
    id: 1,
    title: "Developer & Digital Manager",
    company: "Nyakazi Organics",
    period: "2024 - Present",
    duration: 1,
    category: "Development",
    color: "#FF5E00",
    description:
      "Leading digital transformation and full-stack development for an organic food company, overseeing all digital solutions from branding to systems development.",
    metrics: [
      { value: "150%", label: "Sales Increase" },
      { value: "40%", label: "Faster Checkout" },
      { value: "95+", label: "Lighthouse Score" },
    ],
    achievements: [
      "Developed a fully functional POS system using React and Django that reduced checkout times by 40%",
      "Designed and implemented comprehensive company branding across all digital platforms",
      "Optimized website performance, achieving 95+ Lighthouse scores across all metrics",
      "Managed digital marketing campaigns that increased social media engagement by 200%",
    ],
    skillCategories: {
      Frontend: ["React", "JavaScript", "CSS3", "HTML5", "TypeScript"],
      Backend: ["Django", "Python", "PostgreSQL", "REST APIs"],
      Design: ["Figma", "Branding", "UI/UX", "Responsive Design"],
    },
    challenges: [
      "Integrating legacy systems with modern POS solution while maintaining data integrity",
      "Training non-technical staff on digital tools and workflows",
      "Balancing multiple projects with competing deadlines",
    ],
  },
  {
    id: 2,
    title: "Junior Developer",
    company: "Desiderata Consultancy",
    period: "2023 - 2024",
    duration: 1,
    category: "Development",
    color: "#06d6a0",
    description:
      "Built solutions for diverse client needs across multiple industries with a focus on web applications and data visualization.",
    metrics: [
      { value: "15+", label: "Projects" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "60%", label: "Performance Boost" },
    ],
    achievements: [
      "Created responsive UI layouts for corporate clients using modern CSS techniques",
      "Developed Laravel-based admin dashboards with complex data visualization",
      "Implemented RESTful APIs that improved system integration efficiency by 35%",
      "Reduced average page load times by 60% through strategic performance optimization",
    ],
    skillCategories: {
      Backend: ["Laravel", "PHP", "MySQL", "API Development"],
      Frontend: ["JavaScript", "Bootstrap", "jQuery", "AJAX"],
      Data: ["Chart.js", "DataTables", "Excel Integration"],
    },
    challenges: [
      "Working with diverse client requirements and tight deadlines simultaneously",
      "Optimizing performance for data-heavy applications with large datasets",
      "Ensuring cross-browser compatibility for legacy systems",
    ],
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "Techlungs Technology",
    period: "2022 - 2023",
    duration: 1,
    category: "Development",
    color: "#f72585",
    description:
      "Specialized in creating engaging frontend experiences for SaaS products and high-conversion marketing sites.",
    metrics: [
      { value: "20+", label: "Landing Pages" },
      { value: "8%", label: "Conversion Rate" },
      { value: "45%", label: "Bundle Reduction" },
    ],
    achievements: [
      "Built 20+ high-converting landing pages with conversion rates reaching up to 8%",
      "Implemented smooth animations and micro-interactions that improved user engagement by 40%",
      "Reduced CSS bundle size by 45% through strategic optimization and code splitting",
      "Collaborated with designers to create reusable component library",
    ],
    skillCategories: {
      Frontend: ["HTML5", "CSS3", "JavaScript", "GSAP", "SASS"],
      Tools: ["Webpack", "Git", "Figma", "Chrome DevTools"],
      Design: ["UI/UX", "Design Systems", "Responsive Design", "Animation"],
    },
    challenges: [
      "Balancing rich animations with performance requirements",
      "Maintaining consistency across multiple landing pages",
    ],
  },
  {
    id: 4,
    title: "ICT Intern",
    company: "KNLS & Immigration Dept",
    period: "2021 - 2022",
    duration: 1,
    category: "Internship",
    color: "#fb8500",
    description:
      "Gained foundational IT experience across two government departments, working with diverse technology stacks and legacy systems.",
    metrics: [
      { value: "15+", label: "Hours Saved Weekly" },
      { value: "50+", label: "Staff Supported" },
    ],
    achievements: [
      "Automated catalog update processes, saving 15+ hours of manual work weekly",
      "Documented comprehensive network infrastructure for future upgrade planning",
      "Provided technical support to 50+ staff members across multiple departments",
      "Assisted in migrating legacy data to modern database systems",
    ],
    skillCategories: {
      "IT Support": [
        "Technical Support",
        "Troubleshooting",
        "Hardware Maintenance",
      ],
      Systems: [
        "Network Documentation",
        "Data Migration",
        "System Administration",
      ],
      Software: ["MS Office", "Database Management", "Ticketing Systems"],
    },
    challenges: [
      "Working with outdated legacy systems and limited resources",
      "Adapting to strict government protocols and procedures",
    ],
  },
];

const currentExp = computed(
  () => filteredExperiences.value[activeTimelineNode.value],
);

const filteredExperiences = computed(() => {
  if (activeFilter.value === "All") return experiences;
  return experiences.filter((e) => e.category === activeFilter.value);
});

const totalYears = computed(() => {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
});

const totalProjects = computed(() => {
  return experiences.reduce((total, exp) => {
    const projectMetric = exp.metrics.find(
      (m) => m.label.includes("Project") || m.label === "Projects",
    );
    if (projectMetric) {
      const value = parseInt(projectMetric.value);
      return total + (isNaN(value) ? 5 : value);
    }
    return total + 5;
  }, 0);
});

const uniqueSkills = computed(() => {
  const skillsSet = new Set();
  experiences.forEach((exp) => {
    Object.values(exp.skillCategories).forEach((category) => {
      category.forEach((skill) => skillsSet.add(skill));
    });
  });
  return skillsSet.size;
});

const setFilter = (val) => {
  activeFilter.value = val;
  activeTimelineNode.value = 0;
};

const getAllSkills = (exp) => {
  const skills = [];
  Object.values(exp.skillCategories).forEach((category) => {
    skills.push(...category);
  });
  return skills.slice(0, 8);
};

const getImpactPercentage = (value) => {
  const num = parseInt(value);
  if (value.includes("%")) return Math.min(num, 100) + "%";
  if (num > 100) return "100%";
  return num + "%";
};

const prevExperience = () => {
  if (activeTimelineNode.value > 0) activeTimelineNode.value--;
};

const nextExperience = () => {
  if (activeTimelineNode.value < filteredExperiences.value.length - 1)
    activeTimelineNode.value++;
};

const toggleDetails = (id) => {
  const index = expandedItems.value.indexOf(id);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(id);
  }
};

const isExpanded = (id) => expandedItems.value.includes(id);

const getIconClass = (category) => {
  return category === "Development" ? "fas fa-code" : "fas fa-graduation-cap";
};
</script>

<style scoped>
/* ==============================
   SECTION
   ============================== */
.experience {
  position: relative;
  padding: 5rem 2rem;
  background: var(--bg-primary);
  overflow: hidden;
}

/* Background dots — same pattern as hero */
.exp-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.exp-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--border-default) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.08;
}

.exp-container {
  position: relative;
  z-index: 1;
  max-width: 1060px;
  margin: 0 auto;
}

/* ==============================
   HEADER — LEFT ALIGNED
   ============================== */
.exp-header {
  margin-bottom: 2.5rem;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.header-num {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.12em;
}

.header-line {
  width: 48px;
  height: 1px;
  background: var(--border-default);
}

.header-label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.2em;
}

.exp-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  color: var(--text-white);
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0 0 0.75rem;
}

.exp-title .accent {
  color: var(--accent);
}

.exp-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  max-width: 440px;
}

/* ==============================
   STATS STRIP — matches hero bottom bar
   ============================== */
.stats-strip {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 1.25rem 0;
  margin-bottom: 2rem;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
}

.ss-item {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
}

.ss-val {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent);
}

.ss-label {
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.ss-sep {
  color: var(--border-default);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0.15rem;
}

/* ==============================
   FILTERS — underline style
   ============================== */
.exp-filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.5rem 0;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  color: var(--text-silver);
}

.filter-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 600;
}

/* ==============================
   DISPLAY — RAIL + CONTENT
   ============================== */
.exp-display {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

/* ==============================
   VERTICAL RAIL
   ============================== */
.exp-rail {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
}

/* Continuous vertical line behind dots */
.exp-rail::before {
  content: "";
  position: absolute;
  left: 38px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--border-dark);
}

.rail-node {
  display: flex;
  align-items: center;
  gap: 0;
  cursor: pointer;
  padding: 0.6rem 0;
  position: relative;
}

.rail-year {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.04em;
  width: 32px;
  text-align: right;
  flex-shrink: 0;
  transition: color 0.25s;
}

.rail-node.active .rail-year {
  color: var(--accent);
}

.rail-track {
  width: 12px;
  flex-shrink: 0;
}

.rail-dot {
  width: 9px;
  height: 9px;
  border: 2px solid var(--border-default);
  background: var(--bg-primary);
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.rail-node.active .rail-dot {
  border-color: var(--accent);
  background: var(--accent);
  transform: scale(1.25);
}

.rail-node:hover .rail-dot {
  border-color: var(--accent);
}

.rail-node:hover .rail-year {
  color: var(--text-silver);
}

/* ==============================
   CONTENT BODY
   ============================== */
.exp-body {
  min-height: 400px;
}

/* ==============================
   FILE CARD — DOSSIER STYLE
   ============================== */
.exp-file {
  border: 1px solid var(--border-dark);
  padding: 1.75rem;
  background: var(--bg-card);
}

/* File header */
.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-dark);
}

.file-id {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-id-num {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.file-id-cat {
  padding: 0.2rem 0.6rem;
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.file-id-cat.development {
  background: rgba(255, 94, 0, 0.12);
  color: var(--accent);
}

.file-id-cat.internship {
  background: rgba(251, 133, 0, 0.12);
  color: #fb8500;
}

.file-period {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
}

/* Title block */
.file-title-block {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.ftb-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #000;
  flex-shrink: 0;
}

.ftb-role {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin: 0 0 0.2rem;
  line-height: 1.2;
}

.ftb-company {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Description */
.file-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

/* ==============================
   METRICS — large accent numbers
   ============================== */
.file-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
}

.fm-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.fm-val {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}

.fm-label {
  font-family: var(--font-heading);
  font-size: 0.52rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  text-align: center;
}

/* ==============================
   FILE SECTIONS (achievements, skills, challenges)
   ============================== */
.file-section {
  margin-bottom: 1.5rem;
}

.file-section:last-of-type {
  margin-bottom: 1.25rem;
}

.fs-title {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.16em;
  margin-bottom: 0.85rem;
}

/* List items */
.fs-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.fs-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.fs-marker {
  width: 5px;
  height: 5px;
  background: var(--accent);
  margin-top: 0.55rem;
  flex-shrink: 0;
}

.fs-trophy {
  color: var(--accent);
  font-size: 0.72rem;
  margin-top: 0.3rem;
  flex-shrink: 0;
  width: 5px;
  text-align: center;
}

.fs-item span {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

/* Skill tags — bordered pills (matches about section) */
.fs-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.fs-tag {
  padding: 0.32rem 0.65rem;
  border: 1px solid var(--border-dark);
  font-size: 0.78rem;
  color: var(--text-silver);
  transition: all 0.2s;
}

.fs-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ==============================
   EXPAND BUTTON
   ============================== */
.file-expand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  border-bottom: 1px solid var(--border-default);
  padding: 0.6rem 0;
  cursor: pointer;
  transition: all 0.25s ease;
}

.fe-text {
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  transition: color 0.25s;
}

.file-expand i {
  font-size: 0.6rem;
  color: var(--text-dim);
  transition: color 0.25s;
}

.file-expand:hover {
  border-bottom-color: var(--accent);
}

.file-expand:hover .fe-text,
.file-expand:hover i {
  color: var(--accent);
}

/* ==============================
   EXPANDED CONTENT
   ============================== */
.file-expanded {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-dark);
  margin-top: 0.25rem;
}

.fe-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.fe-col-title {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.16em;
  margin-bottom: 1rem;
}

.fe-cat {
  margin-bottom: 1rem;
}

.fe-cat:last-child {
  margin-bottom: 0;
}

.fe-cat-name {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-silver);
  margin-bottom: 0.4rem;
}

.fe-cat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.fe-cat-tag {
  padding: 0.2rem 0.55rem;
  background: var(--bg-elevated);
  font-size: 0.72rem;
  color: var(--text-muted);
}

/* Impact bars */
.fe-impact {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fe-impact-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fe-impact-label {
  font-size: 0.68rem;
  color: var(--text-dim);
  min-width: 90px;
  flex-shrink: 0;
}

.fe-impact-bar {
  flex: 1;
  height: 3px;
  background: var(--border-dark);
  overflow: hidden;
}

.fe-impact-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.6s ease;
}

.fe-impact-val {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  min-width: 45px;
  text-align: right;
  flex-shrink: 0;
}

/* ==============================
   NAVIGATION — counter style
   ============================== */
.exp-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.en-btn {
  width: 40px;
  height: 40px;
  background: none;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.25s ease;
}

.en-btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.en-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.en-counter {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  min-width: 60px;
  justify-content: center;
}

.en-current {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
}

.en-sep {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--text-dim);
  font-weight: 300;
}

.en-total {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-dim);
}

/* ==============================
   TRANSITIONS
   ============================== */
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.expand-enter-active,
.expand-leave-active {
  transition:
    opacity 0.3s ease,
    max-height 0.35s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 600px;
}

/* ==============================
   REDUCED MOTION
   ============================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ==============================
   RESPONSIVE — TABLET
   ============================== */
@media (max-width: 900px) {
  .exp-display {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .exp-rail {
    flex-direction: row;
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 0;
  }

  .exp-rail::-webkit-scrollbar {
    display: none;
  }

  .exp-rail::before {
    top: 50%;
    left: 0;
    right: 0;
    bottom: auto;
    width: auto;
    height: 1px;
  }

  .rail-node {
    flex-direction: column;
    padding: 0.5rem 0.75rem;
    min-width: 72px;
    align-items: center;
    gap: 0.4rem;
  }

  .rail-year {
    width: auto;
    text-align: center;
    order: 1;
    font-size: 0.58rem;
  }

  .rail-track {
    display: none;
  }

  .rail-dot {
    order: 0;
  }

  .fe-columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .file-metrics {
    gap: 1rem;
  }

  .fm-val {
    font-size: 1.4rem;
  }
}

/* ==============================
   RESPONSIVE — MOBILE
   ============================== */
@media (max-width: 768px) {
  .experience {
    padding: 3rem 1.25rem;
  }

  .exp-title {
    font-size: clamp(1.8rem, 6vw, 2.5rem);
  }

  .exp-subtitle {
    font-size: 0.85rem;
  }

  .stats-strip {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ss-sep {
    display: none;
  }

  .ss-item {
    flex: 0 0 auto;
    padding-right: 1rem;
    margin-right: 0.5rem;
    border-right: 1px solid var(--border-dark);
  }

  .ss-item:last-child {
    border-right: none;
  }

  .ss-val {
    font-size: 1.1rem;
  }

  .exp-filters {
    gap: 1.5rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 0.25rem;
  }

  .exp-filters::-webkit-scrollbar {
    display: none;
  }

  .filter-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .exp-file {
    padding: 1.25rem;
  }

  .file-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .file-metrics {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .fm-item {
    flex: 0 0 calc(50% - 0.5rem);
  }
}

/* ==============================
   RESPONSIVE — SMALL MOBILE
   ============================== */
@media (max-width: 480px) {
  .experience {
    padding: 2.5rem 1rem;
  }

  .exp-file {
    padding: 1rem;
  }

  .file-title-block {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .ftb-role {
    font-size: 1.1rem;
  }

  .file-desc {
    font-size: 0.85rem;
  }

  .fm-item {
    flex: 0 0 100%;
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
  }

  .fm-val {
    font-size: 1.2rem;
  }

  .fs-item span {
    font-size: 0.82rem;
  }

  .fe-impact-row {
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .fe-impact-label {
    min-width: auto;
    width: 100%;
  }
}
</style>
