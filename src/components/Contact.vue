<template>
  <section id="contact" class="contact-section">
    <div class="section-container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-badge">
          <span class="badge-icon">📨</span>
          <span>CONTACT</span>
        </div>
        <h2 class="section-title">Get In Touch</h2>
        <div class="title-decoration">
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
        </div>
        <p class="section-subtitle">
          Have a project in mind or want to discuss opportunities? Let's connect.
        </p>
      </div>

      <div class="contact-container">
        <!-- Left: Contact Info -->
        <div class="contact-info">
          <div class="contact-image">
            <img src="/contact.jpg" alt="Kelvin Njenga Kamau" />
            <div class="image-frame"></div>
          </div>

          <div class="contact-details">
            <h3>Contact Information</h3>
            <div class="detail-item">
              <i class="fas fa-envelope"></i>
              <div>
                <span>Email</span>
                <a href="mailto:njengak993@gmail.com">njengak993@gmail.com</a>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <span>Location</span>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
            <div class="detail-item">
              <i class="fas fa-phone-alt"></i>
              <div>
                <span>Phone</span>
                <a href="tel:+254703642280">+254 703 642 280</a>
              </div>
            </div>

            <div class="social-links">
              <a href="https://github.com/Njenga993" target="_blank" aria-label="GitHub">
                <i class="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a href="https://x.com/kamau_nje/" target="_blank" aria-label="Twitter-x">
                <i class="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Form Content -->
        <div class="contact-form-area">
          <div v-if="formStatus === 'success'" class="form-status success">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
            <button @click="resetForm" class="action-button">
              Send Another Message
            </button>
          </div>

          <div v-else-if="formStatus === 'error'" class="form-status error">
            <i class="fas fa-exclamation-circle"></i>
            <h3>Something Went Wrong</h3>
            <p>Please try again or contact me directly at njengak993@gmail.com</p>
            <button @click="resetForm" class="action-button">
              Try Again
            </button>
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
            

            <div class="form-group">
              <label for="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                v-model="formData.name"
                placeholder="John Doe" 
                required 
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  v-model="formData.email"
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone (Optional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  v-model="formData.phone"
                  placeholder="+254 700 000 000" 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <select id="subject" name="subject" v-model="formData.subject" required>
                <option value="" disabled selected>Select a subject</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="budget">Estimated Budget (Optional)</label>
              <select id="budget" name="budget" v-model="formData.budget">
                <option value="" disabled selected>Select budget range</option>
                <option value="$500 – $1000">$500 – $1000</option>
                <option value="$1000 – $2500">$1000 – $2500</option>
                <option value="$2500+">$2500+</option>
                <option value="Not Sure">Not Sure Yet</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                v-model="formData.message"
                rows="5" 
                placeholder="Tell me about your project..." 
                required
              ></textarea>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="loading-spinner"></span>
            </button>
          </form>

          <iframe name="formsubmit-iframe" style="display: none;"></iframe>
        </div>
      </div>
    </div>

    <!-- Background Decorations -->
    <div class="bg-decorations">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
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
  subject: '',
  budget: '',
  message: ''
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
    subject: '',
    budget: '',
    message: ''
  };
};
</script>

<style scoped>
/* Base section styles */
.contact-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  position: relative;
  overflow: hidden;
  color: #e2e8f0;
  width: 100%;
  margin-left: 0;
  
}

body.dark-theme .contact-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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
  background: rgba(255, 92, 53, 0.1);
  color: #ff5c35;
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.badge-icon {
  font-size: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  background: #ff5c35;
  border-radius: 50%;
}

.decoration-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #ff5c35, #ff9a8b);
}

.section-subtitle {
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Container */
.contact-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;
}

.contact-info {
  flex: 1 1 40%;
  min-width: 300px;
}

.contact-form-area {
  flex: 1 1 45%;
}

/* Contact Image */
.contact-image {
  position: relative;
  width: 100%;
  max-width: 350px;
  margin-bottom: 2rem;
}

.contact-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.image-frame {
  position: absolute;
  top: -15px;
  left: -15px;
  right: 15px;
  bottom: 15px;
  border: 2px solid #ff5c35;
  border-radius: 20px;
  z-index: 1;
  transition: all 0.3s ease;
}

.contact-image:hover .image-frame {
  top: -20px;
  left: -20px;
  right: 20px;
  bottom: 20px;
}

/* Contact Details */
.contact-details {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.contact-details h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #f8fafc;
}

.detail-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item i {
  font-size: 1.2rem;
  color: #ff5c35;
  margin-top: 0.2rem;
}

.detail-item div {
  flex: 1;
}

.detail-item span {
  display: block;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.25rem;
}

.detail-item a, .detail-item p {
  color: #e2e8f0;
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.detail-item a:hover {
  color: #ff5c35;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #e2e8f0;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #ff5c35;
  color: white;
  transform: translateY(-3px);
}

/* Contact Form */
.contact-form {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1.5rem;
  margin-right: 1rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #94a3b8;
  font-weight: 500;
}

input, textarea, select {
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #ff5c35;
  box-shadow: 0 0 0 3px rgba(255, 92, 53, 0.2);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #ff5c35, #ff3c1a);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(255, 92, 53, 0.3);
}

.submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #ff3c1a, #e82e0e);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 92, 53, 0.4);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Form Status */
.form-status {
  background: rgba(30, 41, 59, 0.7);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.form-status i {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.form-status.success i {
  color: #28a745;
}

.form-status.error i {
  color: #dc3545;
}

.form-status h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.form-status p {
  color: #94a3b8;
  margin-bottom: 2rem;
}

.action-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #ff5c35;
  border: 2px solid #ff5c35;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button:hover {
  background: rgba(255, 92, 53, 0.1);
}

/* Background Decorations */
.bg-decorations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 92, 53, 0.1), rgba(255, 154, 139, 0.1));
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

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

/* Responsive Design */
@media (max-width: 992px) {
  .contact-container {
    flex-direction: column;
  }
  
  .contact-info, .contact-form-area {
    flex: 1 1 100%;
  }
  
  .contact-image {
    margin: 0 auto 2rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .contact-details, .contact-form {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 3rem 1rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .contact-image {
    max-width: 280px;
  }
  
  .form-status {
    padding: 1.5rem;
  }
  
  .form-status i {
    font-size: 2.5rem;
  }
  
  .form-status h3 {
    font-size: 1.3rem;
  }
}
</style>