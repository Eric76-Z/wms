<template>
  <van-sidebar v-model="active" @change="onChange">
    <van-sidebar-item
      v-for="(item, index) in sidebarcfg.titles"
      :key="index"
      :title="item"
    />
  </van-sidebar>
</template>

<script>
import { ref } from "vue";
export default {
  name: "MainSideBar",
  data() {
    return {};
  },
  props: {
    sidebarcfg: {
      type: Object,
    },
  },
  setup() {
    const active = ref(0);
    const onChange = (index) => console.log(`标签名 ${index + 1}`);
    return {
      active,
      onChange,
    };
  },
};
</script>

<style></style>
