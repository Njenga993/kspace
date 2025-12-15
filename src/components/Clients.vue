<template>
  <section class="clients-section" id="clients">
    <div class="clients-container">
      <!-- Terminal Window for Clients -->
      <div class="clients-terminal">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <div class="terminal-button close"></div>
            <div class="terminal-button minimize"></div>
            <div class="terminal-button maximize"></div>
          </div>
          <div class="terminal-title">clients_database --list</div>
        </div>
        
        <div class="terminal-body">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command">ls -la /clients/</span>
          </div>
          
          <div class="terminal-output">
            <div class="client-stats">
              <div class="stat-item">
                <span class="stat-key">total_clients:</span>
                <span class="stat-value">{{ clients.length }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-key">satisfaction_rate:</span>
                <span class="stat-value">100%</span>
              </div>
              <div class="stat-item">
                <span class="stat-key">status:</span>
                <span class="stat-value success">Active Partnerships</span>
              </div>
            </div>
            
            <div class="terminal-separator"></div>
            
            <div class="client-grid" ref="clientGrid">
              <div 
                v-for="(client, index) in clients" 
                :key="index" 
                class="client-card"
                :style="`animation-delay: ${index * 0.1}s`"
                @click="showClientDetails(client)"
              >
                <div class="client-logo-container">
                  <img 
                    :src="client.logo" 
                    :alt="client.name" 
                    class="client-logo"
                    :class="{ 'grayscale': grayscaleLogos }"
                  />
                  <div class="client-overlay">
                    <div class="client-info">
                      <h3 class="client-name">{{ client.name }}</h3>
                      <p class="client-industry">{{ client.industry }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="terminal-separator"></div>
            
            <div class="terminal-actions">
              <button @click="toggleGrayscale" class="terminal-button-secondary">
                <span>{{ grayscaleLogos ? 'Show Colors' : 'Show Grayscale' }}</span>
              </button>
              <button @click="shuffleClients" class="terminal-button-primary">
                <span>Shuffle Clients</span>
              </button>
            </div>
          </div>
          
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command typing-animation">./show_clients.sh</span>
            <span class="cursor">_</span>
          </div>
        </div>
      </div>
      
      <!-- Client Details Modal -->
      <div v-if="selectedClient" class="client-modal" @click="closeClientDetails">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedClient.name }}</h2>
            <button @click="closeClientDetails" class="close-button">&times;</button>
          </div>
          <div class="modal-body">
            <div class="modal-logo">
              <img :src="selectedClient.logo" :alt="selectedClient.name" />
            </div>
            <div class="modal-details">
              <div class="detail-item">
                <span class="detail-key">Industry:</span>
                <span class="detail-value">{{ selectedClient.industry }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-key">Project:</span>
                <span class="detail-value">{{ selectedClient.project }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-key">Year:</span>
                <span class="detail-value">{{ selectedClient.year }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-key">Technologies:</span>
                <span class="detail-value">{{ selectedClient.technologies.join(', ') }}</span>
              </div>
              <p class="client-description">{{ selectedClient.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const clients = ref([
  {
    name: 'SEED SAVERS NETWORK KENYA',
    industry: 'Agriculture',
    logo: './SSN.JPG',
    project: 'Web Application Development',
    year: '2025',
    technologies: ['REACT', 'javaScript', 'CSS', 'HTML'],
    description: 'Developed a comprehensive web application to manage seed distribution and farmer networks across Kenya.'
  },
  {
    name: 'INOFO Africa',
    industry: 'Agriculture',
    logo: './inofo.JPG',
    project: 'Portfolio Website',
    year: '2025',
    technologies: ['React', 'Typescript', 'Tailwind CSS'],
    description: 'Created a modern portfolio website to showcase Inofo Africa\'s agricultural projects and initiatives.'
  },
  {
    name: 'Greania Build Solutions',
    industry: 'Construction Industry',
    logo: './Greania.JPG',
    project: 'Portfolio website',
    year: '2025',
    technologies: ['React', 'JavaScript', 'CSS', 'HTML'],
    description: 'Developed a sleek portfolio website to highlight Greania Build Solutions\' construction projects and services.'
  },
  {
    name: 'Nyakazi Organics limited',
    industry: 'Start-up',
    logo: './Nyakazi.png',
    project: 'Portfolio Website',
    year: '2024',
    technologies: ['React', 'javascript'],
    description: 'Built a responsive portfolio website to promote Nyakazi Organics\' organic products and brand story.'
  },
  {
    name: 'Nyakazi Ecommerce',
    industry: 'start-up',
    logo: './Nyakazi-ecommerce.PNG',
    project: 'E-commerce Website',
    year: '2024',
    technologies: ['React.js', 'Django', 'MySQL'],
    description: 'Developed a full-featured e-commerce platform for Nyakazi Organics to sell their organic products online.'
  },
  {
    name: 'POINT OF SALE',
    industry: 'E-commerce',
    logo: './salehubPOS.png',
    project: 'Internal System',
    year: '2026',
    technologies: ['Next.js', 'Stripe', 'Sanity'],
    description: 'A point of sale system designed to streamline sales operations and inventory management for retail businesses.'
  },
  {
    name: 'K-SPACE Tech Solutions',
    industry: 'IT Services',
    logo: './terminal.JPG',
    project: 'PERSONAL PORTFOLIO WEBSITE',
    year: '2025',
    technologies: ['React.js', 'Express', 'PostgreSQL'],
    description: 'Created a personal portfolio website to showcase projects and skills.'
  }
]);

const selectedClient = ref(null);
const grayscaleLogos = ref(true);
const clientGrid = ref(null);

onMounted(() => {
  // Add animation to client cards when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  if (clientGrid.value) {
    const cards = clientGrid.value.querySelectorAll('.client-card');
    cards.forEach(card => observer.observe(card));
  }
});

function showClientDetails(client) {
  selectedClient.value = client;
  document.body.style.overflow = 'hidden';
}

function closeClientDetails() {
  selectedClient.value = null;
  document.body.style.overflow = '';
}

function toggleGrayscale() {
  grayscaleLogos.value = !grayscaleLogos.value;
}

function shuffleClients() {
  // Shuffle the clients array
  const shuffled = [...clients.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  clients.value = shuffled;
  
  // Re-add animation class
  if (clientGrid.value) {
    const cards = clientGrid.value.querySelectorAll('.client-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.remove('visible');
      setTimeout(() => card.classList.add('visible'), 10);
    });
  }
}
</script>

<style>
/* Using the same theme variables as the hero section */
:root {
  --bg-color: #ffffff;
  --text-color: #1a202c;
  --secondary-text: #4a5568;
  --accent-color: #3182ce;
  --accent-hover: #2c5282;
  --terminal-bg: #1e1e1e;
  --terminal-header: #323232;
  --terminal-text: #d4d4d4;
  --terminal-prompt: #4ec9b0;
  --terminal-keyword: #569cd6;
  --terminal-string: #ce9178;
  --terminal-comment: #6a9955;
  --terminal-function: #dcdcaa;
  --terminal-variable: #9cdcfe;
  --terminal-property: #9cdcfe;
  --terminal-boolean: #569cd6;
  --terminal-class: #4ec9b0;
  --terminal-parameter: #9cdcfe;
  --terminal-line-number: #858585;
}

.dark-theme {
  --bg-color: #0d1117;
  --text-color: #f0f6fc;
  --secondary-text: #8b949e;
  --accent-color: #58a6ff;
  --accent-hover: #1f6feb;
  --terminal-bg: #0d1117;
  --terminal-header: #161b22;
  --terminal-text: #e6edf3;
  --terminal-prompt: #3fb950;
  --terminal-keyword: #ff7b72;
  --terminal-string: #a5d6ff;
  --terminal-comment: #8b949e;
  --terminal-function: #d2a8ff;
  --terminal-variable: #79c0ff;
  --terminal-property: #ffa657;
  --terminal-boolean: #ff7b72;
  --terminal-class: #3fb950;
  --terminal-parameter: #ffa657;
  --terminal-line-number: #30363d;
}
</style>

<style scoped>
/* Base Styles */
.clients-section {
  position: relative;
  padding: 4rem 2rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: 'Fira Code', 'Courier New', monospace;
  overflow: hidden;
}

.clients-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Terminal Styles */
.clients-terminal {
  width: 100%;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--terminal-header);
  padding: 0.75rem 1rem;
}

.terminal-buttons {
  display: flex;
  gap: 0.5rem;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-button.close {
  background-color: #ff5f56;
}

.terminal-button.minimize {
  background-color: #ffbd2e;
}

.terminal-button.maximize {
  background-color: #27c93f;
}

.terminal-title {
  color: var(--terminal-text);
  font-size: 0.9rem;
  opacity: 0.8;
}

.terminal-body {
  padding: 1.5rem;
  color: var(--terminal-text);
}

.terminal-prompt {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prompt-symbol {
  color: var(--terminal-prompt);
  font-weight: bold;
}

.command {
  color: var(--terminal-text);
}

.typing-animation {
  overflow: hidden;
  border-right: 2px solid var(--terminal-prompt);
  white-space: nowrap;
  animation: typing 3s steps(20, end), blink-caret 0.75s step-end infinite;
}

.cursor {
  color: var(--accent-color);
  animation: blink 1s infinite;
}

.terminal-output {
  margin-bottom: 1.5rem;
}

/* Client Stats */
.client-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
}

.stat-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
}

.stat-value {
  color: var(--terminal-string);
}

.stat-value.success {
  color: var(--terminal-prompt);
}

.terminal-separator {
  height: 1px;
  background-color: var(--terminal-header);
  margin: 1.5rem 0;
}

/* Client Grid */
.client-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.client-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
}

.client-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.client-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.client-logo-container {
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.client-logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.client-logo.grayscale {
  filter: grayscale(100%);
}

.client-card:hover .client-logo {
  transform: scale(1.05);
}

.client-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.client-card:hover .client-overlay {
  opacity: 1;
}

.client-info {
  text-align: center;
  padding: 1rem;
}

.client-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--terminal-text);
}

.client-industry {
  margin: 0;
  font-size: 0.9rem;
  color: var(--accent-color);
}

/* Terminal Actions */
.terminal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.terminal-button-primary, .terminal-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid var(--terminal-text);
  color: var(--terminal-text);
  cursor: pointer;
}

