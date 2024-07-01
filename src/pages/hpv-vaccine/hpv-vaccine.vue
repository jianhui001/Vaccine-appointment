<template>
    <div>AppContent</div>
</template>

<script setup lang="ts">
import {ref, OnMounted} from 'vue'
import {RequestApi} from '@/public/request'

onMounted(async() => {
    const res = await RequestApi.OtuHpv()
    console.log(res)
})
</script>
<style>

</style>