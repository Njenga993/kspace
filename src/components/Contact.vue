<template>
  <section id="contact" class="contact-section">
    <div class="contact-card">

      <!-- Top bar -->
      <div class="top-bar">
        <div class="section-label">
          <span class="label-dot"></span>
          <span class="label-text">Connect</span>
        </div>
        <div class="avail-badge">
          <span class="pulse-dot"></span>
          <span>Available for work</span>
        </div>
      </div>

      <!-- Main grid -->
      <div class="main-grid">

        <!-- LEFT: headline + contact info -->
        <div class="left-col">

          <div class="headline-block">
            <p class="eyebrow">Get In Touch</p>
            <h2 class="headline">
              <span class="hl-solid">Let's Build</span>
              <span class="hl-outline">Something</span>
              <span class="hl-accent">Great</span>
            </h2>
            <p class="sub-desc">
              Have a project in mind? Reach out and let's create something
              exceptional together. I respond within 24 hours.
            </p>
          </div>

          <!-- Contact method cards -->
          <div class="methods-list">
            <a href="mailto:kamaukelvin077@gmail.com" class="method-card">
              <div class="mc-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="mc-info">
                <span class="mc-label">Email</span>
                <span class="mc-value">kamaukelvin077@gmail.com</span>
              </div>
              <i class="fas fa-arrow-right mc-arrow"></i>
            </a>

            <a href="tel:+254703642280" class="method-card">
              <div class="mc-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="mc-info">
                <span class="mc-label">Phone</span>
                <span class="mc-value">+254 703 642 280</span>
              </div>
              <i class="fas fa-arrow-right mc-arrow"></i>
            </a>

            <div class="method-card method-card--static">
              <div class="mc-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="mc-info">
                <span class="mc-label">Location</span>
                <span class="mc-value">Nairobi, Kenya · EAT (UTC+3)</span>
              </div>
            </div>
          </div>

          <!-- Availability card -->
          <div class="avail-card">
            <div class="ac-top">
              <span class="pulse-dot pulse-dot--sm"></span>
              <span class="ac-status">Currently Available</span>
            </div>
            <p class="ac-desc">
              Open to freelance projects, full-time roles, and consulting engagements.
              Specialising in full-stack systems, e-commerce, and SaaS platforms.
            </p>
            <div class="ac-tags">
              <span class="ac-tag">Freelance</span>
              <span class="ac-tag">Full-time</span>
              <span class="ac-tag">Remote</span>
              <span class="ac-tag">On-site Nairobi</span>
            </div>
          </div>

          <!-- Socials -->
          <div class="socials-row">
            <a href="https://github.com/Njenga993" target="_blank" rel="noopener" class="social-link" aria-label="GitHub">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://x.com/kamau_nje" target="_blank" rel="noopener" class="social-link" aria-label="X / Twitter">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="mailto:kamaukelvin077@gmail.com" class="social-link" aria-label="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>

        </div>

        <!-- RIGHT: form -->
        <div class="right-col">

          <!-- Terminal -->
          <div class="terminal-card">
            <div class="terminal-dots"><span></span><span></span><span></span></div>
            <div class="t-lines">
              <div class="t-line-row">
                <span class="t-prompt">~/connect $</span>
                <span class="t-cmd">init-contact --secure</span>
              </div>
              <div class="t-line-row">
                <span class="t-prompt">›</span>
                <span class="t-accent-out">
                  {{ formStatus === 'success' ? 'Message delivered successfully ✓' : 'Ready to receive your message...' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Form / Success -->
          <Transition name="form-fade" mode="out-in">

            <!-- Success state -->
            <div v-if="formStatus === 'success'" key="success" class="success-panel">
              <div class="sp-icon">
                <i class="fas fa-check"></i>
              </div>
              <h3 class="sp-title">Message Delivered</h3>
              <p class="sp-desc">Thank you for reaching out. I'll respond within 24 hours.</p>
              <button class="sp-reset" @click="resetForm">
                Send Another Message
              </button>
            </div>

            <!-- Form -->
            <form v-else key="form" class="contact-form" @submit.prevent="handleSubmit" novalidate>

              <div class="form-row">
                <div class="form-group">
                  <label>Name <span class="req">*</span></label>
                  <input
                    type="text"
                    v-model="formData.name"
                    placeholder="Wanjiru Mwangi"
                    :class="{ error: errors.name }"
                    autocomplete="name"
                  />
                  <span class="field-error" v-if="errors.name">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label>Email <span class="req">*</span></label>
                  <input
                    type="email"
                    v-model="formData.email"
                    placeholder="wanjiru@company.com"
                    :class="{ error: errors.email }"
                    autocomplete="email"
                  />
                  <span class="field-error" v-if="errors.email">{{ errors.email }}</span>
                </div>
              </div>

              <div class="form-group">
                <label>Subject <span class="req">*</span></label>
                <div class="select-wrap">
                  <select v-model="formData.subject" :class="{ error: errors.subject }">
                    <option value="" disabled>Select a subject</option>
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Job Opportunity">Job Opportunity</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                  <i class="fas fa-chevron-down select-icon"></i>
                </div>
                <span class="field-error" v-if="errors.subject">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label>Message <span class="req">*</span></label>
                <textarea
                  v-model="formData.message"
                  rows="5"
                  placeholder="Tell me about your project, timeline, and budget..."
                  :class="{ error: errors.message }"
                ></textarea>
                <span class="field-error" v-if="errors.message">{{ errors.message }}</span>
                <span class="char-count">{{ formData.message.length }} / 500</span>
              </div>

              <div class="form-footer">
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span v-if="!isSubmitting" class="sb-inner">
                    <i class="fas fa-paper-plane"></i>
                    Send Message
                  </span>
                  <span v-else class="sb-inner">
                    <i class="fas fa-spinner fa-spin"></i>
                    Sending...
                  </span>
                </button>
                <p class="form-note">
                  <i class="fas fa-lock"></i>
                  Your details are never shared.
                </p>
              </div>

            </form>
          </Transition>

        </div>
      </div>

      <!-- Stats + footer bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">24h</span>
          <span class="stat-desc">Response time</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-desc">Committed</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">EAT</span>
          <span class="stat-desc">UTC + 3</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">3+</span>
          <span class="stat-desc">Years exp.</span>
        </div>

        <div class="copyright">
          © {{ new Date().getFullYear() }} Kelvin Kamau · Nairobi, Kenya
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const formStatus  = ref(null)
const isSubmitting = ref(false)

const formData = ref({ name: '', email: '', subject: '', message: '' })
const errors   = ref({ name: '', email: '', subject: '', message: '' })

const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', subject: '', message: '' }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'; valid = false
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = 'Name must be at least 2 characters'; valid = false
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'; valid = false
  } else if (!emailRe.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email'; valid = false
  }

  if (!formData.value.subject) {
    errors.value.subject = 'Please select a subject'; valid = false
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required'; valid = false
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters'; valid = false
  }

  return valid
}

