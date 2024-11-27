<template>
  <div class="chat-GPT-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="14" :md="24" :sm="24" :xl="14" :xs="24">
        <vab-card>
          <div class="vab-chat-main">
            <el-radio-group v-model="radio" @change="changeGPT">
              <el-radio-button label="GPT3.5" value="GPT3.5" />
              <el-radio-button label="GPT4.0" value="GPT4.0" />
            </el-radio-group>
            <el-scrollbar ref="scrollbarRef">
              <ul ref="innerRef">
                <template v-for="(item, index) in list" :key="index">
                  <li :class="item.type == 'mine' ? 'vab-chat-mine' : ''">
                    <div class="vab-chat-user">
                      <img alt="头像" :src="item.avatar" />
                      <cite>
                        {{ item.username }}
                        <i>{{ item.time }}</i>
                      </cite>
                    </div>
                    <div class="vab-chat-text">
                      <span v-if="item.type == 'mine' || item.type == 'tips'">
                        {{ item.result }}
                      </span>
                      <span v-if="item.type == 'he'" :id="item.id"></span>
                    </div>
                  </li>
                </template>
              </ul>
            </el-scrollbar>
          </div>
          <div class="vab-chat-footer">
            <div class="vab-chat-textarea">
              <el-input
                ref="textareaRef"
                v-model="value"
                clearable
                resize="none"
                show-word-limit
                type="textarea"
                @keydown.enter="send"
                @keydown.enter.prevent
              />
            </div>
            <div class="vab-chat-send">
              <el-button :loading="loading" type="primary" @click="send">发送</el-button>
            </div>
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ElScrollbar } from 'element-plus'
import { uniqueId } from 'lodash-es'
import TypeIt from 'typeit'
import avatarUrl from '/@/assets/chatGPT_images/chatGPT.png'
import { useUserStore } from '/@/store/modules/user'

defineOptions({
  name: 'ChatGPT',
})

const userStore = useUserStore()
const { avatar, username } = storeToRefs(userStore)
const value = ref<string>('')
const textareaRef = ref<any>()
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const finish = ref<boolean>(true)

const radio = ref<string>('GPT3.5')
const url = ref<string>('https://fc-mp-851edf02-46eb-43e6-828d-64c7e483ea41.next.bspapp.com/chatGPT?version=gpt-3.5-turbo&text=')

const loading = ref<boolean>(false)
let timer: ReturnType<typeof setInterval>
const result =
  '\u0053\u0068\u006f\u0070\u0020\u0056\u0069\u0074\u0065\u0020\u6f14\u793a\u5730\u5740\u4ec5\u63d0\u4f9b\u0020\u0043\u0068\u0061\u0074\u0047\u0050\u0054\u0020\u57fa\u7840\u80fd\u529b\u5c55\u793a\uff0c\u5982\u9700\u83b7\u53d6\u0020\u0043\u0068\u0061\u0074\u0047\u0050\u0054\u0020\u5b8c\u6574\u529f\u80fd\u8bf7\u8bbf\u95ee\u0020\u004f\u0070\u0065\u006e\u0020\u0041\u0049\u0020\u5b98\u7f51\u81ea\u884c\u8d2d\u4e70\u5bf9\u63a5\uff0c\u60a8\u73b0\u5728\u53ef\u4ee5\u8ddf\u6211\u5bf9\u8bdd\u4e86'

const changeGPT = (value: any) => {
  if (value == 'GPT3.5')
    url.value = 'https://fc-mp-851edf02-46eb-43e6-828d-64c7e483ea41.next.bspapp.com/chatGPT?version=gpt-3.5-turbo&text='
  if (value == 'GPT4.0') url.value = 'https://fc-mp-851edf02-46eb-43e6-828d-64c7e483ea41.next.bspapp.com/chatGPT?version=gpt-4&text='
  $baseMessage(`切换${value}成功！`, 'success', 'hey')
}

const list = ref<any>([
  {
    id: 'uuid_9999',
    type: 'he',
    result,
    avatar: avatarUrl,
    username: 'ChatGPT',
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  },
])

