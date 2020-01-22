<template>
    <div>
        <kl-chat-message
            v-for="(msg, index) in messages"
            :key="msg.id"
            :message="msg"
            :class="index===messages.length-1?'last':''"
        ></kl-chat-message>
    </div>
</template>

<script>
import KlChatMessage from '@/components/kl-chat-message'
import { mapState } from 'vuex'

export default {
    name: 'KlChatMessageList',
    components: {
        KlChatMessage,
    },
    computed: {
        ...mapState({
            messages: state => state.chat.chatMsgs,
        }),
    },
}
</script>

<style scoped></style>
