<template>
  <div class="monitor-container">
    <!-- 快速设置卡片 -->
    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header-row">
          <div class="card-header">快速设置</div>
          <div style="display: flex; gap: 8px; align-items: center">
            <el-tooltip
              content="给定所有设置项后才能开始检测"
              placement="top"
              :disabled="canStart === true"
            >
              <el-button
                type="primary"
                size="small"
                :disabled="!canStart"
                @click="startDetection"
              >
                <el-icon style="margin-right: 4px"><VideoPlay /></el-icon>
                {{ isInitial ? '开始检测' : '继续检测' }}
              </el-button>
            </el-tooltip>

            <el-tooltip
              content="仅在检测过程中启用"
              placement="top"
              :disabled="isDetecting"
            >
              <el-button
                type="danger"
                size="small"
                :disabled="!isDetecting"
                @click="stopDetection"
              >
                <el-icon style="margin-right: 4px"><VideoPause /></el-icon>
                停止检测
              </el-button>
            </el-tooltip>

            <el-tooltip
              content="检测停止后才能复位"
              placement="top"
              :disabled="canReset"
            >
              <el-button
                type="warning"
                size="small"
                :disabled="!canReset"
                @click="resetDetection"
              >
                <el-icon style="margin-right: 4px"><Refresh /></el-icon>
                复位
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </template>

      <div class="setting-row">
        <el-input
          v-model="patientName"
          placeholder="请输入患者姓名"
          clearable
          size="small"
          class="setting-item"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>

        <el-select
          v-model="selectedSegModel"
          placeholder="请选择分割模型"
          size="small"
          class="setting-item"
          clearable
        >
          <template #prefix>
            <el-icon><DataLine /></el-icon>
          </template>
          <el-option label="模型A" value="segA" />
          <el-option label="模型B" value="segB" />
        </el-select>

        <el-select
          v-model="selectedDetModel"
          placeholder="请选择检测模型"
          size="small"
          class="setting-item"
          clearable
        >
          <template #prefix>
            <el-icon><DataAnalysis /></el-icon>
          </template>
          <el-option label="模型C" value="detC" />
          <el-option label="模型D" value="detD" />
        </el-select>

        <el-select
          v-model="selectedTask"
          placeholder="请选择任务"
          size="small"
          class="setting-item"
          clearable
        >
          <template #prefix>
            <el-icon><Operation /></el-icon>
          </template>
          <el-option label="任务X" value="taskX" />
          <el-option label="任务Y" value="taskY" />
        </el-select>

        <el-select-v2
          v-model="selectedDevice"
          class="setting-item device-select"
          size="small"
          :options="deviceOptions"
          :filterable="true"
          :remote="true"
          :filter-method="filterDevices"
          placeholder="请选择检测设备"
          multiple
          clearable
          teleported
          popper-class="device-select-popper"
          :item-height="80"
          collapse-tags
          :max-collapse-tags="1"
        >
          <template #prefix>
            <el-icon><Tools /></el-icon>
          </template>

          <template #header>
            <el-checkbox
              v-model="checkAllDevices"
              :indeterminate="indeterminateDevices"
              @change="handleCheckAllDevices"
            >
              全选设备（仅在线）
            </el-checkbox>
          </template>

          <!-- 选项行自定义渲染 -->
          <template #default="{ item }">
            <div class="device-option-row">
              <div class="device-main">
                <div class="device-line">
                  <span class="device-id">{{ item.id }}</span>
                  <span class="device-ip">{{ item.ip }}</span>
                  <el-tag
                    size="small"
                    :type="item.status === 'online' ? 'success' : 'info'"
                    effect="plain"
                    :class="{
                      'tag-no-bold':
                        item.status === 'online' &&
                        selectedDevice.includes(item.id),
                    }"
                  >
                    {{ item.status === 'online' ? '在线' : '离线' }}
                  </el-tag>
                </div>
                <span
                  class="device-desc"
                  :class="{ 'desc-offline': item.status === 'offline' }"
                >
                  {{ item.desc }}
                </span>
              </div>

              <el-button
                size="small"
                :type="item.status === 'online' ? 'danger' : 'success'"
                @click.stop="toggleDeviceConnection(item)"
              >
                {{ item.status === 'online' ? '断连' : '连接' }}
              </el-button>
            </div>
          </template>
        </el-select-v2>
      </div>
    </el-card>

    <!-- 实时信号图卡片 -->
    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header-row">
          <div class="card-header">实时信号数据</div>
          <el-tooltip
            content="检测停止后才能导出报告"
            placement="top"
            :disabled="hasStopped"
          >
            <el-button
              type="success"
              size="small"
              dark
              :disabled="!hasStopped"
              @click="openReportDialog"
            >
              <el-icon style="margin-right: 4px"><Download /></el-icon>
              检测报告下载
            </el-button>
          </el-tooltip>
        </div>
      </template>

      <div class="charts-grid">
        <div class="chart-box chart-span-all">
          <div ref="swallowRef" class="echart-container" />
        </div>
        <div class="chart-box">
          <div ref="imuRef" class="echart-container" />
        </div>
        <div class="chart-box">
          <div ref="gasRef" class="echart-container" />
        </div>
        <div class="chart-box">
          <div ref="audioRef" class="echart-container" />
        </div>
      </div>
    </el-card>
  </div>

  <el-dialog
    v-model="reportDialogVisible"
    title="检测报告预览"
    width="850px"
    :close-on-click-modal="false"
  >
    <div style="display: flex; justify-content: center">
      <MedicalReport ref="reportRef" :report="reportData" />
    </div>

    <template #footer>
      <el-button @click="reportDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="downloadReport">下载报告</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  User,
  DataLine,
  DataAnalysis,
  Operation,
  VideoPlay,
  VideoPause,
  Refresh,
  Tools,
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import Papa from 'papaparse'
import { Download } from '@element-plus/icons-vue'
import type { CheckboxValueType } from 'element-plus'
import { ElNotification, ElDialog, ElMessageBox } from 'element-plus'
import html2pdf from 'html2pdf.js'
import MedicalReport from '@/components/MedicalReport.vue'
import { reportData } from '@/mock/ReportData'

