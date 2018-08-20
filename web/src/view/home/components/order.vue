<template>
<div>
  <div class="row ticket_wrap order" v-if="detail">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)">
          <span class="glyphicon  left_returnarrow" aria-hidden="true"></span>
        </a>
      </div>
      <h1 class="header_title">填写信息</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 padding_0">
        <div class="receiving_address" @click.stop="toAddresses">
            <span class="address_icon"></span>
            <div class="address_news clearfix">
              <div class="name">
                <span class="pull-right">{{receiver.phone || '无'}}</span>收货人：{{receiver.consignee || '无'}}
              </div>
              <p>收货地址：{{receiver.address || '无'}}</p>
            </div>
            <span class="right_arrow"></span>
        </div>
      </div>
      <div class="col-xs-12 order_list padding_0">
        <div class="item clearfix">
          <div class="pic">
            <p class="cover"><img class="" :src="detail.image" onload="chgdivimgwh(this,80,112)"></p>
          </div>
          <div class="info">
            <h2>{{detail.title}} {{detail.name}}</h2>
            <div class="date">{{detail.beginDate | datetime}}</div>
            <div class="article">{{detail.place}}</div>
            <div class="content">
              <p class="article"><span>￥{{detail.price || 0}} </span>起<i>{{detail.stock}}张票</i></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 order_item background_none">
        <ul>
          <li>
            <span class="pull-right gray_font">
              {{detail.sellMethodName}}
            </span>
            售票方式
            <i class="help" @click.stop="ticketing_instructions_pop = true"></i>
          </li>
          <li>
            <span v-if="detail.isTogether===true" class="pull-right gray_font">两张连座</span>
            <span v-else class="pull-right gray_font">不连座</span>
            是否连座
          </li>
          <li @click="numberPicker = false">
            <span class="pull-right gray_font">
              <input 
                v-model="number" 
                type="number" 
                class="form-control number_input" 
                placeholder="请输入数量"  
                :disabled="sellMethod === 'together'"  
                @blur.prevent="changeBlur">
            </span>
            数量
          </li>
          <li>
            <span class="pull-right gray_font">快递包邮</span>
            取票方式
          </li>
        </ul>
        <ul>
          <li v-for="(i, index) in purchasers" @click="topurchasers(i, index)">
            <span class="pull-right">{{i.cnName || '请选择'}}
              <i class="right_arrow"></i>
            </span>实名购票信息（第{{index+1}}位）
        </li>
        </ul>
        <ul v-if="detail.provider">
          <li><span class="pull-right gray_font">{{detail.provider.name}}  {{detail.provider.phone}}</span>卖票人信息</li>
        </ul>
        <ul>
          <li><span class="pull-right gray_font">微信支付</span>支付方式</li>
          <li class="tk">
            <span @click.stop="selected = !selected" v-bind:class="{'select_icon': !selected}" class="select_activeicon">
            </span>我已阅读<a href="javascript:;" class="red_color" >《服务条款协议》</a>球票一经出售不退不换
          </li>
          <li class="yellow_bg">票款由平台代收，100%安全有保障</li>
        </ul>
      </div>
      
    </div>
    <div class="order_bottom">
      <span class="padding_left_20">总金额：<i>￥{{detail.price * number}}</i></span>
      <a @click="submit" href="javascript:;"><button class="btn red_btn" :class="{gray_btn:!submitRedClass}">提交订单</button></a>
    </div>
  </div>
  
  <mt-popup v-model="numberPicker" position="bottom">
    <mt-picker :slots="numberSlot" @change="onNumberChange" :visible-item-count="5"></mt-picker>
  </mt-popup>

  <!--售票说明 start-->
  <div class="ticketing_instructions_pop" v-show="ticketing_instructions_pop">
    <div class="ticketing_instructions">
    	<div class="instructions_content">
        <p class="title" v-show="detail.sellMethod === 'double'">双数出售</p>
        <p class="margin_bottom_20" v-show="detail.sellMethod === 'double'">需购买偶数张票，如：2张、4张、6张</p>
        <p class="title" v-show="detail.sellMethod === 'noSinger'">不可留单张</p>
        <p class="margin_bottom_20" v-show="detail.sellMethod === 'noSinger'">购票张数最后不可余1张票，如库存3张票：可购买1张票，余2张票；或可购买3张票，余0张票；不可购买2张票，余1张票。</p>
        <p class="title" v-show="detail.sellMethod === 'together'">必须一起买</p>
        <p class="margin_bottom_20" v-show="detail.sellMethod === 'together'">库存有几张票，下单需拍几张票，如：库存3张票，需一次购买3张票</p>
        <p class="title" v-show="detail.sellMethod === 'split'">可以分开买</p>
        <p class="margin_bottom_20" v-show="detail.sellMethod === 'split'">可以按需求购买，买几张都可以</p>
        <p><a href="javascript:void(0);" v-show="detail.isTogether">两张连座</a></p>
        <p class="margin_bottom_20" v-show="detail.isTogether">购买两张票为连座票，两张票以上尽量连座</p>
        <p><a href="javascript:void(0);"  v-show="!detail.isTogether">不连座</a></p>
        <p class="margin_bottom_20"  v-show="!detail.isTogether">本票品座位不连座</p>
      </div>
      <div @click="ticketing_instructions_pop = false" class="close_icon">
        <button class="btn red_btn">关闭</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import api from "@/api";
