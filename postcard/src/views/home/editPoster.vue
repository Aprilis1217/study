<template>
  <div class="edit-container">
    <div class="mail-wrap" ref="mail">
      <img src="../../assets/image/mail.png" alt="">
      <div class="text">
        {{textArr[index]}}
      </div>
    </div>
    <div class="btn-group">
      <div class="domyslf-btn" @click="changeOne">换一个</div>
      <!-- <div class="domyslf-btn">自己写</div> -->
    </div>
    <div class="next-wrap">
      <div @click="goNext">制作完成</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import html2canvas from "html2canvas"
export default {
  name: 'editPoster',
  data() {
    return {
      url:'',
      textArr:['留得住青山绿水，记得住乡愁。','苍山洱海对相望，留的金鸡向朝阳。','去大理，去看苍山洱海，风花雪月。'
      ,'苍山洱海旁，你在我身边，就是最美好的事。','苍山不墨千秋画，洱海无弦万古琴。'],
      index:0
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    ...mapMutations(['SET_MAILIMG']),
    goNext() {
      html2canvas(this.$refs.mail, {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        // 转成图片，生成图片地址
        this.url = canvas.toDataURL('image/png')
        this['SET_MAILIMG'](this.url)
        this.$router.push('/savePoster')
      })
    },
    changeOne() {
      if(this.index === this.textArr.length - 1) {
        this.index = 0
      }else {
        this.index++
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/image/jiyubg.png') 0 0 no-repeat;
  background-size: cover;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  .mail-wrap {
    margin-top: 100px;
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      font-family: uimianfei;
      font-size: 12px;
      color: #000000;
      font-weight: 400;
      left: 24px;
      top: 100px;
    }
  }
  .btn-group {
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .change-btn {
      background-image: linear-gradient(134deg, #00f1ff 0%, #4b6cf8 100%);
      border-radius: 22px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      height: 35px;
      line-height: 35px;
      width: 110px;
    }
    .domyslf-btn {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #3b89fa;
      border-radius: 22px;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #3b87f9;
      text-align: center;
      font-weight: 400;
      height: 35px;
      line-height: 35px;
      width: 110px;
    }
  }
  .next-wrap {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    div {
      width: 200px;
      height: 48px;
      line-height: 48px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      font-weight: 500;
      background: url('../../assets/image/buttonbg.png') 0 0 no-repeat;
      background-size: contain;
    }
  }
}
</style>