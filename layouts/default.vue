<script lang="ts" setup>

const isLoaded = ref(false);
const showAside = ref(false);
const showHeader = ref(true);

const toggleAside = () => {
  showAside.value = !showAside.value;
};

if (process.client) {
  const screenWidth = ref(window.innerWidth);
  watchEffect(() => {
    if (screenWidth.value < 512) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
  });
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
}


onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <el-config-provider>
    <div class="common-layout" v-if="isLoaded">
      <el-container>
        <el-header v-show="showHeader">
          <BaseHeader @toggle-aside="toggleAside" />
        </el-header>
        <el-container>
          <el-aside v-if="showAside">
            <BaseSide />
          </el-aside>
          <el-container>
            <el-main>
              <slot />
            </el-main>
            <el-footer>
              <el-row>
                <el-col :span="24">
                  <p></p>
                </el-col>
              </el-row></el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>

    <div class="loading-spinner-wrapper" v-else>
      <div class="loading-spinner"></div>
    </div>
  </el-config-provider>
</template>


<style>
.common-layout {
  color: var(--ep-text-color-primary);
}

.loading-spinner-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  /* 在水平方向上居中 */
  align-items: center;
  /* 在垂直方向上居中 */
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  /* 圆形边框颜色 */
  border-top: 4px solid #3498db;
  /* 圆形顶部颜色 */
  border-radius: 50%;
  /* 圆形边框半径（使其变成圆形） */
  width: 30px;
  /* 圆形宽度 */
  height: 30px;
  /* 圆形高度 */
  animation: spin 1s linear infinite;
  /* 动画属性 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg)
  }

  /* 开始状态：旋转角度为 0 */
  100% {
    transform: rotate(360deg)
  }

  /* 结束状态：旋转角度为 360，即一整圈 */
}</style>
