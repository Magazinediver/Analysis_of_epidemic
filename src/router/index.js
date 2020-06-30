import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载

const Home = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/Home.vue')
const Dashboard = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/page/Dashboard.vue')
const Analysis = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/page/Analysis.vue')
const AnalysisPercent = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/page/AnalysisPercent.vue')

const NegativeStrong = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/echarts/wordcount/NegativeStrong')
const NegativeWeak = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/echarts/wordcount/NegativeWeak')
const PostiveStrong = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/echarts/wordcount/PostiveStrong')
const PostiveWeak = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '../components/echarts/wordcount/PostiveWeak')


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home',
    component: Home,
    // redirect: '/map',
    children: [
      { path: '/home', component: Dashboard },
      { path: '/analysis', component: Analysis },
      { path: '/analysispercent', component: AnalysisPercent },
      { path: '/wordcloud-ns', component: NegativeStrong },
      { path: '/wordcloud-nw', component: NegativeWeak },
      { path: '/wordcloud-ps', component: PostiveStrong },
      { path: '/wordcloud-pw', component: PostiveWeak },
    ] }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
// router.beforeEach((to, from, next) => {
//   // 访问登录页，放行
//   if (to.path === '/login') return next()
//   if (to.path === '/signup') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token, 强制跳转到登录页
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
