<template>
  <div class="article">
    <!--  @load触底的时候触发-->
    <!-- 滚动条与底部距离小于 offset 时触发load事件, 默认值: 300 -->
    <!--  是否在初始化时立即执行滚动位置检查, 默认值: true-->
    <!--  loading为true时 load事件不会被触发  false时会被触发 load事件执行时完成后会将loading设置为true-->
    <!-- 是否已加载完成，加载完成后不再触发load事件, 默认值: false true时不会触发load事件 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in acticles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleLIST',
  components: { ArticleItem },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      acticles: [],
      loading: false,
      preTimestamp: '',
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    // +new Date() Date.now()  new Date().valueof 获取当前时间戳
    async getFirstPageArticle() {
      try {
        const { data } = await getArticle(this.id, +new Date())
        this.acticles = data.data.results
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误，507原封不动上抛 400上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageArticle() {
      try {
        // 模拟错误
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        const { data } = await getArticle(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下拉刷新将数据放最前面
        if (this.refreshLoading) {
          this.acticles.unshift(...data.data.results)
        } else {
          this.acticles.push(...data.data.results)
        }
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
//  overflow: auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块/条
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
