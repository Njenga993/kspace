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
            <span
              class="contact__hl-outline"
              @pointermove="onHeadMove"
              @pointerleave="onHeadLeave"
            >Something</span>
            <span class="contact__hl-accent">Great.</span>
          </h2>
          <p class="contact__sub-desc">
            Have a project in mind? Reach out and let's create something
            exceptional together. I respond within 24 hours.
          </p>
        </div>

        <!-- Contact method cards -->
        <div class="contact__methods anim" style="--d:0.22s">

          <div class="method-card method-card--split">
            <a :href="'mailto:' + CONTACT_EMAIL" class="mc-link">
              <div class="mc-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="mc-info">
                <span class="mc-label">Email</span>
                <span class="mc-value">{{ CONTACT_EMAIL }}</span>
              </div>
              <i class="fas fa-arrow-right mc-arrow"></i>
            </a>
            <button
              type="button"
              class="mc-copy"
              :class="{ done: copied }"
              :aria-label="copied ? 'Email address copied' : 'Copy email address'"
              @click="copyEmail"
            >
              <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ copied ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

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
            <span class="mc-clock" :title="'Local time in Nairobi'">
              <i></i>{{ nairobiTime }}
            </span>
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
          <a :href="'mailto:' + CONTACT_EMAIL" class="social-link" aria-label="Email">
            <i class="fas fa-envelope"></i>
          </a>
        </div>

      </div>

      <!-- RIGHT: terminal + postcard form -->
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
              <span class="terminal__out" :class="{ 'is-error': !!submitError }" role="status" aria-live="polite">{{ terminalLine }}<span v-if="!formStatus" class="terminal__caret"></span></span>
            </div>
          </div>
        </div>

        <div class="contact__form-wrap anim" style="--d:0.26s">
          <Transition name="send" mode="out-in">

            <!-- Success state -->
            <div v-if="formStatus === 'success'" key="success" class="success-panel" ref="successRef" tabindex="-1">

              <svg class="postmark" viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id="pm-arc" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="2.2" />
                <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="1.2" />
                <text font-size="11" font-weight="800" letter-spacing="3.2" fill="currentColor">
                  <textPath href="#pm-arc">NAIROBI · KENYA · NAIROBI · KENYA ·</textPath>
                </text>
                <text x="60" y="58" text-anchor="middle" font-size="15" font-weight="900" fill="currentColor">{{ postmark.dm }}</text>
                <text x="60" y="73" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="2" fill="currentColor">{{ postmark.y }}</text>
              </svg>

              <svg class="plane" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>

              <div class="success-panel__icon">
                <i class="fas fa-check"></i>
              </div>
              <h3 class="success-panel__title">{{ deliveryMode === 'sent' ? 'Message Delivered' : 'Draft Ready to Send' }}</h3>
              <p class="success-panel__desc">
                <template v-if="deliveryMode === 'sent'">Thank you for reaching out. I'll respond within 24 hours.</template>
                <template v-else>Your email app should have opened with the message ready — just press send. Nothing opened? Write to me directly at <a :href="'mailto:' + CONTACT_EMAIL">{{ CONTACT_EMAIL }}</a>.</template>
              </p>

              <dl class="receipt">
                <div><dt>To</dt><dd>Kelvin Kamau</dd></div>
                <div><dt>From</dt><dd>{{ sent.name }}</dd></div>
                <div><dt>Re</dt><dd>{{ sent.subject }}</dd></div>
              </dl>

              <button class="success-panel__reset" @click="resetForm">
                Send Another Message
              </button>
            </div>

            <!-- Postcard form -->
            <form
              v-else
              key="form"
              class="postcard"
              ref="cardRef"
              novalidate
              @submit.prevent="handleSubmit"
              @pointermove="onCardMove"
              @pointerleave="onCardLeave"
            >
              <span class="postcard__glow" aria-hidden="true"></span>

              <!-- Address block mirrors what the visitor types -->
              <div class="postcard__head">
                <dl class="addr">
                  <div>
                    <dt>To</dt>
                    <dd>Kelvin Kamau <span>&lt;{{ CONTACT_EMAIL }}&gt;</span></dd>
                  </div>
                  <div>
                    <dt>From</dt>
                    <dd :class="{ ghost: !formData.name.trim() }">{{ formData.name.trim() || 'your name' }}</dd>
                  </div>
                  <div>
                    <dt>Re</dt>
                    <dd :class="{ ghost: !formData.subject }">{{ formData.subject || 'pick a subject below' }}</dd>
                  </div>
                </dl>
                <div class="stamp" aria-hidden="true">
                  <b>KE</b>
                  <span>{{ nairobiTime }}</span>
                  <i>EAT</i>
                </div>
              </div>

              <!-- Postage: fills as each field becomes valid -->
              <div class="postage" role="progressbar" aria-label="Form completion" aria-valuemin="0" aria-valuemax="4" :aria-valuenow="readyCount">
                <div class="postage__bar">
                  <i v-for="f in fieldOrder" :key="f" :class="{ on: !errors[f] }"></i>
                </div>
                <span class="postage__txt" :class="{ ready: allValid }">{{ allValid ? 'Ready to send' : readyCount + '/4 ready' }}</span>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="cf-name">Name <span class="req">*</span></label>
                  <div class="fld-wrap">
                    <input
                      id="cf-name"
                      class="fld"
                      type="text"
                      v-model="formData.name"
                      placeholder="Wanjiru Mwangi"
                      :class="{ error: showError('name') }"
                      :aria-invalid="showError('name') ? 'true' : 'false'"
                      aria-describedby="cf-name-err"
                      autocomplete="name"
                      @blur="touched.name = true"
                    />
                    <svg v-if="isValid('name')" class="tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span id="cf-name-err" class="field-error" v-if="showError('name')">{{ errors.name }}</span>
                </div>
                <div class="form-group">
                  <label for="cf-email">Email <span class="req">*</span></label>
                  <div class="fld-wrap">
                    <input
                      id="cf-email"
                      class="fld"
                      type="email"
                      v-model="formData.email"
                      placeholder="wanjiru@company.com"
                      :class="{ error: showError('email') }"
                      :aria-invalid="showError('email') ? 'true' : 'false'"
                      aria-describedby="cf-email-err"
                      autocomplete="email"
                      @blur="touched.email = true"
                    />
                    <svg v-if="isValid('email')" class="tick" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span id="cf-email-err" class="field-error" v-if="showError('email')">{{ errors.email }}</span>
                </div>
              </div>

              <fieldset class="form-group form-group--set" :aria-invalid="showError('subject') ? 'true' : 'false'">
                <legend>Subject <span class="req">*</span></legend>
                <div class="chips">
                  <label
                    v-for="opt in subjects"
                    :key="opt"
                    class="chip"
                    :class="{ on: formData.subject === opt }"
                  >
                    <input
                      type="radio"
                      name="cf-subject"
                      :value="opt"
                      v-model="formData.subject"
                      @change="touched.subject = true"
                    />
                    <span>{{ opt }}</span>
                  </label>
                </div>
                <span class="field-error" v-if="showError('subject')">{{ errors.subject }}</span>
              </fieldset>

              <div class="form-group">
                <label for="cf-message">Message <span class="req">*</span></label>
                <textarea
                  id="cf-message"
                  class="fld"
                  v-model="formData.message"
                  rows="5"
                  maxlength="500"
                  placeholder="Tell me about your project, timeline, and budget..."
                  :class="{ error: showError('message') }"
                  :aria-invalid="showError('message') ? 'true' : 'false'"
                  aria-describedby="cf-message-err"
                  @blur="touched.message = true"
                ></textarea>
                <span id="cf-message-err" class="field-error" v-if="showError('message')">{{ errors.message }}</span>
                <span class="char-count" :class="{ warn: formData.message.length > 450 }">{{ formData.message.length }} / 500</span>
              </div>

              <!-- Honeypot: invisible to people, tempting to bots -->
              <input v-model="honeypot" type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

              <p v-if="submitError" class="submit-error" role="alert">{{ submitError }}</p>

              <div class="form-footer">
                <button type="submit" class="submit-btn" :class="{ ready: allValid }" :disabled="isSubmitting">
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
      <p class="strip-note">
        Prefer email? <a :href="'mailto:' + CONTACT_EMAIL">{{ CONTACT_EMAIL }}</a>
        <span class="strip-sep">·</span>
        <button type="button" class="to-top" @click="toTop">Back to top ↑</button>
      </p>
    </div>

  </section>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted } from 'vue'

