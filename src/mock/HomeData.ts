export const barData = [
  { category: '周日', value: 25 },
  { category: '周一', value: 40 },
  { category: '周二', value: 24 },
  { category: '周三', value: 12 },
  { category: '周四', value: 23 },
  { category: '周五', value: 27 },
  { category: '周六', value: 37 },
]

export const pieData = [
  { name: '呼吸科', value: 28 },
  { name: '肿瘤科', value: 18 },
  { name: '康复科', value: 17 },
  { name: '脑外科', value: 11 },
  { name: '神经内科', value: 11 },
  { name: '普通外科', value: 15 },
]

export interface Patient {
  id: string
  name: string
  date: string
  dept: string
}

export const patientTable: Patient[] = [
  {
    id: 'P202507270001',
    name: '张三',
    date: '2025-07-27 09:30',
    dept: '神经内科',
  },
  {
    id: 'P202507260001',
    name: '李四',
    date: '2025-07-26 10:20',
    dept: '康复科',
  },
  {
    id: 'P202507250001',
    name: '王五',
    date: '2025-07-25 14:30',
    dept: '呼吸科',
  },
  {
    id: 'P202507240001',
    name: '赵六',
    date: '2025-07-24 10:30',
    dept: '肿瘤科',
  },
  {
    id: 'P202507270002',
    name: '张三',
    date: '2025-07-27 10:00',
    dept: '康复科',
  },
  {
    id: 'P202507260002',
    name: '李四',
    date: '2025-07-26 16:00',
    dept: '康复科',
  },
  {
    id: 'P202507230001',
    name: '曹操',
    date: '2025-07-23 15:30',
    dept: '康复科',
  },
]

export interface Device {
  ip: string
  status: '在线' | '离线'
  lastConnected: string
}

export const deviceTable: Device[] = [
  {
    ip: 'fe80::1ff:fe23:4567:890a',
    status: '在线',
    lastConnected: '2025-07-24 09:12',
  },
  {
    ip: 'fe80::2ff:fe23:4567:890b',
    status: '离线',
    lastConnected: '2025-07-23 17:45',
  },
  {
    ip: 'fe80::3ff:fe23:4567:890c',
    status: '在线',
    lastConnected: '2025-07-24 08:05',
  },
  {
    ip: 'fe80::4ff:fe23:4567:890d',
    status: '离线',
    lastConnected: '2025-07-22 21:30',
  },
  {
    ip: 'fe80::5ff:fe23:4567:890e',
    status: '在线',
    lastConnected: '2025-07-24 07:50',
  },
  {
    ip: 'fe80::6ff:fe23:4567:890f',
    status: '离线',
    lastConnected: '2025-07-21 19:10',
  },
]
