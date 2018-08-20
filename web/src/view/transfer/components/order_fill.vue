<template>
<div>
  <div class="row ticket_wrap order transfer_tickets">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">填写票务信息</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_41 clearfix">
      <div class="col-xs-12 padding_0">
        <div class="item margin_bottom_10 border_radius_none clearfix">
          <div class="pic">
            <p class="cover"><img class="" :src="detail.imageUrl" onload="chgdivimgwh(this,60,80)" style="margin-left: 0px;" width="80" height="112"></p>
          </div>
          <div class="info">
            <h2>{{detail.title}} {{detail.name}}</h2>
            <div class="date"><span class="fa_icon time_icon"></span>{{detail.beginDate | datetime}}</div>
            <div class="region"><span class="fa_icon address_icon"></span>{{detail.place}}</div>
          </div>
        </div>
        <div class="order_item  background_none clearfix">
          <ul class="clearfix">
            <li @click="matchesSelect = true">
              <em class="qz">球票等级</em>
              <span class="input_box">
                <input disabled v-model="match.grade" type="text" class="form-control" placeholder="请选择球票等级">
              </span>
            </li>
            <li>
              <em class="qz">票面价格</em>
              <span class="input_box">
                <input v-model="match.price" type="text" class="form-control" disabled placeholder="请选择票面价格">
              </span>
            </li>
            <li @click="sellMethodSelect = true">
              <em class="qz">出售方式</em>
              <span class="input_box">
                <input disabled v-model="sellMethod.value" type="text" class="form-control" placeholder="请选择出售方式">
              </span>
            </li>
            <li @click="seatSeriesSelect = true">
              <em class="qz">是否连座</em><span class="input_box">
                <input disabled v-model="seatSeries.value" type="text" class="form-control" placeholder="请选择是否连座">
              </span>
            </li>
            <li>
              <em class="qz">销售价格</em>
              <span class="input_box">
                <input v-model="price" type="text" class="form-control" placeholder="请输入销售价格">
              </span>
            </li>
            <li>
              <em class="qz">出售数量</em>
              <span class="input_box">
                <input 
                  v-model="count" 
                  type="number" 
                  class="form-control" 
                  placeholder="请选择出售数量" 
                  @blur.prevent="changeBlur">
              </span>
            </li>
            <li><em class="qz">配送方式</em><span class="input_box">快递包邮</span></li>
            <li><em class="qz">下架时间</em><span class="input_box">比赛前一天 </span></li>
          </ul>
          <ul>
             <li>
              <em class="qz">卖票人姓名</em>
              <span class="input_box">
                <input  type="text" class="form-control" placeholder="请输入卖票人姓名" v-model="sellerName">
              </span>
            </li>
            <li>
              <em class="qz">卖票人电话</em>
              <span class="input_box">
                <input  
                  type="number" 
                  class="form-control" 
                  maxlength="11" 
                  placeholder="请输入卖票人电话" 
                  v-model="sellerPhone">
              </span>
            </li>
            <li>
              <em class="qz">卖票人微信</em>
              <span class="input_box">
                <input class="form-control textarea_address" rows="1" placeholder="请输入卖票人微信" v-model="sellerAddress"></input>
              </span>
            </li>
          </ul>
          <ul>
            <li class="tk"><span @click="confirm = !confirm" v-bind:class="{select_icon: !confirm}" class="select_activeicon"></span>我已阅读
              <a href="javascript:;" class="red_color" @click="agreementShow = true">《卖票协议》</a>及
              <a href="javascript:;" class="red_color" @click="noticeShow = true">《卖票须知》</a>
            </li>
            <li class="yellow_bg">平台将收取 {{deposit}} 元/张票的保证金，交易完成后退回；服务费共 {{service}} 元将从票款中收取</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!--悬浮按钮 start-->
  <div class="order_bottom realname">
    <button @click="submit" class="btn red_btn" :class="{gray_btn:!submitRedClass}">提交信息</button>
  </div>
  <!--悬浮按钮 end-->
  <!--卖票协议 start-->
		<div class="ticketing_instructions_pop customer_service_pop" v-show="agreementShow">
			<div class="ticketing_instructions">
				<p class="title padding_top_10 margin_bottom_0">《卖票协议》</p>
					<div class="ticket_agreement agreement_box">
						<p>在您完成门票发布之前，请您仔细阅读本《卖票协议》，再进行门票发布。本协议在您发布成功时已即时生效，将成为您和“风票平台”之间具有法律约束力的文件。本协议具有正式合同的效力，您和“风票平台”将同等、公平地受到本协议条款的约束。（以下“风票平台”简称为“风票”或“平台”）</p>
						<p class="description_title">协议声明及签署</p>
						<p>1、本协议包括协议正文及所有有票已经发布的或未来可能发布的各类规则。所有规则为本协议不可分割的部分，与协议正文具有同等法律效力。除另行明确声明外，任何风票提供的服务均受本协议约束。</p>
						<p>2、您应当在使用本平台之前认真阅读本协议内容，如您对本协议有任何疑问，应向风票咨询。但无论您事实上是否在使用本平台服务之前阅读了本协议内容，只要您使用风票平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议内容或未获得风票对您问询的解答为由，主张本协议无效或要求撤销本协议。</p>
						<p>3、您承诺接受并遵守本协议的约定，如果您不同意本协议约定，则应立即停止使用风票平台服务。</p>
						<p>4、风票有权依据需要不时地制订、修改本协议或各类规则，不再单独通知您。变更后的协议和规则一经公布立时生效。如果您不同意本协议约定，则应立即停止使用风票平台服务。您继续使用风票平台服务的，即表示您接受经修订的协议和规则。</p>
						<p class="description_title">一、售票资格定义</p>
						<p>1、需持有真实有效门票；</p>
						<p>2、缴纳相应保证金，以保证买家权益不受损害；</p>
						<p class="description_title">二、售票应尽责任</p>
						<p>1、订单履行：卖家每服务一个订单，不得中途无故放弃或取消订单，转卖他人，一经核实，风票有权禁止卖家售票；</p>
						<p>2、门票规范：卖家需要持有经过认证的门票，并保证门票100%真实有效。</p>
						<p class="description_title">三、特殊费用说明</p>
						<p>1、因门票属于贵重物品，快递配送的订单统一使用“快递包邮”，由卖家支付快递费；</p>
						<p>2、成功售出订单，平台会收取卖家相应手续费，用于支付第三方支付平台收取的交易手续费。</p>
						<p class="description_title">四、特殊情况说明</p>
						<p>1、违反风票规则的卖家和买家，平台有权注销其会员资格，并追究其可能导致的损失；</p>
						<p>2、交易真实，拒绝舞弊行为：风票将采取技术手段监控运营数据，平台有权按照自己的判断标准取消舞弊卖家交易和买家的优惠，对于情节严重者暂停交易甚至取消交易资格。所有作弊订单将视情况取消优惠或不予结算，风票有权追究其法律责任。</p>
					</div>
				<div class="close_icon"><button class="btn red_btn" @click="agreementShow = false">关闭</button></div>
			</div>
		</div>
		<!--卖票协议 end-->
		<!--卖票须知 start-->
		<div class="ticketing_instructions_pop customer_service_pop" v-show="noticeShow">
			<div class="ticketing_instructions">
				<p class="title padding_top_0 margin_bottom_0">《卖票须知》</p>
				<div class="ticket_agreement agreement_box">
						<p class="description_title">特别申明：</p>
            <p>风票平台禁止购票后加价或取消订单，敬告大家：风票禁止临场放鸽子行为，如无法交付门票，请至少提前48小时告知用户，并协商好解决办法。若导致用户投诉卖家至风票平台，卖家将会受到相应处罚，甚至冻结账号停止结算。请大家共同维护好平台交易环境。</p>
						<p class="description_title">卖票及佣金说明：</p>
						<p>1、在平台发布门票是免费的；</p>
						<p>2、门票卖出后，平台收取卖家手续费；</p>
						<p>3、售票成功后所得票款，均由系统自动打款至个人账户。</p>
						<p class="description_title">配送说明：</p>
						<p>1、卖家需要在项目开票后3天内发货，否则买家有权要求平台取消订单并赔付；</p>
						<p>2、现场取票，至少保证开场前30分钟给票，否则买家有权要求平台取消订单并赔付。</p>
						<p class="description_title">保证金说明：</p>
						<p>1、为保证买家利益，卖票时需缴纳一定数额保证金；卖家取消已支付订单，将会扣除相应保证金补偿给买家；</p>
						<p>2、门票已售出：保证金及订票款，将在订单交易成功后结算给卖家。</p>
					</div>
				<div class="close_icon"><button class="btn red_btn" @click="noticeShow = false">关闭</button></div>
			</div>
		</div>
		<!--卖票须知 end-->
  <mt-popup
    v-model="matchesSelect"
    position="bottom">
    <mt-picker 
      :slots="matchesSlot" 
      @change="onMatchChange" 
      :visible-item-count="3"
      valueKey="grade"
      ></mt-picker>
  </mt-popup>
  <mt-popup
    v-model="sellMethodSelect"
    position="bottom">
    <mt-picker 
      :slots="sellMethodSlot" 
      @change="onsellMethodChange" 
      :visible-item-count="3"
      valueKey="value"
      ></mt-picker>
  </mt-popup>
  <mt-popup
    v-model="seatSeriesSelect"
    position="bottom">
    <mt-picker 
      :slots="seatSeriesSlot"
      @change="onSeriesSlotChange" 
      :visible-item-count="3"
      valueKey="value"
      ></mt-picker>
  </mt-popup>
