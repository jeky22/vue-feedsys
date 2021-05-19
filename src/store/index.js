import { createStore } from 'vuex'
import axios from 'axios';

const instance = axios.create({
  baseURL: "https://problem.comento.kr/api",
  header: { Accept: "application/json" },
})

export default createStore({
  state: {
    feeds: [],
    category: [],
  },
  mutations: {
    fetchList(state, feeds) {
      state.feeds = feeds
    },
    updateList(state, feeds) {
      state.feeds.push(...feeds)
    },
    updateCategory(state, category) {
      state.category = category
    },
  },
  actions: {
    async fetchFeeds({ commit }, { category, ord }) {
      console.log(category, ord)
      const res = await instance.get('/list', {
        params: {
          page: 3,
          ord,
          category,
          limit: 10
        }
      })
      if (res.status === 200) commit('fetchList', res.data.data)
      return res.data
    },
    async updateFeeds({ commit }, { category, ord }) {
      const res = await instance.get('/list', {
        params: {
          page: 3,
          ord,
          category,
          limit: 10
        }
      })
      if (res.status === 200) commit('updateList', res.data.data)
      return res.data
    },
    async fetchCategory({ commit }) {
      const res = await instance.get('/category')
      if (res.status === 200) commit('updateCategory', res.data.category)
      return res.data.category
    },
  },
  modules: {
  }
})
