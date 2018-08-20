import http from '@/util/http'

const apis = {
  common: {
    wechat_upload (data) {
      return http.get({
        url: 'api/secure/upload/image.jhtml',
        data: data
      })
    }
  },
  account: {
    weixin_config (data) {
      return http.get({
        url: 'api/open/weixin/config.jhtml',
        data: data
      })
    },
    message_code (data) {
      return http.get({
        url: 'api/secure/message/register/code/get.jhtml',
        data: data
      })
    },
    access_token (data) {
      return http.get({
        url: 'api/secure/token/accessToken.jhtml',
        data: data
      })
    },
    establish (data) {
      return http.get({
        url: 'api/secure/account/establish.jhtml',
        data: data
      })
    },
    detail (data) {
      return http.get({
        url: 'api/secure/account/detail.jhtml',
        data: data
      })
    },
    record (data) {
      return http.get({
        url: 'api/secure/account/record/list.jhtml',
        data: data
      })
    },
    exist (data) {
      return http.get({
        url: 'api/secure/account/exist.jhtml',
        data: data
      })
    },
    pay_recharge (data) {
      return http.get({
        url: 'api/secure/pay/recharge.jhtml',
        data: data
      })
    },
    pay_rechargeConfirm (data) {
      return http.get({
        url: 'api/secure/pay/rechargeConfirm.jhtml',
        data: data
      })
    },
    password_exist (data) {
      return http.get({
        url: 'api/secure/account/password/exist.jhtml',
        data: data
      })
    },
    password_set (data) {
      return http.get({
        url: 'api/secure/account/password/set.jhtml',
        data: data
      })
    },
    password_edit (data) {
      return http.get({
        url: 'api/secure/account/password/edit.jhtml',
        data: data
      })
    },
    pay_withdraw (data) {
      return http.get({
        url: 'api/secure/pay/withdraw.jhtml',
        data: data
      })
    },
    purchaser_add (data) {
      return http.get({
        url: 'api/secure/purchaser/add.jhtml',
        data: data
      })
    },
    purchaser_delete (data) {
      return http.get({
        url: 'api/secure/purchaser/delete.jhtml',
        data: data
      })
    },
    purchaser_edit (data) {
      return http.get({
        url: 'api/secure/purchaser/edit.jhtml',
        data: data
      })
    },
    purchaser_list (data) {
      return http.get({
        url: 'api/secure/purchaser/list.jhtml',
        data: data
      })
    },
    purchaser_detail (data) {
      return http.get({
        url: 'api/secure/purchaser/detail.jhtml',
        data: data
      })
    },
    receiver_add (data) {
      return http.get({
        url: 'api/secure/receiver/add.jhtml',
        data: data
      })
    },
    receiver_setInit (data) {
      return http.get({
        url: 'api/secure/receiver/setInit.jhtml',
        data: data
      })
    },
    receiver_init (data) {
      return http.get({
        url: 'api/secure/receiver/init.jhtml',
        data: data
      })
    },
    receiver_delete (data) {
      return http.get({
        url: 'api/secure/receiver/delete.jhtml',
        data: data
      })
    },
    receiver_edit (data) {
      return http.get({
        url: 'api/secure/receiver/edit.jhtml',
        data: data
      })
    },
    receiver_list (data) {
      return http.get({
        url: 'api/secure/receiver/list.jhtml',
        data: data
      })
    },
    receiver_detail (data) {
      return http.get({
        url: 'api/secure/receiver/detail.jhtml',
        data: data
      })
    }
  },
  ticket: {
    depositAndService (data) {
      return http.get({
        url: 'api/secure/rate/depositAndService.jhtml',
        data: data
      })
    },
    matches_hotList (data) {
      return http.get({
        url: 'api/open/matches/hotList.jhtml',
        data: data
      })
    },
    matches (data) {
      return http.get({
        url: 'api/open/matches/list.jhtml',
        data: data
      })
    },
    match_search (data) {
      return http.get({
        url: 'api/open/matches/search.jhtml',
        data: data
      })
    },
    match_detail (data) {
      return http.get({
        url: 'api/open/matches/detail.jhtml',
        data: data
      })
    },
    match_detail_products (data) {
      return http.get({
        url: 'api/open//matches/product/list.jhtml',
        data: data
      })
    },
    product_search (data) {
      return http.get({
        url: 'api/secure/product/search.jhtml',
        data: data
      })
    },
    product_detail (data) {
      return http.get({
        url: 'api/secure/product/detail.jhtml',
        data: data
      })
    },
    product_preAdd (data) {
      return http.get({
        url: 'api/secure/product/preAdd.jhtml',
        data: data
      })
    },
    product_add (data) {
      return http.get({
        url: 'api/secure/product/add.jhtml',
        data: data
      })
    },
    product_edit (data) {
      return http.get({
        url: 'api/secure/product/edit.jhtmll',
        data: data
      })
    },
    product_cancel (data) {
      return http.get({
        url: 'api/secure/product/cancel.jhtml',
        data: data
      })
    },
    product_list (data) {
      return http.get({
        url: 'api/secure/product/list.jhtml',
        data: data
      })
    },
    product_release (data) {
      return http.get({
        url: 'api/secure/product/release.jhtml',
        data: data
      })
    },
    rate_depositAndService (data) {
      return http.get({
        url: 'api/secure/rate/depositAndService.jhtml',
        data: data
      })
    }    
  },
  order: {
    pay (data) {
      return http.get({
        url: 'api/secure/pay/order.jhtml',
        data: data
      })
    },
    orderConfirm (data) {
      return http.get({
        url: 'api/secure/pay/orderConfirm.jhtml',
        data: data
      })
    },
    buyer_detail (data) {
      return http.get({
        url: 'api/secure/order/buyer/detail.jhtml',
        data: data
      })
    },
    buyer_unpayList (data) {
      return http.get({
        url: 'api/secure/order/buyer/unpayList.jhtml',
        data: data
      })
    },
    buyer_tradingList (data) {
      return http.get({
        url: 'api/secure/order/buyer/tradingList.jhtml',
        data: data
      })
    },
    buyer_finishList (data) {
      return http.get({
        url: 'api/secure/order/buyer/finishList.jhtml',
        data: data
      })
    },
    cancel (data) {
      return http.get({
        url: 'api/secure/order/cancel.jhtml',
        data: data
      })
    },
    seller_unrelease (data) {
      return http.get({
        url: 'api/secure/product/list/unrelease.jhtml',
        data: data
      })
    },
    seller_release (data) {
      return http.get({
        url: 'api/secure/product/list/release.jhtml',
        data: data
      })
    },
    seller_unshippingList (data) {
      return http.get({
        url: 'api/secure/order/seller/unshippingList.jhtml',
        data: data
      })
    },
    seller_shippingList (data) {
      return http.get({
        url: 'api/secure/order/seller/shippingList.jhtml',
        data: data
      })
    },
    seller_finishList (data) {
      return http.get({
        url: 'api/secure/order/seller/finishList.jhtml',
        data: data
      })
    },
    buyer_create (data) {
      return http.get({
        url: 'api/secure/order/buyer/create.jhtml',
        data: data
      })
    },
    seller_detail (data) {
      return http.get({
        url: 'api/open/matches/seller/detail.jhtml',
        data: data
      })
    },
    buyer_cancel(data) {
      return http.get({
        url : 'api/secure/order/buyer/cancel.jhtml' ,
        data : data
      })
    },
    buyer_confirm(data) {
      return http.get({
        url : 'api/secure/order/buyer/confirm.jhtml' ,
        data : data
      })
    },
    seller_confirm(data) {
      return http.get({
        url : 'api/secure/order/seller/confirm.jhtml' ,
        data : data
      })
    },
    complain_detail(data) {
      return http.get({
        url : 'api/secure/order/complain.jhtml' ,
        data : data
      })
    },
    buyer_launch_complain(data) {
      return http.get({
        url : 'api/secure/order/buyer/complain.jhtml' ,
        data : data
      })
    },
    seller_launch_complain(data) {
      return http.get({
        url : 'api/secure/order/seller/appeal.jhtml' ,
        data : data
      })
    }
  }
}

export default apis;
