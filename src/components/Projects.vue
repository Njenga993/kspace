<template>
  <section id="projects" class="projects-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">projects@portfolio:~# ./explore.sh</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Info -->
        <div class="system-info">
          <div class="info-line">
            <span class="info-text">System:</span>
            <span class="info-value">Portfolio v2.0.24</span>
          </div>
          <div class="info-line">
            <span class="info-text">Directory:</span>
            <span class="info-value">~/projects</span>
          </div>
          <div class="info-line">
            <span class="info-text">Total Projects:</span>
            <span class="info-value">{{ projects.length }}</span>
          </div>
        </div>
        
        <!-- Terminal Tabs -->
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'grid' }" 
            @click="activeTab = 'grid'"
          >
            <span class="tab-icon">📁</span>
            <span class="tab-text">grid</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'list' }" 
            @click="activeTab = 'list'"
          >
            <span class="tab-icon">📋</span>
            <span class="tab-text">list</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'code' }" 
            @click="activeTab = 'code'"
          >
            <span class="tab-icon">💻</span>
            <span class="tab-text">code</span>
          </div>
        </div>
        
        <!-- Filter Command -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">filter --category=</span>
          <div class="filter-input">
            <span class="filter-value">{{ activeFilter }}</span>
            <span class="cursor">_</span>
          </div>
        </div>
        
        <div class="filter-options">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeFilter = category"
            :class="['filter-option', { active: activeFilter === category }]"
          >
            {{ category }}
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Grid View -->
          <div v-if="activeTab === 'grid'" class="grid-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">ls -la projects/</span>
            </div>
            
            <div class="projects-grid">
              <div
                v-for="(project, index) in paginatedProjects"
                :key="index"
                class="project-card"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="openProjectDetails(project)"
              >
                <div class="project-header">
                  <div class="project-icon">
                    <i class="fas fa-folder"></i>
                  </div>
                  <div class="project-info">
                    <h3 class="project-name">{{ project.title }}</h3>
                    <div class="project-meta">
                      <span class="project-size">{{ project.size || '2.5MB' }}</span>
                      <span class="project-date">{{ project.date || '2024-01-15' }}</span>
                    </div>
                  </div>
                  <div class="project-status" :class="project.status">
                    <span class="status-dot"></span>
                  </div>
                </div>
                
                <div class="project-preview">
                  <img :src="project.image" :alt="project.title" class="project-image" />
                  <div class="project-overlay">
                    <div class="overlay-content">
                      <h4>{{ project.title }}</h4>
                      <p>{{ project.description }}</p>
                      <div class="tech-tags">
                        <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tech-tag">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="project-actions">
                  <a :href="project.github" target="_blank" class="action-btn">
                    <i class="fab fa-github"></i>
                  </a>
                  <a v-if="project.demo !== '#'" :href="project.demo" target="_blank" class="action-btn">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- List View -->
          <div v-if="activeTab === 'list'" class="list-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat projects.txt</span>
            </div>
            
            <div class="projects-list">
              <div
                v-for="(project, index) in paginatedProjects"
                :key="index"
                class="list-item"
                :style="{ '--delay': index * 0.05 + 's' }"
                @click="openProjectDetails(project)"
              >
                <div class="list-icon">
                  <i class="fas fa-file-code"></i>
                </div>
                <div class="list-content">
                  <h3 class="list-title">{{ project.title }}</h3>
                  <p class="list-description">{{ project.description }}</p>
                  <div class="list-meta">
                    <div class="tech-list">
                      <span v-for="tech in project.tech.slice(0, 4)" :key="tech" class="tech-item">
                        {{ tech }}
                      </span>
                    </div>
                    <div class="list-status" :class="project.status">
                      {{ project.status === 'live' ? 'Live' : 'Development' }}
                    </div>
                  </div>
                </div>
                <div class="list-actions">
                  <a :href="project.github" target="_blank" class="action-btn">
                    <i class="fab fa-github"></i>
                  </a>
                  <a v-if="project.demo !== '#'" :href="project.demo" target="_blank" class="action-btn">
                    <i class="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Code View -->
          <div v-if="activeTab === 'code'" class="code-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat project_details.json</span>
            </div>
            
            <div class="code-container">
              <div class="code-line">
                <span class="line-number">01</span>
                <span class="code-content">
                  <span class="code-bracket">{</span>
                </span>
              </div>
              
              <div
                v-for="(project, index) in paginatedProjects"
                :key="index"
                class="code-project"
                :style="{ '--delay': index * 0.1 + 's' }"
                @click="openProjectDetails(project)"
              >
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 2).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"{{ project.title.replace(/\s+/g, '') }}":</span>
                    <span class="code-bracket">{</span>
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 3).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"title":</span>
                    <span class="code-string">"{{ project.title }}"</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 4).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"description":</span>
                    <span class="code-string">"{{ project.description }}"</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 5).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"techStack":</span>
                    <span class="code-bracket">[</span>
                    <span class="tech-stack">
                      <span 
                        v-for="(tech, i) in project.tech" 
                        :key="i"
                        class="tech-item"
                      >
                        <span class="code-string">"{{ tech }}"</span>
                        <span v-if="i < project.tech.length - 1" class="code-punctuation">,</span>
                      </span>
                    </span>
                    <span class="code-bracket">]</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 6).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"status":</span>
                    <span class="code-string">"{{ project.status }}"</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 7).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"links":</span>
                    <span class="code-bracket">{</span>
                    <span class="code-property">"github":</span>
                    <a :href="project.github" target="_blank" class="code-link">
                      <span class="code-string">"{{ project.github }}"</span>
                    </a>,
                    <span class="code-property">"demo":</span>
                    <a v-if="project.demo !== '#'" :href="project.demo" target="_blank" class="code-link">
                      <span class="code-string">"{{ project.demo }}"</span>
                    </a>
                    <span v-else class="code-string">"null"</span>
                    <span class="code-bracket">}</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 8).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-bracket">}</span>
                    <span v-if="index < paginatedProjects.length - 1" class="code-punctuation">,</span>
                  </span>
                </div>
              </div>
              
              <div class="code-line">
                <span class="line-number">{{ String(paginatedProjects.length * 10 + 2).padStart(2, '0') }}</span>
                <span class="code-content">
                  <span class="code-bracket">}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="pagination">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">navigate --page=</span>
          </div>
          
          <div class="pagination-controls">
            <button 
              @click="currentPage > 1 ? currentPage-- : null" 
              :disabled="currentPage === 1"
              class="pagination-btn"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in totalPages" 
                :key="page"
                @click="currentPage = page"
                :class="['page-number', { active: currentPage === page }]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="currentPage < totalPages ? currentPage++ : null" 
              :disabled="currentPage === totalPages"
              class="pagination-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="pagination-info">
            <span class="code-comment">// Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredProjects.length) }} of {{ filteredProjects.length }} projects</span>
          </div>
        </div>
        
        <!-- Terminal Footer -->
        <div class="terminal-footer">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command cursor">_</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Project Details Modal -->
    <div v-if="selectedProject" class="project-modal" @click="closeProjectDetails">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedProject.title }}</h2>
          <button @click="closeProjectDetails" class="close-button">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>
          
          <div class="modal-details">
            <div class="detail-section">
              <h3>Description</h3>
              <p>{{ selectedProject.description }}</p>
            </div>
            
            <div class="detail-section">
              <h3>Technologies Used</h3>
              <div class="tech-list">
                <span v-for="tech in selectedProject.tech" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div v-if="selectedProject.features" class="detail-section">
              <h3>Features</h3>
              <ul>
                <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="detail-section">
              <h3>Project Links</h3>
              <div class="project-links">
                <a :href="selectedProject.github" target="_blank" class="link-btn">
                  <i class="fab fa-github"></i>
                  <span>View Code</span>
                </a>
                <a v-if="selectedProject.demo !== '#'" :href="selectedProject.demo" target="_blank" class="link-btn">
                  <i class="fas fa-external-link-alt"></i>
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('grid');
const activeFilter = ref('All');
const currentPage = ref(1);
const itemsPerPage = 6;
const selectedProject = ref(null);

