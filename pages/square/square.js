// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    list: [{
        message_id: "msgid_un_filled",
        openid: "哆啦B梦",
        send_timestamp: "2019-7-6 14:42",
        centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
        likes: 2,
        comments: 2,
      },
      {
        essage_id: "msgid_un_filled",
        openid: "哆啦C梦",
        send_timestamp: "2019-8-6 15:14",
        centent: "阅读，是一次心灵的艺术之旅。",
        likes: 6,
      },
      {
        essage_id: "msgid_un_filled",
        openid: "天线宝宝",
        send_timestamp: "2019-8-8 14:42",
        centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
        likes: 9,
      },
    ]
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