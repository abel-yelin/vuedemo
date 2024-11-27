<template>
  <div class="vab-nav" :class="'vab-nav-' + layout">
    <div class="left-panel">
      <vab-logo v-if="layout === 'comprehensive'" class="hidden-sm-and-down" />
      <vab-fold fold="contract-left-line" unfold="contract-right-line" />
      <el-tabs
        v-if="layout === 'comprehensive'"
        v-model="tab.data"
        class="comprehensive-tabs"
        tab-position="top"
        @tab-click="handleTabClick"
      >
        <template v-for="item in routes" :key="item.name">
          <el-tab-pane :name="item.name">
            <template #label>
              <vab-icon v-if="item.meta.icon" :icon="item.meta.icon" :is-custom-svg="item.meta.isCustomSvg" />
              {{ translate(item.meta.title) }}
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
      <vab-breadcrumb v-else class="hidden-xs-only hidden-md-and-down" />
    </div>

    <div class="right-panel">
      <vab-right-tools />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openFirstMenu } from '/@/config'
import { translate } from '/@/i18n'
import { useRoutesStore } from '/@/store/modules/routes'
import { useSettingsStore } from '/@/store/modules/settings'
import { isExternal } from '/@/utils/validate'

defineOptions({
  name: 'VabNav',
})

const props = defineProps({
  layout: {
    type: String,
    default: '',
  },
})

const router = useRouter()
const routesStore = useRoutesStore()
const { getTab: tab, getTabMenu: tabMenu, getRoutes: routes } = storeToRefs(routesStore)
const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)

const handleTabClick = () => {
  nextTick(() => {
    if (isExternal(tabMenu.value.path)) {
      window.open(tabMenu.value.path)
      router.push('/redirect')
    } else if (openFirstMenu) router.push(tabMenu.value.redirect || tabMenu.value)
  })
}

watch(
  () => props.layout,
  (val) => {
    if (val === 'comprehensive') {
      theme.value.fixedHeader = true
    }
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss">
.vab-layout-comprehensive {
  .vab-side-bar {
    top: var(--el-nav-height) !important;
    padding-top: 0 !important;

    .el-scrollbar__view {
      margin-top: calc(0px - var(--el-nav-height) + var(--el-margin) / 2) !important ;
    }
  }
  .comprehensive-tabs {
    width: calc(100vw - var(--el-left-menu-width) - 635px) !important;
  }

  &:has(.is-collapse) {
    .fixed-header:has(.vab-nav-comprehensive) {
      .vab-tabs {
        width: calc(100vw - var(--el-left-menu-width-min)) !important;
        margin-left: var(--el-left-menu-width-min) !important;
        border-bottom: 1px solid var(--el-border-color) !important;
      }
    }
  }

  .fixed-header:has(.vab-nav-comprehensive) {
    z-index: calc(var(--el-z-index) + 10) !important;
    width: 100vw !important;
    border-bottom: 0 !important;

    .vab-nav-comprehensive {
      border-bottom: 1px solid var(--el-border-color);
    }

    .vab-logo {
      --el-title-color: var(--el-color-black);
      width: calc(var(--el-left-menu-width) - var(--el-padding));
    }

    .vab-tabs {
      width: calc(100vw - var(--el-left-menu-width)) !important;
      margin-left: var(--el-left-menu-width) !important;
      border-top: 0 !important;
      border-bottom: 1px solid var(--el-border-color) !important;
    }

    .comprehensive-tabs {
      .el-tabs__item {
        padding: 0 15px;
      }
      .el-tabs__nav-next,
      .el-tabs__nav-prev {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.vab-nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: var(--el-nav-height);
  padding-right: var(--el-padding);
  padding-left: var(--el-padding);
  overflow: hidden;
  user-select: none;
  background: var(--el-color-white);
  border-bottom: 1px solid var(--el-border-color);

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: var(--el-nav-height);

    :deep() {
      .fold-unfold {
        margin-right: var(--el-margin);
      }

      .el-tabs {
        width: 100%;
        margin-left: 0;

        .el-tabs__header {
          margin: 0;

          > .el-tabs__nav-wrap {
            display: flex;
            align-items: center;

            .el-icon-arrow-left,
            .el-icon-arrow-right {
              font-weight: 600;
              color: var(--el-color-grey);
            }
          }
        }

        .el-tabs__item {
          > div {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }
      }

      .el-tabs__nav-wrap::after {
        display: none;
      }
    }
  }

  .right-panel {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    height: var(--el-nav-height);
    transition: var(--el-transition);

    :deep() {
      [class*='ri-'] {
        margin-left: var(--el-margin);
        color: var(--el-color-grey);
        cursor: pointer;
      }

      button {
        [class*='ri-'] {
          margin-left: 0;
          color: var(--el-color-white);
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .right-panel {
      :deep() {
        .el-badge,
        .ri-refresh-line {
          display: none;
        }
      }
    }
  }
}
</style>
