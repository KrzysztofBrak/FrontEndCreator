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
          <div class="color" :style="{background: colorRGBHEX.hex}"></div>
          <div class="color" :style="{background: `rgb(${firstOption[0].r},${firstOption[0].g},${firstOption[0].b})`}"></div>
          <div class="color" :style="{background: `rgb(${firstOption[1].r},${firstOption[1].g},${firstOption[1].b})`}"></div>
          <div class="color" :style="{background: `rgb(${firstOption[2].r},${firstOption[2].g},${firstOption[2].b})`}"></div>
          <div class="color" :style="{background: `rgb(${firstOption[3].r},${firstOption[3].g},${firstOption[3].b})`}"></div>
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
    colorRGBHEX:{
      hex: '#FF00FF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
    },
    firstOption:[
      { r: 255, g: 0, b: 255, a: 1 },
      { r: 255, g: 0, b: 255, a: 1 },
      { r: 255, g: 0, b: 255, a: 1 },
      { r: 255, g: 0, b: 255, a: 1 },
      ]
  }),
  methods:{
    ...mapMutations([
      'setColorsGeneratorModal'
    ]),
    setColor(){
      this.firstOption[0].g = this.firstOption[0].g + 10
      this.firstOption[1].g = this.firstOption[1].g + 15
      this.firstOption[2].g = this.firstOption[2].g + 20
      this.firstOption[3].g = this.firstOption[3].g + 25
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
        background: red;
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
