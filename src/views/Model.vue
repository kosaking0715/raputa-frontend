<template>
  <div class="model-container">
    <div class="grid-wrapper">
      <!-- 统计卡片1：模型总数（真实统计） -->
      <el-card shadow="hover" class="stat-card">
        <div class="stat-body">
          <div class="stat-left">
            <el-statistic :value="totalModels">
              <template #title>
                <div class="stat-title">
                  模型总数
                  <el-tooltip
                    effect="dark"
                    content="当前系统模型总数"
                    placement="top"
                  >
                    <el-icon :size="12" class="stat-icon"><Warning /></el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>

            <div class="stat-note primary">
              投入使用模型数: {{ Math.round(usedCount) }}
            </div>
          </div>

          <div class="stat-right">
            <el-progress
              type="dashboard"
              :percentage="Math.round(deployPercent)"
              :stroke-width="8"
              color="#409EFF"
              :width="120"
            >
              <template #default>
                <span class="circle-number">{{
                  Math.round(deployedCount)
                }}</span>
                <span class="circle-label">已部署模型数</span>
              </template>
            </el-progress>
          </div>
        </div>
      </el-card>

      <!-- 统计卡片2：本周新增 -->
      <el-card shadow="hover" class="stat-card">
        <div class="stat-body">
          <div class="stat-left">
            <el-statistic :value="newThisWeek">
              <template #title>
                <div class="stat-title">
                  本周新增
                  <el-tooltip
                    effect="dark"
                    content="本周上传的新模型数量"
                    placement="top"
                  >
                    <el-icon :size="12" class="stat-icon"><Warning /></el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>

            <div class="stat-note success">
              本周新增模型部署数: {{ Math.round(deployedThisWeekCount) }}
            </div>
          </div>

          <div class="stat-right">
            <el-progress
              type="dashboard"
              :percentage="progressValue"
              :stroke-width="8"
              :color="progressColor"
              :width="120"
            >
              <template #default>
                <span class="circle-number">{{ progressValueText }}</span>
                <span class="circle-label">{{ progressLabel }}</span>
              </template>
            </el-progress>
          </div>
        </div>
      </el-card>

      <!-- 统计卡片3：最活跃上传者 -->
      <el-card shadow="hover" class="stat-card">
        <div class="stat-body">
          <!-- 左侧文字信息 -->
          <div class="stat-left">
            <div class="stat-title">
              最活跃上传者
              <el-tooltip
                effect="dark"
                :content="
                  recentUploaderData.weekOffset === 0
                    ? '本周上传模型最多的用户'
                    : recentUploaderData.weekOffset > 0
                      ? `前 ${recentUploaderData.weekOffset} 周最近上传模型者`
                      : '暂无活跃上传模型者'
                "
                placement="top"
              >
                <el-icon :size="12" class="stat-icon"><Warning /></el-icon>
              </el-tooltip>
            </div>
            <div class="stat-value">{{ recentUploaderData.uploader }}</div>

            <div class="stat-note warning">
              上传模型总数: {{ Math.round(uploaderModelCount) }}
            </div>
          </div>

          <!-- 右侧图形仪表盘 -->
          <div class="stat-right">
            <el-progress
              type="dashboard"
              :percentage="uploaderContributionPercent"
              :stroke-width="8"
              color="#e6a23c"
              :width="120"
            >
              <template #default>
                <span class="circle-number"
                  >{{ Math.round(uploaderContributionPercent) }}%</span
                >
                <span class="circle-label">贡献占比</span>
              </template>
            </el-progress>
          </div>
        </div>
      </el-card>

      <!-- 模型管理表格 -->
      <el-card shadow="hover" class="table-card">
        <template #header>
          <div class="card-header">模型管理</div>
        </template>

        <div class="filter-row">
          <el-input
            v-model="searchFunction"
            placeholder="搜索模型功能"
            clearable
            size="small"
          >
            <template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>

          <el-input
            v-model="searchName"
            placeholder="搜索模型名称"
            clearable
            size="small"
          >
            <template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>

          <el-input
            v-model="searchUploader"
            placeholder="搜索上传者"
            clearable
            size="small"
          >
            <template #prefix
              ><el-icon><Search /></el-icon
            ></template>
          </el-input>

          <el-date-picker
            v-model="searchTime"
            type="date"
            placeholder="上传时间"
            clearable
            size="small"
            :disabled-date="disabledFuture"
          />

          <el-upload
            ref="upload"
            class="upload-button"
            :limit="1"
            :auto-upload="true"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <el-button type="primary" size="small">
              <el-icon class="icon-with-margin"><UploadFilled /></el-icon>
              上传模型
            </el-button>
          </el-upload>
        </div>

        <el-table
          :data="paginatedModels"
          stripe
          class="model-table"
          :default-sort="{ prop: 'uploadTime', order: 'descending' }"
          @sort-change="handleSortChange"
        >
          <el-table-column prop="function" label="模型功能" />
          <el-table-column prop="name" label="模型名称" />
          <el-table-column prop="uploadTime" label="上传时间" sortable />
          <el-table-column prop="uploader" label="上传者" />
          <el-table-column prop="remark" label="备注信息" />
          <el-table-column label="操作" width="160">
            <template #default="{ row }">
              <el-button size="small" @click="() => onEdit(row)"
                >编辑</el-button
              >
              <el-button type="danger" size="small" @click="() => onDelete(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-wrapper">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :total="sortedModels.length"
            background
            layout="prev, pager, next"
            @current-change="page = $event"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
