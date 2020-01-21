<template>
    <div class="input">
        <section class="input__toolbar">
            <kl-chat-toolbar></kl-chat-toolbar>
            <el-button
                type="primary"
                size="mini"
                @click="handleSend"
            >发送</el-button>
        </section>
        <el-input
            class="input__message"
            v-model="message"
            rows="4"
            type="textarea"
            resize="none"
        ></el-input>
    </div>
</template>

<script>
import KlChatToolbar from '@/components/kl-chat-toolbar'
import { mapActions } from 'vuex'
export default {
    name: 'KlChatInput',
    components: {
        KlChatToolbar,
    },
    data() {
        return {
            message: '',
        }
    },
    methods: {
        ...mapActions(['sendMsg']),
        handleSend() {
            if (this.message) {
                this.sendMsg(this.message)
                this.message = ''
            }
        },
    },
}
</script>

<style scoped>
.input__toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
}
</style>
