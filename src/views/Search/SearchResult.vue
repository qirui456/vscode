<template>
    <div>
        <!-- 搜索结果页-头部导航 -->
        <div class="search-result-container">
            <!-- 点击实现效果回退 -->
            <van-nav-bar
            title="搜索结果"
            left-arrow
            @click-left="$router.go(-1)"
            fixed
            />
        </div>
    </div>
</template>

<script>
    export default {
        name:'SearchResult'
    }
</script>

<style lang="scss" scoped>
   ::v-deep .search-result-container {
        padding-top:46px ;
       
    }
    .van-nav-bar{
     
 background-color: #007bff;
    }
   ::v-deep .van-nav-bar__title{
        color: white;
    }
    
</style>