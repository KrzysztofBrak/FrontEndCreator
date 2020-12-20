<template>
  <section :class="['header-section']">
    <div :class="['header-container']">
      <div :class="['title-container']">
        <p>Frontend Creator</p>
      </div>
      <div :class="['menu-container']">
        <p>Nowy projekt +</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      color: 'red',
      pixels: '1200px'
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
    .header-container{
      max-width: 1280px;
      margin: auto;
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
        }
      }
      .menu-container{
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
