import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            username: 'guest',
            level: 'guest'
        }
    }),
    getters: {
        getLevel(state) {
            return state.user.level
        }
    },
    actions: {
        init(username, level) {
            this.user.username = username
            this.user.level = level
        }
    }
})