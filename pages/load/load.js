Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    var that = this
    var user_code 
    this.setData({
      ifShowContent:getApp().globalData.user.ifshowcontent
    })
    wx.login({
      success(res){
        if(res.code){
          user_code = res.code
        }
      wx.request({
        url: 'https://qckf3o.fn.thelarkcloud.com/login',
        method: 'POST',
        data: {
          code: user_code,
        },
        success (res){
          console.log(res)
          if(res.data.ifshowcontent){getApp().globalData.user.ifshowcontent = res.data.ifshowcontent;}
          setTimeout(() => {
           if(!getApp().globalData.user.openid){
            console.log("TIMEOUT!!!")
            wx.showToast({
              title: '请求失败，重试中。。',
              icon:'none',
              duration:6000
            })
             that.onLoad()
            }
          }, 8000);
          getApp().globalData.user.openid = res.data.data.openid;
          if(res.data["error_code"] == 0){
            that.next();
            getApp().globalData.user.openid = res.data.data.openid;
            getApp().globalData.user.isverified = true;
          }
          else if(res.data["error_code"] == 1){
            //未认证
            wx.redirectTo({
              url:  '/pages/login/login' + '?ifallowskipauth=' + res.data.ifallowskipauth,
            })
            getApp().globalData.user.isverified = false;
          }
          else if(res.data["error_code"] == 3){
            wx.showToast({
              title: '你已经进入黑名单！！！    联系管理员申诉',
              icon:'none',
              duration:1000000,
            })
            return
          }
        },
        fail(){
          console.log("TIMEOUT!!!")
          wx.showToast({
            title: '请求失败，重试中。。',
            icon:'none',
            duration:150000
          })
          that.onLoad()
        }
      })
    }
  })
  },

  // getUserProfile(e) {
  //   if(this.data.buttonClickable == false){
  //     return
  //   }
  //   var that = this
  //   var user_code
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.login({
  //     success(res){
  //       if(res.code){
  //         user_code = res.code
  //         console.log(user_code)
  //       }
  //     }
  //   })
  //   wx.getUserProfile({
  //     desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       var username = res.userInfo.nickName
  //       wx.request({
  //         url: 'https://qckf3o.fn.thelarkcloud.com/login',
  //         method: 'POST',
  //         data: {
  //           code: user_code,
  //           username: username,
  //         },
  //         success (res){
  //           if(res.data["error_code"] == 1){
  //             getApp().globalData.user.openid = res.data.data.openid;
  //             wx.showToast({
  //               title: '已登录',
  //               icon:'success',
  //               duration:'1000'
  //             })
  //             that.next();
  //           }
  //         }
  //       })
  //     }
  //   })
    
  // },

    next: function(e) {
    wx.redirectTo({
      url: '/pages/square/square'
    })
  },
})
