<template>
  <div class="yq-header">
    <div class="header-logo">
      <img src="~assets/images/yq-logo.png" alt="">
    </div>
    <el-menu
      :default-active="onRoutes"
      class="el-menu-header"
      mode="horizontal"
      @select="handleSelect"
      router
      text-color="#777"
      active-text-color="#282828"
      style="border-bottom: solid 30px #ddd!important;"
    >
      <el-menu-item index="home">疫情面板</el-menu-item>
      <el-submenu index="2">
        <template slot="title">情感词云</template>
        <el-menu-item index="wordcloud-ps">积极强</el-menu-item>
        <el-menu-item index="wordcloud-pw">积极弱</el-menu-item>
        <el-menu-item index="wordcloud-ns">消极强</el-menu-item>
        <el-menu-item index="wordcloud-nw">消极弱</el-menu-item>
      </el-submenu>
<!--      <el-menu-item index="3" disabled>消息中心</el-menu-item>-->
      <el-menu-item index="analysis">
<!--        <a href="https://www.ele.me" target="_blank">订单管理</a>-->
        疫情分析
      </el-menu-item>
      <el-menu-item index="analysisPercent">
        <!--        <a href="https://www.ele.me" target="_blank">订单管理</a>-->
        疫情分析(百分比)
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Header",
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    },
    data() {
      return {


      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

  .el-menu-header{
    padding-left: calc(50% - 250px);
  }

  .el-menu-item{
    font-size: 16px;
  }



  .header-logo{
    position: absolute;
    top:5px;
    left: 15px;
    width: 200px;
    height: 50px;
    z-index: 11;
  }

  .header-logo img{
    width: 200px;
    height: 50px;
  }
</style>
