<template>
    <div>
        <div class="info">
            <span class="info__name">{{ info.name }}</span>
            <el-button
                icon="el-icon-search"
                circle
                @click="listShow = true"
            ></el-button>
        </div>
        <el-dialog title="用户" :visible.sync="listShow">
            <kl-chat-userlist @click="listShow = !listShow"></kl-chat-userlist>
        </el-dialog>
    </div>
</template>

<script>
import KlChatUserlist from './kl-chat-userlist'

export default {
    name: 'KlMineInfo',
    components: {
        KlChatUserlist,
    },
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            listShow: false,
        }
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
