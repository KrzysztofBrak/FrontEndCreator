<template>
  <section class="header-section">
    <div class="header-container">
      <div class="title-container">
        <div>Frontend <span>Creator</span></div>
      </div>
      <div :class="['menu-container']">
        <input
          type="file"
          ref="openFileInput"
          @change="uploadFile"
          class="hidden-input"
        />
        <p>{{ getWorkplaceData.projectName }}</p>
        <p @click="setNewProjectModal(true)">Nowy projekt +</p>
        <p @click="$refs.openFileInput.click()">Wczytaj projekt</p>
        <p @click="saveProject">Zapisz projekt</p>
        <v-icon class="theme-switcher" @click="setDarkMode(!this.getDarkMode)"
          >mdi-theme-light-dark
        </v-icon>
      </div>
    </div>
    <v-fade-transition>
      <div v-show="getNewProjectModal">
        <newProjectModal />
      </div>
    </v-fade-transition>
  </section>
</template>

<script>
import newProjectModal from "@/components/newProjectModal.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    newProjectModal,
  },

  computed: {
    ...mapGetters(["getNewProjectModal", "getWorkplaceData", "getDarkMode"]),

    isProjectActive() {
      return localStorage.getItem("vuex") !== null;
    },
  },

  methods: {
    ...mapMutations(["setNewProjectModal", "setWorkplaceData", "setDarkMode"]),

    saveProject() {
      const filename = `${this.getWorkplaceData.projectName}.json`;
      const data = localStorage.getItem("vuex");
      console.save = this.saveData(filename, data);
    },
    saveData(filename, data) {
      data = JSON.stringify(data, undefined, 4);

      const blob = new Blob([data], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },

    uploadFile() {
      let uploadedFile = event.target.files[0];
      //@TODO - VALIDATION IF JSON CONTAINS ALL NECESSERY VARIABLES
      if (uploadedFile.type !== "application/json") {
        alert("Błąd! Zły typ pliku");
        return false;
      }

      if (uploadedFile) {
        const readFile = new FileReader();
        readFile.onload = (e) => {
          const contents = e.target.result;
          const json = JSON.parse(contents);
          this.setWorkplaceData(JSON.parse(json).workplaceData);
        };
        readFile.readAsText(uploadedFile);
      } else {
        alert("Błąd, spróbuj ponownie");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header-section {
  position: fixed;
  width: 100%;
  box-shadow: $mainShadow;
  background: $containerBackground;
  height: 50px;
  z-index: 21;
  .header-container {
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .title-container {
      margin: auto 0;
      div {
        margin: 0;
        display: flex;
        font-size: 24px;
        color: $mainFontColor;
        font-weight: 700;
        position: relative;
        bottom: 5px;
        span {
          font-size: 16px;
          -webkit-text-fill-color: transparent;
          background: -webkit-linear-gradient(
            180deg,
            rgba(29, 26, 219, 1),
            rgba(253, 29, 29, 1) 53%
          );
          position: relative;
          top: 21px;
          right: 25px;
          -webkit-background-clip: text;
        }
      }
    }
    .menu-container {
      display: flex;
      margin: auto 0;
      .theme-switcher {
        cursor: pointer;
        padding: 2px 5px;
        &:hover {
          background: $hoverColor;
        }
      }
      .hidden-input {
        display: none;
      }
      p {
        margin: 0;
        padding: 5px 20px;
        display: flex;
        font-size: 16px;
        color: $mainFontColor;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background: $hoverColor;
        }
      }
    }
  }
}
</style>