/* ═══════════════════════════════════════════════════════
   Configuration
   ───────────────────────────────────────────────────────
   FORM_ENDPOINT: paste a form-backend URL here (Formspree,
   Web3Forms, Getform, or your own API). When set, messages
   are POSTed as JSON and the success panel says "Delivered".
   When empty, the form opens the visitor's email app with the
   message pre-filled instead — so nothing is ever silently lost.
   ═══════════════════════════════════════════════════════ */
const FORM_ENDPOINT = ''
const CONTACT_EMAIL = 'kamaukelvin077@gmail.com'

const contactRef = ref(null)
const cardRef = ref(null)
const successRef = ref(null)

const formStatus = ref(null)          // null | 'success'
const deliveryMode = ref('sent')      // 'sent' | 'draft'
const isSubmitting = ref(false)
const submitError = ref('')
const attempted = ref(false)
const honeypot = ref('')
const copied = ref(false)
const nairobiTime = ref('--:--')
const sent = reactive({ name: '', subject: '' })
const postmark = reactive({ dm: '', y: '' })

const formData = ref({ name: '', email: '', subject: '', message: '' })
const touched = reactive({ name: false, email: false, subject: false, message: false })

const fieldOrder = ['name', 'email', 'subject', 'message']
const subjects = ['Project Inquiry', 'Job Opportunity', 'Collaboration', 'Consultation', 'Other']

