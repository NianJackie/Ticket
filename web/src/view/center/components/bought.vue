<template>
<div>
  <div class="row ticket_wrap ticket_list my_order">
    <div class="col-xs-12">
      <div class="tab-v1 affix">
        <div class="header_button payment_arrow" style="z-index: 100">
          <a href="javascript:;" @click="onBack"><span class="glyphicon left_returnarrow" aria-hidden="true"></span></a>
        </div>
        <tab-view :datas="tableDatas" @clickViewTable="fetch"></tab-view>
      </div>
    </div>
    <div ref="wrapper" class="col-xs-12 tab-content margin_top_50 padding_0" :style="{height: wrapperHeight + 'px'}" style="overflow: scroll; margin-bottom: 0;">
      <div class="tab-pane fade active in" v-if="showContent === 0"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <div v-for="i in list" class="myorder_list">
            <div class="order_number"><span class="pull-right">待支付</span>订单编号：{{i.sn}}</div>
            <div class="item clearfix" @click="toorder(i)">
              <div class="pic">
                <p class="cover"><img class="" :src="i.product.image" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>{{i.matchName}}</h2>
                <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
                <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.matchGrade}}</div>
                <div class="content">
                  <p class="article"><span>￥{{i.amount}} </span><i>{{i.count}}张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number gray_font fontsize_12 clearfix">
              <p class="pull-left margin_top_5" v-show="false">
                <i>25分32秒</i>后未支付将取消订单
              </p>
             <span class="pull-right"><button 
                  v-for="(item ,index) in i.indentButtonList" 
                  class="btn" 
                  :class="{'red_btn' : index === 1 | i.indentButtonList.length === 1}" 
                  style="padding: 6px 12px;" 
                  @click="clickButton(item.type ,i)" >
                  {{item.name}}
                </button>
              </span>
            </div>
        </div>
      </div>
      <div class="tab-pane fade active in" v-if="showContent === 1"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <div v-for="i in list" class="myorder_list">
            <div class="order_number"><span class="pull-right">交易中</span>订单编号：{{i.sn}}</div>
            <div class="item clearfix" @click="toorder(i)">
              <div class="pic">
                <p class="cover"><img class="" :src="i.product.image" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>{{i.matchName}}</h2>
                <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
                <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.matchGrade}}</div>
                <div class="content">
                  <p class="article"><span>￥{{i.amount}} </span><i>{{i.count}}张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix">
              <span class="pull-right">
                <button 
                  v-for="(item ,index) in i.indentButtonList" 
                  class="btn" 
                  :class="{'red_btn' : index === 1 | i.indentButtonList.length === 1}" 
                  style="padding: 6px 12px;" 
                  @click="clickButton(item.type ,i)" >
                  {{item.name}}
                </button>
              </span>
            </div>
        </div>
      </div>

      <div class="tab-pane fade active in" v-if="showContent === 2"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <div v-for="i in list" class="myorder_list">
            <div class="order_number"><span class="pull-right">已完成</span>订单编号：{{i.sn}}</div>
            <div class="item clearfix"@click="toorder(i)">
              <div class="pic">
                <p class="cover"><img class="" :src="i.product.image" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>{{i.matchName}}</h2>
                <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
                <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.matchGrade}}</div>
                <div class="content">
                  <p class="article"><span>￥{{i.amount}} </span><i>{{i.count}}张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix" style="display: none;">
              <span class="pull-right">
                <button 
                  v-for="(item ,index) in i.indentButtonList" 
                  class="btn" 
                  :class="{'red_btn' : index === 1 | i.indentButtonList.length === 1}" 
                  style="padding: 6px 12px;" 
                  @click="clickButton(item.type ,i)" >
                  {{item.name}}
                </button>
              </span>
          </div>
        </div>
      </div>
      <div class="default_prompt" v-if="emptyShow">{{emptyMsg}}</div>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import TabView from "@/components/tab/tab";
