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
          type="password"
          label="新密码"
          placeholder="新密码"
          :rules="[
            { required: true, message: '请填写新密码' },
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
          placeholder="确认密码"
          :rules="[
            { required: true, message: '确认密码' },
            {
              validator: form_reg.recheck_psw,
              message: '两次密码不一致',
            },
          ]"
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
import { getCode, resetPwd } from "@/network/sort.js";

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

    //倒计时
    const countDown = useCountDown({
      // 倒计时 60 S
      time: 59 * 1000,
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
          countDown.start();
          state.code.countDownState = "start";
          state.code.btnDisabled = true;
          getCode({
            email: state.email,
          });
        },
      },
      password: "",
      password1: "",
    });
    const form_reg = {
      password_reg1: /^.{6,12}$/,
      password_reg2: /^[^\u4e00-\u9fa5 ]{6,12}$/,
      recheck_psw: (val) => {
        return state.password === val;
      },
      phonenum_reg1: /^[1][3,4,5,7,8][0-9]{9}$/,
    };
    if (store.state.user.userState == 200) {
      return user.value.userinfo.email;
    }
    const onSubmit = (values) => {
      resetPwd(values).then((res) => {
        console.log(res);
      });
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
      form_reg,
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
