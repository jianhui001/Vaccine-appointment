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
    <view class="graphics-back">
        <text class="graphics-Title">上传检查报告或患处照片</text>
        <view class="pat-image">
            <view class="upload-Image">
                <!-- <image
                    src="/static/other/shanchu-goods.svg"
                    mode="aspectFill"
                /> -->
                <image
                    src="/static/other/shanchu-goods.svg"
                    mode="widthFix"
                />
            </view>
        </view>
    </view>
    <view class="graphics-back">
        <view class="graphics-Title">选择就诊人</view>
        <view>
            <view class="patient-view">
                <image
                src="/static/other/touxiang.svg"
                mode="widthFix"
                />
                <text>{{ name }}</text>
                <text>选择就诊人</text>
            </view>
        </view>
    </view>
    <view style="height: 300rpx;"></view>
    <view class="submit">
        <text>取消</text>
        <text>提交</text>
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
.patient-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.patient-view image {
    width: 120rpx;
    height: 120rpx;
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