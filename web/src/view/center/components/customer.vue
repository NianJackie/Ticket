<template>
<div>
  <div class="row ticket_wrap order customer_service">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">售后</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li><em class="qz">反馈结果</em><span class="input_box red_color">卖家已同意您的售后申请，票款和赔付金额将于3个工作日返还到您的微信钱包中，请耐心等待</span></li>
          <li><em class="qz">退还票款金额</em><span class="input_box">￥4560.00</span></li>
          <li><em class="qz">订单赔付金额</em><span class="input_box">￥500.00</span><i class="help pull-right"></i></li>
          <li><em class="qz">退回路径</em><span class="input_box">微信钱包-零钱</span></li>
        </ul>
        <ul class="clearfix">
          <li><em class="qz">投诉类型</em><span class="input_box gray_font">票不对版</span></li>
          <li><em class="qz">投诉描述</em><span class="input_box gray_font">我买的6月15日德国队对意大利队的决赛票，卖家给我发的是德国对日本的小组赛票，票不对版我要求退票并赔付。</span></li>
        </ul>
        <div class="upload_photos clearfix">
          <p>照片证明</p>
          <p>
            <span><img class="img-responsive" alt="" src="../../../images/img/default.jpg"></span>
            <span><img class="img-responsive" alt="" src="../../../images/img/default.jpg"></span>
            <span><img class="img-responsive" alt="" src="../../../images/img/default.jpg"></span>
            <span><img class="img-responsive" alt="" src="../../../images/img/default.jpg"></span>
            <span @click="selectPic">
              <img class="img-responsive" alt="" src="../../../images/order/upload_photos.jpg">
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="row ticket_wrap order customer_service">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">售后</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li><em class="qz" style="width: 25%;">反馈结果</em><span class="input_box red_color" style="width: 75%;">暂无反馈结果，请耐心等待</span></li>
          <li><em class="qz" style="width: 25%;">投诉类型</em><span class="input_box gray_font" style="width: 75%;">票不对版</span></li>
          <li><em class="qz" style="width: 25%;">投诉描述</em><span class="input_box gray_font" style="width: 75%;">我买的6月15日德国队对意大利队的决赛票，卖家给我发的是德国对日本的小组赛票，票不对版我要求退票并赔付。</span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="row ticket_wrap order customer_service customer_service_sq">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">售后</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li><em class="qz">投诉类型</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请选择投诉 类型"></span></li>
          <li><em class="qz">投诉描述</em><span class="input_box"><textarea class="form-control" rows="3" placeholder="请输入您的描述，300字以内"></textarea></span></li>
        </ul>
      </div>
    </div>
    <div class="order_bottom realname">
      <button class="btn red_btn">提交信息</button>
    </div>
  </div>
  <!--售票说明 start-->
  <div class="ticketing_instructions_pop customer_service_pop" style="display:none ;">
    <div class="ticketing_instructions">
      <p class="title">平台售后赔付细则</p>
      <ul class="ticket_price">
        <li><span></span>票品售价200元以下售后赔付50元/张</li>
        <li><span></span>票品售价200-1000元售后赔付100元/张</li>
        <li><span></span>票品售价2000-5000元售后赔付500元/张</li>
        <li><span></span>票品售价5000-10000元售后赔付1000元/张</li>
        <li><span></span>票品售价10000元售后赔付2000元/张</li>
      </ul>
      <div class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
  <!--售票说明 end-->
</div>  
</template>

<script>
import wx from "weixin-js-sdk";

export default {
  data() {
    return {};
  },
  watch: {},
  methods: {
    selectPic() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
    init() {
      this.$emit("wx-load2");
    }
  },
  activated () {
    this.init();
  },
  mounted() {
    this.init();
    document.getElementById("body").className = "gray_bg";
  }
};
</script>