<template>
    <section id="about" class="about">
      <div
        class="about-left"
        v-motion="fadeUp"
        v-intersection-observer
      >
        <h2>About Me</h2>
        <p class="intro">
          I’m <span class="highlight">Kelvin Njenga Kamau</span>, a passionate Full Stack Developer with a strong foundation in software development, UI/UX, and digital strategy.
          I specialize in crafting scalable, responsive web apps that solve real-world problems — combining clean frontend design with powerful backend logic.
        </p>
  
        <div class="highlights">
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <h3>🎓 Education</h3>
            <p>Bachelor's Degree in Information Science (ICT Option) — Meru University of science and Technology</p>
          </div>
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <h3>💼 Experience</h3>
            <ul>
              <li>Developer & Digital Manager at <strong>Nyakazi Organics</strong></li>
              <li>Internships at <strong>Directorate of Immigration (ICT Dept.)</strong> & <strong>KNLS nakuru Branch</strong></li>
              <li>Frontend Projects with <strong>Desiderata</strong> & <strong>Techlungs</strong></li>
            </ul>
          </div>
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <h3>🚀 Strengths</h3>
            <ul>
              <li>UI/UX Design with Figma & Photoshop</li>
              <li>Clean code, reusable components</li>
              <li>Team collaboration & Agile workflows</li>
            </ul>
          </div>
        </div>
  
        <div class="stats">
          <div class="stat-item">
            <h3><AnimatedCounter :end="3" />+</h3>
            <p>Years of Experience</p>
          </div>
          <div class="stat-item">
            <h3><AnimatedCounter :end="20" />+</h3>
            <p>Projects Completed</p>
          </div>
        </div>
  
        <a href="/Kamau _Kelvin _Resume.pdf" class="download-btn" download>
          Download Resume 📄
        </a>
      </div>
  
      <div
        class="about-right"
        v-motion="fadeInRight"
        v-intersection-observer
      >
        <img src="/CEO.jpeg" alt="Kelvin Njenga Kamau" />
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import AnimatedCounter from './AnimatedCounter.vue'
  
  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  
  const fadeInRight = {
    initial: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }
  </script>
  
  <style scoped>
  .about {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 4rem 2rem;
    gap: 2rem;
    background: linear-gradient(to left, #f9f9f9, #ffffff);
  }
  
  body.dark-theme .about {
    background: linear-gradient(to left, #1e1e1e, #2b2b2b);
    color: #eee;
  }
  
  body.dark-theme .highlight-block {
  background-color: #2a2a2a;
  color: #eee;
}

  body.dark-theme .highlight-block h3 {
  color: var(--accent, #ff6347);
}
  .about-left {
    flex: 1 1 60%;
  }
  
  .about-right {
    flex: 1 1 35%;
    display: flex;
    justify-content: center;
  }
  
  .about-right img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  h2 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: var(--accent, #ff6347);
  }
  
  .intro {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.8;
  }
  
  .highlight {
    color: var(--accent, #ff6347);
    font-weight: bold;
  }
  
  .highlights {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .highlight-block {
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    transition: 0.3s ease;
  }
  
  .glowing-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(255, 99, 71, 0.3);
  }
  
  .stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .stat-item h3 {
    font-size: 2rem;
    color: var(--accent, #ff6347);
  }
  
  .stat-item p {
    font-size: 1rem;
  }
  
  .download-btn {
    margin-top: 2rem;
    display: inline-block;
    background-color: var(--accent, #ff6347);
    color: #fff;
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    text-decoration: none;
    transition: background 0.3s;
  }
  
  .download-btn:hover {
    background-color: #e5533f;
  }
  </style>
  