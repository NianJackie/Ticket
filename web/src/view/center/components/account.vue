<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 ticket_topnav">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">我的账户</h1>
      <div class="header_button text-right">
        <router-link :to="{name: 'center/payments'}">
          <span class="order_icon"></span>账单</a>
        </router-link>
      </div>
    </div>
    <div class="col-xs-12 account_list margin_top_50 margin_bottom_60">
      <div class="account_content black_bg">
        <p>账户余额</p>
        <div class="title">￥{{user.balance}}</div>
      </div>
      <div class="account_content white_bg">
        <p>可用余额</p>
        <div class="title">￥{{user.availableBalance}}</div>
      </div>
      <div class="account_content red_bg">
        <p>冻结金额</p>
        <div class="title">￥{{user.frozenAmount}}</div>
      </div>
    </div>
  </div>
  <!--悬浮按钮 start-->
  <div class="order_bottom account_bottom_btn">
    <button @click="toRecharge" class="btn blue_btn">充值</button>
    <button @click="towithdraws" class="btn red_btn">提现</button>
  </div>
  <!--悬浮按钮 end-->
</div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      user: {}
    };
  },
  watch: {},
  methods: {
    towithdraws() {
      this.$router.push({
        name: "center/withdraws",
        query: {
          available: this.user.availableBalance,
          frozen: this.user.frozenAmount
        }
      });
    },
    init() {
      api.account.detail().then(res => {
      this.user = res.data;
      this.$emit("wx-load2");
    });
    },
    toRecharge() {
      this.$router.push({
        name: "center/recharge",
        query: {
          source: "account"
        }
      });
    }
  },
  mounted() {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>