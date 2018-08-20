import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    basic: {
      name: '',
      desc: '',
      imgUrl: '' ,
      link : ''
    },
    token: localStorage.getItem('token'),
    user: {},
    order_purchasers: [],
    order_address:{}
  },
  getters: {
    getBasic (state) {
      return state.basic
    },
    getUserInfo (state) {
      return state.user
    },
    getOrderPurchasers (state) {
      return state.order_purchasers
    },
    getOrderAddress (state) {
      return state.order_address
    }
  },
  mutations: {
    setBasic (state , info) {
      state.basic = info 
    },
    setUserInfo (state, user) {
      state.user = user
    },
    setOrderPurchasers (state, purchasers) {
      state.order_purchasers = purchasers
    },
    setOrderAddress(state, address) {
      state.order_address = address
    }
  },
  actions: {
    updateUser (content, user) {
      if (user) {
        content.commit('setUserInfo', user)
      } else {
        api.account.detail().then((res) => {
          content.commit('setUserInfo', res.data)
        })
      }
    }
  }
})

export default store
