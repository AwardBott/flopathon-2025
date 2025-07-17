<script setup lang="ts">
import WatchAd from '@/components/MainPage/WatchAd.vue'
import LootBox from '@/components/LootBox/LootBox.vue'
import { useVolumeStore } from '../useVolumeStore';
import { storeToRefs } from 'pinia'

const {isViewingAd} = storeToRefs(useVolumeStore())
</script>

<template>
  <component :is="isViewingAd ? WatchAd : LootBox"></component>
</template>

<style scoped>

</style>