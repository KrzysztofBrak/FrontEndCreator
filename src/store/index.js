import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTextSelected: false,
    newProjectModalOpened: false,
    projectName:'',
    actualZoom: 0.5,
    // sectionsArray: [{
    //   id: 'section_0',
    //   isActive: true
    // }],
    activeElement:{
      id: 'section_0',
      isActive: true,
      style:{},
      childs:[{
        id: 'section_0_col_0',
        isActive: false,
        style:{},
        childs:[]
      }]
    },
    workplaceData:{
      isWorkplaceActive: false,
      sectionsLength: 0,
      sections:[{
        id: 'section_0',
        isActive: true,
        style:{},
        childs:[{
          id: 'section_0_col_0',
          isActive: false,
          style:{},
          childs:[]
        }
        ]
      }]
    }
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
    getTextSelected(state){
      return state.isTextSelected
    },



    getWorkplaceData(state){
      return state.workplaceData
    },
    getSectionsLength(state){
      return state.workplaceData.sectionsLength
    },
    getActiveElement(state){
      if(state.workplaceData.isWorkplaceActive){
        return state.workplaceData.sections

      }else{
        let isActiveSection = state.workplaceData.sections.find(x => x.isActive === true)
        if(isActiveSection){
          return isActiveSection

        }else{
          for(let section in state.workplaceData.sections){
            let isActiveChild = section.childs.find(x => x.isActive === true)
            return isActiveChild
          }
        }
      }
    }
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
    setTextSelected(state, value){
      state.isTextSelected = value
    },


//workplace store
    setWorkplaceData(state, value){
      state.workplaceData = value
    },
    setSectionsData(state, value){
      state.workplaceData.sections.push(value)
    },
    addSectionChilds(state, value){
      let index = value.id.split('_')[1]
      console.log(index)
      state.workplaceData.sections[index].childs.push(value)
    },
    setSectionsLength(state, value){
      state.workplaceData.sectionsLength = value
    },
    setUpdatedArray(state, value){
      state.workplaceData.sections.splice(value, 1)
    },
    setWorkplaceActive(state, value){
      state.workplaceData.isWorkplaceActive = value
    },
  }
})
