<template>
    <div :class="['shapeEdit-container']">
      <v-row justify="center">
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="item in styleInputs"
            :key="item.name"
          >
            <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="input in item.inputs"
                :key="input.inputName"
                :class="['input-container']"
              >
                <div :class="['inputFather-container']">
                  <p>{{input.inputName}}:</p>

                  <div v-if="input.childs" @click="input.showSeparately = !input.showSeparately">
                    <v-icon v-if="input.showSeparately === true"
                    >mdi-lock-open-variant-outline
                    </v-icon>

                    <v-icon v-else>mdi-lock-outline</v-icon>
                  </div>

                  <ColorPickerModal v-if="input.type === 'ColorPicker'" :selectedColor="style[input.vModel]" :inputName="input.vModel" @selected="selectedColor"/>
                  <input v-else :type="input.type"
                    v-show="!input.childs || input.showSeparately === false"
                    :class="[input.class]"
                    v-model="style[input.vModel]"
                    v-on:change="updateStyle(kindOfSelectedItem)"
                  >{{style[input.vModel]}}
                </div>
                <div :class="['inputChilds-container']"
                  v-show="input.childs && input.showSeparately === true"
                >
                  <div v-for="childInput in input.childs"
                    :key="childInput.inputName"
                    :class="['container']"
                  >
                    <p>{{childInput.inputName}}:</p>
                    <input :type="childInput.type"
                      :class="[childInput.class]"
                      v-model="style[childInput.vModel]"
                      v-on:change="updateStyle(kindOfSelectedItem)"
                    >
                  </div>

                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
</template>

<script>
import{mapGetters} from 'vuex'
import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'

import{styleInputs} from './content'
export default {
  name: 'shapeEdit',

  components:{
    ColorPickerModal
  },

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
        //first find section
        let selectedElement = this.getElementToEdit.split('-')[0]
        this.findSection(selectedElement);
        this.kindOfSelectedItem = 1;
        //find column if it is selected
        if(this.getElementToEdit.includes("col")){
          selectedElement = this.getElementToEdit.split('-item_0')[0]
          this.findColumn(selectedElement);
          this.kindOfSelectedItem = 2;
        }
        //find item if it is selected
        if(this.getElementToEdit.includes("item")){
          this.findItem(this.getElementToEdit);
          this.kindOfSelectedItem = 3;
        }


          console.log(Object.keys(this.getWorkplaceData.sections[this.sectionIndex].style).length);
        switch (this.kindOfSelectedItem) {
          case 1:
            this.style = this.getWorkplaceData.sections[this.sectionIndex].style
            break;

          case 2:
            this.style = this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].style;
            break;

          case 3:
            this.style = this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].childs[this.itemIndex].style;
            break;

          default:
            break;
        }
      }
    },
  },
  data: () => ({
    styleInputs,
    sectionIndex: -1,
    columnIndex: -1,
    itemIndex: -1,
    kindOfSelectedItem: 0,
    style:{}
  }),

  mounted(){

  },

  methods:{
    updateStyle(kindOfSelectedItem){
      console.log('UPDATE', kindOfSelectedItem);
      switch (kindOfSelectedItem) {
        case 1:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex].style = {

            ...this.getWorkplaceData.sections[this.sectionIndex].style,

            ...this.style
          }
          break;
        case 2:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].style = {

                ...this.getWorkplaceData.sections[this.sectionIndex]
                  .columns[this.columnIndex].style,

                ...this.style
          }
          break;
        case 3:
          //merge old object with the new one
          this.getWorkplaceData.sections[this.sectionIndex]
              .columns[this.columnIndex].childs[this.itemIndex].style = {

                ...this.getWorkplaceData.sections[this.sectionIndex]
                  .columns[this.columnIndex].childs[this.itemIndex].style,

                ...this.style
          }
          break;

        default:
          break;
      }
    },


    findSection(selectedElement){
      this.sectionIndex = this.getWorkplaceData.sections
        .findIndex(x => x.id === selectedElement);
    },

    findColumn(selectedElement){
      this.columnIndex = this.getWorkplaceData.sections[this.sectionIndex]
        .columns.findIndex(x => x.id === selectedElement);
    },

    findItem(selectedElement){
      this.itemIndex = this.getWorkplaceData.sections[this.sectionIndex]
        .columns[this.columnIndex].childs.findIndex(x => x.id === selectedElement);
      console.log(333, this.itemIndex)
    },

    selectedColor(colorValue){
      this.style[colorValue.label] = colorValue.color;
      this.updateStyle(this.kindOfSelectedItem)
      console.log(colorValue);
    }
  }
}
</script>

<style scoped lang="scss">
  .shapeEdit-container{
    h1{
      font-size: 12px;
      color: gray;
      font-weight: 400;
    }
    .input-container{
      font-size: 14px;
      display:block;
      margin: 15px 0 ;
      .inputFather-container{
        display:flex;
      }
      .inputChilds-container{
        display:block;
        transition: 0.3s;
        .container{
          display: flex;
        }
      }
      input{
        margin-left: 10px;
        background:#e9e9e9;
        outline: none;
        max-width: 50px;
      }
    }
  }
  ::v-deep .v-input{
    max-width: 150px;
    .v-input__slot{
      border-width: 0 0 2px 0;
      border-style: solid;
      border-radius: 0;
      border-color: rgba(0, 0, 0, 0.12);
      box-shadow: none!important;
    }
  }
  ::v-deep .row{
    width: 300px;
    border-bottom: 1px solid #c7c7c7;
    margin-left: -15px;
    .v-expansion-panels{
      border-radius: 0px;
      .v-expansion-panel{
        &::before{
          box-shadow: none;
        }
        .v-expansion-panel-header,
        .v-expansion-panel-content{
          background: $containerBackground;
        }
      }
    }
  }
</style>