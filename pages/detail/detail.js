// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    list: [{
        face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
        username: "哆啦B梦",
        send_timestamp: "2019-7-6 14:42",
        centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
        total_likes: 2,
      }
    ],
    commit: [{
      reply:"",
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "哆啦C梦",
      send_timestamp: "2019-7-6 14:42",
      content: "写的真好。",
      total_likes: 2,
    },
    {
      reply:"",
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "谭宝子",
      send_timestamp: "2019-7-6 14:42",
      content: "收到收到我是探宝。",
      total_likes: 666,
    },
    {
      reply:"▉ 收到收到我是探宝。",
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "献宝",
      send_timestamp: "2019-7-6 14:42",
      content: "收到收到over。",
      total_likes: 666,
    }
  ]
  },

  first_select: function() {
    wx.redirectTo({
      url: '../square/square'
    })
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
    // wx.navigateTo({
    //   url: '/pages/detail/detail'
    // })
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