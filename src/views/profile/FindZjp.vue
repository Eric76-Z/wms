<template>
  <div id="findzjp">
    <van-image fit="contain" :src="require('../../assets/img/wechat.jpg')" />
  </div>
</template>

<script>
// import { reactive, toRef, computed } from "vue";
// // import { useRouter } from "vue-router";
// import { useStore } from "vuex";

export default {
  name: "FindZjp",
  setup() {
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
