<template>
<div>
  <div class="row ticket_wrap order set">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">设置</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li>
            <em class="qz">原支付密码</em>
            <span class="input_box">
              <input v-model="oldPassword" type="password" class="form-control" placeholder="请输入原6位支付密码" maxlength="6" >
            </span>
          </li>
          <li>
            <em class="qz">新支付密码</em>
            <span class="input_box">
              <input v-model="newPassword_confirm" type="password" class="form-control" placeholder="请输入6位新支付密码" maxlength="6" >
            </span>
          </li>
          <li>
            <em class="qz">确认支付密码</em>
            <span class="input_box">
              <input v-model="newPassword" type="password" class="form-control" placeholder="请确认新支付密码" maxlength="6" >
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="order_bottom realname">
      <button @click="submit" class="btn red_btn">确认保存</button>
    </div>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import md5 from "js-md5"
export default {
  data() {
    return {
      oldPassword: "",
      newPassword_confirm: "",
      newPassword: ""
    };
  },
  methods: {
    submit() {
      if(this.oldPassword.length !== 6){
        this.$alert("请输入正确的支付密码");
        return
      }
      if(this.newPassword_confirm.length !== 6){
        this.$alert("新密码必须是6位数字");
        return
      }
      if(this.newPassword_confirm !== this.newPassword){
        this.$alert("两次输入的新密码必须一致");
      }
      api.account.password_edit({
          oldPassword: md5(this.oldPassword),
          newPassword: md5(this.newPassword)
        })
        .then(res => {
          this.$alert("修改密码成功");
          this.oldPassword = "";
          this.newPassword_confirm = "";
          this.newPassword = "";
        });
    }
  },
  mounted() {
    this.$emit("wx-load2");
  },
  watch: {
    oldPassword(value) {
      if (/[^\d]/g.test(value)) 
        this.oldPassword = value.replace(/[^\d]/g, "");
    },
    newPassword_confirm(value) {
      if (/[^\d]/g.test(value)) 
        this.newPassword_confirm = value.replace(/[^\d]/g, "");
    },
    newPassword(value) {
      if (/[^\d]/g.test(value)) 
        this.newPassword = value.replace(/[^\d]/g, "");
    }
  },
};
</script>