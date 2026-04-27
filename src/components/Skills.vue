<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <!-- Section Header -->
      <div class="skills-header">
        <div class="header-badge">
          <span class="badge-num">02</span>
          <span class="badge-text">EXPERTISE</span>
        </div>
        <h2 class="skills-title">
          Technical <span class="accent">Arsenal</span>
        </h2>
        <div class="skills-underline"></div>
        <p class="skills-subtitle">
          A comprehensive toolkit refined through years of building
          production-ready applications
        </p>
      </div>

      <!-- Stats Overview -->
      <div class="skills-stats-grid">
        <div class="stat-pill">
          <div class="stat-pill-value">{{ totalSkills }}</div>
          <div class="stat-pill-label">Technologies</div>
        </div>
        <div class="stat-pill">
          <div class="stat-pill-value">{{ skillCategories.length }}</div>
          <div class="stat-pill-label">Categories</div>
        </div>
        <div class="stat-pill">
          <div class="stat-pill-value">{{ averageLevel.toFixed(1) }}</div>
          <div class="stat-pill-label">Avg Proficiency</div>
        </div>
        <div class="stat-pill highlight">
          <div class="stat-pill-value">{{ topCategory.title }}</div>
          <div class="stat-pill-label">Top Category</div>
        </div>
      </div>

      <!-- Main Skills Display -->
      <div class="skills-display">
        <!-- Category Navigation -->
        <div class="skills-navigation">
          <button
            v-for="(cat, idx) in skillCategories"
            :key="cat.title"
            @click="activeCategory = idx"
            :class="['nav-category', { active: activeCategory === idx }]"
          >
            <i :class="getCategoryIcon(cat.title)"></i>
            <span>{{ cat.title }}</span>
            <div
              class="nav-level"
              :style="{ width: (cat.level / 5) * 100 + '%' }"
            ></div>
          </button>
        </div>

        <!-- Category Content -->
        <div class="skills-content">
          <transition name="slide-fade" mode="out-in">
            <div :key="activeCategory" class="category-detail">
              <!-- Category Header -->
              <div class="category-header">
                <div class="category-title-section">
                  <h3>{{ currentCategory.title }}</h3>
                  <div class="category-level">
                    <span>Proficiency</span>
                    <div class="level-bar">
                      <div
                        class="level-fill"
                        :style="{
                          width: (currentCategory.level / 5) * 100 + '%',
                        }"
                      ></div>
                    </div>
                    <span class="level-value"
                      >{{ currentCategory.level }}/5</span
                    >
                  </div>
                </div>
                <p class="category-description">
                  {{ currentCategory.description }}
                </p>
              </div>

              <!-- Skills Grid -->
              <div class="skills-grid">
                <div
                  v-for="skill in currentCategory.skills"
                  :key="skill.name"
                  class="skill-card"
                  @click="showSkillDetails(skill)"
                >
                  <div class="skill-icon">
                    <img :src="getSkillIcon(skill.icon)" :alt="skill.name" />
                  </div>
                  <div class="skill-info">
                    <h4>{{ skill.name }}</h4>
                    <div class="skill-progress">
                      <div class="progress-track">
                        <div
                          class="progress-fill"
                          :style="{
                            width: getSkillLevel(skill.name) * 20 + '%',
                          }"
                        ></div>
                      </div>
                      <span class="progress-value"
                        >{{ getSkillLevel(skill.name) }}/5</span
                      >
                    </div>
                  </div>
                  <div class="skill-hover">
                    <span>View Details</span>
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>

              <!-- Related Projects -->
              <div class="related-projects">
                <h4>Featured In</h4>
                <div class="project-tags">
                  <span
                    v-for="project in getProjectsForCategory(
                      currentCategory.title,
                    )"
                    :key="project"
                    class="project-tag"
                  >
                    {{ project }}
                  </span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Alternative: Radar View Toggle -->
      <div class="view-toggle">
        <button
          :class="['toggle-btn', { active: viewMode === 'grid' }]"
          @click="viewMode = 'grid'"
        >
          <i class="fas fa-th"></i> Grid View
        </button>
        <button
          :class="['toggle-btn', { active: viewMode === 'radar' }]"
          @click="viewMode = 'radar'"
        >
          <i class="fas fa-chart-pie"></i> Radar View
        </button>
      </div>

      <!-- Radar View -->
      <transition name="fade">
        <div v-if="viewMode === 'radar'" class="radar-view">
          <div class="radar-container">
            <div class="radar-chart">
              <div class="radar-grid">
                <div
                  class="grid-circle"
                  v-for="i in 5"
                  :key="i"
                  :style="{ transform: `scale(${i * 0.2})` }"
                ></div>
                <div
                  class="radar-axis"
                  v-for="(cat, idx) in skillCategories"
                  :key="cat.title"
                  :style="{ transform: `rotate(${idx * 72}deg)` }"
                >
                  <div class="axis-label">{{ cat.title }}</div>
                </div>
                <div
                  class="radar-polygon"
                  :style="{ clipPath: getRadarPath() }"
                >
                  <div class="polygon-fill"></div>
                </div>
              </div>
            </div>
            <div class="radar-legend">
              <div
                v-for="cat in skillCategories"
                :key="cat.title"
                class="legend-item"
              >
                <div
                  class="legend-color"
                  :style="{ background: getCategoryColor(cat.title) }"
                ></div>
                <span>{{ cat.title }}</span>
                <span class="legend-value">{{ cat.level }}/5</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Skill Detail Modal -->
    <transition name="modal">
      <div v-if="selectedSkill" class="modal" @click="closeSkillDetails">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <div class="modal-icon-large">
              <img
                :src="getSkillIcon(selectedSkill.icon)"
                :alt="selectedSkill.name"
              />
            </div>
            <div class="modal-title">
              <h2>{{ selectedSkill.name }}</h2>
              <div class="modal-category">
                {{ getSkillCategory(selectedSkill.name) }}
              </div>
            </div>
            <button class="modal-close" @click="closeSkillDetails">
              &times;
            </button>
          </div>

          <div class="modal-body">
            <div class="proficiency-section">
              <div class="proficiency-label">Proficiency Level</div>
              <div class="proficiency-bar">
                <div
                  class="proficiency-fill"
                  :style="{
                    width: getSkillLevel(selectedSkill.name) * 20 + '%',
                  }"
                ></div>
              </div>
              <div class="proficiency-stars">
                <i
                  v-for="i in 5"
                  :key="i"
                  :class="[
                    'fas',
                    i <= getSkillLevel(selectedSkill.name)
                      ? 'fa-star'
                      : 'fa-star-o',
                  ]"
                ></i>
              </div>
            </div>

            <div class="description-section">
              <h4>About this skill</h4>
              <p>{{ getSkillDescription(selectedSkill.name) }}</p>
            </div>

            <div class="projects-section">
              <h4>Projects using this skill</h4>
              <div class="project-list">
                <span
                  v-for="project in getProjectsForSkill(selectedSkill.name)"
                  :key="project"
                  class="project-badge"
                >
                  {{ project }}
                </span>
              </div>
            </div>

            <div
              class="certification-section"
              v-if="getCertification(selectedSkill.name)"
            >
              <h4>Certification</h4>
              <div class="cert-badge">
                <i class="fas fa-certificate"></i>
                <span>{{ getCertification(selectedSkill.name) }}</span>
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

