import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const view = (root) => {
  return resolve => require(['@/' + root], resolve)
}

export default new Router({
  history: true,
  mode: 'history',
  //base:'/home/',
  routes: [
    {
      path: '/token',
      name: 'token',
      component: view('view/token'),
    },
    {
      path: '/',
      name: 'home',
      component: view('view/home/index'),
      children: [
        {
          // 首页
          path: '',
          name: 'home/index',
          component: view('view/home/components/home'),
          meta: {
            bgclass: 'blue_background',
          }
        },
        {
          // 赛程列表
          path: 'matches',
          name: 'home/matches',
          component: view('view/home/components/matches'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 单场赛程
          path: 'match',
          name: 'home/match',
          component: view('view/home/components/match'),
          meta: {
            bgclass: 'gray_background'
          }
        },
        {
          // 开始订单
          path: '/api/secure/pay/order',
          name: 'home/order',
          component: view('view/home/components/order'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 实名列表
          path: 'purchasers',
          name: 'home/purchasers',
          component: view('view/home/components/purchasers'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 创建实名
          path: 'purchaser',
          name: 'home/purchaser',
          component: view('view/home/components/purchaser'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 支付成功
          path: 'pay_success',
          name: 'home/pay_success',
          component: view('view/home/components/pay_success'),
          meta: {
            bgclass: 'blue_background'
          }
        },
        {
          // 支付失败
          path: 'pay_error',
          name: 'home/pay_error',
          component: view('view/home/components/pay_error'),
          meta: {
            bgclass: 'blue_background'
          }
        }
      ]
    },
    {
      path: '/center',
      name: 'center',
      component: view('view/center/index'),
      children: [
        {
          // 我的首页
          path: '',
          name: 'center/index',
          component: view('view/center/components/home'),
          meta: {
            bgclass: 'blue_background'
          }
        },
        {
          // 我的账户
          path: 'account',
          name: 'center/account',
          component: view('view/center/components/account'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 账单明细
          path: 'payments',
          name: 'center/payments',
          component: view('view/center/components/payments'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 提现
          path: 'withdraws',
          name: 'center/withdraws',
          component: view('view/center/components/withdraws'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 充值
          path: '/api/secure/pay/recharge',
          name: 'center/recharge',
          component: view('view/center/components/recharge'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 我购买的
          path: '/api/secure/pay/bought',
          name: 'center/bought',
          component: view('view/center/components/bought'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 我卖的票
          path: 'selled',
          name: 'center/selled',
          component: view('view/center/components/selled'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 订单详情
          path: '/api/secure/pay/centter_order',
          name: 'center/order',
          component: view('view/center/components/order'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 订单实名列表
          path: 'order_purchasers',
          name: 'center/order_purchasers',
          component: view('view/center/components/order_purchasers'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 物流详情
          path: 'interflow',
          name: 'center/interflow',
          component: view('view/center/components/interflow'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 售后详情
          path: 'customer_detail',
          name: 'center/customer_detail',
          component: view('view/center/components/customer_detail'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 售后
          path: 'customer',
          name: 'center/customer',
          component: view('view/center/components/customer'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 我的地址管理
          path: 'addresses',
          name: 'center/addresses',
          component: view('view/center/components/addresses'),
          meta: {
            bgclass: 'gray_bg',
            keepAlive: false
          }
        },
        {
          // 我的地址
          path: 'address',
          name: 'center/address',
          component: view('view/center/components/address'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 设置
          path: 'config',
          name: 'center/config',
          component: view('view/center/components/config'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 我的实名管理
          path: 'my_purchasers',
          name: 'center/my_purchasers',
          component: view('view/center/components/my_purchasers'),
          meta: {
            bgclass: 'gray_bg',
            keepAlive: false
          }
        },
        {
          // 我的实名
          path: 'my_purchaser',
          name: 'center/my_purchaser',
          component: view('view/center/components/my_purchaser'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 我的实名
          path: 'my_purchaser_add',
          name: 'center/my_purchaser_add',
          component: view('view/center/components/my_purchaser_add'),
          meta: {
            bgclass: 'gray_bg'
          }
        }
      ]
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: view('view/transfer/index'),
      children: [
        {
          // 转票首页
          path: '',
          name: 'transfer/index',
          component: view('view/transfer/components/home'),
          meta: {
            bgclass: 'blue_background'
          }
        },
        {
          // 搜索
          path: 'search',
          name: 'transfer/search',
          component: view('view/transfer/components/search'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 开通账户
          path: 'open_account',
          name: 'transfer/open_account',
          component: view('view/transfer/components/open_account'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 填写票务信息
          path: 'order_fill',
          name: 'transfer/order_fill',
          component: view('view/transfer/components/order_fill'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 发布列表
          path: 'orders',
          name: 'transfer/orders',
          component: view('view/transfer/components/orders'),
          meta: {
            bgclass: 'blue_background'
          }
        },
        {
          // 待发布
          path: 'order_wait',
          name: 'transfer/order_wait',
          component: view('view/transfer/components/order_wait'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 订单发货
          path: 'order_pending',
          name: 'transfer/order_pending',
          component: view('view/transfer/components/order_pending'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 已发布
          path: 'order_send',
          name: 'transfer/order_send',
          component: view('view/transfer/components/order_send'),
          meta: {
            bgclass: 'gray_bg'
          }
        },
        {
          // 如何转票
          path: 'how',
          name: 'transfer/how',
          component: view('view/transfer/components/how'),
          meta: {
            bgclass: 'blue_background'
          }
        }
      ]
    }
  ]
})