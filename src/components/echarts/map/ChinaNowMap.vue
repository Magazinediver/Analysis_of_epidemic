<template>
  <div>

    <div ref="mapbox2" style="width:100%;height:460px;margin:0 auto"></div>
  </div>
</template>

<script>
  import jsonp from 'jsonp'
  import echarts from 'echarts'
  import '../../../assets/map/china.js'
  const option = {
    title: {
      // 标题内容
      text: '全国现有确诊图',
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
        {min: 101},
        {min: 20, max: 100},
        {min: 11, max: 19},
        {min: 6, max: 10},
        {min: 1, max: 5},
        {max: 0}
      ],
      inRange: {
        // 区域图标样式
        symbol: 'rect',
        color: ['#FFFFFF', '#ffe6dc', '#ff9682', '#f57864', '#e64646', '#b80a0a']
      }
    }],
    tooltip: {
      // 鼠标放上去显示内容
      trigger: 'item'
    },

  }


  export default {
    name: "ChinaNowMap",
    mounted(){
      this.getData()
      this.mycharts = echarts.init(this.$refs.mapbox2)
      // 初始化echarts
      this.mycharts.setOption(option)
    },
    methods:{
      getData () {
        this.$jsonp('https://news.sina.com.cn/project/fymap/ncp2020_full_data.json?_=1591277176628', {callbackQuery: "callbackParam", callbackName: "jsoncallback" }).then(res =>
        {
            // console.log(data)
            let list = res.data.list.map(item => ({name: item.name, value: item.econNum}))
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

