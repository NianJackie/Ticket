<template>
<div>
  <div class="row ticket_wrap center real_name_information">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">购票人实名信息</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 margin_top_50 margin_bottom_60 padding_0 clearfix">
      <div v-for="item in purchasers" class="address_list clearfix">
        <div class="address_group" @click="select = item">
          <div class="name">
            <div class="state_left">
              {{item.cnName}} {{item.enName}}
            </div>
          </div>
          <ul class="realname_item clearfix">
            <li>护照号码<p>{{item.passportNum}}</p></li>
            <li>出生年月<p>{{item.birthday | datetime}}</p></li>
          </ul>
          <ul class="realname_item clearfix">
            <li>签发日期<p>{{item.issueDate | datetime}}</p></li>
            <li>有效期至<p>{{item.expireDate | datetime}}</p></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  data() {
    return {
      purchasers: []
    };
  },
  activated() {
    this.purchasers = this.$route.query.purchasers;
    this.init();
  },
  watch: {},
  methods: {
    init() {
      this.$emit("wx-load2");
    }
  },
  mounted() {
    this.init();
  }
};
</script>