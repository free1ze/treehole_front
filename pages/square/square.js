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
    listisempty:false,
    startwindow: true,
    isloadfinished:false,
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
    if(this.data.startwindow == false){
    wx.showModal({
      title: "树洞须知",
      content: "欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦欢迎光临xxxxx（树洞规则)首先不能欺负谭宝维护一个漂亮的树洞没啦",
      showCancel: false,
      confirmText:'知道了',
    })
    this.setData({
      startwindow: true,
    })
    }
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
          list: res.data.data,
          isloadfinished:false,
        },()=>{
          that.loadStorgeArtical(that)
        })
        
      }
    })
    
  },


  onReady: function() {
   
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
          wx.request({
            url: getApp().globalData.url + '/delete',
            method: "POST",
            data:{
              _id: message_id,
            },
            success(res){
              for(var i =0; i<that.data.list.length; i++){
                if(that.data.list[i]._id == message_id){
                  that.data.list.splice(i,1)
                  that.setData({
                    list: that.data.list
                  })
                  wx.showToast({
                    title: '永远的消失了～',
                    icon: 'none',
                    duration: 1000,
                  })
                }
              }
            }
          })
        }
      }
    })
  },

  onClickA: function (e) {
    console.log('onClick A ', e);
    this.popover.onHide();
  },

  onClickB: function (e) {
    console.log('onClick B ', e);
    wx.showToast({
      title: '你点击了B',
      icon: 'none'
    });
    this.popover.onHide();
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

  loadStorgeArtical: function(that){
    console.log("loading")
    if(that.data.isloadfinished == true){
      setTimeout(() => {
        that.loadStorgeArtical(that)
      }, 200);
      return;
    }
    else{
    wx.request({
        url: getApp().globalData.url + '/get_all_artical',
        method: "POST",
        data: {
          openid: getApp().globalData.user.openid,
          loaded: that.data.list.length,
        },
        success(res){
          wx.setStorage({
            key: 'list',
            data: res.data.data,
            success(res){
              console.log(res)
              that.setData({
                isloadfinished: true,
              })
              return;
            }
          }
          )
        }
      })
    }
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
    wx.showNavigationBarLoading()

    console.log("pull")
    var that = this
    wx.showToast({
      title: '玩命加载中~',
      icon:'none',
    })
    
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
            list: res.data.data,
            isloadfinished: false
          },()=>{
            that.loadStorgeArtical(that)
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh()
            wx.showToast({
              title: '加载完成～',
              icon:'none',
              duration:1000,
            })
          })
        }
      })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("reach bottom")
    console.log(this.data.isloadfinished)
    var that = this
    if(that.data.isloadfinished == true){
    wx.getStorage({
      key: 'list',
      success(res){
        if(that.data.list[that.data.list.length-1].id == 1){
          wx.showToast({
            title: '已经到底了～',
            icon: 'none',
            duration:1000,
          })
          return;
        }
        else{
          wx.showToast({
            title: '加载中～',
            icon: 'none',
            duration:1000,
          })
          that.setData({
            list: that.data.list.concat(res.data),
            isloadfinished: false,
          }, ()=>{
            that.loadStorgeArtical(that)
            // wx.hideToast()
            } 
          )
        }
      }
    })
  }
  else{
    setTimeout(() => {
      that.onReachBottom()
    }, 200);
    return;
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

})

