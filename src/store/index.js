import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 配置项
// key:默认值是vuex
// storage 存储的方式 默认是本地存储
// reducer 指定持久化哪些数据是一个函数 return一个对象，作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      // 默认接收一个state
      reducer({ tokenObj, myChannels, histories }) {
        return {
          tokenObj,
          myChannels,
          histories
        }
      }
    })
  ],
  state: {
    tokenObj: {},
    myChannels: [],
    histories: []
  },
  // 相当于vue里面的计算属性 computed
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    },
    SET_HISTORIES(state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
