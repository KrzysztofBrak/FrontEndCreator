<template>
  <div v-if="getElementToEdit !== 'workplace'">
    <v-row justify="center">
      <v-expansion-panels accordion v-model="isPanelOpened">
        <v-expansion-panel v-for="item in styleInputs" :key="item.name">
          <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <ItemPosition v-if="item.name === 'Przekształć:'" />
            <div
              v-for="(input, index) in item.inputs"
              :key="index"
              class="input-container my-4 text-body-2"
            >
              <div class="d-flex justify-space-between">
                <p>{{ input.inputName }}:</p>

                <ColorPickerModal
                  v-if="input.type === 'ColorPicker'"
                  :selectedColor="selectedItem.style[input.vModel]"
                  :inputName="input.vModel"
                  @selected="
                    selectedItem.style[colorValue.label] = colorValue.color
                  "
                />

                <select
                  v-else-if="input.type === 'dropdown'"
                  class="dropdown ml-1"
                  :class="input.class"
                  v-model="selectedItem.style[input.vModel]"
                >
                  <option
                    v-for="option in input.items"
                    :key="option.value"
                    :value="option.name"
                    class="text-right pl-4"
                  >
                    {{ option.value }}
                  </option>
                </select>

                <input
                  v-else
                  :type="input.type"
                  v-show="!input.childs || !input.showSeparately"
                  class="input-style my-auto mr-0 ml-3 px-1 text-end w-100"
                  :class="input.class"
                  v-model="selectedItem.style[input.vModel]"
                  placeholder="wprowadź wartość"
                />
                <div
                  v-if="input.childs"
                  @click="input.showSeparately = !input.showSeparately"
                >
                  <v-icon
                    @click="updateInputWithChild(input)"
                    class="lock ml-1 text-body-1"
                  >
                    {{
                      input.showSeparately
                        ? "mdi-lock-open-variant-outline"
                        : "mdi-lock-outline"
                    }}
                  </v-icon>
                </div>
              </div>

              <div v-show="input.childs && input.showSeparately">
                <div
                  v-for="childInput in input.childs"
                  :key="childInput.inputName"
                  class="container d-flex"
                >
                  <v-icon class="ml-1" v-text="childInput.inputName"></v-icon>
                  <input
                    :type="childInput.type"
                    :class="childInput.class"
                    class="input-style ml-12 text-end"
                    placeholder="wprowadź wartość"
                    v-model="selectedItem.style[childInput.vModel]"
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
      class="mt-5"
      label="Wstaw tekst"
      v-model="selectedItem.content"
    ></v-textarea>
    <div
      v-if="getElementToEdit.includes('item') && selectedItem.type === 'img'"
      class="file-input-container d-flex mt-3"
    >
      <p @click="$refs.fileInput.$refs.input.click()" class="mt-5 mx-3">
        Dodaj grafikę
      </p>
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
import ItemPosition from "@/components/sidebarContent/itemPosition.vue";
import dezactivateElements from "@/mixins/dezactivateElements.vue";
import findSelectedItem from "@/mixins/findSelectedItem.vue";

import { styleInputs } from "./styleInputs";
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
    chosenImg: null,
    isPanelOpened: false,
  }),
  methods: {
    ...mapMutations(["setElementToEdit"]),

    updateInputWithChild(item) {
      if (item.showSeparately) {
        item.childs.forEach((element) => {
          this.selectedItem.style[element.vModel] = "";
        });
      } else {
        this.selectedItem.style[item.vModel] = "";
      }
    },

    updateFile() {
      const reader = new FileReader();
      reader.readAsDataURL(this.chosenImg);
      reader.onloadend = () => {
        this.selectedItem.content = reader.result;
      };
    },
  },
};
</script>

<style scoped lang="scss">
.input-style {
  width: 100%;
  outline: none;
}

.dropdown {
  background: $containerBackground;
  width: 100%;
  outline: none;
}

.file-input-container p {
  cursor: pointer;
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
