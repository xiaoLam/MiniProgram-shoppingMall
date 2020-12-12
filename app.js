//app.js
App({
  onLaunch: function () {
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) { // 如果已经添加进来了, 就将其count+1
      oldInfo.count += 1
    } else { // 如果没有添加进来, 就初始化添加进去
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }

    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  // globaData, 全局变量
  // 在点击添加购物车按钮后, 将商品的数据存储在全局变量中
  // 这样就可以在购物车页面中进行调用
  globalData: {
    cartList: []
  }
})