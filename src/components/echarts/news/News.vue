<template>
  <div>
    <el-card v-for="(item,index) in cnews" :key="index">
      <a :href="item.link" :title="item.title" target="_blank" class="card-link">
        <span class="news-span-title">
          {{parseInt(item.pubDate) | forDate}}
          <a :href="item.sourceUrl" target="_blank" class="title-link">{{item.title}}</a>
        </span>
        <p class="news-summary">
          {{item.summary}}
        </p>


      </a>
    </el-card>
  </div>
</template>

<script>
  import {formatDate} from '@/date.js';

  export default {
    name: "news",
    // created() {
    //   this.getNews()
    // },
    mounted() {

    },
    filters: {
      forDate(time) {
        // console.log(time)
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },

    data(){
      return{
        queryInfo:{
          page: 1,
          num:20
        },
        list:[],
        address:[],
      }
    },
    props:{
      cnews:{},
    },
    methods:{
      // async getNews(){
      //   const { data: res } = await this.$http.get('https://lab.isaaclin.cn/nCoV/api/news', {
      //     params: this.queryInfo
      //   })
      //   this.news = res.results
      //   console.log(this.news)
      // },

    }
  }
</script>

<style scoped>

  .news-span-title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    float: right;
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
