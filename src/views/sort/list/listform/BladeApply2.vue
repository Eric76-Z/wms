<template>
  <div id="bladeapply2">
    <h-autocomplete></h-autocomplete>
  </div>
</template>

<script>
import HAutocomplete from "@/components/common/HaAutocomplete";

export default {
  name: "BladeApply2",
  data() {
    return {
      listcfg: {
        content: {
          DPLZ02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
            tag: "常用",
          },
          DJLZ02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPCC02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPFX02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
          DPYG02G: {
            title: "02G刀片",
            desc: "车间最常用的刀片，原装进口......",
            price: "1230",
          },
        },
      },
    };
  },
  components: { HAutocomplete },
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
