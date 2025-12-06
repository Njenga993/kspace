<template>
  <section id="projects" class="projects-section">
    <!-- Terminal Window Container -->
    <div class="terminal-window projects-terminal">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">projects@portfolio:~</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- Command Line -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">ls -la projects/</span>
        </div>
        
        <!-- Terminal Output -->
        <div class="terminal-output">
          <!-- Filter Categories as Terminal Command -->
          <div class="filter-container">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">filter --category=</span>
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
          </div>
          
          <!-- Projects Display -->
          <div class="projects-display">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat project_details.txt</span>
            </div>
            
            <div class="projects-grid">
              <div
                v-for="(project, index) in filteredProjects.slice(0, visibleProjects)"
                :key="index"
                class="project-container"
                :style="{ '--delay': index * 0.1 + 's' }"
                @mouseenter="hoveredIndex = index"
                @mouseleave="hoveredIndex = null"
              >
                <!-- Project Details Container - Moves to Center on Hover -->
                <div class="project-details-container" :class="{ active: hoveredIndex === index }">
                  <!-- Project Header -->
                  <div class="project-header">
                    <div class="project-number">
                      <span class="code-comment">// Project</span>
                      <span class="code-variable">{{ String(index + 1).padStart(2, '0') }}</span>
                    </div>
                    <div class="project-status" :class="project.status">
                      <span class="code-comment">// Status:</span>
                      <span class="code-string">{{ project.status === 'live' ? 'Live' : 'Development' }}</span>
                    </div>
                  </div>
                  
                  <!-- Project Content -->
                  <div class="project-content">
                    <div class="project-title-line">
                      <span class="code-keyword">const</span>
                      <span class="code-variable">{{ project.title.replace(/\s+/g, '') }}</span>
                      <span class="code-operator">=</span>
                      <span class="code-brace">{</span>
                    </div>
                    
                    <div class="project-properties">
                      <div class="property-line">
                        <span class="code-property">title:</span>
                        <span class="code-string">"{{ project.title }}"</span>,
                      </div>
                      
                      <div class="property-line">
                        <span class="code-property">description:</span>
                        <span class="code-string">"{{ project.description }}"</span>,
                      </div>
                      
                      <div class="property-line">
                        <span class="code-property">techStack:</span>
                        <span class="code-bracket">[</span>
                        <span class="tech-stack-list">
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
                      </div>
                      
                      <div class="property-line">
                        <span class="code-property">links:</span>
                        <span class="code-brace">{</span>
                        <div class="nested-properties">
                          <div class="property-line">
                            <span class="code-property">github:</span>
                            <a :href="project.github" target="_blank" class="code-link">
                              <span class="code-string">"{{ project.github }}"</span>
                            </a>,
                          </div>
                          <div v-if="project.demo !== '#'" class="property-line">
                            <span class="code-property">demo:</span>
                            <a :href="project.demo" target="_blank" class="code-link">
                              <span class="code-string">"{{ project.demo }}"</span>
                            </a>,
                          </div>
                        </div>
                        <span class="code-brace">}</span>,
                      </div>
                      
                      <div v-if="project.features" class="property-line">
                        <span class="code-property">features:</span>
                        <span class="code-bracket">[</span>
                        <div class="features-list">
                          <div v-for="feature in project.features" :key="feature" class="feature-item">
                            <span class="code-string">"{{ feature }}"</span>,
                          </div>
                        </div>
                        <span class="code-bracket">]</span>,
                      </div>
                      
                      <div class="property-line">
                        <span class="code-property">stats:</span>
                        <span class="code-brace">{</span>
                        <div class="nested-properties">
                          <div class="property-line">
                            <span class="code-property">duration:</span>
                            <span class="code-string">"{{ project.duration || '2-4' }} weeks"</span>,
                          </div>
                          <div class="property-line">
                            <span class="code-property">team:</span>
                            <span class="code-string">"{{ project.team || 'Solo' }}"</span>,
                          </div>
                          <div class="property-line">
                            <span class="code-property">year:</span>
                            <span class="code-string">"{{ project.year || '2024' }}"</span>,
                          </div>
                        </div>
                        <span class="code-brace">}</span>,
                      </div>
                    </div>
                    
                    <div class="project-footer">
                      <span class="code-brace">};</span>
                    </div>
                  </div>
                </div>
                
                <!-- Project Image Preview - Always Visible -->
                <div class="project-image-preview">
                  <div class="image-terminal">
                    <div class="terminal-header">
                      <div class="terminal-buttons">
                        <div class="terminal-button close"></div>
                        <div class="terminal-button minimize"></div>
                        <div class="terminal-button maximize"></div>
                      </div>
                      <div class="terminal-title">preview.png</div>
                    </div>
                    <div class="terminal-body">
                      <img 
                        :src="project.image" 
                        :alt="project.title" 
                        class="project-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More Command -->
          <div v-if="showViewMore" class="load-more-container">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <button @click="loadMoreProjects" class="terminal-button-primary">
                <span>load_more.sh</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L15 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <div class="terminal-output">
              <div class="code-comment">// {{ visibleProjects }} of {{ filteredProjects.length }} projects loaded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Terminal Cursor -->
    <div class="terminal-cursor"></div>
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
  title: 'Seed Savers Network Kenya Website',
  description: 'A dynamic and responsive website for Seed Savers Network Kenya, designed to promote seed sovereignty, showcase programs, events, resources, and facilitate community engagement. The platform features news updates, a resource library, donation options, and detailed organizational information, helping connect farmers, supporters, and stakeholders.',
  tech: ['HTML5', 'TypeScript', 'JavaScript', 'React.js', 'Vite', 'Responsive Design'],
  category: 'Web Development',
  github: 'https://github.com/Njenga993/SeedSavers',
  demo: 'https://njenga993.github.io/SeedSavers/',
  image: import.meta.env.BASE_URL + 'ssn.PNG',
  status: 'live',
  duration: '3-4',
  team: 'Solo',
  year: '2025',
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
  description: 'A modern and responsive information website for INOFO Africa, aligned with INOFOs global identity. The platform showcases organizational objectives, membership details, activities, and an archive section, providing a strong digital presence for African organic farmer organizations.',
  tech: ['HTML5', 'Typescript', 'JavaScript', 'React.js', 'Responsive Design'],
  category: 'Web Development',
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
  tech: ['HTML5', 'Typescript', 'JavaScript', 'React.js', 'Responsive Design'],
  category: 'Web Development',
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
    description: 'A comprehensive e-commerce platform for organic products featuring seamless shopping experience.',
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
    description: 'Professional corporate website for Nyakazi Organics showcasing company values, products, and services.',
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
    description: 'Professional consultancy firm website featuring service portfolios, client testimonials, and integrated contact systems.',
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
    description: 'Full-featured Point of Sale system with comprehensive inventory management, sales tracking, and detailed reporting.',
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
    description: 'Modern portfolio website built with React showcasing professional experience, skills, and projects.',
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
    description: 'Dynamic landing page for Techlungs Technology featuring smooth GSAP animations and interactive elements.',
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
/* Import base styles from hero section */
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

/* Projects Section */
.projects-section {
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin-left: -2rem;
  padding: 2rem;
  background-color: var(--bg-color);
}

/* Projects Terminal */
.projects-terminal {
  width: 100%;
  max-width: 1200px;
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
  padding: 1.5rem;
  color: var(--terminal-text);
}

.terminal-prompt {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt-symbol {
  color: var(--terminal-prompt);
  font-weight: bold;
}

.command {
  color: var(--terminal-text);
}

.terminal-output {
  margin-bottom: 1.5rem;
}

/* Filter Container */
.filter-container {
  margin-bottom: 1.5rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
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

/* Projects Display */
.projects-display {
  margin-bottom: 1.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

/* Project Container */
.project-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
  padding: 0;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.5s ease-out var(--delay) both;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Project Details Container - Moves to Center on Hover */
.project-details-container {
  padding: 1rem;
  opacity: 0.7;
  transform: scale(0.95);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.project-details-container.active {
  opacity: 1;
  transform: scale(1);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.project-number, .project-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.project-status.live .code-string {
  color: #3fb950;
}

.project-status.development .code-string {
  color: #ff922b;
}

/* Project Content */
.project-content {
  margin-bottom: 1rem;
}

.project-title-line {
  margin-bottom: 0.5rem;
}

.project-properties {
  margin-left: 1rem;
}

.property-line {
  margin-bottom: 0.25rem;
}

.nested-properties {
  margin-left: 1rem;
}

.project-footer {
  margin-top: 0.5rem;
}

/* Code Syntax Highlighting */
.code-keyword { color: var(--terminal-keyword); }
.code-string { color: var(--terminal-string); }
.code-comment { color: var(--terminal-comment); }
.code-function { color: var(--terminal-function); }
.code-variable { color: var(--terminal-variable); }
.code-property { color: var(--terminal-property); }
.code-boolean { color: var(--terminal-boolean); }
.code-class { color: var(--terminal-class); }
.code-parameter { color: var(--terminal-parameter); }
.code-operator { color: var(--terminal-text); }
.code-brace { color: var(--terminal-text); }
.code-bracket { color: var(--terminal-text); }
.code-punctuation { color: var(--terminal-text); }
.code-link {
  color: var(--terminal-string);
  text-decoration: underline;
}

/* Tech Stack */
.tech-stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tech-item {
  display: inline-block;
}

/* Features List */
.features-list {
  margin-left: 1rem;
}

.feature-item {
  margin-bottom: 0.25rem;
}

/* Project Image Preview - Always Visible */
.project-image-preview {
  margin-top: 1rem;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.image-terminal {
  width: 100%;
  background-color: var(--terminal-bg);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--terminal-header);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.project-container:hover .image-terminal {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-terminal .terminal-header {
  padding: 0.5rem;
}

.image-terminal .terminal-title {
  font-size: 0.8rem;
}

.image-terminal .terminal-body {
  padding: 0;
}

.project-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  transition: all 0.3s ease;
}

.project-container:hover .project-image {
  transform: scale(1.05);
}

/* Load More */
.load-more-container {
  margin-top: 1.5rem;
}

.terminal-button-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.terminal-button-primary:hover {
  background-color: var(--accent-hover);
}

/* Terminal Cursor */
.terminal-cursor {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 10px;
  height: 20px;
  background-color: var(--terminal-prompt);
  animation: blink 1s infinite;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

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

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .projects-terminal {
    max-width: 1300px;
  }
  
  .project-image {
    height: 300px;
  }
  
  .project-image-preview {
    max-width: 600px;
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .projects-terminal {
    max-width: 1200px;
  }
  
  .project-image {
    height: 280px;
  }
  
  .project-image-preview {
    max-width: 550px;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .projects-terminal {
    max-width: 1100px;
  }
  
  .terminal-body {
    padding: 1.2rem;
  }
  
  .project-image {
    height: 260px;
  }
  
  .project-image-preview {
    max-width: 500px;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .projects-terminal {
    max-width: 100%;
    margin: 0 1rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .project-container {
    margin-bottom: 1.5rem;
  }
  
  .project-image {
    height: 240px;
  }
  
  .project-image-preview {
    max-width: 100%;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .projects-terminal {
    max-width: 100%;
    margin: 0 0.5rem;
  }
  
  .terminal-body {
    padding: 0.8rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  .project-container {
    margin-bottom: 1.2rem;
  }
  
  .project-image {
    height: 220px;
  }
  
  .project-image-preview {
    max-width: 100%;
  }
  
  .project-details-container {
    padding: 0.8rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .projects-terminal {
    max-width: 100%;
    margin: 0;
  }
  
  .terminal-body {
    padding: 0.7rem;
  }
  
  .terminal-prompt {
    margin-bottom: 0.8rem;
  }
  
  .terminal-output {
    margin-bottom: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .project-container {
    margin-bottom: 1rem;
  }
  
  .project-image {
    height: 200px;
  }
  
  .project-image-preview {
    max-width: 100%;
  }
  
  .project-details-container {
    padding: 0.6rem;
  }
  
  .project-properties {
    margin-left: 0.8rem;
  }
  
  .nested-properties {
    margin-left: 0.8rem;
  }
  
  .features-list {
    margin-left: 0.8rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .projects-terminal {
    max-width: 100%;
    margin: 0;
  }
  
  .terminal-body {
    padding: 0.5rem;
  }
  
  .terminal-prompt {
    margin-bottom: 0.8rem;
  }
  
  .terminal-output {
    margin-bottom: 1rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .project-container {
    margin-bottom: 0.8rem;
  }
  
  .project-image {
    height: 180px;
  }
  
  .project-image-preview {
    max-width: 100%;
  }
  
  .project-details-container {
    padding: 0.5rem;
  }
  
  .project-properties {
    margin-left: 0.5rem;
  }
  
  .nested-properties {
    margin-left: 0.5rem;
  }
  
  .features-list {
    margin-left: 0.5rem;
  }
  
  .project-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>