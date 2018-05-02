<!--业务质量-->
<template>
  <view-template class="a1-v31">
    <div class="title">业务质量</div>
       <swiper :options="swiperOption" class="a1-v31-swiper">
         <swiper-slide  class="a1-v31-swiper-slide">
             <div class="img-head">
               <div class="img-word">业务故障告警</div>
             </div>
             <div class="img-word1">
                <span class="guzhang">故障总数</span>
                <span class="guzhangshu">
                   {{guzhangshu}}
                </span>
                <span class="ge">个</span>
             </div>
              <div id="a2-v11-charts1"></div>
         </swiper-slide>
         <swiper-slide  class="a1-v31-swiper-slide">
             <div class="img-head">
               <div class="img-word">业务故障告警</div>
             </div>
             <div class="img-word1">
                <span class="guzhang">故障总数</span>
                <span class="guzhangshu">
                   {{guzhangshu}}
                </span>
                <span class="ge">个</span>
             </div>
              <div id="a2-v11-charts2"></div>
         </swiper-slide>
       </swiper> 
       <span class="a1-v31-swiper-roam"></span>
       <div class="a1-v31-2">
          <div class="img-head1">
          </div>
           <div id="a2-v11-charts3"></div>
       </div>
  </view-template>
</template>

<script>
  import './v31.scss';
import index from '../../../../../../node_modules/_vue@2.5.16@vue';

  export default {
    props: {},
    data() {
      return {
        // 轮播设置
        swiperOption: {
          autoplay: 15000,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.a1-v31-swiper-roam',
          paginationClickable: true
        },
        guzhangshu:"564"
      }
    },
    computed: {
    },
    mounted() {
       this.drawline();
       this.drawline1();
       this.drawline2();
       
    },
    methods: {
     drawline:function(){
      let myChart = this.$echarts.init(document.getElementById('a2-v11-charts1'))    
      var demo = myChart.setOption({
     xAxis: {
       type: 'category',
       data: ["AAA","AA",'A','普通'],
       axisLabel:{
            show: true,
            textStyle:{
                color: '#45648e',
                fontSize:'17'
            }
       },
       axisLine:{
            lineStyle:{
               color:"#c2d0ff",
               width:4,
            }
        },
       splitLine:{show: false},
       },
      yAxis: {
        type: 'value',
        data: [0,3,6,9,12],
        axisLabel:{
            show:true,
            textStyle:{
                color:"#99c2ff",
                fontSize:'20'
            }
        },
        yxisLine:{
            lineStyle:{
               color:"#163a68",
               width:4,
            }
        },
         splitLine:{show: false},
      },
      series: [{
        data: [3, 2, 3, 6],
        type: 'bar',
        barWidth:48,
        label:{
             normal: {
                       show: true,
                       position: 'top',
                       fontSize:"20"
                    }
        },
        itemStyle:{
          normal:{
                  color:'#036585'
                }
        }
      }]   
      })
    },
    // echarts2
    drawline1:function(){
       let myChart = this.$echarts.init(document.getElementById('a2-v11-charts2'))  
       var demo = myChart.setOption({
      xAxis: {
       type: 'category',
       data: ["全省","贵阳",'遵义','六盘水','安顺','毕节','同仁','黔西南','黔东南','黔南'],
       axisLabel:{
            show: true,
            textStyle:{
                color: '#45648e',
                fontSize:'12'
            }
       },
       axisLine:{
            lineStyle:{
               color:"#c2d0ff",
               width:4,
            }
        },
       splitLine:{show: false},
       },
      yAxis: {
        type: 'value',
        data: [0,3,6,9,12],
        axisLabel:{
            show:true,
            textStyle:{
                color:"#99c2ff",
                fontSize:'20'
            }
        },
        yxisLine:{
            lineStyle:{
               color:"#163a68",
               width:4,
            }
        },
         splitLine:{show: false},
      },
      series: [{
        data: [5, 6, 6, 8, 6, 3, 5, 2, 7, 4],
        type: 'bar',
        barWidth:48,
        label:{
             normal: {
                       show: true,
                       position: 'top',
                       fontSize:"20"
                    }
        },
        itemStyle:{
          normal:{
                  color:'#1fadff'
                }
        },

      }]   
      })
      console.log(2)
    },
    // echarts3
     drawline2:function(){
         let myChart = this.$echarts.init(document.getElementById('a2-v11-charts3')) 
          var demo = myChart.setOption({
          tooltip : {
        trigger: 'axis',
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['2017/4','2017/5','2017/6','2017/7','2017/8','2017/9','2017/10','2017/11','2017/12','2018/1','2018/2','2018/3']
        },
        {
           axisLabel:{
            show: true,
            textStyle:{
                color: '#45648e',
                fontSize:'12'
            }
       },
       
        },
        {
          axisLine:{
            lineStyle:{
               color:"#c2d0ff",
               width:4,
            }
        },
       }
        
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[45, 40, 30, 40, 60, 20, 30,30,50,40,40,35],
             itemStyle:{
               normal:{
                  color:'#1a5d4e'
                }
        },
        }      
    ]
          })
    }
    },
    watch: {
    },
    components: {},
    beforeDestroy() {
    }
  }
</script>
