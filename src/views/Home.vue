<template>
  <div class="home-container">
    <div class="grid-wrapper">
      <!-- 柱状图 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">每日检测患者数量</div>
        </template>
        <v-chart
          :option="barOption"
          class="chart"
          renderer="svg"
          style="width: 100%; height: 240px"
        />
      </el-card>

      <!-- 患者预约情况 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">患者预约情况</div>
        </template>

        <!-- 顶部工具栏：日期 / 姓名搜索 / 科室搜索 -->
        <div class="controls-row">
          <el-date-picker
            v-model="selectedDate"
            type="date"
            placeholder="请选择日期"
            :disabled-date="disabledDate"
            clearable
            size="small"
            style="width: 180px"
            @clear="onClearDate"
          />
          <el-input
            v-model="searchName"
            placeholder="搜索姓名"
            size="small"
            clearable
            style="width: 180px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-input
            v-model="searchDept"
            placeholder="搜索科室"
            size="small"
            clearable
            style="width: 180px"
          />
        </div>

        <!-- 患者表格 -->
        <el-table
          :data="paginatedPatients"
          stripe
          size="small"
          class="table"
          style="margin-bottom: 16px"
        >
          <el-table-column prop="id" label="就诊编号" min-width="120" />
          <el-table-column label="患者姓名" min-width="90">
            <template #default="{ row }">
              <el-icon
                class="bell-icon"
                :class="{ disabled: isCalling && !callingIds.has(row.id) }"
                @click="!isCalling && callPatient(row)"
              >
                <component :is="callingIds.has(row.id) ? BellFilled : Bell" />
              </el-icon>
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="预约时间" width="180" />
          <el-table-column prop="dept" label="预约科室" min-width="90" />
        </el-table>

        <!-- 分页器 -->
        <div class="pagination-wrapper">
          <el-pagination
            :current-page="patientPage"
            :page-size="pageSize"
            :total="filteredPatients.length"
            background
            small
            layout="prev, pager, next"
            @current-change="patientPage = $event"
          />
        </div>
      </el-card>

      <!-- 饼图 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">各科室吞咽障碍人群占比</div>
        </template>
        <v-chart
          :option="pieOption"
          class="chart"
          renderer="svg"
          style="width: 100%; height: 240px"
        />
      </el-card>

      <!-- 设备状态 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">设备状态</div>
        </template>
        <el-table
          :data="paginatedDevices"
          stripe
          size="small"
          class="table"
          style="margin-bottom: 16px"
        >
          <el-table-column prop="ip" label="设备 IP 地址" min-width="200" />
          <el-table-column
            prop="lastConnected"
            label="上次连接时间"
            min-width="180"
          />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag
                :type="row.status === '在线' ? 'success' : 'info'"
                effect="dark"
              >
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
          <el-pagination
            :current-page="devicePage"
            :page-size="pageSize"
            :total="deviceTable.length"
            background
            small
            layout="prev, pager, next"
            @current-change="devicePage = $event"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { barData, pieData, patientTable, deviceTable } from '@/mock/HomeData'
import { Bell, BellFilled, Search } from '@element-plus/icons-vue'

// 本地日期格式化
function formatLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 图表配置
const barOption = {
  xAxis: { type: 'category', data: barData.map((d) => d.category) },
  yAxis: { type: 'value' },
  tooltip: {},
  series: [
    {
      type: 'bar',
      data: barData.map((d) => d.value),
      itemStyle: { color: '#3b82f6' },
    },
  ],
}
const pieOption = {
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: pieData,
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.3)' },
      },
    },
  ],
}

// 预约筛选状态
const selectedDate = ref<Date | null>(null)
const searchName = ref('')
const searchDept = ref('')
const pageSize = ref(4)
const patientPage = ref(1)

// 计算可查询日期范围：今天 ~ 今天+6天
const today = new Date()
today.setHours(0, 0, 0, 0)
const weekEnd = new Date(today)
weekEnd.setDate(today.getDate() + 6)
weekEnd.setHours(23, 59, 59, 999)

// 限制日期选择器范围
const disabledDate = (time: Date) => time < today || time > weekEnd

// 清除日期时提示
function onClearDate() {
  ElMessage.info('已清除日期，默认展示未来一周预约记录')
}

// 追踪呼叫状态的 ID 集合
const callingIds = ref<Set<string>>(new Set())
// 是否有任何正在呼叫
const isCalling = computed(() => callingIds.value.size > 0)

// 点击呼叫：切换图标，弹窗，并在 3 秒后恢复，同时解除禁用
function callPatient(row: { id: string; name: string }) {
  callingIds.value.add(row.id)
  ElMessage.info(`呼叫预约患者：${row.name}，就诊编号：${row.id}`)
  setTimeout(() => {
    callingIds.value.delete(row.id)
  }, 3000)
}

// 过滤并分页患者数据
const filteredPatients = computed(() => {
  const getDateOnly = (str: string) => str.split(' ')[0]
  const todayStr = formatLocalDate(today)
  const weekEndStr = formatLocalDate(weekEnd)

  if (selectedDate.value) {
    const sel = formatLocalDate(selectedDate.value)
    return patientTable.filter(
      (p) =>
        getDateOnly(p.date) === sel &&
        (!searchName.value || p.name.includes(searchName.value)) &&
        (!searchDept.value || p.dept.includes(searchDept.value)),
    )
  } else {
    return patientTable.filter((p) => {
      const d = getDateOnly(p.date)
      return (
        d >= todayStr &&
        d <= weekEndStr &&
        (!searchName.value || p.name.includes(searchName.value)) &&
        (!searchDept.value || p.dept.includes(searchDept.value))
      )
    })
  }
})

// 表格分页
const paginatedPatients = computed(() => {
  const start = (patientPage.value - 1) * pageSize.value
  return filteredPatients.value.slice(start, start + pageSize.value)
})

const devicePage = ref(1)
const paginatedDevices = computed(() => {
  const start = (devicePage.value - 1) * pageSize.value
  return deviceTable.slice(start, start + pageSize.value)
})
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  min-width: 1200px;
}
.card {
  min-width: 580px;
  max-width: 640px;
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
  padding: 6px 16px;
}
.chart {
  max-width: 100%;
}
.table {
  width: 100%;
  min-height: 180px;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 8px;
}
.bell-icon {
  margin-right: 8px;
  cursor: pointer;
}
.bell-icon.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
</style>
