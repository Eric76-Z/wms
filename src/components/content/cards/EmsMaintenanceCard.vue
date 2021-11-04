<template>
  <div class="jp-card" v-show="emsmaintenancecardcfg.isShow">
    <div class="jp-card__header">
      <div class="jp-card__content">
        <div class="jp-card__top">
          <div class="jp-card__title">
            {{ emsmaintenancecardcfg.data.title }}
            <van-tag type="primary">{{ listData.sort }}</van-tag>
          </div>
          <div class="jp-card__tag">
            <div class="jp-card__lt">
              <van-tag color="var(--van-orange)" plain>车型</van-tag>
              {{ listdata.car_model }}
            </div>
            <div class="jp-card__md" v-if="listdata.applicant != null" plain>
              <van-tag color="#07c160" plain>人员</van-tag>
              {{ listdata.applicant.last_name + listdata.applicant.first_name }}
            </div>
            <div class="jp-card__rt">
              <van-tag color="#1989fa" plain>开始时间</van-tag>
              {{ emsmaintenancecardcfg.data.time.createTime }}
            </div>
          </div>
        </div>
        <div class="jp-card__middle">
          <div class="jp-card__desc">
            <van-tag
              :color="emsmaintenancecardcfg.data.desc.descTag.tagColor"
              >{{ emsmaintenancecardcfg.data.desc.descTag.tagText }}</van-tag
            >
            {{ emsmaintenancecardcfg.data.desc.content }}
          </div>

          <van-tag color="var(--van-warning-color)">节点</van-tag>
          {{ listData.closing_date }}
        </div>
        <div class="jp-card__bottom">
          <van-steps
            :active="emsmaintenancecardcfg.step.active"
            :active-icon="emsmaintenancecardcfg.step.activeIcon"
            active-color="#38f"
          >
            <van-step
              v-for="(item, index) in emsmaintenancecardcfg.step.steps"
              :key="index"
              >{{ item }}</van-step
            >
          </van-steps>
        </div>
      </div>
    </div>
    <div class="jp-card__footer">
      <van-button
        class="check-btn"
        square
        color="linear-gradient(to right, #cc976a, #ff976a)"
        v-if="emsmaintenancecardcfg.btn.check.show"
        @click="emsmaintenancecardcfg.btn.check.click"
        >重置节点
      </van-button>
      <van-button
        square
        :disabled="emsmaintenancecardcfg.btn.complete.disabled"
        v-if="emsmaintenancecardcfg.btn.complete.show"
        color="linear-gradient(to right, #cc976a, #ff976a)"
        @click="emsmaintenancecardcfg.btn.complete.click"
        >{{ emsmaintenancecardcfg.btn.complete.text }}</van-button
      >
      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="emsmaintenancecardcfg.btn.delete.show"
        @click="emsmaintenancecardcfg.btn.delete.click"
        >删除</van-button
      >
    </div>
    <van-calendar
      v-model:show="calendarcfg.showCalendar"
      :show-confirm="false"
      style="width: 25%"
      @confirm="calendarcfg.onConfirm"
    />
  </div>
</template>

