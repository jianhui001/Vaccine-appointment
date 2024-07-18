<template>
    <view class="details-Top" v-for="(item, index) in phy_detail" :key="index">
        <image
            :src="item.image"
            mode="aspectFill"
        />
        <view class="details-price">
            <text>¥ {{item.price}}</text>
            <text>已约 {{item.sales}}</text>
        </view>
        <text class="details-Title">{{item.title}}</text>
    </view>
    <view class="nucleic-time">
        <text class="nucleic-Title">体检时间选择</text>
        <scroll-view scroll-x class="scroll-view_H">
            <view class="nucleic-time-flex">
                <block v-for="(item, index) in phy_detail" :key="index">
                    <view class="nucleic-time-flex" 
                    v-for="(item1, index1) in item.date" :key="index1"
                    :class="timeIndex == index1 ? 'checkstyle' : ''"
                    @click="timeIndex = index1, Data.phy_time = item1.date">
                        <text>{{item1.date}}</text>
                        <text>{{item1.week}}</text>
                    </view>
                </block>
            </view>
        </scroll-view>
    </view>
    <view class="nucleic-time">
        <text class="nucleic-Title">适用人群</text>
        <view class="nucleic-crowd">
            <block v-for="(item, index) in phy_detail" :key="index">
                <view v-for="(item_a, index_a) in item.crowd" :key="index_a">
                    <image :src="item_a.image" mode="aspectFill" />
                    <text>{{item_a.name}}</text>
                </view>
            </block>
        </view>
    </view>
    <view class="nucleic-time">
        <view class="nucleic-Title">套餐项目</view>
        <view class="project-view" v-for="(item, index) in phy_detail" :key="index">
            <block v-for="(item_a, index_a) in item.project" :key="index_a">
                <text class="project-Title">{{item_a.title}}</text>
                <view class="project-card" v-for="(item_b, index_b) in item_a.content" :key="index_b">
                    <view>{{item_b.thing}}</view>
                    <view>{{item_b.details}}</view>
                </view>
            </block>
        </view>
    </view>
    <view style="height:300rpx"></view>
    <view class="Total-view">
        <text v-if="phy_detail.length > 0">检测费用：¥{{phy_detail[0].price}}</text>
        <text @click="selectMember">选择成员</text>
    </view>
    <SeMember ref="compNone"></SeMember>
</template>

<script setup lang="ts">
import { RequestApi } from "@/public/request";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from 'vue';
import type {Phydetail} from '@/public/decl-type'
import SeMember from '@/com-components/se-member.vue'
import type {Event} from '@/com-components/se-member.vue'

type Resdata = {
    data: {data: Phydetail[]}
}

let phy_detail = ref<Phydetail[]>([])
onLoad(async (event:any) => {
    let eventData:{title:string, id:string} = event
    const res = await RequestApi.PhyDetail({id:event.id}) as Resdata
    phy_detail.value = res.data.data
    Data.phy_name = eventData.title
})
let timeIndex = ref(-1)

let Data = reactive<Event>({
    phy_name:'',
    phy_time:'',
    show:true
})
let compNone = ref()
function selectMember() {
    compNone.value.trigger(Data)
}
</script>

<style>
@import url('../../common-style/form.css');
@import url('../../common-style/nucleic-time.css');
page {
    background-color: #fafafa;
}
.details-Top {
    background-color: #fff;
}
.details-Top image{
    width: 100%;
    height: 400rpx;
    display: block;
}
.details-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
}
.details-price text:nth-child(1) {
    font-size: 35rpx;
    font-weight: bold;
    color: #ff5f2c;
}
.details-Title {
    display: block;
    font-weight: bold;
    font-size: 35rpx;
    padding: 0 20rpx 20rpx;
}
.nucleic-time{
    background-color: #fff;
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 20rpx;
}
.nucleic-Title {
    font-weight: bold;
}
.scroll-view_H {
    white-space: nowrap;
    margin-top: 20rpx;
}
.nucleic-time-flex {
    display: flex;
    align-items: center;
}
.nucleic-time-flex view {
    display: flex;
    align-items: center;
    margin-right: 20rpx;
    padding: 10rpx 20rpx;
    border-radius: 10rpx;
    flex-direction: column;
}
.checkstyle {
    background-color: #2c76ef !important;
    color: #ffffff !important;
}
.nucleic-crowd {
    display: flex;
    justify-content: space-between;
    padding-top: 20rpx;
}
.nucleic-crowd view {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.nucleic-crowd image {
    width: 100rpx;
    height: 100rpx;
    display: block;
    margin-bottom: 10rpx;
    border-radius: 10rpx;
}
/* .project-view {
    margin: 20rpx 0;
} */
.project-Title {
    font-weight: bold;
    display: block;
    text-align: center;
    background-color: #f0f2f8;
    border-radius: 10rpx;
    padding: 20rpx 0;
    margin: 20rpx 0;
}
.project-card {
    display: flex;
    flex-wrap: wrap;
}
.project-card view{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f8;
    border-radius: 10rpx;
    margin: 5rpx;
    padding: 20rpx 10rpx;
}
.project-card view:nth-child(1) {
    width: 200rpx;
    margin-left: auto;
}
.project-card view:nth-child(2) {
    flex: 1;
    margin-right: auto;
}
</style>