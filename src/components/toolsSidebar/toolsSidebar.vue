<template>
  <section :class="['tools-section']">
    <div :class="['top-tools-section']">
      <div :class="['button-container']"
        v-for="button in buttons"
        :key="button.alt">
        <img :src="button.img"
          :alt="button.alt"
          @click="btnClick(button.alt)"
        />
      </div>
    </div>
    <div :class="['bottom-tools-section']">
    </div>
  </section>
</template>

<script>
import {buttons} from './content.js'
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'toolsSidebar',
    computed:{
    ...mapGetters(['getSectionsArray']),
  },
  data: () => ({
    buttons,
  }),
  methods:{
    ...mapMutations(['addSectionsArray', 'setTextSelected']),

    btnClick(btnCategory){
      switch(btnCategory){
        case 'nowa sekcja':
          this.addSection()
          break;

        case 'tekst':
          this.setTextSelected(true)
          break;

        default:
      }
    },


    addSection(){
      this.getSectionsArray.forEach((element, index) => {
        if(this.getSectionsArray.length !== index){
          element.isActive = false;
        }
      });

      this.addSectionsArray({
        id: `section_${this.getSectionsArray.length}`,
        isActive: true
      })

      this.setTextSelected(false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tools-section{
    z-index: 1;
    height: 100%;
    width: 50px;
    background: $containerBackground;
    box-shadow: $mainShadow;
    position: fixed;
    top: 50px;
    bottom: 0;
    .button-container{
      padding: 10px;
      cursor: pointer;
      img{
        width: 100%;
      }
      img[alt="tabela"]{
        width: 130%;
        position: relative;
        right: 5px;
      }
      &:hover{
        background: $hoverColor;
      }
    }
  }
        ::v-deep .v-input{
        max-width: 150px;
        .v-input__slot{
          background: $containerBackground!important;
          border-width: 0 0 2px 0;
          border-style: solid;
          border-radius: 0;
          border-color: rgba(0, 0, 0, 0.12);
          box-shadow: none!important;
        }
      }
</style>
