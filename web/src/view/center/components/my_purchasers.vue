<template>
<div>
  <div class="row ticket_wrap center real_name_information">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">我的实名信息管理</h1>
      <div class="header_button text-right">
      </div>
    </div>
      <div class="col-xs-12 margin_top_50 margin_bottom_60 padding_0 clearfix">
        <div v-for="i in list" class="address_list clearfix">
          <div @click="$router.push({name: 'center/my_purchaser', query: {id: i.id}})" class="address_group">
            <div class="name">{{i.cnName}} {{i.enName}}</div>
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
              <a @click="showDel(i)" href="javascript:;">
                <span class="fa_icon delete_icon"></span>删除</a>
              <a @click="$router.push({name: 'center/my_purchaser_add', query: {id: i.id}})" href="javascript:;"><span class="fa_icon edit_icon"></span>编辑</a>
            </div>
          </div>
        </div>
        <div class="default_prompt" style="display: none;">暂无相关信息</div>
      </div>
    <div class="order_bottom realname">
      <a @click="$router.push({name: 'center/my_purchaser_add'})" href="javascript:;"><button class="btn red_btn">新建实名信息</button></a>
    </div>
  </div>
</div>  
</template>

<script>
import api from '@/api'
import { MessageBox } from "mint-ui";
export default {
  data () {
    return {
      cur: null,
      list: []
    }
  },
  watch: {
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      api.account.purchaser_list().then(res => {
        this.list = res.data.content
        this.$emit("wx-load2");
      })
    },
    todel () {
      api.account.purchaser_delete({id: this.cur.id}).then(res => {
        this.init()
      })
    },
    showDel(item) {
      MessageBox({
        title: "温馨提示",
        message: "确认删除此条信息吗？",
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText : '删除',
        showCancelButton: true
      }).then(action => {
        if(action === 'confirm'){
          this.cur = item
          this.todel();
        }
      });
    }
  },
  mounted () {
    this.init()
  }
}
</script>