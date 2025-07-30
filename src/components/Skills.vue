<template>
  <section id="skills" class="skills-section">
    <!-- Section Header -->
    <div class="section-header">
      <h2 class="main-title">Skills & Tech Stack</h2>
      <div class="title-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
        <div class="decoration-line"></div>
      </div>
      <p class="section-subtitle">Technologies I work with to build exceptional digital experiences</p>
    </div>

    <!-- Skills Grid -->
    <div class="skills-grid">
      <v-motion
        v-for="(category, index) in skillCategories"
        :key="category.title"
        class="skill-card"
        :initial="{ opacity: 0, y: 30, scale: 0.95 }"
        :enter="{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { 
            delay: index * 0.15, 
            duration: 0.6,
            type: 'spring',
            stiffness: 120
          }
        }"
      >
        <!-- Card Header -->
        <div class="card-header">
          <div class="category-icon-wrapper">
            <Icon :icon="category.icon" class="category-icon" />
          </div>
          <div class="header-content">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="skill-count">{{ category.skills.length }} Technologies</div>
          </div>
          <div class="card-number">{{ String(index + 1).padStart(2, '0') }}</div>
        </div>

        <!-- Card Description -->
        <p class="category-description">{{ category.description }}</p>

        <!-- Skills List -->
        <div class="skills-container">
          <div
            v-for="(skill, skillIndex) in category.skills"
            :key="skill.name"
            class="skill-item"
            :style="{ '--skill-delay': skillIndex * 0.05 + 's' }"
            @mouseenter="handleSkillHover(skill)"
            @mouseleave="handleSkillLeave"
          >
            <div class="skill-icon-wrapper">
              <Icon :icon="skill.icon" class="skill-icon" />
            </div>
            <span class="skill-name">{{ skill.name }}</span>
            <div class="skill-indicator"></div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <div class="expertise-level">
            <span class="level-label">Expertise Level</span>
            <div class="level-dots">
              <div 
                v-for="dot in 5" 
                :key="dot" 
                class="level-dot"
                :class="{ active: dot <= category.level }"
              ></div>
            </div>
          </div>
        </div>
      </v-motion>
    </div>

    <!-- Bottom Stats -->
    <div class="stats-section">
      <v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }"
        class="stats-container"
      >
        <div class="stat-item">
          <div class="stat-number">{{ totalSkills }}+</div>
          <div class="stat-label">Technologies</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">4</div>
          <div class="stat-label">Specializations</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">3+</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </v-motion>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { MotionPlugin } from '@vueuse/motion'

const hoveredSkill = ref<string | null>(null)

const skillCategories = [
  {
    title: 'Frontend',
    icon: 'lucide:monitor',
    level: 5,
    description: 'I build modern, responsive user interfaces using tools like Vue.js, React, and TypeScript. My focus is on creating clean, fast, and user-friendly designs that look good on all devices.',
    skills: [
      { name: 'Vue.js', icon: 'logos:vue' },
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'HTML5', icon: 'logos:html-5' },
      { name: 'CSS3', icon: 'logos:css-3' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' }
    ]
  },
  {
    title: 'Backend',
    icon: 'lucide:server',
    level: 4,
    description: 'I develop secure and scalable backend systems using Django and Node.js. I handle server logic, APIs, and database connections to power the core of web applications.',
    skills: [
      { name: 'Django', icon: 'logos:django-icon' },
      { name: 'Python', icon: 'logos:python' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'FastAPI', icon: 'logos:fastapi' },
      { name: 'Flask', icon: 'logos:flask' },
      { name: 'GraphQL', icon: 'logos:graphql' },
      { name: 'REST APIs', icon: 'lucide:api' },
      { name: 'PHP Laravel', icon: 'logos:laravel' },
      { name: 'Express.js', icon: 'skill-icons:expressjs-dark' }
    ]
  },
  {
    title: 'Database',
    icon: 'lucide:database',
    level: 4,
    description: 'Storing and retrieving data efficiently with optimized database design and query performance for scalable applications.',
    skills: [
      { name: 'MySQL', icon: 'logos:mysql-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'MariaDB', icon: 'logos:mariadb' },
      { name: 'SQLite', icon: 'vscode-icons:file-type-sqlite' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' }
    ]
  },
  {
    title: 'Design',
    icon: 'lucide:palette',
    level: 4,
    description: 'Designing interfaces and product visuals that combine aesthetics with functionality to create engaging user experiences.',
    skills: [
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'Photoshop', icon: 'logos:adobe-photoshop' },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
      { name: 'Canva', icon: 'simple-icons:canva' }
    ]
  }
]

const totalSkills = computed(() => {
  return skillCategories.reduce((total, category) => total + category.skills.length, 0)
})

const handleSkillHover = (skill: any) => {
  hoveredSkill.value = skill.name
}

const handleSkillLeave = () => {
  hoveredSkill.value = null
}
</script>

<style scoped>
.skills-section {
  padding: 5rem 2rem;
  background: 
    linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
  
  position: relative;
  overflow: hidden;
  width: 100%;
  
}

.skills-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Dark theme support */
body.dark-theme .skills-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
}

