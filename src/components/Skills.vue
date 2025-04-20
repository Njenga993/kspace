<template>
  <section id="skills" class="skills-section">
    <h2>Skills & Tech Stack</h2>

    <div class="skills-grid">
      <v-motion
        v-for="(category, index) in skillCategories"
        :key="category.title"
        class="skill-card glowing-card"
        :initial="{ opacity: 0, y: 50 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: index * 1, duration: 0.6 }
        }"
      >
        <h3>{{ category.title }}</h3>
        <p>{{ category.description }}</p>
        <div class="skills-icons">
          <div
            v-for="skill in category.skills"
            :key="skill.name"
            class="icon-container"
            :title="skill.name"
          >
            <Icon :icon="skill.icon" class="tech-icon" />
            <span>{{ skill.name }}</span>
          </div>
        </div>
      </v-motion>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { MotionPlugin } from '@vueuse/motion'

const skillCategories = [
  {
    title: 'Frontend',
    description: 'I build modern, responsive user interfaces using tools like Vue.js, React, and TypeScript. My focus is on creating clean, fast, and user-friendly designs that look good on all devices.',
    skills: [
      { name: 'Vue.js', icon: 'logos:vue' },
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'HTML5', icon: 'logos:html-5' },
      { name: 'CSS3', icon: 'logos:css-3' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' }
    ]
  },
  {
    title: 'Backend',
    description: 'I develop secure and scalable backend systems using Django and Node.js. I handle server logic, APIs, and database connections to power the core of web applications.',
    skills: [
      { name: 'Django', icon: 'logos:django-icon' },
      { name: 'Python', icon: 'logos:python' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'FastAPI', icon: 'logos:fastapi' },
      { name: 'Flask', icon: 'logos:flask' },
      { name: 'GraphQL', icon: 'logos:graphql' },
      { name: 'REST APIs', icon: 'logos:rest-api' },
      { name: 'PHP Laravel', icon: 'logos:laravel' },
      { name: 'Express.js', icon: 'skill-icons:expressjs-dark' }
    ]
  },
  {
    title: 'Database',
    description: 'Storing and retrieving data efficiently',
    skills: [
      { name: 'MySQL', icon: 'logos:mysql-icon' },
      { name: 'PostgreSQL', icon: 'logos:postgresql' },
      { name: 'MariaDB', icon: 'logos:mariadb' },
      { name: 'SQLite', icon: 'vscode-icons:file-type-sqlite' },
      { name: 'MongoDB', icon: 'logos:mongodb-icon' }
    ]
  },
  {
    title: 'Graphic Design',
    description: 'Designing interfaces and product visuals',
    skills: [
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'Photoshop', icon: 'logos:adobe-photoshop' },
      { name: 'Illustrator', icon: 'logos:adobe-illustrator' },
      { name: 'Canva', icon: 'simple-icons:canva' }
    ]
  }
]
</script>

<style scoped>
.skills-section {
  padding: 4rem 2rem;
  background: linear-gradient(to right, #fdfdfd, #f6f6f6);
  transition: background 0.4s ease;
}

body.dark-theme .skills-section {
  background: linear-gradient(to right, #1e1e1e, #2a2a2a);
  color: #eee;
}

h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--accent, #ff6347);
  margin-bottom: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  background-color: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s, box-shadow 0.4s;
}

body.dark-theme .skill-card {
  background-color: #2a2a2a;
  color: #eee;
  box-shadow: 0 4px 20px rgba(255, 99, 71, 0.15);
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 24px rgba(255, 99, 71, 0.3);
}

.skill-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--accent, #ff6347);
}

.skills-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1rem;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.6rem;
  border-radius: 0.75rem;
  background: #f4f4f4;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s;
}

body.dark-theme .icon-container {
  background: #3b3b3b;
}

.icon-container:hover {
  transform: scale(1.1);
  background: var(--accent, #ff6347);
  color: #fff;
}

.tech-icon {
  font-size: 2rem;
}
</style>