/* ── Validation (same rules as before, now live) ─────── */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => {
  const d = formData.value
  const e = { name: '', email: '', subject: '', message: '' }

  if (!d.name.trim()) e.name = 'Name is required'
  else if (d.name.trim().length < 2) e.name = 'Must be at least 2 characters'

  if (!d.email.trim()) e.email = 'Email is required'
  else if (!emailRe.test(d.email.trim())) e.email = 'Please enter a valid email'

  if (!d.subject) e.subject = 'Please select a subject'

  if (!d.message.trim()) e.message = 'Message is required'
  else if (d.message.trim().length < 10) e.message = 'Must be at least 10 characters'

  return e
})

const showError = (f) => (touched[f] || attempted.value) ? errors.value[f] : ''
const isValid   = (f) => touched[f] && !errors.value[f]
const readyCount = computed(() => fieldOrder.filter(f => !errors.value[f]).length)
const allValid   = computed(() => readyCount.value === 4)

/* ── Terminal status line ────────────────────────────── */
const terminalLine = computed(() => {
  if (formStatus.value === 'success') {
    return deliveryMode.value === 'sent'
      ? 'Message delivered successfully ✓'
      : 'Draft opened in your email app ✓'
  }
  if (submitError.value) return 'Delivery failed — see below'
  if (isSubmitting.value) return 'Sending your message...'
  if (allValid.value) return 'All fields valid — ready to send.'
  if (readyCount.value > 0) return `Composing... ${readyCount.value}/4 fields ready`
  return 'Ready to receive your message...'
})

/* ── Submit ──────────────────────────────────────────── */
const buildMailto = () => {
  const d = formData.value
  const subject = `[Portfolio] ${d.subject} — ${d.name.trim()}`
  const body = `${d.message.trim()}\n\n— ${d.name.trim()} (${d.email.trim()})`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const handleSubmit = async () => {
  attempted.value = true
  submitError.value = ''

  if (!allValid.value) {
    await nextTick()
    contactRef.value?.querySelector('.fld.error, fieldset[aria-invalid="true"] input')?.focus()
    return
  }

  const d = formData.value
  isSubmitting.value = true
  try {
    if (honeypot.value) {
      // a bot filled the hidden field: pretend it worked, send nothing
      deliveryMode.value = 'sent'
    } else if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: d.name.trim(),
          email: d.email.trim(),
          subject: d.subject,
          message: d.message.trim(),
        }),
      })
      if (!res.ok) throw new Error('bad status ' + res.status)
      deliveryMode.value = 'sent'
    } else {
      deliveryMode.value = 'draft'
      window.location.href = buildMailto()
    }

    sent.name = d.name.trim()
    sent.subject = d.subject
    setPostmark()
    formStatus.value = 'success'
    await nextTick()
    successRef.value?.focus({ preventScroll: true })
  } catch {
    submitError.value = `Couldn't send that just now. Please try again, or email me directly at ${CONTACT_EMAIL}.`
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formStatus.value = null
  attempted.value = false
  submitError.value = ''
  honeypot.value = ''
  formData.value = { name: '', email: '', subject: '', message: '' }
  fieldOrder.forEach(f => { touched[f] = false })
}

function setPostmark() {
  const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Africa/Nairobi' })
    .formatToParts(new Date())
  const get = (t) => parts.find(p => p.type === t)?.value || ''
  postmark.dm = `${get('day')} ${get('month').toUpperCase()}`
  postmark.y = get('year')
}

