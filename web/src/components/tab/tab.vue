<template>
  <div class="my_order">
        <ul class="nav nav-tabs">
          <li v-for="(item, index) in datas" :class="{active:isActive(index)}">
            <a @click="clickItem(index)">{{item}}</a>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      defualt: []
    }
  },
  data() {
    return {
      activeNum: 0
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "center/bought" && from.name !== "center/order") {
        this.activeNum = 0;
      }
    }
  },
  mounted() {
    this.activeNum = 0;
  },
  methods: {
    clickItem(index) {
      this.activeNum = index;
      this.$emit("clickViewTable", index);
    },
    isActive(index) {
      return this.activeNum === index;
    }
  }
};
</script>
