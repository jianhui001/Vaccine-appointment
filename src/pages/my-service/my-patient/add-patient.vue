<template>
    <view class="AI-card" >
        <image
            src="/static/other/AI-shibie.svg"
            mode="widthFix"
        />
        <text>身份证智能识别</text>
    </view>
    <view class="xinguan-view">
        <view class="xinguan-flex">
            <text>真实姓名</text>
            <input placeholder="请输入姓名" v-model="submitData.name"  placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>性别</text>
            <picker mode="selector" :range="['男','女']" class="flex-left" @change="changeSex">
                <view>
                    <text>{{submitData.sex == '' ? '请输入性别' : submitData.sex}}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>出生日期</text>
            <picker mode="date" class="flex-left" @change="changeDate">
                <view>
                    <text>{{submitData.born == '' ? '请选择出生日期' : submitData.born}}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>成员关系</text>
            <picker mode="selector" :range="['自己','父母','其他']" class="flex-left" @change="changeReletion">
                <view>
                    <text>{{submitData.relation == '' ? '请选择成员关系' : submitData.relation}}</text>
                    <image src="/static/other/gengduo.svg"></image>
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>身份证</text>
            <input placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input placeholder="请输入手机号" type="number" v-model="submitData.phone" placeholder-class="input-style"/>
        </view>
    </view>
    <view style="height:300rpx"></view>
    <view class="submit">
        <text @click="canCel">取消</text>
        <text @click="aubMit">确认添加</text>
    </view>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
    let submitData = reactive({
        name:'',
        sex:'',
        born:'',
        relation:'',
        id_card:'',
        phone:''
    })

    function changeSex(event:{detail:{value:string}}){
        submitData.sex = event.detail.value == '0' ? '男' : '女'
    }

    function changeDate(event:{detail:{value:string}}){
        submitData.born = event.detail.value
    }

    function changeReletion(event:{detail:{value:string}}){
        const res = event.detail.value
        submitData.relation = res == '0' ? '自己' : res == '1' ? '父母' : '其他'
    }

    function canCel() {
        uni.navigateBack({delta:1})
    }

    function aubMit() {

    }
</script>

<style>
@import url('../../../common-style/form.css');
page{
    background-color: #f6f6f6;
}
.AI-card {
    padding: 30rpx 20rpx;
    margin: 20rpx 20rpx 50rpx 20rpx;
    border-radius: 15rpx;
    font-size: 35rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
}
.AI-card image {
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
    display: block;
}
</style>