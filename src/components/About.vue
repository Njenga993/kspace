<template>
  <section id="about" class="about">
    <div class="about-inner">
      <!-- Section Marker -->
      <div class="section-marker">
        <span class="marker-num">01</span>
        <span class="marker-title">ABOUT</span>
      </div>

      <!-- Layout: Sidebar + Content -->
      <div class="about-layout">
        <!-- Desktop Sidebar Tabs -->
        <nav class="about-sidebar">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.id"
            :class="['sidebar-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <span class="st-num">{{ String(idx + 1).padStart(2, "0") }}</span>
            <span class="st-label">{{ tab.label }}</span>
          </button>
        </nav>

        <!-- Mobile Horizontal Tabs -->
        <nav class="about-tabs-mob">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['mob-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </nav>

        <!-- Content Area -->
        <div class="about-content">
          <Transition name="tab" mode="out-in">
            <!-- Profile -->
            <div
              v-if="activeTab === 'profile'"
              key="profile"
              class="panel profile-panel"
            >
              <div class="profile-header">
                <div class="profile-avatar-box">
                  <img
                    src="/profile.JPG"
                    alt="Kelvin Kamau"
                    class="profile-img"
                  />
                  <div class="profile-online"></div>
                </div>
                <div class="profile-text">
                  <h3 class="profile-name">Kelvin Njenga Kamau</h3>
                  <div class="profile-role">
                    Full Stack Developer & UI/UX Engineer
                  </div>
                </div>
              </div>

              <p class="profile-bio">
                I'm a passionate Full Stack Developer with a strong foundation
                in software development, UI/UX, and digital strategy. I
                specialize in crafting scalable, responsive web apps that solve
                real-world problems — combining clean frontend design with
                powerful backend logic.
              </p>

              <div class="profile-stats">
                <div class="pstat">
                  <span class="pstat-num">03+</span>
                  <span class="pstat-lbl">Years Experience</span>
                </div>
                <span class="pstat-sep"></span>
                <div class="pstat">
                  <span class="pstat-num">20+</span>
                  <span class="pstat-lbl">Projects Completed</span>
                </div>
                <span class="pstat-sep"></span>
                <div class="pstat">
                  <span class="pstat-num">15+</span>
                  <span class="pstat-lbl">Happy Clients</span>
                </div>
              </div>

              <div class="profile-interests">
                <span class="pi-label">INTERESTS</span>
                <div class="pi-list">
                  <span class="pi-tag"
                    ><i class="fas fa-gamepad"></i> Gaming</span
                  >
                  <span class="pi-sep">·</span>
                  <span class="pi-tag"
                    ><i class="fas fa-book"></i> Reading</span
                  >
                  <span class="pi-sep">·</span>
                  <span class="pi-tag"><i class="fas fa-music"></i> Music</span>
                  <span class="pi-sep">·</span>
                  <span class="pi-tag"
                    ><i class="fas fa-futbol"></i> Football</span
                  >
                </div>
              </div>
            </div>

            <!-- Education -->
            <div
              v-else-if="activeTab === 'education'"
              key="education"
              class="panel edu-panel"
            >
              <div class="edu-top">
                <div class="edu-badge">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="edu-detail">
                  <h3>Bachelor's in Information Science</h3>
                  <div class="edu-detail-meta">
                    <span>Meru University of Science and Technology</span>
                    <span class="edu-detail-period">2019 — 2023</span>
                  </div>
                </div>
              </div>

              <div class="edu-columns">
                <div class="edu-col">
                  <div class="edu-col-title">ACHIEVEMENTS</div>
                  <ul class="edu-list">
                    <li>Second Class Honors (Upper Division)</li>
                    <li>
                      Specialized in Software Development & Database Systems
                    </li>
                    <li>Final year project: E-commerce Platform Development</li>
                  </ul>
                </div>
                <div class="edu-col">
                  <div class="edu-col-title">COURSEWORK</div>
                  <div class="edu-tags">
                    <span class="edu-tag">Web Development</span>
                    <span class="edu-tag">Database Systems</span>
                    <span class="edu-tag">Software Engineering</span>
                    <span class="edu-tag">UI/UX Design</span>
                    <span class="edu-tag">Data Structures</span>
                    <span class="edu-tag">Algorithms</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Experience -->
            <div
              v-else-if="activeTab === 'experience'"
              key="experience"
              class="panel exp-panel"
            >
              <div class="exp-timeline">
                <div
                  class="exp-entry"
                  v-for="exp in miniExperiences"
                  :key="exp.period"
                >
                  <div class="exp-dot"></div>
                  <div class="exp-date">{{ exp.period }}</div>
                  <h4 class="exp-title">{{ exp.title }}</h4>
                  <div class="exp-company">{{ exp.company }}</div>
                  <p class="exp-desc">{{ exp.description }}</p>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div v-else key="skills" class="panel skills-panel">
              <div class="skills-bento">
                <div
                  v-for="cat in skillCategories"
                  :key="cat.title"
                  class="bento-cell"
                >
                  <div class="bento-title">{{ cat.title }}</div>
                  <div class="bento-tags">
                    <span v-for="s in cat.skills" :key="s" class="bento-tag">{{
                      s
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Actions -->
      <div class="about-actions">
        <a href="/Kamau_Kelvin_Resume.pdf" class="action-primary" download>
          <i class="fas fa-download"></i>
          <span>Download Resume</span>
        </a>
        <a href="#contact" class="action-secondary">
          <span class="as-idx">02</span>
          <span class="as-label">Contact Me</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "PROFILE" },
  { id: "education", label: "EDUCATION" },
  { id: "experience", label: "CAREER" },
  { id: "skills", label: "SKILLS" },
];

const miniExperiences = [
  {
    period: "2023 — Present",
    title: "Developer & Digital Manager",
    company: "Nyakazi Organics",
    description:
      "Led digital transformation, built POS system with React & Django, implemented branding across all platforms.",
  },
  {
    period: "2023 — 2024",
    title: "Junior Developer",
    company: "Desiderata Consultancy",
    description:
      "Built Laravel dashboards, REST APIs, optimized page loads by 60% across client projects.",
  },
  {
    period: "2022 — 2023",
    title: "Frontend Developer",
    company: "Techlungs Technology",
    description:
      "Built 20+ high-converting landing pages, reduced CSS bundle by 45%.",
  },
  {
    period: "2021 — 2022",
    title: "ICT Intern",
    company: "KNLS & Immigration Dept",
    description:
      "Automated processes saving 15+ hrs/week, documented network infrastructure.",
  },
];

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "Vue.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "PHP",
      "Python",
      "Django",
      "Express.js",
      "MongoDB",
      "MySQL",
    ],
  },
  { title: "Design", skills: ["Figma", "Photoshop", "Illustrator", "UI/UX"] },
  { title: "Tools", skills: ["Git", "Docker", "CI/CD", "Webpack"] },
];
</script>