import wxpay from "@/util/wxpay";
import storage from "@/util/storageUtils.js";
export default {
  data() {
    return {
      id: null,
      orderId: null,
      detail: {},
      receiver: {},
      selected: false,
      number: "",
      submitRedClass: false,
      sellMethod: "",
      numberPicker: false,
      ticketing_instructions_pop: false,
      purchasers: [],
      numberSlot: [
        {
          flex: 1,
          values: []
        }
      ]
    };
  },
  activated() {},
  watch: {
    $route(to, from) {
      this.selected = "";

      if (to.name === "home/order" && from.name === "center/addresses") {
        this.receiver = this.$store.getters.getOrderAddress || {};
      }

      if (to.name === "home/order" && from.name === "home/purchasers") {
        this.$store.getters.getOrderPurchasers.forEach((item, index) => {
          this.$set(this.purchasers, index, item);
        });
      }

      if (
        to.name === "home/order" &&
        from.name !== "center/addresses" &&
        from.name !== "home/purchasers"
      ) {
        this.init();
      }
    },
    number(nv, ov) {
      if (nv && nv && /[^\d]/g.test(nv)) {
        this.number = nv.replace(/[^\d]/g, "");
      }
      if (nv && nv > this.detail.stock) {
        this.number = nv.substring(0, nv.length - 1);
        this.$alert("购买数量不能大于余票数量");
      }
      if (nv != this.purchasers.length) {
        this.purchasers = [];
        for (var i = 0; i < nv; i++) {
          this.purchasers.push({
            cnName: "",
            enName: "",
            passportNum: "",
            issueDate: "",
            expireDate: "",
            birthday: ""
          });
        }
        this.$store.commit("setOrderPurchasers", this.purchasers);
      }
    },
    receiver() {
      this.submitButtonClass();
    },
    selected() {
      this.submitButtonClass();
    },
    purchasers() {
      this.submitButtonClass();
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      this.number = "";
      api.ticket.product_detail({ id: this.id }).then(res => {
        this.detail = res.data;
        this.sellMethod = res.data.sellMethod;
        if (this.sellMethod === "together") {
          this.number = this.detail.stock;
        }
        this.$emit("wx-load2");
      });
      api.account.receiver_init().then(res => {
        this.receiver = res.data || {};
      });
    },
    changeBlur() {
      var num = this.number;
      if (num == 0) {
        this.number = "";
      }
      switch (this.sellMethod) {
        case "double":
          if (num % 2 == 1 || num > this.detail.stock) {
            this.number = "";
            this.$alert("购买的数量必须是双数");
          }
          break;
        case "noSinger":
          if (num == this.detail.stock - 1) {
            this.number = "";
            this.$alert("球票不能剩余1张");
          }
          break;
      }
    },
    onNumberChange(picker, values) {
      this.number = values[0];
    },
    topurchasers(i, index) {
      this.$store.commit("setOrderPurchasers", this.purchasers);
      this.$router.push({
        name: "home/purchasers",
        query: {
          id: i.id,
          index: index
        }
      });
    },
    toAddresses() {
      this.$store.commit("setOrderAddress", this.receiver);
      storage.setInfo("address", this.receiver.id);
      this.$router.push({
        name: "center/addresses",
        query: {
          source: "order"
        }
      });
    },
    submit() {
      if (!this.receiver.id) {
        this.$alert("请选择收件人");
        return;
      }
      if (!this.selected) {
        this.$alert("请阅读并勾选服务协议");
        return;
      }
      let a = this.purchasers.filter(i => !i.id);
      if (a.length) {
        this.$alert("请填满实名购票信息");
        return;
      }

      api.order
        .buyer_create({
          count: this.number,
          product: this.id,
          name: this.receiver.consignee,
          phone: this.receiver.phone,
          address: this.receiver.address,
          purchasers: this.purchasers
        })
        .then(res => {
          let sn = res.data.sn;
          this.orderId = res.data.id;
          api.order
            .pay({
              sn: sn
            })
            .then(res => {
              wxpay.pay(
                res.data,
                () => {
                  api.order
                    .orderConfirm({
                      sn: sn
                    })
                    .then(res => {
                      this.$router.replace({
                        name: "home/pay_success",
                        query: {
                          id: this.orderId,
                          source: "bought"
                        }
                      });
                    });
                },
                res => {
                  if (res.err_msg == "get_brand_wcpay_request:fail") {
                    this.$alert("支付失败");
                    this.$router.replace({
                      name: "center/bought",
                      source: "order"
                    });
                  }
                }
              );
            });
        });
    },
    submitButtonClass() {
      var isPurchasers = false;
      this.purchasers.forEach((item, index) => {
        if (!item.cnName) isPurchasers = true;
      });
      if (this.receiver !== null && !isPurchasers && this.selected) {
        this.submitRedClass = true;
      } else {
        this.submitRedClass = false;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>