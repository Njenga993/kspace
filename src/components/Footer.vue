<template>
  <footer id="footer" class="footer-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">system@portfolio:~# ./footer.sh</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- System Status -->
        <div class="system-status">
          <div class="status-line">
            <span class="status-text">System Status:</span>
            <span class="status-value online">Online</span>
          </div>
          <div class="status-line">
            <span class="status-text">Uptime:</span>
            <span class="status-value">{{ uptime }}</span>
          </div>
          <div class="status-line">
            <span class="status-text">Version:</span>
            <span class="status-value">v2.0.24</span>
          </div>
        </div>
        
        <!-- Terminal Tabs -->
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'about' }" 
            @click="activeTab = 'about'"
          >
            <span class="tab-icon">ℹ️</span>
            <span class="tab-text">about</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'navigation' }" 
            @click="activeTab = 'navigation'"
          >
            <span class="tab-icon">🧭</span>
            <span class="tab-text">navigation</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'connect' }" 
            @click="activeTab = 'connect'"
          >
            <span class="tab-icon">🔗</span>
            <span class="tab-text">connect</span>
          </div>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- About Tab -->
          <div v-if="activeTab === 'about'" class="about-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat profile.json</span>
            </div>
            
            <div class="terminal-output">
              <div class="profile-card">
                <div class="profile-header">
                  <div class="avatar-container">
                    <img src="/profile.JPG" alt="Kelvin Kamau" class="avatar" />
                    <div class="status-indicator online"></div>
                  </div>
                  <div class="profile-info">
                    <h2 class="profile-name">Kelvin Kamau</h2>
                    <div class="profile-tags">
                      <span class="tag">Full Stack Developer</span>
                      <span class="tag">UI/UX Engineer</span>
                    </div>
                  </div>
                </div>
                
                <div class="profile-stats">
                  <div class="stat-item">
                    <span class="stat-number">5+</span>
                    <span class="stat-label">Years Experience</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">50+</span>
                    <span class="stat-label">Projects Completed</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation Tab -->
          <div v-if="activeTab === 'navigation'" class="navigation-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">ls -la /navigation/</span>
            </div>
            
            <div class="terminal-output">
              <div class="nav-grid">
                <a 
                  v-for="link in navLinks" 
                  :key="link.id"
                  :href="`#${link.id}`" 
                  class="nav-item"
                  @click="scrollToSection(link.id)"
                >
                  <div class="nav-icon">
                    <i :class="link.icon"></i>
                  </div>
                  <div class="nav-info">
                    <h3 class="nav-title">{{ link.text }}</h3>
                    <p class="nav-description">{{ link.description }}</p>
                  </div>
                  <div class="nav-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Connect Tab -->
          <div v-if="activeTab === 'connect'" class="connect-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">git remote -v</span>
            </div>
            
            <div class="terminal-output">
              <div class="connect-grid">
                <div class="connect-item">
                  <h3 class="connect-title">Contact Information</h3>
                  <div class="contact-list">
                    <div class="contact-item">
                      <span class="contact-icon">📧</span>
                      <span class="contact-value">njengak993@gmail.com</span>
                    </div>
                  </div>
                  <div class="contact-item">
                      <span class="contact-icon">📍</span>
                      <span class="contact-value">Nairobi, Kenya</span>
                    </div>
                  </div>
                  <div class="contact-item">
                      <span class="contact-icon">📱</span>
                      <span class="contact-value">+254 703 642 280</span>
                    </div>
                </div>
                
                <div class="social-links">
                  <a 
                    v-for="social in socialLinks" 
                    :key="social.id"
                    :href="social.url" 
                    target="_blank" 
                    class="social-link"
                  >
                    <div class="social-icon">
                      <i :class="social.icon"></i>
                    </div>
                    <div class="social-info">
                      <h4 class="social-name">{{ social.name }}</h4>
                      <p class="social-handle">{{ social.handle }}</p>
                    </div>
                  </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Terminal Footer -->
        <div class="terminal-footer">
          <div class="footer-info">
            <span class="copyright">© {{ new Date().getFullYear() }} Kelvin Kamau</span>
            <span class="separator">|</span>
            <span class="build-info">Build: v2.0.24</span>
          </div>
          
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <span class="separator">|</span>
            <a href="#" class="footer-link">Terms</a>
          </div>
          
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command cursor">_</span>
          </div>
        </div>
      </div>
      
      <!-- Back to Top Button -->
      <button 
        v-show="showBackToTop" 
        @click="scrollToTop" 
        class="back-to-top"
        aria-label="Back to top"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const activeTab = ref('about');
const uptime = ref('0d 0h 0m 0s');
const showBackToTop = ref(false);

const navLinks = [
  { id: 'about', text: 'About', icon: 'fas fa-user', description: 'Learn more about my background and skills.' },
  { id: 'skills', text: 'Skills', icon: 'fas fa-code', description: 'Explore my technical expertise and proficiencies.' },
  { id: 'experience', text: 'Experience', icon: 'fas fa-briefcase', description: 'View my professional journey and work history.' },
  { id: 'projects', text: 'Projects', icon: 'fas fa-folder-open', description: 'Check out my portfolio of work.' },
  { id: 'contact', text: 'Contact', icon: 'fas fa-envelope', description: 'Get in touch with me for opportunities.' }
];

