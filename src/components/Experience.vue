<template>
  <section id="experience" class="experience-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">experience@portfolio:~# ./career_log.sh</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Info -->
        <div class="system-info">
          <div class="info-line">
            <span class="info-text">System:</span>
            <span class="info-value">Career Log v2.0.24</span>
          </div>
          <div class="info-line">
            <span class="info-text">Entries:</span>
            <span class="info-value">{{ experiences.length }}</span>
          </div>
          <div class="info-line">
            <span class="info-text">Total Experience:</span>
            <span class="info-value">{{ totalYears }}+ years</span>
          </div>
        </div>
        
        <!-- Terminal Tabs -->
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'timeline' }" 
            @click="activeTab = 'timeline'"
          >
            <span class="tab-icon">📅</span>
            <span class="tab-text">timeline</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'skills' }" 
            @click="activeTab = 'skills'"
          >
            <span class="tab-icon">💻</span>
            <span class="tab-text">skills</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'stats' }" 
            @click="activeTab = 'stats'"
          >
            <span class="tab-icon">📊</span>
            <span class="tab-text">stats</span>
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
            v-for="filter in filters" 
            :key="filter"
            @click="setActiveFilter(filter)"
            :class="['filter-option', { active: activeFilter === filter }]"
          >
            {{ filter }}
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Timeline View -->
          <div v-if="activeTab === 'timeline'" class="timeline-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat career_history.txt</span>
            </div>
            
            <div class="timeline-container">
              <div 
                v-for="(exp, index) in filteredExperiences"
                :key="exp.id"
                class="timeline-item"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <div class="timeline-date">
                  <span class="date-year">{{ exp.period.split(' - ')[0] }}</span>
                  <div class="date-line"></div>
                </div>
                
                <div class="timeline-content">
                  <div class="experience-card" @click="toggleDetails(exp.id)">
                    <div class="card-header">
                      <div class="card-icon" :style="{ backgroundColor: exp.color }">
                        <i :class="getIconClass(exp.category)"></i>
                      </div>
                      <div class="card-info">
                        <h3 class="card-title">{{ exp.title }}</h3>
                        <div class="card-meta">
                          <span class="card-company">{{ exp.company }}</span>
                          <span class="card-period">{{ exp.period }}</span>
                        </div>
                      </div>
                      <div class="card-toggle">
                        <i :class="expandedDetails.includes(exp.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                      </div>
                    </div>
                    
                    <div class="card-description">
                      <p>{{ exp.description }}</p>
                    </div>
                    
                    <div v-if="exp.metrics" class="card-metrics">
                      <div 
                        v-for="metric in exp.metrics" 
                        :key="metric.label"
                        class="metric-item"
                      >
                        <span class="metric-value">{{ metric.value }}</span>
                        <span class="metric-label">{{ metric.label }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Expanded Details -->
                  <div 
                    v-if="expandedDetails.includes(exp.id)"
                    class="expanded-details"
                  >
                    <div class="terminal-prompt">
                      <span class="prompt-symbol">$</span>
                      <span class="command">cat details.txt</span>
                    </div>
                    
                    <div class="details-content">
                      <div class="detail-section">
                        <h4>Key Achievements</h4>
                        <ul>
                          <li v-for="achievement in exp.achievements" :key="achievement">
                            {{ achievement }}
                          </li>
                        </ul>
                      </div>
                      
                      <div class="detail-section">
                        <h4>Skills Applied</h4>
                        <div class="skill-tags">
                          <span 
                            v-for="(category, categoryName) in exp.skillCategories" 
                            :key="categoryName"
                            class="skill-category"
                          >
                            <span class="category-name">{{ categoryName }}:</span>
                            <div class="category-skills">
                              <span 
                                v-for="skill in category" 
                                :key="skill"
                                class="skill-tag"
                              >
                                {{ skill }}
                              </span>
                            </div>
                          </span>
                        </div>
                      </div>
                      
                      <div v-if="exp.challenges" class="detail-section">
                        <h4>Challenges Overcome</h4>
                        <ul>
                          <li v-for="challenge in exp.challenges" :key="challenge">
                            {{ challenge }}
                          </li>
                        </ul>
                      </div>
                      
                      <div v-if="exp.learnings" class="detail-section">
                        <h4>Key Learnings</h4>
                        <ul>
                          <li v-for="learning in exp.learnings" :key="learning">
                            {{ learning }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Skills View -->
          <div v-if="activeTab === 'skills'" class="skills-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat skills_matrix.txt</span>
            </div>
            
            <div class="skills-container">
              <div 
                v-for="(category, categoryName) in skillsByCategory" 
                :key="categoryName"
                class="skill-category-card"
              >
                <div class="category-header">
                  <h3>{{ categoryName }}</h3>
                  <span class="skill-count">{{ category.length }} skills</span>
                </div>
                
                <div class="skills-grid">
                  <div 
                    v-for="skill in category" 
                    :key="skill.name"
                    class="skill-item"
                    :style="{ '--level': skill.level }"
                  >
                    <div class="skill-name">{{ skill.name }}</div>
                    <div class="skill-level">
                      <div class="level-bar">
                        <div class="level-fill"></div>
                      </div>
                      <span class="level-text">{{ skill.level }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Stats View -->
          <div v-if="activeTab === 'stats'" class="stats-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">./career_stats.sh</span>
            </div>
            
            <div class="stats-container">
              <div class="stats-overview">
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-briefcase"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ totalYears }}+</span>
                    <span class="stat-label">Years Experience</span>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-project-diagram"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ totalProjects }}+</span>
                    <span class="stat-label">Projects Completed</span>
                  </div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-icon">
                    <i class="fas fa-code"></i>
                  </div>
                  <div class="stat-info">
                    <span class="stat-value">{{ uniqueSkills }}</span>
                    <span class="stat-label">Unique Skills</span>
                  </div>
                </div>
              </div>
              
              <div class="stats-chart">
                <h3>Experience Timeline</h3>
                <div class="timeline-chart">
                  <div 
                    v-for="(exp, index) in experiences" 
                    :key="exp.id"
                    class="chart-bar"
                    :style="{ 
                      height: `${exp.duration / totalYears * 100}%`,
                      backgroundColor: exp.color,
                      left: `${(index / experiences.length) * 100}%`,
                      width: `${90 / experiences.length}%`
                    }"
                  >
                    <div class="bar-tooltip">
                      <div class="tooltip-title">{{ exp.title }}</div>
                      <div class="tooltip-company">{{ exp.company }}</div>
                      <div class="tooltip-period">{{ exp.period }}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="stats-skills">
                <h3>Skills Distribution</h3>
                <div class="skills-chart">
                  <div 
                    v-for="(category, categoryName) in skillsByCategory" 
                    :key="categoryName"
                    class="skill-bar"
                  >
                    <div class="skill-info">
                      <span class="skill-category-name">{{ categoryName }}</span>
                      <span class="skill-percentage">{{ Math.round(category.length / uniqueSkills * 100) }}%</span>
                    </div>
                    <div class="skill-progress">
                      <div 
                        class="skill-progress-fill"
                        :style="{ width: `${category.length / uniqueSkills * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('timeline');
const activeFilter = ref('All');
const expandedDetails = ref([]);

const filters = ['All', 'Development', 'Management', 'Internship'];

const experiences = [
  {
    id: 1,
    title: 'Developer & Digital Manager',
    company: 'Nyakazi Organics',
    type: 'Full-time',
    period: '2024 - Present',
    duration: 1,
    category: 'Development',
    color: '#3b82f6',
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
    duration: 1,
    category: 'Development',
    color: '#06d6a0',
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
    duration: 1,
    category: 'Development',
    color: '#f72585',
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
    duration: 1,
    category: 'Internship',
    color: '#fb8500',
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
];

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'All') return experiences;
  return experiences.filter(exp => exp.category === activeFilter.value);
});

