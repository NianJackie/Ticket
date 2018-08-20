<template>
<div>
  <div class="row ticket_wrap search_wrap my_order mysell_order">
    <div class="col-xs-12 search_top margin_bottom_10" style="padding-bottom: 0;">
      <div class="search_content"><span class="glyphicon icon_search" aria-hidden="true"></span><input type="text" class="form-control" placeholder="搜索国家 城市 场次" style="background: #647096;border:none"><button class="btn">搜索</button></div>
      <ul class="nav nav-tabs">
        <li class="active">
          <a data-toggle="tab" href="#home">待发布</a>
        </li>
        <li class="">
          <a data-toggle="tab" href="#profile">已发布</a>
        </li>
        <li>
          <a data-toggle="tab" href="#messages">待发货</a>
        </li>
        <li>
          <a data-toggle="tab" href="#shipped">已发货</a>
        </li>
        <li>
          <a data-toggle="tab" href="#completed">已完成</a>
        </li>
      </ul>
    </div>

    <div class="col-xs-12 tab-content  padding_0">
      <div id="home" class="tab-pane fade active in">
        <div class="panel-group active in" id="accordion-1">
          <div class="myorder_list">
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一级</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><span class="pull-right"><button class="btn">删除</button><button class="btn red_btn">发布</button></span></div>
          </div>
        <div class="myorder_list">
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><span class="pull-right"><button class="btn">删除</button><button class="btn red_btn">发布</button></span></div>
          </div>

        </div>
      </div>
      <div class="tab-pane fade " id="profile">
        <div class="panel-group" id="accordion-1">
          <div class="myorder_list">
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><span class="pull-right"><button class="btn red_btn">下架</button></span></div>
          </div>
          <div class="myorder_list">
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><span class="pull-right"><button class="btn">删除</button><button class="btn lightgray_btn">比赛结束</button></span></div>
          </div>

        </div>
      </div>

      <div class="tab-pane fade " id="messages">
        <div class="panel-group" id="accordion-1">
          <div class="myorder_list">
            <div class="order_number"><span class="pull-right">待发货</span>订单编号：201801052364</div>
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><p class="pull-left margin_top_5"><i>买家发起售后申请，请尽快处理</i></p><span class="pull-right"><button class="btn" style="padding: 6px 12px;">查看售后</button><button class="btn red_btn">发货</button></span></div>
          </div>

        </div>
      </div>
      <div class="tab-pane fade " id="shipped">
        <div class="panel-group" id="accordion-1">
          <div class="myorder_list">
            <div class="order_number"><span class="pull-right">已发货</span>订单编号：201801052364</div>
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><span class="pull-right"><button class="btn" style="padding: 6px 12px;">查看物流</button></span></div>
          </div>
          <div class="myorder_list">
            <div class="order_number"><span class="pull-right">已发货</span>订单编号：201801052364</div>
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><p class="pull-left margin_top_5"><i>买家发起售后申请，请尽快处理</i></p><span class="pull-right"><button class="btn red_btn" style="padding: 6px 12px;">查看售后</button><button class="btn" style="padding: 6px 12px;">查看物流</button></span></div>
          </div>

        </div>
      </div>
      <div class="tab-pane fade " id="completed">
        <div class="panel-group" id="accordion-1">
          <div class="myorder_list">
            <div class="order_number"><span class="pull-right">已完成</span>订单编号：201801052364</div>
            <div class="item clearfix">
              <div class="pic">
                <p class="cover"><img class="" src="../../../images/default.jpg" onload="chgdivimgwh(this,80,112)"></p>
              </div>
              <div class="info">
                <h2>做党外知识分子工作就要讲究方</h2>
                <div class="date"><span class="fa_icon time_icon"></span>2018-01-12</div>
                <div class="region"><span class="fa_icon address_icon"></span>俄罗斯圣彼得堡国家体育馆</div>
                <div class="region margin_bottom_5"><span class="fa_icon grade_icon"></span>一等</div>
                <div class="content">
                  <p class="article"><span>￥4560 </span><i>5张票</i></p>
                </div>
              </div>
            </div>
            <div class="order_number clearfix"><p class="pull-left margin_top_5"><i style="color: #3f3f3f;">卖家同意售后申请</i></p><span class="pull-right"><button class="btn" style="padding: 6px 12px;">查看售后</button></span></div>
          </div>
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
    }
  },
  watch: {
  },
  activated () {
    this.init();
  },
  methods: {
    init() {
      this.$emit("wx-load2");
    }
  },
  mounted () {
    this.init()
    document.getElementById('body').className = 'gray_bg'
  }
}
</script>