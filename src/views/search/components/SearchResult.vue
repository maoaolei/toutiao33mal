<template>
  <div class="result">
    <van-list
      @load="getResults"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 20,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        if (Math.random() < 0.5) {
          throw new Error()
        }
        const { data } = await getResultsAPI(
          this.page++,
          this.per_page,
          this.keywords
        )
        const res = data.data.results
        if (res.length === 0) {
          this.finished = true
        }
        // console.log(data)
        this.results = [...this.results, ...res]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
