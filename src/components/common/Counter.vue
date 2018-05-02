<template>
  <div class="counter-con" :style="{justifyContent:option.justifyContent}">
    <span v-if="option.prefix.content !== ''" class="counter-prefix counter-fix" :style="prefixStyle">
      {{option.prefix.content}}
    </span>
    <div class="counter-num-con" :style="numbersStyle">
      <template v-for="(item,index) in numbers">
        <counter-item v-if="item !== '.' && item !== ',' && item !== '-' && item !== '+'" class="counter-item"
                      :effectFlag="effectFlag" :digit="Number(item)"
                      :style="{marginRight:option.numbers.letterSpacing + 'px',color:(autoFillNum>index)?option.numbers.autoFillColor:''}"></counter-item>
        <ul v-else class="counter-item">
          <li>{{item}}</li>
        </ul>
      </template>
    </div>
    <span v-if="option.suffix.content !== ''" class="counter-suffix counter-fix" :style="suffixStyle">
      {{option.suffix.content}}
    </span>
  </div>
</template>

<script>
  import counterItem from './CounterItem.vue'
  import {defaultsDeep} from 'lodash'

  export default {
    name: 'Counter',
    props: {
      config: Object,
      data: {
        type: Number,
        default: 0
      }
    },
    watch: {
      config(val) {
        this.mergeoption()
        this.setNumber(this.data)
      },
      data(val) {
        this.setNumber(val)
      }
    },
    data() {
      return {
        effectFlag: false,
        displayNum: 0,
        numbers: [],
        prefixStyle: null,
        numbersStyle: null,
        suffixStyle: null,
        autoFillNum: 0, // 补0的位数
        option: {
          justifyContent: '',
          fontUnit: 'px',
          prefix: {
            content: '',
            marginRight: 8,
            textStyle: {
              fontSize: 25,
              fontWeight: '',
              fontFamily: ''
            }
          },
          numbers: {
            textStyle: {
              fontSize: 25,
              fontWeight: '',
              fontFamily: ''
            },
            letterSpacing: 0,
            animateType: 'tween', // scroll:滚动 tween: 补间动画
            decimal: -1,
            digitCount: -1, // 小数点前位数，默认不自动不全
            autoFillColor: '#375674',
            thousands: false,
            plusEnable: false // 正数前是否显示+号
          },
          suffix: {
            content: '',
            marginLeft: 8,
            textStyle: {
              fontSize: 25,
              fontWeight: '',
              fontFamily: ''
            }
          }
        }
      }
    },
    created() {
      this.mergeoption()
      this.updateStyle()
    },
    mounted() {
      this.setNumber(this.data)
    },
    methods: {
      mergeoption() {
        this.option = defaultsDeep(this.config || {}, this.option)
        this.animateType = this.option.numbers.animateType;
      },
      updateStyle() {
        let pStyle = this.option.prefix.textStyle
        let nStyle = this.option.numbers.textStyle
        let sStyle = this.option.suffix.textStyle

        this.prefixStyle = {
          marginRight: `${this.option.prefix.marginRight}px`,
//          color: pStyle.color,
          fontSize: `${pStyle.fontSize}${this.option.fontUnit}`,
          fontWeight: pStyle.fontWeight,
          fontFamily: pStyle.fontFamily
        }
        if (pStyle.color) {
          this.prefixStyle['color'] = pStyle.color
        }
        this.numbersStyle = {
//          color: nStyle.color,
          fontSize: `${nStyle.fontSize}${this.option.fontUnit}`,
          fontWeight: nStyle.fontWeight,
          fontFamily: nStyle.fontFamily
        }
        if (nStyle.color) {
          this.numbersStyle['color'] = nStyle.color
        }
        this.suffixStyle = {
          marginLeft: `${this.option.suffix.marginLeft}px`,
//          color: sStyle.color,
          fontSize: `${sStyle.fontSize}${this.option.fontUnit}`,
          fontWeight: sStyle.fontWeight,
          fontFamily: sStyle.fontFamily
        }
        if (sStyle.color) {
          this.suffixStyle['color'] = sStyle.color
        }
      },
      updateLayout() {
        this.mergeoption()
        this.setNumber(this.data)
      },
      setNumber(num) {
        this.effectFlag = !num
        if (typeof num === 'number' && !isNaN(num)) {
          this.numbers = this.formatNumber(num).toString().split('')
        }
      },
      formatNumber(num) {
        let positiveFlag = num > 0
        let decimal = this.option.numbers.decimal
        if (decimal > -1) {
          num = parseFloat(num).toFixed(decimal)
        }
        let digitCount = this.option.numbers.digitCount
        if (digitCount > -1) { // 前边补全0
          let count = parseFloat(num).toFixed(0).toString().length;
          if (count < digitCount) {
            num = Array(digitCount - count + 1).join(0) + num.toString()
          }
          this.autoFillNum = digitCount - count;
        }
        if (this.option.numbers.thousands) {
          let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
          num = num.replace(re, '$1,')
        }
        if (this.option.numbers.plusEnable) { // 补全+号
          if (positiveFlag) {
            num = '+' + num
          }
        }
        return num
      }
    },
    components: {
      'counter-item': counterItem
    }
  }
</script>

<style lang="scss">
  .counter-con {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: flex-start;
    white-space: nowrap;
    overflow: hidden;
  }

  .counter-fix {
    display: flex;
    align-items: flex-end;
    margin: 0px;
  }

  .counter-num-con {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
  }

  .counter-item {
    list-style: none;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .counter-item li {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @for $from from 0 through 9 {
    @for $to from 0 through 9 {
      @keyframes counter-slider-#{$from}-#{$to} {
        from {
          transform: translateY(#{-$from*100 + '%'})
        }
        to {
          transform: translateY(#{-$to*100 + '%'})
        }
      }
    }
  }
</style>
