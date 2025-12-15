<template>
  <section class="hero-section">
    <!-- Animated Code Background -->
    <div class="code-background">
      <div class="code-lines">
        <div class="code-line" v-for="(line, index) in codeLines" :key="index" :style="`animation-delay: ${index * 0.1}s`">
          <span class="line-number">{{ index + 1 }}</span>
          <span class="code-content" v-html="line"></span>
        </div>
      </div>
      <div class="terminal-cursor"></div>
    </div>

    <!-- Glitch Effect Overlay -->
    <div class="glitch-overlay"></div>
    
    <!-- Main Content -->
    <div class="hero-container">
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">kelvin@developer:~</div>
        </div>
        
        <div class="terminal-body">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">whoami</span>
          </div>
          
          <div class="terminal-output">
            <div class="identity-card">
              <div class="card-header">
                <div class="avatar-container">
                  <img src="/profile.JPG" alt="Kelvin Kamau" class="avatar" />
                  <div class="status-indicator online"></div>
                </div>
                <div class="identity-info">
                  <h1 class="identity-name">Kelvin Kamau</h1>
                  <div class="identity-role">
                    <span class="role-text">{{ currentRole }}</span>
                    <span class="cursor">_</span>
                  </div>
                </div>
              </div>
              
              <div class="card-details">
                <div class="detail-item">
                  <span class="detail-key">occupation:</span>
                  <span class="detail-value">Full Stack Developer</span>
                </div>
                <div class="detail-item">
                  <span class="detail-key">specialization:</span>
                  <span class="detail-value">UI/UX Engineering</span>
                </div>
                <div class="detail-item">
                  <span class="detail-key">passion:</span>
                  <span class="detail-value">Creating solutions that matter</span>
                </div>
              </div>
              
              <div class="card-description">
                <p>Crafting exceptional digital experiences with clean code and thoughtful design.</p>
              </div>
            </div>
          </div>
          
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">git log --pretty=format:'%h %ad %s' --date=short --since='1 year ago'</span>
          </div>
          
          <div class="terminal-output">
            <div class="contributions-container">
              <div class="contributions-header">
                <div class="contributions-title">
                  {{ contributions.length }} contributions in the last year
                </div>
                <div class="contributions-legend">
                  <span class="legend-item">Less</span>
                  <div class="legend-colors">
                    <div class="legend-color level-0"></div>
                    <div class="legend-color level-1"></div>
                    <div class="legend-color level-2"></div>
                    <div class="legend-color level-3"></div>
                    <div class="legend-color level-4"></div>
                  </div>
                  <span class="legend-item">More</span>
                </div>
              </div>
              
              <div class="contributions-graph">
                <div class="graph-months">
                  <div 
                    v-for="month in months" 
                    :key="month" 
                    class="graph-month"
                  >
                    <div class="month-label">{{ month }}</div>
                    <div class="month-days">
                      <div 
                        v-for="(day, index) in getDaysInMonth(month)" 
                        :key="index"
                        class="day-square"
                        :class="getContributionLevel(day)"
                        :title="getContributionTooltip(day)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="contributions-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ longestStreak }}</span>
                  <span class="stat-label">Longest streak</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ currentStreak }}</span>
                  <span class="stat-label">Current streak</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ totalContributions }}</span>
                  <span class="stat-label">Total contributions</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">./contact.sh</span>
          </div>
          
          <div class="terminal-actions">
            <a href="#contact" class="terminal-button-primary">
              <span>Get In Touch</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L15 8L8 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#projects" class="terminal-button-secondary">
              <span>View My Work</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Social Links -->
      <div class="social-terminal">
        <div class="social-terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">social_links</div>
        </div>
        <div class="social-terminal-body">
          <div class="social-links">
            <a href="https://github.com/Njenga993" target="_blank" class="social-link">
              <div class="social-icon github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12z"/>
                </svg>
              </div>
              <span class="social-label">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="social-link">
              <div class="social-icon linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span class="social-label">LinkedIn</span>
            </a>
            <a href="mailto:njengak993@gmail.com" class="social-link">
              <div class="social-icon email">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm13.5 12.268h-18.779l5.513-6.812 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
              </div>
              <span class="social-label">Email</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
    </div>   
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const roles = [
  "Full Stack Developer",
  "UI/UX Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];
const currentRole = ref(roles[0]);
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Code lines for background
const codeLines = [
  '<span class="code-keyword">const</span> <span class="code-variable">developer</span> = {',
  '  <span class="code-property">name</span>: <span class="code-string">"Kelvin Kamau"</span>,',
  '  <span class="code-property">skills</span>: [<span class="code-string">"JavaScript"</span>, <span class="code-string">"Vue.js"</span>, <span class="code-string">"Node.js"</span>],',
  '  <span class="code-property">passion</span>: <span class="code-string">"Creating amazing experiences"</span>,',
  '  <span class="code-property">status</span>: <span class="code-boolean">true</span>',
  '};',
  '',
  '<span class="code-keyword">function</span> <span class="code-function">createSolution</span>(<span class="code-parameter">problem</span>) {',
  '  <span class="code-keyword">return</span> <span class="code-keyword">new</span> <span class="code-class">Solution</span>(problem);',
  '}',
  '',
  '<span class="code-comment">// Building the future, one line at a time</span>'
];

// Generate contributions data (mimicking GitHub's structure)
const generateContributions = () => {
  const contributions = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
  // Create an entry for each day in the past year
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const level = Math.floor(Math.random() * 5); // 0-4 contribution level
    contributions.push({
      date: new Date(d),
      level: level,
      count: level === 0 ? 0 : Math.floor(Math.random() * 10) + 1 // Random count if level > 0
    });
  }
  
  return contributions;
};

