import { ref, watch } from 'vue'
import type { LocalStorageKeys } from "@/config/localStorageKeys.ts";

export function useLocalStorage<T>(key: LocalStorageKeys, initialValue: T) {
  const state = ref<T>(initialValue)

  function load() {
    const item = localStorage.getItem(key)

    if (!item) return

    try {
      state.value = JSON.parse(item)
    } catch {
      remove()
    }
  }

  watch(state, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  function remove() {
    localStorage.removeItem(key)
    state.value = initialValue
  }

  load()

  return {
    state,
    remove
  }
}
