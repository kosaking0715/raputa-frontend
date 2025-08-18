import { ref } from 'vue'

export const reportData = ref({
  name: '江某某',
  gender: '男',
  age: 78,
  outpatientId: '9028',
  department: '康复科',
  date: '2025年2月19日',
  reportId: '2025-0001',
  totalSwallows: 12,
  normalSwallows: 9,
  abnormalSwallows: 3,
  riskLevel: '中风险',
  suggestions: [
    '（此处可编辑）',
    '1. 增加吞咽行为的监测频率',
    '2. 建议专业医生进一步检测和评估',
    '3. 对患者进行吞咽功能训练，改善吞咽能力',
  ],
  doctor: '李某某',
  time: '',
})
