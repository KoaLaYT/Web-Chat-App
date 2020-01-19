<template>
    <div>
        <!-- login -->
        <el-dialog
            :visible="!isLogin"
            :show-close="false"
            title="登录"
            :width="'30%'"
        >
            <kl-login @login="login"></kl-login>
        </el-dialog>
        <!-- messages -->
        <transition name="el-zoom-in-top">
            <kl-chat-layout v-if="isLogin">
                <template #sidebar>
                    <kl-mine-info :info="{ name: userInfo.name }"></kl-mine-info>
                    <kl-chat-overview-list></kl-chat-overview-list>
                </template>
                <template #messages>
                    <kl-chat-message-list v-loading="msgLoading"></kl-chat-message-list>
                </template>
                <template #input>
                    <kl-chat-input @msgSend="handleSend"></kl-chat-input>
                </template>
            </kl-chat-layout>
        </transition>
    </div>
</template>

<script>
import KlLogin from '@/components/kl-login'
import KlMineInfo from '@/components/kl-mine-info'
import KlChatLayout from '@/components/kl-chat-layout'
import KlChatOverviewList from '@/components/kl-chat-overview-list'
import KlChatInput from '@/components/kl-chat-input'
import KlChatMessageList from '@/components/kl-chat-message-list'
import { WSSERVER } from './util'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'app',
    components: {
        KlLogin,
        KlChatLayout,
        KlChatOverviewList,
        KlMineInfo,
        KlChatInput,
        KlChatMessageList,
    },
    data() {
        return {
            isLogin: false,
            socket: undefined,
        }
    },
    computed: {
        ...mapState(['userInfo', 'msgLoading', 'withInfo']),
    },
    methods: {
        ...mapActions(['updateUserInfo', 'addChatMsg', 'confirmChatMsg']),
        login(payload) {
            this.isLogin = true
            this.updateUserInfo(payload)

            this.socket = new WebSocket(WSSERVER)
            this.socket.onopen = e => {
                // eslint-disable-next-line
                console.log(e)
                this.socket.send(
                    JSON.stringify({
                        event: 'login',
                        data: { id: payload.id },
                    }),
                )
            }
            this.socket.onmessage = e => {
                // eslint-disable-next-line
                console.log(e)
                const res = JSON.parse(e.data)
                switch (res.event) {
                    case 'confirm': {
                        this.confirmChatMsg(res.data)
                    }
                }
            }
            this.socket.onclose = () => {
                // eslint-disable-next-line
                console.log('socket closed')
                this.socket = undefined
            }
        },
        handleSend(msg) {
            if (this.socket) {
                const id = Date.now()
                this.socket.send(
                    JSON.stringify({
                        event: 'message',
                        data: {
                            id,
                            sndId: this.userInfo.id,
                            sndName: this.userInfo.name,
                            rcvId: this.withInfo.id,
                            rcvName: this.withInfo.name,
                            msg,
                        },
                    }),
                )
                // this id is fake, waiting for server receive,
                // and will be replaced with real id
                this.addChatMsg({
                    id,
                    type: 'snd',
                    content: msg,
                    sending: true,
                })
            }
        },
    },
}
</script>
