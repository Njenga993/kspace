<template>
  <section id="contact" class="contact-premium">
    <div class="contact-container">
      <!-- Top Bar - Matching hero status bar -->
      <div class="contact-topbar">
        <div class="topbar-id">
          <span class="id-dot"></span>
          <span class="id-text">CONNECT</span>
        </div>
        <div class="topbar-status">
          <span class="status-dot"></span>
          <span class="status-text">AVAILABLE FOR WORK</span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="contact-main">
        <!-- Left: Typography Block - Matching hero left side -->
        <div class="contact-type">
          <h2 class="contact-headline">
            <span class="t-line">Let's Build</span>
            <span class="t-line t-outline">Something</span>
            <span class="t-line t-accent">Great</span>
          </h2>

          <p class="contact-desc">
            Have a project in mind? Reach out and let's create something 
            exceptional together. I respond within 24 hours.
          </p>

          <!-- Contact Methods - Matching hero badge style -->
          <div class="contact-methods">
            <a href="mailto:njengak993@gmail.com" class="method-card">
              <span class="method-icon"><i class="fas fa-envelope"></i></span>
              <div class="method-info">
                <span class="method-label">EMAIL</span>
                <span class="method-value">njengak993@gmail.com</span>
              </div>
            </a>
            <a href="tel:+254703642280" class="method-card">
              <span class="method-icon"><i class="fas fa-phone-alt"></i></span>
              <div class="method-info">
                <span class="method-label">PHONE</span>
                <span class="method-value">+254 703 642 280</span>
              </div>
            </a>
            <div class="method-card">
              <span class="method-icon"><i class="fas fa-map-marker-alt"></i></span>
              <div class="method-info">
                <span class="method-label">LOCATION</span>
                <span class="method-value">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          <!-- Social Links - Matching hero bottom socials -->
          <div class="contact-socials">
            <a href="https://github.com/Njenga993" target="_blank" rel="noopener" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://x.com/kamau_nje" target="_blank" rel="noopener" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        <!-- Right: Contact Form - Matching hero right showcase -->
        <div class="contact-form-wrap">
          <!-- Status Terminal -->
          <div class="form-terminal">
            <div class="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="terminal-content">
              <div class="code-line">
                <span class="prompt">~/connect $</span>
                <span>init-contact --secure</span>
              </div>
              <div class="code-line">
                <span class="prompt">></span>
                <span class="accent-text">{{ formStatus === 'success' ? 'Message delivered successfully' : 'Ready to receive your message...' }}</span>
              </div>
            </div>
          </div>

          <!-- Form or Success State -->
          <transition name="form-fade" mode="out-in">
            <div v-if="formStatus === 'success'" key="success" class="form-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3 class="success-title">Message Delivered</h3>
              <p class="success-desc">Thank you for reaching out. I'll respond within 24 hours.</p>
              <button @click="resetForm" class="success-btn">
                SEND ANOTHER MESSAGE
              </button>
            </div>

            <form v-else key="form" @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label>NAME *</label>
                  <input
                    type="text"
                    v-model="formData.name"
                    placeholder="John Doe"
                    :class="{ error: errors.name }"
                  />
                  <span class="field-error" v-if="errors.name">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label>EMAIL *</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    placeholder="john@example.com"
                    :class="{ error: errors.email }"
                  />
                  <span class="field-error" v-if="errors.email">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-group">
                <label>SUBJECT *</label>
                <select v-model="formData.subject" :class="{ error: errors.subject }">
                  <option value="" disabled>Select a subject</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Other">Other</option>
                </select>
                <span class="field-error" v-if="errors.subject">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label>MESSAGE *</label>
                <textarea
                  v-model="formData.message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  :class="{ error: errors.message }"
                ></textarea>
                <span class="field-error" v-if="errors.message">{{ errors.message }}</span>
              </div>

              <button type="submit" class="form-submit" :disabled="isSubmitting">
                <span v-if="!isSubmitting">
                  <span class="btn-idx">01</span>
                  <span class="btn-label">SEND MESSAGE</span>
                  <span class="btn-arrow"><i class="fas fa-paper-plane"></i></span>
                </span>
                <span v-else class="submitting">
                  <i class="fas fa-spinner fa-pulse"></i> SENDING...
                </span>
              </button>
            </form>
          </transition>
        </div>
      </div>

      <!-- Bottom Bar - Matching hero trust stats -->
      <div class="contact-bottombar">
        <div class="bottom-stats">
          <div class="b-stat">
            <span class="b-stat-num">24h</span>
            <span class="b-stat-label">RESPONSE</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">100%</span>
            <span class="b-stat-label">COMMITTED</span>
          </div>
          <span class="b-stat-sep">/</span>
          <div class="b-stat">
            <span class="b-stat-num">EAT</span>
            <span class="b-stat-label">UTC+3</span>
          </div>
        </div>
        <div class="bottom-copyright">
          <span>{{ new Date().getFullYear() }} Kelvin Kamau</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const formStatus = ref(null);
