/**
 * 消息管理
 */
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios'

let msgManager = {
  stompClient: null,
  msgListenerMap: {},
  userId: null,
  connect(userId) {
    let self = this
    self.userId = userId
    let socket = new SockJS(config.socketUrl)
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect('guest', 'guest', () => {
      self.connectCallback(userId)
      socket.onclose = () => {
        self.connect(userId)
      }
    }, (err) => {
      self.errorCallback(err)
    })
  },
  connectCallback(userId) {
    let self = this
    this.stompClient.subscribe('/topic/oper/' + userId, (msg) => {
      let oper = JSON.parse(msg.body)
      // && (oper.keyType === 'direction' || oper.keyType === 'menu' || oper.keyType === 'gis')
      if (oper.keyType) {
        let hadleFuns = self.msgListenerMap[oper.eventType] || []
        hadleFuns.forEach(fun => {
          fun(oper)
        })
      }
    })
  },
  errorCallback() {
    if (this.reconnectTimeId > 0) {
      clearTimeout(this.reconnectTimeId)
      this.reconnectTimeId = 0
    }
    var self = this
    this.reconnectTimeId = setTimeout(() => {
      console.debug('[socket] reconnecting...')
      self.connect()
    }, 10000)
  },
  registerMsgHandler(eventType, handlerFunction) {
    let handlerArr = this.msgListenerMap[eventType]
    if (!handlerArr) {
      handlerArr = []
      this.msgListenerMap[eventType] = handlerArr
    }
    handlerArr.push(handlerFunction)
  },
  sendMsg(eventType, param) {
    if (!eventType) {
      return
    }
    axios.post(config.sendMsgUrl, {
      userId: this.userId,
      eventType: eventType,
      param: param
    })
  }
}

export default msgManager
