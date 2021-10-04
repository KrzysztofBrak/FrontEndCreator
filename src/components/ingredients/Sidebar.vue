<template>
  <section class="editSidebar-section">
    <v-fade-transition>
      <selectedItemInfo transition="fade-transition" />
    </v-fade-transition>
    <v-fade-transition>
      <shapeEdit transition="fade-transition" />
    </v-fade-transition>
  </section>
</template>

<script>
import shapeEdit from "@/components/sidebarContent/shapeEdit.vue";
import selectedItemInfo from "@/components/sidebarContent/selectedItemInfo.vue";

export default {
  name: "Sidebar",
  components: {
    shapeEdit,
    selectedItemInfo,
  },
};
</script>

<style scoped lang="scss">
.editSidebar-section {
  height: 100%;
  width: 300px;
  background: $containerBackground;
  box-shadow: $mainShadow;
  position: fixed;
  top: 50px;
  bottom: 0;
  right: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .divider {
    margin: 10px 0;
  }
}
</style>
