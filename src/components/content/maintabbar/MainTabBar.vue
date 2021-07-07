<template>
  <van-tabbar v-model="active" active-color="#10b47d">
    <van-tabbar-item
      v-for="(item, index) in tabbars"
      :key="index"
      :to="item.path"
      :icon="item.icon"
      route="true"
      fixed="true"
      placeholder="true"
    >
      <span>{{ item.title }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainTabBar",
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
  //监听路由变化
  watch: {
    $route(to) {
      let path = "/" + to.path.split("/")[1];
      this.activeTab(path);
    },
  },
  methods: {
    activeTab(path) {
      var index = this.tabbars.map((item) => item.path).indexOf(path);
      if (index != -1) {
        this.active = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar {
  border-top: solid 1px $border-solid;
  .van-tabbar-item {
    font-weight: 700;
  }
}
</style>
