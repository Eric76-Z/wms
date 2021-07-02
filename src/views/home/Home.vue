<template>
  <div id="home">
    <van-button plain type="primary">朴素按钮</van-button>
    <van-button plain type="primary">朴素按钮</van-button>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  // name: "Home",
  // data() {},
  components: {
    [Button.name]: Button,
  },
};
</script>

<style scoped></style>
