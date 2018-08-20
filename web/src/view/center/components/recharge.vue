<template>
<div>
  <div class="row ticket_wrap order recharge">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">充值</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 padding_0">
        <div class="order_item  background_none clearfix">
          <ul class="clearfix">
            <li><em class="qz">充值金额</em>
            <span class="input_box"><input v-model="money" type="text" class="form-control" maxlength="6" id="exampleInputEmail1" placeholder="输入充值金额">
            </span></li>
          </ul>
          <div class="other_amount">其他金额</div>
          <ul class="amount_item clearfix">
            <li @click="money = m" v-for="m in moneys" v-bind:class="{active: money === m}"><a href="javascript:;">￥{{m}}</a></li>
          </ul>
          <ul class="clearfix">
            <li><em class="qz">充值方式</em><span class="input_box"><i class="weixin_icon"></i>微信支付</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!--悬浮按钮 start-->
  <div class="order_bottom realname">
    <button @click="submit" class="btn red_btn">立即充值</button>
  </div>
  <!--悬浮按钮 end-->
</div>  
</template>

<script>
import api from "@/api";
import wxpay from "@/util/wxpay";
export default {
  data() {
    return {
      money: null,
      moneys: [50, 100, 200, 500, 1000, 2000, 5000, 10000],
      source: ""
    };
  },
  watch: {
    money(value) {
      if (/[^\d]/g.test(value)) this.money = value.replace(/[^\d]/g, "");
    }
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.money = null;
      if (this.$route.query.source === "order") {
        this.$alert("保证金不足,请充值");
      }
      this.$emit("wx-load2");
    },
    submit() {
      if (!this.money) return;
      api.account
        .pay_recharge({
          amount: this.money,
          payMethod: "weixin"
        })
        .then(res => {
          let that = this;
          if (res.data) {
            let sn = res.data.sn;
            wxpay.pay(
              res.data,
              () => {
                api.account.pay_rechargeConfirm({ sn: sn }).then(res => {
                  that.$alert("充值成功");
                  that.$router.go(-1);
                });
              },
              res => {
                if (res.err_msg == "get_brand_wcpay_request:fail") {
                  that.$alert("充值失败");
                }
              }
            );
          }
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>