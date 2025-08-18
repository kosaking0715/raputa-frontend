export interface PatientFile {
  id: string
  name: string
  dates: {
    date: string
    files: {
      name: string
      type: 'csv' | 'wav' | 'pdf'
    }[]
  }[]
}

export const fileData: PatientFile[] = [
  {
    id: 'P001',
    name: '张三',
    dates: [
      // {
      //   date: '2025-07-29',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
    ],
  },
  {
    id: 'P002',
    name: '李四',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-24',
        files: [{ name: 'report.pdf', type: 'pdf' }],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P003',
    name: '王五',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P004',
    name: '赵六',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-22',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P005',
    name: '孙七',
    dates: [
      // {
      //   date: '2025-07-29',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-28',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-26',
      //   files: [{ name: 'imu.csv', type: 'csv' }],
      // },
    ],
  },
  {
    id: 'P006',
    name: '周八',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P007',
    name: '曹操',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P008',
    name: '刘备',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P009',
    name: '朝武芳乃',
    dates: [
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-21',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
    ],
  },
  {
    id: 'P010',
    name: '常陆茉子',
    dates: [
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-21',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
    ],
  },
  {
    id: 'P011',
    name: '绫地宁宁',
    dates: [
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-21',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'gas.csv', type: 'csv' },
      //   ],
      // },
    ],
  },
  {
    id: 'P012',
    name: '李华',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P013',
    name: '张三',
    dates: [
      // {
      //   date: '2025-07-29',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
    ],
  },
  {
    id: 'P014',
    name: '李四',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-24',
        files: [{ name: 'report.pdf', type: 'pdf' }],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P015',
    name: '王五',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P016',
    name: '赵六',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-22',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P017',
    name: '孙七',
    dates: [
      {
        date: '2025-07-29',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-28',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-26',
        files: [{ name: 'imu.csv', type: 'csv' }],
      },
    ],
  },
  {
    id: 'P018',
    name: '周八',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P019',
    name: '曹操',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P020',
    name: '刘备',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P021',
    name: '朝武芳乃',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P022',
    name: '常陆茉子',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P023',
    name: '绫地宁宁',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P024',
    name: '李华',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P025',
    name: '张三',
    dates: [
      // {
      //   date: '2025-07-29',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-27',
      //   files: [
      //     { name: 'imu.csv', type: 'csv' },
      //     { name: 'gas.csv', type: 'csv' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
      // {
      //   date: '2025-07-25',
      //   files: [
      //     { name: 'audio.wav', type: 'wav' },
      //     { name: 'report.pdf', type: 'pdf' },
      //   ],
      // },
    ],
  },
  {
    id: 'P026',
    name: '李四',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-24',
        files: [{ name: 'report.pdf', type: 'pdf' }],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P027',
    name: '王五',
    dates: [
      {
        date: '2025-07-28',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-26',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-23',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P028',
    name: '赵六',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'gas.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
        ],
      },
      {
        date: '2025-07-22',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'P029',
    name: '孙七',
    dates: [
      {
        date: '2025-07-29',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-28',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-26',
        files: [{ name: 'imu.csv', type: 'csv' }],
      },
    ],
  },
  {
    id: 'P030',
    name: '周八',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P031',
    name: '曹操',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P032',
    name: '刘备',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P033',
    name: '朝武芳乃',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P034',
    name: '常陆茉子',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P035',
    name: '绫地宁宁',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
  {
    id: 'P036',
    name: '李华',
    dates: [
      {
        date: '2025-07-27',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
      {
        date: '2025-07-25',
        files: [
          { name: 'audio.wav', type: 'wav' },
          { name: 'report.pdf', type: 'pdf' },
        ],
      },
      {
        date: '2025-07-21',
        files: [
          { name: 'imu.csv', type: 'csv' },
          { name: 'audio.wav', type: 'wav' },
          { name: 'gas.csv', type: 'csv' },
        ],
      },
    ],
  },
]
