/* eslint-disable */
/**
 * 合并指标
 * @param indis {'r0':[data],'r1':[data]} 要合并的多条指标 
 * @param 'r0' mainIndi 主指标的可以
 * @param {'r0','START_TIME','r1':'TIME'} indiKeys 各指标匹配字段
 */
function mergeIndi(indis, mainIndi, indiKeys) {
  let retData = []
  let mainData = indis[mainIndi]
  let mainKey = indiKeys[mainIndi]

  for (let i = 0; i < mainData.length; i++) {
    let mainVal = mainData[i][mainKey]
    let obj = mergeObj({}, mainData[i], mainIndi)
    for (let key in indis) {
      if (key === mainKey) {
        return
      }
      let data = indis[key]
      for (let j = 0; j < data.length; j++) {
        if (data[j][indiKeys[key]] == mainVal) {
          retData.push(mergeObj(obj, data[j], key))
          break
        }
      }
    }
  }
  return retData
}

function mergeObj(target, dataObj, prefix) {
  for (let key in dataObj) {
    target[prefix + '_' + key] = dataObj[key]
  }
  return target
}

export default mergeIndi