<template>
  <section>
    <div :class="['overlay']" @click.self="setColorsGeneratorModal(false)">
      <div :class="['color-generator']">
        <v-app  :class="['background']">
          <v-color-picker
            :class="['color-picker']"
            width="370"
            mode="hexa"
            hide-mode-switch
            v-model="color"
          ></v-color-picker>
          <div :class="['selected-color']">{{HEXColors[0]}}</div>
          <v-radio-group v-model="radioGroup" :class="['background']">
            <v-radio
              v-for="item in radioButtons"
              :key="item"
              :label="item"
              :value="item"
            ></v-radio>
          </v-radio-group>
          <v-slider
            label="Rozpiętość:"
            :class="['background slider']"
            max="70"
            min="15"
            v-model="range"
            :disabled="radioGroup !== 'Analogicznie'"
          ></v-slider>
        </v-app>
        <div class="colors-container">
          <div v-clipboard:copy="HEXColors[0]" v-clipboard:success="onCopy" class="color" :style="{background: firstOption[0], color: invertColor(HEXColors[0]) }">{{cutHash(HEXColors[0])}}</div>
          <div v-clipboard:copy="HEXColors[1]" v-clipboard:success="onCopy" class="color" :style="{background: firstOption[1], color: invertColor(HEXColors[1])}">{{cutHash(HEXColors[1])}}</div>
          <div v-clipboard:copy="HEXColors[2]" v-clipboard:success="onCopy" class="color" :style="{background: firstOption[2], color: invertColor(HEXColors[2])}">{{cutHash(HEXColors[2])}}</div>
          <div v-clipboard:copy="HEXColors[3]" v-clipboard:success="onCopy" class="color" :style="{background: firstOption[3], color: invertColor(HEXColors[3])}">{{cutHash(HEXColors[3])}}</div>
          <div v-clipboard:copy="HEXColors[4]" v-clipboard:success="onCopy" class="color" :style="{background: firstOption1, color: invertColor(HEXColors[4])}">{{cutHash(HEXColors[4])}}</div>
        </div>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}
    </v-snackbar>
  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'
import _ from 'lodash';

