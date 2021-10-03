// pages/login/login.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    netid: "",
    code: "",
    time: '获取验证码', //倒计时 
    currentTime: 60,
    ifallowskipauth: false,
  },
//控制倒计时
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime+'秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:60,
          disabled: false   
        })
      }
    }, 1000)  
  },
  getVerificationCode: function(){
    var that = this
    console.log(getApp().globalData.user.openid )
    if(!this.data.netid){
      wx.showToast({
        title: '请输入netid~',
        icon:'none',
        duration: 500,
      })
      return
    }
    wx.request({
      url: getApp().globalData.url + '/send_code',
      method:'POST',
      data:{
        openid: getApp().globalData.user.openid,
        netid: that.data.netid,
      },
      success(res){
        console.log(res)
        if(res.data.error_code != 0){
          wx.showToast({
            title: '未知错误',
            icon: 'none',
            duration: 500,
          })
        }
      }
    })

    this.getCode();   //控制倒计时的函数
    var that = this
    that.setData({
      disabled:true
    })
  },

  login: function () {
    var that = this
    if(!this.data.netid){
      wx.showToast({
        title: '请输入netid~',
        icon:'none',
        duration: 500,
      })
      return
    }
    if(!this.data.code){
      wx.showToast({
        title: '请输入验证码~',
        icon:'none',
        duration: 500,
      })
      return
    }
    wx.request({
      url: getApp().globalData.url + '/verify',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        netid: this.data.netid,
        code: this.data.code,
      },
      success(res){
        if(res.data.error_code == 0){
          wx.showToast({
            title: '验证成功！',
            icon: 'none',
            duration: 1000,
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/square/square',
            })
          }, 1000);
        }
        else if(res.data.error_code == 1){
          wx.showToast({
            title: '验证码错误!',
            icon: 'none',
            duration: 1000,
          })
        }
      }
    })
    
  },
  netidInput: function (e) {
    this.data.netid = e.detail.value
  },

  codeInput: function (e) {
    this.data.code = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ifallowskipauth: options.ifallowskipauth
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
  
  hint: function(){
   wx.navigateTo({
     url: '/pages/page0/page0',
   })
  },

  skip: function(){
    wx.redirectTo({
      url: '/pages/square/square',
    })
  },


  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})