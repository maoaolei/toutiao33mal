import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  // 相当于vue里面的计算属性 computed
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    ADD(state, payload) {
      state.count += payload
    }
  },
  actions: {},
  modules: {}
})
