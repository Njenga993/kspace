<template>
  <section id="contact" class="contact-section">
    <div class="terminal-container">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close"></div>
          <div class="terminal-button minimize"></div>
          <div class="terminal-button maximize"></div>
        </div>
        <div class="terminal-title">contact@k-space:~</div>
      </div>
      
      <div class="terminal-body">
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">whoami</span>
        </div>
        
        <div class="terminal-output">
          <div class="identity-output">
            <div class="profile-section">
              <div class="profile-img-container">
                <img src="/contact.jpg" alt="Kelvin Njenga Kamau" class="profile-img" />
                <div class="status-indicator online"></div>
              </div>
              <div class="profile-info">
                <h3 class="profile-name">Kelvin Kamau</h3>
                <p class="profile-title">Full Stack Developer & UI Engineer</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">cat contact.json</span>
        </div>
        
        <div class="terminal-output">
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-key">"email":</span>
              <a href="mailto:njengak993@gmail.com" class="contact-value">
                "njengak993@gmail.com"
              </a>
            </div>
            <div class="contact-item">
              <span class="contact-key">"location":</span>
              <span class="contact-value">"Nairobi, Kenya"</span>
            </div>
            <div class="contact-item">
              <span class="contact-key">"phone":</span>
              <a href="tel:+254703642280" class="contact-value">
                "+254 703 642 280"
              </a>
            </div>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">git remote -v</span>
        </div>
        
        <div class="terminal-output">
          <div class="social-links">
            <a href="https://github.com/Njenga993" target="_blank" class="social-link">
              <div class="social-icon github">
                <i class="fab fa-github"></i>
              </div>
              <span class="social-name">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" class="social-link">
              <div class="social-icon linkedin">
                <i class="fab fa-linkedin-in"></i>
              </div>
              <span class="social-name">LinkedIn</span>
            </a>
            <a href="https://x.com/kamau_nje/" target="_blank" class="social-link">
              <div class="social-icon twitter">
                <i class="fab fa-twitter"></i>
              </div>
              <span class="social-name">Twitter</span>
            </a>
          </div>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command">./send_message.sh</span>
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
                <span class="btn-command">$ ./send_message.sh</span>
              </button>
            </div>
          </div>

          <div v-else-if="formStatus === 'error'" class="form-status error">
            <div class="status-icon">
              <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="status-message">
              <h3>Something Went Wrong</h3>
              <p>Please try again or contact me directly at njengak993@gmail.com</p>
              <button @click="resetForm" class="terminal-btn">
                <span class="btn-command">$ ./send_message.sh</span>
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
            
            <!-- Personal Information Section -->
            <div class="form-section">
              <div class="section-title">
                <span class="code-comment">// Personal Information</span>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">name=</span>
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
                    <span class="label-prompt">$</span>
                    <span class="label-text">email=</span>
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
              
              <div class="form-row">
                <div class="form-group">
                  <label for="phone" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">phone=</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    v-model="formData.phone"
                    placeholder="+254 700 000 000" 
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label for="company" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">company=</span>
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    v-model="formData.company"
                    placeholder="Your Company" 
                    class="form-input"
                  />
                </div>
              </div>
            </div>
            
            <!-- Project Details Section -->
            <div class="form-section">
              <div class="section-title">
                <span class="code-comment">// Project Details</span>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="subject" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">subject=</span>
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
                  <label for="timeline" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">timeline=</span>
                  </label>
                  <select id="timeline" name="timeline" v-model="formData.timeline" class="form-select">
                    <option value="" disabled selected>Select timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="budget" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">budget=</span>
                  </label>
                  <select id="budget" name="budget" v-model="formData.budget" class="form-select">
                    <option value="" disabled selected>Select budget range</option>
                    <option value="$500 – $1000">$500 – $1000</option>
                    <option value="$1000 – $2500">$1000 – $2500</option>
                    <option value="$2500 – $5000">$2500 – $5000</option>
                    <option value="$5000 – $10000">$5000 – $10000</option>
                    <option value="$10000+">$10000+</option>
                    <option value="Not Sure">Not Sure Yet</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="projectType" class="form-label">
                    <span class="label-prompt">$</span>
                    <span class="label-text">projectType=</span>
                  </label>
                  <select id="projectType" name="projectType" v-model="formData.projectType" class="form-select">
                    <option value="" disabled selected>Select project type</option>
                    <option value="Website">Website</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            
            <!-- Message Section -->
            <div class="form-section">
              <div class="section-title">
                <span class="code-comment">// Message</span>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">
                  <span class="label-prompt">$</span>
                  <span class="label-text">message=</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  v-model="formData.message"
                  rows="6" 
                  placeholder="Tell me about your project in detail..." 
                  required
                  class="form-textarea"
                ></textarea>
              </div>
              
              <div class="form-group">
                <label for="additionalInfo" class="form-label">
                  <span class="label-prompt">$</span>
                  <span class="label-text">additionalInfo=</span>
                </label>
                <textarea 
                  id="additionalInfo" 
                  name="additionalInfo" 
                  v-model="formData.additionalInfo"
                  rows="3" 
                  placeholder="Any additional information or requirements..." 
                  class="form-textarea"
                ></textarea>
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting" class="btn-text">
                <span class="btn-prompt">$</span>
                <span class="btn-command">./send_message.sh</span>
              </span>
              <span v-else class="loading">
                <span class="loading-text">Processing...</span>
                <span class="loading-dots">...</span>
              </span>
            </button>
          </form>

          <iframe name="formsubmit-iframe" style="display: none;"></iframe>
        </div>
        
        <div class="terminal-prompt">
          <span class="prompt-symbol">$</span>
          <span class="command cursor">_</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const formStatus = ref(null); // null, 'success', or 'error'
