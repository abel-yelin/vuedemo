<template>
  <div class="personal-center-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card class="auto-height-card">
          <div class="user-info">
            <el-avatar :size="100" :src="avatar" />
            <div class="user-info-full-name">
              {{ form.fullName }}
            </div>
            <div class="user-info-description">
              {{ form.description }}
            </div>
            <div class="user-info-follow">
              <el-button href="https://github.com/zxwk1998" rel="noopener noreferrer" round tag="a" target="_blank" type="primary">
                <vab-icon icon="group-line" />
                <span>Follow me</span>
              </el-button>
            </div>

            <ul class="user-info-list">
              <li>
                <vab-icon icon="user-3-line" />
                前端小白白
              </li>
              <li>
                <vab-icon icon="magic-line" />
                1992/8/11
              </li>
              <li>
                <vab-icon icon="women-line" />
                女
              </li>
              <li>
                <vab-icon icon="community-line" />
                集团 - 事业群 - 技术部
              </li>
              <li>
                <vab-icon icon="map-pin-2-line" />
                中国 • 广东省 • 深圳市
              </li>
              <li>
                <vab-icon icon="code-s-slash-line" />
                JavaScript、HTML、CSS、Vue、Node
              </li>
              <li>
                <vab-divider />
                <h5>个性标签</h5>
                <el-space wrap>
                  <el-tag v-for="tag in dynamicTags" :key="tag">
                    {{ tag }}
                  </el-tag>
                </el-space>
              </li>
            </ul>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <vab-card class="auto-height-card">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-col :lg="12" :md="16" :sm="24" :xl="12" :xs="24">
                <el-form label-position="top" :model="form" @submit.prevent>
                  <el-form-item label="姓名">
                    <el-input v-model="form.fullName" clearable />
                  </el-form-item>
                  <el-form-item label="昵称">
                    <el-input v-model="form.nickname" clearable />
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="form.sex" style="width: 100%">
                      <el-option label="保密" :value="0" />
                      <el-option label="男" :value="1" />
                      <el-option label="女" :value="2" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input v-model="form.description" clearable type="textarea" />
                  </el-form-item>
                  <el-form-item>
                    <template #label>
                      <div style="margin-bottom: 10px">标签</div>
                    </template>
                    <el-space wrap>
                      <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
                        {{ tag }}
                      </el-tag>
                      <el-input v-if="inputVisible" ref="inputRef" v-model="inputValue" size="small" @blur="handleInputConfirm" />
                      <el-button v-else size="small" @click="showInput">添加</el-button>
                    </el-space>
                  </el-form-item>
                  <el-form-item>
                    <el-button native-type="submit" type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-tab-pane>
            <el-tab-pane label="账号绑定" name="second">
              <div class="item">
                <vab-icon icon="qq-line" style="color: #3492ed" />
                <div class="item-content">
                  <div>绑定QQ</div>
                  <div class="item-content-second">当前未绑定绑定QQ账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
              <div class="item">
                <vab-icon icon="wechat-line" style="color: #4daf29" />
                <div class="item-content">
                  <div>绑定微信</div>
                  <div class="item-content-second">当前未绑定绑定微信账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
              <div class="item">
                <vab-icon icon="alipay-line" style="color: #1476fe" />
                <div class="item-content">
                  <div>绑定支付宝</div>
                  <div class="item-content-second">当前未绑定绑定支付宝账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
              <div class="item">
                <vab-icon icon="weibo-line" style="color: #ffd440" />
                <div class="item-content">
                  <div>绑定微博</div>
                  <div class="item-content-second">当前未绑定绑定微博账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
              <div class="item">
                <vab-icon icon="github-line" />
                <div class="item-content">
                  <div>绑定Github</div>
                  <div class="item-content-second">当前未绑定绑定Github账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
              <div class="item">
                <vab-icon icon="paypal-line" style="color: #012e85" />
                <div class="item-content">
                  <div>绑定Paypal</div>
                  <div class="item-content-second">当前未绑定绑定Paypal账号</div>
                </div>
                <el-link type="primary">更换绑定</el-link>
              </div>
              <vab-divider />
            </el-tab-pane>
          </el-tabs>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '/@/store/modules/user'

defineOptions({
  name: 'PersonalCenter',
})

const userStore = useUserStore()
const { avatar } = storeToRefs(userStore)

const _description = decodeURI(
  '\u5bcc\u5728\u672f\u6570\uff0c\u4e0d\u5728\u52b3\u8eab\uff1b\u5229\u5728\u52bf\u5c45\uff0c\u4e0d\u5728\u529b\u8015\u3002'
)

const activeName = ref<string>('first')

const form = reactive<any>({
  fullName: 'admin',
  nickname: 'good luck',
  sex: 2,
  description: _description,
})

const inputRef = ref<any>(null)
const dynamicTags = ref<any>(['腹黑', '怕麻烦', '小仙女', '仙气飘飘'])
const inputVisible = ref<boolean>(false)
const inputValue = ref<string>('')

const onSubmit = () => {
  $baseMessage('模拟保存成功', 'success', 'hey')
}

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.personal-center-container {
  .user-info {
    padding: var(--el-padding);
    text-align: center;

    :deep() {
      .el-avatar {
        img {
          padding: var(--el-padding);
          cursor: pointer;
        }
      }
    }

    &-full-name {
      margin-top: 15px;
      font-size: 24px;
      font-weight: 500;
      color: var(--el-color-grey);
    }

    &-description {
      margin-top: 8px;
    }

    &-follow {
      margin-top: 15px;
    }

    &-list {
      margin-top: 18px;
      line-height: 30px;
      text-align: left;
      list-style: none;

      h5 {
        margin: -20px 0 5px;
      }
    }
  }

  .item {
    display: flex;

    i {
      font-size: 40px;
    }

    &-content {
      box-sizing: border-box;
      flex: 1;
      margin-left: var(--el-margin);

      &-second {
        margin-top: 8px;
      }
    }
  }
}
</style>