const handleSubmit = async () => {
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    formStatus.value = 'success'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formStatus.value = null
  formData.value = { name: '', email: '', subject: '', message: '' }
  errors.value   = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
/* ─── Tokens ─────────────────────────────────────────── */
:root {
  --bg: #0d1117;
  --bg-card: #161b22;
  --accent: #c9a23b;
  --accent-dim: rgba(201, 162, 59, 0.12);
  --accent-border: rgba(201, 162, 59, 0.35);
  --white: #f0f2f5;
  --silver: #b0b8c1;
  --muted: #7b8694;
  --dim: #4a5568;
  --border: rgba(255, 255, 255, 0.07);
  --green: #2ecc71;
  --red: #ef4444;
}

/* ─── Section ────────────────────────────────────────── */
.contact-section {
  width: 100%;
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 0 2.5rem;
  font-family: 'Inter', system-ui, sans-serif;
}

/* ─── Card ───────────────────────────────────────────── */
.contact-card {
  background: #0d1117;
  border: 1px solid var(--border);
  border-radius: 2rem;
  padding: 2.2rem 2.8rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  position: relative;
  overflow: hidden;
}

/* ambient glow — right side for contact */
.contact-card::after {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 55%; height: 100%;
  background: radial-gradient(ellipse at 80% 30%, rgba(180, 100, 30, 0.13) 0%, transparent 65%);
  pointer-events: none;
}

/* ─── Top bar ────────────────────────────────────────── */
.top-bar {
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap;
  gap: 1rem; position: relative; z-index: 2;
}

.section-label { display: flex; align-items: center; gap: 0.55rem; }

.label-dot { width: 7px; height: 7px; background: var(--accent); border-radius: 50%; }

.label-text {
  font-size: 0.72rem; font-weight: 700;
  color: var(--muted); letter-spacing: 0.2em; text-transform: uppercase;
}

.avail-badge {
  display: inline-flex; align-items: center; gap: 0.55rem;
  padding: 0.42rem 1.1rem;
  border: 1px solid rgba(46, 204, 113, 0.25); border-radius: 3rem;
  font-size: 0.72rem; font-weight: 600; color: var(--green);
}

.pulse-dot {
  width: 7px; height: 7px;
  background: var(--green); border-radius: 50%;
  box-shadow: 0 0 7px rgba(46, 204, 113, 0.7);
  animation: pulse 2s infinite; flex-shrink: 0;
}

.pulse-dot--sm { width: 6px; height: 6px; }

/* ─── Main grid ──────────────────────────────────────── */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3rem; align-items: start;
  position: relative; z-index: 2;
}

