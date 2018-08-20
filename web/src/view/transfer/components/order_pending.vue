<template>
<div>
  <div class="row ticket_wrap order order_detail mysell_order">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">订单详情</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_41 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <div class="order_state">订单状态：待发货</div>
        
      </div>
      <div class="col-xs-12 order_item wl_news">
          <ul class="clearfix">
            <li><em class="qz">物流公司</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请选择物流公司"></span></li>
            <li><em class="qz">快递单号</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入快递单号"></span></li>
          </ul>
      </div>
      <div class="col-xs-12 padding_0">
        <div class="receiving_address">
          <span class="address_icon"></span>
          <div class="address_news clearfix ">
            <div class="name gray_font"><span class="pull-right">18701034566</span>收货人：边瑟瑟</div>
            <p class="gray_font">收货地址：北京市北京市海淀区苏家坨同泽园东里2号楼六单元508室</p>
          </div>
        </div>
        <div class="item margin_bottom_10 clearfix">
          <div class="pic">
            <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)" style="margin-left: 0px;" width="80" height="112"></p>
          </div>
          <div class="info">
            <h2>做党外知识分子工作就要讲究方</h2>
            <div class="date margin_top_5"><span class="fa_icon time_icon"></span>2018-01-12</div>
            <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
            <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
            <div class="content">
              <p class="article"><em class="pull-right">双数出售</em><span>￥4560 </span><i>5张票</i></p>
            </div>
          </div>
        </div>
      
      <div class="order_item pending_delivery_item background_none clearfix">
        <ul>
          <li>订单编号：201801052364</li>
          <li>下单时间：2018-01-08  10:21:05</li>
          <li>确认收货时间：2018-01-08  10:21:05</li>
          <li>支付方式：微信支付</li>
          <li>取票方式：快递包邮</li>
          <li>张美丽  15611023025  卖票人信息 北京发货</li>
        </ul>
        <ul>
          <li><span class="pull-right ">小刘<i class="right_arrow"></i></span>实名购票信息（第1位）</li>
          <li><span class="pull-right">请选择<i class="right_arrow"></i></span>实名购票信息（第2位）</li>
        </ul>
        <ul class="total_amount">
          <li><span class="pull-right">￥4560.00</span>总金额</li>
          <li><span class="pull-right">￥0.00</span>运费</li>
          <li class="sfk">实付款：<span class="red_color">￥4560.00</span></li>
        </ul>
      </div>
      </div>
      
    </div>
    <div class="order_bottom orderdetail_bottom">
      <div class="order_number clearfix"><span class="margin_top_6 pull-right"><button class="btn zf_btn" style="padding: 6px 12px;" data-toggle="modal" data-target="#mdal_more_select">确认发货</button></span></div>
    </div>
  </div>
  <!--发货成功 start-->
  <div class="modal fade order_modal in" id="mdal_more_select" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: ;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title padding_top_20">发货成功</h4>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer " style="padding: 5px 0;">
          <button type="button" class="btn btn-default" data-dismiss="modal">知道了</button>
        </div>
      </div>
    </div>
  </div>
  <!--发货成功 end-->
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
    this.init();
    document.getElementById('body').className = 'gray_bg'
  }
}
</script>