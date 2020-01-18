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
                    <kl-chat-message-list></kl-chat-message-list>
                </template>
                <template #input>
                    <kl-chat-input></kl-chat-input>
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
            userInfo: undefined,
        }
    },
    methods: {
        login(payload) {
            this.isLogin = true
            this.userInfo = { ...payload }

            const socket = new WebSocket(WSSERVER)
            socket.onopen = function(e) {
                // eslint-disable-next-line
                console.log(e)
                socket.send(
                    JSON.stringify({
                        event: 'login',
                        data: { id: payload.id },
                    }),
                )
            }
            socket.onclose = function(e) {
                // eslint-disable-next-line
                console.log(e)
            }
        },
    },
}
</script>
