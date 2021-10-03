<template>
  <div class="align-text-container">
    <div class="icon-section">
      <div
        v-for="button in textbuttons"
        class="align-text-button"
        :class="[{ active: button.isActive }]"
        :key="button.alt"
        @click="activateButton(button, true)"
      >
        <v-icon>{{ button.img }}</v-icon>
      </div>
    </div>

    <div v-show="!getElementToEdit.includes('item')" class="icon-section">
      <div
        v-for="button in sortbuttons"
        class="horizontal-positioning"
        :class="[{ active: button.isActive }]"
        :key="button.alt"
        @click="activateButton(button, false)"
      >
        <v-icon :class="[{ rotate: settingItemsInColumns }]">{{
          button.img
        }}</v-icon>
      </div>
    </div>

    <div v-show="getElementToEdit.includes('item')" class="icon-section">
      <div
        v-for="button in textAlignButtons"
        class="horizontal-positioning"
        :class="[{ active: button.isActive }]"
        :key="button.alt"
        @click="activateAlignButton(button, false)"
      >
        <v-icon :class="[{ rotate: settingItemsInColumns }]">{{
          button.img
        }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { textbuttons, sortbuttons, textAlignButtons } from "./content.js";
import findSelectedItem from "@/mixins/findSelectedItem.vue";

export default {
  name: "itemPosition",
  mixins: [findSelectedItem],
  data: () => ({
    textbuttons,
    sortbuttons,
    textAlignButtons,
    selectedItem: {},
    settingItemsInColumns: false,
  }),

  computed: {
    ...mapGetters(["getElementToEdit"]),
  },

  watch: {
    getElementToEdit: {
      immediate: true,
      handler() {
        this.selectedItem = this.findSelectedItem(this.getElementToEdit);

        this.clearActiveButtons();
        this.settingItemsInColumns =
          this.getElementToEdit.includes("col") &&
          !this.getElementToEdit.includes("item")
            ? true
            : false;
      },
    },
  },

  methods: {
    activateButton(button, isFirstSectionButton) {
      let btnIndex = this.textbuttons.findIndex((x) => x === button);
      //jestem w sekcji
      if (!this.getElementToEdit.includes("col")) {
        if ((isFirstSectionButton && btnIndex <= 2) || !isFirstSectionButton) {
          this.textbuttons[0].isActive = false;
          this.textbuttons[1].isActive = false;
          this.textbuttons[2].isActive = false;

          this.sortbuttons[0].isActive = false;
          this.sortbuttons[1].isActive = false;
        } else {
          this.textbuttons[3].isActive = false;
          this.textbuttons[4].isActive = false;
          this.textbuttons[5].isActive = false;
        }

        //nie jestem w sekcji
      } else {
        if ((isFirstSectionButton && btnIndex > 2) || !isFirstSectionButton) {
          this.textbuttons[3].isActive = false;
          this.textbuttons[4].isActive = false;
          this.textbuttons[5].isActive = false;

          this.sortbuttons[0].isActive = false;
          this.sortbuttons[1].isActive = false;
        } else {
          this.textbuttons[0].isActive = false;
          this.textbuttons[1].isActive = false;
          this.textbuttons[2].isActive = false;
        }
      }
      button.isActive = !button.isActive;

      this.selectedItem = this.findSelectedItem(this.getElementToEdit);
      this.updateStyles(button.positionStyle);
    },

    activateAlignButton(button) {
      this.textAlignButtons.forEach((element) => {
        element.isActive = false;
      });
      button.isActive = !button.isActive;
      this.updateStyles(button.positionStyleForItems);
    },

    updateStyles(positionParams) {
      //merge old object with the new one
      this.selectedItem.childStyle = {
        ...this.selectedItem.childStyle,
        ...positionParams,
      };
    },
    clearActiveButtons() {
      this.textbuttons.forEach((element) => {
        element.isActive = false;
      });
      this.sortbuttons.forEach((element) => {
        element.isActive = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.align-text-container {
  margin: 0 0 30px 0;
  display: block;
  justify-content: space-between;
  .icon-section {
    display: flex;
    .align-text-button,
    .horizontal-positioning {
      padding: 9px;
      cursor: pointer;
      &:hover {
        background: $hoverColor;
      }
      &.active {
        background: rgb(158, 158, 158);
      }
    }
    .horizontal-positioning {
      .v-icon.rotate {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
