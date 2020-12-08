// pages/home/childComponents/l-recommend/l-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sendImage: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goOutlink: function(event) {
      const link = event.currentTarget.dataset.link
      wx.navigateTo({
        url: '/pages/outlink/outlink?link=' + link,
      })
    },
    handleImageLoad() {
      if(this.data.sendImage) {
        this.triggerEvent("imageLoad")
        this.data.sendImage = false
      }
    }
  }
})
