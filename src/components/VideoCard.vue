<template>
  <v-card color="grey-lighten-4" flat>
    <v-toolbar class="pl-3" color="primary" :dark="false">
      <v-img :max-width="80" :src="data?.pic"></v-img>
      <v-toolbar-title>{{ data?.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn icon>
        <DeleteVideoDialog :data="data" />
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-data-table :headers="headers" :items="data?.records" :itemsPerPage="itemsPerPage"
        :itemsPerPageOptions="itemsPerPageOptions">
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import DeleteVideoDialog from './DeleteVideoDialog.vue';

defineProps({
  data: Object,
})

const itemsPerPage = ref(5)

const headers = [
  { title: '时间', key: 'formattedCreatedAt', align: 'start' },
  { title: '播放', key: 'view', align: 'end' },
  { title: '播放/分', key: 'view_per_min', align: 'end' },
  { title: '点赞', key: 'like', align: 'end' },
  { title: '点赞/分', key: 'like_per_min', align: 'end' },
  { title: '硬币', key: 'coin', align: 'end' },
  { title: '硬币/分', key: 'coin_per_min', align: 'end' },
  { title: '收藏', key: 'favorite', align: 'end' },
  { title: '收藏/分', key: 'favorite_per_min', align: 'end' },
  { title: '分享', key: 'share', align: 'end' },
  { title: '分享/分', key: 'share_per_min', align: 'end' },
  { title: '粉丝', key: 'follower', align: 'end' },
  { title: '粉丝/分', key: 'follower_per_min', align: 'end' },
  { title: '评论', key: 'reply', align: 'end' },
  { title: '评论/分', key: 'reply_per_min', align: 'end' },
  // { title: '弹幕', key: 'danmaku', align: 'end' },
]

const itemsPerPageOptions = ref<any[]>([])

for (let i = 5; i <= 20; i += 5) {
  itemsPerPageOptions.value.push({
    title: i.toString(),
    value: i,
  })
}
</script>