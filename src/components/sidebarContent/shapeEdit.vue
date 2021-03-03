<template>
    <div v-if="getElementToEdit !== 'workplace'" :class="['shapeEdit-container']">
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

                  <div v-if="input.childs" @click="changeSeparately(input)">
                    <v-icon v-if="input.showSeparately === true">
                      mdi-lock-open-variant-outline
                    </v-icon>

                    <v-icon v-else>mdi-lock-outline</v-icon>
                  </div>

                  <ColorPickerModal v-if="input.type === 'ColorPicker'"
                    :selectedColor="style[input.vModel]"
                    :inputName="input.vModel"
                    @selected="selectedColor"
                  />
                  <v-select  v-else-if="input.type === 'dropdown'"
                    :items="input.items"
                    :class="['dropdown', input.class]"
                    v-model="style[input.vModel]"
                    v-on:change="updateStyle(kindOfSelectedItem)"
                    label="Solo field"
                    solo
                  ></v-select>
                  <input v-else :type="input.type"
                    v-show="!input.childs || input.showSeparately === false"
                    :class="[input.class, 'input-style']"
                    v-model="style[input.vModel]"
                    v-on:change="updateStyle(kindOfSelectedItem)"
                    placeholder="wprowadź wartość"
                  >
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
      <v-textarea v-if="itemIndex !== -1 && selectedItem.itemType === 'text'"
        filled
        :class="['input-text-area']"
        name="inputText"
        label="Wstaw tekst"
        v-model="getWorkplaceData.sections[sectionIndex].columns[columnIndex].childs[itemIndex].content"
      ></v-textarea>
      <div v-if="itemIndex !== -1 && selectedItem.itemType === 'img'"
        :class="['file-input-container']"
      >
        <p @click="addImg">Dodaj grafikę</p>
        <v-file-input truncate-length="15"
          hide-input
          v-model='chosenImg'
          @change="updateFile($event)"
          ref="fileInput"
        ></v-file-input>
      </div>
  </div>
</template>

<script>
import{mapGetters} from 'vuex'
import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'
import {findSelectedItem} from '@/components/findSelectedItem.js'

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
        this.selectedItem = findSelectedItem(this.getElementToEdit, this.getWorkplaceData);

        this.kindOfSelectedItem = this.selectedItem.kindOfSelectedItem;
        this.sectionIndex = this.selectedItem.sectionIndex;
        this.columnIndex = this.selectedItem.columnIndex;
        this.itemIndex = this.selectedItem.itemIndex;
        this.style = this.selectedItem.style;
      }
    },
  },
  data: () => ({
    styleInputs,
    selectedItem: {},
    sectionIndex: -1,
    columnIndex: -1,
    itemIndex: -1,
    style:{},
    chosenImg: null,
  }),

  methods:{
    updateStyle(kindOfSelectedItem){
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

    updateFile(){
      this.getWorkplaceData.sections[this.sectionIndex]
        .columns[this.columnIndex].childs[this.itemIndex]
        .content = URL.createObjectURL(this.chosenImg);

        console.log(this.chosenImg);
    },


    selectedColor(colorValue){
      this.style[colorValue.label] = colorValue.color;
      this.updateStyle(this.kindOfSelectedItem)
    },

    changeSeparately(input){
      input.showSeparately = !input.showSeparately
    },

    addImg(){
      this.$refs.fileInput.$refs.input.click()
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
        justify-content: space-between;
        input{
          height: 16px;
          margin: auto 0 auto 10px;
          width: 100%;
          text-align: end;
          padding: 0 3px
        }
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
      }
      ::v-deep .dropdown.v-input{
        margin-left: 10px;
        .v-input__control{
          min-height: 17px;
          max-height: 17px;
          .v-input__slot{
            max-height: 20px;
            border-width: 0;
            border-style: solid;
            border-radius: 0;
            border-color: rgba(0, 0, 0, 0.12);
            box-shadow: none;
            background: #e9e9e9;
          }
        }
      }
    }
    .input-text-area{
      margin-top: 20px;
    }
    .file-input-container{
      display: flex;
      margin-top: 10px;
      p{
        margin: auto 10px;
        cursor: pointer;
      }
      ::v-deep .v-text-field{
        padding-top: 0;
        margin-top: 0;
      }
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