// home页面的网络请求
import request from "./network"

export function getmultiDate() {
  return request({
    url: "/home/multidata"
  })
}

export function getGoodsData(type, page) {
  return request({
    url: "/home/data",
    data: {
      type,
      page
    }
  })
}