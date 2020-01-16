<template>
    <div class="info">
        <span class="info__name">{{ info.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'KlMineInfo',
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.info {
    display: flex;
    padding: 1rem;
}
.info__name {
    margin: auto;
}
</style>
