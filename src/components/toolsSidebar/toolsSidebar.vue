<template>
  <section :class="['tools-section']">
    <div :class="['top-tools-section']">
      <div :class="['button-container']"
        v-for="button in buttons"
        :key="button.alt"
        @click="btnClick(button.alt)">
        <v-icon medium
        >{{button.img}}</v-icon>
      </div>
    </div>
    <div :class="['bottom-tools-section']">
    </div>
  </section>
</template>

<script>
import {buttons} from './content.js'
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'toolsSidebar',
    computed:{
    ...mapGetters([
      'getWorkplaceData',
      'getSectionsLength',
      'getActiveElement'
    ]),
  },
  data: () => ({
    buttons,
  }),
  methods:{
    ...mapMutations([
      'setSectionsData',
      'setTextSelected',
      'setSectionsLength',
      'setWorkplaceActive',
      'addItemToColumn',
      'setElementToEdit',
      'addSectionChilds'
    ]),

    btnClick(btnCategory){
      switch(btnCategory){
        case 'nowa sekcja':
          this.addSection()
          break;

        case 'nowa kolumna':
          this.addColumn()
          break;

        case 'dodaj tekst':
          // this.setTextSelected(true);
          this.addItem('text')
          break;

        case 'dodaj zdjecie':
          // this.setTextSelected(true);
          this.addItem('img')
          break;

        default:
      }
    },


    addSection(){
      //set active section
      this.getWorkplaceData.sections.forEach(section => {
          section.isActive = false;
          section.columns.forEach(column => {
            column.isActive = false;
            column.childs.forEach(item =>{
              item.isActive = false
            })
          })
      });

      let sectionNumber = this.getSectionsLength
      this.setSectionsLength(++sectionNumber);
      this.setSectionsData({
        id: `section_${this.getSectionsLength}`,
        isActive: true,
        style:{
          height: '300px',
          width: '100%',
          background:'#FFFFFF00',
       //   boxShadow: 'box-shadow: 0px 0px 10px 1px rgba(0,0,0,0);',
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
          id: `section_${this.getSectionsLength}-col_0`,
          isActive: false,
          style:{
            height: '100%',
            width: '100%',
            background:'#FFFFFF00',
          },
          childStyle:{},
          childs:[{
            id: `section_${this.getSectionsLength}-col_0-item_0`,
            type: 'text',
            content:`section_${this.getSectionsLength}-col_0-item_0`,
            isActive: false,
            style:{
              background:'#FFFFFF00',
            },
            childStyle:{},
          }]
        }]
      })
      this.setWorkplaceActive(false);
      this.setTextSelected(false);
      this.setElementToEdit(`section_${this.getSectionsLength}`)
    },

    //================================
    addColumn(){
      //get index of last column (it won't work when switching columns places will be active)
      this.getWorkplaceData.sections.forEach(section => {
       //   section.isActive = false;
          section.columns.forEach(column => {
            column.isActive = false;
            column.childs.forEach(item =>{
              item.isActive = false
            })
          })
      });
      //that means there is no active section
      let sectionForNewColumn
      if(this.getActiveElement.length !== undefined){
        sectionForNewColumn = this.getActiveElement[0]
        sectionForNewColumn.isActive = true;
      }else{
        sectionForNewColumn = this.getActiveElement
      }

      let columnIndex = sectionForNewColumn.columns[sectionForNewColumn.columns.length-1].id.split("col_")[1];
      this.addSectionChilds({
          id: `${sectionForNewColumn.id}-col_${++columnIndex}`,
          isActive: true,
          style:{
            height: '100%',
            width: '100%',
          },
          childs:[{
            id: `${sectionForNewColumn.id}-col_${columnIndex}-item_0`,
            type: 'text',
            content:`${sectionForNewColumn.id}-col_${columnIndex}-item_0`,
            isActive: false,
            style:{},
            childStyle:{},
          }]
      })

      this.setElementToEdit(`${sectionForNewColumn.id}-col_${columnIndex}`)
    },


    //================================

    addItem(type){
      this.getWorkplaceData.sections.forEach(section => {
          section.columns.forEach(column => {
            column.childs.forEach(item =>{
              item.isActive = false
            })
          })
      });

      let sectionForNewColumn
      if(this.getActiveElement.length !== undefined){
        sectionForNewColumn = this.getActiveElement[0]
        sectionForNewColumn.isActive = true;
      }else{
        sectionForNewColumn = this.getActiveElement
      }

      //active section were taken from ACTIVEELEMENT in store. Now find active column in this section
      //if there is active column...
      let currentColumn = sectionForNewColumn.columns.findIndex(x => x.isActive === true)
      //if there is no active column, check active sections
      console.log(currentColumn);
      if(currentColumn === -1){
        currentColumn = 0

      }

      const activeColumn = sectionForNewColumn.columns[currentColumn];
      sectionForNewColumn.columns[currentColumn].isActive = true
      let itemIndex = activeColumn.childs[activeColumn.childs.length - 1].id.split("item_")[1];

      const itemID = `${sectionForNewColumn.columns[currentColumn].id}-item_${++itemIndex}`
      if(type === 'text'){
        this.addItemToColumn({
            id: itemID,
            type: type,
            content: itemID,
            isActive: true,
            style:{},
            childStyle:{},
        })
      }else if(type === 'img')
      this.addItemToColumn({
          id: itemID,
          type: type,
          content: require('@/assets/img/default-img.svg'),
          isActive: true,
          style:{
            width: '200px',
            height: '200px',
          },
          childStyle:{
            width: '200px',
            height: '200px',},
      })
      this.setElementToEdit(itemID);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tools-section{
    z-index: 1;
    height: 100%;
    width: 50px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    .button-container{
      padding: 10px;
      cursor: pointer;
      i{
        width: 100%;
      }
      &:hover{
        background: $hoverColor;
      }
    }
  }
        ::v-deep .v-input{
        max-width: 150px;
        .v-input__slot{
          background: $containerBackground!important;
          border-width: 0 0 2px 0;
          border-style: solid;
          border-radius: 0;
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: none!important;
        }
      }
</style>
