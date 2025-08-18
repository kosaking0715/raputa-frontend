<template>
  <div class="patient-container">
    <div class="grid-wrapper">
      <!-- 患者预约情况 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">患者预约情况</div>
        </template>

        <div class="controls-row">
          <el-date-picker
            v-model="apptSelectedDate"
            type="date"
            placeholder="请选择日期"
            :disabled-date="disabledDate"
            clearable
            size="small"
            style="width: 180px"
            @clear="onClearApptDate"
          />
          <el-input
            v-model="apptSearchName"
            placeholder="搜索患者"
            size="small"
            clearable
            style="width: 180px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-input
            v-model="apptSearchDept"
            placeholder="搜索科室"
            size="small"
            clearable
            style="width: 180px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- 患者表格 -->
        <el-table
          :data="apptRows"
          stripe
          border
          size="small"
          class="table"
          style="margin-bottom: 16px"
          :row-class-name="apptRowClassName"
          :row-style="row35Style"
          :cell-style="cell35Style"
        >
          <el-table-column prop="id" label="就诊编号" min-width="120" />
          <el-table-column label="患者姓名" min-width="120">
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
          <el-table-column prop="dept" label="预约科室" min-width="120" />
          <el-table-column prop="date" label="预约时间" width="120" />
        </el-table>

        <!-- 分页器 -->
        <div class="pagination-wrapper">
          <el-pagination
            :current-page="apptPage"
            :page-size="PAGE_SIZE"
            :total="filteredApptPatients.length"
            background
            size="small"
            layout="prev, pager, next"
            @current-change="apptPage = $event"
            small
          />
        </div>
      </el-card>

      <!-- 患者检测记录 -->
      <el-card shadow="hover" class="card">
        <template #header>
          <div class="card-header">患者检测记录</div>
        </template>

        <div class="controls-row">
          <el-date-picker
            v-model="checkSelectedDate"
            type="date"
            placeholder="请选择日期"
            :disabled-date="checkDisabledDate"
            clearable
            size="small"
            style="width: 160px"
            @clear="onClearCheckDate"
          />

          <el-input
            v-model="checkSearchName"
            placeholder="搜索患者"
            size="small"
            clearable
            style="width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-input
            v-model="checkSearchStaff"
            placeholder="搜索检测者"
            size="small"
            clearable
            style="width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-select
            v-model="checkResult"
            placeholder="请选择检测结果"
            size="small"
            clearable
            style="width: 220px"
          >
            <template #prefix>
              <el-icon><Filter /></el-icon>
            </template>
            <el-option
              v-for="opt in CHECK_RESULT_OPTIONS"
              :key="opt"
              :label="opt"
              :value="opt"
            />
          </el-select>
        </div>

        <!-- 检测记录表格 -->
        <el-table
          :data="checkRows"
          stripe
          border
          size="small"
          class="table"
          style="margin-bottom: 16px"
          :row-class-name="checkRowClassName"
          :row-style="row35Style"
          :cell-style="cell35Style"
        >
          <el-table-column prop="id" label="患者编号" min-width="90" />
          <el-table-column prop="name" label="患者姓名" min-width="90" />
          <el-table-column prop="staff" label="检测者" min-width="90" />
          <el-table-column label="检测结果" min-width="90">
            <template #default="{ row }">
              <el-tag
                :type="resultTagType(row.result)"
                effect="light"
                size="small"
              >
                {{ row.result }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="检测日期" width="120" />
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            :current-page="checkPage"
            :page-size="PAGE_SIZE"
            :total="filteredChecks.length"
            background
            size="small"
            layout="prev, pager, next"
            @current-change="checkPage = $event"
            small
          />
        </div>
      </el-card>

      <!-- 患者管理（通栏） -->
      <el-card shadow="hover" class="card wide">
        <template #header>
          <div class="card-header">患者管理</div>
        </template>

        <!-- 控制台：ID / 姓名 / 科室 / 家庭住址 / 入院日期 / 性别 / 是否检测 / 按钮 -->
        <div class="filter-row">
          <el-input
            v-model="mgmtSearchId"
            placeholder="搜索患者ID"
            clearable
            size="small"
            style="max-width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-input
            v-model="mgmtSearchName"
            placeholder="搜索患者姓名"
            clearable
            size="small"
            style="max-width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-input
            v-model="mgmtSearchDept"
            placeholder="搜索科室"
            clearable
            size="small"
            style="max-width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-input
            v-model="mgmtSearchAddress"
            placeholder="搜索家庭住址"
            clearable
            size="small"
            style="max-width: 160px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-date-picker
            v-model="mgmtSelectedDate"
            type="date"
            placeholder="选择入院日期"
            clearable
            size="small"
            style="max-width: 160px"
          />

          <el-select
            v-model="mgmtGender"
            placeholder="选择性别"
            clearable
            size="small"
            style="max-width: 120px"
          >
            <template #prefix>
              <el-icon><Filter /></el-icon>
            </template>
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>

          <el-select
            v-model="mgmtChecked"
            placeholder="选择是否检测"
            clearable
            size="small"
            style="max-width: 140px"
          >
            <template #prefix>
              <el-icon><CircleCheck /></el-icon>
            </template>
            <el-option label="是" value="是" />
            <el-option label="否" value="否" />
          </el-select>

          <el-button type="primary" size="small">
            <el-icon class="icon-with-margin"><Plus /></el-icon>
            新增患者
          </el-button>
        </div>

        <el-table
          :data="mgmtRows"
          stripe
          border
          size="small"
          class="table"
          style="margin-bottom: 16px"
          :row-class-name="mgmtRowClassName"
          :row-style="row35Style"
          :cell-style="cell35Style"
        >
          <el-table-column prop="id" label="患者 ID" min-width="120" />
          <el-table-column prop="name" label="姓名" min-width="80" />
          <el-table-column prop="gender" label="性别" min-width="60" />
          <el-table-column prop="age" label="年龄" min-width="60" />
          <el-table-column prop="birth" label="出生日期" min-width="100" />
          <el-table-column prop="admit" label="入院日期" min-width="100" />
          <el-table-column label="所属科室" min-width="100">
            <template #default="{ row }">
              {{ row.dept ?? '-' }}
            </template>
          </el-table-column>
          <el-table-column label="是否检测" min-width="80">
            <template #default="{ row }">
              <el-tag
                :type="checkedTagType(checkedLabel(row.checked))"
                effect="light"
                size="small"
              >
                {{ checkedLabel(row.checked) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="家庭住址"
            min-width="300"
            show-overflow-tooltip
          />
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <template v-if="!row.__filler">
                <el-button size="small" @click="() => onEdit(row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  @click="() => onDelete(row)"
                  >删除</el-button
                >
              </template>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            :current-page="mgmtPage"
            :page-size="MGMT_PAGE_SIZE"
            :total="filteredPatients.length"
            background
            layout="prev, pager, next"
            @current-change="mgmtPage = $event"
            small
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Bell,
  BellFilled,
  Search,
  Plus,
  Filter,
  CircleCheck,
} from '@element-plus/icons-vue'
import { patientTable } from '@/mock/StatsData'
import { patientData } from '@/mock/PatientData'

/** —— 公用 —— */
function formatLocalDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const PAGE_SIZE = 4

/** —— 患者预约情况 —— */
const today = new Date()
today.setHours(0, 0, 0, 0)
const weekEnd = new Date(today)
weekEnd.setDate(today.getDate() + 6)
weekEnd.setHours(23, 59, 59, 999)
const disabledDate = (time: Date) => time < today || time > weekEnd

const apptSelectedDate = ref<Date | null>(null)
const apptSearchName = ref('')
const apptSearchDept = ref('')
const apptPage = ref(1)

const callingIds = ref<Set<string>>(new Set())
const isCalling = computed(() => callingIds.value.size > 0)
function onClearApptDate() {
  ElMessage.info('已清除日期，默认展示未来一周预约记录')
}
function callPatient(row: { id: string; name: string }) {
  callingIds.value.add(row.id)
  ElMessage.info(`呼叫预约患者：${row.name}，就诊编号：${row.id}`)
  setTimeout(() => {
    callingIds.value.delete(row.id)
  }, 3000)
}

const filteredApptPatients = computed(() => {
  const getDateOnly = (str: string) => str.split(' ')[0]
  const todayStr = formatLocalDate(today)
  const weekEndStr = formatLocalDate(weekEnd)

  if (apptSelectedDate.value) {
    const sel = formatLocalDate(apptSelectedDate.value)
    return patientTable.filter(
      (p) =>
        getDateOnly(p.date) === sel &&
        (!apptSearchName.value || p.name.includes(apptSearchName.value)) &&
        (!apptSearchDept.value || p.dept.includes(apptSearchDept.value)),
    )
  } else {
    return patientTable.filter((p) => {
      const d = getDateOnly(p.date)
      return (
        d >= todayStr &&
        d <= weekEndStr &&
        (!apptSearchName.value || p.name.includes(apptSearchName.value)) &&
        (!apptSearchDept.value || p.dept.includes(apptSearchDept.value))
      )
    })
  }
})
const paginatedApptPatients = computed(() => {
  const start = (apptPage.value - 1) * PAGE_SIZE
  return filteredApptPatients.value.slice(start, start + PAGE_SIZE)
})
const apptRows = computed(() => {
  const rows = paginatedApptPatients.value
  const pad = PAGE_SIZE - rows.length
  if (pad <= 0) return rows
  const fillers = Array.from({ length: pad }, (_, i) => ({
    __filler: true,
    __key: `appt-filler-${i}`,
  }))
  return rows.concat(fillers as any)
})
function apptRowClassName({ row }: { row: any }) {
  return row.__filler ? 'is-filler' : ''
}

/** —— 患者检测记录 —— */
const CHECK_RESULT_OPTIONS = [
  '吞咽障碍',
  '显性误吸',
  '隐性误吸',
  '正常',
] as const
type CheckResult = (typeof CHECK_RESULT_OPTIONS)[number]

type CheckRecord = {
  id: string
  name: string
  date: string
  result: CheckResult
  staff: string
}

const checkData = reactive<CheckRecord[]>([
  {
    id: 'P001',
    name: '张三',
    date: '2025-08-11 10:20',
    result: '吞咽障碍',
    staff: '王医生',
  },
  {
    id: 'P002',
    name: '李四',
    date: '2025-08-12 14:05',
    result: '显性误吸',
    staff: '赵医生',
  },
  {
    id: 'P003',
    name: '王五',
    date: '2025-08-12 15:30',
    result: '隐性误吸',
    staff: '周医生',
  },
  {
    id: 'P004',
    name: '赵六',
    date: '2025-08-13 09:15',
    result: '正常',
    staff: '钱医生',
  },
  {
    id: 'P005',
    name: '张七',
    date: '2025-08-14 10:20',
    result: '正常',
    staff: '王医生',
  },
  {
    id: 'P006',
    name: '李八',
    date: '2025-08-15 14:05',
    result: '吞咽障碍',
    staff: '赵医生',
  },
  {
    id: 'P007',
    name: '王九',
    date: '2025-08-10 15:30',
    result: '隐性误吸',
    staff: '周医生',
  },
])

type TagType = 'success' | 'warning' | 'danger' | 'info' | 'primary'
const resultTagType = (r: CheckResult): TagType => {
  const map: Record<CheckResult, TagType> = {
    隐性误吸: 'danger',
    显性误吸: 'warning',
    吞咽障碍: 'info',
    正常: 'success',
  }
  return map[r] ?? 'info'
}

const checkPage = ref(1)
const checkSelectedDate = ref<Date | null>(null)
const checkResult = ref<CheckResult | ''>('')
const checkSearchName = ref('')
const checkSearchStaff = ref('')

const todayEnd = new Date(today)
todayEnd.setHours(23, 59, 59, 999)
const weekStart = new Date(today)
weekStart.setDate(today.getDate() - 6)
const checkDisabledDate = (time: Date) => time < weekStart || time > todayEnd

function onClearCheckDate() {
  ElMessage.info('已清除日期，默认展示过去一周检测记录')
}

const filteredChecks = computed(() => {
  const getDateOnly = (str: string) => str.split(' ')[0]
  if (checkSelectedDate.value) {
    const sel = formatLocalDate(checkSelectedDate.value)
    return checkData.filter(
      (r) =>
        getDateOnly(r.date) === sel &&
        (!checkResult.value || r.result === checkResult.value) &&
        (!checkSearchName.value || r.name.includes(checkSearchName.value)) &&
        (!checkSearchStaff.value || r.staff.includes(checkSearchStaff.value)),
    )
  } else {
    return checkData.filter(
      (r) =>
        (!checkResult.value || r.result === checkResult.value) &&
        (!checkSearchName.value || r.name.includes(checkSearchName.value)) &&
        (!checkSearchStaff.value || r.staff.includes(checkSearchStaff.value)),
    )
  }
})
const paginatedChecks = computed(() => {
  const start = (checkPage.value - 1) * PAGE_SIZE
  return filteredChecks.value.slice(start, start + PAGE_SIZE)
})
const checkRows = computed(() => {
  const rows = paginatedChecks.value
  const pad = PAGE_SIZE - rows.length
  if (pad <= 0) return rows
  const fillers = Array.from({ length: pad }, (_, i) => ({
    __filler: true,
    __key: `check-filler-${i}`,
  }))
  return rows.concat(fillers as any)
})
function checkRowClassName({ row }: { row: any }) {
  return row.__filler ? 'is-filler' : ''
}

// —— 统一 35px 行/格高（整格高度=35，含上下 padding） —— //
function row35Style() {
  return { height: '35px' }
}
function cell35Style() {
  return {
    paddingTop: '0px',
    paddingBottom: '0px',
    height: '35px',
    lineHeight: '35px',
  }
}

/** —— 患者管理（增强筛选） —— */
const mgmtSearchId = ref('')
const mgmtSearchName = ref('')
const mgmtSearchDept = ref('')
const mgmtSearchAddress = ref('')
const mgmtSelectedDate = ref<Date | null>(null)
const mgmtGender = ref<string>('') // '男' | '女' | ''
const mgmtChecked = ref<'是' | '否' | ''>('') // '是' | '否' | ''

const mgmtPage = ref(1)
const MGMT_PAGE_SIZE = 4

const checkedLabel = (val: unknown): '是' | '否' =>
  val === true || val === '是' || val === 1 ? '是' : '否'

const checkedTagType = (label: '是' | '否'): TagType =>
  label === '是' ? 'success' : 'info'

const filteredPatients = computed(() => {
  return patientData.filter((p: any) => {
    const idOk =
      !mgmtSearchId.value || (p.id ?? '').includes(mgmtSearchId.value)
    const nameOk =
      !mgmtSearchName.value || (p.name ?? '').includes(mgmtSearchName.value)
    const deptOk =
      !mgmtSearchDept.value || (p.dept ?? '').includes(mgmtSearchDept.value)
    const addrOk =
      !mgmtSearchAddress.value ||
      (p.address ?? '').includes(mgmtSearchAddress.value)
    const dateOk =
      !mgmtSelectedDate.value ||
      new Date(p.admit).toDateString() === mgmtSelectedDate.value.toDateString()
    const genderOk = !mgmtGender.value || (p.gender ?? '') === mgmtGender.value
    const checkedOk =
      !mgmtChecked.value || checkedLabel(p.checked) === mgmtChecked.value

    return idOk && nameOk && deptOk && addrOk && dateOk && genderOk && checkedOk
  })
})

const paginatedPatients = computed(() => {
  const start = (mgmtPage.value - 1) * MGMT_PAGE_SIZE
  return filteredPatients.value.slice(start, start + MGMT_PAGE_SIZE)
})

// 让表格在不足 MGMT_PAGE_SIZE 条时，用不可见占位行补齐到固定行数
const mgmtRows = computed(() => {
  const rows = paginatedPatients.value
  const pad = MGMT_PAGE_SIZE - rows.length
  if (pad <= 0) return rows
  const fillers = Array.from({ length: pad }, (_, i) => ({
    __filler: true,
    __key: `filler-${i}`,
  }))
  return rows.concat(fillers as any)
})

// 给占位行加 class，便于隐藏单元格内容
function mgmtRowClassName({ row }: { row: any }) {
  return row.__filler ? 'is-filler' : ''
}

function onEdit(row: any) {
  ElMessage.info(`编辑 ${row.name}`)
}
function onDelete(row: any) {
  ElMessageBox.confirm(`确认删除 ${row.name}？`, '删除确认', {
    type: 'warning',
  }).then(() => ElMessage.success('已删除（模拟）'))
}
</script>

<style scoped>
.patient-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* 采用 System.vue 的两列网格布局；患者管理卡片用 .wide 通栏 */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 1304px;
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

.wide {
  grid-column: 1 / -1;
}

.table {
  width: 100%;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.bell-icon {
  margin-right: 8px;
  cursor: pointer;
}
.bell-icon.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 患者管理筛选行（保留原样式） */
.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.icon-with-margin {
  margin-right: 4px;
}

:deep(.el-table__body tr.is-filler .cell) {
  visibility: hidden;
  pointer-events: none;
}
</style>
