<template>
  <section id="skills" class="skills-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
      
        <div class="terminal-title">skills@portfolio:~# ./system_profiler.sh</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Info -->
        <div class="system-info">
          <div class="info-line">
            <span class="info-text">System:</span>
            <span class="info-value">Skills Profiler v2.0.24</span>
          </div>
          <div class="info-line">
            <span class="info-text">Categories:</span>
            <span class="info-value">{{ skillCategories.length }}</span>
          </div>
          <div class="info-line">
            <span class="info-text">Total Skills:</span>
            <span class="info-value">{{ totalSkills }}</span>
          </div>
        </div>
        
        <!-- Terminal Tabs -->
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'matrix' }" 
            @click="activeTab = 'matrix'"
          >
            <span class="tab-icon">📊</span>
            <span class="tab-text">matrix</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'radar' }" 
            @click="activeTab = 'radar'"
          >
            <span class="tab-icon">🎯</span>
            <span class="tab-text">radar</span>
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
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Matrix View -->
          <div v-if="activeTab === 'matrix'" class="matrix-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat skills_matrix.txt</span>
            </div>
            
            <div class="skills-matrix">
              <div 
                v-for="(category, index) in skillCategories"
                :key="category.title"
                class="skill-category-card"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <div class="category-header" @click="toggleCategory(category.title)">
                  <div class="category-icon">
                    <i :class="getCategoryIcon(category.title)"></i>
                  </div>
                  <div class="category-info">
                    <h3 class="category-title">{{ category.title }}</h3>
                    <div class="category-meta">
                      <span class="skill-count">{{ category.skills.length }} skills</span>
                      <span class="category-level">Level {{ category.level }}/5</span>
                    </div>
                  </div>
                  <div class="category-toggle">
                    <i :class="expandedCategories.includes(category.title) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                  </div>
                </div>
                
                <div class="category-progress">
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: `${(category.level / 5) * 100}%` }"
                    ></div>
                  </div>
                </div>
                
                <div 
                  v-if="expandedCategories.includes(category.title)"
                  class="category-details"
                >
                  <div class="category-description">
                    <p>{{ category.description }}</p>
                  </div>
                  
                  <div class="skills-grid">
                    <div 
                      v-for="skill in category.skills"
                      :key="skill.name"
                      class="skill-item"
                      @click="showSkillDetails(skill)"
                    >
                      <div class="skill-icon">
                        <img :src="getSkillIcon(skill.icon)" :alt="skill.name" />
                      </div>
                      <div class="skill-info">
                        <h4 class="skill-name">{{ skill.name }}</h4>
                        <div class="skill-level">
                          <div class="level-bar">
                            <div 
                              class="level-fill" 
                              :style="{ width: `${getSkillLevel(skill.name) * 20}%` }"
                            ></div>
                          </div>
                          <span class="level-text">{{ getSkillLevel(skill.name) }}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Radar View -->
          <div v-if="activeTab === 'radar'" class="radar-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">./skills_radar.sh</span>
            </div>
            
            <div class="skills-radar">
              <div class="radar-container">
                <canvas ref="radarCanvas" id="skillsRadar" width="500" height="500"></canvas>
              </div>
              
              <div class="radar-legend">
                <div 
                  v-for="(category, index) in skillCategories"
                  :key="category.title"
                  class="legend-item"
                >
                  <div 
                    class="legend-color" 
                    :style="{ backgroundColor: getCategoryColor(category.title) }"
                  ></div>
                  <span class="legend-text">{{ category.title }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Code View -->
          <div v-if="activeTab === 'code'" class="code-view">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat tech_stack.json</span>
            </div>
            
            <div class="code-container">
              <div class="code-line">
                <span class="line-number">01</span>
                <span class="code-content">
                  <span class="code-bracket">{</span>
                </span>
              </div>
              
              <div 
                v-for="(category, index) in skillCategories"
                :key="category.title"
                class="code-category"
                :style="{ '--delay': index * 0.1 + 's' }"
              >
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 2).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"{{ category.title.toLowerCase() }}"</span>
                    <span class="code-operator">:</span>
                    <span class="code-bracket">{</span>
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 3).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"description"</span>
                    <span class="code-operator">:</span>
                    <span class="code-string">"{{ category.description }}"</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 4).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"level"</span>
                    <span class="code-operator">:</span>
                    <span class="code-number">{{ category.level }}</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 5).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-property">"skills"</span>
                    <span class="code-operator">:</span>
                    <span class="code-bracket">[</span>
                  </span>
                </div>
                
                <div 
                  v-for="(skill, skillIndex) in category.skills"
                  :key="skill.name"
                  class="code-line"
                >
                  <span class="line-number">{{ String(index * 10 + 6 + skillIndex).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-bracket">{</span>
                    <span class="code-property">"name"</span>
                    <span class="code-operator">:</span>
                    <span class="code-string">"{{ skill.name }}"</span>,
                    <span class="code-property">"icon"</span>
                    <span class="code-operator">:</span>
                    <span class="code-string">"{{ skill.icon }}"</span>
                    <span class="code-bracket">}</span>
                    <span v-if="skillIndex < category.skills.length - 1" class="code-punctuation">,</span>
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 6 + category.skills.length).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-bracket">]</span>,
                  </span>
                </div>
                
                <div class="code-line">
                  <span class="line-number">{{ String(index * 10 + 7 + category.skills.length).padStart(2, '0') }}</span>
                  <span class="code-content">
                    <span class="code-bracket">}</span>
                    <span v-if="index < skillCategories.length - 1" class="code-punctuation">,</span>
                  </span>
                </div>
              </div>
              
              <div class="code-line">
                <span class="line-number">{{ String(skillCategories.length * 10 + 2).padStart(2, '0') }}</span>
                <span class="code-content">
                  <span class="code-bracket">}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Skills Stats -->
        <div class="stats-container">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">skill_stats.sh</span>
          </div>
          <div class="terminal-output">
            <div class="stats-terminal">
              <div class="stats-header">
                <span class="code-comment">// Skill Statistics</span>
              </div>
              <div class="stats-content">
                <div class="stat-line">
                  <span class="code-property">totalSkills:</span>
                  <span class="code-number">{{ totalSkills }}</span>,
                </div>
                <div class="stat-line">
                  <span class="code-property">specializations:</span>
                  <span class="code-number">{{ skillCategories.length }}</span>,
                </div>
                <div class="stat-line">
                  <span class="code-property">averageLevel:</span>
                  <span class="code-number">{{ averageLevel.toFixed(1) }}/5</span>,
                </div>
                <div class="stat-line">
                  <span class="code-property">topCategory:</span>
                  <span class="code-string">"{{ topCategory.title }}"</span>,
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
    
    <!-- Skill Details Modal -->
    <div v-if="selectedSkill" class="skill-modal" @click="closeSkillDetails">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedSkill.name }}</h2>
          <button @click="closeSkillDetails" class="close-button">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="skill-icon-large">
            <img :src="getSkillIcon(selectedSkill.icon)" :alt="selectedSkill.name" />
          </div>
          
          <div class="skill-details">
            <div class="skill-level-large">
              <span class="level-label">Proficiency:</span>
              <div class="level-bar-large">
                <div 
                  class="level-fill-large" 
                  :style="{ width: `${getSkillLevel(selectedSkill.name) * 20}%` }"
                ></div>
              </div>
              <span class="level-text-large">{{ getSkillLevel(selectedSkill.name) }}/5</span>
            </div>
            
            <div class="skill-description">
              <h3>Description</h3>
              <p>{{ getSkillDescription(selectedSkill.name) }}</p>
            </div>
            
            <div class="skill-projects">
              <h3>Projects Using This Skill</h3>
              <div class="project-tags">
                <span 
                  v-for="project in getProjectsForSkill(selectedSkill.name)" 
                  :key="project"
                  class="project-tag"
                >
                  {{ project }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

const activeTab = ref('matrix');
const expandedCategories = ref([]);
const selectedSkill = ref(null);
const radarCanvas = ref(null);

const skillCategories = [
  {
    title: 'Frontend',
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
    level: 4,
    description: 'I develop secure and scalable backend systems using Django and Node.js. I handle server logic, APIs, and database connections to power core of web applications.',
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
    level: 4,
    description: 'Designing interfaces and product visuals that combine aesthetics with functionality to create engaging user experiences.',
    skills: [
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'Photoshop', icon: 'logos:adobe-photoshop' },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
      { name: 'Canva', icon: 'simple-icons:canva' }
    ]
  }
];

