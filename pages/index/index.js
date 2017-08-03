Page({
  data: {
    inputShowed: false,
    inputVal: "",
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    news:[],
    page:1
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  getNews:function(){
    var self = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1//topics', //仅为示例，并非真实的接口地址
      data: {
        page: self.data.page,
        tab: "ask",
        limit: 5
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        self.setData({
          news: res.data.data.concat(self.data.news)
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onReady:function(){ 
    this.getNews()
  },
  onPullDownRefresh:function(){
    this.setData({
      page: ++this.data.page
    });
    this.getNews()
  }
});