<script>
import { reactive, computed, toRef } from "vue";
import { useStore } from "vuex";
import { formatDate, beautySub, innerArry } from "@/common/utils";
import { Dialog, Toast, Grid, GridItem } from "vant";
import {
  deleteEmsMaintenanceRecords,
  partupEmsMaintenanceRecords,
} from "@/network/sort";
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
  setup(props) {
    //vuex数据
    const store = useStore();
    const user = toRef(store.state, "user");
    const navbarcfg = toRef(store.state, "navbarcfg");
    navbarcfg.value.mainnavbarcfg = {
      title: "EMS-小车故障详情",
      isShow: [true, true, true],
    };

    // console.log(router);
    const listData = reactive(props.listdata);
    const emsmaintenancecardcfg = reactive({
      isShow: true,
      data: {
        title:
          listData.localLv1 +
          "-" +
          listData.localLv2 +
          "-" +
          listData.localLv3 +
          "-" +
          listData.ng_car +
          "号小车",
        desc: {
          descTag: {
            tagText: "故障描述",
            tagColor: "var(--van-danger-color)",
          },
          content: computed(() => {
            if (listData.maintenance_record != null) {
              const str = beautySub(listData.maintenance_record, 52);
              return str;
            }
            return "没有故障记录";
          }),
        },
        time: {
          createTime: computed(() => {
            return formatDate.format4(listData.create_time);
          }),
        },
      },
      btn: {
        delete: {
          click: () => {
            Dialog.confirm({
              title: "确认删除",
              message: "确认删除此条故障记录？",
            })
              .then(() => {
                deleteEmsMaintenanceRecords({
                  id: listData.id,
                }).then(() => {
                  Toast.success({
                    message: "删除成功",
                    duration: 1000,
                    onClose: () => {
                      emsmaintenancecardcfg.isShow = false;
                    },
                  });
                });
              })
              .catch(() => {
                // on cancel
              });
          },
          show: computed(() => {
            return (
              [1].indexOf(listData.order_status) != -1 ||
              user.value.userinfo.isSuper == true ||
              user.value.userinfo.groups.indexOf(1) != -1
            );
          }),
        },
        complete: {
          text: computed(() => {
            if (
              user.value.userinfo.isSuper == true ||
              innerArry(user.value.userinfo.groups, [1, 6]) == true
            ) {
              return "完成";
            } else {
              return "修复";
            }
          }),
          disabled: computed(() => {
            return !(
              user.value.userinfo.isSuper == true ||
              innerArry(user.value.userinfo.groups, [1, 6]) == true ||
              listData.applicant.id == user.value.userinfo.userId
            );
          }),
          show: computed(() => {
            if (
              listData.order_status == 4 ||
              (emsmaintenancecardcfg.btn.complete.text == "修复" &&
                listData.order_status == 5)
            ) {
              return false;
            } else {
              return true;
            }
          }),
          order_status: computed(() => {
            if (emsmaintenancecardcfg.btn.complete.text == "完成") {
              return 4;
            } else {
              return 5;
            }
          }),
          click: () => {
            partupEmsMaintenanceRecords({
              id: listData.id,
              order_status: emsmaintenancecardcfg.btn.complete.order_status,
            }).then((res) => {
              listData.order_status = res.order_status;
            });
          },
        },
        check: {
          click: () => {
            calendarcfg.showCalendar = true;
          },
          show: computed(() => {
            return (
              [1, 2, 3].indexOf(listData.order_status) != -1 &&
              (user.value.userinfo.isSuper == true ||
                innerArry(user.value.userinfo.groups, [1, 6]) == true)
            );
          }),
        },
      },
      step: {
        steps: ["申报", "操作 ", "修复", "完成"],
        active: computed(() => {
          if (listData.order_status == 4) {
            return 3;
          } else if (listData.order_status == 5) {
            return 2;
          } else {
            return 1;
          }
        }),
        activeIcon: computed(() => {
          if (listData.order_status == 4) {
            return "success";
          } else {
            return "cross";
          }
        }),
      },
    });
    const calendarcfg = reactive({
      showCalendar: false,
      formatDate: (date) =>
        `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`,
      onConfirm: (date) => {
        partupEmsMaintenanceRecords({
          id: listData.id,
          order_status: 3,
          closing_date: calendarcfg.formatDate(date),
        }).then((res) => {
          listData.closing_date = res.closing_date;
          calendarcfg.showCalendar = false;
        });
      },
    });

    return { listData, emsmaintenancecardcfg, user, calendarcfg };
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
        .jp-card__tag {
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
      }
      .jp-card__middle {
        .jp-card__desc {
          max-height: calc(var(--van-card-desc-line-height) * 3);
          color: var(--van-card-desc-color);
          line-height: var(--van-card-desc-line-height);
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
    .check-btn {
      width: 80px;
    }
  }
  .van-calendar {
    z-index: 999;
  }
}
</style>
