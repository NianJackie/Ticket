<template>
<div>
  <div class="row ticket_wrap transfer_tickets">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">如何转票</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 padding_0">
      <div class="payment_box">
        <p><img class="img-responsive" alt="" src="../../../images/how_transfer_tickets.png"></p>
      </div>
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
    this.init();
  },
  mounted () {
    this.init()
    document.getElementById('body').className = 'blue_background'
  }
}
</script>