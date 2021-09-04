<template>
  <div class="white-body-view">
    <van-button type="primary" @click="operatecfg.addNewRecord" block
      >新增</van-button
    >
    <custom-tree
      ref="customTree"
      :tree-data="treecfg.treeData"
      :tree-expand-all="treecfg.treeExpandAll"
      :tree-node-key="treecfg.treeNodeKey"
      @addItem="operatecfg.addTreeItem"
      @deleteItem="operatecfg.deleteTreeItem"
      @editItem="operatecfg.editTreeItem"
    />
    <!-- 地点弹窗 -->
    <tree-dialog
      ref="treeDialog"
      @addData="operatecfg.addData"
      @editData="operatecfg.editData"
    />
  </div>
</template>
<script>
import { reactive, toRef, ref } from "vue";
import { useStore } from "vuex";
import CustomTree from "@/components/content/sortweb/Tree";
import TreeDialog from "@/components/content/sortweb/TreeDialog";
import { listSort, deleteSort } from "@/network/sort.js";
import { Dialog, Toast } from "vant";
export default {
  components: {
    CustomTree,
    TreeDialog,
  },
  setup() {
    const store = useStore();
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "分类模块",
      isShow: [true, true, true],
    };

    const treeDialog = ref(null);
    const treecfg = reactive({
      originData: [],
      treeData: [],
      treeExpandAll: false,
      treeNodeKey: "id",
    });

    const reMake = (data) => {
      for (const i of data) {
        const Lv1 = parseInt(i.type_layer.substring(0, 2));
        const Lv2 = parseInt(i.type_layer.substring(2, 4));
        const Lv3 = parseInt(i.type_layer.substring(4, 6));
        if (Lv3 == 0) {
          if (Lv2 == 0) {
            treecfg.treeData[Lv1 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
              f_type_id: i.f_type_id,
              Lv: {
                curr: 1,
                Lv1: i.type_layer.substring(0, 2),
                Lv2: i.type_layer.substring(2, 4),
                Lv3: i.type_layer.substring(4, 6),
              },
            };
          } else {
            treecfg.treeData[Lv1 - 1].children[Lv2 - 1] = {
              id: i.id,
              label: i.type_name,
              children: [],
              type_layer: i.type_layer,
              f_type_id: i.f_type_id,
              Lv: {
                curr: 2,
                Lv1: i.type_layer.substring(0, 2),
                Lv2: i.type_layer.substring(2, 4),
                Lv3: i.type_layer.substring(4, 6),
              },
            };
          }
        } else {
          treecfg.treeData[Lv1 - 1].children[Lv2 - 1].children[Lv3 - 1] = {
            id: i.id,
            label: i.type_name,
            type_layer: i.type_layer,
            f_type_id: i.f_type_id,
            children: [],
            Lv: {
              curr: 3,
              Lv1: i.type_layer.substring(0, 2),
              Lv2: i.type_layer.substring(2, 4),
              Lv3: i.type_layer.substring(4, 6),
            },
          };
        }
      }
      console.log(treecfg.treeData);
    };
    listSort().then((res) => {
      treecfg.originData = res;
      reMake(treecfg.originData);
    });
    const operatecfg = reactive({
      addNewRecord: () => {
        // 打开地点弹窗，设置默认父级节点
        // console.log(treeDialog.value);
        // console.log(treecfg.treeData.length);
        // createSort({
        //   type_name: formData.data.type_name,
        //   type_layer: formData.data.type_layer,
        //   f_type_id: formData.data.f_type_id,
        // });
        treeDialog.value.dialogcfg.click.addDialog(treecfg.treeData);
      },

      // 增加树节点
      addTreeItem: (data) => {
        // 打开地点弹窗，设置默认父级节点
        treeDialog.value.dialogcfg.click.showDialog(
          false,
          data,
          treecfg.treeData
        );
      },
      // 修改树节点
      editTreeItem: (data) => {
        // 打开地点编辑弹窗
        treeDialog.value.dialogcfg.click.showDialog(
          true,
          data,
          treecfg.treeData
        );
      },
      //删除节点
      deleteTreeItem: (data) => {
        Dialog.confirm({
          title: "删除",
          message: "确定删除此节点吗？",
        })
          .then(() => {
            console.log(data);
            deleteSort({
              id: data.id,
            }).then((res) => {
              switch (res.code) {
                case 30:
                  Toast.success({
                    message: res.msg,
                    duration: 500,
                    onClose: () => {
                      const Lv1 = parseInt(data.type_layer.substring(0, 2));
                      const Lv2 = parseInt(data.type_layer.substring(2, 4));
                      const Lv3 = parseInt(data.type_layer.substring(4, 6));
                      if (treecfg.treeData[Lv1 - 1].id == data.id) {
                        delete treecfg.treeData[Lv1 - 1];
                      } else if (
                        treecfg.treeData[Lv1 - 1].children[Lv2 - 1].id ==
                        data.id
                      ) {
                        delete treecfg.treeData[Lv1 - 1].children[Lv2 - 1];
                      } else if (
                        treecfg.treeData[Lv1 - 1].children[Lv2 - 1].children[
                          Lv3 - 1
                        ].id == data.id
                      ) {
                        delete treecfg.treeData[Lv1 - 1].children[Lv2 - 1]
                          .children[Lv3 - 1];
                      } else {
                        Toast.fail({
                          message: "出错！",
                          duration: 500,
                        });
                      }
                    },
                  });
                  break;
                case 31:
                  Toast.fail({
                    message: res.msg,
                    duration: 500,
                  });
                  break;
              }
            });
          })
          .catch(() => {
            console.log("catch");
          });
      },

      // // 修改表单数据
      addData: (data) => {
        reMake([data]);
      },
      editData: (data) => {
        const Lv1 = parseInt(data.type_layer.substring(0, 2));
        const Lv2 = parseInt(data.type_layer.substring(2, 4));
        const Lv3 = parseInt(data.type_layer.substring(4, 6));
        if (treecfg.treeData[Lv1 - 1].id == data.id) {
          treecfg.treeData[Lv1 - 1].label = data.type_name;
          console.log(treecfg);
        } else if (treecfg.treeData[Lv1 - 1].children[Lv2 - 1].id == data.id) {
          treecfg.treeData[Lv1 - 1].children[Lv2 - 1].label = data.type_name;
        } else if (
          treecfg.treeData[Lv1 - 1].children[Lv2 - 1].children[Lv3 - 1].id ==
          data.id
        ) {
          treecfg.treeData[Lv1 - 1].children[Lv2 - 1].children[Lv3 - 1].label =
            data.type_name;
        } else {
          Toast.fail({
            message: "未更改",
            duration: 500,
          });
        }
      },
    });

    return {
      treecfg,
      operatecfg,
      treeDialog,
    };
  },
};
</script>
