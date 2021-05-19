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
    params: {
      page: 0,
      ord: "asc",
      category: [],
      limit: 10
    }
  },
  mutations: {
    fetchFeeds(state, feeds) {
      state.feeds = feeds
    },
    updateFeeds(state, feeds) {
      state.feeds.push(...feeds)
    },
    setCategory(state, category) {
      state.category = category
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    increasePage(state) {
      state.params.page++
    }
  },
  actions: {
    async fetchFeeds({ commit }, params) {
      commit('setParams', { page: 1, ...params })
      const res = await instance.get('/list', { params: this.state.params })
      if (res.status === 200) {
        commit('fetchFeeds', res.data.data)
        if (res.data.next_page_url) {
          commit('increasePage')
        }
        else {
          console.log('--lastPage--')
          return false
        }
      }
      return true
    },
    async updateFeeds({ commit }) {
      const res = await instance.get('/list', { params: this.state.params })
      if (res.status === 200) {
        commit('updateFeeds', res.data.data)
        if (res.data.next_page_url) {
          commit('increasePage')
        }
        else {
          console.log('--lastPage--')
          return false
        }
      }
      return true
    },
    async fetchCategory({ commit }) {
      const res = await instance.get('/category')
      if (res.status === 200) commit('setCategory', res.data.category)
      return res.data.category
    },
  },
  modules: {
  }
})
