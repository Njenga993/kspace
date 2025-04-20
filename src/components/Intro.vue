<template>
    <section id="intro" class="intro">
      <div class="intro-text">
        <h1>Hey there! 👋 I’m <span class="highlight">Kelvin Njenga Kamau</span></h1>
        <h2>Full Stack Developer | React, vue & Django , Laravel</h2>
        <p>
          I craft powerful web apps with seamless UI and robust backend logic.
          From transforming ideas into reality to deploying scalable systems, I bridge creativity and code.
        </p>
  
        <div class="stack-card">
          <h3>I am a passionate Full Stack Developer with expertise in:</h3>
          <ul>
            <li><strong>Frontend:</strong> React, Vue.js, HTML, CSS, JavaScript</li>
            <li><strong>Backend:</strong> Django, Node.js, PHP Laravel</li>
            <li><strong>Databases:</strong> MySQL, PostgreSQL, Firebase</li>
            <li><strong>Graphic Design:</strong> Adobe Photoshop, Figma</li>
          </ul>
        </div>
  
        <div class="socials">
          <a href="https://github.com/Njenga993" target="_blank" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="mailto:njengak993@gmail.com" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
  
        <button @click="scrollToProjects">View Projects</button>
      </div>
  
      <div class="intro-image">
        <img src="/profile.JPG" alt="Kelvin Njenga Kamau" />
      </div>
    </section>
  </template>
  
  <script setup>
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  </script>
  
  <style scoped>
  .intro {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 4rem 2rem;
    min-height: 100vh;
    background: linear-gradient(to right, #f7f7f7, #ffffff);
  }
  
  body.dark-theme .intro {
    background: linear-gradient(to right, #1e1e1e, #2c2c2c);
  }
  
  .intro-text {
    flex: 1 1 55%;
    max-width: 650px;
  }
  
  .intro-text h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .intro-text h2 {
    font-size: 1.5rem;
    color: #888;
    margin-bottom: 1rem;
  }
  
  .intro-text p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .highlight {
    color: var(--accent, #ff6347);
  }
  
  .stack-card {
    background-color: #fff;
    padding: 1.5rem;
    border-left: 5px solid var(--accent, #ff6347);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }
  
  body.dark-theme .stack-card {
    background-color: #2c2c2c;
    color: #eee;
    border-color: var(--accent, #ff6347);
  }
  
  .stack-card h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: var(--accent, #ff6347);
  }
  
  .stack-card ul {
    list-style-type: none;
    padding: 0;
  }
  
  .stack-card li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .socials {
    margin: 1.5rem 0;
    display: flex;
    gap: 1rem;
  }
  
  .socials a {
    font-size: 1.5rem;
    color: var(--accent, #ff6347);
    transition: transform 0.3s ease;
  }
  
  .socials a:hover {
    transform: scale(1.2);
    color: var(--hover-color, #ff4500);
  }
  
  .intro-text button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: var(--accent, #ff6347);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .intro-text button:hover {
    background-color: var(--hover-color, #ff4500);
  }
  
  .intro-image {
    flex: 1 1 35%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .intro-image img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border: 5px solid var(--accent, #ff6347);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  </style>
  