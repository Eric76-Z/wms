<template>
  <div id="bladeapply2">
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
        v-model="state.value"
        readonly
        clickable
        required
        name="BladeType"
        label="刀片类型"
        placeholder="点击选择要申请的刀片类型......"
        @click="state.showPicker = true"
      />
      <van-field
        v-model="formData.RepairOrderNum"
        required
        type="digit"
        name="RepairOrderNum"
        label="维修单编号"
        placeholder="请输入维修单编号......"
        :rules="[{ required: true, message: '请填写区域' }]"
      />
      <van-field
        v-model="formData.CycleNum"
        type="digit"
        name="CycleNum"
        label="修磨圈数"
        placeholder="请输入修磨圈数......"
        :rules="[{ required: true, message: '请输入修磨圈数' }]"
      />
      <van-field
        v-model="formData.Pressure"
        type="number"
        name="Pressure"
        label="修磨压力"
        placeholder="请输入修磨压力......"
        :rules="[{ required: true, message: '请输入修磨压力' }]"
      />
      <van-field
        v-model="formData.Comments"
        name="Comments"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入备注......"
        show-word-limit
      />
      <div style="margin: 16px">
        <van-button round block type="success" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-popup v-model:show="state.showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onConfirm"
        @cancel="state.showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRef } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { Form, Field, Picker, Popup } from "vant";
import HAutocomplete from "@/components/common/HaAutocomplete";
import { postForm } from "@/network/sort.js";
export default {
  name: "BladeApply2",
  data() {},
  components: {
    HAutocomplete,
    [Form.name]: Form,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  props: {
    listcfg: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const location = toRef(store.state, "location");
    const {
      getLocation: [getLocation],
    } = store._actions;
    const formData = reactive({
      WeldingGun: "",
      MyLocation: "",
      RepairOrderNum: "",
      CycleNum: "",
      Pressure: "",
      Comments: "",
    });
    const autocompletecfg = reactive({ target: "location", loadAll: [] });
    console.log(location.value[0]);
    autocompletecfg.loadAll.push(location.value[0]);

    const listcfg = toRef(props, "listcfg");
    const bladeDatas = reactive(listcfg.value.content);
    const route = useRoute();
    let param = route.params;
    let state = reactive({
      value: "",
      showPicker: false,
    });
    // console.log(bladeDatas);
    //刀片类型选择器
    const columns = [];
    for (let bladeData in bladeDatas) {
      columns.push(bladeDatas[bladeData]["title"]);
    }
    //点击确定按钮触发
    const onConfirm = (value) => {
      console.log(value);
      state.value = value;
      state.showPicker = false;
    };
    if (state.value === "" && bladeDatas !== undefined) {
      state.value = bladeDatas[param["bladeId"]]["title"];
    }
    //autocomplete 选择后赋值
    const selected = (val) => {
      formData.WeldingGun = val.value;
      formData.MyLocation = val.area;
      return true;
    };

    //提交表单
    const onSubmit = (values) => {
      values.WeldingGun = formData.WeldingGun;
      values.BladeTypeId = param["bladeId"];
      postForm(values);
      console.log("submit", values);
    };

    return {
      location,
      getLocation,
      state,
      columns,
      onConfirm,
      bladeDatas,
      param,
      autocompletecfg,
      selected,
      formData,
      onSubmit,
    };
  },
  mounted() {
    //判断store中有没有数据
    if (this.location[0].length !== 0) {
      //有数据
      this.autocompletecfg.loadAll = this.location[0];
    } else {
      //没有请求数据
      // console.log("重新加载数据");
      this.getLocation({ location: "all", querytype: "weldinggun" });
      this.autocompletecfg.loadAll = this.location[0];
    }
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
