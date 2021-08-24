<template>
  <profile-login :isLogin="isLogin" :userinfo="userinfo"></profile-login>
  <profile-logout :isLogin="isLogin"></profile-logout>
</template>

<script>
import { computed, toRef } from "vue";
import { useStore } from "vuex";
import ProfileLogin from "@/components/content/mainuser/ProfileLogin";
import ProfileLogout from "@/components/content/mainuser/ProfileLogout";

export default {
  name: "Profile",
  components: {
    ProfileLogin,
    ProfileLogout,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "用户",
      isShow: [false, true, false],
    };
    const userinfo = toRef(store.state.user, "userinfo").value;
    const userState = toRef(store.state.user, "userState");
    const isLogin = computed(() => {
      if (userState.value === 200) {
        return true;
      } else {
        return false;
      }
    });
    return {
      isLogin,
      userinfo,
    };
  },
};
</script>

<style lang="scss"></style>
