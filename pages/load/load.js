// // pages/load/load.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },


  
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {
//     var that = this

//     wx.showLoading({
//       title: '加载中',
//     })

//     wx.login({
//       success(res) {
//         if (res.code) {
//           console.log(res)
//           var user_code = res.code
//           var username 

//           // 查看是否授权
//           wx.getSetting({
//             success(res) {
//               if (res.authSetting['scope.userInfo']) {
//                 // 已经授权，可以直接调用 getUserInfo 获取头像昵称
//                 wx.getUserInfo({
//                   success: function(res) {
//                     getApp().globalData.userInfo = res.userInfo
//                     username = getApp().globalData.user.nickName
//                     console.log(res.userInfo)
                    
//                 // 调用auth.code2Session请求得到openid 
//                 // 小程序禁止前端调用此接口，故需要从后端调用
//                 // 调用login
//                 wx.request({
//                   url: 'https://qckf3o.fn.thelarkcloud.com/login',
//                   method: 'POST',
//                   data: {
//                     code: user_code,
//                     username: username,
//                   },
//                   success (res){
//                     console.log("!!!!!")
//                     if(res.data["error_code"] == 0){
//                       getApp().globalData.user.openid = res.data.data.openid;
//                       that.next();
//                     }
//                   }
//                 })
//               }
//             })

//               }
              
//             }
//           })
//         } else {
//           console.log('登录失败！' + res.errMsg)
//         }
//       }
//     })

//     setTimeout(function() {
//       wx.hideLoading()
//     }, 500)
//   },

//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
//     // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//     wx.getUserProfile({
//       desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   },

//   bindGetUserInfo(e) {
//     getApp().globalData.userInfo = e.detail.userInfo
//     wx.redirectTo({
//       url: '/pages/load/load'
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   }
// })


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    var that = this
    var user_code 
    wx.login({
      success(res){
        if(res.code){
          user_code = res.code
          console.log(user_code)
        }
    
      wx.request({
        url: 'https://qckf3o.fn.thelarkcloud.com/login',
        method: 'POST',
        data: {
          code: user_code,
        },
        success (res){
          console.log(res)
          if(res.data["error_code"] == 0){
            getApp().globalData.user.openid = res.data.data.openid;
            that.next();
          }
        }
      })
    }
  })
  },

  getUserProfile(e) {
    var that = this
    var user_code
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.login({
      success(res){
        if(res.code){
          user_code = res.code
          console.log(user_code)
        }
      }
    })
    wx.getUserProfile({
      desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        var username = res.userInfo.nickName
        wx.request({
          url: 'https://qckf3o.fn.thelarkcloud.com/login',
          method: 'POST',
          data: {
            code: user_code,
            username: username,
          },
          success (res){
            if(res.data["error_code"] == 1){
              getApp().globalData.user.openid = res.data.data.openid;
              that.next();
            }
          }
        })
      }
    })
    
  },

    next: function(e) {
    wx.redirectTo({
      url: '/pages/square/square'
    })
  },
})
