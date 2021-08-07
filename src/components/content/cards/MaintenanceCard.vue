<template>
  <div class="jp-card" v-show="maintenancecardcfg.isShow">
    <div class="jp-card__header">
      <!-- <a class="jp-card__thumb">
        <van-image fit="fill" :src="maintenancecardcfg.data.img" lazy-load />
        <div class="jp-card__tag">
          <van-tag :color="maintenancecardcfg.data.cardTag.tagColor" mark>{{
            maintenancecardcfg.data.cardTag.tagText
          }}</van-tag>
        </div>
      </a> -->

      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title">
            {{ maintenancecardcfg.data.title }}
            <van-tag type="primary">{{ listdata.sort }}</van-tag>
          </div>
          <div class="jp-card__desc">
            <van-tag :color="maintenancecardcfg.data.desc.descTag.tagColor">{{
              maintenancecardcfg.data.desc.descTag.tagText
            }}</van-tag>
            {{ maintenancecardcfg.data.desc.content }}
          </div>
        </div>
        <div class="jp-card__middle">
          <div class="jp-card__lt">
            <van-tag color="#1989fa" plain>设备类型</van-tag>
            {{ listdata.device_type }}
          </div>
          <div class="jp-card__md">
            <van-tag color="#07c160" plain>车型</van-tag>
            {{ listdata.car_model }}
          </div>
          <div class="jp-card__rt" v-if="listdata.applicant != null" plain>
            <van-tag color="#07c160" plain>人员</van-tag>
            {{ listdata.applicant.last_name + listdata.applicant.first_name }}
          </div>
        </div>
        <van-steps
          :active="maintenancecardcfg.step.active"
          :active-icon="maintenancecardcfg.step.activeIcon"
          active-color="#38f"
        >
          <van-step
            v-for="(item, index) in maintenancecardcfg.step.steps"
            :key="index"
            >{{ item }}</van-step
          >
        </van-steps>
        <div class="jp-card__bottom">
          <div class="start-time">
            开始于
            <span class="time">{{
              maintenancecardcfg.data.time.startTime
            }}</span>
            <!-- <van-tag
              :show="!maintenancecardcfg.data.time.lastReplace"
              type="success"
            >
              首次!
            </van-tag> -->
          </div>
          <div class="duration" v-if="maintenancecardcfg.data.time.endTime">
            <div class="end-time">
              结束于
              <span class="time">{{
                maintenancecardcfg.data.time.endTime
              }}</span>
            </div>
            ，过去
            <van-tag
              size="medium"
              type="primary"
              :color="maintenancecardcfg.data.time.durationColor"
            >
              {{ maintenancecardcfg.data.time.duration }}
            </van-tag>
            分钟
          </div>
          <!-- <div class="appeal" v-show="maintenancecardcfg.data.appeal.show">
            <van-tag type="danger"> 申诉!!! </van-tag>
          </div> -->
        </div>
      </div>
    </div>
    <div class="jp-card__footer">
      <van-popover
        v-model:show="maintenancecardcfg.btn.check.showPopover"
        theme="dark"
        :actions="maintenancecardcfg.btn.check.actions"
        @select="maintenancecardcfg.btn.check.onSelected"
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
            @click="maintenancecardcfg.btn.check"
            >审核
          </van-button>
        </template>
      </van-popover>

      <van-button
        square
        color="linear-gradient(to right, #01b160, #07e160)"
        v-if="listData.order_status == 3"
        @click="maintenancecardcfg.btn.receive"
        >领取</van-button
      >

      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="listData.order_status == 2"
        @click="maintenancecardcfg.btn.appeal"
        >申诉</van-button
      >

      <van-popover
        v-model:show="maintenancecardcfg.btn.todolast.showPopover"
        @select="maintenancecardcfg.btn.todolast.onSelected"
        placement="bottom-end"
      >
        <van-uploader
          v-model="maintenancecardcfg.btn.todolast.fileList"
          :after-read="maintenancecardcfg.btn.todolast.afterRead"
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

      <!-- <van-button
        square
        color="linear-gradient(to right, #cc976a, #ff976a)"
        v-if="listData.order_status == 4 && listData.complete_time == null"
        >善后</van-button
      > -->
      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="[2].indexOf(listData.order_status) != 1"
        @click="maintenancecardcfg.btn.delete"
        >放弃</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRef } from "vue";
