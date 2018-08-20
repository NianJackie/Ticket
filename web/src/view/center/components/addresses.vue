<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 ticket_topnav">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">我的地址管理</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 margin_top_41 margin_bottom_60 padding_0 clearfix">
        <div v-for="i in list" class="address_list clearfix">
          <div class="address_group" @click="clickAddress(i)">
            <div class="name">
              <span class="select" v-bind:class="{active: orderAddress.id === i.id}" v-if="!sourceCenter"></span>收货人：{{i.consignee}}
              <span class="pull-right">{{i.phone}}</span>
            </div>
            <p>收货地址：{{i.address}}</p>
          </div>
          <div class="edit_state clearfix">
            <div v-show="sourceCenter" class="state_left" @click="setDefault(i)">
              <span v-bind:class="{active: i.isDefault}" class="select"></span>
              默认地址
            </div>
            <div class="state_right">
              <a @click.stop="showDel(i)" v-show="orderAddress.id !== i.id">
                <span class="fa_icon delete_icon"></span>删除</a>
              <a @click.stop="$router.push({name: 'center/address', query: {id: i.id}})" href="javascript:;">
                <span class="fa_icon edit_icon"></span>编辑</a>
            </div>
          </div>
        </div>
        <div class="default_prompt" v-show="!list.length">暂无相关地址</div>
    </div>
    <div class="order_bottom realname">
      <a @click="turnAddAddress" href="javascript:;"><button class="btn red_btn">新建地址</button></a>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import { MessageBox } from "mint-ui";
import storage from "@/util/storageUtils.js";
export default {
  data() {
    return {
      list: [],
      cur: null,
      orderAddress: {
        id: ""
      },
      sourceCenter: true
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "center/addresses" && from.name === "center/address") {
        if (this.$store.getters.getOrderAddress.areaName === "address") this.init();
        return;
      }
      if (to.name === "center/addresses" && from.name !== "center/address") {
        this.init();
      }
    }
  },
  methods: {
    init() {
      if (this.$store.getters.getOrderAddress.id !== undefined) {
        this.orderAddress = this.$store.getters.getOrderAddress;
      } else {
        this.orderAddress.id = storage.getInfo("address");
      }
      this.sourceCenter = this.$route.query.source === "center";
      this.list = [];
      api.account.receiver_list().then(res => {
        if (res.data) {
          this.list = res.data.content;
        } else {
          this.list = [];
        }
        this.$emit("wx-load2");
      });
    },
    setDefault(i) {
      api.account.receiver_setInit({ id: i.id }).then(res => {
        this.list.map(j => (j.isDefault = 0));
        i.isDefault = 1;
      });
    },
    turnAddAddress() {
      this.$store.commit("setOrderAddress", this.orderAddress);
      this.$router.push({ name: "center/address" });
    },
    del() {
      if (this.cur) {
        api.account.receiver_delete({ id: this.cur.id }).then(res => {
          this.$alert("删除成功");
          this.init();
        });
      }
    },
    clickAddress(item) {
      if (!this.sourceCenter) {
        this.orderAddress = item;
        this.$store.commit("setOrderAddress", this.orderAddress);
        this.$router.go(-1);
      }
    },
    showDel(item) {
      MessageBox({
        title: "温馨提示",
        message: "确认删除此条地址吗？",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "删除",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.cur = item;
          this.del();
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>