.terminal-button-primary {
  background-color: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.terminal-button-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.terminal-button-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Client Details Modal */
.client-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--terminal-bg);
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--terminal-header);
}

.modal-header h2 {
  margin: 0;
  color: var(--terminal-text);
}

.close-button {
  background: none;
  border: none;
  color: var(--terminal-text);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  gap: 2rem;
}

.modal-logo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-logo img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

.modal-details {
  flex: 2;
}

.detail-item {
  display: flex;
  margin-bottom: 0.75rem;
}

.detail-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
  min-width: 100px;
}

.detail-value {
  color: var(--terminal-string);
}

.client-description {
  margin-top: 1rem;
  color: var(--terminal-comment);
  font-style: italic;
}

/* Animations */
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: var(--terminal-prompt); }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .clients-container {
    max-width: 1400px;
  }
  
  .client-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .client-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .client-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .clients-section {
    padding: 3rem 1.5rem;
  }
  
  .client-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .modal-body {
    flex-direction: column;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .clients-section {
    padding: 2.5rem 1rem;
  }
  
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .client-logo-container {
    height: 100px;
  }
  
  .terminal-body {
    padding: 1rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .clients-section {
    padding: 2rem 0.8rem;
  }
  
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .client-logo-container {
    height: 90px;
  }
  
  .terminal-body {
    padding: 0.8rem;
  }
  
  .terminal-header {
    padding: 0.6rem 0.8rem;
  }
  
  .terminal-title {
    font-size: 0.8rem;
  }
  
  .terminal-button {
    width: 10px;
    height: 10px;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .clients-section {
    padding: 1.5rem 0.5rem;
  }
  
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }
  
  .client-logo-container {
    height: 80px;
  }
  
  .terminal-body {
    padding: 0.6rem;
  }
  
  .terminal-header {
    padding: 0.5rem 0.6rem;
  }
  
  .terminal-title {
    font-size: 0.7rem;
  }
  
  .terminal-button {
    width: 8px;
    height: 8px;
  }
  
  .client-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .detail-key {
    margin-bottom: 0.25rem;
  }
}
</style>