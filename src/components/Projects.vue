<template>
  <section id="projects" class="section">
    <h2 class="section-title">Projects</h2>
    <div class="projects-grid">
      <div
        class="project-card"
        v-for="(project, index) in projects"
        :key="index"
        :style="{ animationDelay: `${index * 0.5}s` }"
      >
        <img :src="project.image" :alt="project.title" class="project-image" />
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tags">
            <span v-for="(tag, i) in project.tech" :key="i">{{ tag }}</span>
          </div>
          <div class="project-links">
            <a :href="project.github" target="_blank" aria-label="GitHub">
              <i class="fa-brands fa-github"></i>
            </a>
            <a :href="project.demo" target="_blank" aria-label="Live Demo">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Nyakazi Website',
    description: 'A responsive ecommerce site for Nyakazi Organics with product showcase and order handling.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Njenga993/Nyakazi',
    demo: 'https://nyakazi.org',
    image: '/Nyakazi.png',
  },
  {
    title: 'Desiderata Website',
    description: 'Consultancy firm site with service listings, contact forms, and Google Maps integration.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Njenga993/Firm-Desiderata',
    demo: 'https://desiderataconsultancyfirm.com/',
    image: '/Desiderata.png',
  },
  {
    title: 'SaleHub POS',
    description: 'A full-featured POS system with React frontend and Django backend, supporting sales, inventory, and reporting.',
    tech: ['React', 'TypeScript', 'Django', 'PostgreSQL'],
    github: 'https://github.com/Njenga993/pos-project',
    demo: '#',
    image: '/salehubPOS.png',
  },
  {
    title: 'React Portfolio',
    description: 'A full-featured Portfolio  with React frontend showing my eductaion,skills and experience',
    tech: ['React', 'TypeScript'],
    github: 'https://github.com/Njenga993/Portfolio-',
    demo: 'https://njenga993.github.io/Portfolio-/',
    image: '/React Portfolio.png',
  },
  {
    title: 'Techlungs Website',
    description: 'A responsive landing page for Techlungs Technology with animations and interactivity.',
    tech: ['HTML', 'javaScript', 'CSS'],
    github: 'https://github.com/Njenga993/Techlungs',
    demo: 'https://techlungs.co.ke/',
    image: '/Techlungs.png',
  },
  {
    title: 'Vue Portfolio',
    description: 'A full-featured Portfolio  with Vue.js frontend showing my eductaion,skills and experience',
    tech: ['Vue.js', 'javaScript'],
    github: 'https://github.com/yourusername/salehub',
    demo: '#',
    image: '/Vue Portfolio.png',
  },
];
</script>

<style scoped>
.section {
  padding: 4rem 2rem;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}
.project-card {
  background-color: var(--card);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--hover-shadow);
}
.project-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.project-content {
  padding: 1.5rem;
}
.project-content h3 {
  margin: 0 0 0.5rem;
}
.project-content p {
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}
.tags span {
  display: inline-block;
  background: var(--accent-light);
  color: var(--accent);
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  margin-right: 5px;
}
.project-links a {
  font-size: 1.2rem;
  color: var(--text);
  margin-right: 1rem;
  transition: color 0.3s ease;
}
.project-links a:hover {
  color: var(--accent);
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark Mode */
:root {
  --card: #ffffff;
  --text: #333;
  --accent: #007bff;
  --accent-light: #e6f0ff;
  --border: rgba(0, 0, 0, 0.05);
  --shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  --hover-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.dark {
  --card: #1e1e1e;
  --text: #f5f5f5;
  --accent: #66b2ff;
  --accent-light: rgba(102, 178, 255, 0.1);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 4px 14px rgba(255, 255, 255, 0.05);
  --hover-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
}
</style>
