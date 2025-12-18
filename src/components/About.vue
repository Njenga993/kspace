<template>
  <section id="about" class="about-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">about@portfolio:~# ./system_profile.sh</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Info -->
        <div class="system-info">
          <div class="info-line">
            <span class="info-text">System:</span>
            <span class="info-value">Kelvin Kamau Profile v2.0.24</span>
          </div>
          <div class="info-line">
            <span class="info-text">Status:</span>
            <span class="info-value">Active</span>
          </div>
          <div class="info-line">
            <span class="info-text">Last Updated:</span>
            <span class="info-value">{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
        
        <!-- Terminal Tabs -->
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'profile' }" 
            @click="activeTab = 'profile'"
          >
            <span class="tab-icon">👤</span>
            <span class="tab-text">profile</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'education' }" 
            @click="activeTab = 'education'"
          >
            <span class="tab-icon">🎓</span>
            <span class="tab-text">education</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'experience' }" 
            @click="activeTab = 'experience'"
          >
            <span class="tab-icon">💼</span>
            <span class="tab-text">experience</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'skills' }" 
            @click="activeTab = 'skills'"
          >
            <span class="tab-icon">💻</span>
            <span class="tab-text">skills</span>
          </div>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="profile-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat personal_info.json</span>
            </div>
            
            <div class="profile-container">
              <div class="profile-card">
                <div class="profile-header">
                  <div class="profile-avatar">
                    <img src="/profile.JPG" alt="Kelvin Kamau" class="avatar-img" />
                    <div class="status-indicator online"></div>
                  </div>
                  <div class="profile-info">
                    <h2 class="profile-name">Kelvin Njenga Kamau</h2>
                    <div class="profile-title">Full Stack Developer & UI/UX Engineer</div>
                    <div class="profile-bio">
                      <p>I'm a passionate Full Stack Developer with a strong foundation in software development, UI/UX, and digital strategy. I specialize in crafting scalable, responsive web apps that solve real-world problems — combining clean frontend design with powerful backend logic.</p>
                    </div>
                  </div>
                </div>
                
                <div class="profile-stats">
                  <div class="stat-item">
                    <div class="stat-value">3+</div>
                    <div class="stat-label">Years Experience</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">20+</div>
                    <div class="stat-label">Projects Completed</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">15+</div>
                    <div class="stat-label">Happy Clients</div>
                  </div>
                </div>
                
                <div class="profile-interests">
                  <h3>Interests & Hobbies</h3>
                  <div class="interests-grid">
                    <div class="interest-item">
                      <div class="interest-icon">🎮</div>
                      <span class="interest-name">Gaming</span>
                    </div>
                    <div class="interest-item">
                      <div class="interest-icon">📚</div>
                      <span class="interest-name">Reading</span>
                    </div>
                    <div class="interest-item">
                      <div class="interest-icon">🎵</div>
                      <span class="interest-name">Music</span>
                    </div>
                    <div class="interest-item">
                      <div class="interest-icon">🏃</div>
                      <span class="interest-name">Football</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Education Tab -->
          <div v-if="activeTab === 'education'" class="education-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat education.json</span>
            </div>
            
            <div class="education-container">
              <div class="education-card">
                <div class="education-header">
                  <div class="education-icon">🎓</div>
                  <div class="education-info">
                    <h3 class="degree-title">Bachelor's Degree in Information Science</h3>
                    <div class="university-info">
                      <div class="university-name">Meru University of Science and Technology</div>
                      <div class="education-period">2019 - 2023</div>
                    </div>
                  </div>
                </div>
                
                <div class="education-details">
                  <div class="detail-section">
                    <h4>Key Achievements</h4>
                    <ul>
                      <li>Graduated with Second Class Honors (Upper Division)</li>
                      <li>Specialized in Software Development and Database Systems</li>
                      <li>Completed final year project on E-commerce Platform Development</li>
                    </ul>
                  </div>
                  
                  <div class="detail-section">
                    <h4>Relevant Coursework</h4>
                    <div class="coursework-grid">
                      <div class="coursework-item">Web Development</div>
                      <div class="coursework-item">Database Systems</div>
                      <div class="coursework-item">Software Engineering</div>
                      <div class="coursework-item">UI/UX Design</div>
                      <div class="coursework-item">Data Structures</div>
                      <div class="coursework-item">Algorithms</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Experience Tab -->
          <div v-if="activeTab === 'experience'" class="experience-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat experience.json</span>
            </div>
            
            <div class="experience-container">
              <div class="experience-timeline">
                <div class="timeline-item">
                  <div class="timeline-date">
                    <div class="date-year">2023</div>
                    <div class="date-line"></div>
                  </div>
                  <div class="timeline-content">
                    <div class="experience-card">
                      <div class="experience-header">
                        <h3 class="position-title">Developer & Digital Manager</h3>
                        <div class="company-info">
                          <div class="company-name">Nyakazi Organics</div>
                          <div class="employment-period">2023 - Present</div>
                        </div>
                      </div>
                      <div class="experience-description">
                        <p>Led digital transformation initiatives for an organic food company, overseeing all digital solutions from branding to systems development.</p>
                      </div>
                      <div class="experience-achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                          <li>Developed a fully functional POS system using React and Django</li>
                          <li>Designed and implemented comprehensive company branding</li>
                          <li>Optimized website performance, achieving 95+ Lighthouse scores</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-date">
                    <div class="date-year">2022</div>
                    <div class="date-line"></div>
                  </div>
                  <div class="timeline-content">
                    <div class="experience-card">
                      <div class="experience-header">
                        <h3 class="position-title">ICT Intern</h3>
                        <div class="company-info">
                          <div class="company-name">Directorate of Immigration</div>
                          <div class="employment-period">2022</div>
                        </div>
                      </div>
                      <div class="experience-description">
                        <p>Gained foundational IT experience working with diverse technology stacks and systems.</p>
                      </div>
                      <div class="experience-achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                          <li>Automated catalog update processes, saving 15+ hours weekly</li>
                          <li>Documented comprehensive network infrastructure</li>
                          <li>Assisted in migrating legacy systems to modern platforms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="timeline-item">
                  <div class="timeline-date">
                    <div class="date-year">2021</div>
                    <div class="date-line"></div>
                  </div>
                  <div class="timeline-content">
                    <div class="experience-card">
                      <div class="experience-header">
                        <h3 class="position-title">IT Support</h3>
                        <div class="company-info">
                          <div class="company-name">KNLS Nakuru Branch</div>
                          <div class="employment-period">2021</div>
                        </div>
                      </div>
                      <div class="experience-description">
                        <p>Provided IT support and assistance to library staff and patrons.</p>
                      </div>
                      <div class="experience-achievements">
                        <h4>Key Achievements</h4>
                        <ul>
                          <li>Provided technical support to 50+ staff members</li>
                          <li>Created detailed training materials for new software</li>
                          <li>Maintained library's digital catalog system</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Skills Tab -->
          <div v-if="activeTab === 'skills'" class="skills-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat skills.json</span>
            </div>
            
            <div class="skills-container">
              <div class="skills-grid">
                <div class="skill-category">
                  <div class="category-header">
                    <div class="category-icon">🎨</div>
                    <h3 class="category-title">Frontend</h3>
                  </div>
                  <div class="skill-list">
                    <div class="skill-item">Vue.js</div>
                    <div class="skill-item">React</div>
                    <div class="skill-item">TypeScript</div>
                    <div class="skill-item">JavaScript</div>
                    <div class="skill-item">HTML5</div>
                    <div class="skill-item">CSS3</div>
                    <div class="skill-item">Tailwind CSS</div>
                  </div>
                </div>
                
                <div class="skill-category">
                  <div class="category-header">
                    <div class="category-icon">⚙️</div>
                    <h3 class="category-title">Backend</h3>
                  </div>
                  <div class="skill-list">
                    <div class="skill-item">Node.js</div>
                    <div class="skill-item">PHP</div>
                    <div class="skill-item">Python</div>
                    <div class="skill-item">Django</div>
                    <div class="skill-item">Express.js</div>
                    <div class="skill-item">MongoDB</div>
                    <div class="skill-item">MySQL</div>
                  </div>
                </div>
                
                <div class="skill-category">
                  <div class="category-header">
                    <div class="category-icon">🎯</div>
                    <h3 class="category-title">Design</h3>
                  </div>
                  <div class="skill-list">
                    <div class="skill-item">Figma</div>
                    <div class="skill-item">Photoshop</div>
                    <div class="skill-item">Illustrator</div>
                    <div class="skill-item">UI/UX</div>
                  </div>
                </div>
                
                <div class="skill-category">
                  <div class="category-header">
                    <div class="category-icon">🔧</div>
                    <h3 class="category-title">Tools</h3>
                  </div>
                  <div class="skill-list">
                    <div class="skill-item">Git</div>
                    <div class="skill-item">Docker</div>
                    <div class="skill-item">CI/CD</div>
                    <div class="skill-item">Webpack</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Terminal Actions -->
        <div class="terminal-actions">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">./actions.sh</span>
          </div>
          
          <div class="action-buttons">
            <a href="/Kamau_Kelvin_Resume.pdf" class="action-button primary" download>
              <i class="fas fa-download"></i>
              <span>Download Resume</span>
            </a>
            <a href="#contact" class="action-button secondary">
              <i class="fas fa-envelope"></i>
              <span>Contact Me</span>
            </a>
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
import { ref } from 'vue';

