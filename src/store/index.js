import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTextSelected: false,
    newProjectModalOpened: false,
    projectName:'',
    actualZoom: 0.4,

    activeElement:{
      id: 'section_0',
      isActive: true,
      style:{},
      columns:[{
        id: 'section_0-col_0',
        isActive: false,
        style:{},
        childs:[{
          id: 'section_0-col_0-item_0',
          type: 'text',
          content:'section_0-col_0-item_0',
          isActive: false,
          style:{},
        }]
      }]
    },


    workplaceData:{
      isWorkplaceActive: false,
      sectionsLength: 0,
      sections:[{
        id: 'section_0',
        isActive: true,
        style:{},
        columns:[{
          id: 'section_0-col_0',
          isActive: false,
          style:{},
          childs:[{
            id: 'section_0-col_0-item_0',
            type: 'text',
            content:'section_0-col_0-item_0',
            isActive: false,
            style:{},
          }]
        }]
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

      }
        let isActiveSection = state.workplaceData.sections.find(x => x.isActive === true)
        console.log(isActiveSection, 'fdsdf');
        return isActiveSection
//         if(isActiveSection){
//           return isActiveSection
// //zawsze zwraca sekcję bo póki co sekcja jest aktywne też wtedy gdy aktywne jest jej dziecko
//         }else{
//           for(let section in state.workplaceData.sections){
//             let isActiveChild = section.columns.find(x => x.isActive === true)
//             return isActiveChild
//           }
//         }

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
      let index = value.id.split('-')[0]
      let findSection = state.workplaceData.sections.findIndex(x => x.id === index)
      state.workplaceData.sections[findSection].columns.push(value)
    },
    setSectionsLength(state, value){
      state.workplaceData.sectionsLength = value
    },
    setUpdatedArray(state, value){
      state.workplaceData.sections.splice(value, 1)
    },
    setDeleteColumn(state, value){
      //find section where column is
      let index = value.id.split('-')[0]
      let findSection = state.workplaceData.sections.findIndex(x => x.id === index)
      //find column to delete
      let findColumn = state.workplaceData.sections[findSection].columns.findIndex(x => x.id === value.id)
      state.workplaceData.sections[findSection].columns.splice(findColumn, 1)
    },
    setWorkplaceActive(state, value){
      state.workplaceData.isWorkplaceActive = value
    },

    addItemToColumn(state, value){
      let sectionIndex = value.id.split('-')[0]
      let findSection = state.workplaceData.sections.findIndex(x => x.id === sectionIndex);

      let columnIndex = value.id.split('-item_')[0]
      let findColumn = state.workplaceData.sections[findSection].columns.findIndex(x => x.id === columnIndex);

      state.workplaceData.sections[findSection].columns[findColumn].childs.push(value)
    },

    setDeleteItem(state, value){
      //find section where item is
      let sectionIndex = value.id.split('-')[0]
      let findSection = state.workplaceData.sections.findIndex(x => x.id === sectionIndex);

      //find column where item is
      let columnIndex = value.id.split('-item_')[0]

      let findColumn = state.workplaceData.sections[findSection]
      .columns.findIndex(x => x.id === columnIndex);

      //find item to delete
      let findItem = state.workplaceData.sections[findSection]
        .columns[findColumn].childs.findIndex(x => x.id === value.id)

      state.workplaceData.sections[findSection].columns[findColumn]
        .childs.splice(findItem, 1)
    }
  }
})
