<template>
<div class="row ticket_wrap">
  <div class="col-xs-12">
    <div class="payment_box">
      <p><img class="img-responsive" alt="" src="../../../images/order/big_logo.png"></p>
      <p class="title">支付成功</p>
      <p>请耐心等待商家邮寄纸质票</p>
      <p class="btn_box">
        <button class="btn blue_btn" @click="toCenterOrder">查看订单</button>
        <router-link :to="{name: 'home/index',replace}">
          <button class="btn blue_btn">返回首页</button>
        </router-link>
      </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      orderId: null,
      source: "bought"
    };
  },
  watch: {},
  methods: {
    toCenterOrder() {
      this.$router.replace({
        name: "center/order",
        query: {
          id: this.orderId,
          source: "bought"
        }
      });
    },
    init() {
      this.$emit("wx-load2");
      this.orderId = this.$route.query.id;
      this.source = this.$route.query.source;
    }
  },
  activated() {
    this.init();
  },
  mounted() {
    this.init();
  }
};
</script>