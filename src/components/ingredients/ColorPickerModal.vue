<template>
  <div class="color-picker d-block ml-3">
    <div class="d-flex justify-space-between">
      <v-btn
        class="color-picker-btn"
        color="secondary"
        @click="modalIsOpened = !modalIsOpened"
        :style="{ background: color }"
      >
      </v-btn>
    </div>
    <v-app>
      <v-fade-transition>
        <v-color-picker
          v-show="modalIsOpened"
          class="color-picker-picker pa-1"
          show-swatches
          mode="hexa"
          v-model="color"
          swatches-max-height="200px"
        ></v-color-picker>
      </v-fade-transition>
    </v-app>
    <div
      v-show="modalIsOpened === true"
      class="color-picker-overlay"
      @click.self="modalIsOpened = false"
    ></div>
  </div>
</template>

<script>
export default {
  name: "editSidebar",
  props: {
    inputName: {
      type: String,
      default: "",
    },
    selectedColor: {
      type: String,
      default: "#FFFFFF00",
    },
  },
  computed: {
    color: {
      get() {
        return this.selectedColor;
      },
      set(v) {
        const colorInfo = {
          color: v,
          label: this.inputName,
        };
        this.hexa = v;

        this.$emit("selected", colorInfo);
      },
    },
  },
  data: () => ({
    modalIsOpened: false,
    hexa: "",
  }),
  mounted() {
    this.hexa = this.selectedColor;
  },
};
</script>
<style scoped lang="scss">
.color-picker {
  width: 100%;

  #{&}-btn {
    width: 100%;
    height: 16px;
  }

  #{&}-picker {
    z-index: 23;
    position: fixed;
    right: 6px;
    bottom: 12px;
    width: 316px;
    max-width: 310px !important;
    box-shadow: $mainShadow;
  }

  #{&}-overlay {
    position: fixed;
    z-index: 22;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}

::v-deep .v-application--wrap {
  min-height: fit-content !important;
}
</style>
