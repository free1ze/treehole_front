// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    last_visit_msg_id: "",
    list: [],
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
              openid: e.target.dataset.openid,
            },
            success(res){
              // console.log(res)
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
              openid: e.target.dataset.openid,
            },
            success(res){
              // console.log(res)
            },
          })
        }
        that.setData({
          list: list
        })
        
      }
    }
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


    comment: function(e){
      //这里要用currentTarget而不是target！！！
      var _id = e.currentTarget.dataset._id
      this.setData({
        last_visit_msg_id : _id,
      })
      console.log('/pages/detail/detail' + 
      '?message_id=' + _id )
      console.log(e.target)
      wx.navigateTo({
        url: '/pages/detail/detail' + 
              '?message_id=' + _id,
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
      data: {
        openid: getApp().globalData.user.openid,
        loaded: 0,
      },

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
    
    var that= this
    var newlist = this.data.list

    if(that.data.last_visit_msg_id=="")return;
    wx.request({
      url: getApp().globalData.url + '/get_single_artical',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        message_id : that.data.last_visit_msg_id,
      },
      success(res){
        for(var i=0;i<newlist.length;i++){
          if (newlist[i]._id == res.data.data._id){
            newlist[i] = res.data.data
            that.setData({
              list: newlist
            })
          }
        }
        console.log(that.data)
        // 不能使用that.data.list = res.data.data，不会触发渲染
      }
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
    var that = this
    wx.request({
      url: getApp().globalData.url + '/get_all_artical',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: 0,
      },

      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        that.setData({
          list: res.data.data
        })

      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    wx.request({
      url: getApp().globalData.url + '/get_all_artical',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: that.data.list.length,
      },

      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        that.setData({
          list: that.data.list.concat(res.data.data)
        })

      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  

  
})

