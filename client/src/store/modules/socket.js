import { WSSERVER } from '../../util'

const state = {
    socket: undefined,
    pendingMsgs: [],
}

const mutations = {
    clearSocket(state) {
        state.socket = undefined
    },
    addToPendingMsg(state, msg) {
        state.pendingMsgs.push(msg)
    },
    removeFromPendingMsg(state, index) {
        state.pendingMsgs.splice(index, 1)
    },
}

const actions = {
    establishConnection({ commit, dispatch, state, rootState }) {
        state.socket = new WebSocket(WSSERVER)

        // onopen: register self to server
        state.socket.onopen = () => {
            // eslint-disable-next-line
            console.log('opened')
            document.onvisibilitychange = undefined
            // send pending msgs
            dispatch('sendPendingMsgs')
            // register self
            state.socket.send(
                JSON.stringify({
                    event: 'login',
                    data: { id: rootState.user.userInfo.id },
                }),
            )
        }
        // onmessage:
        // [1] confirm: server has received that msg, remove the spinner
        // [2] message: a new message received
        state.socket.onmessage = e => {
            const msg = JSON.parse(e.data)
            // eslint-disable-next-line
            console.log(msg)
            switch (msg.event) {
                case 'confirm': {
                    commit('confirmChatMsg', msg.data)
                    break
                }
                case 'message': {
                    if (rootState.chat.withInfo.id === msg.data.sndId) {
                        commit('addChatMsg', msg.data)
                    }
                    commit('rcvToOverviewList', {
                        id: msg.data.sndId,
                        title: msg.data.sndName,
                        message: msg.data.content,
                        time: msg.data.time,
                    })
                    break
                }
                default: {
                    // eslint-disable-next-line
                    console.error(`unknown message event: ${msg.event}`)
                }
            }
        }
        // onclose: remove previous listeners and reconnect
        state.socket.onclose = () => {
            commit('clearSocket')
            if (document.hidden) {
                // close happen when webpage in background
                document.onvisibilitychange = () => {
                    if (!document.hidden) {
                        dispatch('establishConnection')
                    }
                }
            } else {
                // immediate reconnect
                dispatch('establishConnection')
            }
        }
        // TODO: onerror
        state.socket.onerror = e => {
            // eslint-disable-next-line
            console.error(e)
        }
    },
    sendMsg({ state, commit, rootState }, msg) {
        if (!rootState.chat.withInfo.id) return
        const originId = Date.now()
        // assemble the message
        const message = {
            event: 'message',
            data: {
                originId,
                sndId: rootState.user.userInfo.id,
                sndName: rootState.user.userInfo.name,
                rcvId: rootState.chat.withInfo.id,
                rcvName: rootState.chat.withInfo.name,
                msg,
            },
        }
        // ensure the socket is open
        if (state.socket && state.socket.readyState === 1) {
            state.socket.send(JSON.stringify(message))
        } else {
            // put it into pending msg
            // waiting for next socket open event
            commit('addToPendingMsg', message)
        }
        // add to msg list, but with a spinner
        commit('addChatMsg', {
            id: originId,
            type: 'snd',
            content: msg,
            sending: true,
        })
        // add to overview list
        commit('sndToOverviewList', {
            id: rootState.chat.withInfo.id,
            title: rootState.chat.withInfo.name,
            message: msg,
            time: new Date(originId).toISOString(),
        })
    },
    sendPendingMsgs({ state, commit }) {
        state.pendingMsgs.forEach((msg, index) => {
            if (state.socket && state.socket.readyState === 1) {
                state.socket.send(JSON.stringify(msg))
                commit('removeFromPendingMsg', index)
            }
        })
    },
}

export default {
    state,
    mutations,
    actions,
}
