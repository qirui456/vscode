<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @disLikeEV="disLikeFn"
          @reqortEV="reportFn"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import { getAllArticleListApi,dislikeArticleAPI,reqortArticleAPI } from "@/api";
import { Notify} from 'vant'

// 问题一 网页刚打开 created 和 onLoad里请求同时发送
// onLoad中 2次一样的数据合并
export default {
  props: {
    // list:Array //文章数据列表
    channelId: Number, //频道ID
  },
  data() {
    return {
      list: [], //文章列表数组
      loading: false, //底部加载状态
      finished: false, // 底部是否完成
      theTime: new Date().getTime(),
      isLoading: false, //顶部
    };
  },
  components: { ArticleItem },

  created() {
    this.getAllArticleListfn();
  },
  methods: {
    //   专门副负责发送请求
    async getAllArticleListfn() {
      const res = await getAllArticleListApi({
        channel_id: this.channelId,
        // timestamp: (new Date()).getTime(),
        timestamp: this.theTime,
      });
      console.log(res);
      this.list = [...this.list, ...res.data.data.results];
      this.theTime = res.data.data.pre_timestamp;
      this.loading = false; //如果不关闭,底部一直是加载中状态, 下次触底

      if (res.data.data.pre_timestamp === null) {
        //本次回来的数据是最后的 没有下次了

        this.finished = true;
      }
      this.isLoading = false;
    },

    // 底部加载的事件方法
    async onLoad() {
      if (this.list.length === 0) {
        this.loading = false;
        return;
      }

      this.getAllArticleListfn();
    },
    // 顶部刷新数据方法
    async onRefresh() {
      //  让list 数组清空 来一份新的数据
      this.list = [];
      this.theTime = new Date().getTime();
      this.getAllArticleListfn();
    },
    // 反馈不感兴趣
    async disLikeFn(id){
      // 如果try+catch 自己处理错误, 内部throw就不会向控制台抛出打印错误, 而是交给你的catch内自定义错误
      // try+catch捕获同步代码的异常
      try{ 
        await dislikeArticleAPI({     
        artId:id
        })
        // res里没有什么有用的信息, 所以awity 没有
      Notify({type:'success',message:'反馈成功'})
         console.log('成功了')

      } catch(err){
         console.log('失败了')
      }
     
    },
    // 反馈垃圾内容的方法
    async reportFn(id,value){
       await reqortArticleAPI({
        artId:id,
        type:value
      })
      Notify({type:'success',message:'举报成功'})
    }
  },
};
</script>

<style lang="scss" scoped>
</style>