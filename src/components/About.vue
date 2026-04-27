<template>
  <section id="about" class="about">
    <div class="about-inner">
      <div class="section-label">
        <span class="label-num">01</span>
        <h2 class="label-title">ABOUT</h2>
        <div class="label-line"></div>
      </div>

      <!-- Tabs -->
      <div class="about-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Profile -->
      <div v-if="activeTab === 'profile'" class="tab-panel">
        <div class="profile-card">
          <div class="profile-top">
            <div class="profile-avatar-wrap">
              <img
                src="/profile.JPG"
                alt="Kelvin Kamau"
                class="profile-avatar"
              />
              <div class="profile-status"></div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">Kelvin Njenga Kamau</h3>
              <div class="profile-title">
                Full Stack Developer & UI/UX Engineer
              </div>
              <p class="profile-bio">
                I'm a passionate Full Stack Developer with a strong foundation
                in software development, UI/UX, and digital strategy. I
                specialize in crafting scalable, responsive web apps that solve
                real-world problems — combining clean frontend design with
                powerful backend logic.
              </p>
            </div>
          </div>
          <div class="profile-stats">
            <div class="ps-item">
              <div class="ps-val">3+</div>
              <div class="ps-lbl">Years Experience</div>
            </div>
            <div class="ps-item">
              <div class="ps-val">20+</div>
              <div class="ps-lbl">Projects Completed</div>
            </div>
            <div class="ps-item">
              <div class="ps-val">15+</div>
              <div class="ps-lbl">Happy Clients</div>
            </div>
          </div>
          <div class="profile-interests">
            <h4 class="pi-title">INTERESTS</h4>
            <div class="pi-grid">
              <div class="pi-item"><i class="fas fa-gamepad"></i> Gaming</div>
              <div class="pi-item"><i class="fas fa-book"></i> Reading</div>
              <div class="pi-item"><i class="fas fa-music"></i> Music</div>
              <div class="pi-item"><i class="fas fa-futbol"></i> Football</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div v-if="activeTab === 'education'" class="tab-panel">
        <div class="edu-card">
          <div class="edu-header">
            <div class="edu-icon"><i class="fas fa-graduation-cap"></i></div>
            <div class="edu-info">
              <h3 class="edu-degree">Bachelor's in Information Science</h3>
              <div class="edu-meta">
                <span>Meru University of Science and Technology</span>
                <span class="edu-period">2019 — 2023</span>
              </div>
            </div>
          </div>
          <div class="edu-body">
            <div class="edu-block">
              <h4>Achievements</h4>
              <ul>
                <li>Second Class Honors (Upper Division)</li>
                <li>Specialized in Software Development & Database Systems</li>
                <li>Final year project: E-commerce Platform Development</li>
              </ul>
            </div>
            <div class="edu-block">
              <h4>Coursework</h4>
              <div class="coursework-grid">
                <span>Web Development</span><span>Database Systems</span
                ><span>Software Engineering</span> <span>UI/UX Design</span
                ><span>Data Structures</span><span>Algorithms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="activeTab === 'experience'" class="tab-panel">
        <div class="exp-mini-list">
          <div
            class="exp-mini"
            v-for="exp in miniExperiences"
            :key="exp.period"
          >
            <div class="exp-mini-date">{{ exp.period }}</div>
            <div class="exp-mini-content">
              <h4 class="exp-mini-title">{{ exp.title }}</h4>
              <div class="exp-mini-company">{{ exp.company }}</div>
              <p class="exp-mini-desc">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="activeTab === 'skills'" class="tab-panel">
        <div class="about-skills-grid">
          <div
            v-for="cat in skillCategories"
            :key="cat.title"
            class="askill-cat"
          >
            <h4 class="askill-title">{{ cat.title }}</h4>
            <div class="askill-list">
              <span v-for="s in cat.skills" :key="s" class="askill-item">{{
                s
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="about-actions">
        <a href="/Kamau_Kelvin_Resume.pdf" class="action-btn primary" download>
          <i class="fas fa-download"></i> Download Resume
        </a>
        <a href="#contact" class="action-btn secondary">
          <i class="fas fa-envelope"></i> Contact Me
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
.about {
  padding: 5rem 2rem;
  background: var(--bg-secondary);
}

.about-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.label-num {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.label-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.08em;
}

.label-line {
  flex: 1;
  height: 1px;
  background: var(--border-default);
}

/* Tabs */
.about-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-dark);
}

