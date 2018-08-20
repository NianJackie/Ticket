import Vue from 'vue'
import router from '../router'
import wx from 'weixin-js-sdk'

function onBridgeReady(wxdata, back, failBack = null) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": wxdata.appId,
            "timeStamp": wxdata.timeStamp,
            "nonceStr": wxdata.nonceStr,
            "package": wxdata.package,
            "signType": wxdata.signType,
            "paySign": wxdata.paySign
        },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                back(res)
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                if (failBack) {
                    failBack(res)
                } else {
                    alert("支付失败,请刷新重试")
                    setTimeout(() => {
                        history.go(0)
                    }, 2000)
                }
            } else {
                if (failBack) {
                    failBack(res)
                } else {
                    alert("取消支付,请刷新重试")
                    setTimeout(() => {
                        history.go(0)
                    }, 2000)
                }
            }
        }
    )
}

function callback(wxdata, back, failBack = null) {
    if (typeof window.WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(back, failBack), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(back, failBack));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(back, failBack));
        }
    } else {
        onBridgeReady(wxdata, back, failBack);
    }
}

export default {
    pay: callback,
}