<template>
  <div>
    <transition name="van-slide-left" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// rem 适配
// 让rem动起来 yarn add amfe-flexible
// 使用rem
export default {}
</script>

<style scoped>
.login {
  width: 700px;
  height: 88px;
  background-color: pink;
}
</style>
