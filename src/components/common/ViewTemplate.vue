<!--视图模板-->
<template>
  <div class="view" :class="{'view-action':(viewId && (viewId === newViewId) && handleType)}" @click.stop="handleEvent">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      /**
       * @desc 可操控视图Id
       */
      viewId: {
        default: '',
        type: String
      },
      /**
       * @desc 定时器间隔时间
       */
      interval: {
        default: 0,
        type: Number
      }
    },
    computed: {
      /**
       * @desc cmd
       */
      cmdAction() {
        return this.$store.state.cmdAction
      },
      /**
       * @desc 视图Id
       * @returns {computed.newViewId|string}
       * */
      newViewId() {
        return this.$store.state.newViewId
      },
      /**
       * @desc 上一级视图Id
       * @returns {computed.oldViewId|number}
       * */
      oldViewId() {
        return this.$store.state.oldViewId
      },
      /**
       * @desc 操作
       * @returns {computed.handleType|boolean}
       */
      handleType() {
        return this.$store.state.handleType
      },
      /**
       * @desc 可视化操作指令
       */
      visualAction: function() {
        return this.$store.state.visualAction
      },
      /**
       * @desc 可视化操作事件集合
       */
      visualEventList: function() {
        return this.$store.state.visualEventList
      },
      /**
       * @desc 可视化操作消息
       */
      visualCmd: function() {
        return this.$store.state.visualCmd
      },
      /**
       * @desc 定时器监听
       */
      intervalState() {
        return this.$store.state.interval
      }
    },
    watch: {
      /**
       * @desc  定时器触发器 当设定 props.interval 即触发
       */
      intervalState() {
        if (this.interval) {
          if (!(this.intervalState % this.interval)) {
            this.$emit('interval')
          }
        }
      },
      /**
       * @desc cmd 状态  ok up down left right
       * @param newVal
       * @param oldVal
       */
      cmdAction(newVal, oldVal) {
        this.cmdEvent(this.$store.state.cmd)
      },
      /**
       * @desc 可视化操作
       */
      visualAction() {
        if (this.visualEventList.length > 0) {
          for (let item of this.visualEventList) {
            this.$emit(item, this.visualCmd);
          }
        }
      }
    },
    methods: {
      /**
       * @desc 手动点击click 事件
       */
      handleEvent() {
        this.$store.commit(MutationsBridge.CLICK_VIEW_ID_SSA, this.viewId);
      },

      /**
       * @desc 遥控事件
       */
      cmdEvent(cmd) {
        if (this.oldViewId === this.viewId && this.handleType) {
          this.$emit(cmd)
        }
      }
    }
  }
</script>
