// Utilities
import { defineStore } from 'pinia'
import io from 'socket.io-client'

const socketIoUrl = import.meta.env.VITE_SOCKET_IO_URL

const socket = io(socketIoUrl)

export const useAppStore = defineStore('app', {
  state: () => ({
    socket: socket,
  }),
})