const totalYears = computed(() => {
  return new Date().getFullYear() - 2021;
});

const totalProjects = computed(() => {
  return experiences.reduce((total, exp) => {
    const projectCount = exp.metrics?.find(m => m.label.includes('Project'))?.value;
    return total + (projectCount ? parseInt(projectCount) : 5);
  }, 0);
});

const uniqueSkills = computed(() => {
  const allSkills = new Set();
  experiences.forEach(exp => {
    Object.values(exp.skillCategories).forEach(category => {
      category.forEach(skill => allSkills.add(skill));
    });
  });
  return allSkills.size;
});

const skillsByCategory = computed(() => {
  const skills = {};
  
  experiences.forEach(exp => {
    Object.entries(exp.skillCategories).forEach(([categoryName, categorySkills]) => {
      if (!skills[categoryName]) {
        skills[categoryName] = [];
      }
      
      categorySkills.forEach(skill => {
        const existingSkill = skills[categoryName].find(s => s.name === skill);
        if (existingSkill) {
          existingSkill.frequency++;
          existingSkill.level = Math.min(100, existingSkill.level + 10);
        } else {
          skills[categoryName].push({
            name: skill,
            frequency: 1,
            level: 50 + Math.floor(Math.random() * 40)
          });
        }
      });
    });
  });
  
  // Sort skills by frequency and then by level
  Object.keys(skills).forEach(category => {
    skills[category].sort((a, b) => {
      if (a.frequency !== b.frequency) return b.frequency - a.frequency;
      return b.level - a.level;
    });
  });
  
  return skills;
});

