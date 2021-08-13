<template>
  <van-grid :column-num="gridcfg.columnNum">
    <van-grid-item
      v-for="(value, index) in gridcfg.iconText"
      :key="index"
      icon="photo-o"
      :to="value[2]"
    >
      <van-icon
        class="iconfont"
        class-prefix="icon"
        :name="value[1]"
      ></van-icon>
      <span class="van-grid-item__text">{{ value[0] }}</span>
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
