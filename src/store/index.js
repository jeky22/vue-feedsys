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
    ads: [],
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
    fetchCategory(state, category) {
      state.category = category
    },
    setParams(state, params) {
      Object.assign(state.params, params)
    },
    fetchAds(state, ads) {
      state.ads.push(...ads)
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
        await this.dispatch("fetchAds")
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
        await this.dispatch("fetchAds")
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
      if (res.status === 200) commit('fetchCategory', res.data.category)
      return res.data.category
    },
    async fetchDetail(_, params) {
      const res = await instance.get('/view', { params })
      if (res.status === 200) return res.data.data
      return false
    },
    async fetchAds({ commit }) {
      while (this.state.ads.length <= this.state.params.page * 3) {
        const params = { page: this.state.params.page, limit: 3 }
        const res = await instance.get('/ads', { params })
        if (res.status === 200) commit('fetchAds', res.data.data)
      }
      return
    },
  },
  modules: {
  }
})