const isSubmitting = ref(false);
const contactForm = ref(null);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  timeline: '',
  budget: '',
  projectType: '',
  message: '',
  additionalInfo: ''
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
    phone: '',
    company: '',
    subject: '',
    timeline: '',
    budget: '',
    projectType: '',
    message: '',
    additionalInfo: ''
  };
};
</script>

<style scoped>
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
}

/* Base Section Styles */
.contact-section {
  padding: 6rem 2rem;
  background-color: var(--terminal-bg);
  font-family: 'Fira Code', 'Courier New', monospace;
  color: var(--terminal-text);
  width: 100vw;
  margin-left: -2rem;
  margin-bottom: -2rem;
  position: relative;
  z-index: 10;
}

.terminal-container {
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--terminal-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  justify-content: center;
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

/* Terminal Body */
.terminal-body {
  padding: 1.5rem;
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
  padding-left: 1.5rem;
}

/* Identity Output */
.identity-output {
  margin-bottom: 1.5rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.profile-img-container {
  position: relative;
}

.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #3fb950;
  border: 2px solid var(--terminal-bg);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: var(--accent-color);
}

.profile-title {
  font-size: 1.1rem;
  margin: 0;
  color: var(--terminal-function);
}

/* Contact Info */
.contact-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contact-key {
  color: var(--terminal-property);
}

.contact-value {
  color: var(--terminal-string);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-value:hover {
  color: var(--accent-color);
}

/* Social Links */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: translateY(-5px);
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--terminal-header);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--terminal-text);
  transition: all 0.3s ease;
}

.social-link:hover .social-icon {
  background-color: var(--accent-color);
  color: white;
}

.social-name {
  color: var(--terminal-comment);
  font-size: 0.9rem;
}

/* Contact Form */
.contact-form {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color);
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.label-prompt {
  color: var(--terminal-prompt);
  font-weight: bold;
}

.label-text {
  color: var(--terminal-property);
}

