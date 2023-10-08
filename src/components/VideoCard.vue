<template>
  <v-card color="grey-lighten-4" flat>
    <v-toolbar class="pl-3" color="primary" :dark="false">
      <v-img :max-width="80" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-data-table :headers="headers" :items="desserts" :itemsPerPage="itemsPerPage"
        :itemsPerPageOptions="itemsPerPageOptions">
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const itemsPerPage = ref(5)

const headers = [
  { title: '时间', key: 'createdAt', align: 'start' },
  { title: '播放', key: 'view', align: 'end' },
  { title: '点赞', key: 'like', align: 'end' },
  { title: '硬币', key: 'coin', align: 'end' },
  { title: '收藏', key: 'favorite', align: 'end' },
  { title: '分享', key: 'share', align: 'end' },
  { title: '粉丝', key: 'follower', align: 'end' },
  { title: '评论', key: 'reply', align: 'end' },
  { title: '弹幕', key: 'danmaku', align: 'end' },
]

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]

const itemsPerPageOptions = ref<any[]>([])

for (let i = 5; i <= 20; i += 5) {
  itemsPerPageOptions.value.push({
    title: i.toString(),
    value: i,
  })
}
</script>