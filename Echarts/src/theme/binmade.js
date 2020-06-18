// eslint-disable-next-line prettier/prettier
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports", "echarts"], factory)
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("echarts"))
  } else {
    // Browser globals
    factory({}, root.echarts)
  }
})(this, function(exports, echarts) {
  var log = function(msg) {
    if (typeof console !== "undefined") {
      console && console.error && console.error(msg)
    }
  }
  if (!echarts) {
    log("ECharts is not Loaded")
    return
  }
  echarts.registerTheme("binmade", {
    color: [
      "#5172e7",
      "#6ad4be",
      "#fa9184",
      "#eb5b6e",
      "#8179eb",
      "#a841a7",
      "#f7a561",
      "#f77668",
      "#f6c523",
      "#b7c950",
      "#86c76d",
      "#4a97e9"
    ],
    backgroundColor: "rgba(0,0,0,0)",
    textStyle: {},
    title: {
      textStyle: {
        color: "rgba(0,0,0,0.85)"
      },
      subtextStyle: {
        color: "rgba(0,0,0,0.65)"
      }
    },
    line: {
      itemStyle: {
        normal: {
          borderWidth: "2"
        }
      },
      lineStyle: {
        normal: {
          width: "2"
        }
      },
      symbolSize: "6",
      symbol: "emptyCircle",
      smooth: true
    },
    radar: {
      itemStyle: {
        normal: {
          borderWidth: "2"
        }
      },
      lineStyle: {
        normal: {
          width: "2"
        }
      },
      symbolSize: "6",
      symbol: "emptyCircle",
      smooth: true
    },
    bar: {
      itemStyle: {
        normal: {
          barBorderWidth: 0,
          barBorderColor: "#ccc"
        },
        emphasis: {
          barBorderWidth: 0,
          barBorderColor: "#ccc"
        }
      }
    },
    pie: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    scatter: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    boxplot: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    parallel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    sankey: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    funnel: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    gauge: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        },
        emphasis: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      }
    },
    candlestick: {
      itemStyle: {
        normal: {
          color: "#edafda",
          color0: "transparent",
          borderColor: "#d680bc",
          borderColor0: "#8fd3e8",
          borderWidth: "2"
        }
      }
    },
    graph: {
      itemStyle: {
        normal: {
          borderWidth: 0,
          borderColor: "#ccc"
        }
      },
      lineStyle: {
        normal: {
          width: 1,
          color: "#aaa"
        }
      },
      symbolSize: "6",
      symbol: "emptyCircle",
      smooth: true,
      color: [
        "#5172e7",
        "#6ad4be",
        "#fa9184",
        "#eb5b6e",
        "#8179eb",
        "#a841a7",
        "#f7a561",
        "#f77668",
        "#f6c523",
        "#b7c950",
        "#86c76d",
        "#4a97e9"
      ],
      label: {
        normal: {
          textStyle: {
            color: "#eee"
          }
        }
      }
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: "#f3f3f3",
          borderColor: "#516b91",
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: "#a5e7f0",
          borderColor: "#516b91",
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: "#000"
          }
        },
        emphasis: {
          textStyle: {
            color: "#516b91"
          }
        }
      }
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: "#f3f3f3",
          borderColor: "#516b91",
          borderWidth: 0.5
        },
        emphasis: {
          areaColor: "#a5e7f0",
          borderColor: "#516b91",
          borderWidth: 1
        }
      },
      label: {
        normal: {
          textStyle: {
            color: "#000"
          }
        },
        emphasis: {
          textStyle: {
            color: "#516b91"
          }
        }
      }
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(0,0,0,0.45)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["rgba(0,0,0,0.09)"]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["red"]
        }
      }
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(0,0,0,0.45)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["rgba(0,0,0,0.09)"]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["red"]
        }
      }
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(0,0,0,0.45)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["rgba(0,0,0,0.09)"]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["red"]
        }
      }
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "rgba(0,0,0,0.15)"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(0,0,0,0.45)"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["rgba(0,0,0,0.09)"]
        }
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["red"]
        }
      }
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: "#999999"
        },
        emphasis: {
          borderColor: "#666666"
        }
      }
    },
    legend: {
      textStyle: {
        color: "#000000"
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#cccccc",
          width: "0"
        },
        crossStyle: {
          color: "#cccccc",
          width: "0"
        }
      }
    },
    timeline: {
      lineStyle: {
        color: "#8fd3e8",
        width: 1
      },
      itemStyle: {
        normal: {
          color: "#8fd3e8",
          borderWidth: 1
        },
        emphasis: {
          color: "#8fd3e8"
        }
      },
      controlStyle: {
        normal: {
          color: "#8fd3e8",
          borderColor: "#8fd3e8",
          borderWidth: 0.5
        },
        emphasis: {
          color: "#8fd3e8",
          borderColor: "#8fd3e8",
          borderWidth: 0.5
        }
      },
      checkpointStyle: {
        color: "#8fd3e8",
        borderColor: "rgba(138,124,168,0.37)"
      },
      label: {
        normal: {
          textStyle: {
            color: "#8fd3e8"
          }
        },
        emphasis: {
          textStyle: {
            color: "#8fd3e8"
          }
        }
      }
    },
    visualMap: {
      color: ["#2d4fc5", "#3b5ed8", "#5172e7", "#6788fa", "#7d9aff"]
    },
    dataZoom: {
      backgroundColor: "rgba(0,0,0,0)",
      dataBackgroundColor: "rgba(255,255,255,0.3)",
      fillerColor: "rgba(167,183,204,0.4)",
      handleColor: "#a7b7cc",
      handleSize: "100%",
      textStyle: {
        color: "#333333"
      }
    },
    markPoint: {
      label: {
        normal: {
          textStyle: {
            color: "#eee"
          }
        },
        emphasis: {
          textStyle: {
            color: "#eee"
          }
        }
      }
    }
  })
})
