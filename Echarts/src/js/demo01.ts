import * as echarts from "echarts"

// demo：自定义南丁格尔图
const demo01 = echarts.init(document.querySelector("#demo01"))
demo01.setOption({
  backgroundColor: "#2c343c",
  visualMap: [
    {
      // 不显示 visualMap 组件，只用于明暗度的映射
      show: false,
      // 映射的最小值为 80
      min: 80,
      // 映射的最大值为 600
      max: 600,
      inRange: {
        // 明暗度的范围是 0 到 1
        colorLightness: [0, 1]
      }
    }
  ],
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: "55%",
      roseType: "angle",
      label: {
        textStyle: {
          color: "rgba(255, 255, 255, 0.3)"
        }
      },
      labelLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)"
        }
      },
      itemStyle: {
        emphasis: {
          // shadowBlur: 200
          // shadowColor: "rgba(0, 0, 0, 0.5)"
        },
        color: "#c23531",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)"
      },
      data: [
        { value: 235, name: "视频广告" },
        { value: 274, name: "联盟广告" },
        { value: 310, name: "邮件营销" },
        { value: 335, name: "直接访问" },
        { value: 400, name: "搜索引擎" }
      ]
    }
  ]
})
