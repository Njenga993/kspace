<template>
  <section id="contact" class="contact-section">
    <div class="terminal-container">
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">root@k-space:~# ./connect.sh</div>
      </div>

      <div class="terminal-body">
        <!-- Network Status -->
        <div class="network-status">
          <div class="status-line">
            <span class="status-text">Establishing secure connection...</span>
            <span class="status-indicator" :class="{ active: connectionActive }"></span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: connectionProgress + '%' }"></div>
          </div>
        </div>

        <!-- Terminal Tabs -->
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

        <!-- Tab Content -->
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
                    <img src="/profile.JPG" alt="Kelvin Kamau" class="avatar" />
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

              <!-- Contact Form -->
              <form
                v-else
                ref="contactForm"
                @submit.prevent="handleSubmit"
                class="contact-form"
              >
                <div class="form-grid">
                  <!-- Name Field -->
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
                    <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
                  </div>

                  <!-- Email Field -->
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
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                  </div>

                  <!-- Subject Field -->
                  <div class="form-group">
                    <label for="subject" class="form-label">
                      <span class="label-key">subject:</span>
                    </label>
                    <select 
                      id="subject" 
                      name="subject" 
                      v-model="formData.subject" 
                      required 
                      class="form-select"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                    <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
                  </div>

                  <!-- Message Field -->
                  <div class="form-group full-width">
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
                    <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="form-actions">
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
                </div>
              </form>
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

                <a href="https://x.com/kamau_nje" target="_blank" class="social-card twitter">
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

        <!-- Terminal Footer -->
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
const formStatus = ref(null);
const isSubmitting = ref(false);
const contactForm = ref(null);

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({
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

const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  // Validate name
  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required';
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters';
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required';
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email';
  }
  
  // Validate subject
  if (!formData.value.subject) {
    errors.value.subject = 'Please select a subject';
  }
  
  // Validate message
  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required';
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters';
  }
  
  return Object.values(errors.value).every(error => !error);
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // In a real implementation, you would send the form data to your backend
    // For this example, we'll simulate a submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Randomly determine success/error for demo (remove in production)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      formStatus.value = 'success';
      // Reset form after successful submission
      setTimeout(() => {
        resetForm();
      }, 5000);
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
  errors.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
};
</script>

<style scoped>
/* Base Section Styles */
.contact-section {
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
.terminal-container {
  width: 100%;
  max-width: 1000px;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.8s ease-out;
}

/* Terminal Header */
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

/* Terminal Body */
.terminal-body {
  padding: 0;
}

/* Network Status */
.network-status {
  padding: clamp(1rem, 2vw, 1.5rem);
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
  font-size: clamp(0.9rem, 1.2vw, 1rem);
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
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--terminal-header) transparent;
}

.terminal-tabs::-webkit-scrollbar {
  height: 6px;
}

.terminal-tabs::-webkit-scrollbar-track {
  background: transparent;
}

.terminal-tabs::-webkit-scrollbar-thumb {
  background-color: var(--terminal-header);
  border-radius: 3px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem clamp(0.75rem, 1.5vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.tab:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.tab.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom-color: var(--accent-color);
}

.tab-icon {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
}

.tab-text {
  color: var(--terminal-comment);
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
}

.tab.active .tab-text {
  color: var(--terminal-text);
}

/* Tab Content */
.tab-content {
  padding: clamp(1rem, 2vw, 1.5rem);
  min-height: 400px;
}

/* Terminal Prompt */
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

/* Profile Card */
.profile-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}

.avatar-container {
  position: relative;
}

.avatar {
  width: clamp(70px, 10vw, 80px);
  height: clamp(70px, 10vw, 80px);
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
  font-size: clamp(1.3rem, 2.5vw, 1.5rem);
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
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-icon {
  font-size: clamp(1rem, 1.5vw, 1.2rem);
}

.detail-key {
  color: var(--terminal-property);
  margin-right: 0.5rem;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.detail-value {
  color: var(--terminal-string);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
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
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.label-key {
  color: var(--terminal-property);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
}

.form-input, .form-select, .form-textarea {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(15, 23, 42, 0.7);
  color: var(--terminal-text);
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  transition: all 0.3s ease;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.error-message {
  color: var(--error-color);
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: clamp(1rem, 2vw, 1.5rem);
}

.submit-btn, .terminal-btn {
  display: inline-flex;
  align-items: center;
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
  font-size: clamp(0.9rem, 1.2vw, 1rem);
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
  font-size: clamp(1rem, 1.5vw, 1.2rem);
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

/* Form Status */
.form-status {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: clamp(1rem, 2vw, 1.5rem);
  border-left: 4px solid var(--accent-color);
}

.form-status.success {
  border-left-color: var(--success-color);
}

.form-status.error {
  border-left-color: var(--error-color);
}

.status-icon {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-top: 0.25rem;
}

.form-status.success .status-icon {
  color: var(--success-color);
}

.form-status.error .status-icon {
  color: var(--error-color);
}

.status-message h3 {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  margin: 0 0 0.5rem 0;
  color: var(--terminal-text);
}

.status-message p {
  margin: 0;
  color: var(--terminal-comment);
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.5;
}

/* Social Grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.social-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.5rem);
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
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
  width: clamp(40px, 8vw, 48px);
  height: clamp(40px, 8vw, 48px);
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.social-info {
  flex: 1;
}

.social-name {
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: var(--terminal-text);
}

.social-handle {
  font-size: clamp(0.8rem, 1.2vw, 0.9rem);
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

/* Terminal Footer */
.terminal-footer {
  padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem);
  border-top: 1px solid var(--terminal-header);
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 992px) {
  .profile-details {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .profile-details {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    text-align: center;
  }
  
  .form-status {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .profile-header {
    gap: 0.75rem;
  }
  
  .profile-name {
    font-size: 1.2rem;
  }
  
  .profile-details {
    gap: 0.75rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-actions {
    justify-content: center;
  }
  
  .social-card {
    padding: 1rem;
  }
}
</style>