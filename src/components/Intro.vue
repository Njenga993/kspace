<template>
  <section class="hero-section">
    <!-- Background Elements -->
    <div class="hero-bg"></div>
    <div class="particles" id="particles-js"></div>
    
    <!-- Overlay Content -->
    <div class="hero-overlay">
      <div class="hero-content">
        <!-- Text Content -->
        <div class="hero-text">
          <p class="intro-label animate-fade-in">HELLO, MY NAME IS</p>
          <h1 class="hero-name animate-slide-up">
            <span class="name-gradient">Kelvin</span>
            <span class="name-gradient">Kamau</span>
          </h1>
          <div class="typewriter-container">
            <p class="hero-tagline typewriter"></p>
          </div>
          

        
        <!-- Social Links -->
        <div class="hero-socials animate-fade-in">
          <div class="socials-container">
            <a href="https://github.com/Njenga993" target="_blank" aria-label="GitHub" class="social-icon">
              <i class="fab fa-github"></i>
              <span class="tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" aria-label="LinkedIn" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
              <span class="tooltip">LinkedIn</span>
            </a>
            <a href="mailto:njengak993@gmail.com" aria-label="Email" class="social-icon">
              <i class="fas fa-envelope"></i>
              <span class="tooltip">Email Me</span>
            </a>
          </div>

                    <!-- Call to Action -->
          <div class="hero-cta animate-fade-in">
            <a href="#contact" class="cta-button">
              Get In Touch
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 12.75L12.75 5.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.25 5.25H12.75V12.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="#projects" class="secondary-button">
              View My Work
            </a>
          </div>
        </div> 
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Typewriter effect
  const taglines = [
    "I build exceptional digital experiences",
    "Full Stack Developer & UI Engineer",
    "Creating solutions that matter"
  ];
  let currentTagline = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  const typeWriter = () => {
    const element = document.querySelector('.hero-tagline');
    const fullTxt = taglines[currentTagline];
    
    if (isDeleting) {
      element.textContent = fullTxt.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = fullTxt.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === fullTxt.length) {
      isEnd = true;
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTagline = (currentTagline + 1) % taglines.length;
    }
    
    const speed = isDeleting ? 50 : isEnd ? 100 : 150;
    setTimeout(typeWriter, speed);
  };
  
  setTimeout(typeWriter, 1000);
  
  // Initialize particles if needed
  // particlesJS.load('particles-js', '/particles.json', function() {});
});
</script>

<style scoped>
/* Base Styles */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100vw;
  margin-left: -2rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-top: 4.5rem;
  padding: 0;
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(50, 30, 40, 0.7) 100%);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  line-height: 1.6;


}


/* Background with gradient overlay */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/kay.jpg') no-repeat center center/cover;
  z-index: 1;
}

.hero-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.9) 0%, rgba(50, 30, 40, 0.7) 100%);
  z-index: 2;
}

/* Particles effect */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
}

/* Content Container */
.hero-overlay {
  position: relative;
  z-index: 4;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero-text {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

/* Typography */
.intro-label {
  color: #ff5c35;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  font-size: 1rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.2s;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: slideUp 0.8s ease-out forwards;
  animation-delay: 0.4s;
}

.name-gradient {
  background: linear-gradient(90deg, #ffffff 0%, #ff9a8b 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.typewriter-container {
  min-height: 3rem;
  margin-bottom: 2.5rem;
}

.hero-tagline {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.85);
  margin: 0 auto;
  max-width: 700px;
  line-height: 1.6;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
}

/* Buttons */
.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 1s;
  margin-bottom: 2rem;
}

.cta-button {
  background: #ff5c35;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 92, 53, 0.3);
}

.cta-button:hover {
  background: #ff3c1a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 92, 53, 0.4);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(3px);
}

.secondary-button {
  background: transparent;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* Social Icons */
.hero-socials {
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 1.2s;
}

.socials-container {
  display: flex;
  gap: 1.5rem;
}

.social-icon {
  position: relative;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #ff5c35;
  transform: translateY(-3px);
}

.social-icon .tooltip {
  position: absolute;
  top: -40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  white-space: nowrap;
}

.social-icon:hover .tooltip {
  opacity: 1;
  transform: translateY(-5px);
}

/* Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.scroll-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}

.mouse {
  width: 25px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: scrollAnimation 2s infinite;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollAnimation {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .hero-content {
    padding: 0 1rem;
    width: 100vw;
  }
  
  .hero-name {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
  }
  
  .hero-tagline {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
    max-width: 90%;
    border-right: none;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-button, .secondary-button {
    width: fit-content;
    text-align: center;
    justify-content: center;
  }
  
  .socials-container {
    gap: 1rem;
  }
  
  .social-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .hero-content {
    gap: 2rem;
    width: 100vw;
  }
  
  .hero-name {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }
  
  .hero-tagline {
    font-size: 1.1rem;
    white-space: normal;
    border-right: none;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-button, .secondary-button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  
  .socials-container {
    gap: 1rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .hero-name {
    font-size: clamp(2rem, 12vw, 3.5rem);
    width: 100vw;
  }
  
  .hero-tagline {
    font-size: 1rem;
  }
  
  .hero-cta {
    gap: 0.5rem;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
}
</style>