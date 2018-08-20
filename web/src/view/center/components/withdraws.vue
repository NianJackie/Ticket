<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">提现</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 withdrawals padding_0 margin_top_40 margin_bottom_60">
      <div class="reminder margin_bottom_10">提现金额将在24小时内转入微信零钱</div>
      <ul class="withdrawals_list clearfix">
        <li>
          <i class="pull-right" style="margin-top: 10px;" @click="withdrawalsAmount = availableBalance">全部提现</i>
          <span>￥</span>
          <input 
            class="form-control" 
            id="exampleInputEmail1" 
            :placeholder="availableBalance | initAvailable" 
            type="text" v-model="withdrawalsAmount">
        </li>
        <li>
          <i class="pull-right" @click="clickWitdrawOrCause('cause')">查看原因</i>
          有&nbsp;{{frozenAmount}}&nbsp;元不可提现
        </li>
      </ul>
    </div>
  </div>

  <pass-word-view 
    :showpassword="inputpasswordview" 
    :showerro="passwordCorrect" 
    @close="inputpasswordview = false" 
    @getviewpassword="getPassWord"></pass-word-view>

  <!--悬浮按钮 start-->
  <div class="order_bottom realname">
    <button class="btn red_btn" @click="inputPassword()">确认提现</button>
  </div>
  <!--悬浮按钮 end-->
  <!--提现成功 start-->
 <div class="filter_bg" :style="{display: modal_dialog_display}">
		<div class="order_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title red_color">{{modal_dialog_title}}</h4>
        </div>
        <div class="modal-body">
          <form class="shaixuan_form">
            <div class="row">
              <div class="col-md-12">
                <p>{{modal_dialog_msg}}</p>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="modal_dialog_display='none'">知道了</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>  
</template>

<script>
import PassWordView from "@/components/password/password";
import api from "@/api";
import md5 from 'js-md5';

export default {
  data() {
    return {
      availableBalance: 0, //可提现金额
      frozenAmount: 0, //不可提现金额
      withdrawalsAmount: "", //当前输入的要提现的金额
      modal_dialog_display: "none", //悬浮框是否显示,block为显示,none为隐藏
      modal_dialog_title: "", //提示框的标题
      modal_dialog_msg: "", //提示框内容
      inputpasswordview: false,
      password: "",
      passwordCorrect: false
    };
  },
  mounted() {
    this.init();
  },
  activated () {
    this.init();
  },
  methods: {
    init() {
      this.availableBalance = this.$route.query.available;
      this.frozenAmount = this.$route.query.frozen;
      this.$emit("wx-load2");
    },
    clickWitdrawOrCause(clickType) {
      switch (clickType) {
        case "withdraw":
          this.modal_dialog_title = "提现申请成功";
          this.modal_dialog_msg =
            "您的提现申请已提交成功，系统将在24小时内转入您的微信零钱，请注意查收";
          this.modal_dialog_display = "block";
          break;
        case "cause":
          this.modal_dialog_title = "温馨提示";
          this.modal_dialog_msg = "该笔资金为冻结金额";
          this.modal_dialog_display = "block";
          break;
      }
    },
    inputPassword() {
      if (this.withdrawalsAmount != "") {
        this.inputpasswordview = true;
      } else {
        this.$alert("请输入提现金额");
      }
    },
    getPassWord(password) {
      setTimeout(() => {
        if (password.length === 6) {
          api.account
            .pay_withdraw({
              amount: this.withdrawalsAmount,
              password: md5(password)
            })
            .then(res => {
              console.log(JSON.stringify(res.data))
              if(res.data.status){
                this.inputpasswordview = false;
                this.clickWitdrawOrCause("withdraw");
              }else {
                this.passwordCorrect = true;
              }
            });
        } else {
          this.passwordCorrect = false;
        }
      }, 100);
    }
  },
  watch: {
    withdrawalsAmount(value) {
      if (value === "") return;
      var reg = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;
      var indexof = value.indexOf(".");
      var valueLength = value.length - 1;
      if (
        (!reg.test(value) && (indexof != valueLength) | (indexof == 0)) ||
        parseFloat(value) > this.availableBalance
      ) {
        if (parseFloat(value) > this.availableBalance)
          this.$alert("提现金额不能大于可提现金额");
        this.withdrawalsAmount = value.substring(0, valueLength);
      }
    }
  },
  filters: {
    initAvailable(available) {
      return "可提现 " + available + " 元";
    }
  },
  components: {
    PassWordView
  }
};
</script>