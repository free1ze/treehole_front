// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    ifShowContent:false,
    firco: "#979797",
    secco: "#000000",
    num: 4,
  },

  first_select: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  second_select: function() {
    if(getApp().globalData.user.isverified == true){
      wx.navigateTo({
        url: '/pages/commit/commit'
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  third_select: function () {
    // wx.redirectTo({
    //   url: '/pages/mine/mine'
    // })
  },
  topage1: function(){
    wx.navigateTo({
      url: '/pages/page1/page1',
    })
  },
  topage2: function(){
    wx.navigateTo({
      url: '/pages/page2/page2',
    })
  },
  topage3: function(){
    wx.navigateTo({
      url: '/pages/page3/page3',
    })
  },
  topage4: function(){
    wx.navigateTo({
      url: '/pages/page4/page4',
    })
  },
  share: function(){
    this.onShareAppMessage()
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
  
  // onShareAppMessage() {
  // }

})