import wxpay from "@/util/wxpay";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      emptyShow: false,
      emptyMsg: "",
      showContent: 0,
      tableDatas: ["待支付", "交易中", "已完成"],
      typeDatas: ["buyer_unpayList", "buyer_tradingList", "buyer_finishList"],
      list: [],
      wrapperHeight: 0,
      pageNumber: 1,
      pageSize: 2,
      loading: false,
      totalPage: 9999,
      source: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "center/bought" && from.name !== "center/order") {
        this.init();
      }
    }
  },
  methods: {
    init() {
      this.source = this.$route.query.source;
      this.list = [];
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
      this.pageNumber = 1;
      this.pageSize = 10;
      this.totalPage = 9999;
      this.loading = false;
      this.$emit("wx-load2");
      this.fetch(0, true);
    },
    loadMore() {
      if (this.loading) return;
      this.loading = true;
      if (this.pageNumber > this.totalPage) return;
      this.pageNumber++;
      this.fetch(this.showContent, false);
    },
    fetch(index, firstFetch = true) {
      this.showContent = index;
      if (firstFetch) {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.totalPage = 9999;
        this.list = [];
        this.loading = false;
      }
      if (this.pageNumber > this.totalPage) return;
      let query = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      this.loading = true;
      api.order[this.typeDatas[index]](query).then(res => {
        if (res.data.content) {
          this.list = this.list.concat(this.decideStatus(res.data.content));

          this.totalPage = res.data.totalPage;
        } else {
          this.totalPage = 0;
        }
        if (this.pageNumber === 1) {
          this.decideEmpty(this.showContent);
        }
        this.loading = false;
      });
    },
    toorder(i) {
      this.$router.push({
        name: "center/order",
        query: {
          id: i.id,
          source: "bought"
        }
      });
    },
    decideStatus(contents) {
      contents.forEach(orderData => {
        var statusOrder = orderData.statusOrder; //订单状态
        var statusPayment = orderData.statusPayment; //支付状态
        var statusShipping = orderData.statusShipping; //物流状态
        /**
         * 0 : 未支付
         * 1 : 未发货
         * 2 : 已发货
         * 3 : 已完成
         * 4 : 售后中
         * 5 : 已取消
         */
        var indentStatus = 0;
        var indentStatus_text = "待支付";

        if (statusOrder === "create") {
          if (statusPayment === "success") {
            if (statusShipping === "unshipped") {
              //未发货
              indentStatus = 1;
              indentStatus_text = "未发货";
            } else if (statusShipping === "shipped") {
              //已发货
              indentStatus = 2;
              indentStatus_text = "已发货";
            } else {
              if (statusOrder === "afterSale") {
                //售后中
                indentStatus = 4;
                indentStatus_text = "售后中";
              } else {
                //已完成
                indentStatus = 3;
                indentStatus_text = "已完成";
              }
            }
          } else {
            //未支付
            indentStatus = 0;
            indentStatus_text = "未支付";
          }
        } else if (statusOrder === "cancel") {
          //已取消
          indentStatus = 5;
          indentStatus_text = "已取消";
        } else if (statusOrder === "afterSale") {
          //售后中
          indentStatus = 4;
          indentStatus_text = "售后中";
        }

        if (typeof orderData.indentStatus === "undefined") {
          this.$set(orderData, "indentStatus", indentStatus);
        } else {
          orderData.indentStatus = indentStatus;
        }
        if (typeof orderData.indentStatus_text === "undefined") {
          this.$set(orderData, "indentStatus_text", indentStatus_text);
        } else {
          orderData.indentStatus_text = indentStatus_text;
        }
      });

      return this.decideButton(contents);
    },
    decideEmpty(index) {
      if (this.list.length === 0) {
        switch (index) {
          case 0:
            this.emptyMsg = "没有待支付的订单";
            break;
          case 1:
            this.emptyMsg = "没有交易中的订单";
            this.show = true;
            break;
          case 2:
            this.emptyMsg = "没有已完成的订单";
            break;
        }
        this.emptyShow = true;
      } else {
        this.emptyShow = false;
      }
    },
    decideButton(contents) {
      /**
       * 0 : 取消订单
       * 1 : 支付
       * 2 : 发起售后
       * 3 : 确认收货
       * 4 : 查看售后
       */
      contents.forEach(item => {
        var indentButtonList = [];

        switch (item.indentStatus) {
          case 0:
            //未支付
            indentButtonList.push({
              name: "取消订单",
              type: 0
            });
            indentButtonList.push({
              name: "立即支付",
              type: 1
            });
            break;
          case 1:
            //未发货
            indentButtonList.push({
              name: "发起售后",
              type: 2
            });
            break;
          case 2:
            //已发货
            indentButtonList.push({
              name: "确认收货",
              type: 3
            });
            indentButtonList.push({
              name: "发起售后",
              type: 2
            });
            break;
          case 4:
            //售后中
            indentButtonList.push({
              name: "查看售后",
              type: 4
            });
            break;
        }

        if (typeof item.indentButtonList === "undefined") {
          this.$set(item, "indentButtonList", indentButtonList);
        } else {
          item.indentButtonList = indentButtonList;
        }
      });

      return contents;
    },
    clickButton(type, i) {
      switch (type) {
        case 0:
          //取消订单
          MessageBox({
            title: "温馨提示",
            message: "确定取消此条订单？",
            cancelButtonClass: "cancelButton",
            confirmButtonClass: "confirmButton",
            showCancelButton: true
          }).then(action => {
            if (action === "confirm") {
              api.order.buyer_cancel({ id: i.id }).then(res => {
                this.$alert("取消成功");
                this.init();
              });
            }
          });
          break;
        case 1:
          //支付
          this.goPay(i);
          break;
        case 2:
          //发起售后
          this.$router.push({
            name: "center/order",
            query: {
              id: i.id,
              source: "bought"
            }
          });
          break;
        case 3:
          //确认收货
          MessageBox({
            title: "温馨提示",
            message: "确认确认此条订单？",
            cancelButtonClass: "cancelButton",
            confirmButtonClass: "confirmButton",
            showCancelButton: true
          }).then(action => {
            if (action === "confirm") {
              api.order.buyer_confirm({ id: i.id }).then(res => {
                this.$alert("确认成功");
                this.init();
              });
            }
          });
          break;
        case 4:
          //查看售后
          this.$router.push({
            name: "center/order",
            query: {
              id: i.id,
              source: "bought"
            }
          });
          break;
      }
    },
    goPay(item) {
      api.order
        .pay({
          sn: item.sn
        })
        .then(res => {
          wxpay.pay(
            res.data,
            () => {
              api.order
                .orderConfirm({
                  sn: item.sn
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
    onBack() {
      if (this.source === "order") {
        this.$router.go(-2);
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.init();
  },
  components: {
    TabView
  }
};
</script>