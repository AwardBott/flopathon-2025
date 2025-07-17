<template>
    <div class="modal-backdrop" @click.self="$emit('redirect')">
        <div class="modal" @click.self="$emit('redirect')">
            <button class="close-button" @click="$emit('close')">×</button>

            <h2>🎉 Congrats on getting Premium</h2>
            <ul class="benefits-list">
                <li>🔊 Boosted control time 10s => 15s</li>
                <li>🚫 Ads</li>
                <li>💾 No custom settings</li>
                <li>🎨 Access to exclusive theme</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
defineEmits(['close', 'redirect'])
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    background: #fff;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    text-align: center;
}

.benefits-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    text-align: left;
}

.benefits-list li {
    padding: 8px 0;
    font-size: 1rem;
    border-bottom: 1px solid #eee;
}

.close-button {
    position: relative;
    top: 10px;
    right: -190px;
    background: transparent;
    border: none;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    color: black;
}
</style>

