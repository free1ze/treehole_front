// pages/page1/page1.js
// var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShowContent:"",
    htmlText:
    '<h2>\
    遇到问题？\
  </h2>\
  <p>\
    <hr />\
  </p>\
  <br />\
  <h3>\
  ● 收不到验证码？\
  </h3>\
  <p>\
  请尝试检查垃圾邮件，并修改邮箱的屏蔽等级。 您也可以选择其它邮箱验证。\
  <\p>\
  <h3>\
  ● 其他问题？\
  </h3>\
  <p>\
  请联系管理员 xjtutreehole@qq.com \n您的问题会很快得到响应。\
  <\p>\
  <br\>\
  <br\>\
  '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ifShowContent:getApp().globalData.user.ifshowcontent
    })
  },
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

  copy1: function(){
    wx.setClipboardData({
      data: 'https://stu.xjtu.edu.cn', 
      success: function () {
      	// 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
        wx.showToast({
          title: '已复制邮箱地址，请用浏览器打开',
          duration: 3000,
          icon:'none'
        })
      }
    })
},

})
