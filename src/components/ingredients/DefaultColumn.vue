<template>
  <section
    class="column-section"
    :class="{ activeSection: column.isActive }"
    @dblclick="setWorkplaceActive(false)"
  >
    <v-fab-transition>
      <v-btn
        class="column-section-btn"
        v-show="column.isActive"
        color="rgb(135, 230, 71)"
        dark
        absolute
        top
        right
        fab
        @click="deleteColumn"
      >
        <v-icon large>mdi-trash-can</v-icon>
      </v-btn>
    </v-fab-transition>
    <!-- display items in current column -->
    <div class="item-container" :style="column.childStyle">
      <div
        class="item"
        v-for="(item, index) in currentColumn.childs"
        :key="index"
        :id="item.id"
        :style="item.style"
        @dblclick="setItems(item)"
      >
        <component
          :is="'DefaultChildItem'"
          :id="item.id"
          :item="item"
          :ref="'items'"
        ></component>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import DefaultChildItem from "@/components/ingredients/DefaultChildItem.vue";
import dezactivateElements from "@/mixins/dezactivateElements.vue";

export default {
  name: "DefaultColumn",
  components: {
    DefaultChildItem,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["getWorkplaceData"]),
  },
  mixins: [dezactivateElements],

  data: () => ({
    currentColumn: {},
  }),

  mounted() {
    this.$nextTick(() => {
      //find current column:
      //to do that, first find section...
      const currentSection = this.getWorkplaceData.sections.find(
        (x) => x.id == this.column.id.split("-")[0]
      );

      //then find there current column
      this.currentColumn = currentSection.columns.find(
        (x) => x.id == this.column.id
      );
    });
  },

  methods: {
    ...mapMutations([
      "setWorkplaceActive",
      "setDeleteColumn",
      "setElementToEdit",
      "setItemClicked",
    ]),

    deleteColumn() {
      this.setDeleteColumn(this.column);
      this.setElementToEdit(true);
    },

    setItems(selectedItem) {
      this.dezactivateElements("itemsOnly");

      if (this.currentColumn.isActive) {
        //get index of active item...
        let childIndex = this.currentColumn.childs.find(
          (x) => x.id === selectedItem.id
        );
        //...and set it to true
        childIndex.isActive = true;

        //ID of element to edit:
        this.setElementToEdit(childIndex.id);
        this.setItemClicked(childIndex.id);
      }
      this.setWorkplaceActive(false);
    },
  },
};
</script>

<style scoped lang="scss">
.column-section {
  height: 100%;
  display: flex;

  &.activeSection {
    box-shadow: 0px 0px 10px 0px rgb(135, 230, 71);
    transition: 0.3s;
    z-index: 1;
  }

  #{&}-btn {
    right: 85px;
  }

  #{&}-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
