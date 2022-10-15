<template>
    <div>
        <!-- 一条文章单元格 -->
        <van-cell>
            <!-- 标题区域的插槽 -->
            <template #title>
                <div class="title-box">
                    <!-- 标题 -->
                    <span>{{ artObj.title}}</span>
                    <!-- 单图 -->
                    <img v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images[0]" alt="">
                </div>
                <!-- 多图 -->
                <div class="thumb-box" v-if="artObj.cover.type > 1">
                     <img
                      v-for="(imgUrl, index) in artObj.cover.images"
                      :key="index"  class="thumb" :src="imgUrl" alt="">
                      
                </div>
            </template>
            <!-- label 区域插槽 -->
            <template #label>
                <div class="label-box">

                <div>
                    <span>{{ artObj.aut_name}}</span>
                    <span>{{ artObj.comm_count}}评论</span>
                    <span>{{ artObj.pubdate}}</span>
                </div>
                <!-- 反馈按钮 -->
                <van-icon @click="show=true"  name="cross"></van-icon>
                </div>
            </template>
        </van-cell>

        <!-- 反馈面板 -->
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect" 
        @cancel="cancelFn"
        @close="closeFn"
          :cancel-text="bottomText" get-container="body" />
    </div>
</template>

<script>
// 目标一 : 点击 反馈垃圾内容进行 数据的切换
//  1.监听点击事件 区分用户点击的是那一个事件
//  2.切换数据


// 目标2 : 二级返回
import {timeAgo} from '@/utils/data.js'
import { firstActions , secondActions } from '@/api/reqort.js'
    export default {
        data(){
            return{
                show:false,
                  actions:firstActions,
                  bottomText:'取消'
            }
        },
        props:{
           artObj:Object
        },
     methods:{
         formatTime:timeAgo,
         onSelect(action,item) {
             console.log(action) //{name: '返回垃圾内容同}
             console.log(item)  //索引值
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
    //   this.show = false;

    // 判断
    if (action.name === '反馈垃圾内容'){
        this.actions = secondActions
        this.bottomText = '返回'
    }else if(action.name === '不感兴趣'){
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false //无论成功或者失败直接消失
    }   else {
        //二级反馈的选项
        this.$emit('reqortEV',this.artObj.art_id,action.value)
    
        this.show = false //关闭
    }
    },
    cancelFn(){
        if(this.bottomText === '返回') {

            this.show = true
            this.actions = firstActions
            this.bottomText = '取消'
        }
    },
    // 关闭面板-触发事件
    closeFn(){
        this.actions = firstActions
        this.bottomText = '取消'
    }
     }
    }
</script>

<style lang="scss" scoped>
    .title-box{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .label-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .label-box span {
        margin: 0 3px;
        &:first-child{
            margin-left: 0;
        }
    }
    // 图片样式
    .thumb{
        width: 113px;
        height: 70px;
        background-color: #f8f8f8;
        object-fit: cover;
    }

    // 三图,图片容器
    .thumb-box {
        display: flex;
        justify-content: space-between;
    }
</style>