/* ── Copy email ──────────────────────────────────────── */
let copyTimer = null
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
  } catch {
    // clipboard blocked: fall back to selecting via a temp textarea
    try {
      const ta = document.createElement('textarea')
      ta.value = CONTACT_EMAIL
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    } catch { return }
  }
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => { copied.value = false }, 1800)
}

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/* ── Headline spotlight on the outlined word ─────────── */
function onHeadMove(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
function onHeadLeave(e) {
  e.currentTarget.style.removeProperty('--mx')
  e.currentTarget.style.removeProperty('--my')
}

/* ── Cursor glow on the postcard ─────────────────────── */
function onCardMove(e) {
  const el = cardRef.value
  if (!el || e.pointerType === 'touch') return
  const r = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - r.left}px`)
  el.style.setProperty('--gy', `${e.clientY - r.top}px`)
  el.classList.add('is-glow')
}
function onCardLeave() { cardRef.value?.classList.remove('is-glow') }

/* ── Live Nairobi clock ──────────────────────────────── */
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: false })
const tickClock = () => { nairobiTime.value = fmt.format(new Date()) }
let clockTimer = null

/* ── Scroll animation observer ───────────────────────── */
onMounted(() => {
  tickClock()
  clockTimer = setInterval(tickClock, 20000)

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

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<style scoped>
/* Tokens live on .contact itself (a scoped :root never matches <html>) */
.contact {
  --acc: #ff5500;
  --acc-h: #ff6b1a;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --bd: rgba(255, 255, 255, 0.07);
  --mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace;

  box-sizing: border-box;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(60px, 10vh, 120px) clamp(24px, 5vw, 96px) clamp(40px, 6vh, 80px);
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: clamp(32px, 5vh, 56px);
}

/* ── Animation system ────────────────────────────────── */
.anim {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s var(--ease), transform 0.75s var(--ease);
  transition-delay: var(--d, 0s);
}
.in-view .anim { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .anim { transition-duration: 0.01ms !important; opacity: 1 !important; transform: none !important; }
  .postmark, .plane, .pulse-dot, .terminal__caret, .mc-clock i { animation: none !important; }
  .postmark { opacity: 0.85 !important; transform: rotate(-14deg) !important; }
  .plane { display: none; }
  .send-leave-active, .send-enter-active { transition-duration: 0.01ms !important; transition-delay: 0s !important; }
}

/* ── Section header ──────────────────────────────────── */
.contact__header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
.contact__label { display: flex; align-items: center; gap: 0.75rem; }
.contact__label-line { display: block; width: 32px; height: 1px; background: var(--acc); }
.contact__label-text { font-size: 0.72rem; font-weight: 700; color: var(--acc); letter-spacing: 0.18em; text-transform: uppercase; }

.avail-badge {
  display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.38rem 1rem;
  border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 999px;
  font-size: 0.7rem; font-weight: 600; color: #22c55e; letter-spacing: 0.03em;
}
.pulse-dot { width: 7px; height: 7px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 7px rgba(34, 197, 94, 0.7); animation: pulse 2s infinite; flex-shrink: 0; }
.pulse-dot--sm { width: 6px; height: 6px; }

/* ── Main grid ───────────────────────────────────────── */
.contact__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
}

/* ── Left column ─────────────────────────────────────── */
.contact__left { display: flex; flex-direction: column; gap: clamp(1.4rem, 2.5vh, 1.8rem); min-width: 0; }
.contact__headline-block { display: flex; flex-direction: column; gap: 0.5rem; }
.contact__eyebrow { margin: 0; font-size: 0.8rem; font-weight: 700; color: var(--acc); letter-spacing: 0.14em; text-transform: uppercase; }
.contact__heading { display: flex; flex-direction: column; line-height: 0.92; letter-spacing: -0.03em; margin: 0; }
.contact__hl-solid, .contact__hl-outline, .contact__hl-accent {
  display: block; width: fit-content; max-width: 100%;
  font-size: clamp(2.4rem, 4.5vw, 3.8rem); font-weight: 900; line-height: 0.92;
}
.contact__hl-solid { color: #fff; }
.contact__hl-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.35);
  background: radial-gradient(200px circle at var(--mx, -400px) var(--my, -400px), var(--acc) 0%, rgba(255, 85, 0, 0) 100%);
  -webkit-background-clip: text; background-clip: text;
}
.contact__hl-accent { color: var(--acc); font-style: italic; }
.contact__sub-desc { font-size: 0.92rem; color: #9aa3af; line-height: 1.72; margin: 0.3rem 0 0; max-width: 420px; }

/* ── Method cards ────────────────────────────────────── */
.contact__methods { display: flex; flex-direction: column; gap: 0.55rem; }
.method-card {
  display: flex; align-items: center; gap: 0.9rem; padding: 0.85rem 1.1rem;
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px; text-decoration: none;
  transition: all 0.25s var(--ease);
}
a.method-card:hover, .method-card--split:hover {
  border-color: rgba(255, 85, 0, 0.3); background: rgba(255, 85, 0, 0.04);
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
.method-card--static { cursor: default; }

.method-card--split { padding: 0; gap: 0; overflow: hidden; }
.mc-link { flex: 1; min-width: 0; display: flex; align-items: center; gap: 0.9rem; padding: 0.85rem 0.6rem 0.85rem 1.1rem; text-decoration: none; }
.mc-copy {
  align-self: stretch; display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0 1.1rem; background: transparent; border: 0; border-left: 1px solid rgba(255, 255, 255, 0.06);
  font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  color: #8a929e; cursor: pointer; transition: color 0.2s ease, background 0.2s ease;
}
.mc-copy:hover { color: var(--acc); background: rgba(255, 85, 0, 0.06); }
.mc-copy.done { color: #22c55e; }
.mc-copy:focus-visible, .mc-link:focus-visible { outline: 2px solid var(--acc); outline-offset: -2px; border-radius: 12px; }

.mc-icon {
  width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  background: rgba(255, 85, 0, 0.08); border: 1px solid rgba(255, 85, 0, 0.25);
  border-radius: 10px; color: var(--acc); font-size: 0.9rem;
}
.mc-info { display: flex; flex-direction: column; gap: 0.1rem; flex: 1; min-width: 0; }
.mc-label { font-size: 0.58rem; font-weight: 700; color: #5a6270; letter-spacing: 0.12em; text-transform: uppercase; }
.mc-value { font-size: 0.82rem; color: #c8cdd5; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mc-arrow { font-size: 0.7rem; color: #4a5568; transition: transform 0.25s var(--ease), color 0.25s ease; }
.mc-link:hover .mc-arrow, a.method-card:hover .mc-arrow { transform: translateX(4px); color: var(--acc); }

.mc-clock {
  display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.28rem 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 999px;
  font-family: var(--mono); font-size: 0.68rem; font-weight: 600; color: #c8cdd5; font-variant-numeric: tabular-nums; flex-shrink: 0;
}
.mc-clock i { width: 5px; height: 5px; border-radius: 50%; background: var(--acc); animation: pulse 2s infinite; }

/* ── Availability card ───────────────────────────────── */
.contact__avail {
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px; padding: 1.1rem 1.2rem; display: flex; flex-direction: column; gap: 0.7rem;
}
.avail-top { display: flex; align-items: center; gap: 0.5rem; }
.avail-status { font-size: 0.78rem; font-weight: 700; color: #22c55e; letter-spacing: 0.03em; }
.avail-desc { font-size: 0.78rem; color: #8a929e; line-height: 1.65; margin: 0; }
.avail-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.avail-tag {
  padding: 0.26rem 0.65rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px; font-size: 0.66rem; color: #9aa3af; transition: border-color 0.2s ease, color 0.2s ease;
}
.avail-tag:hover { border-color: rgba(255, 85, 0, 0.25); color: var(--acc); }

/* ── Socials ─────────────────────────────────────────── */
.contact__socials { display: flex; gap: 0.55rem; }
.social-link {
  width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; color: #8a929e;
  font-size: 0.85rem; text-decoration: none; transition: all 0.25s ease;
}
.social-link:hover { border-color: rgba(255, 85, 0, 0.35); color: var(--acc); transform: translateY(-2px); background: rgba(255, 85, 0, 0.06); }

/* ── Right column ────────────────────────────────────── */
.contact__right { display: flex; flex-direction: column; gap: 1.2rem; min-width: 0; }

/* ── Terminal ────────────────────────────────────────── */
.terminal {
  background: #060809; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px;
  padding: 1.1rem 1.3rem 1rem; font-family: var(--mono); transition: border-color 0.25s ease;
}
.terminal:hover { border-color: rgba(255, 85, 0, 0.25); }
.terminal__dots { display: flex; gap: 6px; margin-bottom: 0.85rem; }
.terminal__dots span { width: 10px; height: 10px; border-radius: 50%; }
.terminal__dots span:nth-child(1) { background: #ff5f56; }
.terminal__dots span:nth-child(2) { background: #ffbd2e; }
.terminal__dots span:nth-child(3) { background: #27c93f; }
.terminal__lines { display: flex; flex-direction: column; gap: 0.4rem; }
.terminal__row { display: flex; gap: 0.55rem; font-size: 0.72rem; flex-wrap: wrap; }
.terminal__prompt { color: var(--acc); font-weight: 600; flex-shrink: 0; }
.terminal__cmd { color: #8a929e; }
.terminal__out { color: var(--acc); font-weight: 600; }
.terminal__out.is-error { color: #ef4444; }
.terminal__caret { display: inline-block; width: 6px; height: 0.95em; margin-left: 3px; vertical-align: -0.12em; background: var(--acc); animation: blink 1s step-end infinite; }

/* ── Form <-> success swap (the postcard "mails away") ── */
.send-leave-active { transition: transform 0.6s var(--ease), opacity 0.45s ease; }
.send-leave-to { transform: translate(46px, -70px) rotate(5deg) scale(0.8); opacity: 0; }
.send-enter-active { transition: opacity 0.45s ease 0.15s, transform 0.55s var(--ease) 0.15s; }
.send-enter-from { opacity: 0; transform: translateY(18px) scale(0.97); }

/* ═══════════════ POSTCARD ═══════════════ */
.postcard {
  --gx: 50%; --gy: 0%;
  position: relative; isolation: isolate; overflow: hidden;
  display: flex; flex-direction: column; gap: 1.15rem;
  padding: calc(8px + clamp(1.1rem, 2.4vw, 1.6rem)) clamp(1.1rem, 2.4vw, 1.7rem) clamp(1.1rem, 2.4vw, 1.6rem);
  background: linear-gradient(180deg, #121214, #0c0c0e);
  border: 1px solid var(--bd); border-radius: 20px;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.6);
}
/* airmail edge */
.postcard::before {
  content: ''; position: absolute; left: 0; right: 0; top: 0; height: 8px;
  background: repeating-linear-gradient(-45deg, rgba(255, 85, 0, 0.95) 0 12px, transparent 12px 20px, rgba(255, 255, 255, 0.55) 20px 32px, transparent 32px 40px);
}
.postcard__glow {
  position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: 0;
  background: radial-gradient(420px circle at var(--gx) var(--gy), rgba(255, 85, 0, 0.11), transparent 60%);
  transition: opacity 0.35s ease;
}
.postcard.is-glow .postcard__glow { opacity: 1; }

.postcard__head {
  display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;
  padding-bottom: 1rem; border-bottom: 1px dashed rgba(255, 255, 255, 0.14);
}
.addr { margin: 0; display: flex; flex-direction: column; gap: 0.45rem; min-width: 0; font-family: var(--mono); font-size: 0.72rem; }
.addr > div { display: grid; grid-template-columns: 38px minmax(0, 1fr); gap: 0.5rem; align-items: baseline; }
.addr dt { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #5a6270; }
.addr dd { margin: 0; color: #e1e5ea; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color 0.25s ease; }
.addr dd span { color: #6b7585; }
.addr dd.ghost { color: #3a4250; font-style: italic; }

/* stamp: perforated edge via dotted border */
.stamp {
  flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
  width: 66px; padding: 7px 4px; border-radius: 4px;
  background: linear-gradient(160deg, rgba(255, 85, 0, 0.22), rgba(255, 85, 0, 0.06));
  border: 3px dotted rgba(255, 255, 255, 0.28);
  transform: rotate(2.5deg); font-family: var(--mono);
}
.stamp b { font-size: 1.15rem; font-weight: 900; color: #fff; letter-spacing: -0.02em; line-height: 1; }
.stamp span { font-size: 0.62rem; font-weight: 700; color: var(--acc); font-variant-numeric: tabular-nums; }
.stamp i { font-style: normal; font-size: 0.5rem; letter-spacing: 0.14em; color: #8a929e; }

/* postage progress */
.postage { display: flex; align-items: center; gap: 0.9rem; }
.postage__bar { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.postage__bar i { height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.08); transition: background 0.4s ease, box-shadow 0.4s ease; }
.postage__bar i.on { background: var(--acc); box-shadow: 0 0 8px rgba(255, 85, 0, 0.5); }
.postage__txt { font-family: var(--mono); font-size: 0.62rem; font-weight: 600; color: #5a6270; letter-spacing: 0.04em; white-space: nowrap; transition: color 0.3s ease; }
.postage__txt.ready { color: #22c55e; }

/* ── Fields ──────────────────────────────────────────── */
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; position: relative; min-width: 0; }
.form-group label, .form-group legend {
  padding: 0; font-size: 0.66rem; font-weight: 700; color: #5a6270; letter-spacing: 0.1em; text-transform: uppercase;
}
.form-group--set { margin: 0; padding: 0; border: 0; min-width: 0; }
.form-group--set legend { margin-bottom: 0.55rem; float: left; width: 100%; }
.form-group--set .chips, .form-group--set .field-error { clear: both; }
.req { color: var(--acc); }

.fld-wrap { position: relative; }
.fld {
  width: 100%; box-sizing: border-box; padding: 0.72rem 0.95rem;
  background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px;
  color: #fff; font-family: 'Inter', sans-serif; font-size: 0.84rem; outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.fld::placeholder { color: #3a4250; }
.fld:focus { border-color: rgba(255, 85, 0, 0.45); box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.08); background: rgba(0, 0, 0, 0.45); }
.fld.error { border-color: #ef4444; }
.fld-wrap .fld { padding-right: 2.2rem; }
textarea.fld { resize: vertical; min-height: 120px; }
.tick { position: absolute; right: 0.85rem; top: 50%; translate: 0 -50%; color: #22c55e; animation: tickIn 0.35s var(--ease) both; pointer-events: none; }
@keyframes tickIn { from { opacity: 0; scale: 0.4; } to { opacity: 1; scale: 1; } }

/* subject chips (real radio inputs underneath) */
.chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.chip { position: relative; display: inline-flex; cursor: pointer; }
.chip input { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: pointer; }
.chip span {
  display: inline-flex; align-items: center; padding: 0.48rem 0.95rem;
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 999px;
  font-size: 0.76rem; font-weight: 600; color: #9aa3af; letter-spacing: 0.01em;
  transition: all 0.25s var(--ease);
}
.chip:hover span { border-color: rgba(255, 85, 0, 0.3); color: #d0d5dd; }
.chip.on span { background: var(--acc); border-color: var(--acc); color: #fff; box-shadow: 0 6px 18px rgba(255, 85, 0, 0.28); transform: translateY(-1px); }
.chip input:focus-visible + span { outline: 2px solid var(--acc); outline-offset: 2px; }
.form-group--set[aria-invalid="true"] .chip:not(.on) span { border-color: rgba(239, 68, 68, 0.5); }

.char-count { font-size: 0.6rem; color: #3a4250; align-self: flex-end; margin-top: -0.2rem; font-family: var(--mono); transition: color 0.2s ease; }
.char-count.warn { color: #ef4444; }
.field-error { font-size: 0.62rem; color: #ef4444; }

.hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

.submit-error {
  margin: 0; padding: 0.7rem 0.9rem; font-size: 0.74rem; line-height: 1.55; color: #fca5a5;
  background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 10px;
}

/* Form footer */
.form-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-top: 0.4rem; }
.submit-btn {
  display: inline-flex; align-items: center; padding: 0.8rem 1.8rem; background: var(--acc); color: #fff;
  font-size: 0.84rem; font-weight: 700; letter-spacing: 0.04em; border: none; border-radius: 999px; cursor: pointer;
  transition: all 0.25s var(--ease); font-family: 'Inter', sans-serif; box-shadow: 0 4px 16px rgba(255, 85, 0, 0.2);
}
.submit-btn.ready { box-shadow: 0 6px 24px rgba(255, 85, 0, 0.4); }
.submit-btn:hover:not(:disabled) { background: var(--acc-h); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255, 85, 0, 0.45); }
.submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.submit-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.sb-inner { display: inline-flex; align-items: center; gap: 0.55rem; }
.sb-inner i { transition: transform 0.4s var(--ease); }
.submit-btn:hover:not(:disabled) .fa-paper-plane { transform: translate(3px, -3px) rotate(8deg); }
.form-note { font-size: 0.66rem; color: #4a5568; display: flex; align-items: center; gap: 0.4rem; margin: 0; }

/* ═══════════════ SUCCESS ═══════════════ */
.success-panel {
  position: relative; overflow: hidden; outline: none;
  background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 20px;
  padding: 2.6rem 2rem 2.2rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem;
}
.success-panel__icon {
  width: 56px; height: 56px; display: flex; align-items: center; justify-content: center;
  background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.25); border-radius: 50%;
  color: #22c55e; font-size: 1.3rem; animation: popIn 0.6s var(--ease) 0.35s both;
}
.success-panel__title { font-size: 1.25rem; font-weight: 800; color: #fff; margin: 0; letter-spacing: -0.01em; }
.success-panel__desc { font-size: 0.86rem; color: #8a929e; margin: 0; line-height: 1.6; max-width: 400px; }
.success-panel__desc a { color: var(--acc); text-decoration: none; word-break: break-all; }
.success-panel__desc a:hover { text-decoration: underline; }

.receipt {
  margin: 0.2rem 0 0; width: 100%; max-width: 360px; padding: 0.85rem 1rem; display: flex; flex-direction: column; gap: 0.4rem;
  text-align: left; font-family: var(--mono); font-size: 0.7rem;
  border: 1px dashed rgba(255, 255, 255, 0.14); border-radius: 10px; background: rgba(0, 0, 0, 0.25);
}
.receipt > div { display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 0.5rem; }
.receipt dt { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #5a6270; padding-top: 1px; }
.receipt dd { margin: 0; color: #d3d8df; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.success-panel__reset {
  display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.4rem; background: transparent;
  border: 1px solid rgba(255, 85, 0, 0.3); border-radius: 999px; font-size: 0.78rem; font-weight: 600; color: #c8cdd5;
  cursor: pointer; transition: all 0.25s ease; font-family: 'Inter', sans-serif; margin-top: 0.25rem;
}
.success-panel__reset:hover { border-color: var(--acc); color: var(--acc); }
.success-panel__reset:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px; }

/* postmark slams onto the card */
.postmark {
  position: absolute; top: 14px; right: 14px; width: clamp(88px, 22%, 118px); color: var(--acc);
  opacity: 0; transform: rotate(-14deg); pointer-events: none;
  animation: slam 0.7s cubic-bezier(0.2, 1.4, 0.4, 1) 0.45s forwards;
}
@keyframes slam {
  0%   { opacity: 0; transform: rotate(-30deg) scale(2.4); }
  60%  { opacity: 0.95; transform: rotate(-12deg) scale(0.94); }
  100% { opacity: 0.85; transform: rotate(-14deg) scale(1); }
}
/* paper plane glides across once */
.plane { position: absolute; left: -8%; bottom: 8%; color: var(--acc); opacity: 0; pointer-events: none; animation: fly 1.6s cubic-bezier(0.3, 0.6, 0.3, 1) 0.2s forwards; }
@keyframes fly {
  0%   { opacity: 0; transform: translate(0, 0) rotate(8deg) scale(0.8); }
  15%  { opacity: 1; }
  100% { opacity: 0; transform: translate(520px, -280px) rotate(-6deg) scale(1.1); }
}
@keyframes popIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }

/* ── Bottom stats strip ──────────────────────────────── */
.contact__strip {
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.25rem;
  padding-top: clamp(24px, 4vh, 40px); border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.strip-stats { display: flex; align-items: center; gap: 1.4rem; flex-wrap: wrap; }
.strip-stat { display: flex; flex-direction: column; gap: 0.1rem; }
.ss-num { font-size: 1.5rem; font-weight: 800; color: var(--acc); letter-spacing: -0.02em; line-height: 1; }
.ss-label { font-size: 0.62rem; color: #5a6270; text-transform: uppercase; letter-spacing: 0.1em; }
.strip-divider { width: 1px; height: 2rem; background: rgba(255, 255, 255, 0.06); flex-shrink: 0; }
.strip-note { margin: 0; font-size: 0.72rem; color: #4a5568; display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem; }
.strip-note a { color: #8a929e; text-decoration: none; transition: color 0.2s ease; word-break: break-all; }
.strip-note a:hover { color: var(--acc); }
.strip-sep { color: #2f3744; }
.to-top { padding: 0; background: none; border: 0; font: inherit; color: #8a929e; cursor: pointer; transition: color 0.2s ease; }
.to-top:hover { color: var(--acc); }
.to-top:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px; border-radius: 4px; }

/* ── Keyframes ───────────────────────────────────────── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(0.85); }
}
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 1024px) {
  .contact__grid { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
  .contact__sub-desc { max-width: 100%; }
}

@media (max-width: 768px) {
  .contact { padding: clamp(48px, 8vh, 80px) clamp(20px, 5vw, 32px) clamp(32px, 5vh, 60px); }
  .contact__hl-solid, .contact__hl-outline, .contact__hl-accent { font-size: clamp(2rem, 7vw, 3rem); }
  .form-row { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: stretch; }
  .submit-btn { width: 100%; justify-content: center; }
  .contact__strip { flex-direction: column; align-items: flex-start; gap: 1rem; }
}

@media (max-width: 480px) {
  .strip-divider { display: none; }
  .strip-stats { gap: 1rem; }
  .contact__hl-solid, .contact__hl-outline, .contact__hl-accent { font-size: clamp(1.9rem, 8vw, 2.6rem); }
  .mc-copy span { display: none; }
  .mc-copy { padding: 0 0.9rem; }
  .stamp { width: 56px; }
  .stamp b { font-size: 1rem; }
  .addr { font-size: 0.66rem; }
  .success-panel { padding: 3.6rem 1.25rem 1.8rem; }
  .postmark { width: 78px; top: 10px; right: 10px; }
  .method-card:not(.method-card--split) { padding: 0.8rem 0.9rem; }
}
</style>