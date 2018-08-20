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
        <div class="order_state">订单状态：{{indentStatus_text}}</div>
      </div>
      <div class="col-xs-12 order_item margin_top_10 wl_news" v-show="!isBought && indentStatus === 6">
				<ul class="clearfix">
				  <li>
            <em class="qz">物流公司</em>
            <span class="input_box">
              <input 
                class="form-control red_color" 
                id="exampleInputEmail1" 
                placeholder="请输入物流公司名称" 
                v-model="logistics_company"
                type="text">
            </span>
          </li>
				  <li>
            <em class="qz">快递单号</em>
            <span class="input_box">
              <input 
                class="form-control red_color" 
                id="exampleInputEmail1" 
                placeholder="请输入快递单号" 
                v-model="logistics_number"
                type="text">
            </span>
          </li>
				</ul>
			</div>
      <div class="col-xs-12 padding_0">
        <div class="receiving_address">
          <span class="address_icon"></span>
          <div class="address_news clearfix">
            <div class="name">收货人：{{orderData.name}}<span class="pull-right">{{orderData.phone}}</span></div>
            <p>{{orderData.address}}</p>
          </div>
        </div>
        <div class="receiving_address delivery" v-show="orderData.logisticsNum">
          <span class="address_icon delivery_icon"></span>
          <div class="address_news clearfix">
            <div class="name">快递单号：{{orderData.logisticsNum}}</div>
            <p class="gray_font">快递公司:{{orderData.logisticsCompany}}</p>
          </div>
          <!--<span class="right_arrow"></span>-->
        </div>
        <div class="item margin_bottom_10 clearfix">
          <div class="pic">
            <p class="cover">
              <img class="" :src="orderData.product.matchImageUrl" onload="chgdivimgwh(this,80,112)" style="margin-left: 0px;" width="80" height="112"></p>
          </div>
          <div class="info">
            <h2>{{orderData.product.fullName}}</h2>
            <div class="date margin_top_5"><span class="fa_icon time_icon"></span>{{orderData.product.formatCreateDate}}</div>
            <div class="region"><span class="fa_icon address_icon"></span>{{orderData.product.matchPlace}}</div>
            <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{orderData.product.grade}}</div>
            <div class="content">
              <p class="article"><em class="pull-right">{{orderData.product.sellMethodName}}</em><span>{{orderData.product.price | moneyfilters}}</span><i>{{orderData.count}}张票</i></p>
            </div>
          </div>
        </div>
        <div class="order_item pending_delivery_item background_none clearfix">
          <ul>
            <li>订单编号：{{orderData.sn}}</li>
            <li>下单时间：{{orderData.formatTimeCreateDate}}</li>
            <li>支付方式：微信支付</li>
            <li>取票方式：快递包邮</li>
            <li>卖票人信息：{{orderData.product.sellerName}}  {{orderData.product.sellerPhone}}  {{orderData.product.sellerAddress}}发货</li>
          </ul>
          <div class="address_list">
						<div class="realname_title">实名购票信息</div>
							<div class="address_group" v-for="item in orderData.purchasers">
								<div class="name">
                  <div class="state_left">
                    <span class="select"></span>
                    {{item.cnName}} {{item.enName}}
                  </div>
                </div>
								<ul class="realname_item clearfix">
									<li>护照号码<p>{{item.passportNum}}</p></li>
									<li>出生年月<p>{{item.birthday | datetime}}</p></li>
									<li>签发日期<p>{{item.issueDate | datetime}}</p></li>
									<li>有效期至<p>{{item.expireDate | datetime}}</p></li>
								</ul>
							</div>
							<div class="view_more" v-show="orderData.purchasers.length > 2" @click="clickMore">查看更多</div>
						</div>
          <ul class="total_amount">
            <li><span class="pull-right">{{orderData.amount | moneyfilters}}</span>总金额</li>
            <li><span class="pull-right">{{0 | moneyfilters}}</span>运费</li>
            <li class="sfk">实付款：<span class="red_color">{{orderData.amount | moneyfilters}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="order_bottom orderdetail_bottom" v-show="false">
      <div class="order_number clearfix"><span class="margin_top_6 pull-right"><button class="btn">售后</button></span></div>
    </div>
    <div class="order_bottom orderdetail_bottom" v-show="false">
      <div class="order_number fontsize_12 gray_font"><span class="pull-right" style="margin-top: -3px;"><!--<button class="btn">售后</button>--><button class="btn zf_btn" style="padding: 6px 12px;">立即支付</button></span><i>25分32秒</i>后未支付将取消订单</div>
    </div>

    <div class="order_bottom orderdetail_bottom" v-show="indentButtonList.length !== 0">
      <div class="order_number clearfix">
        <span class="margin_top_6 pull-right">
          <button class="btn" 
            v-for="(item ,index) in indentButtonList" 
            style="padding: 6px 20px;" 
            :class="{'zf_btn' : index === 1 | indentButtonList.length === 1}" 
            @click="clickButton(item.type)">
            {{item.name}}
          </button>
        </span>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import { setTimeout } from "timers";
import wxpay from "@/util/wxpay";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      id: null,
      customerId: null,
      isRefreshBack: false,
      logistics_company: "",
      logistics_number: "",
      orderData: {
        product: {},
        purchasers: {}
      },
      isBought: true,
      isDelivergoods: false,
      /**
       * 0 : 未支付
       * 1 : 未发货
       * 2 : 已发货
       * 3 : 已完成
       * 4 : 售后中
       * 5 : 已取消
       * 6 : 待发货
       * 7 : 已发货
       */
      indentStatus: 0,
      indentStatus_text: "待支付",
      /**
       * 0 : 取消订单
       * 1 : 支付
       * 2 : 发起售后
       * 3 : 确认收货
       * 4 : 查看售后
       * 5 : 发货
       * 6 : 处理售后
       */
      indentButtonList: []
    };
  },
  watch: {
    $route(to, from) {
      if (
        to.name === "center/order" &&
        from.name !== "center/order_purchasers"
      ) {
        this.init();
      }
    }
  },
  methods: {
    init() {
      this.isBought = this.$route.query.source === "bought";
      this.id = this.$route.query.id;
      api.order.buyer_detail({ id: this.id }).then(res => {
        this.orderData = res.data;
        this.indentButtonList = [];
        this.decideStatus();
        this.$emit("wx-load2");
      });
    },
    decideStatus() {
      var statusOrder = this.orderData.statusOrder; //订单状态
      var statusPayment = this.orderData.statusPayment; //支付状态
      var statusShipping = this.orderData.statusShipping; //物流状态

      if (statusOrder === "create") {
        if (statusPayment === "success") {
          if (statusShipping === "unshipped") {
            //未发货
            if (this.isBought) {
              this.indentStatus = 1;
              this.indentStatus_text = "交易中";
            } else {
              this.indentStatus = 6;
              this.indentStatus_text = "未发货";
            }
            this.isDelivergoods = false;
          } else if (statusShipping === "shipped") {
            //已发货
            if (this.isBought) {
              this.indentStatus = 2;
              this.indentStatus_text = "交易中";
            } else {
              this.indentStatus = 7;
              this.indentStatus_text = "已发货";
            }
            this.isDelivergoods = true;
          } else {
            //已完成
            this.indentStatus = 3;
            this.indentStatus_text = "已完成";
            this.isDelivergoods = true;
          }
        } else {
          //未支付
          this.indentStatus = 0;
          this.indentStatus_text = "未支付";
          this.isDelivergoods = false;
        }
      } else if (statusOrder === "cancel") {
        //已取消
        this.indentStatus = 5;
        this.indentStatus_text = "已取消";
      } else if (statusOrder === "afterSale") {
        //售后中
        this.indentStatus = 4;
        this.indentStatus_text = "交易中";
      }
      this.decideButton();
    },
    decideButton() {
      console.log("订单状态", this.indentStatus);
      switch (this.indentStatus) {
        case 0:
          //未支付
          this.pushButton("取消订单", 0);
          this.pushButton("立即支付", 1);
          break;
        case 1:
          //未发货
          if (this.isBought) {
            this.pushButton("发起售后", 2);
          } else {
            this.pushButton("发货", 5);
          }
          break;
        case 2:
          //已发货
          this.pushButton("确认收货", 3);
          this.pushButton("发起售后", 2);
          break;
        case 4:
          //售后中
          if (this.isBought) {
            this.pushButton("查看售后", 4);
          } else {
            this.pushButton("处理售后", 6);
          }
          break;
        case 6:
          //待发货
          if (!this.isBought) this.pushButton("发货", 5);
          break;
      }
    },
    pushButton(name, type) {
      this.indentButtonList.push({
        name: name,
        type: type
      });
    },
    clickButton(type) {
      switch (type) {
        case 0:
          //取消订单
          this.cancelOrder();
          break;
        case 1:
          //支付
          this.goPay();
          break;
        case 2:
          //发起售后
          if (this.orderData.complaint) {
            this.customerId = this.orderData.complaint.id;
          } else {
            this.customerId = null;
          }
          this.$router.push({
            name: "center/customer_detail",
            query: {
              id: this.customerId,
              orderId: this.id,
              isBought: this.isBought
            }
          });
          break;
        case 3:
          //确认收货
          this.buyerConfirm();
          break;
        case 4:
          //查看售后
          if (this.orderData.complaint) {
            this.customerId = this.orderData.complaint.id;
          } else {
            this.customerId = null;
          }
          this.$router.push({
            name: "center/customer_detail",
            query: {
              orderId: this.id,
              id: this.customerId,
              isBought: this.isBought
            }
          });
          break;
        case 5:
          //未发货
          if (!this.logistics_company) {
            this.$alert("请输入物流公司信息");
            return;
          }
          if (!this.logistics_number) {
            this.$alert("请输入物流单号");
            return;
          }
          api.order
            .seller_confirm({
              id: this.id,
              logisticsCompany: this.logistics_company,
              logisticsNum: this.logistics_number
            })
            .then(res => {
              this.$alert("发货成功");
              this.isRefreshBack = true;
              this.init();
            });
          break;
        case 6:
          //处理售后
          if (this.orderData.complaint) {
            this.customerId = this.orderData.complaint.id;
          } else {
            this.customerId = null;
          }
          this.$router.push({
            name: "center/customer_detail",
            query: {
              orderId: this.id,
              id: this.customerId,
              isBought: this.isBought
            }
          });
          break;
      }
    },
    buyerConfirm() {
      //确认收货
      MessageBox({
        title: "温馨提示",
        message: "是否确认收货?",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          api.order.buyer_confirm({ id: this.orderData.id }).then(res => {
            this.$alert("确认成功");
            this.init();
          });
        }
      });
    },
    cancelOrder() {
      // 取消订单
      MessageBox({
        title: "温馨提示",
        message: "确定取消此条订单？",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          api.order.buyer_cancel({ id: this.orderData.id }).then(res => {
            this.$alert("取消成功");
            this.init();
          });
        }
      });
    },
    goPay() {
      api.order
        .pay({
          sn: this.orderData.sn
        })
        .then(res => {
          wxpay.pay(
            res.data,
            () => {
              api.order
                .orderConfirm({
                  sn: this.orderData.sn
                })
                .then(res => {
                  this.$router.push({
                    name: "home/pay_success",
                    query: {
                      id: this.orderId
                    }
                  });
                });
            },
            res => {
              if (res.err_msg == "get_brand_wcpay_request:fail") {
                that.$alert("支付失败");
              }
            }
          );
        });
    },
    clickMore() {
      //查看实名购票人更多信息
      this.$router.push({
        name: "center/order_purchasers",
        query: {
          purchasers: this.orderData.purchasers
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