<style scoped>
/* ==============================
   SECTION
   ============================== */
.about {
  position: relative;
  padding: 5rem 2rem;
  background: var(--bg-secondary);
  overflow: hidden;
}

/* Subtle accent glow — top-right */
.about::before {
  content: "";
  position: absolute;
  top: -120px;
  right: -120px;
  width: 420px;
  height: 420px;
  background: var(--accent);
  opacity: 0.035;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.about-inner {
  position: relative;
  max-width: 1060px;
  margin: 0 auto;
}

/* ==============================
   SECTION MARKER
   ============================== */
.section-marker {
  display: inline-flex;
  flex-direction: column;
  padding: 0.5rem 0.85rem;
  border: 1px solid var(--border-default);
  margin-bottom: 2.25rem;
}

.marker-num {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.12em;
  line-height: 1;
}

.marker-title {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.14em;
  line-height: 1.4;
}

/* ==============================
   LAYOUT — SIDEBAR + CONTENT
   ============================== */
.about-layout {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* ==============================
   DESKTOP SIDEBAR TABS
   ============================== */
.about-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: sticky;
  top: 2rem;
}

.sidebar-tab {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 0.9rem;
  background: none;
  border: none;
  border-left: 2px solid var(--border-dark);
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
}

.sidebar-tab:hover {
  border-left-color: var(--text-muted);
  background: rgba(255, 255, 255, 0.015);
}

.sidebar-tab.active {
  border-left-color: var(--accent);
  background: rgba(255, 94, 0, 0.04);
}

.st-num {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.05em;
  transition: color 0.25s;
}

.sidebar-tab.active .st-num {
  color: var(--accent);
}

.st-label {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  transition: color 0.25s;
}

.sidebar-tab.active .st-label {
  color: var(--text-white);
}

/* ==============================
   MOBILE HORIZONTAL TABS
   (hidden on desktop)
   ============================== */
.about-tabs-mob {
  display: none;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 1.25rem;
  scrollbar-width: none;
}

.about-tabs-mob::-webkit-scrollbar {
  display: none;
}

.mob-tab {
  padding: 0.55rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  font-family: var(--font-heading);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
  flex-shrink: 0;
}

.mob-tab.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
  font-weight: 700;
}

