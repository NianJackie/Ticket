<template>
<div>
  <div class="row ticket_wrap order order_detail">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">实名购票信息</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 padding_0">
      <div class="order_item  background_none clearfix">
        <ul>
          <li><span class="pull-right gray_font">{{detail.cnName}}</span>中文姓名</li>
          <li><span class="pull-right gray_font">{{detail.enName}}</span>英文姓名</li>
          <li><span class="pull-right gray_font">{{detail.passportNum}}</span>护照号码</li>
          <li><span class="pull-right gray_font">{{detail.birthday | datetime}}</span>出生日期</li>
          <li><span class="pull-right gray_font">{{detail.issueDate | datetime}}</span>签发日期</li>
          <li><span class="pull-right gray_font">{{detail.expireDate | datetime}}</span>有效期至</li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      id: null,
      detail: {}
    }
  },
  watch: {
  },
  methods: {
    init () {
      this.id = this.$route.query.id
      api.account.purchaser_detail({id: this.id}).then(res => {
        this.detail = res.data
        this.$emit("wx-load2");
      })
    }
  },
  activated () {
    this.init()
  },
  mounted () {
    this.init()
  }
}
</script>