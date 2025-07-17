<template>
    <main>
      <h1>How to do the Heimlech</h1>
        <volume-control />
    </main>
</template>

<script setup lang="ts">
import VolumeControl from './MainPage/VolumeControl.vue'
</script>

<style scoped>
main {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

h1 {
  font-size: 4rem;
}
</style>