const isSubmitting = ref(false);

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const validateForm = () => {
  let isValid = true;
  errors.value = { name: "", email: "", subject: "", message: "" };

  if (!formData.value.name.trim()) {
    errors.value.name = "Name is required";
    isValid = false;
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = "Name must be at least 2 characters";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.value.email.trim()) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!formData.value.subject) {
    errors.value.subject = "Please select a subject";
    isValid = false;
  }

  if (!formData.value.message.trim()) {
    errors.value.message = "Message is required";
    isValid = false;
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  isSubmitting.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    formStatus.value = "success";
  } catch (error) {
    formStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formStatus.value = null;
  formData.value = { name: "", email: "", subject: "", message: "" };
  errors.value = { name: "", email: "", subject: "", message: "" };
};
</script>

<style scoped>
/* ==============================
   SECTION - Matching hero card style
   ============================== */
.contact-premium {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 3rem;
}

.contact-container {
  background: var(--bg-primary, #0b0f13);
  border: 1px solid var(--border-dark, rgba(255, 255, 255, 0.08));
  border-radius: 2.5rem;
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  box-shadow: var(--shadow-card, 0 18px 35px -12px rgba(0, 0, 0, 0.6));
}

/* ==============================
   TOP BAR - Matching hero status bar
   ============================== */
.contact-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.topbar-id {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.id-dot {
  width: 6px;
  height: 6px;
  background: var(--accent, #c9a23b);
  border-radius: 50%;
}

.id-text {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted, #7b8694);
  letter-spacing: 0.2em;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: softPulse 2s infinite;
}

.status-text {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.15em;
}

/* ==============================
   MAIN - Matching hero split layout
   ============================== */
.contact-main {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 5rem;
  align-items: start;
}

/* ==============================
   LEFT: TYPOGRAPHY - Matching hero left side
   ============================== */
.contact-type {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.contact-headline {
  margin: 0;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.t-line {
  display: block;
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: var(--text-white, #f0f2f5);
}

.t-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--text-white);
  paint-order: stroke fill;
}

.t-accent {
  color: var(--accent, #c9a23b);
}

.contact-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  max-width: 480px;
  margin: 0;
}

/* Contact Methods - Matching hero stat cards */
.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 1.2rem;
  text-decoration: none;
  transition: all 0.25s;
}

a.method-card:hover {
  border-color: var(--accent, #c9a23b);
  transform: translateY(-2px);
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.5);
}

.method-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 162, 59, 0.08);
  border: 1px solid var(--border-default, rgba(201, 162, 59, 0.25));
  color: var(--accent, #c9a23b);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.method-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.method-label {
  font-family: var(--font-heading);
  font-size: 0.5rem;
  font-weight: 600;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.15em;
}

.method-value {
  font-size: 0.78rem;
  color: var(--text-silver, #b0b8c1);
}

/* Social Links - Matching hero bottom socials */
.contact-socials {
  display: flex;
  gap: 0.6rem;
}

.contact-socials a {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  border: 1px solid var(--border-dark);
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.contact-socials a:hover {
  color: var(--accent, #c9a23b);
  border-color: var(--accent, #c9a23b);
  transform: translateY(-2px);
}

/* ==============================
   RIGHT: FORM - Matching hero right showcase
   ============================== */
.contact-form-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* Terminal - Matching hero terminal */
.form-terminal {
  background: #0a0e12;
  border: 1px solid var(--border-dark);
  border-radius: 1.5rem;
  padding: 1.4rem 1.4rem 1rem;
  box-shadow: var(--shadow-sm, 0 8px 18px rgba(0, 0, 0, 0.4));
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: #b0bec5;
  transition: box-shadow 0.3s, border-color 0.2s;
}

.form-terminal:hover {
  border-color: var(--border-light, rgba(201, 162, 59, 0.45));
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.7);
}

.terminal-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.terminal-dots span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #3a3f47;
}

.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.terminal-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.code-line {
  display: flex;
  gap: 0.6rem;
  font-size: 0.78rem;
}

.prompt {
  color: var(--accent, #c9a23b);
  font-weight: 600;
  flex-shrink: 0;
}

.accent-text {
  color: var(--accent, #c9a23b);
  font-weight: 600;
}

/* Form Fade Transition */
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 0.22s ease;
}

.form-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.form-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.7rem 0.85rem;
  background: var(--bg-card, #141a20);
  border: 1px solid var(--border-dark);
  border-radius: 0.8rem;
  color: var(--text-white);
  font-family: var(--font-heading);
  font-size: 0.82rem;
  transition: all 0.3s;
  outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--accent, #c9a23b);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: var(--bg-card);
  color: var(--text-white);
}

.field-error {
  font-size: 0.62rem;
  color: #ef4444;
}

/* Submit Button - Matching hero button style */
.form-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 0;
  background: none;
  border: none;
  border-bottom: 2px solid var(--accent, #c9a23b);
  cursor: pointer;
  transition: all 0.35s ease;
  width: fit-content;
  margin-top: 0.5rem;
}

.form-submit:hover:not(:disabled) {
  border-bottom-color: #dbb24a;
}

.form-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-idx {
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: 0.05em;
}

.btn-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-white);
  letter-spacing: 0.08em;
}

.btn-arrow {
  display: flex;
  align-items: center;
  color: var(--accent, #c9a23b);
  font-size: 0.75rem;
  transition: transform 0.35s ease;
}

.form-submit:hover .btn-arrow {
  transform: translateX(4px);
}

.submitting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent, #c9a23b);
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
}

/* Success State */
.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 2rem;
}

.success-icon {
  font-size: 3rem;
  color: #22c55e;
}

.success-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
}

.success-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin: 0;
}

