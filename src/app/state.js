import { create } from 'zustand'

const useStore = create((set) => ({
    user: null,
    admin: false,
    loading: false,
    toast: {
        type: 'warning',
        message: ''
    },
    setLoading: (bool) => set(() => ({ loading: bool })),
    setUser: (user) => set(() => ({ user: user })),
    setAdmin: (isAdmin) => set(() => ({ admin: isAdmin })),
    setToast: (type, msg) => set({ toast: {
        type: type,
        message: msg
    }}),
    clearToast: () => set({toast: {
        type: 'warning',
        message: ''
    }}),
}))

export default useStore