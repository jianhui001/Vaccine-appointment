<template>
    <view class="xinguan-view" v-for="(item, index) in order" :key="index">
        <text class="name">{{ item.name }}</text>
        <view class="xinguan-order">
            <text>接种人:</text>
            <text>{{item.name}}</text>
        </view>
        <view class="xinguan-order">
            <text>接种地点:</text>
            <text>{{item.address}}</text>
        </view>
        <view class="xinguan-order">
            <text>疫苗套餐:</text>
            <text>{{item.combo}} {{item.ino_time}}</text>
        </view>
        <view class="xinguan-order">
            <text>订单编号:</text>
            <text>{{item.order_number}}</text>
        </view>
        <view class="reg-price"><text>¥{{item.price}}</text></view>
        <view class="reg-cancel">
            <text :class="item.cancel ? '' : 'prevent_style'" @click="Cancel(item._id, index)">{{ item.cancel ? '取消预约' : '已取消预约' }}</text>
        </view>
    </view>

    <point :show="show"/>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {onShow} from "@dcloudio/uni-app"
import {RequestApi} from '@/public/request'
import type {Hpvorder} from '@/public/decl-type'
import point from '@/com-components/point.vue'

let order = ref<Hpvorder[]>([])
let show = ref(false)
onShow(async() => {
    const res:any = await RequestApi.HpvuserOrder()
    order.value = res.data.data
    if(res.data.data.length == 0){
        show.value = true
    }
})

async function Cancel(id:string, index:number) {
    const res:any = await RequestApi.HpvCancel({_id: id})
    if(res.statusCode == 200){
        order.value[index].cancel = false
    }
}
</script>

<style>
@import url('../../../common-style/vaccine.css');
</style>