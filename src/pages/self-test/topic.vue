<template>
    <view class="progress-box">
        <text>测评进度</text>
        <progress class="progress" :percent="percent" border-radius="40" stroke-width="9" color="#cce3ff" activeColor="#2d8dfe" :active="true" active-mode="forwards" duration="15"/>
        <text>{{add_to}}/{{ topic_length }}</text>
    </view>
    <view class="question">{{data.topic}}</view>
    <view class="topic-view">
        <view class="topic-Title">
            <text></text>
            <text>单选题</text>
        </view>
        <view class="totic" hover-class="hover-style" hover-stay-time="300"
        v-for="(item, index) in  data.options" :key="index"
        @click="choose(item.son_id)">{{item.title}}</view>
    </view>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs, watch} from 'vue'
import { onShow,onLoad } from "@dcloudio/uni-app";
import {RequestApi} from '@/public/request'
import type {Topic} from '@/public/decl-type'

let titleType = ref()
onLoad((event) => {
    let {type, name} = event as {type:string,name:string}
    titleType.value = type
    uni.setNavigationBarTitle({title: name})
})

interface Resdata{
    data: {data: Topic[]}
}
let topic_data = ref<Topic[]>([])
let topic_length = ref(0)
let each_question = reactive<{data: Topic}>({
    data: {
        topic: "",
        _id: "",
        options:[]
    }
})    
let {data} = toRefs(each_question)
onShow(async () => {
    add_to.value = 1
    index.value = 0
    percent.value = 0
    topic_id.value = []
    if(titleType.value == '001') {
        var res = await RequestApi.DepressionTopics() as Resdata
        console.log(res)
    }else if(titleType.value == '002') {
        var res = await RequestApi.PrematureTopics() as Resdata
    }else {
        var res = await RequestApi.InsomniaTopics() as Resdata
    }
    topic_data.value = res.data.data
    topic_length.value = res.data.data.length
    each_question.data = res.data.data[0]
})

let add_to = ref(1)
let index = ref(0)
let percent = ref(0)
let topic_id = reactive<{value: string[]}>({value:[]})

function choose(son_id: string) {
    index.value++
    if(index.value < topic_length.value) {
        add_to.value++
        percent.value = (100/topic_length.value) * add_to.value
    }
    topic_id.value.push(son_id)
    console.log('topicid',topic_id.value)
}

watch([index, topic_length], (newVal, oldVal) => {
    if(newVal[0] === newVal[1]) {
        let obj = JSON.stringify({type: titleType.value, topic_id: topic_id.value})
        uni.navigateTo({
            url: "/pages/self-test/result?value=" + obj
        })
    }
})
</script>

<style>
page{
    background: linear-gradient(to bottom,#d6e8ff 30%,#f2f7fb 55%, #f0f5f9 90%);
}
.progress-box{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20rpx;
}
.progress{
    flex: 1;
    padding: 0 40rpx;
}
.question {
    background-color: #fff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
}
.topic-view {
    background-color: #f3f8ff;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
    box-shadow: #d6e8ff 0px 0px 23rpx 5rpx;
}
.topic-Title {
    display: flex;
    align-items: center;
}
.topic-Title text:nth-child(1){
    width: 8rpx;
    height:27rpx;
    background-color: #0d7cff;
    display: block;
    margin-right: 10rpx;
}
.totic {
    background-color: #fff;
    padding: 40rpx 10rpx;
    margin: 20rpx 0;
    border-radius: 10rpx;
}
.hover-style {
    background-color: #ebf4ff;
    color: #298cff;
}
</style>