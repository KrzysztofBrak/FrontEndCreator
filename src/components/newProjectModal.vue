<template>
  <section class="new-project-modal">
    <div class="new-project-modal-overlay" @click.self="closeModal">
      <div class="new-project-modal-container my-0 mx-auto pa-7">
        <v-text-field
          label="Nazwa projektu"
          :rules="[() => !!projectName || 'Pole jest wymagane']"
          solo
          required
          autofocus
          v-model="projectName"
        ></v-text-field>
        <div
          class="buttons-container d-flex flex-column justify-space-between my-5"
        >
          <v-btn
            v-for="btn in buttons"
            :key="btn.icon"
            class="button my-2"
            :class="[{ isActive: btn.isActive }]"
            block
            @click="setWorkplaceWidth(btn)"
          >
            <v-icon large>{{ btn.icon }}</v-icon>
            <div class="btn-content-container">
              <p>{{ btn.textFirstPart }}<br />{{ btn.textSecondPart }}</p>
              <input
                v-if="btn.input"
                type="text"
                placeholder="WPISZ WARTOŚĆ"
                v-model="btn.value"
              />{{ btn.value }}
            </div>
          </v-btn>
        </div>
        <div v-show="showModalQuestion" class="red--text">
          Jesteś pewien że chcesz nadpisać utworzony projekt?
        </div>
        <v-btn
          block
          class="my-4"
          @click="createProject"
          v-on:keyup.enter="createProject"
          >UTWÓRZ
        </v-btn>
        <v-btn
          class="my-4"
          block
          @click="closeModal"
          v-on:keyup.Escape="closeModal"
          >ANULUJ
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "newProjectModal",
  computed: {
    ...mapGetters(["getWorkplaceData"]),
  },
  data: () => ({
    showModalQuestion: false,
    projectName: "",
    workplaceWidth: "1920px",
    buttons: [
      {
        icon: "mdi-desktop-mac",
        textFirstPart: "Desktop",
        textSecondPart: "(1920px)",
        input: false,
        isActive: false,
        value: "1920",
      },
      {
        icon: "mdi-cellphone",
        textFirstPart: "Telefon",
        textSecondPart: "(360px)",
        input: false,
        isActive: false,
        value: "360",
      },
      {
        icon: "mdi-checkbox-blank-outline",
        textFirstPart: "Niestandardowy",
        textSecondPart: "rozmiar:(px)",
        input: true,
        isActive: false,
        value: "",
      },
    ],
  }),

  mounted() {
    window.addEventListener("keyup", (e) => {
      e.keyCode === 13 && this.createProject();
    });
  },

  methods: {
    ...mapMutations([
      "setNewProjectModal",
      "setProjectName",
      "setWorkplaceData",
    ]),

    closeModal() {
      this.setNewProjectModal(false);
      this.projectName = "";
    },

    createProject() {
      if (this.projectName !== "") {
        if (
          this.getWorkplaceData.projectName !== "" &&
          !this.showModalQuestion
        ) {
          this.showModalQuestion = true;
        } else {
          this.setNewProjectModal(false);
          this.setWorkplaceData({});
          this.setWorkplaceData({
            projectName: "",
            isWorkplaceActive: false,
            workplaceWidth: "1920px",
            sections: [
              {
                id: "section_0",
                isActive: true,
                style: {
                  height: "300px",
                  width: "100%",
                  background: "#FFFFFF00",
                  borderWidth: "",
                  borderStyle: "",
                  borderColor: "#FFFFFF00",
                  borderRadius: "",
                },
                childStyle: {},
                columns: [
                  {
                    id: "section_0-col_0",
                    isActive: false,
                    style: {
                      height: "100%",
                      width: "100%",
                      background: "#FFFFFF00",
                    },
                    childStyle: {},
                    childs: [
                      {
                        id: "section_0-col_0-item_0",
                        type: "text",
                        content: "section_0-col_0-item_0",
                        isActive: false,
                        style: {
                          background: "#FFFFFF00",
                        },
                        childStyle: {},
                      },
                    ],
                  },
                ],
              },
            ],
          });
          this.setProjectName(this.projectName);

          setTimeout(() => {
            this.projectName = "";
            this.showModalQuestion = false;
            this.buttons.forEach((button) => {
              if (button.isActive) {
                this.getWorkplaceData.workplaceWidth = `${button.value}px`;
                button.isActive = false;
              }
            });
          }, 500);
        }
      }
    },

    setWorkplaceWidth(btn) {
      this.buttons.forEach((button) => {
        button.isActive = false;
      });
      btn.isActive = true;
    },
  },
};
</script>

<style scoped lang="scss">
.new-project-modal {
  #{&}-overlay {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  #{&}-container {
    position: relative;
    z-index: 2;
    height: fit-content;
    max-width: 450px;
    background: $containerBackground;
    box-shadow: $mainShadow;
  }

  ::v-deep .v-input {
    margin: 15px 0 40px 0;

    &__slot {
      border-width: 0 0 2px 0;
      background: $containerBackground !important;
      border-style: solid;
      border-radius: 0;
      border-color: rgba(0, 0, 0, 0.12);
      box-shadow: none !important;
    }
  }

  .button {
    height: 100px !important;

    ::v-deep .v-btn__content {
      justify-content: space-between;
      display: flex;

      .v-icon {
        margin-left: 30px;
      }

      .btn-content-container {
        width: 50%;
      }

      input {
        font-size: 0.875rem;
        max-width: 122px;
        outline: none;
      }
    }

    &.isActive {
      background-color: #bebebe !important;
    }
  }
}

::v-deep .v-messages__message {
  color: red;
}
</style>
