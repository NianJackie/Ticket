<template>
<div>
  <div class="row ticket_wrap order_detail logistics_view">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">物流详情</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 margin_top_40 padding_0 clearfix">
      <div class="order_state" style="margin-top: 1px;">
        <ul>
          <li>订单编号：201801052364</li>
          <li>承运公司：顺丰速运</li>
          <li>物流状态：已发货</li>
        </ul>
      </div>
    </div>
    <div class="col-xs-12 padding_0">
      <div class="logistics_view_box">
      <div class="step_line"><span></span></div>
      <div class="logistics_view_item">
        <div class="step_item_content">
          <div class="point blue"></div>
          <div class="step_item">
            <div class="logistics_address">【在途】快件离开 北京市内部 已发往 上地</div>
            <p>2016-12-16 08:25:54</p>
          </div>
        </div>
      </div>
      <div class="logistics_view_item">
        <div class="step_item_content">
          <div class="point gray"></div>
          <div class="step_item">
            <div class="logistics_address">【在途】快件离开 北京市内部 已发往 上地一部</div>
            <p>2016-12-16 08:25:54</p>
          </div>
        </div>
      </div>
      <div class="logistics_view_item">
        <div class="step_line"><span></span></div>
        <div class="step_item_content">
          <div class="point gray"></div>
          <div class="step_item">
            <div class="logistics_address">【收件】山东济南  黄冈 已收件</div>
            <p>2016-12-14 08:25:54</p>
          </div>
        </div>
      </div>
      <div class="logistics_view_item">
        <div class="step_item_content">
          <div class="point gray"></div>
          <div class="step_item">
            <div class="logistics_address">【收件】山东济南  黄冈 已收件</div>
            <p>2016-12-14 08:25:54</p>
          </div>
        </div>
      </div>
      <div class="logistics_view_item">
        <div class="step_item_content">
          <div class="point gray"></div>
          <div class="step_item">
            <div class="logistics_address">【已发货】卖家已发货</div>
            <p>2016-12-13 12:25:54</p>
          </div>
        </div>
      </div>
      <div class="logistics_view_item">
        <div class="step_item_content">
          <div class="point gray"></div>
          <div class="step_item">
            <div class="logistics_address">【未发货】您已提交订单，等待卖家发货</div>
            <p>2016-12-13 12:20:54</p>
          </div>
        </div>
      </div>
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
    this.iniy();
    document.getElementById('body').className = 'gray_bg'
  }
}
</script>