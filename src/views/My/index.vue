<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的头部 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
              ><van-button
                round
                size="mini"
                class="edit-btn"
                @click="$router.push('/user')"
                >编辑资料</van-button
              ></van-row
            >
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>
                {{ userInfo.art_count }}
              </template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>
                {{ userInfo.fans_count }}
              </template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>
                {{ userInfo.follow_count }}
              </template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>
                {{ userInfo.like_count }}
              </template></van-grid-item
            >
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的头部 -->
      <div class="logout banner" v-else>
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <span class="text" @click="$router.push('/login')">登录 / 注册</span>
      </div>
    </header>

    <!-- 主体部分 -->
    <main>
      <van-grid :column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div>
        <van-cell title="消息通知" :is-link="true" />
        <van-cell title="小智同学" :is-link="true" />
      </div>
    </main>

    <!-- 底部部分 -->
    <footer>
      <van-button block v-if="isLogin" @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MY',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// background-size 要写复合写法 必须要有background-position
.profile {
  height: 100vh;
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orangered;
  }
}
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    margin-top: 10px;
    color: #fff;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
