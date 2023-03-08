<template>
  <div class="make-container">
    <div class="content">
      <div class="img-wrap" id="demo" ref="demo">
        <img :src="require(`../../assets/image/${templateName.name}-b.png`)" alt="" class="tempImg">
        <img :src="require(`../../assets/image/${templateName.name}-b.png`)" alt="" class="temp">
        <img :src="src" alt="" class="uploadImg" id="demoImg">
      </div>
      <div class="text">
        框内为明信片区域，可拖动、缩放、旋转图片
      </div>
      <div class="button-group">
        <div class="btn-wrap">
          <div class="btn-single">
            <img src="../../assets/image/upload.png" alt="">
            <input accept="image/*,audio/*" type="file" class="input"
                   @change="inputChange($event)" />
            <div>上传图片</div>
          </div>
          <div class="btn-single" @click="goNext">
            <img src="../../assets/image/next.png" alt="">
            <div>下一步</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import Hammer from 'hammerjs'
import html2canvas from "html2canvas"
export default {
  name: 'makePoster',
  data() {
    return {
      src: '',
      id: null,
      id1: 'demo',
      mc: null,
      translateX: 0,
      translateY: 0,
      scale: 1,
      firstTouch: true,
      relateX: 0,
      relateY: 0,
      oldX: 0,
      oldY: 0,
      oldScale: 1,
      ev: null,
      preAngle: 0,
      tempAngleFlag: 0,
      deltaAngle: 0,
      startRotateAngle: 0,
      initAngle: 0,
      transform: {
        angle: 0
      },
      url: ''
    }
  },
  computed: {
    ...mapState(['templateName']),
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['SET_TEMPLATE','SET_USERIMG']),
    inputChange(e) {
      const files = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(files);
      const that = this;
      reader.onload = function(e) {
        var img = new Image();
        img.src = this.result;
        console.log(this.result);
        that.src = this.result;
        that.$nextTick(() => {
          that.picInit()
        })
      };
    },
    picInit() {
      this.id = document.getElementById('demoImg')
      this.id1 = document.getElementById('demo')
      this.mc = new Hammer.Manager(this.id)
      this.relateX = (this.id1.clientWidth - this.id.offsetWidth) / 2
      this.relateY = (this.id1.clientHeight - this.id.offsetHeight) / 2

      this.mc.add(new Hammer.Pan({
        // direction: Hammer.DIRECTION_ALL,
        threshold: 0,
        pointers: 0
      }))
      this.mc.add(new Hammer.Rotate({
        threshold: 0
      })).recognizeWith(this.mc.get('pan'))
      this.mc.add(new Hammer.Pinch({
        threshold: 0
      })).recognizeWith([this.mc.get('pan'), this.mc.get('rotate')])
      this.mc.on('hammer.input', this.isFinal)
      this.mc.on('panstart panmove', this.onPan)
      this.mc.on('rotatestart rotatemove rotateend', this.onRotate)
      this.mc.on('pinchstart pinchmove', this.onPinch)


      this.setPosition()
    },
    isFinal(ev) {
      if (ev.isFinal) {
        this.oldX = this.translateX
        this.oldY = this.translateY
        this.oldScale = this.scale
        this.initAngle = this.transform.angle
      }
    },
    // 初始化图片地位及缩放
    setPosition() {
      this.selfPosition({
        translateX: this.relateX,
        translateY: this.relateY,
        scale: this.scale,
        rotate: this.initAngle
      })
    },
    // 单点触发 - 利落
    onPan(ev) {
      if (this.firstTouch) {
        this.oldX = this.relateX
        this.oldY = this.relateY
      }
      this.translateX = this.oldX + ev.deltaX
      this.translateY = this.oldY + ev.deltaY
      const position = {
        translateX: this.translateX,
        translateY: this.translateY,
        scale: this.scale,
        rotate: this.initAngle
      }
      this.selfPosition(position)
      this.firstTouch = false
    },
    // 多点触发 - 缩放
    onPinch(ev) {
      this.scale = this.oldScale * ev.scale
      this.selfPosition({
        translateX: this.translateX,
        translateY: this.translateY,
        scale: this.scale,
        rotate: this.transform.angle
      })
    },
    //旋转
    onRotate(ev) {
      this.ev = ev
      if (ev.type == 'rotatestart') {
        this.startRotateAngle = ev.rotation;
        this.tempAngleFlag = 0;
      }
      if (ev.type == 'rotatemove') {
        if (this.tempAngleFlag == 0) {
          this.preAngle = this.startRotateAngle;
          this.tempAngleFlag++;
        } else {
          this.deltaAngle = ev.rotation - this.preAngle;
          this.transform.angle = this.initAngle + this.deltaAngle;
          console.log(this.transform.angle)
          this.selfPosition({
            translateX: this.translateX,
            translateY: this.translateY,
            scale: this.scale,
            rotate: this.transform.angle
          })
        }
      }
      //旋转结束  记录当前图片角度	
      if (ev.type == 'rotateend') {
        this.initAngle = this.transform.angle;
      }

    },
    selfPosition(pos) {
      return this.picAnimate()(() => this.tempPos(pos))
    },
    tempPos(pos) {
      let style = [
        `translate3d(${pos.translateX}px, ${pos.translateY}px, 0)`,
        `scale(${pos.scale}, ${pos.scale})`,
        // `scale(${pos.scale > 1.2 ? 1.2 : pos.scale}, ${pos.scale > 1.2 ? 1.2 : pos.scale})`
        `rotate3d(0,0,1,${pos.rotate}deg)`
      ]
      style = style.join(' ')
      this.id.style.transform = style
    },
    picAnimate() {
      return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function(callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    },
    goNext() {
      html2canvas(this.$refs.demo, {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        // 转成图片，生成图片地址
        this.url = canvas.toDataURL('image/png')
        this['SET_USERIMG'](this.url)
        this.$router.push('/editPoster')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.make-container {
  width: 100%;
  background-color: #fff;
  height: 100vh;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  overflow: auto;
  background: url('../../assets/image/jiyubg.png') 0 0 no-repeat;
  background-size: cover;
  .content {
    width: 100%;
    .img-wrap {
      background-color: #555;
      width: 100%;
      font-size: 0;
      position: relative;
      overflow: hidden;
      .temp {
        width: 100%;
      }
      .tempImg {
        width: 100%;
        z-index: 2;
        position: absolute;
        pointer-events: none;
      }
      .uploadImg {
        pointer-events: auto;
        width: 100%;
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .text {
      margin-top: 10px;
      width: 100%;
      height: 20px;
      line-height: 20px;
      text-align: center;
      opacity: 0.55;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #1e1e1e;
      font-weight: 400;
    }
    .button-group {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .btn-wrap {
        width: 60%;
        display: flex;
        justify-content: space-between;
        .btn-single {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          height: 90px;
          img {
            width: 60px;
            height: 60px;
          }
          div {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #222222;
            text-align: center;
            font-weight: 400;
          }
        }
      }
    }
  }
  .input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>