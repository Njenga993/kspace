<template>
  <SiteLoader />
  <div id="app">
    <!-- Noise Texture Overlay -->
    <div class="noise-overlay"></div>

   <!-- <Sidebar />-->

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
  <FloatingWhatsApp />
  <BackToTop/>
</template>

<script setup>
//import Sidebar from "./components/Sidebar.vue";
import Intro from "./components/Intro.vue";
import About from "./components/About.vue";
import Skills from "./components/Skills.vue";
import Experience from "./components/Experience.vue";
import Projects from "./components/Projects.vue";
import Clients from "./components/Clients.vue";
import Contact from "./components/Contact.vue";
import Footer from "./components/Footer.vue";
import SiteLoader from './components/SiteLoader.vue'
import BackToTop from './components/BackToTop.vue'
import FloatingWhatsApp from './components/FloatingWhatsApp.vue'
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap");

:root {
  /* Backgrounds */
  --bg-primary:    #000000;
  --bg-secondary:  #0a0a0a;
  --bg-card:       #111111;
  --bg-elevated:   #1a1a1a;

  /* Borders */
  --border-dark:    #1a1a1a;
  --border-default: #262626;
  --border-light:   #333333;

  /* Text — all bumped to WCAG-readable contrast on dark bg */
  --text-white:  #ffffff;
  --text-silver: #c8cdd5;   /* was #c0c0c0 — fine, kept similar */
  --text-muted:  #a0a8b4;   /* was #666666 — FAR too dark, now readable */
  --text-dim:    #6b7585;   /* was #444444 — too dark, now usable for labels */

  /* Accent */
  --accent:      #ff5e00;
  --accent-hover: #ff7a2e;
  --accent-dim:  rgba(255, 94, 0, 0.12);
  --accent-glow: rgba(255, 94, 0, 0.3);

  /* Typography */
  --font-heading: "Oswald", sans-serif;
  --font-body:    "Inter", sans-serif;

  --nav-height: 70px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-silver);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  position: relative;
  min-height: 100vh;
}

.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

.main-content {
  padding-top: var(--nav-height);
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}
a:hover {
  color: var(--accent-hover);
}

::selection {
  background: var(--accent);
  color: #000;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
</style>