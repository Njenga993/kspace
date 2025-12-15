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
      <Clients />
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
import Clients from './components/Clients.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const isDarkMode = ref(true); // Default to dark mode

watch(isDarkMode, (newVal) => {
  document.body.classList.toggle('dark-theme', newVal);
});
</script>

<style>
/* Remove all default spacing */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background-color: #0d1117;
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Layout Container */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  margin-left: 0;
}

/* Main Content: full-width */
.main-content {
  flex: 1;
  width: 100vw;
  padding: 2rem;
  transition: background-color 0.3s, color 0.3s;
  box-sizing: border-box;
}

/* Responsive tweak for mobile */
@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}

/* Theme Variables (Light by default, overridden in dark mode) */
:root {
  --background-color: #ffffff;
  --text-color: #333333;
  --accent: #ff6347;
  --hover-color: #ff4500;
  --footer-bg: #f9f9f9;
  --footer-text: #333333;
  --border-color: #dddddd;
}

/* Dark Theme */
body.dark-theme {
  --background-color: #121212;
  --text-color: #f5f5f5;
  --accent: #ffd700;
  --hover-color: #ffff00;
  --footer-bg: #1e1e1e;
  --footer-text: #eeeeee;
  --border-color: #333333;

  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
