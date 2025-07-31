<template>
  <section id="projects" class="projects-section">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-badge">
        <span class="badge-icon">💼</span>
        <span>Portfolio</span>
      </div>
      <h2 class="section-title">Featured Projects</h2>
      <div class="title-decoration">
        <div class="decoration-dot"></div>
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
      </div>
      <p class="section-subtitle">
        A collection of projects that showcase my technical skills and creative problem-solving abilities
      </p>
    </div>

    <!-- Filter Categories -->
    <div class="filter-container">
      <div class="filter-tabs">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeFilter = category"
          :class="['filter-tab', { active: activeFilter === category }]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid">
      <div
        v-for="(project, index) in filteredProjects.slice(0, visibleProjects)"
        :key="index"
        class="project-card"
        :style="{ '--delay': index * 0.1 + 's' }"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Project Number -->
        <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
        
        <!-- Project Image -->
        <div class="project-image-container">
          <div class="image-wrapper">
            <img 
              :src="project.image" 
              :alt="project.title" 
              class="project-image"
            />
            <div class="image-overlay">
              <div class="overlay-content">
                <button 
                  v-if="project.demo !== '#'" 
                  @click="openLink(project.demo)"
                  class="overlay-btn demo-btn"
                >
                  <span class="btn-icon">🚀</span>
                  Live Demo
                </button>
                <button 
                  @click="openLink(project.github)"
                  class="overlay-btn code-btn"
                >
                  <span class="btn-icon">📝</span>
                  View Code
                </button>
              </div>
            </div>
          </div>
          
          <!-- Status Badge -->
          <div class="status-badge" :class="project.status">
            {{ project.status === 'live' ? '🟢 Live' : '🔧 Development' }}
          </div>
        </div>
        
        <!-- Project Content -->
        <div class="project-content">
          <!-- Header -->
          <div class="project-header">
            <h3 class="project-title">{{ project.title }}</h3>
            <div class="project-links">
              <a 
                :href="project.github" 
                target="_blank" 
                class="project-link github-link"
                title="View Source Code"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                v-if="project.demo !== '#'"
                :href="project.demo" 
                target="_blank" 
                class="project-link demo-link"
                title="View Live Demo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m18 13 6-6-6-6"/>
                  <path d="M3 7v6h18"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Description -->
          <p class="project-description">{{ project.description }}</p>
          
          <!-- Features -->
          <div class="project-features" v-if="project.features">
            <h4 class="features-title">Key Features:</h4>
            <ul class="features-list">
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
          
          <!-- Tech Stack -->
          <div class="tech-stack">
            <div class="stack-header">
              <span class="stack-icon">⚡</span>
              <span class="stack-title">Tech Stack</span>
            </div>
            <div class="tech-tags">
              <span 
                v-for="(tech, i) in project.tech" 
                :key="i"
                class="tech-tag"
                :style="{ '--tag-delay': i * 0.05 + 's' }"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Project Stats -->
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-value">{{ project.duration || '2-4' }}</span>
              <span class="stat-label">Weeks</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ project.team || 'Solo' }}</span>
              <span class="stat-label">Team</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ project.year || '2024' }}</span>
              <span class="stat-label">Year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Load More Button -->
    <div class="load-more-container" v-if="showViewMore">
      <button class="load-more-btn" @click="loadMoreProjects">
        <span>Load More Projects</span>
        <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 13l3 3 7-7"/>
        </svg>
      </button>
      <div class="projects-counter">
        {{ visibleProjects }} of {{ filteredProjects.length }} projects
      </div>
    </div>

    <!-- Background Decorations -->
    <div class="bg-decorations">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const hoveredIndex = ref(null)
const visibleProjects = ref(6)
const activeFilter = ref('All')

const categories = ['All', 'Web Development', 'E-commerce', 'Full Stack', 'Frontend']

