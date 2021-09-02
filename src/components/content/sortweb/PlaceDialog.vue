<template>
  <div>
    <el-dialog :title="title" v-model:visible="dialogVisible" width="50%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" resize="none" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button class="pull-right" type="primary" @click="submitForm()"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { ElDialog, ElForm, ElFormItem, ElButton, ElInput } from "element-plus";
export default {
  data() {
    return {
      dialogVisible: false,
      title: "",
      form: {
        name: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        desc: [{ required: false, message: "请输入描述", trigger: "blur" }],
      },
      isEdit: false,
      parentId: "",
      data: {},
    };
  },
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
  },
  methods: {
    /**
     * @description 打开弹窗
     * @param { Boolean } isEdit 是否是修改状态 true 修改 / false 新增
     * @param { String } parentId 父级id,新增时默认选中父级时使用
     * @param { Object } data 表单数据，编辑时使用
     */
    openDialog(isEdit, parentId, data) {
      this.isEdit = isEdit;
      this.parentId = parentId;
      this.data = data;
      this.title = isEdit ? "编辑" : "新增";
      this.initFormData();
      this.dialogVisible = true;
      if (this.isEdit) {
        this.$nextTick(() => {
          this.form = data;
        });
      }
    },

    // 初始化表单数据
    initFormData() {
      this.form = {
        name: "",
        desc: "",
      };
    },

    // 提交表单
    submitForm() {
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
    },

    // 关闭当前弹窗
    closeDialog() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped>
.pull-right {
  float: right;
}
</style>
