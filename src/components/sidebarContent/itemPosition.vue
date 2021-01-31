<template>
  <div  :class="['align-text-container']">

    <div :class="['icon-section']">
      <div v-for="button in textbuttons"
        :class="['align-text-button', {'active': button.isActive}]"
        :key="button.alt"
        @click="activateButton(button, true)"
      >
        <v-icon>{{button.img}}</v-icon>
      </div>
    </div>

    <div :class="['icon-section']">
      <div v-for="button in sortbuttons"
        :class="['horizontal-positioning', {'active': button.isActive}]"
        :key="button.alt"
        @click="activateButton(button, false)"
      >
        <v-icon>{{button.img}}</v-icon>
      </div>
    </div>

  </div>
</template>

<script>
import{mapGetters} from 'vuex'

import {textbuttons, sortbuttons} from './content.js'
import {findSelectedItem} from '@/components/findSelectedItem.js'

export default {
  name: 'itemPosition',
  data: () => ({
    textbuttons,
    sortbuttons,
    selectedItem: {},
    sectionIndex: -1,
    columnIndex: -1,
    itemIndex: -1,
    kindOfSelectedItem: 0,
    style:{}
  }),

  computed:{
    ...mapGetters([
      'getElementToEdit',
      'getWorkplaceData'
    ]),
  },

  watch:{
    getElementToEdit: {
      immediate: true,
      handler(){
        this.selectedItem = findSelectedItem(this.getElementToEdit, this.getWorkplaceData);

        this.kindOfSelectedItem = this.selectedItem.kindOfSelectedItem;
        this.sectionIndex = this.selectedItem.sectionIndex;
        this.columnIndex = this.selectedItem.columnIndex;
        this.itemIndex = this.selectedItem.itemIndex;
        this.style = this.selectedItem.style;

        this.clearActiveButtons()
      }
    },
  },

  methods:{
    activateButton(button, isFirstSectionButton){
      let btnIndex = this.textbuttons.findIndex(x => x === button)

  //jestem w sekcji
      if(!this.getElementToEdit.includes('col')){
          if((isFirstSectionButton && btnIndex <= 2) || !isFirstSectionButton){
                this.textbuttons[0].isActive = false;
                this.textbuttons[1].isActive = false;
                this.textbuttons[2].isActive = false;

                this.sortbuttons[0].isActive = false;
                this.sortbuttons[1].isActive = false;
          }else{
                this.textbuttons[3].isActive = false;
                this.textbuttons[4].isActive = false;
                this.textbuttons[5].isActive = false;
          }

  //nie jestem w sekcji
      }else{
          if((isFirstSectionButton && btnIndex > 2) || !isFirstSectionButton){
                this.textbuttons[3].isActive = false;
                this.textbuttons[4].isActive = false;
                this.textbuttons[5].isActive = false;

                this.sortbuttons[0].isActive = false;
                this.sortbuttons[1].isActive = false;

          }else{
                this.textbuttons[0].isActive = false;
                this.textbuttons[1].isActive = false;
                this.textbuttons[2].isActive = false;
          }
      }


      button.isActive = !button.isActive

      this.selectedItem = findSelectedItem(this.getElementToEdit, this.getWorkplaceData);


      switch (this.kindOfSelectedItem) {
        case 1:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex].childStyle = {

            ...this.getWorkplaceData.sections[this.sectionIndex].childStyle,

            ...button.positionStyle
          }
          break;

        case 2:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].childStyle = {

                ...this.getWorkplaceData.sections[this.sectionIndex]
                  .columns[this.columnIndex].childStyle,

                ...button.positionStyleForItems
          }
          break;

        case 3:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].childs[this.itemIndex].childStyle = {

                ...this.getWorkplaceData.sections[this.sectionIndex]
                  .columns[this.columnIndex].childs[this.itemIndex].childStyle,
                ...button.positionStyleForItems
          }
          break;

        default:
          break;
      }
    },
    clearActiveButtons(){
      this.textbuttons.forEach(element => {
        element.isActive = false;
      });
      this.sortbuttons.forEach(element => {
        element.isActive = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
    .align-text-container{
      margin: 10px;
      display: block;
      justify-content: space-between;
      .icon-section{
        display: flex;
        .align-text-button,
        .horizontal-positioning{
          padding: 9px;
          cursor: pointer;
          &:hover{
            background: $hoverColor;
          }
          &.active{
            background: rgb(158, 158, 158);
          }
        }
      }
    }
</style>