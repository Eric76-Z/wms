<template>
  <div id="register">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="state.username"
          name="username"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[
            { required: true, message: '请填写用户名' },
            {
              pattern: form_reg.username_reg1,
              message: '用户名长度在2-10位之间',
            },
            {
              pattern: form_reg.username_reg2,
              message: '用户名由中文、英文、数字构成',
            },
          ]"
        />
        <van-field
          v-model="state.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[
            { required: true, message: '请填写密码' },
            {
              pattern: form_reg.password_reg1,
              message: '密码长度在6-12位之间',
            },
            {
              pattern: form_reg.password_reg2,
              message: '密码不能包含中文与空白字符',
            },
          ]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="确认密码"
          placeholder="请再次输入密码确认"
          :rules="[
            { required: true, message: '请再次输入密码确认' },
            {
              validator: form_reg.recheck_psw,
              message: '两次密码不一致',
            },
          ]"
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
          :rules="[
            { required: true, message: '请输入手机号' },
            {
              pattern: form_reg.phonenum_reg1,
              message: '手机号不正确',
            },
          ]"
        />
      </van-cell-group>
      <div class="formbtn">
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
    const form_reg = {
      username_reg1: /^.{2,10}$/,
      username_reg2: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
      password_reg1: /^.{6,12}$/,
      password_reg2: /^[^\u4e00-\u9fa5 ]{6,12}$/,
      recheck_psw: (val) => {
        return state.password === val;
      },
      phonenum_reg1: /^[1][3,4,5,7,8][0-9]{9}$/,
    };

    return {
      state,
      onSubmit,
      form_reg,
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss">
.formbtn {
  margin: 0 16px 16px 16px;
  .to-login {
    position: relative;
    display: block;
    margin: 6px auto;
    text-align: right;
    font-size: 15px;
    color: blue;
  }
}
</style>