import { useTransition } from '@vueuse/core'
import { Search, Warning, UploadFilled } from '@element-plus/icons-vue'
import { modelTable, deployedModelIds, usedModelIds } from '@/mock/ModelData'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

type ModelType = {
  id: string
  function: string
  name: string
  uploadTime: string
  uploader: string
  remark: string
}
type ModelKey = keyof ModelType

// 搜索与分页
const searchFunction = ref('')
const searchName = ref('')
const searchTime = ref<Date | null>(null)
const searchUploader = ref('')
const page = ref(1)
const pageSize = 6

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value?.handleStart(file)
}

const handleSuccess: UploadProps['onSuccess'] = () => {
  ElMessage.success('上传成功')
}

// 排序状态
const sortProp = ref<ModelKey | null>('uploadTime')
const sortOrder = ref<'ascending' | 'descending' | null>('descending')

function handleSortChange({
  prop,
  order,
}: {
  prop: ModelKey
  order: 'ascending' | 'descending'
}) {
  sortProp.value = prop
  sortOrder.value = order
}

const filteredModels = computed(() =>
  modelTable.filter(
    (m) =>
      (!searchFunction.value || m.function.includes(searchFunction.value)) &&
      (!searchName.value || m.name.includes(searchName.value)) &&
      (!searchUploader.value || m.uploader.includes(searchUploader.value)) &&
      (!searchTime.value ||
        new Date(m.uploadTime).toDateString() ===
          searchTime.value!.toDateString()),
  ),
)

const sortedModels = computed(() => {
  if (!sortProp.value || !sortOrder.value) return filteredModels.value
  return [...filteredModels.value].sort((a, b) => {
    const aValue = new Date(a[sortProp.value!]).getTime()
    const bValue = new Date(b[sortProp.value!]).getTime()
    return sortOrder.value === 'ascending' ? aValue - bValue : bValue - aValue
  })
})

const paginatedModels = computed(() => {
  const start = (page.value - 1) * pageSize
  return sortedModels.value.slice(start, start + pageSize)
})

function disabledFuture(date: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() > today.getTime()
}

function onEdit(row: any) {
  ElMessage.info(`编辑 ${row.name}`)
}
function onDelete(row: any) {
  ElMessageBox.confirm(`确认删除【${row.name}】？`, '删除确认', {
    type: 'warning',
  }).then(() => ElMessage.success('已删除（模拟）'))
}

function isInThisWeek(dateStr: string): boolean {
  const now = new Date()
  const date = new Date(dateStr)
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(start.getDate() + 7)
  return date >= start && date < end
}

function isInLastWeek(dateStr: string): boolean {
  const now = new Date()
  const date = new Date(dateStr)
  const start = new Date(now)
  start.setDate(now.getDate() - now.getDay())
  start.setHours(0, 0, 0, 0)
  const lastStart = new Date(start)
  lastStart.setDate(start.getDate() - 7)
  return date >= lastStart && date < start
}

function getRecentActiveUploader(maxWeeksBack = 6) {
  const now = new Date()
  for (let i = 0; i < maxWeeksBack; i++) {
    const start = new Date(now)
    start.setDate(now.getDate() - now.getDay() - i * 7)
    start.setHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setDate(start.getDate() + 7)

    const uploadsInWeek = modelTable.filter((m) => {
      const date = new Date(m.uploadTime)
      return date >= start && date < end
    })

    if (uploadsInWeek.length > 0) {
      const map: Record<string, number> = {}
      uploadsInWeek.forEach((m) => {
        map[m.uploader] = (map[m.uploader] || 0) + 1
      })
      const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])
      return {
        uploader: sorted[0][0],
        count: sorted[0][1],
        weekOffset: i,
      }
    }
  }
  return { uploader: '暂无', count: 0, weekOffset: -1 }
}

const totalModelsSource = ref(0)
const totalModels = useTransition(totalModelsSource, { duration: 1000 })

const deployedCountSource = ref(0)
const deployedCount = useTransition(deployedCountSource, { duration: 1000 })

