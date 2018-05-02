<template>
  <app-template class="a1">
    <div is="v11"></div>
    <div is="v12"></div>
    <div is="v21"></div>
    <div is="v31"></div>
    <div is="v32"></div>
  </app-template>
</template>
<script>
  import './assets/scss/app.scss';

  import v11 from './views/v11/V11.vue';
  import v12 from './views/v12/v12.vue';
  import v21 from './views/v21/v21.vue';
  import v31 from './views/v31/v31.vue';
  import v32 from './views/v32/v32.vue';

  export default {
    mounted() {
      document.title = '贵州移动集客重保场景';
    },
    components: {
      v11,
      v12,
      v21,
      v31,
      v32
    }
  }
</script>
