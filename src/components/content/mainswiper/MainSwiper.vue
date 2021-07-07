<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in swipercfg.images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  name: "MainSwiper",
  data() {
    return {};
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  props: {
    swipercfg: {
      type: Object,
    },
  },
  setup() {},
};
</script>

<style></style>
