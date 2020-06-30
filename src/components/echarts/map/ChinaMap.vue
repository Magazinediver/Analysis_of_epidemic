<template>
  <div>

    <div ref="mapbox" style="width:100%;height:460px;margin:0 auto"></div>
  </div>
</template>

<script>
  import jsonp from 'jsonp'
  import echarts from 'echarts'
  import '../../../assets/map/china.js'
  const option = {
    title: {
      // 标题内容
      text: '全国累计确诊图',
      // link: 'https://baidu.com',
      subtext: '',
      // sublink: 'https://baidu.com'
    },
    series: [{
      name: '确诊人数',
      type: 'map',
      // 告诉echarts渲染一个地图
      map: 'china',
      // 告诉echarts渲染中国地图
      label: {
        // 设置地区汉字
        show: true,
        color: '#333',
        fontSize: 10
      },
      itemStyle: {
        // 地图区域样式
        areaColor: '#eee'
      },
      roam: true,
      // 鼠标滚轮效果
      zoom: 1.2,
      // 地图放大缩小
      emphasis: {
        // 鼠标经过地图和字体样式
        label: {
          color: '#111',
          fontSize: 12
        },
        itemStyle: {
          areaColor: '#d8f6fb'
        }
      },
      data: []
      // 展示后台给的数据，必须格式（name:xxx;value:xxx）
    }],
    visualMap: [{
      // 区域显示颜色
      type: 'piecewise',
      show: true,
      // splitNumber: 4
      pieces: [
        {min: 10000},
        {min: 1000, max: 9999},
        {min: 100, max: 999},
        {min: 10, max: 99},
        {min: 1, max: 9},
        {max: 0}
      ],
      inRange: {
        // 区域图标样式
        symbol: 'rect',
        color: ['#FFFFFF', '#ffe6dc', '#ff9682', '#f57864', '#e64646', '#b80a0a']
        // color: ['#FFFFFF', '#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
      }
    }],
    tooltip: {
      // 鼠标放上去显示内容
      trigger: 'item'
    },

  }


  export default {
    name: "ChinaMap",
    mounted(){
      this.getData()
      this.mycharts = echarts.init(this.$refs.mapbox)
      // 初始化echarts
      this.mycharts.setOption(option)
    },
    methods:{
      getData () {
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback" }).then(res =>
        {
            // console.log(res)
            let list = res.data.list.map(item => ({name: item.name, value: item.value}))
            option.series[0].data = list
            this.mycharts.setOption(option)
            // echarts初始化的前提是dom渲染完成

        })
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>

