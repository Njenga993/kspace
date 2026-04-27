<template>
  <section id="contact" class="contact">
    <div class="contact-container">
      <!-- Section Header -->
      <div class="contact-header">
        <div class="header-badge">
          <span class="badge-num">06</span>
          <span class="badge-text">CONNECT</span>
        </div>
        <h2 class="contact-title">
          Let's Work <span class="accent">Together</span>
        </h2>
        <div class="contact-underline"></div>
        <p class="contact-subtitle">
          Have a project in mind? Reach out and let's create something
          exceptional
        </p>
      </div>

      <!-- Status Indicator -->
      <div class="status-panel">
        <div class="status-row">
          <div class="status-label">
            <i class="fas fa-plug"></i>
            <span>CONNECTION STATUS</span>
          </div>
          <div class="status-indicator" :class="{ active: connectionActive }">
            <span class="status-dot"></span>
            <span>{{ connectionActive ? "ONLINE" : "CONNECTING..." }}</span>
          </div>
        </div>
        <div class="status-progress">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: connectionProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
          <div class="tab-indicator"></div>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Info Tab -->
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'info'" key="info" class="info-panel">
            <div class="profile-section">
              <div class="profile-image">
                <img src="/profile.JPG" alt="Kelvin Kamau" />
                <div class="profile-status"></div>
              </div>
              <div class="profile-details">
                <h3>KELVIN KAMAU</h3>
                <div class="profile-tags">
                  <span>FULL STACK DEVELOPER</span>
                  <span>UI ENGINEER</span>
                </div>
              </div>
            </div>

            <div class="contact-details">
              <div class="detail-row">
                <div class="detail-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="detail-content">
                  <label>LOCATION</label>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="detail-content">
                  <label>EMAIL</label>
                  <a href="mailto:njengak993@gmail.com">njengak993@gmail.com</a>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-icon">
                  <i class="fas fa-phone-alt"></i>
                </div>
                <div class="detail-content">
                  <label>PHONE</label>
                  <a href="tel:+254703642280">+254 703 642 280</a>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="detail-content">
                  <label>AVAILABILITY</label>
                  <span>Monday - Friday, 9:00 - 18:00 EAT</span>
                </div>
              </div>
            </div>

            <div class="availability-note">
              <i class="fas fa-bolt"></i>
              <span>Response time: within 24 hours</span>
            </div>
          </div>

          <!-- Message Tab -->
          <div
            v-else-if="activeTab === 'message'"
            key="message"
            class="message-panel"
          >
            <div v-if="formStatus === 'success'" class="form-feedback success">
              <i class="fas fa-check-circle"></i>
              <div class="feedback-content">
                <h4>Message Delivered</h4>
                <p>Thank you for reaching out. I'll respond within 24 hours.</p>
                <button @click="resetForm" class="feedback-btn">
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            </div>

            <div v-else-if="formStatus === 'error'" class="form-feedback error">
              <i class="fas fa-exclamation-triangle"></i>
              <div class="feedback-content">
                <h4>Transmission Failed</h4>
                <p>Please try again or contact me directly via email.</p>
                <button @click="resetForm" class="feedback-btn">RETRY</button>
              </div>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-field">
                  <label>NAME *</label>
                  <input
                    type="text"
                    v-model="formData.name"
                    placeholder="John Doe"
                    :class="{ error: errors.name }"
                  />
                  <span class="field-error" v-if="errors.name">{{
                    errors.name
                  }}</span>
                </div>
                <div class="form-field">
                  <label>EMAIL *</label>
                  <input
                    type="email"
                    v-model="formData.email"
                    placeholder="john@example.com"
                    :class="{ error: errors.email }"
                  />
                  <span class="field-error" v-if="errors.email">{{
                    errors.email
                  }}</span>
                </div>
              </div>

              <div class="form-field">
                <label>SUBJECT *</label>
                <select
                  v-model="formData.subject"
                  :class="{ error: errors.subject }"
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Other">Other</option>
                </select>
                <span class="field-error" v-if="errors.subject">{{
                  errors.subject
                }}</span>
              </div>

              <div class="form-field">
                <label>MESSAGE *</label>
                <textarea
                  v-model="formData.message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  :class="{ error: errors.message }"
                ></textarea>
                <span class="field-error" v-if="errors.message">{{
                  errors.message
                }}</span>
              </div>

              <button
                type="submit"
                class="submit-button"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">
                  <i class="fas fa-paper-plane"></i>
                  SEND MESSAGE
                </span>
                <span v-else class="submitting">
                  <i class="fas fa-spinner fa-pulse"></i>
                  SENDING...
                </span>
              </button>
            </form>
          </div>

          <!-- Social Tab -->
          <div
            v-else-if="activeTab === 'social'"
            key="social"
            class="social-panel"
          >
            <div class="social-links">
              <a
                href="https://github.com/Njenga993"
                target="_blank"
                rel="noopener"
                class="social-link github"
              >
                <div class="social-icon">
                  <i class="fab fa-github"></i>
                </div>
                <div class="social-info">
                  <h4>GitHub</h4>
                  <p>github.com/Njenga993</p>
                </div>
                <i class="fas fa-external-link-alt link-icon"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/kelvin-kamau-788160277/"
                target="_blank"
                rel="noopener"
                class="social-link linkedin"
              >
                <div class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </div>
                <div class="social-info">
                  <h4>LinkedIn</h4>
                  <p>kelvin-kamau</p>
                </div>
                <i class="fas fa-external-link-alt link-icon"></i>
              </a>

              <a
                href="https://x.com/kamau_nje"
                target="_blank"
                rel="noopener"
                class="social-link twitter"
              >
                <div class="social-icon">
                  <i class="fab fa-twitter"></i>
                </div>
                <div class="social-info">
                  <h4>Twitter</h4>
                  <p>@kamau_nje</p>
                </div>
                <i class="fas fa-external-link-alt link-icon"></i>
              </a>

              <a href="mailto:njengak993@gmail.com" class="social-link email">
                <div class="social-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="social-info">
                  <h4>Email</h4>
                  <p>njengak993@gmail.com</p>
                </div>
                <i class="fas fa-arrow-right link-icon"></i>
              </a>
            </div>

            <div class="social-note">
              <i class="fas fa-shield-alt"></i>
              <span>All social links open in a new tab</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Footer Note -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const activeTab = ref("info");
