<script>
import setupClass from "./../dataTable/helpers/helper";

export default {
  name: "LetscmsDatatables",
  data() {
    return {
      isLoading: false,
      call: null,
      uri: "",
      search: "",
      items: [],
      first_page_url: null,
      prev_page_url: null,
      next_page_url: null,
      last_page_url: null,
      per_page: 10,
      from: 0,
      to: 0,
      total: 0,
      page: 1,
      last_page: 1,
      selected: [],
    };
  },
  props: {
    mainTableClass: {
      type: [Array, String, Object],
    },
    columns: { type: Array, required: true },
  },
  methods: {
    initClass(classObject) {
      return setupClass(classObject);
    },
  },
};
</script>

<template>
  <div :class="initClass(mainTableClass)">
    <div class="table-responsive mb-0" data-pattern="priority-columns">kjhkjhkjhkj</div>
  </div>
</template>
