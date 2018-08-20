<template>
<div class="row ticket_wrap">
  <div class="col-xs-12">
    <div class="payment_box">
      <p><img class="img-responsive" alt="" src="../../../images/order/big_logo.png"></p>
      <p class="title">支付失败</p>
      <p>请在<span>30分钟内</span>完成支付，未支付系统将取消该订单</p>
      <p class="btn_box"><a href=""><button class="btn blue_btn">立即支付</button></a><a href="../index.htm"><button class="btn blue_btn">返回首页</button></a></p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
    init() {
      this.$emit("wx-load2");
    }
  },
  activated () {
    this.init()
  },
  mounted () {
    this.init();
    document.getElementById('body').className = 'blue_background'
  }
}
</script>