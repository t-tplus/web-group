import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import adminModule from './admin'
import scoreModule from './score'
import stateModule from './state'
export default new Vuex.Store({
  modules: {
    stateMod: stateModule,
    adminMod: adminModule,
    scoreMod: scoreModule,
  }
})

