<template>
  <div class="navbar-container" :class="{ 'scrolled': isScrolled }">
    <div class="terminal-navbar">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">navigation@k-space:~</div>
      </div>
      
      <div class="terminal-body">
        <!-- Logo Section -->
        <div class="logo-section" @click="scrollToTop">
          <div class="logo-wrapper">
            <img src="/profile.JPG" alt="Profile" class="profile-img" />
            <div class="status-indicator online"></div>
          </div>
          <span class="logo-name">K-SPACE</span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">navigate</span>
            <span class="cursor">_</span>
          </div>
          <ul class="nav-list">
            <li v-for="link in navLinks" :key="link.id" class="nav-item">
              <a 
                :href="`#${link.id}`" 
                @click="navigateToSection(link.id)"
                :class="{ 'active': activeSection === link.id }"
                class="nav-link"
              >
                <span class="link-symbol">{{ link.symbol }}</span>
                <span class="link-text">{{ link.text }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- Right Section -->
        <div class="right-section">
          <!-- Terminal Command Button -->
          <button 
            class="terminal-command-btn" 
            @click="toggleMobileMenu"
            :class="{ 'active': isMobileMenuOpen }"
            aria-label="Toggle terminal menu"
          >
            <span class="command-symbol">&gt;</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Terminal Menu -->
    <div class="mobile-terminal-overlay" :class="{ 'active': isMobileMenuOpen }" @click="toggleMobileMenu">
      <div class="mobile-terminal" @click.stop>
        <div class="mobile-terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">mobile@k-space:~</div>
        </div>
        
        <div class="mobile-terminal-body">
          <div class="mobile-logo-section">
            <div class="logo-wrapper">
              <img src="/profile.JPG" alt="Profile" class="profile-img" />
              <div class="status-indicator online"></div>
            </div>
            <span class="logo-name">K-SPACE</span>
          </div>
          
          <div class="mobile-terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">ls -la</span>
          </div>
          
          <nav class="mobile-nav">
            <ul class="mobile-nav-list">
              <li v-for="link in navLinks" :key="link.id" class="mobile-nav-item">
                <a 
                  :href="`#${link.id}`" 
                  @click="navigateToSection(link.id)"
                  :class="{ 'active': activeSection === link.id }"
                  class="mobile-nav-link"
                >
                  <span class="file-icon">📁</span>
                  <span class="file-name">{{ link.text }}</span>
                </a>
              </li>
            </ul>
          </nav>
          
          <div class="mobile-terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">cat social_links.txt</span>
          </div>
          
          <div class="mobile-social-links">
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
          
          <div class="mobile-terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const navLinks = [
  { id: 'about', text: 'About', symbol: '👤' },
  { id: 'skills', text: 'Skills', symbol: '💻' },
  { id: 'experience', text: 'Experience', symbol: '💼' },
  { id: 'projects', text: 'Projects', symbol: '📁' },
  { id: 'contact', text: 'Contact', symbol: '📧' }
];

const socialLinks = [
  { id: 'github', name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Njenga993' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/kelvin-kamau-788160277/' },
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', url: 'https://x.com/kamau_nje/' },
  { id: 'email', name: 'Email', icon: 'fas fa-envelope', url: 'mailto:njengak993@gmail.com' }
];

// State variables
const isScrolled = ref(false);
const activeSection = ref('');
const isMobileMenuOpen = ref(false);

onMounted(() => {
  // Add scroll listener
  window.addEventListener('scroll', handleScroll);
  
  // Check current section on load
  handleScroll();
  
  // Prevent body scroll when mobile menu is open
  document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleEscapeKey);
  // Restore body scroll
  document.body.style.overflow = '';
});

// Handle scroll events
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  
  // Update active section based on scroll position
  const sections = navLinks.map(link => document.getElementById(link.id));
  let currentSection = '';
  
  sections.forEach(section => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentSection = section.id;
    }
  });
  
  if (currentSection && currentSection !== activeSection.value) {
    activeSection.value = currentSection;
  }
};

// Navigate to section
const navigateToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
    isMobileMenuOpen.value = false;
  }
};

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  activeSection.value = '';
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// Handle escape key to close mobile menu
const handleEscapeKey = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    toggleMobileMenu();
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
/* Base Styles */
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.terminal-navbar {
  background-color: var(--terminal-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.navbar-container.scrolled .terminal-navbar {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-section:hover {
  transform: scale(1.05);
}

.logo-wrapper {
  position: relative;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3fb950;
  border: 2px solid var(--terminal-bg);
}

.logo-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--terminal-text);
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.25rem;
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

.nav-list {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--terminal-text);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--accent-color);
  background-color: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: var(--accent-color);
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--accent-color);
}

.link-symbol {
  font-size: 1rem;
}

/* Right Section */
.right-section {
  display: flex;
  align-items: center;
}