const connectionActive = ref(false);
const connectionProgress = ref(0);
const formStatus = ref(null);
const isSubmitting = ref(false);

const tabs = [
  { id: "info", label: "INFO", icon: "fas fa-user" },
  { id: "message", label: "MESSAGE", icon: "fas fa-envelope" },
  { id: "social", label: "SOCIAL", icon: "fas fa-share-alt" },
];

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

let progressInterval = null;

onMounted(() => {
  progressInterval = setInterval(() => {
    connectionProgress.value += 5;
    if (connectionProgress.value >= 100) {
      clearInterval(progressInterval);
      connectionActive.value = true;
    }
  }, 50);
});

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
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
    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (error) {
    formStatus.value = "error";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formStatus.value = null;
  formData.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  errors.value = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
};
</script>

<style scoped>
.contact {
  padding: 5rem 2rem;
  background: var(--bg-primary);
  position: relative;
}

.contact-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Header Styles */
.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  margin-bottom: 1.5rem;
}

.badge-num {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
}

.badge-text {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.contact-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: 1rem;
}

.contact-title .accent {
  color: var(--accent);
}

.contact-underline {
  width: 60px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto 1rem;
}

.contact-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Status Panel */
.status-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.status-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.status-label i {
  color: var(--accent);
  font-size: 0.8rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: #ef4444;
}

.status-indicator.active {
  color: #22c55e;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 1.5s ease-in-out infinite;
}

.status-indicator.active .status-dot {
  animation: none;
}

