<script setup lang="ts">
import { onLaunch } from "@dcloudio/uni-app";
onLaunch(() => {
  let get_Menu = uni.getStorageSync('MenuButton')
  if(!get_Menu){
    const res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('MenuButton', res)
  }
})
wx.cloud.init({
    env: 'userprofile-6g1j4o2xc6d5eeef',
    traceUser:true
})
</script>
<style></style>
