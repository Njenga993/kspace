<!-- src/App.vue -->
<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <!-- Your Navbar Component (was called Sidebar) -->
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
import Sidebar from './components/Sidebar.vue'; // This is your Navbar
import Intro from './components/Intro.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Clients from './components/Clients.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

const isDarkMode = ref(true);

watch(isDarkMode, (newVal) => {
  document.body.classList.toggle('dark-theme', newVal);
});
</script>

<style>
/* --- Global Reset & Variables --- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden; /* Prevents horizontal scroll */
  scroll-behavior: smooth;
  background-color: #0d1117; /* Default dark background */
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* --- Main Layout --- */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* --- Main Content Area --- */
.main-content {
  flex: 1; /* Takes up remaining vertical space */
  width: 100%;
  
  /* Fluid padding and top margin to account for fixed navbar */
  padding: var(--navbar-height) clamp(1rem, 5vw, 2rem) 2rem;
  
  transition: background-color 0.3s, color 0.3s;
}

/* --- Theme Variables --- */
:root {
  /* Define navbar height here to keep it consistent */
  --navbar-height: 90px; 

  /* Light Theme (Default) */
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