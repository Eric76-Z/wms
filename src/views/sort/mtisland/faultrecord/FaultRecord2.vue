<template>
  <div id="faultrecord2">
    <van-form @submit="formData.onSubmit">
      <van-field
        v-model="formData.DeviceType.value"
        readonly
        clickable
        required
        name="device_type"
        label="设备类型"
        placeholder="点击选择发生故障的设备类型......"
        @click="formData.DeviceType.showPicker = true"
        :rules="[{ required: true, message: '请填写设备类型' }]"
      />
      <van-field name="maintenance_status" label="故障当前状态">
        <template #input>
          <van-radio-group
            v-model="formData.MaintenanceStatus.checked"
            direction="horizontal"
          >
            <van-radio name="1" icon-size="16px">完全修复</van-radio>
            <van-radio name="2" icon-size="16px">临时修复</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <h-autocomplete :autocompletecfg="autocompletecfg" @selected="selected" />
      <van-field
        readonly
        required
        v-model="formData.MyLocation"
        name="MyLocation"
        label="区域"
        :rules="[{ required: true, message: '请填写区域' }]"
      />
      <van-field
        v-model="formData.CarModel.value"
        readonly
        clickable
        required
        name="car_model"
        label="车型"
        placeholder="选择发生故障时车型......"
        @click="formData.CarModel.showPicker = true"
        :rules="[{ required: true, message: '请填写车型' }]"
      />

      <van-field
        v-model="formData.Time.StartTime.value"
        readonly
        clickable
        required
        name="start_time"
        label="开始时间"
        placeholder="点击选择故障开始时间......"
        @click="formData.Time.StartTime.showPicker = true"
        :rules="[{ required: true, message: '请填写开始时间' }]"
      />
      <van-field
        v-model="formData.Time.EndTime.value"
        readonly
        clickable
        required
        name="end_time"
        label="结束时间"
        placeholder="点击选择故障结束时间......"
        @click="formData.Time.EndTime.showPicker = true"
        :rules="[{ required: true, message: '请填写结束时间' }]"
      />
      <van-field
        v-model="formData.Time.Duration"
        readonly
        required
        name="duration"
        label="持续时间"
        placeholder="持续时间"
      />
      <van-field
        v-model="formData.MaintenanceRecord"
        name="maintenance_record"
        required
        rows="2"
        autosize
        label="维修记录"
        type="textarea"
        maxlength="250"
        placeholder="请输入维修记录......"
        show-word-limit
        :rules="[{ required: true, message: '请填写维修记录' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-popup
      v-model:show="formData.MaintenanceStatus.showPicker"
      position="bottom"
    >
      <van-picker
        title="选择故障状态"
        :columns="formData.MaintenanceStatus.columns"
        @confirm="formData.MaintenanceStatus.onConfirm"
        @cancel="formData.MaintenanceStatus.showPicker = false"
      />
    </van-popup>
    <van-popup v-model:show="formData.CarModel.showPicker" position="bottom">
      <van-picker
        title="选择车型"
        :columns="formData.CarModel.columns"
        @confirm="formData.CarModel.onConfirm"
        @cancel="formData.CarModel.showPicker = false"
      />
    </van-popup>
    <van-popup v-model:show="formData.DeviceType.showPicker" position="bottom">
      <van-picker
        title="选择设备类型"
        :columns="formData.DeviceType.columns"
        @confirm="formData.DeviceType.onConfirm"
        @cancel="formData.DeviceType.showPicker = false"
      />
    </van-popup>
    <van-popup
      v-model:show="formData.Time.StartTime.showPicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="formData.Time.currentDate"
        type="datetime"
        title="选择开始时间"
        :min-date="formData.Time.minDate"
        :max-date="formData.Time.maxDate"
        @confirm="formData.Time.StartTime.onConfirm"
        @cancel="formData.Time.StartTime.showPicker = false"
      />
    </van-popup>
    <van-popup
      v-model:show="formData.Time.EndTime.showPicker"
      position="bottom"
    >
      <van-datetime-picker
        v-model="formData.Time.currentDate"
        type="datetime"
        title="选择结束时间"
        :min-date="formData.Time.minDate"
        :max-date="formData.Time.maxDate"
        @confirm="formData.Time.EndTime.onConfirm"
        @cancel="formData.Time.EndTime.showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRef, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Form, Field, Picker, Popup } from "vant";
import HAutocomplete from "@/components/common/HaAutocomplete";
import { createMaintenanceRecords } from "@/network/sort.js";

