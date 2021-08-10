<template>
  <div id="faultdetail"></div>
</template>

<script>
// import MainNavBar from "@/components/content/mainnavbar/MainNavBar";
// import MainGrid from "@/components/content/maingrid/MainGrid";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { listMaintenanceRecords } from "@/network/sort.js";

export default {
  name: "FaulyDetail",
  components: {},
  setup() {
    const route = reactive(useRoute());
    listMaintenanceRecords({
      id: route.params["maintenanceId"],
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
