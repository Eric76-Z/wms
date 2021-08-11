<template>
  <div id="userinfo">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-cell-group>
      <van-cell
        title="用户名"
        :value="userinfocfg.data.userinfo.username"
        is-link
        @click="userinfocfg.popup.username.changeUserName"
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
    <van-popup
      v-model:show="userinfocfg.popup.username.showUserName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="设置用户名"
        left-text="取消"
        right-text="完成"
        @click-left="userinfocfg.popup.username.onClickLeft"
        @click-right="userinfocfg.popup.username.onClickRight"
      />
      <van-cell-group inset>
        <van-field
          v-model="userinfocfg.popup.username.value"
          label="用户名"
          placeholder="请输入用户名"
          :focus="userinfocfg.popup.focus"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRef, computed } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { partupUser } from "@/network/sort.js";
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
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    // const router = useRouter();
    const user = toRef(store.state, "user").value;
    console.log(user);
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
      popup: {
        username: {
          showUserName: false,
          isFoucs: false,
          changeUserName: () => {
            userinfocfg.popup.username.showUserName = true;
            console.log(userinfocfg.data.userinfo.username);
            userinfocfg.popup.username.value =
              userinfocfg.data.userinfo.username;
          },
          comValue: computed({
            get() {
              return userinfocfg.data.userinfo.username;
            },
            set(val) {
              userinfocfg.popup.value = val;
            },
          }),
          value: "",
          onClickLeft: () => {
            userinfocfg.popup.username.showUserName = false;
          },
          onClickRight: () => {
            partupUser({
              id: userinfocfg.data.userinfo.userId,
              username: userinfocfg.popup.username.value,
            }).then((res) => {
              console.log(res);
              res.action = "partup";
              userChangeState(res);
              userinfocfg.popup.username.showUserName = false;
            });
          },
        },
      },
    });
    return {
      state,
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
