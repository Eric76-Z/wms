<template>
  <div id="itemappeal">
    <main-nav-bar :navbarcfg="navbarcfg" />
    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
    <van-button plain hairline type="primary">细边框按钮</van-button>
  </div>
</template>

<script>
import MainNavBar from "@/components/content/mainnavbar/MainNavBar";

export default {
  name: "ItemAppeal",
  data() {
    return {
      navbarcfg: {
        title: "刀片订单-升速",
        isShow: [true, true, true],
      },
    };
  },
  components: {
    MainNavBar,
  },
};
</script>

<style lang="scss"></style>
