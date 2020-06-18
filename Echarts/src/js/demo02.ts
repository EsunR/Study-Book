import echarts from "echarts"

// 拖拽组件的实现: https://echarts.apache.org/zh/tutorial.html#%E5%B0%8F%E4%BE%8B%E5%AD%90%EF%BC%9A%E8%87%AA%E5%B7%B1%E5%AE%9E%E7%8E%B0%E6%8B%96%E6%8B%BD

const demo02 = echarts.init(document.querySelector("#demo02"))

const symbolSize = 20
const data: number[][] = [
  [15, 0],
  [-50, 10],
  [-56.5, 20],
  [-46.5, 30],
  [-22.1, 40]
]

function onPointDragging(dataIndex: number) {
  // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
  // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
  data[dataIndex] = demo02.convertFromPixel(
    { gridIndex: 0 },
    this.position
  ) as number[]
  // 用更新后的 data，重绘折线图。
  demo02.setOption({
    series: [
      {
        id: "a",
        data: data
      }
    ]
  })
}

demo02.setOption({
  xAxis: {
    min: -100,
    max: 80,
    type: "value",
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -30,
    max: 60,
    type: "value",
    axisLine: { onZero: false }
  },
  series: [
    {
      id: "a",
      type: "line",
      smooth: true,
      symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
      data: data
    }
  ]
})

setTimeout(() => {
  demo02.setOption({
    // 声明一个 graphic component，里面有若干个 type 为 'circle' 的 graphic elements。
    // 这里使用了 echarts.util.map 这个帮助方法，其行为和 Array.prototype.map 一样，但是兼容 es5 以下的环境。
    // 用 map 方法遍历 data 的每项，为每项生成一个圆点。
    graphic: data.map((dataItem: string | any[], dataIndex: number) => {
      const graphicItem = {
        // 'circle' 表示这个 graphic element 的类型是圆点。
        type: "circle",
        shape: {
          // 圆点的半径。
          r: symbolSize / 2
        },
        // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
        // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
        position: demo02.convertToPixel({ gridIndex: 0 }, dataItem),
        // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
        invisible: true,
        // 这个属性让圆点可以被拖拽。
        draggable: true,
        // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
        z: 100,
        // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
        // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
        // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
        ondrag: function() {
          onPointDragging.call(this, dataIndex)
        }
      }
      return graphicItem
    })
  })
}, 0)

// window.demo02 = demo02
