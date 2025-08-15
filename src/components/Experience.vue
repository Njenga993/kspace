<template>
  <section id="experience" class="experience-section">
    <!-- Section Header - Matching Projects Section -->
    <div class="section-header">
      <div class="header-badge">
        <span class="badge-icon">🚀</span>
        <span>Experience</span>
      </div>
      <h2 class="section-title">Professional Journey</h2>
      <div class="title-decoration">
        <div class="decoration-dot"></div>
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
      </div>
      <p class="section-subtitle">
        Where I've worked and what I've accomplished
      </p>
    </div>

    <!-- Filter Categories - Matching Projects Section -->
    <div class="filter-container">
      <div class="filter-tabs">
        <button 
          v-for="filter in filters" 
          :key="filter"
          @click="setActiveFilter(filter)"
          :class="['filter-tab', { active: activeFilter === filter }]"
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
          class="experience-card"
          :style="{ '--delay': index * 0.1 + 's' }"
        >
          <div class="card-header">
            <div class="title-section">
              <h3 class="job-title">{{ exp.title }}</h3>
              <div class="company-info">
                <span class="company-name">{{ exp.company }}</span>
                <span class="company-type">{{ exp.type }}</span>
              </div>
            </div>
            <div class="period-section">
              <span class="job-period">{{ exp.period }}</span>
              <span class="job-duration">{{ exp.duration }}</span>
            </div>
          </div>
          
          <div class="impact-metrics" v-if="exp.metrics">
            <div 
              v-for="metric in exp.metrics" 
              :key="metric.label"
              class="metric-item"
            >
              <span class="metric-value">{{ metric.value }}</span>
              <span class="metric-label">{{ metric.label }}</span>
            </div>
          </div>
          
          <p class="job-description">{{ exp.description }}</p>
          
          <div class="achievements-section">
            <h4 class="features-title">Key Achievements</h4>
            <ul class="features-list">
              <li 
                v-for="(achievement, idx) in exp.achievements" 
                :key="idx"
              >
                {{ achievement }}
              </li>
            </ul>
          </div>
          
          <div class="tech-stack">
            <div class="stack-header">
              <span class="stack-icon">⚡</span>
              <span class="stack-title">Technologies & Skills</span>
            </div>
            <div class="tech-tags">
              <span 
                v-for="(category, categoryName) in exp.skillCategories"
                :key="categoryName"
                class="tech-tag"
              >
                {{ categoryName }}: {{ category.join(', ') }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="card-actions">
            <button 
              v-if="exp.portfolio"
              @click="openPortfolio(exp.portfolio)"
              class="action-btn primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              View Work
            </button>
            <button 
              @click="toggleDetails(exp.id)"
              class="action-btn secondary"
            >
              {{ expandedDetails.includes(exp.id) ? 'Less Details' : 'More Details' }}
            </button>
          </div>

          <!-- Expanded Details -->
          <div 
            v-if="expandedDetails.includes(exp.id)"
            class="expanded-details"
          >
            <div class="detail-section" v-if="exp.challenges">
              <h5>Challenges Overcome</h5>
              <ul class="features-list">
                <li v-for="challenge in exp.challenges" :key="challenge">{{ challenge }}</li>
              </ul>
            </div>
            
            <div class="detail-section" v-if="exp.learnings">
              <h5>Key Learnings</h5>
              <ul class="features-list">
                <li v-for="learning in exp.learnings" :key="learning">{{ learning }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="experience-stats">
      <div class="stat-item">
        <span class="stat-value">{{ totalYears }}+</span>
        <span class="stat-label">Years Experience</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">{{ totalProjects }}+</span>
        <span class="stat-label">Projects Completed</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value">{{ uniqueSkills }}</span>
        <span class="stat-label">Technologies Mastered</span>
      </div>
    </div>

    <!-- Background Decorations - Matching Projects Section -->
    <div class="bg-decorations">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
    </div>
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

const openPortfolio = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
/* Base section styles - matching projects section */
.experience-section {
  padding: 6rem 2rem;
  background: 
    linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
   margin-left: -2rem;
   margin-right: 2rem;
  width: 100vw;
  
}

body.dark-theme .experience-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #e2e8f0;
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
/* Timeline styles */
.experience-timeline {
  position: relative;
  padding: 3rem 0;
  max-width: 926px;
  margin: 0 auto;
}

.timeline-item {
  position: relative;
  padding-bottom: 4rem;
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
  border: 4px solid white;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

body.dark-theme .marker-dot {
  border-color: #1e293b;
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
  background: linear-gradient(to bottom, #e2e8f0, transparent);
  transform: translateX(-50%);
}

body.dark-theme .marker-line {
  background: linear-gradient(to bottom, #334155, transparent);
}

/* Experience card - matching project cards */
.experience-card {
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
  margin-left: 2rem;
  padding: 2rem;
  animation: projectSlideIn 0.6s ease-out var(--delay) both;
}

body.dark-theme .experience-card {
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.experience-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Card content */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.title-section {
  flex: 1;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

body.dark-theme .job-title {
  color: #f8fafc;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.company-name {
  font-size: 1rem;
  font-weight: 600;
  color: #3b82f6;
}

.company-type {
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-radius: 50px;
  font-weight: 500;
}

body.dark-theme .company-type {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
}

.period-section {
  text-align: right;
}

.job-period {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.25rem;
}

.job-duration {
  font-size: 0.8rem;
  color: #64748b;
}

body.dark-theme .job-duration {
  color: #94a3b8;
}

/* Impact metrics */
.impact-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
}

body.dark-theme .impact-metrics {
  border-color: #334155;
}

.metric-item {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  line-height: 1;
}

.metric-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.25rem;
}

body.dark-theme .metric-label {
  color: #94a3b8;
}

/* Job description */
.job-description {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

body.dark-theme .job-description {
  color: #cbd5e1;
}

/* Achievements - using projects section features styles */
.achievements-section {
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

/* Tech stack - using projects section tech stack styles */
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
}

body.dark-theme .tech-tag {
  background: #334155;
  color: #d1d5db;
  border-color: #475569;
}

/* Action buttons */
.card-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  border: none;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.action-btn.secondary {
  background: transparent;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.action-btn.secondary:hover {
  background: #f8fafc;
  color: #1e293b;
}

body.dark-theme .action-btn.secondary {
  color: #94a3b8;
  border-color: #334155;
}

body.dark-theme .action-btn.secondary:hover {
  background: #1e293b;
  color: #f8fafc;
}

/* Expanded details */
.expanded-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f1f5f9;
}

body.dark-theme .expanded-details {
  border-color: #334155;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

body.dark-theme .detail-section h5 {
  color: #f8fafc;
}

/* Experience stats - matching projects stats */
.experience-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb;
  max-width: 926px;
  margin-left: auto;
  margin-right: auto;
}

body.dark-theme .experience-stats {
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

/* Background decorations - matching projects section */
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

/* Animation */
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

/* Responsive Design */
@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 1.5rem;
    max-width: fit-content;
  }
 .filter-container {
  max-width: fit-content;
 } 
  .timeline-item {
    flex-direction: column;
    padding-bottom: 3rem;
  }
  
  .timeline-marker {
    display: none;
  }
  
  .experience-card {
    margin-left: 0;
    padding: 1.5rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .period-section {
    text-align: left;
  }
  
  .impact-metrics {
    flex-direction: column;
    gap: 1rem;
  }
  
  .metric-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }
  
  .card-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 3rem 1rem;
    max-width: fit-content;
  }
   .filter-container {
  max-width: fit-content;
 } 
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .job-title {
    font-size: 1.25rem;
  }
  
  .experience-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-divider {
    display: none;
  }
}
</style>