import wx from 'weixin-js-sdk'
export default {
  limitPage: 20,
  isWeChat () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') > -1) {
      return true
    } else {
      return false
    }
  },
  globalLoading: false,
  openLoading (type) {
    this.globalLoading = type
    document.querySelector('#page-loading').style.display = 'block'
  },
  closeLoading () {
    this.globalLoading = false
    document.querySelector('#page-loading').style.display = 'none'
  },
  getParam (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r!=null) {
      return unescape(r[2])
    } else {
      return null
    }
  },
  preview(current, urls) {
    wx.previewImage({
      current: current,
      urls: urls
    });
  },

  shareUrl(url) {
    var firstUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a2c707c420483cd&redirect_uri='
    var middleUrl = encodeURIComponent('http://ticket.fengkeworld.com/fengke_ticket/api/open/share/common.jhtml?url='+url);
    var middleUrl2 = "http://ticket.fengkeworld.com/fengke_ticket/api/open/share/common.jhtml?url="+url;
    var lastUrl = '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
    return middleUrl2;
  }
}
