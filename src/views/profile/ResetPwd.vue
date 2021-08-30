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
          v-model="state.email"
          name="email"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
        />

        <van-field
          v-model="state.code.value"
          name="code"
          type="number"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click="state.code.sendCode"
              :disabled="state.code.btnDisabled"
              >{{ state.code.btnText }}</van-button
            >
          </template>
        </van-field>

        <van-field
          v-model="state.password"
          name="password"
          label="新密码"
          placeholder="新密码"
          :rules="[{ required: true, message: '请填写新密码' }]"
        />
        <van-field
          v-model="state.password1"
          type="password"
          name="password1"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '确认密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit">
          确认
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reactive, toRef, computed } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCountDown } from "@vant/use";
import { getCode } from "@/network/sort.js";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    const user = toRef(store.state, "user");
    navbarcfg.value.mainnavbarcfg = {
      title: "重置密码",
      isShow: [true, true, true],
    };
    const userinfo = toRef(store.state.user, "userinfo").value;
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;

    //倒计时
    const countDown = useCountDown({
      // 倒计时 60 S
      time: 5 * 1000,
      onFinish: () => {
        countDown.reset();
        state.code.countDownState = "origin";
      },
    });
    const state = reactive({
      email: "",

      code: {
        value: "",
        countDownState: "origin",
        btnText: computed(() => {
          if (state.code.countDownState == "origin") {
            return "发送验证码";
          } else {
            return countDown.current.value.seconds + " s";
          }
        }),
        btnDisabled: computed(() => {
          if (state.code.countDownState == "origin") {
            return false;
          } else {
            return true;
          }
        }),
        sendCode: () => {
          getCode({
            userId: user.value.userinfo.userId,
            email: state.email,
          });
          countDown.start();
          state.code.countDownState = "start";
          state.code.btnDisabled = true;
        },
      },
      password: "",
      password1: "",
    });
    if (store.state.user.userState == 200) {
      return user.value.userinfo.email;
    }
    const onSubmit = (values) => {
      values.action = "login";
      userChangeState(values);
      // .then(() => {

      // })
      // .catch((err) => {
      //   console.log(err);
      // });
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
