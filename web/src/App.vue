<template>
<div class="container">
  <transition :name="transitionName">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
import api from "@/api";
import { Toast } from "mint-ui";
import wx from "weixin-js-sdk";
import share from "@/util/share";
import router from './router.js'

export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  mounted() {
    router.afterEach((to,from) => {
      if (window.st) {
        clearTimeout(window.st);
      }
      window.st = setTimeout(() => {
        this.load()
        window.st = null;
      }, 500);
    })
  },
  watch: {
    $route(to, from) {
      window.sharecallback = null;

      window.scrollTo(0, 0);
      if (to.meta.bgclass) {
        document.getElementById("body").className = to.meta.bgclass;
      } else {
        document.getElementById("body").className = "";
      }
      if (
        isIOS &&
        to.path.indexOf("/api/secure/pay") == 0 &&
        from.path !== "/" &&
        from.path !== "/purchasers" &&
        from.path !== "/center/addresses"
      ) {
        location.reload();
      }
    },
  },
  methods: {
    load() {
      console.log("app.vue", "third");
      let jsApiList = [
        "checkJsApi",
        "closeWindow",
        "menu:share:appmessage",
        "menu:share:timeline",
        "menu:share:qq",
        "menu:share:weiboApp",
        "chooseImage",
        "previewImage",
        "uploadImage",
        "downloadImage",
        "chooseWXPay",
        "getNetworkType"
      ];
      let url = window.location.href;
      if (isIOS) {
        url = initUrl;
      }
      
      api.account.weixin_config({
          url: url
        }).then(res => {
          if (!isIOS && url !== window.location.href) return;
          let data = res.data;

          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.data,
            jsApiList: jsApiList
          });
          wx.ready(() => {
            wx.checkJsApi({
              jsApiList: jsApiList
            });
            
            window.sharecallback ? 
              window.sharecallback((data) => {
                share(data);
              }) : 
              share({});
            console.log('注入成功');
          });
          wx.error(function(err) {
            console.log(window.location.href, url);
            alert(JSON.stringify(err));
            console.log(JSON.stringify(err));
          });
        });
    }
  }
};
</script>

<style lang="postcss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
  background-color: #fff;
}
</style>