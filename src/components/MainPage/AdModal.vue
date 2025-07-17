<template>
    <div class="modal-backdrop" @click.self="onCancel">
        <div class="modal">
            <h1>Changing volume is Premium!</h1>
            <p>Watch a 30s ad to change your volume, or purchase Premium for more volume control benefits!</p>
            <div class="modal-buttons">
                <button @click="$emit('confirm')">Watch 30s ad</button>
                <button @click="$emit('cancel')">I want Premium! (10 points)</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineEmits(['confirm', 'cancel'])

function onCancel() {
    // Optional: click outside to cancel
    emit('cancel')
}
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
</style>
