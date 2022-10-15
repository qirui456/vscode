// 统一封装接口方法
// 每个方法负责请求一个url地址
// 逻辑页面, 导入这个接口的方法, 就能发请求

import request from '@/utils/request.js'
import axios from '@/utils/request.js'

// 登录接口
// axios内部, 会把参数对象转成json字符串发后台
// axios内部,回自动请求参数(headers)里
export  const loginAPI = ({ mobile, code }) =>request({
  url: '/v1_0/authorizations',
  method:'POST',
  data:{
    mobile,
    code
  }
})

// 频道 -= 获取频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取 - 获取用户选择的频道
// 注意 - 用户没有登录，默认返回后台设置的默认频道列表
export const getUserChannelsApi = () =>request({
  url:'/v1_0/user/channels',
  method:'GET',
})

// 文章 - 获取列表

export const getAllArticleListApi = ({channel_id ,timestamp}) =>request({
  url:'/v1_0/articles',
  method:'GET',
  params :{ // 
    channel_id,
    timestamp,
  }
})

// 文章 - 不喜欢的反馈
export const  dislikeArticleAPI = ({artId}) => request({
  url: '/v1_0/article/dislikes',
  method:'POST',
  data:{
    target:artId
  }
})


// 文章举报 - 垃圾内容
export const  reqortArticleAPI = ({artId,type}) => request ({
  url:'/v1_0/article/reports',
  method:'POST',
  data:{
    target:artId,
    type: type,
    remark:'如果你想写,可以在逻辑页面哦判断下'
  }
})

export const updateChannelsAPI = ({channels}) => request({
  url:'/v1_0/user/channels',
  method:'PUT',
  data:{
    channels  //用户已选频道数组
  }
})

// 删除用户指定的频道
export const removeTheChannelAPI = ({channelId}) =>  request({
  url:`/v1_0/user/channels/${channelId}`,
  method:'DELETE'
  
})

//  文章搜索的接口 
export const suggestListAPI = ({keywords}) => request ({
  url:'/v1_0/suggestion',
  params:{
    q:keywords
  }
})