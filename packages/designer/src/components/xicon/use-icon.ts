import { defineComponent } from 'vue'

export function useIcon(name: string, svg: string | JSX.Element) {
  return defineComponent({
    name,
    setup() {
      return () => {
        return svg
      }
    }
  })
}