body.dark-theme .skills-section::before {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.main-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

body.dark-theme .main-title {
  color: #f8fafc;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.decoration-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #6366f1, transparent);
}

.decoration-dot {
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

body.dark-theme .section-subtitle {
  color: #94a3b8;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  margin-bottom: 4rem;
}

/* Skill Cards */
.skill-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

body.dark-theme .skill-card {
  background: #1e293b;
  border-color: #334155;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.skill-card:hover::before {
  opacity: 1;
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.08),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #c7d2fe;
}

body.dark-theme .skill-card:hover {
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
  border-color: #4f46e5;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.category-icon {
  font-size: 1.5rem;
}

.header-content {
  flex: 1;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

body.dark-theme .category-title {
  color: #f8fafc;
}

.skill-count {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

body.dark-theme .skill-count {
  color: #94a3b8;
}

.card-number {
  font-size: 2rem;
  font-weight: 800;
  color: #e2e8f0;
  position: absolute;
  right: 0;
  top: -0.5rem;
  line-height: 1;
}

body.dark-theme .card-number {
  color: #334155;
}

/* Description */
.category-description {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

body.dark-theme .category-description {
  color: #cbd5e1;
}

/* Skills Container */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  animation: skillFadeIn 0.6s ease-out var(--skill-delay) both;
}

body.dark-theme .skill-item {
  background: #0f172a;
  border-color: #334155;
}

@keyframes skillFadeIn {
  0% { 
    opacity: 0; 
    transform: translateY(20px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.skill-item:hover {
  background: #f1f5f9;
  border-color: #c7d2fe;
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.1);
}

body.dark-theme .skill-item:hover {
  background: #1e293b;
  border-color: #4f46e5;
}

.skill-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.skill-icon {
  font-size: 2rem;
  transition: transform 0.3s ease;
}

.skill-item:hover .skill-icon {
  transform: scale(1.1);
}

.skill-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  text-align: center;
  line-height: 1.3;
}

body.dark-theme .skill-name {
  color: #d1d5db;
}

.skill-indicator {
  width: 4px;
  height: 4px;
  background: #d1d5db;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.skill-item:hover .skill-indicator {
  background: #6366f1;
  transform: scale(1.5);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Card Footer */
.card-footer {
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

body.dark-theme .card-footer {
  border-color: #374151;
}

.expertise-level {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.level-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

body.dark-theme .level-label {
  color: #9ca3af;
}

.level-dots {
  display: flex;
  gap: 0.5rem;
}

.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e5e7eb;
  transition: all 0.3s ease;
}

body.dark-theme .level-dot {
  background: #374151;
}

.level-dot.active {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

/* Stats Section */
.stats-section {
  position: relative;
  z-index: 2;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  max-width: 600px;
  margin: 0 auto;
}

body.dark-theme .stats-container {
  background: #1e293b;
  border-color: #334155;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

body.dark-theme .stat-label {
  color: #94a3b8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #e2e8f0;
}

body.dark-theme .stat-divider {
  background: #334155;
}

/* Responsive Design */
@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .skill-card {
    padding: 1.5rem;
  }
  
  .skills-container {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
  }
  
  .skill-item {
    padding: 1rem 0.75rem;
  }
  
  .stats-container {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
  }
  
  .stat-divider {
    width: 40px;
    height: 1px;
  }
  
  .card-number {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .skills-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .decoration-line {
    width: 40px;
  }
}</style>