const categories = ['All', 'Web Development', 'E-commerce', 'Full Stack', 'Frontend'];

const projects = [
  {
    title: 'Seed Savers Network Kenya Website',
    description: 'A dynamic and responsive website for Seed Savers Network Kenya, designed to promote seed sovereignty, showcase programs, events, resources, and facilitate community engagement.',
    tech: ['HTML5', 'TypeScript', 'JavaScript', 'React.js', 'Vite', 'Responsive Design'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/SeedSavers',
    demo: 'https://njenga993.github.io/SeedSavers/',
    image: import.meta.env.BASE_URL + 'ssn.PNG',
    status: 'live',
    size: '3.2MB',
    date: '2024-03-15',
    features: [
      'Program & Project Pages',
      'News & Events Section',
      'Resource Library with Downloads',
      'Donation Functionality',
      'Contact & Regional Office Details',
      'Responsive & Mobile-First Design'
    ]
  },
  {
    title: 'INOFO Africa Website',
    description: 'A modern and responsive information website for INOFO Africa, aligned with INOFOs global identity.',
    tech: ['HTML5', 'Typescript', 'JavaScript', 'React.js', 'Responsive Design'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/INOFO-Africa-',
    demo: 'https://njenga993.github.io/INOFO-Africa-/',
    image: import.meta.env.BASE_URL + 'inofo-africa.PNG',
    status: 'live',
    size: '2.8MB',
    date: '2024-02-20',
    features: ['Organizational Info Pages', 'Membership Form', 'Responsive Layout', 'Multilingual Structure Ready']
  },
  {
    title: 'Greania Build Website',
    description: 'A clean, professional website developed for Greania Build, a construction and interior design company.',
    tech: ['HTML5', 'Typescript', 'JavaScript', 'React.js', 'Responsive Design'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/greania-build',
    demo: 'https://njenga993.github.io/greania-build/',
    image: import.meta.env.BASE_URL + 'greania-build.PNG',
    status: 'live',
    size: '2.5MB',
    date: '2024-01-10',
    features: ['Services Showcase', 'Project Gallery', 'Contact Form', 'Responsive Layout']
  },
  {
    title: 'Nyakazi Organics Ecommerce',
    description: 'A comprehensive e-commerce platform for organic products featuring seamless shopping experience.',
    tech: ['React.js', 'JavaScript', 'CSS3', 'HTML5', 'Responsive Design'],
    category: 'E-commerce',
    github: 'https://github.com/Njenga993/Nyakazi-ecommerce-',
    demo: 'https://njenga993.github.io/Nyakazi-ecommerce-/',
    image: import.meta.env.BASE_URL + 'Nyakazi-ecommerce.PNG',
    status: 'live',
    size: '4.1MB',
    date: '2023-12-05',
    features: ['Product Catalog', 'Shopping Cart', 'Order Management', 'Mobile Responsive']
  },
  {
    title: 'Nyakazi Corporate Website',
    description: 'Professional corporate website for Nyakazi Organics showcasing company values, products, and services.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'SEO'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/Nyakazi',
    demo: 'https://nyakazi.org',
    image: import.meta.env.BASE_URL + 'Nyakazi.png',
    status: 'live',
    size: '2.3MB',
    date: '2023-11-15',
    features: ['Company Portfolio', 'Contact Forms', 'SEO Optimized', 'Fast Loading']
  },
  {
    title: 'Desiderata Consultancy',
    description: 'Professional consultancy firm website featuring service portfolios, client testimonials, and integrated contact systems.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'UX Design', 'Google Maps API'],
    category: 'Web Development',
    github: 'https://github.com/Njenga993/Firm-Desiderata',
    demo: 'https://desiderataconsultancyfirm.com/',
    image: import.meta.env.BASE_URL + 'Desiderata.png',
    status: 'live',
    size: '3.5MB',
    date: '2023-10-20',
    features: ['Service Showcase', 'Contact Integration', 'Maps Integration', 'Professional Design']
  },
  {
    title: 'SaleHub POS System',
    description: 'Full-featured Point of Sale system with comprehensive inventory management, sales tracking, and detailed reporting.',
    tech: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'REST API'],
    category: 'Full Stack',
    github: 'https://github.com/Njenga993/pos-project',
    demo: '#',
    image: import.meta.env.BASE_URL + 'salehubPOS.png',
    status: 'development',
    size: '5.2MB',
    date: '2023-09-10',
    features: ['Inventory Management', 'Sales Analytics', 'User Authentication', 'Real-time Updates']
  },
  {
    title: 'React Portfolio Website',
    description: 'Modern portfolio website built with React showcasing professional experience, skills, and projects.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Responsive Design', 'CSS3'],
    category: 'Frontend',
    github: 'https://github.com/Njenga993/Portfolio-',
    demo: 'https://njenga993.github.io/Portfolio-/',
    image: import.meta.env.BASE_URL + 'React_Portfolio.PNG',
    status: 'live',
    size: '2.7MB',
    date: '2023-08-15',
    features: ['Interactive Animations', 'Project Showcase', 'Skills Display', 'Contact Integration']
  },
  {
    title: 'Techlungs Technology',
    description: 'Dynamic landing page for Techlungs Technology featuring smooth GSAP animations and interactive elements.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'UI/UX Design'],
    category: 'Frontend',
    github: 'https://github.com/Njenga993/Techlungs',
    demo: 'https://techlungs.co.ke/',
    image: import.meta.env.BASE_URL + 'Techlungs.png',
    status: 'live',
    size: '3.8MB',
    date: '2023-07-20',
    features: ['GSAP Animations', 'Interactive UI', 'Modern Design', 'Performance Optimized']
  }
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects;
  }
  return projects.filter(project => project.category === activeFilter.value);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage);
});

