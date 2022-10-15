// 基于axios封装网络请求
// 每个程序员的想法都不一样,封装的地方和名字都不一样,但是思想相同
import theAxios from 'axios'
import router from '@/router'
import { Notify  } from 'vant'
import { getToken } from '@/utils/token.js'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 20000
})



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 目标: 同意携带token
  // 判断本地有token在携带, 判断具体api/index.js里如果没有携带Authorization,我在添加上去
  // 没有叫undefined, null具体的值你要赋予才是空
  console.log(config)
  // ?. 可选链操作符, 如果前面对象里没有length,整个表达式原地返回undefined
  // 如果getToken()在原地有值token字符串,才能调用length获取长度
 if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
  config.headers.Authorization =  `Bearer ${getToken()}`
  //  console.log(config)
 }

  return config;
},
 function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})



// 添加相应拦截
//  拦截器: 本质就是一个函数
axios.interceptors.response.use(function (response) {
  // 当 http响应状态码为2XX,3XX 就进入这里
  // 对响应的数据做点什么
  return response
}, function ( error) {
  // 当 http响应状态码为4XX , 5XX 就进入这里
  // 对响应的错误做点什么
  console.dir(error)
  // console.log(this) //undefined
  // 只有401才代表身份过期, 才需要跳转
  if(error.response.status === 401) {
    // 不能使用this.$router(因为this不是vbue组件对象无法调用$router)
    // 解决: this.$router为了拿到router路由对象, 所以直接去上面引入@/router下router对象
    Notify({type:'warning',message:'身份过期'})
   router.replace('/login')
  }


  return Promise.reject(error)
})




export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}

// 但是上面有局限性
// 到处的axios方法在使用时

// 我再逻辑页面调用时, 传入的这45个配置名字
/*
    axios({
        url:'请求地址'
        method:'请求方式'
        params:{}, 传参
        data: {}, 请求体
        headers:{} 请求头
    })

*/
// 问题来了, 万一将来我要更新 request.js 里封装网络请i去的工具
// import $ from 'jquery'
// export default $.ajax

// /*
//     $.ajax({
//         url:'请求地址',
//         type:'请求方式',
//         data:{}, //没有 params
//         headers: {}
//     })
// */
