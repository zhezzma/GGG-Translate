<script lang="ts" setup>

const activeIndex = ref('')
// 声明触发的事件
const emit = defineEmits(['toggle-aside'])

const handleSelect = (key: string, keyPath: string[]) => {
  if (key == "logo") {
    // emit('toggle-aside')
  }
  else if (key == "dark") {
  }
  else if (key == "setting") {
    drawer.value = true;
  }
}
const drawer = ref(false)
const drawerSize = computed(() => window.innerWidth < 400 ? window.innerWidth : 400);

const settings = useAPISettingsStore();
const appConfig = useAppConfig();
const translateDict: Record<string, any> = {};

for (let i = 0; i < appConfig.translates.length; i++) {
  const obj = appConfig.translates[i];
  translateDict[obj.name] = obj;
}

const toUpperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

</script>

<template>
  <el-menu :default-active="activeIndex" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="logo">GGG翻译</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item h="full" index="dark">
      <DarkToggle>
        <template #default="{ isDark }">
          <el-switch v-model="isDark.value" inline-prompt active-text="dark" inactive-text="light">
            {{ isDark.value ? "Dark" : "Light" }}
          </el-switch>
        </template>
      </DarkToggle>
    </el-menu-item>
    <el-menu-item h="full" index="setting">
      <el-icon class="cursor-pointer">
        <el-icon-setting />
      </el-icon>
    </el-menu-item>
  </el-menu>


  <ClientOnly>
    <el-drawer v-model="drawer" direction="rtl" :size="drawerSize">
      <template #header>
        <h4>设置</h4>
      </template>
      <template #default>
        <el-collapse accordion>
          <el-collapse-item v-for="(setting, key) in settings.$state" :key="key" :title="translateDict[key].label"
            :name="key">
            <el-form label-position="left" label-width="70px">
              <el-form-item v-for="(value, k) in setting" :key="k" :prop="k" :label="toUpperFirst(k)">
                <el-switch v-model="setting.enable" v-if="k === 'enable'" />
                <el-input v-model="setting[k]" v-else />
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </template>
      <template #footer>
        <div style="flex: auto">

        </div>
      </template>
    </el-drawer>
  </ClientOnly>
</template>



<style>
.flex-grow {
  flex-grow: 1;
}

.el-menu--horizontal>.el-menu-item {
  height: auto;
}
</style>
