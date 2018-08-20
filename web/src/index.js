import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTransferDom from './util/vue-transfer-dom.js'
import App from './App.vue'
import store from './store.js'
import router from './router.js'
import filter from './filters/index'
import alert from './components/alert'
import util from './util/util'

Vue.use(VueResource)
Vue.use(VueTransferDom)
Vue.use(alert)

import './style/index.css'

import { Spinner, Swipe, Picker, SwipeItem , CellSwipe, Tabbar, TabItem, Popup, Cell, Navbar, TabContainer, TabContainerItem, Field, Loadmore, InfiniteScroll, DatetimePicker } from 'mint-ui'
Vue.component(Spinner.name, Spinner);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(InfiniteScroll);

import 'mint-ui/lib/style.css'

Vue.http.options.root = 'http://ticket.fengkeworld.com/fengke_ticket'

let urltoken = util.getParam('access_token')
if (urltoken){
  localStorage.setItem('access_token', urltoken)
}
global.initUrl = '';
global.isIOS = false;
let isIOS = function() {
  var isIphone = navigator.userAgent.includes("iPhone");
  var isIpad = navigator.userAgent.includes("iPad");
  return isIphone || isIpad;
};
if(isIOS() && initUrl === ''){
  global.initUrl = window.location.href;
}
if(isIOS()){
  global.isIOS = true;
}
new Vue({
  el: '#app',
  store,
  router,
  filter,
  components: { App },
  render() {
    return <App />
  }
})