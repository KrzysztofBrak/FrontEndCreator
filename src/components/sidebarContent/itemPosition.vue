<template>
  <div class="align-text-container mb-7 d-flex justify-space-between">
    <div
      v-for="(btnSection, index) in buttonsSections"
      :key="index"
      class="icon-section d-flex"
    >
      <div
        v-for="button in btnSection"
        class="align-text-button pa-2"
        :class="{ active: button.isActive, 'hide-icon': button.hideIcon }"
        :key="button.alt"
        @click="activateButton(button, index)"
      >
        <v-icon :class="{ rotate: isColumnActive && button.isRotating }">{{
          button.img
        }}</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  horizontalAlign,
  verticalAlign,
  justifyContent,
  justifyText,
} from "./content.js";
import findSelectedItem from "@/mixins/findSelectedItem.vue";

export default {
  name: "itemPosition",
  mixins: [findSelectedItem],
  data: () => ({
    horizontalAlign,
    verticalAlign,
    justifyContent,
    justifyText,
    selectedItem: {},
  }),

  computed: {
    ...mapGetters(["getElementToEdit"]),
    isSectionActive() {
      return !this.getElementToEdit.includes("col");
    },
    isColumnActive() {
      return (
        !this.isSectionActive &&
        !this.isItemActive &&
        this.getElementToEdit !== "workplace"
      );
    },
    isItemActive() {
      return this.getElementToEdit.includes("item");
    },
    buttonsSections() {
      return [
        this.horizontalAlign,
        this.verticalAlign,
        this.justifyContent,
        this.justifyText,
      ];
    },
  },

  watch: {
    getElementToEdit: {
      immediate: true,
      handler() {
        this.selectedItem = this.findSelectedItem(this.getElementToEdit);
        this.justifyText.forEach((button) => {
          button.hideIcon = !this.isItemActive;
        });
        this.justifyContent.forEach((button) => {
          button.hideIcon = this.isItemActive;
        });

        this.clearButtonsStatus([
          ...this.horizontalAlign,
          ...this.verticalAlign,
          ...this.justifyContent,
        ]);
      },
    },
  },

  methods: {
    clearButtonsStatus(buttonsSection) {
      buttonsSection.forEach((button) => {
        button.isActive = false;
      });
    },
    activateButton(button, sectionNumber) {
      if (this.isSectionActive) {
        this.clearButtonsStatus(
          sectionNumber !== 1
            ? [...this.horizontalAlign, ...this.justifyContent]
            : this.verticalAlign
        );
      } else if (this.isColumnActive) {
        this.clearButtonsStatus(
          sectionNumber !== 0
            ? [...this.verticalAlign, ...this.justifyContent]
            : this.horizontalAlign
        );
      } else {
        this.clearButtonsStatus(
          sectionNumber !== 1
            ? [...this.horizontalAlign, ...this.justifyText]
            : this.verticalAlign
        );
      }
      button.isActive = !button.isActive;

      const newStyles =
        sectionNumber === 3
          ? button.positionStyleForItems
          : button.positionStyle;

      this.selectedItem.childStyle = {
        ...this.selectedItem.childStyle,
        ...newStyles,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.align-text-container {
  flex-wrap: wrap;
  .align-text-button {
    cursor: pointer;
    &:hover {
      background: $hoverColor;
    }
    &.active {
      background: rgb(158, 158, 158);
    }
    .v-icon.rotate {
      transform: rotate(90deg);
    }
  }
  .hide-icon {
    display: none;
  }
}
</style>
