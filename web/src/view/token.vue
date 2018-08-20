<template>
</template>
<script>
import api from '@/api'
import Vue from 'vue'
import util from '@/util/util'
export default {
  data () {
    return {
      form: {}
    }
  },
  mounted () {
    // api.account.access_token().then(res => {
      // console.log(res)
    // })
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a2c707c420483cd&redirect_uri=http%3a%2f%2fticket.fengkeworld.com%2ffengke_ticket%2fapi%2fopen%2ftoken%2faccessToken.jhtml&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
    // let getoken = null,
    //   timestamp = null,
    //   statecode = null,
    //   get_token = localStorage.getItem('get_token'),
    //   state = localStorage.getItem('state');

    // let reg = new RegExp("(^|&)" + 'state' + "=([^&]*)(&|$)");
    // let r = window.location.search.substr(1).match(reg);
    // if (r != null) {
    //   getoken = unescape(r[2]);
    // }
    // if (state != null && parseInt(state) + 1000 < new Date().getTime() && getoken != 1) {
    //   localStorage.removeItem('state');
    //   localStorage.removeItem('statecode');
    // }
    // if (parseInt(get_token) + 1000 < new Date().getTime()) {
    //   localStorage.removeItem('get_token');
    // }
    // setTimeout(() => {
    //   state = localStorage.getItem('state');
    //   statecode = localStorage.getItem('statecode');
    //   get_token = localStorage.getItem('get_token');
    //   if (state == null || (getoken == 1 && get_token==null)) {
    //     if (statecode == null) {
    //       statecode = 'get_token_'+ parseInt(Math.random()*(100000-10000+1)+10000,10) * new Date().getTime();
    //       localStorage.state = new Date().getTime();
    //       localStorage.statecode = statecode;
    //     }
    //     Vue.http.post('/wechat/token', {
    //         url: location.href,
    //         state: statecode
    //       })
    //       .then(res => {
    //         if (res.body.code === 1) {
    //           location.href = res.body.data;
    //         } else {
    //           localStorage.setItem('token', res.body.data);
    //           localStorage.setItem('get_token', new Date().getTime());
    //           localStorage.removeItem('state');
    //           localStorage.removeItem('statecode');
    //           let path = this.$route.query.backPath.replace(/-/g, '/')
    //           this.$route.query.backPath = undefined
    //           this.$router.replace({
    //             path: path,
    //             query: this.$route.query,
    //             params: this.$route.params
    //           })
    //         }
    //       })
    //   }
    // }, 300);
  }
}
</script>
