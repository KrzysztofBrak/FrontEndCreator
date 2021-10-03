<script>
import Vue from "vue";

export default Vue.extend({
  methods: {
    dezactivateElements(cleaningLevel, selectedItem) {
      this.$store.getters.getWorkplaceData.sections.forEach((section) => {
        if (
          typeof selectedItem === "undefined" ||
          selectedItem.id !== section.id
        ) {
          section.columns.forEach((column) => {
            if (
              typeof selectedItem === "undefined" ||
              selectedItem.id !== column.id
            ) {
              column.childs.forEach((item) => {
                item.isActive = false;
              });
            }

            if (cleaningLevel !== "itemsOnly") {
              column.isActive = false;
            }
          });
          if (
            !(
              cleaningLevel === "itemsOnly" ||
              cleaningLevel === "withoutSections"
            )
          ) {
            section.isActive = false;
          }
        }
      });
    },
  },
});
</script>
