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
            <input placeholder="请输入手机号" type="number" placeholder-class="input-style" />
        </view>
    </view>

    <view class="combo-view">
        <block v-for="(item, index) in hpv_combo_name" :key="index">
            <text class="combo-title">{{ item.title }}</text>
            <view class="combo-list">
                <text v-for="(item_a, index_a) in item.name" :key="index_a"
                :class="index_a == COMBO ? 'checkstyle' : ''"
                @click="changeCombo(index_a, item_a.combo_id, item_a.combo)">{{ item_a.combo }}</text>
            </view>
        </block>
        <block v-for="(item, index) in hpv_combo_time" :key="index">
            <text class="combo-title">{{ item.title }}</text>
            <view class="combo-list">
                <text v-for="(item_a, index_a) in item.name" :key="index_a"
                :class="index_a == TIME ? 'checkstyle' : ''"
                @click="changeTime(index_a, item_a.time_id, item_a.time)"
                >{{ item_a.time }}</text>
            </view>
        </block>
    </view>
    <view style="height:300rpx"></view>
    <view class="Total-view">
        <text>合计：{{hpv_combo_price}}¥</text>
        <text>提交</text>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import {reactive, ref, watch, toRef, toRefs} from 'vue'
import { RequestApi } from '@/public/request'
import type {Hpvcomboname, Hpvcombotime} from '@/public/decl-type'

let hpv_combo_name = ref<Hpvcomboname[]>([])
let hpv_combo_time = ref<Hpvcombotime[]>([])
onLoad(async (event:any) => {
    const res:any = await RequestApi.HpvPack()
    hpv_combo_name.value = [res.data.data[0]]
    hpv_combo_time.value = [res.data.data[1]]
    console.log('time', hpv_combo_time)
})

// 选中套餐民称
let COMBO = ref(-1)
let combo_id = ref('')
let combo_name = ref('')
function changeCombo(index: number, id: string, name: string) {
    COMBO.value = index
    combo_id.value = id
    combo_name.value = name
}

// 选中接种时间
let TIME = ref(-1)
let time_id = ref('')
let combo_time = ref('')
function changeTime(index: number, id: string, name: string) {
    TIME.value = index
    time_id.value = id
    combo_time.value = name
}

watch([combo_id, time_id],(newVal, oldVal) => {
    if(newVal[0] != '' && newVal[1] != '') {
        uni.showLoading({title: '获取价格', mask: true})
        hpvPrice()
    }
})

let hpv_combo_price = ref(0.00)
async function hpvPrice() {
    const res:any = await RequestApi.HpvPrice(
        {
            hpv_id:"8d33255162dc5b22001ef71c302a450b",
            combo_id: combo_id.value,
            time_id: time_id.value
        }
    )
    console.log('res', res)
    hpv_combo_price.value = res.data.data[0].price
    uni.hideLoading()
}
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
  page{
    background-color: #fafafa;
  }
  .combo-view {
    margin: 20rpx 0;
    background-color: #fff;
    padding: 20rpx;
  }
  .combo-title {
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
  .combo-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .combo-list text {
    font-size: 30rpx;
    background-color: #f5f5f5;
    padding: 20rpx 40rpx;
    margin: 0 20rpx 20rpx 0;
    display: block;
  }
  .checkstyle {
    background-color: #2c76ef !important;
    color: #ffffff !important;
  }
  /* .Total-view {
    background-color: #fff;
    padding: 20rpx 20rpx 68rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .Total-view text:nth-child(1){
    font-weight: bold;
    color: #ff5f2c;
  }
  .Total-view text:nth-child(2){
    padding: 15px 50px;
    background-color: #0176ff;
    color: #fff;
    border-radius: 10rpx;
  } */
</style>