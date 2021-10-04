<template>
  <section
    class="workplace-container"
    id="workplace"
    :style="{ width: this.getWorkplaceData.workplaceWidth }"
    @dblclick.self="disactivateAllElements"
  >
    <div
      v-for="(component, index) in getWorkplaceData.sections"
      :key="index"
      :id="component.id"
      :ref="component.id"
      @dblclick="setSection(component)"
    >
      <component
        :is="'DefaultSection'"
        :style="component.style"
        :section="component"
        :ref="'sections'"
      ></component>
    </div>
  </section>
</template>

<script>
import DefaultSection from "@/components/ingredients/DefaultSection.vue";
import dezactivateElements from "@/mixins/dezactivateElements.vue";

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Workplace",
  components: {
    DefaultSection,
  },
  computed: {
    ...mapGetters(["getWorkplaceData", "getTtemClicked"]),
  },
  mixins: [dezactivateElements],
  methods: {
    ...mapMutations([
      "setWorkplaceActive",
      "setElementToEdit",
      "setItemClicked",
    ]),

    setSection(selectedSection) {
      this.dezactivateElements("", selectedSection);

      const section = this.getWorkplaceData.sections.find(
        (x) => x.id === selectedSection.id
      );
      section.isActive = true;

      //zapobiega event bubblingowi
      if (!this.getTtemClicked.includes("col")) {
        //save ID of item to edit
        this.setElementToEdit(section.id);
        this.setItemClicked(section.id);
      }
      this.setItemClicked("");
    },

    disactivateAllElements() {
      this.dezactivateElements("");
      this.setElementToEdit("workplace");
      this.setWorkplaceActive(true);
    },
  },
};
</script>

<style scoped lang="scss">
.workplace-container {
  min-height: 1080px;
  background: white;
  box-shadow: $mainShadow;
  margin: 80px 60px;
  position: fixed;
  p {
    font-size: 16px;
  }
}
</style>
