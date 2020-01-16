<template>
    <div>
        <kl-chat-message
            v-for="msg in messages"
            :key="msg._id"
            :message="msg"
        ></kl-chat-message>
    </div>
</template>

<script>
import KlChatMessage from '@/components/kl-chat-message'

export default {
    name: 'KlChatMessageList',
    components: {
        KlChatMessage,
    },
    data() {
        return {
            sndAvatar: '',
            rcvAvatar: '',
            messages: [
                { type: 'snd', content: '喝水' },
                { type: 'snd', content: '喝水' },
                { type: 'rcv', content: '解毒' },
                { type: 'snd', content: '喝水' },
                { type: 'snd', content: '喝水' },
                { type: 'rcv', content: '解毒' },
                { type: 'snd', content: '喝水' },
                { type: 'snd', content: '喝水' },
                { type: 'snd', content: '喝水' },
                { type: 'rcv', content: '解毒' },
                { type: 'snd', content: '喝水' },
                { type: 'snd', content: '喝水' },
                {
                    type: 'snd',
                    content:
                        '喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水喝水',
                },
                {
                    type: 'rcv',
                    content:
                        '解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒解毒',
                },
                { type: 'rcv', content: '解毒' },
            ],
        }
    },
}
</script>

<style scoped></style>