const durationShort = 5
const durationLong = 10

// 图表 DOM ref
const imuRef = ref<HTMLDivElement>()
const gasRef = ref<HTMLDivElement>()
const audioRef = ref<HTMLDivElement>()
const swallowRef = ref<HTMLDivElement>()

// 图表实例
let imuChart: echarts.ECharts
let gasChart: echarts.ECharts
let audioChart: echarts.ECharts
let swallowChart: echarts.ECharts

// 数据变量
const imuSeries = { X: [], Y: [], Z: [] } as Record<string, [number, number][]>
let gasSeries: [number, number][] = []
let audioSeries: [number, number][] = []
let swallowSeries: [number, number][] = []
let riskSeries: [number, number][] = []

let audioDataBuffer: Float32Array = new Float32Array()
const audioUrl = new URL('@/mock/signals/audio.wav', import.meta.url).href

// 控制变量
const patientName = ref('')
const selectedSegModel = ref('')
const selectedDetModel = ref('')
const selectedTask = ref('')
const selectedDevice = ref<string[]>([])
const isDetecting = ref(false)
const hasStopped = ref(false)
const canReset = ref(false)
const hasChartStarted = ref(false)

const reportDialogVisible = ref(false)
const reportRef = ref<HTMLElement | null>(null)

const isInitial = ref(true)

type DeviceItem = {
  id: string
  ip: string
  status: 'online' | 'offline'
  desc: string
}

