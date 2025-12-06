<template>
  <footer class="terminal-footer">
    <!-- Terminal Window Container -->
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">footer@portfolio:~</div>
      </div>
      
      <!-- Terminal Body -->
      <div class="terminal-body">
        <!-- About Command -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat about.txt</span>
        </div>
        
        <div class="terminal-output">
          <div class="about-section">
            <div class="profile-container">
              <img src="/profile.JPG" alt="Kelvin Kamau" class="profile-img" />
              <div class="status-indicator online"></div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">Kelvin Kamau</h3>
              <p class="profile-title">Full Stack Developer & UI Engineer</p>
              <p class="profile-description">Creating digital experiences that matter.</p>
            </div>
          </div>
        </div>
        
        <!-- Navigation Command -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">ls -la</span>
        </div>
        
        <div class="terminal-output">
          <div class="nav-list">
            <div class="nav-item" v-for="link in navLinks" :key="link.id">
              <span class="file-icon">📁</span>
              <a :href="`#${link.id}`" class="file-link">
                {{ link.text }}
              </a>
            </div>
          </div>
        </div>
        
        <!-- Contact Command -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat contact.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="contact-section">
            <div class="contact-item">
              <span class="contact-key">"email":</span>
              <a href="mailto:njengak993@gmail.com" class="contact-value">
                "njengak993@gmail.com"
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-key">"location":</span>
              <span class="contact-value">"Nairobi, Kenya"</span>
            </div>
          </div>
        </div>
        
        <!-- Social Command -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">git remote -v</span>
        </div>
        
        <div class="terminal-output">
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.id"
              :href="social.url" 
              target="_blank" 
              :aria-label="social.name"
              class="social-link"
            >
              <div class="social-icon">
                <i :class="social.icon"></i>
              </div>
              <span class="social-name">{{ social.name }}</span>
            </a>
          </div>
        </div>
        
        <!-- Terminal Cursor -->
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command cursor">_</span>
        </div>
      </div>
      
      <!-- Terminal Bottom Bar -->
      <div class="terminal-bottom">
        <div class="status-info">
          <span class="status-item">
            <span class="status-indicator online"></span>
            <span>Connected</span>
          </span>
          <span class="status-item">
            <span>© {{ new Date().getFullYear() }} Kelvin Njenga Kamau</span>
          </span>
        </div>
        <div class="terminal-actions">
          <a href="#" class="terminal-link">Privacy</a>
          <span class="separator">•</span>
          <a href="#" class="terminal-link">Terms</a>
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
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { id: 'about', text: 'About' },
  { id: 'skills', text: 'Skills' },
  { id: 'experience', text: 'Experience' },
  { id: 'projects', text: 'Projects' },
  { id: 'contact', text: 'Contact' }
];

const socialLinks = [
  { id: 'github', name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Njenga993' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/kelvin-kamau-788160277/' },
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', url: 'https://x.com/kamau_nje' },
  { id: 'email', name: 'Email', icon: 'fas fa-envelope', url: 'mailto:njengak993@gmail.com' }
];

const showBackToTop = ref(false);

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollTo = (section) => {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped>
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

/* Base Footer Styles */
.terminal-footer {
  position: relative;
  min-height: 100vh;
  width: calc(100% - 0.7rem);
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Fira Code', 'Courier New', monospace;
  margin-bottom: -2rem;
  margin-left: -2rem;
  margin-top: 2rem;
  padding: 2rem;
  background-color: var(--bg-color);
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
  padding: 1.5rem;
  color: var(--terminal-text);
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
  padding-left: 1.5rem;
}

/* About Section */
.about-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
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

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--accent-color);
}

.profile-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-function);
}

.profile-description {
  font-size: 1rem;
  margin: 0;
  color: var(--terminal-comment);
  font-style: italic;
}

/* Navigation */
.nav-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.file-icon {
  font-size: 1.2rem;
  color: var(--accent-color);
}

