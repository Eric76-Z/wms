<template>
  <div class="middlebar">
    <van-tabs v-model:active="active" animated>
      <van-tab v-for="index in 4" :title="'选项 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>

    <van-icon class="iconfont" class-prefix="icon" name="weidenglu" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MiddleBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    tabbars: {
      type: Object,
    },
  },
  setup() {
    const active = ref(0);
    return {
      active,
    };
  },
};
</script>

<style lang="scss" scoped>
.middlebar {
  .van-tabs {
    --van-tabs-line-height: 25px
    &:last-child {
      flex: 1;
    }
  }
  .icon {
    height: 25px;

  }
}
</style>