// 示例设备清单（你可改为从接口获取）
const deviceList = ref<DeviceItem[]>([
  {
    id: 'DEV-001',
    ip: '192.168.1.10',
    status: 'online',
    desc: '实验室 | 三轴加速度计传感器',
  },
  {
    id: 'DEV-002',
    ip: '192.168.1.23',
    status: 'offline',
    desc: '门诊房间 A | 气体流量传感器',
  },
  {
    id: 'DEV-003',
    ip: '192.168.1.45',
    status: 'online',
    desc: '门诊房间 B | 接触式麦克风',
  },
  {
    id: 'DEV-004',
    ip: '192.168.1.60',
    status: 'offline',
    desc: '门诊房间 C | 鼻套管式流量传感器',
  },
])

// 过滤关键词（用于自定义 filter-method）
const deviceQuery = ref('')

// 下拉选项（el-select-v2 需要 { value, label, disabled, ... }）
const deviceOptions = computed(() =>
  deviceList.value
    .filter((d) => {
      if (!deviceQuery.value) return true
      const q = deviceQuery.value.toLowerCase()
      return (
        d.id.toLowerCase().includes(q) ||
        d.ip.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q)
      )
    })
    .map((d) => ({
      value: d.id,
      label: `${d.id} (${d.ip})`,
      disabled: d.status !== 'online', // 离线不可选
      ...d, // 透传给 slot
    })),
)

// 全选（仅在线）控制
const checkAllDevices = ref(false)
const indeterminateDevices = ref(false)

// 可见且可选（在线）的设备选项：基于当前搜索 deviceQuery 已过滤
const matchedEnabledDevices = computed(() =>
  deviceOptions.value.filter((opt) => !opt.disabled),
)

// 同步更新全选/半选状态（当选择或可见项变化时）
watch([selectedDevice, matchedEnabledDevices], () => {
  const selectedInView = matchedEnabledDevices.value.filter((opt) =>
    selectedDevice.value.includes(opt.value),
  )
  if (selectedInView.length === 0) {
    checkAllDevices.value = false
    indeterminateDevices.value = false
  } else if (selectedInView.length === matchedEnabledDevices.value.length) {
    checkAllDevices.value = true
    indeterminateDevices.value = false
  } else {
    checkAllDevices.value = false
    indeterminateDevices.value = true
  }
})

// 仅对“当前搜索可见的在线设备”执行全选/反选
function handleCheckAllDevices(val: CheckboxValueType) {
  indeterminateDevices.value = false
  const idsInView = matchedEnabledDevices.value.map(
    (opt) => opt.value as string,
  )
  if (val) {
    // 并集：勾选所有可见在线设备
    selectedDevice.value = Array.from(
      new Set([...selectedDevice.value, ...idsInView]),
    )
  } else {
    // 差集：移除所有可见在线设备
    selectedDevice.value = selectedDevice.value.filter(
      (id) => !idsInView.includes(id),
    )
  }
}

// 自定义过滤：仅记录关键词，真正过滤在 deviceOptions 中完成
function filterDevices(query: string) {
  const q = (query ?? '')
    .trim()
    .replace(/\u3000/g, ' ') // 全角空格 -> 半角空格
    .replace(/\s+/g, ' ') // 多空格折叠
    .toLowerCase()
  deviceQuery.value = q
}

// 连接/断连
function toggleDeviceConnection(item: DeviceItem) {
  const target = deviceList.value.find((d) => d.id === item.id)
  if (!target) return

  if (target.status === 'offline') {
    // 模拟连接成功（如需真实异步，可在这里发请求）
    target.status = 'online'
  } else {
    // 断连
    target.status = 'offline'
    // 如果当前已选择了该设备，从选择列表中移除
    if (selectedDevice.value.includes(target.id)) {
      selectedDevice.value = selectedDevice.value.filter(
        (id) => id !== target.id,
      )
    }
  }
}

