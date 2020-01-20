import { SERVER } from '../../util'

const state = {
    chatMsgs: [],
    withInfo: { id: '', name: '' },
    msgLoading: false,
}

const mutations = {
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
}

const actions = {
    async fetchChatHistory(
        { commit, rootState },
        { withId, withName, pageNum },
    ) {
        if (rootState.user.userInfo.id) {
            commit('setCurrentWithId', { id: withId, name: withName })
            let msgs = []
            commit('msgStartLoading')
            try {
                const res = await fetch(
                    `${SERVER}/message/${rootState.user.userInfo.id}?with=${withId}&pageSize=10&pageNum=${pageNum}`,
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
                    type:
                        msg.sndId === rootState.user.userInfo.id
                            ? 'snd'
                            : 'rcv',
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
}

export default {
    state,
    mutations,
    actions,
}