.tab-btn {
  padding: 0.65rem 1.25rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -1px;
}

.tab-btn:hover {
  color: var(--text-silver);
}

.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* Profile Card */
.profile-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-left: 3px solid var(--accent);
  padding: 1.75rem;
  border-radius: 2px;
}

.profile-top {
  display: flex;
  gap: 1.75rem;
  margin-bottom: 1.5rem;
}

.profile-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent);
  filter: grayscale(100%) contrast(1.1);
  transition: filter 0.4s;
}

.profile-avatar:hover {
  filter: grayscale(0%);
}

.profile-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--bg-card);
}

.profile-name {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.03em;
  margin-bottom: 0.25rem;
}

.profile-title {
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.profile-bio {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.65;
}

.profile-stats {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-dark);
  border-bottom: 1px solid var(--border-dark);
  margin-bottom: 1.5rem;
}

.ps-item {
  flex: 1;
  text-align: center;
}

.ps-val {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
}

.ps-lbl {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pi-title {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-white);
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.pi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
}

.pi-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: var(--bg-elevated);
  border-radius: 2px;
  font-size: 0.85rem;
  color: var(--text-silver);
  transition: all 0.2s;
}

.pi-item:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

.pi-item i {
  font-size: 0.9rem;
  color: var(--accent);
  width: 18px;
  text-align: center;
}

/* Education */
.edu-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-left: 3px solid var(--accent);
  padding: 1.75rem;
  border-radius: 2px;
}

.edu-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.edu-icon {
  width: 44px;
  height: 44px;
  background: var(--accent-dim);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.edu-degree {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
}

.edu-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.edu-period {
  color: var(--accent);
  font-weight: 500;
}

.edu-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.edu-block h4 {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.edu-block ul {
  list-style: none;
  padding: 0;
}

.edu-block li {
  padding: 0.35rem 0;
  padding-left: 1rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  border-left: 2px solid var(--border-default);
  line-height: 1.5;
}

.coursework-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.coursework-grid span {
  padding: 0.4rem 0.6rem;
  background: var(--bg-elevated);
  font-size: 0.8rem;
  color: var(--text-silver);
  text-align: center;
}

/* Mini Experience */
.exp-mini-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.exp-mini {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-dark);
}

.exp-mini:first-child {
  border-top: 1px solid var(--border-dark);
}

.exp-mini-date {
  width: 130px;
  flex-shrink: 0;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
  padding-top: 2px;
}

.exp-mini-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.02em;
  margin-bottom: 0.15rem;
}

.exp-mini-company {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.exp-mini-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
}

/* About Skills */
.about-skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.askill-cat {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.25rem;
  border-radius: 2px;
}

.askill-title {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.askill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.askill-item {
  padding: 0.3rem 0.6rem;
  background: var(--bg-elevated);
  font-size: 0.8rem;
  color: var(--text-silver);
  transition: all 0.2s;
}

.askill-item:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

/* Actions */
.about-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  border-radius: 2px;
  transition: all 0.25s;
  cursor: pointer;
}

.action-btn.primary {
  background: var(--accent);
  color: #000;
  border: none;
}

.action-btn.primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 20px rgba(255, 94, 0, 0.3);
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: transparent;
  color: var(--text-silver);
  border: 1px solid var(--border-default);
}

.action-btn.secondary:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .about {
    padding: 3rem 1.25rem;
  }
  .profile-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .profile-bio {
    text-align: left;
  }
  .edu-body {
    grid-template-columns: 1fr;
  }
  .exp-mini {
    flex-direction: column;
    gap: 0.5rem;
  }
  .exp-mini-date {
    width: auto;
  }
  .about-actions {
    flex-direction: column;
  }
  .action-btn {
    justify-content: center;
  }
}
</style>
