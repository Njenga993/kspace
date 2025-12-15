<template>
  <section id="contact" class="contact-section">
    <div class="terminal-container">
      <div class="terminal-header">
        
        <div class="terminal-title">root@k-space:~# ./connect.sh</div>
      </div>
      
      <div class="terminal-body">
        <div class="network-status">
          <div class="status-line">
            <span class="status-text">Establishing secure connection...</span>
            <span class="status-indicator" :class="{ active: connectionActive }"></span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: connectionProgress + '%' }"></div>
          </div>
        </div>
        
        <div class="terminal-tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'info' }" 
            @click="activeTab = 'info'"
          >
            <span class="tab-icon">ℹ️</span>
            <span class="tab-text">info</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'message' }" 
            @click="activeTab = 'message'"
          >
            <span class="tab-icon">✉️</span>
            <span class="tab-text">message</span>
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'social' }" 
            @click="activeTab = 'social'"
          >
            <span class="tab-icon">🌐</span>
            <span class="tab-text">social</span>
          </div>
        </div>
        
        <div class="tab-content">
          <!-- Info Tab -->
          <div v-if="activeTab === 'info'" class="info-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">cat profile.json</span>
            </div>
            
            <div class="terminal-output">
              <div class="profile-card">
                <div class="profile-header">
                  <div class="avatar-container">
                    <img src="/contact.jpg" alt="Kelvin Kamau" class="avatar" />
                    <div class="status-indicator online"></div>
                  </div>
                  <div class="profile-info">
                    <h2 class="profile-name">Kelvin Kamau</h2>
                    <div class="profile-tags">
                      <span class="tag">Full Stack Developer</span>
                      <span class="tag">UI/UX Engineer</span>
                    </div>
                  </div>
                </div>
                
                <div class="profile-details">
                  <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <span class="detail-key">location:</span>
                    <span class="detail-value">Nairobi, Kenya</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📧</span>
                    <span class="detail-key">email:</span>
                    <a href="mailto:njengak993@gmail.com" class="detail-value link">
                      njengak993@gmail.com
                    </a>
                  </div>
                  <div class="detail-item">
                    <span class="detail-icon">📱</span>
                    <span class="detail-key">phone:</span>
                    <a href="tel:+254703642280" class="detail-value link">
                      +254 703 642 280
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Message Tab -->
          <div v-if="activeTab === 'message'" class="message-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">./compose_message.sh</span>
            </div>
            
            <div class="terminal-output">
              <div v-if="formStatus === 'success'" class="form-status success">
                <div class="status-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <div class="status-message">
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  <button @click="resetForm" class="terminal-btn">
                    <span class="btn-command">$ ./compose_message.sh</span>
                  </button>
                </div>
              </div>

              <div v-else-if="formStatus === 'error'" class="form-status error">
                <div class="status-icon">
                  <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="status-message">
                  <h3>Connection Error</h3>
                  <p>Please try again or contact me directly at njengak993@gmail.com</p>
                  <button @click="resetForm" class="terminal-btn">
                    <span class="btn-command">$ ./compose_message.sh</span>
                  </button>
                </div>
              </div>

              <form
                v-else
                ref="contactForm"
                action="https://formsubmit.co/kamaukelvin077@gmail.com"
                method="POST"
                target="formsubmit-iframe"
                @submit.prevent="handleSubmit"
                class="contact-form"
              >
                <!-- Hidden config -->
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div class="form-grid">
                  <div class="form-group">
                    <label for="name" class="form-label">
                      <span class="label-key">name:</span>
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      v-model="formData.name"
                      placeholder="John Doe" 
                      required 
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">
                      <span class="label-key">email:</span>
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      v-model="formData.email"
                      placeholder="john@example.com" 
                      required 
                      class="form-input"
                    />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">
                    <span class="label-key">subject:</span>
                  </label>
                  <select id="subject" name="subject" v-model="formData.subject" required class="form-select">
                    <option value="" disabled selected>Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">
                    <span class="label-key">message:</span>
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    v-model="formData.message"
                    rows="6" 
                    placeholder="Tell me about your project..." 
                    required
                    class="form-textarea"
                  ></textarea>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="!isSubmitting" class="btn-text">
                    <span class="btn-icon">📤</span>
                    <span class="btn-command">send_message()</span>
                  </span>
                  <span v-else class="loading">
                    <span class="loading-spinner"></span>
                    <span class="loading-text">Transmitting...</span>
                  </span>
                </button>
              </form>

              <iframe name="formsubmit-iframe" style="display: none;"></iframe>
            </div>
          </div>
          
          <!-- Social Tab -->
          <div v-if="activeTab === 'social'" class="social-tab">
            <div class="terminal-prompt">
              <span class="prompt-symbol">$</span>
              <span class="command">ls -la /social/</span>
            </div>
            
            <div class="terminal-output">
              <div class="social-grid">
                <a href="https://github.com/Njenga993" target="_blank" class="social-card github">
                  <div class="social-icon">
                    <i class="fab fa-github"></i>
                  </div>
                  <div class="social-info">
                    <h3 class="social-name">GitHub</h3>
                    <p class="social-handle">@Njenga993</p>
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="social-card linkedin">
                  <div class="social-icon">
                    <i class="fab fa-linkedin-in"></i>
                  </div>
                  <div class="social-info">
                    <h3 class="social-name">LinkedIn</h3>
                    <p class="social-handle">kelvin-kamau</p>
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </a>
                
                <a href="https://x.com/kamau_nje/" target="_blank" class="social-card twitter">
                  <div class="social-icon">
                    <i class="fab fa-twitter"></i>
                  </div>
                  <div class="social-info">
                    <h3 class="social-name">Twitter</h3>
                    <p class="social-handle">@kamau_nje</p>
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </a>
                
                <a href="mailto:njengak993@gmail.com" class="social-card email">
                  <div class="social-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="social-info">
                    <h3 class="social-name">Email</h3>
                    <p class="social-handle">njengak993@gmail.com</p>
                  </div>
                  <div class="social-arrow">
                    <i class="fas fa-arrow-right"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-footer">
          <div class="terminal-prompt">
            <span class="prompt-symbol">$</span>
            <span class="command cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeTab = ref('info');