const paginatedProjects = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProjects.value.slice(startIndex, endIndex);
});

const openProjectDetails = (project) => {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden';
};

const closeProjectDetails = () => {
  selectedProject.value = null;
  document.body.style.overflow = '';
};
</script>

<style>
/* Terminal Theme Variables */
:root {
  --bg-color: #ffffff;
  --text-color: #1a202c;
  --secondary-text: #4a5568;
  --accent-color: #3182ce;
  --accent-hover: #2c5282;
  --terminal-bg: #1e1e1e;
  --terminal-header: #323232;
  --terminal-text: #d4d4d4;
  --terminal-prompt: #4ec9b0;
  --terminal-keyword: #569cd6;
  --terminal-string: #ce9178;
  --terminal-comment: #6a9955;
  --terminal-function: #dcdcaa;
  --terminal-variable: #9cdcfe;
  --terminal-property: #9cdcfe;
  --terminal-boolean: #569cd6;
  --terminal-class: #4ec9b0;
  --terminal-parameter: #ffa657;
  --terminal-line-number: #858585;
}

.dark-theme {
  --bg-color: #0d1117;
  --text-color: #f0f6fc;
  --secondary-text: #8b949e;
  --accent-color: #58a6ff;
  --accent-hover: #1f6feb;
  --terminal-bg: #0d1117;
  --terminal-header: #161b22;
  --terminal-text: #e6edf3;
  --terminal-prompt: #3fb950;
  --terminal-keyword: #ff7b72;
  --terminal-string: #a5d6ff;
  --terminal-comment: #8b949e;
  --terminal-function: #d2a8ff;
  --terminal-variable: #79c0ff;
  --terminal-property: #ffa657;
  --terminal-boolean: #ff7b72;
  --terminal-class: #3fb950;
  --terminal-parameter: #ffa657;
  --terminal-line-number: #30363d;
}
</style>

