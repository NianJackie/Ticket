<template>
<div>
  <div class="row ticket_wrap search_wrap my_order mysell_order">
    <div class="col-xs-12 search_top margin_bottom_10 affix" style="padding-bottom: 0;height: 90px;">
      <div class="header_button payment_arrow">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true" style="margin-top: 5px;"></span></a>
      </div>
      <div class="search_content">
        <span class="glyphicon icon_search" aria-hidden="true"></span>
        <input v-model="query" type="text" class="form-control" placeholder="搜索国家 城市 场次" style="background: #647096;border:none">
        <button @click="tosearch()" class="btn">搜索</button>
      </div>
      <ul class="nav nav-tabs">
        <li v-bind:class="{active: type === 'seller_unrelease'}">
          <a @click="fetch('seller_unrelease',true)" data-toggle="tab" href="#order_wait">待发布</a>
        </li>
        <li v-bind:class="{active: type === 'seller_release'}">
          <a @click="fetch('seller_release',true)" data-toggle="tab" href="#order_published">已发布</a>
        </li>
        <li v-bind:class="{active: type === 'seller_unshippingList'}">
          <a @click="fetch('seller_unshippingList',true)" data-toggle="tab" href="#order_unshipping">待发货</a>
        </li>
        <li v-bind:class="{active: type === 'seller_shippingList'}">
          <a @click="fetch('seller_shippingList',true)" data-toggle="tab" href="#order_shipping">已发货</a>
        </li>
        <li v-bind:class="{active: type === 'seller_finishList'}">
          <a @click="fetch('seller_finishList',true)" data-toggle="tab" href="#order_completed">已完成</a>
        </li>
      </ul>
    </div>
    <div ref="wrapper" class="col-xs-12 tab-content margin_top_100 padding_0" :style="{height: wrapperHeight + 'px'}" style="overflow: scroll; margin-bottom: 0;">
      <div v-if="type === 'seller_unrelease'" id="order_wait" class="tab-pane fade active in" 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <div v-for="i in list" class="myorder_list">
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" :src="i.image" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>{{i.name}}</h2>
                <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
                <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.grade}}</div>
                <div class="content">
                  <p class="article"><span>￥{{i.price || 0}} </span><i>{{i.stock}}张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix">
              <span class="pull-right">
                <button @click="torelease(i)" class="btn red_btn">发布</button>
              </span>
            </div>
          </div>
      </div>
      <div v-if="type === 'seller_release'" id="order_published" class="tab-pane fade active in"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-for="i in list" class="myorder_list">
          <div class="item clearfix">
            <div class="pic">
                <p class="cover"><img class="" :src="i.image" onload="chgdivimgwh(this,80,112)"></p>
            </div>
            <div class="info">
              <h2>{{i.name}}</h2>
              <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
              <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
              <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.grade}}</div>
              <div class="content">
                <p class="article"><span>￥{{i.price||0}} </span><i>{{i.stock}}张票</i></p>
              </div>
            </div>
          </div>
          <div class="order_number clearfix">
            <span class="pull-right">
              <button class="btn white_bg" @click="undercarriage(i)">下架</button>
              <button class="btn lightgray_btn">比赛结束</button>
            </span>
          </div>
        </div>
      </div>
      <div v-if="type === 'seller_unshippingList'" id="order_unshipping" class="tab-pane fade active in"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-for="i in list" class="myorder_list">
          <div class="order_number"><span class="pull-right">{{i.indentStatus_text}}</span>订单编号：{{i.sn}}</div>
          <div class="item clearfix" @click="toorder(i)">
            <div class="pic">
              <p class="cover"><img class="" :src="i.matchImageUrl" onload="chgdivimgwh(this,80,112)"></p>
            </div>
            <div class="info">
              <h2>{{i.name}}</h2>
              <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
              <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
              <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.grade}}</div>
              <div class="content">
                <p class="article"><span>￥{{i.product.price||0}}</span><i>{{i.count}}张票</i></p>
              </div>
            </div>
          </div>
          <div class="order_number clearfix">
            <p class="pull-left margin_top_5" v-if="i.indentStatus === 2" >
              <i>买家发起售后申请，请尽快处理</i>
            </p>
            <span class="pull-right">
              <button
                class="btn white_bg" 
                style="padding: 6px 12px;" 
                v-show="i.indentStatus === 2"
                @click="toorder(i)">处理售后</button>
              <button class="btn white_bg" 
                v-show="i.indentStatus !== 2" 
                @click="toorder(i)">发货</button>
            </span>
          </div>
        </div>
      </div>
      <div v-if="type === 'seller_shippingList'" id="order_shipping" class="tab-pane fade active in"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <div v-for="i in list" class="myorder_list">
            <div class="order_number"><span class="pull-right">{{i.indentStatus_text}}</span>订单编号：{{i.sn}}</div>
            <div class="item clearfix" @click="toorder(i)">
              <div class="pic">
                <p class="cover"><img class="" :src="i.matchImageUrl" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>{{i.name}}</h2>
                <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
                <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.grade}}</div>
                <div class="content">
                  <p class="article"><span>￥{{i.price||0}} </span><i>{{i.stock}}张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix" v-show="i.indentStatus === 2">
              <p class="pull-left margin_top_5"><i>买家发起售后申请，请尽快处理</i></p>
              <span class="pull-right" >
                <button class="btn white_bg" style="padding: 6px 12px;" @click="toorder(i)">处理售后</button>
              </span>
            </div>
          </div>
      </div>
      <div v-if="type === 'seller_finishList'" id="order_completed" class="tab-pane fade active in"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <div v-for="i in list" class="myorder_list">
          <div class="order_number"><span class="pull-right">{{i.indentStatus_text}}</span>订单编号：{{i.sn}}</div>
          <div class="item clearfix" @click="toorder(i)">
            <div class="pic">
              <p class="cover"><img class="" :src="i.matchImageUrl" onload="chgdivimgwh(this,80,112)"></p>
            </div>
            <div class="info">
              <h2>{{i.name}}</h2>
              <div class="date"><span class="fa_icon time_icon"></span>{{i.matchBeginDate | datetime}}</div>
              <div class="region"><span class="fa_icon address_icon"></span>{{i.matchPlace}}</div>
              <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>{{i.grade}}</div>
              <div class="content">
                <p class="article"><span>￥{{i.price||0}} </span><i>{{i.stock}}张票</i></p>
              </div>
            </div>
          </div>
          <div class="order_number clearfix" v-show="indentStatus === 2">
            <p class="pull-left margin_top_5"><i style="color: #3f3f3f;">卖家同意售后申请</i></p>
            <span class="pull-right">
              <button class="btn white_bg" style="padding: 6px 12px;" @click="toorder(i)">处理售后</button>
            </span>
          </div>
        </div>
      </div>
			<div class="default_prompt" v-if="emptyShow">{{ emptyMsg }}</div>
    </div>
  </div>
