<template>
  <div>
    <div ref="newconfirm" :style="{width: '100%', height: '220px'}"></div>
  </div>
</template>

<script>
  import jsonp from 'jsonp'
  import echarts from 'echarts'
  const option = {
    title: {
      text: 'TOP8',
      // subtext: '纯属虚构',
      // left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',  //垂直显示
      y: 'center',    //延Y轴居中
      x: 'right', //居右显示
      data: []
    },
    series: [
      {
        name: '半径模式',
        type: 'pie',
        radius: [30, 100],
        center: ['45%', '50%'],
        roseType: 'radius',
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [

        ]
      },
    ]
  }

  export default {
    name: "Newconfirm",
    mounted(){
      setTimeout(()=>{
        this.getData()
      },1000)
      setTimeout(() =>{

        this.mycharts = echarts.init(this.$refs.newconfirm,"bluepurple")
        // 初始化echarts
        this.mycharts.setOption(option)
      },500)
    },
    data(){
      return{
        list:[],
        address:[],
      }
    },
    methods:{
      getData () {
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback"}).then(res =>
        {
            console.log(11111)
            this.list = res.data.list.map(item => ({name: item.name, value: item.conadd}))
            this.sort();
            // console.log(this.list);
            option.series[0].data = this.list
            this.take();
            // console.log(this.address)
            option.legend.data = this.address
            setTimeout(()=>{
              this.mycharts.setOption(option)
              // echarts初始化的前提是dom渲染完成
            },400)


        })
      },
      sort(){
        var arrayObj=Array.from(this.list);
        arrayObj.sort(function(a,b){return parseInt(b.value)-parseInt(a.value)})
        this.list = arrayObj.slice(0,8);
      },
      take(){
        this.address = this.list.map(function (item) { return item.name; });
      }
    }
  }
</script>

<style scoped>

</style>
