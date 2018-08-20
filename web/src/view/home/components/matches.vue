<template>
<div class="row ticket_wrap ticket_list search_wrap">
  <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
    <div class="header_button text-left">
      <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
    </div>
    <h1 class="header_title">{{params.teams ? params.teams : (params.groups+" "+params.subgroup)}}</h1>
    <div class="header_button text-right">
    </div>
  </div>
  <div v-show="!list.length" class="col-xs-12">
    <p class="no_search_results">暂无搜索结果</p>
  </div>
  <div class="col-xs-12 tab-content margin_top_50"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
    <div :class="{sold_out: i.stock == 0}" v-for="i in list" class="item clearfix" @click="tonext(i.id)">
      <div class="pic">
        <p class="cover"><img class="" :src="i.imageUrl" onload="chgdivimgwh(this,80,112)"></p>
      </div>
      <div class="info">
        <h2>{{i.title}} {{i.name}}</h2>
        <div class="date">{{i.beginDate | datetime}}</div>
        <div class="article">{{i.place}}<p class="final_name"> {{i.teams}}</p></div>
        <div class="content">
          <p class="article"><span>￥{{i.minPrice || '0'}} </span>起<i>{{i.stock}}张票</i></p>
        </div>
      </div>
      <div class="sold_out_icon"></div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/api'
import moment from 'moment'
import share from "@/util/share";
import util from "@/util/util";

export default {
  data () {
    return {
      params: {
        groups: "",
        subgroup: "",
        teams: "",
        title: ""
      },
      source : '' ,
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      totalPage: 9999,
      list: []
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'home/matches' && from.name !== 'home/match') {
        this.init()
        window.sharecallback = this.initShare.bind(this);
      }
      if (to.name === 'home/matches' && from.name === 'home/match') {
        window.sharecallback = this.initShare.bind(this);
      }
    }
  },
  methods: {
    init () {
      this.pageNumber = 1
      this.pageSize = 10
      this.totalPage = 9999
      this.params.groups = this.$route.query.groups || ""
      this.params.subgroup = this.$route.query.subgroup || ""
      this.params.teams = this.$route.query.teams || ""
      this.params.title = this.$route.query.title || ""
      this.source = this.$route.query.source
      this.list = []
      this._fetch()
    },
    initShare(share) {
      let data = {
        name: this.params.teams ? this.params.teams : (this.params.groups + " "+ this.params.subgroup),
        link: util.shareUrl(window.location.href)
      };
      share && share(data);
    },
    loadMore () {
      if(this.loading) return
      this.pageNumber++
      this._fetch()
    },
    _fetch () {
      if (this.pageNumber > this.totalPage) return
      let query = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }
      if (this.params.groups) {
        query.groups = this.params.groups
      }
      if (this.params.subgroup) {
        query.subgroup = this.params.subgroup
      }
      if (this.params.title) {
        query.title = this.params.title
      }
      if (this.params.teams) {
        query.teams = this.params.teams
      }
      this.loading = true      
      api.ticket.matches(query).then(res => {
        if (res.data) {
          this.list = this.list.concat(res.data.content)
          this.totalPage = res.data.totalPage
        } else {
          this.totalPage = 0
        }
        this.loading = false
      })
    },
    tonext (id) {
      this.$router.push({
        name: 'home/match',
        query: {
          id: id,
          source:this.source
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>