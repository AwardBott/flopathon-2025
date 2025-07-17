import {defineStore} from 'pinia'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useVolumeStore = defineStore('volumeStore',() => {
  const route = useRoute();

  const router = useRouter()
  const userIsPremium = ref(true);
  const isViewingAd = ref(false);
  const volume = ref(100);

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

  return {
    userIsPremium,
    isFlipped,
    selectedCardInfo,
    isViewingAd,
    volume,
  }
});