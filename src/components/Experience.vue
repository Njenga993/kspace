<template>
  <section id="experience" class="experience">
    <div class="exp-container">
      <!-- Section Header -->
      <div class="exp-header">
        <div class="header-badge">
          <span class="badge-num">03</span>
          <span class="badge-text">JOURNEY</span>
        </div>
        <h2 class="exp-title">
          Professional <span class="accent">Evolution</span>
        </h2>
        <div class="exp-underline"></div>
        <p class="exp-subtitle">
          From foundational training to leadership roles — my path in tech
        </p>
      </div>

      <!-- Stats Dashboard -->
      <div class="stats-dashboard">
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-content">
            <div class="stat-number">{{ totalYears }}</div>
            <div class="stat-label">Years of Experience</div>
            <div class="stat-trend">+{{ totalYears }} since 2021</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🚀</div>
          <div class="stat-content">
            <div class="stat-number">{{ totalProjects }}+</div>
            <div class="stat-label">Projects Delivered</div>
            <div class="stat-trend">100% completion rate</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-number">{{ uniqueSkills }}</div>
            <div class="stat-label">Technologies Mastered</div>
            <div class="stat-trend">Continuously learning</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <div class="stat-number">100%</div>
            <div class="stat-label">Client Retention</div>
            <div class="stat-trend">Repeat business rate</div>
          </div>
        </div>
      </div>

      <!-- Filter Pills -->
      <div class="exp-filters">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="['filter-pill', { active: activeFilter === filter.value }]"
        >
          {{ filter.label }}
          <span class="filter-count">{{ getFilterCount(filter.value) }}</span>
        </button>
      </div>

      <!-- Career Timeline -->
      <div class="career-timeline">
        <div class="timeline-track">
          <div
            v-for="(exp, idx) in filteredExperiences"
            :key="exp.id"
            class="timeline-node"
            :class="{ active: activeTimelineNode === idx }"
            @click="activeTimelineNode = idx"
          >
            <div class="node-year">{{ exp.period.split(" - ")[0] }}</div>
            <div class="node-dot"></div>
            <div class="node-line"></div>
          </div>
        </div>

        <div class="timeline-content">
          <transition name="fade-slide" mode="out-in">
            <div :key="activeTimelineNode" class="exp-card-detailed">
              <div class="card-header">
                <div class="header-left">
                  <div
                    class="company-logo"
                    :style="{ background: currentExp.color }"
                  >
                    <i :class="getIconClass(currentExp.category)"></i>
                  </div>
                  <div class="company-info">
                    <h3>{{ currentExp.title }}</h3>
                    <div class="company-meta">
                      <span class="company-name">{{ currentExp.company }}</span>
                      <span class="company-period">{{
                        currentExp.period
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="header-right">
                  <div
                    class="exp-badge"
                    :class="currentExp.category.toLowerCase()"
                  >
                    {{ currentExp.category }}
                  </div>
                </div>
              </div>

              <div class="card-body">
                <p class="exp-description">{{ currentExp.description }}</p>

                <!-- Metrics Grid -->
                <div class="metrics-grid">
                  <div
                    v-for="metric in currentExp.metrics"
                    :key="metric.label"
                    class="metric-block"
                  >
                    <div class="metric-value">{{ metric.value }}</div>
                    <div class="metric-label">{{ metric.label }}</div>
                  </div>
                </div>

                <!-- Skills Cloud -->
                <div class="skills-section">
                  <h4>Skills & Technologies</h4>
                  <div class="skills-cloud">
                    <span
                      v-for="skill in getAllSkills(currentExp)"
                      :key="skill"
                      class="skill-item"
                      :style="{ '--skill-level': getSkillLevel(skill) }"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <!-- Key Achievements -->
                <div class="achievements-section">
                  <h4>Key Achievements</h4>
                  <div class="achievements-grid">
                    <div
                      v-for="achievement in currentExp.achievements"
                      :key="achievement"
                      class="achievement-item"
                    >
                      <div class="achievement-marker"></div>
                      <p>{{ achievement }}</p>
                    </div>
                  </div>
                </div>

                <!-- Challenges Overcome -->
                <div v-if="currentExp.challenges" class="challenges-section">
                  <h4>Challenges Overcome</h4>
                  <div class="challenges-list">
                    <div
                      v-for="challenge in currentExp.challenges"
                      :key="challenge"
                      class="challenge-item"
                    >
                      <i class="fas fa-trophy"></i>
                      <span>{{ challenge }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer">
                <button
                  class="btn-expand"
                  @click="toggleDetails(currentExp.id)"
                >
                  <i
                    :class="
                      isExpanded(currentExp.id) ? 'fas fa-minus' : 'fas fa-plus'
                    "
                  ></i>
                  {{
                    isExpanded(currentExp.id)
                      ? "Show Less"
                      : "Show More Details"
                  }}
                </button>
              </div>

              <!-- Expanded Details -->
              <transition name="expand">
                <div v-if="isExpanded(currentExp.id)" class="expanded-content">
                  <div class="expanded-grid">
                    <div class="expanded-col">
                      <h4>Technologies Used</h4>
                      <div class="tech-stack">
                        <div
                          v-for="(
                            skills, category
                          ) in currentExp.skillCategories"
                          :key="category"
                          class="tech-category"
                        >
                          <div class="tech-cat-name">{{ category }}</div>
                          <div class="tech-items">
                            <span
                              v-for="skill in skills"
                              :key="skill"
                              class="tech-badge"
                            >
                              {{ skill }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="expanded-col">
                      <h4>Impact Metrics</h4>
                      <div class="impact-metrics">
                        <div
                          v-for="metric in currentExp.metrics"
                          :key="metric.label"
                          class="impact-item"
                        >
                          <div class="impact-bar">
                            <div
                              class="impact-fill"
                              :style="{
                                width: getImpactPercentage(metric.value),
                              }"
                            ></div>
                          </div>
                          <div class="impact-label">{{ metric.label }}</div>
                          <div class="impact-value">{{ metric.value }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </transition>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="timeline-nav">
        <button
          @click="prevExperience"
          :disabled="activeTimelineNode === 0"
          class="nav-arrow"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="nav-progress">
          <div
            class="progress-bar"
            :style="{
              width:
                ((activeTimelineNode + 1) / filteredExperiences.length) * 100 +
                '%',
            }"
          ></div>
        </div>
        <button
          @click="nextExperience"
          :disabled="activeTimelineNode === filteredExperiences.length - 1"
          class="nav-arrow"
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
  { label: "All Experiences", value: "All", count: 4 },
  { label: "Development", value: "Development", count: 3 },
  { label: "Internship", value: "Internship", count: 1 },
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

const getFilterCount = (filter) => {
  if (filter === "All") return experiences.length;
  return experiences.filter((e) => e.category === filter).length;
};

const getAllSkills = (exp) => {
  const skills = [];
  Object.values(exp.skillCategories).forEach((category) => {
    skills.push(...category);
  });
  return skills.slice(0, 8);
};

const getSkillLevel = (skill) => {
  const levels = {
    React: 95,
    JavaScript: 90,
    Python: 85,
    Django: 85,
    TypeScript: 80,
    HTML5: 95,
    CSS3: 90,
    PHP: 80,
  };
  return levels[skill] || 75;
};

const getImpactPercentage = (value) => {
  const num = parseInt(value);
  if (value.includes("%")) return Math.min(num, 100);
  if (num > 100) return 100;
  return num;
};

const prevExperience = () => {
  if (activeTimelineNode.value > 0) {
    activeTimelineNode.value--;
  }
};

const nextExperience = () => {
  if (activeTimelineNode.value < filteredExperiences.value.length - 1) {
    activeTimelineNode.value++;
  }
};

const toggleDetails = (id) => {
  const index = expandedItems.value.indexOf(id);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(id);
  }
};

const isExpanded = (id) => {
  return expandedItems.value.includes(id);
};

const getIconClass = (category) => {
  return category === "Development" ? "fas fa-code" : "fas fa-graduation-cap";
};
</script>

<style scoped>
.experience {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.exp-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.exp-header {
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

.exp-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 1rem;
}

.exp-title .accent {
  color: var(--accent);
}

.exp-underline {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1rem;
}

.exp-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Stats Dashboard */
.stats-dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.stat-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin: 0.25rem 0;
}

.stat-trend {
  font-size: 0.6rem;
  color: var(--text-dim);
}

/* Filter Pills */
.exp-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-pill {
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

.filter-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-pill.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.filter-count {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.1rem 0.4rem;
  border-radius: 20px;
  font-size: 0.65rem;
}

/* Career Timeline */
.career-timeline {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  margin-bottom: 2rem;
  overflow: hidden;
}

.timeline-track {
  display: flex;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-dark);
}

.timeline-node {
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}

.timeline-node:hover {
  background: rgba(255, 94, 0, 0.05);
}

.timeline-node.active {
  background: var(--bg-card);
}

.node-year {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.timeline-node.active .node-year {
  color: var(--accent);
}

.node-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-default);
  margin: 0 auto;
  transition: all 0.3s;
}

