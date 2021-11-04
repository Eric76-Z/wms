<template>
  <div class="jp-card" v-show="bladecardcfg.isShow">
    <div class="jp-card__header">
      <a class="jp-card__thumb">
        <van-image
          fit="scale-down"
          :src="bladecardcfg.data.img"
          lazy-load
          @click="bladecardcfg.data.viewImg"
        />
        <div class="jp-card__tag">
          <van-tag :color="bladecardcfg.data.cardTag.tagColor" mark>{{
            bladecardcfg.data.cardTag.tagText
          }}</van-tag>
        </div>
      </a>
      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title">
            {{ bladecardcfg.data.title }}
          </div>
          <div class="jp-card__desc">
            <van-tag :color="bladecardcfg.data.descTag.tagColor">{{
              bladecardcfg.data.descTag.tagText
            }}</van-tag>
            {{ bladecardcfg.data.descTag.tagValue }}
          </div>
        </div>
        <div class="jp-card__middle">
          <div class="jp-card__lt">
            <van-tag color="#1989fa" plain>申</van-tag>
            {{ bladecardcfg.data.applicant }}
          </div>
          <div class="jp-card__md" v-show="listdata.receiver">
            <van-tag color="#07c160" plain>领</van-tag>
            {{ bladecardcfg.data.receiver }}
          </div>
          <div class="jp-card__rt" v-show="false"></div>
        </div>
        <div class="jp-card__bottom">
          <div class="start-time">
            创建于
            <span class="time">{{ bladecardcfg.data.time.createTime }}</span>
            <van-tag :show="!bladecardcfg.data.time.lastReplace" type="success">
              首次!
            </van-tag>
          </div>
          <div class="duration" v-if="bladecardcfg.data.time.lastReplace">
            <div class="end-time">
              上次领
              <span class="time">{{ bladecardcfg.data.time.lastReplace }}</span>
            </div>
            ，过去
            <van-tag
              size="medium"
              type="primary"
              :color="bladecardcfg.data.time.deltaColor"
            >
              {{ bladecardcfg.data.time.deltaDay }}
            </van-tag>
            天
          </div>
          <div class="appeal" v-show="bladecardcfg.data.appeal.show">
            <van-tag type="danger"> 申诉!!! </van-tag>
            <!-- {{ bladecardcfg.data.appeal.message }} -->
          </div>
        </div>
      </div>
    </div>
    <div class="jp-card__footer">
      <van-popover
        v-model:show="bladecardcfg.btn.check.showPopover"
        theme="dark"
        :actions="bladecardcfg.btn.check.actions"
        @select="bladecardcfg.btn.check.onSelected"
      >
        <template #reference>
          <van-button
            class="check-btn"
            square
            color="linear-gradient(to right, #ff976a, #ed6a0c)"
            v-if="
              [1, 2, 3].indexOf(listData.order_status) != -1 &&
              user.userinfo.isSuper == true
            "
            @click="bladecardcfg.btn.check"
            >审核
          </van-button>
        </template>
      </van-popover>

      <van-button
        square
        color="linear-gradient(to right, #01b160, #07e160)"
        v-if="bladecardcfg.btn.receive.showbtn"
        :disabled="bladecardcfg.btn.receive.disabled"
        @click="bladecardcfg.btn.receive.click"
        >领取</van-button
      >

      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="bladecardcfg.btn.appeal.showbtn"
        :disabled="bladecardcfg.btn.appeal.disabled"
        @click="bladecardcfg.btn.appeal.click"
        >申诉</van-button
      >

      <van-popover
        v-model:show="bladecardcfg.btn.todolast.showPopover"
        @select="bladecardcfg.btn.todolast.onSelected"
        placement="bottom-end"
      >
        <van-uploader
          v-model="bladecardcfg.btn.todolast.fileList"
          :after-read="bladecardcfg.btn.todolast.afterRead"
          multiple
          :max-count="1"
        />
        <template #reference>
          <van-button
            class="todolast-btn"
            square
            color="linear-gradient(to right, #cc976a, #ff976a)"
            v-if="
              listData.order_status == 4 &&
              (listData.complete_time == null || user.userinfo.isSuper == true)
            "
            >善后
          </van-button>
        </template>
      </van-popover>
      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="bladecardcfg.btn.delete.showbtn"
        @click="bladecardcfg.btn.delete.click"
        >删除</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref, toRef } from "vue";
