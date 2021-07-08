<template>
  <template>
    <v-autocomplete
      :items="items"
      v-model="item"
      :get-label="getLabel"
      :component-item="template"
      @update-items="updateItems"
    >
    </v-autocomplete>
  </template>
  <router-link to="/about">Go to About</router-link>
  <h2>{{ $route.params.bladeId }}</h2>
</template>

<script>
import Autocomplete from "v-autocomplete";
import ItemTemplate from "./ItemTemplate.vue";

export default {
  name: "BladeApply1",
  data() {
    return {
      item: {
        id: 9,
        name: "Lion",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      },
      items: [],
      template: ItemTemplate,
    };
  },
  components: { "v-autocomplete": Autocomplete },
  methods: {
    getLabel(item) {
      return item.name;
    },
    // updateItems() {
    //   this.items = "33";
    //   // yourGetItemsMethod(text).then((response) => {
    //   //   this.items = response;
    //   // });
    // },
  },
};
</script>

<style lang="scss"></style>