/* ─── Left col ───────────────────────────────────────── */
.left-col { display: flex; flex-direction: column; gap: 1.6rem; }

/* Headline */
.headline-block { display: flex; flex-direction: column; gap: 0.5rem; }

.eyebrow {
  font-size: 0.82rem; font-weight: 600;
  color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase;
}

.headline {
  display: flex; flex-direction: column;
  line-height: 0.95; letter-spacing: -0.03em; margin: 0;
}

.hl-solid  { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--white); }
.hl-outline{ font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: transparent; -webkit-text-stroke: 1.5px var(--white); }
.hl-accent { font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 800; color: var(--accent); }

.sub-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.72; margin: 0.3rem 0 0; max-width: 400px; }

/* Method cards */
.methods-list { display: flex; flex-direction: column; gap: 0.6rem; }

.method-card {
  display: flex; align-items: center; gap: 0.9rem;
  padding: 0.9rem 1.1rem;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.2rem; text-decoration: none;
  transition: all 0.2s ease;
}

a.method-card:hover {
  border-color: var(--accent-border);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.method-card--static { cursor: default; }

.mc-icon {
  width: 38px; height: 38px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--accent-dim); border: 1px solid var(--accent-border);
  border-radius: 0.75rem; color: var(--accent); font-size: 0.9rem;
}

.mc-info { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; }

.mc-label {
  font-size: 0.58rem; font-weight: 700; color: var(--dim);
  letter-spacing: 0.12em; text-transform: uppercase;
}

.mc-value { font-size: 0.8rem; color: var(--silver); font-weight: 500; }

.mc-arrow {
  font-size: 0.7rem; color: var(--dim);
  transition: transform 0.2s, color 0.2s;
}

a.method-card:hover .mc-arrow { transform: translateX(4px); color: var(--accent); }

/* Availability card */
.avail-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.2rem; padding: 1.1rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.7rem;
}

.ac-top { display: flex; align-items: center; gap: 0.5rem; }

.ac-status {
  font-size: 0.78rem; font-weight: 700; color: var(--green);
  letter-spacing: 0.03em;
}

.ac-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.65; margin: 0; }

.ac-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.ac-tag {
  padding: 0.28rem 0.65rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border); border-radius: 3rem;
  font-size: 0.66rem; color: var(--silver);
}

/* Socials */
.socials-row { display: flex; gap: 0.5rem; }

.social-link {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border); border-radius: 0.6rem;
  color: var(--muted); font-size: 0.82rem;
  text-decoration: none; transition: all 0.2s;
}

.social-link:hover { border-color: var(--accent-border); color: var(--accent); transform: translateY(-2px); }

/* ─── Right col ──────────────────────────────────────── */
.right-col {
  display: flex; flex-direction: column; gap: 1.4rem;
  position: relative; z-index: 2;
}

/* Terminal */
.terminal-card {
  background: #080b0e; border: 1px solid var(--border);
  border-radius: 1.3rem; padding: 1.2rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  transition: border-color 0.2s;
}

.terminal-card:hover { border-color: var(--accent-border); }

.terminal-dots { display: flex; gap: 6px; margin-bottom: 0.9rem; }
.terminal-dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.t-lines { display: flex; flex-direction: column; gap: 0.42rem; }
.t-line-row { display: flex; gap: 0.55rem; font-size: 0.74rem; flex-wrap: wrap; }
.t-prompt     { color: var(--accent); font-weight: 600; flex-shrink: 0; }
.t-cmd        { color: #b0bec5; }
.t-accent-out { color: var(--accent); font-weight: 600; }

/* Form transitions */
.form-fade-enter-active, .form-fade-leave-active { transition: all 0.22s ease; }
.form-fade-enter-from { opacity: 0; transform: translateY(8px); }
.form-fade-leave-to   { opacity: 0; transform: translateY(-8px); }

/* ─── Contact form ───────────────────────────────────── */
.contact-form {
  display: flex; flex-direction: column; gap: 1rem;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 1.4rem; padding: 1.5rem;
}

.form-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;
}

.form-group {
  display: flex; flex-direction: column; gap: 0.4rem; position: relative;
}

.form-group label {
  font-size: 0.66rem; font-weight: 700; color: var(--dim);
  letter-spacing: 0.1em; text-transform: uppercase;
}

.req { color: var(--accent); }

.form-group input,
.form-group textarea {
  padding: 0.72rem 0.95rem;
  background: #0d1117; border: 1px solid var(--border);
  border-radius: 0.85rem; color: var(--white);
  font-family: 'Inter', sans-serif; font-size: 0.84rem;
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;
}