const activeCategory = ref(0);
const viewMode = ref("grid");
const selectedSkill = ref(null);

const skillCategories = [
  {
    title: "Frontend",
    level: 5,
    color: "#FF5E00",
    description:
      "Crafting responsive, interactive user interfaces with modern frameworks and vanilla excellence.",
    skills: [
      { name: "Vue.js", icon: "logos:vue" },
      { name: "React", icon: "logos:react" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
    ],
  },
  {
    title: "Backend",
    level: 4,
    color: "#06d6a0",
    description:
      "Building scalable, secure server-side architectures and RESTful APIs.",
    skills: [
      { name: "Django", icon: "logos:django-icon" },
      { name: "Python", icon: "logos:python" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "FastAPI", icon: "logos:fastapi" },
      { name: "Flask", icon: "logos:flask" },
      { name: "GraphQL", icon: "logos:graphql" },
      { name: "REST APIs", icon: "lucide:api" },
      { name: "PHP Laravel", icon: "logos:laravel" },
      { name: "Express.js", icon: "skill-icons:expressjs-dark" },
    ],
  },
  {
    title: "Database",
    level: 4,
    color: "#f72585",
    description:
      "Designing efficient data structures and optimizing query performance.",
    skills: [
      { name: "MySQL", icon: "logos:mysql-icon" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MariaDB", icon: "logos:mariadb" },
      { name: "SQLite", icon: "vscode-icons:file-type-sqlite" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
    ],
  },
  {
    title: "Design",
    level: 4,
    color: "#fb8500",
    description:
      "Creating intuitive interfaces that balance aesthetics with functionality.",
    skills: [
      { name: "Figma", icon: "logos:figma" },
      { name: "Photoshop", icon: "logos:adobe-photoshop" },
      { name: "Illustrator", icon: "logos:adobe-illustrator" },
      { name: "Canva", icon: "simple-icons:canva" },
    ],
  },
  {
    title: "DevOps",
    level: 3,
    color: "#3b82f6",
    description:
      "Streamlining deployment and maintaining robust development workflows.",
    skills: [
      { name: "Git", icon: "logos:git-icon" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "CI/CD", icon: "logos:jenkins" },
      { name: "AWS", icon: "logos:aws" },
    ],
  },
];

const currentCategory = computed(() => skillCategories[activeCategory.value]);

const totalSkills = computed(() =>
  skillCategories.reduce((t, c) => t + c.skills.length, 0),
);

const averageLevel = computed(
  () =>
    skillCategories.reduce((s, c) => s + c.level, 0) / skillCategories.length,
);

const topCategory = computed(() =>
  skillCategories.reduce(
    (t, c) => (c.level > t.level ? c : t),
    skillCategories[0],
  ),
);

const getCategoryIcon = (title) => {
  const icons = {
    Frontend: "fas fa-code",
    Backend: "fas fa-server",
    Database: "fas fa-database",
    Design: "fas fa-palette",
    DevOps: "fas fa-cloud",
  };
  return icons[title] || "fas fa-code";
};

const getCategoryColor = (title) => {
  const colors = {
    Frontend: "#FF5E00",
    Backend: "#06d6a0",
    Database: "#f72585",
    Design: "#fb8500",
    DevOps: "#3b82f6",
  };
  return colors[title] || "#FF5E00";
};

const getSkillIcon = (icon) => `https://api.iconify.design/${icon}.svg`;

const getSkillLevel = (name) => {
  const levels = {
    "Vue.js": 5,
    React: 4,
    TypeScript: 4,
    JavaScript: 5,
    HTML5: 5,
    CSS3: 5,
    "Tailwind CSS": 4,
    Django: 4,
    Python: 4,
    "Node.js": 4,
    FastAPI: 3,
    Flask: 3,
    GraphQL: 3,
    "REST APIs": 5,
    "PHP Laravel": 3,
    "Express.js": 4,
    MySQL: 4,
    PostgreSQL: 4,
    MariaDB: 3,
    SQLite: 4,
    MongoDB: 3,
    Figma: 4,
    Photoshop: 3,
    Illustrator: 3,
    Canva: 4,
    Git: 5,
    Docker: 3,
    "CI/CD": 3,
    AWS: 2,
  };
  return levels[name] || 3;
};

const getSkillCategory = (skillName) => {
  for (const cat of skillCategories) {
    if (cat.skills.find((s) => s.name === skillName)) {
      return cat.title;
    }
  }
  return "General";
};

const getSkillDescription = (name) => {
  const descriptions = {
    "Vue.js":
      "Progressive JavaScript framework for building user interfaces with reactive components.",
    React:
      "Component-based library for building interactive UIs with virtual DOM.",
    TypeScript:
      "Typed superset of JavaScript that adds static typing capabilities.",
    JavaScript:
      "High-level, dynamic programming language essential for web development.",
    HTML5:
      "Latest HTML standard with semantic elements and multimedia support.",
    CSS3: "Style sheet language for sophisticated layouts and animations.",
    "Tailwind CSS": "Utility-first CSS framework for rapid custom designs.",
    Django:
      "High-level Python framework promoting rapid development and clean design.",
    Python: "Versatile language known for readability and extensive libraries.",
    "Node.js":
      "JavaScript runtime for building scalable server-side applications.",
    Docker:
      "Containerization platform for consistent development and deployment.",
    Git: "Distributed version control for tracking code changes and collaboration.",
    Figma: "Cloud-based design tool for collaborative interface creation.",
  };
  return (
    descriptions[name] ||
    "Advanced proficiency in this technology through practical project experience."
  );
};

const getProjectsForSkill = (name) => {
  const projectMap = {
    "Vue.js": ["Seed Savers Network", "INOFO Africa", "Greania Build"],
    React: ["React Portfolio", "Techlungs", "SaleHub POS"],
    TypeScript: ["Seed Savers Network", "INOFO Africa", "SaleHub POS"],
    JavaScript: ["All Projects"],
    Django: ["SaleHub POS"],
    Python: ["SaleHub POS", "Data Analysis"],
    MySQL: ["SaleHub POS", "Desiderata Consultancy"],
    Figma: ["Nyakazi Ecommerce", "Nyakazi Corporate"],
  };
  return projectMap[name] || ["Various Projects"];
};

const getProjectsForCategory = (category) => {
  const categoryProjects = {
    Frontend: ["Seed Savers Network", "INOFO Africa", "React Portfolio"],
    Backend: ["SaleHub POS", "Desiderata Consultancy"],
    Database: ["SaleHub POS", "Desiderata Consultancy"],
    Design: ["Nyakazi Ecommerce", "Nyakazi Corporate"],
    DevOps: ["SaleHub POS", "Portfolio Deployment"],
  };
  return categoryProjects[category] || ["Multiple Projects"];
};

const getCertification = (name) => {
  const certs = {
    "Vue.js": "Vue Mastery Certification",
    React: "React Fundamentals Certified",
    Python: "Python Institute Certified",
    Docker: "Docker Essentials",
  };
  return certs[name] || null;
};

const getRadarPath = () => {
  const points = skillCategories.map((cat, idx) => {
    const level = cat.level / 5;
    const angle = ((idx * 72 - 90) * Math.PI) / 180;
    const x = 50 + level * 50 * Math.cos(angle);
    const y = 50 + level * 50 * Math.sin(angle);
    return `${x}% ${y}%`;
  });
  return `polygon(${points.join(", ")})`;
};

const showSkillDetails = (skill) => {
  selectedSkill.value = skill;
  document.body.style.overflow = "hidden";
};

const closeSkillDetails = () => {
  selectedSkill.value = null;
  document.body.style.overflow = "";
};
</script>

<style scoped>
.skills {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  position: relative;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.skills-header {
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

.skills-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 1rem;
}

.skills-title .accent {
  color: var(--accent);
}

.skills-underline {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1rem;
}

.skills-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Stats Grid */
.skills-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.stat-pill {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.5rem 1rem;
  text-align: center;
  transition: all 0.3s;
}

.stat-pill:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.stat-pill.highlight {
  border-left: 3px solid var(--accent);
  background: linear-gradient(
    135deg,
    var(--bg-card) 0%,
    rgba(255, 94, 0, 0.05) 100%
  );
}

.stat-pill-value {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.stat-pill-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Skills Display */
.skills-display {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  margin-bottom: 2rem;
  overflow: hidden;
}

.skills-navigation {
  display: flex;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-dark);
}

.nav-category {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-category i {
  font-size: 1rem;
}

.nav-category:hover {
  background: rgba(255, 94, 0, 0.05);
  color: var(--accent);
}

.nav-category.active {
  color: var(--accent);
  background: var(--bg-card);
}

.nav-level {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.5s ease;
}

/* Skills Content */
.skills-content {
  padding: 2rem;
}

.category-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-dark);
}

.category-title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-title-section h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white);
}

.category-level {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-level span {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.level-bar {
  width: 150px;
  height: 4px;
  background: var(--border-dark);
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.5s ease;
}

.level-value {
  font-weight: 600;
  color: var(--accent);
}

.category-description {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.skill-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-dark);
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.skill-card:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

.skill-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.skill-info {
  flex: 1;
}

.skill-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.skill-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-track {
  flex: 1;
  height: 3px;
  background: var(--border-dark);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s;
}

.progress-value {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.skill-hover {
  position: absolute;
  right: -100px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  transition: right 0.3s;
}

.skill-card:hover .skill-hover {
  right: 1rem;
}

/* Related Projects */
.related-projects {
  padding-top: 1rem;
  border-top: 1px solid var(--border-dark);
}

.related-projects h4 {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  padding: 0.3rem 0.8rem;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 0.75rem;
  transition: all 0.2s;
}

.project-tag:hover {
  background: var(--accent);
  color: #000;
}

/* View Toggle */
.view-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.toggle-btn {
  padding: 0.6rem 1.5rem;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-btn i {
  margin-right: 0.5rem;
}

.toggle-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.toggle-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

/* Radar View */
.radar-view {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 2rem;
  margin-top: 2rem;
}

.radar-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.radar-chart {
  position: relative;
  aspect-ratio: 1;
  max-width: 400px;
  margin: 0 auto;
}

.radar-grid {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 94, 0, 0.05);
  border-radius: 50%;
}

.grid-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid var(--border-dark);
  border-radius: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) scale(0.2);
}

.radar-axis {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  background: var(--border-dark);
  transform-origin: left center;
}

.axis-label {
  position: absolute;
  right: -30px;
  top: -8px;
  font-size: 0.7rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.radar-polygon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.polygon-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 94, 0, 0.3),
    rgba(255, 94, 0, 0.1)
  );
  border: 2px solid var(--accent);
}

