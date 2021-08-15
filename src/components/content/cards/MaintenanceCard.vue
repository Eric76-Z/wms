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
            <van-tag type="primary">{{ listData.sort }}</van-tag>
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
        <div class="jp-card__bottom">
          <div class="start-time">
            开始于
            <span class="time">{{
              maintenancecardcfg.data.time.startTime
            }}</span>
          </div>
          <div class="duration" v-if="maintenancecardcfg.data.time.endTime">
            <div class="end-time">
              结束于
              <span class="time">{{
                maintenancecardcfg.data.time.endTime
              }}</span>
            </div>
            ，历时
            <van-tag
              size="medium"
              type="primary"
              :color="maintenancecardcfg.data.time.durationColor"
            >
              {{ maintenancecardcfg.data.time.duration }}
            </van-tag>
            分钟
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
          <van-tag
            mark
            type="primary"
            size="medium"
            v-show="maintenancecardcfg.data.needSummary"
            >需经验总结</van-tag
          >
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
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            v-if="maintenancecardcfg.btn.check.permit"
            @click="maintenancecardcfg.btn.check"
            >审核
          </van-button>
        </template>
      </van-popover>

      <van-button
        square
        color="linear-gradient(to right, #cc976a, #ff976a)"
        @click="maintenancecardcfg.btn.detail(listdata.id)"
        >详情</van-button
      >
      <van-button
        square
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        v-if="
          [1].indexOf(listData.order_status) != -1 ||
          user.userinfo.isSuper == true ||
          user.userinfo.groups.indexOf(1) != -1
        "
        @click="maintenancecardcfg.btn.delete"
        >放弃</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRef } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { formatDate, beautySub, innerArry } from "@/common/utils";
import { Dialog, Toast, Grid, GridItem } from "vant";
import {
  deleteMaintenanceRecords,
  partupMaintenanceRecords,
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
    const store = useStore();
    const user = toRef(store.state, "user").value;

    //路由
    const router = reactive(useRouter());
    // console.log(router);
    const listData = reactive(props.listdata);
    // console.log(listData);
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
              const str = beautySub(listData.maintenance_record, 52);
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
        needSummary: computed(() => {
          return listData.need_summary;
        }),
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
        detail: (val) => {
          console.log(val);
          router.push({
            name: "faultdetail",
            params: { maintenanceId: val },
          });
        },
        check: {
          showPopover: false,
          actions: [
            { text: "指定责任人", disabled: true },
            { text: "维修经验" },
            { text: "直接通过" },
          ],
          onSelected: (action) => {
            switch (action.text) {
              case "指定责任人":
                partupMaintenanceRecords({
                  id: listData.id,
                  order_status: 3,
                  need_summary: 1,
                }).then((res) => {
                  console.log(res);
                  Toast.success({
                    message: "审核通过，等待领取",
                    duration: 1000,
                    onClose: () => {
                      listData.order_status = res.order_status;
                      listData.need_summary = res.need_summary;
                    },
                  });
                });
                break;
              case "维修经验":
                console.log(innerArry([1, 18, 4, 5], user.userinfo.groups));
                partupMaintenanceRecords({
                  id: listData.id,
                  order_status: 3,
                  need_summary: !maintenancecardcfg.data.needSummary,
                }).then((res) => {
                  console.log(res);
                  listData.order_status = res.order_status;
                  listData.need_summary = res.need_summary;
                });
                break;
              case "直接通过":
                partupMaintenanceRecords({
                  id: listData.id,
                  order_status: 4,
                }).then((res) => {
                  console.log(res);
                  listData.order_status = res.order_status;
                  listData.need_summary = res.need_summary;
                });
                break;
              default:
                break;
            }
          },
          permit: computed(() => {
            return (
              [1, 2, 3].indexOf(listData.order_status) != -1 &&
              (user.userinfo.isSuper == true ||
                innerArry(user.userinfo.groups, [1, 18, 4, 5]) == true)
            );
          }),
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
          max-height: calc(var(--van-card-desc-line-height) * 3);
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
