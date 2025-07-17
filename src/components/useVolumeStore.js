import {defineStore} from 'pinia'
import { ref } from 'vue'

export const useVolumeStore = defineStore('volumeStore',() => {
  const userIsPremium = ref(false);
  const isFlipped = ref(false);
  const selectedCardInfo = ref(null);

  return {
    userIsPremium,
    isFlipped,
    selectedCardInfo
  }
});