const totalSkills = computed(() => {
  return skillCategories.reduce((total, category) => total + category.skills.length, 0);
});

const averageLevel = computed(() => {
  const total = skillCategories.reduce((sum, category) => sum + category.level, 0);
  return total / skillCategories.length;
});

const topCategory = computed(() => {
  return skillCategories.reduce((top, category) => 
    category.level > top.level ? category : top, 
    skillCategories[0]
  );
});

const toggleCategory = (title) => {
  const index = expandedCategories.value.indexOf(title);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
  } else {
    expandedCategories.value.push(title);
  }
};

const showSkillDetails = (skill) => {
  selectedSkill.value = skill;
  document.body.style.overflow = 'hidden';
};

const closeSkillDetails = () => {
  selectedSkill.value = null;
  document.body.style.overflow = '';
};

const getCategoryIcon = (title) => {
  switch (title) {
    case 'Frontend': return 'fas fa-laptop-code';
    case 'Backend': return 'fas fa-server';
    case 'Database': return 'fas fa-database';
    case 'Design': return 'fas fa-palette';
    default: return 'fas fa-code';
  }
};

const getCategoryColor = (title) => {
  switch (title) {
    case 'Frontend': return '#3b82f6';
    case 'Backend': return '#10b981';
    case 'Database': return '#f59e0b';
    case 'Design': return '#ec4899';
    default: return '#6b7280';
  }
};

