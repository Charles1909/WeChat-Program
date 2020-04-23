// pages/mine/mine.js

const db = wx.cloud.database()
const userCollection = db.collection("user")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    username: "",
    points: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var phonenumber = getApp().globalData.user.phonenumber
    userCollection.where({
        phoneNumber: phonenumber
      })
      .get().then(res => {
        console.log(res)
        this.setData({
          avatarUrl : res.data[0].avatarUrl,
          username : res.data[0].username,
          points : res.data[0].points
        })

        console.log(this.data)
      })

  },

  onShow: function() {
    this.onLoad()
  }

})