import {baseUrl} from "./config"

export default function(options) {
  const {url, method, data} = options
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: method || "get",
      data: data || {},
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}