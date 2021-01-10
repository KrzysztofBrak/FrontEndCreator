<template>
  <v-app>
    <div :class="['font ']">
      <p>Czcionka</p>
      <v-overflow-btn
        editable
        :items="items"
        no-data-text="Nie znaleziono czcionki"
        solo
        v-model="selectedFont"
      ></v-overflow-btn>
    </div>
    <div :class="['size input-container']">
      <p>Rozmiar (px)</p>
      <input v-model="selectedSize" type="text"/>
    </div>
    <ColorPickerModal />
  </v-app>
</template>

<script>
import ColorPickerModal from '@/components/ingredients/ColorPickerModal.vue'

export default {
  name: 'editText',
  components:{
    ColorPickerModal
  },
  data: () => ({
    items: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    selectedSize:'16',
    selectedFont:'Arial'
  })
}
</script>

<style scoped lang="scss">
    .size, .font{
      display: flex;
      justify-content: space-between;
      p{
        font-size: 14px;
        margin: auto 0;
      }
    }
    .theme--light.v-application{
      background: $containerBackground;
      ::v-deep .v-input{
        max-width: 120px;
        .v-input__control{
          min-height: 25px;
          .v-input__slot{
            height: 20px;
            box-shadow: none;
            input {
              min-width: 82px;
              padding: 0;
            }
            .v-input__append-inner{
              width: 20px;
            }
          }
          .v-text-field__details{
            display: none;
          }
        }
      }
    }
    .input-container{
      margin: 10px 0;
      input[type="text"]{
        outline: none;
        height: 20px;
        max-width: 120px;
        background: #f2f2f2;
      }
    }
</style>