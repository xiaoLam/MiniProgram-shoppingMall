// 详情页面数据请求
import request from "./network"

export function getDetailData(iid) {
  return request({
    url: "/detail",
    data: {
      iid
    }
  })
}

export class GoodBaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    
    this.realPrice = itemInfo.lowNowPrice
  }
}
