<template>
  <section id="skills" class="skills-section">
    <!-- Terminal Window Container -->
    <div class="terminal-window skills-terminal">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">skills@portfolio:~</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- Command Line -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat tech_stack.json</span>
        </div>
        
        <!-- Terminal Output -->
        <div class="terminal-output">
          <!-- Skills Display -->
          <div class="skills-display">
            <div class="code-line">
              <span class="code-brace">{</span>
            </div>
            
            <div 
              v-for="(category, index) in skillCategories"
              :key="category.title"
              class="skill-category"
              :style="{ '--delay': index * 0.1 + 's' }"
            >
              <div class="category-header">
                <span class="code-property">"{{ category.title.toLowerCase() }}"</span>
                <span class="code-operator">:</span>
                <span class="code-brace">{</span>
              </div>
              
              <div class="category-properties">
                <div class="property-line">
                  <span class="code-property">description:</span>
                  <span class="code-string">"{{ category.description }}"</span>,
                </div>
                
                <div class="property-line">
                  <span class="code-property">level:</span>
                  <span class="code-number">{{ category.level }}</span>,
                </div>
                
                <div class="property-line">
                  <span class="code-property">skills:</span>
                  <span class="code-bracket">[</span>
                  <div class="skills-list">
                    <div 
                      v-for="(skill, skillIndex) in category.skills"
                      :key="skill.name"
                      class="skill-item"
                      :style="{ '--skill-delay': skillIndex * 0.05 + 's' }"
                    >
                      <span class="code-brace">{</span>
                      <span class="code-property">name:</span>
                      <span class="code-string">"{{ skill.name }}"</span>,
                      <span class="code-property">icon:</span>
                      <span class="code-string">"{{ skill.icon }}"</span>
                      <span class="code-brace">}</span>
                      <span v-if="skillIndex < category.skills.length - 1" class="code-punctuation">,</span>
                    </div>
                  </div>
                  <span class="code-bracket">]</span>,
                </div>
              </div>
              
              <div class="category-footer">
                <span class="code-brace">}</span>
                <span v-if="index < skillCategories.length - 1" class="code-punctuation">,</span>
              </div>
            </div>
            
            <div class="code-line">
              <span class="code-brace">}</span>
            </div>
          </div>
          
          <!-- Skills Stats Command -->
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
                    <span class="code-number">{{ totalSkills }}+</span>,
                  </div>
                  <div class="stat-line">
                    <span class="code-property">specializations:</span>
                    <span class="code-number">4</span>,
                  </div>
                  <div class="stat-line">
                    <span class="code-property">yearsExperience:</span>
                    <span class="code-number">3+</span>,
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

<script setup lang="ts">
import { ref, computed } from 'vue'

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
]

const totalSkills = computed(() => {
  return skillCategories.reduce((total, category) => total + category.skills.length, 0)
})
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

/* Skills Section */
.skills-section {
  position: relative;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin-top: 1.5rem;
  margin-left: -2rem;
  padding: 2rem;
  background-color: var(--bg-color);
}

/* Skills Terminal */
.skills-terminal {
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

/* Skills Display */
.skills-display {
  margin-bottom: 2rem;
}

.code-line {
  margin-bottom: 0.5rem;
}

.skill-category {
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  animation: fadeIn 0.5s ease-out var(--delay) both;
}

.category-header {
  margin-bottom: 0.5rem;
}

.category-properties {
  margin-left: 1rem;
}

.property-line {
  margin-bottom: 0.25rem;
}

.category-footer {
  margin-top: 0.5rem;
}

.skills-list {
  margin-left: 1rem;
}

.skill-item {
  margin-bottom: 0.25rem;
  animation: skillFadeIn 0.5s ease-out var(--skill-delay) both;
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

@keyframes skillFadeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
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
@media (max-width: 768px) {
  .skills-section {
    padding: 1rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .skill-category {
    margin-left: 0.5rem;
  }
  
  .category-properties {
    margin-left: 0.5rem;
  }
  
  .skills-list {
    margin-left: 0.5rem;
  }
}

@media (max-width: 480px) {
  .skills-section {
    padding: 0.5rem;
  }
  
  .terminal-body {
    padding: 0.75rem;
  }
  
  .skill-category {
    margin-left: 0.25rem;
  }
  
  .category-properties {
    margin-left: 0.25rem;
  }
  
  .skills-list {
    margin-left: 0.25rem;
  }
}
</style>