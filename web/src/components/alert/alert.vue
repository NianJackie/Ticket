<template>
<div>
  <transition name="msgbox-bounce">
    <div v-show="value" style="z-index: 1000" class="withdrawals_fail">{{value}}</div>
  </transition>
</div>
</template>

<style>
  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
</style>

<script type="text/babel">
  export default {
    name: 'alert',
    props: {
    },

    computed: {
    },

    methods: {
    },

    watch: {
      value (nv) {
        if (nv) {
          setTimeout(() => {
            this.value = ''
          }, 2000)
        }
      }
    },

    mounted () {
    },

    data() {
      return {
        value: ''
      }
    }
  };
</script>
