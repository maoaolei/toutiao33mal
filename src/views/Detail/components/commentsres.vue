<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '90%' }">
    <div class="resNum">{{ resNum }}条回复</div>
    <div class="information" v-for="(item, i) in olditem" :key="i">
      <div class="aventer">
        <img :src="item.aut_photo" alt="" />
      </div>
      <div class="name">
        <p>{{ item.aut_name }}</p>
        <p class="Comcontent">{{ item.content }}</p>
        <div>
          <span class="seconds">{{ item.pubdate | changeTime }}</span>
          <van-button
            type="default"
            size="mini"
            round
            class="callback"
            @click="add(item.com_id)"
            >回复<span>{{ item.reply_count }}</span></van-button
          >
        </div>
      </div>
      <div class="btn"><van-icon name="good-job-o" /><span>赞</span></div>
    </div>
    <van-button
      type="default"
      size="mini"
      round
      class="callback"
      @click="add(item.com_id)"
      >全部回复
    </van-button>
    <!-- 回复的内容 -->
    <div class="information" v-for="item in mainres" :key="item.com_id">
      <div class="aventer">
        <img :src="item.aut_photo" alt="" />
      </div>
      <div class="name">
        <p>{{ item.aut_name }}</p>
        <p class="Comcontent">{{ item.content }}</p>
        <div>
          <span class="seconds">{{ item.pubdate | changeTime }}</span>
          <van-button
            type="default"
            size="mini"
            round
            class="callback"
            @click="add(item.com_id)"
            >回复<span>{{ item.reply_count }}</span></van-button
          >
        </div>
      </div>
      <div class="btn"><van-icon name="good-job-o" /><span>赞</span></div>
    </div>
    <comments></comments>
  </van-popup>
</template>

<script>
import comments from './comments.vue'
export default {
  components: {
    comments
  }
}
</script>

<style></style>
