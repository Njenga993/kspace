<template>
  <section id="clients" class="clients-section">
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
              <p class="detail-description">{{ selectedClient.description }}</p>
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
    description: 'Developed a comprehensive web application for SEED SAVERS NETWORK KENYA to manage seed distribution, farmer networks, and agricultural resources across Kenya.'
  },
  {
    name: 'INOFO Africa',
    industry: 'Agriculture',
    logo: './inofo.JPG',
    project: 'Portfolio Website',
    year: '2025',
    technologies: ['REACT', 'Typescript', 'CSS', 'HTML'],
    description: 'Created a modern portfolio website for INOFO Africa to showcase their agricultural projects and initiatives.'
  },
  {
    name: 'GREANIA BUILD SOLUTIONS',
    industry: 'Construction Industry',
    logo: './Greania.JPG',
    project: 'Portfolio Website',
    year: '2025',
    technologies: ['REACT', 'Typescript', 'CSS', 'HTML'],
    description: 'Built a professional portfolio website for GREANIA BUILD SOLUTIONS to highlight their construction projects and services.'
  },
  {
    name: 'NYAKAZI ORGANICS',
    industry: 'Organic Products',
    logo: './Nyakazi.png',
    project: 'E-commerce Platform',
    year: '2024',
    technologies: ['REACT', 'Django', 'PostgreSQL'],
    description: 'Developed a full-featured e-commerce platform for NYAKAZI ORGANICS to sell organic products online with a seamless shopping experience.'
  },
  {
    name: 'POINT OF SALE',
    industry: 'Retail Technology',
    logo: './salehubPOS.png',
    project: 'Internal POS System',
    year: '2024',
    technologies: ['Next.js', 'Stripe', 'Sanity'],
    description: 'Created a point of sale system for retail businesses to manage inventory, sales, and customer relationships.'
  },
  {
    name: 'K-SPACE TECH SOLUTIONS',
    industry: 'IT Services',
    logo: './terminal.JPG',
    project: 'Personal Portfolio',
    year: '2023',
    technologies: ['VUE', 'Typescript', 'CSS', 'HTML'],
    description: 'Designed and developed a personal portfolio website to showcase technical skills and projects.'
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
/* Using the same theme variables as other components */
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
  --terminal-parameter: #ffa657;
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
/* Base Section Styles */
.clients-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
  background-color: var(--bg-color);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--text-color);
}

/* Terminal Container */
.clients-container {
  width: 100%;
  max-width: 1400px;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
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
  padding: 0.75rem clamp(1rem, 2vw, 1.5rem);
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
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  opacity: 0.8;
}

.terminal-body {
  padding: 0;
}

/* Terminal Elements */
.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
}

.prompt-symbol {
  color: var(--terminal-prompt);
  font-weight: bold;
}

.command {
  color: var(--terminal-text);
}

.cursor {
  color: var(--terminal-prompt);
  animation: blink 1s infinite;
}

.typing-animation {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--terminal-prompt);
  animation: typing 3s steps(20, end) infinite;
}

.terminal-output {
  margin-bottom: 1.5rem;
}

/* Client Stats */
.client-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-key {
  color: var(--terminal-property);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.stat-value {
  color: var(--terminal-string);
  font-weight: bold;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.stat-value.success {
  color: var(--terminal-prompt);
}

.terminal-separator {
  height: 1px;
  background-color: var(--terminal-header);
  margin: 0 0 1rem 0;
}

/* Client Grid */
.client-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 1rem;
}

.client-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
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
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.client-industry {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  color: var(--terminal-comment);
  margin: 0;
}

/* Terminal Actions */
.terminal-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.terminal-button-primary, .terminal-button-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  font-family: 'Fira Code', 'Courier New', monospace;
}

.terminal-button-primary {
  background-color: var(--accent-color);
  color: white;
  border: 1px solid var(--accent-color);
}

.terminal-button-primary:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.terminal-button-secondary {
  background-color: transparent;
  color: var(--terminal-text);
  border: 1px solid var(--terminal-text);
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
  max-width: 900px;
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
  font-size: clamp(1.2rem, 2vw, 1.5rem);
}

.close-button {
  background: none;
  border: none;
  color: var(--terminal-text);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
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
  margin-bottom: 1rem;
}

.detail-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
  min-width: 100px;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.detail-value {
  color: var(--terminal-string);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.detail-description {
  margin-top: 1rem;
  color: var(--terminal-comment);
  font-style: italic;
  line-height: 1.5;
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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
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
/* Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .client-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .client-grid {
    grid-template-columns: repeat(3, 1fr);
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
    padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
  }
  
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .client-card {
    padding: 1rem;
  }
  
  .client-logo-container {
    height: 100px;
  }
  
  .modal-body {
    flex-direction: column;
    gap: 1.5rem;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .clients-section {
    padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 3vw, 2rem);
  }
  
  .client-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
  
  .client-card {
    padding: 0.8rem;
  }
  
  .client-logo-container {
    height: 80px;
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.8rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .clients-section {
    padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem);
  }
  
  .client-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .client-card {
    padding: 0.6rem;
  }
  
  .client-logo-container {
    height: 70px;
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .modal-body {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .clients-section {
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.8rem, 3vw, 1rem);
  }
  
  .client-grid {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  
  .client-card {
    padding: 0.5rem;
  }
  
  .client-logo-container {
    height: 60px;
  }
  
  .terminal-actions {
    flex-direction: column;
    gap: 0.6rem;
  }
  
  .modal-body {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .modal-header {
    padding: 0.8rem 1rem;
  }
  
  .modal-header h2 {
    font-size: 1.1rem;
  }
  
  .detail-item {
    flex-direction: column;
    margin-bottom: 0.8rem;
  }
  
  .detail-key {
    min-width: 80px;
    font-size: 0.8rem;
  }
  
  .detail-value {
    font-size: 0.8rem;
  }
  
  .detail-description {
    font-size: 0.8rem;
  }
}
</style>