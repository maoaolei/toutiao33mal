<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="黑马头条" class="nav-bar">
      <template #left
        ><van-icon name="arrow-left" class="left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <div class="meiddle">
      <h5>{{ main.title }}</h5>
      <!-- 个人信息区域 -->
      <div class="information">
        <div class="aventer">
          <img :src="main.aut_photo" alt="" />
        </div>
        <div class="name">
          <p>{{ main.aut_name }}</p>
          <div>{{ date }}</div>
        </div>
        <van-button
          type="info"
          class="btn"
          round
          size="small"
          v-if="flag"
          @click="flag = !flag"
        >
          <van-icon name="plus" /> 关注
        </van-button>
        <van-button
          type="default"
          class="btn"
          round
          size="small"
          v-else
          @click="flag = true"
          >已关注
        </van-button>
      </div>
      <!-- 文章内容详情 -->
      <article class="markdown-body">
        <span v-html="main.content"></span>
      </article>
      <div class="extra">
        <p>正文结束</p>
      </div>
      <!-- 评论列表 -->
      <comments :id="article_id" ref="comment"></comments>
      <div class="extra">
        <p>没有更多了~</p>
      </div>
    </div>
    <!-- 底部区域 -->
    <footer class="footer">
      <div class="comment" @click="show = true">写评论</div>
      <div class="iconslist">
        <van-badge :content="main.comm_count">
          <van-icon name="comment-o" id="icon" />
        </van-badge>
        <van-icon
          :name="isactive ? 'star' : 'star-o'"
          id="icon"
          :class="{ active: isactive }"
          @click="isactive = !isactive"
        />
        <van-icon name="good-job-o" id="icon" />
        <van-icon name="share" id="icon" />
      </div>
    </footer>
    <!-- 评论弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <div class="vanpopup">
        <div class="send"><p @click="add">发布</p></div>
        <div>
          <van-field
            v-model.trim="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { getArticleDetailAPI, addCommentAPI } from '@/api'
import comments from './components/comments.vue'
import dayjs from '@/utils/dayjs'
// 全局注册
Vue.use(ImagePreview)
export default {
  components: { comments },
  data() {
    return {
      flag: true,
      show: false,
      article_id: this.$route.query.article_id,
      main: '',
      message: '',
      isactive: false,
      new_obj: '',
      imgList: [],
      params: {
        target: '',
        content: ''
      }
    }
  },
  created() {
    this.getArticleDetail()
  },
  computed: {
    date() {
      return `${dayjs(this.main.pubdate).fromNow()}`
    }
  },
  methods: {
    async getArticleDetail() {
      const { data } = await getArticleDetailAPI(this.article_id)
      this.main = data.data
      console.log(data)
      // 图片切换
      this.$nextTick(() => {
        const mainRef = document.querySelector('.markdown-body')
        const images = mainRef.querySelectorAll('img')
        // console.log(images)
        images.forEach((item, i) => {
          this.imgList.push(item.src)
          item.onclick = () => {
            ImagePreview({
              images: this.imgList,
              startPosition: i
            })
          }
        })
      })
    },
    add() {
      // console.log(123)
      this.addComment()
      this.show = false
    },
    async addComment() {
      this.params.target = this.article_id
      this.params.content = this.message
      const { data } = await addCommentAPI(this.params)
      this.new_obj = data.data.new_obj
      this.$refs.comment.main.unshift(this.new_obj)
      console.log(this.$refs.comment.main)
      console.log(this.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: pink;
}
.nav-bar {
  background-color: #3296fa;
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.meiddle {
  height: calc(100vh - 46px - 120px);
  overflow: auto;
}
.information {
  display: flex;
  position: relative;
  padding: 10px;
  .aventer {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.22667rem;
    margin-top: 15px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .name {
    margin-top: 5px;
    font-size: 14px;
    margin-left: 10px;
    div {
      color: #999;
      margin-top: 3px;
    }
  }
  :deep(.btn) {
    width: 180px;
    position: absolute;
    right: 30px;
    margin-top: 15px;
  }
}
.extra {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.footer {
  width: 100%;
  height: 80px;
  border-top: 1px solid #000;
  // background-color: pink;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #999;
  .comment {
    width: 200px;
    border-radius: 20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 40px;
    border: 1px solid #999;
    // background-color: green;
  }
  .iconslist {
    margin-left: 120px;
  }
  :deep(#icon) {
    font-size: 50px;
    margin-left: 40px;
  }
}
.vanpopup {
  position: relative;
  .send {
    font-size: 30px;
    position: absolute;
    right: 25px;
    top: 50px;
    color: red;
    z-index: 999;
  }
}
:deep(.van-cell) {
  width: 90%;
  height: 250px;
  padding: 0.3rem 0.42667rem;
  .van-cell__value {
    background-color: #f5f7f9;
    margin-top: 30px;
  }
}
</style>
