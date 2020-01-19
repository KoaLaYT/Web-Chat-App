<template>
    <div>
        <kl-chat-message
            v-for="msg in messages"
            :key="msg.id"
            :message="msg"
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
            messages: 'chatMsgs',
        }),
    },
}
</script>

<style scoped></style>
