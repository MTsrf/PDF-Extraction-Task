export const SessionStorage = {
    set: (token, value) => localStorage.setItem(token, value),
    get: (token) => localStorage.getItem(token),
    setObject: (token, value) => localStorage.setItem(token, JSON.stringify(value)),
    remove: (token) => localStorage.removeItem(token),
    clear: () => localStorage.clear(),
}