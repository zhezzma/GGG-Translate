

export const useFormSettingsStore = defineStore('form_settings', {
  state: () => {
    return {
      text: "",
      from: "auto",
      to: "auto"
    }
  },

  persist: {
    storage: persistedState.localStorage,
  },
});