.file-link {
  color: var(--terminal-string);
  text-decoration: none;
  transition: color 0.3s ease;
}

.file-link:hover {
  color: var(--accent-color);
}

/* Contact Section */
.contact-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 4px solid var(--accent-color);
}

.contact-key {
  color: var(--terminal-property);
}

.contact-value {
  color: var(--terminal-string);
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: var(--accent-color);
}

/* Social Links */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  background-color: var(--accent-color);
  color: white;
}

.social-name {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

/* Terminal Bottom Bar */
.terminal-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.75rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.status-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.terminal-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.terminal-link {
  color: var(--terminal-string);
  text-decoration: none;
  transition: color 0.3s ease;
}

.terminal-link:hover {
  color: var(--accent-color);
}

.separator {
  color: var(--terminal-text);
  opacity: 0.5;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--accent-hover);
  transform: translateY(-3px);
  box-shadow:  0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Animations */
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
/* Large Desktop (1200px and up) */
@media (min-width: 1200px) {
  .terminal-container {
    max-width: 1200px;
  }
  
  .profile-img {
    width: 90px;
    height: 90px;
  }
  
  .profile-name {
    font-size: 1.7rem;
  }
  
  .profile-title {
    font-size: 1.2rem;
  }
  
  .profile-description {
    font-size: 1.1rem;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .terminal-container {
    max-width: 1100px;
  }
  
  .profile-img {
    width: 85px;
    height: 85px;
  }
  
  .profile-name {
    font-size: 1.6rem;
  }
  
  .profile-title {
    font-size: 1.15rem;
  }
  
  .profile-description {
    font-size: 1.05rem;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .terminal-footer {
    padding: 1.5rem 0;
    width: calc(100% - 1rem);
     margin-right: -2rem;
  }
  
  .terminal-body {
    padding: 1.2rem;
  }
  
  .about-section {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-container {
    margin-bottom: 1.5rem;
  }
  
  .profile-img {
    width: 75px;
    height: 75px;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .profile-description {
    font-size: 1rem;
  }
  
  .nav-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.8rem;
  }
  
  .nav-item {
    padding: 0.6rem;
  }
  
  .contact-section {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .social-links {
    gap: 1rem;
  }
}

/* Mobile (480px to 767px) */
@media (min-width: 480px) and (max-width: 767px) {
  .terminal-footer {
    padding: 1rem 0;
    width: calc(100% - 1rem);
     margin-right: -2rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .about-section {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-container {
    margin-bottom: 1rem;
  }
  
  .profile-img {
    width: 65px;
    height: 65px;
  }
  
  .profile-name {
    font-size: 1.3rem;
  }
  
  .profile-title {
    font-size: 1rem;
  }
  
  .profile-description {
    font-size: 0.9rem;
  }
  
  .nav-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.6rem;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
  
  .contact-section {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    gap: 0.8rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .terminal-footer {
    padding: 0.8rem 0;
    width: calc(100% - 1rem);
     margin-right: -2rem;
  }
  
  .terminal-body {
    padding: 0.8rem;
  }
  
  .terminal-prompt {
    margin-bottom: 0.8rem;
  }
  
  .terminal-output {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  
  .about-section {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-container {
    margin-bottom: 0.8rem;
  }
  
  .profile-img {
    width: 55px;
    height: 55px;
  }
  
  .profile-name {
    font-size: 1.2rem;
  }
  
  .profile-title {
    font-size: 0.9rem;
  }
  
  .profile-description {
    font-size: 0.85rem;
  }
  
  .nav-list {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .nav-item {
    padding: 0.4rem;
  }
  
  .contact-section {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    gap: 0.6rem;
  }
  
  .social-link {
    gap: 0.4rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
  
  .social-name {
    font-size: 0.8rem;
  }
  
  .back-to-top {
    width: 45px;
    height: 45px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>