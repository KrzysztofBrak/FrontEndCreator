<template>
  <section  :class="['new-project-modal']">
    <div :class="['overlay']" @click.self="closeModal">
      <div :class="['project-modal']">
        <v-text-field
          label="Nazwa projektu"
          :rules="[() => !!projectName || 'Pole jest wymagane']"
          solo
          required
          autofocus
          v-model="projectName"
        ></v-text-field>
        <div :class="['buttons-container']">
          <v-btn
            v-for="btn in buttons"
            :key="btn.icon"
            :class="['button', { 'isActive': btn.isActive}]"
            block
            @click="setWorkplaceWidth(btn)"
          >
            <v-icon large>{{btn.icon}}</v-icon>
            <div :class="['btn-content-container']">
              <p>{{btn.textFirstPart}}<br>{{btn.textSecondPart}}</p>
              <input v-if="btn.input" type="text" placeholder="WPISZ WARTOŚĆ" v-model="btn.value"/>{{btn.value}}
            </div>
          </v-btn>
        </div>

          <v-btn
            block
            @click="createProject"
            v-on:keyup.enter="createProject"
          >UTWÓRZ
          </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import{mapGetters, mapMutations} from 'vuex'

export default {
  name: 'newProjectModal',
  computed:{
    ...mapGetters(['getWorkplaceData','getSectionsLength']),
  },
  data: () => ({
    projectName:'',
    customWidth:'',
    workplaceWidth: '1920px',
    isButtonDisabled: true,
    buttons:[{
      icon: 'mdi-desktop-mac',
      textFirstPart: 'Desktop',
      textSecondPart: '(1920px)',
      input: false,
      isActive: false,
      value: '1920'
    },
    {
      icon: 'mdi-cellphone',
      textFirstPart: 'Telefon',
      textSecondPart: '(360px)',
      input: false,
      isActive: false,
      value: '360'
    },
    {
      icon: 'mdi-checkbox-blank-outline',
      textFirstPart: 'Niestandardowy',
      textSecondPart: 'rozmiar:(px)',
      input: true,
      isActive: false,
      value: ''
    }],

    workplaceTemplate:{
      isWorkplaceActive: false,
      sectionsLength: 0,
      workplaceWidth: '1920px',
      sections:[{
        id: 'section_0',
        isActive: true,
        style:{
          height: '300px',
          width: '100%',
          background:'#FFFFFF00',
       //   boxShadow: 'box-shadow: 0px 0px 10px 1px rgba(0,0,0,0);',
          borderWidth: '0px',
          borderStyle: 'none',
          borderColor: '#FFFFFF00',
          borderRadius: '0px',
        },
        childStyle:{},
        columns:[{
          id: 'section_0-col_0',
          isActive: false,
          style:{
            height: '100%',
            width: '100%',
            background:'#FFFFFF00',
          },
          childStyle:{},
          childs:[{
            id: 'section_0-col_0-item_0',
            type: 'text',
            content:'section_0-col_0-item_0',
            isActive: false,
            style:{
              background:'#FFFFFF00',
            },
            childStyle:{},
          }]
        }]
      }]
    }

  }),


  mounted(){
    window.addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        this.createProject();
      }
    });
  },


  methods:{
    ...mapMutations(['setNewProjectModal', 'setProjectName', 'setWorkplaceData']),


    closeModal(){
      this.setNewProjectModal(false);
      this.projectName = ''
    },


    createProject(){
      if(this.projectName !== ''){

        this.setNewProjectModal(false);
        this.setWorkplaceData(this.workplaceTemplate);
        this.setProjectName(this.projectName);

        setTimeout(() => {
          this.projectName = ''

          this.buttons.forEach(button => {
            if(button.isActive){
              this.getWorkplaceData.workplaceWidth = `${button.value}px`;
              button.isActive = false;
            }
          })
        }, 500);
      }
    },


    setWorkplaceWidth(btn){
      this.buttons.forEach(button => {
          button.isActive = false;
      })
      btn.isActive = true
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
        height: fit-content;
        max-width: 450px;
        background: $containerBackground;
        box-shadow: $mainShadow;
        margin: 0px auto;
        padding: 30px;
      }
    }
    .buttons-container{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 20px 0;
      .button{
        margin: 10px 0;
        height: 100px;
        ::v-deep .v-btn__content{
        justify-content: space-between;
        display: flex;
        .v-icon{
          margin-left: 30px;
        }
        .btn-content-container{
          width: 50%;
        }
          input{
            font-size: 14px;
            max-width: 122px;
          }
        }
      }
      .button.isActive{
        background-color: #bebebe!important;
      }
    }
  }
  input{
    outline: none;
  }
  ::v-deep .v-messages__message{
    color: red;
  }
</style>
