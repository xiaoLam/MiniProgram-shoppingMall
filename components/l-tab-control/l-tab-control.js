// components/l-tab-control/l-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles : {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemClick(event) {
      // 取到点击的item的下标
      const index = event.currentTarget.dataset.index

      // 通过修改currentIndex以达到给对应的item添加样式
      this.setData({
        currentIndex: index
      })

      // 将点击的item的下标通过triggerEvent发送给页面
      const data = {index}
      this.triggerEvent("itemClick", data)
    }
  } 
})