const activeTab = ref('profile');
</script>

<style scoped>
/* Base Section Styles */
.about-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  background-color: var(--bg-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--text-color);
}

/* Terminal Container */
.terminal-container {
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
  padding: 0.75rem clamp(1rem, 2vw, 1.5rem);
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

/* Terminal Body */
.terminal-body {
  padding: 0;
}

/* System Info */
.system-info {
  display: flex;
  justify-content: space-between;
  padding: clamp(0.75rem, 1.5vw, 1rem);
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
  flex-wrap: wrap;
  gap: 1rem;
}

.info-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-text {
  color: var(--terminal-comment);
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

.info-value {
  color: var(--terminal-string);
  font-weight: bold;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

/* Terminal Tabs */
.terminal-tabs {
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--terminal-header) transparent;
}

.terminal-tabs::-webkit-scrollbar {
  height: 6px;
}

.terminal-tabs::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-tabs::-webkit-scrollbar-thumb {
  background-color: var(--terminal-header);
  border-radius: 3px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem clamp(0.75rem, 1.5vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.tab:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.tab.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: var(--accent-color);
}

.tab-icon {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.tab-text {
  color: var(--terminal-comment);
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

.tab.active .tab-text {
  color: var(--terminal-text);
}

/* Tab Content */
.tab-content {
  padding: clamp(1rem, 2vw, 1.5rem);
  min-height: 400px;
}

/* Terminal Prompt */
.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

/* Profile Tab */
.profile-container {
  margin-top: 1rem;
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 2rem);
  border-left: 4px solid var(--accent-color);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.profile-avatar {
  position: relative;
  flex-shrink: 0;
}

.avatar-img {
  width: clamp(80px, 15vw, 120px);
  height: clamp(80px, 15vw, 120px);
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-color);
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3fb950;
  border: 3px solid var(--terminal-bg);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.profile-title {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.profile-bio {
  line-height: 1.6;
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin: clamp(1.5rem, 3vw, 2rem) 0;
  padding: clamp(1rem, 2vw, 1.5rem);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
}

.profile-interests {
  margin-top: clamp(1.5rem, 3vw, 2rem);
}

.profile-interests h3 {
  font-size: clamp(1.1rem, 2vw, 1.2rem);
  color: var(--terminal-text);
  margin-bottom: 1rem;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.interest-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: transform 0.3s ease;
}

.interest-item:hover {
  transform: translateY(-3px);
}

.interest-icon {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
}

.interest-name {
  color: var(--terminal-text);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

/* Education Tab */
.education-container {
  margin-top: 1rem;
}

.education-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 2rem);
  border-left: 4px solid var(--accent-color);
}

.education-header {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.education-icon {
  font-size: clamp(2rem, 4vw, 3rem);
}

.education-info {
  flex: 1;
}

.degree-title {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.university-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.university-name {
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  color: var(--terminal-text);
}

.education-period {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
}

.education-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 2rem);
}

.detail-section h4 {
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  color: var(--accent-color);
  margin: 0 0 1rem 0;
}

.detail-section ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.detail-section li {
  margin-bottom: 0.5rem;
}

.coursework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}

.coursework-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 0.5rem;
  color: var(--terminal-text);
  text-align: center;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

/* Experience Tab */
.experience-container {
  margin-top: 1rem;
}

.experience-timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.timeline-date {
  width: clamp(80px, 10vw, 100px);
  flex-shrink: 0;
  padding-right: clamp(1rem, 2vw, 1.5rem);
  text-align: right;
  position: relative;
}

.date-year {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: bold;
  color: var(--accent-color);
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
  padding-left: clamp(1.5rem, 3vw, 2rem);
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
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.experience-header {
  margin-bottom: 1rem;
}

.position-title {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.company-name {
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  color: var(--terminal-text);
}

.employment-period {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
}

.experience-description {
  margin-bottom: 1.5rem;
  color: var(--terminal-comment);
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.experience-achievements h4 {
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  color: var(--accent-color);
  margin: 0 0 1rem 0;
}

.experience-achievements ul {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.experience-achievements li {
  margin-bottom: 0.5rem;
}

/* Skills Tab */
.skills-container {
  margin-top: 1rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.skill-category {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
}

.category-title {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: bold;
  color: var(--terminal-text);
  margin: 0;
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.75rem;
}

.skill-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 0.5rem;
  color: var(--terminal-text);
  text-align: center;
  transition: transform 0.3s ease;
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

.skill-item:hover {
  transform: translateY(-3px);
}

/* Terminal Actions */
.terminal-actions {
  margin-top: clamp(1.5rem, 3vw, 2rem);
  padding-top: clamp(1rem, 2vw, 1.5rem);
  border-top: 1px solid var(--terminal-header);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.action-button.primary {
  background-color: var(--accent-color);
  color: white;
}

.action-button.primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.action-button.secondary {
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
}

.action-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Terminal Footer */
.terminal-footer {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem);
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
@media (max-width: 992px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .education-header {
    flex-direction: column;
    text-align: center;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-date {
    width: 100%;
    text-align: left;
    padding-right: 0;
    padding-bottom: 1rem;
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
  .tab-content {
    padding: 1rem;
  }
  
  .profile-card {
    padding: 1.5rem;
  }
  
  .profile-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .education-card {
    padding: 1.5rem;
  }
  
  .experience-card {
    padding: 1rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-button {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: clamp(1rem, 4vw, 2rem) clamp(0.5rem, 3vw, 1rem);
  }
  
  .tab-content {
    padding: 0.8rem;
  }
  
  .profile-card {
    padding: 1rem;
  }
  
  .education-card {
    padding: 1rem;
  }
  
  .experience-card {
    padding: 0.8rem;
  }
  
  .skill-category {
    padding: 1rem;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
  }
}
</style>