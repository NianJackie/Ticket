<template>
<div>
  <div class="row ticket_wrap order">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">{{id ? '编辑' : '新建'}}实名信息</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li>
            <em class="qz">中文姓名</em>
            <span class="input_box">
              <input v-model="cnName" type="text" class="form-control" placeholder="请输入中文姓名">
            </span>
          </li>
          <li>
            <em class="qz">英文姓名</em>
            <span class="input_box">
              <input v-model="enName" type="text" class="form-control" placeholder="请输入英文姓名">
            </span>
          </li>
          <li>
            <em class="qz">护照号码</em>
            <span class="input_box">
              <input v-model="passportNum" type="text" class="form-control" placeholder="请输入护照号码">
            </span>
          </li>
          <li @click="open(0)" size="large">
            <em class="qz">出生日期</em>
            <span class="input_box">
              <input 
                disabled 
                v-model="birthday" 
                type="text" 
                class="form-control" 
                placeholder="请选择出生日期">
            </span>
          </li>
          <li @click="open(1)" size="large">
            <em class="qz">签发日期</em>
            <span class="input_box">
              <input 
                disabled 
                v-model="issueDate" 
                type="text" 
                class="form-control" 
                placeholder="请选择签发日期">
            </span>
          </li>
          <li @click="open(2)" size="large">
            <em class="qz">有效期至</em>
            <span class="input_box">
              <input 
                disabled 
                v-model="expireDate" 
                type="text" 
                class="form-control" 
                placeholder="请选择有效期至">
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="order_bottom realname">
      <button @click="submit()" class="btn red_btn" :class="{gray_btn:!submitRedClass}">保存</button>
    </div>

    <mt-datetime-picker
      ref="datetime"
      v-model="datetime"
      type="date" 
      :startDate="beginDate"
      :endDate="endDate" 
      @confirm="handleChange">
    </mt-datetime-picker>
  </div>
</div>  
</template>

<script>
import api from "@/api";
import moment from "moment";
export default {
  data() {
    return {
      id: 0,
      datetime: "",
      picker: 0,
      submitRedClass: false,
      beginDate: new Date("1900-01-01"),
      endDate: new Date(new Date().getFullYear() - 100 + "-01-01"),
      cnName: "",
      enName: "",
      passportNum: "",
      birthday: "",
      issueDate: "",
      expireDate: "",
      form: {
        cnName: "",
        enName: "",
        passportNum: "",
        birthday: "",
        issueDate: "",
        expireDate: ""
      },
      dataYear : new Date().getFullYear()
    };
  },
  activated () {
    this.init()
  },
  watch: {
    cnName() {
      this.submitButtonClass();
    },
    enName() {
      this.submitButtonClass();
    },
    passportNum() {
      this.submitButtonClass();
    },
    birthday() {
      this.submitButtonClass();
    },
    issueDate() {
      this.submitButtonClass();
    },
    expireDate() {
      this.submitButtonClass();
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      if (this.id) {
        api.account.purchaser_detail({ id: this.id }).then(res => {
          this.cnName = res.data.cnName;
          this.enName = res.data.enName;
          this.passportNum = res.data.passportNum;
          this.birthday = moment(res.data.birthday).format("YYYY-MM-DD");
          this.issueDate = moment(res.data.issueDate).format("YYYY-MM-DD");
          this.expireDate = moment(res.data.expireDate).format("YYYY-MM-DD");
          this.$emit("wx-load2");
        });
      } else {
        this.$emit("wx-load2");
        this.cnName = "";
        this.enName = "";
        this.passportNum = "";
        this.birthday = "";
        this.issueDate = "";
        this.expireDate = "";
      }
    },
    open(picker) {
      
      switch (picker) {
        case 0:
          if (this.birthday) {
            this.datetime = this.birthday;
          } else {
            this.datetime = new Date(this.dataYear - 30 + "-01-01");
          }
          this.beginDate = new Date(this.dataYear - 100 + "-01-01");
          this.endDate = new Date();
          break;
        case 1:
          if (this.issueDate) {
            this.datetime = this.issueDate;
          }else {
            this.datetime = new Date(this.dataYear - 5 + "-01-01");
          }
          this.beginDate = new Date(this.dataYear - 10 + "-01-01");
          this.endDate = new Date();
          break;
        case 2:
          if(this.expireDate){
            this.datetime = this.expireDate;
          }else {
            this.datetime = new Date(this.dataYear + 5 + "-01-01");
          }
          this.beginDate = new Date();
          this.endDate = new Date(this.dataYear + 10 + "-12-30");
          break;
      }

      this.picker = picker;
      //打开时间选择器
      this.$refs.datetime.open();
    },
    handleChange(value) {
      switch (this.picker) {
        case 0:
          this.birthday = moment(value).format("YYYY-MM-DD");
          break;
        case 1:
          this.issueDate = moment(value).format("YYYY-MM-DD");
          break;
        case 2:
          this.expireDate = moment(value).format("YYYY-MM-DD");
          break;
      }
    },
    submit() {
      this.form.cnName = this.cnName;
      this.form.enName = this.enName;
      this.form.passportNum = this.passportNum;
      this.form.birthday = this.birthday;
      this.form.issueDate = this.issueDate;
      this.form.expireDate = this.expireDate;

      if (!this.form.cnName) {
        this.$alert("请输入中文姓名");
        return;
      }
      if (!this.form.enName) {
        this.$alert("请输入英文姓名");
        return;
      }
      if (!this.form.passportNum) {
        this.$alert("请输入护照号码");
        return;
      }
      if (!this.form.birthday) {
        this.$alert("请选择出生日期");
        return;
      }
      if (!this.form.issueDate) {
        this.$alert("请选择护照签发日期");
        return;
      }
      if (!this.form.expireDate) {
        this.$alert("请选择护照有效期至");
        return;
      }

      if (this.id) {
        this.form.id = this.id;
        api.account.purchaser_edit(this.form).then(res => {
          if (res.returnCode == "success") {
            this.$alert("编辑成功");
            this.$router.go(-1);
          }
        });
      } else {
        api.account.purchaser_add(this.form).then(res => {
          if (res.returnCode == "success") {
            this.$alert("创建成功");
            this.$router.go(-1);
          }
        });
      }
    },
    submitButtonClass() {
      if (
        this.cnName &&
        this.enName &&
        this.passportNum &&
        this.birthday &&
        this.issueDate &&
        this.expireDate
      ) {
        this.submitRedClass = true;
      } else {
        this.submitRedClass = false;
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="">
.form-control[disabled] {
  background: transparent;
}
.picker-item {
  font-size: 14px;
  color: #969696;
}
.mint-datetime-action {
  text-align: left;
  padding-left: 15px;
}
.mint-datetime-confirm {
  text-align: right;
  padding-right: 15px;
}
</style>