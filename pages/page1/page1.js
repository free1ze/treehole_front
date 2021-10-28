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
    社区规范\
  </h2>\
  <p>\
    <hr />\
  </p>\
  <p>\
    西交树洞是由西安交通大学学生自行发起并创建的线上社区，以匿名发帖及回复作为主要交流方式，致力于建立一个和谐、开放、包容、温暖的西交线上社区。\
  </p>\
  <p>\
    为了维护社区良好氛围，西交树洞团队将依据本规范中条款对使用用户及用户发布的内容进行管理。采取措施包括但不限于删除用户发布内容，暂停或终止用户使用西交树洞的权利。\
  </p>\
  <br />\
  <h3>\
    违规行为界定\
  </h3>\
  <hr />\
  <h4>\
  1.违反法律法规\
  </h4>\
  <p>\
    禁止发布违反国家法律法规的言论。\
  </p>\
  <h4>\
  2.诽谤、污蔑行为\
  </h4>\
  <span style="color:#E53333;">\
    严禁利用匿名身份诽谤、污蔑他人！！！\
  </span>\
  <h4>\
    3.不友善行为\
  </h4>\
  <p>\
    禁止发布嘲讽、挑衅、羞辱、歧视、威胁他人的具有攻击性的言论，表达强烈情绪的同时注意文明礼貌，请避免使用粗俗字眼。\
  </p>\
  <h4>\
    4.发布垃圾广告信息\
  </h4>\
  <p>\
    禁止发布盈利性广告。求职等信息可以在联系管理员后发布。\
  </p>\
  <h4>\
    5.恶意使用\
  </h4>\
  <p>\
    禁止滥用产品功能，影响他人的产品体验，危及平台安全及损害他人利益。\
  </p>\
  <h4>\
    6.发布色情低俗信息\
  </h4>\
  <h4>\
    7.发布封建迷信内容\
  </h4>\
  <h4>\
    8.恶意举报他人\
  </h4>\
  <br />\
  <h3>\
    违规行为处理\
  </h3>\
  <hr />\
  <p>\
    站方通过主动发现和接受用户举报两种方式发现违规行为。违规信息将由西交树洞站方进行处理。\
  </p>\
  <br>\
  <h3>\
    申诉\
  </h3>\
  <hr />\
  如果用户对西交树洞站方处理有异议，可以通过<strong>xjtutreehole@qq.com</strong>进行反馈\
  </p>\
  <br>\
  <br>\
  <p>\
  良好的社区环境需要大家共同建设！\
  </p>\
  <br>\
  <br>\
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
})