import { useStore } from "vuex";
import { formatDate, beautySub } from "@/common/utils";
import { Dialog, Toast, Grid, GridItem } from "vant";
import { deleteMaintenanceRecords, partupBladeItemData } from "@/network/sort";
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
    const user = toRef(store.state, "user").value;
    const listData = reactive(props.listdata);
    console.log(listData);
    const maintenancecardcfg = reactive({
      isShow: true,
      data: {
        title:
          listData.localLv1 +
          "-" +
          listData.localLv2 +
          "-" +
          listData.localLv3 +
          "--" +
          listData.workstation,
        // img: computed(() => {
        //   let url = "";
        //   listData.repair_order_img
        //     ? (url = listData.repair_order_img.img)
        //     : (url = undefined);
        //   console.log(url);
        //   return url;
        // }),
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
        desc: {
          descTag: {
            tagText: "描述",
            tagColor: computed(() => {
              let color = "";
              maintenancecardcfg.data.desc.descTag.tagText == "申"
                ? (color = "#1989fa")
                : (color = "#07c160");
              return color;
            }),
          },
          content: computed(() => {
            if (listData.maintenance_record != null) {
              const str = beautySub(listData.maintenance_record, 10);
              return str;
            }
            return "没有故障记录";
          }),
        },
        time: {
          createTime: computed(() => {
            return formatDate.format2(listData.create_time);
          }),
          startTime: computed(() => {
            return formatDate.format2(listData.start_time);
          }),
          endTime: computed(() => {
            return formatDate.format2(listData.end_time);
          }),
          // lastReplace: computed(() => {
          //   if (
          //     listData.analyse.last_replace == undefined ||
          //     listData.analyse.last_replace == "首次领用"
          //   ) {
          //     return undefined;
          //   } else {
          //     return formatDate.format3(listData.analyse.last_replace);
          //   }
          // }),
          duration: computed(() => {
            console.log(listData.duration);
            return listData.duration;
          }),
          durationColor: computed(() => {
            if (listData.duration >= 30) {
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
        delete: () => {
          Dialog.confirm({
            title: "确认删除",
            message: "确认删除此条故障记录？",
          })
            .then(() => {
              deleteMaintenanceRecords({
                id: listData.id,
              }).then(() => {
                Toast.success({
                  message: "删除成功",
                  duration: 1000,
                  onClose: () => {
                    maintenancecardcfg.isShow = false;
                  },
                });
              });
            })
            .catch(() => {
              // on cancel
            });
        },
        check: {
          showPopover: false,
          actions: [
            { text: "后续措施" },
            { text: "维修经验" },
            { text: "直接通过" },
            { text: "直接通过" },
          ],
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
        receive: () => {
          Dialog.confirm({
            title: "确认领取",
            message: "确认领取刀片？",
          })
            .then(() => {
              console.log(formatDate.nowDateTime());
              partupBladeItemData({
                id: listData.id,
                order_status: 4,
                receive_time: formatDate.nowDateTime(),
              }).then((res) => {
                console.log(res);
                Toast.success({
                  message: "领取成功",
                  duration: 1000,
                  onClose: () => {
                    listData.order_status = res.order_status;
                    listData.receive_time = res.receive_time;
                  },
                });
              });
            })
            .catch(() => {
              // on cancel
            });
        },
        appeal: () => {
          let data = { id: listData.id, workstation: listData.weldinggun };
          context.emit("selectedid", data);
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
            partupBladeItemData({
              id: listData.id,
              formData: formData,
            })
              .then((res) => {
                file.status = "done";
                file.url = res.repair_order_img.img;
                listData.order_status = res.order_status;
                listData.complete_time = res.complete_time;
                listData.repair_order_img = res.repair_order_img;
                console.log(listData);
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
      step: {
        steps: ["申报", "审核", "操作", "完成"],
        active: 2,
        activeIcon: "cross",
      },
    });

    return { listData, maintenancecardcfg, user };
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
    // .jp-card__thumb {
    //   position: relative;
    //   flex: none;
    //   width: var(--van-card-thumb-size);
    //   height: var(--van-card-thumb-size);
    //   margin-right: var(--van-padding-xs);
    //   .van-image {
    //     width: 100%;
    //     height: 100%;
    //   }
    //   .jp-card__tag {
    //     position: absolute;
    //     top: 2px;
    //     left: -5px;
    //   }
    // }

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