function formatDateTime(date: Date): string {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${y}年${m}月${d}日 ${hh}:${mm}:${ss}`
}

function getBeijingTimestamp(includeTime = true) {
  const now = new Date()
  const offset = 8 * 60 * 60 * 1000
  const beijingDate = new Date(now.getTime() + offset)

  const yyyy = beijingDate.getUTCFullYear()
  const mm = String(beijingDate.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(beijingDate.getUTCDate()).padStart(2, '0')

  if (!includeTime) return `${yyyy}-${mm}-${dd}`

  const hh = String(beijingDate.getUTCHours()).padStart(2, '0')
  const min = String(beijingDate.getUTCMinutes()).padStart(2, '0')
  const ss = String(beijingDate.getUTCSeconds()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd}_${hh}-${min}-${ss}`
}

function openReportDialog() {
  reportDialogVisible.value = true
}

function downloadReport() {
  reportData.value.time = formatDateTime(new Date())

  const content = (reportRef.value as any)?.reportContent
  if (!content) return

  const textarea = content.querySelector(
    '.suggestion-text',
  ) as HTMLTextAreaElement
  if (!textarea) return

  const text = textarea.value
  const pre = document.createElement('pre')
  pre.className = 'suggestion-plain'
  pre.textContent = text

  Object.assign(pre.style, {
    fontFamily: '"Microsoft YaHei", sans-serif',
    fontSize: '13px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    border: 'none',
    background: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    flex: '1',
  })

  const parent = textarea.parentNode
  if (!parent) return
  parent.replaceChild(pre, textarea)

  const filename = `吞咽报告_${reportData.value.name}_${getBeijingTimestamp(true)}.pdf`

  html2pdf()
    .set({
      margin: 0,
      filename: filename,
      html2canvas: { scale: 10 },
      jsPDF: { unit: 'px', format: [794, 1123] },
    })
    .from(content)
    .save()
    .then(() => {
      parent.replaceChild(textarea, pre)
    })
}

const canStart = computed(
  () =>
    patientName.value &&
    selectedSegModel.value &&
    selectedDetModel.value &&
    selectedTask.value &&
    selectedDevice.value.length > 0 &&
    !isDetecting.value,
)

let totalElapsed = 0
let startTime = 0
let animationId = 0
let sampleRate = 44100
let imuIdx = 0
let gasIdx = 0
let swallowIdx = 0
let imuRows: any[] = []
let gasRows: any[] = []
let swallowRows: any[] = []
let inSwallow = false
let hasAlertedThisSwallow = false

// 坐标轴范围
const yAxisConfig = {
  imuXYZ: { min: -400, max: 200 },
  gas: { min: -6, max: 6 },
  audio: { min: -0.6, max: 0.6 },
  swallow: { min: 0, max: 1 },
}

function createImuXYZOption(
  dataX: [number, number][],
  dataY: [number, number][],
  dataZ: [number, number][],
  start: number,
  end: number,
  yRange: { min: number; max: number },
): echarts.EChartsOption {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: {
      data: ['喉部运动信号 X', '喉部运动信号 Y', '喉部运动信号 Z'],
      top: 8,
      itemGap: 4,
    },
    grid: { top: 32, bottom: 24, left: 40, right: 20 },
    xAxis: createXAxis(start, end),
    yAxis: { type: 'value', min: yRange.min, max: yRange.max },
    series: [
      {
        name: '喉部运动信号 X',
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: '#5470C6' },
        data: dataX,
      },
      {
        name: '喉部运动信号 Y',
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: '#91CC75' },
        data: dataY,
      },
      {
        name: '喉部运动信号 Z',
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: '#EE6666' },
        data: dataZ,
      },
    ],
  }
}

function startDetection() {
  reportData.value.date = formatDateTime(new Date())
  isDetecting.value = true
  hasStopped.value = false
  canReset.value = false
  isInitial.value = false
  startTime = performance.now()
  animationId = requestAnimationFrame(frame)
}

function stopDetection() {
  isDetecting.value = false
  hasStopped.value = true
  canReset.value = true
  totalElapsed += performance.now() - startTime
  cancelAnimationFrame(animationId)
}

