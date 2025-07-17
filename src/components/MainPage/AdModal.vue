<template>
    <div class="modal-backdrop" @click.self="$emit('redirect')">
        <div class="modal" @click.self="$emit('redirect')">
            <button class="close-button" @click="$emit('close')">×</button>

            <h1>Changing volume is Premium!</h1>
            <p>Watch a 30s ad to change your volume, or purchase Premium for more volume control benefits!</p>
            <div class="modal-buttons">
                <button @click="$emit('confirm')">Watch 30s ad</button>
                <button v-if="!userIsPremium" @click="$emit('premium')">I want Premium! (10 points)</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineEmits(['confirm', 'premium', 'close', 'redirect'])

defineProps({
    userIsPremium: {
        type: Boolean,
        default: false,
    }
})
</script>

<style scoped>
.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.modal-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
}

.modal-buttons button {
    padding: 8px 16px;
    font-size: 1rem;
}

.close-button {
    position: relative;
    top: 10px;
    right: -285px;
    background: transparent;
    border: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    color: black;
}
</style>
