<template>
  <section class="edit-sidebar-section p-4 d-flex flex-column">
    <div class="text-subtitle-1 ma-3">
      <p>
        wybrany element:
        <br />
        {{ getElementToEdit }}
      </p>
    </div>
    <v-fade-transition>
      <shapeEdit transition="fade-transition" />
    </v-fade-transition>
  </section>
</template>

<script>
import shapeEdit from "@/components/sidebarContent/shapeEdit.vue";
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  components: {
    shapeEdit,
  },
  computed: {
    ...mapGetters(["getElementToEdit"]),
  },
};
</script>

<style scoped lang="scss">
.edit-sidebar-section {
  height: 100%;
  width: 300px;
  background: $containerBackground;
  box-shadow: $mainShadow;
  position: fixed;
  top: 50px;
  bottom: 0;
  right: 0;
  overflow: auto;
}
</style>
