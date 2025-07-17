<template>
    <div class="card-container" @click="flipCard">
        <div class="loot-box-card" :class="{ 'is-flipped': isFlipped }">
            <div class="card-face card-face--front" :style="cardStyle">
                <div class="loot-box-card-header">
                    <h2>{{ rarity }}</h2>
                </div>
                <div class="loot-box-card__content">
                    <p>{{ generatedVolume }}</p>
                </div>
            </div>
            <div class="card-face card-face--back">
                <h2>?</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const RARITIES = Object.freeze({
    COMMON: 'Common',
    UNCOMMON: 'Uncommon',
    RARE: 'Rare',
    LEGENDARY: 'Legendary'
})

const isFlipped = ref(false);

const generatedVolume = ref(0);
const rarity = ref(RARITIES.COMMON);

const cardStyle = computed(() => {
    switch (rarity.value) {
        case RARITIES.LEGENDARY:
            return { backgroundColor: '#facc15' }; // gold
        case RARITIES.RARE:
            return { backgroundColor: '#a78bfa' }; // purple
        case RARITIES.UNCOMMON:
            return { backgroundColor: '#67e8f9' }; // cyan
        default:
            return { backgroundColor: '#e5e7eb' }; // light gray
    }
});

const flipCard = () => {
    if (isFlipped.value) return;
    isFlipped.value = true;
}

onMounted(() => {
    const random = Math.random();

    if (random < 0.05) {
        rarity.value = RARITIES.LEGENDARY;
        generatedVolume.value = Math.floor(Math.random() * 11) + 45;
    } else if (random < 0.20) {
        rarity.value = RARITIES.RARE;
        generatedVolume.value = Math.floor(Math.random() * 21) + 40;
    } else if (random < 0.60) {
        rarity.value = RARITIES.COMMON;
        generatedVolume.value = Math.floor(Math.random() * 39) + 1;
    } else {
        rarity.value = RARITIES.UNCOMMON;
        generatedVolume.value = Math.floor(Math.random() * 40) + 61;
    }
});

</script>

<style scoped>
.card-container {
    width: 320px;
    height: 200px;
    perspective: 1000px;
    cursor: pointer;
}

.loot-box-card {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    user-select: none;
}

.loot-box-card.is-flipped {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
}

.card-face--front {
    /* The front face is initially hidden on the other side */
    transform: rotateY(180deg);
}

.card-face--back {
    background-color: #4b5563; /* gray-700 */
    color: white;
}

.card-face--back h2 {
    font-size: 4em;
}

.loot-box-card__content {
    font-size: 2.5em;
    color: #333;
}
</style>