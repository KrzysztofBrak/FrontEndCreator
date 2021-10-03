import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkMode: false,
    isTextSelected: false,
    newProjectModalOpened: false,
    colorsGeneratorModalOpened: false,
    actualZoom: 0.4,
    //That helps to avoid bubbling effect
    itemClicked:'section',
    elementToEdit: 'section_0',

    workplaceData:{
      projectName:'',
      isWorkplaceActive: false,
      workplaceWidth: '1920px',
      sections:[{
        id: 'section_0',
        isActive: true,
        style:{
          height: '300px',
          width: '100%',
          background:'#FFFFFF00',
          borderWidth: '',
          borderStyle: '',
          borderColor: '#FFFFFF00',
          borderRadius: '',
          borderTopLeftRadius:'',
          borderTopRightRadius:'',
          borderBottomLeftRadius:'',
          borderBottomRightRadius:'',
        },
        childStyle:{},
        columns:[{
          id: 'section_0-col_0',
          isActive: false,
          style:{
            height: '100%',
            width: '100%',
            background:'#FFFFFF00',
          },
          childStyle:{},
          childs:[{
            id: 'section_0-col_0-item_0',
            type: 'text',
            content:'section_0-col_0-item_0',
            isActive: false,
            style:{
              background:'#FFFFFF00',
            },
            childStyle:{},
          }]
        }]
      }]
    }
  },
  plugins: [createPersistedState()],

  getters:{
    getDarkMode(state){
      return state.isDarkMode
    },
    getProjectName(state){
      return state.workplaceData.projectName
    },
    getNewProjectModal(state){
      return state.newProjectModalOpened
    },
    getColorsGeneratorModalOpened(state){
      return state.colorsGeneratorModalOpened
    },
    getActualZoom(state){
      return state.actualZoom
    },
    getTextSelected(state){
      return state.isTextSelected
    },
    getTtemClicked(state){
      return state.itemClicked
    },
    getWorkplaceData(state){
      return state.workplaceData
    },
    getElementToEdit(state){
      return state.elementToEdit
    }
  },

  mutations: {
    setDarkMode(state, value){
      state.isDarkMode = value
    },
    setNewProjectModal(state, value){
      state.newProjectModalOpened = value
    },
    setColorsGeneratorModal(state, value){
      state.colorsGeneratorModalOpened = value
    },
    setProjectName(state, value){
      state.workplaceData.projectName = value
    },
    setActualZoom(state, value){
      state.actualZoom = value
    },
    setTextSelected(state, value){
      state.isTextSelected = value
    },
    setItemClicked(state, value){
      state.itemClicked = value
    },

    //workplace store
    setWorkplaceData(state, value){
      state.workplaceData = value
    },
    setSectionsData(state, value){
      state.workplaceData.sections.push(value)
    },
    setUpdatedArray(state, value){
      state.workplaceData.sections.splice(value, 1)
    },
    setWorkplaceActive(state, value){
      state.workplaceData.isWorkplaceActive = value
    },
    addSectionChilds(state, value){
      const findSection = state.workplaceData.sections.find(x => x.id === value.id.split('-')[0])
      findSection.columns.push(value)
    },
    setDeleteColumn(state, value){
      const findSection = state.workplaceData.sections.find(x => x.id === value.id.split('-')[0])
      const findColumn = findSection.columns.findIndex(x => x.id === value.id)
      findSection.columns.splice(findColumn, 1)
    },
    addItemToColumn(state, value){
      const findSection = state.workplaceData.sections.find(x => x.id === value.id.split('-')[0]);
      const findColumn = findSection.columns.find(x => x.id === value.id.split('-item_')[0]);
      findColumn.childs.push(value)
    },
    setDeleteItem(state, value){
      const findSection = state.workplaceData.sections.find(x => x.id === value.id.split('-')[0]);
      const findColumn = findSection.columns.find(x => x.id === value.id.split('-item_')[0]);
      const findItem = findColumn.childs.findIndex(x => x.id === value.id)
      findColumn.childs.splice(findItem, 1)
    },
    setElementToEdit(state, value){
      if(value === true){
        let IDArray = state.elementToEdit.split('-');
        IDArray.splice(IDArray.length-1, 1)

        state.elementToEdit = (IDArray.join('-') === '') ? "workplace" : IDArray.join('-')
      }else{
        state.elementToEdit = value
      }
    }
  }
})
