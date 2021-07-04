<template>
  <van-grid :column-num="3">
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
  </van-grid>
  <van-grid :column-num="3">
    <van-grid-item icon="photo-o" text="文字" cl />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
  </van-grid>
  <van-grid :column-num="3">
    <van-grid-item icon="photo-o" text="文字" cl />
    <van-grid-item icon="photo-o" text="文字" />
    <van-grid-item icon="photo-o" text="文字" />
  </van-grid>
</template>

<script>
import { Grid, GridItem } from "vant";
export default {
  name: "MainGrid",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
};
</script>

<style lang="scss" scoped></style>
