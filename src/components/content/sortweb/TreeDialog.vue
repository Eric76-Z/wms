<template>
  <div id="treedialog">
    <van-popup
      :show="popupcfg.show"
      round
      close-on-click-overlay
      closeable
      :click-overlay="popupcfg.clickOverlay"
    >
      <van-form @submit="formData.onSubmit">
        <van-cell-group inset>
          <!-- 输入任意文本 -->
          <van-field
            v-model="formData.type_name"
            name="type_name"
            label="文本"
          />
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            v-model="formData.type_layer"
            name="type_layer"
            type="digit"
            label="手机号"
          />
        </van-cell-group>
        <van-button type="primary" native-type="submit">确认添加</van-button>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  name: "TreeDialog",
  setup(context) {
    const popupcfg = reactive({
      show: false,
      data: {
        type_name: "",
        type_layer: "",
      },
      click: {
        showPopup: () => {
          context.emit("showPopup", popupcfg.show);
        },
        clickOverlay: () => {
          popupcfg.show = false;
        },
      },
    });
    const formData = reactive({
      type_name: "",
      type_layer: "",
      onSubmit: (val) => {
        console.log(val);
      },
    });
    // 提交表单
    const submitForm = () => {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(this.form));
          if (this.isEdit) {
            this.$emit("editData", formData);
          } else {
            // 设置新创建节点的父级编号
            formData.parentId = this.parentId ? this.parentId : "";
            // 随机生成id(仅为前端模拟使用，正常场景应为后台生成)
            formData.id = Math.random();
            this.$emit("addData", formData);
          }
          this.closeDialog();
        }
      });
    };
    return {
      submitForm,
      popupcfg,
      formData,
    };
  },
};
</script>
<style lang="scss">
#treedialog {
  .van-popup {
    padding: 16px 16px;
  }
}
</style>
