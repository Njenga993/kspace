<template>
  <section id="contact" class="contact" ref="contactRef">

    <!-- Section header row -->
    <div class="contact__header anim" style="--d:0.08s">
      <div class="contact__label">
        <span class="contact__label-line"></span>
        <span class="contact__label-text">Get in touch</span>
      </div>
      <div class="avail-badge">
        <span class="pulse-dot"></span>
        <span>Available for work</span>
      </div>
    </div>

    <!-- Main grid -->
    <div class="contact__grid">

      <!-- LEFT: headline + info -->
      <div class="contact__left">

        <div class="contact__headline-block anim" style="--d:0.14s">
          <p class="contact__eyebrow">Let's Connect</p>
          <h2 class="contact__heading">
            <span class="contact__hl-solid">Let's Build</span>
            <span class="contact__hl-outline">Something</span>
            <span class="contact__hl-accent">Great.</span>
          </h2>
          <p class="contact__sub-desc">
            Have a project in mind? Reach out and let's create something
            exceptional together. I respond within 24 hours.
          </p>
        </div>

        <!-- Contact method cards -->
        <div class="contact__methods anim" style="--d:0.22s">
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
        <div class="contact__avail anim" style="--d:0.30s">
          <div class="avail-top">
            <span class="pulse-dot pulse-dot--sm"></span>
            <span class="avail-status">Currently Available</span>
          </div>
          <p class="avail-desc">
            Open to freelance projects, full-time roles, and consulting engagements.
            Specialising in full-stack systems, e-commerce, and SaaS platforms.
          </p>
          <div class="avail-tags">
            <span class="avail-tag">Freelance</span>
            <span class="avail-tag">Full-time</span>
            <span class="avail-tag">Remote</span>
            <span class="avail-tag">On-site Nairobi</span>
          </div>
        </div>

        <!-- Socials -->
        <div class="contact__socials anim" style="--d:0.36s">
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

      <!-- RIGHT: terminal + form -->
      <div class="contact__right">

        <!-- Terminal -->
        <div class="terminal anim" style="--d:0.18s">
          <div class="terminal__dots"><span></span><span></span><span></span></div>
          <div class="terminal__lines">
            <div class="terminal__row">
              <span class="terminal__prompt">~/connect $</span>
              <span class="terminal__cmd">init-contact --secure</span>
            </div>
            <div class="terminal__row">
              <span class="terminal__prompt">›</span>
              <span class="terminal__out">
                {{ formStatus === 'success' ? 'Message delivered successfully ✓' : 'Ready to receive your message...' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form / Success -->
        <Transition name="form-fade" mode="out-in">

          <!-- Success state -->
          <div v-if="formStatus === 'success'" key="success" class="success-panel">
            <div class="success-panel__icon">
              <i class="fas fa-check"></i>
            </div>
            <h3 class="success-panel__title">Message Delivered</h3>
            <p class="success-panel__desc">Thank you for reaching out. I'll respond within 24 hours.</p>
            <button class="success-panel__reset" @click="resetForm">
              Send Another Message
            </button>
          </div>

          <!-- Form -->
          <form v-else key="form" class="contact-form anim" style="--d:0.26s" @submit.prevent="handleSubmit" novalidate>

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
              <span class="char-count" :class="{ warn: formData.message.length > 450 }">{{ formData.message.length }} / 500</span>
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

    <!-- Bottom stats strip — matches hero/footer strip style -->
    <div class="contact__strip anim" style="--d:0.42s">
      <div class="strip-stats">
        <div class="strip-stat">
          <span class="ss-num">24h</span>
          <span class="ss-label">Response</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">100%</span>
          <span class="ss-label">Committed</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">UTC+3</span>
          <span class="ss-label">Nairobi</span>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-stat">
          <span class="ss-num">3+</span>
          <span class="ss-label">Years</span>
        </div>
      </div>
      <p class="strip-note">Prefer email? <a href="mailto:kamaukelvin077@gmail.com">kamaukelvin077@gmail.com</a></p>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const contactRef = ref(null)
const formStatus = ref(null)
const isSubmitting = ref(false)

const formData = ref({ name: '', email: '', subject: '', message: '' })
const errors = ref({ name: '', email: '', subject: '', message: '' })

/* ── Scroll animation observer ───────────────────────── */
onMounted(() => {
  const section = contactRef.value
  if (!section) return

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        section.classList.add('in-view')
        io.unobserve(section)
      }
    })
  }, { threshold: 0.06 })

  io.observe(section)
})

