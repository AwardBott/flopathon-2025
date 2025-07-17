<template>
    <main>
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
  flex-direction: column;
  align-items: center;
}
</style>