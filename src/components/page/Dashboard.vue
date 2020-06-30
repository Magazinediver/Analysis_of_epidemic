<template>
  <div style="width: 100%;height: 100%">
    <el-row :gutter="10">
      <!--    左模块    -->
      <el-col :span="6">
        <div class="left">
          <el-row :gutter="10">
            <!--    现有确诊    -->
            <el-col :span="15">
              <el-card shadow="hover" class="mgb20">
                <p class="now-confirmed">现有确诊数</p>
                <p class="now-confirmed-num">{{gntotal}}</p>
              </el-card>
            </el-col>

            <!--    新增确诊    -->
            <el-col :span="9">
              <el-card shadow="hover" class="mgb20" >
                <p class="new-confirmed">新增</p>
                <p class="new-confirmed-num">{{addnew}}</p>
              </el-card>
            </el-col>
          </el-row>

          <!--    饼图    -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card shadow="hover" class="mgb20 nopad" style="height:280px;padding:0px">
                <el-tabs type="border-card">
                  <el-tab-pane name="0" label="新增确诊Top8" :key="0" lazy>
                      <new-confirm></new-confirm>
                  </el-tab-pane>
                  <el-tab-pane name="1" label="累计确诊" :key="1" lazy>
                      <all-confirm></all-confirm>
                  </el-tab-pane>
                  <el-tab-pane name="2" label="死亡数" :key="2" lazy>
                    <death-rate></death-rate>
                  </el-tab-pane>
<!--                  <el-tab-pane label="定时任务补偿">治愈率</el-tab-pane>-->
                </el-tabs>
              </el-card>
            </el-col>
          </el-row>

          <!--    确诊数据    -->
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card shadow="hover" class="mgb20 nopad" style="height:404px;">
                <template>
                  <el-table
                    :data="list"
                    style="width: 100%;padding-left: 20px;"
                    height="390px"
                  >
                    <el-table-column
                      prop="province"
                      label="省/直辖市"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="newconfirm"
                      label="新增确诊"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="allconfirm"
                      label="累计确诊"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="dead"
                      label="累计死亡"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="cured"
                      label="累计治愈"
                      width="70">
                    </el-table-column>
                  </el-table>
                </template>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>


      <!--    中模块    -->
      <el-col :span="12">
        <div class="mid">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card shadow="hover" class="mgb20 nopad" style="height: 520px;">
                <el-tabs type="border-card">
                  <el-tab-pane label="全国累计确诊" :key="0" lazy>
                    <china-map></china-map>
                  </el-tab-pane>
                  <el-tab-pane label="全国新增确诊" :key="1" lazy>
                    <china-new-map></china-new-map>
                  </el-tab-pane>
                  <el-tab-pane label="全国现有确诊" :key="2" lazy>
                    <china-now-map></china-now-map>
                  </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>

            <el-col :span="24" style="margin-top: 5px">
              <el-card shadow="hover" class="mgb20 nopad" style="height:305px;">
                <div class="user-info">
                  <el-tabs type="border-card">
                    <el-tab-pane label="现有确诊/疑似趋势(1/11起)" :key="0">
                      <new-confirm-line></new-confirm-line>
                    </el-tab-pane>
                    <el-tab-pane label="新增/输入趋势(30天)" :key="1" lazy>
                      <new-and-inject-confirm-line></new-and-inject-confirm-line>
                    </el-tab-pane>
                    <el-tab-pane label="死亡率/治愈率" :key="2" lazy>
                      <death-cured-line></death-cured-line>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-card>
            </el-col>

          </el-row>
        </div>
      </el-col>


      <!--    右模块    -->
      <el-col :span="6">
        <div class="right">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-card shadow="hover" class="mgb20 newspad" style="height: 830px;">
                <news :cnews="news"></news>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import NewConfirm from "../echarts/pie/NewConfirm";
  import AllConfirm from "../echarts/pie/AllConfirm";
  import DeathRate from "../echarts/pie/DeathRate";
  import ChinaMap from "../echarts/map/ChinaMap";
  import ChinaNewMap from "../echarts/map/ChinaNewMap";
  import ChinaNowMap from "../echarts/map/ChinaNowMap";
  import NewConfirmLine from "../echarts/line/NewConfirmLine";
  import NewAndInjectConfirmLine from "../echarts/line/NewAndInjectConfirmLine";
  import DeathCuredLine from "../echarts/line/DeathCuredLine";
  import News from "../echarts/news/News";
  import echarts from 'echarts'
  import jsonp from "jsonp";
  export default {

    created() {
      this.getNews()
    },
    mounted() {
      this.getNews(),
      setTimeout(()=>{
        this.getData()
        this.getNews()
      },1000)
    },
    components:{
      NewConfirm,
      AllConfirm,
      DeathRate,
      ChinaMap,
      ChinaNewMap,
      ChinaNowMap,
      NewConfirmLine,
      NewAndInjectConfirmLine,
      DeathCuredLine,
      News,
    },
    name: "Dashboard",
    data() {
      return {
        // queryInfo:{
        //   page: 1,
        //   num:20
        // },
        news:[],
        activeName: '0',
        gntotal: 0,
        addnew:'',
        list:[],
        tableData: []
      }
    },
    methods: {
      async getNews(){
        const { data: res } = await this.$http.get('https://lab.isaaclin.cn/nCoV/api/news', {
          params: this.queryInfo
        })
        this.news = res.results
        console.log(this.news)
      },
      getData () {  //vue-jsonp
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback" }).then(res =>
        {
            // console.log(res)

            this.list = res.data.list.map(item => ({province: item.name, newconfirm: item.econNum,allconfirm: item.value , dead: item.deathNum , cured: item.cureNum }))

            this.gntotal = res.data.gntotal

            this.addnew = res.data.add_daily.addcon_new

        })
      },
      // sort(){
      //   var arrayObj=Array.from(this.list);
      //   arrayObj.sort(function(a,b){return parseInt(b.value)-parseInt(a.value)})
      //   this.list = arrayObj;
      // }
    }
  }

</script>

<style scoped>
  .left{
    width: 100%;
    height: 100%;
  }

  .now-confirmed{
    margin-top: 10px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .now-confirmed-num{
    margin-top: 30px;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: #b30000;
  }

  .new-confirmed{
    margin-top: 10px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .new-confirmed-num{
    margin-top: 30px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #fc3131;
  }



  .el-row {
    margin-top: 5px;
    margin-bottom: 5px
  }

  .el-row:last-child {
     margin-bottom: 0;
   }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .newspad{
    overflow: scroll;
    overflow-x: hidden;
  }

</style>