const contributions = ref(generateContributions());
const months = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

// Calculate streaks
const calculateStreaks = () => {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Go through contributions in reverse order (most recent first)
  for (let i = contributions.value.length - 1; i >= 0; i--) {
    if (contributions.value[i].level > 0) {
      if (currentStreak === 0) {
        currentStreak = 1;
      } else {
        currentStreak++;
      }
      
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
      
      // If we've already started counting the current streak and hit a zero, break
      if (currentStreak > 0) {
        break;
      }
    }
  }
  
  return { currentStreak, longestStreak };
};

const streaks = computed(() => calculateStreaks());
const currentStreak = computed(() => streaks.value.currentStreak);
const longestStreak = computed(() => streaks.value.longestStreak);

// Calculate total contributions
const totalContributions = computed(() => {
  return contributions.value.reduce((total, day) => total + day.count, 0);
});

// Helper functions for the contributions graph
const getDaysInMonth = (month) => {
  const monthIndex = months.value.indexOf(month);
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  
  // Return an array of day objects for the month
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, monthIndex, i);
    const contribution = contributions.value.find(c => 
      c.date.getDate() === i && 
      c.date.getMonth() === monthIndex && 
      c.date.getFullYear() === year
    );
    
    days.push(contribution || { date, level: 0, count: 0 });
  }
  
  return days;
};

const getContributionLevel = (day) => {
  return `level-${day.level}`;
};

const getContributionTooltip = (day) => {
  const dateStr = day.date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  
  if (day.level === 0) {
    return `No contributions on ${dateStr}`;
  }
  
  return `${day.count} contribution${day.count > 1 ? 's' : ''} on ${dateStr}`;
};

onMounted(() => {
  typeRole();
  
  // Add random glitch effects
  setInterval(() => {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
      glitchOverlay.style.opacity = Math.random() > 0.95 ? '0.1' : '0';
    }
  }, 3000);
});

function typeRole() {
  const fullRole = roles[roleIndex];
  
  if (isDeleting) {
    currentRole.value = fullRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentRole.value = fullRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === fullRole.length) {
    isDeleting = true;
    setTimeout(typeRole, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 500);
  } else {
    setTimeout(typeRole, isDeleting ? 40 : 100);
  }
}
</script>

