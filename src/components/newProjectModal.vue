<template>
  <section  :class="['new-project-modal']">
    <div :class="['overlay']" @click.self="closeModal">
      <div :class="['project-modal']">
        <v-text-field
          label="Nazwa projektu"
          solo
          v-model="projectName"
        ></v-text-field>
          <v-btn
            block
            @click="createProject"
          >UTWÓRZ
          </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import{mapMutations} from 'vuex'

export default {
  name: 'newProjectModal',
  data: () => ({
    projectName:''
  }),
  methods:{
    ...mapMutations(['setNewProjectModal', 'setProjectName']),

    closeModal(){
      this.setNewProjectModal(false);
    },
    createProject(){
      this.setProjectName(this.projectName)
      this.projectName = ''
      this.setNewProjectModal(false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .new-project-modal{
    ::v-deep .v-input{
      margin-top: 15px;
      margin-bottom: 40px;
      .v-input__slot{
        border-width: 0 0 2px 0;
        background: $containerBackground!important;
        border-style: solid;
        border-radius: 0;
        border-color: rgba(0, 0, 0, 0.12);
        box-shadow: none!important;
      }
    }
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
      .project-modal{
        position: relative;
        z-index: 2;
        height: 250px;
        max-width: 450px;
        background: $containerBackground;
        box-shadow: $mainShadow;
        margin: 100px auto;
        padding: 30px;
      }
    }
  }
</style>