/* ── Validation ──────────────────────────────────────── */
const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', subject: '', message: '' }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'; valid = false
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = 'Must be at least 2 characters'; valid = false
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
    errors.value.message = 'Must be at least 10 characters'; valid = false
  }

  return valid
}

/* ── Submit ──────────────────────────────────────────── */
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
  errors.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════
   NO :root — scoped :root never matches <html>.
   All colors hardcoded. Orange #ff5500 palette.
   ═══════════════════════════════════════════════════════ */

/* ── Animation system ────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--d, 0s);
}

.in-view .anim {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .anim {
    transition-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* ── Section shell (full-bleed, no card) ─────────────── */
.contact {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px) clamp(40px, 6vh, 80px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vh, 56px);
}

/* ── Section header ──────────────────────────────────── */
.contact__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact__label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact__label-line {
  display: block;
  width: 32px;
  height: 1px;
  background: #ff5500;
}

.contact__label-text {
  font-size: 0.72rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.avail-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 1rem;
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.03em;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.7);
  animation: pulse 2s infinite;
  flex-shrink: 0;
}

.pulse-dot--sm { width: 6px; height: 6px; }

/* ── Main grid ───────────────────────────────────────── */
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* ── Left column ─────────────────────────────────────── */
.contact__left {
  display: flex;
  flex-direction: column;
  gap: clamp(1.4rem, 2.5vh, 1.8rem);
}

/* Headline block */
.contact__headline-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ff5500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.contact__heading {
  display: flex;
  flex-direction: column;
  line-height: 0.92;
  letter-spacing: -0.03em;
  margin: 0;
}

.contact__hl-solid,
.contact__hl-outline,
.contact__hl-accent {
  display: block;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem);
  font-weight: 900;
  line-height: 0.92;
}

.contact__hl-solid {
  color: #ffffff;
}

.contact__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
}

.contact__hl-accent {
  color: #ff5500;
  font-style: italic;
}

.contact__sub-desc {
  font-size: 0.92rem;
  color: #9aa3af;
  line-height: 1.72;
  margin: 0.3rem 0 0;
  max-width: 420px;
}

/* ── Method cards ────────────────────────────────────── */
.contact__methods {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

a.method-card:hover {
  border-color: rgba(255, 85, 0, 0.3);
  background: rgba(255, 85, 0, 0.04);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.method-card--static {
  cursor: default;
}

.mc-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 85, 0, 0.08);
  border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 10px;
  color: #ff5500;
  font-size: 0.9rem;
}

.mc-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
}

.mc-label {
  font-size: 0.58rem;
  font-weight: 700;
  color: #5a6270;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mc-value {
  font-size: 0.82rem;
  color: #c8cdd5;
  font-weight: 500;
}

.mc-arrow {
  font-size: 0.7rem;
  color: #4a5568;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
}

a.method-card:hover .mc-arrow {
  transform: translateX(4px);
  color: #ff5500;
}

