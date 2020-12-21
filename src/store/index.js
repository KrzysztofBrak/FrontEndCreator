import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newProjectModalOpened: false,
    projectName:''
  },
  getters:{
    getNewProjectModal(state){
      return state.newProjectModalOpened
    },
    getProjectName(state){
      return state.projectName
    }
  },

  mutations: {
    setNewProjectModal(state, value){
      state.newProjectModalOpened = value
    },
    setProjectName(state, value){
      state.projectName = value
    }
  },
  actions: {
  },
  modules: {

  }
})
