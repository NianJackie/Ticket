<template>
<div>
  <div class="row ticket_wrap center real_name_information">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="goBack"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">我的实名信息管理</h1>
      <div @click="tonew" class="header_button text-right">
      </div>
    </div>
    <div class="col-xs-12 margin_top_50 margin_bottom_60 padding_0 clearfix" v-show="list.length">
      <div v-for="i in list" class="address_list clearfix">
        <div 
          class="address_group" 
          @click="tosubmit(i)" 
          :class="{prohibit : i.select && order_purchasers[index].id !== i.id}">
          <div class="name">
            <div class="state_left">
              <span 
                :class="i.selectClass" >
              </span>{{i.cnName}} {{i.enName}}
            </div>
          </div>
          <ul class="realname_item clearfix">
            <li>护照号码<p>{{i.passportNum}}</p></li>
            <li>出生年月<p>{{i.birthday | datetime}}</p></li>
          </ul>
          <ul class="realname_item clearfix">
            <li>签发日期<p>{{i.issueDate | datetime}}</p></li>
            <li>有效期至<p>{{i.expireDate | datetime}}</p></li>
          </ul>
        </div>
        <div class="edit_state clearfix">
          <div class="state_right">
            <a @click.stop="showDel(i)" href="javascript:;" v-show="!i.select">
              <span class="fa_icon delete_icon"></span>删除</a>
            <a @click.stop="toedit(i)" href="javascript:;"><span class="fa_icon edit_icon"></span>编辑</a>
          </div>
        </div>
      </div>
    </div>

    <div class="default_prompt" v-show="!list.length">暂无实名信息</div>

    <div class="order_bottom realname">
      <a @click="tonew()" href="javascript:;"><button class="btn red_btn">新增实名信息</button></a>
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
      id: null,
      index: null,
      cur: null,
      order_purchasers: [],
      selectClass: "select gray_select active",
      select: {
        id: null
      },
      list: []
    };
  },
  activated () {
    this.init();
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      this.index = this.$route.query.index;

      this.order_purchasers = this.$store.getters.getOrderPurchasers;

      if (this.order_purchasers.length == 0){
         this.goBack();
         return ;
      }

      if (this.order_purchasers[this.index].id) {
        this.select = this.order_purchasers[this.index];
      } else {
        this.select = { id: null };
      }
      api.account.purchaser_list().then(res => {
        if (res.data) {
          this.list = this.judgeSelect(res.data.content);
        } else {
          this.list = [];
        }
        this.$emit("wx-load2");
      });
    },
    judgeSelect(contents) {
      var selectClass = "select gray_select active";

      contents.forEach(element => {
        this.order_purchasers.forEach((item, i) => {
          if (element.id === item.id) {
            if (typeof element.select === "undefined") {
              this.$set(element, "select", true);
            } else {
              element.select = true;
            }
          }
        });
        if (
          element.select &&
          this.order_purchasers[this.index].id !== element.id
        ) {
          selectClass = "select gray_select active";
        } else if (
          element.select &&
          this.order_purchasers[this.index].id === element.id
        ) {
          selectClass = "select active";
        } else {
          selectClass = "select";
        }
        if (typeof element.selectClass === "undefined") {
          this.$set(element, "selectClass", selectClass);
        } else {
          element.selectClass = selectClass;
        }
      });
      return contents;
    },
    tonew() {
      this.$router.push({
        name: "center/my_purchaser_add"
      });
    },
    toedit(i) {
      this.$router.push({
        name: "center/my_purchaser_add",
        query: {
          id: i.id
        }
      });
    },
    showDel(item) {
      MessageBox({
        title: "温馨提示",
        message: "确认删除此条信息吗？",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "删除",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.cur = item;
          this.todel();
        }
      });
    },
    todel() {
      api.account.purchaser_delete({ id: this.cur.id }).then(res => {
        this.init();
      });
    },
    tosubmit(item) {
      if (!item.select || this.order_purchasers[this.index].id === item.id) {
        if (this.index !== null) {
          this.order_purchasers[this.index] = item;
          this.$store.commit("setOrderPurchasers", this.order_purchasers);
        }
        this.goBack();
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.init();
  }
};
</script>