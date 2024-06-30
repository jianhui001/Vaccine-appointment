<template>
  <view class="Login-page">
    <image
      class="background-img"
      src="https://diancan-1252107261.cos.accelerate.myqcloud.com/yiliao/denglu-yemian.jpg"
      mode="aspectFill"
    />
    <view class="login-view">
      <button
        id="avatar-button"
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        <image
          class="avatar"
          :src="
            userInfo.avatar === ''
              ? '/static/other/photograph.svg'
              : userInfo.avatar
          "
          mode="aspectFill"
        />
      </button>
      <form class="form-submit" @submit="formSubmit">
        <input
          type="nickname"
          class="weui-input"
          name="input"
          placeholder="请输入昵称"
        />
        <button form-type="submit" id="new-button" class="submit-button" @click="submit">
          登录
        </button>
      </form>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue';
// @ts-ignore
import { nullCheck, uploadImage } from '@/api/from-check';
// @ts-ignore
// import {uploadImage} from '@/api/public'
import { RequestApi } from '@/public/request';
const userInfo = reactive({
  avatar: '',
  nickname: '',
});

function onChooseAvatar(event: any) {
  userInfo.avatar = event.detail.avatarUrl;
}
const loading = ref(false);

const db = wx.cloud.database();
async function formSubmit(event: any) {
  userInfo.nickname = event.detail.value.input;
  // console.log('event.detail.value', event.detail.value);
  nullCheck(userInfo.avatar, '请上传头像');
  nullCheck(userInfo.nickname, '请填写昵称');
  // 头像上传云存储
  loading.value = true;
  const avatarUrl = await uploadImage(userInfo.avatar, 'user-info/');
  // 提交数据库,查询是否已有，有则更新
  const userInfoDb = await db.collection('user-info').get();
  if (userInfoDb.data.length <= 0) {
    await db
      .collection('user-info')
      .add({ data: { avatar: avatarUrl, nickname: userInfo.nickname } });
    const newUserInfoDb = await db.collection('user-info').where({}).get();
    uni.setStorageSync('userinfo', newUserInfoDb.data[0]);
  } else {
    await db
      .collection('user-info')
      .doc(userInfoDb.data[0]._id)
      .update({ data: { avatar: avatarUrl, nickname: userInfo.nickname } });
    const newUserInfoDb = await db.collection('user-info').where({}).get();
    uni.setStorageSync('userinfo', newUserInfoDb.data[0]);
  }
  loading.value = false;
}

function submit() {
  uni.login({
    success: (code) => {
      uni.showLoading({ title: '登录中', mask: true });
      ApiLogin(userInfo.avatar, userInfo.nickname, code.code)
    },
    fail: (err) => {
        uni.showToast({title: '登录失败',icon: 'none',duration: 1000,});
    },
  });
}
async function ApiLogin(avatarUrl: string, nickName:string, code: string){
    try {
      let obj = {appid: 'wxda4a07b8e26488d1', secret: '67533e22c1abd2db309acccc27b29ffc',avatarUrl, nickName, code}
      let res:any = await RequestApi.WxLogin(obj)
      uni.setStorageSync('wxuser', res.data.data)
      setTimeout(() => {
          uni.navigateBack({delta: 1})
          uni.hideLoading()
      }, 600)
    } catch (error) {
      uni.showToast({title: '登录失败',icon: 'none',duration: 1000,})
    }
}
</script>

<style scoped>
.Login-page {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.Login-page .background-img {
  width: 100%;
  height: 100%;
}
/* #avatar-button{
    background-color: #2c76fe;
} */
#avatar-button {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.avatar {
  position: absolute;
  width: 150rpx;
  height: 150rpx;
  /* 第一种居中 */
  /* transform:translate(-50%,-50%); */
  /* top: 50% */
  /* 第二种居中 */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.form-submit {
  width: 1005;
}
.login-view {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 30%;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.weui-input {
  padding: 20rpx;
  margin: 20rpx;
  border-bottom: 1rpx solid #f2f2f2;
}
.submit-button {
  margin: 55rpx 20rpx 0 20rpx;
  background-color: #2c76fe;
  color: #fff;
  font-size: 35rpx;
}
</style>
