<template>
    <div>
        <div v-for="item in items" :key="item._id">
            <el-divider class="divider"></el-divider>
            <kl-chat-overview :overview="item"></kl-chat-overview>
        </div>
    </div>
</template>

<script>
import KlChatOverview from './kl-chat-overview'
export default {
    name: 'KlChatOverviewList',
    components: {
        KlChatOverview,
    },
    mounted() {
        setTimeout(() => {
            this.items = [
                {
                    _id: 1,
                    title: '月夜枫',
                    message:
                        '沉江警告沉江警告沉江警告沉江警告沉江警告沉江警告沉江警告',
                    time: '20/01/05',
                },
                { _id: 2, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 3, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 4, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 5, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 6, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 7, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 8, title: '徐志雷', message: '喝水', time: '20/01/05' },
                { _id: 9, title: '徐志雷', message: '喝水', time: '20/01/05' },
            ]
        }, 500)
    },
    data() {
        return {
            items: [],
        }
    },
}
</script>

<style scoped>
.divider {
    margin: 0.75rem 0;
}
</style>
