<template>
    <div class="video-container">
        <div class="video-box">
            <!-- Replace this with canvas or background image if needed -->
            <p class="video-text">Video Placeholder</p>
        </div>

        <div class="controls">
            <label for="volume">Volume</label>
            <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model="volume"
            />
            <span>{{ Math.round(volume * 100) }}%</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const volume = ref(1.0)
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