</div>  
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      id: "",
      agreementShow: false,
      noticeShow: false,
      detail: {},
      confirm: false,
      matchesSelect: false,
      matchesSlot: [
        {
          flex: 1,
          values: [""]
        }
      ],
      deposit: 0,
      service: 0,
      match: {},
      price: "",
      count: "",
      submitRedClass: false,
      sellMethod: {
        key: "double",
        value: "双数出售"
      },
      sellMethodSelect: false,
      sellMethodSlot: [
        {
          flex: 1,
          values: [
            {
              key: "double",
              value: "双数出售"
            },
            {
              key: "noSinger",
              value: "不可留单张"
            },
            {
              key: "together",
              value: "必须一起买"
            },
            {
              key: "split",
              value: "可以分开买"
            }
          ]
        }
      ],
      seatSeries: {
        key: "noSinger",
        value: "不连坐"
      },
      seatSeriesSelect: false,
      seatSeriesSlot: [
        {
          flex: 1,
          values: [
            {
              key: false,
              value: "不连坐"
            },
            {
              key: true,
              value: "两张连坐"
            }
          ]
        }
      ],
      sellerName: "",
      sellerPhone: "",
      sellerAddress: ""
    };
  },
  activated() {
    this.price = "";
    this.count = "";
    this.sellerName = "";
    this.sellerPhone = "";
    this.sellerAddress = "";
    this.init();
  },
  watch: {
    match(value) {
      this.submitButtonClass();
    },
    price(value) {
      if (value) {
        if (!/^[0-9]*$/.test(value)) {
          this.price = value.substring(0, value.length - 1);
        } else {
          this.changeCharge();
        }
      }
      this.submitButtonClass();
    },
    count(value) {
      if (value) {
        if (!/^[0-9]*$/.test(value)) {
          this.count = value.substring(0, value.length - 1);
        } else {
          this.changeCharge();
        }
      }
      this.submitButtonClass();
    },
    confirm(value) {
      this.submitButtonClass();
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id;
      api.ticket.match_detail({ id: this.id }).then(res => {
        this.detail = res.data;
        this.matchesSlot[0].values = [];
        this.detail.matchesItems.map(i => {
          this.matchesSlot[0].values.push(i);
        });
        this.match = this.matchesSlot[0];
        this.$emit("wx-load2");
      });
    },
    submitButtonClass() {
      if (
        this.price !== "" &&
        this.count !== "" &&
        this.confirm &&
        this.match.value !== "" &&
        this.match.price !== ""
      ) {
        this.submitRedClass = true;
      } else {
        this.submitRedClass = false;
      }
    },
    onMatchChange(p, i) {
      if (i) {
        this.match = i[0];
      }
    },
    onsellMethodChange(p, i) {
      if (i) {
        this.sellMethod = i[0];
      }
    },
    onSeriesSlotChange(p, i) {
      this.seatSeries = i[0];
    },
    submit() {
      if (this.match.grade == undefined) {
        this.$alert("请选择球票等级");
        return;
      }
      if (this.price == "") {
        this.$alert("请输入销售价格");
        return;
      }
      if (this.count == "") {
        this.$alert("请输入出售数量");
        return;
      }
      if (
        this.sellerPhone &&
        !/^1[3|4|5|7|8][0-9]{9}$/.test(this.sellerPhone)
      ) {
        this.$alert("请输入正确的卖票人电话");
        return;
      }
      if (!this.confirm) {
        this.$alert("请先阅读买票协议以及转票须知");
        return;
      }

      api.ticket
        .product_preAdd({
          match: this.id,
          originalPrice: this.match.price,
          grade: this.match.grade,
          count: this.count,
          sellMethod: this.sellMethod.key,
          shippingMethod: "快递包邮",
          downTime: "比赛前一天",
          price: this.price,
          isTogether: this.seatSeries.key,
          sellerName: this.sellerName,
          sellerPhone: this.sellerPhone,
          sellerAddress: this.sellerAddress
        })
        .then(res => {
          this.$router.replace({
            name: "transfer/order_wait",
            query: {
              id: res.data.id
            }
          });
        });
    },
    changeBlur() {
      if (this.sellMethod.key === "double") {
        if (this.count % 2 == 1) {
          this.count = "";
          this.$alert("出售的数量必须是双数");
        }
      }
    },
    changeCharge() {
      if (!this.price || !this.count) return;
      api.ticket
        .rate_depositAndService({
          price: this.price,
          count: this.count
        })
        .then(res => {
          this.deposit = res.data.deposit / this.count;
          this.service = res.data.service;
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style>
input.form-control[disabled] {
  background: transparent !important;
}
</style>