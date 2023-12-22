<template>
  <v-layout>
    <v-main>
      <v-app-bar :elevation="2" color="primary">
        <v-app-bar-title>控制面板</v-app-bar-title>
        <template v-slot:append>
          <AddVideoDialog />
          <v-btn @click="logout">登出</v-btn>
        </template>
      </v-app-bar>
      
      <v-container>
        <v-row>
          <v-col cols="12" v-for="(video, index) in videos" :key="index">
            <VideoCard :data="video" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import AddVideoDialog from '@/components/AddVideoDialog.vue'
import { useAppStore } from '@/store/app'
import { supabase } from '@/services/supabase';
import router from '@/router';

const store = useAppStore()

const videos = ref([] as any[])

store.socket.on('connect', () => {
  console.log('socket connected')
  store.socket.emit('loadVideos')
})

store.socket.on('loadVideos', (_videos: any[]) => {
  videos.value = []

  setTimeout(() => {
    videos.value = _videos
  }, 5)
})

async function logout() {
  await supabase.auth.signOut().then(() => {
    store.socket.disconnect()

    router.go(0)
  })
}
</script>
