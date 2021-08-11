<template>
  <div id="userinfo">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-cell-group>
      <van-cell
        title="用户名"
        :value="userinfocfg.data.userinfo.username"
        is-link
      />
      <van-cell
        title="实名-姓"
        :value="userinfocfg.data.userinfo.lastname"
        is-link
      />
      <van-cell
        title="实名-名"
        :value="userinfocfg.data.userinfo.firstname"
        is-link
      />
      <van-cell title="手机" :value="userinfocfg.data.phonenum" is-link />
      <van-cell title="邮箱" :value="userinfocfg.data.email" is-link />
      <van-cell class="role" title="角色" :value="userinfocfg.groups" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { reactive, toRef, computed } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "UserInfo",
  data() {
    return {
      navbarcfg: {
        title: "用户-信息编辑",
        isShow: [true, true, true],
      },
    };
  },
  setup() {
    const store = useStore();
    // const router = useRouter();
    const user = toRef(store.state, "user").value;
    console.log(user);
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    const state = reactive({
      username: "",
      password: "",
    });
    const userinfocfg = reactive({
      data: user,
      groups: computed(() => {
        console.log(userinfocfg.data.userinfo.groups.length);
        if (userinfocfg.data.userinfo.groups.length == 1) {
          return userinfocfg.data.userinfo.groups[0];
        } else if (
          userinfocfg.data.userinfo.groups.length != 0 &&
          userinfocfg.data.userinfo.groups.length >= 1
        ) {
          return userinfocfg.data.userinfo.groups.toString();
        } else {
          return "";
        }
      }),
    });
    const onSubmit = (values) => {
      values.action = "login";
      userChangeState(values);
      // .then(() => {

      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    };
    return {
      state,
      onSubmit,
      userinfocfg,
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss">
#userinfo {
  .role {
    .van-cell__value {
      flex: 3;
    }
  }
}
</style>