const getSkillIcon = (icon) => {
  // In a real implementation, you would use a library like @iconify/vue
  // For this example, we'll return a placeholder URL
  return `https://api.iconify.design/${icon}.svg`;
};

const getSkillLevel = (skillName) => {
  // Generate a random skill level between 3 and 5 for demonstration
  // In a real implementation, you would have this data stored
  const levels = {
    'Vue.js': 5,
    'React': 4,
    'TypeScript': 4,
    'JavaScript': 5,
    'HTML5': 5,
    'CSS3': 5,
    'Tailwind CSS': 4,
    'Django': 4,
    'Python': 4,
    'Node.js': 4,
    'FastAPI': 3,
    'Flask': 3,
    'GraphQL': 3,
    'REST APIs': 5,
    'PHP Laravel': 3,
    'Express.js': 4,
    'MySQL': 4,
    'PostgreSQL': 4,
    'MariaDB': 3,
    'SQLite': 4,
    'MongoDB': 3,
    'Figma': 4,
    'Photoshop': 3,
    'Illustrator': 3,
    'Canva': 4
  };
  
  return levels[skillName] || 3;
};

const getSkillDescription = (skillName) => {
  const descriptions = {
    'Vue.js': 'Progressive JavaScript framework for building user interfaces.',
    'React': 'JavaScript library for building user interfaces.',
    'TypeScript': 'Typed superset of JavaScript that compiles to plain JavaScript.',
    'JavaScript': 'High-level, interpreted programming language.',
    'HTML5': 'Latest evolution of the standard that defines HTML.',
    'CSS3': 'Latest evolution of the Cascading Style Sheets language.',
    'Tailwind CSS': 'Utility-first CSS framework for rapid UI development.',
    'Django': 'High-level Python web framework for rapid development.',
    'Python': 'High-level programming language for general-purpose programming.',
    'Node.js': 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    'FastAPI': 'Modern, fast web framework for building APIs with Python.',
    'Flask': 'Micro web framework written in Python.',
    'GraphQL': 'Query language for APIs.',
    'REST APIs': 'Architectural style for designing networked applications.',
    'PHP Laravel': 'PHP web application framework with expressive, elegant syntax.',
    'Express.js': 'Fast, unopinionated, minimalist web framework for Node.js.',
    'MySQL': 'Open-source relational database management system.',
    'PostgreSQL': 'Powerful, open source object-relational database system.',
    'MariaDB': 'Community-developed fork of MySQL.',
    'SQLite': 'C-language library that implements a small, fast, self-contained SQL database engine.',
    'MongoDB': 'Document-oriented NoSQL database program.',
    'Figma': 'Collaborative interface design tool.',
    'Photoshop': 'Raster graphics editor developed and published by Adobe.',
    'Illustrator': 'Vector graphics editor developed and published by Adobe.',
    'Canva': 'Graphic design platform that allows users to create social media graphics, presentations, and other visual content.'
  };
  
  return descriptions[skillName] || 'A technology skill used in web development and design.';
};

