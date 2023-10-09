<template>
  <v-dialog transition="dialog-bottom-transition" width="600">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
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

  <v-snackbar v-model="showSnackbar" multi-line timeout="2000" :color="snackbarData?.color">
    {{ snackbarData.text }}
    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false">
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/app'

const store = useAppStore()

const bvid = ref('')
const showSnackbar = ref(false)
const snackbarData = ref()

function addVideo() {
  store.socket.emit('addVideo', bvid.value, (res: any) => {
    if (res.snackbar) {
      snackbarData.value = res.snackbar
      showSnackbar.value = true
    }
  })

  bvid.value = ''
}
</script>