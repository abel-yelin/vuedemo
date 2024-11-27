<template>
  <vab-card class="version-information">
    <template #header>
      <vab-icon icon="information-line" />
      信息

      <el-tag class="card-header-tag">
        <span class="hidden-xs-only">当前版本：V{{ version }}</span>
        部署时间：{{ updateTime }}
      </el-tag>
    </template>
    <el-scrollbar>
      <table class="table">
        <tbody>
          <tr>
            <td>vite</td>
            <td>
              <span>{{ devDependencies['vite'] }}</span>
            </td>
            <td>typescript</td>
            <td>
              <span>{{ devDependencies['typescript'] }}</span>
            </td>
            <td>vue</td>
            <td>
              <span>{{ dependencies['vue'] }}</span>
            </td>
            <td>pinia</td>
            <td>
              <span>{{ dependencies['pinia'] }}</span>
            </td>
          </tr>
          <tr>
            <td>vue-router</td>
            <td>
              <span>{{ dependencies['vue-router'] }}</span>
            </td>
            <td>element-plus</td>
            <td>
              <span>{{ dependencies['element-plus'] }}</span>
            </td>
            <td>vueuse</td>
            <td>
              <span>{{ dependencies['@vueuse/core'] }}</span>
            </td>
            <td>axios</td>
            <td>
              <span>{{ dependencies['axios'] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="version-information-rely">
        <el-button
          href="https://vuejs-core.cn/authorization/shop-vite.html"
          rel="noopener noreferrer"
          tag="a"
          target="_blank"
          type="primary"
        >
          <vab-icon icon="vip-diamond-line" />
          <span>shop-vite ￥1899</span>
        </el-button>
        <el-button href="https://vuejs-core.cn/admin-plus" rel="noopener noreferrer" tag="a" target="_blank" type="warning">
          <vab-icon icon="vip-diamond-line" />
          <span>admin-plus ￥799</span>
        </el-button>
      </div>
    </el-scrollbar>
  </vab-card>
</template>

<script lang="ts" setup>
import { dependencies, devDependencies, version } from '~/package.json'

const updateTime = import.meta.env.VITE_APP_UPDATE_TIME
</script>

<style lang="scss" scoped>
.version-information {
  &-rely {
    min-width: 500px;
    margin-top: var(--el-margin);
    text-align: left;
    border-radius: var(--el-border-radius-base);

    :deep() {
      .el-button {
        margin-bottom: 0;
      }
    }
  }

  .table {
    width: 100%;
    color: var(--el-color-grey);
    border-collapse: collapse;
    background-color: var(--el-color-white);

    td {
      position: relative;
      padding: 12px 15px !important;
      overflow: hidden;
      font-size: var(--el-font-size-base);
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid var(--el-border-color);

      &:nth-child(odd) {
        width: 10%;
        font-weight: bold;
        color: var(--el-color-grey);
        text-align: right;
        background-color: var(--el-color-white);

        span {
          margin-left: 10px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
