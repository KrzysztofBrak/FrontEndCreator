<template>
  <section>
    <div class="overlay" @click.self="setColorsGeneratorModal(false)">
      <div class="color-generator">
        <v-app class="background">
          <v-color-picker
            class="color-picker"
            width="370"
            mode="hexa"
            hide-mode-switch
            v-model="color"
          ></v-color-picker>
          <div class="selected-color">{{ HEXColors[0] }}</div>
          <v-radio-group v-model="radioGroup" class="background">
            <v-radio
              v-for="item in radioButtons"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <v-slider
            label="Rozpiętość:"
            class="background slider"
            max="70"
            min="15"
            v-model="colorRange"
            :disabled="radioGroup !== 'Analogicznie'"
          ></v-slider>
        </v-app>
        <div class="colors-container">
          <div
            v-for="(color, index) in HEXColors"
            :key="index"
            v-clipboard:copy="color"
            v-clipboard:success="() => (snackbar = true)"
            class="color"
            :style="{
              background: firstOption[index],
              color: invertColorName(color),
            }"
          >
            {{ color.substring(1) }}
          </div>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="2000" top>
      {{ snackbarText }}
    </v-snackbar>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";

export default {
  name: "ColorsGeneratorSidebar",
  computed: {
    ...mapGetters(["getColorsGeneratorModalOpened"]),

    color: {
      get() {
        return this.b;
      },
      set: _.throttle(function (v) {
        this.colorRGBHEX = v;
      }, 200),
    },
  },

  watch: {
    colorRGBHEX: {
      immediate: true,
      deep: true,
      handler() {
        this.setColor();
      },
    },
    colorRange() {
      this.setColor();
    },
    radioGroup() {
      this.setColor();
    },
  },

  data: () => ({
    snackbar: false,
    snackbarText: "Kolor został skopiowany do schowka",
    colorRange: 15,
    radioGroup: "Analogicznie",
    colorRGBHEX: {
      hex: "#FF00FF",
      rgba: { r: 255, g: 0, b: 255 },
    },
    firstOption: [],
    HEXColors: [],
    radioButtons: [
      "Analogicznie",
      "Triada",
      "Monochromatyczny",
      "Uzupełniający",
      "Czworokątny",
      "Odcienie",
    ],
  }),

  methods: {
    ...mapMutations(["setColorsGeneratorModal"]),

    setColor() {
      const selectedColorWithoutA = {
        r: this.colorRGBHEX.rgba.r,
        g: this.colorRGBHEX.rgba.g,
        b: this.colorRGBHEX.rgba.b,
      };

      const Color = require("color");
      const selectedColorInHSL = Color(selectedColorWithoutA).hsl();

      switch (this.radioGroup) {
        case "Analogicznie":
          this.analogical(selectedColorInHSL);
          break;
        case "Triada":
          this.triad(selectedColorInHSL);
          break;
        case "Monochromatyczny":
          this.monochromatic(selectedColorInHSL);
          break;
        case "Uzupełniający":
          this.complementary(selectedColorInHSL);
          break;
        case "Czworokątny":
          this.square(selectedColorInHSL);
          break;
        case "Odcienie":
          this.shades(selectedColorInHSL);
          break;

        default:
          break;
      }
      this.convertToHex();
    },

    analogical(selectedColorInHSL) {
      [0, 1, 2, 3, 4].forEach((i) => {
        const currentHSLColor = selectedColorInHSL.rotate(this.colorRange * i);
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },

    triad(selectedColorInHSL) {
      let inc = 0;
      let currentHSLColor;
      [0, 1, 2, 3, 4].forEach((i) => {
        if (i % 2 === 0) {
          currentHSLColor = selectedColorInHSL.rotate(120 * inc--);
        }
        switch (i) {
          case 1:
          case 4:
            currentHSLColor.color[1] -= 10;
            currentHSLColor.color[2] += 30;
            break;
          case 2:
            currentHSLColor.color[1] -= 10;
            break;
          case 3:
            currentHSLColor.color[2] += 30;
            break;
          default:
            break;
        }
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },

    monochromatic(selectedColorInHSL) {
      let currentHSLColor;
      [0, 1, 2, 3, 4].forEach((i) => {
        currentHSLColor = selectedColorInHSL.rotate(0);

        switch (i) {
          case 1:
            currentHSLColor.color[2] += 30;
            break;
          case 2:
            currentHSLColor.color[2] += 40;
            break;
          case 3:
            currentHSLColor.color[1] -= 30;
            currentHSLColor.color[2] += 40;
            break;
          case 4:
            currentHSLColor.color[1] -= 30;
            break;

          default:
            break;
        }
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },
    complementary(selectedColorInHSL) {
      let inc = 0;
      let currentHSLColor;
      [0, 1, 2, 3, 4].forEach((i) => {
        const color = i % 3;
        switch (color) {
          case 1:
            currentHSLColor.color[1] -= 8;
            currentHSLColor.color[2] += 30;
            break;
          case 2:
            currentHSLColor.color[1] -= 10;
            currentHSLColor.color[2] += 10;
            break;

          default:
            currentHSLColor = selectedColorInHSL.rotate(180 * inc--);
            break;
        }
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },
    square(selectedColorInHSL) {
      let inc = 0;
      let currentHSLColor;
      [0, 1, 2, 3, 4].forEach((i) => {
        if (i !== 1) {
          currentHSLColor = selectedColorInHSL.rotate(90 * inc--);
        }
        switch (i) {
          case 1:
            currentHSLColor.color[1] -= 10;
            break;
          case 2:
            currentHSLColor.color[1] -= 20;
            break;
          case 4:
            currentHSLColor.color[1] -= 5;
            break;

          default:
            break;
        }
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },
    shades(selectedColorInHSL) {
      let currentHSLColor;
      [0, 1, 2, 3, 4].forEach((i) => {
        currentHSLColor = selectedColorInHSL;
        switch (i) {
          case 1:
            currentHSLColor.color[2] -= 25;
            break;
          case 2:
            currentHSLColor.color[2] += 50;
            break;
          case 3:
            currentHSLColor.color[2] += 5;
            break;
          case 4:
            currentHSLColor.color[2] -= 25;
            break;

          default:
            break;
        }
        this.validateColorsAndSave(i, currentHSLColor);
      });
    },

    validateColorsAndSave(arrayIndex, currentColor) {
      //dwa warunki to uniknięcie proponowania barw bardzo ciemnych i bardzo jasnych
      if (currentColor.color[2] > 80) {
        currentColor.color[2] = Math.abs(currentColor.color[2] - 70);
      } else if (currentColor.color[2] < 10) {
        currentColor.color[2] = Math.abs(20 + currentColor.color[2]);
      }

      const toRGB = currentColor.rgb();
      this.firstOption[arrayIndex] = `rgb(${Math.round(toRGB.color[0])},
                                        ${Math.round(toRGB.color[1])},
                                        ${Math.round(toRGB.color[2])})`;
    },

    convertToHex() {
      this.HEXColors = [];
      const Color = require("color");
      this.firstOption.forEach((element) => {
        this.HEXColors.push(Color(element).hex());
      });
    },

    invertColorName(color) {
      const invert = require("invert-color");
      return invert(color, true);
    },
  },
};
</script>

<style scoped lang="scss">
.overlay {
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
.color-generator {
  z-index: 1;
  width: 400px;
  background: $containerBackground;
  box-shadow: $mainShadow;
  position: fixed;
  justify-content: space-between;
  top: 50px;
  bottom: 0;
  right: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .selected-color {
    margin: 0 auto 20px auto;
    font-size: 20px;
  }
  .button-modal {
    margin: 10px 0;
  }
  .slider {
    width: 96%;
  }
  .colors-container {
    display: flex;
    position: relative;
    width: 108%;
    right: 15px;
    bottom: -15px;
    .color {
      width: 100%;
      height: 20vh;
      font-size: 20px;
      font-weight: 600;
      font-family: system-ui;
      text-align: center;
      cursor: pointer;
    }
  }
  .background {
    background: $containerBackground;
  }
}
::v-deep .v-application--wrap {
  min-height: 0 !important;
  .v-input--selection-controls {
    margin-top: 0;
  }
  .v-color-picker__controls {
    background: $containerBackground;
  }
  .v-color-picker__alpha,
  .v-color-picker__edit {
    display: none;
  }
  .v-color-picker__hue {
    margin-bottom: 5px;
  }
}
::v-deep .v-snack__wrapper {
  margin-top: 33px;
  background-color: #44a544 !important;
}
</style>
