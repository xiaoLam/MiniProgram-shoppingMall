### 项目目录的划分
+ assets目录: 存储图片, icon等资源
+ components目录: 存储组件
+ pages目录: 存储页面
+ service目录: 网络请求相关目录
+ utils目录: 工具类
+ app.js: 全局js逻辑
+ app.json: 全局配置
+ app.wxss: 全局样式
+ project.config.json: 小程序项目的配置文件
+ sitemap.json: 项目是否能被小程序索引配置文件

### 数据请求的封装
+ 在service文件夹中封装数据请求方法 network.js
+ 但是我们不会直接在页面中直接调用这个请求方法
+ 而是, 再次进行封装出针对于某个页面的网络请求方法
  - 比如首页数据的请求方法, 我们封装在service文件夹中的home.js文件中
  - 然后首页中的数据请求直接面向的是home.js而不是service.js

### 首页开发-轮播图的封装
+ 这里的轮播图我们使用的是小程序提供的 swiper内置组件
+ 因为轮播图也会在其他的页面中使用(是一个公共组件), 所以我们将其封装到components中

### 首页开发-推荐数据的展示
+ 这里有一个难点, 因为我们每一个推荐数据本来是应该对应一个链接的
+ 但是小程序中是没有a链接来进行外部页面的跳转
+ 这里我为了解决这个问题, 新创建了一个 outlink 页面
  - 在outlink页面中只有一个组件 web-view
    + 这个组件可以通过 src属性来链接外部页面
+ 在我们点击了推荐数据的时候, 就通过 wx.navigateTo() 接口, 从首页跳转到 outlink页面, 并且将对应的link作为数据传递给outlink, 通过 setData() 将link赋值给web-view的src属性, 从而达到跳转到外部链接的效果

### 首页开发-本周流行的展示
+ 本周流行只是一个图片, 所以很简单

### 首页开发-tab-control组件
+ 将tab-control组件封装在components/l-tab-control中
+ 该组件实现了, 可以通过传入一个titles数组, 来产生对应个数的tab-control-item
+ 点击tab-control-item对应的item就会更换样式, 并且将对应的item下标通过自定义事件传递个使用的页面, 自定义事件名称为 itemClick

### 首页开发-商品数据的展示
+ 因为商品的数据比较复杂, 是分为流行, 新款, 精选三个类别的数据的, 而且每个类别的数据请求需要根据属性page页数来请求相应的数据的
+ 所以我们将三个类别的数据存储在一个大的对象中, 大对象又分为三个小对象, 每个小对象分别存储对应类别的page和list数据

### 首页开发-商品数据, l-goods-item组件的封装
+ 在首页中通过wx:for遍历出对应数据个数的l-goods-item组件
+ 并将数据传给l-goods-item组件
+ 在l-goods-item组件中展示数据, 编写样式
+ 为了代码的规范, 我将商品数据的展示抽离成一个组件, 放在components/l-goods中