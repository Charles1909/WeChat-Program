//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 跳转到看图识字页面
   */
  lookPicture: function() {
    wx.navigateTo({
      url: '/look-picture/pages/index/index',
    })

  },

  /**
   * 跳转到跟读汉字页面
   */
  followUp: function() {
    wx.navigateTo({
      url: '/follow-up/pages/index/index',
    })
  },

  /**
   * 跳转到听音辨字页面
   */
  listenning: function() {
    wx.navigateTo({
      url: '/listenning/pages/index/index',
    })
  },

  /**
   * 跳转到笔画填写页面
   */
  strokes: function() {
    wx.navigateTo({
      url: '/strokes/pages/index/index',
    })
  },


  /**
   * 跳转到组词填空页面
   */
  groupWords: function() {
    wx.navigateTo({
      url: '/group-words/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(getApp().globalData.islogin)
    if(!getApp().globalData.islogin){
      wx.redirectTo({
        url: '/pages/load/load',
      })
    }

  },


})