const socialLinks = [
  { id: 'github', name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Njenga993' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/kelvin-kamau-788160277/' },
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', url: 'https://x.com/kamau_nje' },
  { id: 'email', name: 'Email', icon: 'fas fa-envelope', url: 'mailto:njengak993@gmail.com' }
];

let uptimeInterval;

const updateUptime = () => {
  const now = new Date();
  const startTime = new Date('2023-01-01T00:00:00:00');
  const elapsed = now - startTime;
  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24)); // milliseconds in a day
  
  const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  
  uptime.value = `${days}d ${hours}h ${minutes}m`;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

onMounted(() => {
  uptimeInterval = setInterval(updateUptime, 60000); // Update every minute
  updateUptime();
  
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  clearInterval(uptimeInterval);
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style>
/* Using the same theme variables as other components */
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
/* Base Footer Styles */
.footer-section {
  position: relative;
  width: 100%;
  background-color: var(--bg-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--text-color);
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
}

/* Terminal Container */
.terminal-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

/* Terminal Styles */
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

/* System Status */
.system-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--terminal-header);
}

.status-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.status-text {
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.status-value {
  color: var(--terminal-string);
  font-weight: bold;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.status-value.online {
  color: var(--terminal-prompt);
}

/* Terminal Tabs */
.terminal-tabs {
  display: flex;
  background-color: rgba(0, 0, 0, 0.05);
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
  background-color: rgba(0, 0, 0, 0.1);
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
  min-height: 300px;
}

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

.terminal-output {
  margin-bottom: 1.5rem;
}

/* Profile Card */
.profile-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: clamp(70px, 10vw, 80px);
  height: clamp(70px, 10vw, 80px);
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
  background-color: var(--terminal-prompt);
  border: 2px solid var(--terminal-bg);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: clamp(1.5rem, 2.5vw, 1.5rem);
  font-weight: bold;
  color: var(--terminal-string);
}

.stat-label {
  font-size: clamp(0.9rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
}

/* Navigation Tab */
.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: clamp(1rem, 1.5vw, 1rem);
  color: var(--accent-color);
}

.nav-info {
  flex: 1;
  text-align: left;
}

.nav-title {
  font-size: clamp(1rem, 1.5vw, 1rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.nav-description {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
  margin-top: 0.25rem;
}

.nav-arrow {
  color: var(--terminal-comment);
  transition: all 0.3s ease;
}

.nav-item:hover .nav-arrow {
  color: var(--accent-color);
  transform: translateX(3px);
}

/* Connect Tab */
.connect-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.connect-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.connect-title {
  font-size: clamp(1rem, 1.5vw, 1rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-icon {
  font-size: clamp(1rem, 1.5vw, 1rem);
  color: var(--accent-color);
}

.contact-value {
  font-size: clamp(0.9rem, 1.2vw, 0.9rem);
  color: var(--terminal-string);
}

/* Social Links */
.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.social-icon {
  width: clamp(40px, 8vw, 48px);
  height: clamp(40px, 8vw, 48px);
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
}

.social-name {
  font-size: clamp(0.9rem, 1.2vw, 0.9rem);
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.social-handle {
  font-size: clamp(0.8rem, 1.2vw, 0.8rem);
  color: var(--terminal-comment);
}

/* Terminal Footer */
.terminal-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem clamp(1rem, 2vw, 1.5rem);
  background-color: var(--terminal-header);
  border-top: 1px solid var(--terminal-header);
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.2vw, 0.9rem);
}

.copyright {
  color: var(--terminal-text);
}

.build-info {
  color: var(--terminal-string);
}

.separator {
  color: var(--terminal-comment);
  opacity: 0.7;
}

.footer-links {
  display: flex;
  gap: 0.5rem;
}

.footer-link {
  color: var(--terminal-string);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--accent-color);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
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
/* Large Desktop (1200px and up) */
@media (min-width: 1200px) {
  .footer-section {
    padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  }
  
  .terminal-container {
    max-width: 1100px;
  }
  
  .profile-name {
    font-size: clamp(1.3rem, 2.5vw, 1.5rem);
  }
  
  .profile-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .footer-section {
    padding: clamp(1.5rem, 3vw, 3rem);
  }
  
  .terminal-container {
    max-width: 1000px;
  }
  
  .profile-name {
    font-size: 1.2rem;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .footer-section {
    padding: clamp(1.5rem, 3vw, 2.5rem);
  }
  
  .terminal-container {
    max-width: 100%;
  }
  
  .profile-name {
    font-size: 1.1rem;
  }
  
  .profile-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .connect-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .footer-section {
    padding: clamp(1rem, 3vw, 2rem);
  }
  
  .terminal-container {
    max-width: 100%;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-name {
    font-size: 1rem;
  }
  
  .profile-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (max-width: 575px) {
  .footer-section {
    padding: clamp(1rem, 3vw, 1.5rem);
  }
  
  .terminal-container {
    max-width: 100%;
  }
  
  .profile-header {
    gap: 0.75rem;
  }
  
  .profile-name {
    font-size: 0.9rem;
  }
  
  .profile-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .footer-section {
    padding: clamp(1rem, 3vw, 1rem);
  }
  
  .terminal-container {
    max-width: 100%;
  }
  
  .profile-header {
    gap: 0.5rem;
  }
  
  .profile-name {
    font-size: 0.8rem;
  }
  
  .profile-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}
</style>