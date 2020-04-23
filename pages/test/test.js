// pages/test/test.js

const db = wx.cloud.database()
const userCollection = db.collection("user")

Page({

  /**
   * 页面的初始数据
   */
  data: {

    listData: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('words').get({
        success: function (res) {
          console.log(res.data)
        }
      })
    
  },

  query: function() {
    var username = "nfiagaio"
    var phonenumber = 15297744689
    var password = "15297"
    var points = 0
    var avatarUrl = "13425lsggdkg"
    userCollection.where({
      phoneNumber: phonenumber,
    })
      .get().then(res => {
        console.log(res)
        if (res.data.length == 0) {
          //未注册，插入数据
          userCollection.add({
            data: {
              usernmae: username,
              phoneNumber: phonenumber,
              password: password,
              points: points,
              avatarUrl: avatarUrl
            }
          })
            .then(res => {
              console.log("数据插入成功", res)
            })
        }
        else {
          wx.showModal({
            title: '提示!',
            content: '该手机号已注册！',
            showCancel: false,
            success(res) { }
          })
        }
      })
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