.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--dim); }

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px rgba(201, 162, 59, 0.08);
}

.form-group input.error,
.form-group textarea.error,
.form-group .select-wrap select.error {
  border-color: var(--red);
}

.form-group textarea { resize: vertical; min-height: 120px; }

/* Select */
.select-wrap { position: relative; }

.select-wrap select {
  width: 100%; padding: 0.72rem 2rem 0.72rem 0.95rem;
  background: #0d1117; border: 1px solid var(--border);
  border-radius: 0.85rem; color: var(--white);
  font-family: 'Inter', sans-serif; font-size: 0.84rem;
  outline: none; cursor: pointer; appearance: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.select-wrap select:focus {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 3px rgba(201, 162, 59, 0.08);
}

.select-wrap select option { background: #161b22; color: var(--white); }

.select-icon {
  position: absolute; right: 0.9rem; top: 50%;
  transform: translateY(-50%);
  color: var(--dim); font-size: 0.7rem; pointer-events: none;
}

/* Char count */
.char-count {
  font-size: 0.6rem; color: var(--dim);
  align-self: flex-end; margin-top: -0.2rem;
}

/* Field errors */
.field-error { font-size: 0.62rem; color: var(--red); }

/* Form footer */
.form-footer {
  display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  padding-top: 0.4rem;
}

/* Submit button */
.submit-btn {
  display: inline-flex; align-items: center;
  padding: 0.8rem 1.8rem;
  background: var(--accent); color: #0d1117;
  font-size: 0.84rem; font-weight: 700;
  letter-spacing: 0.04em;
  border: none; border-radius: 3rem; cursor: pointer;
  transition: all 0.22s ease; font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 14px rgba(201, 162, 59, 0.2);
}

.submit-btn:hover:not(:disabled) {
  background: #dbb24a;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(201, 162, 59, 0.3);
}

.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.sb-inner {
  display: inline-flex; align-items: center; gap: 0.55rem;
}

.form-note {
  font-size: 0.66rem; color: var(--dim);
  display: flex; align-items: center; gap: 0.4rem; margin: 0;
}

/* ─── Success panel ──────────────────────────────────── */
.success-panel {
  background: var(--bg-card); border: 1px solid rgba(46,204,113,0.2);
  border-radius: 1.4rem; padding: 2.5rem 2rem;
  display: flex; flex-direction: column;
  align-items: center; text-align: center; gap: 1rem;
}

.sp-icon {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(46,204,113,0.12);
  border: 1px solid rgba(46,204,113,0.3); border-radius: 50%;
  color: var(--green); font-size: 1.3rem;
}

.sp-title {
  font-size: 1.25rem; font-weight: 800; color: var(--white);
  margin: 0; letter-spacing: -0.01em;
}

.sp-desc { font-size: 0.86rem; color: var(--muted); margin: 0; line-height: 1.6; }

.sp-reset {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: transparent; border: 1px solid var(--accent-border);
  border-radius: 3rem; font-size: 0.76rem; font-weight: 600;
  color: var(--silver); cursor: pointer;
  transition: all 0.2s; font-family: 'Inter', sans-serif;
  margin-top: 0.25rem;
}

.sp-reset:hover { border-color: var(--accent); color: var(--accent); }

/* ─── Stats bar ──────────────────────────────────────── */
.stats-bar {
  display: flex; align-items: center; flex-wrap: wrap;
  gap: 1.5rem; padding-top: 1.6rem;
  border-top: 1px solid var(--border);
  position: relative; z-index: 2;
}

.stat-item  { display: flex; flex-direction: column; gap: 0.12rem; }
.stat-number{ font-size: 1.7rem; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; line-height: 1; }
.stat-desc  { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; }
.stat-divider{ width: 1px; height: 2.2rem; background: var(--border); flex-shrink: 0; }

.copyright {
  margin-left: auto;
  font-size: 0.66rem; color: var(--dim); letter-spacing: 0.03em;
}

/* ─── Animations ─────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.55; transform: scale(0.85); }
}

/* ─── Responsive ─────────────────────────────────────── */
@media (max-width: 1024px) {
  .main-grid { grid-template-columns: 1fr; gap: 2rem; }
  .sub-desc  { max-width: 100%; }
}

@media (max-width: 768px) {
  .contact-card { padding: 1.6rem 1.4rem; border-radius: 1.5rem; gap: 1.8rem; }
  .hl-solid, .hl-outline, .hl-accent { font-size: clamp(2rem, 7vw, 3rem); }
  .form-row { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: stretch; }
  .submit-btn { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .stat-divider { display: none; }
  .copyright    { margin-left: 0; width: 100%; }
  .hl-solid, .hl-outline, .hl-accent { font-size: clamp(1.9rem, 8vw, 2.6rem); }
}
</style>