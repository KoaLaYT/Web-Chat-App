export const SERVER = 'http://www.koalayt.top'
export const WSSERVER = 'ws://www.koalayt.top/chat'

export async function fetchWithLoading(fn) {
    this.update = true
    try {
        await fn()
    } catch (e) {
        // eslint-disable-next-line
        console.error(e)
    } finally {
        this.update = false
    }
}
