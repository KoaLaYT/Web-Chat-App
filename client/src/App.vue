<template>
    <div>
        <!-- login -->
        <el-dialog
            :visible="!userInfo.id"
            :show-close="false"
            title="登录"
            :width="'30%'"
        >
            <kl-login></kl-login>
        </el-dialog>
        <!-- messages -->
        <transition name="el-zoom-in-top">
            <kl-chat-layout v-if="userInfo.id">
                <template #sidebar>
                    <kl-mine-info></kl-mine-info>
                    <kl-chat-overview-list></kl-chat-overview-list>
                </template>
                <template #messages>
                    <kl-chat-message-list v-loading="msgLoading"></kl-chat-message-list>
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
import { mapState } from 'vuex'

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
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            msgLoading: state => state.chat.msgLoading,
        }),
    },
}
</script>
