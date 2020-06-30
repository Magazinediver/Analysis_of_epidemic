<template>
  <div>
    <el-col :span="24">
      <el-card class="container">
        <div id="analysisline" :style="{width: '100%', height: '90vh'}"></div>
      </el-card>
    </el-col>


    <el-dialog title="当天新闻" :visible.sync="editVisible" width="40vw">
      <el-card v-for="(item,index) in news" :key="index">
        <a :href="item.link" :title="item.title" target="_blank" class="card-link">
        <div class="news-span-title">
          {{item.pubDate}}
          <a :href="item.sourceUrl" target="_blank" class="title-link">{{item.title}}</a>
        </div>
          <p class="news-summary">
            {{item.summary}}
          </p>


        </a>
      </el-card>
    </el-dialog>
  </div>

</template>

<script>
  import jsonp from 'jsonp'
  import echarts from 'echarts'
  let options = {
    title: {
      // text: '未来一周气温变化',   //图表顶部的标题
      // subtext: '纯属虚构'    //副标题
    },
    tooltip: {   //鼠标悬浮框的提示文字
      trigger: 'axis'
    },
    legend: {
      data:['积极强系数','积极弱系数','消极强系数','消极弱系数'],
      icon: "circle", //图例样式
      itemWidth: 8,  // icon的宽度
      itemHeight: 8, // icon的高度
      itemGap: 20, //图例之间的间距
      textStyle: {
        fontSize: 12,
        color: 'rgb(50,50,50,0.8)'//图例字的颜色
      },
      top: '0%',
      right: '4%'
    },
    grid: {
      top: '10%',
      left: '1%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [{  //x轴坐标数据
      type : 'category',
      boundaryGap : false,
      data : []
    }],
    yAxis : [{   //y轴坐标数据
      type : 'value',
      axisLabel : {
        formatter: '{value}'
      }
    }],
    series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
      {
        // symbol: "none",
        color: '#d87a80',
        name:"积极强系数",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
      {
        // symbol: "none",
        color: '#ffb980',
        name:"积极弱系数",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
      {
        // symbol: "none",
        color: '#2ec7c9',
        name:"消极强系数",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
      {
        // symbol: "none",
        color: '#5ab1ef',
        name:"消极弱系数",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
    ]}



  export default {
    name: "DeathCureLine",
    created() {
      this.getData();
    },

    mounted() {

      setTimeout(() =>{
        this.mycharts = echarts.init(document.getElementById('analysisline'))
        // 初始化echarts

        this.mycharts.setOption(options)
        let that = this
        this.mycharts.on('click', function (param) {
          console.log(param.name);//这里根据param填写你的跳转逻辑
          that.queryInfo.date = param.name
          that.getNews()
          that.handleEdit()
        });
      },500)
    },
    data(){
      return{
        editVisible: false,
        list:[],
        date:[],
        value:[],
        queryInfo:{
          date:'',
        },
        news:[]
      }
    },
    methods:{
      handleEdit() {
        this.editVisible = true;

      },
      async getNews(){
        const { data: res } = await this.$http.get('https://ximate.tech:8080/news/getnews', {
          params: this.queryInfo
        })
        // console.log(res)
        this.news = res.data

        console.log(this.news)
        // return this.$message.success('搜索完成！')
      },
      async getData () {
          const { data: res } = await this.$http.get('https://ximate.tech:8080/blog/getallemotionnums', {
        })
          // console.log(res)
          this.list = res.data.map(item => ({date: item.date, posstrong: item.promorePostive, posweak: item.propositive,negstrong: item.promoreNegative, negweak: item.pronegative}))
          // econNum/现有确诊 susNum/现有疑似 conNum/累计确诊

          this.take();
          // console.log(this.date);
          // console.log(this.value);

          options.xAxis[0].data = this.date;

          options.series[0].data = this.value[0];
          options.series[1].data = this.value[1];
          options.series[2].data = this.value[2];
          options.series[3].data = this.value[3];
          // console.log(charts.value);
          // this.mycharts.setOption(options)
      },

      take(){
        this.date = this.list.map(function (item) { return item.date;});
        this.value[0] = this.list.map(function (item) { return Math.round(parseFloat(item.posstrong)*100)});
        this.value[1] = this.list.map(function (item) { return Math.round(parseFloat(item.posweak)*100)});
        this.value[2] = this.list.map(function (item) { return Math.round(parseFloat(item.negstrong)*100)});
        this.value[3] = this.list.map(function (item) { return Math.round(parseFloat(item.negweak)*100)});
      }
    }
  }
</script>


<style scoped>
  .container{
    position: relative;
    width: 100%;
    height: 95vh;

    margin-top: 20px;
  }

  .news-span-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;

    color: rgb(150,180,230);
  }

  .news-summary{
    color: #444;
    margin-bottom: 0;
  }

  .card-link{
    text-decoration: none;
  }

  .title-link{
    color: #345882;
    text-decoration: none;
  }
</style>
