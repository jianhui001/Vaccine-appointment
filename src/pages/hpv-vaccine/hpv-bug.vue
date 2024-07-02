<template>
    <view>
        <view>
            <view></view>
            <view>
                <text></text>
            </view>
        </view>
        <view></view>
    </view>

    <view class="xinguan-view">
        <view class="xinguan-flex">
            <text>真实姓名</text>
            <input placeholder="请输入真实姓名" placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>身份证</text>
            <input placeholder="请输入身份证" placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>性别</text>
            <picker class="flex-left" mode="selector" :range="['男','女']" >
                <view>
                    <text>请选择性别</text>
                    <image src="/static/other/gengduo.svg" />
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>出生日期</text>
            <picker class="flex-left" mode="date" >
                <view>
                    <text>请选择出生日期</text>
                    <image src="/static/other/gengduo.svg" />
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input placeholder="请输入手机号" v-model="submitData.phone" type="number" placeholder-class="input-style" />
        </view>
    </view>
</template>

<script setup lang="ts">
import {reactive, ref, watch, toRef, toRefs} from 'vue'

// let submitData = reactive({
//   name:'',
//   id_card:'',
//   gender,
//   born_date,
//   phone:'',
//   combo:combo_name,
//   ino_time:combo_time,
//   price:hpv_combo_price,
//   hpv_name:toRefs(router_value).name
// })
</script>

<style>
  @import url('../../common-style/form.css');
</style>