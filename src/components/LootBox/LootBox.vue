
<template>
    <div class="loot-box">
        <div class="loot-box-header">
            <h1>Loot Box</h1>
        </div>
        <div class="loot-box__cards">
            <loot-box-card v-for="i in 4" :key="i" :index="i" />
        </div>

    </div>
</template>

<script setup>

import LootBoxCard from '@/components/LootBox/LootBoxCard.vue';
</script>

<style scoped>
.loot-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.loot-box__cards {
    display: flex;
    gap: 24px;
    justify-content: center;
}
</style>