const connectionActive = ref(false);
const connectionProgress = ref(0);
const formStatus = ref(null); // null, 'success', or 'error'
const isSubmitting = ref(false);
const contactForm = ref(null);

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

onMounted(() => {
  // Simulate connection establishment
  const interval = setInterval(() => {
    connectionProgress.value += 5;
    if (connectionProgress.value >= 100) {
      clearInterval(interval);
      connectionActive.value = true;
    }
  }, 50);
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  try {
    // Simulate form submission (replace with actual form submission)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Randomly determine success/error for demo (remove in production)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      formStatus.value = 'success';
      // In production, this would happen after actual form submission
      contactForm.value.submit();
    } else {
      formStatus.value = 'error';
    }
  } catch (error) {
    formStatus.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formStatus.value = null;
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>

<style>
/* Terminal Theme Variables */
:root {
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
  --accent-color: #58a6ff;
  --accent-hover: #1f6feb;
  --success-color: #3fb950;
  --error-color: #ff7b72;
}
</style>

<style scoped>
/* Base Section Styles */
.contact-section {
  padding: 6rem 2rem;
  background-color: var(--terminal-bg);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--terminal-text);
  width: 100vw;
  width: calc(95% + 2rem);
  margin-left: -2rem;
  margin-bottom: -2rem;
  position: relative;
  z-index: 10;
}

.terminal-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Terminal Header */
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

/* Network Status */
.network-status {
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
}

.status-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.status-text {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--error-color);
  transition: background-color 0.3s ease;
}

.status-indicator.active {
  background-color: var(--success-color);
  box-shadow: 0 0 5px var(--success-color);
}

.progress-bar {
  height: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--accent-color);
  transition: width 0.3s ease;
}

/* Terminal Tabs */
.terminal-tabs {
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--terminal-header);
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.tab.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: var(--accent-color);
}

.tab-icon {
  font-size: 1rem;
}

.tab-text {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

.tab.active .tab-text {
  color: var(--terminal-text);
}

/* Terminal Body */
.terminal-body {
  padding: 0;
}

.tab-content {
  padding: 1.5rem;
  min-height: 400px;
}

.terminal-prompt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.terminal-output {
  margin-bottom: 1.5rem;
}

.terminal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--terminal-header);
}

