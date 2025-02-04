import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

//Vayan revisando el código, ya que es muy similar a un manejador de estado global como en react.
//En este caso, se está creando un store de counter, que tiene un contador y una función para incrementar el contador, es todo.
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  //Aquí se está retornando el contador, el doble del contador y la función para incrementar el contador que podemos usar en cualquier componente.
  return { count, doubleCount, increment }
})
