import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useVolumeStore = defineStore('volumeStore',() => {
  const userIsPremium = ref(false);

  return {
    userIsPremium,
  }
});