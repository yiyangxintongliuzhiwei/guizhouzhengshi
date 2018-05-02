## 公用组件使用方式
### 目录
<!-- TOC -->

- [公用组件使用方式](#公用组件使用方式)
  - [目录](#目录)
  - [1.1. 简介](#11-简介)
  - [1.2. 组件配置项](#12-组件配置项)
    - [1.2.1. 数字滚动组件 counter](#121-数字滚动组件-counter)
  - [1.3. 模板](#13-模板)
    - [1.3.1. AppTemplate.vue 场景模板](#131-AppTemplate.vue-场景模板)
    - [1.3.2. ViewTemplate.vue 视图模板](#132-ViewTemplate.vue-视图模板)
    - [1.3.3. PopTemplate.vue 视图模板](#132-PopTemplate.vue-弹窗模板)
<!-- /TOC -->

### 1.1. 简介
    本目录描述的是大屏3.0部分组件的使用方法说明。
  
    注：组件有默认配置,可不配置

### 1.2. 组件配置项

#### 1.2.1. 数字滚动组件 counter
  
  * 使用方式
    ```
    <counter :data="467.34" :config='config'></counter>
    ```
    
  * 配置项说明
  
    ```
    {
      justifyContent: 'center',
      prefix: { // 前缀配置项
        content: '', 
        marginRight: 8,
        textStyle: {
          color: '#FF0',
          fontSize: 25,
          fontWeight: '',
          fontFamily: ''
        }
      },
      numbers: { // 数字配置项
        textStyle: {
          color: '#FF0',
          fontSize: 25,
          fontWeight: '',
          fontFamily: ''
        },
        letterSpacing: 0, // 数字之间间距
        decimal: -1, // 数字保留位数,默认不进行格式化
        digitCount: -1 // 小数点前数字的位数,不够在前边自动补全0 默认不自动补全
        thousands: false // 是否以千分位显示 默认不以千分位显示 
      },
      suffix: { // 后缀配置项
        content: '',
        marginLeft: 8,
        textStyle: {
          color: '#FF0',
          fontSize: 25,
          fontWeight: '',
          fontFamily: ''
        }
      }
    }
    ```

### 1.3. 模板

####  1.3.1. AppTemplate.vue 场景模板

  * 说明： 场景建立继承app-template
  * 功能：
     1. 自动存储当前用户: userId
     2. 自动存储当前场景名称: AppName
  * 参数： appName  场景名
  * eg:
      ```
        <template>
            <app-template class="a1" appName="a1">
              <cat-main></cat-main>
            </app-template>
        </template>
        <script>
          export default {
            components: {
              CatMain
            }
          }
        </script>
      ```

####  1.3.2. ViewTemplate.vue  视图模板

* 说明:
     1. 具有操作功能的视图模板
     2. viewTemplate有唯一 viewId(采用梯形结构)
     3. handleCmd.js 视图操作关系表(按规则进行配置)
* 功能:
     1. 响应点击（click）事件
     2. 响应手机遥控事件（left、right、top、bottom、ok）
     3. 响应定时器事件
     4. 自定义定时器间隔时间
* 参数:
     1. @left: 遥控器left事件
     2. @right: 遥控器right事件
     3. @top: 遥控器top事件
     4. @bottom: 遥控器bottom事件
     5. @ok: 遥控器ok事件
     6. viewId: 当前视图 viewId
     7. interval: 定时器间隔时间 单位：s
     8. @interval: 定时器回调函数

     *遥控器事件名根据遥控器发过来的是动态命令决定的*

* eg1:  手机遥控响应
    ```
     <template lang="html">
       <div class="family-special-l2-wrapper">
         <div class="special-tab-btns">
           <viewTemplate class="special_btn" viewId="0201" @right="switchType('ContentMain')" @ok="switchType('Quality')" @click="switchType('Quality')">
             质量专题
           </viewTemplate>
         </div>
         <div class=" special-main-wrapper">
           <div :is="currentView"></div>
         </div>
       </div>
     </template>
    ```
* eg2: 鼠标点击事件和遥控事件不在一个标签上
    ```
     <viewTemplate class="a1-mobile" viewId="01" v-on:ok="mobileClickHandler">
           <!-- mobileClickHandler('01')  参数为 viewId -->
               <div class="a1-mobile-title" @click="mobileClickHandler('01')">移动</div>
           </viewTemplate>
            methods: {
                 mobileClickHandler(viewId) {
                   if (viewId) this.$store.commit(MutationsBridge.CLICK_VIEW_ID_SSA, viewId); // 必写,事件派发
                   this.$router.push({
                     name: 'mobile/scale'
                   });
                 }
         }
    ```
* eg3: handleCmd.js
    ```
    '01': {
       desc: '移动',
       viewName: 'MobileMain',
       opts: {
         down: '05',
         right: '02',
         ok: '0101',
         left: '05'
       }
     }
    ```
* eg4: 定时器
  ```
    <template>
      <viewTemplate class="user-num-wrapper" :interval="30" @interval="loadData">
        <div class="section-four">
          <span class="user-type-num-2">
            <counter :data="onlineONUNum"
              :config="ONUNumCfg"
              style="height:40px;"></counter>
          </span>
        </div>
      </viewTemplate>
    </template>

  ```

#### 1.3.3. PopupTemplate.vue 弹窗模板
   * 说明: 弹窗视图
   * 功能：遮罩 z-index: 999
   * eg:
   ```
    <template>
      <popupTemplate>
        <viewTemplate class="a1-family-visual">
          <broadband-main></broadband-main>
          <specials></specials>
          <television-main></television-main>
        </viewTemplate>
      </popupTemplate>
    </template>
   ```





