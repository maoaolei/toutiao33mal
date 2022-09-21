<template>
  <div>
    <div class="information" v-for="(item, i) in main" :key="i">
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
    <!-- 回复评论弹出层 -->
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
            <van-button type="default" size="mini" round class="callback"
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
      <div class="ending">没有更多了~</div>
      <footer class="footer">
        <div class="footercomment" @click="response"><p>评论</p></div>
      </footer>
    </van-popup>
    <!-- 回复弹出层的评论弹出层 -->
    <van-popup v-model="resshow" position="bottom" :style="{ height: '20%' }">
      <div class="vanpopup">
        <div class="send"><p @click="addRES">发布</p></div>
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
import { getCommentsAPI, addCommentAPI } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  name: 'comList',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentType: 'a',
      commentRes: 'c',
      commentList: [],
      comid: '',
      main: '',
      mainres: '',
      olditem: '',
      isShow: false,
      show: false,
      resNum: '',
      resshow: false,
      message: '',
      params: {
        target: '',
        content: '',
        art_id: ''
      },
      newObj: ''
    }
  },
  filters: {
    changeTime(time) {
      return dayjs(time).fromNow()
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    add(comid) {
      this.comid = comid
      this.params.target = comid
      this.getCommentsRES()
      this.show = true
      this.olditem = this.main.filter((item) => {
        return item.com_id === comid
      })
      console.log(this.olditem)
    },
    async getComments() {
      try {
        const { data } = await getCommentsAPI(this.commentType, this.id)
        this.main = data.data.results
        console.log(this.main)
      } catch (error) {
        if (error.response && error.response.statua === 400) {
          this.$toast.fail('请求参数错误')
        } else {
          throw error
        }
      }
    },
    async getCommentsRES() {
      const { data } = await getCommentsAPI(this.commentRes, this.comid)
      this.mainres = data.data.results
      this.resNum = data.data.total_count
      console.log(data)
    },
    addRES() {
      this.params.content = this.message
      this.params.art_id = this.id
      // console.log(this.params)
      this.addResponse()
    },
    response() {
      this.resshow = true
    },
    async addResponse() {
      const { data } = await addCommentAPI(this.params)
      this.newObj = data.data.new_obj
      this.mainres.unshift(this.newObj)
      this.resshow = false
      this.message = ''
      this.resNum++
      this.olditem.forEach((item) => {
        item.reply_count++
      })
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: brown;
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
      margin-top: 3px;
    }
    .seconds {
      color: #999;
    }
  }
  :deep(.btn) {
    font-size: 25px;
    // width: 180px;
    position: absolute;
    right: 20px;
    margin-top: 15px;
  }
}
.Comcontent {
  font-size: 0.42667rem;
}
:deep(.callback) {
  width: 130px;
  color: #000;
  font-weight: 500;
  margin-left: 30px;
}
.resNum {
  text-align: center;
  color: #323233;
  font-weight: 500;
  font-size: 0.42667rem;
}
.ending {
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 80px;
}
.footer {
  position: fixed;
  width: 100%;
  height: 100px;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  .footercomment {
    width: 70%;
    height: 60px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    font-size: 18px;
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
