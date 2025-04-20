<template>
    <footer class="footer">
      <div class="footer-content">
        <!-- Quick Links -->
        <div class="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
  
        <!-- Social Media -->
        <div class="footer-section socials">
          <h3>Connect</h3>
          <div class="footer-icons">
            <a href="https://github.com/Njenga993" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="mailto:njengak993@gmail.com"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
  
        <!-- Copyright -->
        <div class="footer-section copyright">
          <p>&copy; {{ new Date().getFullYear() }} Kelvin Kamau. All rights reserved.</p>
        </div>
      </div>
  
      <!-- Back to Top Button -->
      <button v-show="showButton" @click="scrollToTop" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
      </button>
    </footer>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const showButton = ref(false);
  
  const checkScroll = () => {
    showButton.value = window.scrollY > 300;
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
  });
  </script>
  
  <style scoped>
  .footer {
    background-color: var(--footer-bg);
    color: var(--footer-text);
    padding: 2rem 1rem;
    border-top: 1px solid var(--border-color);
    position: relative;
    flex: auto;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
  }
  
  .footer-section {
    flex: 1 1 250px;
  }
  
  .footer-section h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: var(--footer-heading);
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin: 0.5rem 0;
  }
  
  .footer-section ul li a {
    color: var(--footer-link);
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section ul li a:hover {
    color: var(--accent);
  }
  
  .footer-icons a {
    margin-right: 1rem;
    font-size: 1.5rem;
    color: var(--footer-icon);
    transition: transform 0.3s, color 0.3s;
  }
  
  .footer-icons a:hover {
    color: var(--accent);
    transform: scale(1.2);
  }
  
  .footer-section p {
    font-size: 0.9rem;
    color: var(--footer-text);
    margin-top: 1rem;
  }
  
  /* Back to Top */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--accent);
    color: #fff;
    border: none;
    border-radius: 50%;
    padding: 0.8rem;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 200;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, transform 0.3s;
  }
  
  .back-to-top:hover {
    background-color: var(--hover-color, #ff4500);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .footer-section {
      margin-bottom: 1.5rem;
    }
  
    .back-to-top {
      right: 1rem;
      bottom: 1.5rem;
    }
  }
  </style>
  