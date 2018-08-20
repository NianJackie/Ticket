<template>
<div>
  <div class="row ticket_wrap index">
    <div class="col-xs-12">
      <div class="search_box">
        <span class="glyphicon icon_search" aria-hidden="true"></span>
        <input @keyup.enter="tosearch()" v-model="query" type="text" class="form-control" placeholder="搜索国家 城市 场次">
      </div>
    </div>
    <div class="col-xs-12 logo">
      <img class="img-responsive" alt="" src="@/images/logo.png">
    </div>
    <div class="col-xs-12 index_list">
      <ul class="clearfix">
        <li>
          <router-link :to="{ name: 'home/matches', query: { groups: '小组赛' ,source:'home'} }">
            <span class="fa_icon list_icon01"></span>小组赛
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'home/matches', query: { groups: '淘汰赛' ,source:'home'} }">
            <span class="fa_icon list_icon02"></span>淘汰赛
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'home/matches', query: { groups: '半决赛' ,source:'home'} }">
            <span class="fa_icon list_icon03"></span>半决赛
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'home/matches', query: { groups: '决赛' ,source:'home'} }">
            <span class="fa_icon list_icon04"></span>决赛
          </router-link>
        </li>
      </ul>
    </div>

    <div class="col-xs-12 clearfix">
      <div class="swiper_box clearfix" >
        <mt-swipe :auto="4000">
          <mt-swipe-item><a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" class="img-responsive"></a></mt-swipe-item>
          <mt-swipe-item><a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" class="img-responsive"></a></mt-swipe-item>
          <mt-swipe-item><a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" class="img-responsive"></a></mt-swipe-item>
          <mt-swipe-item><a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" class="img-responsive"></a></mt-swipe-item>
        </mt-swipe>
        <div class="swiper_list clearfix" v-show="false">
          <ul>
            <li class="p1">
              <a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" onload="chgdivimgwh(this,240,112)"></a>
            </li>
            <li class="p3">
              <a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" onload="chgdivimgwh(this,240,112)"></a>
            </li>
            <li class="p2">
              <a href="#"><img src="@/images/img/carousel_img01.jpg" alt="" onload="chgdivimgwh(this,240,112)"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xs-12 selection_process first_selection_process">
      <img class="img-responsive" alt="" src="@/images/jx_img.png">
    </div>
    <div class="col-xs-12 tag">
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
    <div class="col-xs-12 selection_process">
      <img class="img-responsive" alt="" src="@/images/hot_img.png">
    </div>
    <div class="col-xs-12 tab-content">
      <div v-for="i in hotlist" @click="tomatch(i)" class="item margin_top_15 clearfix">
        <div class="pic">
          <p class="cover"><img class="" :src="i.imageUrl" onload="chgdivimgwh(this,80,112)"></p>
        </div>
        <div class="info">
          <h2>{{i.title}} {{i.name}}</h2>
          <div class="date">{{i.beginDate | datetime}}</div>
          <div class="article">{{i.place}}<p class="final_name">{{i.teams}}</p></div>
          <div class="content">
            <p class="article"><span>￥{{i.price || 0}} </span>起<i>{{i.stock}}张票</i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom_menu">
    <ul>
      <li class="active">
        <a href="javascript:;">
          <span class="fa_icon bottom_menuicon01"></span>首页
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'transfer/index' ,replace: true}">
          <span class="fa_icon bottom_menuicon02"></span>转票
        </router-link>
      <li>
        <router-link :to="{ name: 'center/index' ,replace: true}">
          <span class="fa_icon bottom_menuicon03"></span>我的
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      query: "",
      hotlist: []
    };
  },
  watch: {},
  methods: {
    init() {
      api.ticket.matches_hotList().then(res => {
        this.hotlist = res.data.content;
        // this.$emit("wx-load2");
      });
    },
    tosearch() {
      let query = {
        source: "home"
      };
      if (this.query) {
        query.query = this.query;
      }
      this.$router.push({
        name: "transfer/search",
        query: query
      });
    },
    tomatch(i) {
      this.$router.push({
        name: "home/match",
        query: {
          id: i.id,
          source: "home"
        }
      });
    },
    tomatches(type, text) {
      let query = {
        //query: this.query,
        //title: "世界杯",
        source: "home"
      };
      if (type == "teams") {
        query.teams = text;
      }
      if (type == "subgroup") {
        query.groups = "小组赛";
        query.subgroup = text;
      }
      this.$router.push({
        name: "home/matches",
        query: query
      });
    }
  },
  activated () {
    this.init();
  },
  mounted() {
    this.init();
  }
};
</script>