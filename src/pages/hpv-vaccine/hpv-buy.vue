<template>
    <view class="hpv-choose">
        <view>
            <view class="hpv-type">{{router_value.name}}</view>
            <view class="hpv-age">
                <text v-for="(item, index) in router_value.describe" :key="index">{{item}}</text>
            </view>
        </view>
        <view class="hpv-price">¥{{router_value.price[0]}}-¥{{router_value.price[1]}}</view>
    </view>

    <view class="xinguan-view">
        <view class="xinguan-flex">
            <text>真实姓名</text>
            <input placeholder="请输入真实姓名" v-model="submitData.name" placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>身份证</text>
            <input placeholder="请输入身份证" v-model="submitData.id_card" placeholder-class="input-style"/>
        </view>
        <view class="xinguan-flex">
            <text>性别</text>
            <picker class="flex-left" mode="selector" :range="['男','女']"  @change="changeGender">
                <view>
                    <text>{{gender == '' ? '请选择性别' : gender}}</text>
                    <image src="/static/other/gengduo.svg" />
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>出生日期</text>
            <picker class="flex-left" mode="date"  @change="changeDate">
                <view>
                    <text>{{born_date == '' ? '请选择出生日期' : born_date}}</text>
                    <image src="/static/other/gengduo.svg" />
                </view>
            </picker>
        </view>
        <view class="xinguan-flex">
            <text>手机号</text>
            <input placeholder="请输入手机号" v-model="submitData.phone" type="number" placeholder-class="input-style" />
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
        <text>合计：¥{{hpv_combo_price}}</text>
        <text @click="subMit">提交</text>
    </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import {reactive, ref, watch, toRef, toRefs} from 'vue'
import { RequestApi } from '@/public/request'
import type {Hpvcomboname, Hpvcombotime} from '@/public/decl-type'

let hpv_combo_name = ref<Hpvcomboname[]>([])
let hpv_combo_time = ref<Hpvcombotime[]>([])
let router_value = reactive({
  _id:'',
  name:'',
  price:['1'],
  describe:['1']
})
onLoad(async (event:any) => {
    let {_id,name,price,describe} = JSON.parse(event.value)
    router_value._id = _id
    router_value.name = name
    router_value.price = price
    router_value.describe = describe
    console.log("router_value",router_value)
    const res:any = await RequestApi.HpvPack()
    hpv_combo_name.value = [res.data.data[0]]
    hpv_combo_time.value = [res.data.data[1]]
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
            hpv_id: router_value._id,
            combo_id: combo_id.value,
            time_id: time_id.value
        }
    )
    hpv_combo_price.value = res.data.data[0].price
    uni.hideLoading()
}

let gender = ref('')
 function changeGender(event: any) {
    gender.value = event.detail.value == '0' ? '男' : '女'
 }

 let born_date = ref('')
 function changeDate(event:any){
    born_date.value = event.detail.value
}

let submitData = reactive({
  name:'',
  id_card:'',
  gender,
  born_date,
  phone:'',
  combo:combo_name,
  ino_time:combo_time,
  price:hpv_combo_price,
  hpv_name: toRefs(router_value).name
})

async function subMit() {
    uni.showLoading({
        title: '提交中',
        mask: true
    })
    const res:any = await RequestApi.ResHpv(submitData)
    if(res.statusCode == 200) {
        uni.hideLoading()
        uni.redirectTo({
            url:'/pages/my-service/hpv-view/index',
        })
    }
}
</script>

<style>
  @import url('../../common-style/form.css');
  page{
    background-color: #fafafa;
  }
  .hpv-choose {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom:40rpx;
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
  .hpv-price{
    font-weight: bold;
    color: #ff5f2c;
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