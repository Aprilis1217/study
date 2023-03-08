<!-- home -->
<template>
  <div class="index-container">
    <div class="btn-group">
      <div class="btn" @click="btnClick(0)">明信片制作</div>
      <div class="btn">活动报名</div>
      <div class="btn">活动投票</div>
      <div class="rule">
        <van-icon name="question-o" color="#fff" :size="14"/>
        <span class="rule-text">规则说明</span>
      </div>
    </div>
    <footer class="footer">
      主办大理市、协办
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    btnClick(type) {
      if(type === 0) {
        this.$router.push('/DIYPoster')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.index-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/image/homebg.png') 0 0 no-repeat;
  background-size: cover;
  position: relative;
  .btn-group {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .btn {
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 500;
      background: url('../../assets/image/buttonbg.png') 0 0 no-repeat;
      background-size: contain;
      margin-top: 24px;
    }
  }
  .rule {
    margin-top: 24px;
    width: 200px;
    height: 24px;
    text-align: center;
    .rule-text {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
      font-weight: 400;
      text-decoration: underline;
      vertical-align: bottom;
      padding-left: 5px;
    }
  }
  .footer {
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: -0.16px;
    text-align: center;
    font-weight: 400;
    position: absolute;
    bottom: 5%;
  }
}
</style>
