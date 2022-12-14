import * as echarts from '../../ec-canvas/echarts';

var option;
let chart = null;
Page({
  data: {
    ec1: {
      onInit: initChart1
    },
    ec2: {
      onInit: initChart2
    }
  },
})

// 初始化图表1函数
function initChart1(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)

  const temp_min = 35;
  const temp_max = 43;
  
  var data_get = {
    "msg": "query succeed",
    "status": 1,
    "value": {
      "2022-12-14": { // 6
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2022, 12, 14],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2022-12-07": { // 1
        "_id": "63986a089f4ef3708338f4a5",
        "date": [2022, 12, 7],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670933000.8822377,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2022-12-08": { // 2
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2022, 12, 8],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2022-12-10": { // 3
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2022, 12, 10],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2022-12-11": { // 4
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2022, 12, 11],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2022-12-13": { // 5
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2022, 12, 13],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      },
      "2023-1-1": { // 7
        "_id": "6398856a9f4ef3708338f4a6",
        "date": [2023, 1, 1],
        "days_symp": 0,
        "location": "",
        "nc_test": null,
        "stamp": 1670940010.275769,
        "symptom": {
          "cw": false,
          "fl": false,
          "ks": false,
          "lt": false,
          "qc": false,
          "tt": true,
          "yt": false
        },
        "temp": 36.7,
        "uuid": 1
      }
    }
  }


  var date_list = []
  for (var i in data_get.value) {
    date_list.push(data_get.value[i].date)
  }
  date_list.sort(function(a,b) {
    if (a[0] != b[0]) {
      return a[0]-b[0]
    } else if (a[1] != b[1]) {
      return a[1]-b[1]
    } else {
      return a[2]-b[2]
    }
  }); // 日期升序排序

  // 挑出七日体温时间范围，这块代码有点麻烦，晚会再补充
  var date_start = date_list[0]
  var date_end = []
  var date_end_year = date_start[0]
  var date_end_month = date_start[1]
  var date_end_day = date_start[2] + 6
  function isLeapYear(year){
    return ((year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0))
  }
  if (date_end_month>12) {
    date_end_month = date_end_month % 12
    date_end_year += 1
  }
  date_end = [date_end_year, date_end_month, date_end_day]
  var tmp = []
  for (var i = 0; i < date_list.length & i < 7; i++) { // 这块加一个时间范围比较
    if (date_list[i][1]>9 && date_list[i][2]>9) {
      tmp.push(date_list[i][0] + '-' + date_list[i][1] + '-' + date_list[i][2])
    }
    if (date_list[i][1]>9 && date_list[i][2]<=9) {
      tmp.push(date_list[i][0] + '-' + date_list[i][1] + '-0' + date_list[i][2])
    }
    if (date_list[i][1]<=9 && date_list[i][2]>9) {
      tmp.push(date_list[i][0] + '-0' + date_list[i][1] + '-' + date_list[i][2])
    }
    if (date_list[i][1]<=9 && date_list[i][2]<=9) {
      tmp.push(date_list[i][0] + '-0' + date_list[i][1] + '-0' + date_list[i][2])
    }
  } 
  date_list = tmp
  //console.log(date_list)
  var my_state_tmp = []

  for (var i = 0; i < date_list.length; i++) {
    my_state_tmp.push([i, data_get.value[date_list[i]]])
  }
  console.log(my_state_tmp )

  var my_state = [
    [0, 36.8, '阳', 1, 0, 0, 0, 0],
    [1, 36.8, '阳', 1, 0, 0, 0, 0],
    // [2, 39.1, '阳', 1, 1, 0, 0, 0],
    [3, 41.5, '阳', 0, 0, 1, 0, 0],
    [4, 38.5, '阳', 0, 0, 0, 1, 0],
    [5, 36.8, '阳', 0, 0, 0, 0, 1],
    [6, 36.8, '阳', 1, 0, 0, 0, 1],
  ]

  const ave_state = [
    [0, 36.8, '阳', 1, 1, 0, 0, 0],
    [1, 37.3, '阳', 1, 1, 0, 0, 0],
    [2, 39, '阳', 1, 1, 1, 0, 1],
    [3, 40, '阳', 1, 1, 1, 1, 1],
    [4, 37.5, '阳', 1, 1, 1, 1, 1],
    [5, 37.3, '阳', 1, 1, 1, 1, 1],
    [6, 36.8, '阴', 0, 0, 0, 0, 0],
  ];
  
  const schema = [
    { name: 'date', index: 0, text: '日' },
    { name: 'temp', index: 1, text: '体温' },
    { name: 'test_res', index: 2, text: '核酸结果' },
    { name: 'throat', index: 3, text: '咽干咽痛' },
    { name: 'weakness', index: 4, text: '身体乏力' },
    { name: 'cough', index: 5, text: '咽痒咳嗽' },
    { name: 'nose', index: 6, text: '流涕鼻塞' },
    { name: 'stomach', index: 7, text: '肠胃不适' },
    { name: 'headache', index: 8, text: '头痛' },
    { name: 'asthma', index: 9, text: '气喘' }
  ];

  const itemStyle = {
    // item 阴影设置
    // opacity: 0.8,
    shadowBlur: 50,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0,0,0,0.2)',
    borderColor: '#fff',
    borderWidth: 100
  };
  option = {
    color: ['#377E47', '#FF6159',], // 点的颜色,不会调成实心的
    legend: {
      top: 10,
      data: ['我的病程', '平均病程'],
      textStyle: {
        fontSize: 16
      }
    },
    grid: { // 表格布局位置
      left: '10%',
      right: '15%',
      top: '20%',
      bottom: '8%'
    },
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      position: function (pos, params, dom, rect, size) {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        var obj = {top: 60};
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
        return obj;
      },
      formatter: function (param) {
        var value = param.value;
        // prettier-ignore
        return schema[2].text + '：' + value[2] + '性' + '\n'
                + schema[3].text + '：' + (value[3]==1?'是':'否') + '\n'
                + schema[4].text + '：' + (value[4]==1?'是':'否') + '\n'
                + schema[5].text + '：' + (value[5]==1?'是':'否') + '\n'
                + schema[6].text + '：' + (value[6]==1?'是':'否') + '\n'
                + schema[7].text + '：' + (value[7]==1?'是':'否')
        // const schema = [
        //   { name: 'date', index: 0, text: '日' },
        //   { name: 'temp', index: 1, text: '体温' },
        //   { name: 'test_res', index: 2, text: '核酸结果' },
        //   { name: 'throat', index: 3, text: '咽干咽痛' },
        //   { name: 'weakness', index: 4, text: '身体乏力' },
        //   { name: 'cough', index: 5, text: '咽痒咳嗽' },
        //   { name: 'nose', index: 6, text: '流涕鼻塞' },
        //   { name: 'stomach', index: 7, text: '肠胃不适' },
        //   { name: 'headache', index: 8, text: '头痛' },
        //   { name: 'asthma', index: 9, text: '气喘' },
        // ];
      }
    },
    xAxis: {
      type: 'category',
      name: '日期',
      data: [
        '第1天', '第2天', '第3天', '第4天', '第5天','第6天','第7天',
      ],
      nameTextStyle: {
        fontSize: 16 // 日期两个字的大小
      },
      splitArea: { // 竖着的条纹
        show: true
      },
    },
    yAxis: {
      type: 'value',
      name: '体温',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 16
      },
      splitLine: {
        show: true
      },
      min: temp_min
    },
    visualMap: {
      show: false,
      calculable: false,
      dimension: 1,
      min: temp_min,
      max: temp_max,
      itemWidth: 30,
      itemHeight: 50,
      precision: 0.1,
      text: ['圆形大小：体温'],
      textGap: 30,
      inRange: {
        symbolSize: [10, 50]
      },
      outOfRange: {
        symbolSize: [10, 70],
        color: ['rgba(255,255,255,0.4)']
      },
      controller: {
        inRange: {
          color: ['#C3C3C3']
        },
        outOfRange: {
          color: ['#999']
        }
      }
    },
  
    series: [
      {
        name: '平均病程',
        type: 'line',
        itemStyle: itemStyle,
        data: ave_state
      },
      {
        name: '我的病程',
        type: 'line',
        itemStyle: itemStyle,
        data: my_state
      },
    ]
  };
  chart.setOption(option);
  return chart;
}