.mob-tab:hover:not(.active) {
  border-color: var(--text-muted);
  color: var(--text-silver);
}

/* ==============================
   TAB TRANSITIONS
   ============================== */
.tab-enter-active,
.tab-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ==============================
   CONTENT AREA
   ============================== */
.about-content {
  min-height: 380px;
}

/* ==============================
   PROFILE PANEL
   ============================== */
.profile-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-avatar-box {
  position: relative;
  flex-shrink: 0;
}

.profile-img {
  display: block;
  width: 88px;
  height: 108px;
  object-fit: cover;
  object-position: center 20%;
  clip-path: polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%);
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.5s ease;
}

.profile-img:hover {
  filter: grayscale(0%);
}

.profile-online {
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 10px;
  height: 10px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.profile-name {
  font-family: var(--font-heading);
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin: 0 0 0.3rem;
  line-height: 1.15;
}

.profile-role {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
}

.profile-bio {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.75;
  margin: 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-dark);
}

/* Stats */
.profile-stats {
  display: flex;
  align-items: center;
}

.pstat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.75rem 0.5rem;
}

.pstat-num {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
}

.pstat-lbl {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 500;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
}

.pstat-sep {
  width: 1px;
  height: 42px;
  background: var(--border-dark);
  flex-shrink: 0;
}

/* Interests */
.profile-interests {
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-dark);
}

.pi-label {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.18em;
  display: block;
  margin-bottom: 0.65rem;
}

.pi-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.15rem 0.3rem;
}

.pi-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-silver);
  transition: color 0.2s;
  cursor: default;
}

.pi-tag:hover {
  color: var(--accent);
}

.pi-tag i {
  font-size: 0.78rem;
  color: var(--accent);
  width: 16px;
  text-align: center;
}

.pi-sep {
  color: var(--border-default);
  font-size: 0.7rem;
  margin: 0 0.15rem;
  user-select: none;
}

/* ==============================
   EDUCATION PANEL
   ============================== */
.edu-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edu-top {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.edu-badge {
  width: 48px;
  height: 48px;
  background: var(--accent-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.15rem;
  flex-shrink: 0;
}

.edu-detail h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin: 0 0 0.35rem;
  line-height: 1.25;
}

.edu-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.edu-detail-period {
  color: var(--accent);
  font-weight: 600;
  font-family: var(--font-heading);
  font-size: 0.82rem;
}

.edu-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-dark);
}

.edu-col-title {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.16em;
  margin-bottom: 0.85rem;
}

.edu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.edu-list li {
  position: relative;
  padding: 0.45rem 0 0.45rem 1.1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.edu-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.8rem;
  width: 5px;
  height: 5px;
  background: var(--accent);
  opacity: 0.45;
}

.edu-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.edu-tag {
  padding: 0.38rem 0.7rem;
  border: 1px solid var(--border-dark);
  font-size: 0.78rem;
  color: var(--text-silver);
  transition: all 0.2s;
}

.edu-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ==============================
   EXPERIENCE PANEL — TIMELINE
   ============================== */

.exp-timeline {
  position: relative;
  padding-left: 2.25rem;
}

/* Vertical connecting line */
.exp-timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--border-dark);
}

