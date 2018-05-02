const state = {
  handleType: 0, // 0: 无操作模式; 1: 操作模式
  sceneUrl: '', // 场景URL
  userId: '', // 默认当前用户
  handleCmd: '', // 当前ipad命令
  newViewId: '01', // 默认视图ID
  oldViewId: '01', // 上一级viewId
  clickViewId: null, // 点击视图Id
  newSceneId: '1', // 默认场景
  oldSceneId: '1', // 上一级场景
  sceneAction: 0, // 场景指令
  visualAction: 0, // 可视化操作指令
  visualEventList: [], // 可视化操作事件集合
  visualCmd: '', // 可视化操作消息
  viewIdLog: [], // 操作日志
  cmd: '', // 当前指令
  cmdAction: 0, // 活动cmd
  cmd_ok: 0, // 确认命令
  cmd_left: 0, // left 命令
  cmd_Right: 0, // right 命令
  cmd_up: 0, // up 命令
  cmd_down: 0, // down 命令
  cmd_back: 0, // 返回命令
  cmd_home: 0, // 返回主页并刷新
  intervalId: null, // 定时器 id
  interval: 0, // 30秒
  nowGisId: null, // 当前操控的gisId
  cmdObj: '', // cmd obj
  borderState: false, // 可单视图加载框显示状态
  viewFlag: false, // 是否是单视图
  roomId: '1', // 作战室ID
  swiperIndex: 0, // 轮播视图
  sceneId: null, // 场景ID
  timeLine: null, // 时间粒度
  dataType: 1 // 场景1中数据切换 1 全省; 2 重保
}

export default state
