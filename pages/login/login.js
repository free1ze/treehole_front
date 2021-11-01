// pages/login/login.js
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    // stuid: "",
    code: "",
    phonenumber: "",
    email:"",
    time: '获取验证码', //倒计时 
    currentTime: 20,
    ifallowskipauth: false,
    ifShowContent:false,
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
          currentTime:20,
          disabled: false   
        })
      }
    }, 1000)  
  },
  getVerificationCode: function(){
    var that = this
    console.log(getApp().globalData.user.openid )
    // if(!this.data.stuid){
    //   wx.showToast({
    //     title: '请输入学号~',
    //     icon:'none',
    //     duration: 1200,
    //   })
    //   return
    // }
    if(!this.data.email){
      wx.showToast({
        title: '请输入邮箱~',
        icon:'none',
        duration: 1200,
      })
      return
    }
    wx.request({
      url: getApp().globalData.url + '/send_code',
      method:'POST',
      data:{
        openid: getApp().globalData.user.openid,
        // stuid: that.data.stuid,
        email: that.data.email,
      },
      success(res){
        console.log(res)
        if(res.data.error_code != 0){
          wx.showToast({
            title: '未知错误',
            icon: 'none',
            duration: 1200,
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
    // if(!this.data.stuid){
    //   wx.showToast({
    //     title: '请输入学号~',
    //     icon:'none',
    //     duration: 1200,
    //   })
    //   return
    // }
    if(!this.data.code){
      wx.showToast({
        title: '请输入验证码~',
        icon:'none',
        duration: 1200,
      })
      return
    }
    if(!this.data.email){
      wx.showToast({
        title: '请输入邮箱~',
        icon:'none',
        duration: 1200,
      })
      return
    }
    wx.request({
      url: getApp().globalData.url + '/verify',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        // stuid: that.data.stuid,
        code: that.data.code,
        email: that.data.email,
      },
      success(res){
        if(res.data.error_code == 0){
          wx.showToast({
            title: '验证成功！',
            icon: 'none',
            duration: 1000,
          })
          getApp().globalData.user.isverified = true;
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
  // stuidInput: function (e) {
  //   this.data.stuid = e.detail.value
  // },

  codeInput: function (e) {
    this.data.code = e.detail.value
  },

  phonenumberInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  emailInput: function(e){
    this.data.email = e.detail.value
  },


//   copy1: function(){
//     wx.setClipboardData({
//       data: 'https://stu.xjtu.edu.cn', 
//       success: function () {
//         // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
//         wx.hideToast()
//         wx.showModal({
//           confirmText:'知道了',
//           content:'已复制邮箱地址，请用浏览器打开。\r\n遇到问题请点击左下角',
//           showCancel: false,
//         })
//       }
//     })
// },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ifallowskipauth: (options.ifallowskipauth == "true" ? true : false),
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