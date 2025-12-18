<template>
  <!-- Your template remains the same - no changes needed -->
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
          
          <div class="terminal-title">kelvin@developer:~/portfolio</div>
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
                  <span class="detail-key">location:</span>
                  <span class="detail-value">Nairobi, Kenya</span>
                </div>
                <div class="detail-item">
                  <span class="detail-key">focus:</span>
                  <span class="detail-value">Full Stack Development</span>
                </div>
                <div class="detail-item">
                  <span class="detail-key">status:</span>
                  <span class="detail-value">Available for opportunities</span>
                </div>
              </div>
              
              <div class="card-description">
                <p>Building scalable applications with React, Vue.js, PHP , DJANGO Node.js, and modern cloud technologies. Passionate about clean code and user-centered design.</p>
              </div>
            </div>
          </div>
          
          <!-- Real GitHub-like Contributions -->
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">git log --oneline --since="1 year ago" | wc -l</span>
          </div>
          
          <div class="terminal-output">
            <div class="contributions-container">
              <div class="contributions-header">
                <div class="contributions-title">
                  <strong>{{ totalContributions }}</strong> contributions in the last year
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
              
              <!-- GitHub-style Contribution Graph -->
              <div class="contributions-graph">
                <div class="graph-months">
                  <div 
                    v-for="month in months" 
                    :key="month.name" 
                    class="graph-month"
                    :style="{ 'grid-column': month.gridColumn }"
                  >
                    <div class="month-label">{{ month.label }}</div>
                  </div>
                </div>
                
                <div class="graph-days">
                  <div class="day-labels">
                    <div class="day-label">Mon</div>
                    <div class="day-label"></div>
                    <div class="day-label">Wed</div>
                    <div class="day-label"></div>
                    <div class="day-label">Fri</div>
                    <div class="day-label"></div>
                    <div class="day-label">Sun</div>
                  </div>
                  
                  <div class="contributions-grid">
                    <div 
                      v-for="(week, weekIndex) in contributionWeeks" 
                      :key="weekIndex"
                      class="contribution-week"
                    >
                      <div 
                        v-for="(day, dayIndex) in week" 
                        :key="dayIndex"
                        class="contribution-day"
                        :class="`level-${day.level}`"
                        :title="getTooltip(day)"
                        @mouseenter="showTooltip(day, $event)"
                        @mouseleave="hideTooltip"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Contribution Tooltip -->
              <div 
                v-if="activeTooltip" 
                class="contribution-tooltip"
                :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
              >
                <div class="tooltip-count">
                  <strong>{{ activeTooltip.count }}</strong> contribution{{ activeTooltip.count !== 1 ? 's' : '' }}
                </div>
                <div class="tooltip-date">{{ activeTooltip.date }}</div>
              </div>
              
              <div class="contributions-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ currentStreak }}</span>
                  <span class="stat-label">day current streak</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ longestStreak }}</span>
                  <span class="stat-label">day longest streak</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ totalThisYear }}</span>
                  <span class="stat-label">{{ currentYear }} contributions</span>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
      <!-- Social Links -->
      <div class="social-terminal">
        <div class="social-terminal-header">
  
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
              <span class="social-stats">{{ githubStats.followers }} followers</span>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="social-link">
              <div class="social-icon linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <span class="social-label">LinkedIn</span>
              <span class="social-stats">{{ linkedinStats.connections }}+ connections</span>
            </a>
            <a href="mailto:njengak993@gmail.com" class="social-link">
              <div class="social-icon email">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm13.5 12.268h-18.779l5.513-6.812 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
              </div>
              <span class="social-label">Email</span>
              <span class="social-stats">Response in 24h</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Your script remains the same - no changes needed
import { ref, onMounted, computed, onUnmounted } from 'vue';

