// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    reply: false,
    message_id: "",
    detail:"",
    reply_to:"",
    reply_type:0,       //0: message  1: comment
    // like: false,
    list: [],
    comment: [],
    keyboardHeight: 0,
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

  bindTextAreaBlur: function(e) {
    // console.log(e.detail.value)
    this.data.detail = e.detail.value
  },

  dereply:function(e){
    if(e.target.id!="replycontent" && this.data.reply==true){
      this.setData({
        reply: false    //如果有回复框，则把它取消掉
      })
    }
  },

  reply0:function(e){
    console.log("000")
    this.setData({
      message_id: e.target.dataset.message_id,
      reply_type:0,
    })
    if(this.data.reply==false){
      this.setData({
        reply: true     //展示回复框
      })
    }
  },
  reply1:function(e){
    this.setData({
      message_id: e.target.dataset.message_id,
      reply_to: e.target.dataset.reply_to,
      reply_type:1,
    })
    if(this.data.reply==false){
      this.setData({
        reply: true     //展示回复框
      })
    }
    console.log(this.data)
    console.log(this.data.reply_type)
  },

  reply_by_type: function(e){
    
    if(this.data.reply_type == 0){
      this.reply_message(e)
    }
    else{
      this.reply_comment(e)
    }
  },

  reply_message:function(e){
    console.log("msg!!!!!!!!")
    var that = this;
    // 回复form隐藏、展示切换
    console.log(e.detail)
    
      wx.request({
        url: getApp().globalData.url + '/reply_message',
        method: "POST",
        data:{
          content: that.data.detail,
          openid: getApp().globalData.user.openid,
          message_id: that.data.message_id,
          reply_to: ""  
        },
        success(res){
          that.reload_comment()
          console.log("msg",res)
        },
      })

      this.setData({
        reply: false     //隐藏回复框
      })

  },

  reply_comment:function(e){
    var that = this;
    console.log("!!!")
      wx.request({
        url: getApp().globalData.url + '/reply_comment',
        method: "POST",
        data:{
          content: that.data.detail,
          openid: getApp().globalData.user.openid,
          message_id: that.data.message_id,
          reply_to: that.data.reply_to,
        },
        success(res){
          that.reload_comment()
        },
      })

      this.setData({
        reply: false     //隐藏回复框
      })
      
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
    var msg_id = ""
    //first load 
    if (this.data.message_id == ""){
      msg_id = options.message_id
      this.setData({
        message_id: msg_id,
      })
    }
    //second load 
    else{
      msg_id = this.data.message_id
    }
    //get artical
    wx.request({
      url: getApp().globalData.url + '/get_single_artical',
      method: "POST",
      data: {
        message_id: msg_id,
        openid: getApp().globalData.openid,
      },
      success(res){
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
        message_id: msg_id,
      },
      success(res){
        console.log(res)
        that.setData({
          comment: res.data.data,
        })
      }
    })
  },

  reload_comment: function(e){
    var that = this;
    
    var msg_id = this.data.message_id
    
    //get artical comments
    wx.request({
      url: getApp().globalData.url + '/get_all_comment',
      method: "POST",
      data: {
        message_id: msg_id,
        loaded: 0,
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
    //监听键盘高度会被多次调用
    wx.onKeyboardHeightChange(res => {
      this.setData({
        keyboardHeight: res.height
      })
    })
    console.log("height")
    console.log(this.data.keyboardHeight)
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
    console.log("reach")
    if(!this.data.message_id)
      return;
    var that = this
    wx.request({
      url: getApp().globalData.url + '/get_all_comment',
      method: "POST",
      data: {
        message_id: that.data.message_id,
        loaded: that.data.comment.length,
      },
      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        console.log(res.data)
        that.setData({
          comment: that.data.comment.concat(res.data.data)
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