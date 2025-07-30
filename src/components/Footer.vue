<template>
  <div>
    <!-- Footer -->
    <footer class="footer" :class="{ 'dark': isDark }">
      <div class="footer-container">
        <!-- Left: Branding -->
        <div class="footer-brand">
          <div class="brand-logo">
            <img src="/profile.JPG" alt="Kelvin Kamau" />
            <span>Kelvin Kamau</span>
          </div>
          <p class="brand-tagline">
            Full Stack Developer & UI Engineer creating digital experiences that matter.
          </p>
          <div class="footer-socials">
            <a 
              v-for="social in socialLinks" 
              :key="social.id"
              :href="social.url" 
              target="_blank" 
              :aria-label="social.name"
              class="social-icon"
            >
              <i :class="social.icon"></i>
              <span class="tooltip">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Middle: Navigation -->
        <div class="footer-nav">
          <h3 class="footer-heading">Navigation</h3>
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a :href="`#${link.id}`" @click="scrollTo(link.id)">
                {{ link.text }}
                <span class="link-underline"></span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Right: Contact -->
        <div class="footer-contact">
          <h3 class="footer-heading">Get In Touch</h3>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:njengak993@gmail.com">njengak993@gmail.com</a>
            </div>
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>Nairobi, Kenya</span>
            </div>
          </div>
          <a href="#contact" class="contact-button" @click="scrollTo('contact')">
            Contact Me
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- Bottom: Copyright -->
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Kelvin Kamau. All rights reserved.</p>
        <div class="legal-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop" 
      @click="scrollToTop" 
      class="back-to-top"
      aria-label="Back to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const navLinks = [
  { id: 'about', text: 'About' },
  { id: 'skills', text: 'Skills' },
  { id: 'experience', text: 'Experience' },
  { id: 'projects', text: 'Projects' },
  { id: 'contact', text: 'Contact' }
];

const socialLinks = [
  { id: 'github', name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Njenga993' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/kelvin-kamau-788160277/' },
  { id: 'twitter', name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/' },
  { id: 'email', name: 'Email', icon: 'fas fa-envelope', url: 'mailto:njengak993@gmail.com' }
];

const showBackToTop = ref(false);
const isDark = ref(false);

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollTo = (section) => {
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  // Check for dark mode preference
  isDark.value = document.body.classList.contains('dark-theme');
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped>
/* Base Footer Styles */
.footer {
  background-color: #f8fafc;
  color: #1e293b;
  padding: 4rem 2rem 2rem;
  position: relative;
  border-top: 1px solid #e2e8f0;
  width: 100%;
  
}

.footer.dark {
  background-color: #0f172a;
  color: #e2e8f0;
  border-top-color: #1e293b;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.footer.dark .footer-container {
  border-bottom-color: #1e293b;
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #3b82f6;
}

.footer.dark .brand-logo img {
  border-color: #60a5fa;
}

.brand-logo span {
  font-weight: 600;
  font-size: 1.2rem;
}

.brand-tagline {
  color: #64748b;
  line-height: 1.6;
  max-width: 300px;
}

.footer.dark .brand-tagline {
  color: #94a3b8;
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.social-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  color: #3b82f6;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.footer.dark .social-icon {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.social-icon:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-3px);
}

.footer.dark .social-icon:hover {
  background: #60a5fa;
}

.tooltip {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.footer.dark .tooltip {
  background: #f8fafc;
  color: #1e293b;
}

.social-icon:hover .tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

/* Navigation Section */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-heading {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.footer.dark .footer-heading {
  color: #f8fafc;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-nav ul li a {
  position: relative;
  display: inline-block;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  padding: 0.25rem 0;
  transition: color 0.3s ease;
}

.footer.dark .footer-nav ul li a {
  color: #94a3b8;
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.footer.dark .link-underline {
  background: #60a5fa;
}

.footer-nav ul li a:hover {
  color: #3b82f6;
}

.footer.dark .footer-nav ul li a:hover {
  color: #60a5fa;
}

.footer-nav ul li a:hover .link-underline {
  width: 100%;
}

/* Contact Section */
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
}

.footer.dark .contact-item {
  color: #94a3b8;
}

.contact-item i {
  color: #3b82f6;
  width: 20px;
  text-align: center;
}

.footer.dark .contact-item i {
  color: #60a5fa;
}

.contact-item a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer.dark .contact-item a {
  color: #94a3b8;
}

.contact-item a:hover {
  color: #3b82f6;
}

.footer.dark .contact-item a:hover {
  color: #60a5fa;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  width: fit-content;
}

.footer.dark .contact-button {
  color: #60a5fa;
  border-color: #60a5fa;
}

.contact-button:hover {
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-2px);
}

.footer.dark .contact-button:hover {
  background: rgba(96, 165, 250, 0.1);
}

.contact-button i {
  transition: transform 0.3s ease;
}

.contact-button:hover i {
  transform: translateX(3px);
}

/* Footer Bottom */
.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  color: #64748b;
  font-size: 0.9rem;
}

.footer.dark .footer-bottom {
  color: #94a3b8;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legal-links a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer.dark .legal-links a {
  color: #94a3b8;
}

.legal-links a:hover {
  color: #3b82f6;
}

.footer.dark .legal-links a:hover {
  color: #60a5fa;
}

.legal-links span {
  color: #cbd5e1;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.footer.dark .back-to-top {
  background: #60a5fa;
  box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);
}

.back-to-top.show {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #2563eb;
  transform: translateY(-3px) scale(1.05);
}

.footer.dark .back-to-top:hover {
  background: #3b82f6;
}

.back-to-top i {
  font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 100%;
  }

  .footer-nav ul {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .back-to-top {
    width: 45px;
    height: 45px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 3rem 1.5rem 2rem;
    width: 100%;
  }

  .contact-button {
    width: 100%;
    justify-content: center;
  }
}
</style>