<template>
  <div id="profilelogin" v-show="isLogin">
    <div class="idicon">
      <van-image
        round
        width="5rem"
        height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <h1>{{ userinfo.username }}</h1>
    </div>
    <van-cell
      title="用户信息"
      is-link
      value="编辑"
      :to="{ name: 'userinfo' }"
    />
    <van-cell
      title="联系作者"
      is-link
      value="编辑"
      :to="{
        name: 'findzjp',
      }"
    />
    <van-button type="danger" size="large" @click="userLogout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
// import { reactive, toRef, computed } from "vue";
import { Dialog, Toast } from "vant";
import { useStore } from "vuex";

export default {
  name: "ProfileLogin",
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
    const store = useStore();
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    const userLogout = () => {
      Dialog.confirm({
        title: "退出登陆",
        message: "确认退出登陆？",
      })
        .then(() => {
          userChangeState({ action: "logout" }).then((res) => {
            Toast({
              message: "已退出登陆！",
              duration: 1000,
            });
            console.log(res);
          });
        })
        .catch(() => {
          Toast({
            message: "已取消！",
            duration: 1000,
          });
        });
    };
    return {
      userLogout,
    };
  },
};
</script>

<style lang="scss" scoped>
.idicon {
  // margin: 0 auto;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid $border-solid;
  background-color: #fff;
}
</style>
