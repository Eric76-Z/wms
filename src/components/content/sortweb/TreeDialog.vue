<template>
  <div id="treedialog">
    <van-dialog
      v-model:show="dialogcfg.show"
      :title="dialogcfg.data.title"
      show-cancel-button
      overlay
      confirm-button-text="提交"
      @confirm="formData.click.confirm"
    >
      <van-form @submit="formData.click.onSubmit">
        <van-cell-group inset>
          <!-- 输入任意文本 -->
          <van-field
            v-model="formData.data.type_name"
            name="type_name"
            label="文本"
          />
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            v-model="formData.data.type_layer"
            name="type_layer"
            type="digit"
            label="层级"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>
  </div>
</template>
<script>
import { Toast } from "vant";
import { nextTick, reactive } from "vue";
import { createSort, partupSort } from "@/network/sort.js";

export default {
  name: "TreeDialog",
  setup(props, context) {
    const formData = reactive({
      data: {
        id: 0,
        type_name: "",
        type_layer: "",
        f_type_id: 0,
      },
      click: {
        onSubmit: (val) => {
          console.log(val);
        },
        confirm: () => {
          if (dialogcfg.data.isEdit == false) {
            createSort({
              type_name: formData.data.type_name,
              type_layer: formData.data.type_layer,
              f_type_id: formData.data.f_type_id,
            }).then((res) => {
              context.emit("addData", res);
            });
          } else {
            partupSort({
              id: formData.data.id,
              type_name: formData.data.type_name,
              type_layer: formData.data.type_layer,
              f_type_id: formData.data.f_type_id,
            }).then((res) => {
              context.emit("editData", res);
            });
          }
        },
      },
    });
    const dialogcfg = reactive({
      show: false,
      data: {
        type_name: "",
        type_layer: "",
        isEdit: false,
        parentId: "",
        data: {},
        title: "",
      },
      click: {
        showDialog: (isEdit, data, treeData) => {
          console.log(treeData);
          let disable = false;
          let childrenLen =
            data.children.length < 9
              ? "0" + (data.children.length + 1)
              : data.children.length + 1;

          switch (data.Lv.curr) {
            case 1:
              console.log(data.Lv.Lv1 + childrenLen + "00");
              formData.data.type_layer = data.Lv.Lv1 + childrenLen + "00";
              break;
            case 2:
              formData.data.type_layer =
                data.Lv.Lv1 + data.Lv.Lv2 + childrenLen;
              break;
            case 3:
              if (isEdit == false) {
                disable = true;
              }

              break;
            default:
              formData.data.type_name = "";
              formData.data.type_layer = "";
              break;
          }

          if (disable == false) {
            dialogcfg.data.isEdit = isEdit;
            dialogcfg.data.parentId = data.parentId;
            dialogcfg.data.data = data;
            dialogcfg.data.title = isEdit ? "编辑" : "新增";
            dialogcfg.show = true;
            formData.data.f_type_id = data.id;
            formData.data.type_name = "";
            if (isEdit) {
              formData.data.id = data.id;
              formData.data.f_type_id = data.f_type_id;
              formData.data.type_layer = data.type_layer;
              formData.data.type_name = data.type_name;
              nextTick(() => {
                formData.data.type_name = data.label;
              });
            }
          } else {
            Toast.fail({
              message: "不支持第四层创建",
              duration: 500,
            });
          }
        },
        addDialog: (data) => {
          let Lv1 =
            data.length < 10
              ? "0" + (data.length + 1)
              : (data.length + 1).toString();
          formData.data.type_name = "";
          formData.data.type_layer = Lv1 + "0000";
          dialogcfg.show = true;
        },
        clickOverlay: () => {
          dialogcfg.show = false;
        },
      },
    });

    return {
      dialogcfg,
      formData,
    };
  },
};
</script>
<style lang="scss">
#treedialog {
  .van-button {
    margin-left: 10px;
  }
  .van-popup {
    padding: 16px 16px;
  }
}
</style>