const setActiveFilter = (filter) => {
  activeFilter.value = filter;
};

const toggleDetails = (id) => {
  const index = expandedDetails.value.indexOf(id);
  if (index > -1) {
    expandedDetails.value.splice(index, 1);
  } else {
    expandedDetails.value.push(id);
  }
};

const getIconClass = (category) => {
  switch (category) {
    case 'Development': return 'fas fa-code';
    case 'Management': return 'fas fa-briefcase';
    case 'Internship': return 'fas fa-graduation-cap';
    default: return 'fas fa-briefcase';
  }
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
.experience-section {
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

/* Timeline View */
.timeline-container {
  position: relative;
  margin-top: 1rem;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  animation: fadeIn 0.5s ease-out var(--delay) both;
}

.timeline-date {
  width: 120px;
  flex-shrink: 0;
  padding-right: 1rem;
  text-align: right;
  position: relative;
}

.date-year {
  display: block;
  color: var(--accent-color);
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.date-line {
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background-color: var(--terminal-header);
}

.timeline-content {
  flex: 1;
  padding-left: 2rem;
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 2px solid var(--terminal-bg);
}

.experience-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.experience-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--terminal-comment);
}

.card-toggle {
  color: var(--terminal-comment);
  transition: color 0.3s ease;
}

.experience-card:hover .card-toggle {
  color: var(--accent-color);
}

.card-description {
  margin-bottom: 1rem;
  color: var(--terminal-comment);
}

.card-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--accent-color);
}

.metric-label {
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

/* Expanded Details */
.expanded-details {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  animation: slideDown 0.3s ease-out;
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  margin: 0 0 1rem 0;
  color: var(--accent-color);
}

.detail-section ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--terminal-comment);
}

.detail-section li {
  margin-bottom: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-name {
  color: var(--terminal-property);
  font-weight: bold;
}

.category-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-left: 1rem;
}

.skill-tag {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Skills View */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.skill-category-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h3 {
  margin: 0;
  color: var(--accent-color);
}

.skill-count {
  font-size: 0.9rem;
  color: var(--terminal-comment);
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-name {
  font-weight: bold;
  color: var(--terminal-text);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-bar {
  flex: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  width: var(--level);
  background-color: var(--accent-color);
}

.level-text {
  font-size: 0.8rem;
  color: var(--terminal-comment);
  min-width: 40px;
  text-align: right;
}

/* Stats View */
.stats-container {
  margin-top: 1rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--terminal-comment);
}

.stats-chart {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.stats-chart h3 {
  margin: 0 0 1rem 0;
  color: var(--accent-color);
}

.timeline-chart {
  position: relative;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.chart-bar {
  position: absolute;
  bottom: 0;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.bar-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--terminal-bg);
  border: 1px solid var(--terminal-header);
  border-radius: 4px;
  padding: 0.5rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.chart-bar:hover .bar-tooltip {
  opacity: 1;
}

.tooltip-title {
  font-weight: bold;
  color: var(--terminal-text);
}

.tooltip-company {
  font-size: 0.9rem;
  color: var(--terminal-comment);
}

.tooltip-period {
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

.stats-skills {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
}

.stats-skills h3 {
  margin: 0 0 1rem 0;
  color: var(--accent-color);
}

.skills-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
}

.skill-category-name {
  color: var(--terminal-text);
}

.skill-percentage {
  color: var(--accent-color);
}

.skill-progress {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress-fill {
  height: 100%;
  background-color: var(--accent-color);
}

/* Terminal Footer */
.terminal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--terminal-header);
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

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
@media (max-width: 992px) {
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-date {
    width: 100%;
    text-align: left;
    padding-right: 0;
    padding-bottom: 0.5rem;
  }
  
  .date-line {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
    width: 100%;
    height: 2px;
  }
  
  .timeline-content {
    padding-left: 0;
    padding-top: 1rem;
  }
  
  .timeline-content::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .experience-section {
    padding: 3rem 1rem;
  }
  
  .terminal-container {
    margin: 0 1rem;
  }
  
  .tab-content {
    padding: 1rem;
  }
  
  .system-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .card-metrics {
    flex-direction: column;
  }
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .experience-section {
    padding: 2rem 0.5rem;
  }
  
  .terminal-container {
    margin: 0 0.5rem;
  }
  
  .tab-content {
    padding: 0.8rem;
  }
  
  .experience-card {
    padding: 1rem;
  }
  
  .expanded-details {
    padding: 1rem;
  }
  
  .skill-category-card {
    padding: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stats-chart, .stats-skills {
    padding: 1rem;
  }
}
</style>