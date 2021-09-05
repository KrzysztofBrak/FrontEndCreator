<script>
import Vue from 'vue'

export default Vue.extend({
  methods:{
    dezactivateElements(workspace, cleaningLevel) {
      workspace.sections.forEach(section => {
        section.columns.forEach(column => {
          column.childs.forEach(item => {
            item.isActive = false;
          })
          if(cleaningLevel !== 'withoutSectionsAndColumns'){
            column.isActive = false;
          }
        })
        if(!(cleaningLevel === 'withoutSections' || cleaningLevel === 'withoutSectionsAndColumns')){
          section.isActive = false;
        }
      })
    }
  }
})
</script>