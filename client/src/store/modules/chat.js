import { SERVER, fetchData } from '../../util'

const state = {
    chatMsgs: [],
    withInfo: { id: '', name: '' },
    msgLoading: false,
    overviewList: [],
    overviewLoading: false,
}

const mutations = {
    addChatMsg(state, msg) {
        state.chatMsgs.push(msg)
        setImmediate(() => {
            document.querySelector('.last').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            })
        })
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
    toggleMsgLoading(state, toggle) {
        state.msgLoading = toggle
    },
    getOverviewList(state, list) {
        state.overviewList = list
    },
    toggleOverviewLoading(state, toggle) {
        state.overviewLoading = toggle
    },
    addToOverviewList(state, msg) {
        const index = state.overviewList.findIndex(o => o.id === msg.id)
        if (index !== -1) {
            // already in overview list
            state.overviewList.splice(index, 1, msg)
            // TODO: shift the order
        } else {
            // create a new overview list
        }
    },
}

const actions = {
    async fetchChatHistory(
        { commit, rootState },
        { withId, withName, pageNum },
    ) {
        if (rootState.user.userInfo.id) {
            commit('setCurrentWithId', { id: withId, name: withName })
            const msgs = await fetchData({
                fetchFn: () =>
                    fetch(
                        `${SERVER}/message/${rootState.user.userInfo.id}?with=${withId}&pageSize=10&pageNum=${pageNum}`,
                    ),
                loadingProp: 'toggleMsgLoading',
                commit,
            })
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

    async fetchChatOverview({ commit, rootState }) {
        const list = await fetchData({
            fetchFn: () =>
                fetch(
                    `${SERVER}/message/overview/${rootState.user.userInfo.id}`,
                ),
            loadingProp: 'toggleOverviewLoading',
            commit,
        })
        commit('getOverviewList', list)
    },
}

export default {
    state,
    mutations,
    actions,
}
