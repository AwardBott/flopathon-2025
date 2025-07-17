<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import {useVolumeStore} from '@/components/useVolumeStore.js'

const store = useVolumeStore();

const router = useRouter()
const routes = router.options.routes
</script>

<template>
  <header>
    <nav class="main-nav">
      <RouterLink v-for="route in routes" :key="route.name" :to="route.path">
        {{ route.meta?.displayName || route.name }}
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app {
    font-family: 'Lato', sans-serif;
}
</style>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
}
.main-nav {
  background-color: #666666;
  font-size: 1.8em;
}
</style>
