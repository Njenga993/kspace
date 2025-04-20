<template>
  <div>
    <!-- Hamburger Icon for small screens -->
    <button v-if="isMobile" @click="toggleDropdown" class="mobile-toggle">
      <i class="fas fa-bars"></i>
    </button>

    <!-- Mobile Dropdown -->
    <transition name="fade">
      <div v-if="showDropdown && isMobile" class="mobile-dropdown">
        <ul>
          <li><a href="#about" @click="scrollTo('about')">About</a></li>
          <li><a href="#skills" @click="scrollTo('skills')">Skills</a></li>
          <li><a href="#experience" @click="scrollTo('experience')">Experience</a></li>
          <li><a href="#projects" @click="scrollTo('projects')">Projects</a></li>
          <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
        </ul>
      </div>
    </transition>

    <!-- Desktop Sidebar -->
    <div v-if="!isMobile" class="sidebar">
      <div class="sidebar-content">
        <img src="/profile.JPG" alt="Profile" class="sidebar-profile-pic" />
        <nav>
          <ul>
            <li><a href="#about" @click="scrollTo('about')">About</a></li>
            <li><a href="#skills" @click="scrollTo('skills')">Skills</a></li>
            <li><a href="#experience" @click="scrollTo('experience')">Experience</a></li>
            <li><a href="#projects" @click="scrollTo('projects')">Projects</a></li>
            <li><a href="#contact" @click="scrollTo('contact')">Contact</a></li>
          </ul>
        </nav>
        <div class="socials">
          <a href="https://github.com/Njenga993" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a href="mailto:njengak993@gmail.com"><i class="fas fa-envelope"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const scrollTo = (section) => {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    showDropdown.value = false;
  }
};

const updateScreen = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  updateScreen();
  window.addEventListener('resize', updateScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreen);
});
</script>

<style scoped>
/* Desktop Sidebar */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background: var(--sidebar-bg);
  color: var(--text-color);
  padding-top: 2rem;
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent);
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

nav ul li {
  margin: 1rem 0;
}

nav ul li a {
  text-decoration: none;
  color: var(--accent);
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: var(--hover-color);
}

.socials {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.socials a {
  color: var(--accent);
  font-size: 1.4rem;
  transition: transform 0.3s ease, color 0.3s ease;
}

.socials a:hover {
  transform: scale(1.2);
  color: var(--hover-color);
}

/* Mobile Toggle */
.mobile-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 999;
  background: transparent;
  border: none;
  color: var(--accent);
  font-size: 2rem;
  cursor: pointer;
}

/* Mobile Dropdown Menu */
.mobile-dropdown {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--sidebar-bg);
  padding: 2rem 1rem;
  z-index: 998;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.mobile-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.mobile-dropdown ul li {
  margin: 1rem 0;
}

.mobile-dropdown ul li a {
  text-decoration: none;
  color: var(--accent);
  font-size: 1.2rem;
  font-weight: bold;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
