<!-- src/components/Sidebar.vue -->
<template>
  <!-- No changes to your excellent <template> structure -->
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
          <span class="logo-name">K-SPACE $Terminal</span>
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
                {{ link.text }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Right Section -->
        <div class="right-section">
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
// No changes to your excellent <script setup> logic
import { ref, onMounted, onBeforeUnmount } from 'vue';

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
  { id: 'email', name: 'Email', icon: 'fas fa-envelope', url: 'mailto:njengak993@gmail.com' }
];

const isScrolled = ref(false);
const activeSection = ref('');
const isMobileMenuOpen = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
  document.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('keydown', handleEscapeKey);
  document.body.style.overflow = '';
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
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

const navigateToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = sectionId;
    isMobileMenuOpen.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  activeSection.value = '';
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const handleEscapeKey = (e) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    toggleMobileMenu();
  }
};
</script>

<style scoped>
/* --- Theme Variables & Base Styles (No major changes) --- */
:root {
  /* Sync height with App.vue */
  --navbar-height: 90px;

  --terminal-bg: #0d1117;
  --terminal-header: #161b22;
  --terminal-text: #e6edf3;
  --terminal-prompt: #3fb950;
  --accent-color: #58a6ff;
  --accent-hover: #1f6feb;
}

.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--navbar-height); /* Set explicit height */
  transition: all 0.3s ease;
}

.terminal-navbar {
  background-color: var(--terminal-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  font-family: 'Fira Code', 'Courier New', monospace;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.navbar-container.scrolled .terminal-navbar {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

/* --- Terminal Header (No major changes) --- */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.25rem 1rem;
  flex-shrink: 0;
}
.terminal-buttons { display: flex; gap: 0.5rem; }
.terminal-button { width: 12px; height: 12px; border-radius: 50%; }
.terminal-button.close { background-color: #ff5f56; }
.terminal-button.minimize { background-color: #ffbd2e; }
.terminal-button.maximize { background-color: #27c93f; }
.terminal-title { color: var(--terminal-text); font-size: 0.8rem; opacity: 0.8; }

/* --- Terminal Body (Mobile-First) --- */
.terminal-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  flex: 1;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.logo-section:hover { transform: scale(1.05); }
.logo-wrapper { position: relative; }
.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}
.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #3fb950;
  border: 2px solid var(--terminal-bg);
}
.logo-name {
  font-weight: 700;
  /* Fluid font size from 0.8rem to 1.2rem */
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  color: var(--terminal-text);
}

/* --- Navigation (Mobile-First) --- */
.desktop-nav { display: none; } /* Hidden on mobile */
.right-section { display: flex; align-items: center; }
.terminal-command-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--terminal-header);
  border: 1px solid var(--terminal-prompt);
  border-radius: 4px;
  color: var(--terminal-prompt);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.terminal-command-btn:hover { background-color: var(--terminal-prompt); color: var(--terminal-bg); }
.command-symbol { font-size: 1.2rem; }

/* --- Mobile Menu (No major changes, just adjusted padding) --- */
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
.mobile-terminal-overlay.active { opacity: 1; visibility: visible; }
.mobile-terminal {
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 400px;
  height: 100%;
  background-color: var(--terminal-bg);
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  font-family: 'Fira Code', 'Courier New', monospace;
}
.mobile-terminal-overlay.active .mobile-terminal { transform: translateX(0); }

.mobile-terminal-body { padding: 1.5rem; color: var(--terminal-text); }

.file-icon { font-size: 1.2rem; }
.file-name { font-weight: 500; }

.social-links { display: flex; gap: 1rem; }

.social-name { font-size: 0.8rem; color: var(--terminal-comment); }

/* --- Animations --- */
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
.cursor { color: var(--terminal-prompt); animation: blink 1s infinite; }

/* --- Responsive Design (Tablet and Up) --- */
@media (min-width: 768px) {
  .terminal-body { padding: 0.75rem 1.5rem; }
  .profile-img { width: 36px; height: 36px; }
  .status-indicator { width: 10px; height: 10px; }
  .terminal-command-btn { width: 36px; height: 36px; }
  .mobile-terminal-body { padding: 1.75rem; }
}

/* --- Responsive Design (Desktop and Up) --- */
@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .terminal-prompt { display: flex; align-items: center; gap: 0.25rem; }
  .prompt-symbol { color: var(--terminal-prompt); font-weight: bold; }
  .command { color: var(--terminal-text); }
  .nav-list {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }
  .nav-link {
    position: relative;
    font-weight: 500;
    color: var(--terminal-text);
    text-decoration: none;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
  }
  .nav-link:hover { color: var(--accent-color); }
  .nav-link.active { color: var(--accent-color); font-weight: 600; }
  .nav-link.active::before { content: '$ '; color: var(--terminal-prompt); }
  
  .right-section { display: none; } /* Hide hamburger on desktop */
}
</style>