<style>
/* Global theme styles */
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
/* Base Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  width: calc(90% - 0.7rem);
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin-top: 4.5rem;
  margin-left: -2rem;
  padding: 2rem;
  background-color: var(--bg-color);
}

/* Code Background */
.code-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--terminal-bg);
  overflow: hidden;
  opacity: 0.15;
  z-index: 1;
}

.code-lines {
  padding: 2rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-line {
  display: flex;
  opacity: 0;
  animation: fadeInLine 0.5s forwards;
}

.line-number {
  color: var(--terminal-line-number);
  width: 30px;
  text-align: right;
  margin-right: 20px;
  user-select: none;
}

.code-content {
  flex: 1;
}

.code-keyword { color: var(--terminal-keyword); }
.code-string { color: var(--terminal-string); }
.code-comment { color: var(--terminal-comment); }
.code-function { color: var(--terminal-function); }
.code-variable { color: var(--terminal-variable); }
.code-property { color: var(--terminal-property); }
.code-boolean { color: var(--terminal-boolean); }
.code-class { color: var(--terminal-class); }
.code-parameter { color: var(--terminal-parameter); }

.terminal-cursor {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  width: 10px;
  height: 20px;
  background-color: var(--terminal-prompt);
  animation: blink 1s infinite;
}

/* Glitch Effect */
.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 0, 255, 0.1) 50%,
    transparent 100%
  );
  z-index: 2;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

/* Main Content Container */
.hero-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
  width: calc(90% - 0.7rem);
}

/* Terminal Window */
.terminal-window {
  width: 100%;
  max-width: 800px;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

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

/* Identity Card */
.identity-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #3fb950;
  border: 2px solid var(--terminal-bg);
}

.identity-info {
  flex: 1;
}