const projects = [
  {
  title: 'INOFO Africa Website',
  description: 'A modern and responsive informational website for INOFO Africa, aligned with INOFO’s global identity. The platform showcases organizational objectives, membership details, activities, and an archive section, providing a strong digital presence for African organic farmer organizations.',
  tech: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Responsive Design'],
  category: 'Organizational Website',
  github: 'https://github.com/Njenga993/INOFO-Africa-',
  demo: 'https://njenga993.github.io/INOFO-Africa-/',
  image: import.meta.env.BASE_URL + 'inofo-africa.PNG',
  status: 'live',
  duration: '2-3',
  team: 'Solo',
  year: '2025',
  features: ['Organizational Info Pages', 'Membership Form', 'Responsive Layout', 'Multilingual Structure Ready']
},
{
  title: 'Greania Build Website',
  description: 'A clean, professional website developed for Greania Build, a construction and interior design company. The platform highlights their services, project portfolio, and contact details, offering an engaging experience for prospective clients.',
  tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  category: 'Corporate Website',
  github: 'https://github.com/Njenga993/greania-build',
  demo: 'https://njenga993.github.io/greania-build/',
  image: import.meta.env.BASE_URL + 'greania-build.PNG',
  status: 'live',
  duration: '2',
  team: 'Solo',
  year: '2024',
  features: ['Services Showcase', 'Project Gallery', 'Contact Form', 'Responsive Layout']
},
  {
    title: 'Nyakazi Organics Ecommerce',
    description: 'A comprehensive e-commerce platform for organic products featuring seamless shopping experience, secure payment integration, and responsive design optimized for all devices.',
    tech: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'Responsive Design'],
    category: 'E-commerce',
    github: 'https://github.com/Njenga993/Nyakazi-ecommerce-',
    demo: 'https://njenga993.github.io/Nyakazi-ecommerce-/',
    image: import.meta.env.BASE_URL + 'Nyakazi-ecommerce.PNG',
    status: 'live',
    duration: '3-4',
    team: 'Solo',
    year: '2024',
    features: ['Product Catalog', 'Shopping Cart', 'Order Management', 'Mobile Responsive']
  },
  {
    title: 'Nyakazi Corporate Website',
    description: 'Professional corporate website for Nyakazi Organics showcasing company values, products, and services with modern design and optimal user experience.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'SEO'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/Nyakazi',
    demo: 'https://nyakazi.org',
    image: import.meta.env.BASE_URL + 'Nyakazi.png',
    status: 'live',
    duration: '2-3',
    team: 'Solo',
    year: '2024',
    features: ['Company Portfolio', 'Contact Forms', 'SEO Optimized', 'Fast Loading']
  },
  {
    title: 'Desiderata Consultancy',
    description: 'Professional consultancy firm website featuring service portfolios, client testimonials, and integrated contact systems with Google Maps integration.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'UX Design', 'Google Maps API'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/Firm-Desiderata',
    demo: 'https://desiderataconsultancyfirm.com/',
    image: import.meta.env.BASE_URL + 'Desiderata.png',
    status: 'live',
    duration: '3',
    team: 'Solo',
    year: '2024',
    features: ['Service Showcase', 'Contact Integration', 'Maps Integration', 'Professional Design']
  },
  {
    title: 'SaleHub POS System',
    description: 'Full-featured Point of Sale system with comprehensive inventory management, sales tracking, and detailed reporting capabilities for retail businesses.',
    tech: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'REST API'],
    category: 'Full Stack',
    github: 'https://github.com/Njenga993/pos-project',
    demo: '#',
    image: import.meta.env.BASE_URL + 'salehubPOS.png',
    status: 'development',
    duration: '6-8',
    team: 'Solo',
    year: '2024',
    features: ['Inventory Management', 'Sales Analytics', 'User Authentication', 'Real-time Updates']
  },
  {
    title: 'React Portfolio Website',
    description: 'Modern portfolio website built with React showcasing professional experience, skills, and projects with smooth animations and interactive elements.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Responsive Design', 'CSS3'],
    category: 'Frontend',
    github: 'https://github.com/Njenga993/Portfolio-',
    demo: 'https://njenga993.github.io/Portfolio-/',
    image: import.meta.env.BASE_URL + 'React_Portfolio.PNG',
    status: 'live',
    duration: '2',
    team: 'Solo',
    year: '2024',
    features: ['Interactive Animations', 'Project Showcase', 'Skills Display', 'Contact Integration']
  },
  {
    title: 'Techlungs Technology',
    description: 'Dynamic landing page for Techlungs Technology featuring smooth GSAP animations, interactive elements, and modern design patterns.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'UI/UX Design'],
    category: 'Frontend',
    github: 'https://github.com/Njenga993/Techlungs',
    demo: 'https://techlungs.co.ke/',
    image: import.meta.env.BASE_URL + 'Techlungs.png',
    status: 'live',
    duration: '2-3',
    team: 'Solo',
    year: '2024',
    features: ['GSAP Animations', 'Interactive UI', 'Modern Design', 'Performance Optimized']
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})

const showViewMore = computed(() => {
  return visibleProjects.value < filteredProjects.value.length
})

const openLink = (url) => {
  if (url !== '#') {
    window.open(url, '_blank')
  }
}

const loadMoreProjects = () => {
  visibleProjects.value += 3
}
</script>

<style scoped>
.projects-section {
  padding: 6rem 2rem;
  background: 
    linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  
  width: 100%;
  
}

.projects-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* Dark theme */
body.dark-theme .projects-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #e2e8f0;
}

