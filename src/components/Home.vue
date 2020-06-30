<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <v-header></v-header>
    </el-header>

    <!-- 主体 -->

    <el-main class="content-box" :class="{'content-collapse':collapse}" style="padding-top: 1px;margin-top: 1px">
      <router-view></router-view>
    </el-main>




  </el-container>
</template>

<script>
  import vHeader from './homecomponents/Header';
  import vMap from "./page/Dashboard";
  import bus from '../assets/javascript/bus.js';
export default {
  components:{
    // vSidebar,
    vHeader,
    vMap,
  },
  data () {
    return {
      // 默认不折叠
      collapse: false,
      // 被激活导航地址
    }
  },
  computed: {

  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg;
    });
  },
  methods: {
  }
}
</script>



<style lang="less" scoped>






</style>
