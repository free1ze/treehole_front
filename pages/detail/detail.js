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
    list: [],
    comment: [],
    releaseFocus:false,
    nomessageflag:false,
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

  reply0:function(e){
    if(getApp().globalData.user.isverified == true){
      this.setData({
        message_id: e.target.dataset.message_id,
        reply_type:0,
        releaseFocus:true,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },
  reply1:function(e){
    if(getApp().globalData.user.isverified == true){
      this.setData({
        message_id: e.target.dataset.message_id,
        reply_to: e.target.dataset.reply_to,
        reply_type:1,
        releaseFocus:true,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  reply_by_type: function(e){
    
    if(this.data.reply_type == 0){
      this.reply_message(e)
    }
    else{
      this.reply_comment(e)
    }
    //这里应该处理异步，不过不知道为什么没有BUG，所以没管
    this.setData({
      detail: ""
    })
  },

  reply_message:function(e){
    var that = this;
    
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
          var newlist = [...that.data.list]
          newlist[0].comments +=1
          that.setData({
            list: newlist,
            nomessageflag:false
          })
          wx.showToast({
            title: '已发送',
            icon: 'none',
            duration: 1000,
          })
        },
      })

      this.setData({
        reply: false     //隐藏回复框
      })

  },

  reply_comment:function(e){
    var that = this
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
        var newlist = [...that.data.list]
        newlist[0].comments +=1
        that.setData({
          list: newlist,
          nomessageflag:false
        })
        wx.showToast({
          title: '已发送',
          icon: 'none',
          duration: 1000,
        })
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
          that.setData({
            list: list
          })
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
          that.setData({
            list: list
          })
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
          that.setData({
            comment: comment_list
          })
          wx.request({
            url: getApp().globalData.url + '/dislike',
            method: 'POST',
            data:{
              like_id: e.target.dataset._id,
              openid: getApp().globalData.user.openid,
            },
            success(res){
            },
          })
        }
        else{
          comment_list[i].islike = 1;
          comment_list[i].likes++;
          that.setData({
            comment: comment_list
          })

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
      }
    }
  },

  onTapMore: function (e) {
    var that = this
    var itemList= []
    var message_id = e.target.dataset._id
    console.log(e.currentTarget)
    if(e.target.dataset.openid == getApp().globalData.user.openid){
      itemList = ["删除"]
    }else{
      itemList = ["举报"]
    }
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#FF0000',
      success(res){
        //report
        if(itemList[0] == "举报"){
          var itemList2 =  ["色情低俗", "人身攻击", "虚假信息", "其它"]
          wx.showActionSheet({
            itemList: itemList2,
            success(res){
              wx.request({
                url: getApp().globalData.url + '/report',
                method: "POST",
                data:{
                  message_id: message_id,
                  type: itemList2[res.tapIndex],
                  from_id: getApp().globalData.user.openid,
                  },
                  success(res){
                    console.log(res)
                    wx.showToast({
                      title: '举报成功',
                      icon: 'success',
                      duration: 1000,
                    })
                }
              })
            }
          })
        }
        //delete
        else{
          wx.showToast({
            title: '删除功能暂时关闭～',
            duration: 1000,
            icon: 'none',
          })
          // wx.request({
          //   url: getApp().globalData.url + '/delete',
          //   method: "POST",
          //   data:{
          //     _id: message_id,
          //   },
          //   success(res){
          //     for(var i =0; i<that.data.comment.length; i++){
          //       if(that.data.comment[i]._id == message_id){
          //         that.data.comment.splice(i,1)
          //         that.setData({
          //           comment: that.data.comment,
          //         })
          //         wx.showToast({
          //           title: '永远的消失了～',
          //           icon: 'none',
          //           duration: 1000,
          //         })
          //       }
          //     }
          //   }
          // })
        }
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: e.target.dataset.urls,
      current: e.target.dataset.current
    });
  },
  onImageError: function(e){
    var that = this
    var list = this.data.list
    var fileID = e.target.dataset.current
    for(var i=0;i<list.length;i++){
      for(var j=0;j<list[i].imgs.length;j++){
        if(list[i].imgs[j] == fileID){
          that.setData({
            ['list['+i+'].imgs['+j+']']: "/images/broken_image.png"
          })
        }
      }
    }
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
        openid: getApp().globalData.user.openid,
      },
      success(res){
        console.log(res.data)
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
        openid: getApp().globalData.user.openid,
        loaded:0,
      },
      success(res){
        // console.log("getcomment",res)
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
        loaded: that.data.comment.length,
        openid: getApp().globalData.user.openid
      },
      success(res){
        console.log(res)
        that.setData({
          comment: that.data.comment.concat(res.data.data)
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
    wx.hideNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(this.data.nomessageflag == true){
      wx.showToast({
        title: '已经到底了～',
        icon: 'none',
        duration: 1000,
      })
    }
    else{
    var that = this
    wx.showToast({
      title: '玩命加载中～',
      icon:'none',
    })
    wx.request({
      url: getApp().globalData.url + '/get_all_comment',
      method: "POST",
      data: {
        message_id: that.data.message_id,
        loaded: that.data.comment.length,
        openid: getApp().globalData.user.openid,
      },
      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        console.log(res)
        that.setData({
          comment: that.data.comment.concat(res.data.data)
        },()=>{
          wx.showToast({
            title: '加载完成～',
            icon:'none',
            duration:1000,
          })
          if(res.data.data.length == 0){
            that.setData({
              nomessageflag: true,
            })
          }
        })

      }
    })
    }
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // },

  hideKeyboard: function(e){
    this.setData({
      releaseFocus:false,
    })
  },

  setValue: function(e){
    this.setData({
      detail:e.detail.value,
    })
  },
  catchBubble:function(e){
    // 
  }
})