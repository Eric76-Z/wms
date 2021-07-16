<template>
  <main-nav-bar :navbarcfg="navbarcfg" />
  <div class="idicon">
    <van-image
      round
      width="5rem"
      height="5rem"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <h1>hasaiii</h1>
  </div>
  <van-cell title="用户信息" is-link value="编辑" />
  <van-cell title="联系作者" is-link value="编辑" />
  <van-button type="success" size="large" to="/login">登录</van-button>
  <van-button type="danger" size="large">退出登录</van-button>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "Profile",
  data() {
    return {
      navbarcfg: {
        title: "myproject-用户",
        isShow: [false, true, false],
      },
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss">
.idicon {
  // margin: 0 auto;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid $border-solid;
  background-color: #fff;
}
</style>
