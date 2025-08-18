export type Patient = {
  id: string
  name: string
  gender: string
  age: number
  birth: string
  admit: string
  address: string
}

export const patientData = [
  {
    id: 'P001',
    name: '王某',
    gender: '男',
    age: 58,
    birth: '1967-03-25',
    admit: '2025-07-25',
    dept: '肿瘤科',
    checked: '是',
    address:
      '北京市朝阳区阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴小区111栋222房',
  },
  {
    id: 'P002',
    name: '李某',
    gender: '女',
    age: 62,
    birth: '1963-11-02',
    admit: '2025-07-26',
    dept: '康复科',
    checked: '否',
    address: '上海市浦东新区',
  },
  {
    id: 'P003',
    name: '张某',
    gender: '男',
    age: 70,
    birth: '1955-05-18',
    admit: '2025-07-27',
    dept: '脑外科',
    checked: '否',
    address: '广州市天河区',
  },
  {
    id: 'P004',
    name: '赵某',
    gender: '女',
    age: 49,
    birth: '1976-08-09',
    admit: '2025-07-26',
    dept: '神经内科',
    checked: '是',
    address: '深圳市南山区',
  },
  {
    id: 'P005',
    name: '钱某',
    gender: '女',
    age: 66,
    birth: '1959-02-13',
    admit: '2025-07-25',
    dept: '呼吸科',
    checked: '是',
    address: '成都市锦江区',
  },
  {
    id: 'P006',
    name: '孙某',
    gender: '男',
    age: 53,
    birth: '1972-12-01',
    admit: '2025-07-25',
    dept: '普通外科',
    checked: '否',
    address: '杭州市西湖区',
  },
  // {
  //   id: 'P007',
  //   name: '周某',
  //   gender: '女',
  //   age: 45,
  //   birth: '1980-06-15',
  //   admit: '2025-07-26',
  //   dept: '呼吸科',
  //   checked: '否',
  //   address: '重庆市渝中区',
  // },
]

export const symptomTrendData = {
  dates: [
    '07/16',
    '07/17',
    '07/18',
    '07/19',
    '07/20',
    '07/21',
    '07/22',
    '07/23',
    '07/24',
    '07/25',
    '07/26',
    '07/27',
    '07/28',
    '07/29',
  ],
  series: [
    {
      name: '吞咽困难',
      data: [65, 20, 75, 55, 80, 35, 70, 62, 90, 40, 68, 77, 45, 60],
    },
    {
      name: '呛咳',
      data: [22, 60, 28, 65, 26, 72, 38, 49, 30, 75, 36, 42, 66, 29],
    },
    {
      name: '吞咽疼痛',
      data: [5, 12, 18, 8, 30, 25, 9, 35, 14, 22, 19, 26, 15, 34],
    },
  ],
}
