const theme = {
  color: [
    '#194f97',
    '#bd6b08',
    '#00686b',
    '#c82d31',
    '#625ba1',
    '#898989',
    '#9c9800',
    '#007f54',
    '#a195c5',
    '#103667',
    'f19272'
  ],
  backgroundColor: 'rgba(251,251,251,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#ffffff'
    },
    subtextStyle: {
      color: '#ffffff'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false
  },
  radar: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false
  },
  bar: {
    itemStyle: {
      borderWidth: 0
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#fd1050',
      color0: '#0cf49b',
      borderColor: '#fd1050',
      borderColor0: '#0cf49b',
      borderWidth: 1
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    },
    lineStyle: {
      width: 1,
      color: '#aaaaaa'
    },
    symbolSize: 4,
    symbol: 'circle',
    smooth: false,
    color: [
      '#dd6b66',
      '#759aa0',
      '#e69d87',
      '#8dc1a9',
      '#ea7e53',
      '#eedd78',
      '#73a373',
      '#73b9bc',
      '#7289ab',
      '#91ca8c',
      '#f49f42'
    ],
    label: {
      color: '#ffffff'
    }
  },
  map: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5
    },
    label: {
      color: '#000'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1
      },
      label: {
        color: 'rgb(100,0,0)'
      }
    }
  },
  geo: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5
    },
    label: {
      color: '#000'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1
      },
      label: {
        color: 'rgb(100,0,0)'
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#aaaaaa']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#aaaaaa']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#aaaaaa']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#aaaaaa']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['#eeeeee']
      }
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999'
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#ffffff'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#eeeeee',
        width: '1'
      },
      crossStyle: {
        color: '#eeeeee',
        width: '1'
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#eeeeee',
      width: 1
    },
    itemStyle: {
      color: '#dd6b66',
      borderWidth: 1
    },
    controlStyle: {
      color: '#eeeeee',
      borderColor: '#eeeeee',
      borderWidth: 0.5
    },
    checkpointStyle: {
      color: '#e43c59',
      borderColor: '#c23531'
    },
    label: {
      color: '#eeeeee'
    },
    emphasis: {
      itemStyle: {
        color: '#a9334c'
      },
      controlStyle: {
        color: '#eeeeee',
        borderColor: '#eeeeee',
        borderWidth: 0.5
      },
      label: {
        color: '#eeeeee'
      }
    }
  },
  visualMap: {
    color: ['#bf444c', '#d88273', '#f6efa6']
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(255,255,255,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#eeeeee'
    }
  },
  markPoint: {
    label: {
      color: '#ffffff'
    },
    emphasis: {
      label: {
        color: '#ffffff'
      }
    }
  }
}

export default theme
