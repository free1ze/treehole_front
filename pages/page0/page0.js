// pages/page1/page1.js
// var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlText:
    '<h2>\
    遇到问题？\
  </h2>\
  <p>\
    <hr />\
  </p>\
  <br />\
  <h3>\
  ● 验证码发送到哪里？\
  </h3>\
  <p>\
  验证码发送到学校邮箱，请复制链接，用浏览器登录邮箱查看。\
  \n验证码发送后，学校邮箱地址会自动复制到剪切板里。\
  \n学校邮箱：\
  <span style="color:#4C33E5;">https://stu.xjtu.edu.cn/</span>\
  <\p>\
  <h3>\
  ● 忘记netid？\
  </h3>\
  <p>\
  请使用移动交大app查看netid。\
    \n• 1\
    <img src="/images/s1.jpg" title="img" alt="img" /> \
    • 2\
    <img src="/images/s2.jpg" title="img" alt="img" /> \
    • 3\
    <img src="/images/s3.jpg" title="img" alt="img" /> \
    • 4\
    <img src="/images/s4.jpg" title="img" alt="img" /> \
    • 5\
    <img src="/images/s5.jpg" title="img" alt="img" /> \
  <\p>\
  <h3>\
  ● 收不到验证码？\
  </h3>\
  <p>\
  请填写netid而不是学号，因为这会导致邮件被屏蔽。除此之外，您可以尝试检查垃圾邮件，并修改邮箱的屏蔽等级。\
  <\p>\
  <h3>\
  ● 我不是本校学生？\
  </h3>\
  <p>\
  原则上本树洞不对外校开放，但您可以联系管理员提交账号申请。\
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
