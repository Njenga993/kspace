<template>
  <section id="experience" class="experience-section">
    <!-- Terminal Window Container -->
    <div class="terminal-window experience-terminal">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">experience@portfolio:~</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- Command Line -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat career_history.txt</span>
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
                v-for="filter in filters" 
                :key="filter"
                @click="setActiveFilter(filter)"
                :class="['filter-option', { active: activeFilter === filter }]"
              >
                {{ filter }}
              </button>
            </div>
          </div>
          
          <!-- Experience Timeline -->
          <div class="experience-timeline">
            <div 
              v-for="(exp, index) in filteredExperiences"
              :key="exp.id"
              class="timeline-item"
            >
              <div class="timeline-marker">
                <div class="marker-dot" :style="{ backgroundColor: exp.color }">
                  <component :is="exp.icon" class="marker-icon" />
                </div>
                <div class="marker-line"></div>
              </div>
              
              <div 
                class="experience-terminal-card"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <!-- Experience Header -->
                <div class="experience-header">
                  <div class="experience-number">
                    <span class="code-comment">// Entry</span>
                    <span class="code-variable">{{ String(index + 1).padStart(2, '0') }}</span>
                  </div>
                  <div class="experience-status" :class="exp.category">
                    <span class="code-comment">// Type:</span>
                    <span class="code-string">{{ exp.category }}</span>
                  </div>
                </div>
                
                <!-- Experience Content -->
                <div class="experience-content">
                  <div class="experience-title-line">
                    <span class="code-keyword">const</span>
                    <span class="code-variable">{{ exp.title.replace(/\s+/g, '') }}</span>
                    <span class="code-operator">=</span>
                    <span class="code-brace">{</span>
                  </div>
                  
                  <div class="experience-properties">
                    <div class="property-line">
                      <span class="code-property">company:</span>
                      <span class="code-string">"{{ exp.company }}"</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">type:</span>
                      <span class="code-string">"{{ exp.type }}"</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">period:</span>
                      <span class="code-string">"{{ exp.period }}"</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">duration:</span>
                      <span class="code-string">"{{ exp.duration }}"</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">description:</span>
                      <span class="code-string">"{{ exp.description }}"</span>,
                    </div>
                    
                    <div v-if="exp.metrics" class="property-line">
                      <span class="code-property">metrics:</span>
                      <span class="code-bracket">[</span>
                      <div class="metrics-list">
                        <div v-for="metric in exp.metrics" :key="metric.label" class="metric-item">
                          <span class="code-brace">{</span>
                          <span class="code-property">value:</span>
                          <span class="code-string">"{{ metric.value }}"</span>,
                          <span class="code-property">label:</span>
                          <span class="code-string">"{{ metric.label }}"</span>
                          <span class="code-brace">}</span>
                          <span class="code-punctuation">,</span>
                        </div>
                      </div>
                      <span class="code-bracket">]</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">achievements:</span>
                      <span class="code-bracket">[</span>
                      <div class="achievements-list">
                        <div v-for="(achievement, idx) in exp.achievements" :key="idx" class="achievement-item">
                          <span class="code-string">"{{ achievement }}"</span>
                          <span class="code-punctuation">,</span>
                        </div>
                      </div>
                      <span class="code-bracket">]</span>,
                    </div>
                    
                    <div class="property-line">
                      <span class="code-property">skillCategories:</span>
                      <span class="code-brace">{</span>
                      <div class="nested-properties">
                        <div v-for="(category, categoryName) in exp.skillCategories" :key="categoryName" class="property-line">
                          <span class="code-property">{{ categoryName }}:</span>
                          <span class="code-bracket">[</span>
                          <span class="skill-list">
                            <span 
                              v-for="(skill, i) in category" 
                              :key="i"
                              class="skill-item"
                            >
                              <span class="code-string">"{{ skill }}"</span>
                              <span v-if="i < category.length - 1" class="code-punctuation">,</span>
                            </span>
                          </span>
                          <span class="code-bracket">]</span>
                          <span class="code-punctuation">,</span>
                        </div>
                      </div>
                      <span class="code-brace">}</span>,
                    </div>
                    
                    <div v-if="exp.challenges" class="property-line">
                      <span class="code-property">challenges:</span>
                      <span class="code-bracket">[</span>
                      <div class="challenges-list">
                        <div v-for="challenge in exp.challenges" :key="challenge" class="challenge-item">
                          <span class="code-string">"{{ challenge }}"</span>
                          <span class="code-punctuation">,</span>
                        </div>
                      </div>
                      <span class="code-bracket">]</span>,
                    </div>
                    
                    <div v-if="exp.learnings" class="property-line">
                      <span class="code-property">learnings:</span>
                      <span class="code-bracket">[</span>
                      <div class="learnings-list">
                        <div v-for="learning in exp.learnings" :key="learning" class="learning-item">
                          <span class="code-string">"{{ learning }}"</span>
                          <span class="code-punctuation">,</span>
                        </div>
                      </div>
                      <span class="code-bracket">]</span>,
                    </div>
                    
                    <div v-if="exp.portfolio" class="property-line">
                      <span class="code-property">portfolio:</span>
                      <a :href="exp.portfolio" target="_blank" class="code-link">
                        <span class="code-string">"{{ exp.portfolio }}"</span>
                      </a>,
                    </div>
                  </div>
                  
                  <div class="experience-footer">
                    <span class="code-brace">};</span>
                  </div>
                </div>
                
                <!-- Expanded Details Toggle -->
                <div class="terminal-prompt">
                  <span class="prompt-symbol">$</span>
                  <button 
                    @click="toggleDetails(exp.id)"
                    class="terminal-button-secondary"
                  >
                    {{ expandedDetails.includes(exp.id) ? 'collapse_details.sh' : 'expand_details.sh' }}
                  </button>
                </div>
                
                <!-- Expanded Details -->
                <div 
                  v-if="expandedDetails.includes(exp.id)"
                  class="expanded-details"
                >
                  <div class="terminal-prompt">
                    <span class="prompt-symbol">$</span>
                    <span class="command">cat additional_info.txt</span>
                  </div>
                  
                  <div class="detail-section" v-if="exp.challenges">
                    <div class="detail-title">
                      <span class="code-comment">// Challenges Overcome</span>
                    </div>
                    <div class="detail-content">
                      <div v-for="challenge in exp.challenges" :key="challenge" class="detail-item">
                        <span class="code-string">"{{ challenge }}"</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="detail-section" v-if="exp.learnings">
                    <div class="detail-title">
                      <span class="code-comment">// Key Learnings</span>
                    </div>
                    <div class="detail-content">
                      <div v-for="learning in exp.learnings" :key="learning" class="detail-item">
                        <span class="code-string">"{{ learning }}"</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Stats Summary Command -->
          <div class="stats-container">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">career_stats.sh</span>
            </div>
            <div class="terminal-output">
              <div class="stats-terminal">
                <div class="stats-header">
                  <span class="code-comment">// Career Statistics</span>
                </div>
                <div class="stats-content">
                  <div class="stat-line">
                    <span class="code-property">totalYears:</span>
                    <span class="code-number">{{ totalYears }}+</span>,
                  </div>
                  <div class="stat-line">
                    <span class="code-property">totalProjects:</span>
                    <span class="code-number">{{ totalProjects }}+</span>,
                  </div>
                  <div class="stat-line">
                    <span class="code-property">uniqueSkills:</span>
                    <span class="code-number">{{ uniqueSkills }}</span>,
                  </div>
                </div>
              </div>
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

