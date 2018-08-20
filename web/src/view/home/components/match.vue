<template>
<div class="row ticket_wrap ticket_list ticket_detail">
  <div class="col-xs-12 ticket_topnav ticketdetail_topnav affix-top" data-spy="affix" data-offset-top="80">
    <div class="header_button text-left">
      <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
    </div>
    <h1 class="header_title">{{detail.groups}}</h1>
    <div class="header_button text-right">
    </div>
  </div>
  <div class="blue_background clearfix">
  <div class="col-xs-12 tab-content margin_top_50 margin_bottom_0" >
    <div class="item background_none clearfix">
      <div class="pic">
        <p class="cover"><img class="" :src="detail.imageUrl" onload="chgdivimgwh(this,80,112)"></p>
      </div>
      <div class="info">
        <h2>{{detail.title}} {{detail.name}}</h2>
        <div class="date"><span class="fa_icon time_icon"></span>{{detail.beginDate | datetime}}</div>
        <div class="article"><span class="fa_icon address_icon"></span>{{detail.place}}
        <p class="final_name"><span class="fa_icon final_name_icon"></span>{{detail.teams}}</p></div>
        <div class="content">
          <p class="article"><span>￥{{detail.minPrice || '0'}} </span>起<i>{{detail.stock}}张票</i></p>
        </div>
      </div>
    </div>
    <ul class="security_hints clearfix">
      <li><span class="fa_icon security_icon01"></span>真票保障</li>
      <li><span class="fa_icon security_icon02"></span>无票赔付</li>
      <li><span class="fa_icon security_icon03"></span>安全交易</li>
      <li><span class="fa_icon security_icon04"></span>平台监管</li>
    </ul>
    <div class="detail_list" style="padding-bottom:50px" v-show="productList.length"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <div v-for="i in productList" class="group" :class="{sold_out : i.stock === 0}" @click="tobuyerorder(i)">
        <ul class="clearfix">
          <li  class="title"><span class="money pull-right">￥{{i.price || 0}}</span>{{i.sellMethodName}}</li>
          <li class="gray_font">
            <span class="ticket_number pull-right">{{i.stock}}张票</span>票面价格：￥{{i.marketPrice || 0}}</li>
          <li class="gray_font">球票等级：{{i.grade}}</li>
        </ul>
        <div class="ticket_detail_tag">
          <a 
            v-show="i.isTogether" 
            @click.stop="clickDetailTag(i)" 
            href="javascript:;">
            两张连座
          </a>
          <a 
            v-show="!i.isTogether" 
            @click.stop="clickDetailTag(i)" 
            href="javascript:;">
            不连座
          </a>
        </div>
        <div class="sold_out_icon"></div>
      </div>
      <div class="default_prompt" v-show="!productList.length">暂无相关票务</div>
    </div>
  </div>
  </div>
  <!--分页提示 start-->
			<div class="load_prompt" style="display: none;"><em style="display: ;">加载中...</em>
				 <div class="end"><span>到底了</span></div>
			</div>
			<!--分页提示 end-->
  <!--悬浮按钮 start-->
  <div v-show="!sourceHome && password_exist" class="order_bottom realname">
    <button @click="toorder()" class="btn red_btn">转票</button>
  </div>
  <div v-show="!sourceHome && account_exist && !password_exist" class="order_bottom realname">
    <button @click="set_password" class="btn red_btn">转票</button>
  </div>
  <div v-show="!sourceHome && !account_exist && !password_exist" class="order_bottom realname">
    <button @click="showDialog" class="btn red_btn">转票</button>
  </div>

  <div v-show="sourceHome && password_exist" class="suspension_button" @click="toorder()">
    <a href="javascript:void(0);">转票</a>
  </div>
  <div v-show="sourceHome && account_exist && !password_exist" class="suspension_button"  @click="set_password">
    <a href="javascript:void(0);">转票</a>
  </div>
  <div v-show="sourceHome && !account_exist && !password_exist" class="suspension_button" @click="showDialog">
    <a href="javascript:void(0);">转票</a>
  </div>
 
  <!--设置支付密码 start-->
  <div v-show="setpasswordview" class="ticketing_instructions_pop customer_service_pop">
    <div class="ticketing_instructions set_password">
      <div class="bt"><span @click="close()" class="close_icon"></span><i>设置支付密码</i></div>
      <div class="clearfix">
        <input ref="pwd" type="number" pattern="\d*" maxlength="6" v-model="password" style="position: absolute; z-index: -1; left:-100%; opacity: 0"/>
        <ul class="pwd-wrap" @click="focus('pwd')">
          <li><i v-if="passwordLength > 0"></i></li>
          <li><i v-if="passwordLength > 1"></i></li>
          <li><i v-if="passwordLength > 2"></i></li>
          <li><i v-if="passwordLength > 3"></i></li>
          <li><i v-if="passwordLength > 4"></i></li>
          <li><i v-if="passwordLength > 5"></i></li>
        </ul>
      </div>
      <!--
      <p style="color: #dd101d;width: 80%;margin: 10px auto;padding: 0;">两次密码设置不同，请重新设置</p>
      -->
    </div>
  </div>
  <!--设置支付密码 end-->
  <!--设置支付确认密码 start-->
  <div v-show="setpasswordconfirmview" class="ticketing_instructions_pop customer_service_pop">
    <div class="ticketing_instructions set_password">
      <div class="bt"><span @click="close" class="close_icon"></span><i>确认支付密码</i></div>
      <div class="clearfix">
        <input ref="pwdconfirm" type="number" pattern="\d*" maxlength="6" v-model="password_confirm" style="position: absolute; z-index: -1; left:-100%; opacity: 0"/>
        <ul class="pwd-wrap" @click="focus('pwdconfirm')">
          <li><i v-if="passwordConfirmLength > 0"></i></li>
          <li><i v-if="passwordConfirmLength > 1"></i></li>
          <li><i v-if="passwordConfirmLength > 2"></i></li>
          <li><i v-if="passwordConfirmLength > 3"></i></li>
          <li><i v-if="passwordConfirmLength > 4"></i></li>
          <li><i v-if="passwordConfirmLength > 5"></i></li>
        </ul>
      </div>
      <p v-show="error" style="color: #dd101d;width: 80%;margin: 10px auto;padding: 0;">{{error}}</p>
    </div>
  </div>
  <!--设置支付密码 end-->
  <!--售票说明 start-->
  <div class="ticketing_instructions_pop" v-show="ticketing_instructions_pop">
    <div class="ticketing_instructions">
    	<div class="instructions_content">
        <p class="title" v-show="tagSellMethod === 'double'">双数出售</p>
        <p class="margin_bottom_20" v-show="tagSellMethod === 'double'">需购买偶数张票，如：2张、4张、6张</p>
        <p class="title" v-show="tagSellMethod === 'noSinger'">不可留单张</p>
        <p class="margin_bottom_20" v-show="tagSellMethod === 'noSinger'">购票张数最后不可余1张票，如库存3张票：可购买1张票，余2张票；或可购买3张票，余0张票；不可购买2张票，余1张票。</p>
        <p class="title" v-show="tagSellMethod === 'together'">必须一起买</p>
        <p class="margin_bottom_20" v-show="tagSellMethod === 'together'">库存有几张票，下单需拍几张票，如：库存3张票，需一次购买3张票</p>
        <p class="title" v-show="tagSellMethod === 'split'">可以分开买</p>
        <p class="margin_bottom_20" v-show="tagSellMethod === 'split'">可以按需求购买，买几张都可以</p>
        <p><a href="javascript:void(0);" v-show="tagIsTogether">两张连座</a></p>
        <p class="margin_bottom_20" v-show="tagIsTogether">购买两张票为连座票，两张票以上尽量连座</p>
        <p><a href="javascript:void(0);"  v-show="!tagIsTogether">不连座</a></p>
        <p class="margin_bottom_20"  v-show="!tagIsTogether">本票品座位不连座</p>
      </div>
      <div @click="ticketing_instructions_pop = false" class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
  <!--售票说明 end-->