.form-input, .form-select, .form-textarea {
  width: 100%;
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
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled), .terminal-btn:hover {
  background-color: var(--accent-hover);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-prompt {
  color: var(--terminal-prompt);
  font-weight: bold;
  margin-right: 0.5rem;
}

.btn-command {
  color: white;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-text {
  margin-right: 0.5rem;
}

.loading-dots {
  animation: loading-dots 1.5s infinite;
}

@keyframes loading-dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
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
  color: #3fb950;
}

.form-status.error .status-icon {
  color: #ff7b72;
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

/* Code Syntax Highlighting */
.code-comment {
  color: var(--terminal-comment);
}

/* Animations */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Responsive Design */
/* Extra Large Desktop (1400px and up) */
@media (min-width: 1400px) {
  .terminal-container {
    max-width: 1200px;
  }
  
  .profile-img {
    width: 90px;
    height: 90px;
  }
  
  .profile-name {
    font-size: 1.7rem;
  }
  
  .profile-title {
    font-size: 1.2rem;
  }
  
  .contact-info {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

/* Large Desktop (1200px to 1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
  .terminal-container {
    max-width: 1100px;
  }
  
  .profile-img {
    width: 85px;
    height: 85px;
  }
  
  .profile-name {
    font-size: 1.6rem;
  }
  
  .profile-title {
    font-size: 1.15rem;
  }
}

/* Desktop (992px to 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .terminal-container {
    max-width: 1000px;
  }
  
  .terminal-body {
    padding: 1.2rem;
  }
  
  .profile-img {
    width: 75px;
    height: 75px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .contact-info {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

/* Tablet (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .terminal-container {
    max-width: 100%;
    margin: 0 1rem;
  }
  
  .terminal-body {
    padding: 1rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-img {
    width: 70px;
    height: 70px;
  }
  
  .profile-name {
    font-size: 1.4rem;
  }
  
  .profile-title {
    font-size: 1rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-row .form-group {
    margin-bottom: 1.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    justify-content: center;
  }
}

/* Mobile Landscape (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .terminal-container {
    max-width: 100%;
    margin: 0 0.5rem;
  }
  
  .terminal-body {
    padding: 0.8rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-img {
    width: 65px;
    height: 65px;
  }
  
  .profile-name {
    font-size: 1.3rem;
  }
  
  .profile-title {
    font-size: 0.95rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-row .form-group {
    margin-bottom: 1.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    justify-content: center;
    gap: 1rem;
  }
  
  .social-icon {
    width: 45px;
    height: 45px;
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
  
  .terminal-body {
    padding: 0.6rem;
  }
  
  .terminal-prompt {
    margin-bottom: 0.8rem;
  }
  
  .terminal-output {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-img {
    width: 60px;
    height: 60px;
  }
  
  .status-indicator {
    width: 12px;
    height: 12px;
    bottom: 3px;
    right: 3px;
  }
  
  .profile-name {
    font-size: 1.2rem;
  }
  
  .profile-title {
    font-size: 0.9rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-row .form-group {
    margin-bottom: 1.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    justify-content: center;
    gap: 0.8rem;
  }
  
  .social-icon {
    width: 40px;
    height: 40px;
  }
  
  .social-name {
    font-size: 0.8rem;
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
  
  .terminal-body {
    padding: 0.5rem;
  }
  
  .terminal-prompt {
    margin-bottom: 0.8rem;
  }
  
  .terminal-output {
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }
  
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-img {
    width: 55px;
    height: 55px;
  }
  
  .status-indicator {
    width: 10px;
    height: 10px;
    bottom: 2px;
    right: 2px;
  }
  
  .profile-name {
    font-size: 1.1rem;
  }
  
  .profile-title {
    font-size: 0.85rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-row .form-group {
    margin-bottom: 1.5rem;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
  
  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  
  .social-links {
    justify-content: center;
    gap: 0.8rem;
  }
  
  .social-icon {
    width: 35px;
    height: 35px;
  }
  
  .social-name {
    font-size: 0.7rem;
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