<template>
    <div class="video-container">
        <div class="video-box">
            <!-- Replace this with canvas or background image if needed -->
            <p class="video-text">Video Placeholder</p>
        </div>

        <div class="controls">
            <label for="volume">Volume</label>
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                :value="volume"
                @mousedown="openModal"
            />
            <span>{{ Math.round(volume) }}%</span>
        </div>
        <ad-modal
            v-if="showModal"
            @confirm="confirmVolumeChange"
            @cancel="cancelVolumeChange"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'

import AdModal from './AdModal.vue'

const volume = ref(100)
const showModal = ref(false)

const openModal = () => {
    volume.value = 100;
    showModal.value = true;
}

function confirmVolumeChange() {
    showModal.value = false
    alert("Confirmed volume change")
}

function cancelVolumeChange() {
    showModal.value = false
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