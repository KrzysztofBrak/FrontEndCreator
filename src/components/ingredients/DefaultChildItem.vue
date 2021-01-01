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
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <p v-if="item.type === 'text'">{{item.content}}</p>

    <div v-else-if="item.type === 'img'">
      <img :src="item.content" />
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
      'setDeleteItem'
    ]),

    activateItem(){
      this.setWorkplaceActive(false);
    },
    deleteItem(){
      this.setDeleteItem(this.item)
      // this.setWorkplaceActive(true);
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
    .column{
      height: 100%;
    }
  }
  .column-btn{
    right: 120px;
  }

</style>
