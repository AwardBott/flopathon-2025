
<template>
    <div class="loot-box">
        <div class="loot-box__background">
            {{ funnyText.slice(0, 5) }}
            <i v-for="i in 4" :key="i" class="ph-fill ph-hand-pointing"></i>
            {{ funnyText }}
            <i v-for="i in 10" :key="i" class="ph-fill ph-hand-pointing"></i>
            {{ funnyText.slice(20, 50) }}
            {{ funnyText }}
            <i v-for="i in 10" :key="i" class="ph-fill ph-hand-pointing"></i>
            {{ funnyText }}
            {{ funnyText }}
       </div>
        <div class="loot-box__cards-container">
            <div class="loot-box__cards" :style="cardsStyle">
                <loot-box-card
                    v-for="(card, index) in cards"
                    :index="index"
                    :key="card.id"
                    :rarity="buttonDisabled ? card.fake.rarity : card.rarity"
                    :volume="buttonDisabled ? card.fake.volume : card.volume"
                    :winningIndex="winningIndex"
                />
            </div>
            <i class="loot-box__icon ph-fill ph-hand-pointing"></i>
        </div>
        <click-combo-counter
            v-if="!isFlipped || buttonDisabled"
            class="loot-box__combo"
            :click-count="clickCount"
            :k-o="clickThreshold"
        >
            <button
                :class="['loot-box__spin-button', { 'is-disabled': buttonDisabled }]"
                @click="onClick(true)"
            >
                Spin!
            </button>
        </click-combo-counter>
        <click-combo-counter
            v-else
            class="loot-box__combo"
            :click-count="clickCount"
            :k-o="clickThreshold"
        >
            <button
                :class="['loot-box__spin-button', { 'is-disabled': buttonDisabled }]"
                @click="onClick(false)"
            >
                Accept!
            </button>
        </click-combo-counter>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import LootBoxCard from '@/components/LootBox/LootBoxCard.vue';
import { useVolumeStore } from '@/components/useVolumeStore.js';
import ClickComboCounter from '@/components/LootBox/ClickComboCounter.vue';

const cardCount = 75; // Set the desired number of cards
const cardWidth = 320;
const cardGap = 24;

const router = useRouter();

const cards = ref([]);
const cardsStyle = ref({
    transform: 'translateX(0)',
    transition: 'none'
});

const store = useVolumeStore();
const { isFlipped, selectedCardInfo, volume, clickThreshold } = storeToRefs(store);

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

    const fakeData = getFakeRarity();

    if (random < 0.01) {
        rarity = RARITIES.LEGENDARY;
        volume = Math.floor(Math.random() * 11) + 45; // 45-55
    } else if (random < 0.05) {
        rarity = RARITIES.RARE;
        volume = Math.floor(Math.random() * 16) + 55; // 55-70
    } else if (random < 0.40) {
        rarity = RARITIES.UNCOMMON;
        volume = Math.floor(Math.random() * 26) + 75; // 75-100
    } else {
        rarity = RARITIES.COMMON;
        volume = Math.floor(Math.random() * 25) + 1; // 1-25
    }
    return { rarity, volume, fake: fakeData };
};

const getFakeRarity = () => {
    const random = Math.random();
    let rarity, volume;

    if (random < 0.20) {
        rarity = RARITIES.LEGENDARY;
        volume = Math.floor(Math.random() * 11) + 45; // 45-55
    } else if (random < 0.40) {
        rarity = RARITIES.RARE;
        volume = Math.floor(Math.random() * 16) + 55; // 55-70
    } else if (random < 0.60) {
        rarity = RARITIES.UNCOMMON;
        volume = Math.floor(Math.random() * 26) + 75; // 75-100
    } else {
        rarity = RARITIES.COMMON;
        volume = Math.floor(Math.random() * 25) + 1; // 1-25
    }
    return { rarity, volume };
}

const funnyText = getFakeRarity.toString();

const populateCards = () => {
    const newCards = [];
    for (let i = 0; i < cardCount; i++) {
        newCards.push({ id: i + 1, ...generateCardData() });
    }
    cards.value = newCards;
};

const spinCards = () => {
    if (buttonDisabled.value) return;
    buttonDisabled.value = true;
    populateCards(); // Generate new cards for the spin

    isFlipped.value = true;

    setTimeout(() => {
        const containerWidth = 800;
        const winningCardIndex = Math.floor(cardCount / 2); // Center card is the winner

        const winningCardCenter = (winningCardIndex * (cardWidth + cardGap)) + (cardWidth / 2);
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

            setTimeout(() => {
                buttonDisabled.value = false;
                winningIndex.value = winningCardIndex;
                selectedCardInfo.value = cards.value[winningCardIndex];
            }, 5000);
        });
    }, 500);
};

const resetCards = () => {
    if (buttonDisabled.value) return;
    buttonDisabled.value = true;
    isFlipped.value = false;
    volume.value = selectedCardInfo.value.volume;
    store.setAdTimeout();
    router.push('/');
    winningIndex.value = -1;

    setTimeout(() => {
        cardsStyle.value = {
            transform: 'translateX(0)',
            transition: 'transform 0.5s ease'
        };
    }, 500);

    setTimeout(() => {
        populateCards(); // Generate a new set of cards for the next round
        buttonDisabled.value = false;
    }, 1000);
}

onMounted(() => {
    populateCards();
});

const clickCount = ref(0);
const onClick = (isSpin) => {
    if (buttonDisabled.value) return;
    clickCount.value += 1;
    if (clickCount.value === clickThreshold.value) {
        clickCount.value = 0;
        clickThreshold.value += 2;
        if (isSpin) {
            spinCards()
        }
        else {
            resetCards();
        }
    }
}
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

.loot-box__icon {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 50px;
    background-color: #EFBF04;
}

.is-disabled {
    background-color: #ccc; /* gray */
    cursor: not-allowed;
}

.loot-box__combo {
    margin: 20px auto;
}

.loot-box__background {
    font-size: 50px;
    position: absolute;
    overflow-y: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    background: repeating-linear-gradient(
        135deg,
        #f0f0f0,
        #f0f0f0 10px,
        #dcdcdc 10px,
        #dcdcdc 20px
    );
    background-size: 200% 200%;
    opacity: 0.5;
    z-index: -1;
    animation: moveBackground 40s linear infinite;
}

.loot-box__background .ph-hand-pointing {
    display: inline-block; /* Required for transform */
    animation: glitch-rotate 2s linear infinite;
}

@keyframes moveBackground {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 -100%;
    }
}

@keyframes glitch-rotate {
    0%, 49.9%, 75%, 100% {
        transform: rotate(0deg);
    }
    50%, 74.9% {
        transform: rotate(15deg);
    }
}
</style>