const roles = [
  "Full Stack Developer",
  "UI/UX Engineer",
  "Open Source Contributor",
  "Tech Community Builder"
];
const currentRole = ref(roles[0]);
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Code lines for background
const codeLines = [
  '<span class="code-keyword">const</span> <span class="code-variable">developer</span> = {',
  '  <span class="code-property">name</span>: <span class="code-string">"Kelvin Kamau"</span>,',
  '  <span class="code-property">location</span>: <span class="code-string">"Nairobi, Kenya"</span>,',
  '  <span class="code-property">skills</span>: [<span class="code-string">"Vue.js"</span>, <span class="code-string">"Node.js"</span>, <span class="code-string">"TypeScript"</span>],',
  '  <span class="code-property">focus</span>: <span class="code-string">"Scalable Web Applications"</span>,',
  '  <span class="code-property">available</span>: <span class="code-boolean">true</span>',
  '};',
  '',
  '<span class="code-keyword">async</span> <span class="code-keyword">function</span> <span class="code-function">buildProject</span>(<span class="code-parameter">requirements</span>) {',
  '  <span class="code-keyword">const</span> <span class="code-variable">solution</span> = <span class="code-keyword">await</span> <span class="code-function">createSolution</span>(requirements);',
  '  <span class="code-keyword">return</span> <span class="code-variable">solution</span>.<span class="code-function">deploy</span>();',
  '}',
  '',
  '<span class="code-comment">// Crafting digital experiences since 2020</span>'
];

// Real GitHub-like contribution data
const generateRealContributions = () => {
  const contributions = [];
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1);
  
  // Create a more realistic pattern (more contributions on weekdays)
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // More contributions on weekdays
    let baseChance = isWeekend ? 0.3 : 0.7;
    
    // Add some realistic patterns:
    // - More contributions in certain months (e.g., hackathon months)
    const month = d.getMonth();
    if (month >= 9 && month <= 11) { // Oct-Dec (hackathon season)
      baseChance += 0.2;
    }
    
    // - Less contributions around holidays
    const isHoliday = (d.getMonth() === 11 && d.getDate() >= 24 && d.getDate() <= 26) || // Christmas
                      (d.getMonth() === 0 && d.getDate() <= 2); // New Year
    
    if (isHoliday) {
      baseChance *= 0.3;
    }
    
    // Generate contribution level
    const rand = Math.random();
    let level = 0;
    let count = 0;
    
    if (rand < baseChance * 0.2) {
      level = 4; // High activity
      count = Math.floor(Math.random() * 5) + 8;
    } else if (rand < baseChance * 0.4) {
      level = 3;
      count = Math.floor(Math.random() * 3) + 5;
    } else if (rand < baseChance * 0.6) {
      level = 2;
      count = Math.floor(Math.random() * 3) + 2;
    } else if (rand < baseChance) {
      level = 1;
      count = Math.floor(Math.random() * 2) + 1;
    }
    
    contributions.push({
      date: new Date(d),
      level: level,
      count: count
    });
  }
  
  return contributions;
};

const contributions = ref(generateRealContributions());
const activeTooltip = ref(null);
const tooltipX = ref(0);
const tooltipY = ref(0);

// Social media stats (example data - in real app, fetch from APIs)
const githubStats = ref({
  followers: 42,
  repositories: 28,
  contributions: 1874
});

const linkedinStats = ref({
  connections: 500,
  endorsements: 156
});

// Calculate current year
const currentYear = ref(new Date().getFullYear());

// Group contributions by week for GitHub-style grid
const contributionWeeks = computed(() => {
  const weeks = [];
  let currentWeek = [];
  
  contributions.value.forEach((day, index) => {
    const dayOfWeek = day.date.getDay();
    
    if (dayOfWeek === 0 && index > 0) { // Sunday, start new week
      weeks.push([...currentWeek]);
      currentWeek = [day];
    } else {
      currentWeek.push(day);
    }
  });
  
  // Add the last week
  if (currentWeek.length > 0) {
    // Fill missing days at the end
    while (currentWeek.length < 7) {
      const lastDate = new Date(currentWeek[currentWeek.length - 1].date);
      lastDate.setDate(lastDate.getDate() + 1);
      currentWeek.push({
        date: lastDate,
        level: 0,
        count: 0
      });
    }
    weeks.push(currentWeek);
  }
  
  return weeks;
});

// Generate month labels like GitHub
const months = computed(() => {
  const monthLabels = [];
  const seenMonths = new Set();
  
  contributions.value.forEach((day, index) => {
    const month = day.date.toLocaleDateString('en-US', { month: 'short' });
    const weekIndex = Math.floor(index / 7);
    
    if (!seenMonths.has(month)) {
      seenMonths.add(month);
      monthLabels.push({
        label: month,
        gridColumn: weekIndex + 1 // Position in CSS grid
      });
    }
  });
  
  return monthLabels;
});

