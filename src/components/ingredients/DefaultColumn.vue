<template>
  <section :class="['column-section', {'activeSection': column.isActive}]"
    @dblclick="activateColumn"
  >
    <v-fab-transition>
      <v-btn
        :class="['column-btn']"
        v-show="column.isActive"
        color="rgb(135, 230, 71)"
        dark
        absolute
        top
        right
        fab
        @click="deleteColumn"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
      <p>{{column.id}}</p>
  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'DefaultColumn',
  props:{
    column:{
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
      'setDeleteColumn'
    ]),

    activateColumn(){
      this.setWorkplaceActive(false);
    },
    deleteColumn(){
      this.setDeleteColumn(this.column)
      // this.setWorkplaceActive(true);
    }
  },
}
</script>

<style scoped lang="scss">
  .column-section{
    height: 100%;
    display: flex;
    &.activeSection{
      box-shadow: 0px 0px 10px 0px rgb(135, 230, 71);
      transition: 0.3s;
      z-index: 1;
    }
    .column{
      height: 100%;
    }
  }
  .column-btn{
    right: 85px;
  }

</style>
