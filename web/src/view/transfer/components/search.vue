<template>
<div>
  <div class="row ticket_wrap search_wrap">
    <div class="col-xs-12 search_top">
      <div class="header_button payment_arrow">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true" style="margin-top: 5px;"></span></a>
      </div>
      <div class="search_content">
        <span class="glyphicon icon_search" aria-hidden="true"></span>
        <input type="text" @keyup.enter="submit" v-model="params.query" class="form-control" placeholder="搜索国家 城市 场次" style="background: #647096;border: none;">
        <button @click="submit" class="btn">搜索</button></div>
    </div>
    <div v-show="initview" class="col-xs-12 tag">
      <div class="hot_search">热门搜索</div>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('teams', '德国')"><span class="fa_icon tag_icon01"></span>德国</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '巴西')"><span class="fa_icon tag_icon02"></span>巴西</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '阿根廷')"><span class="fa_icon tag_icon03"></span>阿根廷</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '西班牙')"><span class="fa_icon tag_icon04"></span>西班牙</a>
        </li>
      </ul>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'A')">A组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'B')">B组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'C')">C组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'D')">D组</a>
        </li>
      </ul>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'E')">E组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'F')">F组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'G')">G组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'H')">H组</a>
        </li>
      </ul>
    </div>
    <div v-show="list.length" class="col-xs-12 tab-content margin_top_10" 
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <div v-bind:class="{sold_out: i.stock == 0}" v-for="i in list" class="item clearfix" @click="tonext(i.id)">
        <div class="pic">
          <p class="cover"><img class="" :src="i.imageUrl" onload="chgdivimgwh(this,80,112)"></p>
        </div>
        <div class="info">
          <h2>{{i.title}} {{i.name}}</h2>
          <div class="date">{{i.beginDate | datetime}}</div>
          <div class="article">{{i.place}}</div>
          <div class="content">
            <p class="article"><span>￥{{i.minPrice || 0}} </span>起<i>{{i.stock}}张票</i></p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="noresult" class="col-xs-12">
      <p class="no_search_results">暂无搜索结果</p>
    </div>
    <div v-show="noresult" class="search_noneresult_content tag">
      <div class="hot_search text-center gray_font">试试其他的关键词吧</div>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('teams', '德国')"><span class="fa_icon tag_icon01"></span>德国</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '巴西')"><span class="fa_icon tag_icon02"></span>巴西</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '阿根廷')"><span class="fa_icon tag_icon03"></span>阿根廷</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('teams', '西班牙')"><span class="fa_icon tag_icon04"></span>西班牙</a>
        </li>
      </ul>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'A')">A组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'B')">B组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'C')">C组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'D')">D组</a>
        </li>
      </ul>
      <ul class="clearfix">
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'E')">E组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'F')">F组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'G')">G组</a>
        </li>
        <li>
          <a href="javascript:;" @click="tomatches('subgroup', 'H')">H组</a>
        </li>
      </ul>
    </div>
  </div>
</div>  
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      params: {
        query: ""
      },
      source:'',
      pageNumber: 1,
      pageSize: 10,
      noresult: false,
      list: [],
      initview: true,
      loading: false
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'transfer/search') {
        this.init()
      }
    }
  },
  methods: {
    init () {
      this.pageNumber = 1
      this.pageSize = 10
      this.totalPage = 1
      this.params.query = this.$route.query.query
      this.source = this.$route.query.source
      this.list = []
      this._fetch()
      this.$emit("wx-load2");
    },
    loadMore () {
      this.pageNumber++
      this._fetch()
    },
    _fetch () {      
      if (!this.params.query || this.pageNumber > this.totalPage) return
      this.initview = false      
      this.noresult = false
      this.loading = true      
      api.ticket.match_search({
        name: this.params.query || null,
        pageNumber:this.pageNumber,
        pageSize:this.pageSize
      }).then(res => {
        if (res.data.content.length) {
          this.list = this.list.concat(res.data.content)
          this.totalPage = res.data.totalPage
        } else {
          this.noresult = true
          this.totalPage = 0
        }
        this.loading = false
      })
    },
    tomatches (type, text) {
      let query = {
        query: this.query,
        title: '世界杯'
      }
      if (type == 'teams') {
        query.teams = text
      }
      if (type == 'subgroup') {
        query.groups = '小组赛'
        query.subgroup = text
      }
      this.$router.push({
        name: 'home/matches',
        query: query
      })
    },
    submit () {
      if (!this.params.query) return
      this.pageNumber = 1
      this.pageSize = 10
      this.totalPage = 1
      this.list = []
      this._fetch()
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