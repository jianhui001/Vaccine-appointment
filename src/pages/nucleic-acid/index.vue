<template>
    <view class="nucleic-top">
        <view class="nucleic-price">
            <image
                :src="nuclei_cacid.data.logo"
                mode="aspectFill"
            />
            <view class="pay-price">
                <text>{{ nuclei_cacid.data.name }}</text>
                <text>￥{{ nuclei_cacid.data.price }}</text>
            </view>
        </view>
        <view class="nucleic-hint">
            <view v-for="(item, index) in nuclei_cacid.data.boon" :key="index">
                <icon class="icon-small" type="success" size="15"></icon>
                <text>{{ item }}</text>
            </view>
        </view>
    </view>

    <view class="nucleic-address">
        <view>
            <text>{{ nuclei_cacid.data.hospital }}</text>
            <text> {{ nuclei_cacid.data.address }}</text>
        </view>
        <view>
            <image src="/static/other/dianhua.svg" mode="widthFix"/>
            <text class="text-color">电话</text>
        </view>
    </view>

    <view class="xinguan-view new-style">
        <view class="xinguan-flex">
            <text>真实姓名</text>
            <input placeholder="请输入真实姓名" placeholder-class="input-style">
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input placeholder="请输入手机号" type="number"  placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>身份证</text>
            <input placeholder="请输入身份证"  placeholder-class="input-style"/>
        </view>
    </view>

    <view class="nucleic-time new-style">
        <text class="nucleic-Title">选择预约时段</text>
        <scroll-view scroll-x class="scroll-view_H">
            <view class="nucleic-time-flex">
                <view  v-for="(item, index) in nuclei_cacid.data.date" :key="index">
                    <text>{{item.date}}</text>
                    <text>{{item.week}}</text>
                </view>
            </view>
        </scroll-view>
    </view>

    <view class="nucleic-time">
        <text class="sam-Title">咽拭子采样方式</text>
        <view class="sam-content" v-for="(item, index) in nuclei_cacid.data.style" :key="index">
            <label>{{item.title}}</label>
            <text v-for="(item_a, index_a) in item.desc" :key="index_a">{{item_a}}</text>
        </view>
    </view>

    <view style="height: 300rpx;"></view>
    <view class="Total-view">
        <text>检测费用：￥{{ nuclei_cacid.data.price }}</text>
        <text>提交</text>
    </view>

</template>

<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import {RequestApi} from '@/public/request'
import type {Nucleicacid} from '@/public/decl-type'

let nuclei_cacid = reactive<{data: Nucleicacid}>({data: {
    address: '',
	hospital: '',
	logo: '',
	name: '',
	phone: '',
	price: 0,
	boon: [],
	date: [],
	style: []
}})
onMounted(async ()=> {
    const res:any = await RequestApi.NuataGet()
    console.log(res)
    nuclei_cacid.data = res.data.data[0]
})
</script>

<style>
@import url('../../common-style/form.css');
page {
    background-color: #fafafa;
}
.nucleic-top {
    padding: 20rpx;
    background-color: #fff;
}
.nucleic-price{
    padding-bottom: 20rpx;
    display: flex;
}
.nucleic-price image {
    width: 100rpx;
    height: 100rpx;
    display: block;
}
.nucleic-price text {
    display: block;
    padding: 10rpx;
}
.pay-price text:nth-child(1) {
    font-size: 35rpx;
}
.pay-price text:nth-child(2) {
    font-size: 30rpx;
    color: #ff5f2c;
}
.nucleic-hint {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20rpx;
    font-size: 24rpx;
}
.nucleic-hint view {
    display: flex;
    align-items: center;
}
.nucleic-hint text {
    padding-left: 10rpx;
}
.nucleic-address {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 20rpx;
    margin: 20rpx;
}
.nucleic-address text {
    display: block;
}
.nucleic-address image {
    width: 40rpx;
    height: 40rpx;
}
.nucleic-address view:nth-child(2){
    display: flex;
    flex-direction: column;
    align-items: center;
}
.new-style{
    margin: 20rpx;
    border-radius: 20rpx;
}
.nucleic-time {
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 20rpx;   
    background-color: #fff;
}
.nucleic-Title {
    font-weight: bold;
}
.nucleic-time-flex{
    display: flex;
    font-size: 26rpx;
    align-items: center;
}
.scroll-view_H{
  white-space: nowrap;
  margin-top: 20rpx;
}
.nucleic-time-flex view{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10rpx 20rpx;
  margin-right: 20rpx;
  border-radius: 10rpx;
}
.sam-Title {
    font-weight: bold;
}
.sam-content {
    margin-top: 20rpx;
}
.sam-content label {
    display: inline-block;
    background-color: #0176ff;
    color: #fff;
    border-radius: 10rpx;
    padding: 5rpx 10rpx;
    font-size: 28rpx;
}
.sam-content text {
    display: block;
    padding: 10rpx 0;
    line-height: 1.5;
    font-size: 28rpx;
}
</style>