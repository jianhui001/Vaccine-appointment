<template>
    <view class="patient-infor" v-for="(item, index) in patient" :key="index">
        <view class="patient-flex">
            <text class="patient-name">{{item.name}}</text>
            <text class="patient-text">{{ item.relation }}</text>
        </view>
        <view class="patient-flex patient-sex">
            <text>{{item.sex}}</text>
            <text>{{item.age}}</text>
            <text>{{item.phone}}</text>
        </view>
    </view>
    <view class="submit">
        <text @click="canCel">取消</text>
        <text @click="addTo">添加就诊人</text>
    </view>
    <point :show="show" :title="title"/>
    <view style="height:300rpx"></view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { onShow } from "@dcloudio/uni-app";
import {RequestApi} from '@/public/request'
import point from '@/com-components/point.vue'
import type {Mypatient} from '@/public/decl-type'

let patient = ref<Mypatient[]>([])
onShow(async() => {
    const res:any = await RequestApi.GetpaTient()
    patient.value = res.data.data
    if(res.data.data.length == 0) {
        show.value = true
    }
})

let show = ref(false)
let title = ref('你还没有就诊人')

function canCel() {
    uni.navigateBack({delta: 1})
}

function addTo() {
    uni.navigateTo({
        url:'/pages/my-service/my-patient/add-patient'
    })
}
</script>

<style>
page {
    background-color: #f6f6f6;
}
.patient-infor {
    background-color: #fff;
    margin: 20rpx;
    border-radius: 15rpx;
    font-size: 28rpx;
}
.patient-flex {
    display: flex;
    align-items: center;
    padding: 20rpx;
}
.patient-flex text{
  margin-right: 15rpx;
}
.patient-name {
    font-weight: bold;
    font-size: 35rpx;
}
.patient-text {
    background-color: #d6f3ff;
    color: #78beff;
    padding: 2rpx 15rpx;
    }
.patient-sex {
    color: #7c96af;
}
.submit {
    font-size: 30rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 20rpx 0 68rpx 0;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
}
.submit text {
    width: 40%;
    padding: 20rpx 0;
    border-radius: 10rpx;
}
.submit text:nth-child(1) {
    background-color: #e8f2fe;
    color: #3a75f3;
}
.submit text:nth-child(2) {
    background-color: #2c76ef;
    color: #ffffff;
}
</style>