import Vue from 'vue'
import Vuex from 'vuex'
import { SERVER } from '../util'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /** user info */
        userInfo: { id: '', name: '' },
        /** chat info */
        chatMsgs: [],
        withInfo: { id: '', name: '' },
        msgLoading: false,
    },
    mutations: {
        /** user info */
        setUserInfo(state, { id, name }) {
            state.userInfo = { id, name }
        },
        /** chat info */
        addChatMsg(state, msg) {
            state.chatMsgs.push(msg)
        },
        initChatMsg(state, msgs) {
            state.chatMsgs = msgs
        },
        confirmChatMsg(state, { originId, realId }) {
            const msg = state.chatMsgs.find(msg => msg.id === originId)
            if (msg) {
                msg.id = realId
                delete msg.sending
            }
        },
        setCurrentWithId(state, withInfo) {
            state.withInfo = withInfo
        },
        msgStartLoading(state) {
            state.msgLoading = true
        },
        msgStopLoading(state) {
            state.msgLoading = false
        },
    },
    actions: {
        /** user info */
        updateUserInfo({ commit }, userInfo) {
            commit('setUserInfo', userInfo)
        },
        resetUserInfo({ commit }) {
            commit('setUserInfo', { id: '', name: '' })
        },
        /** chat info */
        async fetchChatHistory(
            { commit, state },
            { withId, withName, pageNum },
        ) {
            if (state.userInfo.id) {
                commit('setCurrentWithId', { id: withId, name: withName })
                let msgs = []
                commit('msgStartLoading')
                try {
                    const res = await fetch(
                        `${SERVER}/message/${state.userInfo.id}?with=${withId}&pageSize=10&pageNum=${pageNum}`,
                    )
                    msgs = await res.json()
                } catch (e) {
                    // eslint-disable-next-line
                    console.error(e)
                } finally {
                    commit('msgStopLoading')
                }
                commit(
                    'initChatMsg',
                    msgs.map(msg => ({
                        id: msg._id,
                        type: msg.sndId === state.userInfo.id ? 'snd' : 'rcv',
                        content: msg.msg,
                    })),
                )
            }
        },
        addChatMsg({ commit }, msg) {
            commit('addChatMsg', msg)
        },
        confirmChatMsg({ commit }, msgInfo) {
            commit('confirmChatMsg', msgInfo)
        },
    },
})
