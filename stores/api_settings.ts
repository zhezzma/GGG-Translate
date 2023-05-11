import { getDefaultSettings } from './index'

export const useAPISettingsStore = defineStore('api_settings', {
  state: () => {
    var settings = getDefaultSettings()
    return settings
  },

  getters: {
    settings: (state) => {
      const runtimeConfig = useRuntimeConfig()
      return mergeTranslates(runtimeConfig.public.translates, state);
    },

    translateSetting: (state) => {

      const runtimeConfig = useRuntimeConfig()
      const settings = mergeTranslates(runtimeConfig.public.translates, state);
      return (channel: string) => {
        return settings[channel]
      }
    },

    detectSettings: (state) => {
      const runtimeConfig = useRuntimeConfig()
      const settings = mergeTranslates(runtimeConfig.public.translates, state);
      return {
        google: settings.google,
        tencent: settings.tencent
      }
    }
  },

  actions: {
    setTranslate: (channle: string, key: string, value: any) => {
      var state = this;
      //@ts-expect-error
      state[channle][key] = value
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});


export function mergeObjects(a: any, b: any): any {
  const result = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (typeof value === "object" && value !== null) {
      result[key] = result[key] || {};
      result[key] = mergeObjects(result[key], value);
    } else if (value !== "" && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}


export function mergeTranslates(a: any, b: any): any {
  const filtered = {};
  for (const prop in a) {
    if (prop in b) {
      //@ts-expect-error
      filtered[prop] = b[prop];
    }
  }
  return mergeObjects(a, filtered)
}
