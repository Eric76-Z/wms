<template>
  <van-grid :column-num="3">
    <van-grid-item
      v-for="(value, key, index) in gridcfg.iconText"
      :key="index"
      icon="photo-o"
      :to="value[1]"
    >
      <van-icon
        class="iconfont"
        class-prefix="icon"
        :name="value[0]"
      ></van-icon>
      <span class="van-grid-item__text">{{ key }}</span>
    </van-grid-item>
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
  props: {
    gridcfg: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 30px;
}
</style>