function resetDetection() {
  ElMessageBox.confirm(
    '复位将删除相关监测数据和检测报告，是否继续？',
    '确认复位',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      // 执行复位操作
      imuSeries.X.length = 0
      imuSeries.Y.length = 0
      imuSeries.Z.length = 0
      gasSeries.length = 0
      audioSeries.length = 0
      swallowSeries.length = 0
      riskSeries.length = 0
      imuIdx = 0
      gasIdx = 0
      swallowIdx = 0
      inSwallow = false
      hasAlertedThisSwallow = false
      totalElapsed = 0
      hasStopped.value = false
      canReset.value = false
      isInitial.value = true
      renderEmptyCharts()
    })
    .catch(() => {
      // 用户取消，无需处理
    })
}

function renderEmptyCharts() {
  const sShort = 0,
    eShort = durationShort
  const sLong = 0,
    eLong = durationLong

  imuChart.setOption(
    createImuXYZOption([], [], [], sShort, eShort, yAxisConfig.imuXYZ),
    { notMerge: true },
  )
  gasChart.setOption(
    createSingleOption('呼吸信号', [], sShort, eShort, yAxisConfig.gas),
    { notMerge: true },
  )
  audioChart.setOption(
    createSingleOption('吞咽声音信号', [], sShort, eShort, yAxisConfig.audio),
    { notMerge: true },
  )
  swallowChart.setOption(createSwallowOption([], [], sLong, eLong), {
    notMerge: true,
  })
}

function createXAxis(start: number, end: number): echarts.XAXisComponentOption {
  return {
    type: 'value',
    min: start,
    max: end,
    axisLabel: {
      formatter: (val: number) => {
        if (Math.abs(val - start) < 0.01) return `${start.toFixed(2)}s`
        if (Math.abs(val - end) < 0.01) return `${end.toFixed(2)}s`
        return ''
      },
    },
  }
}

function createSingleOption(
  title: string,
  data: [number, number][],
  start: number,
  end: number,
  yRange: { min: number; max: number },
): echarts.EChartsOption {
  const colorMap: Record<string, string> = {
    '喉部运动信号 X': '#5470C6',
    '喉部运动信号 Y': '#91CC75',
    '喉部运动信号 Z': '#EE6666',
    呼吸信号: '#FAC858',
    吞咽声音信号: '#73C0DE',
  }

  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: [title], top: 8, itemGap: 4 },
    grid: { top: 32, bottom: 24, left: 40, right: 20 },
    xAxis: createXAxis(start, end),
    yAxis: { type: 'value', min: yRange.min, max: yRange.max },
    series: [
      {
        name: title,
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: colorMap[title] || '#000' },
        data,
      },
    ],
  }
}

function createSwallowOption(
  swallow: [number, number][],
  risk: [number, number][],
  start: number,
  end: number,
): echarts.EChartsOption {
  return {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['吞咽段识别', '吞咽风险概率'], top: 8, itemGap: 4 },
    grid: { top: 32, bottom: 24, left: 40, right: 20 },
    xAxis: createXAxis(start, end),
    yAxis: { type: 'value', min: 0, max: 1 },
    series: [
      {
        name: '吞咽段识别',
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: '#9B59B6' },
        data: swallow,
      },
      {
        name: '吞咽风险概率',
        type: 'line',
        showSymbol: false,
        lineStyle: { width: 2, color: '#E67E22' },
        data: risk,
      },
    ],
  }
}

function pruneSeries(series: [number, number][], minTime: number) {
  while (series.length && series[0][0] < minTime) series.shift()
}

