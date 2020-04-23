// pages/registered/registered.js

const db = wx.cloud.database()
const userCollection = db.collection("user")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    phonenumber: "",
    password: "",
    passwordack: "",
    avatarUrl: "",
    points: 0,

  },

  usernameInput: function(e) {
    this.data.username = e.detail.value

  },

  phonenumberInput: function(e) {
    this.data.phonenumber = e.detail.value

  },

  passwordInput: function(e) {
    this.data.password = e.detail.value
  },

  passwordackInput: function(e) {
    this.data.passwordack = e.detail.value
  },

  registered: function() {
    var that = this
    var phonenumber = parseInt(this.data.phonenumber) 
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == "") {
      wx.showModal({
        title: '提示!',
        content: '这请输入用户名！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.phonenumber == "") {
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
    } else if (that.data.passwordack == "") {
      wx.showModal({
        title: '提示!',
        content: '这请再次输入密码！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password != that.data.passwordack) {
      wx.showModal({
        title: '提示!',
        content: '密码不一致！',
        showCancel: false,
        success(res) {}
      })
    } else {
      this.data.avatarUrl = getApp().globalData.userInfo.avatarUrl
      console.log(this.data.avatarUrl)
      console.log(phonenumber)
      userCollection.where({
          phoneNumber: phonenumber,
        })
        .get().then(res => {
          console.log(res)
          console.log(res.data.length)
          if (!res.data.length) {
            //未注册，插入数据
            userCollection.add({
                data: {
                  username: this.data.username,
                  phoneNumber: phonenumber,
                  password: this.data.password,
                  points: this.data.points,
                  avatarUrl: this.data.avatarUrl
                }
              })
              .then(res => {
                console.log("数据插入成功", res)
              })
            getApp().globalData.user.username = this.data.username
            getApp().globalData.user.phonenumber = phonenumber
            getApp().globalData.user.points = this.data.points
            getApp().globalData.user.avatarUrl = this.data.avatarUrl
            getApp().globalData.user._id = res.data[0]._id
            getApp().globalData.islogin = true
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            wx.showModal({
              title: '提示!',
              content: '该手机号已注册！',
              showCancel: false,
              success(res) {}
            })
          }
        })
    }

  },
  signin: function() {
    wx.redirectTo({
      url: '/pages/login/login',
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

})