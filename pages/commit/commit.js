// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
  },

  bindTextAreaBlur: function(e) {
    // console.log(e.detail.value)
    this.data.detail = e.detail.value
    // console.log(this.data.detail)
  },

  send: function(e) {
    var that=this
    
    console.log(that.data.detail)
    console.log("!") 

    setTimeout(function (){
      wx.navigateBack({
        delta: 1
      })
    }, 1000)

    wx.showLoading({
      title: '发送中',
    })
    //与服务器交互
    wx.request({
      url: getApp().globalData.url + '/post_artical',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        content: that.data.detail,
      },

      success(res){
        console.log(res)
          if(res.data.result.error_code == 0){
          wx.showToast({
            title: '已发送',
            icon: 'success',
            duration: 1000
          })
          wx.reLaunch({
            url: '/pages/square/square',
          })
        }
        else{
          wx.showToast({
            title: '发送失败',
            icon: 'error',
            duration: 1000
          })
        }
      },

      fail: function(res){
        wx.showToast({
          title: '发送失败',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function(res){
        wx.hideLoading()
      } 
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