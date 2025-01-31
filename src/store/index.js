import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token'),
    companions: [],
    currentChat: null,
    messages: [],
    orders: [],
    posts: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_COMPANIONS(state, companions) {
      state.companions = companions
    },
    SET_CURRENT_CHAT(state, chat) {
      state.currentChat = chat
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message)
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const { data } = await axios.post('/api/login', credentials)
      if (data.success) {
        commit('SET_USER', data.user)
        commit('SET_TOKEN', data.token)
      }
      return data
    },
    async fetchCompanions({ commit }, filters) {
      const { data } = await axios.get('/api/companions', { params: filters })
      commit('SET_COMPANIONS', data)
    },
    async createOrder({ commit }, orderData) {
      const { data } = await axios.post('/api/orders', orderData)
      return data
    },
    async fetchOrders({ commit }) {
      const { data } = await axios.get('/api/orders')
      commit('SET_ORDERS', data)
    },
    async createPost({ commit }, postData) {
      const { data } = await axios.post('/api/posts', postData)
      return data
    },
    async fetchPosts({ commit }) {
      const { data } = await axios.get('/api/posts')
      commit('SET_POSTS', data)
    }
  }
}) 