<template>
  <section id="contact" class="section">
    <h2 class="section-title">Contact Me</h2>
    <form ref="form" @submit.prevent="sendEmail" class="contact-form">
      <div class="form-group">
        <input type="text" name="from_name" v-model="formState.name" placeholder="Your Name" required />
        <input type="email" name="from_email" v-model="formState.email" placeholder="Your Email" required />
      </div>
      <input type="text" name="subject" v-model="formState.subject" placeholder="Subject" required />
      <textarea name="message" v-model="formState.message" placeholder="Your Message" rows="6" required></textarea>
      <button type="submit" class="send-button">Send Message</button>
      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)

const formState = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const successMessage = ref('')
const errorMessage = ref('')

const sendEmail = () => {
  emailjs.sendForm(
    'service_izdcryn',      // Replace with your actual EmailJS service ID
    'template_b3qcwes',     // Replace with your template ID
      form.value,
    'wfJmttnFOeZMmTJoH'       // Replace with your EmailJS public key
  )
  .then(() => {
    successMessage.value = 'Message sent successfully!'
    errorMessage.value = ''
    Object.assign(formState, { name: '', email: '', subject: '', message: '' })
  })
  .catch((error) => {
    console.error(error)
    errorMessage.value = 'Failed to send message. Please try again.'
    successMessage.value = ''
  })
}
</script>

<style scoped>
.section {
  padding: 4rem 2rem;
}
.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  background: var(--card);
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.form-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: var(--input);
  color: var(--text);
}
.send-button {
  margin-top: 1rem;
  background-color: var(--accent);
  color: #0e0d0d;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.send-button:hover {
  background-color: var(--accent-hover);
}
.success-msg {
  color: green;
  margin-top: 1rem;
}
.error-msg {
  color: red;
  margin-top: 1rem;
}

/* Theme Variables */
:root {
  --card: #ffffff;
  --text: #333;
  --input: #f0f0f0;
  --accent: #007bff;
  --accent-hover: #0056cc;
  --border: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
.dark {
  --card: #1f1f1f;
  --text: #f5f5f5;
  --input: #2a2a2a;
  --accent: #66b2ff;
  --accent-hover: #338ae3;
  --border: rgba(255, 255, 255, 0.1);
  --shadow: 0 4px 14px rgba(255, 255, 255, 0.05);
}
</style>
