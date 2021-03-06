<template>
  <section :class="['childItem-section', {'activeItem': item.isActive}]"
    @dblclick="activateItem"
  >
    <v-fab-transition>
      <v-btn
        :class="['item-btn']"
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

    <div v-if="item.type === 'text'"
      :class="['flex-item']"
      :style="item.childStyle"
    >
      <p >{{item.content}}</p>
    </div>

    <div v-else-if="item.type === 'img'"
      :class="['flex-item']"

    >
      <img :src="item.content" :style="item.style"/>
    </div>

    <p v-else>{{item.content}}</p>
  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'DefaultChildItem',
  props:{
    item:{
      type: Object,
      required: true
    }
  },
  computed:{
    ...mapGetters(['getWorkplaceData']),
  },
  data: () => ({
  }),
  methods:{
    ...mapMutations([
      'setUpdatedArray',
      'setWorkplaceActive',
      'setDeleteItem',
      'setElementToEdit'
    ]),

    activateItem(){
      this.setWorkplaceActive(false);
    },
    deleteItem(){
      this.setDeleteItem(this.item);
      this.setElementToEdit(true);
    }
  },
}
</script>

<style scoped lang="scss">
  .childItem-section{
    height: 100%;
    display: flex;
    position: relative;
    &.activeItem{
      box-shadow: 0px 0px 10px 0px rgb(230, 71, 119);
      transition: 0.3s;
      z-index: 1;
    }
    .flex-item{
      display: flex;
      width: 100%;
    }
  }
</style>
