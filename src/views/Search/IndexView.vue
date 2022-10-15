<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <!-- 组件内会给原生input标签, 绑定keypress-按键事件
        $emit('search')
       -->
      <van-search
        v-model="kw"
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="inputFn"
        @search="searchFn"
      />
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length!=0">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        v-html="lightFn(str, kw)"
        :key="index"
        @click="suggestClickFn(str)"
      ></div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="historyClickFn(str)"
          >{{ str }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
// 跳转到搜索结果页面
//  输入框回车 -> 输入框文字 -> 搜索结果页
//  点击联想菜单 -> 点击文字 ->搜索结果页
import { suggestListAPI } from "@/api/index.js";
export default {
  data() {
    return {
      kw: "", //搜索关键字
      timer: null,
      suggestList: [],
      history: JSON.parse(localStorage.getItem('his')) || [],
    };
  },
  methods: {

    moveFn(theKw){

      // 路由跳转再watch执行 所以我们要让路由跳转, 来一个定时器包裹,让跳转最后执行
      setTimeout(()=>{
          this.$router.push({
        path: `/search_result/${theKw}`,
      });
      },0)
     
    },
    // 输入框- 搜索事件
    searchFn() {
      // 保存到数组里
      this.history.push(this.kw)
      // console.log(123)
     this.moveFn(this.kw)
    },
    suggestClickFn(str) {
      this.history.push(str)
      this.moveFn(str)
    },
    historyClickFn(str) {
     this.moveFn(str)
    },
    // 输入框内容试试改变
    inputFn() {
      clearTimeout(this.timer);

      if (this.kw.length === 0) {
        this.suggestList = [];
      } else {
        // 防抖: 延时执行逻辑代码, 事件再次触发, 清楚上一个定时器
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keywords: this.kw,
          });
          // console.log(res)
          this.suggestList = res.data.data.options;

          console.log(this.kw);
        }, 300);
      }
    },
    // 专门用来处理字符串高亮方法
    lightFn(originStr, target) {
      // originStr: 原来字符串
      // target: 关键字
      // 字符串 .replace()
      // 例如: 好同志, 都是招募来的, 关键字是: 好

      // 如果使用变量,作为正则匹配条件,不能用语法糖
      const reg = new RegExp(target, "ig"); //i忽略大小写 g全局匹配
      return originStr.replace(reg, (match) => {
        return `<span style="color:red;">${match}</span>`;
      });
    },
  },
  watch:{
    history: {
      deep:true,
      handler(){
        // 立刻覆盖的保存到本地
      localStorage.setItem('his',JSON.stringify(this.history))
      }
    }
  }
};
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}

/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>