function showRiskAlert(risk: number) {
  let message = ''
  let type: 'info' | 'warning' | 'error' = 'info'

  if (risk >= 0.7) {
    message = '出现高风险吞咽段，请立即关注'
    type = 'error'
  } else if (risk >= 0.3) {
    message = '出现中风险吞咽段，请留意'
    type = 'warning'
  } else if (risk >= 0.1) {
    message = '出现低风险吞咽段，可适当关注'
    type = 'info'
  }

  if (message) {
    ElNotification({
      title: '风险提示',
      message,
      type,
      position: 'top-right',
      duration: 3000,
      showClose: false,
      customClass:
        type === 'error'
          ? 'risk-high'
          : type === 'warning'
            ? 'risk-mid'
            : 'risk-low',
    })
  }
}
function frame() {
  const now = performance.now()
  const logicalElapsed = isDetecting.value
    ? totalElapsed + (now - startTime)
    : totalElapsed
  const tSec = +(logicalElapsed / 1000).toFixed(3)

  const startShort = +Math.max(0, tSec - durationShort).toFixed(3)
  const endShort = +(startShort + durationShort).toFixed(3)

  const startLong = +Math.max(0, tSec - durationLong).toFixed(3)
  const endLong = +(startLong + durationLong).toFixed(3)

  // 分别裁剪
  pruneSeries(imuSeries.X, startShort)
  pruneSeries(imuSeries.Y, startShort)
  pruneSeries(imuSeries.Z, startShort)
  pruneSeries(gasSeries, startShort)
  pruneSeries(audioSeries, startShort)

  pruneSeries(swallowSeries, startLong)
  pruneSeries(riskSeries, startLong)

  if (isDetecting.value) {
    const imuBase = Number(imuRows[0]?.time || 0)
    while (
      imuIdx < imuRows.length &&
      Number(imuRows[imuIdx].time) - imuBase <= logicalElapsed
    ) {
      const t = +(Number(imuRows[imuIdx].time) - imuBase) / 1000
      const row = imuRows[imuIdx]
      imuSeries.X.push([t, +row.X])
      imuSeries.Y.push([t, +row.Y])
      imuSeries.Z.push([t, +row.Z])
      imuIdx++
    }

    const gasBase = Number(gasRows[0]?.time || 0)
    while (
      gasIdx < gasRows.length &&
      Number(gasRows[gasIdx].time) - gasBase <= logicalElapsed
    ) {
      const t = +(Number(gasRows[gasIdx].time) - gasBase) / 1000
      gasSeries.push([t, +gasRows[gasIdx].value])
      gasIdx++
    }

    const audioEndIdx = Math.floor((logicalElapsed / 1000) * sampleRate)
    const audioStartIdx = Math.max(0, audioEndIdx - sampleRate * durationShort)
    const lastIdx = audioSeries.length
      ? Math.floor(audioSeries[audioSeries.length - 1][0] * sampleRate) + 1
      : audioStartIdx
    for (let i = lastIdx; i <= audioEndIdx; i += 20) {
      if (i >= audioDataBuffer.length) break
      const t = i / sampleRate
      audioSeries.push([t, audioDataBuffer[i] * 5])
    }

    while (
      swallowIdx < swallowRows.length &&
      swallowRows[swallowIdx].time <= tSec
    ) {
      const row = swallowRows[swallowIdx]
      swallowSeries.push([row.time, row.swallow])
      riskSeries.push([row.time, row.risk])

      if (row.swallow === 1) {
        if (!inSwallow) {
          inSwallow = true
          hasAlertedThisSwallow = false
        }
        if (!hasAlertedThisSwallow && row.risk > 0.1) {
          hasAlertedThisSwallow = true
          showRiskAlert(row.risk)
        }
      } else {
        inSwallow = false
      }

      swallowIdx++
    }
  }

  imuChart.setOption(
    createImuXYZOption(
      imuSeries.X,
      imuSeries.Y,
      imuSeries.Z,
      startShort,
      endShort,
      yAxisConfig.imuXYZ,
    ),
    { notMerge: true },
  )
  gasChart.setOption(
    createSingleOption(
      '呼吸信号',
      gasSeries,
      startShort,
      endShort,
      yAxisConfig.gas,
    ),
    { notMerge: true },
  )
  audioChart.setOption(
    createSingleOption(
      '吞咽声音信号',
      audioSeries,
      startShort,
      endShort,
      yAxisConfig.audio,
    ),
    { notMerge: true },
  )
  swallowChart.setOption(
    createSwallowOption(swallowSeries, riskSeries, startLong, endLong),
    { notMerge: true },
  )

  animationId = requestAnimationFrame(frame)
}

