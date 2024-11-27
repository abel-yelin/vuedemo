<template>
  <el-row>
    <el-col :span="24">
      <div class="data-screen-header hidden-xs-only">
        <vab-link target="_blank" to="/index">
          <div class="data-go-home">
            <vab-icon icon="home-2-line" />
          </div>
        </vab-link>
        <span>Vue Shop Vite 数据大屏</span>
        <vab-fullscreen class="data-fullscreen" />
      </div>

      <div class="data-screen-header hidden-sm-and-up mobile-only">
        <vab-link target="_blank" to="/index">
          <div class="data-go-home">
            <vab-icon icon="home-2-line" />
          </div>
        </vab-link>
        <div class="mobile-title">数据大屏</div>
        <vab-fullscreen class="data-fullscreen" />
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
@keyframes flare {
  0% {
    background-position: -400px;
  }

  30% {
    background-position: 0;
  }

  100% {
    background-position: 400px;
    opacity: 0;
  }
}

.data-screen-header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
  background: url('/@/assets/data_screen_images/bgtop.png') no-repeat;
  background-size: 100% 100%;

  .data-go-home,
  .data-fullscreen {
    position: fixed;
    top: 13px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: #395dfe;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 #395dfe;

    :deep() {
      [class*='ri-'] {
        font-size: var(--el-font-size-extra-large);
        color: #fff;
      }
    }
  }

  .data-go-home {
    left: 40px;
  }

  .data-fullscreen {
    right: 40px;
  }

  span {
    position: relative;
    font-size: 30px;
    font-weight: bold;
    color: #33e6fa;
    background: linear-gradient(-90deg, #7cedfb 0%, #2ba3ff 0%, #02efff 50.2685546875%, #2ea5f9 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

    &::before {
      position: absolute;
      left: 0;
      display: block;
      width: 100%;
      color: #fff;
      content: 'Vue Shop Vite 数据大屏';
      background-image: linear-gradient(
        65deg,
        transparent 10%,
        rgba(255, 255, 255, 1) 20%,
        rgba(255, 255, 255, 1) 27.5%,
        transparent 30%,
        transparent 100%
      );
      background-clip: text;
      animation: flare 3s infinite;
    }

    &::after {
      position: absolute;
      top: 0;
      z-index: -1;
      display: block;
      color: #fff;
      content: 'Vue Shop Vite 数据大屏';
    }
  }

  &.mobile-only {
    .data-fullscreen,
    .data-go-home {
      width: 40px;
      height: 40px;
    }

    .mobile-title {
      position: relative;
      font-size: var(--el-font-size-extra-large);
      font-weight: bold;
      color: #33e6fa;
      background: linear-gradient(-90deg, #7cedfb 0%, #2ba3ff 0%, #02efff 50.2685546875%, #2ea5f9 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        left: 0;
        display: block;
        width: 100%;
        color: #fff;
        content: '数据大屏';
        background-image: linear-gradient(
          65deg,
          transparent 10%,
          rgba(255, 255, 255, 1) 20%,
          rgba(255, 255, 255, 1) 27.5%,
          transparent 30%,
          transparent 100%
        );
        background-clip: text;
        animation: flare 3s infinite;
      }

      &::after {
        position: absolute;
        top: 0;
        z-index: -1;
        display: block;
        color: #fff;
        content: '数据大屏';
      }
    }
  }
}
</style>
