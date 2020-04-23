// pages/leaderboard/leaderboard.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    /**
     * 排行数据  包括：用户名/头像/分数/排名，没有头像就显示默认头像
     */
    listData: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    db.collection('user')
      .orderBy('points', 'desc')
      .get()
      .then(res => {
        console.log(res)
        this.setData({
          listData: res.data
        })
      })
      .catch(console.error)
      console.log(this.data.listData)
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
    this.onLoad()
  },
})