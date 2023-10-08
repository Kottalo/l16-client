<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="i in 2" :key="i">
        <VideoCard />
      </v-col>
    </v-row>

    <v-dialog transition="dialog-bottom-transition" width="600">
      <template v-slot:activator="{ props }">
        <v-row justify="center">
          <v-col class="text-center">
            <v-btn icon size="large" color="primary" v-bind="props">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar color="primary" title="添加视频"></v-toolbar>
          <v-card-text>
            <v-text-field label="视频编号(BVID)" variant="solo" v-model="bvid"></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="success" @click="addVideo(); isActive.value = false">确定</v-btn>
            <v-btn color="error" @click="isActive.value = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import { useAppStore } from '@/store/app'

const store = useAppStore()

const bvid = ref('')

store.socket.on('connect', () => {
  console.log('socket connected')
  store.socket.emit('loadVideos')
})

store.socket.on('loadVideos', (videos: any[]) => {
  console.log(videos)
})

function addVideo() {
  store.socket.emit('addVideo', bvid.value)

  bvid.value = ''
}

</script>