.radar-legend {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-value {
  margin-left: auto;
  font-weight: 600;
  color: var(--accent);
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

.modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  max-width: 550px;
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

.modal-icon-large {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-icon-large img {
  width: 50px;
  height: 50px;
}

.modal-title h2 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.25rem;
}

.modal-category {
  font-size: 0.7rem;
  color: var(--accent);
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
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.proficiency-section {
  text-align: center;
}

.proficiency-label {
  font-size: 0.7rem;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
}

.proficiency-bar {
  height: 6px;
  background: var(--border-dark);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.proficiency-fill {
  height: 100%;
  background: var(--accent);
}

.proficiency-stars {
  color: var(--accent);
  font-size: 0.9rem;
}

.description-section h4,
.projects-section h4,
.certification-section h4 {
  font-size: 0.7rem;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.description-section p {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.85rem;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-badge {
  padding: 0.3rem 0.8rem;
  background: var(--bg-elevated);
  color: var(--text-silver);
  font-size: 0.75rem;
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--bg-elevated);
  color: var(--accent);
  font-size: 0.8rem;
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
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
  .skills-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .radar-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .skills {
    padding: 3rem 1rem;
  }

  .skills-title {
    font-size: 1.8rem;
  }

  .skills-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .skills-navigation {
    flex-wrap: wrap;
  }

  .nav-category {
    min-width: 100px;
  }

  .skills-content {
    padding: 1rem;
  }

  .category-title-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .view-toggle {
    flex-direction: column;
  }

  .toggle-btn {
    width: 100%;
  }

  .modal-content {
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .skills-stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-pill-value {
    font-size: 1.5rem;
  }
}
</style>
