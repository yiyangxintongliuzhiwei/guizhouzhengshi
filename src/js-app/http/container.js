/**
 * @author jsz
 * @description 指标管理类(容器,单例模式)
 */
class IndicatorManager {
  static getInstance() {
    if (!IndicatorManager.instance) {
      IndicatorManager.instance = new IndicatorManager()
      IndicatorManager.instance.handlerMapper = {}
      IndicatorManager.instance.paramsMapper = {}
    }
    return IndicatorManager.instance
  }
}
export default IndicatorManager.getInstance()