export default {
  name: 'ColorsGeneratorSidebar',
  components:{
  },
  computed:{
    ...mapGetters([
      'getColorsGeneratorModalOpened'
    ]),
    color:{
      get () {
        return this.b
      },
      set:  _.throttle(function(v){
        this.colorRGBHEX = v
      },200),
    }
  },
  watch:{
    colorRGBHEX: {
      immediate: true,
      deep: true,
      handler(){
        this.setColor()
      }
    },
    range(){
      this.setColor()
    },
    radioGroup(){
      this.setColor()
    }
  },
  data: () => ({
    absolute: true,
    overlay: false,
    snackbar: false,
    text: 'Kolor został skopiowany do schowka',
    timeout: 2000,
    range:15,
    radioGroup: 'Analogicznie',
    firstOption1: '',
    colorRGBHEX:{
      hex: '#FF00FF',
      rgba: { r: 255, g: 0, b: 255},
    },
    firstOption:[],
    HEXColors:[],
    radioButtons:[
      'Analogicznie',
      'Triada',
      'Monochromatyczny',
      'Uzupełniający',
      'Czworokątny',
      'Odcienie'
    ]
  }),

  methods:{
    ...mapMutations([
      'setColorsGeneratorModal'
    ]),
    setColor(){
      const Color = require('color');
      let selectedColorWithoutA = {r: this.colorRGBHEX.rgba.r, g: this.colorRGBHEX.rgba.g, b: this.colorRGBHEX.rgba.b}
      let selectedColor = Color(selectedColorWithoutA)
      let selectedColorInHSL = selectedColor.hsl();
      switch (this.radioGroup) {
        case 'Analogicznie':
          this.analogical(selectedColorInHSL)
          break;
        case 'Triada':
          this.triad(selectedColorInHSL)
          break;
        case 'Monochromatyczny':
          this.monochromatic(selectedColorInHSL)
          break;
        case 'Uzupełniający':
          this.complementary(selectedColorInHSL)
          break;
        case 'Czworokątny':
          this.square(selectedColorInHSL)
          break;
        case 'Odcienie':
          this.shades(selectedColorInHSL)
          break;

        default:
          break;
      }
      this.convertToHex()
    },

    analogical(selectedColorInHSL){
      [0,1,2,3,4].forEach(i => {
        let rotatedColor = selectedColorInHSL.rotate(this.range * i)
        let toRGB = rotatedColor.rgb()
        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`
        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },

    triad(selectedColorInHSL){
      let inc = 0;
      let rotatedColor
      [0,1,2,3,4].forEach(i => {
        if(i % 2 === 0){
          rotatedColor = selectedColorInHSL.rotate(120 * inc)
          inc = inc - 1
        }
        if(i % 2 === 1 || i === 4 ){
          rotatedColor.color[2] = rotatedColor.color[2] + 30
        }
        if(i === 1 || i === 2 || i === 4){
          rotatedColor.color[1] = rotatedColor.color[1] - 10
        }
        let toRGB = rotatedColor.rgb()
        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`
        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },

    monochromatic(selectedColorInHSL){
      let rotatedColor
      [0,1,2,3,4].forEach(i => {
        rotatedColor = selectedColorInHSL.rotate(120 * 0)

        if(i > 2){
          rotatedColor.color[1] = rotatedColor.color[1] -30
        }
        if(i === 1 ){
          rotatedColor.color[2] = rotatedColor.color[2] + 30
        }
        if(i === 2 || i === 3){
          rotatedColor.color[2] = rotatedColor.color[2] + 40
        }
        //dwa warunki to uniknięcie proponowania barw bardzo ciemnych i bardzo jasnych
        if(rotatedColor.color[2] > 80){
          rotatedColor.color[2] =   Math.abs(rotatedColor.color[2] - 70)
        }
        if(rotatedColor.color[2] < 10){
          rotatedColor.color[2] =  Math.abs(20 +  rotatedColor.color[2])
        }
        let toRGB = rotatedColor.rgb()

        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`
        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },
    complementary(selectedColorInHSL){
      let inc = 0;
      let rotatedColor
      [0,1,2,3,4].forEach(i => {
        if(i % 3 === 0){
          rotatedColor = selectedColorInHSL.rotate(180 * inc)
          inc = inc - 1
        }
        if(i % 3 === 1){
          rotatedColor.color[1] = rotatedColor.color[1] - 8
          rotatedColor.color[2] = rotatedColor.color[2] + 30
        }
        if(i % 3 === 2){
          rotatedColor.color[1] = rotatedColor.color[1] - 10
          rotatedColor.color[2] = rotatedColor.color[2] + 10
        }

        let toRGB = rotatedColor.rgb()
        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`
        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },
    square(selectedColorInHSL){
      let inc = 0;
      let rotatedColor
      [0,1,2,3,4].forEach(i => {
        if(i  !== 1){
          rotatedColor = selectedColorInHSL.rotate(90 * inc)
          inc = inc - 1
        }
        if(i === 1){
          rotatedColor.color[1] = rotatedColor.color[1] - 10
        }
        if(i === 2){
          rotatedColor.color[1] = rotatedColor.color[1] - 20
        }
        if(i === 4){
          rotatedColor.color[1] = rotatedColor.color[1] - 5
        }

        let toRGB = rotatedColor.rgb()
        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`

        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },
    shades(selectedColorInHSL){
      let rotatedColor
      [0,1,2,3,4].forEach(i => {

        rotatedColor = selectedColorInHSL

        if(i === 1){
          rotatedColor.color[2] = rotatedColor.color[2] - 25
        }
        if(i === 2){
          rotatedColor.color[2] = rotatedColor.color[2] + 50
        }
        if(i === 3){
          rotatedColor.color[2] = rotatedColor.color[2] + 5
        }
        if(i === 4){
          rotatedColor.color[2] = rotatedColor.color[2] - 25
        }
        //         //dwa warunki to uniknięcie proponowania barw bardzo ciemnych i bardzo jasnych
        if(rotatedColor.color[2] < 20){
          rotatedColor.color[2] = 80 - Math.abs(rotatedColor.color[2])
        }else if(rotatedColor.color[2] > 80){
          rotatedColor.color[2] = Math.abs(60 - rotatedColor.color[2])
        }
        let toRGB = rotatedColor.rgb()
        this.firstOption[i] = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})`
        this.firstOption1 = `rgb(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])})` //???????????
      });
    },

    convertToHex(){
      this.HEXColors = []
      const Color = require('color');
      this.firstOption.forEach(element => {
        this.HEXColors.push(Color(element).hex())
      });
    },

    invertColor(color){
      const invert = require('invert-color');
      return invert(color, true)
    },

    cutHash(color){
      return color.substring(1)

    },
    copyColor(color){
      console.log(color);
      var copyText = document.querySelector('color1');
      copyText.setAttribute('type', 'text');
      copyText.select();
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
    },
    onCopy(){
      this.snackbar = true
    }
  }
}
</script>

<style scoped lang="scss">
.overlay{
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }
  .color-generator{
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
    .selected-color{
      margin: 0 auto 20px auto;
      font-size: 20px;
    }
    .button-modal{
      margin: 10px 0;
    }
    .slider{
      width: 96%;
    }
    .colors-container{
      display: flex;
      position: relative;
      width: 108%;
      right: 15px;
      bottom: -15px;
      .color{
        width: 100%;
        height: 20vh;
        font-size: 20px;
        font-weight: 600;
        font-family: system-ui;
        text-align: center;
        cursor: pointer;
      }
    }
    .background{
      background: $containerBackground;
    }
  }
  ::v-deep .v-application--wrap{
    min-height: 0!important;
    .v-input--selection-controls{
      margin-top: 0;
    }
    .v-color-picker__controls {
      background: $containerBackground;
    }
    .v-color-picker__alpha,
    .v-color-picker__edit{
      display: none;
    }
    .v-color-picker__hue{
      margin-bottom: 5px;
    }
  }
  ::v-deep .v-snack__wrapper{
    margin-top: 33px;
    background-color: #44a544 !important;
  }
</style>
