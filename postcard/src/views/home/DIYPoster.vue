<template>
  <div class="diy-container">
    <div class="btn" @click="goNext">
      开始制作
    </div>
  </div>
</template>

<script>
export default {
  name: 'DIYPoster',
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    goNext() {
      this.$router.push('/selectTemplate')
    }
  }
}
</script>
<style lang="scss" scoped>
.diy-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/image/diybg.png') 0 0 no-repeat;
  background-size: cover;
  position: relative;
  .btn {
    width: 200px;
    height: 48px;
    position: absolute;
    bottom: 7.7%;
    background: url('../../assets/image/buttonbg.png') 0 0 no-repeat;
    background-size: contain;
    line-height: 48px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    font-weight: 500;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>