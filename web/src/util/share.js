import wx from 'weixin-js-sdk'
import store from '../store'
import util from '@/util/util'

let share = (obj = {}) => {
    // var BASIC = store.getters.getBasic
    let title = obj.name ||  '风票首页'
    let desc = obj.desc || '风票是个好工具'
    let imgUrl = obj.imgUrl ||  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520614667664&di=f8a01cf2a048475be45fd4e55af4766f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0171ae5683dccf32f8759f04b29bf9.jpg'
    let link =  obj.link ||  util.shareUrl('http://ticket.fengkeworld.com/')
    console.log('分享的内容:' ,obj)
    // alert(title+" desc:  "+desc+"  imgUrl:  "+imgUrl+"  link:  "+link)
    let sharedata = {
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert('分享成功')
            //alert(title+" desc:  "+desc+"  imgUrl:  "+imgUrl+"  link:  "+link)
        },
        cancel: function (err) {
            // 用户取消分享后执行的回调函数
            //alert('取消分享')
        }
    }

    wx.onMenuShareAppMessage(sharedata);
    wx.onMenuShareTimeline(sharedata);
    wx.onMenuShareQQ(sharedata);
    wx.onMenuShareWeibo(sharedata);

    // wx.hideAllNonBaseMenuItem();
    // wx.showMenuItems({
    //     menuList: [
    //         'menuItem:profile',
    //         'menuItem:addContact',
    //         'menuItem:share:appMessage',
    //         'menuItem:share:timeline',
    //         'menuItem:share:qq',
    //         'menuItem:share:weiboApp',
    //         'menuItem:favorite',
    //         'menuItem:copyUrl',
    //         'menuItem:openWithSafari'
    //     ]
    // })
}

export default share