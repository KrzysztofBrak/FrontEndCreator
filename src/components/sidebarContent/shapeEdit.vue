<template>
  <div v-if="getElementToEdit !== 'workplace'" class="shapeEdit-container">
    <v-row justify="center">
      <v-expansion-panels accordion v-model="isPanelOpened">
        <v-expansion-panel v-for="item in styleInputs" :key="item.name">
          <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ItemPosition v-if="item.name === 'Przekształć:'" />
            <div
              v-for="input in item.inputs"
              :key="input.inputName"
              class="input-container"
            >
              <div class="inputFather-container">
                <p>{{ input.inputName }}:</p>

                <ColorPickerModal
                  v-if="input.type === 'ColorPicker'"
                  :selectedColor="style[input.vModel]"
                  :inputName="input.vModel"
                  @selected="selectedColor"
                />
                <select
                  v-else-if="input.type === 'dropdown'"
                  id="tstselect"
                  name="tstselect"
                  dir="rtl"
                  class="dropdown"
                  :class="input.class"
                  v-on:change="updateStyle()"
                  v-model="style[input.vModel]"
                >
                  <option
                    v-for="option in input.items"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <select
                  v-else-if="input.type === 'dropdownWithDifferentNames'"
                  dir="rtl"
                  class="dropdown"
                  :class="input.class"
                  v-on:change="updateStyle()"
                  v-model="style[input.vModel]"
                >
                  <option
                    v-for="option in input.items"
                    :key="option.value"
                    :value="option.name"
                  >
                    {{ option.value }}
                  </option>
                </select>
                <input
                  v-else
                  :type="input.type"
                  v-show="!input.childs || input.showSeparately === false"
                  class="input-style"
                  :class="input.class"
                  v-model="style[input.vModel]"
                  v-on:change="updateStyle()"
                  placeholder="wprowadź wartość"
                />
                <div
                  v-if="input.childs"
                  @click="input.showSeparately = !input.showSeparately"
                >
                  <v-icon
                    v-if="input.showSeparately === true"
                    @click="updateInputWithChild(input, true)"
                    class="lock"
                  >
                    mdi-lock-open-variant-outline
                  </v-icon>

                  <v-icon
                    v-else
                    @click="updateInputWithChild(input, false)"
                    class="lock"
                    >mdi-lock-outline</v-icon
                  >
                </div>
              </div>

              <div
                class="inputChilds-container"
                v-show="input.childs && input.showSeparately === true"
              >
                <div
                  v-for="childInput in input.childs"
                  :key="childInput.inputName"
                  class="container"
                >
                  <v-icon class="lock" v-text="childInput.inputName"></v-icon>
                  <input
                    :type="childInput.type"
                    :class="childInput.class"
                    v-model="style[childInput.vModel]"
                    v-on:change="updateStyle()"
                  />
                </div>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-textarea
      v-if="getElementToEdit.includes('item') && selectedItem.type === 'text'"
      filled
      class="input-text-area"
      name="inputText"
      label="Wstaw tekst"
      v-model="selectedItem.content"
    ></v-textarea>
    <div
      v-if="getElementToEdit.includes('item') && selectedItem.type === 'img'"
      class="file-input-container"
    >
      <p @click="$refs.fileInput.$refs.input.click()">Dodaj grafikę</p>
      <v-file-input
        truncate-length="15"
        hide-input
        v-model="chosenImg"
        @change="updateFile($event)"
        ref="fileInput"
      ></v-file-input>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ColorPickerModal from "@/components/ingredients/ColorPickerModal.vue";
import dezactivateElements from "@/mixins/dezactivateElements.vue";
import findSelectedItem from "@/mixins/findSelectedItem.vue";
import ItemPosition from "@/components/sidebarContent/itemPosition.vue";

import { styleInputs } from "./content";
export default {
  name: "shapeEdit",

  components: {
    ColorPickerModal,
    ItemPosition,
  },

  computed: {
    ...mapGetters(["getElementToEdit", "getProjectName"]),
  },

  watch: {
    getElementToEdit: {
      immediate: true,
      handler() {
        this.selectedItem = this.findSelectedItem(this.getElementToEdit);
        this.style = this.selectedItem.style;
      },
    },
    getProjectName() {
      this.dezactivateElements("");
      this.isPanelOpened = false;
      this.setElementToEdit("workplace");
    },
  },
  mixins: [dezactivateElements, findSelectedItem],
  data: () => ({
    styleInputs,
    selectedItem: {},
    style: {},
    chosenImg: null,
    isPanelOpened: false,
  }),
  methods: {
    ...mapMutations(["setElementToEdit"]),

    updateStyle() {
      this.selectedItem.style = {
        ...this.selectedItem.style,
        ...this.style,
      };
    },

    updateInputWithChild(item, everyBorderSelected) {
      if (everyBorderSelected) {
        item.childs.forEach((element) => {
          this.style[element.vModel] = "";
        });
      } else {
        this.style[item.vModel] = "";
      }
      this.updateStyle();
    },

    updateFile() {
      let reader = new FileReader();
      reader.readAsDataURL(this.chosenImg);
      reader.onloadend = () => {
        this.selectedItem.content = reader.result;
      };
    },

    selectedColor(colorValue) {
      this.style[colorValue.label] = colorValue.color;
      this.updateStyle();
    },
  },
};
</script>

<style scoped lang="scss">
.shapeEdit-container {
  h1 {
    font-size: 12px;
    color: gray;
    font-weight: 400;
  }
  .input-container {
    font-size: 14px;
    display: block;
    margin: 15px 0;
    .inputFather-container {
      display: flex;
      justify-content: space-between;
      input {
        height: 16px;
        margin: auto 0 auto 10px;
        width: 100%;
        text-align: end;
        padding: 0 3px;
      }
      .lock {
        font-size: 17px;
        margin-left: 5px;
      }
    }
    .inputChilds-container {
      display: block;
      transition: 0.3s;
      .container {
        display: flex;
        p {
          white-space: nowrap;
        }
        input {
          width: 100%;
        }
      }
    }
    input {
      margin-left: 10px;
      background: #e9e9e9;
      outline: none;
    }
    .dropdown {
      background: #e9e9e9;
      width: 100%;
      margin-left: 5px;
    }
    select,
    option {
      text-align: right;
      appearance: auto;
      padding-left: 5px;
    }
  }
  .input-text-area {
    margin-top: 20px;
  }
  .file-input-container {
    display: flex;
    margin-top: 10px;
    p {
      margin: auto 10px;
      cursor: pointer;
    }
    ::v-deep .v-text-field {
      padding-top: 0;
      margin-top: 0;
    }
  }
}
::v-deep .row {
  width: 300px;
  border-bottom: 1px solid #c7c7c7;
  margin-left: -15px;
  .v-expansion-panels {
    border-radius: 0px;
    .v-expansion-panel {
      &::before {
        box-shadow: none;
      }
      .v-expansion-panel-header,
      .v-expansion-panel-content {
        background: $containerBackground;
      }
      .v-application--wrap {
        min-height: 0 !important;
      }
    }
  }
}
</style>
