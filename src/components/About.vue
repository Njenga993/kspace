<template>
  <section id="about" class="about-section">
    <!-- Terminal Window -->
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">about@k-space:~</div>
      </div>
      
      <div class="terminal-body">
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat personal_info.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="info-card">
            <div class="info-header">
              <div class="profile-container">
                <img src="/profile.JPG" alt="Kelvin Kamau" class="profile-img" />
                <div class="status-indicator online"></div>
              </div>
              <div class="identity-info">
                <h1 class="identity-name">Kelvin Njenga Kamau</h1>
                <div class="identity-role">
                  <span class="role-text">Full Stack Developer</span>
                </div>
              </div>
            </div>
            
            <div class="info-content">
              <p class="intro-text">
                I'm <span class="highlight">Kelvin Njenga Kamau</span>, a passionate Full Stack Developer with a strong foundation in software development, UI/UX, and digital strategy.
                I specialize in crafting scalable, responsive web apps that solve real-world problems — combining clean frontend design with powerful backend logic.
              </p>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">ls -la</span>
        </div>
        
        <div class="terminal-output">
          <div class="file-list">
            <div class="file-item">
              <div class="file-icon">📁</div>
              <div class="file-details">
                <div class="file-name">education</div>
                <div class="file-meta">2023</div>
              </div>
            </div>
            
            <div class="file-item">
              <div class="file-icon">📁</div>
              <div class="file-details">
                <div class="file-name">experience</div>
                <div class="file-meta">2023-Present</div>
              </div>
            </div>
            
            <div class="file-item">
              <div class="file-icon">📁</div>
              <div class="file-details">
                <div class="file-name">skills</div>
                <div class="file-meta">2023</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat education.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="education-card">
            <div class="education-header">
              <div class="degree-icon">🎓</div>
              <h3 class="degree-title">Bachelor's Degree in Information Science</h3>
              <div class="degree-details">
                <div class="university">Meru University of Science and Technology</div>
                <div class="period">2019-2023</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat experience.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="experience-timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-date">2023-Present</div>
                <div class="timeline-position">
                  <div class="position-title">Nyakazi Organics</div>
                  <div class="position-role">Developer & Digital Manager</div>
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-date">2022</div>
                <div class="timeline-position">
                  <div class="position-title">Directorate of Immigration</div>
                  <div class="position-role">ICT Intern</div>
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-date">2021</div>
                <div class="timeline-position">
                  <div class="position-title">KNLS Nakuru Branch</div>
                  <div class="position-role">IT Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat skills.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="skills-grid">
            <div class="skill-category">
              <div class="category-title">Frontend</div>
              <div class="skill-list">
                <div class="skill-item">Vue.js</div>
                <div class="skill-item">React</div>
                <div class="skill-item">TypeScript</div>
                <div class="skill-item">HTML/CSS</div>
              </div>
            </div>
            
            <div class="skill-category">
              <div class="category-title">Backend</div>
              <div class="skill-list">
                <div class="skill-item">Node.js</div>
                <div class="skill-item">Express.js</div>
                <div class="skill-item">MongoDB</div>
              </div>
            </div>
            
            <div class="skill-category">
              <div class="category-title">Design</div>
              <div class="skill-list">
                <div class="skill-item">Figma</div>
                <div class="skill-item">Photoshop</div>
                <div class="skill-item">UI/UX</div>
              </div>
            </div>
            
            <div class="skill-category">
              <div class="category-title">Tools</div>
              <div class="skill-list">
                <div class="skill-item">Git</div>
                <div class="skill-item">Docker</div>
                <div class="skill-item">CI/CD</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">./stats.sh</span>
        </div>
        
        <div class="terminal-output">
          <div class="stats-container">
            <div class="stat-item">
              <span class="stat-label">experience:</span>
              <span class="stat-value">3+ years</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">projects:</span>
              <span class="stat-value">20+</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">clients:</span>
              <span class="stat-value">15+</span>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">./contact.sh</span>
        </div>
        
        <div class="terminal-actions">
          <a href="/Kamau_Kelvin_Resume.pdf" class="terminal-button-primary" download>
            <span>Download Resume</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="#contact" class="terminal-button-secondary">
            <span>Contact Me</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M22 16L2 9m0 0l10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 16L2 9m0 0l10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional script needed for this component
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
  --terminal-parameter: #9cdcfe;
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

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>

<style scoped>
/* Base Styles */
.about-section {
  padding: 6rem 2rem;
  background-color: var(--bg-color);
  min-height: 100vh;
  position: relative;
  font-family: 'Fira Code', 'Courier New', monospace;
  overflow: hidden;
  width: 100vw;
  margin-left: -2rem;
  margin-bottom: -2rem;
}