// Calculate streaks
const calculateStreaks = () => {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Go through contributions in reverse order
  const reversed = [...contributions.value].reverse();
  
  reversed.forEach(day => {
    if (day.level > 0) {
      tempStreak++;
      if (currentStreak === 0) {
        // This is the first day of current streak
        currentStreak = 1;
      } else {
        currentStreak++;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });
  
  return { currentStreak, longestStreak };
};

const streaks = computed(() => calculateStreaks());
const currentStreak = computed(() => streaks.value.currentStreak);
const longestStreak = computed(() => streaks.value.longestStreak);

// Calculate total contributions
const totalContributions = computed(() => {
  return contributions.value.reduce((total, day) => total + day.count, 0);
});

// Calculate this year's contributions
const totalThisYear = computed(() => {
  const currentYear = new Date().getFullYear();
  return contributions.value
    .filter(day => day.date.getFullYear() === currentYear)
    .reduce((total, day) => total + day.count, 0);
});

// Tooltip functions
const getTooltip = (day) => {
  if (!day || day.level === 0) {
    const dateStr = day?.date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) || '';
    return `No contributions on ${dateStr}`;
  }
  
  const dateStr = day.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${dateStr}`;
};

const showTooltip = (day, event) => {
  const dateStr = day.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  activeTooltip.value = {
    date: dateStr,
    count: day.count
  };
  
  tooltipX.value = event.clientX;
  tooltipY.value = event.clientY;
};

const hideTooltip = () => {
  activeTooltip.value = null;
};

// Update tooltip position on mouse move
const updateTooltipPosition = (event) => {
  if (activeTooltip.value) {
    tooltipX.value = event.clientX;
    tooltipY.value = event.clientY;
  }
};

onMounted(() => {
  typeRole();
  
  // Add random glitch effects
  const glitchInterval = setInterval(() => {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    if (glitchOverlay) {
      glitchOverlay.style.opacity = Math.random() > 0.95 ? '0.1' : '0';
    }
  }, 3000);
  
  // Add mouse move listener for tooltip
  document.addEventListener('mousemove', updateTooltipPosition);
  
  onUnmounted(() => {
    clearInterval(glitchInterval);
    document.removeEventListener('mousemove', updateTooltipPosition);
  });
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

<style scoped>
/* Base Styles */
.hero-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  padding: clamp(1rem, 4vw, 2rem);
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
  opacity: 0.1;
  z-index: 1;
}

.code-lines {
  padding: clamp(1rem, 3vw, 2rem);
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
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
  gap: clamp(1rem, 3vw, 2rem);
  z-index: 10;
}

/* Terminal Window */
.terminal-window {
  width: 100%;
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
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  opacity: 0.8;
}

.terminal-body {
  padding: clamp(1rem, 2vw, 1.5rem);
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
  padding: clamp(1rem, 2vw, 1.5rem);
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
  width: clamp(60px, 15vw, 80px);
  height: clamp(60px, 15vw, 80px);
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
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
  background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.identity-role {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
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
  min-width: 100px;
}

.detail-value {
  color: var(--terminal-string);
}

.card-description {
  color: var(--terminal-comment);
  font-style: italic;
  line-height: 1.6;
}

/* Contributions Container */
.contributions-container {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 1.5rem;
  position: relative;
  overflow-x: auto;
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
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
}

.contributions-title strong {
  color: var(--accent-color);
}

.contributions-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.6rem, 1vw, 0.8rem);
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

/* GitHub-style Contribution Graph */
.contributions-graph {
  margin-bottom: 1rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--terminal-header) transparent;
}

.contributions-graph::-webkit-scrollbar {
  height: 8px;
}

.contributions-graph::-webkit-scrollbar-track {
  background: transparent;
}

.contributions-graph::-webkit-scrollbar-thumb {
  background-color: var(--terminal-header);
  border-radius: 4px;
}

.graph-months {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 4px;
  margin-left: 40px;
  margin-bottom: 8px;
  min-width: 600px;
}

.graph-month {
  font-size: 0.7rem;
  color: var(--terminal-comment);
  text-align: center;
}

.graph-days {
  display: flex;
  gap: 4px;
  min-width: 600px;
}

.day-labels {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 40px;
}

.day-label {
  height: 12px;
  font-size: 0.7rem;
  color: var(--terminal-comment);
  text-align: right;
  padding-right: 8px;
}

.contributions-grid {
  display: flex;
  gap: 4px;
}

.contribution-week {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contribution-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
  cursor: pointer;
}

.contribution-day:hover {
  transform: scale(1.2);
  opacity: 0.9;
}

/* GitHub Exact Contribution Colors */
.contribution-day.level-0 {
  background-color: #ebedf0;
}

.contribution-day.level-1 {
  background-color: #9be9a8;
}

.contribution-day.level-2 {
  background-color: #40c463;
}

.contribution-day.level-3 {
  background-color: #30a14e;
}

.contribution-day.level-4 {
  background-color: #216e39;
}

/* Contribution Tooltip */
.contribution-tooltip {
  position: fixed;
  background-color: var(--terminal-header);
  border: 1px solid var(--terminal-line-number);
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 0.85rem;
  color: var(--terminal-text);
  z-index: 1000;
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -10px;
  white-space: nowrap;
}

.tooltip-count {
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: var(--terminal-text);
}

.tooltip-date {
  color: var(--terminal-comment);
  font-size: 0.8rem;
}

/* Contributions Stats */
.contributions-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

/* Social Terminal */
.social-terminal {
  width: 100%;
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
  padding: clamp(1rem, 2vw, 1.5rem);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 3vw, 1.5rem);
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 8px;
  min-width: 120px;
}

.social-link:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.05);
}

.social-icon {
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-icon svg {
  width: 24px;
  height: 24px;
}

.social-icon.github {
  background-color: #333;
  color: white;
}

.social-icon.linkedin {
  background-color: #0077b5;
  color: white;
}

.social-icon.email {
  background-color: #ea4335;
  color: white;
}

.social-label {
  color: var(--terminal-text);
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  font-weight: 500;
}

.social-stats {
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  color: var(--terminal-comment);
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
@media (max-width: 768px) {
  .hero-section {
    padding: 1rem;
  }
  
  .identity-name {
    font-size: 1.5rem;
  }
  
  .identity-role {
    font-size: 1rem;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
  }
  
  /* Contribution graph responsiveness */
  .contribution-day {
    width: 8px;
    height: 8px;
  }
  
  .graph-months {
    gap: 2px;
    margin-left: 30px;
    min-width: 450px;
  }
  
  .graph-days {
    gap: 2px;
    min-width: 450px;
  }
  
  .contributions-grid {
    gap: 2px;
  }
  
  .contribution-week {
    gap: 2px;
  }
  
  .day-labels {
    width: 30px;
  }
  
  .day-label {
    height: 8px;
    font-size: 0.6rem;
  }
  
  .graph-month {
    font-size: 0.6rem;
  }
  
  .contributions-container {
    padding: 1rem;
  }
  
  .contributions-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .contributions-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .social-link {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 0.75rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .identity-card {
    padding: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .detail-key {
    min-width: auto;
  }
  
  /* Further reduction for very small screens */
  .contribution-day {
    width: 6px;
    height: 6px;
  }
  
  .graph-months {
    gap: 1px;
    margin-left: 25px;
    min-width: 350px;
  }
  
  .graph-days {
    gap: 1px;
    min-width: 350px;
  }
  
  .contributions-grid {
    gap: 1px;
  }
  
  .contribution-week {
    gap: 1px;
  }
  
  .day-labels {
    width: 25px;
  }
  
  .day-label {
    height: 6px;
    font-size: 0.5rem;
  }
  
  .graph-month {
    font-size: 0.5rem;
  }
  
  .contributions-container {
    padding: 0.75rem;
  }
  
  .social-terminal-body {
    padding: 1rem;
  }
}

/* Extra small screens */
@media (max-width: 360px) {
  .hero-section {
    padding: 0.5rem;
  }
  
  .terminal-body {
    padding: 0.75rem;
  }
  
  .identity-card {
    padding: 0.75rem;
  }
  
  .contribution-day {
    width: 5px;
    height: 5px;
  }
  
  .graph-months {
    gap: 1px;
    margin-left: 20px;
    min-width: 300px;
  }
  
  .graph-days {
    gap: 1px;
    min-width: 300px;
  }
  
  .contributions-grid {
    gap: 1px;
  }
  
  .contribution-week {
    gap: 1px;
  }
  
  .day-labels {
    width: 20px;
  }
  
  .day-label {
    height: 5px;
    font-size: 0.4rem;
  }
  
  .graph-month {
    font-size: 0.4rem;
  }
  
  .contributions-container {
    padding: 0.5rem;
  }
  
  .social-terminal-body {
    padding: 0.75rem;
  }
}
</style>