<template>
    <button class="back-to-top" v-show="showButton" @click="scrollToTop">↑ Top</button>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const showButton = ref(false);
  
  const handleScroll = () => {
    showButton.value = window.scrollY > 300;
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 20px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    background-color: var(--accent);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  </style>
  