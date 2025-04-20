<template>
  <section id="contact" class="section">
    <h2 class="section-title">Contact Me</h2>

    <!-- Success Message -->
    <p v-if="formSent" class="success-msg">Thank you! Your message has been sent. 😊</p>

    <!-- Contact Form -->
    <form
      v-show="!formSent"
      action="https://formsubmit.co/kamaukelvin077@gmail.com"
      method="POST"
      target="formsubmit-iframe"
      @submit="handleSubmit"
      class="contact-form"
    >
      <!-- Hidden Config -->
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />

      <div class="form-group">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
      </div>
      <input type="text" name="subject" placeholder="Subject" required />
      <textarea name="message" placeholder="Your Message" rows="6" required></textarea>

      <button type="submit" class="send-button">Send Message</button>
    </form>

    <!-- Hidden iframe -->
    <iframe name="formsubmit-iframe" style="display: none;"></iframe>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const formSent = ref(false)

const handleSubmit = () => {
  setTimeout(() => {
    formSent.value = true
  }, 1500)
}
</script>

<style scoped>
.section {
  padding: 4rem 1.5rem;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  color: var(--text);
}
.contact-form {
  max-width: 640px;
  margin: 0 auto;
  background: var(--card);
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
@media (min-width: 600px) {
  .form-group {
    flex-direction: row;
  }
}
input,
textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background-color: var(--input);
  color: var(--text);
  transition: border-color 0.3s, box-shadow 0.3s;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-light);
}
.send-button {
  margin-top: 1.5rem;
  background-color: var(--accent);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s;
}
.send-button:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
}
.success-msg {
  color: var(--success);
  background-color: var(--success-bg);
  border: 1px solid var(--success-border);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Theme Variables */
:root {
  --card: #ffffff;
  --text: #111111;
  --input: #f8f8f8;
  --accent: #007bff;
  --accent-hover: #0056cc;
  --accent-light: rgba(0, 123, 255, 0.3);
  --border: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --success: #28a745;
  --success-bg: #e6f9ed;
  --success-border: #c3e6cb;
}
.dark {
  --card: #1e1e1e;
  --text: #f5f5f5;
  --input: #2b2b2b;
  --accent: #66b2ff;
  --accent-hover: #338ae3;
  --accent-light: rgba(102, 178, 255, 0.3);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --success: #34d399;
  --success-bg: rgba(52, 211, 153, 0.1);
  --success-border: rgba(52, 211, 153, 0.4);
}
</style>