/* Profile Card */
.profile-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.status-indicator.online {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--success-color);
  border: 2px solid var(--terminal-bg);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: rgba(88, 166, 255, 0.2);
  color: var(--accent-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon {
  font-size: 1rem;
}

.detail-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
}

.detail-value {
  color: var(--terminal-string);
}

.detail-value.link {
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail-value.link:hover {
  color: var(--accent-color);
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.label-key {
  color: var(--terminal-property);
}

.form-input, .form-select, .form-textarea {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(15, 23, 42, 0.7);
  color: var(--terminal-text);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23e6edf3' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658c-0.599.111-.793-.261-.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn, .terminal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled), .terminal-btn:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1rem;
}

.btn-command {
  color: white;
}

.loading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: white;
}

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.social-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

.social-card.github:hover {
  border-left-color: #333;
}

.social-card.linkedin:hover {
  border-left-color: #0077b5;
}

.social-card.twitter:hover {
  border-left-color: #1da1f2;
}

.social-card.email:hover {
  border-left-color: #ea4335;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
}

.social-card.github .social-icon {
  background-color: #333;
}

.social-card.linkedin .social-icon {
  background-color: #0077b5;
}

.social-card.twitter .social-icon {
  background-color: #1da1f2;
}

.social-card.email .social-icon {
  background-color: #ea4335;
}

.social-info {
  flex: 1;
}

.social-name {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.social-handle {
  font-size: 0.9rem;
  margin: 0;
  color: var(--terminal-comment);
}

.social-arrow {
  color: var(--terminal-comment);
  transition: all 0.3s ease;
}

.social-card:hover .social-arrow {
  color: var(--accent-color);
  transform: translateX(3px);
}

/* Form Status */
.form-status {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.status-icon {
  font-size: 2rem;
}

.form-status.success .status-icon {
  color: var(--success-color);
}

.form-status.error .status-icon {
  color: var(--error-color);
}

.status-message h3 {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.status-message p {
  margin: 0 0 1.5rem 0;
  color: var(--terminal-comment);
}

/* Animations */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .terminal-container {
    max-width: 1000px;
  }
  
  .avatar {
    width: 90px;
    height: 90px;
  }
  
  .profile-name {
    font-size: 1.7rem;
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .terminal-container {
    max-width: 950px;
  }
  
  .avatar {
    width: 85px;
    height: 85px;
  }
  
  .profile-name {
    font-size: 1.6rem;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .terminal-container {
    max-width: 900px;
  }
  
  .tab-content {
    padding: 1.2rem;
  }
  
  .avatar {
    width: 75px;
    height: 75px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .terminal-container {
    max-width: 100%;
    margin: 0 1rem;
  }
  
  .tab-content {
    padding: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .terminal-container {
    max-width: 100%;
    margin: 0 0.5rem;
  }
  
  .tab-content {
    padding: 0.8rem;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar {
    width: 65px;
    height: 65px;
  }
  
  .profile-name {
    font-size: 1.3rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .form-status {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}

/* Mobile Portrait (480px to 575px) */
@media (min-width: 480px) and (max-width: 575px) {
  .terminal-container {
    max-width: 100%;
    margin: 0;
  }
  
  .tab-content {
    padding: 0.6rem;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
  }
  
  .profile-name {
    font-size: 1.2rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .form-status {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .status-icon {
    font-size: 1.5rem;
  }
  
  .status-message h3 {
    font-size: 1.1rem;
  }
}

/* Small Mobile (320px to 479px) */
@media (max-width: 479px) {
  .terminal-container {
    max-width: 100%;
    margin: 0;
  }
  
  .tab-content {
    padding: 0.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .avatar {
    width: 55px;
    height: 55px;
  }
  
  .profile-name {
    font-size: 1.1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .form-status {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .status-icon {
    font-size: 1.3rem;
  }
  
  .status-message h3 {
    font-size: 1rem;
  }
  
  .status-message p {
    font-size: 0.9rem;
  }
  
  .form-input, .form-select, .form-textarea {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
  
  .form-textarea {
    min-height: 120px;
  }
  
  .submit-btn, .terminal-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>