const send = () => {
  loading.value = true
  if (!value.value) {
    $baseMessage('提交内容不能为空', 'error', 'hey')
    loading.value = false
    return
  }
  if (!finish.value) {
    $baseMessage(`${radio.value}还未回答` + `完您的上个问题，请稍` + `后再进行提问`, 'error', 'hey')
    loading.value = false
    return
  }
  if (finish.value) {
    finish.value = false
    const newList = list.value
    const id = uniqueId('uuid_')
    newList.push(
      {
        type: 'mine',
        result: value.value,
        avatar,
        username,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        type: 'tips',
        result: `${radio.value} AI 内` + `容生成中，请稍后。。。`,
        avatar: avatarUrl,
        username: 'ChatGPT',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }
    )
    axios
      .get(`${url.value}${value.value}`)
      .then(async ({ data: { result } }) => {
        value.value = ''
        await newList.pop()
        await newList.push({
          id,
          type: 'he',
          result: result.displayText,
          avatar: avatarUrl,
          username: 'ChatGPT',
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
        await typeWriting(id, result.displayText)
        finish.value = true
        loading.value = false
      })
      .catch(() => {
        $baseMessage(`${radio.value} 余额不足！`, 'error', 'hey')
        finish.value = true
        loading.value = false
      })
  }
}

const typeWriting = (id: string, answer: string) => {
  setTimeout(() => {
    new (TypeIt as any)(`#${id}`, {
      strings: [answer],
      cursorChar: "<span class='cursorChar'>|<span>", //用于光标的字符。HTML也可以
      speed: 25,
      lifeLike: true, // 使打字速度不规则
      cursor: false, //在字符串末尾显示闪烁的光标
      breakLines: false, // 控制是将多个字符串打印在彼此之上，还是删除这些字符串并相互替换
      loop: false, //是否循环
    }).go()
  }, 0)
}

onMounted(() => {
  textareaRef.value.focus()
  typeWriting('uuid_9999', result)
})

onActivated(() => {
  timer = setInterval(() => {
    if (scrollbarRef.value && innerRef.value) scrollbarRef.value.setScrollTop(innerRef.value.clientHeight - 380)
  }, 500)
})

onDeactivated(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
$color_1: var(--el-color-grey);
$color_2: var(--el-color-grey);
$color_3: var(--el-color-primary);
$color_4: var(--el-color-white);
$background-color_1: var(--el-border-color);
$background-color_2: var(--el-color-grey);
$background-color_3: var(--el-color-primary);
$border-color_1: var(--el-border-color) transparent transparent;
$border-top-color_1: var(--el-color-primary);

.chat-GPT-container {
  box-sizing: border-box;

  :deep(.el-card__body) {
    position: relative;
    height: calc(var(--el-container-height) - 2px);
  }

  .vab-chat-main {
    height: calc(var(--el-container-height) - 255px);

    ul {
      padding: 5px 25px 15px 5px;

      li {
        position: relative;
        min-height: 68px;
        padding-left: 60px;
        margin-bottom: 10px;
        font-size: 0;
      }

      .vab-chat-text {
        position: relative;
        display: inline-block;
        max-width: 100%;
        min-height: 38px;
        padding: 8px 15px;
        margin-top: 20px;
        font-size: 14px;
        line-height: 22px;
        color: $color_2;
        word-break: break-all;
        vertical-align: top;
        background-color: $background-color_1;
        border-radius: var(--el-border-radius-base);

        &:after {
          position: absolute;
          top: 13px;
          left: -10px;
          width: 0;
          height: 0;
          overflow: hidden;
          content: '';
          border-color: $border-color_1;
          border-style: solid dashed dashed;
          border-width: 10px;
        }

        a {
          color: $color_3;
        }

        img {
          max-width: 100%;
          vertical-align: middle;
        }
      }

      .vab-chat-user {
        position: absolute;
        left: 3px;
        display: inline-block;
        font-size: 14px;
        vertical-align: top;

        img {
          width: 45px;
          height: 45px;
          padding: 8px;
          background-color: var(--el-color-primary-light-9);
          border-radius: 100%;
        }

        cite {
          position: absolute;
          top: -5px;
          left: 60px;
          width: 180px;
          font-size: var(--el-font-size-extra-small);
          font-style: normal;
          line-height: 24px;
          color: $color_1;
          text-align: left;
          white-space: nowrap;

          i {
            padding-left: 5px;
            font-style: normal;
          }
        }
      }

      .vab-chat-mine {
        padding-right: 60px;
        padding-left: 0;
        text-align: right;

        .vab-chat-user {
          right: 3px;
          left: auto;

          cite {
            right: 60px;
            left: auto;
            text-align: right;

            i {
              padding-right: 5px;
              padding-left: 0;
            }
          }
        }

        .vab-chat-text {
          margin-left: 0;
          color: $color_4;
          text-align: left;
          background-color: $background-color_3;

          &:after {
            right: -10px;
            left: auto;
            border-top-color: $border-top-color_1;
          }

          a {
            color: $color_4;
          }
        }
      }
    }
  }

  .vab-chat-footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    height: 150px;
    padding-right: 40px;

    :deep(textarea) {
      height: 110px;
    }

    .vab-chat-send {
      position: absolute;
      right: 40px;
      margin-top: 15px;
    }
  }
}
</style>