import { useStore } from "vuex";
import { formatDate, innerArry } from "@/common/utils";
import { Dialog, Toast, Grid, GridItem } from "vant";
import { deleteBladeItemData, partupBladeItemData } from "@/network/sort";
export default {
  name: "MainListCard",
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  props: {
    listdata: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const user = toRef(store.state, "user");
    const listData = reactive(props.listdata);
    const descTag = ref();
    // console.log(listData);
    const bladecardcfg = reactive({
      isShow: true,
      data: {
        title:
          listData.localLv1 +
          "-" +
          listData.localLv2 +
          "-" +
          listData.localLv3 +
          "--" +
          listData.weldinggun.weldinggun_num,
        img: computed(() => {
          let url = "";
          listData.repair_order_img
            ? (url = listData.repair_order_img.img)
            : (url = undefined);
          return url;
        }),
        viewImg: () => {
          let data = {
            id: listData.id,
            img: bladecardcfg.data.img,
          };
          context.emit("viewImg", data);
        },
        applicant: computed(() => {
          if (
            listData.applicant != undefined &&
            listData.applicant.first_name != null &&
            listData.applicant.last_name != null
          ) {
            return listData.applicant.last_name + listData.applicant.first_name;
          } else if (
            listData.applicant != undefined &&
            listData.applicant.username != null
          ) {
            return listData.applicant.username;
          } else {
            return "";
          }
        }),
        receiver: computed(() => {
          if (
            listData.receiver != undefined &&
            listData.receiver.first_name != null &&
            listData.receiver.last_name != null
          ) {
            return listData.receiver.last_name + listData.receiver.first_name;
          } else if (
            listData.receiver != undefined &&
            listData.receiver.username != null
          ) {
            return listData.receiver.username;
          } else {
            return "";
          }
        }),
        cardTag: {
          tagText: computed(() => {
            let tagText = "";
            switch (listData.order_status) {
              case 1:
                tagText = "等待审核";
                break;
              case 2:
                tagText = "审核失败";
                break;
              case 3:
                tagText = "等待领取";
                break;
              case 4:
                if (listData.complete_time == null) {
                  tagText = "等待善后";
                } else {
                  tagText = "订单完成";
                }
                break;
              default:
                break;
            }
            return tagText;
          }),
          tagColor: computed(() => {
            let tagColor = "";
            switch (listData.order_status) {
              case 1:
                tagColor = "#1989fa";
                break;
              case 2:
                tagColor = "#ee0a24";
                break;
              case 3:
                tagColor = "#ff976a";
                break;
              case 4:
                if (listData.complete_time == null) {
                  tagColor = "#1989fa";
                } else {
                  tagColor = "#07c160";
                }
                break;
              default:
                break;
            }
            return tagColor;
          }),
        },
        descTag: {
          tagText: computed(() => {
            let tag = "";
            [1, 2, 3].indexOf(listData.order_status) != -1
              ? (tag = "申")
              : (tag = "领");
            return tag;
          }),
          tagColor: computed(() => {
            let color = "";
            bladecardcfg.data.descTag.tagText == "申"
              ? (color = "#1989fa")
              : (color = "#07c160");
            return color;
          }),
          tagValue: computed(() => {
            let value = "";
            switch (bladecardcfg.data.descTag.tagText) {
              case "申":
                value = listData.bladetype_apply.my_spec;
                break;
              case "领":
                if (listData.bladetype_received != null) {
                  value = listData.bladetype_received.my_spec;
                } else {
                  value = "未填写领用何种刀片！";
                }
                break;
            }
            return value;
          }),
        },
        time: {
          createTime: computed(() => {
            return formatDate.format2(listData.create_time);
          }),
          lastReplace: computed(() => {
            if (
              listData.analyse.last_replace == undefined ||
              listData.analyse.last_replace == "首次领用"
            ) {
              return undefined;
            } else {
              return formatDate.format3(listData.analyse.last_replace);
            }
          }),
          deltaDay: computed(() => {
            return formatDate.deltaDay(
              listData.analyse.last_replace,
              listData.create_time
            );
          }),
          deltaColor: computed(() => {
            if (bladecardcfg.data.time.deltaDay >= 180) {
              return "#ff976a";
            } else {
              return "#ee0a24";
            }
          }),
        },
        appeal: {
          show: computed(() => {
            var reg = new RegExp("[申诉]");
            if (reg.test(listData.order_comments)) {
              return true;
            } else {
              return false;
            }
          }),
          message: computed(() => {
            var reg = new RegExp("[申诉]");
            if (reg.test(listData.order_comments)) {
              return true;
            } else {
              return false;
            }
          }),
        },
      },
      btn: {
        delete: {
          click: () => {
            Dialog.confirm({
              title: "确认删除",
              message: "确认删除刀片订单？",
            })
              .then(() => {
                deleteBladeItemData({
                  id: listData.id,
                }).then(() => {
                  Toast.success({
                    message: "删除成功",
                    duration: 1000,
                    onClose: () => {
                      bladecardcfg.isShow = false;
                    },
                  });
                });
              })
              .catch(() => {
                // on cancel
              });
          },
          showbtn: computed(() => {
            return (
              [1, 2, 3].indexOf(listData.order_status) != -1 &&
              (user.value.userinfo.isSuper == true ||
                innerArry(user.value.userinfo.groups, [1, 7]) == true)
            );
          }),
        },
        check: {
          showPopover: false,
          actions: [{ text: "通过" }, { text: "不通过" }],
          showbtn: computed(() => {
            return (
              user.value.userinfo.isSuper == true ||
              ([1, 2, 3].indexOf(listData.order_status) != -1 &&
                innerArry(user.value.userinfo.groups, [1, 7]) == true)
            );
          }),
          onSelected: (action) => {
            switch (action.text) {
              case "通过":
                partupBladeItemData({
                  id: listData.id,
                  order_status: 3,
                }).then((res) => {
                  console.log(res);
                  Toast.success({
                    message: "审核通过，等待领取",
                    duration: 1000,
                    onClose: () => {
                      listData.order_status = res.order_status;
                    },
                  });
                });
                break;
              case "不通过":
                partupBladeItemData({
                  id: listData.id,
                  order_status: 2,
                }).then((res) => {
                  Toast.fail({
                    message: "审核不通过！",
                    duration: 1000,
                    onClose: () => {
                      listData.order_status = res.order_status;
                    },
                  });
                });
                break;
              default:
                break;
            }
          },
        },
        receive: {
          click: () => {
            let data = {
              id: listData.id,
              workstation: listData.weldinggun,
              action: "receive",
            };
            context.emit("selectedid", data);
          },
          showbtn: computed(() => {
            return (
              user.value.userinfo.isSuper == true &&
              [3].indexOf(listData.order_status) != -1
            );
          }),
          disabled: computed(() => {
            return !(
              user.value.userinfo.isSuper == true ||
              innerArry(user.value.userinfo.groups, [1, 7]) == true ||
              listData.applicant.id == user.value.userinfo.userId
            );
          }),
        },
        appeal: {
          click: () => {
            let data = {
              id: listData.id,
              workstation: listData.weldinggun,
              action: "appeal",
            };
            context.emit("selectedid", data);
          },
          showbtn: computed(() => {
            return [2].indexOf(listData.order_status) != -1;
          }),
          disabled: computed(() => {
            return !(
              user.value.userinfo.isSuper == true ||
              innerArry(user.value.userinfo.groups, [1, 7]) == true ||
              listData.applicant.id == user.value.userinfo.userId
            );
          }),
        },
        todolast: {
          showPopover: false,
          actions: [{ text: "上传维修单" }, { text: "其他", disabled: true }],
          onSelected: (action) => {
            switch (action.text) {
              case "上传维修单":
                partupBladeItemData({
                  id: listData.id,
                  order_status: 3,
                }).then((res) => {
                  Toast.success({
                    message: "审核通过，等待领取",
                    duration: 1000,
                    onClose: () => {
                      listData.order_status = res.order_status;
                    },
                  });
                });
                break;
              default:
                break;
            }
          },
          fileList: [],
          afterRead: (file) => {
            // 此时可以自行将文件上传至服务器
            file.status = "uploading";
            file.message = "上传中...";
            var formData = new FormData();
            formData.append("id", listData.id);
            formData.append("sort", "repair_order_img");
            formData.append("img", file.file);
            // formData.append("complete_time", formatDate.nowDateTime());
            partupBladeItemData({
              id: listData.id,
              formData: formData,
            })
              .then((res) => {
                console.log(res);
                file.status = "done";
                file.url = res.repair_order_img.img;
                listData.order_status = res.order_status;
                listData.complete_time = res.complete_time;
                listData.repair_order_img = res.repair_order_img;
                // Toast.success({
                //   message: "领取成功",
                //   duration: 1000,
                //   onClose: () => {
                //     listData.order_status = res.order_status;
                //     listData.receive_time = res.receive_time;
                //   },
                // });
              })
              .catch(() => {
                file.status = "failed";
                file.message = "上传失败";
              });
          },
        },
      },
    });

    return { listData, bladecardcfg, descTag, user };
  },
};
</script>

