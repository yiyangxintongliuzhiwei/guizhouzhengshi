<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="defaultSwiperClasses.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'
  export default {
    name: 'Swiper',
    props: {
      swiperId: {
        type: String,
        default: null
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      options: {
        type: Object,
        default() {
          return {
            autoplay: 3500
          }
        }
      }
    },
    data() {
      return {
        swiper: null,
        turnFLag: true, // 是否在轮播
        showFlag: false, // 演示模式
        defaultSwiperClasses: {
          wrapperClass: 'swiper-wrapper'
        }
      }
    },
    mounted() {
      let self = this
      let mount = () => {
        if (!self.swiper) {
          delete self.options.notNextTick
          let setClassName = false
          for (let className in self.defaultSwiperClasses) {
            if (self.defaultSwiperClasses.hasOwnProperty(className)) {
              if (self.options[className]) {
                setClassName = true
                self.defaultSwiperClasses[className] = self.options[className]
              }
            }
          }
          let mountInstance = () => {
            self.swiper = new Swiper(self.$el, self.options)
          }
          setClassName ? self.$nextTick(mountInstance) : mountInstance()
        }
      }
      this.options.notNextTick ? mount() : this.$nextTick(mount)
    },
    updated() {
      if (this.swiper) {
        this.swiper.update()
      }
    },
    beforeDestroy() {
      if (this.swiper) {
        this.swiper.destroy()
        delete this.swiper
      }
    }
  }
</script>
