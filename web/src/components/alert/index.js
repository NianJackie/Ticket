/**
 * Usage:
 *
 * this.$alert('操作失败');
 *
 */

import Vue from 'vue';
import alertVue from './alert.vue';

var Constructor = Vue.extend(alertVue);

function Alert(text){
  let instance = new Constructor({
    el: document.createElement('div')
  })

  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.value = text;
  });
}

export default {
  install (Vue, pluginOptions = {}) {
    Vue.prototype.$alert = Alert
    Vue.component('alert', Alert)
  }
}

