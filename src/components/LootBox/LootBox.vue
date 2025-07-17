
<template>
    <div class="loot-box">
        <div class="loot-box-header">
            <h1>Loot Box</h1>
        </div>
        <div class="loot-box__cards-container">
            <div class="loot-box__cards" :style="cardsStyle">
                <loot-box-card
                    v-for="(initialCard, index) in initialCards"
                    :index="index"
                    :key="initialCard.id"
                    :rarity="initialCard.rarity"
                    :volume="initialCard.volume"
                />
                <loot-box-card
                    v-for="(card, index) in cards"
                    :index="index"
                    :key="card.id"
                    :rarity="card.rarity"
                    :volume="card.volume"
                    :winningIndex="winningIndex"
                />
            </div>
            <div class="ph ph-hand-pointing"></div>
        </div>
        <button v-if="!isFlipped || buttonDisabled" :class="['loot-box__spin-button', { 'is-disabled': buttonDisabled }]" @click="spinCards">Spin!</button>
        <button v-else :class="['loot-box__spin-button', { 'is-disabled': buttonDisabled }]" @click="resetCards">Respin!</button>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { storeToRefs } from 'pinia';

import LootBoxCard from '@/components/LootBox/LootBoxCard.vue';
import { useVolumeStore } from '@/components/useVolumeStore.js';

const cardCount = 50;
const cardWidth = 320;
const cardGap = 24;

const initialCards = ref([]);
const cards = ref([]);
const cardsStyle = ref({
    transform: 'translateX(0)',
    transition: 'none'
});

const { isFlipped, selectedCardInfo } = storeToRefs(useVolumeStore());

const RARITIES = Object.freeze({
    COMMON: 'Common',
    UNCOMMON: 'Uncommon',
    RARE: 'Rare',
    LEGENDARY: 'Legendary'
});

const winningIndex = ref(-1);
const buttonDisabled = ref(false);

// Generates properties for a single card
const generateCardData = () => {
    const random = Math.random();
    let rarity, volume;

    if (random < 0.05) {
        // 5% chance for Legendary (best volume)
        rarity = RARITIES.LEGENDARY;
        volume = Math.floor(Math.random() * 11) + 45; // 45-55
    } else if (random < 0.15) {
        // 10% chance for Rare (good volume)
        rarity = RARITIES.RARE;
        volume = Math.floor(Math.random() * 21) + 40; // 40-60
    } else if (random < 0.40) {
        // 25% chance for Uncommon (decent volume)
        rarity = RARITIES.UNCOMMON;
        volume = Math.floor(Math.random() * 40) + 61; // 61-100
    } else {
        // 60% chance for Common (annoying volume)
        rarity = RARITIES.COMMON;
        volume = Math.floor(Math.random() * 39) + 1; // 1-39
    }
    return { rarity, volume };
};

const spinCards = () => {
    if (buttonDisabled.value) return;
    buttonDisabled.value = true;
    for (let i = 0; i < cardCount; i++) {
        cards.value.push({ id: i + 1, ...generateCardData() });
    }

    isFlipped.value = true;

    setTimeout(() => {
        const containerWidth = 800;
        const winningCardIndex = 25;

        winningIndex.value = winningCardIndex;

        const totalWinningIndex = initialCards.value.length + winningCardIndex;
        const winningCardCenter = (totalWinningIndex * (cardWidth + cardGap)) + (cardWidth / 2);
        const finalTranslateX = (containerWidth / 2) - winningCardCenter;

        const spinDistance = 1000;

        const startTranslateX = finalTranslateX + spinDistance;
        cardsStyle.value = {
            transform: `translateX(${startTranslateX}px)`,
            transition: 'none'
        };

        requestAnimationFrame(() => {
            cardsStyle.value = {
                transform: `translateX(${finalTranslateX}px)`,
                transition: 'transform 5s cubic-bezier(0.1, 0.8, 0.2, 1)'
            };

            // Enable the button after the animation completes (5 seconds)
            setTimeout(() => {
                buttonDisabled.value = false;
                selectedCardInfo.value = cards.value[winningCardIndex];
            }, 5000);
        });
    }, 500);
};

const resetCards = () => {
    if (buttonDisabled.value) return;
    buttonDisabled.value = true;
    isFlipped.value = false;
    winningIndex.value = -1;
    let cardData = [];
     for (let i = 0; i < 4; i++) {
        cardData.push({ id: i + 1, ...generateCardData() });
    }
    initialCards.value = cardData;

    setTimeout(() => {
        cardsStyle.value.transition = 'transform 0.5s ease';
        cardsStyle.value = {
            transform: 'translateX(0)',
            transition: 'none'
        };
    }, 500);

    setTimeout(() => {
        cards.value = [];
        buttonDisabled.value = false;
    }, 1000);
}

onMounted(() => {
    for (let i = 0; i < 4; i++) {
        initialCards.value.push({ id: i + 1, ...generateCardData() });
    }
});

</script>

<style scoped>
.loot-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.loot-box__cards-container {
    width: 800px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.loot-box__cards-container::before,
.loot-box__cards-container::after {
    content: "";
    position: absolute;
    top: 0;
    width: 32px;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.loot-box__cards-container::before {
    left: 0;
    background: linear-gradient(to right, #fff 50%, transparent 70%);
}

.loot-box__cards-container::after {
    right: 0;
    background: linear-gradient(to left, #fff 50%, transparent 70%);
}

.loot-box__cards {
    display: flex;
    gap: 24px;
    /* width: 100%; */ /* Removed */
    /* justify-content: center; */ /* Removed */
}

.loot-box__spin-button {
    width: 200px;
    height: 50px;
    margin: 20px auto;
    background-color: #EFBF04; /* gold */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.5em;
    cursor: pointer;
}

.is-disabled {
    background-color: #ccc; /* gray */
    cursor: not-allowed;
}
</style>