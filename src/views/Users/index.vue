<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />
    <!-- 信息修改 -->
    <!-- 更新头像 -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.jpg,gif,.pdf"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>

    <!-- 昵称 -->
    <van-cell title="昵称" is-link @click="isShowNickName = true">
      {{ profile.name }}
    </van-cell>
    <!-- 性别 -->
    <van-cell title="性别" is-link @click="changeSex = true">{{
      profile.gender === 0 ? '男' : '女'
    }}</van-cell>
    <!-- 生日 -->
    <van-cell title="生日" is-link @click="changeDate = true">{{
      profile.birthday
    }}</van-cell>
    <!-- 更新头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avatar
        v-if="isShowPhoto"
        :photo="photo"
        :avator.sync="avator"
      ></update-avatar>
    </van-popup>
    <!-- 更新昵称弹出层 -->
    <van-popup
      v-model="isShowNickName"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="isShowNickName = false"
        @click-right="sure"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
    <!-- 更新性别弹出层 -->
    <van-popup v-model="changeSex" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        ref="picker"
      />
    </van-popup>
    <!-- 更新生日弹出层 -->
    <van-popup
      v-model="changeDate"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        @cancel="changeDate = false"
        @confirm="dateConfirm"
        :min-date="minDate"
        :max-date="maxDate"
        ref="datePicker"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { resloveToBase64 } from '@/utils'
import { getUserProfileAPI, getEditUserInfo } from '@/api'
export default {
  components: { UpdateAvatar },
  data() {
    return {
      isShowPhoto: false,
      isShowNickName: false,
      changeSex: false,
      changeDate: false,
      profile: '',
      photo: '',
      sex: '',
      avator: '',
      params: {
        name: '',
        gender: '',
        birthday: '',
        real_name: '张三',
        intro: '自我介绍'
      },
      message: '',
      columns: ['男', '女'],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2022, 9, 17)
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async selectPhoto() {
      // 获取用户选择图片的file二进制对象
      const file = this.$refs.file.files[0]
      // console.log(file)
      // file对象转化成img.src可识别的属性
      const base64 = await resloveToBase64(file)
      this.photo = base64
      this.isShowPhoto = true
      // console.log(base64)
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e.target.result)
      // }
      this.$refs.file.value = ''
    },
    onConfirm() {
      const res = this.$refs.picker.getValues()
      const sex = res[0] === '男' ? '0' : '1'
      this.params.gender = sex
      this.changeSex = false
      this.getEditUser()
    },
    dateConfirm() {
      const res = this.$refs.datePicker.getPicker().getValues()
      this.params.birthday = res.join('-')
      this.changeDate = false
      this.getEditUser()
    },
    onCancel() {
      this.changeSex = false
    },
    async getUserProfile() {
      try {
        const { data } = await getUserProfileAPI()
        this.profile = data.data
        this.photo = data.data.photo
        this.message = data.data.name
        // console.log(data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户未认证,请登录')
        } else {
          throw error
        }
      }
    },
    sure() {
      this.params.name = this.message
      this.profile.name = this.params.name
      this.isShowNickName = false
      this.getEditUser()
    },
    async getEditUser() {
      const { data } = await getEditUserInfo(this.params)
      if (data.message === 'OK') {
        this.getUserProfile()
        this.$toast.success('更改成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3396fc;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
