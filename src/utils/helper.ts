export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  }
  return colors[priority as keyof typeof colors] || colors.low
}

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
