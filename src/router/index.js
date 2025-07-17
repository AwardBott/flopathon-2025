import { createRouter, createWebHistory } from 'vue-router'
import {useVolumeStore} from '@/components/useVolumeStore.js'
import FlipFlop from '@/components/FlipFlop.vue'
import AdsAndLootBoxes from '@/components/MainPage/AdsAndLootBoxes.vue'


const componentFiles = import.meta.glob('../components/*.vue')

const dynamicRoutes = Object.keys(componentFiles)
  .map((path) => {
    const componentName = path.split('/').pop().replace('.vue', '')

    if (componentName === 'FlipFlop') return null

    const routePath = '/' + componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

    return {
      path: routePath,
      name: componentName.toLowerCase(),
      component: componentFiles[path],
      meta: {
        displayName: componentName.replace(/([A-Z])/g, ' $1').trim(),
      },
    }
  })
  .filter((route) => route !== null)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FlipFlop,
      meta: {
        displayName: 'Home',
      },
    },
    {
      path: '/ad',
      name: 'ad',
      component: AdsAndLootBoxes,
      meta: {
        displayName: 'Advertisement',
      }
    },
  ],
})
router.beforeEach((to, from, next) => {
  const store = useVolumeStore()
  if (store.isViewingAd) {
    if (to.path === '/ad') {
      next()
    } else {
      next('/ad');
    }
  } else {
    next();
  }
})

export default router
