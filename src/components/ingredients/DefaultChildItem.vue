<template>
  <section
    class="childItem-section"
    :class="{ activeItem: item.isActive }"
    @dblclick="setWorkplaceActive(false)"
  >
    <v-fab-transition>
      <v-btn
        class="item-btn"
        v-show="item.isActive"
        color="rgb(230, 71, 119)"
        dark
        absolute
        top
        right
        fab
        @click="deleteItem"
      >
        <v-icon large>mdi-trash-can</v-icon>
      </v-btn>
    </v-fab-transition>

    <div v-if="item.type === 'text'" class="flex-item" :style="item.childStyle">
      <p>{{ item.content }}</p>
    </div>

    <div v-else-if="item.type === 'img'" class="flex-item">
      <img :src="item.content" :style="item.style" alt="img" />
    </div>

    <p v-else>{{ item.content }}</p>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "DefaultChildItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["getWorkplaceData"]),
  },
  methods: {
    ...mapMutations([
      "setWorkplaceActive",
      "setDeleteItem",
      "setElementToEdit",
    ]),
    deleteItem() {
      this.setDeleteItem(this.item);
      this.setElementToEdit(true);
    },
  },
};
</script>

<style scoped lang="scss">
.childItem-section {
  height: 100%;
  display: flex;
  position: relative;
  &.activeItem {
    box-shadow: 0px 0px 10px 0px rgb(230, 71, 119);
    transition: 0.3s;
    z-index: 1;
  }
  .item-btn {
    right: 160px;
  }
  .flex-item {
    display: flex;
    width: 100%;
  }
}
</style>
