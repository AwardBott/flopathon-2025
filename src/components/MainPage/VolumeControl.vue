<template>
    <div class="video-container">
        <div class="video-box">
            <!-- Replace this with canvas or background image if needed -->
            <p class="video-text">Video Placeholder</p>
        </div>

        <div class="controls"                 @mousedown="openModal"
        >
            <label for="volume">Volume</label>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                :value="volume"
            />
            <span>{{ Math.round(volume) }}%</span>
        </div>
        <ad-modal
            v-if="showModal"
            :user-is-premium="userIsPremium"
            @redirect="missedCloseButton"
            @confirm="confirmVolumeChange"
            @premium="onClickPremium"
            @close="showModal = false"
        />
        <premium-modal v-if="showPremiumModal" @close="showPremiumModal = false" @redirect="missedCloseButton" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import AdModal from './AdModal.vue';
import PremiumModal from '@/components/MainPage/PremiumModal.vue';
import { useVolumeStore } from '@/components/useVolumeStore.js';

const showModal = ref(false)
const showPremiumModal = ref(false);

const { userIsPremium, isViewingAd, volume } = storeToRefs(useVolumeStore());

const openModal = () => {
    // volume.value = 0;
    showModal.value = true;
}

function confirmVolumeChange() {
    showModal.value = false
    isViewingAd.value = true;
}

function onClickPremium() {
    window.open('https://buy.stripe.com/test_3cIdRa7uh1ew5yWc046AM00', '_blank')
    showModal.value = false;
    userIsPremium.value = true;
    showPremiumModal.value = true;
}

const missedCloseButton = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1', '_blank')
}


</script>

<style scoped>
.video-container {
    width: 960px;
    max-width: 100%;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.video-box {
    height: 540px;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-size: 1.5rem;
}

.video-text {
    pointer-events: none;
    user-select: none;
}

.controls {
    padding: 10px;
    background: #111;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
}

input[type="range"] {
    flex-grow: 1;
}
</style>