// 初始化图表2函数
function initChart2(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)

  var my_state = [
    [0, 36.8, '阳', 1, 0, 0, 0, 0, 1, 0],
    [1, 36.8, '阳', 1, 0, 0, 0, 0, 1, 0],
    // [2, 39.1, '阳', 1, 1, 0, 0, 0, 1, 0],
    [3, 41.5, '阳', 0, 0, 1, 0, 0, 1, 0],
    [4, 37.5, '阳', 0, 0, 0, 1, 0, 1, 0],
    [5, 37.3, '阳', 0, 0, 0, 0, 1, 1, 0],
    [6, 36.8, '阳', 1, 0, 0, 0, 1, 1, 1],
  ]
  
  const contrast = [
    ['轻微', '加重', '加剧', '持续', '持续', '减轻', '明显好转'], // 咽干咽痛
    ['轻微', '加重', '加剧', '持续', '持续', '减轻', '明显好转'], // 身体乏力
    ['尚无', '尚无', '出现', '出现', '持续', '加重', '明显好转'], // 咽痒咳嗽
    ['尚无', '尚无', '尚无', '出现', '持续', '加重', '明显好转'], // 流涕鼻塞
    ['尚无', '尚无', '出现', '出现', '减轻', '减轻', '明显好转'], // 肠胃不适
    ['阳性', '阳性', '阳性', '阳性', '阳性', '可能转阴', '很大可能转阴'] // 核酸检测
  ].map(function (item) {
    return [item[0], item[1], item[2], item[3], item[4], item[5], item[6]];
  });

  var dat = []; // 生成格子图中的数据
  for (var i=0; i<my_state.length; i++) { // 第几天
    for (var j=3; j<my_state[i].length-2; j++) { // 症状
      if (my_state[i][j]==1) {
        dat.push([my_state[i][0], j-3, my_state[i][j], contrast[j-3][i], contrast[5][i]])
      }
    }
  }
  dat.map(function (item) {
      return [item[0], item[1], item[2]];
  });

  option = {
    tooltip: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      formatter: function (param) {
        var value = param.value;
        return '其他患者在今天：\n' 
        // + value[0] + ' ' + value[1] + ' ' + value[2] + ' ' 
        + '该症状' + value[3] + '\n'
        + '核酸检测结果' + value[4]
      }
    },
    grid: {
      left: '10%',
      right: '15%',
      top: '5%',
      bottom: '10%'
    },
    xAxis: {
      type: 'category',
      name: '日期',
      data: [
       '第1天', '第2天', '第3天', '第4天', '第5天','第6天','第7天',
      ],
      splitArea: {
        show: true // 竖着的条纹
      },
      nameTextStyle: {
        fontSize: 16 // 日期两个字的大小
      },
      textStyle: { // 没用，不会调
        fontSize: 1600000
      },
      // position: 'top'
    },
    yAxis: {
      type: 'category',
      name: '出现症状',
      data: [
        '咽干\n咽痛', '身体\n乏力', '咽痒\n咳嗽', '流涕\n鼻塞', '肠胃\n不适',   
      ],
      nameTextStyle: {
        fontSize: 16 // 出现症状4个字的大小
      },
      splitArea: {
        // show: true // 横着的条纹
      },
      axisLabel: {
        fontSize: 12,
      },
      offset:1,
    },
    visualMap: {
      show: false,
      calculable: false,
      orient: 'horizontal',
      inRange: {
        // color: ['#EB3324']
        // color: ['#77FF90', '#377E47', '#F09B59', '#EB3324']
      }
    },
    series: [
      {
        name: 'Punch Card',
        type: 'heatmap',
        // data: [dat, contrast],
        data: dat,
        label: {
          show: false // 控制是否显示数字
        },
        itemStyle: {
          shadowBlur: 10, // 这块控制阴影
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
          color: new echarts.graphic.RadialGradient(0.5, 0.2, 0.9, [ // 这块控制颜色
            {
              offset: 0,
              color: 'rgb(245, 96, 81)'
            },
            {
              offset: 0,
              color: 'rgb(215, 66, 51)'
            }
          ]),
        }
        
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
