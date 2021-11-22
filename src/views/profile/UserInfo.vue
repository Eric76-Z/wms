<template>
  <div id="userinfo">
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
        :value="userinfocfg.role"
        is-link
        @click="userinfocfg.changeRole"
      />
      <van-cell
        class="class"
        title="班组"
        :value="userinfocfg.class"
        is-link
        @click="userinfocfg.changeClass"
        v-if="userinfocfg.show.class"
      />
      <van-cell
        class="area"
        title="区域"
        :value="userinfocfg.area"
        is-link
        @click="userinfocfg.changeArea"
        v-if="userinfocfg.show.class"
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
      <van-cell-group>
        <van-field
          v-model="userinfocfg.popup.value"
          :label="userinfocfg.popup.title"
          :focus="userinfocfg.popup.focus"
          placeholder="点击输入..."
        />
      </van-cell-group>
    </van-popup>
    <van-popup v-model:show="pickercfg.show" position="bottom">
      <van-picker
        :title="pickercfg.title"
        :default-index="pickercfg.default"
        :columns="pickercfg.columns"
        @confirm="pickercfg.confirm"
        @cancel="pickercfg.cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRef, computed, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { innerArry } from "@/common/utils";
import { userGroupLocalMap, userGroupRoleMap } from "@/common/constant";
// import { partupUser } from "@/network/sort.js";
import { Toast } from "vant";

export default {
  name: "UserInfo",

  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "用户-信息编辑",
      isShow: [true, true, true],
    };
    const {
      "user/userChangeState": [userChangeState],
    } = store._actions;
    // const router = useRouter();
    const user = toRef(store.state, "user").value;
    const state = reactive({
      username: "",
      password: "",
    });
    const userinfocfg = reactive({
      data: user,
      groups: computed(() => {
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
      class: computed(() => {
        for (const iterator of userinfocfg.data.userinfo.groups) {
          if (userGroupLocalMap["A班"] == iterator) {
            return "A班";
          } else if (userGroupLocalMap["B班"] == iterator) {
            return "B班";
          }
        }
        return "未选";
      }),
      area: computed(() => {
        let Lv1 = "null";
        let Lv2 = "null";
        for (const iterator of userinfocfg.data.userinfo.groups) {
          switch (iterator) {
            case userGroupLocalMap["CPH2.1"]:
              Lv1 = "CPH2.1";
              break;
            case userGroupLocalMap["CPH2.2"]:
              Lv1 = "CPH2.2";
              break;
            case userGroupLocalMap["UB"]:
              Lv2 = "UB";
              break;
            case userGroupLocalMap["AB"]:
              Lv2 = "AB";
              break;
            case userGroupLocalMap["ABT"]:
              Lv2 = "ABT";
              break;
            case userGroupLocalMap["ST"]:
              Lv2 = "ST";
              break;
            case userGroupLocalMap["装配"]:
              Lv2 = "装配";
              break;
            case userGroupLocalMap["调整"]:
              Lv2 = "调整";
              break;
            default:
              break;
          }
        }
        return Lv1 + "-" + Lv2;
      }),
      role: computed(() => {
        for (const iterator of userinfocfg.data.userinfo.groups) {
          switch (iterator) {
            case userGroupRoleMap["维修技术员"]:
              return "维修技术员";
            case userGroupRoleMap["维修工长"]:
              return "维修工长";
            case userGroupRoleMap["维修班长"]:
              return "维修班长";
            case userGroupRoleMap["维修工"]:
              return "维修工";
            default:
              return "";
          }
        }
        return "";
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
      changeClass: () => {
        pickercfg.title = "更改班组";
        pickercfg.columns = ["A班", "B班"];
        pickercfg.mode = "class";
        pickercfg.show = true;
      },
      changeArea: () => {
        pickercfg.title = "更改区域";
        pickercfg.columns = [
          { values: ["CPH2.1", "CPH2.2"], defaultIndex: 0 },
          {
            values: ["UB", "AB", "ABT", "ST", "装配", "调整"],
            defaultIndex: 0,
          },
        ];
        pickercfg.mode = "area";
        pickercfg.show = true;
      },
      changeRole: () => {
        pickercfg.title = "更改角色";
        pickercfg.columns = ["维修技术员", "维修工长", "维修班长", "维修工"];
        pickercfg.mode = "role";
        pickercfg.show = true;
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
      show: {
        class: computed(() => {
          // 经理
          return !innerArry(user.userinfo.groups, [1, 2, 3], false);
        }),
        area: computed(() => {
          // 经理
          return !innerArry(user.userinfo.groups, [1, 2, 3], false);
        }),
      },
    });
    const pickercfg = reactive({
      show: false,
      mode: "class",
      title: "",
      columns: [],
      default: computed(() => {
        if (userinfocfg.class == "B班") {
          return 1;
        } else {
          return 0;
        }
      }),
      confirm: (val) => {
        if (pickercfg.mode == "class") {
          user.userinfo.groups.remove(userGroupLocalMap["A班"]);
          user.userinfo.groups.remove(userGroupLocalMap["B班"]);
          user.userinfo.groups.push(userGroupLocalMap[val]);
          userinfocfg.params.groups = user.userinfo.groups;
          userChangeState(userinfocfg.params).then(() => {
            pickercfg.show = false;
          });
        } else if (pickercfg.mode == "area") {
          user.userinfo.groups.remove(userGroupLocalMap["UB"]);
          user.userinfo.groups.remove(userGroupLocalMap["AB"]);
          user.userinfo.groups.remove(userGroupLocalMap["ABT"]);
          user.userinfo.groups.remove(userGroupLocalMap["ST"]);
          user.userinfo.groups.remove(userGroupLocalMap["装配"]);
          user.userinfo.groups.remove(userGroupLocalMap["调整"]);
          user.userinfo.groups.push(userGroupLocalMap[val[0]]);
          user.userinfo.groups.push(userGroupLocalMap[val[1]]);
          userinfocfg.params.groups = user.userinfo.groups;
          userChangeState(userinfocfg.params).then(() => {
            pickercfg.show = false;
          });
        } else if (pickercfg.mode == "role") {
          user.userinfo.groups.remove(userGroupRoleMap["维修技术员"]);
          user.userinfo.groups.remove(userGroupRoleMap["维修工长"]);
          user.userinfo.groups.remove(userGroupRoleMap["维修班长"]);
          user.userinfo.groups.remove(userGroupRoleMap["维修工"]);
          user.userinfo.groups.push(userGroupRoleMap[val]);
          userinfocfg.params.groups = user.userinfo.groups;
          userChangeState(userinfocfg.params).then(() => {
            pickercfg.show = false;
          });
        }
      },
      cancel: () => {
        pickercfg.show = false;
      },
    });
    onMounted(() => {
      if (user.userinfo.last_name == "" || user.userinfo.first_name == "") {
        Toast.fail({
          message: "请实名！",
          duration: 1000,
        });
      }
    });
    return {
      state,
      userinfocfg,
      pickercfg,
    };
  },
};
</script>

<style lang="scss">
#userinfo {
  .group {
    .van-cell__value {
      flex: 3;
    }
  }
  .van-popup {
    background-color: var(--van-gray-1);
  }
}
</style>