.timeline-node.active .node-dot {
  background: var(--accent);
  transform: scale(1.3);
}

.node-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transition: all 0.3s;
}

.timeline-node.active .node-line {
  background: var(--accent);
}

/* Timeline Content */
.timeline-content {
  padding: 2rem;
}

.exp-card-detailed {
  animation: slideIn 0.4s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-dark);
}

.header-left {
  display: flex;
  gap: 1rem;
}

.company-logo {
  width: 50px;
  height: 50px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #000;
}

.company-info h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.25rem;
}

.company-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.company-name {
  color: var(--text-muted);
}

.company-period {
  color: var(--accent);
  font-weight: 600;
}

.exp-badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.exp-badge.development {
  background: rgba(255, 94, 0, 0.2);
  color: var(--accent);
}

.exp-badge.internship {
  background: rgba(251, 133, 0, 0.2);
  color: #fb8500;
}

.exp-description {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-block {
  text-align: center;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-dark);
}

.metric-value {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Skills Section */
.skills-section,
.achievements-section,
.challenges-section {
  margin-bottom: 1.5rem;
}

.skills-section h4,
.achievements-section h4,
.challenges-section h4 {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  padding: 0.3rem 0.8rem;
  background: var(--bg-elevated);
  color: var(--text-silver);
  font-size: 0.8rem;
  transition: all 0.3s;
  cursor: default;
}

.skill-item:hover {
  background: var(--accent);
  color: #000;
  transform: translateY(-2px);
}

/* Achievements */
.achievements-grid {
  display: grid;
  gap: 0.75rem;
}

.achievement-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.achievement-marker {
  width: 6px;
  height: 6px;
  background: var(--accent);
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.achievement-item p {
  color: var(--text-muted);
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

/* Challenges */
.challenges-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.challenge-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.challenge-item i {
  color: var(--accent);
  font-size: 0.8rem;
}

/* Card Footer */
.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-dark);
}

.btn-expand {
  background: transparent;
  border: 1px solid var(--border-default);
  padding: 0.5rem 1rem;
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-expand:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Expanded Content */
.expanded-content {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-dark);
}

.expanded-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.expanded-col h4 {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tech-cat-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-silver);
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  padding: 0.2rem 0.6rem;
  background: var(--bg-elevated);
  font-size: 0.7rem;
  color: var(--text-muted);
}

.impact-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.impact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.impact-bar {
  flex: 1;
  height: 4px;
  background: var(--border-dark);
  overflow: hidden;
}

.impact-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.5s ease;
}

.impact-label {
  font-size: 0.7rem;
  color: var(--text-dim);
  min-width: 80px;
}

.impact-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  min-width: 50px;
}

/* Timeline Navigation */
.timeline-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s;
}

.nav-arrow:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-progress {
  flex: 1;
  max-width: 200px;
  height: 2px;
  background: var(--border-dark);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 800px;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-dashboard {
    grid-template-columns: repeat(2, 1fr);
  }

  .expanded-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .experience {
    padding: 3rem 1rem;
  }

  .exp-title {
    font-size: 1.8rem;
  }

  .stats-dashboard {
    grid-template-columns: 1fr;
  }

  .exp-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-pill {
    justify-content: center;
  }

  .timeline-track {
    overflow-x: auto;
  }

  .timeline-node {
    min-width: 100px;
  }

  .timeline-content {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .expanded-grid {
    grid-template-columns: 1fr;
  }

  .timeline-nav {
    margin-top: 1rem;
  }
}
</style>
