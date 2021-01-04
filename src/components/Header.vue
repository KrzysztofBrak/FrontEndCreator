<template>
  <section :class="['header-section']">
    <div :class="['header-container']">
      <div :class="['title-container']">
        <p>Frontend <span>Creator</span></p>
      </div>
      <div :class="['menu-container']">
        <p>{{getWorkplaceData.projectName}}</p>
        <p @click="openModal">Nowy projekt +</p>
      </div>
    </div>
    <v-fade-transition>
    <div v-show="getNewProjectModal">
      <newProjectModal/>
    </div>
    </v-fade-transition>
  </section>
</template>

<script>
import newProjectModal from '@/components/newProjectModal.vue'
import{mapMutations, mapGetters} from 'vuex'

export default {
  name: 'Header',
  components:{
    newProjectModal
  },

  computed:{
    ...mapGetters(['getNewProjectModal', 'getWorkplaceData']),
  },

  data: () => ({
    modalIsOpened: false,
    isProjectActive: false,
  }),

  methods:{
    ...mapMutations(['setNewProjectModal']),

    openModal(){
      this.setNewProjectModal(true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header-section{
    position: fixed;
    width: 100%;
    box-shadow: $mainShadow;
    background: $containerBackground;
    height: 50px;
    z-index: 21;
    .header-container{
      padding: 0 20px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .title-container{
        margin: auto 0;
        p{
          margin: 0;
          display: flex;
          font-size: 24px;
          color: $mainFontColor;
          font-weight: 700;
          position: relative;
          bottom: 5px;
          span{
            font-size: 16px;
            -webkit-text-fill-color: transparent;
            background: -webkit-linear-gradient(180deg, rgba(29,26,219,1), rgba(253,29,29,1) 53%);
            position: relative;
            top: 21px;
            right: 25px;
            -webkit-background-clip: text;
          }
        }
      }
      .menu-container{
        display: flex;
        margin: auto 0;
        p{
          margin: 0;
          padding: 5px 20px;
          display: flex;
          font-size: 16px;
          color: $mainFontColor;
          cursor: pointer;
          border-radius: 7px;
          transition: 0.3s;
          &:hover{
            background: $hoverColor;
          }
        }
      }
    }
  }
</style>


