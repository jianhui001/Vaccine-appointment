<template>
    <view class="graphics-back">
        <text class="graphics-Title">请详细描述你的病情</text>
        <textarea maxlength="300" placeholder="为了更好获得医生帮助,请尽可能详细描述病情" 
        placeholder-class="textarea-color"
        :auto-focus="true"
        v-model="submitData.illness"
        />
    </view>
    <view class="graphics-back">
        <checkbox-group @change="checkboxChange">
          <label>
              <checkbox value="cd" :checked="submitData.guide" color="#0176ff"/>需要医生指导用药
          </label>
        </checkbox-group>
    </view>
    <view class="graphics-back">
        <text class="graphics-Title">上传检查报告或患处照片</text>
        <view class="pat-image">
            <view class="upload-Image" v-for="(item, index) in submitData.ins_report" :key="index">
                <image :src="item" mode="aspectFill"/>
                <image src="/static/other/shanchu-goods.svg" mode="widthFix"
                @click="submitData.ins_report.splice(index, 1)"/>
            </view>
            <view><image src="/static/other/shuxing-img.png" @click="upload" mode="aspectFill"></image></view>
        </view>
    </view>
    <view class="graphics-back">
        <text class="graphics-Title">选择就诊人</text>
        <view class="patient-view">
            <image
            src="/static/other/touxiang.svg"
            mode="widthFix"
            />
            <text>{{name}}</text>
            <text @click="choosePatient">{{name == '' ? '选择就诊人' : '重新选择'}}</text>
        </view>
    </view>
    <view style="height: 300rpx;"></view>
    <view class="submit">
        <text @click="canCel">取消</text>
        <text @click="subMit">提交</text>
    </view>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {uploadImage} from '@/public/misc'
import {IMAGEURL, RequestApi} from '@/public/request'
import type { Graphics } from '@/public/decl-type'
import {myData} from '@/store/index'

function checkboxChange(event: any) {
    // console.log('event', event)
    submitData.guide = event.detail.value.length === 0 ? false : true
}

async function upload() {
    const res: any = await uploadImage(IMAGEURL, '上传中','上传失败')
    submitData.ins_report.push(JSON.parse(res.data).data)
}

let submitData = reactive<Graphics>({
    illness:'',
    guide:false,
    ins_report:[],
    patient_id:''
})

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

function canCel(){
  uni.navigateBack({delta:1})
}

async function subMit() {
    uni.showLoading({title:'提交中',mask:true})
    const res:any = await RequestApi.GrapHics(submitData)
    if(res.statusCode == 200){
        uni.showToast({title: '提交成功',icon: 'none',duration: 1000});
    }
}
</script>

<style>
page {
    background-color: #fafafa;
}
.graphics-back {
    margin: 20rpx;
    padding: 20rpx;
    border-radius: 20rpx;
    background-color: #fff;
}
.graphics-Title {
    font-size: 35rpx;
    font-weight: bold;
    display: block;
    padding-bottom: 20rpx;
}
textarea {
    width: 100%;
    height: 250rpx;
}
.textarea-color {
    color: #00c8c8;
}
.pat-image {
    display: flex;
    flex-wrap: wrap;
}
.pat-image view{
    width: calc(33.3% - 5rpx*2);
    height: 200rpx;
    margin: 5rpx;
  }
.pat-image image {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 7rpx;
}
.upload-Image {
    position: relative;
}
.upload-Image image:nth-child(2) {
    width: 30rpx !important;
    height: 30rpx !important;
    position: absolute;
    top: 8rpx;
    right: 8rpx;
}
.patient-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.patient-view image {
    width: 120rpx;
    height: 120rpx;
}
.patient-view text:nth-child(2){
    flex: 1;
    padding: 0 50rpx;
    font-weight: bold;
}
.patient-view text:nth-child(3){
    color: #2c76ef;
}
.submit {
    background-color: #fff;
    padding: 20rpx 0 68rpx 0;
    display: flex;
    justify-content: space-around;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
}
.submit text {
    text-align: center;
    width: 40%;
    padding: 20rpx 0;
    border-radius: 10rpx;
}
.submit text:nth-child(1){
  background-color: #e8f2fe;
  color: #3a75f3;
}
.submit text:nth-child(2){
  background-color: #2c76ef;
  color: #ffffff;
}
</style>