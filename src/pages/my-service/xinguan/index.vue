<template>
    <view class="xinguan-view" v-for="(item, index) in order" :key="index">
        <text class="name">{{ item.name }}</text>
        <view class="xinguan-order">
            <text>接种地点:</text>
            <text>{{item.address}}</text>
        </view>
        <view class="xinguan-order">
            <text>疫苗厂商:</text>
            <text>{{item.company}}</text>
        </view>
        <view class="xinguan-order">
            <text>接种时间:</text>
            <text>{{item.date}} {{item.period}}</text>
        </view>
        <view class="reg-cancel">
            <text :class="item.cancel ? '' : 'prevent_style'" @click="Cancel(item._id, index)">{{ item.cancel ? '取消预约' : '已取消预约' }}</text>
        </view>
    </view>

    <point :show="show"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app"
import {RequestApi} from '@/public/request'
import type {Xinguanorder} from '@/public/decl-type'
import point from '@/com-components/point.vue'

let order = ref<Xinguanorder[]>([])
let show = ref(false)
onShow(async () => {
    const res:any = await RequestApi.CoviduserOrder()
    order.value = res.data.data
    if(res.data.data.length == 0){
        show.value = true
    }
})

async function Cancel(id:string, index:number) {
    const res:any = await RequestApi.CovidCancel({_id: id})
    if(res.statusCode == 200) {
        order.value[index].cancel = false
    }
}
</script>

<style>
page{
  background-color: #f6f6f6;
}
.xinguan-view {
    background-color: #ffffff;
    border-radius: 15rpx;
    margin: 20rpx;
    padding: 20rpx;
}
.name {
    font-weight: bold;
    display: block;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #e4e4e4;
    font-size: 35rpx;
}
.xinguan-order {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
}
.xinguan-order text:nth-child(1){
    width: 150rpx;
}
.xinguan-order text:nth-child(2){
    flex: 1;
}
.reg-cancel {
    display: flex;
    justify-content: flex-end;
    padding-top: 20rpx;
}
.reg-cancel text {
    color: #0176ff;
    border: 1rpx solid #0176ff;
    padding: 15rpx 30rpx;
    border-radius: 15rpx;
    display: inline-block;
}
/* 禁用取消预约按钮点击 */
.prevent_style{
  pointer-events: none;
  border: 1rpx solid #999aaa !important;
  color: #999aaa !important;
}
</style>