const getProjectsForSkill = (skillName) => {
  const projects = {
    'Vue.js': ['React Portfolio Website', 'Seed Savers Network Kenya Website', 'INOFO Africa Website'],
    'React': ['React Portfolio Website', 'Techlungs Technology'],
    'TypeScript': ['React Portfolio Website', 'Seed Savers Network Kenya Website', 'INOFO Africa Website'],
    'JavaScript': ['React Portfolio Website', 'Techlungs Technology', 'SaleHub POS System'],
    'HTML5': ['React Portfolio Website', 'Seed Savers Network Kenya Website', 'INOFO Africa Website', 'Nyakazi Organics Ecommerce'],
    'CSS3': ['React Portfolio Website', 'Techlungs Technology', 'Nyakazi Organics Ecommerce'],
    'Tailwind CSS': ['React Portfolio Website'],
    'Django': ['SaleHub POS System'],
    'Python': ['SaleHub POS System'],
    'Node.js': ['SaleHub POS System'],
    'FastAPI': ['SaleHub POS System'],
    'Flask': ['SaleHub POS System'],
    'GraphQL': ['SaleHub POS System'],
    'REST APIs': ['SaleHub POS System'],
    'PHP Laravel': ['Desiderata Consultancy'],
    'Express.js': ['SaleHub POS System'],
    'MySQL': ['SaleHub POS System', 'Desiderata Consultancy'],
    'PostgreSQL': ['SaleHub POS System'],
    'MariaDB': ['SaleHub POS System'],
    'SQLite': ['SaleHub POS System'],
    'MongoDB': ['SaleHub POS System'],
    'Figma': ['Nyakazi Organics Ecommerce', 'Nyakazi Corporate Website', 'Desiderata Consultancy'],
    'Photoshop': ['Nyakazi Organics Ecommerce', 'Nyakazi Corporate Website', 'Desiderata Consultancy'],
    'Illustrator': ['Nyakazi Organics Ecommerce', 'Nyakazi Corporate Website', 'Desiderata Consultancy'],
    'Canva': ['Nyakazi Organics Ecommerce', 'Nyakazi Corporate Website', 'Desiderata Consultancy']
  };
  
  return projects[skillName] || ['Various Projects'];
};

