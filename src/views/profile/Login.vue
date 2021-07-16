<template>
  <div id="login">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-image
      round
      width="8rem"
      height="8rem"
      lazy-load
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
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
        <van-button round block type="success" native-type="submit">
          登陆
        </van-button>
        <div class="halfbtn">
          <van-button type="success" to="/register">注册</van-button>

          <van-button type="warning">忘记密码</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
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
    const store = useStore();
    console.log(store._actions);
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    const state = reactive({
      username: "",
      password: "",
    });
    const onSubmit = (values) => {
      userChangeState(state);
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
#login {
  text-align: center;
  .van-image {
    margin: 10px 0 15px 0;
  }
  .halfbtn {
    display: flex;
    margin-top: 5px;
    button {
      flex: 1;
      &:first-child {
        border-top-left-radius: 999px;
        border-bottom-left-radius: 999px;
        margin-right: 1px;
      }
      &:last-child {
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
        margin-left: 1px;
      }
    }
  }
}
</style>
