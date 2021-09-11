<template>
  <div id="login">
    <van-image
      round
      width="8rem"
      height="8rem"
      lazy-load
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      v-show="haveIcon"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-icon
      class="iconfont"
      class-prefix="icon"
      name="weidenglu"
      v-show="!haveIcon"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="state.username"
          name="username"
          label="账号"
          placeholder="使用昵称/邮箱/手机号登陆"
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
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit">
          登陆
        </van-button>
        <div class="halfbtn">
          <van-button type="success" to="/register">注册</van-button>
          <van-button type="warning" to="/resetpwd">重置密码</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRef, computed } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "用户登录",
      isShow: [true, true, true],
    };
    const userinfo = toRef(store.state.user, "userinfo").value;
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    const state = reactive({
      username: "",
      password: "",
    });
    const onSubmit = (values) => {
      values.action = "login";
      userChangeState(values);
    };
    const haveIcon = computed(() => {
      if (userinfo.userIcon === "") {
        return false;
      } else {
        return true;
      }
    });
    return {
      state,
      onSubmit,
      haveIcon,
    };
  },
};
</script>

<style lang="scss">
#login {
  text-align: center;
  .van-image {
    margin: 10px 0 15px 0;
  }
  .iconfont {
    font-size: 8rem;
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
