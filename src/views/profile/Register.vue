<template>
  <div id="register">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="确认密码"
          placeholder="请再次输入密码确认"
          :rules="[{ required: true, message: '请再次输入密码确认' }]"
        />
        <van-field
          v-model="state.email"
          type="email"
          name="email"
          label="邮箱"
          placeholder="请输入电子邮箱地址"
          :rules="[{ required: true, message: '请输入电子邮箱地址' }]"
        />
        <van-field
          v-model="state.phonenum"
          type="tel"
          name="phonenum"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <router-link to="/login" class="to-login">直接登陆</router-link>
        <van-button round block type="success" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "Login",
  data() {
    return {
      navbarcfg: {
        title: "用户注册",
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
.to-login {
  position: relative;
  display: block;
  margin-bottom: 2px;
  left: 10%;
}
</style>
