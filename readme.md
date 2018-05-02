# lsd-vue

> Large screen display

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```
### 架构

                                 App.vue
                                    |
                                    |
                            --------------
                            |            |
                            |appTemplate.vue |
                            |            |
            ---------------------------------------------------
            |        |         |        |       |       |      |
          app1      app2       app3     app4    app5    app6   app7
                                    |
                                    |
                   -----------------------------------
                  |                 |                |
                  | viewTemplate.vue    |  popupTemplate.vue |
                  |                 |                |
                  -----------------------------------
                          |                 |
                          |                 |
                  ---------------     -------------
                  |       |     |            |
                  v1      v2   v3         popup



### 规范:
   1.代码格式采用eslinttrc.js中的配置,请勿自行配置

   2.样式采用 scss

   3.vue文件名采用首字母大写

    eg:

         Flow.vue

   4.vue 引入命名方式

    eg:

        import FlowMain from  '../FlowMain.vue'
           <!--流量-->
            <template>
              <flow-main></flow-main>
            </template>

   5.主文件名 业务名+'Main'

    eg :

           FlowMain.vue

   6.每个视图文件(.vue)首行有相应的注释

    eg:

           <!--政企-->
          <template>
                  <viewTemplate></viewTemplate>
          </template>

[vue 更多规范......](https://github.com/pablohpsilva/vuejs-component-style-guide/blob/master/README-CN.md)

### 更新日志:
### v1.5.0 @lsz
##### 2017-03-27 10:00

- viewTemplate 响应遥控事件添加
    - @left 向左事件
    - @right 向右事件
    - @up 向上
    - @down 向下事件
    - @ok  确认事件(原有)


    eg:

         <viewTemplate class="special_btn" viewId="0203" @left="switchType('ContentMain')" @right="switchType('TvMain')" @ok="switchType('Flow')" @click="switchType('Flow')">
            流量专题
          </viewTemplate>

  ######  备注: 每个事件相互之间的关系根据handleCmd.js配置,同一个viewTemplate可配置多个事件


### v1.4.1 @lsz
##### 2017-03-24 10:45

- 解决鼠标单击和遥控相互兼容问题
   1. 鼠标点击事件和遥控事件在一个标签上

       eg:

              <viewTemplate v-on:ok="mapChange()"
               viewId="010104" @click="mapChange()">
               漫游地图
              </viewTemplate>

             methods: {
              mapChange() {
                   //
                   }
             }

   2. 鼠标点击事件和遥控事件不在一个标签上

        eg:

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


### v1.4.0 @lsz
##### 2017-03-21 17:18
- 全局定时器
  - :interval 定时时间(单位:s)
  - @interval 监听函数

  eg:

         <viewTemplate class="v2-television-wrapper" :interval="30" @interval="loadData">
             <h3 class="sub-title">家庭电视</h3>
             <div class="indi-con">
               <counter :data="userNum" :config="numCfg"style="height:40px"></counter>
             </div>
             <div id="v2-tv-con"></div>
           </viewTemplate>
         </template>

          methods: {
               loadData() {
                 // 数据请求
               },
          }

### v1.3.0 @lsz
##### 2017-03-20 09:46
- 添加手机遥控
 - 需要手机遥控的视图标签要用viewTemplate
 - viewTemplate有唯一 viewId(采用梯形结构)
 - viewTemplate 响应ok事件(一般用于路由跳转)
 - handleCmd.js 视图操作关系表(按规则进行配置)

- eg:

     - handleCmd.js

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
     - Mobile.vue

          <viewTemplate viewId='01' v-on:ok="handleOK"> </viewTemplate>

           methods: {
            handleOK() {
              this.$router.push({name: ''})
            }
          }



### v1.2.3 @lsz
##### 2017-03-16 12:54

- 添加 leaflet插件

### v1.2.2 @lsz
##### 2017-03-15 16:53

- 添加 [snapsvg](http://snapsvg.io/start/) 插件

    eg:

      <template>
          <popupTemplate>
              <viewTemplate>
                  <svg id="svgg"></svg>
              </viewTEmplate>
          </popupTemplate>
      </template>
      <script>
        const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
        export default {
          mounted() {
            console.log(Snap)
            var s = Snap('#svgg');
            var bigCircle = s.circle(150, 150, 100);
            bigCircle.attr({
              fill: '#bada55',
              stroke: '#000',
              strokeWidth: 5
            });
          }
        }
      </script>

### v1.2.1 @ldz
###### 2017-03-15 13:10

-  添加progressbar.js用于环形或线形数据展示&nbsp;&nbsp; [查看API](https://kimmobrunfeldt.github.io/progressbar.js/)


### v1.2.0 @lsz
###### 2017-03-14 16:29

     1.添加路由前缀(userId)用于端对端控制

      eg:

        http://localhost:8181/#/lsz/0
        http://localhost:8181/#/jsz/1

### v1.1.1 @lsz

   1. 模板名称修改

      appTemplate  --> appTemplate

      viewTemplate  --> viewTemplate

      popupTemplate  --> popupTemplate

### v1.1.0 @lsz

   [1.增加 vue-awesome-swiper 轮播组件](http://www.swiper.com.cn/api/index.html)(https://www.npmjs.com/package/vue-awesome-swiper)

   2.增加公用变量样式: /src/scss/mixin.scss

   3.解决ips-axios 问题
