<template>
    <span>{{ displayedCount }}</span>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const props = defineProps<{ end: number }>()
  const displayedCount = ref(0)
  
  onMounted(() => {
    let start = 0
    const duration = 1000
    const increment = props.end / (duration / 50)
  
    const counter = setInterval(() => {
      start += increment
      if (start >= props.end) {
        displayedCount.value = props.end
        clearInterval(counter)
      } else {
        displayedCount.value = Math.floor(start)
      }
    }, 50)
  })
  </script>
  