<template>
<div>
  <div class="row ticket_wrap order open_account">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">开通账户</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li>
            <em class="qz">姓名</em>
            <span class="input_box">
              <input v-model="name" type="text" class="form-control" placeholder="请输入姓名">
            </span>
          </li>
          <li>
            <em class="qz">手机号码</em>
            <span class="input_box">
              <input 
                v-model="phone" 
                type="number" 
                class="form-control" 
                placeholder="请输入手机号码"  
                maxlength="11">
            </span>
            <button 
              @click="sendSms()" 
              v-bind:disabled="seconds < 60" 
              class="btn red_btn" 
              :style="checkCodeButton">
              {{seconds === 60 ? '发送验证码' : seconds + 's'}}
            </button>
          </li>
          <li>
            <em class="qz">验证码</em>
            <span class="input_box">
              <input 
                v-model="checkCode" 
                type="number" 
                class="form-control" 
                placeholder="请输入验证码" 
                maxlength="4">
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="order_bottom realname">
      <button @click="submit" class="btn red_btn" :class="{gray_btn:!submitRedClass}">立即开通</button>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      name: "",
      phone: "",
      checkCode: "",
      checkCodeButton: "background:gray",
      seconds: 60,
      submitRedClass: false
    };
  },
  watch: {
    name() {
      this.submitButtonClass();
    },
    phone(value) {
      if (/[^\d]/g.test(value)) this.phone = value.replace(/[^\d]/g, "");
      if (/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        this.checkCodeButton = "";
      } else {
        this.checkCodeButton = "background:gray";
      }
      this.submitButtonClass();
    },
    checkCode(value) {
      if (/[^\d]/g.test(value)) this.checkCode = value.replace(/[^\d]/g, "");
      this.submitButtonClass();
    }
  },
  activated() {
    this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.name = "";
      this.phone = "";
      this.checkCode = "";
      this.$emit("wx-load2");
    },
    submit() {
      if (!this.name) {
        this.$alert("请输入姓名");
        return;
      }
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        this.$alert("请输入正确的手机号");
        return;
      }
      if (!this.checkCode || this.checkCode.length !== 4) {
        this.$alert("请输入正确的验证码");
        return;
      }

      api.account
        .establish({
          name: this.name,
          phone: this.phone,
          checkCode: this.checkCode
        })
        .then(res => {
          if (res.data.status) {
            window.fromopenaccount = true;
            this.$alert("开通帐号成功");
            this.$router.go(-1);
          } else {
            this.$alert(res.returnMsg);
          }
        });
    },
    sendSms() {
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone)) {
        this.$alert("请输入正确的手机号");
        return;
      }
      let that = this;
      api.account
        .message_code({
          phone: this.phone
        })
        .then(res => {
          window._sti = setInterval(() => {
            that.seconds--;
            if (that.seconds === 0) {
              window.clearInterval(window._sti);
              that.seconds = 60;
            }
          }, 1000);
        });
    },
    submitButtonClass() {
      if (
        this.name !== "" &&
        /^1[3|4|5|7|8][0-9]{9}$/.test(this.phone) &&
        this.checkCode.length === 4
      ) {
        this.submitRedClass = true;
      } else {
        this.submitRedClass = false;
      }
    }
  },
  destroyed() {
    window.clearInterval(window._sti);
  }
};
</script>