.success-btn {
  padding: 0.6rem 1.25rem;
  background: none;
  border: 1px solid var(--border-default);
  border-radius: 2rem;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-silver);
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 0.5rem;
}

.success-btn:hover {
  border-color: var(--accent, #c9a23b);
  color: var(--accent, #c9a23b);
}

/* ==============================
   BOTTOM BAR - Matching hero trust stats
   ============================== */
.contact-bottombar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.8rem;
  border-top: 1px solid var(--border-dark);
}

.bottom-stats {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.b-stat {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.b-stat-num {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent, #c9a23b);
  letter-spacing: -0.01em;
}

.b-stat-label {
  font-family: var(--font-heading);
  font-size: 0.55rem;
  font-weight: 600;
  color: var(--text-dim, #5a6572);
  letter-spacing: 0.1em;
}

.b-stat-sep {
  color: var(--border-default);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0 0.15rem;
}

.bottom-copyright {
  font-size: 0.65rem;
  color: var(--text-dim);
}

/* ==============================
   ANIMATIONS
   ============================== */
@keyframes softPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.9); }
}

/* ==============================
   RESPONSIVE
   ============================== */
@media (max-width: 1024px) {
  .contact-main {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-premium {
    padding: 2rem 2rem;
  }

  .contact-container {
    padding: 2rem 2rem;
  }
}

@media (max-width: 768px) {
  .contact-premium {
    padding: 1.5rem;
  }

  .contact-container {
    padding: 2rem 1.5rem;
    border-radius: 2rem;
  }

  .t-line {
    font-size: clamp(2rem, 7vw, 3rem);
  }

  .t-outline {
    -webkit-text-stroke-width: 1px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-bottombar {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .contact-premium {
    padding: 1rem;
  }

  .contact-container {
    padding: 1.5rem 1.25rem;
    border-radius: 1.5rem;
  }

  .t-line {
    font-size: clamp(1.8rem, 8vw, 2.5rem);
  }
}
</style>