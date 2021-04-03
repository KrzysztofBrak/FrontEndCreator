<template>
  <div :class="['home', {'dark-theme': getDarkMode}]" id="theme">
    <Header/>
    <div :class="['main-container']" @dblclick.self="disactivateAllElements">
      <toolsSidebar  v-show="isProjectActive"/>


      <div v-show="!isProjectActive"
        :class="['icon-container']">
        <img :src="require('@/assets/img/new_file.svg')"/>
      </div>
      <workplace v-show="isProjectActive">

      </workplace>


      <Sidebar  v-show="isProjectActive"/>
      <v-fade-transition>
      <div v-show="getColorsGeneratorModalOpened">
        <ColorsGeneratorSidebar/>
      </div>
      </v-fade-transition>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import toolsSidebar from '@/components/toolsSidebar/toolsSidebar.vue'
import workplace from '@/components/workplace.vue'
import Sidebar from '@/components/ingredients/Sidebar.vue'
import ColorsGeneratorSidebar from '@/components/colorsGeneratorSidebar/ColorsGeneratorSidebar.vue'


import{mapGetters, mapMutations} from 'vuex'
import panzoom from 'panzoom'
export default {
  name: 'Home',
  components: {
    Header,
    toolsSidebar,
    Sidebar,
    workplace,
    ColorsGeneratorSidebar
  },
  computed:{
    ...mapGetters(['getActualZoom',
      'getWorkplaceData',
      'getColorsGeneratorModalOpened',
      'getDarkMode'
    ]),
  },

  watch:{
    getWorkplaceData(){
      this.isProjectActive = true
    },
  },
  data: () => ({
    isProjectActive: false,
    colorGeneratorIsActive: false
  }),
  mounted(){
    this.isProjectActive =  (localStorage.getItem("vuex") !== null)
    // just grab a DOM element
    const element = document.querySelector('#workplace')

    // And pass it to panzoom
    panzoom(element, {

      // allow wheel-zoom only if altKey is down. Otherwise - ignore
      beforeWheel: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },

      // allow mouse-down panning only if altKey is down. Otherwise - ignore
      beforeMouseDown: function(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },

      //disable moving workplace with arrows
      filterKey: function() {
        return true;
      },

      maxZoom: 3,
      minZoom: 0.2,
      initialZoom: this.getActualZoom,
      zoomSpeed: 0.99,
      zoomDoubleClickSpeed: 1,
      // bounds: true,
      // boundsPadding: 0.1
    });

    // instance.on('zoom', function() {
    //   this.setActualZoom(instance.getTransform().scale)
    // });

  },
  methods:{
    ...mapMutations(['setActualZoom', 'setWorkplaceActive', 'setElementToEdit', 'setColorsGeneratorModal']),

    disactivateAllElements(){
      this.getWorkplaceData.sections.forEach(section => {
          section.isActive = false;
          section.columns.forEach(column => {
            column.isActive = false;
            column.childs.forEach(item =>{
              item.isActive = false
            })
          })
      });
       this.setWorkplaceActive(true);
       this.setElementToEdit('workplace')
    }
  }
}
</script>
<style scoped lang="scss">
.main-container{
  outline: none;
  display: flex;
  height: 100vh;
  .icon-container{
    margin: auto;
    width: 50%;
    margin-top: 100px;
    max-width: 500px;
    svg{
      margin: auto;
      display: flex;
    }
  }
}
#theme.dark-theme{
  background: #232735;
  // background: #676a73;
  ::v-deep .header-container{
    background: #2c2f3b;
    button, p{
      color: #acacac;
    }
    button:hover,
    p:hover{
      background:#3a3c48;
    }
  }
  ::v-deep .tools-section{
    background: #2c2f3b;
    button, i{
      color: #acacac;
    }
    .button-container:hover{
      background:#3a3c48;
    }
  }
  ::v-deep .editSidebar-section{
    background: #2c2f3b;
    button, i, p{
      color: #acacac;
    }
    p:hover,
    .horizontal-positioning:hover,
    .align-text-button:hover{
      background:#3a3c48;
    }
    .active{
      background: #394157;
    }
  }

  ::v-deep .project-modal{
    background: #2c2f3b;
    button, i, p{
      color: #acacac;
    }
    .v-input__slot{
      background: #2c2f3b!important;
      .v-label, #input-9{
        color: #acacac;
      }
    }

    button{
      background: #2c2f3b;
      &.isActive{
        background: #394157!important;
      }
    }
  }
  ::v-deep .row{
    border: none;
    .v-expansion-panel-header,
    .v-expansion-panel-content{
      background: #2c2f3b;
    }
  }
  ::v-deep .input-style{
    background: #4f525d;
    color: #acacac;
    &::placeholder{
      color: #acacac;
    }
  }
  ::v-deep .dropdown .v-input__slot{
    background: #4f525d;
    .v-list-item__title,
    .v-select__selection{
      color: #acacac;
    }
  }
  ::v-deep .v-list{
    background: #4f525d;
    .v-list-item__title{
      color: #acacac;
    }
  }
  ::v-deep .v-color-picker {
    background: #2c2f3b;
    .v-list-item__title, span, input{
      color: #acacac;
    }
  }
  ::v-deep select {
    background: #4f525d;
    color: #acacac;
  }
  ::v-deep .color-generator {
    background: #2c2f3b;
    .v-color-picker__controls,
    .v-input--radio-group--column,
    .slider .v-input__control,
    .v-application--wrap{
      background: #2c2f3b;
    }

    .selected-color,
    .v-label,
    .mdi-radiobox-blank{
      color: #acacac;
    }
  }
  ::v-deep .v-input__control {
    .v-label,
    textarea{
      color: #acacac;
    }
  }
}
</style>
