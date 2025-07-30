<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <!-- Responsive Navbar -->
    <Sidebar />

    <!-- Main Content Area -->
    <main class="main-content">


      <Intro />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Intro from './components/Intro.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const isDarkMode = ref(true); // Default to dark mode

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

watch(isDarkMode, (newVal) => {
  document.body.classList.toggle('dark-theme', newVal);
});
</script>

<style>
/* Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Main Content */
.main-content {
  padding: 2rem;
  margin-left: 0;
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transition: background-color 0.3s, color 0.3s;
}

/* Responsive adjustment for smaller screens */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}

/* Theme Toggle Button */
.theme-toggle-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 999;
}

/* Theme Variables */
:root {
  --background-color: #ffffff;
  --text-color: #333;
  --accent: #ff6347;
  --hover-color: #ff4500;
  --footer-bg: #f9f9f9;
  --footer-text: #333;
  --border-color: #ddd;
}

/* Dark Theme Overrides */
body.dark-theme {
  --background-color: #121212;
  --text-color: #f5f5f5;
  --accent: #ffd700;
  --hover-color: #ffff00;
  --footer-bg: #1e1e1e;
  --footer-text: #eee;
  --border-color: #333;
  background-color: var(--background-color);
  color: var(--text-color);
}

html {
  scroll-behavior: smooth;
}
</style>
