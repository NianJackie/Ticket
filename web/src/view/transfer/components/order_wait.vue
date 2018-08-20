<template>
<div>
  <div class="row ticket_wrap order wait_release">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:void(0);"  @click="$router.go(-1)">
          <span class="glyphicon  left_returnarrow" aria-hidden="true">
          </span>
        </a>
      </div>
      <h1 class="header_title">待发布</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div v-if="money" class="col-xs-12 order_item margin_bottom_10">
        <ul>
          <li>
            <span class="pull-right" @click="$router.push({name: 'center/recharge'})">
              ￥{{this.money.deposit}}元
              <em class="balance" v-if="this.money.availableBalance < this.money.deposit">
                （余额{{this.money.availableBalance}}元,请充值）
              </em>
              <em class="balance" v-else>
                （余额{{this.money.availableBalance}}元）
              </em>
              <i class="right_arrow" style="margin-left: -10px;">
              </i>
            </span>保证金
            <i class="help" @click="customer_service_pop2 = true"></i>
          </li>
        </ul>
      </div>
      <div v-if="detail" class="col-xs-12 padding_0">
        <div class="item margin_bottom_1 clearfix">
          <div class="pic">
            <p class="cover"><img class="" :src="detail.image" onload="chgdivimgwh(this,60,80)" style="margin-left: 0px;" width="80" height="112"></p>
          </div>
          <div class="info">
            <h2>{{detail.title}} {{detail.name}}</h2>
            <div class="date"><span class="fa_icon time_icon"></span>{{detail.matchBeginDate | datetime}}</div>
            <div class="region"><span class="fa_icon address_icon"></span>{{detail.matchPlace}}</div>
          </div>
        </div>
        <div class="order_item  background_none clearfix">
          <ul class="clearfix">
            <li><em class="qz">球票等级</em><span class="input_box">{{detail.grade}}</span></li>
            <li><em class="qz">票面价格</em><span class="input_box">￥{{detail.marketPrice}}</span></li>
            <li><em class="qz">出售方式</em><span class="input_box">{{detail.sellMethodName}}</span></li>
            <li><em class="qz">销售价格</em><span class="input_box">￥{{detail.price}}</span></li>
            <li><em class="qz">出售数量</em><span class="input_box">{{detail.stock}}</span></li>
            <li><em class="qz">配送方式</em><span class="input_box">快递包邮</span></li>
            <li><em class="qz">下架时间</em><span class="input_box">比赛前一天 </span></li>
          </ul>
        </div>
      <div class="reminder">买家确认收货后，平台将收取 {{detail.eachServiceAmount || 0}} 元/张服务费，服务费收费标准详见<a @click="customer_service_pop1 = true" href="javascript:;">《服务费收取标准》</a></div>
      </div>
    </div>
  </div>
  <!--悬浮按钮 start-->
  <div class="order_bottom realname">
    <button @click="submit" class="btn red_btn" :class="{gray_btn : !submitRedClass}">确认支付保证金并发布</button>
  </div>
  <!--悬浮按钮 end-->
  <!--服务费收取标准 start-->
  <div class="ticketing_instructions_pop customer_service_pop" v-show="customer_service_pop1">
    <div class="ticketing_instructions">
      <p class="title">服务费收取标准</p>
      <ul class="ticket_price">
        <li><span></span>200元以下10元/张；</li>
        <li><span></span>200-500元20元/张；</li>
        <li><span></span>500-1000元40元/张；</li>
        <li><span></span>1000-5000元100元/张；</li>
        <li><span></span>5000-10000元300元/张；</li>
        <li><span></span>10000元以上500元/张；</li>
      </ul>
      <div @click="customer_service_pop1 = false" class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
  <!--服务费收取标准 end-->
  <!--平台保证金管理细则 start-->
  <div class="ticketing_instructions_pop customer_service_pop" v-show="customer_service_pop2">
    <div class="ticketing_instructions">
      <p class="title">平台售后赔付细则</p>
      <div class="reminder">卖家发布球票需缴纳保证金，买家确认收货后保证金将返还到“我的账户”中，当卖家爽约或球票为假票、票不对版、超时发货时保证金将作为违约金赔付给买家。</div>
      <ul class="ticket_price">
        <li><span></span>票品售价200元以下售后赔付50元/张</li>
        <li><span></span>票品售价200-1000元售后赔付100元/张</li>
        <li><span></span>票品售价2000-5000元售后赔付500元/张</li>
        <li><span></span>票品售价5000-10000元售后赔付1000元/张</li>
        <li><span></span>票品售价10000元售后赔付2000元/张</li>
      </ul>
      <div @click="customer_service_pop2 = false" class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
  <!--平台保证金管理细则 end-->
  <!--提现失败 start-->
  <div class="withdrawals_fail" style="display:none ;">充值成功</div>
  <!--提现失败 end-->
</div>  
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      id: null,
      detail: null,
      money: null,
      customer_service_pop1: false,
      customer_service_pop2: false,
      submitRedClass : false
    };
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.submitRedClass = false
      this.id = this.$route.query.id;
      api.ticket.product_detail({ id: this.id }).then(res => {
        this.detail = res.data;
        api.ticket
          .depositAndService({
            price: this.detail.price,
            count: this.detail.stock
          })
          .then(res => {
            this.money = res.data;
            if(this.money.deposit <= this.money.availableBalance){
              this.submitRedClass = true
            }
            this.$emit("wx-load2");
          });
      });
    },
    submit() {
      if (this.money.deposit > this.money.availableBalance) {
        this.$router.push({
          name: "center/recharge",
          query: {
            source: "order"
          }
        });
        return;
      }
      api.ticket.product_add({ id: this.id }).then(res => {
        this.$router.replace({
          name: "transfer/order_send",
          query: {
            id: this.id
          }
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>