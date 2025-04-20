<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <button @click="toggleTheme" class="theme-toggle-btn">
        Toggle Theme
      </button>
      <Intro />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  </div>
      <!-- Footer -->
      <Footer />
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

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});
</script>

<style>
/* Base Layout */
#app {
  display: flex;
}

.main-content {
  margin-left: 250px;
  flex: 1;
  padding: 2rem;
  transition: margin-left 0.3s ease-in-out;
}

/* Adjust for collapsed sidebar */
body.sidebar-collapsed .main-content {
  margin-left: 60px;
}

/* Responsive layout */
@media screen and (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 1rem;
  }
}

/* Light/Dark Themes */
body {
  background-color: #ffffff;
  color: #333333;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-theme {
  background-color: #1e1e1e;
  color: #f0f0f0;
}

/* Button Styling */
.theme-toggle-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: var(--accent, #ff6347);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 999;
}

:root {
  --sidebar-bg: #ffffff;
  --text-color: #333;
  --accent: #ff6347;
  --hover-color: #ff4500;
}

body.dark-theme {
  --sidebar-bg: #333;
  --text-color: #fff;
  --accent: #FFD700;
  --hover-color: #FFFF00;
}
html {
  scroll-behavior: smooth;
}
:root {
  --footer-bg: #f9f9f9;
  --footer-text: #333;
  --footer-heading: #222;
  --footer-link: #555;
  --footer-icon: #444;
  --accent: #ff6347;
  --hover-color: #ff4500;
  --border-color: #ddd;
}
body.dark-theme {
  --footer-bg: #1e1e1e;
  --footer-text: #eee;
  --footer-heading: #fff;
  --footer-link: #aaa;
  --footer-icon: #ccc;
  --border-color: #333;
  --accent: #FFD700;
  --hover-color: #FFFF00;
}
</style>
