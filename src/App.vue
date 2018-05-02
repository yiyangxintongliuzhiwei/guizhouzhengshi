<!--主APP-->
<template>
  <!--场景切换-->
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      /**
       * @desc 返回主页 并刷新
       */
      cmdHome() {
        return this.$store.state.cmd_home;
      },
      /**
       * @desc 返上级回键
       * @returns {computed.cmdBack|number}
       */
      cmdBack() {
        return this.$store.state.cmd_back;
      }
    },
    watch: {
      /**
       * @desc 监听 home 返回主页面并刷新
       */
      cmdHome() {
        this.$router.push({name: this.$route.matched[0].name});
        window.location.reload();
      },
      cmdBack(newVal, oldVal) {
        this.cmdBackEvent();
      }
    },
    mounted() {
      this.escEventHandler();
      this.interval();
    },
    methods: {
      /**
       * @desc  esc 事件
       */
      escEventHandler() {
        // 禁用鼠标右键功能
        document.oncontextmenu = (event) => {
          event.returnValue = false;
          this.$store.commit(MutationsBridge.MOUSE_CLICK_SSA, {
            cmd: 'back'
          });
        };
        document.addEventListener('keyup', (e) => {
          if (e.keyCode === 27) {
            this.$store.commit(MutationsBridge.MOUSE_CLICK_SSA, {
              cmd: 'back'
            });
          } else {
            return false;
          }
        }, false);
      },
      /**
       * @desc 返回事件
       */
      cmdBackEvent() {
        let routeNames = this.$route.matched;
        if (routeNames.length > 1) {
          this.$store.commit(MutationsBridge.NEW_VIEW_ID_SSA, this.$store.state.newViewId.substring(0, (routeNames.length - 1) * 2));
          // this.$store.commit(MutationsBridge.NEW_VIEW_ID_SSA, this.$store.state.newViewId);
          this.$router.push({name: routeNames[routeNames.length - 2].name});
        } else {
          this.$store.commit(MutationsBridge.HANDLE_TYPE_SSA, 0);
        }
      },
      /**
       * @desc 全局定时器
       */
      interval() {
        this.$store.commit(MutationsBridge.INTERVAL_SSA, true);
      }
    }
  }
</script>

<style>
  .appfilter {
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    opacity: 0;
  }
</style>
