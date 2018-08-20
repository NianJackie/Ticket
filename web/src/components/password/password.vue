<template>
  <div v-show="showpassword" class="ticketing_instructions_pop customer_service_pop">
    <div class="ticketing_instructions set_password">
      <div class="bt"><span @click="clickClose" class="close_icon"></span><i>{{title | title}}</i></div>
      <div class="clearfix">
        <input ref="pwd" type="number" pattern="\d*" maxlength="6" v-model="password" style="position: absolute; z-index: -1; left:-100%; opacity: 0"/>
        <ul class="pwd-wrap" @click="focus">
          <li><i v-if="passwordLength > 0"></i></li>
          <li><i v-if="passwordLength > 1"></i></li>
          <li><i v-if="passwordLength > 2"></i></li>
          <li><i v-if="passwordLength > 3"></i></li> 
          <li><i v-if="passwordLength > 4"></i></li>
          <li><i v-if="passwordLength > 5"></i></li>
        </ul>
      </div>
      <p v-if="showerro" style="color: #dd101d;width: 80%;margin: 10px auto;padding: 0;">{{errorContent | error}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showpassword: {
      type: Boolean,
      default: false
    },
    showerro: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "输入支付密码"
    },
    errorContent: {
      type: String,
      default: "密码错误,请重新输入"
    }
  },
  data() {
    return {
      password: "",
      passwordLength: ""
    };
  },
  mounted() {
    this.$refs["pwd"].focus();
  },
  methods: {
    focus() {
      this.$refs["pwd"].focus();
    },
    clickClose() {
      this.$emit("close");
    }
  },
  watch: {
    password(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.password = this.password.replace(/[^\d]/g, "");
      } else {
        this.passwordLength = curVal.length;
      }
      this.$emit("getviewpassword", this.password);
    },
    showpassword(flag) {
      if (!flag) this.password = "";
    }
  },
  filters: {
    title(msg) {
      return msg === '' ? '输入密码' : msg
    },
    error(msg) {
      return msg === '' ? '密码错误,请重新输入' : msg
    }
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