import { formatDate } from "@/common/utils";
export default {
  name: "BladeApply2",
  components: {
    HAutocomplete,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  setup(props) {
    //vuex数据
    const store = useStore();
    const location = toRef(store.state, "location");
    const params = toRef(props, "params");
    const user = toRef(store.state, "user");
    const {
      getLocation: [getLocation],
    } = store._actions;
    const route = useRoute();
    console.log(params);
    console.log(route.params);

    //表单相关数据
    const formData = reactive({
      workstation: "",
      MyLocation: "",
      CarModel: {
        value: "",
        showPicker: false,
        onConfirm: (value) => {
          formData.CarModel.value = value;
          formData.CarModel.showPicker = false;
        },
        columns: ["BSUV", "BMPV", "COUPE"],
      },
      DeviceType: {
        value: "",
        showPicker: false,
        onConfirm: (value) => {
          formData.DeviceType.value = value;
          formData.DeviceType.showPicker = false;
          formData.MyLocation = "";
          formData.workstation = "";
          reloadLocaltion();
        },
        columns: ["机器人", "焊枪"],
        deviceSelected: computed(() => {
          switch (formData.DeviceType.value) {
            case formData.DeviceType.columns[0]:
              return "robot";
            case formData.DeviceType.columns[1]:
              return "weldinggun";
            default:
              return "";
          }
        }),
      },
      MaintenanceStatus: {
        checked: "1",
        // value: "",
        // showPicker: false,
        // onConfirm: (value) => {
        //   console.log(value);
        //   formData.MaintenanceStatus.value = value;
        //   formData.MaintenanceStatus.showPicker = false;
        // },
        // columns: ["完全修复", "临时修复"],
      },
      Time: {
        maxDate: new Date(2025, 10, 1),
        minDate: new Date(2020, 0, 1),
        currentDate: new Date(),
        StartTime: {
          value: "",
          showPicker: false,
          onConfirm: (value) => {
            formData.Time.StartTime.value = formatDate.format1(value);
            formData.Time.StartTime.showPicker = false;
          },
        },
        EndTime: {
          value: "",
          showPicker: false,
          onConfirm: (value) => {
            formData.Time.EndTime.value = formatDate.format1(value);
            formData.Time.EndTime.showPicker = false;
          },
        },
        Duration: computed(() => {
          if (
            formData.Time.StartTime.value != "" &&
            formData.Time.EndTime.value != ""
          ) {
            return (
              formatDate.getMin(
                formData.Time.StartTime.value,
                formData.Time.EndTime.value
              ) + " min"
            );
          } else {
            return "";
          }
        }),
      },
      MaintenanceRecord: "",
      //提交表单
      onSubmit: (values) => {
        values.workstation = formData.workstation;
        values.sort = "设备故障";
        values.duration = parseInt(values.duration);
        values.applicant_id = user.value.userinfo.userId;
        values.order_status = 1;
        createMaintenanceRecords(values);
        // values.WeldingGun = formData.WeldingGun;
        // values.BladeTypeId = route.params["bladeId"];
        // applyBlade(values);
        // console.log("submit", values);
      },
    });

    //autocomplete相关数据
    const autocompletecfg = reactive({
      workstation: computed(() => {
        switch (formData.DeviceType.value) {
          case formData.DeviceType.columns[0]:
            return location.value["robot"];
          case formData.DeviceType.columns[1]:
            return location.value["weldinggun"];
          default:
            return location.value["local"];
        }
      }),
      state: formData,
    });
    //autocomplete 选择后赋值
    const selected = (val) => {
      // console.log(val);

      formData.workstation = val.value;
      formData.MyLocation = val.area;
      return true;
    };

    const reloadLocaltion = () => {
      console.log(formData.DeviceType.deviceSelected);
      console.log(location.value);
      if (formData.DeviceType.deviceSelected == "") {
        if (location.value.local.length !== 0) {
          console.log(location);
        } else {
          getLocation({ location: "all", target: "local" });
        }
      } else {
        if (location.value[formData.DeviceType.deviceSelected].length !== 0) {
          console.log(location);
        } else {
          getLocation({
            location: "all",
            target: formData.DeviceType.deviceSelected,
          });
        }
      }
    };

    onMounted(() => {
      //判断store中有没有数据
      reloadLocaltion();

      // if (formData.DeviceType.deviceSelected == "") {
      //   if (location.value.local.length !== 0) {
      //     console.log(location);
      //   } else {
      //     getLocation({ location: "all", querytype: "local" });
      //   }
      // } else {
      //   if (location.value[formData.DeviceType.deviceSelected].length !== 0) {
      //     console.log(location);
      //   } else {
      //     getLocation({
      //       location: "all",
      //       querytype: formatDate.DeviceType.deviceSelected,
      //     });
      //   }
      // }
      // if (location.value.weldinggun.length !== 0) {
      //   //有数据
      //   console.log(location);
      //   // this.autocompletecfg.loadAll = this.location[0];
      // } else {
      //   //没有请求数据
      //   console.log("重新加载数据location");
      //   getLocation({ location: "all", querytype: "weldinggun" });
      // }
    });
    return {
      formData,
      autocompletecfg,
      selected,
    };
  },
};
</script>

<style lang="scss">
.ha-autocomplete {
  display: flex;
  .ha-autocomplete-label {
    width: 6.2em;
  }
  .inline-input {
    flex: 1;
  }
}
</style>
