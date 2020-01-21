import { SERVER } from '../../util'

const state = {
    userInfo: { id: '', name: '' },
    totalUsers: [],
    userLoading: false,
    loginName: '',
}

const mutations = {
    setUserInfo(state, { id, name }) {
        state.userInfo = { id, name }
    },
    setTotalUsers(state, users) {
        state.totalUsers = users
    },
    toggleLoading(state, toggle) {
        state.userLoading = toggle
    },
    setName(state, name) {
        state.loginName = name
    },
}

const actions = {
    async fetchUsers({ commit, state }) {
        commit('toggleLoading', true)
        try {
            const res = await fetch(`${SERVER}/user?self=${state.userInfo.id}`)
            commit('setTotalUsers', await res.json())
        } catch (e) {
            // eslint-disable-next-line
            console.error(e)
            commit('setTotalUsers', [])
        } finally {
            commit('toggleLoading', false)
        }
    },
    async login({ commit, state, dispatch }) {
        let res
        commit('toggleLoading', true)
        try {
            res = await fetch(`${SERVER}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: state.loginName }),
            })
        } catch (e) {
            // eslint-disable-next-line
            console.error(e)
            commit('setUserInfo', { id: '', name: '' })
        } finally {
            commit('toggleLoading', false)
        }
        commit('setUserInfo', { id: await res.json(), name: state.loginName })
        // setup the websocket connection
        dispatch('establishConnection')
    },
}

export default {
    state,
    mutations,
    actions,
}