const drawRadarChart = () => {
  if (!radarCanvas.value) return;
  
  const canvas = radarCanvas.value;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 40;
  const categories = skillCategories;
  const angleStep = (Math.PI * 2) / categories.length;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    
    for (let j = 0; j < categories.length; j++) {
      const angle = j * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * i / 5);
      const y = centerY + Math.sin(angle) * (radius * i / 5);
      
      if (j === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.stroke();
  }
  
  // Draw axes
  for (let i = 0; i < categories.length; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    
    // Draw labels
    ctx.font = '14px Fira Code, monospace';
    ctx.fillStyle = '#e6edf3';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const labelX = centerX + Math.cos(angle) * (radius + 20);
    const labelY = centerY + Math.sin(angle) * (radius + 20);
    ctx.fillText(categories[i].title, labelX, labelY);
  }
  
  // Draw data
  ctx.beginPath();
  for (let i = 0; i < categories.length; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const value = categories[i].level / 5;
    const x = centerX + Math.cos(angle) * (radius * value);
    const y = centerY + Math.sin(angle) * (radius * value);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.closePath();
  ctx.fillStyle = 'rgba(88, 166, 255, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#58a6ff';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Draw points
  for (let i = 0; i < categories.length; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const value = categories[i].level / 5;
    const x = centerX + Math.cos(angle) * (radius * value);
    const y = centerY + Math.sin(angle) * (radius * value);
    
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = getCategoryColor(categories[i].title);
    ctx.fill();
  }
};

onMounted(() => {
  nextTick(() => {
    if (activeTab.value === 'radar') {
      drawRadarChart();
    }
  });
});

// Watch for tab changes to redraw the radar chart
import { watch } from 'vue';
watch(activeTab, (newTab) => {
  if (newTab === 'radar') {
    nextTick(() => {
      drawRadarChart();
    });
  }
});
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
.skills-section {
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--bg-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--text-color);
  width: 100vw;
  width: calc(95% + 1rem);
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

/* Tab Content */
.tab-content {
  padding: 1.5rem;
  min-height: 500px;
}

/* Matrix View */
.skills-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.skill-category-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out var(--delay) both;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-info {
  flex: 1;
}

.category-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.category-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--terminal-comment);
}

.category-toggle {
  color: var(--terminal-comment);
  transition: color 0.3s ease;
}

.category-header:hover .category-toggle {
  color: var(--accent-color);
}

.category-progress {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
}

.progress-bar {
  height: 100%;
  background-color: var(--accent-color);
  transition: width 0.5s ease;
}

.category-details {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.category-description {
  margin-bottom: 1rem;
}

.category-description p {
  margin: 0;
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.skill-icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
}

.skill-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-info {
  flex: 1;
}

.skill-name {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.level-bar {
  flex: 1;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  background-color: var(--accent-color);
}

.level-text {
  font-size: 0.8rem;
  color: var(--terminal-comment);
  min-width: 30px;
  text-align: right;
}

/* Radar View */
.skills-radar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.radar-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-text {
  font-size: 0.9rem;
  color: var(--terminal-text);
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

.code-category {
  margin-bottom: 1rem;
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

/* Terminal Footer */
.terminal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--terminal-header);
}

/* Skill Modal */
.skill-modal {
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
  max-width: 600px;
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-icon-large {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

.skill-icon-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.skill-level-large {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.level-label {
  font-weight: bold;
  color: var(--terminal-text);
  min-width: 100px;
}

.level-bar-large {
  flex: 1;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.level-fill-large {
  height: 100%;
  background-color: var(--accent-color);
}

.level-text-large {
  font-weight: bold;
  color: var(--accent-color);
  min-width: 30px;
  text-align: right;
}

.skill-description h3,
.skill-projects h3 {
  margin: 0 0 0.5rem 0;
  color: var(--accent-color);
}

.skill-description p {
  margin: 0;
  color: var(--terminal-comment);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
@media (max-width: 992px) {
  .skills-matrix {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 768px) {
  .skills-section {
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
  
  .category-header {
    padding: 0.75rem;
  }
  
  .category-details {
    padding: 0.75rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .skill-item {
    padding: 0.5rem;
  }
  
  .radar-container {
    width: 100%;
    overflow-x: auto;
  }
  
  #skillsRadar {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
}

@media (max-width: 480px) {
  .skills-section {
    padding: 2rem 0.5rem;
  }
  
  .terminal-container {
    margin: 0 0.5rem;
  }
  
  .tab-content {
    padding: 0.8rem;
  }
  
  .category-header {
    padding: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .category-details {
    padding: 0.5rem;
  }
  
  .skill-item {
    padding: 0.5rem;
  }
  
  .skill-icon {
    width: 24px;
    height: 24px;
  }
  
  .code-container {
    padding: 0.6rem;
  }
  
  .line-number {
    width: 25px;
    margin-right: 0.6rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .skill-icon-large {
    width: 60px;
    height: 60px;
  }
}
</style>