<template>
<div>
  <div class="container">
    <div class="row ticket_wrap transfer_tickets">
      <div class="col-xs-12">
        <div class="payment_box">
          <p><img class="img-responsive" alt="" src="../../../images/order/big_logo.png"></p>
          <div class="transfer_tickets_search">
            <input @keyup.enter="tosearch()" v-model="query" type="text" class="form-control" placeholder="国家 / 城市 / 场次">
            <button @click="tosearch()" class="btn">转票</button>
          </div>
          <p>
            <router-link :to="{name: 'transfer/how'}">
              如何转票？
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom_menu">
    <ul>
      <li>
        <router-link :to="{ name: 'home/index' }">
          <span class="fa_icon bottom_menuicon01"></span>首页
        </router-link>
      </li>
      <li class="active">
        <a href="javascript:;">
          <span class="fa_icon bottom_menuicon02"></span>转票
        </a>
      <li>
        <router-link :to="{ name: 'center/index' }">
          <span class="fa_icon bottom_menuicon03"></span>我的
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },
  watch: {
  },
  methods: {
    tosearch () {
      if (!this.query) return
      this.$router.push({
        name: 'transfer/search',
        query: {
          query: this.query,
          source:'transfer'
        }
      })
    },
    init() {
      this.$emit("wx-load2");
    }
  },
  activated () {
    this.init();
  },
  mounted () {
    this.init();
  }
}
</script>