/* ── Availability card ───────────────────────────────── */
.contact__avail {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.avail-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avail-status {
  font-size: 0.78rem;
  font-weight: 700;
  color: #22c55e;
  letter-spacing: 0.03em;
}

.avail-desc {
  font-size: 0.78rem;
  color: #8a929e;
  line-height: 1.65;
  margin: 0;
}

.avail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.avail-tag {
  padding: 0.26rem 0.65rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  font-size: 0.66rem;
  color: #9aa3af;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.avail-tag:hover {
  border-color: rgba(255, 85, 0, 0.25);
  color: #ff5500;
}

/* ── Socials ─────────────────────────────────────────── */
.contact__socials {
  display: flex;
  gap: 0.55rem;
}

.social-link {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #8a929e;
  font-size: 0.85rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.social-link:hover {
  border-color: rgba(255, 85, 0, 0.35);
  color: #ff5500;
  transform: translateY(-2px);
  background: rgba(255, 85, 0, 0.06);
}

/* ── Right column ────────────────────────────────────── */
.contact__right {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

/* ── Terminal ────────────────────────────────────────── */
.terminal {
  background: #060809;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.1rem 1.3rem 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  transition: border-color 0.25s ease;
}

.terminal:hover {
  border-color: rgba(255, 85, 0, 0.25);
}

.terminal__dots {
  display: flex;
  gap: 6px;
  margin-bottom: 0.85rem;
}

.terminal__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal__dots span:nth-child(1) { background: #ff5f56; }
.terminal__dots span:nth-child(2) { background: #ffbd2e; }
.terminal__dots span:nth-child(3) { background: #27c93f; }

.terminal__lines {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.terminal__row {
  display: flex;
  gap: 0.55rem;
  font-size: 0.72rem;
  flex-wrap: wrap;
}

.terminal__prompt {
  color: #ff5500;
  font-weight: 600;
  flex-shrink: 0;
}

.terminal__cmd {
  color: #8a929e;
}

.terminal__out {
  color: #ff5500;
  font-weight: 600;
}

/* ── Form transition ─────────────────────────────────── */
.form-fade-enter-active,
.form-fade-leave-active { transition: all 0.22s ease; }
.form-fade-enter-from { opacity: 0; transform: translateY(8px); }
.form-fade-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Contact form ────────────────────────────────────── */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
}

.form-group label {
  font-size: 0.66rem;
  font-weight: 700;
  color: #5a6270;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.req { color: #ff5500; }

.form-group input,
.form-group textarea {
  padding: 0.72rem 0.95rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 0.84rem;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  width: 100%;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #3a4250;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(255, 85, 0, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.08);
}

.form-group input.error,
.form-group textarea.error,
.form-group .select-wrap select.error {
  border-color: #ef4444;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* Select */
.select-wrap { position: relative; }

.select-wrap select {
  width: 100%;
  padding: 0.72rem 2rem 0.72rem 0.95rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 0.84rem;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.select-wrap select:focus {
  border-color: rgba(255, 85, 0, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.08);
}

.select-wrap select option {
  background: #111;
  color: #ffffff;
}

.select-icon {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: #4a5568;
  font-size: 0.7rem;
  pointer-events: none;
}

/* Char count */
.char-count {
  font-size: 0.6rem;
  color: #3a4250;
  align-self: flex-end;
  margin-top: -0.2rem;
  transition: color 0.2s ease;
}

.char-count.warn {
  color: #ef4444;
}

/* Field errors */
.field-error {
  font-size: 0.62rem;
  color: #ef4444;
}

/* Form footer */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.4rem;
}

/* Submit button — orange pill matching hero/footer CTA */
.submit-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.8rem;
  background: #ff5500;
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Inter', sans-serif;
  box-shadow: 0 4px 16px rgba(255, 85, 0, 0.2);
}

.submit-btn:hover:not(:disabled) {
  background: #ff6b1a;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 85, 0, 0.35);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sb-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.form-note {
  font-size: 0.66rem;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
}

/* ── Success panel ───────────────────────────────────── */
.success-panel {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.success-panel__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 50%;
  color: #22c55e;
  font-size: 1.3rem;
}

.success-panel__title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
}

.success-panel__desc {
  font-size: 0.86rem;
  color: #8a929e;
  margin: 0;
  line-height: 1.6;
}

.success-panel__reset {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: transparent;
  border: 1px solid rgba(255, 85, 0, 0.3);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #c8cdd5;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;
  margin-top: 0.25rem;
}

.success-panel__reset:hover {
  border-color: #ff5500;
  color: #ff5500;
}

/* ── Bottom stats strip ──────────────────────────────── */
.contact__strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: clamp(24px, 4vh, 40px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.strip-stats {
  display: flex;
  align-items: center;
  gap: 1.4rem;
}

.strip-stat {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.ss-num {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ff5500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.ss-label {
  font-size: 0.62rem;
  color: #5a6270;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.strip-divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.strip-note {
  margin: 0;
  font-size: 0.72rem;
  color: #4a5568;
}

.strip-note a {
  color: #8a929e;
  text-decoration: none;
  transition: color 0.2s ease;
}

.strip-note a:hover {
  color: #ff5500;
}

/* ── Keyframes ───────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.85); }
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact__sub-desc {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px);
  }

  .contact__hl-solid,
  .contact__hl-outline,
  .contact__hl-accent {
    font-size: clamp(2rem, 7vw, 3rem);
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .contact__strip {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .strip-divider { display: none; }
  .strip-stats { gap: 1rem; }

  .contact__hl-solid,
  .contact__hl-outline,
  .contact__hl-accent {
    font-size: clamp(1.9rem, 8vw, 2.6rem);
  }
}
</style>