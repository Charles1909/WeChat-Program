// teacher/pages/index.js
const db = wx.cloud.database()
const userCollection = db.collection('user')
var voice = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    pinyinText: "",
    word: "",
    currentId: 0,
    currentChapterId: 1,
    currentIdAgain: false,
  },

  /**
   * 获得积分
   */
  score: function () {
    var points
    var that = this
    var _id = getApp().globalData.user._id
    userCollection.doc(_id).get().then(res => {
      points = res.data.points + 10
      userCollection.doc(_id).update({
        data: {
          points: points
        },
      })
    })
  },

  /**
   * 点击播放音频
   */
  playvideo: function () {
    var audio = wx.createInnerAudioContext();
    audio.src = "/follow-up/pages/statics/" + this.data.word + ".mp3"
    audio.play();
  },

  /**
   * 点击学习下一个字
   */
  nextWord: function () {
    if (this.data.currentId == 4) {
      if (this.data.currentIdAgain) {
        wx.showModal({
          title: '恭喜!',
          content: '本关以完成！',
          showCancel: false,
          success(res) { }
        })
      } else {
        wx.showToast({
          title: '+10分',
          icon: 'success',
          duration: 1000
        })
        this.score()  //加积分
        this.setData({
          currentIdAgain: true
        })
      }
    } else {
      wx.showToast({
        title: '+10分',
        icon: 'success',
        duration: 1000
      })
      this.score()  //加积分
      var id = this.data.currentId + 1
      var list = this.data.list
      console.log(this.data.currentId, list)
      this.setData({
        currentId: id,
        word: list[id].word,
        pinyinText: list[id].pinyin
      })
      this.playvideo()
    }
  },

  /**
   * 点击进入下一关
   */
  nextChapter: function () {
    if (this.data.currentChapterId == 5) {
      wx.showModal({
        title: '恭喜你!',
        content: "全部生词都以学完！",
        showCancel: false,
        success(res) { }
      })
    } else {
      var chapter = this.data.currentChapterId + 1
      this.setData({
        currentId: 0,
        currentChapterId: chapter,
        currentIdAgain: false
      })
      db.collection('words').where({
        wordChapter: chapter
      }).get().then(res => {
        console.log(res.data)
        this.setData({
          list: res.data
        })
        this.setData({
          word: this.data.list[0].word,
          pinyinText: this.data.list[0].pinyin
        })
        this.playvideo()
      })
    }
  },

  onReady: function () {
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this
    db.collection('words').where({
      wordChapter: 1
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        list: res.data
      })
      this.setData({
        word: this.data.list[0].word,
        pinyinText: this.data.list[0].pinyin
      })
    })
  },

  start:function(){
    //开始录音
    console.log("开始录音")
    wx.startRecord({
      success: function(e){
        voice = e.tempFilePath
        console.log(voice)
      }
    })
  },

  stop: function () {
    //结束录音  
    console.log("结束录音")
    wx.stopRecord();
  },

  play: function () {
    //播放声音文件
    console.log("播放录音！")  
    wx.playVoice({
      filePath: voice
    })
  },

})