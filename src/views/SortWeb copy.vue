<template>
  <div class="white-body-view">
    <el-button type="primary" @click="addNewRecord()">新增</el-button>
    <custom-tree
      ref="customTree"
      :tree-data="treeData"
      :tree-expand-all="treeExpandAll"
      :tree-node-key="treeNodeKey"
      @addItem="addTreeItem"
      @deleteItem="deleteTreeItem"
      @editItem="editTreeItem"
    />
    <!-- 地点弹窗 -->
    <place-dialog ref="placeDialog" @addData="addData" @editData="editData" />
  </div>
</template>
<script>
import { ElButton } from "element-plus";
import CustomTree from "@/components/content/sortweb/Tree";
import PlaceDialog from "@/components/content/sortweb/PlaceDialog";
export default {
  components: {
    CustomTree,
    PlaceDialog,

    ElButton,
  },

  data() {
    return {
      treeData: [],
      treeExpandAll: true,
      treeNodeKey: "id",
    };
  },

  created() {
    this.initTreeData();
  },

  methods: {
    // 初始化列表
    initTreeData() {
      this.treeData = [
        {
          children: [
            {
              children: [],
              name: "1楼",
              desc: "这是教学楼1楼",
              parentId: "1",
              id: "2",
            },
            {
              children: [],
              name: "2楼",
              desc: "这是教学楼1楼",
              parentId: "1",
              id: "3",
            },
            {
              children: [],
              name: "3楼",
              desc: "这是教学楼3楼",
              parentId: "1",
              id: "4",
            },
          ],
          name: "教学楼",
          parentId: "",
          id: "1",
        },
        {
          children: [
            {
              children: [],
              name: "办公1楼",
              desc: "这是办公楼",
              parentId: "5",
              id: "6",
            },
          ],
          name: "办公楼",
          parentId: "",
          id: "5",
        },
      ];
    },

    // 添加新记录
    addNewRecord() {
      this.$refs.placeDialog.openDialog(false);
    },

    // 新增表单数据
    addData(data) {
      // 新增树节点
      this.$refs.customTree.treeAddItem(data);
    },

    // 修改表单数据
    editData(data) {
      // 修改树节点
      this.$refs.customTree.treeEditItem(data);
    },

    // 增加树节点
    addTreeItem(data) {
      // 打开地点弹窗，设置默认父级节点
      this.$refs.placeDialog.openDialog(false, data.id);
    },

    // 删除树节点
    deleteTreeItem(data) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除树节点
          this.$refs.customTree.treeDeleteItem(data);
          // 提示
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 修改树节点
    editTreeItem(data) {
      // 打开地点编辑弹窗
      this.$refs.placeDialog.openDialog(true, data.parentId, data);
    },
  },
};
</script>
