<template>
  <div id="userinfo">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-cell-group>
      <van-cell
        title="用户名"
        :value="userinfocfg.data.userinfo.username"
        is-link
        @click="userinfocfg.changeUserName"
      />
      <van-cell
        title="实名-姓"
        :value="userinfocfg.data.userinfo.last_name"
        is-link
        @click="userinfocfg.changeLastName"
      />
      <van-cell
        title="实名-名"
        :value="userinfocfg.data.userinfo.first_name"
        is-link
        @click="userinfocfg.changeFirstName"
      />
      <van-cell
        title="手机"
        :value="userinfocfg.data.userinfo.phonenum"
        is-link
        @click="userinfocfg.changePhonenum"
      />
      <van-cell
        title="邮箱"
        :value="userinfocfg.data.userinfo.email"
        is-link
        @click="userinfocfg.changeEmail"
      />
      <van-cell
        class="role"
        title="角色"
        :value="userinfocfg.groups"
        is-link
        @click="userinfocfg.changeGroups"
      />
    </van-cell-group>
    <van-popup
      v-model:show="userinfocfg.popup.show"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        :title="userinfocfg.popup.setTitle"
        left-text="取消"
        right-text="完成"
        @click-left="userinfocfg.popup.onClickLeft"
        @click-right="userinfocfg.popup.onClickRight"
      />
      <van-cell-group inset>
        <van-field
          v-model="userinfocfg.popup.value"
          :label="userinfocfg.popup.title"
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
// import { partupUser } from "@/network/sort.js";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import { Toast } from "vant";

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

      changeUserName: () => {
        userinfocfg.popup.show = true;
        userinfocfg.popup.value = userinfocfg.data.userinfo.username;
        userinfocfg.popup.currTarget = "username";
        userinfocfg.popup.title = "用户名";
      },
      changeLastName: () => {
        userinfocfg.popup.show = true;
        userinfocfg.popup.value = userinfocfg.data.userinfo.last_name;
        userinfocfg.popup.currTarget = "last_name";
        userinfocfg.popup.title = "姓";
      },
      changeFirstName: () => {
        userinfocfg.popup.show = true;
        userinfocfg.popup.value = userinfocfg.data.userinfo.first_name;
        userinfocfg.popup.currTarget = "first_name";
        userinfocfg.popup.title = "名字";
      },
      changePhonenum: () => {
        userinfocfg.popup.show = true;
        userinfocfg.popup.value = userinfocfg.data.userinfo.phonenum;
        userinfocfg.popup.currTarget = "phonenum";
        userinfocfg.popup.title = "手机号码";
      },
      changeEmail: () => {
        userinfocfg.popup.show = true;
        userinfocfg.popup.value = userinfocfg.data.userinfo.email;
        userinfocfg.popup.currTarget = "email";
        userinfocfg.popup.title = "邮箱";
      },
      changeGroups: () => {
        Toast({
          message: "通知管理员更改",
          duration: 1000,
        });
      },
      params: {
        id: computed(() => {
          return userinfocfg.data.userinfo.userId;
        }),
        action: "partup",
      },
      popup: {
        currTarget: "",
        title: "",
        setTitle: computed(() => {
          return "设置" + "-" + userinfocfg.popup.title;
        }),
        show: false,
        value: "",
        onClickLeft: () => {
          userinfocfg.popup.show = false;
        },
        onClickRight: () => {
          switch (userinfocfg.popup.currTarget) {
            case "username":
              userinfocfg.params.username = userinfocfg.popup.value;
              userChangeState(userinfocfg.params).then(() => {
                userinfocfg.popup.show = false;
                delete userinfocfg.params.username;
              });
              break;
            case "last_name":
              userinfocfg.params.last_name = userinfocfg.popup.value;
              userChangeState(userinfocfg.params).then(() => {
                userinfocfg.popup.show = false;
                delete userinfocfg.params.last_name;
              });
              break;
            case "first_name":
              userinfocfg.params.first_name = userinfocfg.popup.value;
              userChangeState(userinfocfg.params).then(() => {
                userinfocfg.popup.show = false;
                delete userinfocfg.params.first_name;
              });
              break;
            case "phonenum":
              userinfocfg.params.phonenum = userinfocfg.popup.value;
              userChangeState(userinfocfg.params).then(() => {
                userinfocfg.popup.show = false;
                delete userinfocfg.params.phonenum;
              });
              break;
            case "email":
              userinfocfg.params.email = userinfocfg.popup.value;
              userChangeState(userinfocfg.params).then(() => {
                userinfocfg.popup.show = false;
                delete userinfocfg.params.email;
              });
              break;
          }
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