.terminal-command-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: var(--terminal-header);
  border: 1px solid var(--terminal-prompt);
  border-radius: 4px;
  color: var(--terminal-prompt);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.terminal-command-btn:hover {
  background-color: var(--terminal-prompt);
  color: var(--terminal-bg);
}

.command-symbol {
  font-size: 1.2rem;
}

/* Mobile Terminal Menu */
.mobile-terminal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-terminal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-terminal {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100%;
  background-color: var(--terminal-bg);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
}

.mobile-terminal-overlay.active .mobile-terminal {
  transform: translateX(0);
}

.mobile-terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.75rem 1rem;
}

.mobile-terminal-body {
  padding: 1.5rem;
  color: var(--terminal-text);
}

.mobile-logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.mobile-terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.mobile-nav {
  margin-bottom: 1.5rem;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-item {
  margin-bottom: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  color: var(--terminal-text);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover {
  background-color: var(--terminal-header);
}

.mobile-nav-link.active {
  background-color: var(--terminal-header);
  color: var(--accent-color);
}

.file-icon {
  font-size: 1.2rem;
}

.file-name {
  font-weight: 500;
}

.mobile-social-links {
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
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
  width: 40px;
  height: 40px;
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
  font-size: 0.8rem;
  color: var(--terminal-comment);
}

/* Animations */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .terminal-body {
    padding: 0.75rem 2rem;
  }
  
  .nav-list {
    gap: 1.5rem;
  }
  
  .logo-name {
    font-size: 1.3rem;
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .terminal-body {
    padding: 0.75rem 1.5rem;
  }
  
  .nav-list {
    gap: 1.25rem;
  }
  
  .logo-name {
    font-size: 1.25rem;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .terminal-body {
    padding: 0.75rem 1.25rem;
  }
  
  .nav-list {
    gap: 1rem;
  }
  
  .logo-name {
    font-size: 1.2rem;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .terminal-body {
    padding: 0.75rem 1rem;
  }
  
  .nav-list {
    gap: 0.75rem;
  }
  
  .logo-name {
    font-size: 1.1rem;
  }
  
  .profile-img {
    width: 36px;
    height: 36px;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
  }
  
  .terminal-command-btn {
    width: 32px;
    height: 32px;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .desktop-nav {
    display: none;
  }
  
  .terminal-body {
    padding: 0.75rem 1rem;
  }
  
  .logo-name {
    font-size: 1rem;
  }
  
  .profile-img {
    width: 32px;
    height: 32px;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
  }
  
  .terminal-command-btn {
    width: 32px;
    height: 32px;
  }
  
  .mobile-terminal {
    width: 85%;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .terminal-body {
    padding: 0.5rem 0.75rem;
  }
  
  .logo-name {
    font-size: 0.9rem;
  }
  
  .profile-img {
    width: 28px;
    height: 28px;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
  }
  
  .terminal-command-btn {
    width: 28px;
    height: 28px;
  }
  
  .terminal-header {
    padding: 0.5rem 0.75rem;
  }
  
  .terminal-title {
    font-size: 0.8rem;
  }
  
  .mobile-terminal {
    width: 90%;
  }
  
  .mobile-terminal-body {
    padding: 1rem;
  }
  
  .mobile-logo-section {
    margin-bottom: 1rem;
  }
  
  .mobile-terminal-prompt {
    margin-bottom: 0.75rem;
  }
  
  .mobile-nav {
    margin-bottom: 1rem;
  }
  
  .mobile-social-links {
    margin-bottom: 1rem;
  }
  
  .social-icon {
    width: 36px;
    height: 36px;
  }
  
  .social-name {
    font-size: 0.7rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .terminal-body {
    padding: 0.5rem 0.75rem;
  }
  
  .logo-name {
    font-size: 0.8rem;
  }
  
  .profile-img {
    width: 24px;
    height: 24px;
  }
  
  .status-indicator {
    width: 6px;
    height: 6px;
  }
  
  .terminal-command-btn {
    width: 24px;
    height: 24px;
  }
  
  .terminal-header {
    padding: 0.5rem 0.75rem;
  }
  
  .terminal-title {
    font-size: 0.7rem;
  }
  
  .mobile-terminal {
    width: 95%;
  }
  
  .mobile-terminal-body {
    padding: 0.75rem;
  }
  
  .mobile-logo-section {
    margin-bottom: 0.75rem;
  }
  
  .mobile-terminal-prompt {
    margin-bottom: 0.75rem;
  }
  
  .mobile-nav {
    margin-bottom: 0.75rem;
  }
  
  .mobile-social-links {
    margin-bottom: 0.75rem;
  }
  
  .social-icon {
    width: 32px;
    height: 32px;
  }
  
  .social-name {
    font-size: 0.6rem;
  }
}
</style>