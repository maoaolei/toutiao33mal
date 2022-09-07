<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            block
            type="default"
            round
            native-type="button"
            class="yzbtn"
            size="small"
            v-if="flag"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="sss"
            @finish="flag = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      flag: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async sendCode() {
      // 验证是否输入有效的手机号
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.flag = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下错误 1.js错误  2.axios封装的error对象
        // error.response.status后端返回的状态码  error.response.data后端返回的数据
        console.log(error)
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前组件
// vue-cli 提供了语法 :deep() 深度选择器
.nav-bar {
  background-color: pink;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    background-color: pink;
    border: 1px solid pink;
  }
}
.yzbtn {
  height: 0.64rem;
  background-color: pink;
  color: white;
}
</style>
