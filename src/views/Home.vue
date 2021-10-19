<template>
  <div :class="{ 'dark-theme': getDarkMode }" id="theme">
    <Header />
    <div class="main-container d-flex" @dblclick.self="disactivateAllElements">
      <toolsSidebar v-show="isProjectActive" />
      <div v-show="!isProjectActive" class="main-container-icons mx-auto">
        <img :src="require('@/assets/img/new_file.svg')" alt="nowy projekt" />
      </div>
      <workplace v-show="isProjectActive" />
      <Sidebar v-show="isProjectActive" />
      <v-fade-transition>
        <div v-show="getColorsGeneratorModalOpened">
          <ColorsGeneratorSidebar />
        </div>
      </v-fade-transition>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import toolsSidebar from "@/components/toolsSidebar/toolsSidebar.vue";
import workplace from "@/components/workplace.vue";
import Sidebar from "@/components/ingredients/Sidebar.vue";
import ColorsGeneratorSidebar from "@/components/colorsGeneratorSidebar/ColorsGeneratorSidebar.vue";
import dezactivateElements from "@/mixins/dezactivateElements.vue";

import { mapGetters, mapMutations } from "vuex";
import panzoom from "panzoom";
export default {
  name: "Home",
  components: {
    Header,
    toolsSidebar,
    Sidebar,
    workplace,
    ColorsGeneratorSidebar,
  },
  computed: {
    ...mapGetters([
      "getWorkplaceData",
      "getColorsGeneratorModalOpened",
      "getDarkMode",
    ]),
  },

  watch: {
    getWorkplaceData() {
      this.isProjectActive = true;
    },
  },
  mixins: [dezactivateElements],
  data: () => ({
    isProjectActive: false,
  }),
  mounted() {
    this.isProjectActive = localStorage.getItem("vuex") !== null;
    // grab a DOM element
    const element = document.querySelector("#workplace");

    // And pass it to panzoom
    panzoom(element, {
      // allow wheel-zoom only if altKey is down. Otherwise - ignore
      beforeWheel: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },

      // allow mouse-down panning only if altKey is down. Otherwise - ignore
      beforeMouseDown: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },

      //disable moving workplace with arrows
      filterKey: function() {
        return true;
      },

      maxZoom: 3,
      minZoom: 0.2,
      initialZoom: this.getActualZoom,
      zoomSpeed: 0.99,
      zoomDoubleClickSpeed: 1,
    });
  },
  methods: {
    ...mapMutations(["setWorkplaceActive", "setElementToEdit"]),

    disactivateAllElements() {
      this.dezactivateElements("");
      this.setWorkplaceActive(true);
      this.setElementToEdit("workplace");
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/darkTheme.scss";

.main-container {
  outline: none;
  background: #b7b7b7;
  height: 100vh;

  #{&}-icon {
    width: 50%;
    margin-top: 100px;
    max-width: 500px;
  }
}
</style>
