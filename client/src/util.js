export const SERVER = 'http://www.koalayt.top'
export const WSSERVER = 'ws://www.koalayt.top/chat'

export async function fetchData({ fetchFn, loadingProp, commit }) {
    commit(loadingProp, true)
    try {
        const res = await fetchFn()
        return await res.json()
    } catch (e) {
        // eslint-disable-next-line
        console.error(e)
        return []
    } finally {
        commit(loadingProp, false)
    }
}
