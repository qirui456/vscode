<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template #right>
          <van-icon color="#FFF" name="search" size="0.48rem" @click="moveSearchFn"></van-icon>
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏导航 -->
    <div class="main">
      <van-tabs
       @change="channelChangeFn"
        sticky
        animated
        offset-top="1.3rem"
        v-model="channelId"
      >
        <van-tab        
          :title="obj.name"
          v-for="obj in userChannelList"
          :key="obj.id"
          :name="obj.id"
          ><ArticleList :channelId="channelId"
        /></van-tab>
      </van-tabs>

  <!-- 编辑频道的图标 -->
      <van-icon @click="plusClickFn" name="plus" size="0.37333334rem" class="moreChannels"></van-icon>
    </div>


    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body"><ChannelEdit 
    :userList="userChannelList" 
    :unCheckList="unCheckChannelList"
    @removerChannelEV="removerChannelFn"
    @addChannelEV="addChannelFn"
    @closeEV="closeFn"
    v-model="channelId"
    ref="edit"
    /></van-popup> 
  </div>
</template>

<script>
import {removeTheChannelAPI, getUserChannelsApi,getAllChannelsAPI,updateChannelsAPI,getAllArticleListApi } from "@/api";
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from './ChannelEdit.vue';

//  目标: 获取不同的文章列表需要传递不同的传递的ID

//  目标2: 点击tab标签页@change触发,重新发送请求, 拿到新的数据
//  即使你用keep-alive也没有用.
export default {
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      channelId: 0, //默认频道ID为0
      userChannelList: [], // 用户选择的频道
      allChannelList:[],
      // articleList: [], //文章列表
      show:false //控制弹出层隐藏显示
    };
  },
  async created() {
    //  频道列表
    const res = await getUserChannelsApi();
    this.userChannelList = res.data.data.channels
    // this.channelChangeFn();

    // 所有频道
  const res2 = await getAllChannelsAPI()
  this.allChannelList = res2.data.data.channels
  },
  methods: {
    closeFn(){
      this.show = false
      // 我要让内部的编辑状态回归false
      this.$refs.edit.isEdit = false

    },
    async addChannelFn(channelObj){
      this.userChannelList.push(channelObj)
      // console.log(this.userChannelList)
      // 最新数组发送给, 后台
  const res = await updateChannelsAPI({
    channels:this.userChannelList
     
  })
  console.log(res)
    },
    // 点击+号方法
    plusClickFn(){
      this.show = true
    },
    // 放大镜点击事件
    moveSearchFn(){
      this.$router.push('/search')
    },
    // 添加频道
 
    // 切换的事件
    async channelChangeFn() {
      const res2 = await getAllArticleListApi({
        channel_id: this.channelId,
        timestamp: (new Date()).getTime(),
     
      });
      // 文章下边获取文章数据
      console.log(res2);
      this.articleList = res2.data.data.results;
    },


    async removerChannelFn(channelObj){
      const index = this.userChannelList.findIndex(obj => obj.id ===channelObj.id)
      this.userChannelList.splice(index,1)

      

    const res = await removeTheChannelAPI({
      channelId:channelObj.id
    })
    console.log(res)
    // 删除接口返回状态码204 无返回内容
    }
  },
  // 计算属性 
  computed: {
    unCheckChannelList () {
      // 目标吧所有频道数组挨个对象取出， 去用户已宣布你频道数组中查找，如果找不到， 则让filter方法收集到一个新数组里
  //     const newArr = this.allChannelList.filter(bigObj =>{
  //       const index = this.userChannelList.findIndex(smallObj =>{

  //         return smallObj.id === bigObj.id
  //       })
      

  //     if(index > -1){
  //       return false
  //     } else {
  //       return true
  //     }
  //   })
  //   return newArr
  // }


  return this.allChannelList.filter(bigObj => this.userChannelList.findIndex(smallObj => smallObj.id ===  bigObj.id) === -1)
  }
}
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__content {
  background-color: #007bff;
}
::v-deep .van-nav-bar__title {
  color: white;
}
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
::v-deep .van-tabs__line {
  background-color: #007bff;
}
::v-deep .van-tabs__wrap{
  padding-right: 30px;
  background-color: #fff;
}
.moreChannels{
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup{
  width: 100vw;
  height: 100vh;
}
// 如果想给100% 要给html和body设置100%
// vw vh是css3 新出得单位,参考浏览器窗口得高度
</style>