const deployPercent = computed(() => {
  return totalModels.value ? (deployedCount.value / totalModels.value) * 100 : 0
})

const usedCountSource = ref(0)
const usedCount = useTransition(usedCountSource, { duration: 1000 })

const newThisWeekSource = ref(0)
const newThisWeek = useTransition(newThisWeekSource, { duration: 1000 })

const lastWeekCount = computed(
  () => modelTable.filter((m) => isInLastWeek(m.uploadTime)).length,
)

const growthRate = computed(() => {
  const current = newThisWeek.value
  const last = lastWeekCount.value
  if (last === 0 && current === 0) return 0
  if (last === 0) return 100
  return Math.round(((current - last) / last) * 100)
})

const progressValue = computed(() => {
  const absRate = Math.abs(growthRate.value)
  if (growthRate.value === 0) return 100
  return Math.min(absRate, 100)
})

const progressColor = computed(() => {
  if (growthRate.value > 0) return '#67C23A'
  if (growthRate.value < 0) return '#F56C6C'
  return '#909399'
})

const progressLabel = computed(() => {
  if (growthRate.value > 0) return '较上周新增上升'
  if (growthRate.value < 0) return '较上周新增下降'
  return '与上周新增持平'
})

const progressValueText = computed(() => {
  return `${Math.abs(growthRate.value)}%`
})

const deployedThisWeekCountSource = ref(0)
const deployedThisWeekCount = useTransition(deployedThisWeekCountSource, {
  duration: 1000,
})

const recentUploaderData = ref({ uploader: '暂无', count: 0, weekOffset: -1 })

const uploaderContributionPercentSource = ref(0)
const uploaderContributionPercent = useTransition(
  uploaderContributionPercentSource,
  { duration: 1000 },
)

const uploaderModelCountSource = ref(0)
const uploaderModelCount = useTransition(uploaderModelCountSource, {
  duration: 1000,
})

const uploaderCountSource = ref(0)

watchEffect(() => {
  uploaderCountSource.value = (() => {
    const map: Record<string, number> = {}
    modelTable.forEach((m) => (map[m.uploader] = (map[m.uploader] || 0) + 1))
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])
    return sorted.length ? sorted[0][1] : 0
  })()
})

const uploadPercentSource = ref(0)

onMounted(() => {
  totalModelsSource.value = modelTable.length
  deployedCountSource.value = deployedModelIds.length
  usedCountSource.value = usedModelIds.length
  newThisWeekSource.value = modelTable.filter((m) =>
    isInThisWeek(m.uploadTime),
  ).length

  uploadPercentSource.value = modelTable.length
    ? Math.round((uploaderCountSource.value / modelTable.length) * 100)
    : 0

  recentUploaderData.value = getRecentActiveUploader()

  deployedThisWeekCountSource.value = modelTable.filter(
    (m) => isInThisWeek(m.uploadTime) && deployedModelIds.includes(m.id),
  ).length

  uploaderModelCountSource.value = modelTable.filter(
    (m) => m.uploader === recentUploaderData.value.uploader,
  ).length

  uploaderContributionPercentSource.value = modelTable.length
    ? Math.round((uploaderModelCountSource.value / modelTable.length) * 100)
    : 0
})
</script>

<style scoped>
.model-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  min-width: 1304px;
}
.stat-card,
.table-card {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}
.table-card {
  grid-column: 1 / span 3;
  width: 100%;
}
.card-header {
  font-size: 1.2rem;
  font-weight: 600;
}
:deep(.el-card__header) {
  padding: 6px 0px;
}
.el-statistic {
  --el-statistic-content-font-size: 30px;
}
.stat-title {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}
.stat-icon {
  margin-left: 4px;
}
.stat-value {
  font-size: 24px;
  font-weight: bold;
}
.stat-footer {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
:deep(.stat-footer .el-progress__text) {
  text-align: right;
}
.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
.suffix-text {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 500;
}
.suffix-text.success {
  color: var(--el-color-success);
}
.stat-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.stat-note {
  font-weight: 700;
  font-size: 15px;
}
.stat-note.primary {
  color: var(--el-color-primary);
}
.stat-note.success {
  color: var(--el-color-success);
}
.stat-note.warning {
  color: var(--el-color-warning);
}
.circle-number {
  display: block;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
.circle-label {
  display: block;
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 4px;
}
.filter-row {
  display: grid;
  grid-template-columns: 260px 260px 260px 260px 87px;
  gap: 24px;
  margin-bottom: 16px;
}
:deep(.filter-row .el-input),
:deep(.filter-row .el-date-editor) {
  width: 100%;
}
.upload-button {
  width: 100%;
}
.model-table {
  width: 100%;
  min-height: 300px;
}
.pagination-wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.icon-with-margin {
  margin-right: 4px;
}
</style>
