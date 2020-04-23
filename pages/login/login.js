// pages/login/login.js

const db = wx.cloud.database()
const userCollection = db.collection("user")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber: "",
    password: "",
  },

  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value
  },

  passwordInput: function(e) {
    this.data.password = e.detail.value
  },

  login: function() {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.phonenumber == "") {
      wx.showModal({
        title: '提示!',
        content: '这请输入手机号！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示!',
        content: '手机号码长度有误，请重新输入！',
        showCancel: false,
        success(res) {}
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示!',
        content: '这请输入正确的手机号！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == "") {
      wx.showModal({
        title: '提示!',
        content: '这请输入密码！',
        showCancel: false,
        success(res) {}
      })
    } else {
      var phonenumber = parseInt(this.data.phonenumber)
      userCollection.where({
          phoneNumber: phonenumber
        })
        .get().then(res => {
          console.log(res)
          if (res.data.length) {
            //登入成功
            if (res.data[0].password == this.data.password) { //验证成功，将用户数据存放到全局变量中
              getApp().globalData.user.points = res.data[0].points
              getApp().globalData.user.username = res.data[0].username
              getApp().globalData.user.avatarUrl = res.data[0].avatarUrl
              getApp().globalData.user.phonenumber = res.data[0].phoneNumber
              getApp().globalData.user._id = res.data[0]._id
              console.log(getApp().globalData.user)
              getApp().globalData.islogin = true
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              })
              wx.switchTab({
                url: '/pages/index/index'
              })
            } else { //密码错误
              wx.showModal({
                title: '提示!',
                content: '密码错误！',
                showCancel: false,
                success(res) {}
              })
            }
          } else {
            wx.showModal({
              title: '提示!',
              content: '账号不存在！',
              showCancel: false,
              success(res) {}
            })
          }
        })
    }
  },

  registered: function() {
    wx.redirectTo({
      url: '/pages/registered/registered',
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
  onShareAppMessage: function() {

  }
})