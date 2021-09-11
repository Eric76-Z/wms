<template>
  <div id="findzjp">
    <van-image fit="contain" :src="require('../../assets/img/wechat.jpg')" />
  </div>
</template>

<script>
import { toRef } from "vue";
// // import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "FindZjp",
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "联系作者",
      isShow: [true, true, true],
    };
    return {};
  },
};
</script>

<style lang="scss">
#findzjp {
  .van-image {
    width: 100%;
    height: 100%;
  }
}
</style>
