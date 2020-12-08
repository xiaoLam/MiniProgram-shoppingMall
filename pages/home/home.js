// pages/home/home.js
import {
  getmultiDate,
  getGoodsData
} from "../../service/home"

const types = ['pop', 'new', 'sell']

Page({
  data: {
    banner: [],
    recommend: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      "pop": {page: 0, list: []},
      "new": {page: 0, list: []},
      "sell": {page: 0, list: []}
    },
    currentType: "pop",
    showBacktop: false,
    isTabFixed: false,
    tabTop: 0
  },
  // ------------------页面生命周期函数-------------
  onLoad: function (options) {
    // 在页面加载的时候进行数据请求
    // 请求首页轮播图以及推荐数据
    this._getmultiDate()

    // 请求商品数据
    this._getGoodsData("pop")
    this._getGoodsData("new")
    this._getGoodsData("sell")
  },
  onReachBottom() {
    // 在页面滚动到底部的时候, 调用请求商品数据函数, 达到上拉加载更多数据的效果
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    // 取出页面滚动到的位置
    const scrollTop = options.scrollTop

    // 注意, 小程序官方不建议在滚动的回调函数中频繁地通过this.setData() 来修改数据
    // 所以我们先做了一个判断, 判断是否修改数据再修改
    const backTopFlag = scrollTop >= 1000
    if(backTopFlag != this.data.showBacktop) {
      this.setData({
        showBacktop: backTopFlag
      })
    }

    // 设置tab-control的fixed布局
    const tabFlag = scrollTop >= this.data.tabTop
    if(tabFlag != this.data.isTabFixed) {
      this.setData({
        isTabFixed: tabFlag
      })
    }
  },

  // -------------网络请求函数-----------------
  _getmultiDate() {
    getmultiDate()
    .then((res) => { // 请求数据成功
      const data = res.data.data  // 获取到数据

      const banners = data.banner.list.map(item => {
        return item.image
      })
    
      this.setData({ // 存储数据
        banner: banners,
        recommend: data.recommend.list
      })
    })
    .catch((err) => { // 请求数据失败
      console.log(err);
    })
  },
  _getGoodsData(type) {
    // 获取需要请求的数据页数
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page)
    .then((res) => {
      // 提取数据
      const list = res.data.data.list
      
      // 存储数据到对应的位置
      const newTypeList = this.data.goods[type].list
      newTypeList.push(...list)

      const typeList = `goods.${type}.list`;
      const typePage = `goods.${type}.page`;
      this.setData({
        [typeList] : newTypeList,
        [typePage] : page
      })
    })
    .catch((err) => {
      console.log(err);
    })
  },

  // ---------------------事件监听函数------------------
  itemClick(event) {
    // 获取点击item的下标
    const index = event.detail.index
    console.log(index);

    // 通过下标改变currentType以改变展示的商品
    this.setData({
      currentType : types[index]
    })
  },
  recommendImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect((rect) => {
      this.setData({
        tabTop: rect.top     // 节点的上边界坐标
      })
}).exec()
  }
})