<template>
  <div class="main-container d-block ml-3">
    <div class="color-container">
      <div class="d-flex justify-space-between">
        <v-btn
          class="button"
          color="secondary"
          @click="modalIsOpened = !modalIsOpened"
          :style="{ background: color }"
        >
        </v-btn>
      </div>
    </div>
    <v-app>
      <v-fade-transition>
        <v-color-picker
          v-show="modalIsOpened"
          class="color-picker pa-1"
          show-swatches
          mode="hexa"
          v-model="color"
          swatches-max-height="200px"
        ></v-color-picker>
      </v-fade-transition>
    </v-app>
    <div
      v-show="modalIsOpened === true"
      class="overlay"
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
.overlay {
  position: fixed;
  z-index: 22;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.main-container {
  width: 100%;
  .color-container {
    .button {
      width: 100%;
      height: 16px;
    }
  }
  .color-picker {
    z-index: 23;
    position: fixed;
    right: 6px;
    bottom: 12px;
    width: 316px;
    max-width: 310px !important;
    box-shadow: $mainShadow;
  }
}
::v-deep .v-application--wrap {
  min-height: fit-content !important;
}
</style>