.identity-name {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
  background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.identity-role {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.role-text {
  color: var(--accent-color);
}

.cursor {
  color: var(--accent-color);
  animation: blink 1s infinite;
}

.card-details {
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 0.5rem;
}

.detail-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
}

.detail-value {
  color: var(--terminal-string);
}

.card-description {
  color: var(--terminal-comment);
  font-style: italic;
}

/* Contributions Container */
.contributions-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.contributions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.contributions-title {
  color: var(--terminal-text);
  font-weight: bold;
}

.contributions-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

.legend-colors {
  display: flex;
  gap: 2px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* GitHub Exact Colors */
.legend-color.level-0 {
  background-color: #ebedf0;
}

.legend-color.level-1 {
  background-color: #9be9a8;
}

.legend-color.level-2 {
  background-color: #40c463;
}

.legend-color.level-3 {
  background-color: #30a14e;
}

.legend-color.level-4 {
  background-color: #216e39;
}

/* Contributions Graph */
.contributions-graph {
  margin-bottom: 1rem;
}

.graph-months {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.graph-month {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 120px;
}

.month-label {
  font-size: 0.7rem;
  color: var(--terminal-comment);
  text-align: center;
}

.month-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day-square {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: transform 0.2s ease;
}

.day-square:hover {
  transform: scale(1.2);
}

/* GitHub Exact Contribution Colors */
.day-square.level-0 {
  background-color: #ebedf0;
}

.day-square.level-1 {
  background-color: #9be9a8;
}

.day-square.level-2 {
  background-color: #40c463;
}

.day-square.level-3 {
  background-color: #30a14e;
}

.day-square.level-4 {
  background-color: #216e39;
}

/* Contributions Stats */
.contributions-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

/* Terminal Actions */
.terminal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.terminal-button-primary, .terminal-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.terminal-button-primary {
  background-color: var(--accent-color);
  color: white;
}

.terminal-button-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.terminal-button-secondary {
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
}

.terminal-button-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Social Terminal */
.social-terminal {
  width: 100%;
  max-width: 400px;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out 0.2s both;
}

.social-terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.75rem 1rem;
}

.social-terminal-body {
  padding: 1.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon.github {
  background-color: #333;
}

.social-icon.linkedin {
  background-color: #0077b5;
}

.social-icon.email {
  background-color: #ea4335;
}

.social-label {
  color: var(--terminal-text);
  font-size: 0.9rem;
}

.social-link:hover {
  transform: translateY(-5px);
}

/* Animations */
@keyframes fadeInLine {
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
  .hero-container {
    max-width: 1400px;
  }
  
  .terminal-window {
    max-width: 900px;
  }
  
  .social-terminal {
    max-width: 450px;
  }
  
  .identity-name {
    font-size: 2.2rem;
  }
  
  .identity-role {
    font-size: 1.3rem;
  }
  
  .day-square {
    width: 14px;
    height: 14px;
  }
  
  .month-label {
    font-size: 0.8rem;
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .hero-container {
    max-width: 1200px;
  }
  
  .terminal-window {
    max-width: 850px;
  }
  
  .social-terminal {
    max-width: 420px;
  }
  
  .identity-name {
    font-size: 2.1rem;
  }
  
  .identity-role {
    font-size: 1.25rem;
  }
  
  .day-square {
    width: 13px;
    height: 13px;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .hero-section {
    padding: 1.5rem;
    margin-top: 4rem;
  }
  
  .terminal-window {
    max-width: 800px;
  }
  
  .social-terminal {
    max-width: 400px;
  }
  
  .identity-name {
    font-size: 2rem;
  }
  
  .identity-role {
    font-size: 1.2rem;
  }
  
  .day-square {
    width: 12px;
    height: 12px;
  }
  
  .month-label {
    font-size: 0.7rem;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .hero-section {
    padding: 1.5rem;
    margin-top: 4rem;
    margin-left: -3rem;
  }
  
  .terminal-window, .social-terminal {
    max-width: 100%;
  }
  
  .identity-name {
    font-size: 1.8rem;
  }
  
  .identity-role {
    font-size: 1.1rem;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
  }
  
  .day-square {
    width: 10px;
    height: 10px;
  }
  
  .graph-months {
    gap: 0.25rem;
  }
  
  .month-label {
    font-size: 0.6rem;
  }
  
  .contributions-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .hero-section {
    padding: 1rem;
    margin-top: 5rem;
  }
  
  .terminal-window, .social-terminal {
    max-width: 100%;
  }
  
  .identity-name {
    font-size: 1.6rem;
  }
  
  .identity-role {
    font-size: 1rem;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
  }
  
  .day-square {
    width: 8px;
    height: 8px;
  }
  
  .graph-months {
    gap: 0.2rem;
  }
  
  .month-label {
    font-size: 0.55rem;
  }
  
  .contributions-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .contributions-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .hero-section {
    padding: 0.8rem;
    margin-top: 4rem;
  }
  
  .terminal-window, .social-terminal {
    max-width: 100%;
  }
  
  .identity-name {
    font-size: 1.5rem;
  }
  
  .identity-role {
    font-size: 0.9rem;
  }
  
  .avatar {
    width: 55px;
    height: 55px;
  }
  
  .day-square {
    width: 7px;
    height: 7px;
  }
  
  .graph-months {
    gap: 0.15rem;
  }
  
  .month-label {
    font-size: 0.5rem;
  }
  
  .contributions-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .contributions-legend {
    font-size: 0.7rem;
  }
  
  .legend-color {
    width: 10px;
    height: 10px;
  }
  
  .contributions-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stat-value {
    font-size: 1rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .hero-section {
    padding: 0.5rem;
    margin-top: 3.8rem;
  }
  
  .terminal-window, .social-terminal {
    max-width: 100%;
  }
  
  .identity-name {
    font-size: 1.4rem;
  }
  
  .identity-role {
    font-size: 0.8rem;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
  }
  
  .day-square {
    width: 6px;
    height: 6px;
  }
  
  .graph-months {
    gap: 0.1rem;
  }
  
  .month-label {
    font-size: 0.45rem;
  }
  
  .contributions-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .contributions-legend {
    font-size: 0.6rem;
  }
  
  .legend-color {
    width: 8px;
    height: 8px;
  }
  
  .contributions-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stat-value {
    font-size: 0.9rem;
  }
  
  .stat-label {
    font-size: 0.6rem;
  }
}
</style>