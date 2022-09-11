<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar route>
      <van-tabbar-item to="/ "
        ><template #icon>
          <span class="toutiao toutiao-shouye"></span> </template
        ><span class="text">首页</span></van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><template #icon><span class="toutiao toutiao-shipin"></span> </template
        ><span class="text">视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/qa"
        ><template #icon><span class="toutiao toutiao-wenda"></span> </template>
        <span class="text">问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/profile"
        ><template #icon><span class="toutiao toutiao-wode"></span> </template
        ><span class="text">{{
          isLogin ? '我的' : '未登录'
        }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 40px;
}
.text {
  font-size: 30px;
}
</style>
