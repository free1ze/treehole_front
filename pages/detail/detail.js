// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    reply: false,
    // like: false,
    list: [],
    comment: [],
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

  reply:function(e){
    var that = this;
    // 回复form隐藏、展示切换
    if(that.data.reply==true){
      that.setData({
        reply: false     //展示回复框
      })
    }
    else{
      that.setData({
        reply: true     //隐藏回复框
      })
      wx.request({
        url: getApp().globalData.url + '/reply_comment',
        method: "POST",
        // data:{
        //   content: e.detail.value,
        //   openid: ,
        //   message_id:  ,
        //   reply_to: .
        // }
      })
    }
    // that.setData({
    //   reply_id: e.currentTarget.dataset.cid   //用户点击回复的评论id
    // })
  },

  
  like: function(e){
    var that = this
    var list = this.data.list 

    for (var i=0; i<list.length; i++)
    {
      if(list[i]._id == e.target.dataset._id){
        if(list[i].islike == 1){
          list[i].islike = 0;
          list[i].likes--;
          wx.request({
            url: getApp().globalData.url + '/dislike',
            method: 'POST',
            data:{
              like_id: e.target.dataset._id,
              openid: getApp().globalData.user.openid,
            },
            success(res){
              console.log(res)
            },
          })
        }
        else{
          list[i].islike = 1;
          list[i].likes++;

          wx.request({
            url: getApp().globalData.url + '/like',
            method: 'POST',
            data:{
              like_id: e.target.dataset._id,
              openid: getApp().globalData.user.openid,
            },
            success(res){
              console.log(res)
            },
          })
        }
        that.setData({
          list: list
        })
      }
    }
  },


  commentlike: function(e){
    var that = this
    var comment_list = this.data.comment 

    for (var i=0; i<comment_list.length; i++)
    {
      if(comment_list[i]._id == e.target.dataset._id){
        if(comment_list[i].islike == 1){
          comment_list[i].islike = 0;
          comment_list[i].likes--;
          wx.request({
            url: getApp().globalData.url + '/dislike',
            method: 'POST',
            data:{
              like_id: e.target.dataset._id,
              openid: getApp().globalData.user.openid,
            },
            success(res){
              console.log(res)
            },
          })
        }
        else{
          comment_list[i].islike = 1;
          comment_list[i].likes++;

          wx.request({
            url: getApp().globalData.url + '/like',
            method: 'POST',
            data:{
              like_id: e.target.dataset._id,
              openid: getApp().globalData.user.openid,
            },
            success(res){
              console.log(res)
            },
          })
        }
        that.setData({
          comment: comment_list
        })
      }
    }
  },
  
  // commentlike:function(){
  //   var that = this;
  //   wx.request({
  //     url: getApp().globalData.url + '/get_all_commment',
  //     method: "POST",
  //     data:{
  //       message_id: this.data.list[0]._id
  //     },
  //     success(res){
  //       that.setData({
  //         comment: res.data.data
  //       })
  //       console.log(res)
  //     }
  //   })
  // },

  inputs:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    
    //get artical
    wx.request({
      url: getApp().globalData.url + '/get_single_artical',
      method: "POST",
      data: {
        message_id: options.message_id,
        openid: getApp().globalData.openid,
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          list: [res.data.data]
        })
      }
    })

    //get artical comments
    wx.request({
      url: getApp().globalData.url + '/get_all_comment',
      method: "POST",
      data: {
        message_id: options.message_id
      },
      success(res){
        console.log(res)
        that.setData({
          comment: res.data.data
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
    var that = this
    wx.request({
      url: getApp().globalData.url + '/get_all_comment',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: that.data.comment.length,
      },

      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        that.setData({
          list: that.data.comment.concat(res.data.data)
        })

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})