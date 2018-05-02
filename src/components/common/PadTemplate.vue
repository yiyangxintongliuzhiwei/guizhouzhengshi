<!--IPad 模板-->
<template>
  <div class="pad">
    <!--iPad-->
    <slot></slot>
    <!--Win 使用弹窗时继承 popup-template -->
    <router-view></router-view>
  </div>
</template>
<script>
  import '@/assets/scss/app.scss';
  import '@/assets/scss/mixin.scss';

  export default {
    props: {
      appId: { // 场景ID
        default: '',
        type: String
      }
    },
    created() {
      this.smgUserId();
      this.dataTypeSel();
    },
    methods: {
      smgUserId() {
        let userIdRoute = this.$route.params.userId;
        this.$http.indi.setUserId(userIdRoute);
      },
      dataTypeSel() {
        let dataType = this.$route.params.dataType || 'real';
        this.$http.indi.setApiUrl(`api/${dataType}/`);
      }
    }
  }
</script>
