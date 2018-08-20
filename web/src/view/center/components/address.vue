<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 ticket_topnav">
      <div class="header_button text-left">
        <a href="javascript:;" @click="goBack"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">{{id ? '编辑' : '新建'}}收货地址</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_40 clearfix">
      <div class="col-xs-12 address_item clearfix">
        
        <ul class="clearfix">
          <li>
            <em class="qz">收货人</em>
            <span class="input_box">
              <input type="text" v-model="consignee" class="form-control" placeholder="">
            </span>
          </li>
          <li>
            <em class="qz">手机号码</em>
            <span class="input_box">
              <input type="number" 
                v-model="phone" 
                class="form-control" 
                maxlength="11"
                placeholder="" 
                @blur.prevent="changeBlur">
            </span>
          </li>
          <!--
          <li><em class="qz">所在地区</em><span class="input_box"><input type="text" class="form-control" placeholder=""></span></li>
          -->
          <li>
            <em class="qz">详细地址</em>
            <span class="input_box">
              <input type="text" v-model="address" class="form-control" placeholder="">
            </span>
          </li>
        </ul>
      </div>
      
    </div>
    <div class="order_bottom realname">
      <a @click="submit()" href="javascript:;"><button class="btn red_btn" :class="{gray_btn:!submitRedClass}">保存地址</button></a>
    </div>
  </div>
  <div class="ticketing_instructions_pop customer_service_pop" style="display: none;">
    <div class="ticketing_instructions choose_city">
      <ul class="ticket_price  clearfix">
        <li>北京市</li>
        <li>北京市</li>
        <li>花园路街道</li>
      </ul>
      <div class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      id: 0,
      consignee: "",
      phone: "",
      address: "",
      submitRedClass: false,
      form: {
        consignee: "",
        phone: "",
        address: ""
      },
      orderAddress: {}
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "center/address" && from.name === "center/addresses") {
        this.orderAddress = this.$store.getters.getOrderAddress;
      }
      this.init();
      this.clearForm();
    },
    consignee(value) {
      this.submitButtonClass();
    },
    phone(value) {
      if (/[^\d]/g.test(value)) this.phone = value.replace(/[^\d]/g, "");
      this.submitButtonClass();
    },
    address(value) {
      this.submitButtonClass();
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      if (this.id) {
        api.account.receiver_detail({ id: this.id }).then(res => {
          this.phone = res.data.phone;
          this.consignee = res.data.consignee;
          this.address = res.data.address;
          this.$emit("wx-load2");
        });
      }
    },
    submitButtonClass() {
      if (this.consignee && this.phone.length === 11 && this.address) {
        this.submitRedClass = true ;
      }else {
        this.submitRedClass = false ;
      }
    },
    submit() {
      this.form.phone = this.phone;
      this.form.consignee = this.consignee;
      this.form.address = this.address;

      if (!this.form.consignee) {
        this.$alert("请输入收货人姓名");
        return;
      }
      if (!this.form.phone) {
        this.$alert("请输入收货人手机号");
        return;
      }
      if (!this.form.address) {
        this.$alert("请输入收货人地址");
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)) {
        this.$alert("请输入正确的手机号");
        return;
      }
      if (this.id) {
        this.form.id = this.id;
        api.account.receiver_edit(this.form).then(res => {
          this.$alert("编辑成功");
          this.orderAddress.areaName = "address";
          this.$store.commit("setOrderAddress", this.orderAddress);
          this.$router.go(-1);
        });
      } else {
        api.account.receiver_add(this.form).then(res => {
          this.$alert("创建成功");
          this.orderAddress.areaName = "address";
          this.$store.commit("setOrderAddress", this.orderAddress);
          this.$router.go(-1);
        });
      }
    },
    goBack() {
      this.orderAddress.areaName = "";
      this.$store.commit("setOrderAddress", this.orderAddress);
      this.$router.go(-1);
    },
    clearForm() {
      this.consignee = "" ;
      this.phone = "";
      this.address = "" ;
      this.form.consignee = "";
      this.form.phone = "";
      this.form.address = "";
    },
    changeBlur() {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!reg.test(this.phone)) {
        this.$alert("请输入正确的手机号");
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>