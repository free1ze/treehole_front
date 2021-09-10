// pages/commit/commit.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database();
const store = db.collection("store");
const userInfo = db.collection("userInfo");
const _ = db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
    sent: false,
    tag: 0,
    imgList: [],
    imgMaxNumber: 9,
    compressedImgList:[],
  },

  bindTextAreaBlur: function(e) {
    // console.log(e.detail.value)
    this.data.detail = e.detail.value
    // console.log(this.data.detail)
  },

  send: function(e) {
    var that=this
    // wx.compressImage({
    //   src: '', // 图片路径
    //   quality: 80 ,// 压缩质量
    //   success(res){
    //     console.log(res.tempFilePath)
    //   }
    // })
    console.log(that.data.detail)
    if(this.data.sent == false){
      wx.showLoading({
        title: '发送中',
      })

      //上传图片
      let resultImageUrls = [];
      const uploadTask = this.data.imgList.map(item => this.uploadPhoto(item))
      Promise.all(uploadTask).then(result => {
      console.log("上传结果", result)
      for (const file of result) {
        resultImageUrls.push(file.fileID);
      }
      console.log("上传后的图片云存储路径", resultImageUrls)
      //与服务器交互
      this.sendToServer(resultImageUrls)

    }).catch(() => {
      wx.showToast({
        title: '上传图片错误',
        icon: 'error'
      })
      return 
    })

      this.setData({
        sent:true,
      })
    }
    
  },

  sendToServer: function(resultImageUrls){
    var that = this
    console.log(resultImageUrls)

    wx.request({
      url: getApp().globalData.url + '/post_artical',
      method: "POST",
      data: {
        openid: getApp().globalData.user.openid,
        content: that.data.detail,
        tag: that.data.tag,
        imgs: resultImageUrls
      },
      success(res){
        console.log(res)
          if(res.data.result.error_code == 0){
            wx.showToast({
              title: '发送成功',
              icon: 'loading',
              duration: 1000
            })
        }
        else{
          wx.showToast({
            title: '发送失败',
            icon: 'error',
            duration: 1000
          })
        }
      },
      fail: function(res){
        wx.showToast({
          title: '发送失败',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: function(res){
        wx.hideToast()
        wx.reLaunch({
          url: '/pages/square/square',
        })
      } 
    })
  },

  tag1:function(){
    this.setData({
      tag:1
    })
  },
  tag2:function(){
    this.setData({
      tag:2
    })
  },
  tag3:function(){
    this.setData({
      tag:3
    })
  },
  tag4:function(){
    this.setData({
      tag:4
    })
  },
  

  ChooseImage() {
    wx.chooseImage({
      count: this.data.imgMaxNumber, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '确定删除这张图片吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  uploadPhoto(filePath) {
    return wx.cloud.uploadFile({
      cloudPath: `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
      filePath
    })
  },

  uploadImgs() {
    wx.showLoading({
      title: '上传中'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})