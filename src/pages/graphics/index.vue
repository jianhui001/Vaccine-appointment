<template>
    <view class="graphics-back">
        <text class="graphics-Title">请详细描述你的病情</text>
        <textarea maxlength="300" placeholder="为了更好获得医生帮助,请尽可能详细描述病情" 
        placeholder-class="textarea-color"
        :auto-focus="true"
        />
    </view>
    <view class="graphics-back">
        <checkbox-group bindchange="checkboxChange">
          <label class="" >
              <checkbox value="" checked="true" color="#0176ff"/>需要医生指导用药
          </label>
        </checkbox-group>
    </view>
</template>

<script setup lang="ts">
    
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
</style>