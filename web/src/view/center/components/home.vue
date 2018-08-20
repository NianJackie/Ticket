<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 center_page">
        <p class="logo"><img class="img-responsive" alt="" src="../../../images/logo.png"></p>
        <ul class="center_list">
          <li v-show="account_config === 'success'">
            <router-link :to="{ name: 'center/account' }">
              <span class="fa_icon right_arrow pull-right"></span>我的账户
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'center/bought' }">
              <span class="fa_icon right_arrow pull-right"></span>我买的票
            </router-link>
          </li>
          <li v-show="account_config === 'success'">
            <router-link :to="{ name: 'center/selled' }">
              <span class="fa_icon right_arrow pull-right"></span>我卖的票
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'center/addresses' ,query: {source:'center'}}">
              <span class="fa_icon right_arrow pull-right"></span>我的地址
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'center/my_purchasers' }">
              <span class="fa_icon right_arrow pull-right"></span>实名信息
            </router-link>
          </li>
          <li style="color:#fff" @click="clickConfig">
              <span class="fa_icon right_arrow pull-right" ></span>
              {{ account_config_text }}
          </li>
        </ul>
         <pass-word-view 
          :showpassword="showpassword" 
          :showerro="passwordCorrect" 
          :title="title"
          :errorContent="errorContent"
          @close="closePassword" 
          @getviewpassword="getPassWord"></pass-word-view>
    </div>
  </div>
  <div class="bottom_menu">
    <ul>
      <li>
        <router-link :to="{ name: 'home/index' ,replace: true}">
          <span class="fa_icon bottom_menuicon01"></span>首页
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'transfer/index',replace: true}">
          <span class="fa_icon bottom_menuicon02"></span>转票
        </router-link>
      </li>
      <li class="active">
        <a href="javascript:;">
          <span class="fa_icon bottom_menuicon03"></span>我的
        </a>
      </li>
    </ul>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import PassWordView from "@/components/password/password";
import { MessageBox } from "mint-ui";
import md5 from "js-md5"

export default {
  data() {
    return {
      account_config: "not_account",
      account_config_text: "开通帐号",
      showpassword: false,
      passwordCorrect: false,
      title: "请输入密码",
      errorContent: "两次输入的密码不一致",
      isInputPassWord: true,
      password_info: ""
    };
  },
  watch: {
    $route(to, from) {
      if(to.name === 'center/index') {
        this.init();
      }
    }
  },
  methods: {
    clickConfig() {
      if (this.account_config === "not_account") {
        // 开通帐号
        this.showDialog();
      } else if (this.account_config === "not_password") {
        // 设置密码
        this.showPassWord();
      } else {
        //修改密码
        this.$router.push({ name: "center/config" });
      }
    },
    showPassWord() {
      this.showpassword = true;
    },
    init() {
      api.account.exist().then(res => {
        if (res.data && res.data.exist) {
          //已经开了帐号
            api.account.password_exist().then(res => {
              if (res.data.exist) {
                //已经设置了密码
                this.account_config = "success";
                this.account_config_text = "修改密码";
              }else{
                this.account_config = "not_password";
                this.account_config_text = "设置密码";  
              }
              this.$emit("wx-load2");
          })
        }else{
          this.account_config = "not_account";
          this.account_config_text= "开通帐号";
          this.$emit("wx-load2");
        }
      })
    },
    getPassWord(password) {
      if (password.length === 6) {
        if (this.isInputPassWord) {
          this.isInputPassWord = false;
          this.title = "请再次输入密码";
          this.showpassword = false;
          this.password_info = password;
          setTimeout(() => {
            this.showpassword = true;
          }, 300);
        } else {
          if (password === this.password_info) {
            this.isInputPassWord = true;
            this.title = "请输入密码";
            this.setPassWord();
            this.showpassword = false;
            this.passwordCorrect = false;
          } else {
            this.passwordCorrect = true;
          }
        }
      }
    },
    setPassWord() {
      api.account.password_set({
          password: md5(this.password_info)
        }).then(res => {
          this.$alert("支付密码设置成功");
          this.account_config = "success";
          this.account_config_text = "修改密码";
        });
    },
    closePassword() {
      this.showpassword = false;
      this.passwordCorrect = false;
      this.isInputPassWord = true;
      this.title = "请输入密码";
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
    toopen() {
      this.$router.push({
        name: "transfer/open_account"
      });
    },
  },
  mounted() {
    this.init();
  },
  components: {
    PassWordView
  }
};
</script>