<template>
  <v-card color="grey-lighten-4" flat>
    <v-toolbar class="pl-3" color="primary" :dark="false">
      <v-img :max-width="80" :src="imageUrl"></v-img>
      <v-toolbar-title>{{ data?.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn icon>
        <DeleteVideoDialog :data="data" />
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="2" xl="2" md="2" sm="4" xs="4">
            <v-container class="h-100">
              <v-row class="pa-0 mb-3" style="height: 45%;">
                <v-col class="pa-0">
                  <v-card height="120">
                    <v-toolbar class="pl-3" color="primary" :dark="false" density="compact">
                      <v-toolbar-title>播放/分钟</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                      <div v-if="data?.records[0]" class="text-h4 text-center">
                        {{ data?.records[0]?.view_per_min }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row style="height: 10%;"></v-row>
              <v-row class="pa-0" style="height: 45%;">
                <v-col class="pa-0">
                  <v-card height="120">
                    <v-toolbar class="pl-3" color="primary" :dark="false" density="compact">
                      <v-toolbar-title>粉丝/分钟</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                      <div v-if="data?.records[0]" class="text-h4 text-center">
                        {{ data?.records[0]?.follower_per_min }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="8" xl="2" md="8" sm="4" xs="4">
            <v-data-table :headers="headers" :items="data?.records" v-model:itemsPerPage="itemsPerPage"
              :itemsPerPageOptions="itemsPerPageOptions">
            </v-data-table>
          </v-col>

          <v-col cols="2" xl="2" md="2" sm="4" xs="4">
            <v-container class="h-100">
              <v-row class="pa-0 mb-3" style="height: 45%;">
                <v-col class="pa-0">
                  <v-card height="120">
                    <v-toolbar class="pl-3" color="primary" :dark="false" density="compact">
                      <v-toolbar-title>播放/收藏</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                      <div v-if="data?.records[0]" class="text-h4 text-center">
                        {{ (data?.records[0]?.view / data?.records[0]?.favorite / 10).toFixed(2) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row style="height: 10%;"></v-row>
              <v-row class="pa-0" style="height: 45%;">
                <v-col class="pa-0">
                  <v-card height="120">
                    <v-toolbar class="pl-3" color="primary" :dark="false" density="compact">
                      <v-toolbar-title>播放/分享</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                      <div v-if="data?.records[0]" class="text-h4 text-center">
                        {{ (data?.records[0]?.view / data?.records[0]?.share / 100).toFixed(2) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DeleteVideoDialog from './DeleteVideoDialog.vue';
import { supabase } from '@/services/supabase';
import { onMounted } from 'vue';

const props = defineProps({
  data: Object,
})

const itemsPerPage = ref(5)

const headers = ref<any>([
  { title: '时间', key: 'formattedCreatedAt', align: 'start' },
  { title: '播放', key:'view', align: 'end' },
  // { title: '播放/分', key: 'view_per_min', align: 'end' },
  { title: '点赞', key:'like', align: 'end' },
  // { title: '点赞/分', key: 'like_per_min', align: 'end' },
  { title: '硬币', key:'coin', align: 'end' },
  // { title: '硬币/分', key: 'coin_per_min', align: 'end' },
  { title: '收藏', key:'favorite', align: 'end' },
  // { title: '收藏/分', key: 'favorite_per_min', align: 'end' },
  { title: '分享', key:'share', align: 'end' },
  // { title: '分享/分', key: 'share_per_min', align: 'end' },
  { title: '粉丝', key:'follower', align: 'end' },
  // { title: '粉丝/分', key: 'follower_per_min', align: 'end' },
  { title: '评论', key:'reply', align: 'end' },
  // { title: '评论/分', key: 'reply_per_min', align: 'end' },
  // { title: '弹幕', key: 'danmaku', align: 'end' },
])

const itemsPerPageOptions = ref<any[]>([])

for (let i = 5; i <= 20; i += 5) {
  itemsPerPageOptions.value.push({
    title: i.toString(),
    value: i,
  })
}

const imageUrl = ref('')

onMounted(async () => {
  await getVideoPicUrl()
})

async function getVideoPicUrl() {
  const picUrl = await supabase.storage.from('main-bucket').getPublicUrl(`videos/${props.data?.bvid}.jpg`)

  imageUrl.value = picUrl.data?.publicUrl
}
</script>