<style lang="scss">
.jp-card {
  position: relative;
  box-sizing: border-box;
  padding: var(--van-card-padding);
  color: var(--van-card-text-color);
  font-size: var(--van-card-font-size);
  background-color: var(--van-card-background-color);
  .jp-card__header {
    display: flex;
    .jp-card__thumb {
      position: relative;
      flex: none;
      width: var(--van-card-thumb-size);
      height: var(--van-card-thumb-size);
      margin-right: var(--van-padding-xs);
      .van-image {
        width: 100%;
        height: 100%;
      }
      .jp-card__tag {
        position: absolute;
        top: 2px;
        left: -5px;
      }
    }

    .jp-card__content {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      min-width: 0;
      min-height: var(--van-card-thumb-size);
      .jp-card__top {
        .jp-card__title {
          font-size: 15px;
          line-height: 17px;
          font-weight: var(--van-font-weight-bold);
        }
        .jp-card__desc {
          max-height: var(--van-card-desc-line-height);
          color: var(--van-card-desc-color);
          line-height: var(--van-card-desc-line-height);
        }
      }
      .jp-card__middle {
        display: flex;
        .jp-card__lt {
          flex: 1;
        }
        .jp-card__md {
          flex: 1;
        }
        .jp-card__rt {
          flex: 1;
        }
      }
      .jp-card__bottom {
        font-size: 10px;
        .start-time {
          display: block;
          .van-tag {
            margin-left: 10px;
            padding: 0 3px;
          }
        }
        .end-time {
          display: inline-block;
        }
        .duration {
          display: inline-block;
          .van-tag {
            display: inline-block;
            padding: 0 3px;
            border-radius: 4px;
          }
        }
        .time {
          display: inline-block;
          font-size: 10px;
          text-align: center;
          color: #ff976a;
          border-radius: 4px;
        }
      }
    }
  }
  .jp-card__footer {
    flex: none;
    text-align: right;
    .van-button {
      margin-left: 5px;
      height: 26px;
      width: 58px;
      padding: 0 10px;
      border-radius: 6px;
      .van-overlay {
        width: 100%;
      }
      .check-dialog {
        width: 100%;
      }
    }
  }
}
</style>
