<template>
    <div class="overview">
        <el-avatar
            shape="square"
            size="large"
            :src="overview.avatar"
            fit="contain"
            class="overview__avatar"
        ></el-avatar>
        <section class="overview__info">
            <span>{{ overview.title }}</span>
            <span>{{ overview.message }}</span>
        </section>
        <section class="overview__time">{{ overview.time }}</section>
    </div>
</template>

<script>
export default {
    name: 'KlChatOverview',
    props: {
        overview: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped>
.overview {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    border-radius: 4px;
}
.overview__avatar {
    flex: 0 0 auto;
    margin: 1rem;
}
.overview__info {
    flex: 3 1 0;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
}
.overview__time {
    flex: 1 1 0;
    align-self: flex-start;
    margin-top: 1rem;
    padding: 0 0.5rem;
}
.overview__info span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.overview:hover {
    background-color: #f2f6fc;
}
</style>
