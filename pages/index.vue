<template>
  <el-row :gutter="20">
    <el-col :sm="12" :xs='24'>
      <div class="tool-bar">
        <el-select v-model="langFrom" filterable>
          <el-option v-for="(lang, index) in languageList" :key="index" :label="lang.name"
            :value="lang.default"></el-option>
        </el-select>

        <el-icon @click="swapLangs" class="border-none swap-button vertical-align-middle cursor-pointer">
          <ElIconSwitch />
        </el-icon>

        <el-select v-model="langTo" filterable>
          <el-option v-for="(lang, index) in languageList" :key="index" :label="lang.name"
            :value="lang.default"></el-option>
        </el-select>
      </div>

      <div class="source-text">
        <el-input v-model="sourceText.value" :rows="4" type="textarea" autofocus placeholder="请输入要翻译的文本"></el-input>
        <el-icon @click="cleanSourceText" class="border-none close-btn cursor-pointer">
          <ElIconClose />
        </el-icon>
      </div>
    </el-col>

    <el-col :sm="12" :xs='24'>
      <el-space size="large" fill direction="vertical" wrap style="width: 100%">
        <el-card class="box-card" v-for="(api, index) in enabledTranslates" :key="api.name">
          <template #header>
            <el-space class="card-header">
              <el-icon>
                <span v-html="api.icon"></span>
              </el-icon>
              <el-text size="default">{{ api.label }}</el-text>
            </el-space>
          </template>

          <div class="card-content">
            <el-text v-if="api.loading" type="primary" :class="{ 'is-loading': api.loading }">正在翻译中...</el-text>
            <el-text v-else-if="api.error" type="danger">{{ api.error }}</el-text>
            <el-text v-else>{{ api.result }}</el-text>
            <el-icon @click="copy(api.result)" class="border-none copy-btn cursor-pointer">
              <ElIconCopyDocument />
            </el-icon>
          </div>
        </el-card>
      </el-space>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { debounce } from "ts-debounce";
const appConfig = useAppConfig()

const store = useSettingsStore();
const sourceText = useInputHistoryStore();
const langFrom = ref("auto")
const langTo = ref('auto')

 

const languageList = appConfig.languages

let from = "zh";

sourceText.$subscribe((mutation, state) => {
  var newText = state.value.trim()
  execute(newText)
})

const execute = (text: string) => {
  translate(text)
}


const translate = debounce(async (text: string) => {
  if (langFrom.value == "auto") {
    const { data } = await detectText(text, store.detectSettings)
    //@ts-expect-error
    from = data.value.lang
  }
  else {
    from = langFrom.value
  }

  enabledTranslates.value.forEach(api => {
    translate_api(api, text)
  })
}, 1500)



const translate_api = async (api: any, text: string) => {
  if (!text || text === '') {
    api.loading = false
    api.error = ''
    api.result = ''
    return
  }

  if (api.loading) {
    return
  }
  let to = langTo.value;
  if (to == "auto") {
    if (from == "zh") to = "en";
    if (from == "en") to = "zh";
  }

  //console.log(`${from}-->${to}`)

  api.loading = true
  api.error = ''
  api.result = ''

  const { data, pending, error, refresh } = await translateText(api.name, text, from, to, store.translateSetting(api.name))
  api.loading = false
  if (error.value) {
    api.error = error.value?.data.message
    return
  }
  //@ts-expect-error
  api.result = data.value.message
}
 
const enabledTranslates = computed(() => {
  return appConfig.translates.filter(api => store.settings[api.name].enable)
})


function swapLangs() {
  const langToValue = langTo.value;
  const langFromValue = langFrom.value;
  langFrom.value = langToValue;
  langTo.value = langFromValue
  execute(sourceText.value)
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
    .then(() => {
      /* clipboard successfully set */
    })
    .catch(err => {
      /* clipboard write failed */
    });
}

function cleanSourceText() {
  sourceText.value = ""
}

</script>

<style scoped>
@media (max-width: 768px) {
  .el-col:not(:first-child) {
    margin-top: 20px;
  }
}

.tool-bar {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.tool-bar .el-select{
  flex: 1;
}

.tool-bar .swap-button{
  flex: 0 0 50px;
}

.vertical-align-middle {
  vertical-align: middle;
}

.source-text {
  position: relative;
}

.source-text .close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

.translate-select {
  width: 100%;
  margin-bottom: 20px;
}

.box-card {
  background-color: var(--el-fill-color);
}


:deep(.el-card__header) {
  padding: 5px;
}

:deep(.el-card__body) {
  padding: 5px;
}



.card-header {
  display: flex;
  align-items: center;
}

.card-content {
  position: relative;
  min-height: 24px;
}

.copy-btn {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