// Icons (you can replace with actual icon components)
const BriefcaseIcon = 'div'
const CodeIcon = 'div'
const GraduationCapIcon = 'div'

const activeFilter = ref('All')
const expandedDetails = ref([])

const filters = ['All', 'Development', 'Management', 'Internship']

const experiences = [
  {
    id: 1,
    title: 'Developer & Digital Manager',
    company: 'Nyakazi Organics',
    type: 'Full-time',
    period: '2024 - Present',
    duration: '1+ years',
    category: 'Management',
    color: '#3b82f6',
    icon: BriefcaseIcon,
    description: 'Led digital transformation initiatives for an organic food company, overseeing all digital solutions from branding to systems development.',
    metrics: [
      { value: '150%', label: 'Sales Increase' },
      { value: '40%', label: 'Faster Checkout' },
      { value: '95+', label: 'Lighthouse Score' }
    ],
    achievements: [
      'Developed a fully functional POS system using React and Django that reduced checkout times by 40%',
      'Designed and implemented comprehensive company branding across all digital platforms',
      'Optimized website performance, achieving 95+ Lighthouse scores across all metrics',
      'Managed digital marketing campaigns that increased social media engagement by 200%',
      'Conducted farmer training sessions on digital tools adoption, improving productivity by 30%'
    ],
    skillCategories: {
      'Frontend': ['React', 'JavaScript', 'CSS3', 'HTML5'],
      'Backend': ['Django', 'Python', 'PostgreSQL'],
      'Design': ['Figma', 'Branding', 'UI/UX'],
      'Marketing': ['SEO', 'Digital Marketing', 'Analytics']
    },
    challenges: [
      'Integrating legacy systems with modern POS solution',
      'Training non-technical staff on digital tools',
      'Balancing performance with feature-rich functionality'
    ],
    learnings: [
      'Importance of user-centered design in business applications',
      'Effective change management in traditional industries',
      'Scaling digital solutions for growing businesses'
    ],
    portfolio: 'https://nyakazi.org/'
  },
  {
    id: 2,
    title: 'Junior Developer',
    company: 'Desiderata Consultancy',
    type: 'Full-time',
    period: '2023 - 2024',
    duration: '1 year',
    category: 'Development',
    color: '#06d6a0',
    icon: CodeIcon,
    description: 'Built solutions for diverse client needs across multiple industries with a focus on web applications and data visualization.',
    metrics: [
      { value: '15+', label: 'Projects' },
      { value: '100%', label: 'Client Satisfaction' },
      { value: '60%', label: 'Performance Boost' }
    ],
    achievements: [
      'Created responsive UI layouts for corporate clients using modern CSS techniques and frameworks',
      'Developed Laravel-based admin dashboards with complex data visualization and reporting features',
      'Implemented RESTful APIs that improved system integration efficiency by 35%',
      'Reduced average page load times by 60% through strategic performance optimization',
      'Mentored 2 junior interns on frontend development best practices and code quality'
    ],
    skillCategories: {
      'Backend': ['Laravel', 'PHP', 'MySQL'],
      'Frontend': ['JavaScript', 'Bootstrap', 'jQuery'],
      'Data': ['Chart.js', 'Data Visualization'],
      'Tools': ['Git', 'API Development']
    },
    challenges: [
      'Working with diverse client requirements and tight deadlines',
      'Optimizing performance for data-heavy applications',
      'Maintaining code quality across multiple projects'
    ],
    learnings: [
      'Client communication and requirement gathering skills',
      'Importance of scalable architecture design',
      'Effective code review and mentoring techniques'
    ]
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Techlungs Technology',
    type: 'Full-time',
    period: '2022 - 2023',
    duration: '1 year',
    category: 'Development',
    color: '#f72585',
    icon: CodeIcon,
    description: 'Specialized in creating engaging frontend experiences for SaaS products and high-conversion marketing sites.',
    metrics: [
      { value: '20+', label: 'Landing Pages' },
      { value: '8%', label: 'Conversion Rate' },
      { value: '45%', label: 'Bundle Reduction' }
    ],
    achievements: [
      'Built 20+ high-converting landing pages with conversion rates reaching up to 8%',
      'Implemented smooth animations and micro-interactions that improved user engagement by 40%',
      'Collaborated with UX designers to create comprehensive design systems for consistent UI',
      'Reduced CSS bundle size by 45% through strategic optimization and code splitting',
      'Introduced automated testing pipeline that reduced production bugs by 30%'
    ],
    skillCategories: {
      'Frontend': ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      'Animation': ['GSAP', 'CSS Animations'],
      'Design': ['UI/UX', 'Design Systems'],
      'Testing': ['Jest', 'Automated Testing']
    },
    challenges: [
      'Balancing rich animations with performance requirements',
      'Creating consistent design systems across multiple projects',
      'Optimizing for various devices and browsers'
    ],
    learnings: [
      'Advanced CSS optimization techniques',
      'User behavior analysis and conversion optimization',
      'Importance of performance in user experience'
    ]
  },
  {
    id: 4,
    title: 'ICT Intern',
    company: 'KNLS & Immigration Department',
    type: 'Internship',
    period: '2021 - 2022',
    duration: '1 year',
    category: 'Internship',
    color: '#fb8500',
    icon: GraduationCapIcon,
    description: 'Gained foundational IT experience across two government departments, working with diverse technology stacks and systems.',
    metrics: [
      { value: '15+', label: 'Hours Saved Weekly' },
      { value: '50+', label: 'Staff Supported' },
      { value: '2', label: 'Departments' }
    ],
    achievements: [
      'Automated catalog update processes, saving 15+ hours of manual work weekly',
      'Documented comprehensive network infrastructure for future upgrade planning',
      'Assisted in migrating critical legacy systems to modern, secure platforms',
      'Provided technical support to 50+ staff members across multiple departments',
      'Created detailed training materials for new software implementations and procedures'
    ],
    skillCategories: {
      'IT Support': ['Technical Support', 'Troubleshooting'],
      'Systems': ['System Administration', 'Network Documentation'],
      'Training': ['User Training', 'Documentation'],
      'Migration': ['Legacy Systems', 'System Migration']
    },
    challenges: [
      'Working with outdated legacy systems and limited resources',
      'Training non-technical staff on new technologies',
      'Ensuring data security during system migrations'
    ],
    learnings: [
      'Fundamentals of IT infrastructure and support',
      'Importance of documentation in system maintenance',
      'Effective communication with non-technical users'
    ]
  }
]

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'All') return experiences
  return experiences.filter(exp => exp.category === activeFilter.value)
})

