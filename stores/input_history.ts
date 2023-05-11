

export const useInputHistoryStore = defineStore('input_history', {
    state: () => {  
      return {
        value:""
      }
    },
  
    persist: {
      storage: persistedState.localStorage,
    },
  });