<style scoped>
/* Base Section Styles */
.projects-section {
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--bg-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--text-color);
  width: 100vw;
  width: calc(95% + 2rem);
  margin-left: -2rem;
  overflow: hidden;
}

/* Terminal Container */
.terminal-container {
  max-width: 1400px;
  margin: 0 auto;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

/* Terminal Header */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.75rem 1rem;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-button.close {
  background-color: #ff5f56;
}

.terminal-button.minimize {
  background-color: #ffbd2e;
}

.terminal-button.maximize {
  background-color: #27c93f;
}

.terminal-title {
  color: var(--terminal-text);
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Terminal Body */
.terminal-body {
  padding: 0;
}

/* System Info */
.system-info {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
}

.info-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-text {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.info-value {
  color: var(--terminal-string);
  font-weight: bold;
}

/* Terminal Tabs */
.terminal-tabs {
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.tab.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: var(--accent-color);
}

.tab-icon {
  font-size: 1rem;
}

.tab-text {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.tab.active .tab-text {
  color: var(--terminal-text);
}

/* Terminal Prompt */
.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 0;
}

.prompt-symbol {
  color: var(--terminal-prompt);
  font-weight: bold;
}

.command {
  color: var(--terminal-text);
}

.cursor {
  color: var(--terminal-prompt);
  animation: blink 1s infinite;
}

/* Filter Options */
.filter-input {
  display: flex;
  align-items: center;
}

.filter-value {
  color: var(--terminal-string);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1.5rem 1rem;
}

.filter-option {
  padding: 0.25rem 0.75rem;
  background-color: transparent;
  border: 1px solid var(--terminal-text);
  border-radius: 4px;
  color: var(--terminal-text);
  font-family: 'Fira Code', 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-option:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.filter-option.active {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

/* Tab Content */
.tab-content {
  padding: 1.5rem;
  min-height: 500px;
}

/* Grid View */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.project-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out var(--delay) both;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

.project-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-status.live {
  background-color: #3fb950;
}

.project-status.development {
  background-color: #ff922b;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
}

.project-preview {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  padding: 1rem;
  text-align: center;
}

.overlay-content h4 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.overlay-content p {
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  color: var(--terminal-comment);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tech-tag {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.project-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  text-decoration: none;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-3px);
}

/* List View */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-out var(--delay) both;
  cursor: pointer;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.list-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
}

.list-content {
  flex: 1;
}

.list-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.list-description {
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-comment);
}

.list-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-item {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.list-status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.list-status.live {
  background-color: rgba(63, 185, 80, 0.2);
  color: #3fb950;
}

.list-status.development {
  background-color: rgba(255, 146, 43, 0.2);
  color: #ff922b;
}

.list-actions {
  display: flex;
  gap: 0.5rem;
}

/* Code View */
.code-container {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  overflow-x: auto;
}

.code-line {
  display: flex;
  margin-bottom: 0.25rem;
}

.line-number {
  width: 30px;
  color: var(--terminal-line-number);
  text-align: right;
  margin-right: 1rem;
  user-select: none;
}

.code-content {
  flex: 1;
}

.code-project {
  margin-bottom: 1rem;
}

.code-bracket { color: var(--terminal-text); }
.code-property { color: var(--terminal-property); }
.code-string { color: var(--terminal-string); }
.code-punctuation { color: var(--terminal-text); }
.code-link {
  color: var(--terminal-string);
  text-decoration: underline;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
}

/* Pagination */
.pagination {
  margin-top: 2rem;
  padding: 0 1.5rem;
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.pagination-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--accent-color);
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
  font-family: 'Fira Code', 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.page-number.active {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.pagination-info {
  text-align: center;
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

/* Terminal Footer */
.terminal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--terminal-header);
}

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--terminal-bg);
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--terminal-header);
}

.modal-header h2 {
  margin: 0;
  color: var(--terminal-text);
}

.close-button {
  background: none;
  border: none;
  color: var(--terminal-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.modal-image {
  border-radius: 8px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: auto;
  display: block;
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section h3 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-color);
}

.detail-section p {
  margin: 0;
  color: var(--terminal-comment);
}

.detail-section ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--terminal-comment);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link-btn:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .terminal-container {
    max-width: 1300px;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .terminal-container {
    max-width: 1200px;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .terminal-container {
    max-width: 1100px;
  }
  
  .tab-content {
    padding: 1.2rem;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .projects-section {
    padding: 3rem 1rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 1rem;
  }
  
  .tab-content {
    padding: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .system-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .projects-section {
    padding: 2.5rem 0.5rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 0.5rem;
  }
  
  .tab-content {
    padding: 0.8rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .system-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .terminal-prompt {
    padding: 0.8rem 1rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .projects-section {
    padding: 2rem 0.5rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0;
  }
  
  .tab-content {
    padding: 0.6rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .system-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .terminal-prompt {
    padding: 0.6rem 0.8rem;
  }
  
  .filter-options {
    padding: 0 0.8rem 0.8rem;
  }
  
  .project-header {
    padding: 0.8rem;
  }
  
  .project-actions {
    padding: 0.8rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .projects-section {
    padding: 1.5rem 0.5rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0;
  }
  
  .tab-content {
    padding: 0.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  
  .modal-body {
    grid-template-columns: 1fr;
  }
  
  .system-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .terminal-prompt {
    padding: 0.5rem 0.6rem;
  }
  
  .filter-options {
    padding: 0 0.6rem 0.6rem;
  }
  
  .project-header {
    padding: 0.6rem;
  }
  
  .project-actions {
    padding: 0.6rem;
  }
  
  .project-name {
    font-size: 0.9rem;
  }
  
  .overlay-content h4 {
    font-size: 1rem;
  }
  
  .overlay-content p {
    font-size: 0.8rem;
  }
  
  .list-title {
    font-size: 0.9rem;
  }
  
  .list-description {
    font-size: 0.8rem;
  }
  
  .code-container {
    padding: 0.6rem;
  }
  
  .line-number {
    width: 25px;
    margin-right: 0.6rem;
  }
}
</style>