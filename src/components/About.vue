<template>
  <section id="about" class="about-section">
    <!-- Section Header -->
    <div class="section-header">
      <div class="header-badge">
        <span class="badge-icon">👋</span>
        <span>Introduction</span>
      </div>
      <h2 class="section-title">About Me</h2>
      <div class="title-decoration">
        <div class="decoration-dot"></div>
        <div class="decoration-line"></div>
        <div class="decoration-dot"></div>
      </div>
      <p class="section-subtitle">
        Get to know the person behind the code
      </p>
    </div>

    <div class="about-content">
      <div 
        class="about-left"
        v-motion="fadeUp"
        v-intersection-observer
      >
        <p class="intro">
          I'm <span class="highlight">Kelvin Njenga Kamau</span>, a passionate Full Stack Developer with a strong foundation in software development, UI/UX, and digital strategy.
          I specialize in crafting scalable, responsive web apps that solve real-world problems — combining clean frontend design with powerful backend logic.
        </p>

        <div class="highlights">
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <div class="highlight-header">
              <span class="highlight-icon">🎓</span>
              <h3>Education</h3>
            </div>
            <p>Bachelor's Degree in Information Science (ICT Option) — Meru University of Science and Technology</p>
            <div class="highlight-footer">
              <span class="highlight-year">2019-2023</span>
            </div>
          </div>
          
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <div class="highlight-header">
              <span class="highlight-icon">💼</span>
              <h3>Experience</h3>
            </div>
            <ul class="features-list">
              <li>
                <div class="feature-item">
                  <div class="feature-bullet"></div>
                  <div>
                    <strong>Nyakazi Organics</strong> — Developer & Digital Manager
                    <div class="feature-duration">2023-Present</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="feature-item">
                  <div class="feature-bullet"></div>
                  <div>
                    <strong>Directorate of Immigration</strong> — ICT Intern
                    <div class="feature-duration">2022</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="feature-item">
                  <div class="feature-bullet"></div>
                  <div>
                    <strong>KNLS Nakuru Branch</strong> — IT Support
                    <div class="feature-duration">2021</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="highlight-block glowing-card" v-motion="fadeUp">
            <div class="highlight-header">
              <span class="highlight-icon">🚀</span>
              <h3>Core Strengths</h3>
            </div>
            <div class="skills-grid">
              <div class="skill-pill">UI/UX Design</div>
              <div class="skill-pill">Figma & Photoshop</div>
              <div class="skill-pill">Clean Code</div>
              <div class="skill-pill">Reusable Components</div>
              <div class="skill-pill">Agile Workflows</div>
              <div class="skill-pill">Team Collaboration</div>
            </div>
          </div>
        </div>

        <div class="experience-stats">
          <div class="stat-item">
            <span class="stat-value"><AnimatedCounter :end="3" />+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value"><AnimatedCounter :end="20" />+</span>
            <span class="stat-label">Projects Completed</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value"><AnimatedCounter :end="15" />+</span>
            <span class="stat-label">Happy Clients</span>
          </div>
        </div>

        <div class="action-buttons">
          <a href="/Kamau_Kelvin_Resume.pdf" class="download-btn" download>
            <span>Download Resume</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
          <a href="#contact" class="contact-btn">
            Contact Me
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
        </div>
      </div>

      <div 
        class="about-right"
        v-motion="fadeInRight"
        v-intersection-observer
      >
        <div class="image-container">
          <img src="/about.jpg" alt="Kelvin Njenga Kamau" class="profile-image" />

        </div>
      </div>
    </div>

    <!-- Background Decorations -->
    <div class="bg-decorations">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AnimatedCounter from './AnimatedCounter.vue';

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.8 } },
}

const techStack = ['vue', 'react', 'node', 'typescript', 'figma', 'photoshop'];
</script>

<style scoped>
/* Base section styles */
.about-section {
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
 
  margin: 0 auto;
  width: 100%;
 
}

body.dark-theme .about-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  color: #e2e8f0;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

