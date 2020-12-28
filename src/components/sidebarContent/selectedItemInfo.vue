<template>
    <div :class="['selectedItemInfo-container']">
    <div>wybrany element: {{getActiveElement.id}}</div>
      <button :class="['button-add-column']" @click="addColumn">Dodaj kolumnę</button>
    </div>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'selectedItemInfo',

  computed:{
    ...mapGetters(['getActiveElement']),
  },
  data: () => ({
    columnsAmount: 1,
  }),
  methods:{
    ...mapMutations(['addSectionChilds']),

    addColumn(){
      //get index of last column (it won't work when switching columns places will be active)
      let columnIndex = this.getActiveElement.childs[this.getActiveElement.childs.length-1].id.split("col_")[1]
      this.addSectionChilds({
          id: `${this.getActiveElement.id}_col_${++columnIndex}`,
          isActive: false,
          style:{},
          childs:[]
        })
    }
  }
}
</script>

<style scoped lang="scss">

      .button-add-column{
        margin: 10px 0;
        outline: none;
        height: 20px;
        width: 100%;
        background: #f2f2f2;
      }

</style>