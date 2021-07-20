<template>
  <main-nav-bar :navbarcfg="navbarcfg" />
  <profile-login :isLogin="isLogin" :userinfo="userinfo"></profile-login>
  <profile-logout :isLogin="isLogin"></profile-logout>
</template>

<script>
import { computed, toRef } from "vue";
import { useStore } from "vuex";
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
import ProfileLogin from "@/components/content/mainuser/ProfileLogin";
import ProfileLogout from "@/components/content/mainuser/ProfileLogout";

export default {
  name: "Profile",
  data() {
    return {
      navbarcfg: {
        title: "myproject-用户",
        isShow: [false, true, false],
      },
    };
  },
  setup() {
    const store = useStore();
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
  components: {
    MainNavBar,
    ProfileLogin,
    ProfileLogout,
  },
};
</script>

<style lang="scss"></style>
