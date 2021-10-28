// pages/listtemp/listtemp.js
Page({

    /**
     * 页面的初始数据
     */
    /**
   * 页面的初始数据
   */
  data: {
    arrays: [{
        id:0,
        path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522750024551&di=2a3059f66cada3c3fcf09ed6fbfa7ff0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Feaf81a4c510fd9f9a499b16e2f2dd42a2834a42f.jpg',
      title:'大源中央公园',
      content:'大源'},
        {
           id: 1,
           path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749957085&di=f63a53aa11dc3d2c6ee656ecf26a734e&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1109%2F09%2Fc1%2F8912689_8912689_1315533674830.jpg',
      title:'花园国际',
      content:'花儿'},
        {
           id: 2,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749957089&di=52d63a22521f4928cefc91097853bae4&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140812%2F11-140Q21045523K.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 3,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848712&di=c12381be5ff7dea1de88bbdf0128eb23&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1c950a7b02087bf407286efaf8d3572c10dfcfd8.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 4,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848714&di=5a60edbf62ceff57de82e46de6f28b35&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb219ebc4b74543a9f58db25114178a82b801149c.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 5,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848720&di=96beca6c27cf406900332cdd7bda8515&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Dc5f68d1bb81bb0519b29bb685f02bfd8%2F10dfa9ec8a1363270e51430a9a8fa0ec08fac74f.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 6,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749957089&di=52d63a22521f4928cefc91097853bae4&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F140812%2F11-140Q21045523K.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 7,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848712&di=c12381be5ff7dea1de88bbdf0128eb23&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1c950a7b02087bf407286efaf8d3572c10dfcfd8.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {  
           id: 8,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848714&di=5a60edbf62ceff57de82e46de6f28b35&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb219ebc4b74543a9f58db25114178a82b801149c.jpg',
           title: '大源中央公园',
           content: '大源'
        },
        {
           id: 9,
           path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522749848720&di=96beca6c27cf406900332cdd7bda8515&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Dc5f68d1bb81bb0519b29bb685f02bfd8%2F10dfa9ec8a1363270e51430a9a8fa0ec08fac74f.jpg',
           title: '大源中央公园',
           content: '大源'
        },
    ],
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})