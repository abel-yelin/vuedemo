<template>
  <div class="wang-editor-container">
    <toolbar :editor="editorRef" style="border-bottom: 1px solid var(--el-border-color)" />
    <editor v-model="html" class="wang-editor-content" :default-config="editorConfig" @on-created="handleCreated" />
    <div class="wang-editor-footer">
      <el-button type="primary" @click="handlePreview">预览</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <vab-dialog v-model="dialogVisible" append-to-body class="wang-editor-dialog" width="500px">
      <div v-html="html"></div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </template>
    </vab-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

defineOptions({
  name: 'WangEditor',
})

const dialogVisible = ref<any>(false)

const editorRef = shallowRef<IDomEditor | undefined>()
const html = ref<any>(
  '<h1>一级标题</h1><h2>二级标题</h2><h3>三级标题</h3><p>hello world ~~~ </p><blockquote>blockquote</blockquote><pre><code class="language-javascript">const a = 100;</code></pre><p><img src="https://gcore.jsdelivr.net/gh/zxwk1998/image/table/vab-image-1.jpg"/></p>'
)
const editorConfig = reactive<any>({
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '', // 您的服务器地址，注意：当前接口格式特殊与其他vab接口不同，请查看vip文档
      fieldName: 'vab-file-name',
      allowedFileTypes: ['image/*'],
      headers: {}, // 如需传递token请写到在这里
    },
  },
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

const handlePreview = () => {
  dialogVisible.value = true
}

const handleSave = () => {
  $baseMessage('模拟保存成功', 'success', 'hey')
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (!editor) return
  editor.destroy()
})
</script>

<style lang="scss">
.wang-editor-container {
  padding: 0 !important;
  margin: -19px -19px 19px -19px;
  overflow: hidden !important;
  background: var(--el-background-color) !important;
  border: 0 !important;

  &.w-e-full-screen-container {
    z-index: 9999 !important;
  }

  .w-e-bar-divider {
    display: none;
  }

  .w-e-toolbar-init {
    border-bottom: 1px solid var(--el-border-color) !important;
  }

  .wang-editor-content {
    width: 70%;
    min-height: calc(var(--el-container-height) - 110px) !important;
    margin: 20px auto 20px auto;
    background-color: var(--el-color-white);
    border: 0;
  }

  #w-e-textarea-1 {
    margin: var(--el-margin) !important;
  }

  .wang-editor-footer {
    width: 70%;
    margin: auto;
  }

  @media (max-width: 768px) {
    .wang-editor-title,
    .wang-editor-content,
    .wang-editor-footer {
      width: 90%;
    }
  }
}

.wang-editor-dialog {
  img {
    max-width: 100%;
  }
}
</style>