/* Background Decorations */
.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
  animation: float 20s ease-in-out infinite;
}

.decoration-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: -3%;
  animation-delay: 7s;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 1.5rem;
}

.badge-icon {
  font-size: 1rem;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

body.dark-theme .section-title {
  color: #f8fafc;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.decoration-dot {
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
}

.decoration-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #3b82f6, transparent);
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

body.dark-theme .section-subtitle {
  color: #94a3b8;
}

/* Filter Container */
.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

body.dark-theme .filter-tabs {
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

.filter-tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.filter-tab:hover {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

.filter-tab.active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Projects Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

/* Project Cards */
.project-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  animation: projectSlideIn 0.6s ease-out var(--delay) both;
}

body.dark-theme .project-card {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

@keyframes projectSlideIn {
  0% { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Project Number */
.project-number {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  z-index: 3;
  backdrop-filter: blur(10px);
}

/* Project Image */
.project-image-container {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  gap: 1rem;
}

.overlay-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.demo-btn {
  background: #3b82f6;
  color: white;
}

.demo-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.code-btn {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.code-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1rem;
}

/* Status Badge */
.status-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.status-badge.live {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.status-badge.development {
  background: rgba(249, 115, 22, 0.9);
  color: white;
}

/* Project Content */
.project-content {
  padding: 2rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

body.dark-theme .project-title {
  color: #f8fafc;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-left: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f5f9;
  color: #64748b;
  transition: all 0.3s ease;
}

body.dark-theme .project-link {
  background: #334155;
  color: #94a3b8;
}

.project-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.project-description {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

body.dark-theme .project-description {
  color: #cbd5e1;
}

/* Features */
.project-features {
  margin-bottom: 1.5rem;
}

.features-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

body.dark-theme .features-title {
  color: #d1d5db;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  position: relative;
  padding-left: 1rem;
}

body.dark-theme .features-list li {
  color: #9ca3af;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #22c55e;
  font-weight: 600;
}

/* Tech Stack */
.tech-stack {
  margin-bottom: 2rem;
}

.stack-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stack-icon {
  font-size: 1rem;
}

.stack-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

body.dark-theme .stack-title {
  color: #d1d5db;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  color: #374151;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  animation: tagFadeIn 0.5s ease var(--tag-delay) both;
}

body.dark-theme .tech-tag {
  background: #334155;
  color: #d1d5db;
  border-color: #475569;
}

@keyframes tagFadeIn {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}

/* Project Stats */
.project-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

body.dark-theme .project-stats {
  border-color: #374151;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}

body.dark-theme .stat-value {
  color: #f8fafc;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

body.dark-theme .stat-label {
  color: #94a3b8;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #e5e7eb;
  margin: 0 1rem;
}

body.dark-theme .stat-divider {
  background: #374151;
}

/* Load More Section */
.load-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;
  position: relative;
  z-index: 2;
}

.load-more-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.load-more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.load-more-btn:hover::before {
  left: 100%;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.load-more-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.projects-counter {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

body.dark-theme .projects-counter {
  color: #94a3b8;
  background: rgba(30, 41, 59, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
}

/* Responsive Design */

@media (max-width: 768px) {
  .projects-section {
    padding: 4rem 1.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .project-card {
    margin: 0;
  }
  
  .project-image-container {
    height: 200px;
  }
  
  .project-content {
    padding: 1.5rem;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  
  .overlay-content {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .overlay-btn {
    padding: 0.5rem 1.25rem;
    font-size: 0.8rem;
  }
  
  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 3rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .project-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .project-links {
    margin-left: 0;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .filter-tabs {
    padding: 0.25rem;
  }
  
  .filter-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
  
  .tech-tags {
    gap: 0.375rem;
  }
  
  .tech-tag {
    padding: 0.375rem 0.75rem;
    font-size: 0.7rem;
  }
  
  .project-stats {
    gap: 0.5rem;
  }
  
  .stat-value {
    font-size: 1.1rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
  
  .load-more-btn {
    padding: 0.875rem 1.75rem;
    font-size: 0.875rem;
  }
}

/* Print styles */
@media print {
  .bg-decorations,
  .load-more-container,
  .filter-container {
    display: none;
  }
  
  .project-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
  
  .projects-grid {
    gap: 1rem;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .project-card {
    border: 2px solid #000;
  }
  
  .filter-tab.active {
    background: #000;
    color: #fff;
  }
  
  .tech-tag {
    border: 1px solid #000;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .project-card,
  .tech-tag,
  .decoration,
  .load-more-btn::before {
    animation: none;
    transition: none;
  }
  
  .project-card:hover {
    transform: none;
  }
}
</style>