function initCharts() {
  swallowChart = echarts.init(swallowRef.value!)
  imuChart = echarts.init(imuRef.value!)
  gasChart = echarts.init(gasRef.value!)
  audioChart = echarts.init(audioRef.value!)
  renderEmptyCharts()

  fetch(audioUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) =>
      new (window.AudioContext || (window as any).webkitAudioContext)()
        .decodeAudioData(buffer)
        .then((decoded) => {
          audioDataBuffer = decoded.getChannelData(0)
          sampleRate = decoded.sampleRate
        }),
    )

  Papa.parse('/src/mock/signals/imu.csv', {
    download: true,
    header: true,
    complete: (res) => {
      imuRows = res.data as any[]
    },
  })

  Papa.parse('/src/mock/signals/gas.csv', {
    download: true,
    header: true,
    complete: (res) => {
      gasRows = res.data as any[]
    },
  })

  fetch('/src/mock/signals/swallow.json')
    .then((res) => res.json())
    .then((json) => {
      swallowRows = json
    })
}

onMounted(() => {
  if (!hasChartStarted.value) {
    initCharts()
    hasChartStarted.value = true
  }
})
</script>

<style scoped>
.monitor-container {
  width: 1304px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  width: 100%;
  min-width: 0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
}

:deep(.el-card__header) {
  padding: 6px 0px;
}

.setting-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
}

.setting-item {
  flex: 1 1 0;
  min-width: 0;
}

.setting-button {
  width: 80px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.chart-box {
  width: 100%;
  height: 240px;
}

.chart-span-all {
  grid-column: 1 / -1;
}

.echart-container {
  width: 100%;
  height: 100%;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-row > div:last-child {
  display: flex;
  gap: 8px;
}

.el-button .el-icon {
  margin-right: 4px;
}

.device-select {
  flex: 2 1 0;
  min-width: 0;
}

/* 下拉项布局 */
.device-option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 2px;
}

.device-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.device-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.device-id {
  font-weight: 600;
}

.device-ip {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.tag-no-bold {
  font-weight: normal !important;
}

.device-desc {
  display: flex;
  color: #666;
  font-size: 12px;
  min-width: 0;
}

.desc-offline {
  color: #aaa !important;
}

.device-option-row .el-button {
  flex-shrink: 0;
}
</style>

<style>
.risk-high,
.risk-mid,
.risk-low {
  font-weight: bold;
  font-size: 16px;
  padding: 12px 16px;
  border: none !important;
}

.risk-high .el-notification__group,
.risk-mid .el-notification__group,
.risk-low .el-notification__group {
  background-color: inherit !important;
}

.risk-high .el-icon,
.risk-high .el-notification__title,
.risk-high .el-notification__content,
.risk-high .el-notification__closeBtn {
  color: #fff5f5 !important;
}

.risk-mid .el-icon,
.risk-mid .el-notification__title,
.risk-mid .el-notification__content,
.risk-mid .el-notification__closeBtn {
  color: #fffaf0 !important;
}

.risk-low .el-icon,
.risk-low .el-notification__title,
.risk-low .el-notification__content,
.risk-low .el-notification__closeBtn {
  color: #f0f8ff !important;
}

.risk-high {
  background-color: #ff4d4f !important;
  border-left: 6px solid #a8071a !important;
}

.risk-mid {
  background-color: #fa8c16 !important;
  border-left: 6px solid #ad4e00 !important;
}

.risk-low {
  background-color: #1890ff !important;
  border-left: 6px solid #003a8c !important;
}
</style>
