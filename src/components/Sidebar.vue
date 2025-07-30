<template>
  <div class="navbar-container" :class="{ dark: isDark, scrolled: isScrolled }">
    <!-- Logo -->
    <div class="navbar-logo" @click="scrollToTop">
      <img src="/profile.JPG" alt="Profile" />
      <span class="logo-text"> K-SPACE </span>
    </div>

    <!-- Hamburger -->
    <button v-if="isMobile" @click="toggleDropdown" class="mobile-toggle" :class="{ active: showDropdown }">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- Nav Links -->
    <transition name="slide-fade">
      <nav
        v-if="!isMobile || showDropdown"
        class="navbar-links"
        :class="{ mobile: isMobile }"
      >
        <ul>
          <li v-for="link in navLinks" :key="link.id">
            <a 
              :href="`#${link.id}`" 
              @click="scrollTo(link.id)"
              :class="{ active: activeSection === link.id }"
            >
              {{ link.text }}
              <span class="nav-indicator"></span>
            </a>
          </li>
        </ul>
      </nav>
    </transition>

    <!-- Right Side Controls -->
    <div class="navbar-right">
      <!-- Social Links -->
      <div class="navbar-socials">
        <a 
          v-for="social in socialLinks" 
          :key="social.id"
          :href="social.url" 
          target="_blank" 
          :aria-label="social.name"
        >
          <i :class="social.icon"></i>
          <span class="tooltip">{{ social.name }}</span>
        </a>
      </div>

      <!-- Dark/Light Toggle -->
      <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
        <div class="toggle-track">
          <div class="toggle-thumb" :class="{ dark: isDark }">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
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

const isMobile = ref(false);
const showDropdown = ref(false);
const isDark = ref(false);
const isScrolled = ref(false);
const activeSection = ref('');

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const scrollTo = (section) => {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = section;
    showDropdown.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  activeSection.value = '';
};

const updateScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  
  // Update active section
  const sections = navLinks.map(link => document.getElementById(link.id));
  sections.forEach(section => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = section.id;
    }
  });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-theme', isDark.value);
  localStorage.setItem('darkMode', isDark.value);
};

onMounted(() => {
  updateScreen();
  window.addEventListener('resize', updateScreen);
  window.addEventListener('scroll', handleScroll);
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    isDark.value = true;
    document.body.classList.add('dark-theme');
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreen);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Base styles */
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1a1a1a;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-right: 2rem;
  
}

.navbar-container.scrolled {
  padding: 0.75rem 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.navbar-container.dark {
  background: rgba(15, 23, 42, 0.95);
  color: #f8fafc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.navbar-container.dark.scrolled {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.navbar-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3b82f6;
  transition: all 0.3s ease;
}

.navbar-container.dark .navbar-logo img {
  border-color: #60a5fa;
}

.logo-text {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.navbar-container.dark .logo-text {
  color: #f8fafc;
}

/* Nav Links */
.navbar-links ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
}

.navbar-links ul li a {
  position: relative;
  text-decoration: none;
  font-weight: 500;
  color: #64748b;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
}

.navbar-container.dark .navbar-links ul li a {
  color: #94a3b8;
}

.navbar-links ul li a:hover {
  color: #3b82f6;
}

.navbar-container.dark .navbar-links ul li a:hover {
  color: #60a5fa;
}

.navbar-links ul li a.active {
  color: #3b82f6;
  font-weight: 600;
}

.navbar-container.dark .navbar-links ul li a.active {
  color: #60a5fa;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.navbar-container.dark .nav-indicator {
  background: #60a5fa;
}

.navbar-links ul li a.active .nav-indicator {
  width: 100%;
}

/* Social Links */
.navbar-socials {
  display: flex;
  gap: 1.2rem;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
}

.navbar-socials a {
  position: relative;
  font-size: 1.2rem;
  color: #64748b;
  transition: all 0.3s ease;
}

.navbar-container.dark .navbar-socials a {
  color: #94a3b8;
}

.navbar-socials a:hover {
  color: #3b82f6;
  transform: translateY(-2px);
}

.navbar-container.dark .navbar-socials a:hover {
  color: #60a5fa;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.navbar-container.dark .tooltip {
  background: #f8fafc;
  color: #1a1a1a;
}

.navbar-socials a:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

/* Theme Toggle */
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  width: 50px;
  height: 24px;
}

.toggle-track {
  width: 100%;
  height: 100%;
  background: #e2e8f0;
  border-radius: 12px;
  position: relative;
  transition: background 0.3s ease;
}

.navbar-container.dark .toggle-track {
  background: #334155;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-thumb.dark {
  transform: translateX(26px);
}

.toggle-thumb i {
  font-size: 0.7rem;
  position: absolute;
  transition: opacity 0.3s ease;
}

.toggle-thumb .fa-sun {
  color: #f59e0b;
  opacity: 1;
}

.toggle-thumb.dark .fa-sun {
  opacity: 0;
}

.toggle-thumb .fa-moon {
  color: #1e293b;
  opacity: 0;
}

.toggle-thumb.dark .fa-moon {
  opacity: 1;
}

/* Hamburger Menu */
.mobile-toggle {
  display: block;
  background: #3b82f6;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: #3b82f6;
  transition: all 0.3s ease;
  transform-origin: center;
}

.navbar-container.dark .hamburger-line {
  background: #60a5fa;
}

.mobile-toggle.active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.mobile-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile dropdown */
.navbar-links.mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  height: 100vh;
  width: 100%;
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
}

.navbar-container.dark .navbar-links.mobile {
  background: rgba(15, 23, 42, 0.98);
}

.navbar-links.mobile ul {
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.navbar-links.mobile ul li a {
  font-size: 1.2rem;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .navbar-container {
    padding: 0.75rem 1.5rem;
  }

  .navbar-logo img {
    width: 36px;
    height: 36px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .navbar-links ul {
    display: none; /* Hide links by default */
  }

  .mobile-toggle {
    display: flex; /* Show hamburger menu */
  }

  .navbar-links.mobile {
    display: flex; /* Show mobile dropdown */
  }

  .navbar-socials {
    margin-right: 0;
    margin-bottom: 3rem;
  }
}
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .navbar-links:not(.mobile) {
    display: none;
  }

  .navbar-socials {
    margin-right: 4rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0.75rem 1.5rem;
  }

  .navbar-logo img {
    width: 36px;
    height: 36px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .navbar-socials {
    gap: 1rem;
    margin-right: 2.5rem;
    margin-bottom: 1rem;
  }

  .theme-toggle {
    width: 40px;
  }
}
@media (max-width: 320px) {
  .navbar-container {
    padding: 0.55rem 0.5rem;
  }

  .navbar-logo img {
    width: 26px;
    height: 26px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .navbar-socials {
    gap: 1rem;
    margin-right: 2rem;
  }

  .theme-toggle {
    width: 40px;
  }
}

</style>