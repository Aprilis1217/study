<template>
  <div class="template-container">
    <div class="tab">
      <div class="btn" :class="[selectedIndex === 0 ? 'active' : '' ]" @click="btnClick(0)">风景</div>
      <div class="btn" :class="[selectedIndex === 1 ? 'active' : '' ] "@click="btnClick(1)">食物</div>
      <div class="btn" :class="[selectedIndex === 2 ? 'active' : '' ] "@click="btnClick(2)">人像</div>
    </div>
    <div class="imgArea">
      <div class="waterfall-container">
        <div class="img-content" v-for="item in imgObj[selectedIndex]" @click="selectTemplate(item)">
          <img :src="require(`../../assets/image/${item.name}.png`)" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations} from 'vuex'
export default {
  name: 'selectTemplate',
  data() {
    return {
      selectedIndex: 0,
      imgObj: [
        [{name:'muban1',type:'s'},{name:'muban3',type:'s'},{name:'muban2',type:'h'},{name:'muban4',type:'s'},{name:'muban5',type:'h'}],
        [{name:'muban6',type:'s'},{name:'muban7',type:'h'},{name:'muban8',type:'h'},{name:'muban9',type:'h'}],
        [{name:'muban10',type:'s'},{name:'muban11',type:'s'},{name:'muban12',type:'s'},{name:'muban13',type:'s'}]
      ]
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    ...mapMutations(['SET_TEMPLATE']),
    btnClick(index) {
      this.selectedIndex = index
    },
    selectTemplate(item) {
      this['SET_TEMPLATE'](item)
      this.$router.push('/makePoster')
    }
  }
}
</script>
<style lang="scss" scoped>
.template-container {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  background-color: #F8F8FB;;
  height: 100vh;
  padding: 16px 16px 0 16px;
  .tab {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 98px;
      height: 28px;
      line-height: 28px;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #222222;
      text-align: center;
      font-weight: 400;
      background: #EFF1F2;
      border-radius: 14px;
    }
    .active {
      background-image: linear-gradient(134deg, #00F1FF 0%, #4B6CF8 100%);
      color: #FFFFFF;
    }
  }
  .imgArea {
    margin-top: 16px;
    height: calc(100% - 44px);
    overflow-y: auto;
  }
  .waterfall-container {
    width: 100%;
    column-count: 2;
  }
  .img-content {
    break-inside: avoid;
    margin-bottom: 12px;
    img {
      width: 100%;
    }
  }
}
</style>