.progress-track {
  height: 2px;
  background: var(--bg-elevated);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.3s ease;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  border-bottom: 1px solid var(--border-dark);
  margin-bottom: 1.5rem;
}

.tab-button {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.tab-button i {
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.tab-button:hover {
  color: var(--text-silver);
}

.tab-button.active {
  color: var(--accent);
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.tab-button.active .tab-indicator {
  transform: scaleX(1);
}

/* Tab Content */
.tab-content {
  min-height: 450px;
}

/* Info Panel */
.info-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.5rem;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-dark);
}

.profile-image {
  position: relative;
  flex-shrink: 0;
}

.profile-image img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent);
  filter: grayscale(100%);
  transition: filter 0.3s;
}

.profile-image:hover img {
  filter: grayscale(0%);
}

.profile-status {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border-radius: 50%;
  border: 2px solid var(--bg-card);
}

.profile-details h3 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.profile-tags span {
  padding: 0.25rem 0.6rem;
  background: rgba(255, 94, 0, 0.15);
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.detail-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 94, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 0.9rem;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-content label {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.detail-content span,
.detail-content a {
  color: var(--text-silver);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color 0.2s;
}

.detail-content a:hover {
  color: var(--accent);
}

.availability-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-elevated);
  border-left: 2px solid var(--accent);
}

.availability-note i {
  color: var(--accent);
  font-size: 0.9rem;
}

.availability-note span {
  color: var(--text-muted);
  font-size: 0.75rem;
}

/* Message Panel */
.message-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.5rem;
}

.form-feedback {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border-left: 3px solid;
}

.form-feedback.success {
  border-left-color: #22c55e;
}

.form-feedback.error {
  border-left-color: #ef4444;
}

.form-feedback i {
  font-size: 2rem;
}

.form-feedback.success i {
  color: #22c55e;
}

.form-feedback.error i {
  color: #ef4444;
}

.feedback-content h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.5rem;
}

.feedback-content p {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.feedback-btn {
  background: transparent;
  border: 1px solid var(--border-default);
  padding: 0.5rem 1rem;
  color: var(--text-silver);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s;
}

.feedback-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

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

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field label {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-dim);
  letter-spacing: 0.1em;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: 0.65rem 0.85rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  color: var(--text-white);
  font-family: var(--font-body);
  font-size: 0.85rem;
  transition: all 0.3s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-field input.error,
.form-field select.error,
.form-field textarea.error {
  border-color: #ef4444;
}

.field-error {
  font-size: 0.7rem;
  color: #ef4444;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem;
  background: var(--accent);
  border: none;
  color: #000;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submitting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Social Panel */
.social-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  padding: 1.5rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border-dark);
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

.social-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 94, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  color: var(--accent);
  font-size: 1.2rem;
}

.social-info {
  flex: 1;
}

.social-info h4 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: 0.25rem;
}

.social-info p {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.link-icon {
  color: var(--text-dim);
  font-size: 0.8rem;
  transition: all 0.3s;
}

.social-link:hover .link-icon {
  color: var(--accent);
  transform: translateX(3px);
}

.social-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-elevated);
  border-left: 2px solid var(--accent);
}

.social-note i {
  color: var(--accent);
  font-size: 0.9rem;
}

.social-note span {
  color: var(--text-muted);
  font-size: 0.75rem;
}

/* Contact Footer */
.contact-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-dark);
}

.contact-footer p {
  color: var(--text-dim);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}

/* Animations */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .contact {
    padding: 3rem 1rem;
  }

  .contact-title {
    font-size: 1.8rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .profile-tags {
    justify-content: center;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-icon {
    margin-bottom: 0.5rem;
  }

  .tab-button span {
    display: none;
  }

  .tab-button i {
    margin-right: 0;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .status-row {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .form-feedback {
    flex-direction: column;
    text-align: center;
  }

  .form-feedback i {
    margin: 0 auto;
  }
}
</style>
