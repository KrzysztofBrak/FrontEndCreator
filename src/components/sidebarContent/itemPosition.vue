<template>
  <div  :class="['align-text-container']">
    <div v-for="button in textbuttons"
      :class="['align-text-button', {'active': button.isActive}]"
      :key="button.alt"
      @click="activateButton(button)"
    >
      <img :src="button.img" :alt="button.alt"/>
    </div>
  </div>
</template>

<script>
import{mapGetters} from 'vuex'

import {textbuttons} from './content.js'
import {findSelectedItem} from '@/components/findSelectedItem.js'

export default {
  name: 'itemPosition',
  data: () => ({
    textbuttons,
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
      }
    },
  },

  methods:{
    activateButton(button){
      let btnIndex = this.textbuttons.findIndex(x => x === button)
      if(btnIndex <= 2){
        this.textbuttons[0].isActive = false;
        this.textbuttons[1].isActive = false;
        this.textbuttons[2].isActive = false;
      }else{
        this.textbuttons[3].isActive = false;
        this.textbuttons[4].isActive = false;
        this.textbuttons[5].isActive = false;
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

                ...button.positionStyle
          }
          break;

        case 3:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].childs[this.itemIndex].childStyle = {

                ...this.getWorkplaceData.sections[this.sectionIndex]
                  .columns[this.columnIndex].childs[this.itemIndex].childStyle,
                ...button.positionStyle
          }
          break;

        default:
          break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .align-text-container{
      margin: 10px;
      display: flex;
      justify-content: space-between;
      .align-text-button{
        padding: 5px;
        cursor: pointer;
        &:hover{
          background: $hoverColor;
        }
        &.active{
          background: rgb(158, 158, 158);
        }
      }
    }
</style>