<template>
  <div id="faultrecord2">
    <h-autocomplete :autocompletecfg="autocompletecfg" @selected="selected" />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        required
        v-model="formData.MyLocation"
        name="MyLocation"
        label="区域"
      />
      <van-field
        v-model="formData.CarModel.value"
        readonly
        clickable
        required
        name="CarModel"
        label="车型"
        placeholder="选择发生故障时车型......"
        @click="formData.CarModel.showPicker = true"
      />
      <van-field
        v-model="formData.DeviceType.value"
        readonly
        clickable
        required
        name="DeviceType"
        label="设备类型"
        placeholder="点击选择发生故障的设备类型......"
        @click="formData.DeviceType.showPicker = true"
      />
      <van-field
        v-model="formData.Time.StartTime.value"
        readonly
        clickable
        required
        name="StartTime"
        label="开始时间"
        placeholder="点击选择故障开始时间......"
        @click="formData.Time.StartTime.showPicker = true"
      />
      <van-field
        v-model="formData.Time.EndTime.value"
        readonly
        clickable
        required
        name="EndTime"
        label="结束时间"
        placeholder="点击选择故障结束时间......"
        @click="formData.Time.EndTime.showPicker = true"
      />
      <van-field
        v-model="formData.Time.Duration"
        readonly
        required
        name="Duraion"
        label="持续时间"
        placeholder="持续时间"
      />
      <van-field
        v-model="message"
        required
        rows="2"
        autosize
        label="维修记录"
        type="textarea"
        maxlength="50"
        placeholder="请输入维修记录......"
        show-word-limit
      />
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
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
        :columns="columns"
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
    const {
      getLocation: [getLocation],
    } = store._actions;
    const route = useRoute();
    console.log(params);
    console.log(route.params);
    //autocomplete相关数据
    const autocompletecfg = reactive(location);
    //表单相关数据
    const formData = reactive({
      WeldingGun: "",
      MyLocation: "",
      CarModel: {
        value: "",
        showPicker: false,
        onConfirm: (value) => {
          formData.CarModel.value = value;
          formData.CarModel.showPicker = false;
        },
        columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      },
      DeviceType: {
        value: "",
        showPicker: false,
        onConfirm: (value) => {
          formData.DeviceType.value = value;
          formData.DeviceType.showPicker = false;
        },
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
      message: "",
    });

    //autocomplete 选择后赋值
    const selected = (val) => {
      formData.WeldingGun = val.value;
      formData.MyLocation = val.area;
      return true;
    };

    onMounted(() => {
      //判断store中有没有数据
      // console.log(this.location);
      if (location.value.length !== 0) {
        //有数据
        console.log(location);
        // this.autocompletecfg.loadAll = this.location[0];
      } else {
        //没有请求数据
        console.log("重新加载数据location");
        getLocation({ location: "all", querytype: "weldinggun" });
      }
    });
    return {
      formData,
      selected,
      autocompletecfg,
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
