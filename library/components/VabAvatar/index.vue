<template>
  <el-popover
    v-model:visible="visible"
    class="vab-avatar"
    popper-class="vab-avatar-popper"
    width="188"
    @hide="handleShow"
    @show="handleHide"
  >
    <template #reference>
      <div class="avatar-dropdown">
        <el-avatar class="user-avatar" :src="avatar" />
        <div class="username">
          <span class="hidden-xs-only">{{ username }}</span>
          <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': active }" icon="arrow-down-s-line" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="avatar-dropdown" @click="handleCommand('personalCenter')">
        <el-avatar class="user-avatar" :src="avatar" />
        <div class="username">
          <div>{{ username }}</div>
          <div class="personal-center">
            <el-text size="small" type="info">个人中心</el-text>
          </div>
        </div>
      </div>
      <el-divider />
      <ul class="el-dropdown-menu">
        <li class="el-dropdown-menu__item" @click="handleCommand('changeLog')">
          <vab-icon icon="file-word-line" />
          <span>{{ translate('更新日志') }}</span>
          <el-tag effect="dark" size="small" type="danger">99+</el-tag>
        </li>
        <li class="el-dropdown-menu__item" @click="handleCommand('dataScreen')">
          <vab-icon icon="database-2-line" />
          <span>{{ translate('数据大屏') }}</span>
        </li>
        <li class="el-dropdown-menu__item" @click="handleCommand('portal')">
          <vab-icon icon="building-line" />
          <span>{{ translate('门户') }}</span>
        </li>
        <li class="el-dropdown-menu__item" @click="handleCommand('book')">
          <vab-icon icon="book-2-line" />
          <span>{{ translate('文档') }}</span>
        </li>
        <li class="el-dropdown-menu__item" @click="handleCommand('logout')">
          <vab-icon icon="logout-circle-r-line" />
          <span>{{ translate('退出登录') }}</span>
        </li>
      </ul>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { translate } from '/@/i18n'
import { useUserStore } from '/@/store/modules/user'
import { toLoginRoute } from '/@/utils/routes'

defineOptions({
  name: 'VabAvatar',
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { avatar, username } = storeToRefs(userStore)
const { logout } = userStore
const active = ref<boolean>(false)
const visible = ref<boolean>(false)

const handleShow = () => {
  active.value = false
}

const handleHide = () => {
  active.value = true
}

const handleCommand = async (command: any) => {
  switch (command) {
    case 'logout': {
      await logout()
      await router.push(toLoginRoute(route.fullPath))
      visible.value = false
      break
    }
    case 'personalCenter': {
      await router.push('/setting/personalCenter')
      visible.value = false
      break
    }
    case 'changeLog': {
      await router.push('/changeLog')
      visible.value = false
      break
    }
    case 'portal': {
      await window.open('#/portal')
      visible.value = false
      break
    }
    case 'dataScreen': {
      await window.open('#/dataScreen')
      visible.value = false
      break
    }
    case 'book': {
      $baseAlert(
        '已购买用户请前往群公告中获取，购买地址：<a target="_blank" href="https://vuejs-core.cn/authorization/shop-vite.html">https://vuejs-core.cn/authorization/shop-vite.html</a>'
      )
      visible.value = false
      break
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  .user-avatar {
    position: relative;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    padding: 8px;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 50%;

    &::after {
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 7px;
      height: 7px;
      content: '';
      background: var(--el-color-success);
      border: 3px solid var(--el-color-white);
      border-radius: 50%;
    }
  }

  .username {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    width: max-content;
    height: 40px;
    margin-left: 6px;
    line-height: 40px;
    cursor: pointer;

    [class*='ri-'] {
      margin-left: 0 !important;
    }
  }
}
</style>
<style lang="scss">
.vab-avatar-popper {
  padding: 0 !important;

  .avatar-dropdown {
    display: flex;
    flex: 1;
    justify-content: start !important;
    padding: calc(var(--el-padding) / 1.5);

    .user-avatar {
      margin-left: calc(var(--el-margin) / 2) calc(var(--el-margin) / 2) calc(var(--el-margin) / 2) 0 !important;
    }

    .username {
      display: flex;
      flex-wrap: wrap;
      line-height: 20px;

      .personal-center {
        width: 100%;
        font-size: var(--el-font-size-small);
        color: var(--el-color-grey);
      }
    }
  }

  .el-dropdown-menu {
    position: relative;
    padding: calc(var(--el-padding) / 2);

    &__item {
      .el-tag {
        position: absolute;
        right: 17.5px;
      }
    }

    &__item:hover {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
      border-radius: var(--el-border-radius-base);
    }
  }

  .el-divider--horizontal {
    margin: 0;
  }
}
</style>
