<template>
  <section>
    <div :class="['overlay']" @click.self="setColorsGeneratorModal(false)">
      <div :class="['color-generator']">
        <p :class="['button-modal']"
          @click="setColorsGeneratorModal(false)"
          v-on:keyup.Escape="setColorsGeneratorModal(false)"
        >X</p>
        <v-app>
          <v-color-picker
            :class="['color-picker']"
            width="370"
            mode="hexa"
            hide-mode-switch
            v-model="color"
          ></v-color-picker>
        </v-app>
        <div class="colors-container">
          <div class="color" :style="{background: firstOption[0]}"></div>
          <div class="color" :style="{background: firstOption[1]}"></div>
          <div class="color" :style="{background: firstOption[2]}"></div>
          <div class="color" :style="{background: firstOption[3]}"></div>
          <div class="color" :style="{background: firstOption1}"></div>
        </div>
      </div>
    </div>
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
    }
  },
  data: () => ({
    absolute: true,
    overlay: false,
firstOption1: '',
    colorRGBHEX:{
      hex: '#FF00FF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
    },
    firstOption:[],
  }),

  methods:{
    ...mapMutations([
      'setColorsGeneratorModal'
    ]),
    setColor(){
      var Color = require('color');


        [0,1,2,3,4].forEach(i => {
          let selectedColorWithoutA = {r: this.colorRGBHEX.rgba.r, g: this.colorRGBHEX.rgba.g, b: this.colorRGBHEX.rgba.b}
          let selectedColor = Color(selectedColorWithoutA)
          let selectedColorInHSL = selectedColor.hsl()
          let rotatedColor = selectedColorInHSL.rotate(-15 * i)
          let toRGB = rotatedColor.rgb()
          this.firstOption[i] = `rgba(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])}, ${this.colorRGBHEX.rgba.a})`
          this.firstOption1 = `rgba(${Math.round(toRGB.color[0])}, ${Math.round(toRGB.color[1])}, ${Math.round(toRGB.color[2])}, ${this.colorRGBHEX.rgba.a})` //???????????
        });
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
    height: 100%;
    width: 400px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    right: 0;
    padding: 15px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .button-modal{
      margin: 10px 0;
    }
    .colors-container{
      display: flex;
      .color{
        width: 100%;
        height: 100px;
      }
    }
  }
  ::v-deep .v-application--wrap{
    min-height: 0!important;
    .v-color-picker__controls {
      background: $containerBackground;
    }
  }
</style>
