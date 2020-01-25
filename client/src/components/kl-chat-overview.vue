<template>
    <div :class="withInfo.id===overview.id?'overview chatting':'overview'">

        <el-badge
            :is-dot="overview.new"
            class="overview__avatar"
        >
            <el-avatar
                shape="square"
                size="large"
                src="./koala-avatar.png"
                fit="contain"
            ></el-avatar>
        </el-badge>

        <section class="overview__info">
            <span>{{ overview.title }}</span>
            <span>{{ overview.message }}</span>
        </section>

        <section class="overview__time">{{ overview.time | short-date }}</section>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'KlChatOverview',
    props: {
        overview: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState({
            withInfo: state => state.chat.withInfo,
        }),
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
    background-color: rgba(0, 0, 0, 0);
}
.overview__info {
    flex: 3 1 0;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
}
.overview__time {
    flex: 1 1 0;
    align-self: center;
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
.overview.chatting {
    background-color: #e4e7ed;
}
</style>
