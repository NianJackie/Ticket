export default {
    setInfo(key, value) {
        window.localStorage.setItem(key, value);
    },
    getInfo(key) {
        return window.localStorage.getItem(key) || ''
    },
    removeInfo(key) {
        window.localStorage.removeItem(key)
    }
}