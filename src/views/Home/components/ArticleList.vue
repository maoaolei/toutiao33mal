<template>
  <div>
    <article-item
      v-for="item in acticles"
      :key="item.art_id"
      :article="item"
    ></article-item>
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
      acticles: []
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
    }
  }
}
</script>

<style></style>
