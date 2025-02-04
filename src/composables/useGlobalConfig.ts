import { ref, watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'

interface GlobalConfig {
  darkMode: boolean
  language: string
  group: number
  fontSize: number
}

export const useGlobalConfig = () => {
  const config = useStorage<GlobalConfig>('global-config', {
    darkMode: false,
    language: 'en',
    group: 81,
    fontSize: 16,
  })

  // Aplicar el tema oscuro
  watchEffect(() => {
    document.documentElement.classList.toggle('dark', config.value.darkMode)
  })

  // Aplicar tamaño de fuente
  watchEffect(() => {
    document.documentElement.style.fontSize = `${config.value.fontSize}px`
  })

  return {
    config,
    setLanguage: (lang: string) => (config.value.language = lang),
    toggleDarkMode: () => (config.value.darkMode = !config.value.darkMode),
    setGroup: (group: number) => (config.value.group = group),
    setFontSize: (size: number) => (config.value.fontSize = size),
  }
}
