<template>
  <div id="login">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive } from "vuex";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "Login",
  data() {
    return {
      navbarcfg: {
        title: "用户登录",
        isShow: [true, true, true],
      },
    };
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
    });
    const onSubmit = (values) => {
      console.log("submit", values);
    };

    return {
      state,
      onSubmit,
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
