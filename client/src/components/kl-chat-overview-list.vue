<template>
    <div v-loading="loading">
        <div
            v-for="item in items"
            :key="item.id"
        >
            <el-divider class="divider"></el-divider>
            <kl-chat-overview
                :overview="item"
                @click.native="handleClick({withId: item.id, withName: item.title})"
            ></kl-chat-overview>
        </div>
    </div>
</template>

<script>
import KlChatOverview from './kl-chat-overview'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'KlChatOverviewList',
    components: {
        KlChatOverview,
    },
    computed: {
        ...mapState({
            loading: state => state.chat.overviewLoding,
            items: state => state.chat.overviewList,
        }),
    },
    mounted() {
        this.fetchChatOverview()
    },
    methods: {
        ...mapActions(['fetchChatOverview', 'fetchChatHistory']),

        handleClick(withInfo) {
            this.fetchChatHistory({ ...withInfo, pageNum: 0 })
        },
    },
}
</script>

<style scoped>
.divider {
    margin: 0.75rem 0;
}
</style>