body.dark-theme .header-badge {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.badge-icon {
  font-size: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

body.dark-theme .section-title {
  color: #f8fafc;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.decoration-dot {
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
}

.decoration-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

body.dark-theme .section-subtitle {
  color: #94a3b8;
}

/* Content layout */
.about-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.about-left {
  flex: 1 1 55%;
  min-width: 300px;
}

.about-right {
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Intro text */
.intro {
  font-size: 1.15rem;
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 3rem;
}

body.dark-theme .intro {
  color: #cbd5e1;
}

.highlight {
  color: #3b82f6;
  font-weight: 600;
  position: relative;
}

body.dark-theme .highlight {
  color: #60a5fa;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.highlight:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Highlight blocks */
.highlights {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 3rem;
}

.highlight-block {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

body.dark-theme .highlight-block {
  background: rgba(15, 23, 42, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.glowing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.15), 
              0 10px 10px -5px rgba(59, 130, 246, 0.1);
}

.highlight-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.highlight-block h3 {
  font-size: 1.15rem;
  color: #1e293b;
  margin: 0;
}

body.dark-theme .highlight-block h3 {
  color: #f8fafc;
}

.highlight-icon {
  font-size: 1.4rem;
  line-height: 1;
}

.highlight-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e2e8f0;
}

body.dark-theme .highlight-footer {
  border-color: #334155;
}

.highlight-year {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

body.dark-theme .highlight-year {
  color: #94a3b8;
}

.highlight-block p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.7;
  margin: 0;
}

body.dark-theme .highlight-block p {
  color: #cbd5e1;
}

/* Features list */
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.features-list li {
  font-size: 0.95rem;
  color: #475569;
}

body.dark-theme .features-list li {
  color: #cbd5e1;
}

.feature-item {
  display: flex;
  gap: 0.75rem;
}

.feature-bullet {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  background: #3b82f6;
  border-radius: 50%;
  margin-top: 0.5rem;
}

.feature-duration {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.25rem;
}

body.dark-theme .feature-duration {
  color: #94a3b8;
}

/* Skills grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.skill-pill {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
}

body.dark-theme .skill-pill {
  background: rgba(96, 165, 250, 0.1);
  color: #60a5fa;
}

.skill-pill:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

/* Stats */
.experience-stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

body.dark-theme .experience-stats {
  border-color: #334155;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

body.dark-theme .stat-value {
  color: #f8fafc;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.5px;
}

body.dark-theme .stat-label {
  color: #94a3b8;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: #e2e8f0;
}

body.dark-theme .stat-divider {
  background: #334155;
}

/* Buttons */
.action-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.download-btn:hover {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.download-btn svg {
  transition: transform 0.3s ease;
}

.download-btn:hover svg {
  transform: translateY(2px);
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  background: transparent;
  color: #3b82f6;
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.contact-btn:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}

body.dark-theme .contact-btn {
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.3);
}

body.dark-theme .contact-btn:hover {
  background: rgba(96, 165, 250, 0.1);
  border-color: rgba(96, 165, 250, 0.5);
}

.contact-btn svg {
  transition: transform 0.3s ease;
}

.contact-btn:hover svg {
  transform: translateX(2px);
}

/* Profile image */
.image-container {
  position: relative;
  width: 350px;
  height: 350px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.5s ease;
}

body.dark-theme .profile-image {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.image-container:hover .profile-image {
  transform: scale(1.02);
}

.image-frame {
  position: absolute;
  top: -15px;
  left: -15px;
  right: 15px;
  bottom: 15px;
  border: 2px solid #3b82f6;
  border-radius: 20px;
  z-index: 1;
  transition: all 0.3s ease;
}

.image-container:hover .image-frame {
  top: -20px;
  left: -20px;
  right: 20px;
  bottom: 20px;
}

.tech-badge {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 3;
}

body.dark-theme .tech-badge {
  background: #1e293b;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.tech-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%) contrast(0.8);
  transition: all 0.3s ease;
}

.tech-icon:hover img {
  filter: none;
  transform: scale(1.1);
}

/* Background decorations */
.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1));
  animation: float 20s ease-in-out infinite;
  opacity: 0.8;
}

.decoration-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: -3%;
  animation-delay: 7s;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation-delay: 14s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-section {
    padding: 6rem 2rem;
  }
  
  .about-content {
    gap: 3rem;
  }
  
  .image-container {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 5rem 1.5rem;
  }
  
  .about-content {
    flex-direction: column-reverse;
    gap: 3rem;
  }
  
  .experience-stats {
    flex-wrap: wrap;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    flex: 0 0 calc(50% - 0.5rem);
    margin-bottom: 1rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 4rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .image-container {
    width: 250px;
    height: 250px;
  }
  
  .highlight-block {
    padding: 1.5rem;
  }
  
  .skills-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .download-btn, .contact-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>