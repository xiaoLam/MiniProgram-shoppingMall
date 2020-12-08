// pages/detail/detail.js
import {getDetailData,GoodBaseInfo} from "../../service/detail"

Page({
  data: {
    iid: "1m745k0",
    bannerImage: [],
    goodBaseInfo: {}
  },

  // -------------------生命周期函数--------------
  onLoad: function (options) {
    /* this.setData({
      iid: options.iid
    }) */
    this._getDetailData(this.data.iid)
  },

  // -------------网络请求函数----------
  _getDetailData(iid) {
    getDetailData(iid).then((res) => {
      const data = res.data.result
      console.log(data);

      // 取出轮播图图片
      const bannerImage = data.itemInfo.topImages

      // 取出商品基本信息
      const goodBaseInfo = new GoodBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)

      this.setData({
        bannerImage,
        goodBaseInfo
      })
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