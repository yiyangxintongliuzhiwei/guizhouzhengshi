import axios from 'axios'
import container from './container'
import {
  isString,
  isArray
} from './helper'

if (window) {
  window.container = container
}

let manager = {
  apiUrl: '',
  userId: '',
  onUpdateFlag: false,
  /**
   * @param {any} url 指标查询接口URL
   */
  setApiUrl(url) {
    this.apiUrl = url
    console.log('---The interface of the query indicator is "' + this.apiUrl + '"')
  },
  setUserId(userId) {
    this.userId = userId;
    console.log('---The userId of the socket send is "' + this.userId + '"')
  },
  /**
   * 设置是否注册更新回调
   * @param {flag} flag 是否开启消息更新注册函数
   */
  setOnUpdateStatus(flag) {
    this.onUpdateFlag = flag
  },
  /**
   * @param {any} keys 指标ID, 类型:String或者数组
   * @param {any} params 指标参数,每个ID对于一个JSON
   * @param {any} callback 回调方法
   */
  get(indicatorIds, params, callback) {
    if (!indicatorIds) {
      return
    }
    let key
    if (isString(indicatorIds)) {
      // 单个指标
      key = indicatorIds
      if (this.onUpdateFlag) {
        container.paramsMapper[key] = params
        container.handlerMapper[key] = callback
      }
      this.mataGetData(key, params).then(response => {
        callback(response)
      }).catch(error => {
        console.log('错误信息:' + error.message)
      })
    } else if (isArray(indicatorIds)) {
      if (this.onUpdateFlag) {
        // 多个指标
        key = indicatorIds.join('$$')
        // 设置回调函数
        container.handlerMapper[key] = callback
        indicatorIds.forEach(item => {
          // 设置指标参数
          container.paramsMapper[item] = params[item]
        })
      }
      let retData = []
      indicatorIds.forEach(item => {
        retData.push(this.mataGetData(item, params[item]))
      })
      axios.all(retData).then(axios.spread(callback)).catch(error => {
        console.log('错误信息:' + error.message)
      })
    }
  },
  mataGetData(indicatorId, params = {}) {
    return axios.get(this.apiUrl + indicatorId, {
      params: params
    })
  },
  /**
   * iPad发送消息
   * @param eventType 事件类型
   * @param param 参数
   */
  sendMsg(keyType, eventName, param) {
    if (!keyType) {
      return
    }
    axios.post(config.msgSendUrl, {
      userId: this.userId,
      eventType: 'ipad',
      keyType: keyType,
      eventName: eventName,
      param: param
    })
  },
  /**
   * 取消消息注册
   * @param {*} 指标/指标组
   */
  unUpdate(indicatorIds) {
    if (isString(indicatorIds)) {
      delete container.handlerMapper[indicatorIds]
    } else if (isArray(indicatorIds)) {
      delete container.handlerMapper[indicatorIds.join('$$')]
    }
  },
  update(indicatorId) {
    console.log('---Update indicator:' + indicatorId)
    if (indicatorId === '' || indicatorId === null) {
      return
    }
    if (isString(indicatorId)) {
      for (var key in container.handlerMapper) {
        if (key.indexOf(indicatorId) > -1) {
          let indicators = key.split('$$')
          let handler = container.handlerMapper[key]
          if (indicators.length === 1) {
            this.mataGetData(key, container.paramsMapper[key]).then(response => {
              handler(response)
            }).catch(error => {
              console.log(error)
            })
          } else {
            console.log('关联指标:' + key)
            let retData = []
            indicators.forEach(item => {
              retData.push(this.mataGetData(item, container.paramsMapper[item]))
            })
            axios.all(retData).then(axios.spread(handler)).catch(error => {
              console.log(error)
            })
          }
        }
      }
    } else {
      console.log('指标ID类型错误')
    }
  }
}

export {
  manager,
  axios
}