.exp-entry {
  position: relative;
  padding-bottom: 2rem;
}

.exp-entry:last-child {
  padding-bottom: 0;
}

/* Timeline dot */
.exp-dot {
  position: absolute;
  left: -2.25rem;
  top: 6px;
  width: 11px;
  height: 11px;
  border: 2px solid var(--border-default);
  background: var(--bg-secondary);
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 1;
}

/* First entry dot = active (current job) */
.exp-entry:first-child .exp-dot {
  border-color: var(--accent);
  background: var(--accent);
}

.exp-entry:hover .exp-dot {
  border-color: var(--accent);
  background: var(--accent);
  transform: scale(1.3);
}

.exp-date {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.06em;
  margin-bottom: 0.3rem;
}

.exp-title {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin: 0 0 0.15rem;
}

.exp-company {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 0.45rem;
}

.exp-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

/* ==============================
   SKILLS PANEL — BENTO GRID
   ============================== */

.skills-bento {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.bento-cell {
  padding: 1.35rem;
  border: 1px solid var(--border-dark);
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
}

.bento-cell:hover {
  border-color: var(--accent);
  background: rgba(255, 94, 0, 0.02);
}

.bento-title {
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.16em;
  margin-bottom: 0.85rem;
}

.bento-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.bento-tag {
  padding: 0.38rem 0.65rem;
  background: var(--bg-elevated);
  font-size: 0.78rem;
  color: var(--text-silver);
  transition: all 0.2s;
}

.bento-tag:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

/* ==============================
   ACTIONS
   ============================== */
.about-actions {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-dark);
}

.action-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1.5rem;
  background: var(--accent);
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 4px 24px rgba(255, 94, 0, 0.25);
  transform: translateY(-2px);
}

.action-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 0;
  border-bottom: 2px solid var(--border-default);
  text-decoration: none;
  transition: all 0.3s ease;
}

.as-idx {
  font-family: var(--font-heading);
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--text-dim);
  transition: color 0.3s;
}

.as-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  transition: color 0.3s;
}

.action-secondary:hover {
  border-bottom-color: var(--accent);
}

.action-secondary:hover .as-idx,
.action-secondary:hover .as-label {
  color: var(--accent);
}

/* ==============================
   ANIMATIONS
   ============================== */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}

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
  .about-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .about-sidebar {
    display: none;
  }

  .about-tabs-mob {
    display: flex;
  }

  .edu-columns {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* ==============================
   RESPONSIVE — MOBILE
   ============================== */
@media (max-width: 768px) {
  .about {
    padding: 3rem 1.25rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .profile-name {
    font-size: 1.3rem;
  }

  .profile-bio {
    font-size: 0.88rem;
  }

  .pstat-num {
    font-size: 1.6rem;
  }

  .pstat-lbl {
    font-size: 0.52rem;
  }

  .about-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .action-secondary {
    width: 100%;
  }
}

/* ==============================
   RESPONSIVE — SMALL MOBILE
   ============================== */
@media (max-width: 480px) {
  .about {
    padding: 2.5rem 1rem;
  }

  .profile-img {
    width: 72px;
    height: 88px;
  }

  .profile-name {
    font-size: 1.15rem;
  }

  .profile-role {
    font-size: 0.8rem;
  }

  .profile-bio {
    font-size: 0.84rem;
    line-height: 1.65;
  }

  .pstat-num {
    font-size: 1.4rem;
  }

  .pstat {
    padding: 0.5rem 0.25rem;
  }

  .pi-tag {
    font-size: 0.8rem;
  }

  .skills-bento {
    grid-template-columns: 1fr;
  }

  .exp-title {
    font-size: 0.95rem;
  }

  .action-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 380px) {
  .about {
    padding: 2rem 0.85rem;
  }

  .section-marker {
    padding: 0.4rem 0.65rem;
  }

  .marker-title {
    font-size: 0.82rem;
  }

  .profile-stats {
    flex-wrap: wrap;
  }

  .pstat-sep {
    display: none;
  }

  .pstat {
    flex: 0 0 50%;
    padding: 0.5rem 0;
  }
}
</style>
