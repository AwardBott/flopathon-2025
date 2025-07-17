<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import sizzler from '@/assets/sizzler.mp4'
import constipation from '@/assets/constipation.mp4'

const selectedVideo = ref(null)
const videoRef = ref(null)

const randomVideo = () => {
  const allVideos = [sizzler, constipation]
  return allVideos[Math.floor(Math.random() * allVideos.length)]
}

onMounted(() => {
  selectedVideo.value = randomVideo()
})

watch(selectedVideo, () => {
  if (videoRef.value) {
    console.log('watching video', videoRef.value.controls)
    setTimeout(() => {
      videoRef.value.play()
    }, 200)
  }
})
</script>

<template>
  <div class="ad-page">
    <video ref="videoRef" :key="selectedVideo" :src="selectedVideo" />
  </div>
</template>

<style scoped>
.ad-page {
  height: calc(100vh - 33px);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #111111;
}
video {
  pointer-events: none;
}
</style>