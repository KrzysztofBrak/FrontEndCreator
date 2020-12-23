import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newProjectModalOpened: false,
    projectName:'',
    actualZoom: 0.75,
    sectionsArray: [],
  },
  getters:{
    getNewProjectModal(state){
      return state.newProjectModalOpened
    },
    getProjectName(state){
      return state.projectName
    },
    getActualZoom(state){
      return state.actualZoom
    },
    getSectionsArray(state){
      return state.sectionsArray
    },
  },

  mutations: {
    setNewProjectModal(state, value){
      state.newProjectModalOpened = value
    },
    setProjectName(state, value){
      state.projectName = value
    },
    setActualZoom(state, value){
      state.actualZoom = value
    },
    addSectionsArray(state, value){
      state.sectionsArray.push(value)
    }
  }
})
