<template>
    <div :class="['selectedItemInfo-container']">
    <div>wybrany element:<br> {{getElementToEdit}}</div>
      <button :class="['button-add-column']" @click="addColumn">Dodaj kolumnę</button>
    </div>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'selectedItemInfo',

  computed:{
    ...mapGetters(['getActiveElement', 'getWorkplaceData', 'getElementToEdit']),
  },
  data: () => ({
  }),
  methods:{
    ...mapMutations(['addSectionChilds', 'setElementToEdit']),

    addColumn(){
      //get index of last column (it won't work when switching columns places will be active)
      this.getWorkplaceData.sections.forEach(section => {
       //   section.isActive = false;
          section.columns.forEach(column => {
            column.isActive = false;
            //w prztyszłości trzeba bedzie jeszcze dezaktywować dzieci kolumn
          })
      });

      let columnIndex = this.getActiveElement.columns[this.getActiveElement.columns.length-1].id.split("col_")[1];
      this.addSectionChilds({
          id: `${this.getActiveElement.id}-col_${++columnIndex}`,
          isActive: true,
          style:{
            height: '100%',
            width: '100%',
          },
          childs:[{
            id: `${this.getActiveElement.id}-col_${columnIndex}-item_0`,
            type: 'text',
            content:`${this.getActiveElement.id}-col_${columnIndex}-item_0`,
            isActive: false,
            style:{},
          }]
      })

      this.setElementToEdit(`${this.getActiveElement.id}-col_${columnIndex}`)
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