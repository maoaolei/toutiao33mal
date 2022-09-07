<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>十倍{{ bigNum }}</h1>
    <button @click="ADD(10)">加10</button>
  </div>
</template>

<script>
// mapMutations方法 映射到methods里面
// rem 适配
// 让rem动起来 yarn add amfe-flexible
// 使用rem
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  },
  methods: {
    ...mapMutations(['ADD'])
  }
}
</script>

<style scoped>
.login {
  width: 700px;
  height: 88px;
  background-color: pink;
}
</style>
