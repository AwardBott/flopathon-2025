<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import {useVolumeStore} from '../useVolumeStore.js'
import sizzler from '@/assets/sizzler.mp4'
import constipation from '@/assets/constipation.mp4'
import {storeToRefs} from "pinia";

const {isViewingAd} = storeToRefs(useVolumeStore())

const selectedVideo = ref(null)
const videoRef = ref(null)
const showExitIcon = ref(false)

const randomVideo = () => {
  const allVideos = [sizzler, constipation]
  return allVideos[Math.floor(Math.random() * allVideos.length)]
}

const videoHasEnded = () => {
  showExitIcon.value = true
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

const exitIconStyles = computed(() => showExitIcon.value ? 'block' : 'none')
</script>

<template>
  <div class="ad-page">
    <i class="ph ph-x-circle close-icon" @click="isViewingAd = false"></i>
    <video ref="videoRef" :key="selectedVideo" :src="selectedVideo" @ended="videoHasEnded" />
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

.close-icon {
  display: v-bind(exitIconStyles);
  color: red;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
}
</style>