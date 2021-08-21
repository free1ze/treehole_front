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
    var that = this
    var list = this.data.list 
    for (var i=0; i<list.length; i++)
    {
      if(list[i]._id == e.target.dataset._id){
        if(list[i].islike == 1){
          // list[i].islike = 0;
          // if(list[i]>0)  list[i].likes--;
        }
        else{
          console.log(list[i])
          list[i].islike = 1;
          list[i].likes++;
          that.setData({
            list: list
          })
          console.log(list[i])
        }
        
      }
    }
    wx.request({
      url: getApp().globalData.url + '/like',
      method: 'POST',
      data:{
        like_id: e.target.dataset._id,
        openid: e.target.dataset.openid,
      },
      success(res){
        console.log(res)
      },
      fail:function(res){
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
    // wx.reLaunch({
    //   url: 'pages/square/square'
    // })
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