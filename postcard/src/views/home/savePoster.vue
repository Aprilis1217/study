<template>
  <div class="save-container">
    <div class="mask">
      <div class="wrap">
        <div class="tip">
          <img src="../../assets/image/down.png" alt="">
          <span>长按明信片保存到相册</span>
        </div>
        <div class="main" :style="{width:isH?'80%':'65%'}" ref="main">
          <img :src="url" alt="" class="lastImg">
          <div class="poster">
            <img :src="userImg" alt="">
          </div>
          <div class="dividing">
            <img src="../../assets/image/fenge.png" alt="">
          </div>
          <div class="mail">
            <img :src="mailImg" alt="" class="mailImg">
            <img src="../../assets/image/ad.png" alt="" class="logo">
            <img src="../../assets/image/qrcode.png" alt="" class="qrcode">
          </div>
        </div>
        <div class="next-wrap">
          <div @click="goNext">返回活动主页</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import html2canvas from "html2canvas"
export default {
  name: 'savePoster',
  data() {
    return {
      url: ''
    }
  },
  computed: {
    ...mapState(['userImg', 'mailImg', 'templateName']),
    //横着的图还是竖着的图
    isH() {
      return this.templateName.type === 'h'
    }
  },
  mounted() {
    this.genetateImg()
  },
  methods: {
    genetateImg() {
      html2canvas(this.$refs.main, {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        // 转成图片，生成图片地址
        this.url = canvas.toDataURL('image/png')
      })
    },
    goNext() {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
.save-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/image/jiyubg.png') 0 0 no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: cover;
  box-sizing: border-box;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: auto;
    .tip {
      height: 60px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #dbddde;
      letter-spacing: 0;
      text-align: center;
      line-height: 60px;
      font-weight: 400;
      img {
        height: 10px;
        width: 10px;
        margin-right: 10px;
      }
    }
    .main {
      width: 70%;
      margin: 0 auto;
      position: relative;
      .lastImg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .poster {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px 2px 10px;
        background-color: #fff;
        font-size: 0;
        pointer-events: none;
        img {
          width: 100%;
          display: block;
        }
      }
      .dividing {
        pointer-events: none;
        width: 100%;
        font-size: 0;
        img {
          width: 100%;
          margin-top: -1px;
        }
      }
      .mail {
        width: 100%;
        pointer-events: none;
        position: relative;
        font-size: 0;
        .mailImg {
          width: 100%;
          margin-top: -1px;
          // position: absolute;
        }
        .logo {
          position: absolute;
          width: 30%;
          left: 7%;
          bottom: 12%;
        }
        .qrcode {
          position: absolute;
          width: 14%;
          right: 3%;
          bottom: 6%;
        }
      }
    }
    .next-wrap {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
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
        margin: 0 auto;
      }
    }
  }
  .wrap {
  }
}
</style>