</div>
</template>

<script>
import api from "@/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      query: "",
      list: [],
      wrapperHeight: 0,
      emptyShow: false,
      emptyMsg: "nihao",
      pageNumber: 1,
      pageSize: 2,
      loading: false,
      type: "",
      totalPage: 9999
    };
  },
  watch: {},
  activated() {
    this.init();
  },
  methods: {
    init() {
      console.log("高度:", this.wrapperHeight);
      this.pageNumber = 1;
      this.pageSize = 10;
      this.totalPage = 9999;
      this.list = [];
      this.loading = false;
      this.fetch("seller_unrelease", true);
    },
    loadMore() {
      if (this.loading) return;
      this.loading = true;
      if (this.pageNumber > this.totalPage) return;
      this.pageNumber++;
      this.fetch(this.type, false);
      this.$emit("wx-load2");
    },
    fetch(type, firstFetch) {
      if (firstFetch) {
        this.pageNumber = 1;
        this.pageSize = 10;
        this.totalPage = 9999;
        this.list = [];
        this.loading = false;
        this.type = type;
      }
      if (this.pageNumber > this.totalPage) return;
      let query = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      this.loading = true;
      api.order[type](query).then(res => {
        if (res.data.content) {
          this.list = this.list.concat(this.decideStatus(res.data.content));
          this.totalPage = res.data.totalPage;
        } else {
          this.totalPage = 0;
        }
        if (this.pageNumber === 1) {
          this.decideEmpty(type);
        }
        this.loading = false;
      });
    },
    decideEmpty(type) {
      if (this.list.length === 0) {
        switch (type) {
          case "seller_unrelease":
            this.emptyMsg = "没有待发布的商品";
            break;
          case "seller_release":
            this.emptyMsg = "没有已发布的商品";
            break;
          case "seller_unshippingList":
            this.emptyMsg = "没有待发货的订单";
            break;
          case "seller_shippingList":
            this.emptyMsg = "没有已发货的订单";
            break;
          case "seller_finishList":
            this.emptyMsg = "没有已完成的订单";
            break;
        }
        this.emptyShow = true;
      } else {
        this.emptyShow = false;
      }
    },
    torelease(i) {
      this.$router.push({
        name: "transfer/order_wait",
        query: {
          id: i.id
        }
      });
    },
    decideStatus(contents) {
      contents.forEach(orderData => {
        var statusOrder = orderData.statusOrder; //订单状态
        var statusPayment = orderData.statusPayment; //支付状态
        var statusShipping = orderData.statusShipping; //物流状态

        /**
         * 0 : 待发货
         * 1 : 已发货
         * 2 : 售后中
         * 3 : 已完成
         * 4 : 已取消
         */
        var indentStatus = 0;
        var indentStatus_text = "待发货";
        if (statusOrder === "create") {
          if (statusPayment === "success") {
            if (statusShipping === "unshipped") {
              //待发货
              indentStatus = 0;
              indentStatus_text = "待发货";
            } else if (statusShipping === "shipped") {
              //已发货
              indentStatus = 1;
              indentStatus_text = "已发货";
            } else {
              if (statusOrder === "afterSale") {
                //已完成
                indentStatus = 3;
                indentStatus_text = "已完成";
              }
            }
          }
        } else if (statusOrder === "cancel") {
          //已取消
          indentStatus = 4;
          indentStatus_text = "已取消";
        } else if (statusOrder === "afterSale") {
          //售后中
          indentStatus = 2;
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

      return contents;
    },
    tosearch() {
      let query = {};
      if (this.query) {
        query.query = this.query;
      }
      this.$router.push({
        name: "transfer/search",
        query: query
      });
    },
    toorder(i) {
      this.$router.push({
        name: "center/order",
        query: {
          id: i.id,
          source: "selled"
        }
      });
    },
    undercarriage(item) {
      MessageBox({
        title: "温馨提示",
        message: "确定下架该球票信息吗？",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          api.ticket.product_cancel({ id: item.id }).then(res => {
            this.$alert("下架成功");
            this.init();
          });
        }
      });
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    this.init();
  }
};
</script>