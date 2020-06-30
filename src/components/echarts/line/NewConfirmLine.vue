<template>
  <div>
    <div id="newconfirmline" :style="{width: '100%', height: '235px'}"></div>
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
      data:['现有确诊','现有疑似','累计确诊'],
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
        formatter: '{value} 人'
      }
    }],
    series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
      {
        color: '#d95850',
        name:"现有确诊",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
      {
        color: '#516b91',
        name:"现有疑似",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      },
      {
        color: '#22c3aa',
        name:"累计确诊",
        type: "line",  //pie->饼状图  line->折线图  bar->柱状图
        smooth: true,
        data:[],
      }
    ]}



  export default {
    name: "NewConfirmLine",

    mounted() {
      setTimeout(()=>{
        this.getData()
      },1200)
      setTimeout(() =>{
        this.mycharts = echarts.init(document.getElementById('newconfirmline'))
        // 初始化echarts

        this.mycharts.setOption(options)
      },600)
    },
    data(){
      return{
        list:[],
        date:[],
        value:[],
      }
    },
    methods:{
      getData () {
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback" }).then(res =>
        {
            // console.log(data)
            this.list = res.data.historylist.map(item => ({date: item.date, econNum: item.cn_econNum, conNum: item.cn_conNum, susNum: item.cn_susNum}))
            // econNum/现有确诊 susNum/现有疑似 conNum/累计确诊
            this.sort();


            this.take();
            // console.log(this.date);
            // console.log(this.value);

            options.xAxis[0].data = this.date;

            options.series[0].data = this.value[0];
            options.series[1].data = this.value[1];
            options.series[2].data = this.value[2];

            // console.log(charts.value);
            this.mycharts.setOption(options)
        })
      },
      sort(){
        this.list.reverse()
      },
      take(){
        this.date = this.list.map(function (item) { return item.date; });
        this.value[0] = this.list.map(function (item) { return item.econNum; });
        this.value[1] = this.list.map(function (item) { return item.susNum; });
        this.value[2] = this.list.map(function (item) { return item.conNum; });
      }
    }
  }
</script>

<style scoped>

</style>
