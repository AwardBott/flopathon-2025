import {defineStore} from 'pinia'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useVolumeStore = defineStore('volumeStore',() => {
  const route = useRoute();

  const router = useRouter()
  const userIsPremium = ref(false);
  const isViewingAd = ref(false);
  const volume = ref(0);

  watch(isViewingAd, (newValue) => {
    if (isViewingAd.value) {
      console.log(route)
      if (route.path !== '/ad') {

    console.log('redirecting')
      router.push({ path: '/ad/' })
      }
    }
  })

  const isFlipped = ref(false);
  const selectedCardInfo = ref(null);

  function setAdTimeout() {
    setTimeout(() => {
      const isVolumeCloserToZero = volume.value < 50;
      volume.value = isVolumeCloserToZero ? 100 : 0;
    }, userIsPremium ? 15000 : 10000);
  }

  return {
    userIsPremium,
    isFlipped,
    selectedCardInfo,
    isViewingAd,
    volume,
    setAdTimeout
  }
});