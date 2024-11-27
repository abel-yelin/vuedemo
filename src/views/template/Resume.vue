<template>
  <div class="resume-container no-background-container">
    <div class="resume-box">
      <div class="resume-left">
        <img alt="" class="user-avatar" :src="avatar" />
        <div class="content">
          <ul>
            <li>
              <strong>姓名：</strong>
              {{ name }}
            </li>
            <li>
              <strong>性别：</strong>
              {{ gender }}
            </li>
            <li>
              <strong>年龄：</strong>
              {{ age }}
            </li>
            <li>
              <strong>职业：</strong>
              {{ occupation }}
            </li>
            <li>
              <strong>电话：</strong>
              {{ phoneNumber }}
            </li>
          </ul>
        </div>
      </div>
      <div class="resume-right">
        <div class="header">
          <h3>基本信息</h3>
        </div>
        <div class="content">
          <ul>
            <li>
              <strong>姓名：</strong>
              {{ name }}
            </li>
            <li>
              <strong>性别：</strong>
              {{ gender }}
            </li>
            <li>
              <strong>年龄：</strong>
              {{ age }}
            </li>
            <li>
              <strong>职业：</strong>
              {{ occupation }}
            </li>
            <li>
              <strong>邮箱：</strong>
              {{ email }}
            </li>
            <li>
              <strong>电话：</strong>
              {{ phoneNumber }}
            </li>
          </ul>
        </div>
        <div class="header">
          <h3>教育经历</h3>
        </div>
        <div class="content">
          <ul>
            <li v-for="education in educations" :key="education.id">
              <strong>{{ education.school }}</strong>
              <p>{{ education.degree }} - {{ education.major }}</p>
              <p>{{ education.duration }}</p>
            </li>
          </ul>
        </div>
        <div class="header">
          <h3>工作经历</h3>
        </div>
        <div class="content">
          <ul>
            <li v-for="experience in experiences" :key="experience.id">
              <strong>{{ experience.company }}</strong>
              <p>{{ experience.position }}</p>
              <p>{{ experience.duration }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import avatar from '/@/assets/avatar.svg'

const name = ref<string>('张三')
const gender = ref<string>('男')
const age = ref<any>(25)
const occupation = ref<string>('前端工程师')
const email = ref<string>('zhangsan@example.com')
const phoneNumber = ref<string>('123456789')

const educations = ref<any>([
  {
    id: 1,
    school: '大学A',
    degree: '本科',
    major: '计算机科学',
    duration: '2015 - 2019',
  },
  {
    id: 2,
    school: '大学B',
    degree: '硕士',
    major: '软件工程',
    duration: '2019 - 2021',
  },
])

const experiences = ref<any>([
  {
    id: 1,
    company: '公司A',
    position: '前端工程师',
    duration: '2021 - 现在',
  },
  {
    id: 2,
    company: '公司B',
    position: '前端工程师',
    duration: '2019 - 2021',
  },
  {
    id: 3,
    company: '公司C',
    position: '前端工程师',
    duration: '2017 - 2019',
  },
])
</script>

<style lang="scss" scoped>
.resume-container {
  @media (max-width: 768px) {
    .resume-box {
      flex-direction: column !important;
    }
    .resume-left {
      text-align: center;
    }

    .resume-right {
      margin-top: 15px;
      margin-left: 0 !important;
    }
  }

  .resume-box {
    display: flex;
    flex-direction: row;
    max-width: 800px;
    margin-bottom: var(--el-margin);

    .resume-left {
      flex: 1;
      flex-basis: 30%;
      background: linear-gradient(to top, var(--el-color-primary), var(--el-color-primary-light-3));
      border-radius: var(--el-border-radius-base);

      .user-avatar {
        display: block;
        width: 100px;
        height: 100px;
        padding: var(--el-padding);
        margin: 40px auto 20px auto;
        cursor: pointer;
        background: var(--el-color-white);
        border-radius: 50%;
      }

      .content {
        padding: 30px;
        color: var(--el-color-white);

        ul {
          padding-left: 0;
          list-style-type: none;

          li {
            margin-bottom: 10px;
            line-height: 22px;

            strong {
              display: inline-block;
              width: 60px;
              font-weight: bold;
            }
          }
        }
      }
    }

    .resume-right {
      flex: 1;
      flex-basis: 70%;
      padding: var(--el-padding);
      margin-left: 15px;
      background: var(--el-color-white);
      border: 1px solid var(--el-border-color) !important;
      border-radius: var(--el-border-radius-base);

      .header {
        padding: 10px 10px 0 5px;
        border-bottom: 5px solid var(--el-color-primary);

        h3 {
          line-height: 0;
        }
      }

      .content {
        padding: 10px;

        ul {
          padding-left: 0;
          list-style-type: none;

          li {
            margin-bottom: 10px;

            strong {
              display: inline-block;
              width: 60px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
