<template>
<div>
  <div class="row ticket_wrap order customer_service logistics_view">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="100">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">售后详情</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_40 clearfix" v-show="complainState !== 0">
     <div class="col-xs-12 padding_0">
				<div class="logistics_view_box">
					<div class="logistics_view_item" v-for="(item ,index) in complainItems">
						<div class="step_item_content">
							<div class="point" 
                :class="{
                  'blue' : index === 0, 
                  'gray' : index !== 0
                }">
              </div>
							<div class="step_item clearfix">
								<div class="logistics_address">{{item.complainStateText}}</div>
								<div class="logistics_address margin_bottom_10">{{item.content}}</div>
								<p class="customer_detail_pic clearfix">
                  <span v-for="(img , i) in item.images"  @click="clickPic(i ,item.images)">
                    <img :src="img.image" class="img-responsive">
                  </span>
                </p>
                <p>{{item.formatTimeCreateDate}}</p>
							</div>
						</div>
					</div>
					</div>
        </div>
    </div>
  </div>
  
  <div class="row ticket_wrap order customer_service customer_service_sq">
    <div class="col-xs-12 ticket_topnav affix-top" data-spy="affix" data-offset-top="20">
      <div class="header_button text-left">
        <a href="javascript:;" @click="$router.go(-1)"><span class="glyphicon  left_returnarrow" aria-hidden="true"></span></a>
      </div>
      <h1 class="header_title">售后详情</h1>
      <div class="header_button text-right">
      </div>
    </div>
    <div class="tab-content margin_top_50 clearfix" v-show="fillInInfo">
      <div class="col-xs-12 order_item clearfix">
        <ul class="clearfix">
          <li>
            <em class="qz">{{describeInfo}}</em>
            <span class="input_box">
              <textarea 
                class="form-control" 
                rows="3" 
                placeholder="请输入您的描述，300字以内" 
                v-model="complainInfo"></textarea>
            </span>
          </li>
        </ul>
         <div class="upload_photos clearfix">
          <p>照片证明</p>
          <p>
            <span v-for="(item , index) in uploadImages" @click="clickPicItem(index)">
              <img class="img-responsive" alt="" :src="item">
            </span>
            <span @click="openImage">
              <img class="img-responsive" alt="" src="@/images/order/upload_photos.jpg">
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="order_bottom realname" v-show="fillInInfo">
      <button @click="submitInfo" class="btn red_btn">提交信息</button>
    </div>
  </div>
  <!--售票说明 start-->
  <div class="ticketing_instructions_pop customer_service_pop" style="display:none ;">
    <div class="ticketing_instructions">
      <p class="title">平台售后赔付细则</p>
      <ul class="ticket_price">
        <li><span></span>票品售价200元以下售后赔付50元/张</li>
        <li><span></span>票品售价200-1000元售后赔付100元/张</li>
        <li><span></span>票品售价2000-5000元售后赔付500元/张</li>
        <li><span></span>票品售价5000-10000元售后赔付1000元/张</li>
        <li><span></span>票品售价10000元售后赔付2000元/张</li>
      </ul>
      <div class="close_icon"><button class="btn red_btn">关闭</button></div>
    </div>
  </div>
  <!--售票说明 end-->
</div>  
</template>

<script>
import api from "@/api";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      customerId: null,
      orderId: null,
      complainInfo: "",
      /**
       * 0 : 买家还没发起请求
       * 1 : 买家已发起请求,卖家还没反馈
       * 2 : 卖家已反馈,等待平台反馈
       * 3 : 平台已反馈
       */
      complainState: 0,
      complainItems: [],
      fillInInfo: false,
      describeInfo: "投诉描述",
      isBought: false,
      _images: [],
      uploadImages: []
    };
  },
  activated() {
    this.describeInfo = "";
    this.fillInInfo = false;
    this.customerId = this.$route.query.id;
    this.isBought = this.$route.query.isBought;
    this.orderId = this.$route.query.orderId;
    this.uploadImages = [];
    this.init();
  },
  watch: {},
  methods: {
    init() {
      if (this.customerId) {
        api.order.complain_detail({ id: this.customerId }).then(res => {
          this.complainItems = res.data.items;
          this.complainItems.reverse();
          this.complainState = this.complainItems.length;
          this.decideComplainText();
        });
      } else {
        this.complainState = 0;
        this.decideComplainText();
      }
    },
    decideComplainText() {
      this.$emit("wx-load2");
      var complainStateText = "";
      this.complainItems.forEach((item, index) => {
        switch (index) {
          case 0:
            complainStateText =
              this.complainState === 3
                ? "平台反馈"
                : this.complainState === 2 ? "卖家处理申请" : "买家申请售后";
            break;
          case 1:
            complainStateText =
              this.complainState === 3 ? "卖家处理申请" : "买家申请售后";
            break;
          case 2:
            complainStateText = "买家申请售后";
            break;
        }
        if (typeof item.complainStateText === "undefined") {
          this.$set(item, "complainStateText", complainStateText);
        } else {
          item.complainStateText = complainStateText;
        }
      });
      if (this.isBought) {
        this.describeInfo = "投诉描述";
        if (this.complainState === 0) this.fillInInfo = true;
      } else {
        this.describeInfo = "处理描述";
        if (this.complainState === 1) this.fillInInfo = true;
      }
    },
    submitInfo() {
      if (!this.complainInfo) {
        this.$alert("请输入描述");
        return;
      }
      if (this.isBought) {
        api.order
          .buyer_launch_complain({
            orderId: this.orderId,
            content: this.complainInfo,
            image: this.uploadImages
          })
          .then(res => {
            this.customerId = res.data.id;
            this.complainInfo = "";
            this.fillInInfo = false;
            this.init();
            this.$alert("投诉成功");
          });
      } else {
        api.order
          .seller_launch_complain({
            id: this.customerId,
            appeal: this.complainInfo,
            image: this.uploadImages
          })
          .then(res => {
            this.complainInfo = "";
            this.fillInInfo = false;
            this.$alert("处理成功");
            this.init();
          });
      }
    },
    openImage() {
      let that = this;
      wx.chooseImage({
        count: 4,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function(res) {
          that._images = res.localIds;
          that.uploadImage();
        }
      });
    },
    uploadImage() {
      if (!this._images.length) return;
      let that = this;
      let localid = this._images.shift();
      wx.uploadImage({
        localId: localid,
        success: function(res) {
          let media_id = res.serverId;
          api.common
            .wechat_upload({
              mediaId: media_id
            })
            .then(data => {
              // 这里获取服务器返回的图片，展示就行了
              that.uploadImages.push(data.data.image);
            });
          that.uploadImage();
        },
        fail: function(res) {
          alert(JSON.stringify(res));
        }
      });
    },
    clickPic(index, images) {
      var list = [];
      images.forEach(item => {
        list.push(item.image);
      });
      wx.previewImage({
        current: list[index], // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      });
    },
    clickPicItem(index) {
      wx.previewImage({
        current: this.uploadImages[index], // 当前显示图片的http链接
        urls: this.uploadImages // 需要预览的图片http链接列表
      });
    }
  },
  mounted() {
    document.getElementById("body").className = "gray_bg";

    this.id = this.$route.query.id;
    this.isBought = this.$route.query.isBought;
    this.orderId = this.$route.query.orderId;
    this.init();
  }
};
</script>