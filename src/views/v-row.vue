<template>
  <v-dialog transition="dialog-bottom-transition">
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
          <v-text-field label="视频编号(BVID)" variant="solo"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="isActive.value = false">确定</v-btn>
          <v-btn color="error" @click="isActive.value = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
