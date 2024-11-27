<template>
  <div class="permission-container">
    <vab-alert v-if="showAlert" :title="tips" type="error" />
    <vab-alert
      v-if="!loginInterception"
      title="检测到您当前的登录拦截已关闭，无法模拟切换角色功能，请在src/config/setting.config.js中配置loginInterception为true，开启登录拦截"
      type="error"
    />
    <vab-alert
      :title="`当前路由模式为：${authentication === 'all' ? '后端路由' : '前端路由'} ，是否开启前端角色权限控制：${
        rolesControl === true ? '是' : '否'
      }`"
    />

    <el-form label-position="top" :model="form">
      <el-form-item label="账号切换">
        <el-radio-group v-model="form.account" @change="handleChangeRole">
          <el-radio-button id="vsv-admin" label="admin" value="admin">admin</el-radio-button>
          <el-radio-button label="editor" value="editor">editor</el-radio-button>
          <el-radio-button label="test" value="test">test</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="token续期（每隔5s可刷新token）">
        <el-button type="primary" @click="handleRefreshToken">刷新token</el-button>
      </el-form-item>
      <el-form-item label="当前账号">
        <el-descriptions border :column="3" direction="vertical">
          <el-descriptions-item>
            <template #label>角色</template>
            <el-tag>{{ JSON.stringify(role) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>权限点</template>
            <el-tag>{{ JSON.stringify(permission) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>token</template>
            <el-tag>{{ token }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-form-item>
      <el-form-item label="RBAC 角色控制">
        <el-space wrap>
          <el-button v-permissions="['Admin']" type="primary">拥有["Admin"]的按钮</el-button>
          <el-button v-permissions="{ role: ['Admin'], mode: 'except' }" type="danger">未拥有["Admin"]的按钮</el-button>
          <el-button v-permissions="['Editor']" type="primary">拥有["Editor"]的按钮</el-button>
          <el-button v-permissions="{ role: ['Editor'], mode: 'except' }" type="danger">未拥有["Editor"]的按钮</el-button>
          <el-button v-permissions="{ role: ['Admin', 'Editor'], mode: 'allOf' }" type="primary">
            同时拥有["Admin","Editor"]的按钮
          </el-button>
          <el-button v-permissions="['Test']" type="primary">拥有["Test"]的按钮</el-button>
        </el-space>
      </el-form-item>
      <!--  注意其中:后面的单词为你要控制页面权限的页面name，这样可以区分到具体页面 -->
      <el-form-item label="RBAC 权限点控制">
        <el-space wrap>
          <el-button v-permissions="{ permission: ['read:system'] }" type="primary">拥有["read:system"]的按钮</el-button>
          <el-button v-permissions="{ permission: ['read:system'], mode: 'except' }" type="danger">未拥有["'read:system'"]的按钮</el-button>
          <el-button v-permissions="{ permission: ['write:system'] }" type="primary">拥有["write:system"]的按钮</el-button>
          <el-button v-permissions="{ permission: ['write:system'], mode: 'except' }" type="danger">未拥有["write:system"]的按钮</el-button>
          <el-button v-permissions="{ permission: ['delete:system'] }" type="primary">拥有["delete:system"]的按钮</el-button>
          <el-button v-permissions="{ permission: ['delete:system'], mode: 'except' }" type="danger">
            未拥有["delete:system"]的按钮
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item label="RBAC 角色&权限点控制">
        <el-space wrap>
          <el-button v-permissions="{ role: ['Admin'], permission: ['delete:system'] }" type="primary">
            拥有["Admin"]或["delete:system"]的按钮
          </el-button>
          <el-button
            v-permissions="{
              role: ['Editor'],
              permission: ['read:system'],
              mode: 'allOf',
            }"
            type="primary"
          >
            拥有["Editor"]和["read:system"]的按钮
          </el-button>
          <el-button
            v-permissions="{
              role: ['Admin'],
              permission: ['delete:system'],
              mode: 'except',
            }"
            type="danger"
          >
            未拥有["Admin"]和["delete:system"]的按钮
          </el-button>
        </el-space>
      </el-form-item>

      <el-form-item label="RBAC 自定义按钮&表格列权限控制">
        <!-- hasPermission()是更加底层的方法，它可以使用 v-permissions 自定义指令中的所有格式的参数，非必要不建议使用，表格列隐藏展示可能用到下述代码 -->
        <el-button v-if="hasPermission(['Admin'])" type="primary">拥有["Admin"]的按钮</el-button>
        <el-button v-if="hasPermission({ role: ['Admin'], mode: 'except' })" type="danger">未拥有["Admin"]的按钮</el-button>
        <el-table border :data="tableData" style="display: block; margin-top: var(--el-margin)">
          <el-table-column v-if="hasPermission(['Admin'])" label="拥有['Admin']的表格列" prop="yes" />
          <el-table-column v-if="hasPermission({ role: ['Admin'], mode: 'except' })" label="未拥有['Admin']的表格列" prop="no" />
        </el-table>
      </el-form-item>
      <el-form-item label="后端code指令强制开启锁屏">
        <el-button type="primary" @click="handleLock">点击锁屏</el-button>
      </el-form-item>
    </el-form>
    <el-tour v-model="open" :type="type">
      <el-tour-step v-for="step in steps" :key="step" :description="step.description" :target="step.target" :title="step.title" />
    </el-tour>
  </div>
</template>

<script lang="ts" setup>
import { expireToken } from '/@/api/refreshToken'
import { lock } from '/@/api/user'
import { authentication, loginInterception, rolesControl, tokenTableName } from '/@/config'
import { useAclStore } from '/@/store/modules/acl'
import { useUserStore } from '/@/store/modules/user'
import { uuid } from '/@/utils'
import { hasPermission } from '/@/utils/permission'

defineOptions({
  name: 'Permission',
})

const aclStore = useAclStore()
const { role, permission } = storeToRefs(aclStore)
const userStore = useUserStore()
const { username, token } = storeToRefs(userStore)
const form = reactive<any>({ account: username.value })
const showAlert = ref<boolean>(false)
const tableData = [
  {
    yes: 'yes-1',
    no: 'no-1',
  },
  {
    yes: 'yes-2',
    no: 'no-2',
  },
]
const tips = ref<string>('当前登录的账号非admin，如需查看演示地址全部功能，请使用admin账号登录。')
const open = ref<boolean>(false)
const type = ref<any>('primary')
const steps = ref<any>([
  {
    target: '#vsv-admin',
    title: '切换账号',
    description: tips.value,
  },
])

const handleOpen = () => {
  open.value = true
}

const handleChangeRole = async () => {
  $baseLoading('正在切换账号请稍后...')
  await localStorage.setItem(tokenTableName, `${form.account}-token-${uuid()}-${Date.now()}`)
  //@ts-ignore
  await location.reload(true)
}

const handleRefreshToken = async () => {
  await expireToken()
}

const handleLock = async () => {
  await lock()
}

watch(token, (value) => {
  $baseMessage(`token：${value}，刷新成功！`, 'success', 'hey')
})

onActivated(() => {
  if (username.value !== 'admin') {
    showAlert.value = true
    handleOpen()
  }
})
</script>
