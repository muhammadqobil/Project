import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import SecureLS from "secure-ls";
import createPersistedState from 'vuex-persistedstate'

let ls = new SecureLS({ isCompressions: false })

import state from './module-example/state'
import * as getters from './module-example/getters'
import * as mutations from './module-example/mutations'
import * as actions from './module-example/actions'


export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    getters,
    mutations,
    actions,
    state,
    modules: {
      // example
    },
    plugins: [
      createPersistedState({
        storage:{
          getItem: key => ls.get(key),
          setItem: (key, value) => ls.set(key , value),
          removeItem: key => ls.remove(key)
        }
      })
    ],
    strict: process.env.NODE_ENV !== 'production'
  })

  return Store
})
