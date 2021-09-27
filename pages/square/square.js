// pages/square/square.js
let SCREEN_WIDTH = 750
let RATE = wx.getSystemInfoSync().screenHeight / wx.getSystemInfoSync().screenWidth
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    last_visit_msg_id: "",
    search_content: "",
    list: [],
    time_list: [],
    mine_list: [],
    heat_list: [],
    search_list: [],
    time_list_empty_flag: 0,
    mine_list_empty_flag: 0,
    heat_list_empty_flag: 0,
    search_list_empty_flag: 0,
    
    listisempty:false,
    startwindow: true,
    isloadfinished:true,
    showmode:1,  //search tag
    // ScreenTotalW: SCREEN_WIDTH,
    // ScreenTotalH: SCREEN_WIDTH * RATE * 5,
  },
  
  bindTextAreaBlur: function(e) {
    this.data.search_content = e.detail.value
  },

  mode1: function(e){
    //time order
    var that = this
    this.setData({
      list: that.data.time_list,
      showmode:1
    })
  },

  mode2: function(e){
    var that = this
    this.setData({
      list: that.data.heat_list,
      showmode:2
    })
  },

  mode3: function(e){
    var that = this
    this.setData({
      list: that.data.mine_list,
      showmode:3
    })
  },

  mode4: function(e){
    var that = this
    wx.showToast({
      title: '搜索中~',
      icon:'none',
    })
    wx.request({
      url: getApp().globalData.url + '/search',
      method: 'POST',
      data:{
        pattern: that.data.search_content
      },
      success(res){
        if(res.data.data.length == 0){
          wx.showToast({
            title: '没有找到。。',
            icon:'none',
            duration:500
          })
        }
        else{
          that.setData({
            list: res.data.data,
            showmode: 4,
            isloadfinished:true
          },()=>{
            wx.hideToast()
          })
        }
      },
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
              // console.log(res)
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
              // console.log(res)
            },
          })
        }
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
      url: '/pages/commit/commit'
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
      wx.navigateTo({
        url: '/pages/detail/detail' + 
              '?message_id=' + _id,
      })
      this.setData({
        last_visit_msg_id : _id,
      })
      // console.log('/pages/detail/detail' + 
      // '?message_id=' + _id )
    },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
      
    if(this.data.startwindow == false){
    wx.showModal({
      title: "树洞须知",
      content: "欢迎光临～",
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
        that.setData({
          time_list: res.data.data,
        },()=>{
          // that.loadStorgeArtical(that)
          // console.log(that.data.list)
          that.mode1()
        })
      },  
      fail(){
        wx.showToast({
          title: '加载失败，请重试',
          icon:'none',
          duration: 500
        })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/get_all_artical_by_heat',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: 0,
      },
      success(res){
        that.setData({
          heat_list: res.data.data,
        })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/get_all_artical_by_me',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: 0,
      },
      success(res){
        that.setData({
          mine_list: res.data.data,
        })
      }
    })
  },

  onImageLoad: function(e){
    // var that = this
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

  ViewImage(e) {
    wx.previewImage({
      urls: e.target.dataset.urls,
      current: e.target.dataset.current
    });
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
          //     for(var i =0; i<that.data.list.length; i++){
          //       if(that.data.list[i]._id == message_id){
          //         that.data.list.splice(i,1)
          //         that.setData({
          //           list: that.data.list
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
        console.log(res.data)
        for(var i=0;i<newlist.length;i++){
          if (newlist[i]._id == res.data.data._id){
            newlist[i] = res.data.data
            that.setData({
              list: newlist
            })
          }
        }
      }
    })
  },

  // loadStorgeArtical: function(that){
  //   console.log("loading")
  //   if(that.data.isloadfinished == true){
  //     setTimeout(() => {
  //       that.loadStorgeArtical(that)
  //     }, 200);
  //     return;
  //   }
  //   else{
  //   wx.request({
  //       url: getApp().globalData.url + '/get_all_artical',
  //       method: "POST",
  //       data: {
  //         openid: getApp().globalData.user.openid,
  //         loaded: that.data.list.length,
  //       },
  //       success(res){
  //         wx.setStorage({
  //           key: 'list',
  //           data: res.data.data,
  //           success(res){
  //             that.setData({
  //               isloadfinished: true,
  //             })
  //             return;
  //           }
  //         }
  //         )
  //       }
  //     })
  //   }
  // },

  getImg:function(imageID){
    console.log(imageID)
    wx.cloud.getTempFileURL({
      fileList: imageID
    }).then(res => {
      console.log(res.fileList)
      for (var index in res.fileList){
        var url = res.fileList[index].tempFileURL
        wx.downloadFile({
          url: url,
          type: 'image',
          success(res) {
            // console.log("got img")
            console.log(res.tempFilePath)
          },
          fail(res){
            console.log(res)
          }
        })
      }
    }).catch(error => {
      console.log(error)
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
    wx.showNavigationBarLoading()

    console.log("pull")
    var that = this
    wx.showToast({
      title: '玩命加载中~',
      icon:'none',
      duration:5000,
    })
    if(that.data.showmode == 1){
      this.onPullDownRefreshGetNewArtical(that, 1)  
    }else if(that.data.showmode == 2){
      this.onPullDownRefreshGetNewArtical(that, 2)     
    }else if(that.data.showmode == 3){
      this.onPullDownRefreshGetNewArtical(that, 3)  
    }else if(that.data.showmode == 4){
      wx.hideLoading()
      return
    }
  
  },

  onPullDownRefreshGetNewArtical: function(that, type){
    var ret = this.getAimeListAndAimFunc(type)
    var aim_list = ret[0], aim_func = ret[1]

    wx.request({
      url: getApp().globalData.url + aim_func,
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: 0,
      },
      success(res){
        // 不能使用that.data.list = res.data.data，不会触发渲染
        that.setData({
          [aim_list]:res.data.data,
          list: res.data.data,
          [aim_list + "_empty_flag"]: 0,
        },()=>{
          // that.loadStorgeArtical(that)
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh()
          wx.showToast({
            title: '加载完成～',
            icon:'none',
            duration:1000,
          })
        })
      },
      fail(){
        wx.showToast({
          title: '加载失败，请重试',
          icon:'none',
          duration:500,
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("reach bottom")

    if(this.data.isloadfinished == false){
      console.log("unfinished!")
      return
    }
    else{
      wx.showToast({
        title: '加载中～',
        icon: 'none',
        duration:5000,
      })
      var that = this
      if(that.data.showmode == 1){
          this.onReachBottomGetNewArtical(that, 1)  
      }else if(that.data.showmode == 2){
          this.onReachBottomGetNewArtical(that, 2)     
      }else if(that.data.showmode == 3){
          this.onReachBottomGetNewArtical(that, 3)  
      }else if(that.data.showmode == 4){
        this.onReachBottomGetNewArtical(that, 4)  
      }
      
    }
  },

  onReachBottomGetNewArtical: function(that, type){
    var ret = this.getAimeListAndAimFunc(type)
    var aim_list = ret[0], aim_func = ret[1]

    console.log(aim_list,aim_func)
    if(that.data[aim_list+"_empty_flag"] == 1){
      wx.showToast({
        title: '已经到底啦~',
        icon: 'none',
        duration:500,
      })
      return
    }else{
      that.setData({
        isloadfinished:false
      })
    }

    if(type != 4){
    wx.request({
      url: getApp().globalData.url + aim_func,
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: that.data[aim_list].length,
      },
      success(res){
        console.log("getnew",res.data)
        that.setData({
          [aim_list]: that.data[aim_list].concat(res.data.data),
          list: that.data.list.concat(res.data.data),
          isloadfinished: true
        })
        if(res.data.data.length == 0){
          that.setData({
            [aim_list+"_empty_flag"]:1,
            isloadfinished: true
          })
        }
        wx.hideToast()
      },
      fail(){
        wx.showToast({
          title: '加载失败，请重试',
          icon:'none',
          duration:500,
        })
        this.setData({isloadfinished:true})
      }
    })   
  }else{
    //对于search直接用list存放数据、判断长度，不进行数据的保存
    wx.request({
      url: getApp().globalData.url + aim_func,
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        loaded: that.data.list.length,
        pattern: that.data.search_content
      },
      success(res){
        console.log("getnew",res.data)
        that.setData({
          list: that.data.list.concat(res.data.data),
          isloadfinished: true
        })
        if(res.data.data.length == 0){
          that.setData({
            [aim_list+"_empty_flag"]:1,
            isloadfinished: true
          })
        }
        wx.hideToast()
      },
      fail(){
        wx.showToast({
          title: '加载失败，请重试',
          icon:'none',
          duration:500,
        })
        this.setData({isloadfinished:true})
      }
    }) 
  }
  },

  
  getAimeListAndAimFunc: function(type){
    var aim_list="",aim_func=""
    if(type == 1){
      aim_list = "time_list"
      aim_func = "/get_all_artical"
    }else if(type == 2){
      aim_list = "heat_list"
      aim_func = "/get_all_artical_by_heat"
    }else if(type == 3){
      aim_list = "mine_list"
      aim_func = "/get_all_artical_by_me"
    }
    else if(type == 4){
      aim_list = "search_list"
      aim_func = "/search"
    }
    return [aim_list, aim_func]
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  //   wx.showShareMenu({
  //     title: '自定义转发标题',
  //     // path: '/page/user?id=123',
  //     // imageUrl: '',
  //   })
  // },

  getTag: function(tagtype){
    var tagNames = ["情感", "交友", "寻物", "吐槽"]
    var tagColors = ["#EAF786", "#B8F4FF", "#B8FFB8", "#FFB5A1"]

    var newlist = this.data.list
    for(var i =0;i<this.data.list.length;i++)
    {
      if(this.data.list.tag>0){
          newlist[i].tagName=tagNames[tagtype]
          newlist[i].tagColor=tagColors[tagtype]
      }
    }

    this.setData({
      list: newlist  
    })
  },

  // getRect () {
    // wx.createSelectorQuery().select('#swiper').boundingClientRect(function(rect){
    //   rect.id      // 节点的ID
    //   rect.dataset // 节点的dataset
    //   rect.left    // 节点的左边界坐标
    //   rect.right   // 节点的右边界坐标
    //   rect.top     // 节点的上边界坐标
    //   rect.bottom  // 节点的下边界坐标
    //   rect.width   // 节点的宽度
    //   rect.height  // 节点的高度
    // }).exec((res)=>{
    //   console.log(res)
    //   this.setData({
    //     ScreenTotalH: res[0].height
    //   })
    // })
  // },

})

