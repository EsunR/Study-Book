// 基于准备好的dom，初始化ECharts实例
import echarts from "echarts"
// const themeJson = require("../theme/binmade.project.json")
// console.log("themeJson: ", themeJson)

// echarts.registerTheme("binmade", themeJson)
const myChart = echarts.init(document.querySelector("#demo03"), "binmade")

// 使用刚指定的配置项和数据显示图表。
myChart.setOption({
  title: {
    text: "测试标题",
    subtext: "副标题"
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
})
// 处理点击事件并且跳转到相应的百度搜索页面
myChart.on("click", function(event: any) {
  console.log(event)
})
