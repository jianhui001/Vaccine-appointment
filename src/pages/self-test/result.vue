<template>
    <view class="result-top">
        <text>结果分析</text>
        <text>本测试及结果由AI得出,仅供参考,不能作为诊断及诊疗的依据</text>
    </view>
    <view class="result-desc" v-for="(item, index) in testRes" :key="index">
        <view>{{item.scope}}：{{item.result}}</view>
        <view>{{item.suggest}}</view>
        <view class="bold">测评结果概述: </view>
        <view v-for="(item1, index1) in item.outline" :key="index1">{{ index1 + 1}}. {{ item1 }}</view>
        <block v-if="item.recommend.length > 0">
            <view class="bold">AI为你推荐以下科室</view>
            <view class="recommend" v-for="(item_a, index_a) in item.recommend" :key="index_a">
                <label>
                    <text class="bold">{{item_a.dep_name}}</text>
                    <text class="Hosp">{{item_a.hospital}}</text>
                </label>
                <label class="regi">去挂号</label>
            </view>
        </block>
    </view>
    <view class="exceed"></view>
    <view class="submit">
        <button plain="true" open-type="share">邀请朋友测一测</button>
        <button plain="true" @click="Cancel">再测一次</button>
    </view>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs, watch} from 'vue'
import { onShow,onLoad,onShareAppMessage } from "@dcloudio/uni-app";
import {RequestApi} from '@/public/request'
import type {Testres,Sharedata} from '@/public/decl-type'
import {TEST} from '@/public/testing'
let type_id = ref('')
let topicId = ref<string[]>([])
let testRes = ref<Testres[]>([])
interface Res{
  data:{data:Testres[]}
}
let share_data = ref<Sharedata[]>([])
onLoad((event: any) => {
    let {type, topic_id} = JSON.parse(event.value)
    topicId.value = topic_id
    share_data.value = TEST.filter(item => item.type == type)
})

onShow(async () => {
    if(type_id.value == '001'){//抑郁症
        var res = await RequestApi.DepressiSon({value:topicId.value}) as Res
    }else if(type_id.value == '002'){//男性功能
        var res = await RequestApi.PremaTure({value:topicId.value}) as Res
    }else{//失眠测评
        var res = await RequestApi.InsoMnia({value:topicId.value}) as Res
    }
    testRes.value = res.data.data 
    console.log(res)
})

onShareAppMessage(() => {
    return {
        title:share_data.value[0].share_title,
        path:share_data.value[0].share_path,
        imageUrl:share_data.value[0].share_url 
    }
})

function Cancel() {
    uni.navigateBack({
        delta:1
    })
}
</script>

<style>
page {
    background: -webkit-linear-gradient(top,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
}
.result-top {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
}
.result-top text:nth-child(1) {
    font-weight: bold;
    font-size: 35rpx;
    margin-bottom: 20rpx;
}
.result-desc {
    padding: 20rpx;
    margin: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
}
.result-desc view{
    margin-bottom: 20rpx;
    line-height: 1.5;
}
.result-desc view:nth-child(1) {
    font-size: 40rpx;
    font-weight: bold;
    color: #0d7cff;
}
.result-desc view:nth-child(2){
    color: #0d7cff;
  }
.submit {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 20rpx 0 68rpx 0rpx;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
}
.bold {
    font-weight: bold;
    display: block;
}
.recommend{
    background-color: #f4f7fa;
    border-radius: 10rpx;
    padding: 30rpx 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .Hosp{
    color: #bac5cc;
  }
  .regi{
    align-self: center;
    background-color: #0176ff;
    color: #ffffff;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
  }
  .exceed{
    height: 300rpx;
    background: #f0f5f9;
  }
.submit button {
    width: 40%;
    font-size: 33rpx;
    border: none;
}
.submit button:nth-child(1){
  background-color: #e8f2fe;
  color: #3a75f3;
}
.submit button:nth-child(2){
  background-color: #2c76ef;
  color: #ffffff;
}
</style>