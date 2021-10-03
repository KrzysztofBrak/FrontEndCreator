<script>
import Vue from "vue";
export default Vue.extend({
  methods: {
    findSelectedItem(elementsName) {
      let selectedItem = {};

      //if it is workplace - return 0
      if (elementsName === "workplace") return 0;
      //first find section
      selectedItem = this.$store.getters.getWorkplaceData.sections.find(
        (x) => x.id === elementsName.split("-")[0]
      );
      //find column if it is selected
      if (elementsName.includes("col")) {
        selectedItem = selectedItem.columns.find(
          (x) => x.id === elementsName.split("-item")[0]
        );
        //find item if it is selected
        if (elementsName.includes("item")) {
          selectedItem = selectedItem.childs.find((x) => x.id === elementsName);
        }
      }
      return selectedItem;
    },
  },
});
</script>
