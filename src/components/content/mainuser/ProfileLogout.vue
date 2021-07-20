<template>
  <div id="profilelogout" v-show="!isLogin">
    <div class="idicon">
      <!-- <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      /> -->
      <van-icon
        class="iconfont"
        class-prefix="icon"
        name="weidenglu"
      ></van-icon>
      <!-- <h1>未登录</h1> -->
    </div>
    <van-button type="success" size="large" to="/login">登录</van-button>
  </div>
</template>

<script>
// import { toRef } from "vue";

export default {
  name: "ProfileLogout",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    isLogin: {
      type: Boolean,
    },
    userinfo: {
      type: Object,
    },
  },
  setup() {
    // const isLogin = toRef(props, "isLogin");
    // const userinfo = toRef(props, "userinfo");
    return {};
  },
};
</script>

<style lang="scss" scoped>
#profilelogout {
  .idicon {
    // margin: 0 auto;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid $border-solid;
    background-color: #fff;
    .iconfont {
      font-size: 8rem;
    }
  }
}
</style>
