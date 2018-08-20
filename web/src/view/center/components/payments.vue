<template>
<div>
  <div class="row ticket_wrap center">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">账单明细</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div 
      ref="wrapper" 
      class="col-xs-12 account_list padding_0 margin_top_50 margin_bottom_10" 
      :style="{height: wrapperHeight + 'px'}" 
      style="overflow: scroll; margin-bottom: 0;" 
       v-show="record_list.length">
      <ul class="bill_list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <li v-for="record in record_list">
            <p>
              <i>{{ record.fitAmount }}</i>
              <span :class="record.fitClass"></span>
              {{ record.fitTypeName }}
            </p>
            <em>{{ record.formatTimeModifyDate }}</em>
          </li>
      </ul>
    </div>
      <div class="default_prompt" v-show="!record_list.length">暂无账单明细信息</div>
  </div>
</div>  
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      wrapperHeight: 0,
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      totalPage: 9999,
      record_list: []
    };
  },
  watch: {
    $route(to) {
      if (to.name === "center/payments") {
        this.init();
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper.getBoundingClientRect().top;
      this.pageNumber = 1;
      this.pageSize = 10;
      this.totalPage = 9999;
      this.record_list = [];
      this._fetch();
      this.$emit("wx-load2");
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
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      this.loading = false;
      api.account.record(query).then(res => {
        if (res.data) {
          this.record_list = this.record_list.concat(
            this.fillRecordList(res.data.content)
          );
          this.totalPage = res.data.totalPage;
        } else {
          this.totalPage = 0;
        }
        this.loading = false;
      });
    },
    fillRecordList(list) {
      list.forEach(record => {
        switch (record.type) {
          case "withdraw":
            //提现
            this.setProperty(record, "fitClass", "fa_icon red_bg");
            this.setProperty(record, "fitAmount", `-￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "提现");
            break;
          case "unfrozen":
            //解冻
            this.setProperty(record, "fitClass", "fa_icon orange_bg");
            this.setProperty(record, "fitAmount", `+￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "保证金解冻");
            break;
          case "frozen":
            //冻结
            this.setProperty(record, "fitClass", "fa_icon green_bg");
            this.setProperty(record, "fitAmount", `-￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "保证金冻结");
            break;
          case "recharge":
            //充值
            this.setProperty(record, "fitClass", "fa_icon blue_bg");
            this.setProperty(record, "fitAmount", `+￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "充值");
            break;
          case "serviceFee":
            //服务费
            this.setProperty(record, "fitClass", "fa_icon violet_bg");
            this.setProperty(record, "fitAmount", `-￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "充值");
            break;
          case "income":
            //收入
            this.setProperty(record, "fitClass", "fa_icon lightblue_bg");
            this.setProperty(record, "fitAmount", `+￥${record.amount}`);
            this.setProperty(record, "fitTypeName", "收入");
            break;
        }
      });
      return list;
    },
    setProperty(record, propertyType, propertyName) {
      if (typeof record.propertyType == "undefined") {
        this.$set(record, propertyType, propertyName);
      } else {
        record.className = propertyName;
      }
    }
  }
};
</script>