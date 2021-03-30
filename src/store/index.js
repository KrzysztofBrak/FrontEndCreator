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

    activeElement:{
      id: 'section_0',
      isActive: true,
      style:{
        height: '300px',
        width: '100%',
        background:'#FFFFFF00',
        borderWidth: '0px',
        borderStyle: 'none',
        borderColor: '#FFFFFF00',
        borderRadius: '0px',
      },
      childStyle:{},
      columns:[{
        id: 'section_0-col_0',
        isActive: false,
        style:{
          height: '100%',
          width: '100%',
        },
        childStyle:{},
        childs:[{
          id: 'section_0-col_0-item_0',
          type: 'text',
          content:'section_0-col_0-item_0',
          isActive: false,
          style:{},
          childStyle:{},
        }]
      }]
    },


    workplaceData:{
      projectName:'',
      isWorkplaceActive: false,
      sectionsLength: 0,
      workplaceWidth: '1920px',
      sections:[{
        id: 'section_0',
        isActive: true,
        style:{
          height: '300px',
          width: '100%',
          background:'#FFFFFF00',
          borderWidth: '0px',
          borderStyle: 'none',
          borderColor: '#FFFFFF00',
          borderRadius: '0px',
          borderTopLeftRadius:'0px',
          borderTopRightRadius:'0px',
          borderBottomLeftRadius:'0px',
          borderBottomRightRadius:'0px',
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
    getSectionsArray(state){
      return state.sectionsArray
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
    getSectionsLength(state){
      return state.workplaceData.sectionsLength
    },
    getActiveElement(state){
      if(state.workplaceData.isWorkplaceActive){
        return state.workplaceData.sections

      }
      let isActiveSection = state.workplaceData.sections.find(x => x.isActive === true)
      return isActiveSection

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
      console.log('index');
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
      console.log('SETTT');
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
    },

    setElementToEdit(state, value){
      if(value === true){
        let IDArray = state.elementToEdit.split('-');
        IDArray.splice(IDArray.length-1, 1)
        console.log(value, IDArray.join('-'));
        if(IDArray.join('-') === ''){
          state.elementToEdit = "workplace";
        }else{
          state.elementToEdit = IDArray.join('-');
        }
      }else{
        state.elementToEdit = value
      }
    }

  }
})
