<!--APP 模板-->
<template>
  <div>
    <div class="app">
      <!--APP-->
      <slot></slot>
    </div>
    <!--Win 使用弹窗时继承 popup-template -->
    <transition name="two-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import '@/assets/scss/app.scss';
  import '@/assets/scss/mixin.scss';

  export default {
    name: 'AppTemplate',
    props: {
      appName: '' // 场景名称
    },
    computed: {
      routeLength() {
        return this.$route.matched.length;
      },
      sceneAction() {
        return this.$store.state.sceneAction;
      },
      newSceneId() {
        return this.$store.state.newSceneId;
      },
      oldSceneId() {
        return this.$store.state.oldSceneId;
      }
    },
    created() {
      this.dataTypeSel();
    },
    mounted() {
      this.userIdState();
    },
    watch: {
      sceneAction() {
        if (this.newSceneId !== this.oldSceneId) {
          this.$router.push({name: this.newSceneId});
        }
      }
    },
    methods: {
      /**
       * @desc 标记当前用户
       * */
      userIdState() {
        let userIdRoute = this.$route.params.userId;
        let userIdState = this.$store.state.userId;
        if (this.appName) {
          this.$http.get(`user/apps/${userIdRoute}/${this.appName}`).then((res) => {
            console.log(`当前场景--${this.appName}`);
          })
        } else {
          console.log('当前未在APP.vue中设置appName');
        }
        if (userIdRoute && userIdRoute !== userIdState) {
          this.$store.commit(MutationsBridge.USER_ID_SSA, userIdRoute);
        }
      },
      /**
       * @desc ajax 请求数据类型 {real: 真实数据, static: 静态数据, mix: 混合数据}
       */
      dataTypeSel() {
        let dataType = this.$route.params.dataType || 'real';
        this.$http.indi.setApiUrl(`api/${dataType}/`);
      }
    }
  }
</script>