</div>
</template>

<script>
import api from "@/api";
import { MessageBox } from "mint-ui";
import md5 from "js-md5";
import util from "@/util/util";
import share from "@/util/share";

export default {
  data() {
    return {
      id: null,
      account_exist: null,
      password_exist: null,
      detail: {},
      productList: [],
      setpasswordview: false,
      setpasswordconfirmview: false,
      password: "",
      password_confirm: "",
      passwordLength: "",
      passwordConfirmLength: "",
      ticketing_instructions_pop: false,
      error: "",
      sourceHome: true,
      tagSellMethod: "",
      tagIsTogether: false,
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      totalPage: 9999,
      inited:true
    };
  },
  watch: {
    $route(to, from) {
      if (
        to.name === "home/match" &&
        from.name !== "home/order" &&
        from.name !== "transfer/order_fill"
      ) {
        this.init();
      }

      if (
        to.name === "home/match" &&
        (from.name === "home/order" || from.name === "transfer/order_fill")
      ) {
        this.inited = false;
        window.sharecallback = this.initShare.bind(this);
      }
    },
    value(val) {
      this.msg = "";
      this.msgLength = 0;
      this.showValue = val;
    },
    password(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.password = this.password.replace(/[^\d]/g, "");
      } else {
        this.passwordLength = curVal.length;
      }
      if (this.passwordLength === 6) {
        setTimeout(() => {
          this.confirm_password();
        }, 100);
      }
    },
    password_confirm(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.password_confirm = this.password_confirm.replace(/[^\d]/g, "");
      } else {
        this.passwordConfirmLength = curVal.length;
      }
      if (this.passwordConfirmLength === 6) {
        setTimeout(() => {
          this.submit_password();
        }, 100);
      }
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      this.sourceHome = this.$route.query.source === "home";
      this.productList = [];
      this.pageNumber = 1;
      this.totalPage = 999;
      this.detail = {};
      this.loading = false;
      this.inited = true;
      window.sharecallback = this.initShare.bind(this);
      api.account.exist().then(res => {
        if (res.data) {
          this.account_exist = res.data.exist;
          if (this.account_exist) {
            //如果已经开户，判断是否设置密码
            api.account.password_exist().then(res => {
              if (res.data) {
                this.password_exist = res.data.exist;
              }
            });
          }
        }
      });
      if (window.fromopenaccount) {
        this.set_password();
      }
    },
    loadMore() {
      if (this.pageNumber > this.totalPage) return;
      this.pageNumber++;
      this._fetch();
    },
    _fetch() {
      if (this.loading) return;
      if (this.pageNumber > this.totalPage) return;
      let query = {
        id: this.id,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      this.loading = true;
      api.ticket.match_detail_products(query).then(res => {
        if (res.data) {
          this.productList = this.productList.concat(res.data.content);
          this.totalPage = res.data.totalPage;
        } else {
          this.totalPage = 0;
        }
        this.loading = false;
      });
    },
    initShare(share) {
      //分享需要先拿到分享的内容
      if(this.inited){
        api.ticket.match_detail({ id: this.id }).then(res => {
          if (res.data) {
            this.detail = res.data;
            this._fetch();
            let data = {
              name: this.detail.title + " " + this.detail.name,
              desc: this.detail.place,
              imgUrl: this.detail.imageUrl,
              link: util.shareUrl(window.location.href)
            }
            share && share(data);
          }
        });
      }else{
        //如果不需要刷新页面，则直接分享
        let data = {
          name: this.detail.title + " " + this.detail.name,
          desc: this.detail.place,
          imgUrl: this.detail.imageUrl,
          link: util.shareUrl(window.location.href)
        }
        share && share(data);
      }
    },
    tobuyerorder(item) {
      if (item.stock != 0)
        this.$router.push({
          name: "home/order",
          query: {
            id: item.id
          }
        });
    },
    toorder() {
      this.$router.push({
        name: "transfer/order_fill",
        query: {
          id: this.detail.id
        }
      });
    },
    toopen() {
      this.$router.push({
        name: "transfer/open_account"
      });
    },
    clickDetailTag(item) {
      if (item.stock !== 0) {
        this.tagSellMethod = item.sellMethod;
        this.tagIsTogether = item.isTogether;
        this.ticketing_instructions_pop = true;
      }
    },
    set_password() {
      this.setpasswordview = true;
      this.focus("pwd");
    },
    confirm_password() {
      this.setpasswordview = false;
      this.setpasswordconfirmview = true;
      this.passwordLength = 0;
      this.focus("pwdconfirm");
    },
    submit_password() {
      if (this.password_confirm != this.password) {
        this.error = "两次输入密码不一致";
        return;
      }
      this.error = null;
      api.account
        .password_set({
          password: md5(this.password)
        })
        .then(res => {
          this.close();
          this.$alert("支付密码设置成功");
          this.password_exist = true;
          this.setpasswordconfirmview = false;
        });
    },
    focus(type) {
      this.$refs[type].focus();
    },
    showDialog() {
      MessageBox({
        title: "温馨提示",
        message: "转票需开通个人账户，是否确认开通",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "立即开通",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          this.toopen();
        }
      });
    },
    close() {
      this.setpasswordview = false;
      this.setpasswordconfirmview = false;
      this.password = "";
      this.password_confirm = "";
    }
  },
  mounted() {
    console.log("mounted");
    this.init();
  }
};
</script>

<style>
.pwd-wrap {
  width: 300px;
  height: 50px;
  margin: 0.3rem auto;
  background: #fff;
  border: 1px solid #ddd;
  display: flex;
  cursor: pointer;
}
.pwd-wrap li {
  list-style-type: none;
  text-align: center;
  line-height: 50px;
  flex: 1;
  border-right: 1px solid #ddd;
}
.pwd-wrap li:last-child {
  border-right: 0;
}
.pwd-wrap li i {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #000;
  display: inline-block;
}
</style>