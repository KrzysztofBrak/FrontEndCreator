<template>
  <section class="tools-section">
    <div class="top-tools-section">
      <div
        class="button-container"
        v-for="button in buttons"
        :key="button.alt"
        @click="btnClick(button.alt)"
      >
        <v-icon medium>{{ button.img }}</v-icon>
      </div>
    </div>
  </section>
</template>

<script>
import { buttons } from "./content.js";
import { mapGetters, mapMutations } from "vuex";

import dezactivateElements from "@/mixins/dezactivateElements.vue";

export default {
  name: "toolsSidebar",
  computed: {
    ...mapGetters(["getWorkplaceData", "getElementToEdit"]),
  },
  mixins: [dezactivateElements],
  data: () => ({
    buttons,
  }),
  methods: {
    ...mapMutations([
      "setSectionsData",
      "setTextSelected",
      "setWorkplaceActive",
      "addItemToColumn",
      "setElementToEdit",
      "addSectionChilds",
      "setColorsGeneratorModal",
    ]),

    btnClick(btnCategory) {
      switch (btnCategory) {
        case "nowa sekcja":
          this.addSection();
          break;

        case "nowa kolumna":
          this.addColumn();
          break;

        case "dodaj tekst":
          this.addItem("text");
          break;

        case "dodaj zdjecie":
          this.addItem("img");
          break;

        case "dobierz kolory":
          this.setColorsGeneratorModal(true);
          break;

        default:
      }
    },

    addSection() {
      this.dezactivateElements("");

      const sectionsArray = this.getWorkplaceData.sections;
      let sectionNumber = sectionsArray.length
        ? Number(
            sectionsArray[sectionsArray.length - 1].id.split("section_")[1]
          ) + 1
        : 0;
      this.setSectionsData({
        id: `section_${sectionNumber}`,
        isActive: true,
        style: {
          height: "300px",
          width: "100%",
          background: "#FFFFFF00",
          borderWidth: "",
          borderStyle: "",
          borderColor: "#FFFFFF00",
          borderRadius: "",
          borderTopLeftRadius: "",
          borderTopRightRadius: "",
          borderBottomLeftRadius: "",
          borderBottomRightRadius: "",
        },
        childStyle: {},
        columns: [
          {
            id: `section_${sectionNumber}-col_0`,
            isActive: false,
            style: {
              height: "100%",
              width: "100%",
              background: "#FFFFFF00",
            },
            childStyle: {},
            childs: [
              {
                id: `section_${sectionNumber}-col_0-item_0`,
                type: "text",
                content: `section_${sectionNumber}-col_0-item_0`,
                isActive: false,
                style: {
                  background: "#FFFFFF00",
                },
                childStyle: {},
              },
            ],
          },
        ],
      });
      this.setWorkplaceActive(false);
      this.setTextSelected(false);
      this.setElementToEdit(`section_${sectionNumber}`);
    },

    addColumn() {
      this.dezactivateElements("withoutSections");

      let sectionForNewColumn = this.findActiveSection();
      let columnIndex = sectionForNewColumn.columns.length
        ? sectionForNewColumn.columns[
            sectionForNewColumn.columns.length - 1
          ].id.split("col_")[1]
        : 0;
      this.addSectionChilds({
        id: `${sectionForNewColumn.id}-col_${++columnIndex}`,
        isActive: true,
        style: {
          height: "100%",
          width: "100%",
        },
        childs: [
          {
            id: `${sectionForNewColumn.id}-col_${columnIndex}-item_0`,
            type: "text",
            content: `${sectionForNewColumn.id}-col_${columnIndex}-item_0`,
            isActive: false,
            style: {},
            childStyle: {},
          },
        ],
      });

      this.setElementToEdit(`${sectionForNewColumn.id}-col_${columnIndex}`);
    },

    addItem(type) {
      this.dezactivateElements("itemsOnly");

      let sectionForNewColumn = this.findActiveSection();
      //if there is active column...
      let currentColumn = sectionForNewColumn.columns.findIndex(
        (x) => x.isActive === true
      );
      //if there is no active column, check active sections
      if (currentColumn === -1) currentColumn = 0;

      const activeColumn = sectionForNewColumn.columns[currentColumn];

      sectionForNewColumn.columns[currentColumn].isActive = true;

      let itemIndex =
        activeColumn.childs.length > 0
          ? activeColumn.childs[activeColumn.childs.length - 1].id.split(
              "item_"
            )[1]
          : 0;

      const itemID = `${
        sectionForNewColumn.columns[currentColumn].id
      }-item_${++itemIndex}`;
      if (type === "text") {
        this.addItemToColumn({
          id: itemID,
          type: type,
          content: itemID,
          isActive: true,
          style: {},
          childStyle: {},
        });
      } else {
        this.addItemToColumn({
          id: itemID,
          type: type,
          content: require("@/assets/img/default-img.svg"),
          isActive: true,
          style: {
            width: "200px",
            height: "200px",
          },
          childStyle: {
            width: "200px",
            height: "200px",
          },
        });
      }
      this.setElementToEdit(itemID);
    },
    findActiveSection() {
      //that means there is no active section
      let sectionForNewColumn =
        this.getElementToEdit === "workplace"
          ? this.getWorkplaceData.sections[0]
          : this.getWorkplaceData.sections.find(
              (section) => section.id === this.getElementToEdit.split("-")[0]
            );
      sectionForNewColumn.isActive = true;
      return sectionForNewColumn;
    },
  },
};
</script>
<style scoped lang="scss">
.tools-section {
  z-index: 1;
  height: 100%;
  width: 50px;
  background: $containerBackground;
  box-shadow: $mainShadow;
  position: fixed;
  top: 50px;
  bottom: 0;
  .button-container {
    padding: 10px;
    cursor: pointer;
    i {
      width: 100%;
    }
    &:hover {
      background: $hoverColor;
    }
  }
}
::v-deep .v-input {
  max-width: 150px;
  .v-input__slot {
    background: $containerBackground !important;
    border-width: 0 0 2px 0;
    border-style: solid;
    border-radius: 0;
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: none !important;
  }
}
</style>