const totalYears = computed(() => {
  return new Date().getFullYear() - 2021
})

const totalProjects = computed(() => {
  return experiences.reduce((total, exp) => {
    const projectCount = exp.metrics?.find(m => m.label.includes('Project'))?.value
    return total + (projectCount ? parseInt(projectCount) : 5)
  }, 0)
})

const uniqueSkills = computed(() => {
  const allSkills = new Set()
  experiences.forEach(exp => {
    Object.values(exp.skillCategories).forEach(category => {
      category.forEach(skill => allSkills.add(skill))
    })
  })
  return allSkills.size
})

const setActiveFilter = (filter) => {
  activeFilter.value = filter
}

const toggleDetails = (id) => {
  const index = expandedDetails.value.indexOf(id)
  if (index > -1) {
    expandedDetails.value.splice(index, 1)
  } else {
    expandedDetails.value.push(id)
  }
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

/* Experience Section */
.experience-section {
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin-top: 0rem;
  margin-left: -2rem;
  padding: 2rem;
  background-color: var(--bg-color);
}

/* Experience Terminal */
.experience-terminal {
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

/* Experience Timeline */
.experience-timeline {
  position: relative;
  padding: 1rem 0;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
  display: flex;
  align-items: flex-start;
}

.timeline-marker {
  position: relative;
  width: 60px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.marker-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent);
  border: 4px solid var(--terminal-bg);
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.marker-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.marker-line {
  position: absolute;
  left: 50%;
  top: 32px;
  bottom: -2rem;
  width: 2px;
  background: var(--terminal-header);
  transform: translateX(-50%);
}

/* Experience Terminal Card */
.experience-terminal-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
  padding: 1rem;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  animation: fadeIn 0.5s ease-out var(--delay) both;
  flex: 1;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.experience-number, .experience-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.experience-status.Development .code-string {
  color: #06d6a0;
}

.experience-status.Management .code-string {
  color: #3b82f6;
}

.experience-status.Internship .code-string {
  color: #fb8500;
}

/* Experience Content */
.experience-content {
  margin-bottom: 1rem;
}

.experience-title-line {
  margin-bottom: 0.5rem;
}

.experience-properties {
  margin-left: 1rem;
}

.property-line {
  margin-bottom: 0.25rem;
}

.nested-properties {
  margin-left: 1rem;
}

.experience-footer {
  margin-top: 0.5rem;
}

/* Lists */
.metrics-list, .achievements-list, .challenges-list, .learnings-list {
  margin-left: 1rem;
}

.metric-item, .achievement-item, .challenge-item, .learning-item {
  margin-bottom: 0.25rem;
}

/* Skill List */
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.skill-item {
  display: inline-block;
}

/* Expanded Details */
.expanded-details {
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1rem;
}

.detail-section {
  margin-bottom: 1rem;
}

.detail-title {
  margin-bottom: 0.5rem;
}

.detail-content {
  margin-left: 1rem;
}

.detail-item {
  margin-bottom: 0.25rem;
}

/* Stats Container */
.stats-container {
  margin-top: 2rem;
}

.stats-terminal {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
  padding: 1rem;
}

.stats-header {
  margin-bottom: 1rem;
}

.stats-content {
  margin-left: 1rem;
}

.stat-line {
  margin-bottom: 0.25rem;
}

/* Terminal Buttons */
.terminal-button-primary, .terminal-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.terminal-button-primary {
  background-color: var(--accent-color);
  color: white;
}

.terminal-button-primary:hover {
  background-color: var(--accent-hover);
}

.terminal-button-secondary {
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
}

.terminal-button-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
.code-number { color: var(--terminal-boolean); }
.code-operator { color: var(--terminal-text); }
.code-brace { color: var(--terminal-text); }
.code-bracket { color: var(--terminal-text); }
.code-punctuation { color: var(--terminal-text); }
.code-link {
  color: var(--terminal-string);
  text-decoration: underline;
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
@media (max-width: 992px) {
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    display: none;
  }
  
  .experience-terminal-card {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .experience-section {
    padding: 1rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .experience-terminal-card {
    padding: 0.75rem;
  }
  
  .filter-options {
    gap: 0.25rem;
  }
  
  .filter-option {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 0.5rem;
  }
  
  .terminal-body {
    padding: 0.75rem;
  }
  
  .experience-terminal-card {
    padding: 0.5rem;
  }
  
  .filter-options {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .filter-option {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
}
</style>