// pages/detail/detail.js
import {getDetailData, 
        GoodBaseInfo,
        ShopInfo,
        ParamInfo,
        getRecommends} from "../../service/detail";

const app = getApp()

Page({
  data: {
    iid: "",
    bannerImage: [],
    goodBaseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: [],
    showBacktop: false
  },
  // -------------------生命周期函数--------------
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    this._getDetailData(this.data.iid)

    this._getRecommends()
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const showBacktopFlag = scrollTop >= 1000
    if (showBacktopFlag !== this.data.showBacktop) {
      this.setData({
        showBacktop: showBacktopFlag
      })
    }
  },

  // -------------网络请求函数----------
  _getDetailData(iid) {
    getDetailData(iid).then((res) => {
      const data = res.data.result

      // 取出轮播图图片
      const bannerImage = data.itemInfo.topImages

      // 取出商品基本信息
      const goodBaseInfo = new GoodBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 取出商家信息
      const shopInfo = new ShopInfo(data.shopInfo)

      // 取出商品详情信息
      const detailInfo = data.detailInfo;

      // 获取商品ParamInfo信息
      const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)

      // 获取商品评论信息
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        bannerImage,
        goodBaseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      this.setData({
        recommends: res.data.data.list
      })
    })
  },

  // -----------------事件绑定函数----------------
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.bannerImage[0];
    obj.title = this.data.goodBaseInfo.title;
    obj.desc = this.data.goodBaseInfo.desc;
    obj.price = this.data.goodBaseInfo.realPrice;


    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})