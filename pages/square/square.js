// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    list: []
  },

  like: function(e){
    console.log(e)
    wx.request({
      url: getApp().globalData.url + '/like',
      method: 'POST',
      data:{
        user_id: getApp().globalData.user.user_id,
        like_id: e.target.dataset.openid,
      },
      success(res){

      },

      fail(res){
        // 网络超时等
      }
    })
  },

  first_select: function() {
    // wx.redirectTo({
    //   url: '../square/square'
    // })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function() {
    wx.navigateTo({
      url: '/pages/mine/mine'
    })
  },

  showdetail: function() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: getApp().globalData.url + '/get_all_artical',
      method: "POST",
      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        that.setData({
          list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})