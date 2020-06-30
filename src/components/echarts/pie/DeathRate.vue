<template>
  <div>
    <div id="myChart3" :style="{width: '100%', height: '220px'}"></div>
  </div>
</template>

<script>
  import jsonp from 'jsonp'
  import echarts from 'echarts'
  const option = {
    title: {
      text: 'TOP9',
      subtext: '',
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
    name: "DeathRate",

    mounted() {
      this.getData();
      setTimeout(() =>{
        this.mycharts = echarts.init(document.getElementById('myChart3'),"bluepurple")
        // 初始化echarts

        this.mycharts.setOption(option)
      },200)
    },
    data(){
      return{
        list:[],
        address:[],
      }
    },
    methods:{
      getData () {
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback" }).then(res =>
        {
            // console.log(data)
            this.list = res.data.list.map(item => ({name: item.name, value: item.deathNum}))
            this.sort();
            const hubei = this.list[0].value
            this.list = this.list.slice(1,10);
            // console.log(this.list);
            option.series[0].data = this.list
            this.take();
            // console.log(this.address)
            option.legend.data = this.address
            option.title.subtext = '湖北 : ' + hubei
            setTimeout(()=>{
              this.mycharts.setOption(option)
              // echarts初始化的前提是dom渲染完成
            },600)


        })
      },
      sort(){
        var arrayObj=Array.from(this.list);
        arrayObj.sort(function(a,b){return parseInt(b.value)-parseInt(a.value)})
        this.list = arrayObj.slice(0,10);
      },
      take(){
        this.address = this.list.map(function (item) { return item.name; });
      }
    }
  }
</script>

<style scoped>

</style>