/* Terminal Container */
.terminal-container {
  max-width: 1200px;
  margin: 0 auto;
  width: calc(90% - 0.7rem);
  overflow: hidden;
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

/* Info Card */
.info-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.profile-container {
  position: relative;
}

.profile-img {
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
}

.identity-role {
  font-size: 1.2rem;
  color: var(--accent-color);
}

.info-content {
  line-height: 1.6;
}

.intro-text {
  font-size: 1.1rem;
  color: var(--terminal-text);
}

.highlight {
  color: var(--accent-color);
  font-weight: 600;
}

/* File List */
.file-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
  transition: transform 0.3s ease;
}

.file-item:hover {
  transform: translateY(-3px);
}

.file-icon {
  font-size: 1.5rem;
}

.file-details {
  flex: 1;
}

.file-name {
  font-weight: 600;
  color: var(--terminal-text);
  font-size: 1.1rem;
}

.file-meta {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

/* Education Card */
.education-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.education-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.degree-icon {
  font-size: 2rem;
}

.degree-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--terminal-text);
  margin: 0;
}

.degree-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.university {
  font-size: 1.1rem;
  color: var(--terminal-text);
}

.period {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

/* Experience Timeline */
.experience-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--accent-color);
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
}

.timeline-date {
  color: var(--terminal-comment);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.timeline-position {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.position-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--terminal-text);
}

.position-role {
  color: var(--terminal-string);
  font-size: 0.9rem;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skill-category {
  margin-bottom: 1.5rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--terminal-text);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title::before {
  content: '';
  width: 20px;
  height: 2px;
  background-color: var(--accent-color);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: var(--terminal-text);
  font-size: 0.9rem;
  border-left: 3px solid var(--accent-color);
  transition: transform 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-3px);
}

/* Stats Container */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  color: var(--terminal-property);
  font-size: 0.9rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--terminal-text);
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
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  width: auto;
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

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .terminal-container {
    max-width: 1400px;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 2rem;
  }
  
  .identity-name {
    font-size: 2.2rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .terminal-container {
    max-width: 1200px;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 1.75rem;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .about-section {
    padding: 5rem 1.5rem;
  }
  
  .terminal-container {
    max-width: 1000px;
    margin-left: -0.1rem;
    width: calc(90% - 0.7rem);
  }
  
  .info-card, .education-card, .stats-container {
    padding: 1.5rem;
  }
  
  .identity-name {
    font-size: 1.8rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .file-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .about-section {
    padding: 4rem 1.5rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 1rem;
    margin-left: -0.1rem;
     width: calc(90% - 0.7rem);
  }
  
  .info-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .profile-container {
    margin: 0 auto 1rem 0;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 1.25rem;
  }
  
  .identity-name {
    font-size: 1.7rem;
  }
  
  .file-list {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .stats-container {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .about-section {
    padding: 3rem 1rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 0.75rem;
    margin-left: 2rem;
     width: calc(90% - 0.7rem);
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .info-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .profile-img {
    width: 60px;
    height: 60px;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 1rem;
  }
  
  .identity-name {
    font-size: 1.5rem;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .timeline-dot {
    width: 12px;
    height: 12px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .terminal-button-primary, .terminal-button-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .about-section {
    padding: 2.5rem 1rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 0.5rem;
    margin-left: 2rem;
     width: calc(90% - 0.7rem);
  }
  
  .terminal-body {
    padding: 0.75rem;
  }
  
  .info-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .profile-img {
    width: 50px;
    height: 50px;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 0.75rem;
  }
  
  .identity-name {
    font-size: 1.4rem;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .timeline-dot {
    width: 10px;
    height: 10px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .terminal-button-primary, .terminal-button-secondary {
    width: 100%;
    justify-content: center;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .about-section {
    padding: 2rem 0.75rem;
  }
  
  .terminal-container {
    max-width: 100%;
    margin: 0 0.5rem;
    margin-left: 1rem;
     width: calc(90% - 0.7rem);
  }
  
  .terminal-body {
    padding: 0.5rem;
  }
  
  .terminal-header {
    padding: 0.5rem 0.75rem;
  }
  
  .terminal-title {
    font-size: 0.8rem;
  }
  
  .info-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .profile-img {
    width: 40px;
    height: 40px;
  }
  
  .info-card, .education-card, .stats-container {
    padding: 0.5rem;
  }
  
  .identity-name {
    font-size: 1.2rem;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .timeline-dot {
    width: 8px;
    height: 8px;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
  
  .skill-item {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .terminal-button-primary, .terminal-button-secondary {
    width: 100%;
    justify-content: center;
    padding: 0.6rem 1rem;
  }
}
</style>