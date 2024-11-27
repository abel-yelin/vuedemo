<template>
  <div class="server-management-container no-background-container">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="阿里云">
        <el-row :gutter="20">
          <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
            <vab-card>
              <div class="server-box-left">
                <el-image :src="imageUrl" />
                <el-button-group>
                  <el-button type="primary">开机</el-button>
                  <el-button type="danger">关机</el-button>
                  <el-button type="warning">重启</el-button>
                </el-button-group>
              </div>
              <div class="server-box-right">
                Cpu
                <el-progress
                  :percentage="percentageCpu1"
                  :status="percentageCpu1 <= 50 ? 'success' : percentageCpu1 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Ram
                <el-progress
                  :percentage="percentageRam1"
                  :status="percentageRam1 <= 50 ? 'success' : percentageRam1 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Swap
                <el-progress
                  :percentage="percentageSwap1"
                  :status="percentageSwap1 <= 50 ? 'success' : percentageSwap1 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Disk
                <el-progress
                  :percentage="percentageDisk1"
                  :status="percentageDisk1 <= 50 ? 'success' : percentageDisk1 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
              </div>
            </vab-card>
          </el-col>
          <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
            <vab-card>
              <div class="server-box-left">
                <el-image :src="imageUrl" />
                <el-button-group>
                  <el-button type="primary">开机</el-button>
                  <el-button type="danger">关机</el-button>
                  <el-button type="warning">重启</el-button>
                </el-button-group>
              </div>
              <div class="server-box-right">
                Cpu
                <el-progress
                  :percentage="percentageCpu2"
                  :status="percentageCpu2 <= 50 ? 'success' : percentageCpu2 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Ram
                <el-progress
                  :percentage="percentageRam2"
                  :status="percentageRam2 <= 50 ? 'success' : percentageRam2 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Swap
                <el-progress
                  :percentage="percentageSwap2"
                  :status="percentageSwap2 <= 50 ? 'success' : percentageSwap2 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Disk
                <el-progress
                  :percentage="percentageDisk2"
                  :status="percentageDisk2 <= 50 ? 'success' : percentageDisk2 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
              </div>
            </vab-card>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="2" title="腾讯云">
        <el-row :gutter="20">
          <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
            <vab-card>
              <div class="server-box-left">
                <el-image :src="imageUrl" />
                <el-button-group>
                  <el-button type="primary">开机</el-button>
                  <el-button type="danger">关机</el-button>
                  <el-button type="warning">重启</el-button>
                </el-button-group>
              </div>
              <div class="server-box-right">
                Cpu
                <el-progress
                  :percentage="percentageCpu3"
                  :status="percentageCpu3 <= 50 ? 'success' : percentageCpu3 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Ram
                <el-progress
                  :percentage="percentageRam3"
                  :status="percentageRam3 <= 50 ? 'success' : percentageRam3 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Swap
                <el-progress
                  :percentage="percentageSwap3"
                  :status="percentageSwap3 <= 50 ? 'success' : percentageSwap3 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Disk
                <el-progress
                  :percentage="percentageDisk3"
                  :status="percentageDisk3 <= 50 ? 'success' : percentageDisk3 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
              </div>
            </vab-card>
          </el-col>
          <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
            <vab-card>
              <div class="server-box-left">
                <el-image :src="imageUrl" />
                <el-button-group>
                  <el-button type="primary">开机</el-button>
                  <el-button type="danger">关机</el-button>
                  <el-button type="warning">重启</el-button>
                </el-button-group>
              </div>
              <div class="server-box-right">
                Cpu
                <el-progress
                  :percentage="percentageCpu4"
                  :status="percentageCpu4 <= 50 ? 'success' : percentageCpu4 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Ram
                <el-progress
                  :percentage="percentageRam4"
                  :status="percentageRam4 <= 50 ? 'success' : percentageRam4 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Swap
                <el-progress
                  :percentage="percentageSwap4"
                  :status="percentageSwap4 <= 50 ? 'success' : percentageSwap4 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
                Disk
                <el-progress
                  :percentage="percentageDisk4"
                  :status="percentageDisk4 <= 50 ? 'success' : percentageDisk4 <= 80 ? '' : 'warning'"
                  :stroke-width="15"
                  :text-inside="true"
                />
              </div>
            </vab-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import imageUrl from '/@/assets/task_image/task.png'

defineOptions({
  name: 'ServerManagement',
})

let timer: ReturnType<typeof setInterval>

const activeNames = ref<any>(['1', '2'])

const percentageCpu1 = ref<any>(random(0, 100))
const percentageCpu2 = ref<any>(random(0, 100))
const percentageCpu3 = ref<any>(random(0, 100))
const percentageCpu4 = ref<any>(random(0, 100))

const percentageRam1 = ref<any>(random(0, 100))
const percentageRam2 = ref<any>(random(0, 100))
const percentageRam3 = ref<any>(random(0, 100))
const percentageRam4 = ref<any>(random(0, 100))

const percentageSwap1 = ref<any>(random(0, 100))
const percentageSwap2 = ref<any>(random(0, 100))
const percentageSwap3 = ref<any>(random(0, 100))
const percentageSwap4 = ref<any>(random(0, 100))

const percentageDisk1 = ref<any>(random(0, 100))
const percentageDisk2 = ref<any>(random(0, 100))
const percentageDisk3 = ref<any>(random(0, 100))
const percentageDisk4 = ref<any>(random(0, 100))

onActivated(() => {
  timer = setInterval(() => {
    percentageCpu1.value = random(0, 100)
    percentageCpu2.value = random(0, 100)
    percentageCpu3.value = random(0, 100)
    percentageCpu4.value = random(0, 100)

    percentageRam1.value = random(0, 100)
    percentageRam2.value = random(0, 100)
    percentageRam3.value = random(0, 100)
    percentageRam4.value = random(0, 100)

    percentageSwap1.value = random(0, 100)
    percentageSwap2.value = random(0, 100)
    percentageSwap3.value = random(0, 100)
    percentageSwap4.value = random(0, 100)

    percentageDisk1.value = random(0, 100)
    percentageDisk2.value = random(0, 100)
    percentageDisk3.value = random(0, 100)
    percentageDisk4.value = random(0, 100)
  }, 5000)
})

onDeactivated(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.server-management-container {
  :deep() {
    .el-collapse {
      border: 0;

      &-item {
        padding: var(--el-padding);
        margin-bottom: var(--el-margin);
        background: var(--el-color-white);
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);

        &__header,
        &__wrap {
          border-bottom: 0;
        }
      }
    }

    @media (max-width: 768px) {
      .el-card__body {
        flex-direction: column !important;
      }
      .server-box-left {
        text-align: center;
      }

      .server-box-right {
        margin-top: 15px;
        margin-left: 0 !important;
      }
    }

    .el-card__body {
      display: flex;
      flex-direction: row;

      .server-box-left {
        flex: 1;
        flex-basis: 40%;

        .el-image {
          display: block;
          width: 200px;
          margin: var(--el-margin) auto var(--el-margin) auto;
        }

        .el-button-group {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .server-box-right {
      flex: 1;
      flex-basis: 60%;

      .el-progress--line {
        margin-bottom: 15px;
      }
    }
  }
}
</style>
