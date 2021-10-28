// pages/page3/page3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    ifShowContent:"",
    htmlText:'\
    <h3>\
    树洞小程序分享方法：\
  </h3>'+
  // <h4>\
  //   方法一：\
  // </h4>\
  // <br>\
  '<p>\
    <img src="/images/step1.png" title="img" alt="img" /> \
  </p>\
  <br>\
  <p>\
    <img src="/images/step2.png" title="img" alt="img" />\
  </p>\
  <br>\
  <p>\
    <img src="/images/step3.png" title="img" alt="img" />\
  </p>\
  <h4>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ifShowContent:getApp().globalData.user.ifshowcontent
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})