// pages/page4/page4.js// pages/page1/page1.js
Page({

  data: {  
    
    ifShowContent:false,
    htmlText:
    '<h3>\
    支持一下\
  </h3>\
  <p>\
    <hr />\
  </p>\
  <p>\
    树洞目前还是为爱发电的状态 (´;ω;)\
  </p>\
  <p>\
    商业合作请联系xjtutreehole@qq.com\
  </p>\
  '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ifShowContent:getApp().globalData.user.ifshowcontent
    })
  },
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
})