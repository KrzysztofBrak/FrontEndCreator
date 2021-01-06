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
      'setElementToEdit'
    ]),

    btnClick(btnCategory){
      switch(btnCategory){
        case 'nowa sekcja':
          this.addSection()
          break;

        case 'tekst':
          this.setTextSelected(true);
          this.addItem('text')
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
        style:{},
        columns:[{
          id: `section_${this.getSectionsLength}-col_0`,
          isActive: false,
          style:{},
          childs:[{
            id: `section_${this.getSectionsLength}-col_0-item_0`,
            type: 'text',
            content:`section_${this.getSectionsLength}-col_0-item_0`,
            isActive: false,
            style:{},
          }]
        }]
      })
      this.setWorkplaceActive(false);
      this.setTextSelected(false);
      this.setElementToEdit(`section_${this.getSectionsLength}`)
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
      //set active section

      //active section were taken from ACTIVEELEMENT in store. Now find active column in this section
      //if there is active column...
      let currentColumn = this.getActiveElement.columns.findIndex(x => x.isActive === true)
      //if there is no active column, check active sections
      if(currentColumn === -1){
        currentColumn = 0
      }

      const activeColumn = this.getActiveElement.columns[currentColumn]
      let itemIndex = activeColumn.childs[activeColumn.childs.length - 1].id.split("item_")[1];

      const itemText = `${this.getActiveElement.columns[currentColumn].id}-item_${++itemIndex}`
      this.addItemToColumn({
          id: itemText,
          type: type,
          content: itemText,
          isActive: true,
          style:{},
      })
      this.setElementToEdit(itemText);
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
