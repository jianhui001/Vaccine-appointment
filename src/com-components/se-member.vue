<template>
    <page-container :show="submitData.show" @enter="onEnter" @clickoverlay="submitData.show = false">
        <view class="popups">
            <text class="popups-title">选择成员</text>
            <view class="member-view">
                <image
                    src="/static/other/touxiang.svg"
                    mode="widthFix"
                />
                <text>{{name}}</text>
                <text @click="choosePatient">{{name == '' ? '选择就诊人' : '重新选择'}}</text>
            </view>
            <view class="select-submit" @click="subMit">提交预约</view>
        </view>
    </page-container>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {myData} from '@/store/index'
import {RequestApi} from '@/public/request'
export interface Event{
    phy_name:string;
    phy_time:string;
    show:boolean
}

let submitData = reactive({
    phy_name:'',
    phy_time:'',
    show:false,
    patient_id:''
  })

function onEnter(){
    console.log('11111',submitData.show)
}

function trigger(event:Event) {
    submitData.phy_name = event.phy_name
    submitData.phy_time = event.phy_time
    submitData.show = event.show
}
defineExpose({trigger})

let name = ref('')
const store = myData()
store.$subscribe((mutation, state) => {
    name.value = state.patient.name
    submitData.patient_id = state.patient._id
})

function choosePatient() {
    uni.navigateTo({
        url:"/pages/my-service/my-patient/my-patient"
    })
}

async function subMit(){
    uni.showLoading({title: '提交中',mask:true})
    const res = await RequestApi.ResPhy(submitData) as {statusCode:number}
    if(res.statusCode == 200) {
        uni.hideLoading()
        uni.redirectTo({
            url:"/pages/my-service/phy-exam/index"
        })
    }
}
</script>

<style>
.popups{
  height: 400rpx;
  width:100%;
  background-color: #ffffff;
}
</style>