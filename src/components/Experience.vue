<template>
  <section id="experience" class="experience-section">
    <h2 class="section-title">Professional Experience</h2>
    <div class="experience-grid">
      <motion-div
        v-for="(exp, index) in experiences"
        :key="index"
        class="experience-card"
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: index * 0.5 } }"
        v-motion
      >
        <div class="card-header">
          <h3>{{ exp.title }}</h3>
          <span class="year">{{ exp.year }}</span>
        </div>
        <p class="description">{{ exp.description }}</p>
        <ul class="activities">
          <li v-for="(task, idx) in exp.tasks" :key="idx">
            <span class="dot">•</span> {{ task }}
          </li>
        </ul>
      </motion-div>
    </div>
  </section>
</template>

<script setup>
import { useMotion } from '@vueuse/motion'

const experiences = [
  {
    title: 'Developer & Digital Manager - Nyakazi Organics',
    year: '2024 - 2025',
    description: 'Oversaw all digital solutions for an organic food company, from branding to systems development.',
    tasks: [
      'Developed a fully functional POS system using React and Django.',
      'Handled product designs, mockups, and brand consistency across platforms.',
      'Implemented SEO strategies, improved page ranking and traffic.',
      'Managed digital campaigns and farmer training sessions.',
    ],
  },
  {
    title: 'Junior Developer - Desiderata Consultancy',
    year: '2023 - 2024',
    description: 'Built solutions for diverse client needs, both frontend and backend.',
    tasks: [
      'Created responsive UI layouts for corporate clients.',
      'Developed Laravel-based systems including data dashboards.',
      'Collaborated on customer relationship systems and internal tools.',
    ],
  },
  {
    title: 'Frontend Developer - Techlungs Technology',
    year: '2022 - 2023',
    description: 'Specialized in frontend projects and client landing pages.',
    tasks: [
      'Built landing pages with HTML, CSS, and JavaScript.',
      'Used animations and interactivity to boost engagement.',
      'Worked with designers to implement clean UI/UX solutions.',
    ],
  },
  {
    title: 'ICT Intern - KNLS & Immigration Department (Nyayo House)',
    year: '2021 - 2022',
    description: 'Supported tech operations during internship at two key government departments.',
    tasks: [
      'Maintained digital catalog systems at KNLS Nakuru.',
      'Backed up systems and assisted in tech troubleshooting.',
      'Documented network setups and asset registries.',
    ],
  },
]
</script>

<style scoped>
.experience-section {
  padding: 3rem 1.5rem;
  background-color: var(--bg);
  transition: background-color 0.3s ease;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text);
  text-align: center;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.experience-card {
  background-color: var(--card);
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
.experience-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--hover-shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent);
}

.description {
  margin: 0.5rem 0 1rem;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.activities {
  padding-left: 1rem;
  list-style: none;
}
.activities li {
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}
.dot {
  margin-right: 8px;
  color: var(--accent);
  font-weight: bold;
}

/* Light Mode Variables */
:root {
  --bg: #f9f9f9;
  --text: #111;
  --text-muted: #444;
  --card: #ffffff;
  --accent: #007acc;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  --hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Variables */
.dark {
  --bg: #121212;
  --text: #f1f1f1;
  --text-muted: #bbbbbb;
  --card: #1f1f1f;
  --accent: #66ccff;
  --shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
  --hover-shadow: 0 8px 30px rgba(255, 255, 255, 0.08);
}
</style>
