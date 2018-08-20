<template>
<div class="row ticket_wrap order">
  <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
    <div class="header_button text-left">
      <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
    </div>
    <h1 class="header_title">实名购票信息（第1位）</h1>
    <div class="header_button text-right">
    </div>
  </div>
  <div class="tab-content margin_top_40 clearfix">
    <div class="col-xs-12 order_item clearfix">
      <ul>
        <li class="yellow_bg" style="padding: 10px 20px;">实名购票信息用于球票与护照的FAN ID绑定，请确保输入的信息正确有效</li>
      </ul>
      <ul class="clearfix">
        <li><em class="qz">中文姓名</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入中文姓名"></span></li>
        <li><em class="qz">英文姓名</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入英文姓名"></span></li>
        <li><em class="qz">护照号码</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请输入护照号码"></span></li>
        <li><em class="qz">出生日期</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请选择出生日期"></span></li>
        <li><em class="qz">签发日期</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请选择签发日期"></span></li>
        <li><em class="qz">有效期至</em><span class="input_box"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="请选择有效期至"></span></li>
      </ul>
    </div>
    
  </div>
  <div class="order_bottom realname">
    <button @click="submit" class="btn red_btn">确认填写无误，提交信息</button>
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
    submit () {
      this.$router.go(-1)
    },
    init() {
      this.$emit("wx-load2");
    }
  },
  activated () {
    this.init();
  },
  mounted () {
    this.init()
  }
}
</script>