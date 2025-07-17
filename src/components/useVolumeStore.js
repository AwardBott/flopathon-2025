import {defineStore} from 'pinia'
import { ref, inject, watch } from 'vue'
import {useRouter} from 'vue-router'

export const useVolumeStore = defineStore('volumeStore',() => {

  const router = useRouter()
  const userIsPremium = ref(false);
  const isViewingAd = ref(false);

  watch(isViewingAd, (newValue) => {
    if (isViewingAd.value) {
      router.push({ path: '/ad/' })
    }
  })

  const isFlipped = ref(false);
  const selectedCardInfo = ref(null);

  return {
    userIsPremium,
    isFlipped,
    selectedCardInfo,
    isViewingAd,
  }
});