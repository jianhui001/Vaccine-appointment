<template>
    <view class="hpv-img">
        <image
            src="https://qita-1252107261.cos.ap-chengdu.myqcloud.com/yiliao/gongjinai.jpg" mode="aspectFill"
        />
    </view>
    <view class="tab-view">
        <view class="tab-toggle" v-for="(item, index) in hpv_select" :key="index" 
        @click="toggle(item._id, index)">
            <text>{{ item.name }}</text>
            <text :class="index == checked ? 'checked' : '' "></text>
        </view>
    </view>
    <view class="hpv-list" v-for="(item, index) in hpv_list" :key="index">
        <view>
            <view class="hpv-type">{{ item.name }}</view>
            <view class="hpv-age">
                <text v-for="(item1, index1) in item.describe" :key="index1">{{ item1 }}</text>
            </view>
            <view class="hpv-price">¥{{item.price[0]}}-¥{{item.price[1]}}</view>
        </view>
        <view class="hpv-reserve" @click="toReserve">去预约</view>
    </view>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {RequestApi} from '@/public/request'
import type {Hpvlist, Hpvselect} from '@/public/decl-type'

let checked = ref(0)
let hpv_select = ref<Hpvselect[]>([])
let hpv_list = ref<Hpvlist[]>([])
let hpv_all = ref<Hpvlist[]>([])
onMounted(async() => {
    const res:any = await RequestApi.OtuHpv()
    hpv_select.value = res.data.data[0].hpv_select
    hpv_list.value = res.data.data[0].hpv_list
    hpv_all.value = res.data.data[0].hpv_list
})

function toggle(id:string, index: number) {
    let res = hpv_all.value.filter(item => item.hpv_id == id)
    checked.value = index
    if(id == '26da8e4962dc565503df9629704f1700'){
        hpv_list.value = hpv_all.value
    }else {
        hpv_list.value = res
    }
}

function toReserve(_id:string,name:string,price:string[],describe:string[]) {
    let obj = JSON.stringify({_id, name, price, describe})
    uni.navigateTo({
        url: '/pages/hpv-vaccine/hpv-buy?value=' + obj
    })
}
</script>
<style>
page{
    background-color: #f6f6f6;
}
.hpv-img{
    height: 350rpx;
}
.hpv-img image {
    height: 350rpx;
    width: 100%;
    display: block;
}
.tab-view {
    /* display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20rpx;
    background-color: #fff; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
}
.tab-toggle {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100rpx;
    justify-content: center;
    position: relative;
}
.checked {
    width: 50rpx;
    height:8rpx;
    background-color: #0d7cff;
    position: absolute;
    bottom: 0;
}
.hpv-list {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
}
.hpv-type {
    font-size: 35rpx;
}
.hpv-age {
    display: flex;
    align-items: center;
}
.hpv-age text {
    background-color: #f4f6fa;
    padding: 7rpx;
    font-size: 25rpx;
    margin: 10rpx 10rpx 10rpx 0;
}
.hpv-price {
    color: #ff5f2c;
    font-size: 32rpx;
}
.hpv-reserve {
    align-self: flex-end;
    background-color: #0d7cff;
    color: #fff;
    padding: 15rpx 30rpx;
    border-radius: 40rpx;
}
</style>