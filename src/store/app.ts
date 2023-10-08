// Utilities
import { defineStore } from 'pinia'

import io from 'socket.io-client'

const socket = io('http://localhost:8080')

export const useAppStore = defineStore('app', {
  state: () => ({
    socket: socket,
  }),
})
