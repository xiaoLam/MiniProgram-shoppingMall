// pages/home/home.js
import {
  getmultiDate
} from "../../service/home"

Page({
  data: {
    banner: [],
    recommend: [],
    titles: ['流行', '新款', '精选']
  },
  onLoad: function (options) {
    // 在页面加载的时候进行数据请求
    getmultiDate()
    .then((res) => { // 请求数据成功
      const data = res.data.data  // 获取到数据
    
      this.setData({ // 存储数据
        banner: data.banner.list,
        recommend: data.recommend.list
      })
      console.log(this.data.banner);
      console.log(this.data.recommend);
    })
    .catch((err) => { // 请求数据失败
      console.log(err);
    })
  },
  itemClick(event) {
    const index = event.detail.index
    console.log(index);
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})